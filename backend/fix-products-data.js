const mongoose = require('mongoose');
const Product = require('./models/Product');
const Combo = require('./models/Combo');
const FlashSale = require('./models/FlashSale');
require('dotenv').config({ path: './.env' });

const fixData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Fix Products
    console.log('Fixing Products...');
    await Product.updateMany(
      { $or: [{ status: { $exists: false } }, { status: null }, { approval_status: { $exists: false } }, { approval_status: null }] },
      { $set: { status: 'approved', approval_status: 'approved' } }
    );
    
    // Ensure stock > 0
    await Product.updateMany(
      { $or: [{ stock: { $exists: false } }, { stock: { $lte: 0 } }] },
      { $set: { stock: 100 } }
    );

    // Ensure category_id slugs
    const products = await Product.find({});
    for (const p of products) {
      if (p.category) {
        const slugify = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');
        p.category_id = slugify(p.category);
        p.is_featured = true;
        p.isFeatured = true;
        await p.save();
      }
    }
    console.log(`Updated ${products.length} products with stock and slugs.`);

    // 2. Create sample Flash Sales if none active
    const activeFlash = await FlashSale.countDocuments({ endAt: { $gt: new Date() } });
    if (activeFlash === 0) {
      const topProducts = await Product.find({ status: 'approved' }).limit(2);
      for (const p of topProducts) {
        await FlashSale.create({
          product: p._id,
          salePrice: p.price * 0.8,
          startAt: new Date(),
          endAt: new Date(Date.now() + 86400000), // 24h
          isActive: true
        });
      }
      console.log('Created 2 sample Flash Sales.');
    }

    // 3. Create sample Combos if none featured
    const featuredCombos = await Combo.countDocuments({ isFeatured: true });
    if (featuredCombos === 0) {
      const comboProducts = await Product.find({ status: 'approved' }).skip(2).limit(2);
      if (comboProducts.length >= 2) {
        await Combo.create({
          name: 'Combo Kích Rễ & Phân Bón',
          slug: 'combo-kich-re-phan-bon-' + Date.now(),
          originalPrice: comboProducts[0].price + comboProducts[1].price,
          comboPrice: (comboProducts[0].price + comboProducts[1].price) * 0.85,
          image: comboProducts[0].images?.[0] || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
          items: comboProducts.map(p => ({ product: p._id, name: p.name, quantity: 1 })),
          status: 'published',
          isFeatured: true
        });
        console.log('Created 1 sample Combo.');
      }
    }

    console.log('Data fix and sample generation completed.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

fixData();
