"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";

export default function AdminBlogList() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/blog`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) fetchBlogs();
    } catch (err) {
      alert("Xóa thất bại");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Kiến thức nhà nông (Blog)</h1>
          <Link href="/admin/blog/new" className="bg-[#2271b1] text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#135e96] transition-all shadow-md">
             + Viết Bài Mới
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="px-6 py-4">Tiêu đề / Tác giả</th>
                <th className="px-6 py-4">Chuyên mục / Cây trồng</th>
                <th className="px-6 py-4 text-center">Lượt xem</th>
                <th className="px-6 py-4">Ngày đăng</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-20 text-gray-400 font-bold italic">Đang tải...</td></tr>
              ) : blogs.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-20 text-gray-400 font-bold italic">Chưa có bài viết nào</td></tr>
              ) : blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-gray-900 line-clamp-1">{blog.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Tác giả: {blog.author}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase">{blog.category || 'Kiến thức'}</span>
                      {blog.crops?.map((c: string) => (
                        <span key={c} className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded uppercase">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-400 text-xs">
                    {blog.viewCount || 0}
                  </td>
                  <td className="px-6 py-4 text-[10px] text-gray-400 font-black uppercase">
                    {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <Link href={`/blog/${blog.slug}`} target="_blank" className="text-gray-400 hover:text-blue-500 p-2">👁️</Link>
                       <button onClick={() => handleDelete(blog._id)} className="text-gray-400 hover:text-red-500 p-2">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
