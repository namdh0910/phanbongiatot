import dbConnect from './src/lib/db';
import Blog from './src/lib/models/Blog';
import mongoose from 'mongoose';

async function upgradeToExpertArticle() {
  await dbConnect();
  
  const content = `
    <p>Chào bà con! Là một kỹ sư nông nghiệp đã đồng hành cùng hàng ngàn vườn sầu riêng tại Tây Nguyên và Miền Tây, tôi hiểu rằng 3 năm đầu (giai đoạn kiến thiết) là thời điểm quyết định đến 70% thành bại của cả một đời cây. Giai đoạn này không phải là giai đoạn ăn trái, mà là giai đoạn <strong>\"Xây khung - Tạo rễ\"</strong>. Nhiều bà con nóng lòng muốn cây lớn nhanh mà bón quá nhiều phân hóa học, dẫn đến cháy rễ, vàng lá và cây bị khựng lại. Bài viết này sẽ là cuốn cẩm nang đầy đủ nhất, giúp bà con bón phân chuẩn khoa học, tiết kiệm chi phí mà cây vẫn lớn \"như thổi\".</p>

    <img src=\"https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80\" alt=\"Cây sầu riêng con xanh tốt\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />

    <h2>1. Hiểu đúng về nhu cầu dinh dưỡng giai đoạn kiến thiết</h2>
    <p>Trong 1-3 năm đầu, mục tiêu tối thượng là: <strong>Rễ khỏe - Thân to - Cành tán đều</strong>. Cây sầu riêng cần các nhóm dinh dưỡng theo thứ tự ưu tiên sau:</p>
    <ul>
      <li><strong>Đạm (N):</strong> Giúp thúc đọt, nở lá, phát triển sinh khối thân cành.</li>
      <li><strong>Lân (P):</strong> Cực kỳ quan trọng để kích bộ rễ tơ phát triển mạnh và phân cành.</li>
      <li><strong>Kali (K):</strong> Giúp thân cây cứng cáp, tăng khả năng chịu hạn và kháng sâu bệnh.</li>
      <li><strong>Trung vi lượng (Ca, Mg, Zn, B, Fe...):</strong> Giúp lá xanh dày, bóng mượt, tránh tình trạng xoăn lá, vàng lá do thiếu chất.</li>
    </ul>

    <h2>2. Quy trình bón phân chi tiết theo từng năm tuổi</h2>

    <h3>Năm thứ nhất: Giai đoạn đặt nền móng</h3>
    <p>Sau khi trồng 1-2 tháng, khi cây đã bén rễ và ra cơi đọt đầu tiên, bà con bắt đầu chế độ dinh dưỡng:</p>
    <ul>
      <li><strong>Tưới kích rễ định kỳ:</strong> Sử dụng <strong>Humic K-Max</strong> pha nước tưới gốc 10-15 ngày/lần. Humic giúp đất tơi xốp, kích thích rễ tơ ra cực mạnh.</li>
      <li><strong>Bón hữu cơ vi sinh:</strong> Bón khoảng 1-2kg/gốc mỗi 2-3 tháng. Ưu tiên các loại phân hữu cơ đã qua xử lý để tránh nấm bệnh.</li>
      <li><strong>Phun qua lá:</strong> Kết hợp <strong>Amino Plus</strong> giúp lá xanh dày, mở rộng diện tích quang hợp.</li>
    </ul>

    <img src=\"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80\" alt=\"Kỹ thuật bón phân sầu riêng con\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />

    <h3>Năm thứ hai & thứ ba: Mở rộng khung tán</h3>
    <p>Lúc này bộ rễ đã ổn định, bà con tăng dần lượng phân bón:</p>
    <ul>
      <li><strong>NPK tỷ lệ Đạm cao (như 30-10-10 hoặc 20-10-10):</strong> Chia nhỏ lượng bón, khoảng 150-200g/gốc/lần, bón theo vòng tròn tán cây.</li>
      <li><strong>Bổ sung vi lượng:</strong> Đặc biệt là Kẽm (Zn) và Magie (Mg) để tránh hiện tượng vàng lá gân xanh.</li>
    </ul>

    <h2>3. Bí quyết \"Vàng\": Quản lý pH đất - Chìa khóa hấp thụ dinh dưỡng</h2>
    <p>Rất nhiều vườn bón phân rất nhiều nhưng cây không lớn. Tại sao? Vì <strong>pH đất quá thấp (dưới 4.5)</strong>. Ở mức pH này, phân bón bị khóa lại, rễ không hút được. Bà con cần định kỳ kiểm tra pH và sử dụng các sản phẩm nâng pH sinh học như Humic để đưa pH về mức 5.5 - 6.5.</p>

    <h2>4. Sai lầm chết người cần tránh</h2>
    <ul>
      <li><strong>Bón phân sát gốc:</strong> Gây cháy cổ rễ, chết cây.</li>
      <li><strong>Bón phân khi cây đang bị bệnh:</strong> Làm bệnh nặng hơn, nấm tấn công nhanh hơn.</li>
      <li><strong>Lạm dụng phân hóa học:</strong> Làm đất bị chai cứng, bạc màu, tiêu diệt hệ vi sinh có lợi.</li>
    </ul>

    <h2>5. Giải pháp từ Kỹ sư Phân Bón Giá Tốt</h2>
    <p>Chúng tôi đề xuất quy trình <strong>\"Hữu cơ sinh học 3 trong 1\"</strong>: Sát khuẩn đất - Cải tạo đất - Kích rễ mạnh. Đây là con đường bền vững nhất để xây dựng một vườn sầu riêng tỷ đô.</p>

    <p><em>💬 Bà con đang phân vân chưa biết bón loại nào cho vườn nhà mình? Đừng ngần ngại, hãy nhắn tin Zalo hoặc gọi ngay cho đội ngũ Kỹ sư của chúng tôi để được tư vấn phác đồ riêng biệt cho từng loại đất!</em></p>
  `;

  const updatedBlog = {
    title: "Kỹ thuật bón phân Sầu Riêng giai đoạn kiến thiết: Bí quyết để cây nhanh lớn, khỏe mạnh",
    slug: "ky-thuat-bon-phan-sau-rieng-giai-doan-kien-thiet",
    category: "Cẩm nang kỹ thuật",
    coverImage: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80",
    excerpt: "Hướng dẫn chi tiết từ Kỹ sư nông nghiệp về cách bón phân cho sầu riêng 1-3 năm tuổi. Quy trình chuẩn giúp cây phát triển khung tán mạnh, kháng bệnh và lớn nhanh vượt trội.",
    content: content,
    isPublished: true,
  };

  await Blog.findOneAndUpdate(
    { slug: "ky-thuat-bon-phan-sau-rieng-giai-doan-kien-thiet" },
    updatedBlog,
    { upsert: true }
  );
  
  console.log('Successfully upgraded article to EXPERT level with full accents!');
  mongoose.connection.close();
}

upgradeToExpertArticle();
