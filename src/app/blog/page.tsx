"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, BookOpen, Clock, ChevronRight, Video } from "lucide-react";
import { API_BASE_URL } from '@/utils/api';

const BLOG_CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: '📖' },
  { id: 'nhat-ky-phuc-hoi', label: 'Nhật ký phục hồi vườn', icon: '🌳', desc: 'Hành trình thực tế cứu vườn từ kỹ sư' },
  { id: 'moi-chat-mot-van-de', label: 'Mỗi chất - Một vấn đề', icon: '🎥', desc: 'Video giải phẫu kỹ thuật dinh dưỡng' },
  { id: 'cam-nang-ky-thuat', label: 'Cẩm nang kỹ thuật', icon: '📚', desc: 'Phân tích sâu bệnh lý chuẩn SEO' },
];

export default function BlogIndex() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/blogs`);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      const postsData = (data.blogs || data).map((p: any) => ({
        ...p,
        type: p.videoUrl ? 'video' : 'article',
        categorySlug: p.category ? p.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/\s+/g, "-") : 'cam-nang-ky-thuat'
      }));
      setPosts(postsData);
    } catch (error) {
      // Fallback data with realistic types
      const fallback = [
        { 
          title: "Hành trình phục hồi 5ha Sầu riêng suy kiệt tại Đắk Nông", 
          excerpt: "Từ vườn cây vàng lá trơ cành, sau 3 tháng áp dụng phác đồ phục hồi sinh học rễ đã bung trắng xóa.", 
          createdAt: new Date().toISOString(), 
          image: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg", 
          slug: "nhat-ky-phuc-hoi-dak-nong", 
          type: 'article', 
          category: 'Nhật ký phục hồi vườn',
          categorySlug: 'nhat-ky-phuc-hoi'
        },
        { 
          title: "Video: Tại sao rễ tơ bị cháy khi bón phân hóa học quá liều?", 
          excerpt: "Kỹ sư Nam giải thích cơ chế thẩm thấu ngược làm cháy lông hút rễ tơ và cách khắc phục bằng Humic.", 
          createdAt: new Date().toISOString(), 
          image: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989073/phanbongiatot/y6imlcebopgmarsfpp8e.jpg", 
          slug: "tai-sao-chay-re-to", 
          type: 'video', 
          videoUrl: 'https://youtube.com/embed/8Idd0GyGA-4',
          category: 'Mỗi chất - Một vấn đề',
          categorySlug: 'moi-chat-mot-van-de'
        },
        { 
          title: "Phác đồ 3 bước trị dứt điểm Tuyến trùng sưng rễ", 
          excerpt: "Tuyến trùng là nỗi ám ảnh của nhà vườn. Bài viết này phân tích sâu về vòng đời và cách tiêu diệt bằng Nemano.", 
          createdAt: new Date().toISOString(), 
          image: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989048/phanbongiatot/jpjgjjvfg7pglnnh0a1a.jpg", 
          slug: "phac-do-tri-tuyen-trung", 
          type: 'article', 
          category: 'Cẩm nang kỹ thuật',
          categorySlug: 'cam-nang-ky-thuat'
        }
      ];
      setPosts(fallback);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(p => p.categorySlug === activeTab);

  const featuredPost = posts[0];

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* 1. Enhanced Header */}
      <section className="pt-32 pb-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block bg-emerald-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
             📖 Thư viện kỹ thuật đa phương tiện
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">
            Kiến Thức <span className="text-emerald-500">Nhà Nông</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Học kỹ thuật qua video thực tế và phác đồ điều trị từ các kỹ sư thực chiến tại vườn.
          </p>
        </div>
      </section>

      {/* 2. Featured Post - Big Hero Layout */}
      {!loading && posts.length > 0 && activeTab === 'all' && (
        <section className="container mx-auto px-4 -mt-10 mb-20 relative z-20">
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row min-h-[500px]">
              <div className="lg:w-3/5 relative overflow-hidden">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {featuredPost.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                     <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center text-[#1a5c2a] shadow-2xl animate-pulse">
                        <Play fill="currentColor" size={32} />
                     </div>
                  </div>
                )}
                <div className="absolute top-6 left-6 flex gap-2">
                   <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Nổi bật</span>
                   <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      {featuredPost.type === 'video' ? <Video size={12} /> : <BookOpen size={12} />}
                      {featuredPost.type === 'video' ? 'Video' : 'Bài viết'}
                   </span>
                </div>
              </div>
              <div className="lg:w-2/5 p-10 md:p-16 flex flex-col justify-center">
                <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-xs mb-4">{featuredPost.category}</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6 group-hover:text-emerald-700 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-500 text-lg mb-8 font-medium leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
                   <span className="flex items-center gap-2"><Clock size={16} /> {new Date(featuredPost.createdAt).toLocaleDateString('vi-VN')}</span>
                   <span className="text-[#1a5c2a] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Xem ngay <ChevronRight size={18} /></span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 3. Category Streams */}
      <section className="container mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`w-full md:w-auto px-8 py-5 rounded-[2rem] text-left transition-all relative overflow-hidden group
                ${activeTab === cat.id 
                  ? 'bg-[#1a5c2a] text-white shadow-xl shadow-emerald-100 scale-105' 
                  : 'bg-gray-50 text-gray-900 border border-gray-100 hover:bg-gray-100'}`}
            >
               <div className="flex items-center gap-4 relative z-10">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                     <h3 className="font-black uppercase tracking-tight text-sm">{cat.label}</h3>
                     <p className={`text-[10px] font-bold ${activeTab === cat.id ? 'text-emerald-200' : 'text-gray-400'}`}>{cat.desc || 'Tất cả bài viết'}</p>
                  </div>
               </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Article Grid */}
      <section className="container mx-auto px-4 max-w-7xl">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-96 bg-gray-100 rounded-[2.5rem] animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPosts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6 shadow-sm group-hover:shadow-xl transition-all">
                   <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                   
                   {/* Badge Type */}
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-900 shadow-sm flex items-center gap-1.5">
                      {post.type === 'video' ? <Play size={10} fill="currentColor" /> : <BookOpen size={10} />}
                      {post.type === 'video' ? 'Video thực chiến' : 'Bài kỹ thuật'}
                   </div>

                   {post.type === 'video' && (
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#1a5c2a] shadow-2xl">
                           <Play fill="currentColor" size={24} />
                        </div>
                     </div>
                   )}
                </div>
                
                <div className="px-2">
                   <span className="text-emerald-600 font-black text-[9px] uppercase tracking-widest mb-2 block">{post.category}</span>
                   <h3 className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors leading-tight mb-4 line-clamp-2">
                      {post.title}
                   </h3>
                   <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed mb-6">
                      {post.excerpt}
                   </p>
                   <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                         <Clock size={14} /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="text-gray-900 font-black text-[10px] uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                         Xem ngay ➔
                      </span>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
