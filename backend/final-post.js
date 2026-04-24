const AGENT_TOKEN = "ANTIGRAVITY_AGENT_SECRET_2026";
const API_BASE = "https://phanbongiatot.onrender.com/api";

const imgCoffee = "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989048/phanbongiatot/jpjgjjvfg7pglnnh0a1a.jpg";
const imgDurian = "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg";
const imgFertilizer = "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989073/phanbongiatot/y6imlcebopgmarsfpp8e.jpg";

async function run() {
  console.log("Starting final content update with NEW slugs...");
  
  try {
    const articles = [
      {
        title: "Kỹ thuật bón phân cho cây cà phê giai đoạn nuôi trái đạt năng suất cao",
        slug: "ky-thuat-bon-phan-ca-phe-nuoi-trai-chuyen-gia-v2",
        excerpt: "Hướng dẫn chi tiết từ các chuyên gia nông nghiệp về cách chọn loại phân bón, liều lượng và lịch trình bón phân cho cây cà phê giai đoạn nuôi trái để đạt năng suất tối đa, hạt chắc và hạn chế rụng quả.",
        image: imgCoffee,
        tags: ["Cà phê", "Kỹ thuật bón phân", "Tăng năng suất"],
        content: `
          <p>Chào bà con, giai đoạn nuôi trái là thời điểm quyết định trực tiếp đến túi tiền của chúng ta sau một năm vất vả. Nếu bón phân không đúng cách, hạt sẽ nhỏ, lép và cây rất nhanh bị suy kiệt.</p>
          
          <img src="${imgCoffee}" alt="Vườn cà phê trĩu quả" style="width:100%; border-radius:12px; margin: 20px 0;" />

          <h2>I. Tại sao giai đoạn nuôi trái lại quyết định năng suất cà phê?</h2>
          <p>Giai đoạn nuôi trái (từ khi đậu quả đến khi thu hoạch) là thời kỳ cây cà phê tiêu tốn nhiều năng lượng và dinh dưỡng nhất. Đây là lúc nhân cà phê được hình thành và tích lũy tinh bột. Nếu thiếu dinh dưỡng, cây sẽ tự động đào thải trái (rụng quả non) hoặc nhân sẽ bị lép, nhẹ ký.</p>

          <h2>II. Nhu cầu dinh dưỡng đặc thù của cây cà phê</h2>
          <h3>1. Đạm (N) và Kali (K) - Cặp đôi hoàn hảo</h3>
          <p>Trong giai đoạn này, cây cần Đạm để duy trì bộ lá xanh tốt và Kali để vận chuyển chất dinh dưỡng về nuôi quả. Tỷ lệ N-K cân đối giúp trái lớn nhanh và hạt chắc. Anh nên chọn các dòng phân bón NPK có hàm lượng Kali cao như 16-8-16 hoặc 15-5-20.</p>
          
          <h3>2. Vai trò của Trung - Vi lượng (TE)</h3>
          <p>Thiếu Canxi và Boron là nguyên nhân hàng đầu gây rụng quả non. Ngoài ra, Kẽm và Magie giúp cây chống chọi tốt với sâu bệnh và biến đổi thời tiết. Đừng quên bổ sung các chất này qua đường bón gốc hoặc phun qua lá.</p>

          <h2>III. Lịch trình bón phân chi tiết theo từng đợt</h2>
          <p>Nhà nông cần chia làm 3 đợt bón chính trong suốt mùa mưa để cây có thể hấp thụ dinh dưỡng một cách hiệu quả nhất:</p>
          <ul>
            <li><strong>Đợt 1 (Đầu mùa mưa):</strong> Sử dụng phân bón có hàm lượng Đạm và Lân cao để cây phục hồi bộ rễ và phát triển cành dự trữ cho vụ sau.</li>
            <li><strong>Đợt 2 (Giữa mùa mưa):</strong> Đây là lúc trái đang lớn nhanh nhất. Sử dụng phân NPK có tỷ lệ Kali cao để tập trung nuôi trái và chắc hạt.</li>
            <li><strong>Đợt 3 (Cuối mùa mưa):</strong> Tăng cường Kali trắng (K2SO4) để tăng độ đậm đặc của dịch tế bào, giúp hạt cà phê nặng và chín đồng loạt, màu sắc đẹp.</li>
          </ul>

          <h2>IV. Các lưu ý kỹ thuật khi bón phân</h2>
          <p>Anh cần lưu ý tuyệt đối không bón phân khi đất quá khô. Nên bón sau khi có mưa, lúc đất đủ ẩm nhưng không bị ngập úng. Rải phân theo hình chiếu của tán cây (cách gốc khoảng 20-30cm) và lấp nhẹ đất để tránh tình trạng bay hơi Đạm do nắng nóng.</p>
          
          <p><em>Lời khuyên từ kỹ sư:</em> Ngoài việc bón gốc, anh nên kết hợp phun thêm phân bón lá có chứa Bo và Canxi định kỳ 15-20 ngày một lần trong 2 tháng đầu nuôi trái để giúp cuống quả dẻo dai hơn, giảm tỷ lệ rụng quả non đến 30%.</p>
        `
      },
      {
        title: "Cách xử lý dứt điểm bệnh vàng lá thối rễ trên cây sầu riêng",
        slug: "xu-ly-vang-la-thoi-re-sau-rieng-phong-do-v2",
        excerpt: "Bệnh vàng lá thối rễ là 'kẻ thù số 1' của cây sầu riêng. Bài viết này chia sẻ phác đồ điều trị 4 bước đã được kiểm chứng hiệu quả, giúp cứu sống cây sầu riêng bị suy kiệt.",
        image: imgDurian,
        tags: ["Sầu riêng", "Bệnh hại", "Cấp cứu cây"],
        content: `
          <p>Bệnh vàng lá thối rễ không chỉ làm giảm năng suất mà còn có thể giết chết cây sầu riêng quý giá của bà con nếu không được xử lý kịp thời và đúng cách.</p>

          <img src="${imgDurian}" alt="Vườn sầu riêng khỏe mạnh" style="width:100%; border-radius:12px; margin: 20px 0;" />

          <h2>I. Nhận diện sớm dấu hiệu vàng lá thối rễ</h2>
          <p>Bệnh do tổ hợp nấm Phytophthora và Fusarium gây ra. Dấu hiệu đầu tiên là các lá già bắt đầu ngả vàng, gân lá vẫn còn xanh nhạt. Sau đó, lá rụng dần và các đầu cành bắt đầu khô. Khi bới đất kiểm tra bộ rễ, anh sẽ thấy các rễ tơ bị đen, vỏ rễ dễ dàng tuột ra khỏi lõi và có mùi hôi đặc trưng.</p>

          <h2>II. Phác đồ điều trị 4 bước thần tốc</h2>
          <h3>Bước 1: Cải tạo môi trường đất (Hạ phèn - Nâng pH)</h3>
          <p>Đầu tiên cần ngừng ngay việc bón phân hóa học. Anh hãy bón vôi hoặc sử dụng các chế phẩm lân hữu cơ để nâng độ pH đất lên trên 5.5. Đất quá chua (pH < 4.5) là môi trường lý tưởng cho nấm bệnh tấn công rễ.</p>

          <h3>Bước 2: Diệt nấm bệnh tận gốc</h3>
          <p>Sử dụng các hoạt chất đặc trị như Metalaxyl, Mancozeb hoặc Fosetyl Aluminium. Anh cần pha đúng liều lượng và tưới đẫm quanh tán cây (tưới vào vùng rễ tơ) từ 2-3 lần, mỗi lần cách nhau 5-7 ngày để diệt sạch mầm mống nấm bệnh.</p>

          <h3>Bước 3: Kích thích tái tạo bộ rễ mới</h3>
          <p>Sau khi đã diệt nấm (khoảng 7 ngày sau lần tưới thuốc cuối), bộ rễ cây đang rất yếu. Đây là lúc cần bổ sung Humic và Fulvic đậm đặc để kích thích rễ tơ mới ra đời. Anh sẽ thấy cây bắt đầu nhú đọt non trở lại sau khoảng 10-15 ngày.</p>

          <h3>Bước 4: Bổ sung vi sinh đối kháng bảo vệ</h3>
          <p>Để ngăn bệnh quay lại, anh nên bón phân chuồng hoai mục kết hợp với nấm đối kháng Trichoderma. Đây là lớp bảo vệ sinh học bền vững nhất, giúp "khống chế" nấm bệnh từ xa.</p>

          <h2>III. Những sai lầm cần tránh khi cây đang bệnh</h2>
          <p>Tuyệt đối không bón phân Đạm cao (như Ure) khi cây đang bị thối rễ vì sẽ làm vết thương lan rộng và cây chết nhanh hơn. Đồng thời, cần tạo rãnh thoát nước tốt cho vườn, không để gốc cây bị ngập úng trong suốt mùa mưa.</p>
        `
      },
      {
        title: "Bí quyết sử dụng phân bón lá để cây xanh tốt, không bị cháy lá",
        slug: "bi-quyet-dung-phan-bon-la-vinh-cuu-v2",
        excerpt: "Phân bón lá giúp cây hấp thụ dinh dưỡng nhanh gấp 10 lần qua rễ. Tuy nhiên, nếu dùng sai cách sẽ gây hại cực lớn. Khám phá 5 quy tắc vàng giúp cây hấp thụ tối đa dinh dưỡng.",
        image: imgFertilizer,
        tags: ["Phân bón lá", "Kỹ thuật canh tác", "Dinh dưỡng cây"],
        content: `
          <p>Sử dụng phân bón lá là cách nhanh nhất để đưa dinh dưỡng vào cây, nhưng ranh giới giữa "tốt cây" và "cháy lá" là rất mong manh nếu bà con không nắm vững kỹ thuật.</p>

          <img src="${imgFertilizer}" alt="Nông dân phun phân bón lá chuyên nghiệp" style="width:100%; border-radius:12px; margin: 20px 0;" />

          <h2>I. Tại sao phân bón lá lại hiệu quả thần kỳ?</h2>
          <p>Lá cây có hàng triệu lỗ khí khổng. Khi phun phân bón lá dạng chelate, dinh dưỡng được hấp thụ trực tiếp qua các lỗ này và đi thẳng vào quá trình trao đổi chất. Điều này cực kỳ hiệu quả khi cây đang trong giai đoạn nhạy cảm như nuôi bông, nuôi trái hoặc khi bộ rễ đang bị tổn thương do ngập úng.</p>

          <h2>II. 5 Quy tắc vàng để dùng phân bón lá an toàn</h2>
          <h3>1. Thời điểm phun là yếu tố quyết định</h3>
          <p>Thời điểm phun tốt nhất là sáng sớm (trước 9h) hoặc chiều mát (sau 16h). Đây là lúc các lỗ khí khổng mở rộng nhất để đón nhận dinh dưỡng. Tuyệt đối không phun lúc nắng gắt vì phân sẽ bị khô nhanh, nồng độ muối tăng cao gây cháy lá tức thì.</p>

          <h3>2. Pha đúng nồng độ - Không được "tham"</h3>
          <p>Luôn tuân thủ hướng dẫn trên bao bì. Việc tự ý tăng liều lượng sẽ khiến tế bào lá bị sốc nhiệt và mất nước, dẫn đến hiện tượng cháy sém mép lá hoặc rụng hoa hàng loạt.</p>

          <h3>3. Phun đều mặt dưới lá</h3>
          <p>Nghiên cứu cho thấy 70-80% lỗ khí khổng tập trung ở mặt dưới lá. Vì vậy, khi phun bà con nên đưa vòi phun hướng từ dưới lên trên để đạt hiệu quả hấp thụ cao nhất.</p>

          <h2>III. Cách phối trộn thông minh</h2>
          <p>Bà con có thể trộn phân bón lá với thuốc sâu để tiết kiệm công. Tuy nhiên, tránh trộn các loại phân có chứa gốc Canxi với các thuốc có gốc Đồng hoặc Lưu huỳnh vì sẽ gây kết tủa, làm mất tác dụng của cả hai loại.</p>
          
          <p><strong>Mẹo chuyên gia:</strong> Hãy pha thử một ít vào cốc nước trước, nếu thấy nước trong, không vón cục thì mới cho vào bình phun lớn nhé!</p>
        `
      }
    ];

    for (const article of articles) {
      const response = await fetch(`${API_BASE}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AGENT_TOKEN}`
        },
        body: JSON.stringify(article)
      });
      if (response.ok) {
        console.log(`Success: Posted "${article.title}"`);
      } else {
        const text = await response.text();
        console.error(`Failed "${article.title}":`, text);
      }
    }
    
    console.log("All articles updated with NEW slugs and FULL LONG content!");
  } catch (err) {
    console.error("Error during final update:", err.message);
  }
}

run();
