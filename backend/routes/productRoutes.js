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
  getAllAdminProducts,
  getPendingProducts
} = require('../controllers/productController');
const { protect, admin, vendor, checkOwnership } = require('../middleware/authMiddleware');

// Admin-only routes MUST come before /:id to avoid route conflicts
router.get('/admin/all', protect, admin, getAllAdminProducts);
router.get('/admin/pending', protect, admin, getPendingProducts);
router.post('/admin/products/bulk-delete', protect, admin, bulkDeleteProducts);
router.post('/bulk-delete', protect, admin, bulkDeleteProducts); // alias
router.patch('/admin/products/:id/approve', protect, admin, approveProduct);
router.patch('/admin/products/:id/stock', protect, vendor, checkOwnership('Product'), updateStock);

// Public routes
router.get('/', getProducts);
router.get('/crop-types', getCropTypes);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

// Protected routes (Admin & Seller)  
router.post('/admin/products', protect, vendor, createProduct); 
router.patch('/admin/products/:id', protect, vendor, checkOwnership('Product'), updateProduct); 

// Reviews
router.post('/:id/reviews', protect, createProductReview);

// Legacy/Compatibility support
router.post('/', protect, vendor, createProduct);
router.put('/:id', protect, vendor, checkOwnership('Product'), updateProduct);
router.delete('/:id', protect, vendor, checkOwnership('Product'), deleteProduct);

module.exports = router;
