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
  text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bước 3: Xử lý in đậm và in nghiêng
  text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Bước 4: Xử lý danh sách (Bullets & Numbers)
  // Chuyển đổi các dòng bắt đầu bằng *, -, +, • thành <li>
  text = text.replace(/^[ \t]*[\*\-\+\•]\s+(.*$)/gim, '<li>$1</li>');
  // Chuyển đổi danh sách số 1. 2. 3. thành <li>
  text = text.replace(/^[ \t]*\d+\.\s+(.*$)/gim, '<li>$1</li>');
  
  // Bước 5: Bọc <li> vào <ul>
  // Tìm các cụm <li> liên tiếp và bọc <ul>
  text = text.replace(/(<li>[\s\S]*?<\/li>)/gi, '<ul>$1</ul>');
  text = text.replace(/<\/ul>\s*<ul>/gi, ''); // Gộp các <ul> bị tách
  
  // Bước 6: Xử lý các đoạn văn bản (Paragraphs)
  // Tách văn bản thành các dòng, bọc các dòng không phải HTML vào <p>
  const lines = text.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return "";
    // Nếu đã là tag HTML thì giữ nguyên
    if (/^<[a-z1-6]/i.test(trimmed)) return trimmed;
    return `<p>${trimmed}</p>`;
  });
  
  text = processedLines.join('');
  
  // Bước 7: Dọn dẹp cuối cùng
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
Viết bài hướng dẫn nông nghiệp chuyên sâu về: "${prompt}".
YÊU CẦU:
- Trên 1000 từ.
- Dùng ## cho tiêu đề mục.
- Dùng * cho danh sách.
- Chèn ảnh: <img src="https://loremflickr.com/800/500/agriculture,coffee" style="width:100%; border-radius:12px; margin:24px 0;">
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
        image: `https://loremflickr.com/800/500/${encodeURIComponent(prompt.split(' ')[0])},agriculture`
      });
    }

    const text = await callAI(prompt);
    res.json({ content: cleanGeminiOutput(text) });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateContent };
