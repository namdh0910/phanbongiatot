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
  const [stories, setStories] = useState<any[]>(successStories);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial fetch from API
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads/recent');
        const data = await res.json();
        if (data && data.length > 0) {
          setStories(data);
        }
      } catch (err) {
        console.error("Failed to fetch leads", err);
      }
    };

    fetchLeads();
    
    const showTimer = setTimeout(() => setIsVisible(true), 5000);
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % stories.length);
        setIsVisible(true);
      }, 1000);
    }, 120000); // 2 minutes per lead for a faster trust signal

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [stories.length]);

  const story = stories[currentIndex];

  if (currentIndex === -1) return null;

  return (
    <div 
      className={`fixed top-24 md:top-auto md:bottom-10 left-4 right-4 md:right-auto z-[200] transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-12 md:translate-y-12 opacity-0 scale-90 pointer-events-none'
      }`}
    >
      <div className="glass-panel border border-emerald-100/50 p-2 md:p-4 rounded-xl md:rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex items-center gap-3 md:gap-4 max-w-full md:min-w-[300px] md:max-w-[340px]">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-full flex items-center justify-center text-lg md:text-xl shadow-lg border-2 border-white">
            👨‍🌾
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white animate-pulse">
            <CheckCircle size={8} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[9px] md:text-[10px] text-emerald-700 font-black uppercase tracking-widest">
              Thực tế từ vườn
            </span>
            <span className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase">{story.time}</span>
          </div>
          <p className="text-[12px] md:text-[13px] font-bold text-gray-900 leading-tight truncate md:whitespace-normal">
            <span className="text-emerald-700">{story.name}</span> {story.action}
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
