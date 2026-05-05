"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Video, FileText, CheckCircle, Eye, Link as LinkIcon } from "lucide-react";
import { slugify } from "@/utils/slugify";

interface Blog {
  _id?: string;
  title: string;
  slug: string;
  category: 'Nhật ký phục hồi vườn' | 'Mỗi chất - Một vấn đề' | 'Cẩm nang kỹ thuật';
  videoUrl?: string;
  coverImage: string;
  content: string;
  isPublished: boolean;
  createdAt?: string;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog>({
    title: "",
    slug: "",
    category: "Cẩm nang kỹ thuật",
    videoUrl: "",
    coverImage: "",
    content: "",
    isPublished: true,
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentBlog({
      title: "",
      slug: "",
      category: "Cẩm nang kỹ thuật",
      videoUrl: "",
      coverImage: "",
      content: "",
      isPublished: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bà con chắc chắn muốn xóa bài viết này chứ? Hành động này không thể hoàn tác.")) return;
    
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(blogs.filter(b => b._id !== id));
      }
    } catch (err) {
      alert("Lỗi khi xóa bài viết");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const method = currentBlog._id ? 'PUT' : 'POST';
    const url = currentBlog._id ? `/api/blogs/${currentBlog._id}` : '/api/blogs';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentBlog),
      });

      if (res.ok) {
        setMessage("✅ Đã lưu bài viết thành công!");
        fetchBlogs();
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

  if (loading) return <div className="animate-pulse py-10 font-black text-gray-400">Đang tải dữ liệu nội dung...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">Quản lý Nội Dung</h1>
          <p className="text-gray-500 text-sm font-medium">Hệ thống CMS chuyên biệt cho Nhật ký phục hồi & Video kỹ thuật.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={handleAddNew}
            className="bg-[#1a5c2a] text-white px-6 py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-100 flex items-center gap-2 hover:bg-[#2d7a3e] transition-all active:scale-95"
          >
            <Plus size={18} /> VIẾT BÀI MỚI
          </button>
        )}
      </div>

      {isEditing ? (
        /* EDITOR VIEW */
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gray-900 p-6 text-white flex items-center justify-between">
             <div className="flex items-center gap-3">
                <span className="bg-emerald-600 p-2 rounded-lg"><Edit size={16} /></span>
                <span className="font-black uppercase text-sm tracking-widest">{currentBlog._id ? "Chỉnh sửa bài viết" : "Soạn thảo bài mới"}</span>
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
                    <input 
                      required
                      type="text" 
                      value={currentBlog.title}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        const newSlug = !currentBlog._id ? slugify(newTitle) : currentBlog.slug;
                        setCurrentBlog({...currentBlog, title: newTitle, slug: newSlug});
                      }}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                      placeholder="VD: Cách phục hồi sầu riêng bị vàng lá thối rễ..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Đường dẫn SEO (Slug)</label>
                    <div className="relative">
                       <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                       <input 
                         required
                         type="text" 
                         value={currentBlog.slug}
                         onChange={(e) => setCurrentBlog({...currentBlog, slug: slugify(e.target.value)})}
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-700 text-sm"
                         placeholder="auto-tao-tu-tieu-de"
                       />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Chuyên mục</label>
                    <select 
                      value={currentBlog.category}
                      onChange={(e: any) => setCurrentBlog({...currentBlog, category: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                    >
                      <option value="Nhật ký phục hồi vườn">Nhật ký phục hồi vườn</option>
                      <option value="Mỗi chất - Một vấn đề">Mỗi chất - Một vấn đề</option>
                      <option value="Cẩm nang kỹ thuật">Cẩm nang kỹ thuật</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Video URL (YouTube/TikTok)</label>
                    <div className="relative">
                       <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                       <input 
                         type="text" 
                         value={currentBlog.videoUrl}
                         onChange={(e) => setCurrentBlog({...currentBlog, videoUrl: e.target.value})}
                         className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                         placeholder="Dán link YouTube/TikTok vào đây..."
                       />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Ảnh bìa (URL)</label>
                    <input 
                      required
                      type="text" 
                      value={currentBlog.coverImage}
                      onChange={(e) => setCurrentBlog({...currentBlog, coverImage: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800 text-sm"
                      placeholder="URL hình ảnh (Cloudinary/Imgur...)"
                    />
                  </div>
               </div>

               <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Nội dung chi tiết (Markdown/HTML)</label>
                    <textarea 
                      required
                      value={currentBlog.content}
                      onChange={(e) => setCurrentBlog({...currentBlog, content: e.target.value})}
                      className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-medium text-gray-800 h-[340px] resize-none"
                      placeholder="Nhập nội dung kỹ thuật tại đây..."
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-50 p-4 rounded-2xl">
                     <input 
                       type="checkbox" 
                       id="published"
                       checked={currentBlog.isPublished}
                       onChange={(e) => setCurrentBlog({...currentBlog, isPublished: e.target.checked})}
                       className="w-5 h-5 accent-emerald-600"
                     />
                     <label htmlFor="published" className="text-sm font-black text-emerald-900 uppercase">Công khai bài viết ngay</label>
                  </div>
               </div>
            </div>

            <div className="flex gap-4 pt-8 border-t border-gray-100">
               <button 
                 type="submit"
                 disabled={saving}
                 className="flex-1 bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 flex items-center justify-center gap-3 hover:bg-[#2d7a3e] transition-all active:scale-95"
               >
                 <Save size={20} /> {saving ? "ĐANG LƯU..." : "LƯU NỘI DUNG"}
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
        /* LIST VIEW */
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Thông tin bài viết</th>
                  <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Chuyên mục</th>
                  <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Trạng thái</th>
                  <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                           <img src={blog.coverImage} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 line-clamp-1">{blog.title}</h4>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(blog.createdAt!).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                        ${blog.category === 'Nhật ký phục hồi vườn' ? 'bg-blue-50 text-blue-600' : 
                          blog.category === 'Mỗi chất - Một vấn đề' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'}`}>
                         {blog.videoUrl ? <Video size={10} /> : <FileText size={10} />}
                         {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      {blog.isPublished ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                           <CheckCircle size={14} /> Công khai
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Bản nháp</span>
                      )}
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center justify-center gap-2">
                         <a href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Xem trước">
                            <Eye size={18} />
                         </a>
                         <button onClick={() => handleEdit(blog)} className="p-2 text-gray-400 hover:text-emerald-600 transition-colors" title="Sửa">
                            <Edit size={18} />
                         </button>
                         <button onClick={() => handleDelete(blog._id!)} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Xóa">
                            <Trash2 size={18} />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {blogs.length === 0 && (
            <div className="py-20 text-center">
               <div className="text-6xl mb-4 opacity-10">📖</div>
               <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Chưa có bài viết nào. Hãy bấm "Viết bài mới"!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
