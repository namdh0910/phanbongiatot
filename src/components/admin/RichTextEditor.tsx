'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { AlertTriangle, Lightbulb, Info, CheckSquare, Table, Image as ImageIcon, FileCode } from 'lucide-react';
import { marked } from 'marked';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
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

export default function RichTextEditor({ value, onChange, label, placeholder }: RichTextEditorProps) {
  const quillRef = useRef<any>(null);
  const [wordCount, setWordCount] = useState(0);
  const [isSourceMode, setIsSourceMode] = useState(false);

  // Tính số từ thực tế (loại bỏ thẻ HTML)
  useEffect(() => {
    const text = value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const count = text ? text.split(/\s+/).length : 0;
    setWordCount(count);
  }, [value]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean']
      ],
    },
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
      // 1. Dọn dẹp mã neo {#anchor} của Claude
      let cleanedMarkdown = markdown.replace(/\{#[\w-]+\}/g, '');
      
      // 2. Tiền xử lý bảng (Đảm bảo hàng tiêu đề không bị gộp)
      // Nếu thấy hàng tiêu đề có vẻ bị dính, ta sẽ chèn thêm dấu gạch đứng
      const lines = cleanedMarkdown.split('\n');
      const processedLines = lines.map(line => {
        if (line.includes('|') && !line.includes('---')) {
          // Đảm bảo có dấu gạch đứng ở đầu và cuối hàng
          let l = line.trim();
          if (!l.startsWith('|')) l = '| ' + l;
          if (!l.endsWith('|')) l = l + ' |';
          return l;
        }
        return line;
      });
      cleanedMarkdown = processedLines.join('\n');

      // 3. Chuyển đổi Markdown sang HTML
      let htmlString = marked.parse(cleanedMarkdown) as string;
      
      // 4. THUẬT TOÁN SỬA BẢNG THÔNG MINH (Smart Repair)
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const tables = doc.querySelectorAll('table');

      tables.forEach(table => {
        const thead = table.querySelector('thead');
        const firstRow = table.querySelector('tbody tr');
        
        if (thead && firstRow) {
          const headerCells = thead.querySelectorAll('th');
          const bodyCells = firstRow.querySelectorAll('td');
          
          // Phát hiện lỗi: Nếu header chỉ có 1 ô mà body có nhiều ô
          if (headerCells.length === 1 && bodyCells.length > 1) {
            const headerText = headerCells[0].textContent || "";
            // Tách tiêu đề dựa trên xuống dòng hoặc 2 khoảng trắng trở lên
            const titles = headerText.split(/\n|\s{2,}/).map(t => t.trim()).filter(t => t.length > 0);
            
            // Nếu số lượng tiêu đề tách được khớp với số cột bên dưới
            if (titles.length === bodyCells.length) {
              const newTr = doc.createElement('tr');
              titles.forEach(title => {
                const th = doc.createElement('th');
                th.textContent = title;
                th.style.border = "1px solid #cbd5e0";
                th.style.padding = "15px";
                th.style.backgroundColor = "#f7fafc";
                th.style.color = "#1a5c2a";
                th.style.fontWeight = "800";
                th.style.textAlign = "left";
                newTr.appendChild(th);
              });
              thead.innerHTML = '';
              thead.appendChild(newTr);
            }
          }
        }

        // Áp dụng style cho tất cả th/td để chắc chắn
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.margin = "20px 0";
        table.style.border = "1px solid #cbd5e0";
        
        table.querySelectorAll('th').forEach(th => {
          th.style.border = "1px solid #cbd5e0";
          th.style.padding = "15px";
          th.style.backgroundColor = "#f7fafc";
          th.style.color = "#1a5c2a";
          th.style.fontWeight = "800";
        });
        
        table.querySelectorAll('td').forEach(td => {
          td.style.border = "1px solid #cbd5e0";
          td.style.padding = "12px";
        });
      });

      const finalHtml = doc.body.innerHTML;

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
    table: `<div class="table-responsive">
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #e2e8f0;">
                <thead>
                  <tr style="background-color: #edf2f7;">
                    <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left;">Đặc điểm so sánh</th>
                    <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left;">Dấu hiệu nhận biết</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #e2e8f0; padding: 10px; font-weight: bold;">Màu sắc lá/rễ</td>
                    <td style="border: 1px solid #e2e8f0; padding: 10px;">...</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #e2e8f0; padding: 10px; font-weight: bold;">Tốc độ lây lan</td>
                    <td style="border: 1px solid #e2e8f0; padding: 10px;">...</td>
                  </tr>
                </tbody>
              </table>
            </div>`,
    image: `<div style="border: 2px dashed #cbd5e0; border-radius: 16px; padding: 40px; text-align: center; margin: 20px 0; background: #f8fafc; border-style: dashed;">
               <div style="font-size: 32px; margin-bottom: 10px;">📷</div>
               <div style="color: #4a5568; font-weight: 800; font-size: 14px; text-transform: uppercase;">Ảnh minh họa thực tế tại vườn</div>
               <div style="color: #a0aec0; font-size: 11px; margin-top: 5px;">(Anh hãy xóa khung này và chèn ảnh chụp thật rễ/lá bệnh vào đây)</div>
            </div>`
  };

  const getWordCountStatus = () => {
    if (wordCount === 0) return { color: 'text-gray-400', label: 'Chưa bắt đầu' };
    if (wordCount < 1000) return { color: 'text-red-500', label: 'Nội dung quá ngắn' };
    if (wordCount < 2000) return { color: 'text-yellow-500', label: 'Cần viết thêm' };
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
          color: #4a5568;
          line-height: 1.6;
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
