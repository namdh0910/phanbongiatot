const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Run from backend dir
dotenv.config({ path: './.env' });

const User = require('./models/User');
const Seller = require('./models/Seller');
const SellerApplication = require('./models/SellerApplication');

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('--- USERS ---');
    const users = await User.find({});
    users.forEach(u => console.log(`${u.username} - ${u.role} - ${u.status}`));
    
    console.log('\n--- SELLERS ---');
    const sellers = await Seller.find({});
    sellers.forEach(s => console.log(`${s.storeName} - ${s.approvalStatus}`));

    console.log('\n--- APPLICATIONS ---');
    const apps = await SellerApplication.find({});
    apps.forEach(a => console.log(`${a.storeName} - ${a.status}`));

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

checkUsers();
