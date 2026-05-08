"use client";
import { useState } from "react";
import { trackEvent } from "@/utils/analytics";

export default function ProductActions({ product }: { product: any }) {
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.length > 0 ? product.variants[0] : null);

  const displayStock = selectedVariant ? selectedVariant.stock : product.stock;
  const isOutOfStock = displayStock === 0;
  
  const zaloPhone = process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0339505050';
  const hotline = process.env.NEXT_PUBLIC_HOTLINE ?? '0339505050';
  
  const handleZaloClick = () => {
    trackEvent('zalo_click', { product: product.name, qty });
    const text = encodeURIComponent(`Chào chuyên gia, tôi quan tâm sản phẩm ${product.name} (Số lượng: ${qty}). Xin tư vấn thêm.`);
    window.open(`https://zalo.me/${zaloPhone}?text=${text}`, '_blank');
  };

  const handleCallClick = () => {
    trackEvent('call_click', { product: product.name });
    window.location.href = `tel:${hotline}`;
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
                className="px-3 bg-white hover:bg-gray-50 text-gray-600 border-l border-gray-300 transition-colors"
              >
                +
              </button>
            </div>
            {isOutOfStock ? (
              <span className="text-sm font-black text-[#ee4d2d] uppercase italic">Hết hàng</span>
            ) : (
              <span className="text-xs text-green-600 font-bold">Còn hàng - Giao ngay</span>
            )}
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex flex-row gap-4">
          <button 
            onClick={handleCallClick}
            className={`flex-1 py-4 px-6 rounded-sm transition-colors font-bold text-lg flex items-center justify-center gap-2 shadow-sm bg-[#ffefe8] border border-[#ee4d2d] text-[#ee4d2d] hover:bg-[#ffeae0]`}
          >
            <span className="text-2xl">📞</span> Gọi Tư Vấn Ngay
          </button>
          <button 
            onClick={handleZaloClick}
            className={`flex-1 py-4 px-6 rounded-sm transition-colors font-bold text-lg flex items-center justify-center gap-2 shadow-md bg-blue-600 text-white hover:bg-blue-700`}
          >
            <span className="text-2xl">💬</span> Bắt Bệnh Cây Qua Zalo
          </button>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white flex md:hidden z-[60] h-16 shadow-[0_-4px_15px_rgba(0,0,0,0.1)] p-2 gap-2">
        <button 
          onClick={handleZaloClick}
          className="flex-1 bg-[#0068FF] text-white flex items-center justify-center font-black text-xs rounded-xl gap-2 shadow-lg"
        >
          <span className="text-lg">💬</span>
          <span>Gửi ảnh qua Zalo</span>
        </button>
        <button 
          onClick={handleCallClick}
          className="flex-1 bg-[#ee4d2d] text-white flex items-center justify-center font-black text-xs rounded-xl gap-2 shadow-lg"
        >
          <span className="text-lg">📞</span>
          <span>Gọi Tư Vấn</span>
        </button>
      </div>
    </>
  );
}
