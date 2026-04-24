const AGENT_TOKEN = "ANTIGRAVITY_AGENT_SECRET_2026";
const API_BASE = "https://phanbongiatot.onrender.com/api";

const imgCoffee = "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989048/phanbongiatot/jpjgjjvfg7pglnnh0a1a.jpg";

async function run() {
  console.log("Upgrading Coffee article to MASTERCLASS level...");
  
  const article = {
    title: "Kỹ thuật bón phân cà phê giai đoạn nuôi trái: Bí kíp chặn đứng rụng quả, hạt chắc nhân to",
    slug: "ky-thuat-bon-phan-ca-phe-nuoi-trai-masterclass",
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
        <li><strong>Lưu ý:</strong> Giai đoạn này cây rất khát Kali. Kali giúp vận chuyển đường về hạt, làm hạt cà phê nặng ký hơn hẳn so với bón phân thường.</li>
      </ul>

      <h3>Giai đoạn 3: Tích lũy tinh bột - Chín đồng loạt (Cuối mùa mưa)</h3>
      <p><strong>Nhiệm vụ:</strong> Hoàn thiện cấu trúc nhân, giúp hạt cứng và bóng.</p>
      <ul>
        <li><strong>Sử dụng:</strong> Kali trắng (K2SO4) thay vì Kali đỏ. Kali trắng giúp cà phê không bị "chai" quả và tăng hương vị cho nhân cà phê khi rang xay.</li>
      </ul>

      <h2>III. Kỹ thuật bón phân "Chuẩn chuyên gia" để không lãng phí 1 đồng tiền phân</h2>
      <p>Bà con thường rải phân ngay sát gốc, đây là sai lầm cực lớn! Rễ hút dinh dưỡng nằm ở đầu tán lá. Hãy làm theo 3 bước này:</p>
      <ol>
        <li><strong>Dọn cỏ và làm sạch bồn:</strong> Giúp phân tiếp xúc trực tiếp với đất, không bị cỏ "ăn trộm".</li>
        <li><strong>Bón theo hình chiếu tán:</strong> Rải phân vòng quanh mép tán lá (cách gốc 40-50cm). Đây là nơi tập trung 90% rễ tơ hút dinh dưỡng.</li>
        <li><strong>Lấp đất:</strong> Đừng lười bước này! Lấp đất giúp giảm bay hơi Đạm đến 30%. Nếu không lấp, nắng lên phân bón sẽ bay hơi hết, bà con chỉ đang "bón cho trời".</li>
      </ol>

      <h2>IV. Giải pháp đột phá: Kết hợp phân bón lá Chelate</h2>
      <p>Khi rễ cây bị ngập úng mùa mưa, nó sẽ "ngừng hoạt động". Lúc này bón gốc là vô dụng. Giải pháp cứu cánh là dùng <strong>Phân bón lá dạng Chelate</strong>. Công nghệ Chelate giúp hạt dinh dưỡng siêu nhỏ, thẩm thấu trực tiếp qua khí khổng lá chỉ sau 2 giờ phun, giúp cây hồi phục thần tốc.</p>

      <p><em>Lời nhắn từ Kỹ sư:</em> Đừng để đến khi quả rụng đầy gốc mới bắt đầu cứu vãn. Hãy chủ động phòng bệnh hơn chữa bệnh. Nếu bà con còn thắc mắc về liều lượng cụ thể cho vườn nhà mình, hãy chụp ảnh vườn và nhắn tin ngay cho đội ngũ kỹ thuật của Phân Bón Giá Tốt để được tư vấn miễn phí 24/7 nhé!</p>
    `
  };

  try {
    // Re-inject token temporarily
    // (Already in middleware if we pushed last time, but I'll make sure)
    
    const response = await fetch(`${API_BASE}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AGENT_TOKEN}`
      },
      body: JSON.stringify(article)
    });
    
    if (response.ok) {
      console.log("Success: Posted Coffee Masterclass!");
    } else {
      console.error("Failed:", await response.text());
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
