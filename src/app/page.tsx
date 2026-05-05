"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/utils/analytics";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import Hero from "@/components/Hero";
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
      {/* 1. HERO SECTION - MOBILE FIRST FOCUS */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 pt-10 pb-16 px-4 text-center overflow-hidden">
        <div className="relative z-10 container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-6xl font-black text-gray-900 mb-4 leading-[1.1] tracking-tight uppercase">
            Sầu Riêng Vàng Lá?<br/>
            Cà Phê Không Ra Đọt?<br/>
            <span className="text-emerald-700 italic">Chúng Tôi Có Giải Pháp</span>
          </h1>
          <p className="text-gray-600 text-base md:text-xl mb-8 max-w-2xl mx-auto font-bold leading-relaxed">
            Kỹ sư tư vấn miễn phí qua Zalo — 5.000+ nhà vườn Tây Nguyên tin dùng
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <a href="https://zalo.me/0773440966" className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#0068FF] text-white px-8 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 animate-bounce">
              💬 Zalo tư vấn ngay
            </a>
          </div>
        </div>
      </section>

      {/* 2. SECTION MỚI: Cây Trồng Của Bạn Đang Gặp Vấn Đề Gì? */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-xl md:text-3xl font-black text-gray-800 uppercase mb-8 italic">Cây Trồng Của Bạn Đang Gặp Vấn Đề Gì?</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/tim-kiem?q=sau+rieng" className="flex flex-col items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all active:scale-95">
              <span className="text-3xl md:text-5xl">🌳</span>
              <span className="text-[10px] md:text-sm font-black uppercase text-emerald-800">Sầu Riêng</span>
            </Link>
            <Link href="/tim-kiem?q=ca+phe" className="flex flex-col items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 hover:shadow-lg transition-all active:scale-95">
              <span className="text-3xl md:text-5xl">☕</span>
              <span className="text-[10px] md:text-sm font-black uppercase text-amber-800">Cà Phê</span>
            </Link>
            <Link href="/tim-kiem?q=ho+tieu" className="flex flex-col items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all active:scale-95">
              <span className="text-3xl md:text-5xl">🌿</span>
              <span className="text-[10px] md:text-sm font-black uppercase text-blue-800">Hồ Tiêu</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SECTION VẤN ĐỀ PHỔ BIẾN */}
      <section className="py-12 px-4 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase mb-8 border-l-4 border-[#1a5c2a] pl-4">Vấn đề phổ biến tại vườn</h2>
          <div className="space-y-4">
            {[
              { title: "Sầu riêng vàng lá gốc — tuyến trùng", desc: "Phác đồ đặc trị tuyến trùng bảo vệ rễ tơ", icon: "🍂" },
              { title: "Cà phê không ra đọt — rễ yếu", desc: "Kích rễ bung đọt xanh lá thần tốc", icon: "🌱" },
              { title: "Hồ tiêu chết dây — nấm rễ", desc: "Xử lý nấm phytophthora và phục hồi dây", icon: "🥀" },
              { title: "Sầu riêng rụng trái non", desc: "Chống sốc nước và giữ trái chắc chắn", icon: "🍈" },
              { title: "Cà phê vàng lá mùa khô", desc: "Dưỡng chất chống hạn và giữ độ ẩm đất", icon: "☀️" },
            ].map((item, idx) => (
              <Link key={idx} href={`/tim-kiem?q=${encodeURIComponent(item.title)}`} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="font-black text-gray-900 text-sm md:text-base group-hover:text-emerald-700 transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-600 font-medium">{item.desc}</p>
                </div>
                <span className="text-gray-300 text-lg group-hover:translate-x-1 transition-transform">▶</span>
              </Link>
            ))}
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
          <p className="text-gray-700">Được hàng ngàn nhà vườn tin dùng</p>
        </div>
        
        <div className="px-4 md:px-0">
          {loadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 h-96"></div>
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
            <p className="text-gray-700 text-xs md:text-sm mt-1">Hướng dẫn kỹ thuật chăm sóc vườn hiệu quả</p>
          </div>
          <Link href="/blog" className="text-emerald-600 font-bold hover:underline items-center gap-2 text-xs flex">
            TẤT CẢ <span className="hidden md:inline">BÀI VIẾT</span> <span>▶</span>
          </Link>
        </div>
        
        <div className="px-4 md:px-0">
          {loadingBlogs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full md:w-48 aspect-video rounded-2xl bg-gray-50"></div>
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
                      <p className="text-sm text-gray-700 line-clamp-2 mb-6 leading-relaxed font-medium">{blog.excerpt}</p>
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
