const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');
const FlashSale = require('../models/FlashSale');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedFlashSales = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // Clear old flash sales
    await FlashSale.deleteMany();

    // Get some products to put on flash sale
    const products = await Product.find({ status: 'approved' }).limit(4);
    
    if (products.length === 0) {
      console.error('No approved products found to seed flash sales.');
      process.exit(1);
    }

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const sales = products.map((p, i) => ({
      product: p._id,
      salePrice: Math.round(p.price * 0.7), // 30% discount
      startAt: now,
      endAt: tomorrow,
      maxQty: 50,
      soldQty: Math.floor(Math.random() * 20),
      isActive: true
    }));

    await FlashSale.insertMany(sales);

    console.log(`Successfully seeded ${sales.length} active flash sales!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedFlashSales();
