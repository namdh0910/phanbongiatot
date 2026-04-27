const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config({ path: './.env' });

const fixProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Fix missing status and approval_status
    const result = await Product.updateMany(
      { $or: [
        { status: { $exists: false } }, 
        { status: null }, 
        { approval_status: { $exists: false } }, 
        { approval_status: null }
      ]},
      { $set: { status: 'approved', approval_status: 'approved' } }
    );
    console.log(`Updated ${result.modifiedCount} products to 'approved' status.`);

    // 2. Fix missing is_featured (ensure at least 4 are featured for homepage)
    const featuredCount = await Product.countDocuments({ is_featured: true });
    if (featuredCount < 4) {
      const toFeature = await Product.find({ status: 'approved' }).limit(8);
      for (const p of toFeature) {
        p.is_featured = true;
        await p.save();
      }
      console.log(`Marked ${toFeature.length} products as featured for homepage.`);
    }

    // 3. Fix missing stock
    const stockResult = await Product.updateMany(
      { $or: [{ stock: { $exists: false } }, { stock: null }] },
      { $set: { stock: 100 } }
    );
    console.log(`Updated ${stockResult.modifiedCount} products with default stock (100).`);

    // 4. Fix missing category_id (if category exists)
    const products = await Product.find({ category_id: { $exists: false } });
    for (const p of products) {
      if (p.category) {
        const slugify = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');
        p.category_id = slugify(p.category);
        await p.save();
      }
    }
    console.log(`Updated ${products.length} products with category_id slugs.`);

    process.exit(0);
  } catch (error) {
    console.error('Error fixing products:', error);
    process.exit(1);
  }
};

fixProducts();
