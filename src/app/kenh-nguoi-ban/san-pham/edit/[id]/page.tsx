"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import { useParams, useRouter } from "next/navigation";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "Phân bón",
    description: "",
    images: [] as string[],
    specifications: "",
    usage: ""
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`);
      const data = await res.json();
      if (res.ok) {
        setFormData({
          name: data.name || "",
          price: data.price || 0,
          category: data.category || "Phân bón",
          description: data.description || "",
          images: data.images || [],
          specifications: data.specifications || "",
          usage: data.usage || ""
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const token = localStorage.getItem("vendorToken");
    const uploadData = new FormData();
    Array.from(e.target.files).forEach(file => {
      uploadData.append("images", file);
    });

    try {
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: uploadData
      });
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, images: [...prev.images, ...data.urls] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Cập nhật sản phẩm thành công! Sản phẩm sẽ được chờ duyệt lại.");
        router.push("/kenh-nguoi-ban/san-pham");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || fetching) return null;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10 flex items-center gap-4">
        <button onClick={() => router.back()} className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-100 text-xl">←</button>
        <div>
          <h1 className="text-4xl font-black text-gray-800 tracking-tight">Chỉnh Sửa Sản Phẩm ✏️</h1>
          <p className="text-gray-500">Cập nhật thông tin chi tiết cho mặt hàng của bạn.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Images */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Hình ảnh sản phẩm</label>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                 {formData.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm">
                       <img src={img} className="w-full h-full object-cover" alt="" />
                       <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                    </div>
                 ))}
                 
                 <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all text-gray-400 group">
                    <span className="text-2xl group-hover:scale-125 transition-transform">➕</span>
                    <span className="text-[10px] font-bold mt-1">THÊM ẢNH</span>
                    <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                 </label>
              </div>
              {uploading && <p className="text-center text-xs text-blue-600 font-bold animate-pulse">Đang tải ảnh lên...</p>}
              <p className="text-[10px] text-gray-400 italic text-center">Nên có ít nhất 3 ảnh từ nhiều góc độ khác nhau.</p>
           </div>
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 space-y-8">
              <div>
                 <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Tên Sản Phẩm</label>
                 <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-4 focus:ring-blue-100 outline-none font-bold transition-all text-xl" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Giá Bán (VNĐ)</label>
                    <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-red-600 focus:ring-4 focus:ring-red-100 outline-none font-black transition-all text-xl" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Danh Mục</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-4 focus:ring-blue-100 outline-none font-bold transition-all appearance-none">
                       <option>Phân bón</option>
                       <option>Thuốc bảo vệ thực vật</option>
                       <option>Hạt giống</option>
                       <option>Dụng cụ nông nghiệp</option>
                       <option>Khác</option>
                    </select>
                 </div>
              </div>

              <div>
                 <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Mô tả sản phẩm</label>
                 <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border-none rounded-3xl px-6 py-4 text-gray-900 focus:ring-4 focus:ring-blue-100 outline-none h-40 resize-none font-medium leading-relaxed" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Thông số kỹ thuật</label>
                    <textarea value={formData.specifications} onChange={e => setFormData({...formData, specifications: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-4 focus:ring-blue-100 outline-none h-32 resize-none text-sm" placeholder="Ví dụ: Hàm lượng đạm 46%, độ ẩm 1%..." />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hướng dẫn sử dụng</label>
                    <textarea value={formData.usage} onChange={e => setFormData({...formData, usage: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-4 focus:ring-blue-100 outline-none h-32 resize-none text-sm" placeholder="Ví dụ: Pha 50g cho 20 lít nước..." />
                 </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-5 rounded-3xl font-black text-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 mt-4">
                 {loading ? "ĐANG LƯU..." : "CẬP NHẬT SẢN PHẨM"}
              </button>
           </div>
        </div>
      </form>
    </div>
  );
}
