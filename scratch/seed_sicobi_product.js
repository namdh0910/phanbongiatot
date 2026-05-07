
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://ktlds:ktlds123@cluster0.mongodb.net/phanbongiatot";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  specifications: [{
    key: String,
    value: String
  }],
  benefits: [String],
  usage: String,
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const slug = "phan-bon-huu-co-sicobi-20-om-fuvico";
    await Product.deleteOne({ slug });

    const newProduct = new Product({
      name: "Phân bón hữu cơ SICOBI 20% OM - FUVICO",
      slug: slug,
      price: 0, // Liên hệ để có giá tốt nhất
      category: "Phân bón hữu cơ",
      images: [
        "/images/products/photo_6332526088357088944_y.jpg",
        "/images/products/photo_6332526088357088945_y.jpg"
      ],
      description: "Phân bón hữu cơ SICOBI 20% OM là dòng sản phẩm cao cấp từ FUVICO, được sản xuất từ nguồn nguyên liệu hữu cơ thực phẩm tái chế, qua quy trình 15 bước nghiêm ngặt. Sản phẩm giúp cải tạo đất tơi xốp, hoạt hóa dinh dưỡng và tăng cường sức khỏe cây trồng một cách kinh ngạc.",
      specifications: [
        { key: "Chất hữu cơ (OM)", value: "20%" },
        { key: "Tỷ lệ C/N", value: "12" },
        { key: "pH (H2O)", value: "5" },
        { key: "Độ ẩm", value: "30%" },
        { key: "Nguồn gốc", value: "Hữu cơ thực phẩm tinh chế" },
        { key: "Trọng lượng", value: "50kg/bao" }
      ],
      benefits: [
        "Sạch 99,99%, không chứa kim loại nặng (Asen, Chì, Thủy ngân)",
        "Tăng cường độ tơi xốp cho đất chai cứng",
        "Hoạt hóa các nguồn dinh dưỡng khó tiêu trong đất",
        "Kích thích hệ vi sinh vật có lợi phát triển bùng phát",
        "An toàn tuyệt đối cho người sử dụng và cây trồng"
      ],
      usage: "Cây ăn trái (Sầu riêng, Bơ...): 900-1200 kg/ha/lần. Cây công nghiệp (Cà phê, Tiêu...): 850-1100 kg/ha/lần. Rau màu: 700-900 kg/ha/lần.",
      isFeatured: true
    });

    await newProduct.save();
    console.log("Product SICOBI seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding product:", error);
    process.exit(1);
  }
}

seed();
