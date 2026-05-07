import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET() {
  try {
    await dbConnect();

    const highQualityBlog = {
      title: "Sầu Riêng Vàng Lá Thối Rễ: Kỹ Sư Chỉ Đúng Cách Cứu Vườn Trong 7 Ngày",
      slug: "sau-rieng-vang-la-thoi-re-ky-su-huong-dan",
      category: "Cẩm nang kỹ thuật",
      coverImage: "/images/blog/sau-rieng-vang-la-mua-mua.png",
      excerpt: "Đừng vội bón thêm phân khi thấy sầu riêng vàng lá. Kỹ sư chỉ ra sai lầm chết người và lộ trình 7 ngày phục hồi rễ tơ trắng xóa.",
      content: `
        <p>Mùa mưa năm nay khắc nghiệt, tôi đi thăm vườn anh Hùng ở Cư M'gar (Đắk Lắk), nhìn dàn sầu riêng 5 năm tuổi đang độ sung sức mà nay lá rụng lác đác, cơi đọt đứng chững lại, lòng không khỏi xót xa. Anh bảo: <em>"Kỹ sư ơi, tôi đổ bao nhiêu tiền phân thuốc rồi mà nó cứ lụi dần, đêm nằm mất ngủ ông ạ!"</em></p>
        
        <p>Câu chuyện của anh Hùng không phải cá biệt. Bà con mình thường mắc một sai lầm chết người: **Thấy vàng là bón, thấy héo là phun.** Nhưng bà con đâu biết, lúc này "cái miệng" (bộ rễ) của cây đang bị tổn thương, bón thêm phân hóa học chẳng khác nào bắt người đang đau bụng phải ăn tiệc cưới.</p>

        <img src="/images/blog/sau-rieng-vang-la-mua-mua.png" alt="Sầu riêng vàng lá thối rễ thực tế tại vườn" style="width:100%; border-radius: 15px; margin: 20px 0;" />

        <h2>1. Tại sao sầu riêng lại "đòi chết" vào mùa mưa?</h2>
        <p>Bà con hãy tưởng tượng, đất vườn mình như một miếng bọt biển. Mưa dầm làm đất ngậm nước, đẩy hết oxy ra ngoài. Lúc này, các loại nấm "độc" như **Phytophthora** và **Fusarium** (tôi hay gọi vui là bọn giặc cỏ) sẽ thừa cơ tấn công vào những vết thương hở trên rễ.</p>
        <p>Khi rễ tơ bị thối, cây không hút được nước và dinh dưỡng, lá bắt đầu vàng từ gân sau đó lan rộng. Đây là tiếng kêu cứu cuối cùng của cây sầu riêng.</p>

        <h2>2. Những sai lầm "đốt tiền" bà con cần tránh ngay</h2>
        <ul>
          <li><strong>Bón đạm cao:</strong> Đạm làm tế bào lá trương nước, nấm càng dễ tấn công.</li>
          <li><strong>Tưới thuốc bệnh hóa học liều cao:</strong> Thuốc hóa học diệt nấm hại nhưng diệt luôn cả nấm có ích, làm đất chết lâm sàng.</li>
          <li><strong>Để cỏ quá sạch:</strong> Đất trống làm nước mưa dội trực tiếp, gây nén chặt và rửa trôi dinh dưỡng.</li>
        </ul>

        <h2>3. Lộ trình 7 ngày phục hồi rễ tơ trắng xóa</h2>
        <p>Đây là giải pháp sinh học mà tôi đã áp dụng thành công cho hàng trăm vườn tại Tây Nguyên:</p>

        <h3>Bước 1: Sát khuẩn và hạ phèn (Ngày 1)</h3>
        <p>Bà con cần dọn cỏ quanh gốc (để lại lớp mỏng bảo vệ), sau đó dùng giải pháp sát khuẩn sinh học. Mục tiêu là tiêu diệt bọn "giặc nấm" đang trú ngụ trong đất.</p>

        <h3>Bước 2: Kích hoạt bộ rễ mới (Ngày 3)</h3>
        <p>Sau khi đất đã sạch nấm, ta đưa **Humic K-Max** vào. Humic ở đây đóng vai trò như "thức ăn đặc biệt" giúp pH đất cân bằng lại, tạo môi trường êm ái cho rễ tơ bung ra.</p>

        <h3>Bước 3: Tăng cường quân đội vi sinh (Ngày 7)</h3>
        <p>Lúc này, rễ mới đã nhú ra như giá đỗ. Bà con bổ sung hệ vi sinh đối kháng **Acti Flora**. Những "chiến binh" vi sinh này sẽ bao phủ lấy bộ rễ, ngăn không cho nấm hại quay trở lại.</p>

        <div style="background: #f0fdf4; border-left: 5px solid #16a34a; padding: 20px; margin: 20px 0; border-radius: 0 10px 10px 0;">
          <strong>💡 Lời khuyên của Kỹ sư:</strong> Bà con hãy quan sát cỏ trong vườn. Nếu cỏ xanh tốt, chứng tỏ đất có sức sống. Đừng bao giờ lạm dụng thuốc cỏ làm trơ trụi mặt đất!
        </div>

        <h2>4. Giải đáp thắc mắc từ Nhà vườn</h2>
        <p><strong>Hỏi:</strong> <em>"Tôi dùng vôi để sát khuẩn được không kỹ sư?"</em></p>
        <p><strong>Trả lời:</strong> Vôi tốt nhưng làm tăng pH đột ngột và dễ gây bó rễ nếu dùng sai cách. Giải pháp sinh học hiện nay hiệu quả và an toàn hơn nhiều cho hệ vi sinh đất.</p>

        <h2>Kết luận</h2>
        <p>Cứu một cái cây cũng như cứu một con người, cần sự thấu hiểu và kiên nhẫn. Nếu vườn nhà bà con đang có dấu hiệu vàng lá, đừng chần chừ. Hãy chụp ảnh lá và rễ, gửi ngay vào Zalo cho tôi. Tôi và đội ngũ kỹ sư sẽ tư vấn tận tình, hoàn toàn miễn phí!</p>
        <p style="text-align: center; font-weight: bold; font-size: 1.2rem;">👉 Hotline/Zalo kỹ sư: 0773.440.966</p>
      `,
      isPublished: true,
      seoDescription: "Sầu riêng vàng lá thối rễ? Kỹ sư nông nghiệp hướng dẫn lộ trình 7 ngày phục hồi rễ sinh học, an toàn, hiệu quả bền vững.",
      hashtags: ["sau-rieng", "vang-la-thoi-re", "phuc-hoi-cay-trong", "phan-bon-gia-tot"]
    };

    await Blog.create(highQualityBlog);

    return NextResponse.json({ 
      message: 'Successfully seeded 1 HIGH-QUALITY blog post by the NEW AGRI-ENGINEER AGENT',
      slug: highQualityBlog.slug 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
