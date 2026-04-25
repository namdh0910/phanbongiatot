"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/utils/analytics";
import { useCart } from "@/context/CartContext";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FlashSale from "@/components/FlashSale";
import ComboSection from "@/components/ComboSection";
import SocialProof from "@/components/SocialProof";
import BrandMarquee from "@/components/BrandMarquee";
import CategorySection from "@/components/CategorySection";
import ProductCard from "@/components/ProductCard";

const FALLBACK_PRODUCTS = [
  { _id: '1', name: "Phân bón Acti Rooti", price: 180000, images: ["https://phanbongiatot.com/images/products/rooti.png"], slug: "rooti-4339", category: "Phân bón", rating: 5, reviews_count: 120 },
  { _id: '2', name: "Nemano Tuyến Trùng", price: 180000, images: ["https://phanbongiatot.com/images/products/nemano.png"], slug: "phan-bon-phong-ngua-tuyen-trung-nemano-9989", category: "Phân bón", rating: 5, reviews_count: 85 },
  { _id: '3', name: "NPK Sinh Học", price: 150000, images: ["https://phanbongiatot.com/images/products/npk.png"], slug: "phan-bon-npk-sinh-hoc", category: "Phân bón", rating: 5, reviews_count: 64 },
  { _id: '4', name: "Siêu Lân Đỏ Kích Rễ", price: 220000, images: ["https://phanbongiatot.com/images/products/lan-do.png"], slug: "sieu-lan-do-kich-re", category: "Kích rễ", rating: 5, reviews_count: 92 }
];

const FALLBACK_BLOGS = [
  { _id: 'b1', title: "Bí Quyết Phục Hồi Sầu Riêng Sau Thu Hoạch", excerpt: "Sau một mùa vụ nuôi trái mệt mỏi, cây sầu riêng cần được chăm sóc đặc biệt để phục hồi bộ rễ và cành lá...", createdAt: "2026-04-24T00:00:00Z", slug: "bi-quyet-phuc-hoi-sau-rieng-sau-thu-hoach", image: "" },
  { _id: 'b2', title: "Sự Thật Về Rệp Sáp: Kẻ Sát Nhân Thầm Lặng", excerpt: "Rệp sáp không chỉ hút nhựa mà còn là vật trung gian truyền bệnh virus nguy hiểm. Đây là phác đồ tiêu diệt tận gốc...", createdAt: "2026-04-24T00:00:00Z", slug: "su-that-ve-rep-sap", image: "" }
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    // Fetch products
    fetch(`${API_BASE_URL}/products`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        let results = [];
        if (Array.isArray(data)) results = data;
        else if (data?.products) results = data.products;
        
        if (results.length > 0) setProducts(results.slice(0, 8));
        else setProducts(FALLBACK_PRODUCTS);
      })
      .catch(() => setProducts(FALLBACK_PRODUCTS))
      .finally(() => setLoadingProducts(false));

    // Fetch blogs
    fetch(`${API_BASE_URL}/blogs`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        let results = [];
        if (Array.isArray(data)) results = data;
        else if (data?.blogs) results = data.blogs;

        if (results.length > 0) setBlogs(results.slice(0, 3));
        else setBlogs(FALLBACK_BLOGS);
      })
      .catch(() => setBlogs(FALLBACK_BLOGS))
      .finally(() => setLoadingBlogs(false));
  }, []);

  return (
    <div className="flex flex-col gap-6 md:gap-24 pb-20 bg-[#f5f5f5]">
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
        
        <div className="px-4 md:px-0">
          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                  <div className="aspect-square skeleton rounded-2xl mb-4"></div>
                  <div className="h-4 skeleton rounded-full w-3/4 mb-2"></div>
                  <div className="h-4 skeleton rounded-full w-1/2 mb-4"></div>
                  <div className="h-6 skeleton rounded-full w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 animate-in fade-in duration-700">
              {products.map((product: any, i: number) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          )}
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
        
        <div className="px-4 md:px-0">
          {loadingBlogs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2].map(i => (
                <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                   <div className="w-full md:w-48 aspect-video skeleton rounded-2xl flex-shrink-0"></div>
                   <div className="flex-1 py-2">
                      <div className="h-4 skeleton rounded-full w-1/4 mb-4"></div>
                      <div className="h-6 skeleton rounded-full w-full mb-3"></div>
                      <div className="h-6 skeleton rounded-full w-3/4 mb-4"></div>
                      <div className="h-4 skeleton rounded-full w-1/2"></div>
                   </div>
                </div>
              ))}
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
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-emerald-700 uppercase shadow-sm">
                        Mới nhất
                      </div>
                  </div>
                  <div className="p-6 md:p-8">
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                         <span>📅 {new Date(blog.createdAt).toLocaleDateString('vi-VN')}</span>
                         <span>•</span>
                         <span className="text-emerald-600">Kỹ sư nông nghiệp</span>
                      </div>
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

      <BrandMarquee />
      
      {/* FINAL CTA SECTION */}
      <section className="container mx-auto px-4 mb-20">
        <div className="bg-gradient-to-br from-[#1a5c2a] to-[#2d7a3e] rounded-[3rem] p-10 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
           <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-black mb-8 uppercase italic tracking-tighter">Cần hỗ trợ kỹ thuật ngay?</h2>
              <p className="text-lg md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                 Đừng để sâu bệnh phá hoại vườn cây của anh/chị. Đội ngũ kỹ sư giàu kinh nghiệm luôn sẵn sàng hỗ trợ phác đồ điều trị nhanh nhất.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                 <a href="https://zalo.me/0773440966" target="_blank" className="bg-yellow-400 text-[#1a5c2a] px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-yellow-300 transition-all uppercase tracking-wider active:scale-95">
                    💬 NHẬN TƯ VẤN KỸ THUẬT
                 </a>
                 <a href="tel:0773440966" className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all uppercase tracking-wider active:scale-95">
                    📞 GỌI 0773.440.966
                 </a>
              </div>
           </div>
        </div>
      </section>

      {/* VENDOR RECRUITMENT SECTION */}
      <section className="container mx-auto px-4">
        <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 p-10 md:p-20">
            <div className="inline-block bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
               Cơ hội hợp tác kinh doanh
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight italic uppercase tracking-tighter">
              Trở thành <span className="text-[#ee4d2d]">Đối tác bán hàng</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed font-medium">
              Hãy đăng ký mở gian hàng để tiếp cận hàng ngàn nhà nông trên khắp cả nước. Chúng tôi cung cấp hệ thống quản lý chuyên nghiệp, hỗ trợ marketing và giao hàng toàn quốc.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
               <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-2xl">💰</span>
                  <span className="text-xs font-black uppercase text-gray-600">Miễn phí mở gian hàng</span>
               </div>
               <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-2xl">⚡</span>
                  <span className="text-xs font-black uppercase text-gray-600">Duyệt shop trong 24h</span>
               </div>
            </div>
            <Link href="/kenh-nguoi-ban/dang-nhap" className="inline-block bg-[#1a5c2a] text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-green-100 hover:bg-[#2d7a3e] transition-all uppercase tracking-wider active:scale-95">
              ĐĂNG KÝ HỢP TÁC NGAY
            </Link>
          </div>
          <div className="hidden lg:flex lg:w-1/2 bg-[#f8fafc] items-center justify-center p-20 relative">
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
             <span className="text-[250px] relative z-10 drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer">🏪</span>
          </div>
        </div>
      </section>
    </div>
  );
}
