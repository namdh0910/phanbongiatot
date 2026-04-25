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
import Testimonials from "@/components/Testimonials";
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
    <div className="flex flex-col gap-10 md:gap-24 pb-20 bg-[#f5f5f5]">
      {/* NEW HERO SECTION */}
      <Hero />
      <TrustBar />
      <FlashSale />
      <ComboSection />
      <CategorySection />

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="inline-block bg-[#ee4d2d] text-white px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest mb-3">
              Hot Picks
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase leading-tight">Sản Phẩm Nổi Bật</h2>
            <p className="text-gray-500 text-sm mt-2">Giải pháp hàng đầu giúp tăng năng suất và bảo vệ vườn cây bền vững</p>
          </div>
          <Link href="/danh-muc/phan-bon" className="text-[#ee4d2d] font-bold hover:underline flex items-center gap-2 group transition-all">
            XEM TẤT CẢ <span className="group-hover:translate-x-1 transition-transform">▶</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product: any, i: number) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>
      
      <Testimonials />

      {/* BLOG / NEWS */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-6 border-l-4 border-emerald-600 pl-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase">Kiến Thức Nhà Nông</h2>
            <p className="text-gray-500 text-sm mt-1">Hướng dẫn kỹ thuật chăm sóc vườn hiệu quả</p>
          </div>
          <Link href="/blog" className="text-emerald-600 font-bold hover:underline items-center gap-2 text-sm flex">
            TẤT CẢ BÀI VIẾT <span>▶</span>
          </Link>
        </div>
        <div className="flex overflow-x-auto pb-6 gap-4 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide">
          {blogs.map((blog: any, i: number) => (
            <Link href={`/blog/${blog.slug}`} key={i} className="flex-shrink-0 w-[85%] md:w-auto group flex flex-col bg-white rounded-sm shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
               <div className="aspect-[16/9] bg-emerald-50 relative flex items-center justify-center overflow-hidden">
                  <img src={blog.image || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={blog.title} />
               </div>
               <div className="p-5">
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-3 text-lg leading-snug">{blog.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{blog.excerpt}</p>
               </div>
            </Link>
          ))}
        </div>
      </section>

      <BrandMarquee />
      
      {/* VENDOR RECRUITMENT SECTION */}
      <section className="container mx-auto px-4">
        <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest mb-4">
              Cơ hội hợp tác kinh doanh
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
              Trở thành <span className="text-[#ee4d2d]">Đối tác bán hàng</span> cùng Phân Bón Giá Tốt
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Anh/chị đang là đại lý vật tư nông nghiệp? Hãy đăng ký mở gian hàng để tiếp cận hàng ngàn nhà nông trên khắp cả nước. Chúng tôi cung cấp hệ thống quản lý chuyên nghiệp, minh bạch và hiệu quả.
            </p>
            <ul className="space-y-3 mb-10 text-sm font-medium text-gray-700">
              <li className="flex items-center gap-3">✅ Không mất phí mở gian hàng</li>
              <li className="flex items-center gap-3">✅ Quy trình duyệt sản phẩm nhanh chóng</li>
              <li className="flex items-center gap-3">✅ Hệ thống báo cáo đơn hàng thông minh</li>
            </ul>
            <Link href="/kenh-nguoi-ban/dang-nhap" className="inline-block bg-[#1a5c2a] text-white px-10 py-4 rounded-sm font-black text-lg shadow-lg hover:bg-[#2d7a3e] transition-transform hover:-translate-y-1 uppercase tracking-wider">
              Đăng ký bán hàng ngay
            </Link>
          </div>
          <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-12">
            <div className="relative group cursor-pointer">
               <span className="text-[150px] md:text-[200px] relative z-10 drop-shadow-2xl">🏪</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
