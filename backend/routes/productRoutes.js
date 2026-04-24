const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getVendorProducts, 
  getPendingProducts,
  approveProduct,
  getProductById, 
  getProductBySlug, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  createProductReview 
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/vendor/me', protect, getVendorProducts);
router.get('/admin/pending', protect, admin, getPendingProducts);
router.put('/:id/approve', protect, admin, approveProduct);

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/slug/:slug').get(getProductBySlug);
router.route('/:id').get(getProductById).put(protect, updateProduct).delete(protect, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;
