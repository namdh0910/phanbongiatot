const { GoogleGenerativeAI } = require("@google/generative-ai");

const callAI = async (prompt) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    // Quay lại model 1.5 Flash - Bản ổn định nhất cho Key cũ
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Lỗi với gemini-1.5-flash, đang thử gemini-pro:", error.message);
    try {
      // Fallback sang bản Pro tiêu chuẩn
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (fallbackError) {
      console.error("Lỗi fallback toàn bộ:", fallbackError.message);
      throw new Error(`[Hệ Thống Phân Bón Lỗi AI]: ${fallbackError.message}`);
    }
  }
};

const stripMarkdownForJSON = (text) => {
  return text
    .replace(/^```[\w]*\n?/gm, '')
    .replace(/```$/gm, '')
    .trim();
};

/**
 * cleanGeminiOutput - Chuyển đổi Markdown sang HTML chuẩn cho ReactQuill
 */
function cleanGeminiOutput(rawText) {
  if (!rawText) return "";
  
  // Bước 1: Gỡ bỏ code blocks và các kí tự thừa
  let text = rawText.replace(/```(?:html)?\n?([\s\S]*?)```/gi, '$1').trim();
  
  // Xóa bỏ các dòng chỉ chứa dấu gạch ngang (---) hoặc (***)
  text = text.replace(/^[ \t]*[\-\*]{3,}[ \t]*$/gm, '');

  // Bước 2: Xử lý tiêu đề (Header)
  text = text.replace(/^###[ \t]*(.*$)/gim, '<h3>$1</h3>');
  text = text.replace(/^##[ \t]*(.*$)/gim, '<h2>$1</h2>');
  text = text.replace(/^#[ \t]*(.*$)/gim, '<h1>$1</h1>');
  
  // 2b. Xử lý số La Mã (I, II, III...) -> H2
  text = text.replace(/^[ \t]*(?:I|II|III|IV|V|VI|VII|VIII|IX|X)\.[ \t]+(.*$)/gim, '<h2>$1</h2>');
  
  // 2c. Xử lý số thứ tự "1. ", "2. " ở đầu dòng -> H3
  text = text.replace(/^[ \t]*[0-9]+\.[ \t]+(.*$)/gim, '<h3>$1</h3>');
  
  // Bước 3: Xử lý in đậm và in nghiêng
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Bước 4: Xử lý danh sách
  text = text.replace(/^[ \t]*[\*\-\+\•]\s+(.*$)/gim, '<li>$1</li>');
  
  // Bước 5: Bọc <li> vào <ul>
  text = text.replace(/(<li>[\s\S]*?<\/li>)/gi, '<ul>$1</ul>');
  text = text.replace(/<\/ul>\s*<ul>/gi, ''); 
  
  // Bước 6: Xử lý các đoạn văn bản (Paragraphs)
  const paragraphs = text.split(/\n\s*\n/);
  const processedParagraphs = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return "";
    if (/^<(h[1-6]|li|ul|ol|blockquote|img)/i.test(trimmed)) return trimmed;
    return `<p>${trimmed.replace(/\n/g, ' ')}</p>`;
  });
  
  text = processedParagraphs.join('');
  text = text.replace(/<p>\s*<\/p>/gi, '');
  text = text.replace(/&amp;/g, '&');
  
  return text;
}

const generateContent = async (req, res) => {
  try {
    const { prompt, type } = req.body;
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ message: 'Thiếu API Key' });

    if (type === 'blog') {
      const seed = Math.abs(prompt.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0)) % 1000;
      const contentPrompt = `
Hãy đóng vai một Kỹ sư Nông nghiệp dày dạn kinh nghiệm. Viết bài hướng dẫn chuyên sâu về: "${prompt}".
YÊU CẦU BẮT BUỘC:
- Độ dài: Trên 2000 từ, hành văn chuyên nghiệp, gần gũi với nông dân.
- Cấu trúc bài viết:
  I. Mở đầu (Bối cảnh và tầm quan trọng)
  II. Nguyên nhân & Cơ chế kỹ thuật
  III. Dấu hiệu nhận biết thực tế tại vườn
  IV. Quy trình xử lý chi tiết (Từng bước 1, 2, 3...)
  V. Danh mục sản phẩm khuyên dùng (Ghi chú: [BOX_SAN_PHAM]...[/BOX_SAN_PHAM])
  VI. Kết luận & Lịch phòng ngừa định kỳ
- Định dạng:
  - Dùng ## hoặc Số La Mã (I., II.) cho H2.
  - Dùng ### hoặc Số thứ tự (1., 2.) cho H3.
  - Dùng ** để nhấn mạnh các lưu ý quan trọng.
- Hình ảnh: Chèn 3 ảnh vào các vị trí thích hợp bằng tag: <img src="https://loremflickr.com/800/600/agriculture,farm,plantation,crop,soil/all?lock=${seed + 1}" style="width:100%; border-radius:16px; margin:30px 0; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);">
- Ngôn ngữ: Tiếng Việt.
`;

      const rawContent = await callAI(contentPrompt);
      const contentHTML = cleanGeminiOutput(rawContent);

      const metaPrompt = `Phân tích bài viết về "${prompt}". Trả về JSON duy nhất: {
        "excerpt": "tóm tắt ngắn 150 ký tự",
        "tags": ["tag1", "tag2", "tag3"],
        "seoTitle": "Tiêu đề chuẩn SEO dưới 60 ký tự",
        "seoDescription": "Mô tả chuẩn SEO dưới 160 ký tự chứa từ khóa chính"
      }`;
      
      let meta = { 
        excerpt: "", 
        tags: [], 
        seoTitle: `${prompt} | Kỹ thuật & Giải pháp | Phân Bón Giá Tốt`,
        seoDescription: `Hướng dẫn chi tiết về ${prompt}. Quy trình kỹ thuật chuẩn từ kỹ sư nông nghiệp. Xem ngay!`
      };
      
      try {
        const rawMeta = await callAI(metaPrompt);
        const metaClean = stripMarkdownForJSON(rawMeta);
        const match = metaClean.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          meta.excerpt = parsed.excerpt || "";
          meta.tags = Array.isArray(parsed.tags) ? parsed.tags : [];
          meta.seoTitle = parsed.seoTitle || meta.seoTitle;
          meta.seoDescription = parsed.seoDescription || meta.seoDescription;
        }
      } catch (e) { console.error("Lỗi parse Meta AI:", e); }

      // Fallback
      if (!meta.excerpt) meta.excerpt = "Hướng dẫn chi tiết về " + prompt;
      if (meta.tags.length === 0) meta.tags = ["Nông nghiệp", "Kỹ thuật", "Phân bón"];

      return res.json({
        content: contentHTML,
        excerpt: meta.excerpt,
        tags: meta.tags,
        seoTitle: meta.seoTitle,
        seoDescription: meta.seoDescription,
        image: `https://loremflickr.com/800/600/agriculture,farming,fruit/all?lock=${seed}`
      });
    }

    const text = await callAI(prompt);
    res.json({ content: cleanGeminiOutput(text) });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateContent };
