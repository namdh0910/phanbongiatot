const articles = [
  {
    title: "Kỹ thuật bón phân cho cây cà phê giai đoạn nuôi trái đạt năng suất cao",
    slug: "ky-thuat-bon-phan-ca-phe-nuoi-trai-chuyen-gia",
    excerpt: "Hướng dẫn chi tiết cách chọn loại phân bón và lịch trình bón phân cho cây cà phê trong giai đoạn nuôi trái để đạt năng suất kỷ lục.",
    image: "https://loremflickr.com/800/600/coffee,bean,plantation/all?lock=101",
    tags: ["Cà phê", "Kỹ thuật bón phân", "Nuôi trái"],
    content: `
      <h2>I. Tầm quan trọng của việc bón phân giai đoạn nuôi trái</h2>
      <p>Giai đoạn nuôi trái là thời điểm cây cà phê cần nhiều dinh dưỡng nhất để phát triển nhân. Nếu thiếu hụt dinh dưỡng, cây sẽ bị rụng quả hoặc hạt lép.</p>
      <img src="https://loremflickr.com/800/450/coffee,farm/all?lock=102" alt="Cây cà phê trĩu quả" style="width:100%; border-radius:8px; margin: 15px 0;" />
      
      <h2>II. Các loại phân bón cần thiết</h2>
      <h3>1. Phân NPK hàm lượng Kali cao</h3>
      <p>Anh nên dùng NPK 16-8-16 hoặc 15-5-20 để giúp nhân cà phê to và chắc.</p>
      
      <h2>III. Lịch trình bón chi tiết</h2>
      <p>Chia làm 3 đợt bón trong suốt mùa mưa để cây hấp thụ tốt nhất...</p>
    `
  },
  {
    title: "Cách xử lý dứt điểm bệnh vàng lá thối rễ trên cây sầu riêng",
    slug: "xu-ly-vang-la-thoi-re-sau-rieng-phong-do",
    excerpt: "Bệnh vàng lá thối rễ là nỗi lo của nhà vườn. Đây là phác đồ điều trị 4 bước từ các kỹ sư nông nghiệp hàng đầu.",
    image: "https://loremflickr.com/800/600/durian,tree/all?lock=201",
    tags: ["Sầu riêng", "Bệnh hại", "Vàng lá"],
    content: `
      <h2>I. Nhận diện bệnh sớm</h2>
      <p>Lá vàng, đọt chùn, rễ đen là những dấu hiệu đầu tiên...</p>
      <img src="https://loremflickr.com/800/450/root,disease/all?lock=202" alt="Bệnh thối rễ sầu riêng" style="width:100%; border-radius:8px; margin: 15px 0;" />
      
      <h2>II. Quy trình điều trị</h2>
      <p>Bước 1: Cân bằng pH đất. Bước 2: Diệt nấm bằng Metalaxyl...</p>
    `
  },
  {
    title: "Bí quyết sử dụng phân bón lá để cây xanh tốt, không bị cháy lá",
    slug: "bi-quyet-dung-phan-bon-la-vinh-cuu",
    excerpt: "Dùng phân bón lá đúng cách giúp cây hấp thụ nhanh gấp 10 lần bón gốc. Xem ngay các quy tắc vàng để tránh cháy lá.",
    image: "https://loremflickr.com/800/600/leaves,green/all?lock=301",
    tags: ["Phân bón lá", "Dinh dưỡng", "Kỹ thuật"],
    content: `
      <h2>I. Thời điểm phun vàng</h2>
      <p>Nên phun vào lúc sáng sớm hoặc chiều mát khi lỗ khí khổng đang mở...</p>
      <img src="https://loremflickr.com/800/450/farming,garden/all?lock=302" alt="Phun phân bón lá" style="width:100%; border-radius:8px; margin: 15px 0;" />
    `
  }
];

async function postArticles() {
  const apiUrl = "https://phanbongiatot.onrender.com/api/blogs";
  const token = "ANTIGRAVITY_AGENT_SECRET_2026";

  console.log("Starting automated posting to Render...");

  for (const article of articles) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(article)
      });
      const data = await response.json();
      if (response.ok) {
        console.log(`Success: Posted "${article.title}"`);
      } else {
        console.error(`Failed "${article.title}":`, data.message || data);
      }
    } catch (err) {
      console.error(`Error posting "${article.title}":`, err.message);
    }
  }
}

postArticles();
