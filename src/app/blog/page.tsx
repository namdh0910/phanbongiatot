"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { API_BASE_URL } from '@/utils/api';

const CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: '📖' },
  { id: 'sau-rieng', label: 'Sầu riêng', icon: '🌳' },
  { id: 'ca-phe', label: 'Cà phê', icon: '☕' },
  { id: 'tieu', label: 'Hồ tiêu', icon: '🌿' },
  { id: 'lua', label: 'Lúa', icon: '🌾' },
  { id: 'rau-mau', label: 'Rau màu', icon: '🥬' },
  { id: 'phong-benh', label: 'Phòng bệnh', icon: '🛡️' },
  { id: 'kich-re', label: 'Kích rễ', icon: '🌱' },
];

export default function BlogIndex() {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/blogs`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      // Fallback data
      const fallback = [
        { title: "Cách nhận biết sầu riêng bị vàng lá thối rễ", excerpt: "Vàng lá thối rễ là căn bệnh nguy hiểm số 1 trên cây sầu riêng. Bài viết hướng dẫn chi tiết cách nhận biết từ sớm...", createdAt: new Date().toISOString(), image: "", slug: "cach-nhan-biet-sau-rieng-vang-la-thoi-re", tags: ["sau-rieng", "phong-benh"] },
        { title: "Tuyến trùng rễ cà phê: Kẻ giết người thầm lặng", excerpt: "Nhiều nhà nông nhầm lẫn tuyến trùng rễ với thiếu phân. Dưới đây là 3 dấu hiệu đặc trưng nhất để nhận diện tuyến trùng trên cây cà phê.", createdAt: new Date().toISOString(), image: "", slug: "tuyen-trung-re-ca-phe", tags: ["ca-phe", "phong-benh"] },
        { title: "Kỹ thuật bón phân giai đoạn ra hoa đậu trái", excerpt: "Bón phân không đúng cách lúc ra hoa sẽ làm rụng bông, rụng trái non hàng loạt. Bí quyết là sử dụng Canxi Bo và hạn chế đạm...", createdAt: new Date().toISOString(), image: "", slug: "ky-thuat-bon-phan-ra-hoa", tags: ["kich-re"] }
      ];
      setPosts(fallback);
      setFilteredPosts(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.tags?.includes(activeTab) || p.category === activeTab));
    }
    setVisibleCount(6);
  }, [activeTab, posts]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase italic mb-4">
            Kiến Thức Nhà Nông
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-sm md:text-base">
            Chia sẻ kỹ thuật canh tác bền vững, phác đồ điều trị bệnh cây và kinh nghiệm từ các kỹ sư nông nghiệp hàng đầu.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 overflow-x-auto no-scrollbar flex gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === cat.id 
                ? 'bg-[#1a5c2a] text-white shadow-lg shadow-green-100' 
                : 'bg-white text-gray-500 border border-gray-100 hover:border-green-200 hover:text-green-600'
              }`}
            >
              <span className="mr-2">{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 max-w-7xl">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="bg-gray-100 h-80 rounded-3xl animate-pulse"></div>
             ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
             <div className="text-7xl mb-6 opacity-20">📚</div>
             <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Chưa có bài viết trong danh mục này</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(0, visibleCount).map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
                  {/* Image Layout */}
                  <div className="hidden lg:block relative aspect-[16/10] overflow-hidden bg-gray-100">
                     {post.image ? (
                       <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={post.title} />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-6xl opacity-20 bg-emerald-50">📖</div>
                     )}
                     <div className="absolute top-4 left-4 bg-[#1a5c2a] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                        Mới nhất
                     </div>
                  </div>

                  {/* Mobile Layout (Horizontal) / Desktop Info */}
                  <div className="flex flex-row lg:flex-col flex-1 p-5 md:p-6 lg:p-8 gap-4 md:gap-6 lg:gap-0">
                     {/* Mobile Image */}
                     <div className="w-28 h-28 md:w-40 md:h-40 lg:hidden flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
                        {post.image ? <img src={post.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl opacity-20">📚</div>}
                     </div>

                     <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                           <span className="text-emerald-600">Kiến thức</span>
                           <span className="opacity-30">|</span>
                           <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-gray-900 group-hover:text-[#1a5c2a] transition-colors leading-tight mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm font-medium line-clamp-2 leading-relaxed mb-6 hidden md:block">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                           <span className="text-[#1a5c2a] font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                              Đọc tiếp <span className="text-lg">→</span>
                           </span>
                           {post.tags?.[0] && (
                             <span className="text-[9px] bg-gray-50 text-gray-400 px-2 py-1 rounded font-bold uppercase border border-gray-100">
                               #{post.tags[0]}
                             </span>
                           )}
                        </div>
                     </div>
                  </div>
                </Link>
              ))}
            </div>

            {visibleCount < filteredPosts.length && (
              <div className="mt-16 text-center">
                <button 
                  onClick={() => setVisibleCount(v => v + 6)}
                  className="bg-white border-2 border-[#1a5c2a] text-[#1a5c2a] px-12 py-4 rounded-2xl font-black text-sm hover:bg-green-50 transition-all shadow-xl shadow-green-100 active:scale-95"
                >
                  XEM THÊM BÀI VIẾT ➜
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
