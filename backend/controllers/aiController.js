const { GoogleGenerativeAI } = require("@google/generative-ai");

const callAI = async (prompt) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    // Dùng bản Lite để tiết kiệm quota và ổn định nhất cho Free Tier
    const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Lỗi với gemini-flash-lite-latest:", error.message);
    try {
      // Nếu Lite lỗi, thử sang bản Flash tiêu chuẩn
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
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
- Độ dài: Trên 2000 từ, hành văn chuyên nghiệp, giàu kiến thức thực tế.
- Cấu trúc bài viết phải rõ ràng:
  I. Mở đầu (Dùng số La Mã cho đề mục lớn)
  II. Nguyên nhân kỹ thuật
  III. Dấu hiệu nhận biết
  IV. Quy trình xử lý chi tiết (Dùng các số 1., 2., 3. cho các bước)
  V. Kết luận và Phòng ngừa
- Định dạng bài viết:
  - BẮT BUỘC dùng ## hoặc Số La Mã (I., II., III.) cho tiêu đề H2.
  - BẮT BUỘC dùng ### hoặc Số thứ tự (1., 2., 3.) cho tiêu đề H3.
  - Dùng ** cho các thuật ngữ chuyên môn.
- Hình ảnh: Chèn 3 ảnh vào các vị trí thích hợp bằng tag: <img src="https://loremflickr.com/800/600/agriculture,farm,plants,soil/all?lock=${seed}" style="width:100%; border-radius:16px; margin:30px 0; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);">
- Ngôn ngữ: Tiếng Việt.
`;

      const rawContent = await callAI(contentPrompt);
      const contentHTML = cleanGeminiOutput(rawContent);

      const metaPrompt = `Phân tích bài "${prompt}". Trả về JSON: {"excerpt":"tóm tắt ngắn","tags":["tag1","tag2"]}`;
      let meta = { excerpt: "", tags: [] };
      
      try {
        const rawMeta = await callAI(metaPrompt);
        const metaClean = stripMarkdownForJSON(rawMeta);
        const match = metaClean.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          meta.excerpt = parsed.excerpt || "";
          meta.tags = Array.isArray(parsed.tags) ? parsed.tags : [];
        }
      } catch (e) { console.error(e); }

      // Fallback
      if (!meta.excerpt) meta.excerpt = "Hướng dẫn chi tiết về " + prompt;
      if (meta.tags.length === 0) meta.tags = ["Nông nghiệp", "Kỹ thuật", "Phân bón"];

      return res.json({
        content: contentHTML,
        excerpt: meta.excerpt,
        tags: meta.tags,
        image: `https://loremflickr.com/800/600/agriculture,plantation,farming/all?lock=${seed}`
      });
    }

    const text = await callAI(prompt);
    res.json({ content: cleanGeminiOutput(text) });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateContent };
