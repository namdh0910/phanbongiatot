"use client";
import { useState, useEffect } from "react";

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
    const showTimer = setTimeout(() => setIsVisible(true), 3000);
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % successStories.length);
        setIsVisible(true);
      }, 1000);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  const story = successStories[currentIndex];

  return (
    <div 
      className={`fixed bottom-24 left-4 z-[100] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-white/90 backdrop-blur-md border border-emerald-100 p-3 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px]">
        <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center text-lg flex-shrink-0 shadow-lg">
          👨‍🌾
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-bold text-gray-800 leading-tight">
            {story.name} ({story.location}) {story.action}
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">{story.time}</span>
            <span className="text-[9px] text-emerald-600 font-black uppercase tracking-tighter">✅ Xác minh</span>
          </div>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-300 hover:text-gray-500 text-xs ml-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
