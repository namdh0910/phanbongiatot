'use client';

import { useEffect } from 'react';
import { RefreshCcw, MessageCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center text-5xl mb-8 animate-pulse shadow-inner">
        ⚠️
      </div>
      
      <h1 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">
        Hệ thống đang <span className="text-red-600">bảo trì kỹ thuật!</span>
      </h1>
      
      <p className="text-gray-500 max-w-md mb-12 font-medium leading-relaxed">
        Có một lỗi nhỏ xảy ra khi tải dữ liệu giải pháp. Bà con đừng lo, hãy thử tải lại trang hoặc nhắn tin trực tiếp cho kỹ sư để được hỗ trợ ngay.
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <button 
          onClick={() => reset()}
          className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-xl hover:bg-black transition-all active:scale-95"
        >
          <RefreshCcw size={18} /> Thử Lại Ngay
        </button>
        <a 
          href="https://zalo.me/0773440966" 
          className="flex-1 bg-[#0068FF] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-100 hover:scale-105 transition-all"
        >
          <MessageCircle size={18} /> Chat Zalo Kỹ Sư
        </a>
      </div>

      <div className="mt-12 text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
        Mã lỗi: {error.digest || 'ERR_SYSTEM_001'}
      </div>
    </div>
  );
}
