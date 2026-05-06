"use client";
import { useState, useEffect } from "react";
import { Trash2, Plus, Edit3, Save, X, ChevronRight, LayoutList } from "lucide-react";

export default function AdminSolutions() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    icon: "🩺",
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

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      slug: item.slug,
      icon: item.icon || "🩺",
      painPoint: item.painPoint || "",
      cause: item.cause || "",
      biologicalSolution: item.biologicalSolution || "",
      videoId: item.videoId || ""
    });
    setIsAdding(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/pathologies/${editingId}` : "/api/pathologies";
    const method = editingId ? "PUT" : "POST";
    
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || formData.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").replace(/\s+/g, "-")
        }),
      });
      if (res.ok) {
        fetchSolutions();
        setIsAdding(false);
        setEditingId(null);
        setFormData({ title: "", slug: "", icon: "🩺", painPoint: "", cause: "", biologicalSolution: "", videoId: "" });
      }
    } catch (error) {
      console.error("Failed to save solution", error);
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

  const closeForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: "", slug: "", icon: "🩺", painPoint: "", cause: "", biologicalSolution: "", videoId: "" });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase italic flex items-center gap-2">
             <LayoutList className="text-emerald-600" /> Quản Lý Quy Trình
          </h1>
          <p className="text-gray-500 text-sm font-medium">Cập nhật nội dung hướng dẫn kỹ thuật cho bà con.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#1a5c2a] text-white px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
        >
          <Plus size={18} /> Thêm quy trình mới
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-emerald-100 shadow-2xl mb-12 animate-in fade-in slide-in-from-top-6 duration-500">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-emerald-800 uppercase italic">
               {editingId ? "✍️ Cập nhật phác đồ" : "✨ Tạo phác đồ mới"}
            </h2>
            <button onClick={closeForm} className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-full flex items-center justify-center transition-colors">
               <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Biểu tượng (Emoji)</label>
                <input 
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 p-4 rounded-2xl text-2xl text-center focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Tên phác đồ chuyên sâu</label>
                <input 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ví dụ: Phục hồi cây sau thu hoạch" 
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 p-4 rounded-2xl text-sm font-black focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Đường dẫn (Slug - Tự động)</label>
                  <input 
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="phuc-hoi-cay-sau-thu-hoach"
                    className="w-full bg-gray-100 border-none p-4 rounded-2xl text-xs font-mono text-gray-500 outline-none"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">YouTube Video ID</label>
                  <input 
                    value={formData.videoId}
                    onChange={(e) => setFormData({...formData, videoId: e.target.value})}
                    placeholder="Ví dụ: dQw4w9WgXcQ" 
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 p-4 rounded-2xl text-sm font-bold focus:bg-white transition-all outline-none"
                  />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Tình trạng vườn (Nỗi đau)</label>
              <textarea 
                value={formData.painPoint}
                onChange={(e) => setFormData({...formData, painPoint: e.target.value})}
                placeholder="Mô tả các biểu hiện khiến bà con lo lắng..." 
                className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 p-4 rounded-2xl text-sm font-medium focus:bg-white transition-all outline-none min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Nguyên nhân kỹ thuật</label>
                 <textarea 
                   value={formData.cause}
                   onChange={(e) => setFormData({...formData, cause: e.target.value})}
                   placeholder="Nguyên nhân dẫn đến bệnh lý..." 
                   className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 p-4 rounded-2xl text-sm font-medium focus:bg-white transition-all outline-none min-h-[100px]"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Giải pháp sinh học</label>
                 <textarea 
                   value={formData.biologicalSolution}
                   onChange={(e) => setFormData({...formData, biologicalSolution: e.target.value})}
                   placeholder="Quy trình xử lý chuẩn..." 
                   className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 p-4 rounded-2xl text-sm font-medium focus:bg-white transition-all outline-none min-h-[100px]"
                 />
               </div>
            </div>

            <div className="pt-6 flex gap-4">
              <button type="submit" className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 active:scale-[0.98] transition-all">
                {editingId ? "CẬP NHẬT THAY ĐỔI" : "XÁC NHẬN LƯU PHÁC ĐỒ"}
              </button>
              <button type="button" onClick={closeForm} className="px-8 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                HỦY
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
             <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Thông tin phác đồ</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Video</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {solutions.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl">{item.icon || '🩺'}</div>
                         <div>
                            <div className="text-base font-black text-gray-900 uppercase italic group-hover:text-emerald-700 transition-colors">{item.title}</div>
                            <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Slug: {item.slug}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      {item.videoId ? (
                         <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                            🎥 ĐÃ CÓ
                         </span>
                      ) : (
                         <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            CHƯA CÓ
                         </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="w-10 h-10 bg-white text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                          title="Sửa bài viết"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="w-10 h-10 bg-white text-red-400 border border-red-50 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          title="Xóa bài viết"
                        >
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
