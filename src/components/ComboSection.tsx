"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';
import { useCart } from '@/context/CartContext';
import './ComboSection.css';

const combos = [
  {
    _id: 'combo-sau-rieng-phuc-hoi',
    title: "Combo Sầu Riêng Phục Hồi Sau Thu Hoạch",
    items: ["Phân bón Acti Rooti (5L)", "Nemano Tuyến Trùng", "Combi Gold"],
    retailPrice: 1450000,
    price: 1160000,
    tag: "Bán chạy nhất",
    images: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"],
    slug: "combo-sau-rieng-phuc-hoi",
    category: "Combo",
    benefit: "Giúp cây phục hồi nhanh sau thu hoạch, kích rễ cực mạnh."
  },
  {
    _id: 'combo-ca-phe-nang-suat-vang',
    title: "Gói Cà Phê Năng Suất Vàng - Hạt Chắc Cành Khỏe",
    items: ["NPK Cao Cấp", "Kích ra hoa", "Chống rụng trái"],
    retailPrice: 980000,
    price: 784000,
    tag: "Phổ biến",
    images: ["https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop"],
    slug: "combo-ca-phe-nang-suat-vang",
    category: "Combo",
    benefit: "Tối ưu năng suất cà phê, hạt to chắc, cành khỏe."
  },
  {
    _id: 'combo-vang-la-thoi-re',
    title: "Combo Đặc Trị Vàng Lá Thối Rễ Cấp Tốc",
    items: ["Nemano", "Bio Root", "Amino Acid"],
    retailPrice: 1100000,
    price: 880000,
    tag: "Mới",
    images: ["https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=800&auto=format&fit=crop"],
    slug: "combo-vang-la-thoi-re",
    category: "Combo",
    benefit: "Giải pháp toàn diện cho cây bị vàng lá thối rễ."
  }
];

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

const ComboSection: React.FC = () => {
  const settings = useSettings();
  const router = useRouter();
  const { addToCart } = useCart();
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  const handleBuyCombo = (combo: any) => {
    // Add combo to cart as a product
    addToCart({
      _id: combo._id,
      name: combo.title,
      price: combo.price,
      images: combo.images,
      slug: combo.slug,
      category: combo.category
    }, 1);
    
    // Redirect to checkout
    router.push('/checkout');
  };

  return (
    <section className="combo-section" style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <div className="combo-container">
        <div className="combo-header">
          <div 
            className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4"
            style={{ backgroundColor: `${primaryColor}1a`, color: primaryColor }}
          >
            Giải Pháp Tiết Kiệm
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h2 style={{ color: primaryColor }}>Gói Giải Pháp & Combo</h2>
              <p className="hidden md:block">Sự kết hợp hoàn hảo giúp bà con tiết kiệm chi phí và đạt hiệu quả tối ưu.</p>
            </div>
            <button 
              onClick={() => router.push('/combo')}
              className="text-[#ee4d2d] text-sm font-bold hover:underline flex items-center gap-2 group transition-all mb-2"
            >
              XEM TẤT CẢ <span className="group-hover:translate-x-1 transition-transform">▶</span>
            </button>
          </div>
        </div>

        <div className="combo-grid">
          {combos.map((combo, index) => {
            const discountPercent = Math.round((1 - combo.price / combo.retailPrice) * 100);
            return (
              <div key={index} className="combo-card">
                <div className="combo-tag">{combo.tag}</div>
                
                <div className="combo-card-inner">
                  <div className="combo-image-box">
                    <img 
                      src={combo.images[0]} 
                      alt={combo.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                  </div>
                  
                  <div className="combo-info">
                    <h3 className="combo-title">{combo.title}</h3>
                    <div className="combo-discount-badge">Tiết kiệm {discountPercent}%</div>
                    
                    <div className="combo-items-list-box">
                      <p>Gồm: {combo.items.join(", ")}</p>
                    </div>

                    <div className="combo-pricing">
                      <span className="price-retail">Mua riêng: {formatPrice(combo.retailPrice)}</span>
                      <span className="price-combo">Mua combo: {formatPrice(combo.price)}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleBuyCombo(combo)}
                  className="combo-buy-btn"
                >
                  ĐẶT MUA COMBO NGAY
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComboSection;
