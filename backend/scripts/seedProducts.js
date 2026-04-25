const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const products = [
  {
    name: "Phân bón Acti Rooti - Phục hồi rễ sầu riêng",
    slug: "rooti-4339",
    category: "Phân bón",
    price: 180000,
    originalPrice: 250000,
    description: "Acti Rooti là giải pháp hàng đầu để phục hồi bộ rễ sầu riêng sau thu hoạch hoặc sau khi bị bệnh. Giúp rễ tơ ra mạnh, cây xanh lá, bung đọt nhanh.",
    images: ["https://res.cloudinary.com/dztidbkhv/image/upload/v1714022400/phanbongiatot/rooti.png"],
    status: 'approved',
    stock: 500,
    isFeatured: true
  },
  {
    name: "Phân bón Nemano - Phòng ngừa tuyến trùng",
    slug: "phan-bon-phong-ngua-tuyen-trung-nemano-9989",
    category: "Phân bón",
    price: 180000,
    originalPrice: 240000,
    description: "Nemano giúp tiêu diệt tuyến trùng gây hại rễ, ngăn ngừa vàng lá thối rễ trên cây ăn trái và cây công nghiệp. Sản phẩm sinh học an toàn cho đất.",
    images: ["https://res.cloudinary.com/dztidbkhv/image/upload/v1714022400/phanbongiatot/nemano.png"],
    status: 'approved',
    stock: 350,
    isFeatured: true
  },
  {
    name: "Phân bón NPK Sinh Học - Cải tạo đất",
    slug: "phan-bon-npk-sinh-hoc",
    category: "Phân bón",
    price: 150000,
    originalPrice: 200000,
    description: "Cung cấp dinh dưỡng Đa-Trung-Vi lượng cân đối cho cây trồng. Giúp đất tơi xốp, tăng cường hệ vi sinh vật có ích.",
    images: ["https://res.cloudinary.com/dztidbkhv/image/upload/v1714022400/phanbongiatot/npk.png"],
    status: 'approved',
    stock: 1000,
    isFeatured: true
  },
  {
    name: "Siêu Lân Đỏ - Kích rễ cực mạnh",
    slug: "sieu-lan-do-kich-re",
    category: "Kích rễ",
    price: 220000,
    originalPrice: 320000,
    description: "Kích thích bộ rễ phát triển thần tốc, chống nghẹt rễ, giải độc phèn, ngộ độc hữu cơ cho lúa và cây ăn trái.",
    images: ["https://res.cloudinary.com/dztidbkhv/image/upload/v1714022400/phanbongiatot/sieu-lan-do.png"],
    status: 'approved',
    stock: 200,
    isFeatured: true
  },
  {
    name: "Đặc trị Tuyến Trùng Nemano Thế Hệ Mới",
    slug: "dac-tri-tuyen-trung-nemano",
    category: "Tuyến trùng",
    price: 350000,
    originalPrice: 450000,
    description: "Phác đồ đặc trị tuyến trùng rễ chuyên sâu, tiêu diệt cả trứng và tuyến trùng trưởng thành. Hiệu quả kéo dài.",
    images: ["https://res.cloudinary.com/dztidbkhv/image/upload/v1714022400/phanbongiatot/tuyen-trung.png"],
    status: 'approved',
    stock: 150,
    isFeatured: true
  },
  {
    name: "Thuốc Trừ Sâu Sinh Học - Diệt rệp sáp, nhện đỏ",
    slug: "thuoc-tru-sau-sinh-hoc-diet-rep-sap",
    category: "Thuốc trừ sâu",
    price: 195000,
    originalPrice: 280000,
    description: "Tiêu diệt rệp sáp, nhện đỏ, bọ trĩ bằng cơ chế nấm ký sinh. Không gây nóng cây, không độc hại cho người phun.",
    images: ["https://res.cloudinary.com/dztidbkhv/image/upload/v1714022400/phanbongiatot/sau-sinh-hoc.png"],
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
