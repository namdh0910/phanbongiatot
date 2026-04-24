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
    slug: "huong-dan-chi-tiet-bon-phan-ca-phe-nuoi-trai-v6",
    excerpt: "Làm sao để cà phê không bị rụng trái non và đạt năng suất cao nhất? Khám phá quy trình 5 bước bón phân chuyên sâu, kết hợp dinh dưỡng hữu cơ và vi lượng giúp hạt chắc, nặng ký.",
    image: imgCoffee,
    tags: ["Cà phê", "Kỹ thuật bón phân", "Kiến thức kỹ thuật"],
    content: `
      <p>Chào bà con, làm cà phê ở Tây Nguyên giai đoạn nuôi trái là thời điểm "cân não" nhất. Nhìn vườn cà phê trĩu quả nhưng nếu không biết cách chăm sóc, chỉ sau vài trận mưa lớn, quả sẽ rụng đầy gốc, hoặc đến khi thu hoạch thì nhân lại lép, nhẹ ký. Tại Phân Bón Giá Tốt, chúng tôi thấu hiểu nỗi lo đó và xin chia sẻ quy trình bón phân chuyên sâu giúp bà con tối ưu năng suất.</p>
      <img src="${imgCoffee}" alt="Vườn cà phê trĩu quả" style="width:100%; border-radius:12px; margin: 20px 0;" />
      <h2>1. Vì sao cây cà phê hay bị rụng trái và nhân lép?</h2>
      <p>Cây dồn toàn bộ nhựa sống nuôi trái khiến cành lá bị suy, rễ tơ bị ngạt oxy do mưa, và thiếu hụt Canxi - Boron.</p>
      <h2>2. Quy trình 5 bước chuẩn Phân Bón Giá Tốt</h2>
      <p>Bước 1: Kiểm tra pH đất. Bước 2: Kích rễ bằng <strong>Acti Rooti</strong>. Bước 3: Bón NPK 16-8-16. Bước 4: Phun <strong>Acti Flora</strong> qua lá. Bước 5: Phòng nấm bằng Nemano.</p>
    `
  },
  {
    title: "Bệnh Vàng Lá Thối Rễ Sầu Riêng: Nhận Diện Sớm - Trị Tận Gốc - Cứu Vườn Kịp Lúc",
    slug: "benh-vang-la-thoi-re-sau-rieng-v6",
    excerpt: "Nhìn vườn sầu riêng bạc tỷ chết dần vì thối rễ là nỗi đau của bất kỳ nhà vườn nào. Khám phá phác đồ 4 bước xử lý dứt điểm nấm bệnh và phục hồi cây thần tốc.",
    image: imgDurian,
    tags: ["Sầu riêng", "Bệnh hại", "Cấp cứu cây"],
    content: `
      <p>Vàng lá thối rễ là tử thần số 1. Quy trình xử lý 4 bước: 1. Vệ sinh vườn & nâng pH. 2. Diệt nấm bằng <strong>Nemano</strong>. 3. Phục hồi rễ bằng <strong>Acti Rooti</strong>. 4. Bảo vệ bằng vi sinh Trichoderma.</p>
    `
  },
  {
    title: "5 Sai Lầm Tai Hại Khi Dùng Phân Bón Lá Khiến Cây Bị 'Cháy Lá' – Cách Sử Dụng Hiệu Quả X3 Năng Suất",
    slug: "sai-lam-dung-phan-bon-la-v6",
    excerpt: "Phun phân bón lá là con dao hai lưỡi. Dùng đúng thì cây xanh mướt, dùng sai thì chỉ sau một đêm vườn cây bị 'luộc chín'. Xem ngay 5 quy tắc vàng để bảo vệ vườn cây của bạn.",
    image: imgFertilizer,
    tags: ["Phân bón lá", "Kỹ thuật canh tác", "Cảnh báo"],
    content: `
      <p>5 Sai lầm: Phun lúc nắng gắt, Pha quá liều, Phun khi cây héo, Chỉ phun mặt trên, Phối trộn sai. Giải pháp: Phun sáng sớm bằng <strong>Acti Flora</strong> hoặc <strong>Acti Rooti</strong>.</p>
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
  console.log("Logged in! Token acquired.");

  for (const article of articles) {
    const tempFile = path.join(__dirname, `temp_${article.slug}.json`);
    fs.writeFileSync(tempFile, JSON.stringify(article, null, 2), 'utf8');
    try {
      const command = `curl.exe -X POST "${API_BASE}/blogs" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" --data-binary "@${tempFile}"`;
      const output = execSync(command).toString();
      console.log(`Success: ${article.slug}`);
    } catch (err) {
      console.error(`Error for ${article.slug}:`, err.message);
    } finally {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  }
  
  console.log("ALL V6 POSTS ARE LIVE!");
}

run();
