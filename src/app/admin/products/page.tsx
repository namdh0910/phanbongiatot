"use client";
import { useState, useEffect, useRef } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import { useRouter } from "next/navigation";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function AdminProducts() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("Admin");
  const [debugInfo, setDebugInfo] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emptyForm = {
    name: "", category: "Phân bón", price: "", originalPrice: "",
    description: "", usageInstructions: "", dosage: "",
    benefits: [""], faq: [{ q: "", a: "" }],
    images: [] as string[], stock: "100",
    seoTitle: "", seoDescription: "", 
    isFeatured: false, isNewArrival: false, isBestSeller: false
  };
  const [form, setForm] = useState(emptyForm);

    const fetchProducts = () => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/products/admin/all`, {
      headers: getAuthHeaders()
    })
      .then(r => {
        if (!r.ok) {
          setDebugInfo(`Lỗi API: ${r.status}`);
          if (r.status === 401 || r.status === 403) {
             alert("Phiên làm việc hết hạn hoặc bạn không có quyền Admin. Vui lòng đăng nhập lại.");
             router.push("/admin/login");
          }
          throw new Error("Lỗi fetch sản phẩm");
        }
        return r.json();
      })
      .then(d => { 
        if (Array.isArray(d)) {
          setProducts(d); 
          setDebugInfo(`Thành công: Lấy được ${d.length} sản phẩm`);
        } else {
          setDebugInfo("Lỗi: Dữ liệu trả về không phải là danh sách");
        }
        setIsLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setDebugInfo(`Lỗi kết nối: ${err.message}`);
        setIsLoading(false);
      });
  };

  useEffect(() => { 
    const userStr = localStorage.getItem("adminUser");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setAdminName(user.username || "Admin");
      } catch (e) {}
    }
    fetchProducts(); 
  }, []);

  const toSlug = (str: string) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-").replace(/-+/g, "-");

  const handleImageFiles = async (files: FileList) => {
    setUploadingImages(true);
    const newFiles = Array.from(files);
    const localPreviews = newFiles.map(f => URL.createObjectURL(f));
    setPreviewImages(prev => [...prev, ...localPreviews]);

    try {
      const fd = new FormData();
      newFiles.forEach(f => fd.append("images", f));
      
      const res = await fetch(`${API_BASE_URL}/upload`, { 
        method: "POST", 
        headers: getAuthHeaders(true) as any,
        body: fd 
      });
      if (res.ok) {
        const { urls } = await res.json();
        setForm(prev => ({ ...prev, images: [...prev.images, ...urls] }));
        setPreviewImages(prev => {
          const filtered = prev.filter(p => !localPreviews.includes(p));
          return [...filtered, ...urls];
        });
      } else {
        alert("Lỗi upload ảnh lên server.");
        setPreviewImages(prev => prev.filter(p => !localPreviews.includes(p)));
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối khi upload ảnh.");
      setPreviewImages(prev => prev.filter(p => !localPreviews.includes(p)));
    } finally {
      setUploadingImages(false);
    }
  };

  const openEdit = (p: any) => {
    setForm({
      name: p.name, category: p.category, price: p.price.toString(),
      originalPrice: p.originalPrice?.toString() || "",
      description: p.description, usageInstructions: p.usageInstructions || "",
      dosage: p.dosage || "", benefits: p.benefits?.length ? p.benefits : [""],
      faq: p.faq?.length ? p.faq : [{ q: "", a: "" }],
      images: p.images || [], stock: p.stock?.toString() || "100",
      seoTitle: p.seoTitle || "", seoDescription: p.seoDescription || "",
      isFeatured: p.isFeatured || false,
      isNewArrival: p.isNewArrival || false,
      isBestSeller: p.isBestSeller || false
    });
    setPreviewImages(p.images || []);
    setEditingProduct(p);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseInt(form.price.replace(/,/g, "")) || 0;
    const payload = {
      ...form,
      price,
      originalPrice: parseInt(form.originalPrice.replace(/,/g, "")) || price * 1.2,
      stock: parseInt(form.stock) || 100,
      slug: toSlug(form.name) + (editingProduct ? "" : "-" + Date.now().toString().slice(-4)),
      benefits: form.benefits.filter(b => b.trim()),
      faq: form.faq.filter(f => f.q.trim()),
    };
    const url = editingProduct
      ? `${API_BASE_URL}/products/${editingProduct._id}`
      : `${API_BASE_URL}/products`;
    const method = editingProduct ? "PUT" : "POST";
    const res = await fetch(url, { 
      method, 
      headers: getAuthHeaders(), 
      body: JSON.stringify(payload) 
    });
    if (res.ok) {
      fetchProducts(); setShowForm(false); setEditingProduct(null);
      setForm(emptyForm); setPreviewImages([]);
      alert(editingProduct ? "Đã cập nhật!" : "Đã thêm sản phẩm!");
    } else alert("Lỗi lưu sản phẩm.");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa sản phẩm này?")) return;
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { 
      method: "DELETE",
      headers: getAuthHeaders()
    });
    if (res.ok) fetchProducts();
    else alert("Lỗi khi xóa sản phẩm.");
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    if (!confirm(`Xóa vĩnh viễn ${selectedIds.length} sản phẩm đã chọn?`)) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/products/bulk-delete`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ ids: selectedIds })
      });
      if (res.ok) {
        setSelectedIds([]);
        fetchProducts();
        alert("Đã xóa các sản phẩm được chọn!");
      } else {
        alert("Lỗi khi xóa hàng loạt.");
      }
    } catch (err) {
      alert("Lỗi kết nối khi xóa hàng loạt.");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) setSelectedIds([]);
    else setSelectedIds(products.map(p => p._id));
  };

  return (
    <AdminGuard>
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
             <h1 className="text-xl font-bold text-gray-800">Sản phẩm</h1>
             <button onClick={() => { setShowForm(true); setEditingProduct(null); setForm(emptyForm); setPreviewImages([]); }}
               className="bg-[#2271b1] text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-[#135e96] transition-all">
               Thêm mới
             </button>
             {debugInfo && (
               <span className={`text-[10px] px-2 py-1 rounded font-bold ${debugInfo.includes('Thành công') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                 🔍 {debugInfo}
               </span>
             )}
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs text-gray-400">Tài khoản: <strong className="text-gray-700">{adminName}</strong></span>
             <button onClick={() => { localStorage.clear(); router.push("/admin/login"); }} className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all">Đăng xuất</button>
          </div>
        </div>

        <div className="space-y-8">
          {showForm && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="bg-[#f6f7f7] border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="font-bold text-gray-700">{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
                <button onClick={() => { setShowForm(false); setEditingProduct(null); }} className="text-gray-400 hover:text-gray-700">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Tên sản phẩm</label>
                       <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-1 focus:ring-[#2271b1] focus:border-[#2271b1] outline-none text-lg font-medium" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả sản phẩm</label>
                       <div className="bg-white border border-gray-300 rounded overflow-hidden">
                         <ReactQuill 
                           theme="snow" 
                           value={form.description} 
                           onChange={val => setForm(f => ({ ...f, description: val }))}
                           className="h-80 mb-12"
                           modules={{
                             toolbar: [
                               [{ 'header': '1'}, { 'header': '2'}, { 'header': '3'}, { 'font': [] }],
                               ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                               [{ 'color': [] }, { 'background': [] }],
                               [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                               [{ 'align': [] }],
                               ['link', 'image', 'video'],
                               ['clean']
                             ],
                           }}
                         />
                       </div>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <div className="bg-[#f6f7f7] border border-gray-200 p-4 rounded-sm">
                        <h3 className="font-bold text-sm mb-4 border-b border-gray-200 pb-2">Đăng</h3>
                         <div className="space-y-3 text-xs text-gray-500">
                            <p>📌 Trạng thái: <strong className="text-gray-700">Công khai</strong></p>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} />
                              <span>Nổi bật trang chủ</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" checked={form.isNewArrival} onChange={e => setForm({...form, isNewArrival: e.target.checked})} />
                              <span>Hàng mới về</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" checked={form.isBestSeller} onChange={e => setForm({...form, isBestSeller: e.target.checked})} />
                              <span>Bán chạy nhất</span>
                            </div>
                         </div>
                        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                           <button type="button" onClick={() => setShowForm(false)} className="text-[#d63638] underline hover:text-red-700">Bỏ qua</button>
                           <button type="submit" className="bg-[#2271b1] text-white px-4 py-2 rounded-sm font-bold hover:bg-[#135e96]">{editingProduct ? "Cập nhật" : "Đăng ngay"}</button>
                        </div>
                     </div>

                     <div className="bg-[#f6f7f7] border border-gray-200 p-4 rounded-sm">
                        <h3 className="font-bold text-sm mb-4 border-b border-gray-200 pb-2">Danh mục</h3>
                        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full border border-gray-200 p-2 text-sm outline-none">
                          <option>Phân bón</option><option>Kích rễ</option><option>Tuyến trùng</option><option>Thuốc trừ sâu</option>
                        </select>
                     </div>

                     <div className="bg-[#f6f7f7] border border-gray-200 p-4 rounded-sm">
                        <h3 className="font-bold text-sm mb-4 border-b border-gray-200 pb-2">Ảnh sản phẩm</h3>
                        <div onClick={() => fileInputRef.current?.click()} className="aspect-square border-2 border-dashed border-gray-300 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                           {previewImages[0] ? <img src={previewImages[0]} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-xs">Thiết lập ảnh</span>}
                        </div>
                        <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => e.target.files && handleImageFiles(e.target.files)} />
                     </div>

                     <div className="bg-[#f6f7f7] border border-gray-200 p-4 rounded-sm">
                        <h3 className="font-bold text-sm mb-4 border-b border-gray-200 pb-2">Tối ưu SEO</h3>
                        <div className="space-y-4">
                           <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">SEO Title</label>
                              <input 
                                 className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-[#2271b1]"
                                 value={form.seoTitle}
                                 onChange={e => setForm({...form, seoTitle: e.target.value})}
                                 placeholder="Mặc định là tên SP"
                              />
                           </div>
                           <div>
                              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">SEO Description</label>
                              <textarea 
                                 className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-[#2271b1] h-20 resize-none"
                                 value={form.seoDescription}
                                 onChange={e => setForm({...form, seoDescription: e.target.value})}
                                 placeholder="Mô tả ngắn cho Google..."
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Giá bán (₫)</label>
                     <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2271b1]" />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Giá gốc (₫)</label>
                     <input value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#2271b1]" />
                   </div>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
            <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
               <div className="flex gap-4 text-sm items-center">
                  <button className="font-bold text-[#2271b1]">Tất cả ({products.length})</button>
                  <span className="text-gray-300">|</span>
                  <button className="text-[#2271b1]">Đang hoạt động</button>
                  
                  {selectedIds.length > 0 && (
                    <>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={handleBulkDelete}
                        className="bg-red-50 text-red-600 px-3 py-1 rounded border border-red-100 font-bold hover:bg-red-600 hover:text-white transition-all text-[11px] flex items-center gap-1 animate-in zoom-in duration-200"
                      >
                        🗑️ Xóa {selectedIds.length} mục đã chọn
                      </button>
                    </>
                  )}
               </div>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#f6f7f7] border-b border-gray-200">
                  <th className="p-4 w-16 text-center">
                    <input 
                      type="checkbox" 
                      checked={products.length > 0 && selectedIds.length === products.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-4 font-bold text-gray-700">Ảnh</th>
                  <th className="p-4 font-bold text-gray-700">Tên</th>
                  <th className="p-4 font-bold text-gray-700">Danh mục</th>
                  <th className="p-4 font-bold text-gray-700">Giá</th>
                  <th className="p-4 font-bold text-gray-700 text-right">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={6} className="p-10 text-center">Đang tải dữ liệu...</td></tr>
                ) : products.map(p => (
                  <tr key={p._id} className={`border-b border-gray-100 hover:bg-[#f6f7f7] group transition-colors ${selectedIds.includes(p._id) ? 'bg-blue-50/30' : ''}`}>
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(p._id)}
                        onChange={() => toggleSelect(p._id)}
                      />
                    </td>
                    <td className="p-4">
                      {p.images?.[0] ? (
                        <img src={p.images[0]} className="w-8 h-8 object-cover rounded-sm" />
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">🚫</div>
                      )}
                    </td>
                    <td className="p-4">
                       <div className="flex items-center gap-2">
                         <p className="font-bold text-[#2271b1] cursor-pointer hover:text-[#135e96]">{p.name}</p>
                         {!p.images?.[0] && (
                           <span className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded border border-orange-200 font-medium">⚠️ Chưa có ảnh</span>
                         )}
                       </div>
                       <div className="flex gap-2 text-[11px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(p)} className="text-[#2271b1] hover:text-[#135e96]">Sửa</button>
                          <span className="text-gray-300">|</span>
                          <button onClick={() => handleDelete(p._id)} className="text-[#d63638] hover:text-red-700">Xóa</button>
                          <span className="text-gray-300">|</span>
                          <a href={`/san-pham/${p.slug}`} target="_blank" className="text-[#2271b1]">Xem</a>
                       </div>
                    </td>
                    <td className="p-4 text-gray-600">{p.category}</td>
                    <td className="p-4 font-bold text-gray-800">{p.price.toLocaleString()}đ</td>
                    <td className="p-4 text-right text-gray-400 text-xs">
                       Đã đăng<br />{new Date(p.createdAt || Date.now()).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </AdminGuard>
  );
}
