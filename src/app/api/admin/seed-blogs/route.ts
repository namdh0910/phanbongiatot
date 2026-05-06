import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET() {
  try {
    await dbConnect();

    const blogs = [
      {
        title: "Sầu Riêng Vàng Lá Mùa Mưa: 5 Bước Cứu Vườn Trước Khi Quá Muộn",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg",
        content: `
<h2>1. Dấu hiệu "báo động đỏ" của sầu riêng vàng lá mùa mưa</h2>
<p>Mùa mưa là điều kiện lý tưởng cho nấm bệnh phát triển. Bà con cần đi thăm vườn mỗi ngày và kiểm tra ngay nếu thấy các dấu hiệu: Lá biến màu vàng nhạt từ lá già lan dần lên ngọn, rễ tơ thối đen, vỏ rễ dễ tuột.</p>

<h2>2. Tại sao sầu riêng lại bị vàng lá vào mùa mưa?</h2>
<ul>
  <li>Ngập úng và nghẹt rễ: Rễ không thể hô hấp dẫn đến chết ngạt.</li>
  <li>Nấm bệnh tấn công: Phytophthora và Fusarium phá hoại.</li>
  <li>Trôi phân và hạ pH: Làm cây không hấp thụ được dinh dưỡng.</li>
</ul>

<h2>3. Giải pháp 5 bước cứu vườn dứt điểm</h2>
<p><strong>Bước 1:</strong> Khơi rãnh thoát nước ngay lập tức.<br>
<strong>Bước 2:</strong> Dọn dẹp vệ sinh vùng gốc.<br>
<strong>Bước 3:</strong> Sát khuẩn rễ và diệt nấm (Dùng Phytopin).<br>
<strong>Bước 4:</strong> Kích rễ tơ và nâng pH đất (Dùng Humic K-Max).<br>
<strong>Bước 5:</strong> Phun dưỡng lá phục hồi (Amino Plus).</p>

<h2>4. Những sai lầm bà con hay mắc phải</h2>
<p>Thấy vàng lá là bón thêm Đạm làm cháy rễ nặng hơn. Sử dụng thuốc hóa học quá nặng diệt luôn hệ vi sinh có lợi.</p>

<p><em>Liên hệ Kỹ sư để nhận giải pháp riêng: 0773.440.966</em></p>
        `,
        isPublished: true,
        seoDescription: "Vườn sầu riêng bị vàng lá mùa mưa? Khám phá 5 bước cứu vườn thực chiến giúp phục hồi rễ nhanh chóng.",
        hashtags: ["sau-rieng", "vang-la-mua-mua", "ky-thuat-nong-nghiep"]
      },
      {
        title: "Tuyến Trùng Sầu Riêng: Kẻ Thù Thầm Lặng Giết Chết Vườn Từ Bên Trong",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989048/phanbongiatot/jpjgjjvfg7pglnnh0a1a.jpg",
        content: `
          <h2>1. Tuyến trùng sầu riêng là gì?</h2>
          <p>Tuyến trùng là loài giun tròn siêu nhỏ chui vào rễ hút nhựa và đẻ trứng, tạo vết thương cho nấm bệnh tấn công.</p>
          <p>Tuyến trùng rễ là "kẻ giết người thầm lặng". Nếu không xử lý kịp thời, cả vườn sầu riêng sẽ tiêu đời.</p>
          <h2>2. Nhận biết tuyến trùng</h2>
          <p>Đào rễ lên thấy các nốt sần nhỏ như hạt đỗ.</p>
          <h2>3. Quy trình "Tiêu diệt tận gốc - Phục hồi thần tốc"</h2>
          <p>Dùng Nemano tưới 2 lần cách nhau 7 ngày.</p>
        `,
        isPublished: true,
        seoDescription: "Tuyến trùng sầu riêng là gì? Cách nhận biết và tiêu diệt triệt để bằng giải pháp sinh học an toàn.",
        tags: ["sầu riêng", "tuyến trùng", "giải pháp sinh học"],
        hashtags: ["tuyen-trung", "sau-rieng", "phuc-hoi-re"]
      },
      {
        title: "Cà Phê Vàng Lá Mùa Khô Phải Làm Gì? Quy trình 3 Bước Từ Kỹ Sư",
        slug: "ca-phe-vang-la-mua-kho",
        category: "cam-nang-ky-thuat",
        coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80",
        excerpt: "Cây cà phê bị vàng lá mùa khô? Tìm hiểu nguyên nhân và áp dụng ngay quy trình 3 bước giữ ẩm và kích rễ hiệu quả.",
        content: `
          <p>Mùa khô ở Tây Nguyên vô cùng khắc nghiệt. Cà phê cần một chế độ chăm sóc đặc biệt để không bị suy kiệt.</p>
          <h2>1. Nguyên nhân vàng lá</h2>
          <p>Thiếu nước và rễ bị nghẹt do đất quá cứng.</p>
          <h2>2. Quy trình 3 bước cứu vườn</h2>
          <p><strong>B1:</strong> Tưới đẫm nước vào gốc.</p>
          <p><strong>B2:</strong> Bón Humic K-Max để giữ ẩm.</p>
          <p><strong>B3:</strong> Phun phân bón lá sinh học.</p>
          <p><em>💬 Nhắn Zalo ngay để nhận giải pháp: 0773.440.966</em></p>
        `,
        isPublished: true,
        seoDescription: "Cây cà phê bị vàng lá mùa khô? Tìm hiểu nguyên nhân và áp dụng ngay quy trình 3 bước giữ ẩm và kích rễ hiệu quả.",
        hashtags: ["ca-phe", "vang-la-mua-kho", "humic"]
      },
      {
        title: "Phân Biệt Tiêu Chết Nhanh và Chết Chậm: Xử Lý Đúng Bệnh, Không Mất Tiền Oan",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg",
        content: `
          <p>Chào bà con, hôm nay kỹ sư sẽ hướng dẫn cách cứu vườn sầu riêng bị vàng lá thối rễ chỉ trong 7 ngày bằng phương pháp sinh học an toàn.</p>
          <h2>1. Nguyên nhân gây bệnh</h2>
          <p>Nấm Phytophthora tấn công khi đất quá ẩm và thiếu oxy.</p>
          <h2>2. Quy trình xử lý</h2>
          <p>Dùng bộ đôi Phytopin và Humic K-Max.</p>
          <h2>3. Giải pháp 5 bước cứu vườn dứt điểm</h2>
          <p>Bao gồm: Thoát nước, Sát khuẩn, Kích rễ, Dưỡng lá và Bón phân hữu cơ.</p>
          <p><em>Liên hệ Kỹ sư để nhận giải pháp riêng: 0773.440.966</em></p>
        `,
        isPublished: true,
        seoDescription: "Phân biệt chính xác bệnh chết nhanh và chết chậm trên cây hồ tiêu để xử lý đúng bệnh.",
        hashtags: ["ho-tieu", "chet-nhanh-chet-cham", "benh-cay-trong"]
      },
      {
        title: "Kích Rễ Đúng Cách: Bí Quyết Để Cây Hấp Thụ Phân Bón Hiệu Quả Gấp 3 Lần",
        slug: "kich-re-cay-trong-dung-cach",
        category: "Mỗi chất - Một vấn đề",
        coverImage: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989048/phanbongiatot/jpjgjjvfg7pglnnh0a1a.jpg",
        content: `
<h2>1. Tại sao phải kích rễ định kỳ?</h2>
<p>Rễ tơ thường xuyên bị tổn thương bởi nấm bệnh và môi trường. Kích rễ giúp cây luôn có bộ máy hấp thụ mạnh khỏe.</p>

<h2>2. Bí quyết từ Kỹ sư</h2>
<ul>
  <li>Nâng pH đất trước khi kích rễ.</li>
  <li>Bổ sung Humic K-Max để cải tạo đất và kích rễ.</li>
  <li>Kết hợp Fulvic để tăng tốc độ hấp thụ dinh dưỡng.</li>
</ul>

<p><em>Hỏi giá bộ kích rễ ngay: 0773.440.966</em></p>
        `,
        isPublished: true,
        seoDescription: "Hướng dẫn cách kích rễ cây trồng hiệu quả, an toàn bằng Humic, Fulvic giúp tối ưu phân bón.",
        hashtags: ["kich-re", "nong-nghiep-sinh-hoc", "humic-kmax"]
      },
      {
        title: "Sầu Riêng Vàng Lá Thối Rễ: Kỹ Sư Chỉ Đúng Cách Cứu Vườn Trong 7 Ngày",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg",
        content: `
          <p>Sầu riêng bị vàng lá thối rễ là cơn ác mộng của nhà nông. Nhưng với kinh nghiệm 10 năm thực chiến, chúng tôi khẳng định có thể cứu vườn nếu xử lý đúng cách.</p>
          <h2>1. Nhận biết sớm dấu hiệu</h2>
          <p>Lá vàng nhẹ, rễ tơ bị thối đen, cây chậm phát triển.</p>
          <h2>2. Giải pháp xử lý 3 bước: Cứu vườn trong 7 ngày</h2>
          <p><strong>Bước 1:</strong> Sát khuẩn rễ bằng Phytopin.</p>
          <p><strong>Bước 2:</strong> Tiêu diệt tuyến trùng bằng Nemano.</p>
          <p><strong>Bước 3:</strong> Kích rễ hữu cơ bằng Humic K-Max.</p>
          <p><em>Chụp ảnh vườn gửi Zalo Kỹ sư 0773.440.966 để nhận giải pháp riêng.</em></p>
        `,
        isPublished: true,
        seoDescription: "Kỹ sư 10 năm kinh nghiệm chỉ cách trị sầu riêng vàng lá thối rễ hiệu quả trong 7 ngày bằng quy trình sinh học.",
        hashtags: ["sau-rieng", "vang-la-thoi-re", "phuc-hoi-vuon"]
      }
    ];

    for (const blogData of blogs) {
      await Blog.findOneAndUpdate(
        { title: blogData.title },
        blogData,
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ message: 'Successfully seeded 5 blogs' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
