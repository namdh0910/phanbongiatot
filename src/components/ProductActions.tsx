"use client";
import { useState } from "react";
import { trackEvent } from "@/utils/analytics";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductActions({ product }: { product: any }) {
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    trackEvent('AddToCart', {
      content_name: product.name,
      value: product.price,
      currency: 'VND',
      quantity: qty
    });
    
    addToCart(product, qty);
    
    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 3000);
  };

  const handleBuyNow = () => {
    trackEvent('InitiateCheckout', {
      content_name: product.name,
      value: product.price,
      currency: 'VND',
      quantity: qty
    });
    addToCart(product, qty);
    router.push('/checkout');
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Quantity Selector - Desk & Mobile */}
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
                className="px-3 bg-white hover:bg-gray-50 text-gray-600 border-l border-gray-300 transition-colors"
              >
                +
              </button>
            </div>
            <span className="text-xs text-gray-400">{product.stock || 100} sản phẩm có sẵn</span>
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
            className="flex-1 bg-[#ffefe8] border border-[#ee4d2d] text-[#ee4d2d] py-4 px-6 rounded-sm hover:bg-[#ffeae0] transition-colors font-medium flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="text-2xl">🛒</span> Thêm Vào Giỏ Hàng
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 bg-[#ee4d2d] text-white py-4 px-6 rounded-sm hover:bg-[#d73211] transition-colors font-bold text-lg shadow-md"
          >
            Mua Ngay
          </button>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex md:hidden z-[60] h-[60px] shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
        <a 
          href="https://zalo.me/0773440966" 
          target="_blank" 
          className="flex-1 bg-white text-[#1a5c2a] flex items-center justify-center font-bold text-sm active:bg-gray-50 border-r border-gray-100"
        >
          💬 Chat kỹ sư
        </a>
        <button 
          onClick={handleBuyNow}
          className="flex-1 bg-[#ee4d2d] text-white flex items-center justify-center font-black text-sm active:bg-[#d73211] tracking-wide"
        >
          MUA NGAY
        </button>
      </div>
    </>
  );
}
