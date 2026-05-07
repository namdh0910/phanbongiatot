
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';

export async function GET() {
  try {
    await dbConnect();

    const slug = "phan-bon-huu-co-sicobi-20-om-fuvico";
    await Product.deleteOne({ slug });

    await Product.create({
      name: "Phân bón hữu cơ SICOBI 20% OM - FUVICO",
      slug: slug,
      price: 0, 
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

    return NextResponse.json({ message: "✅ Đã thêm sản phẩm SICOBI vào danh mục thành công! Anh hãy vào trang Sản phẩm để kiểm tra nhé." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
