"use client";
import { useState } from "react";
import { trackEvent } from "@/utils/analytics";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";

export default function ProductActions({ product }: { product: any }) {
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const settings = useSettings();
  
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.length > 0 ? product.variants[0] : null);

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayStock = selectedVariant ? selectedVariant.stock : product.stock;
  const isOutOfStock = displayStock === 0;
  const isLowStock = displayStock > 0 && displayStock < 10;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const itemToCart = {
      ...product,
      price: displayPrice,
      selectedVariant: selectedVariant?.name
    };
    trackEvent('AddToCart', {
      content_name: product.name,
      value: displayPrice,
      currency: 'VND',
      quantity: qty,
      variant: selectedVariant?.name
    });
    
    addToCart(itemToCart, qty);
    
    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 3000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    const itemToCart = {
      ...product,
      price: displayPrice,
      selectedVariant: selectedVariant?.name
    };
    trackEvent('InitiateCheckout', {
      content_name: product.name,
      value: displayPrice,
      currency: 'VND',
      quantity: qty,
      variant: selectedVariant?.name
    });
    addToCart(itemToCart, qty);
    router.push('/checkout');
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Variant Selector */}
        {product.variants?.length > 0 && (
          <div className="flex flex-col gap-4">
            <span className="text-gray-500 text-sm">Phân Loại</span>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v: any) => (
                <button
                  key={v.name}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 border rounded-sm text-sm font-medium transition-all ${
                    selectedVariant?.name === v.name
                      ? "border-[#ee4d2d] text-[#ee4d2d] bg-[#fff5f3]"
                      : "border-gray-200 text-gray-700 hover:border-[#ee4d2d]"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center gap-6 mb-2">
          <span className="w-24 flex-shrink-0 text-gray-500 text-sm">Số lượng</span>
          <div className="flex items-center gap-4">
            <div className="flex border border-gray-300 rounded-sm overflow-hidden h-9">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 bg-white hover:bg-gray-50 text-gray-600 border-r border-gray-300 transition-colors"
              >
                -
              </button>
              <input 
                type="text" 
                value={qty} 
                readOnly 
                className="w-12 text-center text-sm font-medium outline-none" 
              />
              <button 
                onClick={() => setQty(qty + 1)}
                disabled={qty >= (displayStock || 999)}
                className="px-3 bg-white hover:bg-gray-50 text-gray-600 border-l border-gray-300 transition-colors disabled:opacity-30"
              >
                +
              </button>
            </div>
            {isOutOfStock ? (
              <span className="text-sm font-black text-[#ee4d2d] uppercase italic">Hết hàng</span>
            ) : isLowStock ? (
              <span className="text-xs font-bold text-[#ee4d2d]">Chỉ còn {displayStock} sản phẩm có sẵn!</span>
            ) : (
              <span className="text-xs text-gray-400">{displayStock || 100} sản phẩm có sẵn</span>
            )}
          </div>
        </div>

        {showCartSuccess && (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-sm text-sm font-medium animate-in fade-in slide-in-from-top-2 border border-green-100 flex items-center gap-2">
            <span className="text-lg">✅</span> Đã thêm vào giỏ hàng thành công!
          </div>
        )}
        
        <div className="hidden md:flex flex-row gap-4">
          <button 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-1 py-4 px-6 rounded-sm transition-colors font-medium flex items-center justify-center gap-2 shadow-sm ${isOutOfStock ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-[#ffefe8] border border-[#ee4d2d] text-[#ee4d2d] hover:bg-[#ffeae0]'}`}
          >
            <span className="text-2xl">🛒</span> {isOutOfStock ? 'Hết hàng' : 'Thêm Vào Giỏ Hàng'}
          </button>
          <button 
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex-1 py-4 px-6 rounded-sm transition-colors font-bold text-lg shadow-md ${isOutOfStock ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-[#ee4d2d] text-white hover:bg-[#d73211]'}`}
          >
            Mua Ngay
          </button>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex md:hidden z-[60] h-[60px] shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
        <a 
          href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`} 
          target="_blank" 
          className="flex-1 bg-white text-[#1a5c2a] flex items-center justify-center font-bold text-sm active:bg-gray-50 border-r border-gray-100"
        >
          💬 Chat kỹ sư
        </a>
        <button 
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`flex-1 flex items-center justify-center font-black text-sm tracking-wide ${isOutOfStock ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-[#ee4d2d] text-white active:bg-[#d73211]'}`}
        >
          {isOutOfStock ? 'HẾT HÀNG' : 'MUA NGAY'}
        </button>
      </div>
    </>
  );
}
