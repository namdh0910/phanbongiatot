"use client";
import { useState, useEffect } from "react";
import { trackEvent } from "@/utils/analytics";

export default function ExitPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem("exit_popup_shown");
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseOut = (e: MouseEvent) => {
      // Show when mouse leaves the top of the window (exit intent)
      if (e.clientY <= 0 && !hasShown) {
        showPopup();
      }
    };

    // For mobile: show after 15 seconds or scroll 50%
    const timer = setTimeout(() => {
      if (!hasShown) showPopup();
    }, 20000);

    document.addEventListener("mouseleave", handleMouseOut);

    return () => {
      document.removeEventListener("mouseleave", handleMouseOut);
      clearTimeout(timer);
    };
  }, [hasShown]);

  const showPopup = () => {
    setIsOpen(true);
    setHasShown(true);
    sessionStorage.setItem("exit_popup_shown", "true");
    trackEvent('ViewPopup', { name: 'ExitIntent_Discount' });
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden relative shadow-2xl animate-in zoom-in slide-in-from-bottom-10 duration-500">
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors z-10"
        >
          ✕
        </button>

        {/* Top Image Placeholder / Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-green-800 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <span className="text-5xl mb-4 block">🎁</span>
          <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">Quà Tặng Riêng <br />Cho Nhà Nông</h3>
        </div>

        <div className="p-8 text-center space-y-6">
          <p className="text-gray-600 font-medium">
            Bà con đừng rời đi vội! Kỹ sư gửi tặng mã giảm giá đặc biệt để vườn mình xanh tốt hơn:
          </p>

          <div className="bg-yellow-50 border-2 border-dashed border-yellow-400 p-4 rounded-xl relative">
             <span className="text-gray-500 text-[10px] absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 font-bold uppercase">Mã của bà con</span>
             <p className="text-3xl font-black text-[#ee4d2d] tracking-widest">GIAM20K</p>
             <p className="text-[10px] text-yellow-700 mt-1 font-bold">Giảm ngay 20.000đ cho đơn hàng đầu tiên</p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => {
                closePopup();
                window.location.href = "/gio-hang";
              }}
              className="w-full bg-[#ee4d2d] text-white py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-[#ee4d2d]/30 hover:-translate-y-0.5 transition-all"
            >
              DÙNG MÃ NGAY
            </button>
            <a 
              href="tel:0773440966"
              className="w-full border-2 border-emerald-600 text-emerald-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
            >
              📞 GỌI KỸ SƯ TƯ VẤN
            </a>
          </div>

          <p className="text-[10px] text-gray-400 italic">
            * Áp dụng khi đặt hàng trực tiếp qua Website hoặc Hotline.
          </p>
        </div>
      </div>
    </div>
  );
}
