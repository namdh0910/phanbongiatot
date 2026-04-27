const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const products = [
  {
    name: "Acti Rooti - Siêu Kích Rễ Cực Mạnh (Can 5L)",
    slug: "rooti-4339",
    category_id: "kich-re",
    price: 680000,
    original_price: 850000,
    description: "Acti Rooti là giải pháp hàng đầu để phục hồi bộ rễ sầu riêng sau thu hoạch hoặc sau khi bị bệnh. Giúp rễ tơ ra mạnh, cây xanh lá, bung đọt nhanh.",
    crops: ["Sầu riêng", "Cà phê", "Tiêu", "Cây ăn trái"],
    crop_types: ["sau-rieng", "ca-phe", "tieu", "cay-an-trai"],
    images: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"],
    status: 'approved',
    approval_status: 'approved',
    stock: 500,
    is_featured: true,
    weight_g: 5000,
    short_desc: "Kích rễ thần tốc cho sầu riêng và cây ăn trái."
  },
  {
    name: "Nemano - Đặc Trị Tuyến Trùng Bảo Vễ Rễ",
    slug: "nemano-9989",
    category_id: "tuyen-trung",
    price: 255000,
    original_price: 320000,
    description: "Nemano giúp tiêu diệt tuyến trùng gây hại rễ, ngăn ngừa vàng lá thối rễ trên cây ăn trái và cây công nghiệp. Sản phẩm sinh học an toàn cho đất.",
    crops: ["Sầu riêng", "Tiêu", "Cà phê", "Thanh long"],
    crop_types: ["sau-rieng", "tieu", "ca-phe", "thanh-long"],
    images: ["https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop"],
    status: 'approved',
    approval_status: 'approved',
    stock: 350,
    is_featured: true,
    weight_g: 1000,
    short_desc: "Diệt tuyến trùng, bảo vệ rễ tơ xanh tốt."
  },
  {
    name: "Combo 01: Phục Hồi & Bảo Vệ Toàn Diện",
    slug: "combo-phuc-hoi-bao-ve",
    category_id: "combo-tiet-kiem",
    price: 420000,
    original_price: 510000,
    description: "Giải pháp 3 trong 1: Kích rễ, ngừa tuyến trùng và bổ sung dinh dưỡng đa lượng. Bao gồm: Rooti, Nemano, NPK Sinh Học.",
    crops: ["Sầu riêng", "Cà phê", "Tiêu"],
    crop_types: ["sau-rieng", "ca-phe", "tieu"],
    images: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800"],
    status: 'approved',
    approval_status: 'approved',
    stock: 100,
    is_featured: true,
    is_combo: true,
    weight_g: 2000,
    short_desc: "Tiết kiệm 90k - Giải pháp toàn diện cho nhà vườn."
  },
  {
    name: "Combo 02: Kích Rễ Cực Mạnh - Bung Đọt Nhanh",
    slug: "combo-kich-re-bung-dot",
    category_id: "combo-tiet-kiem",
    price: 330000,
    original_price: 400000,
    description: "Sự kết hợp hoàn hảo giữa kích rễ sinh học và lân đỏ nồng độ cao. Giúp cây phục hồi thần tốc.",
    crops: ["Sầu riêng", "Cà phê", "Tiêu"],
    crop_types: ["sau-rieng", "ca-phe", "tieu"],
    images: ["https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800"],
    status: 'approved',
    approval_status: 'approved',
    stock: 100,
    is_featured: true,
    is_combo: true,
    weight_g: 1500,
    short_desc: "Tiết kiệm 70k - Kích rễ bung đọt thần tốc."
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // Tìm hoặc tạo Seller thật
    let seller = await User.findOne({ role: 'vendor' });
    if (!seller) {
      // Tìm admin làm fallback
      seller = await User.findOne({ role: 'admin' });
    }

    if (!seller) {
      console.error('No seller or admin found. Please run seedAdmin.js first.');
      process.exit(1);
    }

    console.log(`Using seller: ${seller.username} (${seller.role})`);

    for (const p of products) {
        const productData = {
            ...p,
            seller: seller._id,
            seller_id: seller._id.toString()
        };

        await Product.findOneAndUpdate(
            { slug: p.slug },
            productData,
            { upsert: true, new: true }
        );
    }

    console.log('Products Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
