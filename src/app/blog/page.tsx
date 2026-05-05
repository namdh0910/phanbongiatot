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
      const postsData = data.blogs || data;
      setPosts(postsData);
      setFilteredPosts(postsData);
    } catch (error) {
      // Fallback data
      const fallback = [
        { title: "Cách phục hồi sầu riêng sau thu hoạch: Không suy cây, mùa sau trúng lớn", excerpt: "Cơi đọt là 'nhà máy' sản xuất năng lượng cho cây. Hướng dẫn 4 bước phục hồi dàn rễ và kéo cơi đọt mập mạp.", createdAt: new Date().toISOString(), image: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg", slug: "phuc-hoi-sau-rieng-sau-thu-hoach", tags: ["sau-rieng", "phong-benh"] },
        { title: "Tại sao rệp sáp tái phát thần tốc? Phác đồ 3-3-5 diệt tận gốc", excerpt: "Rệp sáp có lớp sáp bảo vệ cực kỳ lì lợm. Bí quyết là phá vỡ lớp giáp sáp và diệt sạch túi trứng ẩn nấp.", createdAt: new Date().toISOString(), image: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989073/phanbongiatot/y6imlcebopgmarsfpp8e.jpg", slug: "diet-rep-sap-tan-goc-v10", tags: ["sau-rieng", "ca-phe"] },
        { title: "Cà phê rụng trái non hàng loạt - Giải mã 'tử huyệt' dinh dưỡng", excerpt: "Đừng chỉ đổ lỗi cho thời tiết. Cây cà phê rụng trái thường do thiếu hụt Canxi-Bo và cạnh tranh dinh dưỡng cục bộ.", createdAt: new Date().toISOString(), image: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989048/phanbongiatot/jpjgjjvfg7pglnnh0a1a.jpg", slug: "ca-phe-rung-trai-non-v10", tags: ["ca-phe"] }
      ];
      setPosts(fallback);
      setFilteredPosts(fallback);
    } finally {
      setLoading(false);
    }
  };

  const toSlug = (str: string) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-").replace(/-+/g, "-");

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => 
        p.tags?.some((t: string) => toSlug(t).includes(activeTab)) || 
        (p.category && toSlug(p.category) === activeTab) ||
        (p.title && toSlug(p.title).includes(activeTab))
      ));
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
          <p className="text-gray-700 font-medium max-w-2xl mx-auto text-sm md:text-base">
            Chia sẻ kỹ thuật canh tác bền vững, phác đồ điều trị bệnh cây và kinh nghiệm từ các kỹ sư nông nghiệp hàng đầu.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 overflow-x-auto no-scrollbar flex gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === cat.id 
                ? 'bg-[#1a5c2a] text-white shadow-lg shadow-green-100' 
                : 'bg-white text-gray-700 border border-gray-100 hover:border-green-200 hover:text-green-600'
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
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
             <div className="text-7xl mb-6 opacity-20">📚</div>
             <p className="text-gray-600 font-black uppercase tracking-widest text-xs">Danh mục đang được cập nhật thêm bài viết...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {filteredPosts.slice(0, visibleCount).map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 md:hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
                  {/* Image Layout */}
                  <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-100">
                     {post.image ? (
                       <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={post.title} />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-4xl md:text-6xl opacity-20 bg-emerald-50">📖</div>
                     )}
                     <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#1a5c2a] text-white px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest shadow-lg">
                        Mới
                     </div>
                  </div>

                  {/* Info Layout */}
                  <div className="flex flex-col flex-1 p-3 md:p-6 lg:p-8">
                      <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2 md:mb-3">
                         <span className="text-emerald-700">Kiến thức</span>
                         <span className="opacity-30">|</span>
                         <span className="hidden md:inline">{new Date(post.createdAt || Date.now()).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <h3 className="text-sm md:text-xl font-black text-gray-900 group-hover:text-[#1a5c2a] transition-colors leading-tight mb-2 md:mb-4 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 text-xs md:text-sm font-medium line-clamp-2 leading-relaxed mb-4 hidden md:block">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                         <span className="text-[#1a5c2a] font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-1 md:gap-2 group-hover:gap-3 transition-all">
                            Xem ngay <span className="text-sm md:text-lg">→</span>
                         </span>
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
