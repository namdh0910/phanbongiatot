'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, label, placeholder }: RichTextEditorProps) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
  ];

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[10px] font-black text-gray-400 uppercase ml-1 tracking-widest">
          {label}
        </label>
      )}
      <div className="bg-gray-50 border-2 border-gray-100 rounded-2xl overflow-hidden focus-within:border-[#1a5c2a] transition-all">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="bg-white min-h-[250px] font-medium text-gray-800"
        />
      </div>
      <p className="text-[9px] text-gray-400 italic px-2">
        * Mẹo: Nhấp vào biểu tượng hình ảnh để chèn minh họa vào nội dung.
      </p>
    </div>
  );
}
