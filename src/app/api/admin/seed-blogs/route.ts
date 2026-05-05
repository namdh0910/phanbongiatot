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

<h2>3. Phác đồ 5 bước cứu vườn dứt điểm</h2>
<p><strong>Bước 1:</strong> Khơi rãnh thoát nước ngay lập tức.<br>
<strong>Bước 2:</strong> Dọn dẹp vệ sinh vùng gốc.<br>
<strong>Bước 3:</strong> Sát khuẩn rễ và diệt nấm (Dùng Phytopin).<br>
<strong>Bước 4:</strong> Kích rễ tơ và nâng pH đất (Dùng Humic K-Max).<br>
<strong>Bước 5:</strong> Phun dưỡng lá phục hồi (Amino Plus).</p>

<h2>4. Những sai lầm bà con hay mắc phải</h2>
<p>Thấy vàng lá là bón thêm Đạm làm cháy rễ nặng hơn. Sử dụng thuốc hóa học quá nặng diệt luôn hệ vi sinh có lợi.</p>

<p><em>Liên hệ Kỹ sư để nhận phác đồ riêng: 0773.440.966</em></p>
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

<h2>2. Cách tự kiểm tra tại vườn chỉ trong 2 phút</h2>
<p>Bới nhẹ rễ tơ ở rìa tán, nếu thấy rễ sưng u nang như hạt bắp hoặc sần sùi thì chính xác là bị tuyến trùng.</p>

<h2>3. Phác đồ "Tiêu diệt tận gốc - Phục hồi thần tốc"</h2>
<ol>
  <li>Tiêu diệt tuyến trùng và trứng bằng Nemano.</li>
  <li>Sát khuẩn và trị nấm thối rễ sau 5 ngày.</li>
  <li>Kích rễ mới bằng Humic & Fulvic.</li>
</ol>

<p><em>📞 Hotline tư vấn: 0773.440.966</em></p>
        `,
        isPublished: true,
        seoDescription: "Tuyến trùng sầu riêng là gì? Cách nhận biết và tiêu diệt triệt để bằng phác đồ sinh học an toàn.",
        hashtags: ["tuyen-trung", "sau-rieng", "phuc-hoi-re"]
      },
      {
        title: "Cà Phê Vàng Lá Mùa Khô Phải Làm Gì? Phác Đồ 3 Bước Từ Kỹ Sư",
        category: "Nhật ký phục hồi vườn",
        coverImage: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989073/phanbongiatot/y6imlcebopgmarsfpp8e.jpg",
        content: `
<h2>1. Nguyên nhân khiến cà phê vàng lá mùa khô</h2>
<p>Nắng nóng làm cháy rễ tơ tầng mặt, đất thiếu hữu cơ không giữ được ẩm khiến cây sốc nhiệt.</p>

<h2>2. Phác đồ 3 bước cứu vườn</h2>
<ul>
  <li><strong>Bước 1:</strong> Giữ ẩm bằng thảm cỏ và tưới nước định kỳ.</li>
  <li><strong>Bước 2:</strong> Bổ sung Humic K-Max để giữ nước và kích rễ.</li>
  <li><strong>Bước 3:</strong> Phun Amino Plus chống sốc nhiệt qua lá.</li>
</ul>

<p><em>💬 Nhắn Zalo ngay để nhận phác đồ: 0773.440.966</em></p>
        `,
        isPublished: true,
        seoDescription: "Cây cà phê bị vàng lá mùa khô? Tìm hiểu nguyên nhân và áp dụng ngay phác đồ 3 bước giữ ẩm và kích rễ hiệu quả.",
        hashtags: ["ca-phe", "vang-la-mua-kho", "humic"]
      },
      {
        title: "Phân Biệt Tiêu Chết Nhanh và Chết Chậm: Xử Lý Đúng Bệnh, Không Mất Tiền Oan",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg",
        content: `
<h2>1. Bệnh Chết Nhanh (Phytophthora)</h2>
<p>Cây héo rũ nhanh, rụng lá hàng loạt trong 1-2 tuần. Cổ rễ thối đen sũng nước.</p>

<h2>2. Bệnh Chết Chậm (Tuyến trùng & Nấm)</h2>
<p>Lá vàng từ từ, cây còi cọc kéo dài vài tháng. Rễ có nốt sưng u nang.</p>

<h2>3. Phác đồ xử lý thực chiến</h2>
<p>Chết nhanh: Phải chặn đứng bằng thuốc nấm mạnh và khơi thoát nước. Chết chậm: Phải kiên trì diệt tuyến trùng và nuôi lại rễ tơ.</p>

<p><em>Tư vấn kỹ thuật hồ tiêu: 0773.440.966</em></p>
        `,
        isPublished: true,
        seoDescription: "Phân biệt chính xác bệnh chết nhanh và chết chậm trên cây hồ tiêu để xử lý đúng bệnh.",
        hashtags: ["ho-tieu", "chet-nhanh-chet-cham", "benh-cay-trong"]
      },
      {
        title: "Kích Rễ Đúng Cách: Bí Quyết Để Cây Hấp Thụ Phân Bón Hiệu Quả Gấp 3 Lần",
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
