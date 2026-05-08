const mongoose = require('mongoose');
const MONGODB_URI = "mongodb+srv://ktlds:ktlds123@cluster0.mongodb.net/phanbongiatot";

const ProductSchema = new mongoose.Schema({
  name: String,
  images: [mongoose.Schema.Types.Mixed]
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected");
    const products = await Product.find({ "images": { $regex: "0339505050" } }).lean();
    products.forEach(p => {
      console.log(`Product: ${p.name}`);
      console.log(`Images: ${JSON.stringify(p.images)}`);
    });
    
    // Check Settings too
    const Settings = mongoose.models.Settings || mongoose.model('Settings', new mongoose.Schema({ heroBanner: String }));
    const settings = await Settings.findOne({});
    console.log(`Settings: ${JSON.stringify(settings)}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
