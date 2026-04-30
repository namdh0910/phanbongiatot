"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase italic tracking-tight">Quản lý Danh mục</h1>
          <p className="text-sm text-gray-500">Quản lý các nhóm sản phẩm trên hệ thống.</p>
        </div>
        <button className="bg-[#1a5c2a] text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-lg hover:bg-[#2d7a3e] transition-all">
          + THÊM DANH MỤC MỚI
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tên danh mục</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Slug</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Số sản phẩm</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
               <tr><td colSpan={4} className="p-20 text-center text-gray-400 font-bold animate-pulse">Đang tải danh mục...</td></tr>
            ) : categories.length === 0 ? (
               <tr><td colSpan={4} className="p-20 text-center text-gray-400 font-bold uppercase italic tracking-widest">Chưa có danh mục nào</td></tr>
            ) : categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-5 font-bold text-gray-800">{cat.name}</td>
                <td className="px-8 py-5 text-gray-500 font-medium text-xs">{cat.slug}</td>
                <td className="px-8 py-5 text-gray-500 font-black text-xs">0</td>
                <td className="px-8 py-5 text-right space-x-2">
                   <button className="text-blue-600 font-bold text-xs hover:underline">Sửa</button>
                   <button className="text-red-600 font-bold text-xs hover:underline">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
