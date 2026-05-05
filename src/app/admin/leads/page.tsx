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
            <h1 className="text-xl font-bold text-gray-800">Quản lý Yêu cầu Tư vấn</h1>
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
             <button onClick={() => setStatusFilter("pending")} className={`pb-1 px-1 font-bold ${statusFilter === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Yêu cầu mới ({leads.filter(l => l.status === 'pending').length})</button>
             <button onClick={() => setStatusFilter("called")} className={`pb-1 px-1 font-bold ${statusFilter === 'called' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Đã tư vấn</button>
             <button onClick={() => setStatusFilter("shipped")} className={`pb-1 px-1 font-bold ${statusFilter === 'shipped' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Đã chốt/Giao hàng</button>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#f6f7f7] border-b border-gray-200">
                  <th className="p-4 font-bold text-gray-700">Khách hàng / Vấn đề</th>
                  <th className="p-4 font-bold text-gray-700">Sản phẩm quan tâm</th>
                  <th className="p-4 font-bold text-gray-700">Ghi chú nhanh</th>
                  <th className="p-4 font-bold text-gray-700 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={4} className="p-10 text-center text-gray-400">Đang tải dữ liệu khách hàng...</td></tr>
                ) : filteredLeads.length === 0 ? (
                  <tr><td colSpan={4} className="p-10 text-center text-gray-400">Không tìm thấy yêu cầu tư vấn nào.</td></tr>
                ) : filteredLeads.map(lead => (
                  <tr key={lead._id} className="border-b border-gray-100 hover:bg-[#f6f7f7] group">
                    <td className="p-4">
                       <div className="flex items-center gap-2">
                         <p className="font-black text-[#2271b1] text-base">{lead.name}</p>
                         <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase">Zalo</span>
                       </div>
                       <p className="text-gray-700 font-bold text-sm mt-1">{lead.phone}</p>
                       <p className="text-[11px] text-gray-400 mt-1 italic">{lead.address || "Chưa cung cấp địa chỉ"}</p>
                       <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a href={`tel:${lead.phone}`} className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded hover:bg-green-700">Gọi điện</a>
                          <button onClick={() => deleteLead(lead._id)} className="text-[10px] text-red-500 hover:underline">Xóa</button>
                       </div>
                    </td>
                    <td className="p-4">
                       <ul className="text-[11px] space-y-1">
                          {lead.items?.map((item: any, i: number) => (
                            <li key={i} className="bg-gray-50 px-2 py-1 rounded border border-gray-100">
                              <span className="font-bold">{item.name}</span>
                              {item.quantity > 1 && <span className="ml-1 text-gray-400">(x{item.quantity})</span>}
                            </li>
                          ))}
                          {!lead.items?.length && <span className="text-gray-400 italic">Cần tư vấn phác đồ</span>}
                       </ul>
                    </td>
                    <td className="p-4">
                       <textarea 
                        className="w-full bg-transparent border-none text-[11px] text-gray-500 focus:ring-0 resize-none h-12" 
                        placeholder="Ghi chú kỹ thuật tại đây..."
                        defaultValue={lead.notes}
                       />
                    </td>
                    <td className="p-4 text-right">
                       <select 
                         value={lead.status} 
                         onChange={(e) => updateStatus(lead._id, e.target.value)}
                         className={`text-xs p-1.5 border rounded-sm font-black uppercase tracking-tighter ${
                           lead.status === 'pending' ? 'bg-red-50 text-red-600 border-red-200' :
                           lead.status === 'shipped' ? 'bg-green-50 text-green-600 border-green-200' :
                           lead.status === 'called' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                           'bg-gray-50 text-gray-600 border-gray-200'
                         }`}
                       >
                         <option value="pending">Chờ tư vấn</option>
                         <option value="called">Đang tư vấn</option>
                         <option value="shipped">Đã chốt đơn</option>
                         <option value="cancelled">Không chốt</option>
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
