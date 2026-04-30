const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const FlashSale = require('../models/FlashSale');
const Product = require('../models/Product');

const checkFlashSales = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const allSales = await FlashSale.find({});
    console.log(`Found ${allSales.length} flash sales in total.`);

    const now = new Date();
    const activeSales = await FlashSale.find({
      isActive: true,
      startAt: { $lte: now },
      endAt: { $gte: now }
    });

    console.log(`Found ${activeSales.length} ACTIVE flash sales.`);

    if (allSales.length === 0) {
      console.log('Creating a sample active flash sale...');
      const product = await Product.findOne({});
      if (product) {
        const sale = await FlashSale.create({
          product: product._id,
          salePrice: Math.round(product.price * 0.7),
          stock: 10,
          sold: 0,
          startAt: new Date(Date.now() - 3600000), // 1 hour ago
          endAt: new Date(Date.now() + 86400000), // 24 hours from now
          isActive: true
        });
        console.log('Sample Flash Sale created:', sale);
      } else {
        console.log('No products found to create a flash sale.');
      }
    } else if (activeSales.length === 0 && allSales.length > 0) {
        console.log('Updating existing sales to be active...');
        await FlashSale.updateMany({}, {
            isActive: true,
            startAt: new Date(Date.now() - 3600000),
            endAt: new Date(Date.now() + 86400000)
        });
        console.log('Updated all sales to be active.');
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkFlashSales();
