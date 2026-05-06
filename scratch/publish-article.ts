import dbConnect from './src/lib/db';
import Blog from './src/lib/models/Blog';
import mongoose from 'mongoose';

async function publishPerfectArticle() {
  await dbConnect();
  
  const article = {
    title: "Phục hồi Sầu Riêng Sau Thu Hoạch: Quy trình 'Vàng' giúp cây sung sức, mập đọt",
    slug: "phuc-hoi-sau-rieng-sau-thu-hoach",
    category: "Cẩm nang kỹ thuật",
    coverImage: "https://images.unsplash.com/photo-1599684133327-0470b8089450?auto=format&fit=crop&q=80",
    excerpt: "Sau một vụ mùa nuôi trái, cây sầu riêng bị kiệt sức nghiêm trọng. Nếu không phục hồi đúng cách, cây sẽ dễ bị xì mủ và năng suất vụ sau giảm mạnh.",
    content: `
      <p>Sau khi thu hoạch, cây sầu riêng thường rơi vào tình trạng \"mất sức\" trầm trọng. Các chất dinh dưỡng trong thân, lá đã bị rút cạn để nuôi trái. Đây là thời điểm nhạy cảm nhất, nếu bà con không phục hồi ngay, cây sẽ bị suy yếu, rụng lá và là mục tiêu tấn công của nấm <em>Phytophthora</em> gây xì mủ.</p>

      <img src=\"https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80\" alt=\"Phục hồi rễ sầu riêng\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />

      <h2>1. Tại sao phải phục hồi ngay lập tức?</h2>
      <p>Nhiều bà con có tâm lý \"để cây nghỉ ngơi\" sau thu hoạch. Đây là sai lầm chết người. Cây cần được ăn ngay để:</p>
      <ul>
        <li><strong>Tái tạo bộ rễ tơ:</strong> Bộ rễ đã bị suy kiệt và hư hại trong quá trình nuôi trái.</li>
        <li><strong>Làm sạch nấm bệnh:</strong> Loại bỏ nấm hồng, rong rêu bám trên cành lá sau mùa mưa.</li>
        <li><strong>Tích lũy dinh dưỡng:</strong> Chuẩn bị lực cho đợt làm bông tiếp theo.</li>
      </ul>

      <h2>2. Quy trình phục hồi 3 giai đoạn chuẩn Kỹ sư</h2>
      
      <h3>Giai đoạn 1: Vệ sinh vườn và sát khuẩn (Ngày 1 - 7)</h3>
      <p>Bà con cần tỉa cành vô hiệu, cành sâu bệnh. Sau đó phun sát khuẩn toàn bộ thân, cành, lá bằng hoạt chất sinh học để tẩy sạch nấm hồng, xì mủ. Đồng thời, tưới sát khuẩn vùng rễ để loại bỏ nấm gây thối rễ.</p>

      <h3>Giai đoạn 2: Kích rễ và cải tạo đất (Ngày 10 - 20)</h3>
      <p>Đây là giai đoạn quan trọng nhất. Sử dụng <strong>Humic K-Max</strong> để nâng pH đất và kích thích rễ tơ phát triển trở lại. Khi pH ổn định (5.5 - 6.5), rễ mới có thể hấp thụ phân bón hiệu quả nhất.</p>

      <img src=\"https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80\" alt=\"Cây sầu riêng phục hồi xanh tốt\" style=\"width:100%; border-radius: 20px; margin: 20px 0;\" />

      <h3>Giai đoạn 3: Dưỡng đọt và phục hồi bộ lá (Ngày 20 trở đi)</h3>
      <p>Phun <strong>Amino Plus</strong> định kỳ 7-10 ngày/lần để giúp đọt non ra đồng loạt, mập mạp và lá xanh dày. Bộ lá khỏe mạnh chính là \"nhà máy thức ăn\" lớn nhất để cây nuôi trái sau này.</p>

      <h2>3. Bí quyết để tiết kiệm 30% chi phí phân bón</h2>
      <p>Thay vì bón ồ ạt phân NPK hóa học, bà con hãy tập trung vào hữu cơ vi sinh. Đất tơi xốp, hệ vi sinh khỏe mạnh sẽ giúp cây tự kháng bệnh, giảm tối đa tiền thuốc trừ sâu.</p>

      <p><em>💬 Đừng để vườn sầu riêng của bạn kiệt sức! Hãy chụp ảnh vườn và nhắn tin cho đội ngũ Kỹ sư Phân Bón Giá Tốt để nhận giải pháp phục hồi riêng biệt cho vườn nhà mình nhé.</em></p>
    `,
    isPublished: true,
    seoDescription: "Quy trình phục hồi sầu riêng sau thu hoạch chuyên sâu. Giúp cây sung sức, mập đọt, sạch nấm bệnh và chuẩn bị cho vụ mùa mới năng suất cao.",
    hashtags: ["phuc-hoi-sau-rieng", "sau-thu-hoach", "sau-rieng-viet-nam", "humic-kmax"]
  };

  await Blog.findOneAndUpdate({ slug: article.slug }, article, { upsert: true });
  console.log('Successfully published perfect article!');
  mongoose.connection.close();
}

publishPerfectArticle();
