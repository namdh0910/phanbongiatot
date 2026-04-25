"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/utils/analytics";
import { getSettings } from "@/utils/settings";
import { useCart } from "@/context/CartContext";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FlashSale from "@/components/FlashSale";
import ComboSection from "@/components/ComboSection";
import SocialProof from "@/components/SocialProof";
import BrandMarquee from "@/components/BrandMarquee";
import CategorySection from "@/components/CategorySection";
import ProductCard from "@/components/ProductCard";
import { useSettings } from "@/context/SettingsContext";

export default function Home() {
  const router = useRouter();
  const { addToCart } = useCart();
  const settings = useSettings();
  const [products, setProducts] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    // Fetch products
    fetch(`${API_BASE_URL}/products`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 4)))
      .catch(err => console.error(err));

    // Fetch blogs
    fetch(`${API_BASE_URL}/blogs`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setBlogs(data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  const handleQuickBuy = (product: any) => {
    trackEvent('QuickBuy_Click', { product_name: product.name });
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col gap-6 md:gap-24 pb-20 bg-[#f5f5f5]">
      {/* NEW HERO SECTION */}
      <Hero />
      <TrustBar />
      <FlashSale />
      <ComboSection />
      <CategorySection />

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-4 px-4 md:px-0">
          <div>
            <div className="inline-block bg-[#ee4d2d] text-white px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest mb-2">
              Hot Picks
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase leading-tight m-0">Sản Phẩm Nổi Bật</h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Giải pháp hàng đầu giúp tăng năng suất và bảo vệ vườn cây bền vững</p>
          </div>
          <Link href="/danh-muc/phan-bon" className="text-[#ee4d2d] text-sm font-bold hover:underline flex items-center gap-2 group transition-all">
            XEM TẤT CẢ <span className="group-hover:translate-x-1 transition-transform">▶</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-4 md:px-0">
          {products.map((product: any, i: number) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>
      
      <SocialProof />

      {/* BLOG / NEWS */}
      <section className="container mx-auto">
        <div className="flex justify-between items-end mb-4 md:mb-6 border-l-4 border-emerald-600 pl-4 mx-4 md:mx-0">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-gray-900 uppercase m-0">Kiến Thức Nhà Nông</h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Hướng dẫn kỹ thuật chăm sóc vườn hiệu quả</p>
          </div>
          <Link href="/blog" className="text-emerald-600 font-bold hover:underline items-center gap-2 text-xs flex">
            TẤT CẢ <span className="hidden md:inline">BÀI VIẾT</span> <span>▶</span>
          </Link>
        </div>
        <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide px-4 md:px-0">
          {blogs.map((blog: any, i: number) => (
            <Link href={`/blog/${blog.slug}`} key={i} className="flex-shrink-0 w-[80%] md:w-auto group flex flex-col bg-white rounded-sm shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
               <div className="aspect-[16/9] bg-emerald-50 relative flex items-center justify-center overflow-hidden">
                  <img src={blog.image || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={blog.title} />
               </div>
               <div className="p-3 md:p-5">
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2 text-sm md:text-lg leading-snug">{blog.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed hidden md:block">{blog.excerpt}</p>
               </div>
            </Link>
          ))}
        </div>
      </section>

      <BrandMarquee />
      
      {/* VENDOR RECRUITMENT SECTION */}
      <section className="container mx-auto px-0 md:px-4">
        <div className="bg-white md:rounded-sm shadow-sm border-y md:border border-gray-200 overflow-hidden flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-6 md:p-12">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest mb-3">
              Cơ hội hợp tác kinh doanh
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">
              Trở thành <span className="text-[#ee4d2d]">Đối tác bán hàng</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
              Hãy đăng ký mở gian hàng để tiếp cận hàng ngàn nhà nông trên khắp cả nước. Chúng tôi cung cấp hệ thống quản lý chuyên nghiệp.
            </p>
            <ul className="space-y-2 mb-8 text-xs md:text-sm font-medium text-gray-700">
              <li className="flex items-center gap-3">✅ Không mất phí mở gian hàng</li>
              <li className="flex items-center gap-3">✅ Quy trình duyệt nhanh chóng</li>
            </ul>
            <Link href="/kenh-nguoi-ban/dang-nhap" className="block text-center bg-[#1a5c2a] text-white py-4 md:px-10 rounded-sm font-black text-base md:text-lg shadow-lg hover:bg-[#2d7a3e] transition-transform uppercase tracking-wider">
              Đăng ký ngay
            </Link>
          </div>
          <div className="hidden md:flex md:w-1/2 bg-gray-50 items-center justify-center p-12">
            <div className="relative group cursor-pointer">
               <span className="text-[150px] md:text-[200px] relative z-10 drop-shadow-2xl">🏪</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
