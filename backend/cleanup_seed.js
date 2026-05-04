const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env from .env
dotenv.config({ path: path.join(__dirname, './.env') });

const User = require('./models/User');
const Product = require('./models/Product');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Find Admin
    const admin = await User.findOne({ role: { $in: ['admin', 'super_admin'] } });
    if (!admin) {
      console.error('No admin user found! Please create an admin first.');
      process.exit(1);
    }
    console.log(`Using admin: ${admin.username} (${admin._id})`);

    // 2. Delete dummy data
    console.log('Deleting dummy products...');
    await Product.deleteMany({});
    
    console.log('Deleting dummy users...');
    await User.deleteMany({ role: { $nin: ['admin', 'super_admin'] } });

    // 3. Insert 5 real products
    const products = [
      {
        name: 'Acti Rooti - Siêu Kích Rễ Cực Mạnh (500ml)',
        slug: 'acti-rooti-sieu-kich-re-cuc-manh',
        category: 'Kích rễ',
        price: 120000,
        originalPrice: 150000,
        description: 'Acti Rooti là chế phẩm kích rễ thế hệ mới, giúp bộ rễ phát triển cực mạnh, giải độc phèn, ngộ độc hữu cơ. Phù hợp cho sầu riêng, cà phê và cây ăn trái.',
        short_desc: 'Kích rễ cực mạnh, phục hồi bộ rễ sau thu hoạch.',
        images: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop'],
        stock: 500,
        soldCount: 0,
        seller: admin._id,
        status: 'approved',
        approval_status: 'approved',
        benefits: ['Kích thích ra rễ tơ cực nhanh', 'Giải độc phèn, ngộ độc hữu cơ', 'Tăng khả năng hấp thụ phân bón'],
        usageInstructions: 'Pha 1L cho 400-600L nước tưới gốc hoặc 800L nước phun lá.',
        dosage: 'Sử dụng định kỳ 7-10 ngày/lần trong giai đoạn kiến thiết cơ bản hoặc sau thu hoạch.'
      },
      {
        name: 'Acti Flora - Ra Hoa Đồng Loạt, Chống Rụng Trái (500ml)',
        slug: 'acti-flora-ra-hoa-dong-loat-chong-rung-trai',
        category: 'Phân bón lá',
        price: 135000,
        originalPrice: 165000,
        description: 'Acti Flora cung cấp Amino Acid và vi lượng giúp cây ra hoa đồng loạt, tăng tỷ lệ đậu trái, chống rụng trái non sinh lý.',
        short_desc: 'Đậu trái cực mạnh, chống rụng trái non.',
        images: ['https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop'],
        stock: 300,
        soldCount: 0,
        seller: admin._id,
        status: 'approved',
        approval_status: 'approved',
        benefits: ['Tăng tỷ lệ thụ phấn', 'Chống rụng bông và trái non', 'Trái lớn nhanh, bóng đẹp'],
        usageInstructions: 'Pha 500ml cho 400L nước phun đều tán lá.',
        dosage: 'Phun giai đoạn trước khi ra hoa và giai đoạn nuôi trái non.'
      },
      {
        name: 'Nemano - Chế Phẩm Sinh Học Đặc Trị Tuyến Trùng (1L)',
        slug: 'nemano-dac-tri-tuyen-trung-sinh-hoc',
        category: 'Tuyến trùng',
        price: 250000,
        originalPrice: 300000,
        description: 'Nemano tiêu diệt tuyến trùng gây hại rễ bằng cơ chế sinh học, bảo vệ bộ rễ khỏi nấm bệnh xâm nhập.',
        short_desc: 'Tiêu diệt tuyến trùng rễ, bảo vệ vườn cây.',
        images: ['https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=800&auto=format&fit=crop'],
        stock: 200,
        soldCount: 0,
        seller: admin._id,
        status: 'approved',
        approval_status: 'approved',
        benefits: ['Diệt tuyến trùng tận gốc', 'Ngừa thối rễ, vàng lá', 'An toàn cho người và môi trường'],
        usageInstructions: 'Pha 1L cho 400L nước tưới đẫm vùng rễ cây.',
        dosage: 'Tưới phòng định kỳ 2-3 lần/năm hoặc khi cây có biểu hiện vàng lá thối rễ.'
      }
    ];

    await Product.insertMany(products);
    console.log('Inserted clean real products successfully!');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
