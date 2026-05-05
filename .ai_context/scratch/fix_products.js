const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const Product = require('../backend/models/Product');

const fixProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // 1. Approve all products
    // 2. Set category to "Phân bón" if it's empty or similar
    const result = await Product.updateMany(
      {}, 
      { 
        $set: { 
          status: 'approved',
          category: 'Phân bón' // Chỉnh lại mặc định để hiện ra ngay
        } 
      }
    );

    console.log(`Updated ${result.modifiedCount} products to approved status.`);
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixProducts();
