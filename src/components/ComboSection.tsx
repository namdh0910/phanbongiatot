"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';
import { useCart } from '@/context/CartContext';
import { API_BASE_URL } from '@/utils/api';
import './ComboSection.css';

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

const ComboSection: React.FC = () => {
  const settings = useSettings();
  const router = useRouter();
  const { addToCart } = useCart();
  const [combos, setCombos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  useEffect(() => {
    fetch(`${API_BASE_URL}/products?category=combo-tiet-kiem&limit=3`)
      .then(res => res.json())
      .then(data => {
        if (data?.data && data.data.length > 0) {
          setCombos(data.data);
        }
      })
      .catch(err => console.error("Fetch combos failed:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleBuyCombo = (combo: any) => {
    addToCart({
      _id: combo._id || combo.id,
      name: combo.name,
      price: combo.price,
      images: combo.images,
      slug: combo.slug,
      category: combo.category_id || "Combo"
    }, 1);
    router.push('/checkout');
  };

  if (loading) return (
    <div className="py-20 text-center animate-pulse">
       <div className="h-8 w-64 bg-gray-100 mx-auto rounded-full mb-10"></div>
       <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[1,2,3].map(i => <div key={i} className="h-[400px] bg-gray-50 rounded-[3rem]"></div>)}
       </div>
    </div>
  );

  if (combos.length === 0) return null;

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
              onClick={() => router.push('/danh-muc/combo-tiet-kiem')}
              className="text-[#ee4d2d] text-sm font-bold hover:underline flex items-center gap-2 group transition-all mb-2"
            >
              XEM TẤT CẢ <span className="group-hover:translate-x-1 transition-transform">▶</span>
            </button>
          </div>
        </div>

        <div className="combo-grid">
          {combos.map((combo, index) => {
            const discountPercent = combo.original_price ? Math.round((1 - combo.price / combo.original_price) * 100) : 0;
            const savings = combo.original_price ? combo.original_price - combo.price : 0;

            return (
              <div key={index} className="combo-card animate-in fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                {savings > 0 && <div className="combo-tag">Tiết kiệm {formatPrice(savings)}</div>}
                
                <div className="combo-card-inner">
                  <div className="combo-image-box">
                    <img 
                      src={combo.images?.[0]} 
                      alt={combo.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                  </div>
                  
                  <div className="combo-info">
                    <h3 className="combo-title">{combo.name}</h3>
                    {discountPercent > 0 && <div className="combo-discount-badge">Tiết kiệm {discountPercent}%</div>}
                    
                    <div className="combo-items-list-box">
                      <p className="line-clamp-2">{combo.short_desc || combo.description}</p>
                    </div>

                    <div className="combo-pricing">
                      {combo.original_price && <span className="price-retail">Mua riêng: {formatPrice(combo.original_price)}</span>}
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
