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
  createProductReview,
  getAllAdminProducts
} = require('../controllers/productController');
const { protect, admin, vendor, checkOwnership } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/crop-types', getCropTypes);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

// Protected routes (Admin & Seller)
router.post('/admin/products', protect, vendor, createProduct); 
router.patch('/admin/products/:id', protect, vendor, checkOwnership('Product'), updateProduct); 
router.patch('/admin/products/:id/stock', protect, vendor, checkOwnership('Product'), updateStock); 

// Admin only routes
router.get('/admin/all', protect, admin, getAllAdminProducts);
router.get('/admin/pending', protect, admin, getPendingProducts);
router.patch('/admin/products/:id/approve', protect, admin, approveProduct);
router.post('/admin/products/bulk-delete', protect, admin, bulkDeleteProducts);

// Reviews
router.post('/:id/reviews', protect, createProductReview);

// Legacy/Compatibility support
router.post('/', protect, vendor, createProduct);
router.put('/:id', protect, vendor, checkOwnership('Product'), updateProduct);
router.delete('/:id', protect, vendor, checkOwnership('Product'), deleteProduct);

module.exports = router;
