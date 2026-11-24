const User = require('../models/User');
const Item = require('../models/Item');
const Claim = require('../models/Claim');
const AuditLog = require('../models/AuditLog');
const Disposal = require('../models/Disposal');
const Feedback = require('../models/Feedback');

// @desc    Get comprehensive system summary and dashboard analytics
// @route   GET /api/admin/summary
// @access  Private (Admin, Staff)
const getSummary = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const passengerCount = await User.countDocuments({ role: 'Passenger' });
    const staffCount = await User.countDocuments({ role: 'Staff' });
    const adminCount = await User.countDocuments({ role: 'Admin' });

    const totalReports = await Item.countDocuments();
    const lostCount = await Item.countDocuments({ type: 'Lost' });
    const foundCount = await Item.countDocuments({ type: 'Found' });
    const activeReports = await Item.countDocuments({
      status: { $in: ['Open', 'Possible Match', 'Claim Pending'] },
    });
    const recoveredCount = await Item.countDocuments({ status: 'Recovered' });

    const totalClaims = await Claim.countDocuments();
    const pendingClaims = await Claim.countDocuments({ status: 'Pending Review' });
    const approvedClaims = await Claim.countDocuments({ status: 'Approved' });
    const rejectedClaims = await Claim.countDocuments({ status: 'Rejected' });

    const totalFeedback = await Feedback.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          passengers: passengerCount,
          staff: staffCount,
          admins: adminCount,
        },
        items: {
          total: totalReports,
          lost: lostCount,
          found: foundCount,
          active: activeReports,
          recovered: recoveredCount,
        },
        claims: {
          total: totalClaims,
          pending: pendingClaims,
          approved: approvedClaims,
          rejected: rejectedClaims,
        },
        feedback: {
          total: totalFeedback,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    List registered accounts with filtering
// @route   GET /api/admin/users
// @access  Private (Admin)
const getUsers = async (req, res, next) => {
  try {
    const { role, status } = req.query;
    const query = {};

    if (role && role !== 'all') {
      query.role = role;
    }
    if (status && status !== 'all') {
      query.status = status;
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle account status (Active / Suspended)
// @route   PATCH /api/admin/users/:id/status
// @access  Private (Admin)
const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found',
      });
    }

    if (user.role === 'Admin') {
      return res.status(400).json({
        success: false,
        message: 'Administrator accounts cannot be suspended',
      });
    }

    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    user.status = newStatus;
    await user.save();

    await AuditLog.create({
      actor: req.user.name,
      email: req.user.email,
      role: req.user.role,
      category: 'Users',
      action: `${newStatus === 'Suspended' ? 'Suspended' : 'Reactivated'} account`,
      target: `${user.name} (${user.email})`,
    });

    res.status(200).json({
      success: true,
      message: `User account has been ${newStatus.toLowerCase()}`,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get audit trail events
// @route   GET /api/admin/audit
// @access  Private (Admin, Staff)
const getAuditLogs = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(limit);

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get disposals (unclaimed property past 90-day holding period)
// @route   GET /api/admin/disposals
// @access  Private (Staff, Admin)
const getDisposals = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const disposals = await Disposal.find(query).sort({ daysHeld: -1 });

    res.status(200).json({
      success: true,
      count: disposals.length,
      data: disposals,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update disposal status (Dispose or Extend Hold)
// @route   PATCH /api/admin/disposals/:id
// @access  Private (Staff, Admin)
const updateDisposal = async (req, res, next) => {
  try {
    const { action } = req.body; // 'dispose' or 'extend'
    const disposal = await Disposal.findOne({
      $or: [{ disposalId: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
    });

    if (!disposal) {
      return res.status(404).json({
        success: false,
        message: 'Disposal record not found',
      });
    }

    if (action === 'dispose') {
      disposal.status = 'Disposed';
      await disposal.save();

      await AuditLog.create({
        actor: req.user.name,
        email: req.user.email,
        role: req.user.role,
        category: 'Disposal',
        action: `Approved disposal (${disposal.method.toLowerCase()})`,
        target: `${disposal.disposalId} - ${disposal.itemTitle}`,
      });
    } else if (action === 'extend') {
      disposal.status = 'Hold Extended';
      await disposal.save();

      await AuditLog.create({
        actor: req.user.name,
        email: req.user.email,
        role: req.user.role,
        category: 'Disposal',
        action: 'Extended holding period by 30 days',
        target: `${disposal.disposalId} - ${disposal.itemTitle}`,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action: must be "dispose" or "extend"',
      });
    }

    res.status(200).json({
      success: true,
      data: disposal,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSummary,
  getUsers,
  toggleUserStatus,
  getAuditLogs,
  getDisposals,
  updateDisposal,
};
