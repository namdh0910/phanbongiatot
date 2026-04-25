"use client";
import { useState, useEffect } from "react";
import './VendorResources.css';

export default function VendorResources() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Tài liệu");

  useEffect(() => {
    setMounted(true);
  }, []);

  const photos = [
    { name: "Banner Acti Rooti", size: "1080x1080", img: "https://images.unsplash.com/photo-1592323860533-899478f654b0?q=80&w=400" },
    { name: "Khuyến mãi mùa vụ", size: "Banner 1200x630", img: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=400" },
    { name: "Story Kỹ thuật", size: "9:16 Story", img: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=400" },
    { name: "Nemano Diệt Tuyến Trùng", size: "1080x1080", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400" },
  ];

  const captions = [
    { 
      text: "🌱 KÍCH RỄ SIÊU TỐC - CÂY XANH TRÁI NGỌT\nBà con đang lo lắng cây chậm phát triển, rễ yếu? Acti Rooti chính là giải pháp vàng giúp bộ rễ phát triển mạnh mẽ, hấp thụ dinh dưỡng tối đa.", 
      hashtags: "#PhanBonGiaTot #KichRe #NongNghiep" 
    },
    { 
      text: "💥 DIỆT TUYẾN TRÙNG - BẢO VỆ VƯỜN SẦU\nTuyến trùng gây thối rễ, vàng lá đang tấn công vườn nhà mình? Dùng ngay Nemano để bảo vệ bộ rễ an toàn, hiệu quả bền lâu.", 
      hashtags: "#SauRieng #TuyenTrung #BaoVeCayTrong" 
    },
  ];

  const videos = [
    { title: "Hướng dẫn sử dụng Acti Rooti cho sầu riêng con", tag: "Kỹ thuật", duration: "05:20", thumb: "https://images.unsplash.com/photo-1592323860533-899478f654b0?q=80&w=400" },
    { title: "Cách nhận biết tuyến trùng hại rễ cà phê", tag: "Tư vấn", duration: "03:45", thumb: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=400" },
  ];

  const rankings = [
    { rank: 1, name: "Đại lý Tám Đắk Lắk", province: "Đắk Lắk", value: "155.000.000đ" },
    { rank: 2, name: "Vật tư nông nghiệp Năm Bình", province: "Bình Phước", value: "142.000.000đ" },
    { rank: 3, name: "Cửa hàng sầu riêng Tư Anh", province: "Tây Ninh", value: "128.000.000đ" },
    { rank: 4, name: "Đại lý phân bón Miền Tây", province: "Tiền Giang", value: "98.000.000đ" },
    { rank: 5, name: "Cửa hàng Kỹ thuật Xanh", province: "Gia Lai", value: "85.000.000đ" },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Đã copy caption!");
  };

  if (!mounted) return null;

  return (
    <div className="vendor-resources-wrapper">
      {/* Header & Tabs */}
      <header className="resources-header">
        <h1>Hỗ trợ đại lý</h1>
        <div className="tab-switcher">
          {["Tài liệu", "Video", "Bảng xếp hạng"].map(tab => (
            <div 
              key={tab} 
              className={`tab-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </header>

      <div className="tab-content">
        {/* TAB TÀI LIỆU */}
        {activeTab === "Tài liệu" && (
          <>
            <section className="resource-section">
              <h3>Thư viện ảnh & Banner</h3>
              <div className="photo-grid">
                {photos.map((photo, index) => (
                  <div key={index} className="photo-card">
                    <img src={photo.img} className="photo-preview" alt="" />
                    <div className="photo-info">
                      <span className="photo-name">{photo.name}</span>
                      <span className="photo-size">{photo.size}</span>
                      <button className="download-btn" onClick={() => alert("Đang tải ảnh...")}>Tải về</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="resource-section">
              <h3>Caption mẫu bán hàng</h3>
              {captions.map((caption, index) => (
                <div key={index} className="caption-card">
                  <p className="caption-text">{caption.text}</p>
                  <div className="caption-footer">
                    <span className="hashtags">{caption.hashtags}</span>
                    <button className="copy-btn" onClick={() => copyToClipboard(caption.text)}>Copy</button>
                  </div>
                </div>
              ))}
            </section>
          </>
        )}

        {/* TAB VIDEO */}
        {activeTab === "Video" && (
          <section className="resource-section">
            <h3>Video kỹ thuật sản phẩm</h3>
            {videos.map((video, index) => (
              <div key={index} className="video-card">
                <div className="video-thumb-container">
                  <img src={video.thumb} className="video-thumb" alt="" />
                  <div className="play-icon">▶️</div>
                </div>
                <div className="video-info">
                  <span className="video-tag">{video.tag}</span>
                  <h4 className="video-title">{video.title}</h4>
                  <span className="video-meta">Thời lượng: {video.duration}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* TAB BẢNG XẾP HẠNG */}
        {activeTab === "Bảng xếp hạng" && (
          <>
            <div className="reward-banner">
              <div className="reward-info">
                <h4>Chương trình thi đua tháng 4</h4>
                <p>Top 3 đại lý có doanh số cao nhất nhận thêm 2% hoa hồng.</p>
              </div>
              <button className="text-xs font-black text-orange-600 underline">Chi tiết</button>
            </div>

            <section className="resource-section">
              <h3>Bảng xếp hạng doanh số</h3>
              <div className="ranking-list">
                {rankings.map((item, index) => (
                  <div key={index} className={`rank-item rank-${item.rank}`}>
                    <div className="rank-num">{item.rank}</div>
                    <div className="rank-info">
                      <div className="rank-name">{item.name}</div>
                      <div className="rank-loc">{item.province}</div>
                    </div>
                    <div className="rank-value">
                      <div className="rank-amount">{item.value}</div>
                      <div className="rank-label">Doanh số</div>
                    </div>
                  </div>
                ))}
                {/* My Rank Mock */}
                <div className="rank-item my-rank">
                   <div className="rank-num">24</div>
                   <div className="rank-info">
                      <div className="rank-name">Đại lý của bạn (Tôi)</div>
                      <div className="rank-loc">Bình Phước</div>
                   </div>
                   <div className="rank-value">
                      <div className="rank-amount">45.600.000đ</div>
                      <div className="rank-label">Doanh số</div>
                   </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
