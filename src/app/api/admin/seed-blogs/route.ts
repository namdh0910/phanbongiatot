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
        coverImage: "/images/blog/sau-rieng-vang-la-mua-mua.png",
        excerpt: "Mùa mưa là ác mộng của sầu riêng với bệnh vàng lá thối rễ. Kỹ sư chỉ cách cứu vườn dứt điểm bằng 5 bước sinh học an toàn.",
        content: `
          <p>Mùa mưa tại Tây Nguyên và miền Tây mang theo lượng nước lớn, độ ẩm không khí cao, là điều kiện \"vàng\" để nấm <strong>Phytophthora</strong> và <strong>Fusarium</strong> tấn công bộ rễ sầu riêng. Nếu không xử lý kịp thời, cây sẽ suy kiệt và chết chỉ sau vài tuần.</p>
          <img src=\"/images/blog/sau-rieng-vang-la-mua-mua.png\" alt=\"Vàng lá thối rễ sầu riêng\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />
          <h2>1. Nhận diện dấu hiệu \"Cấp cứu\" cho vườn</h2>
          <p>Bà con cần đi thăm vườn ngay sau các đợt mưa kéo dài. Các dấu hiệu điển hình bao gồm:</p>
          <ul>
            <li><strong>Lá biến màu:</strong> Lá già bắt đầu ngả vàng nhạt từ gân chính sau đó lan rộng. Lá không còn bóng mượt mà trở nên xỉn màu.</li>
            <li><strong>Rễ tơ thối đen:</strong> Khi bới đất vùng quanh tán, rễ tơ không còn màu trắng mà chuyển sang nâu hoặc đen, vỏ rễ dễ tuột khỏi lõi.</li>
          </ul>
        `,
        isPublished: true,
        seoDescription: "Sầu riêng vàng lá mùa mưa? Khám phá quy trình 5 bước cứu vườn thực chiến giúp phục hồi rễ nhanh chóng.",
        hashtags: ["sau-rieng", "vang-la-thoi-re", "phuc-hoi-vuon"]
      },
      {
        title: "Tuyến Trùng Sầu Riêng: Kẻ Giết Người Thầm Lặng Trong Lòng Đất",
        slug: "tuyen-trung-sau-rieng",
        category: "Cẩm nang kỹ thuật",
        coverImage: "/images/blog/tuyen-trung-sau-rieng.png",
        excerpt: "Tuyến trùng tạo vết thương cho nấm Phytophthora xâm nhập. Nếu không trị tận gốc tuyến trùng, bệnh vàng lá sẽ tái phát liên tục.",
        content: `<p>Nếu vàng lá thối rễ là \"triệu chứng\" thì <strong>Tuyến trùng</strong> thường là \"nguyên nhân\" sâu xa.</p>`,
        isPublished: true,
        seoDescription: "Tuyến trùng sầu riêng là gì? Cách nhận biết và tiêu diệt triệt để bằng giải pháp sinh học Nemano.",
        hashtags: ["tuyen-trung", "sau-rieng", "nong-nghiep-sach"]
      },
      {
        title: "Kích Rễ Cây Trồng Đúng Cách: Bí Quyết Để Tối Ưu 100% Phân Bón",
        slug: "kich-re-cay-trong-dung-cach",
        category: "Mỗi chất - Một vấn đề",
        coverImage: "/images/blog/kich-re-cay-trong.png",
        excerpt: "Rễ là cái miệng của cây. Kích rễ đúng thời điểm giúp cây ăn phân khỏe, lớn nhanh và tiết kiệm chi phí cho nhà nông.",
        content: `<p>Bà con thường than phiền: \"Sao tôi bón phân đắt tiền mà cây vẫn không lớn?\". Câu trả lời nằm ở bộ rễ.</p>`,
        isPublished: true,
        seoDescription: "Hướng dẫn cách kích rễ cây trồng hiệu quả bằng Humic và Fulvic.",
        hashtags: ["kich-re", "humic-kmax", "kinh-nghiem-nong-nghiep"]
      },
      {
        title: "Cà Phê Mùa Khô: Tuyệt Chiêu Giữ Vườn Xanh Mượt Dưới Nắng Gắt",
        slug: "ca-phe-vang-la-mua-kho",
        category: "Cẩm nang kỹ thuật",
        coverImage: "/images/blog/ca-phe-mua-kho.png",
        excerpt: "Mùa khô Tây Nguyên rất khắc nghiệt. Kỹ sư hướng dẫn cách tưới nước và bón phân giúp cà phê không bị vàng lá.",
        content: `<p>Mùa khô là thời điểm thử thách nhất với cây cà phê tại Tây Nguyên.</p>`,
        isPublished: true,
        seoDescription: "Bí quyết chăm sóc cà phê mùa khô giúp vườn luôn xanh tốt.",
        hashtags: ["ca-phe", "cham-soc-mua-kho", "phan-bon-gia-tot"]
      },
      {
        title: "Tiêu Chết Nhanh & Chết Chậm: Cách Phân Biệt Để Xử Lý Đúng Bệnh",
        slug: "phan-biet-tieu-chet-nhanh-chet-cham",
        category: "Cẩm nang kỹ thuật",
        coverImage: "/images/blog/tieu-chet-nhanh-cham.png",
        excerpt: "Đừng nhầm lẫn giữa hai loại bệnh này nếu không muốn mất tiền oan. Kỹ sư hướng dẫn cách nhận diện và giải pháp đặc trị.",
        content: `<p>Bệnh chết nhanh và chết chậm trên cây tiêu có thể xóa sổ cả một trang trại.</p>`,
        isPublished: true,
        seoDescription: "Cách phân biệt bệnh chết nhanh và chết chậm trên cây tiêu.",
        hashtags: ["ho-tieu", "benh-chet-nhanh", "ky-thuat-trong-tieu"]
      },
      {
        title: "Phục Hồi Sầu Riêng Sau Thu Hoạch: Quy trình 'Vàng' giúp cây sung sức, mập đọt",
        slug: "phuc-hoi-sau-rieng-sau-thu-hoach",
        category: "Cẩm nang kỹ thuật",
        coverImage: "/images/blog/phuc-hoi-sau-rieng-sau-thu-hoach.png",
        excerpt: "Sau một vụ mùa nuôi trái, cây sầu riêng bị kiệt sức nghiêm trọng. Nếu không phục hồi đúng cách, cây sẽ dễ bị xì mủ và năng suất vụ sau giảm mạnh.",
        content: `
          <p>Sau khi thu hoạch, cây sầu riêng thường rơi vào tình trạng \"mất sức\" trầm trọng. Các chất dinh dưỡng trong thân, lá đã bị rút cạn để nuôi trái. Đây là thời điểm nhạy cảm nhất.</p>
          <img src=\"/images/blog/phuc-hoi-sau-rieng-sau-thu-hoach.png\" alt=\"Phục hồi rễ sầu riêng\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />
          <h2>1. Quy trình phục hồi 3 giai đoạn chuẩn Kỹ sư</h2>
          <p><strong>GĐ 1: Vệ sinh vườn và sát khuẩn.</strong> Tỉa cành, rửa vườn sạch nấm hồng, rong rêu.</p>
          <p><strong>GĐ 2: Kích rễ và cải tạo đất.</strong> Sử dụng <strong>Humic K-Max</strong> để nâng pH đất và kích rễ tơ phát triển mạnh mẽ.</p>
          <p><strong>GĐ 3: Dưỡng đọt phục hồi lá.</strong> Phun <strong>Amino Plus</strong> để đọt non ra đồng loạt, xanh dày.</p>
          <p><em>💬 Chụp ảnh vườn và gửi Zalo ngay để nhận phác đồ phục hồi miễn phí từ Kỹ sư Phân Bón Giá Tốt!</em></p>
        `,
        isPublished: true,
        seoDescription: "Quy trình phục hồi sầu riêng sau thu hoạch chuyên sâu giúp cây sung sức, mập đọt, chuẩn bị cho vụ mùa mới năng suất cao.",
        hashtags: ["phuc-hoi-sau-rieng", "sau-thu-hoach", "humic-kmax", "amino-plus"]
      }
    ];

    await Blog.deleteMany({});
    const seedResults = [];
    for (const blogData of blogs) {
      const blog = await Blog.create(blogData);
      seedResults.push(blog);
    }

    return NextResponse.json({ 
      message: 'Successfully seeded 6 professional blogs with CUSTOM AI IMAGES',
      count: seedResults.length 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
