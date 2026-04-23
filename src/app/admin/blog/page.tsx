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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list:': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <AdminGuard>
      <div className="flex bg-[#f0f0f1] min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
               <h1 className="text-xl font-bold text-gray-800">Bài viết</h1>
               <button onClick={() => { setShowForm(true); setEditingBlog(null); setForm(emptyBlog); }}
                 className="bg-[#2271b1] text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-[#135e96] transition-all">
                 Viết bài mới
               </button>
            </div>
          </div>

          {showForm && (
             <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8 animate-in fade-in slide-in-from-top-4">
                <div className="bg-[#f6f7f7] border-b border-gray-200 p-4 flex justify-between items-center">
                  <h2 className="font-bold text-gray-700">{editingBlog ? "Chỉnh sửa bài viết" : "Soạn bài viết mới"}</h2>
                  <button onClick={() => { setShowForm(false); setEditingBlog(null); }} className="text-gray-400 hover:text-gray-700">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="p-8">
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Content Area */}
                      <div className="lg:col-span-2 space-y-6">
                         <div>
                           <div className="flex justify-between items-center mb-2">
                             <label className="block text-xs font-bold text-gray-400 uppercase">Tiêu đề bài viết</label>
                             <button 
                               type="button"
                               onClick={async () => {
                                 if (!form.title) return alert("Vui lòng nhập tiêu đề trước!");
                                 const btn = document.getElementById('ai-btn');
                                 if (btn) { btn.innerText = "⚡ Đang viết..."; (btn as any).disabled = true; }
                                 try {
                                   const res = await fetch(`${API_BASE_URL}/ai/generate`, {
                                     method: "POST",
                                     headers: getAuthHeaders(),
                                     body: JSON.stringify({ prompt: form.title, type: 'blog' })
                                   });
                                   const data = await res.json();
                                   console.log("AI Data Received:", data);
                                   if (res.ok) {
                                     setForm(f => ({ 
                                       ...f, 
                                       content: data.content || f.content,
                                       excerpt: data.excerpt || "",
                                       tags: data.tags || [],
                                       image: data.image || f.image
                                     }));
                                     alert("✨ AI đã hoàn thành! Vui lòng kiểm tra các ô nội dung, tóm tắt và hashtags.");
                                   } else {
                                     alert("Lỗi AI: " + (data.message || "Không xác định"));
                                   }
                                 } catch (err) {
                                   alert("Lỗi kết nối AI: " + (err as Error).message);
                                 } finally {
                                   if (btn) { btn.innerText = "✨ AI Tự Viết"; (btn as any).disabled = false; }
                                 }
                               }}
                               id="ai-btn"
                               className="text-[10px] bg-purple-600 text-white px-2 py-1 rounded-sm font-bold hover:bg-purple-700 transition-all flex items-center gap-1 shadow-sm"
                             >
                               ✨ AI Tự Viết
                             </button>
                           </div>
                           <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 text-xl font-bold outline-none focus:border-[#2271b1]" placeholder="Nhập tiêu đề tại đây" />
                         </div>
                         
                         <div className="bg-white border border-gray-300 rounded">
                           <ReactQuill theme="snow" value={form.content} onChange={(val) => setForm({...form, content: val})} modules={modules} className="h-96 mb-12" />
                         </div>

                         <div className="bg-[#f6f7f7] border border-gray-200 p-6 rounded-sm">
                            <h3 className="font-bold text-sm mb-4 border-b border-gray-200 pb-2 text-gray-700">Tóm tắt & SEO</h3>
                            <textarea required value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full border border-gray-300 p-3 text-sm outline-none h-24 resize-none" placeholder="Viết mô tả ngắn để hiển thị trên Google..." />
                         </div>
                      </div>

                      {/* Sidebar Area */}
                      <div className="space-y-6">
                         <div className="bg-[#f6f7f7] border border-gray-200 p-4 rounded-sm">
                            <h3 className="font-bold text-sm mb-4 border-b border-gray-200 pb-2 text-gray-700">Đăng</h3>
                            <div className="space-y-3 text-xs text-gray-500 mb-6">
                               <p>📌 Trạng thái: <strong className="text-gray-700">Công khai</strong></p>
                               <p>👁️ Hiển thị: <strong className="text-gray-700">Blog</strong></p>
                            </div>
                            <button type="submit" className="w-full bg-[#2271b1] text-white py-2 rounded-sm font-bold hover:bg-[#135e96] shadow-sm">
                               {editingBlog ? "Cập nhật bài viết" : "Đăng bài viết"}
                            </button>
                         </div>

                         <div className="bg-[#f6f7f7] border border-gray-200 p-4 rounded-sm">
                            <h3 className="font-bold text-sm mb-4 border-b border-gray-200 pb-2 text-gray-700">Ảnh đại diện</h3>
                            <div onClick={() => fileInputRef.current?.click()} className="aspect-video border-2 border-dashed border-gray-300 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors bg-white overflow-hidden">
                               {form.image ? (
                                 <img src={form.image} className="w-full h-full object-cover" />
                               ) : (
                                 <div className="text-center">
                                    <span className="text-3xl block mb-1">🖼️</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{uploadingImage ? "Đang tải..." : "Chọn ảnh tiêu đề"}</span>
                                 </div>
                               )}
                            </div>
                            <input ref={fileInputRef} type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            {form.image && (
                              <button type="button" onClick={() => setForm({...form, image: ""})} className="mt-2 text-[10px] text-red-500 font-bold hover:underline">Xóa ảnh</button>
                            )}
                         </div>

                         <div className="bg-[#f6f7f7] border border-gray-200 p-4 rounded-sm">
                            <h3 className="font-bold text-sm mb-4 border-b border-gray-200 pb-2 text-gray-700">Thẻ (Hashtags)</h3>
                            <input 
                              type="text" 
                              value={tagInput}
                              onChange={e => setTagInput(e.target.value)}
                              onKeyDown={handleAddTag}
                              placeholder="Nhập tag rồi ấn Enter..."
                              className="w-full border border-gray-200 p-2 text-xs outline-none mb-3"
                            />
                            <div className="flex flex-wrap gap-2">
                               {form.tags.map(tag => (
                                 <span key={tag} className="bg-white border border-gray-200 px-2 py-1 rounded-sm text-[10px] flex items-center gap-1 font-medium">
                                   #{tag}
                                   <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-red-500">✕</button>
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
          <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
            <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
                 <div className="flex gap-4 text-sm font-medium">
                    <button className="text-[#2271b1]">Tất cả ({blogs.length})</button>
                    <span className="text-gray-300">|</span>
                    <button className="text-gray-500 hover:text-[#2271b1]">Đã xuất bản</button>
                 </div>
              </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#f6f7f7] border-b border-gray-200">
                  <th className="p-4 w-12"><input type="checkbox" /></th>
                  <th className="p-4 font-bold text-gray-700">Ảnh</th>
                  <th className="p-4 font-bold text-gray-700">Tiêu đề</th>
                  <th className="p-4 font-bold text-gray-700">Thẻ</th>
                  <th className="p-4 font-bold text-gray-700 text-right">Ngày đăng</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={5} className="p-10 text-center text-gray-400">Đang tải danh sách bài viết...</td></tr>
                ) : blogs.length === 0 ? (
                  <tr><td colSpan={5} className="p-10 text-center text-gray-400 italic">Chưa có bài viết nào.</td></tr>
                ) : blogs.map(b => (
                  <tr key={b._id} className="border-b border-gray-100 hover:bg-[#f6f7f7] group transition-colors">
                    <td className="p-4"><input type="checkbox" /></td>
                    <td className="p-4">
                       <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden flex items-center justify-center">
                          {b.image ? <img src={b.image} className="w-full h-full object-cover" /> : <span className="text-lg">📚</span>}
                       </div>
                    </td>
                    <td className="p-4">
                       <p className="font-bold text-[#2271b1] cursor-pointer hover:text-[#135e96] text-sm">{b.title}</p>
                       <div className="flex gap-2 text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEdit(b)} className="text-[#2271b1] hover:text-[#135e96] font-bold">Sửa bài</button>
                          <span className="text-gray-300">|</span>
                          <button onClick={() => handleDelete(b._id)} className="text-[#d63638] hover:text-red-700 font-bold">Xóa tạm</button>
                          <span className="text-gray-300">|</span>
                          <a href={`/blog/${b.slug}`} target="_blank" className="text-[#2271b1] font-bold">Xem bài</a>
                       </div>
                    </td>
                    <td className="p-4">
                       <div className="flex flex-wrap gap-1">
                          {b.tags?.slice(0, 2).map((t: string) => (
                            <span key={t} className="bg-gray-100 text-gray-500 text-[9px] px-1.5 py-0.5 rounded-sm">#{t}</span>
                          ))}
                          {b.tags?.length > 2 && <span className="text-[9px] text-gray-400">+{b.tags.length - 2}</span>}
                       </div>
                    </td>
                    <td className="p-4 text-right text-gray-400 text-xs">
                       Đã đăng<br />{new Date(b.createdAt).toLocaleDateString("vi-VN")}
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
