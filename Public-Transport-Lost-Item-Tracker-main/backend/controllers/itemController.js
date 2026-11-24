const Item = require('../models/Item');
const Notification = require('../models/Notification');
const AuditLog = require('../models/AuditLog');
const { calculateMatchScore, findMatchesForTarget } = require('../utils/matching');

// Helper to find item by customId or Mongo _id
const findItemByIdOrCustomId = async (identifier) => {
  if (!identifier) return null;
  if (identifier.startsWith && identifier.startsWith('TRX-')) {
    return await Item.findOne({ customId: identifier });
  }
  // Try customId first, then _id
  let item = await Item.findOne({ customId: identifier });
  if (!item && identifier.match(/^[0-9a-fA-F]{24}$/)) {
    item = await Item.findById(identifier);
  }
  return item;
};

// @desc    Get all items with search, filtering, and sorting
// @route   GET /api/items
// @access  Public
const getItems = async (req, res, next) => {
  try {
    const {
      keyword,
      type,
      category,
      transitType,
      status,
      dateRange,
      sort,
      page = 1,
      limit = 50,
    } = req.query;

    const query = {};

    // 1. Report Classification Filter (Lost / Found)
    if (type && type !== 'all') {
      query.type = new RegExp(`^${type}$`, 'i');
    }

    // 2. Category Filter
    if (category && category !== 'all') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    // 3. Transit Mode Filter
    if (transitType && transitType !== 'all') {
      query.transitType = new RegExp(`^${transitType}$`, 'i');
    }

    // 4. Status Filter
    if (status && status !== 'all') {
      if (status.toLowerCase() === 'claim pending') {
        query.status = { $in: ['Claim Pending', 'Open'] };
      } else {
        query.status = new RegExp(`^${status}$`, 'i');
      }
    }

    // 5. Keyword search across multiple fields
    if (keyword && keyword.trim()) {
      const q = keyword.trim();
      const regex = new RegExp(q, 'i');
      query.$or = [
        { title: regex },
        { description: regex },
        { color: regex },
        { brand: regex },
        { route: regex },
        { location: regex },
        { customId: regex },
        { custodyLocation: regex },
      ];
    }

    // 6. Date Range Filter
    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      let pastDate = new Date();

      if (dateRange === 'today') {
        pastDate.setDate(now.getDate() - 1);
      } else if (dateRange === 'week') {
        pastDate.setDate(now.getDate() - 7);
      } else if (dateRange === 'month') {
        pastDate.setDate(now.getDate() - 30);
      }

      query.createdAt = { $gte: pastDate };
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // newest first default
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'title') {
      sortOption = { title: 1 };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Item.countDocuments(query);
    const items = await Item.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: items.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: items,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single item by ID or customId
// @route   GET /api/items/:id
// @access  Public
const getItemById = async (req, res, next) => {
  try {
    const item = await findItemByIdOrCustomId(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found with identifier ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new lost or found item report
// @route   POST /api/items
// @access  Private
const createItem = async (req, res, next) => {
  try {
    const {
      title,
      type,
      category,
      color,
      brand,
      description,
      transitType,
      route,
      location,
      date,
      timeApprox,
      custodyLocation,
      reporterName,
      reporterEmail,
      reporterRole,
      image,
    } = req.body;

    if (!title || !type || !category || !color || !description || !transitType || !route || !location || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required item identification and transit details',
      });
    }

    // Default custodyLocation based on type
    let finalCustody = custodyLocation;
    if (type === 'Found' && !finalCustody) {
      finalCustody = 'Secured by transit reporting team';
    } else if (type === 'Lost') {
      finalCustody = 'Reported missing by passenger';
    }

    const newItem = await Item.create({
      title: title.trim(),
      type,
      category,
      color: color.trim(),
      brand: brand ? brand.trim() : 'Unspecified',
      description: description.trim(),
      transitType,
      route: route.trim(),
      location: location.trim(),
      date,
      timeApprox: timeApprox ? timeApprox.trim() : 'Not specified',
      custodyLocation: finalCustody,
      status: 'Open',
      image: image || null,
      reportedBy: req.user._id,
      reporterName: reporterName || req.user.name,
      reporterEmail: reporterEmail || req.user.email,
      reporterRole: reporterRole || req.user.role || 'Passenger',
    });

    // Record audit log
    await AuditLog.create({
      actor: req.user.name,
      email: req.user.email,
      role: req.user.role,
      category: 'Reports',
      action: `Submitted ${type.toLowerCase()} item report`,
      target: `${newItem.title} (${newItem.customId})`,
    });

    // Run automated smart matching engine against counter-reports
    const oppositeType = type === 'Lost' ? 'Found' : 'Lost';
    const counterItems = await Item.find({
      type: oppositeType,
      status: { $ne: 'Recovered' },
    });

    const matches = findMatchesForTarget(newItem, counterItems);

    if (matches.length > 0) {
      newItem.status = 'Possible Match';
      await newItem.save();

      const topMatch = matches[0];

      // Notify the reporter about possible match
      await Notification.create({
        user: req.user._id,
        title: `Possible Match Found for "${newItem.title}"!`,
        body: `Match engine detected a ${topMatch.score}% confidence match with item ${topMatch.matchedItem.customId} (${topMatch.matchedItem.title}).`,
        type: 'match',
        relatedItem: topMatch.matchedItem._id,
        relatedItemId: topMatch.matchedItem.customId,
      });

      // Also notify the counter-party reporter if they have an account
      if (topMatch.matchedItem.reportedBy && topMatch.matchedItem.reportedBy.toString() !== req.user._id.toString()) {
        await Notification.create({
          user: topMatch.matchedItem.reportedBy,
          title: `New Matching Report for "${topMatch.matchedItem.title}"!`,
          body: `A new ${newItem.type.toLowerCase()} item report "${newItem.title}" (${newItem.customId}) aligns with your report with a ${topMatch.score}% confidence score.`,
          type: 'match',
          relatedItem: newItem._id,
          relatedItemId: newItem.customId,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: `Report ${newItem.customId} successfully registered in the transit database`,
      data: newItem,
      matchesFound: matches.length,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update item report
// @route   PATCH /api/items/:id
// @access  Private
const updateItem = async (req, res, next) => {
  try {
    const item = await findItemByIdOrCustomId(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found with identifier ${req.params.id}`,
      });
    }

    // Ownership or staff/admin authorization check
    const isOwner = item.reportedBy.toString() === req.user._id.toString();
    const isStaffOrAdmin = req.user.role === 'Staff' || req.user.role === 'Admin';

    if (!isOwner && !isStaffOrAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this item report',
      });
    }

    const updatableFields = [
      'title',
      'category',
      'color',
      'brand',
      'description',
      'transitType',
      'route',
      'location',
      'date',
      'timeApprox',
      'custodyLocation',
      'status',
      'image',
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        item[field] = req.body[field];
      }
    });

    await item.save();

    await AuditLog.create({
      actor: req.user.name,
      email: req.user.email,
      role: req.user.role,
      category: 'Inventory',
      action: `Updated item report`,
      target: `${item.customId} - ${item.title}`,
    });

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete / Archive item report
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = async (req, res, next) => {
  try {
    const item = await findItemByIdOrCustomId(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found with identifier ${req.params.id}`,
      });
    }

    // Ownership or staff/admin check
    const isOwner = item.reportedBy.toString() === req.user._id.toString();
    const isStaffOrAdmin = req.user.role === 'Staff' || req.user.role === 'Admin';

    if (!isOwner && !isStaffOrAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this item report',
      });
    }

    await Item.deleteOne({ _id: item._id });

    await AuditLog.create({
      actor: req.user.name,
      email: req.user.email,
      role: req.user.role,
      category: 'Inventory',
      action: `Deleted item report`,
      target: `${item.customId} - ${item.title}`,
    });

    res.status(200).json({
      success: true,
      message: `Report ${item.customId} removed from registry`,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get rule-based matching items for a target item
// @route   GET /api/items/:id/matches
// @access  Public (or Private)
const getItemMatches = async (req, res, next) => {
  try {
    const targetItem = await findItemByIdOrCustomId(req.params.id);

    if (!targetItem) {
      return res.status(404).json({
        success: false,
        message: `Item not found with identifier ${req.params.id}`,
      });
    }

    const oppositeType = targetItem.type === 'Lost' ? 'Found' : 'Lost';
    const candidates = await Item.find({
      type: oppositeType,
      status: { $ne: 'Recovered' },
    });

    const matches = findMatchesForTarget(targetItem, candidates);

    res.status(200).json({
      success: true,
      targetItem: {
        id: targetItem.customId,
        title: targetItem.title,
        type: targetItem.type,
        category: targetItem.category,
        route: targetItem.route,
        status: targetItem.status,
      },
      count: matches.length,
      matches,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemMatches,
};
