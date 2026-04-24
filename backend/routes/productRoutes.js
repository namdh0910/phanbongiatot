const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getVendorProducts, 
  getAdminProducts,
  getPendingProducts,
  approveProduct,
  getProductById, 
  getProductBySlug, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  bulkDeleteProducts,
  createProductReview 
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/vendor/me', protect, getVendorProducts);
router.get('/admin/all', protect, admin, getAdminProducts);
router.post('/bulk-delete', protect, admin, bulkDeleteProducts);
router.get('/admin/pending', protect, admin, getPendingProducts);
router.put('/:id/approve', protect, admin, approveProduct);

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/slug/:slug').get(getProductBySlug);
router.route('/:id').get(getProductById).put(protect, updateProduct).delete(protect, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;
