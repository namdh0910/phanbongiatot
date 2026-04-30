const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const Settings = require('../models/Settings');

const updateSettings = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const newSettings = {
      address: "Kho hàng: TP. Buôn Ma Thuột, Tỉnh Đắk Lắk",
      footerAddress: "Kho hàng: TP. Buôn Ma Thuột, Tỉnh Đắk Lắk",
      siteName: "Phân Bón Giá Tốt",
      email: "contact@phanbongiatot.com",
      hotline: "0773.440.966",
      phone: "0773.440.966",
      zalo: "0773440966",
      heroTitle: "Năng Suất Vượt Trội Chi Phí Tối Ưu",
      heroSubtitle: "Hàng ngàn nhà nông đã tin dùng bộ giải pháp của chúng tôi."
    };

    const updated = await Settings.findOneAndUpdate({}, newSettings, { new: true, upsert: true });
    
    console.log('Successfully updated settings in Database:');
    console.log(JSON.stringify(updated, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error updating settings:', error);
    process.exit(1);
  }
};

updateSettings();
