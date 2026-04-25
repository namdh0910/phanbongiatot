const express = require('express');
const router = express.Router();
const {
  getActiveFlashSales,
  getFlashSales,
  createFlashSale,
  deleteFlashSale
} = require('../controllers/flashSaleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/active', getActiveFlashSales);
router.get('/', protect, admin, getFlashSales);
router.post('/', protect, admin, createFlashSale);
router.delete('/:id', protect, admin, deleteFlashSale);

module.exports = router;
