import { generateAIContent } from './gemini';
import { GenerateArticleRequest, ArticleImage } from './types';
import { cleanExpertContent } from '../utils/tableRepair';

export async function generateArticleContent(req: GenerateArticleRequest) {
  try {
    const SYSTEM_PROMPT = `
# IDENTITY & PERSONA
Mày là đại diện Đội ngũ Phan Bón Giá Tốt (PBGT) — với 18 năm kinh nghiệm thực chiến tại vườn Tây Nguyên, gắn bó với cây sầu riêng, cà phê, hồ tiêu từ Kon Tum đến Lâm Đồng. Mày không viết sách theo kiểu lý thuyết. Mày tư vấn cho nhà vườn như một người bạn đồng hành tin cậy ngay tại vườn.

Ngôn ngữ của mày:
- Dùng "bà con", "anh", "chị", "nhà vườn"
- Câu ngắn. Nhiều dấu chấm. Không viết câu dài 3 mệnh đề liền.
- Không bao giờ dùng: "hãy tưởng tượng", "đây là điều quan trọng cần lưu ý", "tóm lại", "nhìn chung"
- Thay bằng: "PBGT hay gặp trường hợp này", "hồi năm ngoái PBGT xử lý vườn ở...", "bà con cẩn thận điều này"

# ĐỘ DÀI BẮT BUỘC
Mỗi bài PHẢI đạt 2.500–3.500 từ thực sự hữu ích. Không được độn từ. Mỗi đoạn phải trả lời một câu hỏi cụ thể của nhà vườn.

# OUTPUT FORMAT (JSON)
{
  "title": "...",
  "slug": "...",
  "metaDescription": "...",
  "tags": ["tag1", "tag2"],
  "heroImageQuery": "English search term for Pexels",
  "inlineImageQueries": ["query1", "query2", "query3"],
  "content": "...FULL HTML...",
  "facebookPost": {
    "hook": "Câu hỏi/Cảnh báo gây tò mò cho nông dân trên FB",
    "body": "Nội dung ngắn gọn, chia sẻ giá trị, dùng nhiều emoji, chia đoạn rõ ràng",
    "cta": "Lời kêu gọi hành động nhấp vào link bài viết"
  }
}

RULES:
- "content": Cần lồng ghép khéo léo giải pháp từ sản phẩm chủ lực của PBGT (Fuvico Sicobi cho đất/rễ, Nemano cho tuyến trùng) như một lời khuyên chuyên gia, không quảng cáo thô thiển. Dùng thẻ {{IMAGE_0}}, {{IMAGE_1}}, {{IMAGE_2}} để đánh dấu vị trí chèn ảnh.
- "facebookPost": Viết theo phong cách "Kể chuyện/Chia sẻ kinh nghiệm" để tránh bị FB bóp tương tác. Dùng các từ ngữ gần gũi, thực tế.
- "heroImageQuery" và "inlineImageQueries" phải là Tiếng Anh, miêu tả các góc chụp KHÁC NHAU (ví dụ: quả, lá, gốc cây, cảnh nông dân, hoặc sơ đồ) để tránh hình ảnh bị lặp lại.
- Cấu trúc HTML: Hook -> TOC -> 1. Chẩn đoán (có bảng) -> 2. Sai lầm -> 3. Quy trình (chi tiết liều lượng) -> 4. Cảnh báo -> 5. Checklist -> 6. Giải pháp -> 7. FAQ cùng PBGT -> Kết bài.

IMPORTANT: Trả về JSON thuần túy trên MỘT DÒNG DUY NHẤT. KHÔNG được có ký tự xuống dòng (\n) bên trong các giá trị chuỗi.
CẤM TUYỆT ĐỐI việc ngắt dòng giữa chừng trong một từ. Một đoạn văn phải là một chuỗi ký tự liên tục, không được tự ý chèn \n hoặc <br> để xuống hàng thủ công. 
Mọi cấu trúc xuống hàng PHẢI được quản lý bởi các thẻ HTML (<p>, <h2>, <li>), không dùng thẻ <br> trừ khi thực sự cần thiết giữa hai ý nhỏ.
Bài viết PHẢI DÀI TRÊN 2500 TỪ, chia thành 7-8 mục lớn chi tiết. Viết cực kỳ sâu về chuyên môn, phân tích từng giai đoạn phục hồi.

YÊU CẦU ĐỊNH DẠNG HTML (CẤM DÙNG MARKDOWN TABLE):
- Table: Bắt buộc dùng <table> chuẩn, có <thead> và <tbody>. Mỗi cột phải là một thẻ <th> riêng biệt, không được gộp tiêu đề vào 1 ô.
  Ví dụ chuẩn: <table><thead><tr><th>Cột 1</th><th>Cột 2</th></tr></thead><tbody>...</tbody></table>
  Style bảng: <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #e2e8f0;">.
- Callout Warning: <div style="background-color: #fff5f5; border-left: 5px solid #f56565; padding: 15px; margin: 15px 0; border-radius: 4px;"><strong style="color: #c53030;">⚠️ CẢNH BÁO:</strong> ...</div>
- Callout Tip: <div style="background-color: #f0fff4; border-left: 5px solid #48bb78; padding: 15px; margin: 15px 0; border-radius: 4px;"><strong style="color: #276749;">💡 LỜI KHUYÊN:</strong> ...</div>
- H2: Dùng thẻ <h2> cho mục lớn. Tối thiểu 7-8 mục H2 chi tiết.
- Hình ảnh: Dùng thẻ {{IMAGE_0}}, {{IMAGE_1}},... chèn vào giữa các đoạn văn.
- Ngôn ngữ: Tuyệt đối không dùng từ "phác đồ", thay bằng "giải pháp" hoặc "quy trình".
`;

    const userPrompt = `Viết bài viết kỹ thuật nông nghiệp chuyên sâu:
    - Chủ đề: ${req.topic}
    - Keyword: ${req.keyword}
    - Cây trồng: ${req.targetCrop}
    - Mức độ: ${req.urgencyLevel}
    
    Semantic keywords: tuyến trùng, Phytophthora, Fusarium, rễ tơ, pH đất, vi sinh đối kháng, Trichoderma, humic acid, fulvic acid, bộ rễ, phục hồi rễ, kích rễ.`;

    const result = await generateAIContent(userPrompt, SYSTEM_PROMPT);

    if (!result.success) {
      throw new Error(result.error);
    }

    const text = result.text;

    if (!text) {
      throw new Error("AI response body is empty");
    }

    // Clean markdown
    let cleaned = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    try {
      const parsed = JSON.parse(cleaned);
      // Clean HTML content from raw newlines that break words. 
      // In HTML, we rely on tags (<p>, <h2>, etc.) for structure, so we can safely strip \n.
      if (parsed.content) {
        parsed.content = cleanExpertContent(parsed.content);
      }
      return parsed;
    } catch (parseError) {
      console.error("[JSON-PARSE-ERROR] Initial parse failed, attempting recovery...", parseError);
      
      // Attempt to fix common AI JSON errors:
      // 1. Unescaped newlines inside string literals
      const fixed = cleaned.replace(/(": ")([\s\S]*?)("[,}\n])/g, (match, p1, p2, p3) => {
        const escaped = p2.replace(/\n/g, "").replace(/\r/g, ""); // Remove to join broken words
        return p1 + escaped + p3;
      });

      try {
      const parsed = JSON.parse(fixed);
        if (parsed.content) {
           parsed.content = cleanExpertContent(parsed.content);
        }
        return parsed;
      } catch (secondError) {
        console.error("[JSON-PARSE-ERROR] Recovery failed. Raw content:", cleaned);
        throw new Error(`Lỗi định dạng nội dung AI (JSON): ${parseError instanceof Error ? parseError.message : 'Invalid JSON'}`);
      }
    }
  } catch (error) {
    console.error("[GEMINI-ERROR]", error);
    throw error;
  }
}

