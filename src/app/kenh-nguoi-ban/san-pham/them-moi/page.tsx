"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new').then((mod) => mod.default), { 
  ssr: false,
  loading: () => <div className="h-[250px] bg-gray-50 animate-pulse rounded-2xl"></div>
});

export default function VendorAddProduct() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    category: "Phân bón",
    brand: "",
    shortDescription: "",
    description: "",
    images: [] as string[],
    originalPrice: "",
    price: "",
    stock: "100",
    unit: "chai"
  });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("vendorToken");
    if (!token) {
      router.push("/kenh-nguoi-ban/dang-nhap");
      return;
    }
    
    // Load categories
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
        else setCategories(["Phân bón", "Kích rễ", "Tuyến trùng", "Thuốc BVTV"]);
      })
      .catch(() => setCategories(["Phân bón", "Kích rễ", "Tuyến trùng", "Thuốc BVTV"]));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    if (form.images.length + e.target.files.length > 5) {
      alert("Chỉ được tải lên tối đa 5 ảnh.");
      return;
    }

    setUploading(true);
    const fd = new FormData();
    Array.from(e.target.files).forEach(file => fd.append("images", file));

    try {
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("vendorToken")}`
        },
        body: fd
      });
      if (res.ok) {
        const { urls } = await res.json();
        setForm(f => ({ ...f, images: [...f.images, ...urls] }));
        setPreviewImages(p => [...p, ...urls]);
      }
    } catch (error) {
      alert("Lỗi tải ảnh lên.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("vendorToken");
      const res = await fetch(`${API_BASE_URL}/seller/products`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          ...form, 
          price: parseInt(form.price),
          originalPrice: form.originalPrice ? parseInt(form.originalPrice) : undefined,
          stock: parseInt(form.stock),
          status: "pending_review" 
        })
      });
      if (res.ok) {
        alert("🎉 Chúc mừng! Sản phẩm của anh/chị đã được gửi duyệt. Admin sẽ phản hồi trong 1-2 ngày làm việc.");
        router.push("/kenh-nguoi-ban/san-pham");
      } else {
        const data = await res.json();
        alert(data.message || "Lỗi gửi duyệt sản phẩm.");
      }
    } catch (error) {
      alert("Lỗi kết nối máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      {/* Header Form */}
      <div className="bg-white border-b border-gray-100 py-6 px-6 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-900 transition-colors">◀</button>
             <h1 className="text-lg font-black text-gray-900 uppercase tracking-tight">Đăng sản phẩm mới</h1>
          </div>
          <div className="flex items-center gap-2">
             {[1, 2, 3].map(i => (
               <div key={i} className={`w-3 h-3 rounded-full ${step >= i ? 'bg-[#1a5c2a]' : 'bg-gray-200'}`}></div>
             ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50 overflow-hidden">
          
          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <div className="p-8 md:p-12 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase italic tracking-tight">Bước 1: Thông tin cơ bản</h2>
                  <p className="text-gray-400 text-sm font-medium">Cung cấp tên và mô tả hấp dẫn để nhà vườn dễ dàng tìm thấy.</p>
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tên sản phẩm *</label>
                    <input 
                      required 
                      value={form.name} 
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full border-2 border-gray-50 bg-gray-50/50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-[#1a5c2a] focus:bg-white transition-all"
                      placeholder="Ví dụ: Phân bón lá Acti Rooti 5L"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Danh mục *</label>
                      <select 
                        value={form.category} 
                        onChange={e => setForm({...form, category: e.target.value})}
                        className="w-full border-2 border-gray-50 bg-gray-50/50 rounded-2xl px-6 py-4 text-sm font-bold text-gray-700 outline-none focus:border-[#1a5c2a] focus:bg-white transition-all"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Thương hiệu / Xuất xứ</label>
                      <input 
                        value={form.brand} 
                        onChange={e => setForm({...form, brand: e.target.value})}
                        className="w-full border-2 border-gray-50 bg-gray-50/50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-[#1a5c2a] focus:bg-white transition-all"
                        placeholder="Ví dụ: Happy Agri"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Mô tả ngắn (Hiển thị nhanh)</label>
                    <textarea 
                      value={form.shortDescription} 
                      onChange={e => setForm({...form, shortDescription: e.target.value})}
                      className="w-full border-2 border-gray-50 bg-gray-50/50 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-[#1a5c2a] focus:bg-white transition-all h-24 resize-none"
                      placeholder="Tóm tắt công dụng chính của sản phẩm..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Mô tả chi tiết *</label>
                    <div className="bg-gray-50/50 rounded-2xl border-2 border-gray-50 overflow-hidden min-h-[300px]">
                      <ReactQuill 
                        theme="snow" 
                        value={form.description} 
                        onChange={val => setForm({...form, description: val})}
                        className="h-[250px] mb-12"
                      />
                    </div>
                  </div>
               </div>

               <div className="pt-8 border-t border-gray-50 flex justify-end">
                  <button 
                    disabled={!form.name || !form.description}
                    onClick={() => setStep(2)}
                    className="bg-[#1a5c2a] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-100 hover:bg-[#2d7a3e] transition-all disabled:opacity-50"
                  >
                    TIẾP THEO ➜
                  </button>
               </div>
            </div>
          )}

          {/* STEP 2: IMAGES & PRICE */}
          {step === 2 && (
            <div className="p-8 md:p-12 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase italic tracking-tight">Bước 2: Hình ảnh & Giá</h2>
                  <p className="text-gray-400 text-sm font-medium">Hình ảnh rõ nét và giá hợp lý giúp anh/chị chốt đơn nhanh hơn.</p>
               </div>

               <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Hình ảnh sản phẩm * (Tối đa 5 ảnh)</label>
                    <div className="flex flex-wrap gap-4">
                       {previewImages.map((img, i) => (
                         <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
                            <img src={img} className="w-full h-full object-cover" />
                            <button onClick={() => {
                              const newImgs = form.images.filter((_, idx) => idx !== i);
                              const newPreviews = previewImages.filter((_, idx) => idx !== i);
                              setForm({...form, images: newImgs});
                              setPreviewImages(newPreviews);
                            }} className="absolute top-1 right-1 bg-black/50 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                         </div>
                       ))}
                       {previewImages.length < 5 && (
                         <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-[#1a5c2a] hover:bg-green-50 transition-all group"
                         >
                           <span className="text-2xl group-hover:scale-110 transition-transform">📸</span>
                           <span className="text-[8px] font-black mt-1 uppercase">{uploading ? "Đang tải..." : "Thêm ảnh"}</span>
                         </button>
                       )}
                    </div>
                    <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Giá niêm yết (₫)</label>
                      <input 
                        type="number"
                        value={form.originalPrice} 
                        onChange={e => setForm({...form, originalPrice: e.target.value})}
                        className="w-full border-2 border-gray-50 bg-gray-50/50 rounded-2xl px-6 py-4 text-sm font-black text-gray-400 outline-none focus:border-[#1a5c2a] focus:bg-white transition-all line-through"
                        placeholder="Giá trước giảm..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Giá bán thực tế * (₫)</label>
                      <input 
                        type="number"
                        required
                        value={form.price} 
                        onChange={e => setForm({...form, price: e.target.value})}
                        className="w-full border-2 border-gray-50 bg-gray-50/50 rounded-2xl px-6 py-4 text-sm font-black text-[#ee4d2d] outline-none focus:border-[#1a5c2a] focus:bg-white transition-all"
                        placeholder="Giá anh/chị muốn bán..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Số lượng tồn kho</label>
                      <input 
                        type="number"
                        value={form.stock} 
                        onChange={e => setForm({...form, stock: e.target.value})}
                        className="w-full border-2 border-gray-50 bg-gray-50/50 rounded-2xl px-6 py-4 text-sm font-bold text-gray-700 outline-none focus:border-[#1a5c2a] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Đơn vị tính</label>
                      <select 
                        value={form.unit} 
                        onChange={e => setForm({...form, unit: e.target.value})}
                        className="w-full border-2 border-gray-50 bg-gray-50/50 rounded-2xl px-6 py-4 text-sm font-bold text-gray-700 outline-none focus:border-[#1a5c2a] focus:bg-white transition-all"
                      >
                        <option>chai</option>
                        <option>gói</option>
                        <option>kg</option>
                        <option>lít</option>
                        <option>can</option>
                        <option>thùng</option>
                      </select>
                    </div>
                  </div>
               </div>

               <div className="pt-8 border-t border-gray-50 flex justify-between">
                  <button onClick={() => setStep(1)} className="px-8 py-4 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase">⬅ Quay lại</button>
                  <button 
                    disabled={!form.price || form.images.length === 0}
                    onClick={() => setStep(3)}
                    className="bg-[#1a5c2a] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-100 hover:bg-[#2d7a3e] transition-all disabled:opacity-50"
                  >
                    XEM TRƯỚC ➜
                  </button>
               </div>
            </div>
          )}

          {/* STEP 3: PREVIEW & SUBMIT */}
          {step === 3 && (
            <div className="p-8 md:p-12 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase italic tracking-tight">Bước 3: Xem trước & Gửi duyệt</h2>
                  <p className="text-gray-400 text-sm font-medium">Kiểm tra lại lần cuối trước khi gửi cho đội ngũ Phân Bón Giá Tốt.</p>
               </div>

               <div className="space-y-8">
                  {/* Preview Card Simulation */}
                  <div className="bg-[#f0f2f5] p-6 rounded-[2rem] flex flex-col md:flex-row gap-6">
                     <div className="w-full md:w-48 aspect-square bg-white rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                        {previewImages[0] ? <img src={previewImages[0]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl">📦</div>}
                     </div>
                     <div className="flex-1 space-y-3">
                        <span className="text-[9px] font-black bg-white px-3 py-1 rounded-full text-emerald-600 uppercase border border-emerald-100">{form.category}</span>
                        <h3 className="text-xl font-black text-gray-900 leading-tight">{form.name}</h3>
                        <div className="flex items-baseline gap-2">
                           <span className="text-2xl font-black text-[#ee4d2d]">₫{parseInt(form.price).toLocaleString()}</span>
                           {form.originalPrice && <span className="text-sm text-gray-400 line-through">₫{parseInt(form.originalPrice).toLocaleString()}</span>}
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-3 font-medium italic">"{form.shortDescription || "Chưa có mô tả ngắn"}"</p>
                     </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-2xl">
                     <div className="flex gap-4 items-start">
                        <input required type="checkbox" className="mt-1 w-5 h-5 rounded accent-[#1a5c2a]" id="confirm" />
                        <label htmlFor="confirm" className="text-sm text-yellow-800 font-bold leading-relaxed cursor-pointer">
                           Tôi xác nhận sản phẩm này là chính hãng, đúng chất lượng mô tả và chịu trách nhiệm trước pháp luật về nguồn gốc hàng hóa.
                        </label>
                     </div>
                  </div>
               </div>

               <div className="pt-8 border-t border-gray-50 flex justify-between">
                  <button onClick={() => setStep(2)} className="px-8 py-4 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase">⬅ Quay lại</button>
                  <button 
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="bg-[#1a5c2a] text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-green-200 hover:bg-[#2d7a3e] transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? "ĐANG GỬI..." : "GỬI DUYỆT NGAY 🚀"}
                  </button>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
