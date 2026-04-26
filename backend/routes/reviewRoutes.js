const express = require('express');
const router = express.Router();
const {
  createReview,
  getProductReviews,
  getAdminReviews,
  updateReviewStatus
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', createReview);
router.get('/', getProductReviews);

// Admin routes
router.get('/admin/all', protect, admin, getAdminReviews);
router.patch('/:id', protect, admin, updateReviewStatus);
router.patch('/admin/:id', protect, admin, updateReviewStatus); // Supporting both if needed

module.exports = router;
