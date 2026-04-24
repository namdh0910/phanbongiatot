"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import "react-quill-new/dist/quill.snow.css";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emptyBlog = { title: "", excerpt: "", content: "", image: "", tags: [] as string[] };
  const [form, setForm] = useState(emptyBlog);
  const [tagInput, setTagInput] = useState("");

  const fetchBlogs = () => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/blogs`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBlogs(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => { fetchBlogs(); }, []);

  const toSlug = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(blogs.map(b => b._id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} bài viết đã chọn?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/blogs/bulk-delete`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ ids: selectedIds })
      });
      if (res.ok) {
        fetchBlogs();
        setSelectedIds([]);
        alert("Đã xóa các mục đã chọn!");
      } else alert("Lỗi khi xóa hàng loạt.");
    } catch (error) { alert("Lỗi kết nối."); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// ... existing image upload logic ...
    if (!e.target.files?.[0]) return;
    setUploadingImage(true);
    const fd = new FormData();
    fd.append("images", e.target.files[0]);

    try {
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: getAuthHeaders(true),
        body: fd
      });
      if (res.ok) {
        const { urls } = await res.json();
        setForm(f => ({ ...f, image: urls[0] }));
      }
    } catch (error) {
      alert("Lỗi upload ảnh.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
// ... existing tag logic ...
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!form.tags.includes(tagInput.trim())) {
        setForm(f => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
// ... existing submit logic ...
    e.preventDefault();
    const payload = {
      ...form,
      slug: editingBlog ? form.title === editingBlog.title ? editingBlog.slug : toSlug(form.title) : toSlug(form.title) + "-" + Date.now().toString().slice(-4),
    };

    const url = editingBlog ? `${API_BASE_URL}/blogs/${editingBlog._id}` : `${API_BASE_URL}/blogs`;
    const method = editingBlog ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchBlogs();
        setShowForm(false);
        setEditingBlog(null);
        setForm(emptyBlog);
        alert(editingBlog ? "Đã cập nhật bài viết!" : "Đã đăng bài viết thành công!");
      } else alert("Lỗi khi lưu bài viết.");
    } catch (error) { alert("Lỗi kết nối."); }
  };

  const openEdit = (blog: any) => {
// ... existing openEdit logic ...
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image || "",
      tags: blog.tags || []
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có muốn xóa bài viết này không?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) {
        fetchBlogs();
        alert("Đã xóa!");
      }
    } catch (error) { alert("Lỗi kết nối."); }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, { 'header': '2'}, { 'header': '3'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['table'],
      ['clean']
    ],
  };

  return (
    <AdminGuard>
      <div className="flex bg-[#f0f0f1] min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
               <h1 className="text-2xl font-black text-gray-800 tracking-tight">Quản lý nội dung</h1>
               <p className="text-sm text-gray-500 font-medium">Hệ thống bài viết chuyên gia Phân Bón Giá Tốt</p>
            </div>
            <div className="flex items-center gap-3">
               {selectedIds.length > 0 && (
                  <div className="flex items-center gap-3 bg-red-50 px-4 py-2 rounded-xl border border-red-100 animate-in slide-in-from-right-4">
                     <span className="text-sm text-red-600 font-bold">Đã chọn {selectedIds.length}</span>
                     <button onClick={handleBulkDelete} className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-all shadow-sm">
                       Xóa hàng loạt
                     </button>
                  </div>
               )}
               <button onClick={() => { setShowForm(true); setEditingBlog(null); setForm(emptyBlog); }}
                 className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2">
                 <span>+</span> Viết bài mới
               </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex gap-4 mb-6 px-1">
             <button className="px-4 py-2 bg-white rounded-lg border border-emerald-100 text-emerald-700 text-xs font-bold shadow-sm">Tất cả ({blogs.length})</button>
             <button className="px-4 py-2 bg-transparent text-gray-500 text-xs font-bold hover:text-emerald-600 transition-colors">Đã xuất bản</button>
             <button className="px-4 py-2 bg-transparent text-gray-500 text-xs font-bold hover:text-emerald-600 transition-colors">Bản nháp</button>
          </div>

          {showForm && (
             <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden mb-12 animate-in fade-in slide-in-from-top-6">
                <div className="bg-gray-50/50 border-b border-gray-100 p-6 flex justify-between items-center">
                  <div>
                    <h2 className="font-black text-xl text-gray-800">{editingBlog ? "Chỉnh sửa bài viết" : "Soạn thảo nội dung mới"}</h2>
                    <p className="text-xs text-gray-400 font-medium mt-1">Sử dụng công cụ AI để tối ưu nội dung chuẩn chuyên gia</p>
                  </div>
                  <button onClick={() => { setShowForm(false); setEditingBlog(null); }} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-400 hover:text-red-500 shadow-sm transition-all">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="p-8">
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                      {/* Main Content Area */}
                      <div className="lg:col-span-2 space-y-8">
                         <div>
                           <div className="flex justify-between items-center mb-3">
                             <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Tiêu đề Masterclass</label>
                             <button 
                               type="button"
                               onClick={async () => {
                                 if (!form.title) return alert("Vui lòng nhập tiêu đề trước!");
                                 const btn = document.getElementById('ai-btn');
                                 if (btn) { btn.innerHTML = '<span class="animate-spin">⏳</span> Đang phân tích...'; (btn as any).disabled = true; }
                                 try {
                                   const res = await fetch(`${API_BASE_URL}/ai/generate`, {
                                     method: "POST",
                                     headers: getAuthHeaders(),
                                     body: JSON.stringify({ prompt: form.title, type: 'blog' })
                                   });
                                   const data = await res.json();
                                   if (res.ok) {
                                     setForm(f => ({ 
                                       ...f, 
                                       content: data.content || f.content,
                                       excerpt: data.excerpt || "",
                                       tags: data.tags || [],
                                       image: data.image || f.image
                                     }));
                                     alert("✨ AI đã hoàn thành bài viết chuyên sâu!");
                                   } else {
                                     alert("Lỗi AI: " + (data.message || "Không xác định"));
                                   }
                                 } catch (err) {
                                   alert("Lỗi kết nối AI.");
                                 } finally {
                                   if (btn) { btn.innerHTML = '✨ AI Tự Viết'; (btn as any).disabled = false; }
                                 }
                               }}
                               id="ai-btn"
                               className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-black hover:shadow-lg hover:shadow-purple-200 transition-all flex items-center gap-2 shadow-md"
                             >
                               ✨ AI Tự Viết
                             </button>
                           </div>
                           <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4 text-xl font-bold outline-none focus:border-emerald-500 bg-gray-50/30 transition-all" placeholder="Nhập tiêu đề thu hút nhà vườn..." />
                         </div>
                         
                         <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
                           <ReactQuill theme="snow" value={form.content} onChange={(val) => setForm({...form, content: val})} modules={modules} className="h-[500px] mb-12" />
                         </div>

                         <div className="bg-emerald-50/30 border border-emerald-100 p-8 rounded-2xl">
                            <h3 className="font-black text-sm mb-4 border-b border-emerald-100 pb-2 text-emerald-800 uppercase tracking-widest">Tóm tắt & Tối ưu tìm kiếm</h3>
                            <textarea required value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full border-2 border-white rounded-xl p-4 text-sm outline-none h-28 resize-none shadow-inner bg-white/50 focus:bg-white transition-all" placeholder="Tóm tắt nội dung để hiện thị trên Google..." />
                         </div>
                      </div>

                      {/* Sidebar Area */}
                      <div className="space-y-8">
                         <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                            <h3 className="font-black text-sm mb-6 border-b border-gray-50 pb-3 text-gray-800 uppercase tracking-widest">Xuất bản</h3>
                            <div className="space-y-4 text-xs font-medium text-gray-500 mb-8">
                               <div className="flex justify-between items-center">
                                  <span>📌 Trạng thái</span>
                                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md font-bold">Công khai</span>
                               </div>
                               <div className="flex justify-between items-center">
                                  <span>👁️ Hiển thị</span>
                                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-bold">Toàn hệ thống</span>
                               </div>
                            </div>
                            <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95">
                               {editingBlog ? "CẬP NHẬT NGAY" : "XUẤT BẢN BÀI VIẾT"}
                            </button>
                         </div>

                         <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                            <h3 className="font-black text-sm mb-6 border-b border-gray-50 pb-3 text-gray-800 uppercase tracking-widest">Ảnh đại diện</h3>
                            <div onClick={() => fileInputRef.current?.click()} className="aspect-video border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all bg-gray-50/50 overflow-hidden group">
                               {form.image ? (
                                 <img src={form.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                               ) : (
                                 <div className="text-center">
                                    <span className="text-4xl block mb-2 opacity-50">🖼️</span>
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{uploadingImage ? "Đang xử lý..." : "Tải ảnh lên"}</span>
                                 </div>
                               )}
                            </div>
                            <input ref={fileInputRef} type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            {form.image && (
                              <button type="button" onClick={() => setForm({...form, image: ""})} className="mt-4 w-full text-xs text-red-500 font-bold hover:bg-red-50 py-2 rounded-lg transition-colors">Gỡ bỏ ảnh</button>
                            )}
                         </div>

                         <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                            <h3 className="font-black text-sm mb-6 border-b border-gray-50 pb-3 text-gray-800 uppercase tracking-widest">Thẻ phân loại</h3>
                            <div className="flex gap-2 mb-4">
                               <input 
                                 type="text" 
                                 value={tagInput}
                                 onChange={e => setTagInput(e.target.value)}
                                 onKeyDown={handleAddTag}
                                 placeholder="Thêm thẻ..."
                                 className="flex-1 border-2 border-gray-50 rounded-xl px-4 py-2 text-xs outline-none focus:border-emerald-200 transition-all"
                               />
                               <button type="button" onClick={() => { if(tagInput.trim()) setForm(f => ({...f, tags: [...f.tags, tagInput.trim()]})); setTagInput(""); }} className="bg-gray-100 text-gray-600 px-3 rounded-xl hover:bg-gray-200 transition-colors">OK</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                               {form.tags.map(tag => (
                                 <span key={tag} className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-2 font-bold border border-emerald-100">
                                   #{tag}
                                   <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">✕</button>
                                 </span>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </form>
             </div>
          )}

          {/* Blogs Table - WP Style */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/40">
            <div className="p-6 bg-white border-b border-gray-50 flex justify-between items-center">
                 <div className="flex gap-6 text-sm font-black uppercase tracking-widest">
                    <button className="text-emerald-600 border-b-2 border-emerald-600 pb-1">Tất cả ({blogs.length})</button>
                    <button className="text-gray-400 hover:text-emerald-600 transition-colors pb-1">Đã xuất bản</button>
                    <button className="text-gray-400 hover:text-emerald-600 transition-colors pb-1">Bản nháp</button>
                 </div>
                 <div className="text-xs text-gray-400 font-bold">
                    Tự động lưu lúc: {new Date().toLocaleTimeString()}
                 </div>
              </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50/30 border-b border-gray-100">
                  <th className="p-6 w-12 text-center">
                    <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === blogs.length && blogs.length > 0} className="w-5 h-5 rounded-lg border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer transition-all" />
                  </th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Hình ảnh</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Tiêu đề & Nội dung</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Trạng thái</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px] text-right">Ngày đăng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr><td colSpan={5} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-400 font-black uppercase tracking-widest">Hệ thống đang xử lý dữ liệu...</span>
                    </div>
                  </td></tr>
                ) : blogs.length === 0 ? (
                  <tr><td colSpan={5} className="p-20 text-center">
                    <div className="opacity-20 flex flex-col items-center gap-6">
                       <span className="text-8xl">📄</span>
                       <p className="font-black text-gray-400 uppercase tracking-widest">Kho bài viết đang trống</p>
                    </div>
                  </td></tr>
                ) : blogs.map(b => (
                  <tr key={b._id} className={`hover:bg-emerald-50/40 transition-all group ${selectedIds.includes(b._id) ? 'bg-emerald-50/60' : ''}`}>
                    <td className="p-6 text-center">
                      <input type="checkbox" checked={selectedIds.includes(b._id)} onChange={() => handleSelectOne(b._id)} className="w-5 h-5 rounded-lg border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer transition-all" />
                    </td>
                    <td className="p-6">
                       <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-gray-50 flex items-center justify-center group-hover:rotate-1 transition-transform">
                          {b.image ? <img src={b.image} className="w-full h-full object-cover" /> : <span className="text-3xl">📚</span>}
                       </div>
                    </td>
                    <td className="p-6 max-w-lg">
                       <p className="font-black text-gray-800 text-base leading-snug mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">{b.title}</p>
                       <div className="flex gap-5 items-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                          <button onClick={() => openEdit(b)} className="text-xs font-black text-emerald-600 hover:text-emerald-800 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-emerald-50">
                             <span>📝</span> Sửa nhanh
                          </button>
                          <button onClick={() => handleDelete(b._id)} className="text-xs font-black text-red-500 hover:text-red-700 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-red-50">
                             <span>🗑️</span> Xóa
                          </button>
                          <button onClick={async () => {
                            if (!confirm("Bạn có chắc muốn đăng bài viết này lên Facebook Fanpage?")) return;
                            try {
                              const res = await fetch(`${API_BASE_URL}/social/publish-facebook/${b._id}`, {
                                method: 'POST',
                                headers: getAuthHeaders()
                              });
                              const data = await res.json();
                              if (res.ok) alert("Đăng lên Fanpage thành công! ID: " + data.postId);
                              else alert("Lỗi: " + data.message);
                            } catch (error) { alert("Lỗi kết nối mạng."); }
                          }} className="text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-blue-50">
                             <span>📘</span> Facebook
                          </button>
                          <a href={`/blog/${b.slug}`} target="_blank" className="text-xs font-black text-gray-500 hover:text-gray-900 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
                             <span>👁️</span> Xem bài
                          </a>
                       </div>
                    </td>
                    <td className="p-6">
                       <div className="flex flex-col gap-2">
                          <span className="inline-flex items-center w-fit px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm">
                             ● Đã xuất bản
                          </span>
                          <span className="inline-flex items-center w-fit px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">
                             ★ Nổi bật
                          </span>
                       </div>
                    </td>
                    <td className="p-6 text-right">
                       <p className="text-sm font-black text-gray-800">{new Date(b.createdAt).toLocaleDateString("vi-VN")}</p>
                       <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-tighter opacity-60">{new Date(b.createdAt).toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
