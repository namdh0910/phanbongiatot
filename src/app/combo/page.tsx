"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';
import { useCart } from '@/context/CartContext';
import Breadcrumbs from '@/components/Breadcrumbs';

const combos = [
  {
    _id: 'combo-rooti-nemano-npk',
    title: "Combo 01: Phục Hồi & Bảo Vệ Toàn Diện",
    items: ["Rooti (180k)", "Nemano (180k)", "NPK Sinh Học (150k)"],
    retailPrice: 510000,
    price: 420000,
    tag: "Tiết kiệm 90k",
    images: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800"],
    slug: "combo-phuc-hoi-bao-ve",
    category: "Combo",
    benefit: "Giải pháp 3 trong 1: Kích rễ, ngừa tuyến trùng và bổ sung dinh dưỡng đa lượng."
  },
  {
    _id: 'combo-rooti-lan-do',
    title: "Combo 02: Kích Rễ Cực Mạnh - Bung Đọt Nhanh",
    items: ["Rooti (180k)", "Siêu Lân Đỏ (220k)"],
    retailPrice: 400000,
    price: 330000,
    tag: "Tiết kiệm 70k",
    images: ["https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800"],
    slug: "combo-kich-re-bung-dot",
    category: "Combo",
    benefit: "Sự kết hợp hoàn hảo giữa kích rễ sinh học và lân đỏ nồng độ cao."
  },
  {
    _id: 'combo-double-nemano-rooti',
    title: "Combo 03: Đặc Trị Tuyến Trùng & Vàng Lá",
    items: ["Nemano x2 (360k)", "Rooti (180k)"],
    retailPrice: 540000,
    price: 440000,
    tag: "Tiết kiệm 100k",
    images: ["https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=800"],
    slug: "combo-dac-tri-tuyen-trung",
    category: "Combo",
    benefit: "Liều tấn công cho vườn bị tuyến trùng nặng, giúp tái tạo bộ rễ ngay sau khi sạch bệnh."
  }
];

export default function ComboPage() {
  const settings = useSettings();
  const router = useRouter();
  const { addToCart } = useCart();
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  const handleBuyCombo = (combo: any) => {
    addToCart({
      _id: combo._id,
      name: combo.title,
      price: combo.price,
      images: combo.images,
      slug: combo.slug,
      category: combo.category
    }, 1);
    router.push('/checkout');
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <Breadcrumbs items={[{ label: "Gói Giải Pháp Combo" }]} />
      
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-100 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">
            Gói Giải Pháp <span className="text-[#1a5c2a]">Tiết Kiệm</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Chúng tôi đã thiết kế các combo chuyên biệt để giúp bà con tối ưu chi phí canh tác trong khi vẫn đảm bảo hiệu quả phục hồi và tăng năng suất cây trồng vượt trội.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combos.map((combo) => {
            const discountPercent = Math.round((1 - combo.price / combo.retailPrice) * 100);
            return (
              <div 
                key={combo._id} 
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={combo.images[0]} 
                    alt={combo.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-[#ee4d2d] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    {combo.tag}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-[#1a5c2a] transition-colors">
                    {combo.title}
                  </h3>
                  
                  <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-100">
                    <p className="text-[#1a5c2a] text-sm font-bold flex items-center gap-2">
                      <span>🌱</span> {combo.benefit}
                    </p>
                  </div>

                  <div className="mb-8 flex-1">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Thành phần gói:</h4>
                    <ul className="space-y-3">
                      {combo.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                          <span className="w-5 h-5 bg-[#1a5c2a] text-white rounded-full flex items-center justify-center text-[10px]">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-gray-50 mt-auto">
                    <div className="flex items-baseline justify-between mb-6">
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-xs line-through font-bold">
                          Giá lẻ: {combo.retailPrice.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-[#ee4d2d] text-3xl font-black">
                          {combo.price.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm font-black italic">
                        -{discountPercent}%
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleBuyCombo(combo)}
                      className="w-full bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      <span>🛒</span> ĐẶT MUA NGAY
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Section */}
        <div className="mt-20 bg-dark rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-black mb-6">Bà con cần hỗ trợ phối trộn Combo riêng?</h2>
              <p className="text-green-200/80 mb-10 max-w-2xl mx-auto text-lg">
                Mỗi vườn, mỗi giai đoạn cây có nhu cầu khác nhau. Gọi ngay cho kỹ sư để được tư vấn combo tiết kiệm nhất cho vườn nhà mình.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                 <a href={`tel:${settings?.hotline || '0773440966'}`} className="bg-[#f5a623] text-dark px-10 py-5 rounded-2xl font-black text-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-3">
                    <span>📞</span> GỌI KỸ SƯ: {settings?.hotline || '0773.440.966'}
                 </a>
                 <a href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`} target="_blank" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all">
                    TƯ VẤN QUA ZALO
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
