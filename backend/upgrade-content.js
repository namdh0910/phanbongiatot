const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const API_BASE = "https://phanbongiatot.onrender.com/api";

const images = {
  coffee: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989048/phanbongiatot/jpjgjjvfg7pglnnh0a1a.jpg",
  durian: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg",
  fertilizer: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989073/phanbongiatot/y6imlcebopgmarsfpp8e.jpg",
  rep: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989073/phanbongiatot/y6imlcebopgmarsfpp8e.jpg"
};

const articlesV10 = [
  {
    title: "Tại sao Rệp sáp tái phát 'thần tốc' sau khi phun? Giải mã bí ẩn về túi trứng và Phác đồ 3-3-5 diệt tận gốc",
    slug: "diet-rep-sap-tan-goc-v10",
    excerpt: "Bạn đã bao giờ tự hỏi tại sao rệp sáp lại lì lợm đến thế? Bài viết này sẽ 'bóc trần' sự thật về pháo đài túi trứng rệp và phác đồ tiêu diệt triệt để từ Chuyên gia Happy Agri Style.",
    image: images.rep,
    tags: ["Rệp sáp", "Kỹ thuật chuyên sâu", "V10 Style", "Sầu riêng", "Cà phê"],
    content: `
      <div style="font-family: 'Inter', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: auto;">
        <div style="background-color: #f9f9f9; border-left: 5px solid #2e7d32; padding: 20px; margin-bottom: 30px;">
          <p style="font-style: italic; margin: 0; color: #555;">
            "Tui xịt rệp sáp sạch bong tuần trước, mà sao tuần này đã thấy nó bò đầy cành rồi chú ơi? Thuốc dỏm hay rệp nó lờn thuốc rồi?"
          </p>
        </div>

        <p>Đây là nỗi lòng của hàng vạn bà con trồng sầu riêng, cà phê. Thực tế, không phải thuốc dở, mà là bà con đang phải đối đầu với một <strong>"Bậc thầy ẩn nấp"</strong>. Hãy cùng Phân Bón Giá Tốt khám phá bí mật đằng sau sự lì lợm này.</p>

        <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin: 30px 0;">
          <h4 style="margin-top: 0; color: #2e7d32; border-bottom: 2px solid #2e7d32; display: inline-block;">Nội dung chính bài viết:</h4>
          <ul style="list-style: none; padding-left: 0; margin-top: 15px;">
            <li>🔹 1. Sự thật về "Pháo đài" túi trứng sáp bất khả xâm phạm</li>
            <li>🔹 2. Những sai lầm chết người khiến rệp sáp bùng phát nhanh</li>
            <li>🔹 3. Phác đồ 3-3-5: Chiến thuật quét sạch rệp sáp tận ổ</li>
            <li>🔹 4. Giải pháp phối hợp "Nội công - Ngoại kích"</li>
          </ul>
        </div>

        <h2 style="color: #2e7d32;">1. Sự thật về "Pháo đài" túi trứng sáp bất khả xâm phạm</h2>
        <p>Rệp sáp cái không đẻ trứng trần trụi. Chúng bao bọc hàng trăm quả trứng trong một <strong>Túi trứng sáp (Ovisac)</strong> cấu tạo từ các sợi sáp mịn, bông xốp trắng.</p>
        <div style="background: #fff3e0; border-left: 5px solid #ff9800; padding: 15px; margin: 20px 0;">
          <strong>Bí mật kỹ thuật:</strong> Lớp sáp này có đặc tính <strong>Kỵ nước (Hydrophobic)</strong> cực mạnh. Khi bà con phun thuốc dạng lỏng, nước thuốc sẽ bị "trượt" đi hoàn toàn, trứng bên trong vẫn an toàn tuyệt đối.
        </div>
        <p>Ngoài ra, rệp sáp còn chọn những vị trí "điểm mù" như nách lá, kẽ gai sầu riêng, thậm chí là sâu dưới bộ rễ để đẻ trứng. Đây chính là mầm mống cho đợt tái phát tiếp theo.</p>

        <h2 style="color: #2e7d32;">2. Những sai lầm chết người khiến rệp sáp bùng phát nhanh</h2>
        <ul>
          <li><strong>Bỏ qua đội quân "Vệ sĩ" kiến:</strong> Kiến đen, kiến vàng tha ấu trùng rệp đi khắp nơi. Diệt rệp mà không diệt kiến là sai lầm lớn nhất.</li>
          <li><strong>Mất cân bằng sinh thái:</strong> Lạm dụng thuốc hóa học diệt sạch bọ rùa, ong ký sinh - những "thiên địch" tự nhiên của rệp sáp.</li>
        </ul>

        <h2 style="color: #2e7d32;">3. Phác đồ 3-3-5: Chiến thuật quét sạch rệp sáp tận ổ</h2>
        <p>Để đánh bại kẻ thù này, bà con cần áp dụng quy tắc <strong>3-3-5</strong> của các chuyên gia hàng đầu:</p>
        <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">
          <strong>- Phun ít nhất 3 lần:</strong> Mỗi lần cách nhau 3-5 ngày.</strong><br/>
          <strong>- Lần 1:</strong> Diệt rệp trưởng thành và phá vỡ lớp sáp ngoài.<br/>
          <strong>- Lần 2 & 3:</strong> Tiêu diệt dứt điểm lứa rệp non vừa nở từ túi trứng còn sót lại.
        </div>

        <h2 style="color: #2e7d32;">4. Giải pháp "Nội công - Ngoại kích"</h2>
        <p>Phân Bón Giá Tốt đề xuất bộ giải pháp toàn diện:</p>
        <ul>
          <li><strong>Phun tán:</strong> Thuốc đặc trị + <a href="/san-pham/phan-bon-la-acti-flora-thuc-day-phan-hoa-mam-hoa-kich-hoa"><strong>Acti Flora</strong></a> (giúp thẩm thấu sâu).</li>
          <li><strong>Đổ gốc:</strong> <a href="/san-pham/nemano-che-pham-sinh-hoc-xu-ly-tuyen-trung-nam-khuan"><strong>Nemano</strong></a> - Chế phẩm sinh học diệt rệp sáp rễ và nấm bệnh, cắt đứt đường lui của rệp.</li>
        </ul>

        <p style="text-align: center; margin-top: 50px; font-weight: bold; border-top: 1px solid #eee; padding-top: 20px;">
          ĐÃ ĐẾN LÚC QUÉT SẠCH RỆP SÁP - BẢO VỆ MÙA MÀNG BỘI THU!
        </p>
      </div>
    `
  },
  {
    title: "Cà phê rụng trái non hàng loạt - Đừng chỉ đổ lỗi cho thời tiết! Giải mã 'Tử huyệt' dinh dưỡng chuẩn V10",
    slug: "ca-phe-rung-trai-non-v10",
    excerpt: "Tại sao vườn bên cạnh trĩu quả mà vườn mình lại rụng đỏ gốc? Tìm hiểu nguyên nhân 'Đói dinh dưỡng cục bộ' và phác đồ phục hồi chuyên sâu từ Happy Agri Style.",
    image: images.coffee,
    tags: ["Cà phê", "Rụng trái non", "Dinh dưỡng cây trồng", "V10 Style"],
    content: `
      <div style="font-family: 'Inter', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: auto;">
        <div style="background-color: #f9f9f9; border-left: 5px solid #1b5e20; padding: 20px; margin-bottom: 30px;">
          <p style="font-style: italic; margin: 0; color: #555;">
            "Sáng ra thăm vườn thấy trái non rụng như trút nước, xót xa không chịu nổi. Tui bón đủ thứ phân rồi mà sao vẫn rụng em ơi?"
          </p>
        </div>

        <h2 style="color: #2e7d32;">1. Bản chất của hiện tượng "Đói dinh dưỡng cục bộ"</h2>
        <p>Nhiều bà con lầm tưởng do mưa nhiều gây thối cuống, nhưng thực tế cây cà phê đang gặp phải tình trạng <strong>Cạnh tranh dinh dưỡng khốc liệt</strong>.</p>
        <div style="background: #fffde7; border-left: 5px solid #fbc02d; padding: 15px; margin: 20px 0;">
          <strong>Phân tích kỹ thuật:</strong> Cây ưu tiên nuôi cành dự trữ hơn là nuôi trái. Nếu thiếu hụt Canxi-Bo, tầng rời ở cuống trái sẽ bị giòn, chỉ cần một tác động nhỏ từ thời tiết là rụng ngay lập tức.
        </div>

        <h2 style="color: #2e7d32;">2. Phác đồ 3 giai đoạn hồi sinh năng suất</h2>
        <ul>
          <li><strong>Giai đoạn 1:</strong> Phun <a href="/san-pham/phan-bon-la-acti-flora-thuc-day-phan-hoa-mam-hoa-kich-hoa"><strong>Acti Flora</strong></a> để dẻo dai cuống trái.</li>
          <li><strong>Giai đoạn 2:</strong> Tưới <a href="/san-pham/phan-bon-la-acti-rooti-kich-re-cuc-manh-phuc-hoi-cay-trong"><strong>Acti Rooti</strong></a> giúp rễ hút nước và phân bón cực mạnh.</li>
          <li><strong>Giai đoạn 3:</strong> Bổ sung NPK và trung vi lượng cân đối.</li>
        </ul>

        <p style="text-align: center; margin-top: 50px; font-weight: bold;">LÀM CÀ PHÊ KHÔNG KHÓ - NẾU BẠN CÓ KỸ THUẬT ĐÚNG!</p>
      </div>
    `
  },
  {
    title: "Sầu riêng 'Vàng lá thối rễ' - Kẻ sát nhân thầm lặng. Phác đồ 3 giai đoạn 'Cải tử hoàn sinh' chuẩn V10",
    slug: "sau-rieng-vang-la-thoi-re-v10",
    excerpt: "Đừng vội chặt bỏ cây sầu riêng bị bệnh! Hãy thử ngay phác đồ hồi sinh chuyên sâu 3 giai đoạn từ chuyên gia Phân Bón Giá Tốt, áp dụng chuẩn phong cách Happy Agri.",
    image: images.durian,
    tags: ["Sầu riêng", "Vàng lá thối rễ", "Bảo vệ thực vật", "V10 Style"],
    content: `
      <div style="font-family: 'Inter', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: auto;">
        <div style="background-color: #f9f9f9; border-left: 5px solid #d32f2f; padding: 20px; margin-bottom: 30px;">
          <p style="font-style: italic; margin: 0; color: #555;">
            "Nhìn mấy gốc sầu riêng bạc tỷ đang héo dần héo mòn, tui ngủ không ngon giấc chú ơi..."
          </p>
        </div>

        <h2 style="color: #2e7d32;">1. Tại sao thuốc hóa học thường 'bó tay'?</h2>
        <p>Sai lầm lớn nhất là bón phân hóa học khi rễ đã thối. Việc này chỉ làm rễ bị "bỏng" và chết nhanh hơn. Cây cần được sát trùng và kích kháng sinh học.</p>

        <h2 style="color: #2e7d32;">2. Phác đồ hồi sinh 3 bước</h2>
        <ol>
          <li><strong>Diệt nấm tận gốc:</strong> Dùng <a href="/san-pham/nemano-che-pham-sinh-hoc-xu-ly-tuyen-trung-nam-khuan"><strong>Nemano</strong></a> tưới đẫm tán cây.</li>
          <li><strong>Kích rễ thần tốc:</strong> Đưa <a href="/san-pham/phan-bon-la-acti-rooti-kich-re-cuc-manh-phuc-hoi-cay-trong"><strong>Acti Rooti</strong></a> vào sau 5 ngày để hồi sinh rễ tơ.</li>
          <li><strong>Phục hồi bộ lá:</strong> Phun <a href="/san-pham/phan-bon-la-acti-flora-thuc-day-phan-hoa-mam-hoa-kich-hoa"><strong>Acti Flora</strong></a> để cây quang hợp trở lại.</li>
        </ol>

        <p style="text-align: center; margin-top: 50px; font-weight: bold; color: #d32f2f;">CỨU SẦU RIÊNG LÀ CỨU CẢ TƯƠNG LAI VƯỜN CÂY!</p>
      </div>
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

  for (const article of articlesV10) {
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
  console.log("V10 ENCYCLOPEDIC POSTS ARE LIVE!");
}

run();
