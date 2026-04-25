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
    category: "Kích rễ",
    price: 680000,
    originalPrice: 850000,
    description: "Acti Rooti là giải pháp hàng đầu để phục hồi bộ rễ sầu riêng sau thu hoạch hoặc sau khi bị bệnh. Giúp rễ tơ ra mạnh, cây xanh lá, bung đọt nhanh.",
    crops: ["Sầu riêng", "Cà phê", "Tiêu", "Cây ăn trái"],
    images: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"],
    status: 'approved',
    stock: 500,
    isFeatured: true
  },
  {
    name: "Nemano - Đặc Trị Tuyến Trùng Bảo Vễ Rễ",
    slug: "nemano-9989",
    category: "Tuyến trùng",
    price: 255000,
    originalPrice: 320000,
    description: "Nemano giúp tiêu diệt tuyến trùng gây hại rễ, ngăn ngừa vàng lá thối rễ trên cây ăn trái và cây công nghiệp. Sản phẩm sinh học an toàn cho đất.",
    crops: ["Sầu riêng", "Tiêu", "Cà phê", "Thanh long"],
    images: ["https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop"],
    status: 'approved',
    stock: 350,
    isFeatured: true
  },
  {
    name: "Amino Acid - Vọt Đọt, Xanh Lá Cấp Tốc",
    slug: "amino-acid-7822",
    category: "Phân bón",
    price: 99000,
    originalPrice: 150000,
    description: "Amino Acid giúp cây hấp thụ dinh dưỡng cực nhanh qua lá, giúp vọt đọt, xanh lá, dày lá chỉ sau vài ngày sử dụng.",
    crops: ["Rau màu", "Lúa", "Cây ăn trái", "Sầu riêng"],
    images: ["https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=800&auto=format&fit=crop"],
    status: 'approved',
    stock: 1000,
    isFeatured: true
  },
  {
    name: "Combo Phục Hồi Cây Suy - Sau Thu Hoạch",
    slug: "combo-phuc-hoi-sau-thu-hoach",
    category: "Combo tiết kiệm",
    price: 890000,
    originalPrice: 1200000,
    description: "Bộ giải pháp toàn diện bao gồm Kích rễ, Amino và Vi lượng giúp cây sầu riêng, cà phê hồi phục thần tốc sau mùa vụ.",
    crops: ["Sầu riêng", "Cà phê", "Tiêu"],
    images: ["https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop"],
    status: 'approved',
    stock: 200,
    isFeatured: true
  },
  {
    name: "Thuốc Trừ Sâu Sinh Học - Diệt rệp sáp, nhện đỏ",
    slug: "thuoc-tru-sau-sinh-hoc-diet-rep-sap",
    category: "Thuốc trừ sâu",
    price: 195000,
    originalPrice: 280000,
    description: "Tiêu diệt rệp sáp, nhện đỏ, bọ trĩ bằng cơ chế nấm ký sinh. Không gây nóng cây, không độc hại cho người phun.",
    crops: ["Cây ăn trái", "Rau màu", "Sầu riêng"],
    images: ["https://images.unsplash.com/photo-1591857177580-dc82b9ac4e17?q=80&w=800&auto=format&fit=crop"],
    status: 'approved',
    stock: 400,
    isFeatured: false
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.error('Admin user not found. Please create an admin user first.');
      process.exit(1);
    }

    // Add seller ID to each product
    const productsWithSeller = products.map(p => ({
      ...p,
      seller: admin._id
    }));

    // Clear existing products
    // await Product.deleteMany(); // User didn't ask to delete, but usually good for seeding. 
    // Let's just insert many and skip if slug exists? 
    // Or just insert and hope for the best. The prompt says "Tạo script seed data" and "Chạy script seed".

    for (const p of productsWithSeller) {
        await Product.findOneAndUpdate(
            { slug: p.slug },
            p,
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
