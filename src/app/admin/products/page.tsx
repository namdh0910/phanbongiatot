"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Package, Search, Eye, Link as LinkIcon } from "lucide-react";
import { slugify } from "@/utils/slugify";
import { API_BASE_URL } from "@/utils/api";
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface Product {
  _id?: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
  category: string;
  useCase: string;
  tags: string[];
  stock: number;
  soldCount: number;
  isHot: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isAvailable: boolean;
  createdAt?: string;
  // Mini Landing Page Fields
  symptoms?: string[];
  features?: string[];
  usage_instructions?: string;
  faqs?: { question: string; answer: string }[];
  expert_advice?: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: "",
    slug: "",
    price: 0,
    originalPrice: 0,
    description: "",
    images: [""],
    category: "Phân bón sinh học",
    useCase: "Phục hồi rễ",
    tags: [],
    stock: 99,
    soldCount: 0,
    isHot: false,
    isBestSeller: false,
    isNewArrival: false,
    isAvailable: true,
    symptoms: [],
    features: [],
    usage_instructions: "",
    faqs: [],
    expert_advice: "",
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const productsList = data.data || data.products || (Array.isArray(data) ? data : []);
      setProducts(productsList);
    } catch (err) {
      console.error("Fetch error", err);
      setMessage("❌ Không thể kết nối đến máy chủ dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct({
      ...product,
      symptoms: product.symptoms || [],
      features: product.features || [],
      usage_instructions: product.usage_instructions || "",
      faqs: product.faqs || [],
      expert_advice: product.expert_advice || "",
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      name: "",
      slug: "",
      price: 0,
      originalPrice: 0,
      description: "",
      images: [""],
      category: "Phân bón sinh học",
      useCase: "Phục hồi rễ",
      tags: [],
      stock: 99,
      soldCount: 0,
      isHot: false,
      isBestSeller: false,
      isNewArrival: false,
      isAvailable: true,
      symptoms: [],
      features: [],
      usage_instructions: "",
      faqs: [],
      expert_advice: "",
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bà con chắc chắn muốn xóa sản phẩm này chứ?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (err) {
      alert("Lỗi khi xóa sản phẩm");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const method = currentProduct._id ? 'PUT' : 'POST';
    const url = currentProduct._id ? `/api/products/${currentProduct._id}` : '/api/products';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct),
      });

      if (res.ok) {
        setMessage("✅ Đã lưu sản phẩm thành công!");
        fetchProducts();
        setTimeout(() => setIsEditing(false), 1500);
      } else {
        const error = await res.json();
        setMessage(`❌ Lỗi: ${error.error}`);
      }
    } catch (err) {
      setMessage("❌ Lỗi kết nối hệ thống.");
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !currentProduct.tags.includes(tagInput.trim())) {
      setCurrentProduct({
        ...currentProduct,
        tags: [...currentProduct.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setCurrentProduct({
      ...currentProduct,
      tags: currentProduct.tags.filter(t => t !== tag)
    });
  };

  if (loading) return <div className="animate-pulse py-10 font-black text-gray-400">Đang tải dữ liệu sản phẩm...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">Quản lý Sản Phẩm</h1>
          <p className="text-gray-500 text-sm font-medium">Danh mục vật tư nông nghiệp phục vụ giải pháp điều trị.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={handleAddNew}
            className="bg-[#1a5c2a] text-white px-6 py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-100 flex items-center gap-2 hover:bg-[#2d7a3e] transition-all active:scale-95"
          >
            <Plus size={18} /> THÊM SẢN PHẨM
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gray-900 p-6 text-white flex items-center justify-between">
             <div className="flex items-center gap-3">
                <span className="bg-emerald-600 p-2 rounded-lg"><Package size={16} /></span>
                <span className="font-black uppercase text-sm tracking-widest">{currentProduct._id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</span>
             </div>
             <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white transition-colors"><X /></button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {message && (
              <div className={`p-4 rounded-xl text-xs font-bold border ${message.includes('✅') ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                {message}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Tên sản phẩm</label>
                    <input 
                      required
                      type="text" 
                      value={currentProduct.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        const newSlug = !currentProduct._id ? slugify(newName) : currentProduct.slug;
                        setCurrentProduct({...currentProduct, name: newName, slug: newSlug});
                      }}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                      placeholder="VD: Phân bón Humic K-Max..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Đường dẫn SEO (Slug)</label>
                    <div className="relative">
                       <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                       <input 
                         required
                         type="text" 
                         value={currentProduct.slug}
                         onChange={(e) => setCurrentProduct({...currentProduct, slug: slugify(e.target.value)})}
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-700 text-sm"
                         placeholder="ten-san-pham-slug"
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                       <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Giá bán hiện tại (VNĐ)</label>
                         <input 
                           required
                           type="number" 
                           value={currentProduct.price}
                           onChange={(e) => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                           className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                         />
                       </div>
                       <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Giá gốc (Để hiển thị % giảm giá)</label>
                         <input 
                           type="number" 
                           value={currentProduct.originalPrice}
                           onChange={(e) => setCurrentProduct({...currentProduct, originalPrice: Number(e.target.value)})}
                           className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-500"
                         />
                       </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Danh mục</label>
                      <select 
                        value={currentProduct.category}
                        onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                      >
                        <option value="Phân bón sinh học">Phân bón sinh học</option>
                        <option value="Thuốc BVTV sinh học">Thuốc BVTV sinh học</option>
                        <option value="Cải tạo đất">Cải tạo đất</option>
                        <option value="Kích rễ">Kích rễ</option>
                      </select>
                    </div>
                  </div>

                  <MultiImageUpload 
                    label="Hình ảnh sản phẩm"
                    value={currentProduct.images}
                    onChange={(urls) => setCurrentProduct({...currentProduct, images: urls})}
                  />
               </div>

               <div className="space-y-6">
                  <RichTextEditor 
                    label="Mô tả công dụng"
                    value={currentProduct.description}
                    onChange={(content) => setCurrentProduct({...currentProduct, description: content})}
                    placeholder="Nhập công dụng chính và chèn hình ảnh minh họa..."
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Tồn kho</label>
                       <input 
                         type="number" 
                         value={currentProduct.stock}
                         onChange={(e) => setCurrentProduct({...currentProduct, stock: Number(e.target.value)})}
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                       />
                     </div>
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Đã bán (Giả lập)</label>
                       <input 
                         type="number" 
                         value={currentProduct.soldCount}
                         onChange={(e) => setCurrentProduct({...currentProduct, soldCount: Number(e.target.value)})}
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                       />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-[2rem]">
                     <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          id="isHot"
                          checked={currentProduct.isHot}
                          onChange={(e) => setCurrentProduct({...currentProduct, isHot: e.target.checked})}
                          className="w-5 h-5 accent-red-600"
                        />
                        <label htmlFor="isHot" className="text-[10px] font-black text-red-900 uppercase">Sản phẩm HOT</label>
                     </div>
                     <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          id="isBestSeller"
                          checked={currentProduct.isBestSeller}
                          onChange={(e) => setCurrentProduct({...currentProduct, isBestSeller: e.target.checked})}
                          className="w-5 h-5 accent-orange-600"
                        />
                        <label htmlFor="isBestSeller" className="text-[10px] font-black text-orange-900 uppercase">Bán chạy</label>
                     </div>
                     <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          id="isNewArrival"
                          checked={currentProduct.isNewArrival}
                          onChange={(e) => setCurrentProduct({...currentProduct, isNewArrival: e.target.checked})}
                          className="w-5 h-5 accent-blue-600"
                        />
                        <label htmlFor="isNewArrival" className="text-[10px] font-black text-blue-900 uppercase">Hàng mới</label>
                     </div>
                     <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          id="isAvailable"
                          checked={currentProduct.isAvailable}
                          onChange={(e) => setCurrentProduct({...currentProduct, isAvailable: e.target.checked})}
                          className="w-5 h-5 accent-emerald-600"
                        />
                        <label htmlFor="isAvailable" className="text-[10px] font-black text-emerald-900 uppercase">Còn hàng</label>
                     </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Thẻ (Tags)</label>
                    <div className="flex gap-2 mb-2">
                       <input 
                         type="text" 
                         value={tagInput}
                         onChange={(e) => setTagInput(e.target.value)}
                         onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                         className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 outline-none focus:border-[#1a5c2a] text-sm font-bold"
                         placeholder="Thêm thẻ (Nhấn Enter)..."
                       />
                       <button type="button" onClick={addTag} className="bg-gray-900 text-white px-4 rounded-xl text-xs font-black">THÊM</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {currentProduct.tags.map(tag => (
                         <span key={tag} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-[10px] font-black flex items-center gap-2">
                           #{tag} <button type="button" onClick={() => removeTag(tag)} className="text-emerald-300 hover:text-red-500">✕</button>
                         </span>
                       ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* Section: Mini Landing Page Config */}
            <div className="pt-8 border-t border-gray-100 space-y-6">
               <h3 className="text-xl font-black text-[#1a5c2a] uppercase italic tracking-tight flex items-center gap-2">
                 <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                 CẤU HÌNH TRANG CHI TIẾT (MINI LANDING PAGE)
               </h3>
               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider -mt-4">Thiết lập các thông tin chuyên sâu dành riêng cho sản phẩm này.</p>
               
               <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column in Landing Config */}
                  <div className="space-y-6">
                     {/* Lời khuyên chuyên gia */}
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Lời khuyên từ kỹ sư PBGT</label>
                       <textarea 
                         value={currentProduct.expert_advice || ""}
                         onChange={(e) => setCurrentProduct({...currentProduct, expert_advice: e.target.value})}
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800 h-28 resize-none"
                         placeholder="VD: Đối với vườn đang bị suy nặng, bà con nên ưu tiên phục hồi bộ rễ trước..."
                       />
                     </div>

                     {/* Quy trình sử dụng chuẩn */}
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Quy trình sử dụng chuẩn (Xuống dòng cho mỗi bước)</label>
                       <textarea 
                         value={currentProduct.usage_instructions || ""}
                         onChange={(e) => setCurrentProduct({...currentProduct, usage_instructions: e.target.value})}
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800 h-36"
                         placeholder={"1. Pha 1kg cho 400-600 lít nước.\n2. Tưới đẫm quanh tán cây...\n3. Định kỳ 15-20 ngày dùng 1 lần..."}
                       />
                     </div>

                     {/* Triệu chứng (Symptoms) */}
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Dấu hiệu/Triệu chứng cây trồng cần dùng</label>
                       <div className="flex gap-2 mb-2">
                          <input 
                            type="text" 
                            id="symptomInput"
                            placeholder="Nhập triệu chứng (Ví dụ: Lá vàng, rụng lá hàng loạt) rồi nhấn Enter hoặc thêm..."
                            className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 outline-none focus:border-[#1a5c2a] text-sm font-bold"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const val = e.currentTarget.value.trim();
                                if (val && !currentProduct.symptoms?.includes(val)) {
                                  setCurrentProduct({
                                    ...currentProduct,
                                    symptoms: [...(currentProduct.symptoms || []), val]
                                  });
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                          />
                          <button 
                            type="button" 
                            onClick={() => {
                              const el = document.getElementById('symptomInput') as HTMLInputElement;
                              const val = el?.value.trim();
                              if (val && !currentProduct.symptoms?.includes(val)) {
                                setCurrentProduct({
                                  ...currentProduct,
                                  symptoms: [...(currentProduct.symptoms || []), val]
                                });
                                el.value = "";
                              }
                            }}
                            className="bg-gray-950 text-white px-4 rounded-xl text-xs font-black"
                          >
                            THÊM
                          </button>
                       </div>
                       <div className="flex flex-wrap gap-2">
                          {(currentProduct.symptoms || []).map((symptom, idx) => (
                            <span key={idx} className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-[10px] font-black flex items-center gap-2">
                              {symptom} 
                              <button 
                                type="button" 
                                onClick={() => setCurrentProduct({
                                  ...currentProduct,
                                  symptoms: (currentProduct.symptoms || []).filter(s => s !== symptom)
                                })} 
                                className="text-red-300 hover:text-red-500"
                              >✕</button>
                            </span>
                          ))}
                       </div>
                     </div>
                  </div>

                  {/* Right Column in Landing Config */}
                  <div className="space-y-6">
                     {/* Tính năng nổi bật (Features) */}
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Tính năng/Công dụng nổi bật (Features)</label>
                       <div className="flex gap-2 mb-2">
                          <input 
                            type="text" 
                            id="featureInput"
                            placeholder="Nhập tính năng (Ví dụ: Cải tạo đất tơi xốp, xanh lá dày lá) rồi nhấn Enter hoặc thêm..."
                            className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 outline-none focus:border-[#1a5c2a] text-sm font-bold"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const val = e.currentTarget.value.trim();
                                if (val && !currentProduct.features?.includes(val)) {
                                  setCurrentProduct({
                                    ...currentProduct,
                                    features: [...(currentProduct.features || []), val]
                                  });
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                          />
                          <button 
                            type="button" 
                            onClick={() => {
                              const el = document.getElementById('featureInput') as HTMLInputElement;
                              const val = el?.value.trim();
                              if (val && !currentProduct.features?.includes(val)) {
                                setCurrentProduct({
                                  ...currentProduct,
                                  features: [...(currentProduct.features || []), val]
                                });
                                el.value = "";
                              }
                            }}
                            className="bg-gray-950 text-white px-4 rounded-xl text-xs font-black"
                          >
                            THÊM
                          </button>
                       </div>
                       <div className="flex flex-wrap gap-2">
                          {(currentProduct.features || []).map((feature, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-black flex items-center gap-2">
                              {feature} 
                              <button 
                                type="button" 
                                onClick={() => setCurrentProduct({
                                  ...currentProduct,
                                  features: (currentProduct.features || []).filter(f => f !== feature)
                                })} 
                                className="text-blue-300 hover:text-blue-500"
                              >✕</button>
                            </span>
                          ))}
                       </div>
                     </div>

                     {/* Hỏi đáp kỹ thuật (FAQs) */}
                     <div className="space-y-4">
                       <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2">Hỏi đáp kỹ thuật chuyên sâu (FAQs)</label>
                       
                       <div className="bg-gray-50 p-4 rounded-2xl space-y-3 border border-gray-100">
                          <input 
                            type="text" 
                            id="faqQuestion"
                            placeholder="Câu hỏi (VD: Sản phẩm có mát rễ không?)"
                            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-2 outline-none focus:border-[#1a5c2a] text-xs font-bold"
                          />
                          <textarea 
                            id="faqAnswer"
                            placeholder="Câu trả lời..."
                            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-2 outline-none focus:border-[#1a5c2a] text-xs font-bold h-20 resize-none"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              const qEl = document.getElementById('faqQuestion') as HTMLInputElement;
                              const aEl = document.getElementById('faqAnswer') as HTMLTextAreaElement;
                              const q = qEl?.value.trim();
                              const a = aEl?.value.trim();
                              if (q && a) {
                                setCurrentProduct({
                                  ...currentProduct,
                                  faqs: [...(currentProduct.faqs || []), { question: q, answer: a }]
                                });
                                qEl.value = "";
                                aEl.value = "";
                              }
                            }}
                            className="w-full bg-emerald-700 text-white py-2 rounded-xl text-xs font-black uppercase hover:bg-emerald-800 transition-colors"
                          >
                            + Thêm Câu Hỏi & Trả Lời
                          </button>
                       </div>

                       <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                          {(currentProduct.faqs || []).map((faq, idx) => (
                            <div key={idx} className="bg-white border border-gray-100 p-3 rounded-xl relative shadow-sm">
                               <button 
                                 type="button" 
                                 onClick={() => setCurrentProduct({
                                   ...currentProduct,
                                   faqs: (currentProduct.faqs || []).filter((_, i) => i !== idx)
                                 })}
                                 className="absolute top-2 right-2 text-gray-300 hover:text-red-500 font-bold text-xs"
                               >
                                 ✕
                               </button>
                               <div className="text-[10px] font-black text-[#1a5c2a] uppercase tracking-widest mb-1">Hỏi: {faq.question}</div>
                               <p className="text-[11px] text-gray-600 font-medium leading-relaxed">Đ: {faq.answer}</p>
                            </div>
                          ))}
                       </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex gap-4 pt-8 border-t border-gray-100">
               <button 
                 type="submit"
                 disabled={saving}
                 className="flex-1 bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 flex items-center justify-center gap-3 hover:bg-[#2d7a3e] transition-all active:scale-95"
               >
                 <Save size={20} /> {saving ? "ĐANG LƯU..." : "LƯU SẢN PHẨM"}
               </button>
               <button 
                 type="button"
                 onClick={() => setIsEditing(false)}
                 className="px-10 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black text-lg hover:bg-gray-200 transition-all"
               >
                 HỦY BỎ
               </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Sản phẩm</th>
                  <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Giá bán</th>
                  <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Công dụng</th>
                  <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                           <img src={p.images[0]} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 line-clamp-1">{p.name}</h4>
                          <span className="text-[10px] text-[#1a5c2a] font-bold uppercase tracking-widest">{p.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                       <span className="text-sm font-black text-gray-900">{p.price.toLocaleString()}đ</span>
                    </td>
                    <td className="px-6 py-6">
                       <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{p.useCase}</span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center justify-center gap-2">
                         <button onClick={() => handleEdit(p)} className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                            <Edit size={18} />
                         </button>
                         <button onClick={() => handleDelete(p._id!)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 size={18} />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="py-20 text-center">
               <div className="text-6xl mb-4 opacity-10">📦</div>
               <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Chưa có sản phẩm nào.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
