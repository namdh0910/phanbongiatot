const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getProductBySlug, createProduct, updateProduct, deleteProduct, createProductReview } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/slug/:slug').get(getProductBySlug);
router.route('/:id').get(getProductById).put(protect, updateProduct).delete(protect, deleteProduct);
router.route('/:id/reviews').post(createProductReview);

module.exports = router;
