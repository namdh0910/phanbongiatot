const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getCropTypes,
  updateStock,
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

// Public routes
router.get('/', getProducts);
router.get('/crop-types', getCropTypes);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

// Protected routes (Admin & Seller)
router.post('/admin/products', protect, createProduct); // Changed to match specs
router.patch('/admin/products/:id', protect, updateProduct); // Partial update
router.patch('/admin/products/:id/stock', protect, updateStock); // Atomic stock update

// Admin only routes
router.patch('/admin/products/:id/approve', protect, admin, approveProduct);
router.post('/admin/products/bulk-delete', protect, admin, bulkDeleteProducts);

// Reviews
router.post('/:id/reviews', protect, createProductReview);

// Legacy/Compatibility support (optional)
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
