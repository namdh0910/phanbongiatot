"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
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
          <h1 className="text-2xl font-black text-gray-900 uppercase italic tracking-tight">Quản lý Người dùng</h1>
          <p className="text-sm text-gray-500">Quản lý tài khoản khách hàng, seller và admin.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Người dùng</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Vai trò</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Trạng thái</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
               <tr><td colSpan={4} className="p-20 text-center text-gray-400 font-bold animate-pulse">Đang tải người dùng...</td></tr>
            ) : users.length === 0 ? (
               <tr><td colSpan={4} className="p-20 text-center text-gray-400 font-bold uppercase italic tracking-widest">Chưa có người dùng nào</td></tr>
            ) : users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-5">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                         <p className="font-bold text-gray-800 leading-none mb-1">{user.username}</p>
                         <p className="text-[10px] text-gray-400 font-medium">{user.email || 'No email'}</p>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-5">
                   <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                     user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 
                     user.role === 'vendor' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                   }`}>
                     {user.role}
                   </span>
                </td>
                <td className="px-8 py-5">
                   <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Hoạt động
                   </span>
                </td>
                <td className="px-8 py-5 text-right space-x-2">
                   <button className="text-gray-400 hover:text-[#1a5c2a] transition-colors">✏️</button>
                   <button className="text-gray-400 hover:text-red-500 transition-colors">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
