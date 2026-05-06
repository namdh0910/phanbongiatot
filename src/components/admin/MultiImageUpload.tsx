"use client";

import { useState } from "react";
import { Upload, X, Loader2, Plus } from "lucide-react";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

export default function MultiImageUpload({ value, onChange, label }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls = [...value];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.url) {
          newUrls.push(data.url);
        }
      }
      // Remove any empty strings and update
      onChange(newUrls.filter(url => url !== ""));
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newUrls = [...value];
    newUrls.splice(index, 1);
    onChange(newUrls);
  };

  return (
    <div className="space-y-4">
      {label && <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">{label}</label>}
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {value.filter(url => url !== "").map((url, index) => (
          <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-emerald-100 bg-emerald-50 group">
            <img src={url} alt={`Product ${index}`} className="w-full h-full object-cover" />
            <button 
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
        <div className="relative aspect-square">
          <input 
            type="file" 
            multiple
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`w-full h-full rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 bg-gray-50 transition-all ${uploading ? 'opacity-50' : 'hover:border-emerald-500 hover:bg-emerald-50'}`}>
            {uploading ? (
              <Loader2 className="animate-spin text-emerald-600" size={24} />
            ) : (
              <>
                <Plus className="text-gray-400" size={24} />
                <span className="text-[10px] font-black text-gray-400 uppercase">Thêm ảnh</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-gray-400 italic">Bà con có thể chọn nhiều ảnh cùng lúc để tải lên.</p>
    </div>
  );
}
