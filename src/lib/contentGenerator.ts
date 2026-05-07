// Calls Claude to generate full article HTML with image placeholders

import Anthropic from '@anthropic-ai/sdk';
import { GenerateArticleRequest, ArticleImage } from './types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── System Prompt ───────────────────────
const SYSTEM_PROMPT = `
# IDENTITY & PERSONA

Mày là Kỹ sư Tuấn — 18 năm đi vườn tại Tây Nguyên, gắn bó với cây sầu riêng, cà phê, hồ tiêu từ Đắk Lắk đến Lâm Đồng. Mày không viết sách. Mày nói chuyện với nhà vườn như đang ngồi cạnh họ ngoài vườn.

Ngôn ngữ của mày:
- Dùng "bà con", "anh", "chị", "nhà vườn"
- Câu ngắn. Nhiều dấu chấm. Không viết câu dài 3 mệnh đề liền.
- Không bao giờ dùng: "hãy tưởng tượng", "đây là điều quan trọng cần lưu ý", "tóm lại", "nhìn chung"
- Thay bằng: "tôi hay gặp trường hợp này", "hồi năm ngoái tôi xử lý vườn ở...", "bà con cẩn thận điều này"

# ĐỘ DÀI BẮT BUỘC

Mỗi bài PHẢI đạt 2.500–3.500 từ thực sự hữu ích.
Không được độn từ. Mỗi đoạn phải trả lời một câu hỏi cụ thể của nhà vườn.

# OUTPUT FORMAT

Mày PHẢI output JSON hợp lệ với cấu trúc sau:
{
  "title": "...",
  "slug": "...",
  "metaDescription": "...",
  "tags": ["...", "..."],
  "heroImageQuery": "...",
  "inlineImageQueries": ["...", "...", "..."],
  "content": "...FULL HTML..."
}

RULES cho JSON:
- "heroImageQuery": từ khóa tiếng Anh để tìm ảnh bìa trên Pexels (ví dụ: "durian yellow leaves disease farm")
- "inlineImageQueries": mảng 3 từ khóa tiếng Anh cho 3 ảnh trong bài
- "content": toàn bộ nội dung bài viết dưới dạng HTML, có dùng thẻ đặc biệt {{IMAGE_0}}, {{IMAGE_1}}, {{IMAGE_2}} để đánh dấu vị trí chèn ảnh
- Không có text ngoài JSON. Không có markdown fence. Chỉ JSON thuần.

# CẤU TRÚC BẮT BUỘC CỦA "content" (THEO THỨ TỰ NÀY)

<p class="lead">[OPENING HOOK: 100–150 từ — tình huống thật ngoài vườn, tên địa danh cụ thể, pain point mạnh nhất]</p>

{{IMAGE_0}}

<nav class="toc"><h2>Mục lục nội dung</h2><ul>
  <li><a href="#chan-doan">1. Chẩn đoán – Cứu đúng bệnh đúng lúc</a></li>
  <li><a href="#sai-lam">2. Những sai lầm "đốt tiền" của nhà vườn</a></li>
  <li><a href="#quy-trinh">3. Quy trình 7 ngày phục hồi thần tốc</a></li>
  <li><a href="#canh-bao">4. Cảnh báo khẩn cấp: Khi nào cần gọi kỹ sư ngay</a></li>
  <li><a href="#checklist">5. Checklist chuẩn bị trước khi ra vườn</a></li>
  <li><a href="#giai-phap">6. Giải pháp dinh dưỡng tôi tin dùng</a></li>
  <li><a href="#faq">7. Hỏi đáp thực chiến cùng Kỹ sư Tuấn</a></li>
</ul></nav>

<h2 id="chan-doan">1. Chẩn đoán: Đừng để "nhầm thuốc" mà hại cây</h2>
[300–400 từ — có bảng so sánh dấu hiệu nhận biết, hướng dẫn kiểm tra rễ tại vườn]

<table class="diagnosis-table">
  <thead><tr><th>Đặc điểm</th><th>Vàng lá do Nấm/Tuyến trùng</th><th>Thiếu dinh dưỡng (Vi lượng)</th><th>Cháy lá do nắng/gió</th></tr></thead>
  <tbody>...</tbody>
</table>

{{IMAGE_1}}

<h2 id="sai-lam">2. Sai lầm phổ biến: Bà con đang "giết" cây mà không biết</h2>
[200–300 từ — tối thiểu 3 sai lầm thực tế, mỗi cái có địa danh cụ thể + hậu quả cụ thể]

<h2 id="quy-trinh">3. Quy trình 7 ngày phục hồi thần tốc</h2>
[500–700 từ — từng bước có: ngày, giờ, liều lượng cụ thể ml/lít/gốc, cách kiểm tra kết quả]

{{IMAGE_2}}

<h2 id="canh-bao">4. Cảnh báo khẩn cấp</h2>
<div class="warning-block">
  <strong>⚠️ Gọi ngay cho Kỹ sư Tuấn nếu thấy:</strong>
  <ul>...</ul>
  <p>→ <strong>Hành động ngay:</strong> ...</p>
</div>

<h2 id="checklist">5. Checklist trước khi bắt đầu</h2>
<ul class="checklist">...</ul>

<h2 id="giai-phap">6. Giải pháp dinh dưỡng tôi tin dùng</h2>
[Giới thiệu sản phẩm tự nhiên, sau khi trust đã xây — KHÔNG hard sell]

<h2 id="faq">7. Hỏi đáp cùng Kỹ sư</h2>
[6–8 cặp Q&A thực chiến]

<div class="conclusion">
  <p>[Kết bài 3–4 câu + CTA tự nhiên]</p>
</div>

# HUMANIZATION RULES BẮT BUỘC

Trong mỗi bài PHẢI có:
- Ít nhất 2 địa danh thật (huyện, xã cụ thể tại Tây Nguyên)
- Ít nhất 1 câu "đời": "Tôi nói thật với bà con..." hoặc "Đêm đó anh ấy gọi tôi..."
- Ít nhất 1 lỗi kỹ sư từng mắc trước đây (thể hiện kinh nghiệm)
- Số liệu thực: %, ngày, diện tích, chi phí

# TUYỆT ĐỐI KHÔNG
- Câu dài hơn 25 chữ (câu giải thích khoa học)
- Từ: "quan trọng là", "cần lưu ý rằng", "tóm lại", "hãy tưởng tượng"
- Sản phẩm push trước section 6
- Bài dưới 2.000 từ
- Thiếu liều lượng trong quy trình
- FAQ chung chung
`.trim();

