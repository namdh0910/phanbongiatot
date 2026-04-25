"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { trackEvent } from "@/utils/analytics";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('QuickBuy_Click', { product_name: product.name });
    addToCart(product, 1);
    router.push('/checkout');
  };

  const imgSrc = product.images?.[0];
  const isUrl = imgSrc && (imgSrc.startsWith("http") || imgSrc.startsWith("/"));

  return (
    <div 
      onClick={() => router.push(`/san-pham/${product.slug}`)}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#ee4d2d] hover:shadow-md transition-all group flex flex-col h-full relative cursor-pointer"
    >
      {/* Image Area - Occupation 70% height on mobile if needed, but using aspect ratio is more stable */}
      <div className="aspect-[4/5] relative overflow-hidden bg-gray-50">
        {isUrl ? (
          <img 
            src={imgSrc} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-50">
            <span className="text-4xl">🌱</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {product.isBestSeller && (
            <div className="bg-[#ee4d2d] text-white font-bold px-2 py-1 text-[10px] uppercase rounded-sm shadow-sm">
              Bán chạy
            </div>
          )}
          {product.isNewArrival && (
            <div className="bg-emerald-500 text-white font-bold px-2 py-1 text-[10px] uppercase rounded-sm shadow-sm">
              Mới về
            </div>
          )}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-3 md:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          <h3 className="font-bold text-sm text-gray-800 line-clamp-2 min-h-[40px] leading-tight group-hover:text-[#ee4d2d] transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-black text-[#ee4d2d] text-base md:text-lg">
              ₫{product.price.toLocaleString("vi-VN")}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-gray-400 line-through">
                ₫{product.originalPrice.toLocaleString("vi-VN")}
              </span>
            )}
          </div>
        </div>

        {/* Big Button - Min 44px height for mobile accessibility */}
        <button 
          onClick={handleQuickBuy}
          className="w-full h-[46px] bg-[#ee4d2d] text-white rounded-lg font-black text-sm hover:bg-[#d73211] transition-all uppercase shadow-md active:scale-95 flex items-center justify-center gap-2"
        >
          <span>🛒</span> MUA NGAY
        </button>
      </div>
    </div>
  );
}
