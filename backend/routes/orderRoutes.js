const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderByIdOrCode,
  updateOrderStatus,
  getOrders,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createOrder).get(protect, getOrders);
router.route('/:idOrCode').get(getOrderByIdOrCode);
router.route('/:id/status').put(protect, updateOrderStatus);

module.exports = router;
