"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/utils/analytics";
import { getSettings } from "@/utils/settings";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});

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

    // Fetch settings
    getSettings().then(setSettings);
  }, []);

  const handleQuickBuy = (product: any) => {
    trackEvent('QuickBuy_Click', { product_name: product.name });
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col gap-10 md:gap-24 pb-20 bg-[#f5f5f5]">
      {/* HERO SECTION */}
      <section 
        className="relative w-full h-[200px] md:h-[600px] flex items-center overflow-hidden"
        style={{ backgroundColor: settings.primaryColor || '#0d2a1c' }}
      >
        {settings.heroBanner && (
           <img src={settings.heroBanner} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" alt="Banner" />
        )}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="w-full h-full bg-gradient-to-r from-black/60 to-transparent mix-blend-multiply" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-start gap-6">
          <div className="bg-[#fce015] text-gray-900 px-4 py-1.5 rounded-sm font-black text-xs tracking-widest uppercase shadow-lg">
            GIẢI PHÁP NÔNG NGHIỆP HIỆU QUẢ CAO
          </div>
          <h1 className="text-3xl md:text-7xl font-black text-white max-w-4xl leading-[1.1] tracking-tight">
            Năng Suất Vượt Trội <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce015] to-[#ffb800] drop-shadow-md">
               Chi Phí Tối Ưu
            </span>
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
            {settings.heroSubtitle}
          </p>
          <div className="hidden md:flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
            <a href={`https://zalo.me/${settings.zaloId}`} target="_blank" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-sm font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
              💬 NHẮN ZALO TƯ VẤN MIỄN PHÍ
            </a>
            <Link href="/danh-muc/phan-bon" className="px-10 py-5 bg-white text-emerald-900 hover:bg-gray-100 rounded-sm font-bold text-lg transition-all flex items-center justify-center border border-white/20 active:scale-95">
              XEM SẢN PHẨM
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-6 border-l-4 border-[#ee4d2d] pl-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase">Sản Phẩm Nổi Bật</h2>
            <p className="text-gray-500 text-sm mt-1">Giải pháp hàng đầu cho vườn sầu riêng, cà phê</p>
          </div>
          <Link href="/danh-muc/phan-bon" className="hidden md:flex text-[#ee4d2d] font-bold hover:underline items-center gap-2 text-sm">
            XEM TẤT CẢ <span>▶</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {products.map((product: any, i: number) => (
            <div 
              key={i} 
              onClick={() => router.push(`/san-pham/${product.slug}`)}
              className="bg-white rounded-sm overflow-hidden shadow-sm border border-transparent hover:border-[#ee4d2d] hover:shadow-lg transition-all group flex flex-col h-full relative cursor-pointer"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-50">
                <img src={product.images?.[0] || ""} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-0 right-0">
                  {product.isBestSeller && <div className="bg-[#ee4d2d] text-white font-bold px-1.5 py-0.5 text-[9px] uppercase shadow-sm">Bán chạy</div>}
                </div>
              </div>
               <div className="p-3 md:p-4 flex flex-col flex-1">
                 <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-3 min-h-[40px] group-hover:text-[#ee4d2d] transition-colors">{product.name}</h3>
                 <div className="mt-auto">
                    <span className="font-black text-[#ee4d2d] text-base md:text-lg">₫{(product.price).toLocaleString("vi-VN")}</span>
                    <button 
                       onClick={(e) => { e.stopPropagation(); handleQuickBuy(product); }}
                       className="w-full mt-3 bg-[#ee4d2d] text-white py-2.5 rounded-sm font-bold text-xs hover:bg-[#d73211] transition-colors uppercase shadow-sm active:scale-95"
                    >
                      Mua ngay
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
