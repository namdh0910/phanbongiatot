import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET() {
  try {
    await dbConnect();

    const blogs = [
      {
        title: "Sầu Riêng Vàng Lá Mùa Mưa: Quy trình 5 Bước Cứu Vườn Tận Gốc",
        slug: "sau-rieng-vang-la-mua-mua",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80",
        excerpt: "Mùa mưa là ác mộng của sầu riêng với bệnh vàng lá thối rễ. Kỹ sư chỉ cách cứu vườn dứt điểm bằng 5 bước sinh học an toàn.",
        content: `
          <p>Mùa mưa tại Tây Nguyên và miền Tây mang theo lượng nước lớn, độ ẩm không khí cao, là điều kiện \"vàng\" để nấm <strong>Phytophthora</strong> và <strong>Fusarium</strong> tấn công bộ rễ sầu riêng. Nếu không xử lý kịp thời, cây sẽ suy kiệt và chết chỉ sau vài tuần.</p>

          <img src=\"https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80\" alt=\"Vàng lá thối rễ sầu riêng\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />

          <h2>1. Nhận diện dấu hiệu \"Cấp cứu\" cho vườn</h2>
          <p>Bà con cần đi thăm vườn ngay sau các đợt mưa kéo dài. Các dấu hiệu điển hình bao gồm:</p>
          <ul>
            <li><strong>Lá biến màu:</strong> Lá già bắt đầu ngả vàng nhạt từ gân chính sau đó lan rộng. Lá không còn bóng mượt mà trở nên xỉn màu.</li>
            <li><strong>Rễ tơ thối đen:</strong> Khi bới đất vùng quanh tán, rễ tơ không còn màu trắng mà chuyển sang nâu hoặc đen, vỏ rễ dễ tuột khỏi lõi.</li>
          </ul>

          <h2>2. Tại sao mưa lại gây vàng lá?</h2>
          <p>Có 3 nguyên nhân chính khiến sầu riêng \"đổ bệnh\" mùa này:</p>
          <ul>
            <li><strong>Ngập úng cục bộ:</strong> Đất thiếu oxy khiến rễ bị ngạt, không thể hấp thụ dinh dưỡng.</li>
            <li><strong>Hạ pH đất:</strong> Nước mưa có tính axit làm pH đất giảm mạnh (dưới 4.5), tạo môi trường cực tốt cho nấm hại.</li>
          </ul>

          <img src=\"https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80\" alt=\"Bộ rễ khỏe mạnh\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />

          <h2>3. Quy trình 5 bước cứu vườn dứt điểm</h2>
          <p>Để cứu vườn thành công, bà con cần thực hiện đúng trình tự sau:</p>
          
          <p><strong>Bước 1: Khơi rãnh thoát nước.</strong> Đây là việc sống còn. Tuyệt đối không để nước đọng vùng gốc.</p>
          <p><strong>Bước 2: Vệ sinh vùng gốc.</strong> Dọn sạch rác, cỏ dại quanh gốc để tạo sự thông thoáng.</p>
          <p><strong>Bước 3: Sát khuẩn rễ.</strong> Sử dụng hoạt chất sinh học (như Phytopin) để diệt nấm hại.</p>
          <p><strong>Bước 4: Nâng pH và kích rễ.</strong> Bón Humic K-Max để nâng pH đất lên mức 5.5 - 6.5.</p>
          <p><strong>Bước 5: Phun dưỡng lá phục hồi.</strong> Phun Amino Plus lên lá để cung cấp dinh dưỡng tức thời.</p>

          <p><em>💬 Chụp ảnh lá và gửi qua Zalo cho Kỹ sư Phân Bón Giá Tốt để được chẩn đoán miễn phí!</em></p>
        `,
        isPublished: true,
        seoDescription: "Sầu riêng vàng lá mùa mưa? Khám phá quy trình 5 bước cứu vườn thực chiến giúp phục hồi rễ nhanh chóng chỉ sau 7 ngày.",
        hashtags: ["sau-rieng", "vang-la-thoi-re", "phuc-hoi-vuon"]
      },
      {
        title: "Tuyến Trùng Sầu Riêng: Kẻ Giết Người Thầm Lặng Trong Lòng Đất",
        slug: "tuyen-trung-sau-rieng",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://images.unsplash.com/photo-1621460245131-03617300302b?auto=format&fit=crop&q=80",
        excerpt: "Tuyến trùng tạo vết thương cho nấm Phytophthora xâm nhập. Nếu không trị tận gốc tuyến trùng, bệnh vàng lá sẽ tái phát liên tục.",
        content: `
          <p>Nếu vàng lá thối rễ là \"triệu chứng\" thì <strong>Tuyến trùng</strong> thường là \"nguyên nhân\" sâu xa. Đây là những sinh vật siêu hiển vi chui vào rễ, tạo ra các khối u sần.</p>

          <img src=\"https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80\" alt=\"Rễ bị tuyến trùng sưng tấy\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />

          <h2>1. Dấu hiệu nhận biết Tuyến trùng</h2>
          <ul>
            <li><strong>Cây còi cọc:</strong> Dù bón phân nhiều cây vẫn không lớn.</li>
            <li><strong>U sần ở rễ:</strong> Đào rễ tơ lên thấy các nốt sưng to.</li>
          </ul>

          <h2>2. Giải pháp tiêu diệt Tuyến trùng sinh học</h2>
          <p>Chúng tôi khuyên dùng <strong>Nemano</strong> - giải pháp vi sinh tiêu diệt trứng tuyến trùng cực mạnh nhưng an toàn cho đất.</p>
        `,
        isPublished: true,
        seoDescription: "Tuyến trùng sầu riêng là gì? Cách nhận biết và tiêu diệt triệt để bằng giải pháp sinh học Nemano.",
        hashtags: ["tuyen-trung", "sau-rieng", "nong-nghiep-sach"]
      },
      {
        title: "Kích Rễ Cây Trồng Đúng Cách: Bí Quyết Để Tối Ưu 100% Phân Bón",
        slug: "kich-re-cay-trong-dung-cach",
        category: "Mỗi chất - Một vấn đề",
        coverImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80",
        excerpt: "Rễ là cái miệng của cây. Kích rễ đúng thời điểm giúp cây ăn phân khỏe, lớn nhanh và tiết kiệm chi phí cho nhà nông.",
        content: `
          <p>Bà con thường than phiền: \"Sao tôi bón phân đắt tiền mà cây vẫn không lớn?\". Câu trả lời nằm ở bộ rễ.</p>

          <img src=\"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80\" alt=\"Kích rễ hữu cơ\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />

          <h2>1. Khi nào cần kích rễ?</h2>
          <ul>
            <li><strong>Cây mới trồng:</strong> Giúp bộ rễ bén đất nhanh.</li>
            <li><strong>Sau thu hoạch:</strong> Phục hồi bộ rễ đã bị suy kiệt.</li>
          </ul>

          <h2>2. Giải pháp kích rễ sinh học bền vững</h2>
          <p>Sử dụng <strong>Humic K-Max</strong> kết hợp với <strong>Fulvic</strong> để tạo ra mạng lưới rễ tơ dày đặc.</p>
        `,
        isPublished: true,
        seoDescription: "Hướng dẫn cách kích rễ cây trồng hiệu quả bằng Humic và Fulvic, giúp tối ưu hóa lượng phân bón.",
        hashtags: ["kich-re", "humic-kmax", "kinh-nghiem-nong-nghiep"]
      },
      {
        title: "Cà Phê Mùa Khô: Tuyệt Chiêu Giữ Vườn Xanh Mượt Dưới Nắng Gắt",
        slug: "ca-phe-vang-la-mua-kho",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://images.unsplash.com/photo-1501333193976-189f315a6b0c?auto=format&fit=crop&q=80",
        excerpt: "Mùa khô Tây Nguyên rất khắc nghiệt. Kỹ sư hướng dẫn cách tưới nước và bón phân giúp cà phê không bị vàng lá, rụng trái.",
        content: `
          <p>Mùa khô là thời điểm thử thách nhất với cây cà phê tại Tây Nguyên. Nếu không có chiến lược chăm sóc đúng, cây sẽ bị \"cháy lá\".</p>

          <img src=\"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80\" alt=\"Vườn cà phê mùa khô\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />

          <h2>1. Giải pháp 3 tác động cho Cà phê</h2>
          <p><strong>B1: Quản lý nước thông minh.</strong> Chia nhỏ đợt tưới.</p>
          <p><strong>B2: Giữ ẩm bằng chất hữu cơ.</strong> Bón Humic K-Max giúp đất giữ nước lâu hơn 30%.</p>
          <p><strong>B3: Dinh dưỡng qua lá.</strong> Phun Amino Plus định kỳ để lá giữ được độ xanh đậm.</p>
        `,
        isPublished: true,
        seoDescription: "Bí quyết chăm sóc cà phê mùa khô giúp vườn luôn xanh tốt, hạn chế rụng trái.",
        hashtags: ["ca-phe", "cham-soc-mua-kho", "phan-bon-gia-tot"]
      },
      {
        title: "Tiêu Chết Nhanh & Chết Chậm: Cách Phân Biệt Để Xử Lý Đúng Bệnh",
        slug: "phan-biet-tieu-chet-nhanh-chet-cham",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://images.unsplash.com/photo-1596431718870-7634f19894e4?auto=format&fit=crop&q=80",
        excerpt: "Đừng nhầm lẫn giữa hai loại bệnh này nếu không muốn mất tiền oan. Kỹ sư hướng dẫn cách nhận diện và giải pháp đặc trị.",
        content: `
          <p>Bệnh chết nhanh và chết chậm trên cây tiêu có thể xóa sổ cả một trang trại chỉ trong thời gian ngắn. Hiểu đúng để trị đúng là chìa khóa thành công.</p>

          <img src=\"https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80\" alt=\"Vườn tiêu xanh tốt\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />

          <h2>1. Giải pháp đặc trị</h2>
          <p>Đối với <strong>Chết nhanh</strong>: Cần sát khuẩn cực mạnh toàn vườn bằng Phytopin.</p>
          <p>Đối với <strong>Chết chậm</strong>: Tập trung tiêu diệt tuyến trùng bằng Nemano.</p>
        `,
        isPublished: true,
        seoDescription: "Cách phân biệt bệnh chết nhanh và chết chậm trên cây tiêu giúp nhà nông điều trị chính xác.",
        hashtags: ["ho-tieu", "benh-chet-nhanh", "ky-thuat-trong-tieu"]
      }
    ];

    // 1. Xóa sạch bài cũ
    await Blog.deleteMany({});

    // 2. Tạo bài mới
    const seedResults = [];
    for (const blogData of blogs) {
      const blog = await Blog.create(blogData);
      seedResults.push(blog);
    }

    return NextResponse.json({ 
      message: 'Successfully seeded with professional images',
      count: seedResults.length 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
