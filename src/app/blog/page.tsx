"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Play, BookOpen, Clock } from "lucide-react";
import { API_BASE_URL } from '@/utils/api';
import { useSearchParams } from "next/navigation";

function BlogContent() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('category') || 'all';

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
        categorySlug: p.category ? p.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").replace(/\s+/g, "-") : 'cam-nang-ky-thuat'
      }));
      setPosts(postsData);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(p => p.categorySlug === activeTab);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Header Section - Compacted for Mobile */}
      <section className="pt-20 md:pt-32 pb-12 md:pb-20 bg-[#0d2a1c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4">
             📖 THƯ VIỆN KỸ THUẬT NÔNG NGHIỆP
          </span>
          <h1 className="text-3xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
            Kiến Thức <span className="text-emerald-500">Nhà Nông</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto font-medium opacity-80">
            Học kỹ thuật qua video thực tế và phác đồ điều trị chuyên sâu.
          </p>
        </div>
      </section>

      {/* 2. Article Grid - 2 Columns on Mobile */}
      <section className="container mx-auto px-2 md:px-4 max-w-7xl -mt-6 md:mt-12 relative z-20">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-12">
            {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-[4/5] bg-gray-100 rounded-2xl md:rounded-[2.5rem] animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-12">
            {filteredPosts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-2xl md:rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative aspect-square md:aspect-[16/10] overflow-hidden bg-gray-100">
                   <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                   
                   {/* Badge Type */}
                   <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/60 backdrop-blur-md px-2 py-0.5 md:py-1 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-widest text-white shadow-sm flex items-center gap-1 md:gap-1.5">
                      {post.type === 'video' ? <Play size={8} fill="currentColor" /> : <BookOpen size={8} />}
                      {post.type === 'video' ? 'Video' : 'Bài viết'}
                   </div>

                   {post.type === 'video' && (
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-[#1a5c2a] shadow-2xl">
                           <Play fill="currentColor" size={20} />
                        </div>
                     </div>
                   )}
                </div>
                
                <div className="p-3 md:p-8 flex flex-col flex-1">
                   <span className="text-emerald-600 font-black text-[7px] md:text-[10px] uppercase tracking-widest mb-1 md:mb-2 block">{post.category}</span>
                   <h3 className="text-xs md:text-2xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors leading-tight mb-2 md:mb-4 line-clamp-2 md:line-clamp-3">
                      {post.title}
                   </h3>
                   <p className="hidden md:block text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed mb-6">
                      {post.excerpt}
                   </p>
                   <div className="mt-auto flex items-center justify-between pt-2 md:pt-4 border-t border-gray-50">
                      <span className="text-gray-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 md:gap-1.5">
                         <Clock size={12} /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="text-gray-900 font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform">
                         ➔
                      </span>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {filteredPosts.length === 0 && !loading && (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-bold uppercase tracking-widest">Không tìm thấy bài viết nào trong danh mục này.</p>
            <Link href="/blog" className="mt-4 inline-block text-emerald-600 font-black uppercase text-xs border-b-2 border-emerald-600">Xem tất cả bài viết</Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default function BlogIndex() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <BlogContent />
    </Suspense>
  );
}
