"use client";
import { useState, useEffect } from "react";
import { Trash2, Plus, Edit3, Save, X, ChevronRight, LayoutList, CheckCircle2, AlertTriangle, Star, ShoppingBag, Clock } from "lucide-react";

export default function AdminSolutions() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    icon: "🩺",
    painPoint: "",
    cause: "",
    biologicalSolution: "",
    videoId: "",
    category: "",
    image: "",
    symptoms: [""],
    wrongActions: [""],
    stats: { successVouchers: "", recoveryTime: "" },
    steps: [{ name: "", time: "", description: "", product: "" }],
    testimonials: [{ name: "", location: "", quote: "" }]
  });

  useEffect(() => {
    fetchSolutions();
    fetchProducts();
  }, []);

  const fetchSolutions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pathologies");
      const data = await res.json();
      setSolutions(data.pathologies || []);
    } catch (error) {
      console.error("Failed to fetch solutions", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      slug: item.slug || "",
      icon: item.icon || "🩺",
      painPoint: item.painPoint || "",
      cause: item.cause || "",
      biologicalSolution: item.biologicalSolution || "",
      videoId: item.videoId || "",
      category: item.category || "",
      image: item.image || "",
      symptoms: item.symptoms?.length ? item.symptoms : [""],
      wrongActions: item.wrongActions?.length ? item.wrongActions : [""],
      stats: item.stats || { successVouchers: "", recoveryTime: "" },
      steps: item.steps?.length ? item.steps.map((s: any) => ({
        ...s,
        product: (typeof s.product === 'object' && s.product !== null) ? s.product._id : (s.product || "")
      })) : [{ name: "", time: "", description: "", product: "" }],
      testimonials: item.testimonials?.length ? item.testimonials : [{ name: "", location: "", quote: "" }]
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/pathologies/${editingId}` : "/api/pathologies";
    const method = editingId ? "PUT" : "POST";
    
    // Clean up empty fields
    const cleanedData = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").replace(/\s+/g, "-"),
      symptoms: formData.symptoms.filter(s => s.trim() !== ""),
      wrongActions: formData.wrongActions.filter(w => w.trim() !== ""),
      steps: formData.steps.filter(s => s.name.trim() !== ""),
      testimonials: formData.testimonials.filter(t => t.name.trim() !== "")
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });
      if (res.ok) {
        fetchSolutions();
        closeForm();
      }
    } catch (error) {
      console.error("Failed to save solution", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xác nhận xóa quy trình này?")) return;
    try {
      const res = await fetch(`/api/pathologies/${id}`, { method: "DELETE" });
      if (res.ok) fetchSolutions();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: "", slug: "", icon: "🩺", painPoint: "", cause: "", biologicalSolution: "", videoId: "",
      category: "",
      image: "",
      symptoms: [""], wrongActions: [""],
      stats: { successVouchers: "", recoveryTime: "" },
      steps: [{ name: "", time: "", description: "", product: "" }],
      testimonials: [{ name: "", location: "", quote: "" }]
    });
  };

  // Helper to update arrays
  const updateArrayField = (field: string, index: number, value: any, subfield?: string) => {
    const newArray = [...(formData as any)[field]];
    if (subfield) {
      newArray[index] = { ...newArray[index], [subfield]: value };
    } else {
      newArray[index] = value;
    }
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: string, defaultValue: any) => {
    setFormData({ ...formData, [field]: [...(formData as any)[field], defaultValue] });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = [...(formData as any)[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase italic flex items-center gap-3">
             <LayoutList className="text-emerald-600 w-8 h-8" /> QUẢN LÝ QUY TRÌNH XỬ LÝ
          </h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">Hệ thống giải pháp kỹ thuật thực tế cho nhà vườn</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full md:w-auto bg-[#1a5c2a] text-white px-8 py-4 rounded-[1.5rem] font-black text-sm flex items-center justify-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
          >
            <Plus size={20} /> Tạo quy trình mới
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl mb-12 animate-in fade-in slide-in-from-top-10 duration-500 overflow-hidden">
          <div className="bg-gray-900 p-6 md:p-8 flex justify-between items-center text-white">
            <div>
              <h2 className="text-xl md:text-2xl font-black uppercase italic flex items-center gap-2">
                 {editingId ? "✍️ Cập nhật quy trình" : "✨ Tạo quy trình mới"}
              </h2>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Vui lòng điền đầy đủ các bước xử lý để bà con dễ theo dõi</p>
            </div>
            <button onClick={closeForm} className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-2xl flex items-center justify-center transition-all">
               <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-12">
            {/* 1. THÔNG TIN CƠ BẢN */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                 <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-black">1</div>
                 <h3 className="text-lg font-black text-gray-800 uppercase italic">Thông tin nhận diện</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Icon (Emoji)</label>
                  <input 
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-5 rounded-2xl text-3xl text-center transition-all outline-none"
                  />
                </div>
                <div className="md:col-span-3 space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Tên quy trình (VD: Xử lý vàng lá thối rễ)</label>
                  <input 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Nhập tiêu đề quy trình..." 
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-5 rounded-2xl text-base font-black uppercase italic transition-all outline-none"
                  />
                </div>
                <div className="md:col-span-4 space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Ảnh đại diện (Nên chọn ảnh vuông hoặc 16:9)</label>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    {formData.image && (
                      <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-lg shrink-0">
                         <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                         <button 
                           type="button" 
                           onClick={() => setFormData({...formData, image: ""})}
                           className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
                         >
                           <X size={12} />
                         </button>
                      </div>
                    )}
                    <div className="flex-1 w-full space-y-3">
                      <div className="relative group">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            
                            // Client-side Resize & Compress to Base64
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = (event) => {
                              const img = new Image();
                              img.src = event.target?.result as string;
                              img.onload = () => {
                                const canvas = document.createElement('canvas');
                                const MAX_WIDTH = 800; // Giảm xuống 800 để nhẹ hơn
                                let width = img.width;
                                let height = img.height;

                                if (width > MAX_WIDTH) {
                                  height *= MAX_WIDTH / width;
                                  width = MAX_WIDTH;
                                }

                                canvas.width = width;
                                canvas.height = height;
                                const ctx = canvas.getContext('2d');
                                ctx?.drawImage(img, 0, 0, width, height);
                                
                                // Compress as JPEG with 0.6 quality
                                const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
                                setFormData({...formData, image: dataUrl});
                              };
                            };
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 group-hover:border-emerald-500 group-hover:bg-emerald-50/30 p-8 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all">
                           <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                             <Plus size={24} />
                           </div>
                           <div className="text-center">
                             <p className="text-xs font-black text-gray-700 uppercase tracking-widest">Bấm để tải ảnh lên</p>
                             <p className="text-[10px] text-gray-400 font-medium mt-1">Hoặc kéo thả file vào đây</p>
                           </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Hoặc dán link:</span>
                        <input 
                          value={formData.image}
                          onChange={(e) => setFormData({...formData, image: e.target.value})}
                          placeholder="Dán link ảnh tại đây..." 
                          className="flex-1 bg-gray-50 border-none p-2 rounded-lg text-[10px] font-bold outline-none focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Chuyên mục phân loại</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 rounded-2xl text-sm font-black transition-all outline-none"
                    >
                      <option value="">-- Chưa phân loại --</option>
                      <option value="benh-ly">🦠 Xử lý bệnh lý</option>
                      <option value="kich-re">🌱 Kích thích ra rễ</option>
                      <option value="nuoi-trai">🍋 Nuôi trái - Tạo ngọt</option>
                      <option value="phuc-hoi">♻️ Phục hồi cây suy</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">YouTube Video ID</label>
                    <input 
                      value={formData.videoId}
                      onChange={(e) => setFormData({...formData, videoId: e.target.value})}
                      placeholder="VD: dQw4w9WgXcQ" 
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-4 rounded-2xl text-sm font-bold transition-all outline-none"
                    />
                 </div>
              </div>
            </div>

            {/* 2. DẤU HIỆU & NGUYÊN NHÂN */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                 <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-black">2</div>
                 <h3 className="text-lg font-black text-gray-800 uppercase italic">Chẩn đoán tình trạng</h3>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Tình trạng vườn (Nỗi đau của bà con)</label>
                <textarea 
                  value={formData.painPoint}
                  onChange={(e) => setFormData({...formData, painPoint: e.target.value})}
                  placeholder="Nhập các biểu hiện vườn đang gặp phải..." 
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-5 rounded-2xl text-sm font-bold italic transition-all outline-none min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest flex justify-between">
                    Danh sách dấu hiệu nhận biết 
                    <button type="button" onClick={() => addArrayItem('symptoms', '')} className="text-emerald-600 hover:underline">+ Thêm dòng</button>
                  </label>
                  <div className="space-y-3">
                    {formData.symptoms.map((sym, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input 
                          value={sym}
                          onChange={(e) => updateArrayField('symptoms', idx, e.target.value)}
                          placeholder={`Dấu hiệu ${idx + 1}`}
                          className="flex-1 bg-gray-50 p-4 rounded-xl text-sm font-medium outline-none border border-transparent focus:border-emerald-200"
                        />
                        <button type="button" onClick={() => removeArrayItem('symptoms', idx)} className="p-4 text-red-400 hover:text-red-600 transition-colors"><Trash2 size={18}/></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Phân tích nguyên nhân kỹ thuật</label>
                  <textarea 
                    value={formData.cause}
                    onChange={(e) => setFormData({...formData, cause: e.target.value})}
                    placeholder="Tại sao lại bị tình trạng này? (Nấm, khuẩn, hay do thời tiết...)" 
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-5 rounded-2xl text-sm font-medium transition-all outline-none min-h-[150px]"
                  />
                </div>
              </div>
            </div>

            {/* 3. QUY TRÌNH XỬ LÝ CHI TIẾT */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-black">3</div>
                    <h3 className="text-lg font-black text-gray-800 uppercase italic">Quy trình xử lý thực tế</h3>
                 </div>
                 <button type="button" onClick={() => addArrayItem('steps', { name: "", time: "", description: "", product: "" })} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                   <Plus size={14}/> Thêm bước xử lý
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {formData.steps.map((step, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 space-y-4 relative group">
                    <button type="button" onClick={() => removeArrayItem('steps', idx)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                      <X size={18} />
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-black italic">B{idx + 1}</div>
                      <input 
                        value={step.name}
                        onChange={(e) => updateArrayField('steps', idx, e.target.value, 'name')}
                        placeholder="Tên bước (VD: Sát khuẩn rễ)"
                        className="bg-transparent border-b-2 border-gray-200 focus:border-gray-900 outline-none flex-1 font-black text-sm uppercase italic"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400">Thời gian (VD: Ngày 1)</label>
                        <input 
                          value={step.time}
                          onChange={(e) => updateArrayField('steps', idx, e.target.value, 'time')}
                          className="w-full bg-white p-3 rounded-xl text-xs font-bold border border-gray-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400">Sản phẩm khuyên dùng</label>
                        <select 
                          value={step.product}
                          onChange={(e) => updateArrayField('steps', idx, e.target.value, 'product')}
                          className="w-full bg-white p-3 rounded-xl text-xs font-bold border border-gray-100"
                        >
                          <option value="">-- Chọn sản phẩm --</option>
                          {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <textarea 
                      value={step.description}
                      onChange={(e) => updateArrayField('steps', idx, e.target.value, 'description')}
                      placeholder="Hướng dẫn chi tiết cách pha, cách phun..."
                      className="w-full bg-white p-4 rounded-2xl text-xs font-medium border border-gray-100 min-h-[80px]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 4. SAI LẦM & KẾT QUẢ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Sai lầm */}
               <div className="space-y-8">
                 <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-black">4</div>
                    <h3 className="text-lg font-black text-gray-800 uppercase italic">Sai lầm thường gặp</h3>
                 </div>
                 <div className="space-y-3">
                   {formData.wrongActions.map((wa, idx) => (
                     <div key={idx} className="flex gap-2">
                       <input 
                         value={wa}
                         onChange={(e) => updateArrayField('wrongActions', idx, e.target.value)}
                         placeholder="VD: Dùng thuốc hóa học liều cao..."
                         className="flex-1 bg-red-50/30 p-4 rounded-xl text-sm font-bold text-red-900 border border-red-100 outline-none"
                       />
                       <button type="button" onClick={() => removeArrayItem('wrongActions', idx)} className="p-4 text-red-300 hover:text-red-500"><Trash2 size={18}/></button>
                     </div>
                   ))}
                   <button type="button" onClick={() => addArrayItem('wrongActions', '')} className="text-red-600 text-[10px] font-black uppercase tracking-widest pl-2 hover:underline">+ Thêm sai lầm</button>
                 </div>
               </div>

               {/* Kết quả & Thống kê */}
               <div className="space-y-8">
                 <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-black">5</div>
                    <h3 className="text-lg font-black text-gray-800 uppercase italic">Thống kê & Kết quả</h3>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400">Số vườn đã xử lý (VD: 500+)</label>
                     <input 
                       value={formData.stats.successVouchers}
                       onChange={(e) => setFormData({...formData, stats: {...formData.stats, successVouchers: e.target.value}})}
                       className="w-full bg-gray-50 p-4 rounded-xl text-sm font-black"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400">Thời gian phục hồi (VD: 21 ngày)</label>
                     <input 
                       value={formData.stats.recoveryTime}
                       onChange={(e) => setFormData({...formData, stats: {...formData.stats, recoveryTime: e.target.value}})}
                       className="w-full bg-gray-50 p-4 rounded-xl text-sm font-black"
                     />
                   </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400">Đánh giá từ bà con (Testimonials)</label>
                    {formData.testimonials.map((t, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3 shadow-sm relative group">
                        <button type="button" onClick={() => removeArrayItem('testimonials', idx)} className="absolute top-2 right-2 text-gray-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X size={14}/></button>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            value={t.name}
                            onChange={(e) => updateArrayField('testimonials', idx, e.target.value, 'name')}
                            placeholder="Tên khách"
                            className="bg-gray-50 p-2 rounded-lg text-xs font-black"
                          />
                          <input 
                            value={t.location}
                            onChange={(e) => updateArrayField('testimonials', idx, e.target.value, 'location')}
                            placeholder="Địa phương"
                            className="bg-gray-50 p-2 rounded-lg text-xs font-bold text-emerald-600"
                          />
                        </div>
                        <textarea 
                          value={t.quote}
                          onChange={(e) => updateArrayField('testimonials', idx, e.target.value, 'quote')}
                          placeholder="Nội dung đánh giá..."
                          className="w-full bg-gray-50 p-3 rounded-xl text-xs font-medium min-h-[60px]"
                        />
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('testimonials', { name: "", location: "", quote: "" })} className="text-emerald-600 text-[10px] font-black uppercase tracking-widest pl-2 hover:underline">+ Thêm đánh giá</button>
                 </div>
               </div>
            </div>

            <div className="pt-12 flex flex-col md:flex-row gap-4">
              <button type="submit" className="flex-1 bg-emerald-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-2xl shadow-emerald-600/30 active:scale-[0.98] transition-all text-sm">
                {editingId ? "CẬP NHẬT THAY ĐỔI" : "XÁC NHẬN LƯU QUY TRÌNH"}
              </button>
              <button type="button" onClick={closeForm} className="px-12 bg-gray-100 text-gray-500 py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-gray-200 transition-all text-sm">
                HỦY
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DANH SÁCH HIỆN CÓ */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-32 text-center flex flex-col items-center gap-6">
             <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
             <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Đang đồng bộ dữ liệu kỹ thuật...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-10 py-8 text-[10px] font-black uppercase text-gray-400 tracking-widest">Quy trình xử lý</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Nội dung</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {solutions.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-white border border-gray-100 rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">{item.icon || '🩺'}</div>
                         <div>
                            <div className="text-lg font-black text-gray-900 uppercase italic group-hover:text-emerald-700 transition-colors leading-tight">{item.title}</div>
                            <div className="flex items-center gap-3 mt-2">
                               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Slug: {item.slug}</span>
                               {item.videoId && <span className="w-1 h-1 bg-gray-300 rounded-full"></span>}
                               {item.videoId && <span className="text-[10px] text-red-500 font-black uppercase tracking-widest">🎥 Video ID: {item.videoId}</span>}
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex flex-wrap gap-2 justify-center">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[9px] font-black uppercase border border-blue-100">{item.steps?.length || 0} BƯỚC</span>
                          <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-[9px] font-black uppercase border border-orange-100">{item.symptoms?.length || 0} DẤU HIỆU</span>
                          <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-[9px] font-black uppercase border border-red-100">{item.wrongActions?.length || 0} SAI LẦM</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="w-12 h-12 bg-white text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-lg hover:shadow-emerald-600/20"
                          title="Chỉnh sửa nội dung"
                        >
                          <Edit3 size={20} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="w-12 h-12 bg-white text-red-400 border border-red-50 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20"
                          title="Xóa quy trình"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
