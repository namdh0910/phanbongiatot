import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerateArticleRequest, ArticleImage } from './types';

// Step 3 structure
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateArticleContent(req: GenerateArticleRequest) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    }, { apiVersion: 'v1' });

    const SYSTEM_PROMPT = `
# IDENTITY & PERSONA
Mày là đại diện Đội ngũ Phan Bón Giá Tốt (PBGT) — với 18 năm kinh nghiệm thực chiến tại vườn Tây Nguyên, gắn bó với cây sầu riêng, cà phê, hồ tiêu từ Đắk Lắk đến Lâm Đồng. Mày không viết sách theo kiểu lý thuyết. Mày tư vấn cho nhà vườn như một người bạn đồng hành tin cậy ngay tại vườn.

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
  "content": "...FULL HTML..."
}

RULES:
- "content" dùng thẻ {{IMAGE_0}}, {{IMAGE_1}}, {{IMAGE_2}} để đánh dấu vị trí chèn ảnh.
- Cấu trúc HTML: Hook -> TOC -> 1. Chẩn đoán (có bảng) -> 2. Sai lầm -> 3. Quy trình (chi tiết liều lượng) -> 4. Cảnh báo -> 5. Checklist -> 6. Giải pháp -> 7. FAQ cùng PBGT -> Kết bài.
`;

    const userPrompt = `Viết bài viết kỹ thuật nông nghiệp chuyên sâu:
    - Chủ đề: ${req.topic}
    - Keyword: ${req.keyword}
    - Cây trồng: ${req.targetCrop}
    - Mức độ: ${req.urgencyLevel}
    
    Semantic keywords: tuyến trùng, Phytophthora, Fusarium, rễ tơ, pH đất, vi sinh đối kháng, Trichoderma, humic acid, fulvic acid, bộ rễ, phục hồi rễ, kích rễ.`;

    const result = await model.generateContent(SYSTEM_PROMPT + "\n\n" + userPrompt);
    const response = result.response;
    const text = response.text();

    // Clean markdown
    const cleaned = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("[GEMINI-ERROR]", error);
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
