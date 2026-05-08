import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET() {
  try {
    await dbConnect();

    const blogs = [
      {
        title: "Sầu Riêng Vàng Lá Thối Rễ: Cách Cứu Vườn Trong 7 Ngày Từ Phan Bón Giá Tốt",
        slug: "sau-rieng-vang-la-thoi-re-huong-dan-tu-pbgt",
        category: "Cẩm nang kỹ thuật",
        coverImage: "/images/blog/sau-rieng-vang-la-mua-mua.png",
        excerpt: "Đừng vội bón thêm phân khi thấy sầu riêng vàng lá. Đội ngũ PBGT chỉ ra sai lầm chết người và lộ trình 7 ngày phục hồi rễ tơ trắng xóa.",
        content: `
          <p>Mùa mưa năm nay khắc nghiệt, chúng tôi đi thăm vườn anh Hùng ở Cư M'gar (Kon Tum), nhìn dàn sầu riêng 5 năm tuổi đang độ sung sức mà nay lá rụng lác đác, cơi đọt đứng chững lại, lòng không khỏi xót xa. Anh bảo: <em>"PBGT ơi, tôi đổ bao nhiêu tiền phân thuốc rồi mà nó cứ lụi dần, đêm nằm mất ngủ anh ạ!"</em></p>
          <p>Câu chuyện của anh Hùng không phải cá biệt. Bà con mình thường mắc một sai lầm chết người: **Thấy vàng là bón, thấy héo là phun.** Nhưng bà con đâu biết, lúc này "cái miệng" (bộ rễ) của cây đang bị tổn thương, bón thêm phân hóa học chẳng khác nào bắt người đang đau bụng phải ăn tiệc cưới.</p>
          <img src=\"/images/blog/sau-rieng-vang-la-mua-mua.png\" alt=\"Sầu riêng vàng lá thối rễ thực tế tại vườn\" style=\"width:100%; border-radius: 15px; margin: 20px 0;\" />
          <h2>1. Tại sao sầu riêng lại \"đòi chết\" vào mùa mưa?</h2>
          <p>Bà con hãy tưởng tượng, đất vườn mình như một miếng bọt biển. Mưa dầm làm đất ngậm nước, đẩy hết oxy ra ngoài. Lúc này, các loại nấm \"độc\" như **Phytophthora** và **Fusarium** (tôi hay gọi vui là bọn giặc cỏ) sẽ thừa cơ tấn công vào những vết thương hở trên rễ.</p>
          <p>Khi rễ tơ bị thối, cây không hút được nước và dinh dưỡng, lá bắt đầu vàng từ gân sau đó lan rộng. Đây là tiếng kêu cứu cuối cùng của cây sầu riêng.</p>
          <h2>2. Những sai lầm \"đốt tiền\" bà con cần tránh ngay</h2>
          <ul>
            <li><strong>Bón đạm cao:</strong> Đạm làm tế bào lá trương nước, nấm càng dễ tấn công.</li>
            <li><strong>Tưới thuốc bệnh hóa học liều cao:</strong> Thuốc hóa học diệt nấm hại nhưng diệt luôn cả nấm có ích, làm đất chết lâm sàng.</li>
            <li><strong>Để cỏ quá sạch:</strong> Đất trống làm nước mưa dội trực tiếp, gây nén chặt và rửa trôi dinh dưỡng.</li>
          </ul>
          <h2>3. Lộ trình 7 ngày phục hồi rễ tơ trắng xóa</h2>
          <p>Đây là giải pháp sinh học mà tôi đã áp dụng thành công cho hàng trăm vườn tại Tây Nguyên:</p>
          <h3>Bước 1: Sát khuẩn và hạ phèn (Ngày 1)</h3>
          <p>Bà con cần dọn cỏ quanh gốc (để lại lớp mỏng bảo vệ), sau đó dùng giải pháp sát khuẩn sinh học. Mục tiêu là tiêu diệt bọn \"giặc nấm\" đang trú ngụ trong đất.</p>
          <h3>Bước 2: Kích hoạt bộ rễ mới (Ngày 3)</h3>
          <p>Sau khi đất đã sạch nấm, ta đưa **Humic K-Max** vào. Humic ở đây đóng vai trò như \"thức ăn đặc biệt\" giúp pH đất cân bằng lại, tạo môi trường êm ái cho rễ tơ bung ra.</p>
          <h3>Bước 3: Tăng cường quân đội vi sinh (Ngày 7)</h3>
          <p>Lục này, rễ mới đã nhú ra như giá đỗ. Bà con bổ sung hệ vi sinh đối kháng **Acti Flora**. Những \"chiến binh\" vi sinh này sẽ bao phủ lấy bộ rễ, ngăn không cho nấm hại quay trở lại.</p>
          <div style=\"background: #f0fdf4; border-left: 5px solid #16a34a; padding: 20px; margin: 20px 0; border-radius: 0 10px 10px 0;\">
            <strong>💡 Lời khuyên từ PBGT:</strong> Bà con hãy quan sát cỏ trong vườn. Nếu cỏ xanh tốt, chứng tỏ đất có sức sống. Đừng bao giờ lạm dụng thuốc cỏ làm trơ trụi mặt đất!
          </div>
          <p style=\"text-align: center; font-weight: bold; font-size: 1.2rem;\">👉 Hotline/Zalo PBGT: 0339.505.050</p>
        `,
        isPublished: true,
        seoDescription: "Sầu riêng vàng lá thối rễ? Đội ngũ Phan Bón Giá Tốt hướng dẫn lộ trình 7 ngày phục hồi rễ sinh học, an toàn, hiệu quả bền vững.",
        hashtags: ["sau-rieng", "vang-la-thoi-re", "phuc-hoi-cay-trong"]
      },
      {
        title: "Tuyến Trùng Sầu Riêng: Kẻ Giết Người Thầm Lặng Trong Lòng Đất",
        slug: "tuyen-trung-sau-rieng-cach-xu-ly-tan-goc",
        category: "Cẩm nang kỹ thuật",
        coverImage: "/images/blog/tuyen-trung-sau-rieng.png",
        excerpt: "Nhiều nhà vườn cứ thấy vàng lá là phun nấm nhưng không biết Tuyến trùng mới là nguyên nhân gốc. Chúng tôi chia sẻ cách nhận diện và xử lý tận gốc.",
        content: `
          <p>Sau nhiều năm đi vườn từ Kon Tum xuống tới miền Tây, Phan Bón Giá Tốt nhận ra một điều đau lòng: Rất nhiều nhà vườn đang tự tay \"giết\" cây sầu riêng của mình chỉ vì không hiểu về Tuyến trùng. Nhiều anh em gọi điện cho chúng tôi than: <em>\"PBGT ơi, tôi phun đủ loại thuốc nấm rồi, lá vẫn cứ vàng, đọt không chịu đi, cây lụi dần là sao?\"</em>.</p>
          <p>Thực tế lúc này, bộ rễ của cây đã bị Tuyến trùng tấn công nát bét, tạo đường cho nấm vào, mà bà con chỉ lo \"đánh\" nấm ở trên lá thì làm sao cây khỏe lại được?</p>
          <img src=\"/images/blog/tuyen-trung-sau-rieng.png\" alt=\"Rễ sầu riêng bị tuyến trùng tấn công\" style=\"width:100%; border-radius: 15px; margin: 20px 0;\" />
          <h2>1. Những sai lầm \"đốt tiền\" mà bà con thường mắc phải</h2>
          <ul>
            <li><strong>Lạm dụng thuốc hóa học cực độc:</strong> Thuốc hóa học diệt tuyến trùng 1 nhưng diệt vi sinh có ích 10, làm đất nghẹt thở.</li>
            <li><strong>Bón phân hóa học khi rễ đang đau:</strong> Rễ đang sưng, đen đầu thì không thể ăn phân. Bón vào chỉ làm xót rễ hơn.</li>
            <li><strong>Không chú ý đến pH đất:</strong> Đất chua (pH thấp) là thiên đường của tuyến trùng. Không nâng pH thì không bao giờ hết bệnh.</li>
          </ul>
          <h2>2. Nguyên nhân gốc: Tại sao vườn lại bị tuyến trùng?</h2>
          <p>Tuyến trùng không tự nhiên mà mạnh lên. Nó là hệ quả của đất thiếu hữu cơ, mất cân bằng vi sinh và đất bị nén chặt sau mùa mưa. Khi rễ cám bị úng nước, nó suy yếu và trở thành miếng mồi ngon cho tuyến trùng cắm vòi hút nhựa.</p>
          <h2>3. Quy trình xử lý thực chiến \"Cứu rễ - Bung cơi\"</h2>
          <ol>
            <li><strong>Bước 1: Giảm áp lực tán lá.</strong> Tỉa cành còi cọc để cây tập trung năng lượng phục hồi rễ.</li>
            <li><strong>Bước 2: Diệt tuyến trùng sinh học.</strong> Dùng **Nemano** tưới đẫm vùng rễ cám để tiêu diệt cả con trưởng thành và trứng.</li>
            <li><strong>Bước 3: Nâng pH và phục hồi đất.</strong> Tưới **Humic K-Max** để làm đất thoáng, tạo môi trường cho rễ mới nhú ra.</li>
            <li><strong>Bước 4: Tái tạo hệ vi sinh.</strong> Đưa chiến binh **Acti Flora** vào để bao phủ và bảo vệ bộ rễ mới.</li>
          </ol>
          <div style=\"background: #fffbeb; border-left: 5px solid #d97706; padding: 20px; margin: 20px 0;\">
            <strong>⚠️ Lưu ý từ PBGT:</strong> Tuyến trùng lây lan qua nguồn nước. Nếu vườn có cây bị, bà con nên kiểm tra và xử lý cả những cây xung quanh để tránh bùng phát diện rộng.
          </div>
          <p style=\"text-align: center; font-weight: bold; font-size: 1.2rem;\">👉 Liên hệ PBGT tư vấn miễn phí: 0339.505.050</p>
        `,
        isPublished: true,
        seoDescription: "Tuyến trùng sầu riêng là gì? Phan Bón Giá Tốt hướng dẫn cách nhận diện và quy trình xử lý sinh học tận gốc, giúp cây bung cơi, xanh lá.",
        hashtags: ["tuyen-trung-sau-rieng", "benh-sau-rieng", "phuc-hoi-vuon"]
      }
    ];

    await Blog.deleteMany({ slug: { $in: blogs.map(b => b.slug) } });
    for (const blogData of blogs) {
      await Blog.create(blogData);
    }

    return NextResponse.json({ 
      message: 'Successfully seeded 2 HIGH-QUALITY blogs with AGRI-ENGINEER AGENT style',
      count: blogs.length 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
