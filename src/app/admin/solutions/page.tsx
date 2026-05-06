"use client";
import { useState, useEffect } from "react";
import { Trash2, Plus, Edit3, Save, X, ChevronRight } from "lucide-react";

export default function AdminSolutions() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newSolution, setNewSolution] = useState({
    title: "",
    slug: "",
    painPoint: "",
    cause: "",
    biologicalSolution: "",
    videoId: ""
  });

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pathologies");
      const data = await res.json();
      setSolutions(data.pathologies || []);
    } catch (error) {
      console.error("Failed to fetch solutions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/pathologies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newSolution,
          slug: newSolution.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").replace(/\s+/g, "-")
        }),
      });
      if (res.ok) {
        fetchSolutions();
        setIsAdding(false);
        setNewSolution({ title: "", slug: "", painPoint: "", cause: "", biologicalSolution: "", videoId: "" });
      }
    } catch (error) {
      console.error("Failed to add solution", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xác nhận xóa phác đồ này?")) return;
    try {
      const res = await fetch(`/api/pathologies/${id}`, { method: "DELETE" });
      if (res.ok) fetchSolutions();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase italic">Quản Lý Phác Đồ</h1>
          <p className="text-gray-500 text-sm">Quản lý các giải pháp kỹ thuật và phác đồ điều trị.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#1a5c2a] text-white px-4 py-2 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
        >
          <Plus size={18} /> THÊM PHÁC ĐỒ MỚI
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xl mb-8 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-emerald-800 uppercase italic">Thêm Phác Đồ Mới</h2>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
          </div>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Tên phác đồ (Tiêu đề)</label>
                <input 
                  required
                  value={newSolution.title}
                  onChange={(e) => setNewSolution({...newSolution, title: e.target.value})}
                  placeholder="Ví dụ: Xử lý vàng lá thối rễ" 
                  className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">YouTube Video ID (Nếu có)</label>
                <input 
                  value={newSolution.videoId}
                  onChange={(e) => setNewSolution({...newSolution, videoId: e.target.value})}
                  placeholder="ID: dQw4w9WgXcQ" 
                  className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Vấn đề / Nỗi đau của bà con</label>
              <textarea 
                value={newSolution.painPoint}
                onChange={(e) => setNewSolution({...newSolution, painPoint: e.target.value})}
                placeholder="Mô tả các biểu hiện khiến bà con lo lắng..." 
                className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 min-h-[80px]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Nguyên nhân chính</label>
              <textarea 
                value={newSolution.cause}
                onChange={(e) => setNewSolution({...newSolution, cause: e.target.value})}
                placeholder="Nguyên nhân kỹ thuật dẫn đến bệnh lý..." 
                className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 min-h-[80px]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Giải pháp sinh học</label>
              <textarea 
                value={newSolution.biologicalSolution}
                onChange={(e) => setNewSolution({...newSolution, biologicalSolution: e.target.value})}
                placeholder="Hướng giải quyết bằng công nghệ sinh học..." 
                className="w-full bg-gray-50 border-none p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 min-h-[80px]"
              />
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">
                LƯU PHÁC ĐỒ
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 font-bold animate-pulse">ĐANG TẢI DỮ LIỆU...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Phác đồ</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Slug</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400">Video</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {solutions.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-black text-gray-900 uppercase italic">{item.title}</div>
                      <div className="text-[10px] text-gray-400 font-medium line-clamp-1 max-w-xs">{item.painPoint}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-500">{item.slug}</td>
                    <td className="px-6 py-4 italic text-xs font-bold text-emerald-600">
                      {item.videoId ? "✅ Đã có video" : "❌ Chưa có"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
