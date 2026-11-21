const express = require('express');
const router = express.Router();
const { getMyClaims, getAllClaims, reviewClaim } = require('../controllers/claimController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/my', protect, getMyClaims);
router.get('/', protect, authorize('Staff', 'Admin'), getAllClaims);
router.patch('/:id', protect, authorize('Staff', 'Admin'), reviewClaim);

module.exports = router;
