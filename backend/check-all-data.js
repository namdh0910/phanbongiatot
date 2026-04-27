const mongoose = require('mongoose');
const Product = require('./models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const check = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const allProducts = await Product.find({});
    console.log(`Total Products in DB: ${allProducts.length}`);
    
    allProducts.forEach(p => {
        console.log(`- [${p._id}] ${p.name}`);
        console.log(`  Status: ${p.status} | Appr: ${p.approval_status} | Stock: ${p.stock}`);
        console.log(`  Category: ${p.category} | CID: ${p.category_id}`);
        console.log('---');
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

check();
