import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET() {
  try {
    await dbConnect();

    const blogs = [
      {
        title: "Sầu Riêng Vàng Lá Thối Rễ: Lộ Trình 7 Ngày Phục Hồi Thực Chiến Từ Phan Bón Giá Tốt",
        slug: "sau-rieng-vang-la-thoi-re-phuc-hoi-7-ngay",
        category: "Cẩm nang kỹ thuật",
        coverImage: "/images/blog/sau-rieng-vang-la-mua-mua.png",
        excerpt: "Với nhiều năm kinh nghiệm đi vườn, đội ngũ Phan Bón Giá Tốt chỉ rõ quy trình 7 ngày cứu vườn sầu riêng vàng lá thối rễ dứt điểm, không tái phát. Đừng chặt bỏ khi chưa đọc bài này.",
        content: `
          <div class="agri-expert-article">
            <p>Chúng tôi nhớ mãi trường hợp anh Hùng ở xã Ea Knuếc (Krông Pắc, Kon Tum) gọi cho Phan Bón Giá Tốt. Giọng anh run run: \"PBGT ơi, 200 gốc sầu riêng 5 năm tuổi nhà anh nó rụng lá như trút nước, rễ đen thui hết rồi. Chắc anh chặt bỏ thôi, chứ cứu gì nổi nữa.\"</p>
            <p>Tôi nói thật với bà con, nghe câu đó tôi xót lắm. 5 năm trời đổ mồ hôi, bao nhiêu vốn liếng dồn vào đó, giờ nhìn cây chết đứng thì ai mà không nản. Nhưng tôi bảo anh: \"Anh bình tĩnh, sáng mai tôi vào. Đừng chặt, còn xanh đọt là còn cứu được.\"</p>
            <p>Sáng hôm sau tôi vào tới vườn, nhìn cảnh tượng trước mắt mới thấy khủng khiếp. Đất thì nén chặt như bê tông, nước đọng thành vũng sau trận mưa đêm. Bới thử một gốc lên, rễ tơ thối nhũn, ngửi thấy mùi chua nồng của nấm thối rễ. Đây chính là cái \"hố tử thần\" mà nhiều nhà vườn sầu riêng ở Tây Nguyên đang gặp phải.</p>
            <p>Điều mà bà con sợ nhất không phải là cây rụng lá, mà là nhìn thấy tiền tỷ trôi theo dòng nước mưa mà không biết bắt đầu từ đâu. Hôm nay, tôi ngồi đây viết lại toàn bộ kinh nghiệm 18 năm đi vườn của mình để bà con có một cái nhìn đúng nhất, thực tế nhất về căn bệnh này. Không lý thuyết suông, không từ ngữ chuyên môn khó hiểu. Cứ làm đúng như tôi chỉ, tôi tin vườn bà con sẽ hồi sinh.</p>

            <h2>Mục lục nội dung</h2>
            <ul>
              <li><a href="#chan-doan">Chẩn đoán đúng bệnh - Cứu cây đúng lúc</a></li>
              <li><a href="#sai-lam">Những sai lầm \"đốt tiền\" của nhà vườn</a></li>
              <li><a href="#quy-trinh">Quy trình 7 ngày phục hồi thần tốc</a></li>
              <li><a href="#canh-bao">Cảnh báo khẩn cấp: Khi nào cần gọi PBGT ngay</a></li>
              <li><a href="#checklist">Checklist chuẩn bị trước khi ra vườn</a></li>
              <li><a href="#san-pham">Giải pháp dinh dưỡng tôi tin dùng</a></li>
              <li><a href="#faq">Hỏi đáp thực chiến cùng Phan Bón Giá Tốt</a></li>
            </ul>

            <h2 id="chan-doan">1. CHẨN ĐOÁN: ĐỪNG ĐỂ \"NHẦM THUỐC\" MÀ HẠI CÂY</h2>
            <p>Nhiều bà con thấy vàng lá là xách bình đi phun thuốc bệnh, phun phân bón lá. Nhưng tôi nói thật, cái gốc nó hỏng thì phun lên ngọn cũng như muối bỏ bể. Bà con phải phân biệt được 3 loại vàng lá phổ biến nhất này:</p>
            
            <div class="table-responsive">
              <table border="1" style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background-color: #f2f2f2;">
                    <th>Đặc điểm</th>
                    <th>Vàng lá thối rễ (Nấm/Tuyến trùng)</th>
                    <th>Thiếu dinh dưỡng (Vi lượng)</th>
                    <th>Cháy lá do nắng/gió</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Màu lá</strong></td>
                    <td>Vàng đều cả gân lá và phiến lá, lá xỉn màu, không bóng.</td>
                    <td>Vàng gân xanh (thiếu Magie) hoặc vàng chóp lá (thiếu Kali).</td>
                    <td>Vàng nâu, khô cháy từ mép lá vào trong.</td>
                  </tr>
                  <tr>
                    <td><strong>Tình trạng rễ</strong></td>
                    <td>Rễ tơ thối đen, vỏ rễ tuột khỏi lõi khi vuốt nhẹ. Có mùi hôi.</td>
                    <td>Rễ vẫn trắng hoặc hơi nâu nhẹ, không thối nhũn.</td>
                    <td>Rễ bình thường.</td>
                  </tr>
                  <tr>
                    <td><strong>Tốc độ lan</strong></td>
                    <td>Lan rất nhanh theo dòng nước hoặc hướng gió, cả vườn sụp xuống.</td>
                    <td>Lan chậm, chỉ xuất hiện ở một vài cây hoặc một số tầng lá.</td>
                    <td>Chỉ bị ở phía đón nắng hoặc đón gió.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Cách kiểm tra rễ \"nhà nghề\" tại vườn</h3>
            <p>Bà con không cần máy móc gì cao siêu đâu. Cứ lấy cái cuốc nhỏ, ra phía rìa tán cây, cuốc nhẹ lớp đất mặt tầm 5-10cm. Nếu rễ màu nâu đen, sờ vào thấy nhớt, vỏ rễ tuột ra để lại cái lõi trắng nhọn hoắt như cây tăm thì thôi rồi, nấm đã ăn trắng rễ rồi.</p>
            <p><strong>Thời điểm nguy hiểm nhất:</strong> Chính là lúc giao mùa từ nắng sang mưa hoặc ngược lại. Đặc biệt là sau các đợt mưa dầm 3-4 ngày liên tục, đất bị úng nước, thiếu oxy làm rễ nghẹt thở, nấm sẽ tấn công ngay lập tức.</p>

            <h2 id="sai-lam">2. SAI LẦM PHỔ BIẾN: BÀ CON ĐANG \"GIẾT\" CÂY MÀ KHÔNG BIẾT</h2>
            <p>Tôi đi vườn nhiều, gặp nhiều cảnh mà dở khóc dở cười. Có những sai lầm mà tôi nói thật, nó là cái giá phải trả bằng cả vụ mùa.</p>
            <p><strong>Sai lầm 1: Vàng lá là bón thêm phân hóa học (NPK).</strong> Tôi gặp trường hợp này ở Ea H'leo. Anh chủ vườn thấy cây vàng lá, sợ cây đói nên thúc thêm NPK liều cao. Kết quả là cây rụng sạch lá chỉ sau 3 ngày. Rễ đang bị thương mà tống phân hóa học vào thì rễ cháy nhanh hơn.</p>
            <p><strong>Sai lầm 2: Lạm dụng thuốc diệt cỏ.</strong> Hồi năm 2018, tôi hỗ trợ một vườn ở Buôn Hồ. Bà con xịt cỏ cháy sạch bóng làm đất bị chai cứng, hệ vi sinh vật bị tiêu diệt sạch, rễ tơ nằm lớp mặt bị \"luộc chín\" dưới nắng gắt.</p>

            <h2 id="quy-trinh">3. QUY TRÌNH 7 NGÀY PHỤC HỒI THẦN TỐC</h2>
            <p>Lưu ý: Nếu cây còn đọt xanh, chúng ta bắt đầu lộ trình 7 ngày như sau:</p>
            <ul>
              <li><strong>Giai đoạn 1 (Ngày 1-2):</strong> Cắt tỉa cành khô, cành sát đất. Xẻ rãnh thoát nước ngay. Phun sát khuẩn toàn bộ thân lá bằng đồng hữu cơ.</li>
              <li><strong>Giai đoạn 2 (Ngày 3-5):</strong> Nâng pH đất. Nấm Phytophthora cực kỳ thích đất chua. Sử dụng <strong>Humic K-Max</strong> (100g/200 lít nước) tưới đều quanh tán để nâng pH lên 5.5-6.5.</li>
              <li><strong>Giai đoạn 3 (Ngày 6-7):</strong> Đưa vi sinh đối kháng (Trichoderma, Bacillus) vào để bảo vệ rễ tơ mới nhú. Kết hợp Amino Plus để cây có năng lượng ra đọt ngay.</li>
            </ul>

            <div style=\"background-color: #fff3cd; border-left: 5px solid #ffc107; padding: 15px; margin: 20px 0;\">
              <h2 id=\"canh-bao\">⚠️ CẢNH BÁO KHẨN CẤP</h2>
              <p><strong>Gọi ngay cho Phan Bón Giá Tốt nếu thấy:</strong></p>
              <ul>
                <li>Cây rụng lá xanh trắng đất sau một đêm.</li>
                <li>Vỏ thân gần gốc bị xì mủ, chảy nước nâu đen.</li>
              </ul>
              <p>→ <strong>Hành động ngay:</strong> Ngưng bón phân, chụp ảnh gửi Zalo ngay để tôi chuẩn đoán từ xa.</p>
            </div>

            <h2 id="checklist">4. CHECKLIST TRƯỚC KHI BẮT ĐẦU</h2>
            <ul>
              <li>[ ] Đã kiểm tra pH đất (dưới 5 phải nâng pH trước).</li>
              <li>[ ] Đã xẻ rãnh thoát nước cho vườn.</li>
              <li>[ ] Đã cắt tỉa cành bệnh.</li>
              <li>[ ] Có sẵn Humic K-Max vảy rồng chất lượng cao.</li>
              <li>[ ] Dự báo thời tiết 3 ngày tới không mưa lớn.</li>
            </ul>

            <h2 id="san-pham">5. GIẢI PHÁP TÔI TIN DÙNG: HUMIC K-MAX & AMINO PLUS</h2>
            <p>Tôi nói thật, 18 năm qua đây là bộ đôi tôi luôn mang theo khi hỗ trợ bà con ở Cư M'gar hay Krông Pắc.</p>
            <p><strong>Humic K-Max (Vảy rồng):</strong> Tan 100%, nâng pH thần tốc. Nó giúp biến đất chai cứng thành đất tơi xốp cho rễ tơ có chỗ thở.</p>
            <p><strong>Amino Plus:</strong> Cung cấp dinh dưỡng trực tiếp qua lá và rễ giúp đọt non ra mập, xanh dày nhanh chóng.</p>

            <h2 id="faq">6. HỎI ĐÁP CÙNG PHAN BÓN GIÁ TỐT</h2>
            <p><strong>Q: Tại sao tôi bón Humic mà lá vẫn không xanh lại ngay?</strong><br/>
            <strong>PBGT phản hồi:</strong> Cây chứ không phải bóng đèn. Khi rễ mới nhú (sau 5-7 ngày) mới hút được dinh dưỡng. Bà con chờ 15-20 ngày đọt non mở lá mới thấy xanh. Dục tốc là bất đạt!</p>

            <h2>Lời kết</h2>
            <p>Đừng để đến lúc cây khô đọt mới gọi tôi. Nếu vườn bà con bắt đầu vàng lá, hãy bấm vào nút Zalo bên dưới, chụp ảnh rễ gửi qua tôi tư vấn miễn phí cho.</p>
          </div>
        `,
        isPublished: true,
        seoDescription: "Quy trình 7 ngày cứu sầu riêng vàng lá thối rễ thực chiến từ Phan Bón Giá Tốt (PBGT). Giải pháp phục hồi rễ sinh học bền vững.",
        hashtags: ["sau-rieng", "vang-la-thoi-re", "phuc-hoi-vuon", "phanbongiatot"]
      }
    ];

    await Blog.deleteMany({});
    const seedResults = [];
    for (const blogData of blogs) {
      const blog = await Blog.create(blogData);
      seedResults.push(blog);
    }

    return NextResponse.json({ 
      message: 'Successfully cleaned database and seeded the MASTER High-Quality blog',
      count: seedResults.length 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
