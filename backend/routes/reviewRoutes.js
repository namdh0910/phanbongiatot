const express = require('express');
const router = express.Router();
const { getProductReviews, createReview } = require('../controllers/reviewController');

router.route('/').post(createReview);
router.route('/:productId').get(getProductReviews);

module.exports = router;
