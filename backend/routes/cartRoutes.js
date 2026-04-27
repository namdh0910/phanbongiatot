const express = require('express');
const router = express.Router();
const { getCart, syncCart, mergeCart } = require('../controllers/cartController');

router.get('/', getCart);
router.post('/sync', syncCart);
router.post('/merge', mergeCart);

module.exports = router;
