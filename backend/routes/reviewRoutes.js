const express = require('express');
const router = express.Router();
const { getProductReviews, createReview, getAllReviews, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createReview);
router.route('/all').get(protect, getAllReviews);
router.route('/:productId').get(getProductReviews);
router.route('/:id').delete(protect, deleteReview);

module.exports = router;
