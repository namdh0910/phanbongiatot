"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";

export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Kỹ thuật canh tác",
    crops: [] as string[],
    author: "Kỹ sư Phân bón",
    seoTitle: "",
    seoDescription: ""
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            excerpt: data.excerpt || "",
            content: data.content || "",
            image: data.image || "",
            category: data.category || "Kỹ thuật canh tác",
            crops: data.crops || [],
            author: data.author || "Kỹ sư Phân bón",
            seoTitle: data.seoTitle || "",
            seoDescription: data.seoDescription || ""
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push("/admin/blog");
      } else {
        const error = await res.json();
        alert(error.message || "Lỗi khi cập nhật bài viết");
      }
    } catch (err) {
      alert("Lỗi kết nối");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="p-20 text-center font-bold">Đang tải dữ liệu bài viết...</div>;
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-8 ml-64">
          <div className="flex items-center gap-4 mb-8">
             <button onClick={() => router.back()} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">←</button>
             <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Chỉnh sửa bài viết</h1>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                  <div>
                     <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tiêu đề bài viết *</label>
                     <input 
                       required 
                       className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 text-lg font-black outline-none focus:bg-white focus:border-[#1a5c2a] transition-all"
                       value={formData.title}
                       onChange={e => setFormData({...formData, title: e.target.value})}
                     />
                  </div>

                  <div>
                     <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tóm tắt ngắn (Excerpt) *</label>
                     <textarea 
                       required 
                       className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:bg-white focus:border-[#1a5c2a] transition-all h-24 resize-none"
                       value={formData.excerpt}
                       onChange={e => setFormData({...formData, excerpt: e.target.value})}
                     />
                  </div>

                  <div>
                     <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nội dung chi tiết * (HTML Support)</label>
                     <textarea 
                       required 
                       className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:bg-white focus:border-[#1a5c2a] transition-all h-[500px] font-mono"
                       value={formData.content}
                       onChange={e => setFormData({...formData, content: e.target.value})}
                     />
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-4">Phân loại & SEO</h3>
                  
                  <div>
                     <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Đường dẫn (Slug)</label>
                     <input 
                       className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-gray-500 outline-none"
                       value={formData.slug}
                       readOnly
                     />
                  </div>

                  <div>
                     <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Hình ảnh đại diện (URL)</label>
                     <input 
                       className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-medium outline-none"
                       value={formData.image}
                       onChange={e => setFormData({...formData, image: e.target.value})}
                     />
                  </div>

                  <div className="pt-4 border-t border-gray-50">
                     <h4 className="text-[10px] font-black text-[#1a5c2a] uppercase tracking-widest mb-4">Cấu hình SEO</h4>
                     <div className="space-y-4">
                        <div>
                           <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">SEO Title</label>
                           <input 
                              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1a5c2a]"
                              value={formData.seoTitle}
                              onChange={e => setFormData({...formData, seoTitle: e.target.value})}
                              placeholder="Tiêu đề hiển thị trên Google..."
                           />
                        </div>
                        <div>
                           <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">SEO Description</label>
                           <textarea 
                              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#1a5c2a] h-20 resize-none"
                              value={formData.seoDescription}
                              onChange={e => setFormData({...formData, seoDescription: e.target.value})}
                              placeholder="Mô tả hiển thị trên Google..."
                           />
                        </div>
                     </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50">
                     <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Chuyên mục</label>
                     <select 
                       className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold outline-none"
                       value={formData.category}
                       onChange={e => setFormData({...formData, category: e.target.value})}
                     >
                       <option>Kỹ thuật canh tác</option>
                       <option>Phòng trừ sâu bệnh</option>
                       <option>Kiến thức phân bón</option>
                       <option>Kinh nghiệm nhà vườn</option>
                     </select>
                  </div>

                  <div>
                     <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cây trồng (Tags)</label>
                     <div className="flex flex-wrap gap-2">
                        {['Sầu riêng', 'Cà phê', 'Hồ tiêu', 'Lúa', 'Cây ăn trái'].map(crop => (
                          <button 
                            key={crop}
                            type="button"
                            onClick={() => {
                              const newCrops = formData.crops.includes(crop) 
                                ? formData.crops.filter(c => c !== crop) 
                                : [...formData.crops, crop];
                              setFormData({...formData, crops: newCrops});
                            }}
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${
                              formData.crops.includes(crop) 
                              ? 'bg-[#1a5c2a] text-white' 
                              : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                            }`}
                          >
                            {crop}
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50">
                     <button 
                       type="submit" 
                       disabled={isLoading}
                       className="w-full bg-[#1a5c2a] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-100 hover:bg-[#2d7a3e] transition-all active:scale-95 disabled:opacity-50"
                     >
                       {isLoading ? "ĐANG LƯU..." : "CẬP NHẬT BÀI VIẾT"}
                     </button>
                  </div>
               </div>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}
