'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { AlertTriangle, Lightbulb, Info, CheckSquare, Table, Image as ImageIcon, FileCode } from 'lucide-react';
import { marked } from 'marked';
import { cleanExpertContent, repairTablesInHtml } from '@/utils/tableRepair';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  onExtractMetadata?: (metadata: { title?: string; slug?: string; excerpt?: string }) => void;
  label?: string;
  placeholder?: string;
}

// Hàm dọn dẹp và làm đẹp HTML cho người dùng dễ sửa
const prettifyHTML = (html: string) => {
  return html
    .replace(/&nbsp;/g, ' ')
    .replace(/<thead/g, '\n  <thead')
    .replace(/<tbody/g, '\n  <tbody')
    .replace(/<tr/g, '\n    <tr')
    .replace(/<th/g, '\n      <th')
    .replace(/<td/g, '\n      <td')
    .replace(/<\/tr>/g, '\n    </tr>')
    .replace(/<\/thead>/g, '\n  </thead>')
    .replace(/<\/tbody>/g, '\n  </tbody>')
    .replace(/<\/table>/g, '\n</table>')
    .replace(/<h/g, '\n<h')
    .replace(/<p/g, '\n<p')
    .replace(/<ul/g, '\n<ul')
    .replace(/<li/g, '\n  <li')
    .trim();
};

