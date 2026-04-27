const mongoose = require('mongoose');
const Product = require('./models/Product');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const debug = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const products = await Product.find({ category_id: 'phan-bon' });
    console.log(`Found ${products.length} products in 'phan-bon' category.`);
    
    if (products.length > 0) {
        console.log('Sample Product 1:', {
            name: products[0].name,
            status: products[0].status,
            approval_status: products[0].approval_status,
            stock: products[0].stock,
            category_id: products[0].category_id
        });
    } else {
        const all = await Product.find({}).limit(10);
        console.log('First 10 products in DB:');
        all.forEach(p => console.log(`- ${p.name} | Cat: ${p.category} | CID: ${p.category_id} | Status: ${p.status} | Appr: ${p.approval_status}`));
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

debug();
