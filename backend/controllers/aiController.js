const { GoogleGenerativeAI } = require("@google/generative-ai");

const getModel = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
};

const callAI = async (prompt) => {
  const model = getModel();
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
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
  
  // Bước 1: Gỡ bỏ code blocks
  let text = rawText.replace(/```(?:html)?\n?([\s\S]*?)```/gi, '$1').trim();
  
  // Bước 2: Xử lý tiêu đề (Header)
  text = text.replace(/^###[ \t]*(.*$)/gim, '<h3>$1</h3>');
  text = text.replace(/^##[ \t]*(.*$)/gim, '<h2>$1</h2>');
  text = text.replace(/^#[ \t]*(.*$)/gim, '<h1>$1</h1>');
  
  // Bước 3: Xử lý in đậm và in nghiêng
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Bước 4: Xử lý danh sách
  text = text.replace(/^[ \t]*[\*\-\+\•]\s+(.*$)/gim, '<li>$1</li>');
  text = text.replace(/^[ \t]*\d+\.\s+(.*$)/gim, '<li>$1</li>');
  
  // Bước 5: Bọc <li> vào <ul>
  text = text.replace(/(<li>[\s\S]*?<\/li>)/gi, '<ul>$1</ul>');
  text = text.replace(/<\/ul>\s*<ul>/gi, ''); 
  
  // Bước 6: Xử lý các đoạn văn bản (Paragraphs)
  // Chỉ tách đoạn khi có 2 dấu xuống dòng liên tiếp
  const paragraphs = text.split(/\n\s*\n/);
  const processedParagraphs = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return "";
    // Nếu đã bọc tag HTML (h1-h6, li, ul, blockquote) thì giữ nguyên
    if (/^<(h[1-6]|li|ul|ol|blockquote|img)/i.test(trimmed)) return trimmed;
    // Thay thế các dấu xuống dòng đơn lẻ bằng khoảng cách hoặc <br>
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
      const contentPrompt = `
Hãy đóng vai một Kỹ sư Nông nghiệp dày dạn kinh nghiệm. Viết bài hướng dẫn chuyên sâu về: "${prompt}".
YÊU CẦU BẮT BUỘC:
- Độ dài: Trên 1500 từ, hành văn chuyên nghiệp, gần gũi với bà con nông dân.
- Cấu trúc bài viết:
  1. Mở đầu: Tầm quan trọng của vấn đề.
  2. Các nguyên nhân chính (phân tích kỹ thuật).
  3. Dấu hiệu nhận biết sớm (rễ, lá, thân).
  4. Giải pháp khắc phục: Quy trình từng bước (Tưới gốc, Phun lá, Bón phân).
  5. Cách phòng ngừa bền vững.
- Định dạng bài viết:
  - Dùng # cho tiêu đề chính (H1).
  - Dùng ## cho tiêu đề mục lớn (H2).
  - Dùng ### cho tiêu đề mục nhỏ (H3).
  - Dùng ** cho các từ khóa quan trọng.
  - Dùng * cho danh sách liệt kê.
- Hình ảnh: Chèn 2-3 ảnh vào giữa các mục bằng tag: <img src="https://loremflickr.com/800/600/agriculture,farm,plants,soil/all?random=${Math.floor(Math.random() * 1000)}" style="width:100%; border-radius:16px; margin:30px 0; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);">
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
        image: `https://loremflickr.com/800/600/agriculture,plantation,farming/all?random=${Date.now()}`
      });
    }

    const text = await callAI(prompt);
    res.json({ content: cleanGeminiOutput(text) });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateContent };
