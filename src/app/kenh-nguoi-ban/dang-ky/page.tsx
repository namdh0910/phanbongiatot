"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

const PROVINCES = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

export default function VendorRegister() {
  const settings = useSettings();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    province: "",
    storeName: "",
    address: "",
    businessType: "Cửa hàng vật tư nông nghiệp",
    yearsInBusiness: "< 1 năm",
    description: "",
    interests: [] as string[],
    channels: [] as string[],
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ và tên";
      if (!formData.phone.trim()) {
        newErrors.phone = "Vui lòng nhập số điện thoại";
      } else if (!/^(0[3|5|7|8|9])([0-9]{8})$/.test(formData.phone)) {
        newErrors.phone = "Số điện thoại không đúng định dạng (10 số, đầu 03/05/07/08/09)";
      }
      if (!formData.province) newErrors.province = "Vui lòng chọn tỉnh thành";
    }
    
    if (currentStep === 2) {
      if (!formData.storeName.trim()) newErrors.storeName = "Vui lòng nhập tên cửa hàng";
      if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ cụ thể";
    }

    if (currentStep === 3) {
      if (!formData.agreeTerms) newErrors.agreeTerms = "Bạn cần đồng ý với điều khoản hợp tác";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const toggleInterest = (item: string) => {
    const newInterests = formData.interests.includes(item)
      ? formData.interests.filter(i => i !== item)
      : [...formData.interests, item];
    setFormData({ ...formData, interests: newInterests });
  };

  const toggleChannel = (item: string) => {
    const newChannels = formData.channels.includes(item)
      ? formData.channels.filter(i => i !== item)
      : [...formData.channels, item];
    setFormData({ ...formData, channels: newChannels });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch {
      alert("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-lg w-full text-center">
          <div className="text-8xl mb-8">🌿</div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">Đăng ký thành công!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Cảm ơn anh/chị <b>{formData.fullName}</b> đã tin tưởng. Kỹ sư chuyên trách sẽ liên hệ tư vấn trong vòng <b>24h</b> tới.
          </p>
          <div className="space-y-4">
             <a href={`https://zalo.me/${settings?.zalo || '0773440966'}`} target="_blank" className="block w-full bg-[#0068ff] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-600 transition-all">
               Chat Zalo để được hỗ trợ sớm hơn
             </a>
             <Link href="/" className="block w-full text-gray-400 font-bold hover:text-gray-600"> Quay lại trang chủ </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-10 md:py-20 px-4">
      <div className="max-w-2xl w-full">
        {/* Header Progress */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-6">Hợp Tác Đại Lý</h1>
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map(i => (
              <React.Fragment key={i}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${
                  step === i ? 'bg-[#1a5c2a] text-white shadow-lg scale-110' : 
                  step > i ? 'bg-green-100 text-[#1a5c2a]' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step > i ? '✓' : i}
                </div>
                {i < 3 && <div className={`w-12 h-1 rounded-full ${step > i ? 'bg-green-200' : 'bg-gray-200'}`}></div>}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            {step === 1 ? 'Thông tin cá nhân' : step === 2 ? 'Thông tin cửa hàng' : 'Lĩnh vực quan tâm'}
          </div>
        </div>

        {/* Form Body */}
        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">Họ và tên *</label>
                  <input 
                    className={`w-full bg-gray-50 border-2 rounded-2xl px-5 py-4 outline-none transition-all ${errors.fullName ? 'border-red-200' : 'border-transparent focus:border-[#1a5c2a] focus:bg-white'}`}
                    placeholder="Nguyễn Văn A..."
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1 font-bold">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">Số điện thoại *</label>
                  <input 
                    type="tel"
                    className={`w-full bg-gray-50 border-2 rounded-2xl px-5 py-4 outline-none transition-all ${errors.phone ? 'border-red-200' : 'border-transparent focus:border-[#1a5c2a] focus:bg-white'}`}
                    placeholder="09xx xxx xxx"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 font-bold">{errors.phone}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Email (Nếu có)</label>
                    <input 
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 outline-none focus:border-[#1a5c2a] focus:bg-white transition-all"
                      placeholder="email@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-2">Tỉnh / Thành phố *</label>
                    <select 
                      className={`w-full bg-gray-50 border-2 rounded-2xl px-5 py-4 outline-none transition-all appearance-none ${errors.province ? 'border-red-200' : 'border-transparent focus:border-[#1a5c2a] focus:bg-white'}`}
                      value={formData.province}
                      onChange={e => setFormData({...formData, province: e.target.value})}
                    >
                      <option value="">Chọn tỉnh thành...</option>
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.province && <p className="text-red-500 text-xs mt-1 font-bold">{errors.province}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">Tên cửa hàng / Đại lý *</label>
                  <input 
                    className={`w-full bg-gray-50 border-2 rounded-2xl px-5 py-4 outline-none transition-all ${errors.storeName ? 'border-red-200' : 'border-transparent focus:border-[#1a5c2a] focus:bg-white'}`}
                    placeholder="Ví dụ: Đại lý Vật tư Nông nghiệp Tuấn Cường..."
                    value={formData.storeName}
                    onChange={e => setFormData({...formData, storeName: e.target.value})}
                  />
                  {errors.storeName && <p className="text-red-500 text-xs mt-1 font-bold">{errors.storeName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">Địa chỉ cụ thể *</label>
                  <input 
                    className={`w-full bg-gray-50 border-2 rounded-2xl px-5 py-4 outline-none transition-all ${errors.address ? 'border-red-200' : 'border-transparent focus:border-[#1a5c2a] focus:bg-white'}`}
                    placeholder="Số nhà, tên đường, xã/phường..."
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1 font-bold">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">Loại hình kinh doanh</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Cửa hàng vật tư nông nghiệp", "Đại lý phân phối", "Cá nhân kinh doanh online", "Khác"].map(type => (
                      <label key={type} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all border-2 border-transparent has-[:checked]:border-[#1a5c2a] has-[:checked]:bg-green-50">
                        <input 
                          type="radio" 
                          name="businessType"
                          className="hidden"
                          checked={formData.businessType === type}
                          onChange={() => setFormData({...formData, businessType: type})}
                        />
                        <span className="text-sm font-bold text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">Số năm kinh doanh</label>
                  <select 
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 outline-none focus:border-[#1a5c2a] focus:bg-white transition-all appearance-none"
                    value={formData.yearsInBusiness}
                    onChange={e => setFormData({...formData, yearsInBusiness: e.target.value})}
                  >
                    <option value="< 1 năm">Dưới 1 năm</option>
                    <option value="1-3 năm">Từ 1 đến 3 năm</option>
                    <option value="> 3 năm">Trên 3 năm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">Giới thiệu ngắn (Nếu có)</label>
                  <textarea 
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 outline-none focus:border-[#1a5c2a] focus:bg-white transition-all h-24 resize-none"
                    placeholder="Hãy chia sẻ thêm về kinh nghiệm hoặc mong muốn hợp tác của bạn..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-3">Danh mục anh/chị quan tâm</label>
                  <div className="flex flex-wrap gap-2">
                    {["Phân bón", "Kích rễ", "Tuyến trùng", "Thuốc BVTV", "Combo tiết kiệm"].map(item => (
                      <button 
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border-2 ${
                          formData.interests.includes(item) ? 'bg-[#1a5c2a] text-white border-[#1a5c2a]' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        {formData.interests.includes(item) ? '✓ ' : '+ '}{item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-3">Kênh bán hàng chính</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["Cửa hàng trực tiếp", "Facebook", "Zalo", "TikTok", "Khác"].map(item => (
                      <button 
                        key={item}
                        type="button"
                        onClick={() => toggleChannel(item)}
                        className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all border-2 ${
                          formData.channels.includes(item) ? 'bg-emerald-50 text-[#1a5c2a] border-[#1a5c2a]' : 'bg-white text-gray-500 border-gray-100'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-[#1a5c2a] focus:ring-[#1a5c2a]"
                      checked={formData.agreeTerms}
                      onChange={e => setFormData({...formData, agreeTerms: e.target.checked})}
                    />
                    <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700">
                      Tôi đồng ý cung cấp thông tin chính xác và tuân thủ các Điều khoản & Quy định hợp tác của Phân Bón Giá Tốt.
                    </span>
                  </label>
                  {errors.agreeTerms && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">{errors.agreeTerms}</p>}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-black transition-all hover:bg-gray-200"
                >
                  ← Quay lại
                </button>
              )}
              
              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={nextStep}
                  className="flex-[2] bg-[#1a5c2a] text-white py-4 rounded-2xl font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Tiếp theo →
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-[2] bg-[#f5a623] text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? "Đang gửi..." : "GỬI ĐĂNG KÝ"}
                </button>
              )}
            </div>
          </form>
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">
          Cần hỗ trợ gấp? Gọi hotline: <a href="tel:0773440966" className="font-bold text-gray-500">0773.440.966</a>
        </p>
      </div>
    </div>
  );
}
