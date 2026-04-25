const express = require('express');
const router = express.Router();
const { getShippingFee } = require('../controllers/shippingController');

router.post('/calculate', getShippingFee);

module.exports = router;
