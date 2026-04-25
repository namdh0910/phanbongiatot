"use client";
import React from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import { trackEvent } from '@/utils/analytics';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const combos = [
  {
    id: "combo-phuc-hoi-sau-rieng",
    name: "Phục Hồi Vườn Sầu Riêng",
    badge: "Tiết kiệm 18%",
    description: "Giải pháp toàn diện giúp cây phục hồi nhanh sau thu hoạch, kích rễ mạnh và xanh lá.",
    products: [
      { name: "Phân bón Acti Rooti", price: 180000, img: "🧪" },
      { name: "Nemano Tuyến Trùng", price: 180000, img: "🦠" },
      { name: "NPK Sinh Học Cao Cấp", price: 150000, img: "🌱" }
    ],
    originalPrice: 510000,
    comboPrice: 420000,
    tag: "Bà con ưa chuộng nhất"
  },
  {
    id: "combo-diet-tuyen-trung",
    name: "Diệt Tuyến Trùng Triệt Để",
    badge: "Tiết kiệm 100k",
    description: "Phác đồ đặc trị tuyến trùng gây thối rễ, vàng lá. Hiệu quả thấy rõ sau 7 ngày.",
    products: [
      { name: "Nemano Tuyến Trùng", price: 180000, img: "🦠" },
      { name: "Nemano Tuyến Trùng (Gói thứ 2)", price: 180000, img: "🦠" },
      { name: "Phân bón Acti Rooti", price: 180000, img: "🧪" }
    ],
    originalPrice: 540000,
    comboPrice: 440000,
    tag: "Hiệu quả cực mạnh"
  },
  {
    id: "combo-kich-re-co-ban",
    name: "Kích Rễ Cơ Bản",
    badge: "Tiết kiệm 70k",
    description: "Bộ đôi hoàn hảo cho cây con hoặc phục hồi rễ bị suy yếu do úng nước.",
    products: [
      { name: "Siêu Lân Đỏ", price: 220000, img: "🧪" },
      { name: "Phân bón Acti Rooti", price: 180000, img: "🧪" }
    ],
    originalPrice: 400000,
    comboPrice: 330000,
    tag: "Mới"
  }
];

export default function ComboPage() {
  const settings = useSettings();
  const { addToCart } = useCart();
  const router = useRouter();
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  const handleBuyCombo = (combo: any) => {
    trackEvent('Buy_Combo_Click', { combo_name: combo.name });
    // In a real app, we might add a special "combo" item to cart
    // For now, let's simulate adding the main package
    addToCart({
      _id: combo.id,
      name: `[COMBO] ${combo.name}`,
      price: combo.comboPrice,
      images: ["https://img.icons8.com/bubbles/200/000000/package.png"],
      slug: combo.id
    }, 1);
    router.push('/checkout');
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-24">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-gray-100 pt-12 pb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-orange-200">
            Bà con ưa chuộng nhất
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 uppercase">
            Gói Giải Pháp Tiết Kiệm
          </h1>
          <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            Mua combo tiết kiệm <span className="text-[#ee4d2d] font-bold">15-25%</span> so với mua lẻ từng sản phẩm. 
            Giúp bà con canh tác hiệu quả hơn.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combos.map((combo) => (
            <div key={combo.id} className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl transition-all group">
              {/* Card Header */}
              <div className="p-8 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-emerald-50 text-[#1a5c2a] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                    {combo.tag}
                  </span>
                  <span className="bg-[#ee4d2d] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                    {combo.badge}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 group-hover:text-[#1a5c2a] transition-colors leading-tight">
                  {combo.name}
                </h2>
                <p className="text-gray-400 text-xs mt-2 font-medium">{combo.description}</p>
              </div>

              {/* Product List */}
              <div className="px-8 flex-1">
                <div className="space-y-4 py-6">
                  {combo.products.map((p, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl border border-gray-100 shadow-inner">
                        {p.img}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-gray-800">{p.name}</h4>
                        <p className="text-[10px] text-gray-400">Giá lẻ: {p.price.toLocaleString()}đ</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="px-8">
                <div className="border-t border-dashed border-gray-200"></div>
              </div>

              {/* Pricing Section */}
              <div className="p-8 pt-6">
                <div className="flex flex-col mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 line-through text-sm">₫{combo.originalPrice.toLocaleString()}</span>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-bold">GIÁ MUA LẺ</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#ee4d2d]">₫{combo.comboPrice.toLocaleString()}</span>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">TIẾT KIỆM { (combo.originalPrice - combo.comboPrice).toLocaleString() }đ</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleBuyCombo(combo)}
                  className="w-full bg-[#1a5c2a] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-[#2d7a3e] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  🛒 MUA COMBO NGAY
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-emerald-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center md:text-left">
                 <div className="text-4xl mb-4">🚛</div>
                 <h4 className="font-black text-xl mb-2 uppercase">Giao Hàng Miễn Phí</h4>
                 <p className="text-emerald-200 text-sm">Áp dụng cho tất cả các gói combo giải pháp trên toàn quốc.</p>
              </div>
              <div className="text-center md:text-left border-y md:border-y-0 md:border-x border-emerald-800 py-8 md:py-0 md:px-12">
                 <div className="text-4xl mb-4">🧑‍🔬</div>
                 <h4 className="font-black text-xl mb-2 uppercase">Hỗ Trợ Kỹ Thuật</h4>
                 <p className="text-emerald-200 text-sm">Kỹ sư sẽ gọi điện hướng dẫn chi tiết cách sử dụng combo hiệu quả nhất.</p>
              </div>
              <div className="text-center md:text-left">
                 <div className="text-4xl mb-4">🛡️</div>
                 <h4 className="font-black text-xl mb-2 uppercase">Cam Kết Hiệu Quả</h4>
                 <p className="text-emerald-200 text-sm">Hoàn tiền 100% nếu không đạt hiệu quả sau khi làm đúng theo phác đồ.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