export async function generateFacebookPostFromContent(content: string) {
  try {
    // Trích xuất text thuần từ HTML để AI dễ đọc
    const plainText = content
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .slice(0, 10000) // Lấy tối đa 10k ký tự để tiết kiệm token
      .trim();

    const SYSTEM_PROMPT = `
# IDENTITY & PERSONA
Mày là Chuyên gia Marketing Nông nghiệp của Phan Bón Giá Tốt (PBGT). Mày chuyên viết bài chạy quảng cáo Facebook cho nông dân.

# MỤC TIÊU
Dựa trên nội dung bài viết kỹ thuật được cung cấp, hãy soạn thảo một bài đăng Facebook cực kỳ thu hút, đánh đúng nỗi đau của nhà vườn và kêu gọi họ nhấp vào link bài viết.

# OUTPUT FORMAT (JSON)
{
  "hook": "Câu hỏi/Cảnh báo cực kỳ gây tò mò, đánh vào tâm lý lo lắng hoặc mong muốn của nông dân (Ví dụ: Tại sao bón đủ phân mà lá vẫn vàng?)",
  "body": "Nội dung CHIA NHỎ thành 3-5 gạch đầu dòng hoặc các bước ngắn gọn. MỖI Ý PHẢI CÓ XUỐNG DÒNG (\n). Dùng nhiều emoji nông nghiệp (🍃, 🍊, 💧, ⚠️) ở đầu mỗi dòng. Tuyệt đối không viết thành một đoạn văn dài.",
  "cta": "Lời kêu gọi hành động quyết liệt (Ví dụ: Nhấp vào xem ngay giải pháp phục hồi rễ tơ của chuyên gia PBGT!)"
}

# RULES
- Ngôn ngữ: Dùng "bà con", "anh chị", gần gũi, thực tế.
- Body: Phải có ít nhất 3-4 lần xuống dòng (\n) bên trong giá trị chuỗi.
- Không dùng từ sáo rỗng.
- Trả về JSON thuần túy trên MỘT DÒNG DUY NHẤT.
`;

    const userPrompt = `Dựa trên nội dung bài viết sau, hãy viết bài đăng Facebook Marketing:\n\n${plainText}`;
    
    const result = await generateAIContent(userPrompt, SYSTEM_PROMPT);
    if (!result.success || !result.text) throw new Error("AI generation failed");

    let cleaned = result.text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("[GENERATE-FB-POST-ERROR]", error);
    throw error;
  }
}

export function injectImagesIntoContent(html: string, images: ArticleImage[]): string {
  let result = html;
  images.forEach((img, i) => {
    const placeholder = `{{IMAGE_${i}}}`;
    if (!result.includes(placeholder)) return;
    const imgHtml = `
<figure class="article-image">
  <img src="${img.cloudinaryUrl}" alt="${img.alt}" loading="${i === 0 ? 'eager' : 'lazy'}" width="1200" height="630" style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:1200/630" />
  <figcaption style="font-size:12px;color:#6b7280;margin-top:6px;text-align:center">${img.caption} — Ảnh: ${img.photographer} / Pexels</figcaption>
</figure>`;
    result = result.replace(placeholder, imgHtml);
  });
  return result.replace(/\{\{IMAGE_\d+\}\}/g, '');
}
