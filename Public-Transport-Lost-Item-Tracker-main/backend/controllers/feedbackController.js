const Feedback = require('../models/Feedback');
const AuditLog = require('../models/AuditLog');

// @desc    Submit passenger feedback
// @route   POST /api/feedback
// @access  Public (or Private)
const createFeedback = async (req, res, next) => {
  try {
    const { name, email, rating, category, message } = req.body;

    if (!rating || !category || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide rating, category, and message',
      });
    }

    const feedback = await Feedback.create({
      user: req.user ? req.user._id : null,
      name: name || (req.user ? req.user.name : 'Passenger'),
      email: email || (req.user ? req.user.email : ''),
      rating: Number(rating),
      category,
      message: message.trim(),
    });

    await AuditLog.create({
      actor: feedback.name,
      email: feedback.email,
      role: req.user ? req.user.role : 'Passenger',
      category: 'Feedback',
      action: 'Submitted passenger feedback',
      target: `${category} • ${rating}/5 stars`,
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private (Admin, Staff)
const getAllFeedback = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    const feedbackList = await Feedback.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbackList.length,
      data: feedbackList,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
};
