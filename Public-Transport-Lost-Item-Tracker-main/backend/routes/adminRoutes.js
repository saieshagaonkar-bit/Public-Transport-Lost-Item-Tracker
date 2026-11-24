const express = require('express');
const router = express.Router();
const {
  getSummary,
  getUsers,
  toggleUserStatus,
  getAuditLogs,
  getDisposals,
  updateDisposal,
} = require('../controllers/adminController');
const { getAllClaims, reviewClaim } = require('../controllers/claimController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Staff and Admin routes
router.use(protect);

router.get('/summary', authorize('Staff', 'Admin'), getSummary);
router.get('/claims', authorize('Staff', 'Admin'), getAllClaims);
router.patch('/claims/:id', authorize('Staff', 'Admin'), reviewClaim);
router.get('/audit', authorize('Staff', 'Admin'), getAuditLogs);
router.get('/disposals', authorize('Staff', 'Admin'), getDisposals);
router.patch('/disposals/:id', authorize('Staff', 'Admin'), updateDisposal);

// Admin-only user management
router.get('/users', authorize('Admin'), getUsers);
router.patch('/users/:id/status', authorize('Admin'), toggleUserStatus);

module.exports = router;
