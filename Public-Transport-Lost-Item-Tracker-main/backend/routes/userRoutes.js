const express = require('express');
const router = express.Router();
const {
  getMyItems,
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  updateProfile,
} = require('../controllers/userController');
const { getMyClaims } = require('../controllers/claimController');
const { protect } = require('../middleware/authMiddleware');

// /api/me/*
router.get('/items', protect, getMyItems);
router.get('/claims', protect, getMyClaims);
router.get('/notifications', protect, getMyNotifications);
router.patch('/notifications/read-all', protect, markAllNotificationsRead);
router.patch('/notifications/:id', protect, markNotificationRead);
router.patch('/profile', protect, updateProfile);

module.exports = router;
