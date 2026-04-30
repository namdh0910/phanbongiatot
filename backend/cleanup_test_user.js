const mongoose = require('mongoose');
const User = require('./models/User');
const Seller = require('./models/Seller');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

async function cleanup() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Delete the test vendor that skipped the application flow
    const res = await User.deleteOne({ username: 'namdh0910' });
    console.log('Deleted User namdh0910:', res.deletedCount);
    
    const res2 = await Seller.deleteOne({ storeName: 'namdh0910' }); // Just in case
    console.log('Deleted Seller with storeName namdh0910:', res2.deletedCount);

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

cleanup();