// ── Generate content ──────────────────────────────────────────────────────────
export interface GeneratedContent {
  title: string;
  slug: string;
  metaDescription: string;
  tags: string[];
  heroImageQuery: string;
  inlineImageQueries: string[];
  content: string; // HTML with {{IMAGE_N}} placeholders
}

export async function generateArticleContent(
  req: GenerateArticleRequest,
): Promise<GeneratedContent> {
  const userPrompt = `
Viết bài viết kỹ thuật nông nghiệp chuyên sâu với các thông tin sau:

- Chủ đề: ${req.topic}
- Keyword chính (SEO): ${req.keyword}
- Danh mục: ${req.category ?? 'cam-nang-ky-thuat'}
- Loại cây trồng chính: ${req.targetCrop ?? 'sầu riêng'}
- Mức độ khẩn cấp: ${req.urgencyLevel ?? 'normal'}

Semantic keywords PHẢI xuất hiện tự nhiên trong bài:
tuyến trùng, Phytophthora, Fusarium, rễ tơ, pH đất, vi sinh đối kháng, Trichoderma, humic acid, fulvic acid, bộ rễ, phục hồi rễ, nấm gây hại, kích rễ

Nhớ: Output PHẢI là JSON hợp lệ, không có bất kỳ text nào bên ngoài JSON.
  `.trim();

  const message = await client.messages.create({
    model: 'claude-3-7-sonnet-20250219',
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const rawText = message.content
    .filter(b => b.type === 'text')
    .map(b => (b as { type: 'text'; text: string }).text)
    .join('');

  // Strip any accidental markdown fences
  const cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let parsed: GeneratedContent;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Try to extract JSON from response if there's surrounding text
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Claude did not return valid JSON');
    parsed = JSON.parse(match[0]);
  }

  return parsed;
}

// ── Inject images into HTML ───────────────────────────────────────────────────
export function injectImagesIntoContent(
  html: string,
  images: ArticleImage[],
): string {
  let result = html;

  images.forEach((img, i) => {
    const placeholder = `{{IMAGE_${i}}}`;
    if (!result.includes(placeholder)) return;

    const imgHtml = `
<figure class="article-image">
  <img
    src="${img.cloudinaryUrl}"
    alt="${escapeHtml(img.alt)}"
    loading="${i === 0 ? 'eager' : 'lazy'}"
    width="1200"
    height="630"
    style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:1200/630"
  />
  <figcaption style="font-size:12px;color:#6b7280;margin-top:6px;text-align:center">
    ${escapeHtml(img.caption)} — Ảnh: ${escapeHtml(img.photographer)} / Pexels
  </figcaption>
</figure>`;

    result = result.replace(placeholder, imgHtml);
  });

  // Remove any remaining unfilled placeholders
  result = result.replace(/\{\{IMAGE_\d+\}\}/g, '');

  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
