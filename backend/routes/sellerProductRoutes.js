const express = require('express');
const router = express.Router();
const {
  getVendorProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// All routes here are protected and specific to the logged-in seller
router.use(protect);

router.get('/', getVendorProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
