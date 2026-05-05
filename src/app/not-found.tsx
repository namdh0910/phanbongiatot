import Link from 'next/link';
import { Home, MessageCircle, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
      <div className="relative mb-8">
        <div className="text-[150px] md:text-[200px] font-black text-gray-100 select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl md:text-8xl animate-bounce">👨‍🌾</div>
        </div>
      </div>
      
      <h1 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">
        Bà con ơi, <span className="text-[#f5a623]">Trang này lạc trôi rồi!</span>
      </h1>
      
      <p className="text-gray-500 max-w-md mb-12 font-medium leading-relaxed">
        Có vẻ như đường dẫn này không tồn tại hoặc đã được kỹ sư chuyển sang phác đồ mới hiệu quả hơn. Bà con hãy quay lại trang chủ nhé!
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <Link 
          href="/" 
          className="flex-1 bg-[#1a5c2a] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-xl shadow-green-100 hover:scale-105 transition-all"
        >
          <Home size={18} /> Về Trang Chủ
        </Link>
        <a 
          href="https://zalo.me/0773440966" 
          className="flex-1 bg-[#0068FF] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-100 hover:scale-105 transition-all"
        >
          <MessageCircle size={18} /> Hỏi Kỹ Sư
        </a>
      </div>
      
      <div className="mt-12 pt-12 border-t border-gray-100 w-full max-w-md">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Hoặc tìm kiếm nhanh</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Sầu riêng", "Cà phê", "Vàng lá", "Tuyến trùng"].map(tag => (
            <Link key={tag} href={`/tim-kiem?q=${tag}`} className="bg-gray-50 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
