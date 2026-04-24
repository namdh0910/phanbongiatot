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
    title: "Kỹ thuật bón phân cà phê giai đoạn nuôi trái: Bí kíp chặn đứng rụng quả, hạt chắc nhân to",
    slug: "ky-thuat-bon-phan-ca-phe-nuoi-trai-chuyen-gia-v5",
    excerpt: "Nhiều nhà vườn cà phê đang mất ngủ vì hiện tượng rụng quả hàng loạt vào mùa mưa. Bài viết này tiết lộ phác đồ dinh dưỡng 'vàng' giúp chặn đứng rụng quả và tăng năng suất lên đến 30%.",
    image: imgCoffee,
    tags: ["Cà phê", "Kỹ thuật bón phân", "Bí kíp nhà nông"],
    content: `
      <p>Chào bà con, làm cà phê ở Tây Nguyên thì nỗi lo lớn nhất không phải là giá thấp, mà là nhìn quả rụng đầy gốc vào mùa mưa. Anh em bón phân đổ tiền triệu xuống đất mà cây vẫn cứ còi cọc, quả thì nhỏ, nhân thì lép. Tại sao? Vì bà con đang bón phân theo cảm tính, thấy hàng xóm bón gì thì mình bón nấy, mà không hiểu cái "bụng" của cây cà phê đang cần gì.</p>

      <img src="${imgCoffee}" alt="Vườn cà phê trĩu quả đạt năng suất cao" style="width:100%; border-radius:12px; margin: 20px 0;" />

      <h2>I. "Điểm đau" của nhà vườn: Tại sao cà phê lại rụng quả hàng loạt?</h2>
      <p>Có 3 nguyên nhân cốt lõi khiến bà con "mất ăn mất ngủ":</p>
      <ol>
        <li><strong>Sốc nhiệt và sốc ẩm:</strong> Mùa mưa đến đột ngột, đất bị lạnh và ngạt oxy, bộ rễ tơ bị thối làm cây không hút được nước và dinh dưỡng.</li>
        <li><strong>Cạnh tranh dinh dưỡng:</strong> Cây vừa phải nuôi quả, vừa phải phát triển cành dự trữ cho năm sau. Nếu không đủ dinh dưỡng, cây sẽ tự "buông" quả để bảo vệ sự sống.</li>
        <li><strong>Thiếu Canxi - Boron:</strong> Đây là "chìa khóa" của tầng rời. Thiếu hai chất này, cuống quả sẽ giòn và dễ rụng chỉ sau một trận mưa lớn.</li>
      </ol>

      <h2>II. Phác đồ dinh dưỡng "Vàng" giai đoạn nuôi trái (Tháng 5 - Tháng 10)</h2>
      <p>Thay vì bón phân theo kiểu "đến hẹn lại lên", em hướng dẫn bà con chia làm 3 giai đoạn then chốt:</p>

      <h3>Giai đoạn 1: Chặn đứng rụng quả (Đầu mùa mưa)</h3>
      <p><strong>Nhiệm vụ:</strong> Làm dẻo dai cuống quả và kích thích rễ tơ phục hồi.</p>
      <ul>
        <li><strong>Bón gốc:</strong> Sử dụng NPK có hàm lượng Lân cao để kích rễ. Liều lượng: 0.5 - 0.7kg/gốc.</li>
        <li><strong>Bí kíp:</strong> Pha ngay 100g <strong>Canxi Bo</strong> kết hợp với 50g <strong>Humic</strong> cho 1 phuy 200 lít nước, phun đều mặt dưới lá. Canxi sẽ làm dày vách tế bào cuống quả, Boron giúp tăng tỷ lệ đậu và giữ trái.</li>
      </ul>

      <h3>Giai đoạn 2: Thúc trái lớn - Chắc nhân (Giữa mùa mưa)</h3>
      <p><strong>Nhiệm vụ:</strong> Chuyển hóa tinh bột về nhân cà phê.</p>
      <ul>
        <li><strong>Công thức:</strong> Ưu tiên NPK tỷ lệ 2:1:2 hoặc 3:1:3 (Ví dụ 16-8-16 hoặc 19-9-19).</li>
        <li><strong>Liều lượng:</strong> 0.8 - 1kg/gốc tùy vào độ trĩu quả của cây.</li>
      </ul>

      <h2>III. Kỹ thuật bón phân "Chuẩn chuyên gia"</h2>
      <p>Bà con thường rải phân ngay sát gốc, đây là sai lầm cực lớn! Rễ hút dinh dưỡng nằm ở đầu tán lá. Hãy bón theo hình chiếu tán (cách gốc 40-50cm) và nhớ <strong>lấp đất</strong> để giảm bay hơi Đạm đến 30%.</p>

      <p><em>Lời nhắn từ Kỹ sư:</em> Đừng để đến khi quả rụng đầy gốc mới bắt đầu cứu vãn. Hãy chủ động phòng bệnh ngay từ bây giờ.</p>
    `
  },
  {
    title: "Phác đồ 4 bước cứu sống sầu riêng bị vàng lá thối rễ - 'Cải tử hoàn sinh' cho vườn cây",
    slug: "cuu-sau-rieng-masterclass-v5",
    excerpt: "Nhìn vườn sầu riêng đầu tư bạc tỷ đang chết dần vì thối rễ, ai mà không xót? Bài viết này là hy vọng cuối cùng giúp bà con cứu sống cây sầu riêng bị suy kiệt nặng.",
    image: imgDurian,
    tags: ["Sầu riêng", "Cấp cứu cây", "Bí kíp chuyên gia"],
    content: `
      <p>Chào bà con, làm sầu riêng mà gặp bệnh vàng lá thối rễ thì đúng là "ác mộng". Nhiều người cuống cuồng đổ đủ thứ thuốc xuống gốc, càng đổ cây càng chết nhanh vì cái bụng của cây đang đau, bộ rễ đang nát, không thể tiêu hóa được phân thuốc đâu.</p>

      <img src="${imgDurian}" alt="Cứu sống sầu riêng bị thối rễ" style="width:100%; border-radius:12px; margin: 20px 0;" />

      <h2>I. Sai lầm chết người khi thấy cây vàng lá</h2>
      <p>Khi thấy lá vàng, bà con thường đi mua phân bón Đạm (Ure) về bón để "hy vọng lá xanh lại". Đây chính là nhát dao kết liễu cây sầu riêng. Đạm lúc này làm nấm bệnh bùng phát dữ dội hơn, rễ thối nhanh hơn.</p>

      <h2>II. Quy trình 4 bước "Cải tử hoàn sinh"</h2>
      <h3>Bước 1: Cắt tỉa và Xẻ rãnh thoát nước</h3>
      <p>Cắt bỏ những cành đã khô, cành bị bệnh nặng để giảm áp lực nuôi cây. Nếu vườn bị ngập, phải xẻ rãnh thoát nước ngay. Bộ rễ sầu riêng rất sợ ngạt nước.</p>

      <h3>Bước 2: Diệt nấm bằng Metalaxyl + Mancozeb</h3>
      <p>Không được tưới 1 lần rồi thôi! Phải tưới ít nhất 2 lần, mỗi lần cách nhau 5 ngày. Tưới đẫm vào vùng rễ tơ quanh tán cây.</p>

      <h3>Bước 3: Kích rễ bằng Humic + Fulvic</h3>
      <p>Chỉ sau khi đã diệt nấm, mới được dùng Humic. Đây là "sữa mẹ" giúp rễ tơ nhú ra nhanh chóng. Tuyệt đối không dùng phân hóa học lúc này.</p>

      <h3>Bước 4: Bổ sung vi sinh đối kháng</h3>
      <p>Khi cây đã nhú đọt non, hãy bón phân hữu cơ hoai mục trộn với nấm Trichoderma để bảo vệ rễ cây bền vững.</p>

      <p><em>Lời nhắn:</em> Đất khỏe thì cây mới mạnh. Hãy duy trì độ pH đất ổn định để nấm bệnh không có cơ hội tấn công.</p>
    `
  },
  {
    title: "5 Sai lầm tai hại khi dùng phân bón lá khiến cây bị 'nướng cháy' lá",
    slug: "sai-lam-phan-bon-la-masterclass-v5",
    excerpt: "Phun phân bón lá là con dao hai lưỡi. Dùng đúng thì cây xanh mướt, dùng sai thì chỉ sau một đêm cả vườn cây bị 'luộc chín'. Xem ngay để tránh mất tiền oan.",
    image: imgFertilizer,
    tags: ["Phân bón lá", "Kỹ thuật phun", "Cảnh báo"],
    content: `
      <p>Nhiều bà con phun phân bón lá xong thấy lá cháy sém, rụng hàng loạt. Đây không phải do phân giả, mà do bà con đang "vô tình" nướng chín cây của mình.</p>

      <img src="${imgFertilizer}" alt="Hướng dẫn phun phân bón lá an toàn" style="width:100%; border-radius:12px; margin: 20px 0;" />

      <h2>I. Tại sao phân bón lá lại dễ gây cháy lá?</h2>
      <p>Lỗ khí khổng trên lá rất nhạy cảm. Phun nồng độ quá cao làm nồng độ muối tăng vọt, nó hút sạch nước trong tế bào lá ra ngoài, khiến tế bào bị chết khô ngay lập tức.</p>

      <h2>II. 3 "Tử huyệt" cần tránh</h2>
      <ol>
        <li><strong>Phun lúc trời nắng gắt:</strong> Nắng làm phân bay hơi nhanh, để lại lớp muối đậm đặc đốt cháy lá.</li>
        <li><strong>Pha quá liều:</strong> Tâm lý muốn cây nhanh tốt thường dẫn đến hậu quả thảm khốc.</li>
        <li><strong>Phun khi cây đang héo:</strong> Cây đang thiếu nước mà phun phân bón lá vào là "kết liễu" cây ngay.</li>
      </ol>

      <h2>III. Kỹ thuật phun "Chuẩn 100%"</h2>
      <p>Thời điểm tốt nhất là từ 6h-8h sáng. Đặc biệt, PHẢI phun vào mặt dưới lá - nơi tập trung nhiều lỗ khí khổng nhất để cây hấp thụ dinh dưỡng tối đa.</p>
    `
  }
];

async function run() {
  console.log("Upgrading ALL articles using curl.exe hybrid...");
  
  for (const article of articles) {
    const tempFile = path.join(__dirname, `temp_${article.slug}.json`);
    fs.writeFileSync(tempFile, JSON.stringify(article, null, 2), 'utf8');
    
    try {
      console.log(`Posting: ${article.title}`);
      const command = `curl.exe -X POST "${API_BASE}/blogs" -H "Content-Type: application/json" -H "Authorization: Bearer ${AGENT_TOKEN}" --data-binary "@${tempFile}"`;
      const output = execSync(command).toString();
      console.log("Response:", output);
    } catch (err) {
      console.error(`Error with "${article.title}":`, err.message);
    } finally {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  }
}

run();
