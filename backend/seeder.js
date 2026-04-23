const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const sampleProducts = [
  {
    name: "Bộ Đặc Trị Tuyến Trùng & Vàng Lá Thối Rễ",
    slug: "bo-dac-tri-tuyen-trung-vang-la-thoi-re",
    category: "Tuyến trùng",
    price: 350000,
    originalPrice: 500000,
    description: "Giải pháp toàn diện giúp phục hồi nhanh bộ rễ sầu riêng, cà phê bị suy yếu do nấm và tuyến trùng tấn công. Cam kết thấy sự thay đổi rõ rệt chỉ sau 10-15 ngày sử dụng.",
    benefits: [
      "Tiêu diệt 99% tuyến trùng và nấm Phytophthora gây hại rễ.",
      "Kích thích ra rễ tơ mới, rễ cám mập mạp.",
      "Giúp lá xanh dày, bung đọt đồng loạt.",
      "An toàn cho đất, không gây tồn dư độc hại."
    ],
    usageInstructions: "Pha 500ml với 200-400 lít nước, tưới đều quanh gốc (từ 5-10 lít/gốc tùy tuổi cây).",
    dosage: "Sử dụng 2-3 lần, mỗi lần cách nhau 7-10 ngày trong giai đoạn phục hồi.",
    images: [],
    stock: 100,
    isFeatured: true,
    inStock: true
  },
  {
    name: "Phân bón NPK Sinh Học",
    slug: "phan-bon-npk-sinh-hoc",
    category: "Phân bón",
    price: 150000,
    originalPrice: 200000,
    description: "Phân bón đa lượng thế hệ mới, tích hợp vi sinh hữu ích giúp cải tạo đất, nuôi dưỡng cây trồng bền vững.",
    benefits: ["Cung cấp dinh dưỡng thiết yếu N-P-K cân đối", "Cải tạo đất tơi xốp giữ ẩm tốt"],
    usageInstructions: "Rải đều quanh gốc, cách gốc 20-30cm.",
    dosage: "Bón 0.5 - 1kg/cây trưởng thành.",
    images: [],
    stock: 120,
    isFeatured: true,
    inStock: true
  },
  {
    name: "Siêu Lân Đỏ Kích Rễ",
    slug: "sieu-lan-do-kich-re",
    category: "Kích rễ",
    price: 220000,
    originalPrice: 300000,
    description: "Siêu Lân Đỏ kích thích ra rễ cực mạnh, chống nghẹt rễ, phục hồi rễ sau khi ngập úng hoặc bị bệnh.",
    benefits: ["Ra rễ tơ cực mạnh trong 7-10 ngày", "Phục hồi cây suy yếu nhanh chóng"],
    usageInstructions: "Pha loãng tưới gốc.",
    dosage: "20ml pha với 16 lít nước.",
    images: [],
    stock: 45,
    isFeatured: true,
    inStock: true
  },
  {
    name: "Thuốc Trị Nhện Đỏ",
    slug: "thuoc-tri-nhen-do",
    category: "Thuốc trừ sâu",
    price: 180000,
    originalPrice: 250000,
    description: "Đặc trị nhện đỏ, rệp sáp, sâu đục thân an toàn cho cây và môi trường.",
    benefits: ["Hiệu lực kéo dài 14-21 ngày", "Không gây cháy lá, an toàn khi phun"],
    usageInstructions: "Phun đều ướt lá hai mặt.",
    dosage: "1 chai pha 200 lít nước.",
    images: [],
    stock: 80,
    isFeatured: false,
    inStock: true
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
