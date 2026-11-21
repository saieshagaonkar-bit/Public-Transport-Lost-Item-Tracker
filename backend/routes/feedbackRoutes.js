const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedback } = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', (req, res, next) => {
  // Optional auth
  if (req.headers.authorization) {
    return protect(req, res, () => createFeedback(req, res, next));
  }
  return createFeedback(req, res, next);
});

router.get('/', protect, authorize('Staff', 'Admin'), getAllFeedback);

module.exports = router;
