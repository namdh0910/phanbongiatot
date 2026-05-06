"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, label, placeholder }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ảnh quá lớn (tối đa 5MB)");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Lỗi khi tải ảnh lên");
      }
    } catch (err) {
      setError("Lỗi kết nối khi tải ảnh");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">{label}</label>}
      
      <div className="flex flex-col gap-4">
        {value ? (
          <div className="relative w-full aspect-video md:aspect-square md:w-32 rounded-2xl overflow-hidden border-2 border-emerald-100 bg-emerald-50 group">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button 
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`w-32 h-32 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 bg-gray-50 transition-all ${uploading ? 'opacity-50' : 'hover:border-emerald-500 hover:bg-emerald-50'}`}>
                {uploading ? (
                  <Loader2 className="animate-spin text-emerald-600" size={24} />
                ) : (
                  <>
                    <Upload className="text-gray-400" size={24} />
                    <span className="text-[10px] font-black text-gray-400 uppercase">Tải ảnh</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800 text-sm"
                  placeholder={placeholder || "Hoặc dán URL vào đây..."}
                />
              </div>
            </div>
          </div>
        )}
        
        {error && <p className="text-[10px] font-bold text-red-500 ml-1">{error}</p>}
      </div>
    </div>
  );
}
