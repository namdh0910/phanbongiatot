const mongoose = require('mongoose');
const Product = require('./models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const cleanup = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('MONGO_URI is not defined in .env');
        process.exit(1);
    }
    
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const keywords = ['thuốc trừ sâu', 'thuốc bảo vệ thực vật', 'bvtv', 'pesticide', 'insecticide', 'herbicides', 'diệt côn trùng'];
    
    // 1. Delete Products matching keywords in name or category
    const deleteResult = await Product.deleteMany({
      $or: [
        { name: { $regex: keywords.join('|'), $options: 'i' } },
        { category: { $regex: keywords.join('|'), $options: 'i' } },
        { category_id: 'thuoc-tru-sau' }
      ]
    });
    console.log(`Deleted ${deleteResult.deletedCount} pesticide-related products.`);

    console.log('Cleanup completed.');
    process.exit(0);
  } catch (error) {
    console.error('Connection error:', error.message);
    process.exit(1);
  }
};

cleanup();
