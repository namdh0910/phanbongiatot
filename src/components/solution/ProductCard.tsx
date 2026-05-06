"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

import { useSettings } from "@/context/SettingsContext";
import { trackEvent } from "@/utils/analytics";
import { getImageUrl, isValidImageUrl } from "@/utils/image";
import './ProductCard.css';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const settings = useSettings();
  
  const primaryColor = settings?.primaryColor || "#1a5c2a";
  const zaloId = process.env.NEXT_PUBLIC_ZALO_PHONE ?? "0773440966";

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('QuickBuy_Click', { product_name: product.name });
    window.open(`https://zalo.me/${zaloId}`, '_blank');
  };

  const handleConsult = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`, '_blank');
  };

  const imgSrc = getImageUrl(product.images?.[0]);
  const isUrl = isValidImageUrl(imgSrc);

  // Real data from API
  const rating = product.rating || 0;
  const soldCount = product.soldCount || 0;
  const isLowStock = product.stock > 0 && product.stock < 10;

  return (
    <div 
      className="p-card" 
      style={{ '--primary-color': primaryColor } as React.CSSProperties}
      onClick={() => router.push(`/san-pham/${product.slug}`)}
    >
      <div className="p-image-wrapper">
        {isUrl ? (
          <img 
            src={imgSrc} 
            alt={product.name} 
            className="p-image" 
            loading="lazy" 
            width="300" 
            height="300" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/og-image.png";
            }}
          />
        ) : (
          <div className="p-image flex items-center justify-center bg-emerald-50 text-5xl">
            {product.category?.toLowerCase().includes('phân bón') ? '🌱' : '🛡️'}
          </div>
        )}
        
        <div className="p-badges">
          {product.isBestSeller && <span className="p-badge badge-hot">Bán chạy</span>}
          {product.stock === 0 && <span className="p-badge badge-soldout">Hết hàng</span>}
          {isLowStock && <span className="p-badge badge-low">Sắp cháy hàng</span>}
          {product.isNewArrival && <span className="p-badge badge-new">Mới về</span>}
          {product.originalPrice > product.price && <span className="p-badge badge-discount">-{Math.round((1 - product.price/product.originalPrice)*100)}%</span>}
        </div>
      </div>

      <div className="p-info">
        <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-4">
           <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(star => (
                <span key={star} className="text-[10px] text-amber-400">★</span>
              ))}
           </div>
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
             {soldCount > 0 ? `Đã tư vấn ${soldCount}+ vườn` : 'Chuyên gia khuyên dùng'}
           </span>
        </div>

        <div className="p-price-row">
          <span className="p-price-main">₫{product.price?.toLocaleString("vi-VN")}</span>
          {product.originalPrice > product.price && (
            <span className="p-price-old">₫{product.originalPrice?.toLocaleString("vi-VN")}</span>
          )}
        </div>

        <div className="p-actions">
          <button className="p-btn btn-buy" onClick={handleConsult}>
            💬 CHAT ZALO BẮT BỆNH CÂY
          </button>
          <button className="p-btn btn-chat" onClick={() => router.push(`/san-pham/${product.slug}`)}>
            NHẬN GIẢI PHÁP PHỤC HỒI
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
