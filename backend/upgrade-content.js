const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const AGENT_TOKEN = "ANTIGRAVITY_AGENT_SECRET_2026";
const API_BASE = "https://phanbongiatot.onrender.com/api";

const imgCoffee = "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989048/phanbongiatot/jpjgjjvfg7pglnnh0a1a.jpg";
const imgDurian = "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg";
const imgFertilizer = "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989073/phanbongiatot/y6imlcebopgmarsfpp8e.jpg";

const articles = [
  {
    title: "Hướng Dẫn Chi Tiết Bón Phân Cà Phê Giai Đoạn Nuôi Trái: 5 Bước Giúp Hạt Chắc, Nhân To, Đạt Năng Suất Kỷ Lục",
    slug: "huong-dan-chi-tiet-bon-phan-ca-phe-nuoi-trai-v6",
    excerpt: "Làm sao để cà phê không bị rụng trái non và đạt năng suất cao nhất? Khám phá quy trình 5 bước bón phân chuyên sâu, kết hợp dinh dưỡng hữu cơ và vi lượng giúp hạt chắc, nặng ký.",
    image: imgCoffee,
    tags: ["Cà phê", "Kỹ thuật bón phân", "Kiến thức kỹ thuật"],
    content: `
      <p>Chào bà con, làm cà phê ở Tây Nguyên giai đoạn nuôi trái là thời điểm "cân não" nhất. Nhìn vườn cà phê trĩu quả nhưng nếu không biết cách chăm sóc, chỉ sau vài trận mưa lớn, quả sẽ rụng đầy gốc, hoặc đến khi thu hoạch thì nhân lại lép, nhẹ ký. Tại Phân Bón Giá Tốt, chúng tôi thấu hiểu nỗi lo đó và xin chia sẻ quy trình bón phân chuyên sâu giúp bà con tối ưu năng suất.</p>

      <img src="${imgCoffee}" alt="Vườn cà phê trĩu quả năng suất cao" style="width:100%; border-radius:12px; margin: 20px 0;" />

      <h2>1. Vì sao cây cà phê hay bị rụng trái và nhân lép?</h2>
      <p>Có 3 nguyên nhân cốt lõi bà con cần nắm rõ:</p>
      <ul>
        <li><strong>Mất cân bằng dinh dưỡng:</strong> Cây dồn toàn bộ nhựa sống nuôi trái khiến cành lá bị suy, nếu không bù đắp kịp thời cây sẽ tự rụng trái để sinh tồn.</li>
        <li><strong>Sốc độ ẩm mùa mưa:</strong> Rễ tơ bị ngạt oxy, thối đầu rễ làm cây không hút được dinh dưỡng.</li>
        <li><strong>Thiếu hụt Trung - Vi lượng:</strong> Đặc biệt là Canxi và Boron - hai chất quyết định độ dẻo dai của cuống quả.</li>
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
      <p>Mùa mưa là điều kiện lý tưởng cho nấm bệnh tấn công rễ. Bà con cần tưới phòng nấm và tuyến trùng định kỳ bằng các chế phẩm sinh học an toàn để bảo vệ bộ rễ suốt mùa nuôi trái.</p>

      <h2>3. Những sai lầm "chết người" cần tránh</h2>
      <ol>
        <li><strong>Bón phân sát gốc:</strong> Rễ hút dinh dưỡng nằm ở đầu tán lá. Bà con hãy bón theo hình chiếu tán lá để cây hấp thụ tốt nhất.</li>
        <li><strong>Quên lấp đất sau khi bón:</strong> Nắng nóng sẽ làm bay hơi Đạm. Việc lấp đất nhẹ giúp tiết kiệm đến 30% lượng phân bón.</li>
        <li><strong>Lạm dụng phân hóa học:</strong> Khiến đất bị chai cứng, trơ rễ. Hãy kết hợp bón phân hữu cơ hoai mục định kỳ.</li>
      </ol>

      <h2>4. Kết luận</h2>
      <p>Chăm cà phê giai đoạn nuôi trái cần sự tỉ mỉ và đúng thời điểm. Một bộ rễ khỏe mạnh từ <strong>Acti Rooti</strong> và nguồn dinh dưỡng dồi dào từ <strong>Acti Flora</strong> chính là chìa khóa cho một vụ mùa bội thu. Chúc bà con có một năm thu hoạch đầy kho!</p>
    `
  },
  {
    title: "Bệnh Vàng Lá Thối Rễ Sầu Riêng: Nhận Diện Sớm - Trị Tận Gốc - Cứu Vườn Kịp Lúc",
    slug: "benh-vang-la-thoi-re-sau-rieng-v6",
    excerpt: "Nhìn vườn sầu riêng bạc tỷ chết dần vì thối rễ là nỗi đau của bất kỳ nhà vườn nào. Khám phá phác đồ 4 bước xử lý dứt điểm nấm bệnh và phục hồi cây thần tốc.",
    image: imgDurian,
    tags: ["Sầu riêng", "Bệnh hại", "Cấp cứu cây"],
    content: `
      <p>Chào bà con, vàng lá thối rễ là "tử thần" số 1 trên cây sầu riêng. Nhiều bà con khi thấy cây vàng lá thì cuống cuồng mua phân hóa học bón vào để "kích xanh", nhưng kết quả là cây chết nhanh hơn. Tại Phân Bón Giá Tốt, chúng tôi hướng dẫn bà con quy trình "Cứu cây từ gốc" chuẩn khoa học và hiệu quả nhất.</p>

      <img src="${imgDurian}" alt="Cứu sống cây sầu riêng bị vàng lá thối rễ" style="width:100%; border-radius:12px; margin: 20px 0;" />

      <h2>1. Dấu hiệu báo động đỏ bà con cần kiểm tra ngay</h2>
      <p>Hãy dành 10 phút ra vườn kiểm tra 3 vị trí sau:</p>
      <ul>
        <li><strong>Lá:</strong> Các lá già ngả vàng, gân lá xanh nhạt. Hiện tượng rụng lá già hàng loạt là dấu hiệu bệnh đã nặng.</li>
        <li><strong>Rễ:</strong> Dùng cuốc xới nhẹ quanh tán, nếu thấy rễ tơ bị đen, vỏ rễ dễ tuột khỏi lõi và có mùi hôi thì chắc chắn rễ đã bị thối.</li>
        <li><strong>Đọt:</strong> Cây đứng im, không nhú đọt non hoặc đọt ra rất ngắn và yếu.</li>
      </ul>

      <h2>2. Phác đồ xử lý 4 bước "Cải tử hoàn sinh" cho vườn sầu riêng</h2>

      <h3>Bước 1: Vệ sinh vườn và Hạ phèn</h3>
      <p>Ngừng ngay việc bón phân hóa học. Cắt tỉa các cành khô, cành bị bệnh. Bón vôi hoặc tinh vôi để nâng pH đất lên trên 5.5, tạo môi trường bất lợi cho nấm bệnh.</p>

      <h3>Bước 2: Diệt sạch nấm bệnh và Tuyến trùng rễ</h3>
      <p>Đây là bước then chốt nhất. Bà con cần sử dụng chế phẩm sinh học đặc trị.</p>
      <p><strong>Giải pháp:</strong> Sử dụng <a href="https://phanbongiatot.com/san-pham/nemano-che-pham-sinh-hoc-xu-ly-tuyen-trung-nam-khuan"><strong>Nemano</strong></a>. Đây là chế phẩm sinh học xử lý tuyến trùng - nấm - khuẩn cực mạnh. Tưới đẫm Nemano quanh vùng rễ 2-3 lần, mỗi lần cách nhau 5-7 ngày để diệt tận gốc mầm bệnh trong đất.</p>

      <h3>Bước 3: Phục hồi bộ rễ và Cấp cứu cây suy kiệt</h3>
      <p>Sau khi đã sạch nấm (khoảng 7 ngày sau đợt thuốc cuối), bà con cần "đánh thức" bộ rễ.</p>
      <p><strong>Giải pháp:</strong> Tưới <a href="https://phanbongiatot.com/san-pham/phan-bon-la-acti-rooti-kich-re-cuc-manh-phuc-hoi-cay-trong"><strong>Acti Rooti</strong></a>. Sản phẩm giúp kích thích ra rễ cám trắng xóa, giải độc đất và phục hồi cây trồng thần tốc sau khi bị bệnh hại tấn công.</p>

      <h3>Bước 4: Nuôi lại bộ lá và Bảo vệ sinh học</h3>
      <p>Khi cây đã bắt đầu nhú đọt non, hãy bón bổ sung phân hữu cơ hoai mục kết hợp nấm đối kháng Trichoderma để duy trì hàng rào bảo vệ rễ vĩnh viễn.</p>

      <h2>3. 3 Sai lầm khiến bệnh vàng lá thối rễ quay trở lại</h2>
      <ol>
        <li><strong>Đất quá chua (pH thấp):</strong> pH thấp là môi trường vàng của nấm Phytophthora. Hãy luôn duy trì pH trên 5.5.</li>
        <li><strong>Vườn bị ngập úng:</strong> Rễ bị ngạt oxy sẽ thối rất nhanh. Hãy xẻ rãnh thoát nước sâu và thông thoáng.</li>
        <li><strong>Bón phân Đạm quá cao:</strong> Đạm làm mềm tế bào rễ, tạo cơ hội cho nấm xâm nhập dễ dàng hơn.</li>
      </ol>

      <p><em>Lời nhắn từ kỹ sư:</em> Chăm sầu riêng bị bệnh cũng giống như chăm người ốm, cần sự kiên trì và đúng thuốc. Nếu bà con cần tư vấn phác đồ cụ thể cho vườn mình, hãy gọi ngay Hotline kỹ thuật của Phân Bón Giá Tốt nhé!</p>
    `
  },
  {
    title: "5 Sai Lầm Tai Hại Khi Dùng Phân Bón Lá Khiến Cây Bị 'Cháy Lá' – Cách Sử Dụng Hiệu Quả X3 Năng Suất",
    slug: "sai-lam-dung-phan-bon-la-v6",
    excerpt: "Phun phân bón lá là con dao hai lưỡi. Dùng đúng thì cây xanh mướt, dùng sai thì chỉ sau một đêm vườn cây bị 'luộc chín'. Xem ngay 5 quy tắc vàng để bảo vệ vườn cây của bạn.",
    image: imgFertilizer,
    tags: ["Phân bón lá", "Kỹ thuật canh tác", "Cảnh báo"],
    content: `
      <p>Chào bà con, phân bón lá giúp cây hấp thụ dinh dưỡng nhanh gấp 10 lần qua rễ, là giải pháp tuyệt vời để thúc bông, nuôi trái. Tuy nhiên, nếu không nắm vững kỹ thuật, bà con có thể vô tình "nướng chín" vườn cây của mình chỉ sau một lần phun. Tại Phân Bón Giá Tốt, chúng tôi tổng hợp 5 sai lầm phổ biến nhất để bà con cùng phòng tránh.</p>

      <img src="${imgFertilizer}" alt="Hướng dẫn phun phân bón lá an toàn hiệu quả" style="width:100%; border-radius:12px; margin: 20px 0;" />

      <h2>1. Tại sao phân bón lá lại dễ gây hiện tượng "Cháy lá"?</h2>
      <p>Lá cây có hàng triệu lỗ khí khổng. Khi bà con phun phân với nồng độ quá cao hoặc phun lúc nắng gắt, nồng độ muối trên bề mặt lá tăng vọt, nó sẽ hút ngược nước từ tế bào ra ngoài (thẩm thấu), làm tế bào lá bị chết khô ngay lập tức.</p>

      <h2>2. 5 Sai lầm "Tử huyệt" bà con cần tránh</h2>
      <ul>
        <li><strong>Phun lúc nắng gắt (10h - 15h):</strong> Đây là lỗi nặng nhất. Nắng làm nước bay hơi nhanh, phân bón đọng lại trên lá thành tinh thể muối đốt cháy lá.</li>
        <li><strong>Pha quá liều hướng dẫn:</strong> Tâm lý "pha đậm cho nhanh tốt" là nhát dao kết liễu vườn cây.</li>
        <li><strong>Phun khi cây đang thiếu nước héo lá:</strong> Cây đang héo mà phun phân vào là cây "đứt" ngay lập tức. Hãy tưới nước cho cây tươi lại rồi mới phun.</li>
        <li><strong>Chỉ phun mặt trên lá:</strong> Lỗ khí khổng tập trung 80-90% ở mặt dưới lá. Phun mặt trên chỉ là "lãng phí phân".</li>
        <li><strong>Phối trộn sai cách:</strong> Trộn các loại phân bón lá chứa gốc Canxi với các thuốc bảo vệ thực vật gốc Đồng/Lưu huỳnh gây kết tủa, cháy lá.</li>
      </ul>

      <h2>3. Quy trình phun phân bón lá chuẩn "Chuyên gia"</h2>
      <p>Để đạt hiệu quả cao nhất, hãy tuân thủ 3 quy tắc:</p>
      <ol>
        <li><strong>Đúng thời điểm:</strong> Tốt nhất là từ 6h-8h sáng hoặc sau 16h chiều mát.</li>
        <li><strong>Đúng vị trí:</strong> Chỉnh vòi phun hướng từ dưới lên để phân bón tiếp xúc trực tiếp với mặt dưới lá.</li>
        <li><strong>Chọn đúng sản phẩm:</strong> Ưu tiên các dòng phân bón lá dạng Chelate hoặc hữu cơ dễ tiêu.
          <ul>
            <li>Để kích rễ, phục hồi cây: Dùng <a href="https://phanbongiatot.com/san-pham/phan-bon-la-acti-rooti-kich-re-cuc-manh-phuc-hoi-cay-trong"><strong>Acti Rooti</strong></a>.</li>
            <li>Để thúc bông, đậu trái, nuôi trái: Dùng <a href="https://phanbongiatot.com/san-pham/phan-bon-la-acti-flora-thuc-day-phan-hoa-mam-hoa-kich-hoa"><strong>Acti Flora</strong></a>.</li>
          </ul>
        </li>
      </ol>

      <p><strong>Lời khuyên:</strong> Hãy luôn thử pha một lượng nhỏ trước trong cốc nước, nếu thấy hỗn hợp không bị đổi màu hay kết tủa thì mới tiến hành pha cho cả bình phun nhé bà con!</p>
    `
  }
];

async function run() {
  console.log("Upgrading ALL articles to 'Web Nhà Quê' Professional Style...");
  
  for (const article of articles) {
    const tempFile = path.join(__dirname, `temp_${article.slug}.json`);
    fs.writeFileSync(tempFile, JSON.stringify(article, null, 2), 'utf8');
    
    try {
      console.log(`Posting: ${article.title}`);
      const command = `curl.exe -X POST "${API_BASE}/blogs" -H "Content-Type: application/json" -H "Authorization: Bearer ${AGENT_TOKEN}" --data-binary "@${tempFile}"`;
      const output = execSync(command).toString();
      console.log("Response Success!");
    } catch (err) {
      console.error(`Error with "${article.title}":`, err.message);
    } finally {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  }
  
  console.log("All Masterclasses V6 (Web Nhà Quê Style) are live!");
}

run();
