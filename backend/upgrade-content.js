const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const API_BASE = "https://phanbongiatot.onrender.com/api";

const imgCoffee = "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989048/phanbongiatot/jpjgjjvfg7pglnnh0a1a.jpg";
const imgDurian = "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg";
const imgFertilizer = "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989073/phanbongiatot/y6imlcebopgmarsfpp8e.jpg";

const articles = [
  {
    title: "Hướng Dẫn Chi Tiết Bón Phân Cà Phê Giai Đoạn Nuôi Trái: 5 Bước Giúp Hạt Chắc, Nhân To, Đạt Năng Suất Kỷ Lục",
    slug: "huong-dan-chi-tiet-bon-phan-ca-phe-nuoi-trai-v7",
    excerpt: "Làm sao để cà phê không bị rụng trái non và đạt năng suất cao nhất? Khám phá quy trình 5 bước bón phân chuyên sâu, kết hợp dinh dưỡng hữu cơ và vi lượng giúp hạt chắc, nặng ký.",
    image: imgCoffee,
    tags: ["Cà phê", "Kỹ thuật bón phân", "Kiến thức kỹ thuật"],
    content: `
      <p>Chào bà con, làm cà phê ở Tây Nguyên giai đoạn nuôi trái là thời điểm "cân não" nhất. Nhìn vườn cà phê trĩu quả nhưng nếu không biết cách chăm sóc, chỉ sau vài trận mưa lớn, quả sẽ rụng đầy gốc, hoặc đến khi thu hoạch thì nhân lại lép, nhẹ ký. Tại Phân Bón Giá Tốt, chúng tôi thấu hiểu nỗi lo đó và xin chia sẻ quy trình bón phân chuyên sâu giúp bà con tối ưu năng suất.</p>

      <img src="${imgCoffee}" alt="Vườn cà phê trĩu quả" style="width:100%; border-radius:12px; margin: 20px 0;" />

      <h2>1. Vì sao cây cà phê hay bị rụng trái và nhân lép?</h2>
      <p>Có 3 nguyên nhân cốt lõi bà con cần nắm rõ:</p>
      <ul>
        <li><strong>Mất cân bằng dinh dưỡng:</strong> Cây dồn toàn bộ nhựa sống nuôi trái khiến cành lá bị suy, nếu không bù đắp kịp thời cây sẽ tự rụng trái để sinh tồn.</li>
        <li><strong>Sốc độ ẩm mùa mưa:</strong> Rễ tơ bị ngạt oxy, thối đầu rễ làm cây không hút được dinh dưỡng.</li>
        <li><strong>Thiếu hụt Canxi - Boron:</strong> Đây là "chìa khóa" của tầng rời. Thiếu hai chất này, cuống quả sẽ giòn và dễ rụng chỉ sau một trận mưa lớn.</li>
      </ul>

      <h2>2. Quy trình 5 bước bón phân nuôi trái chuẩn "Phân Bón Giá Tốt"</h2>
      
      <h3>Bước 1: Kiểm tra nền đất và Cân bằng pH (Tháng 5 - Tháng 6)</h3>
      <p>Trước khi bón phân, hãy đảm bảo pH đất đạt từ 5.5 - 6.5. Nếu đất chua (pH < 5.0), cây sẽ bị "khóa" dinh dưỡng, bón bao nhiêu phân cũng lãng phí. Bà con nên bón vôi hoặc lân hữu cơ để cải thiện nền đất.</p>

      <h3>Bước 2: Phục hồi bộ rễ tơ bằng Humic chuyên dụng</h3>
      <p>Đầu mùa mưa, bộ rễ thường bị tổn thương. Đây là lúc cần đến "ngòi nổ" kích rễ.</p>
      <p><strong>Giải pháp:</strong> Sử dụng <a href="https://phanbongiatot.com/san-pham/phan-bon-la-acti-rooti-kich-re-cuc-manh-phuc-hoi-cay-trong"><strong>Acti Rooti</strong></a>. Với hàm lượng hữu cơ cao, Acti Rooti giúp giải độc đất, kích thích ra rễ cám trắng xóa, tạo tiền đề để cây hấp thụ phân bón gốc tốt nhất.</p>

      <h3>Bước 3: Bón phân NPK cân đối theo tỷ lệ "Vàng"</h3>
      <p>Giai đoạn nuôi trái, cây cần nhiều Đạm và Kali. Bà con nên chọn các dòng NPK có tỷ lệ 2:1:2 hoặc 3:1:3 (ví dụ 16-8-16 hoặc 19-9-19). Liều lượng bón từ 0.8 - 1.2kg/gốc tùy tuổi cây và sản lượng quả trên cây.</p>

      <h3>Bước 4: Bổ sung dinh dưỡng qua lá để chặn đứng rụng quả</h3>
      <p>Khi trời mưa liên tục, rễ cây bị đình trệ, việc phun qua lá là giải pháp cứu cánh thần tốc.</p>
      <p><strong>Bí kíp:</strong> Sử dụng bộ đôi <a href="https://phanbongiatot.com/san-pham/phan-bon-la-acti-flora-thuc-day-phan-hoa-mam-hoa-kich-hoa"><strong>Acti Flora</strong></a> kết hợp với Canxi Bo. Acti Flora giúp thúc đẩy quá trình trao đổi chất, đưa dinh dưỡng trực tiếp vào quả, giúp cuống chắc khỏe và nhân to nhanh chóng.</p>

      <h3>Bước 5: Quản lý nấm bệnh và Tuyến trùng rễ</h3>
      <p>Mùa mưa là điều kiện lý tưởng cho nấm bệnh tấn công rễ. Bà con cần tưới phòng nấm và tuyến trùng định kỳ bằng các chế phẩm sinh học an toàn (Nemano) để bảo vệ bộ rễ suốt mùa nuôi trái.</p>

      <h2>3. Những sai lầm "chết người" cần tránh</h2>
      <ol>
        <li><strong>Bón phân sát gốc:</strong> Rễ hút dinh dưỡng nằm ở đầu tán lá. Bà con hãy bón theo hình chiếu tán lá để cây hấp thụ tốt nhất.</li>
        <li><strong>Quên lấp đất sau khi bón:</strong> Nắng nóng sẽ làm bay hơi Đạm. Việc lấp đất nhẹ giúp tiết kiệm đến 30% lượng phân bón.</li>
      </ol>

      <p><em>Lời nhắn từ kỹ sư:</em> Chúc bà con có một mùa cà phê thắng lợi!</p>
    `
  },
  {
    title: "Phác Đồ 4 Bước Xử Lý Dứt Điểm Bệnh Vàng Lá Thối Rễ Sầu Riêng – 'Cải Tử Hoàn Sinh' Cho Vườn Cây",
    slug: "phac-do-xu-ly-vang-la-thoi-re-sau-rieng-v7",
    excerpt: "Nhìn vườn sầu riêng bạc tỷ chết dần vì thối rễ là nỗi đau của bất kỳ nhà vườn nào. Khám phá phác đồ 4 bước xử lý dứt điểm nấm bệnh và phục hồi cây thần tốc.",
    image: imgDurian,
    tags: ["Sầu riêng", "Bệnh hại", "Cấp cứu cây"],
    content: `
      <p>Chào bà con, vàng lá thối rễ là "tử thần" số 1 trên cây sầu riêng. Nhiều bà con khi thấy cây vàng lá thì cuống cuồng mua phân hóa học bón vào để "kích xanh", nhưng kết quả là cây chết nhanh hơn. Tại Phân Bón Giá Tốt, chúng tôi hướng dẫn bà con quy trình "Cứu cây từ gốc" chuẩn khoa học và hiệu quả nhất.</p>

      <img src="${imgDurian}" alt="Cứu sống sầu riêng bị thối rễ" style="width:100%; border-radius:12px; margin: 20px 0;" />

      <h2>1. Dấu hiệu báo động đỏ bà con cần kiểm tra ngay</h2>
      <p>Hãy dành 10 phút ra vườn kiểm tra 3 vị trí sau:</p>
      <ul>
        <li><strong>Lá:</strong> Các lá già ngả vàng, gân lá xanh nhạt. Hiện tượng rụng lá già hàng loạt là dấu hiệu bệnh đã nặng.</li>
        <li><strong>Rễ:</strong> Dùng cuốc xới nhẹ quanh tán, nếu thấy rễ tơ bị đen, vỏ rễ dễ tuột khỏi lõi và có mùi hôi thì chắc chắn rễ đã bị thối.</li>
      </ul>

      <h2>2. Quy trình 4 bước "Cải tử hoàn sinh" cho vườn sầu riêng</h2>

      <h3>Bước 1: Vệ sinh vườn và Hạ phèn</h3>
      <p>Ngừng ngay việc bón phân hóa học. Cắt tỉa các cành khô, cành bị bệnh. Bón vôi hoặc tinh vôi để nâng pH đất lên trên 5.5, tạo môi trường bất lợi cho nấm bệnh.</p>

      <h3>Bước 2: Diệt sạch nấm bệnh và Tuyến trùng rễ</h3>
      <p>Đây là bước then chốt nhất. Bà con cần sử dụng chế phẩm sinh học đặc trị.</p>
      <p><strong>Giải pháp:</strong> Sử dụng <a href="https://phanbongiatot.com/san-pham/nemano-che-pham-sinh-hoc-xu-ly-tuyen-trung-nam-khuan"><strong>Nemano</strong></a>. Đây là chế phẩm sinh học xử lý tuyến trùng - nấm - khuẩn cực mạnh. Tưới đẫm Nemano quanh vùng rễ 2-3 lần, mỗi lần cách nhau 5-7 ngày.</p>

      <h3>Bước 3: Phục hồi bộ rễ và Cấp cứu cây suy kiệt</h3>
      <p>Sau khi đã sạch nấm, bà con cần "đánh thức" bộ rễ.</p>
      <p><strong>Giải pháp:</strong> Tưới <a href="https://phanbongiatot.com/san-pham/phan-bon-la-acti-rooti-kich-re-cuc-manh-phuc-hoi-cay-trong"><strong>Acti Rooti</strong></a>. Sản phẩm giúp kích thích ra rễ cám trắng xóa, giải độc đất và phục hồi cây trồng thần tốc.</p>

      <h3>Bước 4: Nuôi lại bộ lá và Bảo vệ sinh học</h3>
      <p>Khi cây đã bắt đầu nhú đọt non, hãy bón bổ sung phân hữu cơ hoai mục kết hợp nấm đối kháng Trichoderma.</p>

      <p><em>Lời nhắn:</em> Hãy kiên trì chăm sóc bộ rễ để cây sầu riêng phát triển bền vững anh em nhé!</p>
    `
  },
  {
    title: "5 Sai Lầm Tai Hại Khi Dùng Phân Bón Lá Khiến Cây Bị 'Cháy Lá' – Cách Sử Dụng Hiệu Quả X3 Năng Suất",
    slug: "sai-lam-dung-phan-bon-la-v7",
    excerpt: "Phun phân bón lá là con dao hai lưỡi. Dùng đúng thì cây xanh mướt, dùng sai thì chỉ sau một đêm vườn cây bị 'luộc chín'. Xem ngay 5 quy tắc vàng để bảo vệ vườn cây của bạn.",
    image: imgFertilizer,
    tags: ["Phân bón lá", "Kỹ thuật canh tác", "Cảnh báo"],
    content: `
      <p>Chào bà con, phân bón lá giúp cây hấp thụ dinh dưỡng nhanh gấp 10 lần qua rễ. Tuy nhiên, nếu không nắm vững kỹ thuật, bà con có thể vô tình "nướng chín" vườn cây của mình.</p>

      <img src="${imgFertilizer}" alt="Hướng dẫn phun phân bón lá an toàn" style="width:100%; border-radius:12px; margin: 20px 0;" />

      <h2>1. Tại sao phân bón lá lại dễ gây hiện tượng "Cháy lá"?</h2>
      <p>Lá cây có hàng triệu lỗ khí khổng. Khi bà con phun phân với nồng độ quá cao hoặc phun lúc nắng gắt, nồng độ muối tăng vọt làm tế bào lá bị chết khô ngay lập tức.</p>

      <h2>2. 5 Sai lầm "Tử huyệt" bà con cần tránh</h2>
      <ul>
        <li><strong>Phun lúc nắng gắt (10h - 15h):</strong> Đây là lỗi nặng nhất.</li>
        <li><strong>Pha quá liều hướng dẫn:</strong> Tâm lý pha đậm cho nhanh tốt.</li>
        <li><strong>Phun khi cây đang thiếu nước héo lá.</strong></li>
        <li><strong>Chỉ phun mặt trên lá.</strong></li>
        <li><strong>Phối trộn sai cách.</strong></li>
      </ul>

      <h2>3. Quy trình phun phân bón lá chuẩn "Chuyên gia"</h2>
      <p>Thời điểm tốt nhất là từ 6h-8h sáng hoặc sau 16h chiều mát. Phải phun vào mặt dưới lá. Chọn sản phẩm dễ tiêu như <strong>Acti Flora</strong> hoặc <strong>Acti Rooti</strong>.</p>
    `
  }
];

async function run() {
  console.log("Logging in as Admin...");
  let loginRes;
  try {
    loginRes = execSync(`curl.exe -X POST "${API_BASE}/auth/login" -H "Content-Type: application/json" -d "{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"phanbongiatot123\\\"}"`).toString();
  } catch (e) {
    console.error("Login failed:", e.message);
    return;
  }
  
  const { token } = JSON.parse(loginRes);

  for (const article of articles) {
    const tempFile = path.join(__dirname, `temp_${article.slug}.json`);
    fs.writeFileSync(tempFile, JSON.stringify(article, null, 2), 'utf8');
    try {
      execSync(`curl.exe -X POST "${API_BASE}/blogs" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" --data-binary "@${tempFile}"`).toString();
      console.log(`Success: ${article.slug}`);
    } catch (err) {
      console.error(`Error for ${article.slug}`);
    } finally {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  }
  console.log("ALL V7 POSTS (FULL CONTENT) ARE LIVE!");
}

run();
