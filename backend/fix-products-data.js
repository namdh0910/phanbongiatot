const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config({ path: './.env' });

const fixProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Fix missing status and approval_status
    await Product.updateMany(
      { $or: [{ status: { $exists: false } }, { status: null }, { approval_status: { $exists: false } }, { approval_status: null }] },
      { $set: { status: 'approved', approval_status: 'approved' } }
    );

    // 2. Ensure we have featured products
    let featuredCount = await Product.countDocuments({ $or: [{ is_featured: true }, { isFeatured: true }] });
    if (featuredCount < 4) {
      const toFeature = await Product.find({ status: 'approved' }).limit(8);
      for (const p of toFeature) {
        p.is_featured = true;
        p.isFeatured = true;
        await p.save();
      }
      console.log(`Marked ${toFeature.length} products as featured.`);
    }

    // Force sync all featured
    await Product.updateMany(
      { $or: [{ is_featured: true }, { isFeatured: true }] },
      { $set: { is_featured: true, isFeatured: true } }
    );

    // 3. Fix stock
    await Product.updateMany(
      { $or: [{ stock: { $exists: false } }, { stock: null }] },
      { $set: { stock: 100 } }
    );

    // 4. Fix category_id
    const products = await Product.find({ category_id: { $exists: false } });
    for (const p of products) {
      if (p.category) {
        const slugify = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');
        p.category_id = slugify(p.category);
        await p.save();
      }
    }
    
    console.log('Data fix completed.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

fixProducts();
