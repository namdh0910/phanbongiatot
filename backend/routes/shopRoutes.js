const express = require('express');
const router = express.Router();
const { getPublicShop, getPublicShopProducts } = require('../controllers/sellerController');

router.get('/:slug', getPublicShop);
router.get('/:slug/products', getPublicShopProducts);

module.exports = router;
