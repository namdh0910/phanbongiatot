"use client";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

const successStories = [
  { name: "Anh Ba", location: "Gia Lai", action: "vừa được tư vấn trị tuyến trùng", time: "2 phút trước" },
  { name: "Chú Năm", location: "Đồng Nai", action: "đã đặt bộ phục hồi sầu riêng", time: "5 phút trước" },
  { name: "Cô Tám", location: "Đắk Lắk", action: "vừa hỏi về phác đồ kích rễ", time: "8 phút trước" },
  { name: "Bác Sáu", location: "Tiền Giang", action: "đã nhận hàng Nemano thành công", time: "12 phút trước" },
  { name: "Chị Hoa", location: "Bình Phước", action: "vừa gửi ảnh vườn nhờ kỹ sư xem hộ", time: "15 phút trước" }
];

export default function FloatingSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 5000);
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % successStories.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  const story = successStories[currentIndex];

  if (currentIndex === -1) return null;

  return (
    <div 
      className={`fixed bottom-24 md:bottom-10 left-4 z-[100] transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90 pointer-events-none'
      }`}
    >
      <div className="glass-panel border border-emerald-100/50 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex items-center gap-4 min-w-[300px] max-w-[340px]">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-lg border-2 border-white">
            👨‍🌾
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white animate-pulse">
            <CheckCircle size={10} />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-emerald-700 font-black uppercase tracking-widest flex items-center gap-1">
               Thực tế từ vườn
            </span>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{story.time}</span>
          </div>
          <p className="text-[13px] font-bold text-gray-900 leading-snug">
            <span className="text-emerald-700">{story.name}</span> <span className="text-gray-500 font-medium">({story.location})</span> {story.action}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
               <div 
                 className={`h-full bg-emerald-500 transition-all duration-[11000ms] ease-linear ${isVisible ? 'w-full' : 'w-0'}`}
               />
            </div>
            <span className="text-[8px] font-black text-emerald-600/60 uppercase tracking-tighter">Xác minh</span>
          </div>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
