"use client";
import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  MessageCircle, 
  PlusCircle, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';

interface Answer {
  content: string;
  author: string;
  authorRole: string;
  createdAt: string;
}

interface Question {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  answers: Answer[];
  createdAt: string;
}

export default function CommunityQA() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAskModal, setShowAskModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    author: "",
    authorPhone: "",
    category: "Sầu riêng"
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/community/questions');
      const data = await res.json();
      if (data.success) {
        setQuestions(data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/community/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        fetchQuestions(); // Tải lại danh sách ngay lập tức
        setTimeout(() => {
          setShowAskModal(false);
          setSuccess(false);
          setNewQuestion({ title: "", content: "", author: "", authorPhone: "", category: "Sầu riêng" });
        }, 2000);
      }
    } catch (err) {
      alert("Có lỗi xảy ra, bà con thử lại nhé!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (questionId: string) => {
    if (!replyContent.trim()) return;
    const author = localStorage.getItem('user_name') || "Nhà nông ẩn danh";
    
    try {
      const res = await fetch(`/api/community/questions/${questionId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent, author })
      });
      const data = await res.json();
      if (data.success) {
        setReplyContent("");
        fetchQuestions();
        // Update local active question if open
        if (activeQuestion?._id === questionId) {
            const updated = data.data;
            setActiveQuestion(updated);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header & Ask Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl md:text-3xl font-black text-gray-900 uppercase italic tracking-tighter">
            Hỏi đáp <span className="text-emerald-600">từ bà con</span>
          </h2>
          <p className="text-gray-500 text-sm font-medium">Nơi cộng đồng nhà nông chia sẻ kinh nghiệm thực chiến</p>
        </div>
        <button 
          onClick={() => setShowAskModal(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-orange-100 active:scale-95"
        >
          <PlusCircle size={20} /> Đặt câu hỏi ngay
        </button>
      </div>

      {/* Questions List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-[2rem]" />)}
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
           <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
           <h3 className="text-lg font-black text-gray-900 uppercase">Chưa có thảo luận nào</h3>
           <p className="text-gray-500">Bà con hãy là người đầu tiên đặt câu hỏi nhé!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {questions.map((q) => (
            <div key={q._id} className="bg-white rounded-2xl md:rounded-[2.5rem] border border-gray-100 p-5 md:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center font-black text-sm md:text-xl shrink-0">
                  {getInitials(q.author)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] md:text-xs font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">
                      {q.category}
                    </span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock size={12} /> {formatDate(q.createdAt)}
                    </span>
                  </div>
                  <h3 className="text-base md:text-xl font-black text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {q.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base line-clamp-3 mb-4 font-medium leading-relaxed">
                    {q.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <MessageCircle size={16} className="text-emerald-600" /> {q.answers.length} phản hồi
                      </span>
                      <span className="font-black text-gray-700">Tác giả: {q.author}</span>
                    </div>
                    <button 
                      onClick={() => setActiveQuestion(q)}
                      className="text-emerald-700 font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Chi tiết & Thảo luận <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ask Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !submitting && setShowAskModal(false)}></div>
           <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] p-6 md:p-12 animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setShowAskModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>

              {success ? (
                <div className="text-center py-12">
                   <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                   </div>
                   <h2 className="text-2xl font-black text-gray-900 uppercase italic mb-4">Gửi thành công!</h2>
                   <p className="text-gray-500 font-medium italic">Câu hỏi của bà con đang được chuyên gia kiểm duyệt và sẽ hiện lên trong giây lát.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tighter mb-2">Đặt câu hỏi <span className="text-emerald-600">cho cộng đồng</span></h2>
                    <p className="text-gray-500 text-sm font-medium">Chuyên gia và các nhà nông khác sẽ hỗ trợ bà con ngay</p>
                  </div>

                  <form onSubmit={handleAskQuestion} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Họ tên của bà con</label>
                        <input 
                          required
                          type="text" 
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                          placeholder="Ví dụ: Chú Bảy"
                          value={newQuestion.author}
                          onChange={(e) => setNewQuestion({...newQuestion, author: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Số điện thoại (Bảo mật)</label>
                        <input 
                          type="tel" 
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                          placeholder="09xx.xxx.xxx"
                          value={newQuestion.authorPhone}
                          onChange={(e) => setNewQuestion({...newQuestion, authorPhone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Chủ đề cần hỏi</label>
                      <select 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                        value={newQuestion.category}
                        onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                      >
                        <option>Sầu riêng</option>
                        <option>Cà phê</option>
                        <option>Hồ tiêu</option>
                        <option>Phân bón & Đất</option>
                        <option>Khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Tiêu đề ngắn gọn</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                        placeholder="Ví dụ: Sầu riêng bị cháy lá xử lý sao?"
                        value={newQuestion.title}
                        onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2">Nội dung chi tiết</label>
                      <textarea 
                        required
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                        placeholder="Mô tả kỹ tình trạng vườn để nhận tư vấn chính xác..."
                        value={newQuestion.content}
                        onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                      />
                    </div>

                    <button 
                      disabled={submitting}
                      type="submit"
                      className="w-full bg-[#1a5c2a] hover:bg-[#144620] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-100 transition-all disabled:opacity-50"
                    >
                      {submitting ? "ĐANG GỬI..." : "GỬI CÂU HỎI NGAY"}
                    </button>
                  </form>
                </>
              )}
           </div>
        </div>
      )}

      {/* Discussion Modal */}
      {activeQuestion && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveQuestion(null)}></div>
           <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-500 overflow-hidden">
              {/* Header */}
              <div className="p-6 md:p-10 border-b border-gray-50 relative bg-emerald-900 text-white">
                 <button 
                  onClick={() => setActiveQuestion(null)}
                  className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                 >
                  <X size={24} />
                 </button>
                 <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    {activeQuestion.category}
                 </div>
                 <h2 className="text-xl md:text-3xl font-black uppercase italic leading-tight">{activeQuestion.title}</h2>
                 <p className="mt-4 text-white/70 text-sm md:text-base font-medium italic">"{activeQuestion.content}"</p>
                 <div className="mt-6 flex items-center gap-3 text-xs font-bold opacity-60">
                    <User size={14} /> Tác giả: {activeQuestion.author} • {formatDate(activeQuestion.createdAt)}
                 </div>
              </div>

              {/* Answers List */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 bg-gray-50/50">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">{activeQuestion.answers.length} Phản hồi từ cộng đồng</h4>
                 
                 <div className="space-y-4">
                    {activeQuestion.answers.length === 0 ? (
                       <div className="text-center py-10">
                          <p className="text-gray-400 text-sm italic">Chưa có phản hồi nào. Hãy là người đầu tiên chia sẻ!</p>
                       </div>
                    ) : (
                       activeQuestion.answers.map((ans, i) => (
                          <div key={i} className={`flex gap-3 md:gap-4 ${ans.authorRole === 'admin' || ans.authorRole === 'expert' ? 'items-start' : 'items-start'}`}>
                             <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${ans.authorRole === 'admin' || ans.authorRole === 'expert' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {getInitials(ans.author)}
                             </div>
                             <div className="flex-1">
                                <div className={`p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-sm ${ans.authorRole === 'admin' || ans.authorRole === 'expert' ? 'bg-white border-2 border-orange-100' : 'bg-white border border-gray-100'}`}>
                                   <div className="flex items-center justify-between mb-2">
                                      <span className="font-black text-sm md:text-base text-gray-900">
                                         {ans.author} {ans.authorRole === 'admin' || ans.authorRole === 'expert' ? <span className="ml-2 text-[9px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">CHUYÊN GIA</span> : null}
                                      </span>
                                      <span className="text-[10px] text-gray-400 font-bold">{formatDate(ans.createdAt)}</span>
                                   </div>
                                   <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                                      {ans.content}
                                   </p>
                                </div>
                             </div>
                          </div>
                       ))
                    )}
                 </div>
              </div>

              {/* Reply Input */}
              <div className="p-6 border-t border-gray-100 bg-white">
                 <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Viết phản hồi của bà con..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-full py-4 pl-6 pr-16 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleReply(activeQuestion._id)}
                    />
                    <button 
                      onClick={() => handleReply(activeQuestion._id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
                    >
                      <Send size={18} />
                    </button>
                 </div>
                 <p className="mt-3 text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest italic flex items-center justify-center gap-1">
                    <AlertCircle size={12} /> Chia sẻ kiến thức là giúp đỡ cộng đồng nhà nông
                 </p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
