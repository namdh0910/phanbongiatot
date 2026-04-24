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
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="flex flex-col gap-24 pb-20 bg-[#f5f5f5]">
      {/* HERO SECTION */}
      <section 
        className="relative w-full h-[500px] md:h-[600px] flex items-center overflow-hidden"
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
          <h1 className="text-4xl md:text-7xl font-black text-white max-w-4xl leading-[1.1] tracking-tight">
            {settings.heroTitle?.split(' ').slice(0, 3).join(' ')} <br /> 
            <span className="text-[#fce015]">{settings.heroTitle?.split(' ').slice(3).join(' ')}</span>
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
            {settings.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
            <a href={`tel:${settings.hotline}`} className="px-10 py-5 bg-[#ee4d2d] hover:bg-[#d73211] text-white rounded-sm font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
              📞 NHẬN TƯ VẤN MIỄN PHÍ
            </a>
            <Link href="/danh-muc/phan-bon" className="px-10 py-5 bg-white text-emerald-900 hover:bg-gray-100 rounded-sm font-bold text-lg transition-all flex items-center justify-center border border-white/20 active:scale-95">
              XEM SẢN PHẨM
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="container mx-auto px-4">
        <div className="bg-white p-4 md:p-6 rounded-sm shadow-xl flex flex-wrap justify-between gap-4 -mt-16 relative z-20 border-b-4 border-emerald-600">
          {[
            { icon: "🏆", title: "CHÍNH HÃNG", desc: "Cam kết 100%" },
            { icon: "👨‍🌾", title: "KỸ SƯ TẬN TÂM", desc: "Tư vấn kỹ thuật" },
            { icon: "🚚", title: "GIAO TOÀN QUỐC", desc: "Kiểm tra nhận hàng" },
            { icon: "💰", title: "GIÁ TỐT NHẤT", desc: "Trực tiếp từ kho" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 flex-1 min-w-[150px]">
              <span className="text-3xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-full shadow-inner">{item.icon}</span>
              <div>
                <h4 className="font-black text-gray-900 text-xs md:text-sm">{item.title}</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS - SHOPEE STYLE GRID */}
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
          {products.map((product: any, i: number) => {
            const imgSrc = product.images?.[0];
            const isUrl = imgSrc && (imgSrc.startsWith("http") || imgSrc.startsWith("/"));
            return (
              <div 
                key={i} 
                onClick={() => router.push(`/san-pham/${product.slug}`)}
                className="bg-white rounded-sm overflow-hidden shadow-sm border border-transparent hover:border-[#ee4d2d] hover:shadow-lg transition-all group flex flex-col h-full relative cursor-pointer"
              >
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                   {isUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imgSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   ) : (
                      <div className="text-center p-4">
                         <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">🌱</div>
                         <p className="text-[10px] text-green-600 font-bold uppercase line-clamp-1">{product.name}</p>
                      </div>
                   )}
                   <div className="absolute top-0 right-0 flex flex-col gap-1 items-end">
                      {product.isBestSeller && <div className="bg-[#ee4d2d] text-white font-bold px-1.5 py-0.5 text-[9px] uppercase shadow-sm">Bán chạy</div>}
                      {product.isNewArrival && <div className="bg-[#00bfa5] text-white font-bold px-1.5 py-0.5 text-[9px] uppercase shadow-sm">Hàng mới</div>}
                      {(!product.isBestSeller && !product.isNewArrival) && <div className="bg-[#fce015] text-[#ee4d2d] font-bold px-1.5 py-0.5 text-[9px] uppercase shadow-sm">HOT</div>}
                   </div>
                </div>
                 <div className="p-3 md:p-4 flex flex-col flex-1">
                   <h3 className="font-medium text-sm text-gray-800 line-clamp-2 mb-3 min-h-[40px] group-hover:text-[#ee4d2d] transition-colors">{product.name}</h3>
                   <div className="mt-auto">
                     <div className="flex items-center justify-between mb-3">
                        <span className="font-black text-[#ee4d2d] text-base md:text-lg">₫{(product.price).toLocaleString("vi-VN")}</span>
                     </div>
                      <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           handleQuickBuy(product);
                         }}
                         className="w-full bg-[#ee4d2d] text-white py-2.5 rounded-sm font-bold text-xs hover:bg-[#d73211] transition-colors uppercase shadow-sm active:scale-95"
                      >
                        Mua ngay
                      </button>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BLOG / NEWS - SEO FOCUS */}
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog: any, i: number) => (
            <Link href={`/blog/${blog.slug}`} key={i} className="group flex flex-col bg-white rounded-sm shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
               <div className="aspect-[16/9] bg-emerald-50 relative flex items-center justify-center overflow-hidden">
                  {blog.image ? (
                    <img src={blog.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={blog.title} />
                  ) : (
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-500">📚</span>
                  )}
                  <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 text-[10px] font-bold rounded-sm text-emerald-900">KIẾN THỨC</div>
               </div>
               <div className="p-5">
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-3 text-lg leading-snug">{blog.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{blog.excerpt}</p>
                  <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest border-b-2 border-emerald-600 pb-1">Xem chi tiết</span>
               </div>
            </Link>
          ))}
          {blogs.length === 0 && (
             <div className="col-span-3 py-12 text-center bg-white border border-dashed border-gray-300 rounded-sm">
                <p className="text-gray-400">Đang cập nhật bài viết mới nhất...</p>
             </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-900 to-green-800 rounded-sm p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
           
           <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 leading-tight">Vườn Suy Yếu? <span className="text-[#fce015]">Gặp Kỹ Sư Ngay!</span></h2>
           <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto relative z-10">Đừng để vườn suy kiệt. Chúng tôi tư vấn giải pháp phục hồi MIỄN PHÍ tận vườn qua Zalo/Điện thoại.</p>
           
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a href={`tel:${settings.hotline}`} className="bg-[#ee4d2d] text-white px-10 py-5 rounded-sm font-black text-xl shadow-lg hover:bg-[#d73211] transition-transform hover:-translate-y-1">
                 GỌI: {settings.phone || settings.hotline}
              </a>
              <a href={`https://zalo.me/${settings.zaloId}`} className="bg-white text-emerald-900 px-10 py-5 rounded-sm font-black text-xl shadow-lg hover:bg-gray-100 transition-transform hover:-translate-y-1">
                 CHAT ZALO
              </a>
            </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="container mx-auto px-4 max-w-4xl">
         <h2 className="text-2xl md:text-3xl font-black text-center mb-12 uppercase tracking-widest text-gray-900">Bà Con Thắc Mắc?</h2>
         <div className="space-y-4">
            {[
               { q: "Sản phẩm có thực sự hiệu quả như quảng cáo không?", a: "Phân Bón Giá Tốt cam kết bằng uy tín kỹ sư. Nếu bà con dùng đúng liệu trình mà không thấy rễ ra thêm, lá xanh lại, chúng tôi sẽ hỗ trợ tận vườn." },
               { q: "Cách thức đặt hàng và vận chuyển như thế nào?", a: "Rất đơn giản! Bà con chỉ cần bấm nút 'Mua Ngay' hoặc gọi Hotline. Chúng tôi gửi hàng bưu điện tận nhà, bà con mở ra kiểm tra đúng hàng rồi mới trả tiền cho nhân viên giao hàng." },
               { q: "Giá có tốt nhất thị trường không?", a: "Chúng tôi nhập hàng trực tiếp số lượng lớn từ nhà máy và gửi thẳng đến bà con, không qua đại lý trung gian nên giá luôn rẻ hơn 15-20% so với thị trường." }
            ].map((faq, i) => (
               <div key={i} className="bg-white p-6 border border-gray-200 rounded-sm hover:border-emerald-500 transition-colors cursor-pointer group shadow-sm">
                  <h3 className="font-bold text-gray-900 flex items-center gap-4 text-lg">
                     <span className="text-[#ee4d2d] font-black italic">Q{i+1}.</span> {faq.q}
                  </h3>
                  <div className="h-px bg-gray-100 my-4 group-hover:bg-emerald-100 transition-colors"></div>
                  <p className="text-gray-600 text-sm leading-relaxed pl-10 border-l-2 border-emerald-500 italic">{faq.a}</p>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
