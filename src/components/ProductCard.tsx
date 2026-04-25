"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { trackEvent } from "@/utils/analytics";
import './ProductCard.css';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const settings = useSettings();
  
  const primaryColor = settings?.primaryColor || "#1a5c2a";
  const zaloId = settings?.zaloId || "0773440966";

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('QuickBuy_Click', { product_name: product.name });
    addToCart(product, 1);
    router.push('/checkout');
  };

  const handleConsult = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://zalo.me/${zaloId}`, '_blank');
  };

  const imgSrc = product.images?.[0];
  const isUrl = imgSrc && (imgSrc.startsWith("http") || imgSrc.startsWith("/"));

  // Random data if missing from API
  const rating = product.rating || (4.5 + Math.random() * 0.5).toFixed(1);
  const soldCount = product.soldCount || Math.floor(Math.random() * 500) + 100;
  const isLowStock = product.stock > 0 && product.stock < 10;

  return (
    <div 
      className="p-card" 
      style={{ '--primary-color': primaryColor } as React.CSSProperties}
      onClick={() => router.push(`/san-pham/${product.slug}`)}
    >
      <div className="p-image-wrapper">
        {isUrl ? (
          <img src={imgSrc} alt={product.name} className="p-image" />
        ) : (
          <div className="p-image flex items-center justify-center bg-emerald-50 text-5xl">
            {product.category?.includes('phân bón') ? '🌱' : '🛡️'}
          </div>
        )}
        
        <div className="p-badges">
          {product.isBestSeller && <span className="p-badge badge-hot">Bán chạy</span>}
          {isLowStock && <span className="p-badge badge-low">Còn ít hàng</span>}
          {product.isNewArrival && <span className="p-badge badge-new">Mới về</span>}
        </div>
      </div>

      <div className="p-info">
        <h3 className="p-name">{product.name}</h3>
        
        <div className="p-meta">
          <div className="p-stars">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} style={{ color: i < Math.floor(Number(rating)) ? '#f5a623' : '#ddd' }}>{star}</span>
            ))}
            <span className="ml-1 text-gray-500">({rating})</span>
          </div>
          <div className="p-sold">
            {soldCount} đã bán
          </div>
        </div>

        <div className="p-price-row">
          <span className="p-price-main">₫{product.price?.toLocaleString("vi-VN")}</span>
          {product.originalPrice > product.price && (
            <span className="p-price-old">₫{product.originalPrice?.toLocaleString("vi-VN")}</span>
          )}
        </div>

        <div className="p-actions">
          <button className="p-btn btn-buy" onClick={handleQuickBuy}>
            🛒 MUA
          </button>
          <button className="p-btn btn-chat" onClick={handleConsult}>
            💬 TƯ VẤN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
