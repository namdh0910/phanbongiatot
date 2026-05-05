"use client";
import { useState, useEffect } from "react";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const getUrgentBadge = (pathology: string) => {
    const urgentTerms = ['vàng lá', 'tuyến trùng', 'thối rễ', 'cấp bách', 'nặng'];
    const isUrgent = urgentTerms.some(term => pathology?.toLowerCase().includes(term));
    
    if (isUrgent) {
      return (
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter animate-pulse border border-red-200">
          ⚠️ Cần tư vấn ngay
        </span>
      );
    }
    return (
      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-blue-100">
        Đang chờ
      </span>
    );
  };

  if (loading) return <div className="animate-pulse py-10 text-center font-bold text-gray-400">Đang tải danh sách yêu cầu...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">Yêu cầu từ nhà vườn</h1>
          <p className="text-gray-500 text-sm font-medium">Danh sách nông dân cần hỗ trợ phác đồ điều trị cây trồng.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <span className="text-2xl">🌱</span>
          <div className="flex flex-col">
            <span className="text-xs font-black text-gray-400 uppercase">Tổng số Lead</span>
            <span className="text-xl font-black text-[#1a5c2a]">{leads.length}</span>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1a5c2a] text-white">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Thời gian</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Nhà vườn</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Liên hệ</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Cây trồng</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest">Tình trạng bệnh</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5">
                   <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">{new Date(lead.createdAt).toLocaleDateString('vi-VN')}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{new Date(lead.createdAt).toLocaleTimeString('vi-VN')}</span>
                   </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 text-[#1a5c2a] rounded-xl flex items-center justify-center font-black">
                      {lead.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-black text-gray-900">{lead.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <a href={`tel:${lead.phone}`} className="text-sm font-black text-blue-600 hover:underline">{lead.phone}</a>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">{lead.cropType || 'Chưa rõ'}</span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm text-gray-700 font-medium line-clamp-1 max-w-[200px]" title={lead.pathology}>
                    {lead.pathology || lead.note || 'Cần tư vấn chung'}
                  </p>
                </td>
                <td className="px-6 py-5 text-center">
                  {getUrgentBadge(lead.pathology)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {leads.map((lead) => (
          <div key={lead._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-lg space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-50 text-[#1a5c2a] rounded-2xl flex items-center justify-center font-black text-lg">
                  {lead.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                   <span className="text-lg font-black text-gray-900 leading-tight">{lead.name}</span>
                   <span className="text-[10px] text-gray-400 font-bold uppercase">{new Date(lead.createdAt).toLocaleString('vi-VN')}</span>
                </div>
              </div>
              {getUrgentBadge(lead.pathology)}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
               <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Liên hệ</span>
                  <a href={`tel:${lead.phone}`} className="text-sm font-black text-blue-600 underline">{lead.phone}</a>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Loại cây</span>
                  <span className="text-sm font-bold text-gray-800">{lead.cropType || 'Chưa rõ'}</span>
               </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
               <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Tình trạng bệnh</span>
               <p className="text-sm text-gray-700 font-medium italic">"{lead.pathology || lead.note || 'Cần tư vấn chung'}"</p>
            </div>
            
            <a 
              href={`https://zalo.me/${lead.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0068FF] text-white py-4 rounded-xl flex items-center justify-center gap-2 font-black text-sm"
            >
               <span>💬</span> NHẮN ZALO TƯ VẤN
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
