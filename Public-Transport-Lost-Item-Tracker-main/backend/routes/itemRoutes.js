const express = require('express');
const router = express.Router();
const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemMatches,
} = require('../controllers/itemController');
const { createClaim } = require('../controllers/claimController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getItems)
  .post(protect, createItem);

router.route('/:id')
  .get(getItemById)
  .patch(protect, updateItem)
  .delete(protect, deleteItem);

router.get('/:id/matches', getItemMatches);

// Claim submission nested on item endpoint
router.post('/:id/claims', protect, createClaim);

module.exports = router;
