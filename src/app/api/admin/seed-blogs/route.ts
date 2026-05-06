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
          <p>Mùa mưa tại Tây Nguyên và miền Tây mang theo lượng nước lớn, độ ẩm không khí cao, là điều kiện "vàng" để nấm <strong>Phytophthora</strong> và <strong>Fusarium</strong> tấn công bộ rễ sầu riêng. Nếu không xử lý kịp thời, cây sẽ suy kiệt và chết chỉ sau vài tuần.</p>

          <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80" alt="Vàng lá thối rễ sầu riêng" style="width:100%; border-radius: 20px; margin: 20px 0;" />

          <h2>1. Nhận diện dấu hiệu "Cấp cứu" cho vườn</h2>
          <p>Bà con cần đi thăm vườn ngay sau các đợt mưa kéo dài. Các dấu hiệu điển hình bao gồm:</p>
          <ul>
            <li><strong>Lá biến màu:</strong> Lá già bắt đầu ngả vàng nhạt từ gân chính sau đó lan rộng. Lá không còn bóng mượt mà trở nên xỉn màu.</li>
            <li><strong>Rễ tơ thối đen:</strong> Khi bới đất vùng quanh tán, rễ tơ không còn màu trắng mà chuyển sang nâu hoặc đen, vỏ rễ dễ tuột khỏi lõi.</li>
            <li><strong>Đọt non đứng lại:</strong> Cây không ra đọt mới, hoặc đọt ra rất yếu và nhanh chóng bị cháy lá.</li>
          </ul>

          <h2>2. Tại sao mưa lại gây vàng lá?</h2>
          <p>Có 3 nguyên nhân chính khiến sầu riêng "đổ bệnh" mùa này:</p>
          <ul>
            <li><strong>Ngập úng cục bộ:</strong> Đất thiếu oxy khiến rễ bị ngạt, không thể hấp thụ dinh dưỡng.</li>
            <li><strong>Hạ pH đất:</strong> Nước mưa có tính axit làm pH đất giảm mạnh (dưới 4.5), tạo môi trường cực tốt cho nấm hại.</li>
            <li><strong>Nấm bệnh tấn công:</strong> Vết thương hở trên rễ do ngập úng là cửa ngõ để nấm xâm nhập.</li>
          </ul>

          <img src="https://images.unsplash.com/photo-1599684133327-0470b8089450?auto=format&fit=crop&q=80" alt="Bộ rễ khỏe mạnh" style="width:100%; border-radius: 20px; margin: 20px 0;" />

          <h2>3. Quy trình 5 bước cứu vườn dứt điểm</h2>
          <p>Để cứu vườn thành công, bà con cần thực hiện đúng trình tự sau:</p>
          
          <p><strong>Bước 1: Khơi rãnh thoát nước.</strong> Đây là việc sống còn. Tuyệt đối không để nước đọng vùng gốc. Rãnh thoát nước phải sâu ít nhất 30-50cm.</p>
          
          <p><strong>Bước 2: Vệ sinh vùng gốc.</strong> Dọn sạch rác, cỏ dại quanh gốc để tạo sự thông thoáng, giúp mặt đất nhanh khô ráo.</p>
          
          <p><strong>Bước 3: Sát khuẩn rễ (Quan trọng nhất).</strong> Sử dụng hoạt chất sinh học (như <strong>Phytopin</strong>) để diệt nấm hại nhưng vẫn bảo vệ được hệ vi sinh có lợi. Tưới 2 lần cách nhau 5-7 ngày.</p>
          
          <p><strong>Bước 4: Nâng pH và kích rễ.</strong> Sau khi diệt nấm 3 ngày, bón <strong>Humic K-Max</strong> để nâng pH đất lên mức 5.5 - 6.5. Đây là ngưỡng để rễ tơ phát triển trở lại mạnh mẽ nhất.</p>
          
          <p><strong>Bước 5: Phun dưỡng lá phục hồi.</strong> Khi bộ rễ đã hồi phục, phun Amino Plus lên lá để cung cấp dinh dưỡng tức thời, giúp cây bung đọt non mới.</p>

          <h2>4. Sai lầm cần tránh</h2>
          <p>Nhiều bà con thấy cây vàng lá là vội vàng bón thêm phân hóa học (Đạm, NPK). Đây là sai lầm chết người vì lúc này rễ đang tổn thương, bón phân sẽ làm cháy rễ nặng hơn, dẫn đến chết cây nhanh hơn.</p>

          <p><em>💬 Chụp ảnh lá và gửi qua Zalo cho Kỹ sư Phân Bón Giá Tốt để được chẩn đoán miễn phí và nhận giải pháp chi tiết cho vườn nhà mình nhé!</em></p>
        `,
        isPublished: true,
        seoDescription: "Sầu riêng vàng lá mùa mưa? Khám phá quy trình 5 bước cứu vườn thực chiến giúp phục hồi rễ nhanh chóng chỉ sau 7 ngày.",
        hashtags: ["sau-rieng", "vang-la-thoi-re", "phuc-hoi-vuon"]
      },
      {
        title: "Tuyến Trùng Sầu Riêng: Kẻ Giết Người Thầm Lặng Trong Lòng Đất",
        slug: "tuyen-trung-sau-rieng",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80",
        excerpt: "Tuyến trùng tạo vết thương cho nấm Phytophthora xâm nhập. Nếu không trị tận gốc tuyến trùng, bệnh vàng lá sẽ tái phát liên tục.",
        content: `
          <p>Nếu vàng lá thối rễ là "triệu chứng" thì <strong>Tuyến trùng</strong> thường là "nguyên nhân" sâu xa. Đây là những sinh vật siêu hiển vi chui vào rễ, tạo ra các khối u sần và mở đường cho nấm bệnh tấn công.</p>

          <h2>1. Dấu hiệu nhận biết Tuyến trùng</h2>
          <p>Khác với vàng lá do thiếu phân, cây bị tuyến trùng có biểu hiện:</p>
          <ul>
            <li><strong>Cây còi cọc:</strong> Dù bón phân nhiều cây vẫn không lớn, lá vàng xanh xen kẽ.</li>
            <li><strong>U sần ở rễ:</strong> Đào rễ tơ lên thấy các nốt sưng to như hạt đỗ hoặc chuỗi hạt.</li>
            <li><strong>Héo xanh vào buổi trưa:</strong> Cây héo rũ khi nắng gắt dù đất vẫn đủ ẩm, chiều mát lại hồi phục.</li>
          </ul>

          <img src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80" alt="Rễ bị tuyến trùng sưng tấy" style="width:100%; border-radius: 20px; margin: 20px 0;" />

          <h2>2. Giải pháp tiêu diệt Tuyến trùng sinh học</h2>
          <p>Thay vì dùng hóa chất độc hại gây chết đất, Phân Bón Giá Tốt khuyên dùng <strong>Nemano</strong> - giải pháp vi sinh an toàn:</p>
          <ul>
            <li><strong>Cơ chế:</strong> Vi sinh vật có ích sẽ bao vây, ức chế quá trình sinh sản và tiêu diệt trứng tuyến trùng.</li>
            <li><strong>Lợi ích:</strong> Không để lại dư lượng độc hại, giúp đất tơi xốp và bảo vệ các thiên địch trong đất.</li>
          </ul>

          <h2>3. Quy trình xử lý kết hợp</h2>
          <p>Để trị dứt điểm, cần xử lý theo công thức: <strong>Diệt Tuyến Trùng + Sát Khuẩn Nấm + Kích Rễ.</strong></p>
          <p>Nếu chỉ diệt nấm mà không diệt tuyến trùng, chỉ sau 1-2 tháng nấm bệnh sẽ theo các vết thương cũ quay trở lại.</p>

          <p><em>Hãy liên hệ ngay với Kỹ sư qua Zalo để nhận quy trình trị tuyến trùng an toàn cho cả người và cây trồng.</em></p>
        `,
        isPublished: true,
        seoDescription: "Tuyến trùng sầu riêng là gì? Cách nhận biết và tiêu diệt triệt để bằng giải pháp sinh học Nemano giúp bảo vệ rễ cây.",
        hashtags: ["tuyen-trung", "sau-rieng", "nong-nghiep-sach"]
      },
      {
        title: "Kích Rễ Cây Trồng Đúng Cách: Bí Quyết Để Tối Ưu 100% Phân Bón",
        slug: "kich-re-cay-trong-dung-cach",
        category: "Mỗi chất - Một vấn đề",
        coverImage: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80",
        excerpt: "Rễ là cái miệng của cây. Kích rễ đúng thời điểm giúp cây ăn phân khỏe, lớn nhanh và tiết kiệm chi phí cho nhà nông.",
        content: `
          <p>Bà con thường than phiền: "Sao tôi bón phân đắt tiền mà cây vẫn không lớn?". Câu trả lời nằm ở bộ rễ. Nếu rễ yếu, cây chỉ hấp thụ được 20-30% dinh dưỡng, phần còn lại bị rửa trôi gây lãng phí tiền bạc.</p>

          <img src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80" alt="Kích rễ hữu cơ" style="width:100%; border-radius: 20px; margin: 20px 0;" />

          <h2>1. Khi nào cần kích rễ?</h2>
          <ul>
            <li><strong>Cây mới trồng:</strong> Giúp bộ rễ bén đất nhanh, tránh tình trạng "ngủ đông".</li>
            <li><strong>Sau thu hoạch:</strong> Phục hồi bộ rễ đã bị suy kiệt sau thời gian nuôi trái.</li>
            <li><strong>Cây bị vàng lá:</strong> Phục hồi rễ mới sau khi đã diệt sạch nấm bệnh.</li>
            <li><strong>Trước các đợt bón phân định kỳ:</strong> "Mở miệng" cho cây để hấp thụ phân bón tốt nhất.</li>
          </ul>

          <h2>2. Bí quyết kích rễ từ Kỹ sư</h2>
          <p>Kích rễ không chỉ là tưới thuốc kích thích. Một bộ rễ khỏe cần 2 yếu tố:</p>
          <ul>
            <li><strong>Đất sạch bệnh:</strong> Rễ không thể mọc nếu đất đầy nấm và tuyến trùng.</li>
            <li><strong>Môi trường pH chuẩn:</strong> pH đất phải từ 5.5 - 7.0 rễ mới hút được dinh dưỡng.</li>
          </ul>

          <h2>3. Giải pháp kích rễ sinh học bền vững</h2>
          <p>Chúng tôi ưu tiên sử dụng <strong>Humic K-Max</strong> kết hợp với <strong>Fulvic</strong>. </p>
          <ul>
            <li><strong>Humic:</strong> Giúp cải tạo cấu trúc đất, làm đất tơi xốp, giữ nước và phân bón.</li>
            <li><strong>Fulvic:</strong> Đóng vai trò là "xe vận chuyển", giúp dinh dưỡng đi sâu vào từng tế bào rễ nhanh hơn gấp 3 lần bình thường.</li>
          </ul>

          <p><em>💬 Nhắn tin ngay để nhận bảng giá bộ kích rễ chuyên sâu cho từng loại cây trồng: Sầu riêng, Cà phê, Cây ăn trái.</em></p>
        `,
        isPublished: true,
        seoDescription: "Hướng dẫn cách kích rễ cây trồng hiệu quả bằng Humic và Fulvic, giúp tối ưu hóa lượng phân bón và phục hồi cây nhanh chóng.",
        hashtags: ["kich-re", "humic-kmax", "kinh-nghiem-nong-nghiep"]
      },
      {
        title: "Cà Phê Mùa Khô: Tuyệt Chiêu Giữ Vườn Xanh Mượt Dưới Nắng Gắt",
        slug: "ca-phe-vang-la-mua-kho",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80",
        excerpt: "Mùa khô Tây Nguyên rất khắc nghiệt. Kỹ sư hướng dẫn cách tưới nước và bón phân giúp cà phê không bị vàng lá, rụng trái.",
        content: `
          <p>Mùa khô là thời điểm thử thách nhất với cây cà phê tại Tây Nguyên. Nếu không có chiến lược chăm sóc đúng, cây sẽ bị "cháy lá", rụng trái non và suy kiệt năng suất cho vụ sau.</p>

          <h2>1. Tại sao cà phê bị vàng lá mùa khô?</h2>
          <ul>
            <li><strong>Thiếu nước trầm trọng:</strong> Khiến các mạch dẫn bị tắc nghẽn.</li>
            <li><strong>Đất bị nén chặt:</strong> Khiến rễ không thể vươn xa tìm nước.</li>
            <li><strong>Mất cân bằng dinh dưỡng:</strong> Cây tập trung nuôi trái nên rút hết dinh dưỡng từ lá.</li>
          </ul>

          <img src="https://images.unsplash.com/photo-1501333193976-189f315a6b0c?auto=format&fit=crop&q=80" alt="Vườn cà phê mùa khô" style="width:100%; border-radius: 20px; margin: 20px 0;" />

          <h2>2. Giải pháp 3 tác động cho Cà phê</h2>
          <p><strong>Tác động 1: Quản lý nước thông minh.</strong> Không nên tưới quá nhiều một lúc gây lãng phí. Chia nhỏ đợt tưới và tưới đẫm vào vùng rễ tơ.</p>
          <p><strong>Tác động 2: Giữ ẩm bằng chất hữu cơ.</strong> Bón <strong>Humic K-Max</strong> giúp đất giữ nước lâu hơn 30%, giúp cây chịu hạn tốt hơn trong những đợt nắng kéo dài.</p>
          <p><strong>Tác động 3: Dinh dưỡng qua lá.</strong> Phun Amino Plus định kỳ để bù đắp lượng dinh dưỡng thiếu hụt, giúp lá giữ được độ xanh đậm, bóng mượt.</p>

          <p><em>Kỹ sư luôn sẵn sàng tưới vườn cùng bà con qua Zalo 24/7. Hãy nhắn tin nếu vườn cà phê đang gặp vấn đề!</em></p>
        `,
        isPublished: true,
        seoDescription: "Bí quyết chăm sóc cà phê mùa khô giúp vườn luôn xanh tốt, hạn chế rụng trái và tăng năng suất vụ sau.",
        hashtags: ["ca-phe", "cham-soc-mua-kho", "phan-bon-gia-tot"]
      },
      {
        title: "Tiêu Chết Nhanh & Chết Chậm: Cách Phân Biệt Để Xử Lý Đúng Bệnh",
        slug: "phan-biet-tieu-chet-nhanh-chet-cham",
        category: "Cẩm nang kỹ thuật",
        coverImage: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80",
        excerpt: "Đừng nhầm lẫn giữa hai loại bệnh này nếu không muốn mất tiền oan. Kỹ sư hướng dẫn cách nhận diện và giải pháp đặc trị.",
        content: `
          <p>Bệnh chết nhanh và chết chậm trên cây tiêu là nỗi ám ảnh kinh hoàng, có thể xóa sổ cả một trang trại chỉ trong thời gian ngắn. Hiểu đúng để trị đúng là chìa khóa thành công.</p>

          <h2>1. Phân biệt chính xác 2 loại bệnh</h2>
          <table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; margin: 20px 0;">
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; border: 1px solid #ddd;">Đặc điểm</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Chết Nhanh (Phytophthora)</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Chết Chậm (Tuyến trùng/Nấm)</th>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Thời gian</td>
              <td style="padding: 10px; border: 1px solid #ddd;">Cây chết trong 7-15 ngày.</td>
              <td style="padding: 10px; border: 1px solid #ddd;">Cây chết mòn trong 3-6 tháng.</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">Dấu hiệu lá</td>
              <td style="padding: 10px; border: 1px solid #ddd;">Lá vàng và rụng hàng loạt khi vẫn còn xanh.</td>
              <td style="padding: 10px; border: 1px solid #ddd;">Lá vàng dần từ gốc lên ngọn, lá rụng chậm.</td>
            </tr>
          </table>

          <h2>2. Giải pháp đặc trị</h2>
          <p>Đối với <strong>Chết nhanh</strong>: Cần sát khuẩn cực mạnh toàn vườn bằng Phytopin để ngăn chặn sự lây lan của nấm.</p>
          <p>Đối với <strong>Chết chậm</strong>: Tập trung tiêu diệt tuyến trùng bằng Nemano và phục hồi rễ bằng Humic.</p>

          <p><em>💬 Liên hệ ngay với Kỹ sư để nhận phác đồ riêng biệt cho vườn tiêu nhà mình!</em></p>
        `,
        isPublished: true,
        seoDescription: "Cách phân biệt bệnh chết nhanh và chết chậm trên cây tiêu giúp nhà nông đưa ra giải pháp điều trị chính xác, tiết kiệm chi phí.",
        hashtags: ["ho-tieu", "benh-chet-nhanh", "ky-thuat-trong-tieu"]
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
