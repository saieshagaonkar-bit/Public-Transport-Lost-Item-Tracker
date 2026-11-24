const Claim = require('../models/Claim');
const Item = require('../models/Item');
const Notification = require('../models/Notification');
const AuditLog = require('../models/AuditLog');

// Helper to resolve claim by customId (CLM-XXXX) or Mongo _id
const findClaimById = async (identifier) => {
  if (!identifier) return null;
  let claim = await Claim.findOne({ claimId: identifier });
  if (!claim && identifier.match(/^[0-9a-fA-F]{24}$/)) {
    claim = await Claim.findById(identifier);
  }
  return claim;
};

// @desc    Submit ownership verification claim for a found item
// @route   POST /api/items/:id/claims
// @access  Private
const createClaim = async (req, res, next) => {
  try {
    const { claimantName, claimantPhone, secretDetails, pickupStation } = req.body;

    if (!claimantName || !claimantPhone || !secretDetails || !pickupStation) {
      return res.status(400).json({
        success: false,
        message: 'Please provide claimant name, phone number, private verification proof, and preferred pickup desk',
      });
    }

    // Find the item being claimed
    let item = await Item.findOne({ customId: req.params.id });
    if (!item && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      item = await Item.findById(req.params.id);
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Found item not found with identifier ${req.params.id}`,
      });
    }

    if (item.type !== 'Found') {
      return res.status(400).json({
        success: false,
        message: 'Ownership claims can only be filed against items held in custody (Found items)',
      });
    }

    if (item.status === 'Recovered') {
      return res.status(400).json({
        success: false,
        message: 'This item has already been recovered and reunited with its verified owner',
      });
    }

    // Create the claim
    const claim = await Claim.create({
      item: item._id,
      itemId: item.customId,
      itemTitle: item.title,
      claimant: req.user._id,
      claimantName: claimantName.trim(),
      claimantPhone: claimantPhone.trim(),
      secretDetails: secretDetails.trim(),
      pickupStation: pickupStation.trim(),
      status: 'Pending Review',
    });

    // Update item status
    item.status = 'Claim Pending';
    item.claimed = true;
    item.activeClaim = claim._id;
    await item.save();

    // Create in-app notification
    await Notification.create({
      user: req.user._id,
      title: `Ownership Claim ${claim.claimId} Filed`,
      body: `Your claim for "${item.title}" is queued for transit verification at ${pickupStation}.`,
      type: 'claim_submitted',
      relatedItem: item._id,
      relatedItemId: item.customId,
      relatedClaim: claim._id,
    });

    // Audit log
    await AuditLog.create({
      actor: req.user.name,
      email: req.user.email,
      role: req.user.role,
      category: 'Claims',
      action: 'Submitted ownership claim',
      target: `${claim.claimId} • ${item.title}`,
    });

    res.status(201).json({
      success: true,
      message: `Ownership claim ${claim.claimId} successfully submitted for transit review`,
      data: claim,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get claims filed by the currently authenticated passenger
// @route   GET /api/me/claims
// @access  Private
const getMyClaims = async (req, res, next) => {
  try {
    const claims = await Claim.find({ claimant: req.user._id })
      .populate('item', 'customId title type category route location status image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all claims in transit custody queue (Staff / Admin)
// @route   GET /api/admin/claims
// @access  Private (Staff, Admin)
const getAllClaims = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = new RegExp(`^${status}$`, 'i');
    }

    const claims = await Claim.find(query)
      .populate('item', 'customId title type category color location custodyLocation status image')
      .populate('claimant', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Review claim (Approve or Reject with notes)
// @route   PATCH /api/admin/claims/:id
// @access  Private (Staff, Admin)
const reviewClaim = async (req, res, next) => {
  try {
    const { status, reviewNotes } = req.body;

    if (!status || !['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please specify status as either "Approved" or "Rejected"',
      });
    }

    const claim = await findClaimById(req.params.id);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: `Claim not found with identifier ${req.params.id}`,
      });
    }

    const item = await Item.findById(claim.item);

    claim.status = status;
    claim.adminReview = {
      reviewedBy: req.user._id,
      reviewerName: req.user.name,
      reviewNotes: reviewNotes ? reviewNotes.trim() : (status === 'Approved' ? 'Ownership verified via provided proof' : 'Inconclusive ownership proof provided'),
      reviewedAt: new Date(),
    };

    await claim.save();

    if (status === 'Approved') {
      if (item) {
        item.status = 'Recovered';
        await item.save();
      }

      // In-app notification for claimant
      await Notification.create({
        user: claim.claimant,
        title: `Claim ${claim.claimId} Approved!`,
        body: `Authorized staff verified ownership for "${claim.itemTitle}". Custody handover voucher issued for collection at ${claim.pickupStation}.`,
        type: 'claim_approved',
        relatedItem: claim.item,
        relatedItemId: claim.itemId,
        relatedClaim: claim._id,
      });

      // Audit log
      await AuditLog.create({
        actor: req.user.name,
        email: req.user.email,
        role: req.user.role,
        category: 'Claims',
        action: 'Approved claim & issued handover voucher',
        target: `${claim.claimId} - ${claim.itemTitle}`,
      });
    } else {
      // If rejected, restore item status to Open
      if (item && item.status === 'Claim Pending') {
        item.status = 'Open';
        item.claimed = false;
        item.activeClaim = null;
        await item.save();
      }

      // In-app notification for claimant
      await Notification.create({
        user: claim.claimant,
        title: `Claim ${claim.claimId} Review Concluded`,
        body: `Staff recorded reason: ${claim.adminReview.reviewNotes}`,
        type: 'claim_rejected',
        relatedItem: claim.item,
        relatedItemId: claim.itemId,
        relatedClaim: claim._id,
      });

      // Audit log
      await AuditLog.create({
        actor: req.user.name,
        email: req.user.email,
        role: req.user.role,
        category: 'Claims',
        action: 'Rejected claim',
        target: `${claim.claimId} - ${claim.itemTitle}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Claim ${claim.claimId} has been ${status.toLowerCase()}`,
      data: claim,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createClaim,
  getMyClaims,
  getAllClaims,
  reviewClaim,
};
