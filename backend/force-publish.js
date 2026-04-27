const mongoose = require('mongoose');
const Product = require('./models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const fix = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Force update all products to be live
    const result = await Product.updateMany(
      {},
      { 
        $set: { 
          status: 'published', 
          approval_status: 'approved',
          stock: 100 
        } 
      }
    );
    console.log(`Updated ${result.modifiedCount} products to 'published' & 'approved'.`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

fix();
