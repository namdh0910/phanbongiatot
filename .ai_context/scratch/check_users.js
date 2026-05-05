const mongoose = require('mongoose');
const User = require('./backend/models/User');
const Seller = require('./backend/models/Seller');
const SellerApplication = require('./backend/models/SellerApplication');
const dotenv = require('dotenv');

dotenv.config({ path: './backend/.env' });

async function checkUsers() {
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

  await mongoose.disconnect();
}

checkUsers();
