const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Coupon = require('./models/Coupon');

dotenv.config({ path: './.env' });

const seedCoupon = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env');
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const code = 'CHAOXUAN2026';
    const existing = await Coupon.findOne({ code });

    if (existing) {
      console.log('Coupon already exists');
    } else {
      await Coupon.create({
        code,
        discountType: 'percentage',
        discountValue: 10,
        minOrderAmount: 0,
        expiryDate: new Date('2026-12-31'),
        maxUsage: 1000,
        isActive: true
      });
      console.log('Created CHAOXUAN2026 coupon successfully');
    }
    
    process.exit();
  } catch (error) {
    console.error('Error seeding coupon:', error);
    process.exit(1);
  }
};

seedCoupon();
