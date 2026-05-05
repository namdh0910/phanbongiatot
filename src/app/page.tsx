"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/utils/analytics";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FlashSale from "@/components/FlashSale";
import ComboSection from "@/components/ComboSection";
import SocialProof from "@/components/SocialProof";
import BrandMarquee from "@/components/BrandMarquee";
import CategorySection from "@/components/CategorySection";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const settings = useSettings();

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        // First try featured products
        let res = await fetch(`${API_BASE_URL}/products?featured=true`, { cache: 'no-store' });
        let data = await res.json();
        let results = Array.isArray(data) ? data : (data?.data || data?.products || []);

        // If no featured products, try all products
        if (results.length === 0) {
          res = await fetch(`${API_BASE_URL}/products`, { cache: 'no-store' });
          data = await res.json();
          results = Array.isArray(data) ? data : (data?.data || data?.products || []);
        }

        setProducts(results.slice(0, 12));
      } catch (err) {
        console.error("Fetch products failed:", err);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();

    // Fetch blogs
    fetch(`${API_BASE_URL}/blogs`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        let results = [];
        if (Array.isArray(data)) results = data;
        else if (data?.blogs) results = data.blogs;
        setBlogs(results.slice(0, 3));
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoadingBlogs(false));
  }, []);

  return (
    <div className="flex flex-col gap-0 md:gap-12 pb-20 bg-white">
      {/* 1. HERO MESSAGE MỚI (CHIẾN LƯỢC GIẢI PHÁP) */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 pt-12 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-emerald-200 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-blue-200 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl">
          <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 animate-fade-in">
            🌿 Chuyên gia phân bón & kỹ thuật
          </div>
          <h1 className="text-3xl md:text-7xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight uppercase italic">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-green-600">Bắt Đúng Bệnh</span><br/>
            <span className="text-emerald-900">Kê Đúng Phân</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Phác đồ dinh dưỡng chuyên sâu cho <span className="text-emerald-700 font-bold">Sầu Riêng, Cà Phê, Hồ Tiêu</span>. 
            Giúp bà con phục hồi vườn bền vững, tiết kiệm chi phí.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a href="https://zalo.me/0773440966" className="group w-full md:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-base shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95">
              <span className="text-xl group-hover:rotate-12 transition-transform">💬</span> Tư Vấn Miễn Phí Zalo
            </a>
            <a href="#giai-phap" className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl font-black text-base text-emerald-700 border-2 border-emerald-100 bg-white/50 hover:bg-white transition-all">
              Xem Phác Đồ
            </a>
          </div>
        </div>
      </section>

      {/* 2. GIẢI PHÁP KỸ THUẬT TỪ CHUYÊN GIA - GRID TIN GỌN */}
      <section id="giai-phap" className="py-12 md:py-20 px-4 scroll-mt-20 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter italic">Danh Mục Giải Pháp</h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <Link href="/giai-phap/sau-rieng-vang-la-thoi-re" className="group bg-gray-50/50 p-4 md:p-6 rounded-3xl border border-transparent hover:border-emerald-200 hover:bg-white hover:shadow-xl transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">🍂</div>
              <h3 className="font-black text-gray-900 text-xs md:text-base mb-1 group-hover:text-emerald-700">Vàng Lá Thối Rễ</h3>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium line-clamp-1">Phục hồi rễ cám</p>
            </Link>

            <Link href="/giai-phap/tuyen-trung-ho-tieu" className="group bg-gray-50/50 p-4 md:p-6 rounded-3xl border border-transparent hover:border-amber-200 hover:bg-white hover:shadow-xl transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-all">🐛</div>
              <h3 className="font-black text-gray-900 text-xs md:text-base mb-1 group-hover:text-amber-700">Trị Tuyến Trùng</h3>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium line-clamp-1">Diệt trứng & ấu trùng</p>
            </Link>

            <Link href="/giai-phap/phuc-hoi-ca-phe" className="group bg-gray-50/50 p-4 md:p-6 rounded-3xl border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">🌱</div>
              <h3 className="font-black text-gray-900 text-xs md:text-base mb-1 group-hover:text-blue-700">Phục Hồi Cây Suy</h3>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium line-clamp-1">Kích rễ bung đọt</p>
            </Link>

            <Link href="/giai-phap/sau-rieng-rung-trai" className="group bg-gray-50/50 p-4 md:p-6 rounded-3xl border border-transparent hover:border-emerald-200 hover:bg-white hover:shadow-xl transition-all flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">🍈</div>
              <h3 className="font-black text-gray-900 text-xs md:text-base mb-1 group-hover:text-emerald-700">Chống Rụng Trái</h3>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium line-clamp-1">Chống sốc & giữ trái</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. HERO PRODUCTS */}
      <section className="container mx-auto mt-4 md:mt-0 max-w-5xl">
        <div className="flex flex-col items-center mb-8 gap-2 px-4 md:px-0 text-center">
          <div className="inline-flex items-center gap-1.5 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
            <span className="animate-pulse">🔥</span> Sản Phẩm Chủ Lực
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase leading-tight m-0">Giải Pháp Tốt Nhất</h2>
          <p className="text-gray-500">Được hàng ngàn nhà vườn tin dùng</p>
        </div>
        
        <div className="px-4 md:px-0">
          {loadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 h-96 skeleton"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-6xl mb-6 opacity-20">📦</div>
              <h3 className="text-xl font-black text-gray-700 mb-2">Đang cập nhật sản phẩm</h3>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 animate-in fade-in duration-700">
              {/* Show all featured/available products for variety focus */}
              {products.map((product: any, i: number) => (
                <div key={i} className="transform hover:-translate-y-2 transition-transform duration-300">
                  <ProductCard product={product} />
                  {/* Additional CTA underneath for quick consultation */}
                  <a href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}?text=${encodeURIComponent(`Tôi quan tâm sản phẩm ${product.name}`)}`} target="_blank" rel="noreferrer" className="block w-full text-center mt-3 bg-[#e8f5e9] text-[#1a5c2a] font-bold py-3 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-200">
                    Nhận Tư Vấn Về Thuốc Này
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BLOG / NEWS */}
      <section className="container mx-auto mt-12 mb-12">
        <div className="flex justify-between items-end mb-4 md:mb-6 border-l-4 border-emerald-600 pl-4 mx-4 md:mx-0">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-gray-900 uppercase m-0">Kiến Thức Nhà Nông</h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Hướng dẫn kỹ thuật chăm sóc vườn hiệu quả</p>
          </div>
          <Link href="/blog" className="text-emerald-600 font-bold hover:underline items-center gap-2 text-xs flex">
            TẤT CẢ <span className="hidden md:inline">BÀI VIẾT</span> <span>▶</span>
          </Link>
        </div>
        
        <div className="px-4 md:px-0">
          {loadingBlogs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full md:w-48 aspect-video skeleton rounded-2xl"></div>
            </div>
          ) : (
            <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible scrollbar-hide animate-in fade-in duration-700">
              {blogs.map((blog: any, i: number) => (
                <Link href={`/blog/${blog.slug}`} key={i} className="flex-shrink-0 w-[85%] md:w-auto group flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all border border-gray-100 overflow-hidden">
                  <div className="aspect-[16/9] bg-emerald-50 relative overflow-hidden">
                      {blog.image ? (
                        <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl opacity-20 bg-emerald-50">📚</div>
                      )}
                  </div>
                  <div className="p-6 md:p-8">
                      <h3 className="font-black text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-4 text-lg md:text-xl leading-tight">{blog.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed font-medium">{blog.excerpt}</p>
                      <div className="flex items-center text-emerald-600 text-xs font-black uppercase tracking-wider group-hover:gap-3 gap-2 transition-all">
                        Đọc tiếp <span>➜</span>
                      </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
