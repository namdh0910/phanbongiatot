const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const products = await Product.find({ images: { $regex: '0339505050' } });
  console.log(`Found ${products.length} products with corrupted images`);
  
  const Combo = require('./models/Combo');
  const combos = await Combo.find({ image: { $regex: '0339505050' } });
  console.log(`Found ${combos.length} combos with corrupted images`);
  
  const Settings = require('./models/Settings');
  const settings = await Settings.findOne({ heroBanner: { $regex: '0339505050' } });
  console.log(`Found ${settings ? 1 : 0} settings with corrupted images`);

  for (const p of products) {
    // ... fix logic
  }
  for (const c of combos) {
    console.log(`- ${c.name}: ${c.image}`);
    await Combo.updateOne({ _id: c._id }, { $set: { image: c.image.replace('0339505050', '0773440966') } });
  }
  if (settings) {
    console.log(`- Settings heroBanner: ${settings.heroBanner}`);
    await Settings.updateOne({ _id: settings._id }, { $set: { heroBanner: settings.heroBanner.replace('0339505050', '0773440966') } });
  }
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
