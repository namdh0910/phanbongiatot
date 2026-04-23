"use client";
import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
  });

  const fetchLeads = () => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/leads`, {
      headers: getAuthHeaders()
    })
      .then(r => r.json())
      .then(d => { 
        if (Array.isArray(d)) {
          setLeads(d);
          setFilteredLeads(d);
        }
        setIsLoading(false); 
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => { fetchLeads(); }, []);

  useEffect(() => {
    let result = leads;
    if (statusFilter !== "all") {
      result = result.filter(l => l.status === statusFilter);
    }
    if (searchTerm) {
      result = result.filter(l => 
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        l.phone.includes(searchTerm)
      );
    }
    setFilteredLeads(result);
  }, [searchTerm, statusFilter, leads]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`${API_BASE_URL}/leads/${id}/status`, { 
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    if (res.ok) fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Bạn có muốn xóa đơn hàng này không?")) return;
    const res = await fetch(`${API_BASE_URL}/leads/${id}`, { 
      method: "DELETE",
      headers: getAuthHeaders()
    });
    if (res.ok) fetchLeads();
  };

  return (
    <AdminGuard>
      <div className="flex bg-[#f0f0f1] min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
           <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Quản lý Đơn hàng</h1>
            <div className="flex gap-3">
               <input 
                 type="text" 
                 placeholder="Tìm tên hoặc SĐT..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="text-xs border border-gray-300 px-3 py-1.5 rounded-md outline-none focus:border-blue-500 w-64"
               />
               <button onClick={fetchLeads} className="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md text-sm font-bold hover:bg-gray-50">
                 Làm mới
               </button>
            </div>
          </div>

          <div className="mb-6 flex gap-4 text-sm">
             <button onClick={() => setStatusFilter("all")} className={`pb-1 px-1 font-bold ${statusFilter === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Tất cả ({leads.length})</button>
             <button onClick={() => setStatusFilter("pending")} className={`pb-1 px-1 font-bold ${statusFilter === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Mới ({leads.filter(l => l.status === 'pending').length})</button>
             <button onClick={() => setStatusFilter("shipped")} className={`pb-1 px-1 font-bold ${statusFilter === 'shipped' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Đã giao</button>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#f6f7f7] border-b border-gray-200">
                  <th className="p-4 font-bold text-gray-700">Khách hàng</th>
                  <th className="p-4 font-bold text-gray-700">Sản phẩm</th>
                  <th className="p-4 font-bold text-gray-700">Tổng cộng</th>
                  <th className="p-4 font-bold text-gray-700 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={4} className="p-10 text-center text-gray-400">Đang tải...</td></tr>
                ) : filteredLeads.length === 0 ? (
                  <tr><td colSpan={4} className="p-10 text-center text-gray-400">Không tìm thấy đơn hàng nào.</td></tr>
                ) : filteredLeads.map(lead => (
                  <tr key={lead._id} className="border-b border-gray-100 hover:bg-[#f6f7f7] group">
                    <td className="p-4">
                       <p className="font-bold text-[#2271b1]">{lead.name}</p>
                       <p className="text-gray-500 text-[11px]">{lead.phone}</p>
                       <p className="text-[10px] text-gray-400 mt-1">{lead.address}</p>
                       <button onClick={() => deleteLead(lead._id)} className="text-[10px] text-red-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity hover:underline">Xóa đơn hàng</button>
                    </td>
                    <td className="p-4">
                       <ul className="text-[11px] space-y-1">
                          {lead.items?.map((item: any, i: number) => (
                            <li key={i}>{item.name} x{item.quantity}</li>
                          ))}
                       </ul>
                    </td>
                    <td className="p-4 font-bold">{(lead.totalAmount || 0).toLocaleString()}đ</td>
                    <td className="p-4 text-right">
                       <select 
                         value={lead.status} 
                         onChange={(e) => updateStatus(lead._id, e.target.value)}
                         className={`text-xs p-1.5 border rounded-sm font-bold ${
                           lead.status === 'pending' ? 'bg-red-50 text-red-600 border-red-200' :
                           lead.status === 'shipped' ? 'bg-green-50 text-green-600 border-green-200' :
                           'bg-gray-50 text-gray-600 border-gray-200'
                         }`}
                       >
                         <option value="pending">Mới đặt</option>
                         <option value="called">Đã gọi</option>
                         <option value="shipped">Đã giao</option>
                         <option value="cancelled">Hủy</option>
                       </select>
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
