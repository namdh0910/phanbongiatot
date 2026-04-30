"use client";
import { useState, useEffect } from "react";
import './VendorCommission.css';

export default function VendorCommission() {
  const [mounted, setMounted] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Mock Data
  const summary = {
    totalThisMonth: 12500000,
    paid: 8200000,
    pending: 4300000,
    nextPayment: "05/05/2026"
  };

  const chartData = [
    { month: "11", value: 40 },
    { month: "12", value: 65 },
    { month: "01", value: 80 },
    { month: "02", value: 45 },
    { month: "03", value: 95 },
    { month: "04", value: 75 },
  ];

  const history = [
    { id: "#1024", prod: "Acti Rooti 5L", revenue: 680000, rate: "15%", commission: 102000, status: "Chờ xác nhận", statusClass: "status-wait" },
    { id: "#1023", prod: "Nemano 1L", revenue: 255000, rate: "15%", commission: 38250, status: "Sắp thanh toán", statusClass: "status-ready" },
    { id: "#1022", prod: "Combo Sầu Riêng", revenue: 1160000, rate: "20%", commission: 232000, status: "Đã thanh toán", statusClass: "status-done" },
    { id: "#1021", prod: "Amino Acid", revenue: 99000, rate: "10%", commission: 9900, status: "Đã thanh toán", statusClass: "status-done" },
    { id: "#1020", prod: "Acti Flora", revenue: 155000, rate: "10%", commission: 15500, status: "Đã thanh toán", statusClass: "status-done" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="vendor-commission-wrapper">
      {/* Header */}
      <header className="comm-header">
        <h1>Hoa hồng đại lý</h1>
      </header>

      {/* Summary Cards */}
      <section className="summary-cards">
        <div className="summary-card primary">
          <label>Hoa hồng tháng này</label>
          <div className="value">₫{summary.totalThisMonth.toLocaleString()}</div>
          <div className="payment-info" style={{ color: 'rgba(255,255,255,0.6)' }}>
             Kỳ thanh toán: {summary.nextPayment}
          </div>
        </div>
        
        <div className="summary-card">
          <label>Đã thanh toán</label>
          <div className="value" style={{ fontSize: '20px' }}>₫{summary.paid.toLocaleString()}</div>
        </div>

        <div className="summary-card highlight">
          <label>Chờ thanh toán</label>
          <div className="value">₫{summary.pending.toLocaleString()}</div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <div className="chart-card">
          <h4 className="text-xs font-black text-gray-400 uppercase mb-6">Hiệu suất 6 tháng</h4>
          <div className="bar-chart">
            {chartData.map((item, index) => (
              <div key={index} className="bar-container">
                <div className="bar-hitbox">
                  <div className="bar-fill" style={{ height: `${item.value}%` }}></div>
                </div>
                <span className="bar-label">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Payment */}
      <section className="request-box">
        <button 
          className="request-btn"
          disabled={summary.pending < 500000}
          onClick={() => setShowRequestForm(true)}
        >
          YÊU CẦU THANH TOÁN
        </button>
        <p className="threshold-msg">
          Rút hoa hồng tối thiểu: <b>500.000đ</b>
        </p>
      </section>

      {/* History List */}
      <section className="history-section">
        <div className="section-header">
          <h3>Lịch sử hoa hồng</h3>
          <select className="month-filter">
            <option>Tháng 4, 2026</option>
            <option>Tháng 3, 2026</option>
          </select>
        </div>
        <div className="history-card">
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <div className="item-top">
                <span className="item-id">Đơn {item.id}</span>
                <span className={`item-status ${item.statusClass}`}>{item.status}</span>
              </div>
              <div className="item-details">
                <div className="detail-left">
                  <h4>{item.prod}</h4>
                  <p>Doanh thu: ₫{item.revenue.toLocaleString()}</p>
                </div>
                <div className="detail-right">
                  <div className="comm-value">₫{item.commission.toLocaleString()}</div>
                  <div className="comm-percent">Tỷ lệ: {item.rate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Policy Section */}
      <section className="policy-section mt-8">
        <div className="policy-collapse">
          <div className="policy-header" onClick={() => setIsPolicyOpen(!isPolicyOpen)}>
            <h4>Chính sách hoa hồng đại lý</h4>
            <span>{isPolicyOpen ? '▲' : '▼'}</span>
          </div>
          {isPolicyOpen && (
            <div className="policy-content">
              <table className="policy-table">
                <thead>
                  <tr>
                    <th>Doanh số tháng</th>
                    <th>Tỷ lệ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0 - 5.000.000đ</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>5tr - 15.000.000đ</td>
                    <td>15%</td>
                  </tr>
                  <tr>
                    <td>Trên 15.000.000đ</td>
                    <td>20%</td>
                  </tr>
                </tbody>
              </table>
              <p className="policy-note">
                * Đơn hàng hoàn thành sau 7 ngày mới được tính vào hoa hồng khả dụng để tránh trường hợp khách đổi trả.
              </p>
              <a href="#" className="download-link">Tải chính sách đầy đủ (PDF)</a>
            </div>
          )}
        </div>
      </section>

      {/* Request Modal Mockup */}
      {showRequestForm && (
        <div className="overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'flex-end' }} onClick={() => setShowRequestForm(false)}>
           <div className="bg-white w-full rounded-t-[32px] p-8 animate-in slide-in-from-bottom" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-black mb-6">Xác nhận rút hoa hồng</h3>
              <div className="bg-gray-50 p-4 rounded-2xl mb-6">
                 <div className="flex justify-between mb-2">
                    <span className="text-gray-400 font-bold">Số tiền rút:</span>
                    <span className="font-black text-green-600">₫{summary.pending.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-400 font-bold">Ngân hàng:</span>
                    <span className="font-bold">MB Bank - 0333xxxxxx</span>
                 </div>
              </div>
              <button className="request-btn" onClick={() => { alert("Yêu cầu đã được gửi! Mã OTP đã gửi qua Zalo."); setShowRequestForm(false); }}>XÁC NHẬN RÚT TIỀN</button>
           </div>
        </div>
      )}
    </div>
  );
}
