const express = require('express');
const router = express.Router();
const {
  createReview,
  getProductReviews,
  getAdminReviews,
  updateReviewStatus
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', createReview);
router.get('/product/:productId', getProductReviews);
router.get('/admin/all', protect, admin, getAdminReviews);
router.put('/:id/status', protect, admin, updateReviewStatus);

module.exports = router;
