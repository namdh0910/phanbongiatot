const mongoose = require('mongoose');
const Product = require('./models/Product');
const Combo = require('./models/Combo');
require('dotenv').config();

async function fix() {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log("Connected to DB");

    const models = [Product, Combo];
    
    for (const Model of models) {
      const docs = await Model.find({});
      for (const doc of docs) {
        let changed = false;
        let jsonStr = JSON.stringify(doc);
        
        if (jsonStr.includes('0339505050') && jsonStr.includes('cloudinary')) {
          console.log(`Fixing doc: ${doc.name || doc.title}`);
          // Replace 0339505050 back to 0773440966 ONLY if it's in a Cloudinary context
          // We'll use a more surgical replacement on the stringified object
          const fixedStr = jsonStr.replace(/cloudinary\.com\/([^/]+\/image\/upload\/v?\d*\/?)0339505050/g, 'cloudinary.com/$10773440966');
          
          if (jsonStr !== fixedStr) {
            const fixedData = JSON.parse(fixedStr);
            await Model.updateOne({ _id: doc._id }, fixedData);
            changed = true;
          }
        }
      }
    }

    console.log("Database Fix Completed");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fix();
