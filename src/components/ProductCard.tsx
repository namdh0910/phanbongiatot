"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { trackEvent } from "@/utils/analytics";
import { getImageUrl, isValidImageUrl } from "@/utils/image";
import './ProductCard.css';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const settings = useSettings();
  
  const primaryColor = settings?.primaryColor || "#1a5c2a";
  const zaloId = process.env.NEXT_PUBLIC_ZALO_PHONE ?? "0773440966";

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('QuickBuy_Click', { product_name: product.name });
    addToCart(product, 1);
    router.push('/checkout');
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
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-[13px] md:text-sm font-medium text-gray-800 line-clamp-2 leading-tight h-10 group-hover:text-[#1a5c2a] transition-colors">
            {product.name}
          </h3>
        </div>
        
        {product.seller && typeof product.seller === 'object' && (
          <div className="flex items-center gap-1.5 mb-2 group/shop cursor-pointer" onClick={(e) => { e.stopPropagation(); router.push(`/shop/${product.seller.username || product.seller._id}`); }}>
             <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[8px] overflow-hidden">
                {product.seller.vendorInfo?.logo ? <img src={product.seller.vendorInfo.logo} className="w-full h-full object-cover" /> : '🏪'}
             </div>
             <span className="text-[10px] font-bold text-emerald-700 group-hover/shop:underline truncate max-w-[120px]">
               {product.seller?.role === 'admin' 
                 ? '🏅 Phân Bón Giá Tốt' 
                 : (product.seller?.vendorInfo?.storeName || '✅ Đại lý chính hãng')}
             </span>
             {product.seller.role === 'admin' && (
               <span className="text-[8px] bg-[#1a5c2a] text-white px-1 rounded font-black uppercase tracking-tighter">Mall</span>
             )}
          </div>
        )}
        
          {soldCount > 0 && (
            <div className="p-meta">
              <div className="p-stars">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} style={{ color: i < Math.floor(Number(rating)) ? '#f5a623' : '#ddd' }}>{star}</span>
                ))}
              </div>
              <div className="w-px h-3 bg-gray-200 mx-2"></div>
              <div className="p-sold">
                Đã bán {soldCount >= 1000 ? (soldCount/1000).toFixed(1) + 'k' : soldCount}
              </div>
            </div>
          )}

        <div className="p-price-row">
          <span className="p-price-main">₫{product.price?.toLocaleString("vi-VN")}</span>
          {product.originalPrice > product.price && (
            <span className="p-price-old">₫{product.originalPrice?.toLocaleString("vi-VN")}</span>
          )}
        </div>

        <div className="p-actions">
          <button className="p-btn btn-buy !bg-blue-600 !border-blue-600" onClick={handleConsult}>
            💬 ZALO TƯ VẤN
          </button>
          <button className="p-btn btn-chat" onClick={() => router.push(`/san-pham/${product.slug}`)}>
            👁️ CHI TIẾT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
