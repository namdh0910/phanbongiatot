
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET() {
  try {
    await dbConnect();

    const contentHtml = `
      <p>Sầu riêng (<em>Durio zibethinus</em>) là loại cây <strong>cực kỳ mẫn cảm với điều kiện úng nước</strong>. Khác với nhiều loại cây ăn quả khác, hệ rễ sầu riêng hầu như không có khả năng chịu đựng tình trạng ngập nước kéo dài, dù chỉ từ 24–48 giờ.</p>

      <div style="background: #f8fafc; border: 2px dashed #cbd5e0; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
        <div style="font-size: 24px;">📷</div>
        <div style="font-weight: 800; color: #4a5568;">[VỊ TRÍ ẢNH BÌA: Cảnh vườn sầu riêng bị ngập hoặc cây đang héo rũ]</div>
      </div>

      <h2>1. Vì Sao Ngập Úng Gây Ra Thối Rễ Sầu Riêng?</h2>
      <p>Khi đất bị bão hòa nước, <strong>oxy trong vùng rễ bị cắt đứt hoàn toàn</strong>. Lúc này:</p>
      <ul>
        <li>Rễ tơ (rễ hút dinh dưỡng) bị chết ngạt do thiếu oxy chỉ sau vài giờ</li>
        <li>Môi trường kỵ khí trong đất tạo điều kiện cho nấm bệnh phát triển bùng phát, đặc biệt là <em>Phytophthora palmivora</em></li>
        <li>Vi sinh vật có lợi trong đất bị tiêu diệt, làm mất cân bằng hệ sinh thái vùng rễ</li>
      </ul>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #e2e8f0;">
        <thead>
          <tr style="background-color: #edf2f7;">
            <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left;">Thời gian ngập</th>
            <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left;">Mức độ nguy hiểm</th>
            <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left;">Tỉ lệ cứu được</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="border: 1px solid #e2e8f0; padding: 10px;">Dưới 24 giờ</td><td style="border: 1px solid #e2e8f0; padding: 10px;">Thấp</td><td style="border: 1px solid #e2e8f0; padding: 10px;">> 90%</td></tr>
          <tr><td style="border: 1px solid #e2e8f0; padding: 10px;">24 – 48 giờ</td><td style="border: 1px solid #e2e8f0; padding: 10px;">Trung bình</td><td style="border: 1px solid #e2e8f0; padding: 10px;">60 – 80%</td></tr>
          <tr><td style="border: 1px solid #e2e8f0; padding: 10px;">Trên 5 ngày</td><td style="border: 1px solid #e2e8f0; padding: 10px;">Rất cao</td><td style="border: 1px solid #e2e8f0; padding: 10px;">< 30%</td></tr>
        </tbody>
      </table>

      <h2>2. Dấu Hiệu Nhận Biết Sầu Riêng Bị Thối Rễ Sau Ngập Úng</h2>
      <h3>Dấu hiệu trên lá</h3>
      <ul>
        <li><strong>Lá vàng nhạt hoặc xanh tái</strong> không đều, bắt đầu từ những cành phía ngoài tán.</li>
        <li><strong>Lá rủ xuống</strong> dù trời không nắng gắt và đất vẫn còn ẩm.</li>
      </ul>
      <div style="background: #f8fafc; border: 2px dashed #cbd5e0; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
        <div style="font-size: 24px;">📷</div>
        <div style="font-weight: 800; color: #4a5568;">[ẢNH MINH HỌA: Lá sầu riêng bị héo rũ, vàng tái sau ngập]</div>
      </div>

      <h3>Dấu hiệu dưới mặt đất</h3>
      <ul>
        <li>Rễ tơ có màu <strong>nâu đen, nhũn nát</strong>, bẻ gãy dễ dàng.</li>
        <li>Vùng đất quanh gốc có <strong>mùi chua, hôi khó chịu</strong>.</li>
      </ul>
      <div style="background: #f8fafc; border: 2px dashed #cbd5e0; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
        <div style="font-size: 24px;">📷</div>
        <div style="font-weight: 800; color: #4a5568;">[ẢNH MINH HỌA: Cận cảnh bộ rễ sầu riêng bị thối đen, lột vỏ]</div>
      </div>

      <div style="background-color: #fff5f5; border-left: 5px solid #f56565; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <strong style="color: #c53030;">⚠️ CẢNH BÁO:</strong> Nếu rễ cái đã thối đen hoàn toàn, tỉ lệ cứu sống cực thấp. Cần đánh giá kỹ trước khi đầu tư phục hồi.
      </div>

      <h2>4. Xử Lý Khẩn Cấp Ngay Sau Khi Nước Rút</h2>
      <p><strong>Bước 1: Thoát nước và thông khí đất (Ưu tiên số 1)</strong></p>
      <ul>
        <li>Đào rãnh thoát nước xung quanh tán cây, sâu 30–40 cm.</li>
        <li>Dùng cây chọc tạo lỗ thông khí quanh gốc để oxy len lỏi vào đất.</li>
      </ul>
      <div style="background: #f8fafc; border: 2px dashed #cbd5e0; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
        <div style="font-size: 24px;">📷</div>
        <div style="font-weight: 800; color: #4a5568;">[ẢNH MINH HỌA: Kỹ thuật tạo lỗ thông khí đất quanh gốc sầu riêng]</div>
      </div>

      <p><strong>Bước 2: Tỉa cành, giảm tải cho rễ</strong></p>
      <p>Cắt bỏ <strong>30–50% tán lá</strong> và <strong>toàn bộ trái</strong> để cây tập trung năng lượng phục hồi rễ.</p>

      <h2>7. Thuốc và Phân Bón Sử Dụng</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #e2e8f0;">
        <thead>
          <tr style="background-color: #edf2f7;">
            <th style="border: 1px solid #e2e8f0; padding: 10px;">Tên thuốc</th>
            <th style="border: 1px solid #e2e8f0; padding: 10px;">Hoạt chất</th>
            <th style="border: 1px solid #e2e8f0; padding: 10px;">Công dụng</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="border: 1px solid #e2e8f0; padding: 10px;">Ridomil Gold</td><td style="border: 1px solid #e2e8f0; padding: 10px;">Metalaxyl + Mancozeb</td><td style="border: 1px solid #e2e8f0; padding: 10px;">Trị thối rễ cực mạnh</td></tr>
          <tr><td style="border: 1px solid #e2e8f0; padding: 10px;">Aliette</td><td style="border: 1px solid #e2e8f0; padding: 10px;">Fosetyl-Al</td><td style="border: 1px solid #e2e8f0; padding: 10px;">Lưu dẫn 2 chiều</td></tr>
        </tbody>
      </table>

      <div style="background-color: #f0fff4; border-left: 5px solid #48bb78; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <strong style="color: #276749;">💡 LỜI KHUYÊN PBGT:</strong> Luôn luân phiên hoạt chất thuốc để tránh nấm kháng thuốc. Sử dụng thêm Humic sau 7 ngày để kích rễ tơ.
      </div>

      <h2>Kết Luận</h2>
      <p>Ngập úng và thối rễ là thách thức lớn, nhưng nếu phát hiện sớm và xử lý đúng kỹ thuật, bà con hoàn toàn có thể cứu vườn sầu riêng của mình. Hãy kiên trì và theo dõi sát sao từng biểu hiện của cây.</p>
    `;

    // Check if exists
    const slug = "xu-ly-sau-rieng-thoi-re-sau-ngap-ung";
    const existing = await Blog.findOne({ slug });
    
    if (existing) {
      return NextResponse.json({ message: "⚠️ Bài viết đã tồn tại trên hệ thống." });
    }

    await Blog.create({
      title: "Xử Lý Sầu Riêng Thối Rễ Sau Ngập Úng: Hướng Dẫn Chi Tiết Từ A–Z",
      slug,
      category: "Cẩm nang kỹ thuật",
      excerpt: "Sầu riêng thối rễ sau ngập úng là thảm họa của nhà vườn. Bài viết hướng dẫn chi tiết cách nhận biết, xử lý khẩn cấp và phục hồi vườn sầu riêng hiệu quả, giúp cây thoát chết và cho trái trở lại.",
      content: contentHtml,
      isPublished: false, // Draft
      hashtags: ["sau-rieng", "thoi-re", "ngap-ung", "phan-bon-gia-tot", "ky-thuat-nong-nghiep"],
      seoDescription: "Hướng dẫn chi tiết cách xử lý và phục hồi sầu riêng bị thối rễ sau ngập úng. Quy trình kỹ thuật chuyên sâu từ đội ngũ Phan Bón Giá Tốt."
    });

    return NextResponse.json({ message: "✅ Đã nạp bài viết chuyên gia thành công! Anh hãy quay lại Admin và F5 nhé." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