export default function RichTextEditor({ value, onChange, onExtractMetadata, label, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<any>(null);
  const [wordCount, setWordCount] = useState(0);
  const [isSourceMode, setIsSourceMode] = useState(false);

  // Tính số từ thực tế (loại bỏ thẻ HTML và các thực thể)
  useEffect(() => {
    if (!value) {
      setWordCount(0);
      return;
    }
    const text = value
      .replace(/<[^>]*>/g, ' ') // Xóa thẻ HTML
      .replace(/&nbsp;/g, ' ')  // Xóa khoảng trắng đặc biệt
      .replace(/\s+/g, ' ')    // Chuẩn hóa khoảng trắng
      .trim();
    
    // Đếm số từ theo dấu cách (hỗ trợ tiếng Việt tốt hơn)
    const count = text ? text.split(' ').filter(word => word.length > 0).length : 0;
    setWordCount(count);
  }, [value]);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range ? range.index : quill.getLength(), 'image', data.url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Lỗi khi tải ảnh lên. Bà con hãy thử lại!');
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'table'],
        ['clean']
      ],
      handlers: {
        image: imageHandler,
      }
    },
    table: true,
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'table'
  ];

  // Hàm chèn template vào vị trí con trỏ
  const insertTemplate = (html: string) => {
    if (!quillRef.current) return;
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    if (range) {
      editor.clipboard.dangerouslyPasteHTML(range.index, html);
    } else {
      editor.clipboard.dangerouslyPasteHTML(editor.getLength(), html);
    }
  };

  const handleImportMarkdown = () => {
    const markdown = prompt("Dán nội dung Markdown từ Claude/Gemini vào đây:");
    if (markdown) {
      // 1. EXTRACTION: Trích xuất metadata (Tiêu đề, SEO description...)
      const metadata: { title?: string; slug?: string; excerpt?: string } = {};
      
      // Match Title: Tìm dòng có "Tiêu đề", "Title", hoặc dòng đầu tiên có dấu # hoặc dòng đầu tiên có nhiều chữ
      const titleMatch = markdown.match(/^\s*(?:Tiêu đề|Title|#)\s*:?\s*(.+)$/mi) || markdown.match(/^(.+)$/m);
      if (titleMatch) metadata.title = titleMatch[1].trim();

      // Match Meta Description: Tìm "Meta description", "Mô tả ngắn"
      const metaMatch = markdown.match(/(?:Meta description|Mô tả ngắn|Excerpt)\s*:?\s*(.+)/i);
      if (metaMatch) metadata.excerpt = metaMatch[1].trim();

      // Match Slug
      const slugMatch = markdown.match(/^\s*(?:Slug|Đường dẫn)\s*:?\s*([a-z0-9-]+)$/mi);
      if (slugMatch) metadata.slug = slugMatch[1].trim();

      if (onExtractMetadata && (metadata.title || metadata.excerpt || metadata.slug)) {
        onExtractMetadata(metadata);
      }

      // 2. Dọn dẹp mã neo {#anchor} và XÓA các dòng metadata khỏi content chính
      // Sử dụng regex không phụ thuộc vào đầu dòng tuyệt đối để xóa sạch hơn
      let cleanedMarkdown = markdown
        .replace(/\{#[\w-]+\}/g, '')
        .replace(/^\s*(?:Tiêu đề|Title|Title:|Từ khóa chính|Từ khóa phụ|Meta description|Mô tả ngắn|Excerpt|Slug|Đường dẫn).+$/gmi, '')
        .trim();
      
      // Nếu dòng đầu tiên trùng khớp với tiêu đề đã trích xuất, xóa nó luôn
      if (metadata.title && cleanedMarkdown.startsWith(metadata.title)) {
        cleanedMarkdown = cleanedMarkdown.replace(metadata.title, '').trim();
      }
      // 3. TIỀN XỬ LÝ BẢNG MẠNH MẼ (Markdown Level)
      const lines = cleanedMarkdown.split('\n');
      const processedLines = [];
      for (let i = 0; i < lines.length; i++) {
        let l = lines[i].trim();
        if (l.match(/^\|?\s*:?-+:?\s*(\|?\s*:?-+:?\s*)*\|?$/)) {
           processedLines.push(l);
           continue;
        }
        if (l.includes('\t')) {
          l = '| ' + l.split('\t').filter(x => x.trim()).join(' | ') + ' |';
        } else if (/\s{3,}/.test(l) && !l.startsWith('|')) {
          l = '| ' + l.split(/\s{3,}/).filter(x => x.trim()).join(' | ') + ' |';
        }
        if (l.includes('|') && !l.startsWith('|')) l = '| ' + l;
        if (l.includes('|') && !l.endsWith('|')) l = l + ' |';
        processedLines.push(l);
      }
      cleanedMarkdown = processedLines.join('\n');

      // 4. Chuyển đổi Markdown sang HTML
      let htmlString = marked.parse(cleanedMarkdown) as string;
      
      // 5. DỌN DẸP TỔNG THỂ (Xóa \n, {#anchor}, sửa bảng)
      let finalHtml = cleanExpertContent(htmlString);

      // 6. TỰ ĐỘNG CHÈN LIÊN KẾT SẢN PHẨM THÔNG MINH (Chỉ chèn vào nội dung đã sạch)
      const productKeywords = [
        { 
          keywords: ['tuyến trùng', 'nốt sưng', 'sưng rễ', 'u sưng'], 
          productName: 'Nemano', 
          url: '/nemano',
          color: '#c53030'
        },
        { 
          keywords: ['vàng lá', 'thối rễ', 'chai đất', 'chai cứng', 'pH thấp', 'nghẹt rễ', 'mở đất'], 
          productName: 'Fuvico-Sicobi', 
          url: '/fuvico-sicobi',
          color: '#1a5c2a'
        }
      ];

      productKeywords.forEach(p => {
        p.keywords.forEach(kw => {
          const regex = new RegExp(`(${kw})(?![^<]*>|[^<>]*<\/a>)`, 'i');
          if (regex.test(finalHtml)) {
            finalHtml = finalHtml.replace(regex, `<a href="${p.url}" target="_blank" style="color: ${p.color}; font-weight: 800; text-decoration: underline; text-underline-offset: 4px;">$1 (Giải pháp ${p.productName})</a>`);
          }
        });
      });

      const quill = quillRef.current?.getEditor();
      if (quill) {
        const range = quill.getSelection();
        const insertIndex = range ? range.index : quill.getLength();
        quill.clipboard.dangerouslyPasteHTML(insertIndex, finalHtml);
      }
    }
  };

  const templates = {
    warning: `<div style="background-color: #fff5f5; border-left: 5px solid #f56565; padding: 15px; margin: 15px 0; border-radius: 4px;">
                <strong style="color: #c53030;">⚠️ CẢNH BÁO KHẨN CẤP:</strong> [Nhập dấu hiệu nguy hiểm hoặc hành động cần ngưng ngay tại đây...]
              </div>`,
    tip: `<div style="background-color: #f0fff4; border-left: 5px solid #48bb78; padding: 15px; margin: 15px 0; border-radius: 4px;">
            <strong style="color: #276749;">💡 LỜI KHUYÊN TỪ PHAN BÓN GIÁ TỐT:</strong> [Nhập kinh nghiệm thực tế hoặc mẹo nhỏ giúp bà con tiết kiệm chi phí...]
          </div>`,
    info: `<div style="background-color: #ebf8ff; border-left: 5px solid #4299e1; padding: 15px; margin: 15px 0; border-radius: 4px;">
             <strong style="color: #2b6cb0;">ℹ️ LƯU Ý QUAN TRỌNG:</strong> [Nhập các điều kiện cần thiết như thời tiết, liều lượng chuẩn...]
           </div>`,
    checklist: `<div style="background-color: #f7fafc; border: 1px dashed #cbd5e0; padding: 15px; margin: 15px 0; border-radius: 8px;">
                  <strong style="display: block; margin-bottom: 10px;">✅ CHECKLIST KIỂM TRA TRƯỚC KHI LÀM:</strong>
                  <ul style="list-style-type: none; padding-left: 0;">
                    <li style="margin-bottom: 5px;">[ ] Bước 1: Kiểm tra pH đất...</li>
                    <li style="margin-bottom: 5px;">[ ] Bước 2: Quan sát bộ rễ...</li>
                    <li style="margin-bottom: 5px;">[ ] Bước 3: Xác định diện tích bị bệnh...</li>
                  </ul>
                </div>`,
    table: `<table>
                <thead>
                  <tr>
                    <th>Đặc điểm so sánh</th>
                    <th>Dấu hiệu nhận biết</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Màu sắc lá/rễ</td>
                    <td>...</td>
                  </tr>
                  <tr>
                    <td>Tốc độ lây lan</td>
                    <td>...</td>
                  </tr>
                </tbody>
              </table>`,
    image: `<div style="border: 2px dashed #cbd5e0; border-radius: 16px; padding: 40px; text-align: center; margin: 20px 0; background: #f8fafc; border-style: dashed;">
               <div style="font-size: 32px; margin-bottom: 10px;">📷</div>
               <div style="color: #4a5568; font-weight: 800; font-size: 14px; text-transform: uppercase;">Ảnh minh họa thực tế tại vườn</div>
               <div style="color: #a0aec0; font-size: 11px; margin-top: 5px;">(Anh hãy xóa khung này và chèn ảnh chụp thật rễ/lá bệnh vào đây)</div>
            </div>`
  };

  const getWordCountStatus = () => {
    if (wordCount === 0) return { color: 'text-gray-400', label: 'Chưa bắt đầu' };
    if (wordCount < 300) return { color: 'text-red-500', label: 'Nội dung quá ngắn' };
    if (wordCount < 800) return { color: 'text-amber-500', label: 'Tốt (Cơ bản)' };
    if (wordCount < 1500) return { color: 'text-blue-500', label: 'Chuyên sâu' };
    return { color: 'text-green-600', label: 'Đạt chuẩn PBGT' };
  };

  const status = getWordCountStatus();

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest flex items-center justify-between">
          <span>{label}</span>
          <span className="text-gray-300">Editor Pro v2.0</span>
        </label>
      )}

      {/* Quick-insert Toolbar */}
      <div className="flex flex-wrap gap-2 p-2.5 bg-gray-900 rounded-2xl shadow-inner shadow-black/20">
         <button 
            type="button" 
            onClick={handleImportMarkdown} 
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black hover:bg-emerald-500 transition-all border border-emerald-500 active:scale-95 uppercase tracking-wider"
         >
            <FileCode size={12} /> DÁN TỪ CLAUDE 🚀
         </button>
         <div className="w-[1px] h-8 bg-gray-800 mx-1 self-center" />
         
         <button type="button" onClick={() => insertTemplate(templates.warning)} className="flex items-center gap-1.5 px-3 py-2 bg-red-900/30 text-red-400 rounded-xl text-[10px] font-black hover:bg-red-900/50 transition-all border border-red-900/30 active:scale-95 uppercase tracking-wider">
            <AlertTriangle size={12} /> Cảnh báo ⚠️
         </button>
         <button type="button" onClick={() => insertTemplate(templates.tip)} className="flex items-center gap-1.5 px-3 py-2 bg-emerald-900/30 text-emerald-400 rounded-xl text-[10px] font-black hover:bg-emerald-900/50 transition-all border border-emerald-900/30 active:scale-95 uppercase tracking-wider">
            <Lightbulb size={12} /> Lời khuyên PBGT 💡
         </button>
         <button type="button" onClick={() => insertTemplate(templates.info)} className="flex items-center gap-1.5 px-3 py-2 bg-blue-900/30 text-blue-400 rounded-xl text-[10px] font-black hover:bg-blue-900/50 transition-all border border-blue-900/30 active:scale-95 uppercase tracking-wider">
            <Info size={12} /> Lưu ý ℹ️
         </button>
         <div className="w-[1px] h-8 bg-gray-800 mx-1 self-center" />
         <button type="button" onClick={() => insertTemplate(templates.checklist)} className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 text-gray-300 rounded-xl text-[10px] font-black hover:bg-gray-700 transition-all border border-gray-700 active:scale-95 uppercase tracking-wider">
            <CheckSquare size={12} /> Checklist ✅
         </button>
         <button type="button" onClick={() => insertTemplate(templates.table)} className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 text-gray-300 rounded-xl text-[10px] font-black hover:bg-gray-700 transition-all border border-gray-700 active:scale-95 uppercase tracking-wider">
            <Table size={12} /> Chẩn đoán 📊
         </button>
         <button type="button" onClick={() => insertTemplate(templates.image)} className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 text-gray-300 rounded-xl text-[10px] font-black hover:bg-gray-700 transition-all border border-gray-700 active:scale-95 uppercase tracking-wider">
            <ImageIcon size={12} /> Ảnh minh họa 📷
         </button>

          <button 
            type="button" 
            onClick={() => {
              const quill = quillRef.current?.getEditor();
              if (quill) {
                const currentHtml = quill.root.innerHTML;
                const repairedHtml = cleanExpertContent(currentHtml);
                quill.root.innerHTML = repairedHtml;
              }
            }} 
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-900/30 text-amber-400 rounded-xl text-[10px] font-black hover:bg-amber-900/50 transition-all border border-amber-900/30 active:scale-95 uppercase tracking-wider"
            title="Dọn dẹp tổng thể và sửa bảng"
         >
            <Table size={12} /> Sửa bảng 🛠️
         </button>

         <button 
            type="button" 
            onClick={() => {
              const quill = quillRef.current?.getEditor();
              if (quill) {
                const currentHtml = quill.root.innerHTML;
                const base64Count = (currentHtml.match(/src="data:image\/[^;]+;base64,/g) || []).length;
                if (base64Count > 0) {
                  if (confirm(`Phát hiện ${base64Count} ảnh dán trực tiếp (rất nặng). Bà con có muốn hệ thống tự động loại bỏ để lưu bài nhẹ hơn không? (Sau đó bà con hãy dùng nút 'Tải ảnh' để chèn lại cho đẹp)`)) {
                    const cleanedHtml = currentHtml.replace(/<img[^>]+src="data:image\/[^;]+;base64,[^">]+"[^>]*>/g, '<p style="color:red; font-weight:bold;">[ẢNH QUÁ NẶNG ĐÃ BỊ XÓA - BÀ CON HÃY TẢI LÊN LẠI TẠI ĐÂY]</p>');
                    quill.root.innerHTML = cleanedHtml;
                  }
                } else {
                  alert("✅ Tuyệt vời! Không phát hiện ảnh nặng (Base64). Bài viết của bà con rất sạch.");
                }
              }
            }} 
            className="flex items-center gap-1.5 px-3 py-2 bg-red-900/30 text-red-400 rounded-xl text-[10px] font-black hover:bg-red-900/50 transition-all border border-red-900/30 active:scale-95 uppercase tracking-wider"
            title="Kiểm tra và dọn dẹp ảnh nặng"
         >
            <ImageIcon size={12} /> Dọn ảnh nặng 🧹
         </button>

         <div className="w-[1px] h-8 bg-gray-800 mx-1 self-center" />

         <button 
            type="button" 
            onClick={() => {
              const quill = quillRef.current?.getEditor();
              if (quill) {
                const table = quill.getModule('table');
                table.insertRowBelow();
              }
            }} 
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 text-gray-300 rounded-xl text-[10px] font-black hover:bg-gray-700 transition-all border border-gray-700 active:scale-95 uppercase tracking-wider"
         >
            + Hàng
         </button>

         <button 
            type="button" 
            onClick={() => {
              const quill = quillRef.current?.getEditor();
              if (quill) {
                const table = quill.getModule('table');
                table.insertColumnRight();
              }
            }} 
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 text-gray-300 rounded-xl text-[10px] font-black hover:bg-gray-700 transition-all border border-gray-700 active:scale-95 uppercase tracking-wider"
         >
            + Cột
         </button>

         <button 
            type="button" 
            onClick={() => {
              const quill = quillRef.current?.getEditor();
              if (quill) {
                const table = quill.getModule('table');
                table.deleteRow();
              }
            }} 
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 text-red-400 rounded-xl text-[10px] font-black hover:bg-red-900/30 transition-all border border-gray-700 active:scale-95 uppercase tracking-wider"
         >
            Xóa Hàng
         </button>

         <button 
            type="button" 
            onClick={() => {
              const quill = quillRef.current?.getEditor();
              if (quill) {
                const table = quill.getModule('table');
                table.deleteColumn();
              }
            }} 
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 text-red-400 rounded-xl text-[10px] font-black hover:bg-red-900/30 transition-all border border-gray-700 active:scale-95 uppercase tracking-wider"
         >
            Xóa Cột
         </button>

         <div className="flex-1" />

         <button 
            type="button" 
            onClick={() => setIsSourceMode(!isSourceMode)} 
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black transition-all border active:scale-95 uppercase tracking-wider ${isSourceMode ? 'bg-orange-600 text-white border-orange-500' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}`}
         >
            <FileCode size={12} /> {isSourceMode ? 'XEM KẾT QUẢ' : 'XEM MÃ NGUỒN </>'}
         </button>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-[2rem] overflow-hidden focus-within:border-[#1a5c2a] transition-all shadow-lg shadow-gray-100">
        <div className="max-h-[700px] overflow-y-auto custom-editor-scroll">
          {isSourceMode ? (
            <textarea
              value={prettifyHTML(value)}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-[600px] p-10 font-mono text-sm bg-gray-900 text-emerald-400 outline-none resize-none leading-relaxed"
              placeholder="Nhập mã HTML tại đây..."
            />
          ) : (
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              placeholder={placeholder}
              className="bg-white font-medium text-gray-800 expert-editor"
            />
          )}
        </div>
      </div>

      {/* Word Count Bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
         <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 ${status.color}`}>
               <span className="text-[11px] font-black uppercase tracking-widest leading-none">
                  Số từ: {wordCount.toLocaleString()}
               </span>
               <div className={`w-2 h-2 rounded-full animate-pulse ${status.color.replace('text', 'bg')}`} />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${status.color}`}>
               {status.label}
            </span>
         </div>
         <p className="text-[9px] text-gray-400 font-medium italic">
            * Lưu ý: Bài viết trên 2.500 từ luôn được ưu tiên hiển thị và tin tưởng hơn.
         </p>
      </div>

      <style jsx global>{`
        .expert-editor .ql-container {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.8;
        }
        .expert-editor .ql-editor {
          padding: 30px 40px;
        }
        .expert-editor h2 {
          border-left: 6px solid #1a5c2a;
          padding-left: 20px;
          margin: 40px 0 20px 0 !important;
          color: #1a202c;
          font-weight: 900 !important;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .expert-editor h3 {
          color: #2d3748;
          font-weight: 800 !important;
          margin: 30px 0 15px 0 !important;
          font-size: 1.25rem;
        }
        .expert-editor blockquote {
          border-left: 4px solid #cbd5e0;
          background: #f7fafc;
          padding: 20px 30px;
          font-style: italic;
          color: #4a5568;
          border-radius: 0 12px 12px 0;
          margin: 20px 0;
        }
        .expert-editor p {
          margin-bottom: 1.5rem;
        }
        .expert-editor .table-responsive {
          overflow-x: auto;
          margin: 30px 0;
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .expert-editor table {
          width: 100% !important;
          border-collapse: collapse;
          font-size: 14px;
        }
        .expert-editor th {
          background: #f8fafc;
          color: #1a5c2a;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 15px 20px;
          border-bottom: 2px solid #e2e8f0;
          text-align: left;
        }
        .expert-editor td {
          padding: 15px 20px;
          border-bottom: 1px solid #f1f5f9;
          border-right: 1px solid #f1f5f9;
          color: #4a5568;
          line-height: 1.6;
          min-width: 50px;
        }
        .expert-editor th {
          border-right: 1px solid #e2e8f0;
          padding: 15px 20px;
        }
        .expert-editor tr:last-child td {
          border-bottom: none;
        }
        .expert-editor tr:nth-child(even) {
          background-color: #fafbfb;
        }
        .custom-editor-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-editor-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-editor-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 4px;
        }
        .custom-editor-scroll::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
        .expert-editor .ql-toolbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: white;
          border-top: none;
          border-left: none;
          border-right: none;
        }
      `}</style>
    </div>
  );
}
