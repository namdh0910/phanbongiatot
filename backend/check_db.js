const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, './.env') });

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const products = await Product.find({}).populate('seller', 'username role vendorInfo');
    console.log(`Total products: ${products.length}`);
    
    products.forEach(p => {
        console.log(`- ${p.name} | Status: ${p.status} | Category: ${p.category} | Featured: ${p.isFeatured} | Seller: ${p.seller?.username} (${p.seller?.role})`);
    });

    const admin = await User.findOne({ role: 'admin' });
    console.log('Admin User:', admin ? { id: admin._id, username: admin.username, role: admin.role, vendorInfo: admin.vendorInfo } : 'NOT FOUND');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

checkData();
