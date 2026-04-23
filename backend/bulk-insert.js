const mongoose = require('mongoose');
require('dotenv').config();

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  tags: [String],
  author: { type: String, default: 'Kỹ sư Phân bón' },
  published: { type: Boolean, default: true }
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

async function bulkInsert() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const articles = [
      {
        title: "Kỹ thuật bón phân cho cây cà phê giai đoạn nuôi trái đạt năng suất cao",
        slug: "ky-thuat-bon-phan-ca-phe-giai-doan-nuoi-trai",
        excerpt: "Hướng dẫn chi tiết cách chọn loại phân bón và lịch trình bón phân cho cây cà phê trong giai đoạn nuôi trái để hạn chế rụng quả và tăng trọng lượng nhân.",
        image: "https://loremflickr.com/800/600/coffee,bean,plantation/all?lock=101",
        tags: ["Cà phê", "Kỹ thuật bón phân", "Nuôi trái"],
        content: `
          <h2>I. Tầm quan trọng của việc bón phân giai đoạn nuôi trái</h2>
          <p>Giai đoạn nuôi trái là thời điểm cây cà phê cần nhiều dinh dưỡng nhất để phát triển nhân và duy trì sức khỏe của cây. Nếu thiếu hụt dinh dưỡng lúc này, cây sẽ bị kiệt sức, dẫn đến hiện tượng rụng quả hàng loạt hoặc hạt cà phê bị lép, nhỏ.</p>
          
          <h2>II. Các loại phân bón cần thiết</h2>
          <h3>1. Phân NPK có hàm lượng Kali cao</h3>
          <p>Kali đóng vai trò cực kỳ quan trọng trong việc vận chuyển đường và tinh bột về quả, giúp trái cà phê to, chắc nhân và chín đều. Anh nên ưu tiên các dòng NPK như 16-8-16 hoặc 15-5-20.</p>
          <img src="https://loremflickr.com/800/450/fertilizer,agriculture/all?lock=102" alt="Phân bón NPK cho cà phê" />
          
          <h3>2. Bổ sung các nguyên tố trung - vi lượng</h3>
          <p>Canxi và Boron là hai yếu tố không thể thiếu để giúp cuống trái dẻo dai, hạn chế rụng quả non. Ngoài ra, Kẽm và Magie giúp lá xanh bền, tăng khả năng quang hợp.</p>
          
          <h2>III. Lịch trình bón phân chi tiết</h2>
          <ul>
            <li><strong>Đợt 1 (Đầu mùa mưa):</strong> Bón phân NPK cân đối để cây hồi phục sau kỳ ra hoa.</li>
            <li><strong>Đợt 2 (Giữa mùa mưa):</strong> Tập trung hàm lượng Kali và Đạm cao để trái phát triển nhanh.</li>
            <li><strong>Đợt 3 (Cuối mùa mưa):</strong> Tăng cường Kali trắng để tích lũy tinh bột cho nhân, giúp cà phê nặng hạt.</li>
          </ul>
          
          <h2>IV. Những lưu ý khi bón phân cho cà phê</h2>
          <p>Tránh bón phân vào những ngày nắng gắt hoặc khi đất quá khô. Nên bón vào thời điểm đất đủ ẩm (sau mưa) và rải đều quanh tán cây để bộ rễ hút dinh dưỡng tốt nhất.</p>
        `
      },
      {
        title: "Cách nhận biết và xử lý bệnh vàng lá, thối rễ trên cây sầu riêng",
        slug: "cach-xu-ly-benh-vang-la-thoi-re-sau-rieng",
        excerpt: "Bệnh vàng lá thối rễ là nỗi ám ảnh của nhà vườn sầu riêng. Bài viết hướng dẫn cách nhận biết sớm và phác đồ điều trị hiệu quả bằng phân bón và thuốc sinh học.",
        image: "https://loremflickr.com/800/600/durian,fruit,farm/all?lock=201",
        tags: ["Sầu riêng", "Bệnh hại", "Vàng lá"],
        content: `
          <h2>I. Dấu hiệu nhận biết bệnh vàng lá thối rễ</h2>
          <p>Khi cây sầu riêng bị bệnh, các lá non sẽ bắt đầu chuyển màu vàng nhạt, gân lá vẫn xanh nhưng thịt lá vàng. Cây phát triển chậm, các đọt non bị chùn lại và rễ tơ bắt đầu đen, thối dần.</p>
          <img src="https://loremflickr.com/800/450/root,plant,disease/all?lock=202" alt="Dấu hiệu bệnh thối rễ" />
          
          <h2>II. Nguyên nhân chính gây bệnh</h2>
          <p>Nguyên nhân chủ yếu do nấm Phytophthora và Fusarium tấn công khi đất bị ngập úng hoặc quá chua (pH thấp). Việc bón quá nhiều phân hóa học mà thiếu phân hữu cơ cũng làm đất bị nghẹt, tạo điều kiện cho nấm phát triển.</p>
          
          <h2>III. Quy trình xử lý 4 bước</h2>
          <h3>Bước 1: Kiểm tra độ pH đất</h3>
          <p>Đất trồng sầu riêng cần độ pH từ 5.5 - 6.5. Nếu đất quá chua, hãy bổ sung vôi hoặc các loại lân hữu cơ để cải tạo đất ngay lập tức.</p>
          
          <h3>Bước 2: Xử lý nấm bệnh</h3>
          <p>Sử dụng các dòng thuốc có hoạt chất Metalaxyl hoặc Fosetyl Aluminium để tưới gốc, diệt trừ nấm bệnh đang tấn công bộ rễ.</p>
          
          <h3>Bước 3: Kích rễ và phục hồi</h3>
          <p>Sau khi diệt nấm 5-7 ngày, anh nên bổ sung Humic và các dòng phân bón lá vi lượng để kích thích rễ tơ phát triển trở lại.</p>
          
          <h2>IV. Biện pháp phòng ngừa lâu dài</h2>
          <p>Tăng cường bón phân chuồng ủ hoai mục kết hợp với nấm đối kháng Trichoderma để bảo vệ bộ rễ một cách bền vững nhất.</p>
        `
      },
      {
        title: "Hướng dẫn sử dụng phân bón lá hiệu quả, tránh cháy lá cho cây trồng",
        slug: "huong-dan-su-dung-phan-bon-la-hieu-qua",
        excerpt: "Phân bón lá giúp cây hấp thụ dinh dưỡng nhanh gấp nhiều lần bón gốc. Tuy nhiên, nếu dùng sai cách có thể gây cháy lá và rụng hoa.",
        image: "https://loremflickr.com/800/600/leaf,plants,green/all?lock=301",
        tags: ["Phân bón lá", "Kỹ thuật", "Dinh dưỡng"],
        content: `
          <h2>I. Tại sao nên sử dụng phân bón lá?</h2>
          <p>Phân bón lá chứa các chất dinh dưỡng ở dạng chelate giúp cây hấp thụ nhanh qua các lỗ khí khổng trên bề mặt lá. Đây là giải pháp "cứu cánh" khi bộ rễ cây bị suy yếu hoặc trong giai đoạn cây cần dinh dưỡng nhanh để nuôi hoa, nuôi trái.</p>
          
          <h2>II. 5 Quy tắc vàng khi phun phân bón lá</h2>
          <h3>1. Thời điểm phun tốt nhất</h3>
          <p>Nên phun vào sáng sớm (trước 9h) hoặc chiều mát (sau 16h). Tránh phun lúc trời nắng gắt vì lỗ khí khổng sẽ đóng lại, cây không hấp thụ được dinh dưỡng và dễ bị cháy lá.</p>
          <img src="https://loremflickr.com/800/450/farming,spray/all?lock=302" alt="Phun phân bón lá đúng cách" />
          
          <h3>2. Pha đúng nồng độ khuyến cáo</h3>
          <p>Luôn tuân thủ hướng dẫn của nhà sản xuất. Tuyệt đối không tự ý tăng liều vì có thể làm nồng độ muối trên bề mặt lá quá cao, gây mất nước và cháy lá.</p>
          
          <h3>3. Phun đều mặt dưới lá</h3>
          <p>Lỗ khí khổng tập trung nhiều nhất ở mặt dưới của lá. Vì vậy, khi phun anh nên đưa vòi phun hướng từ dưới lên để đạt hiệu quả cao nhất.</p>
          
          <h2>III. Những trường hợp không nên dùng phân bón lá</h2>
          <p>Không phun phân bón lá khi cây đang bị bệnh nặng, khi trời sắp mưa hoặc khi cây đang trong giai đoạn nhạy cảm nhất của việc thụ phấn hoa.</p>
        `
      }
    ];

    for (const article of articles) {
      await Blog.findOneAndUpdate(
        { slug: article.slug },
        article,
        { upsert: true, new: true }
      );
      console.log(`Inserted/Updated: ${article.title}`);
    }

    console.log("Success: 3 articles have been added to the database!");
    process.exit(0);
  } catch (err) {
    console.error("Error inserting articles:", err.message);
    process.exit(1);
  }
}

bulkInsert();
