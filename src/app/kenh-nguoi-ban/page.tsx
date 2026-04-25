"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import VendorLanding from "@/components/VendorLanding";
import Link from "next/link";
import './VendorDashboard.css';

export default function VendorDashboard() {
  const [vendor, setVendor] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock Data
  const metrics = {
    ordersToday: 12,
    ordersChange: "+2 đơn",
    revenueMonth: "45.600.000đ",
    revenueChange: "+15%",
    commissionPending: "8.250.000đ",
    productsActive: 24
  };

  const recentOrders = [
    { id: "PBG-1024", name: "Acti Rooti 5L", amount: "680k", status: "Mới", statusClass: "status-new" },
    { id: "PBG-1023", name: "Nemano 1L", amount: "255k", status: "Đang giao", statusClass: "status-shipping" },
    { id: "PBG-1022", name: "Combo Sầu Riêng", amount: "1.160k", status: "Hoàn thành", statusClass: "status-done" },
    { id: "PBG-1021", name: "Amino Acid", amount: "99k", status: "Hoàn thành", statusClass: "status-done" },
    { id: "PBG-1020", name: "Combi Gold", amount: "150k", status: "Hủy", statusClass: "status-cancel" },
  ];

  const chartData = [
    { day: "T2", value: 60 },
    { day: "T3", value: 80 },
    { day: "T4", value: 45 },
    { day: "T5", value: 95 },
    { day: "T6", value: 70 },
    { day: "T7", value: 100 },
    { day: "CN", value: 85 },
  ];

  useEffect(() => {
    setMounted(true);
    const info = JSON.parse(localStorage.getItem("vendorInfo") || "null");
    const token = localStorage.getItem("vendorToken");
    
    if (token && info) {
      setVendor(info);
      fetchFreshInfo();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchFreshInfo = async () => {
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setVendor(data.vendorInfo);
        localStorage.setItem("vendorInfo", JSON.stringify(data.vendorInfo));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/kenh-nguoi-ban";
  };

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a5c2a]"></div>
      </div>
    );
  }

  if (!vendor) {
    return <VendorLanding />;
  }

  return (
    <div className="vendor-dashboard-wrapper">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-user">
          <div className="user-avatar">🏪</div>
          <div className="user-info">
            <h1>Xin chào, {vendor.storeName || "Đại lý"}!</h1>
            <p>{vendor.isApproved ? "Cửa hàng đã kích hoạt" : "Chờ phê duyệt"}</p>
          </div>
        </div>
        <div className="header-actions">
          <div className="action-btn">
            🔔 <span className="notification-badge">3</span>
          </div>
          <div className="action-btn" onClick={handleLogout}>🚪</div>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="metrics-container">
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">Đơn hôm nay</div>
            <div className="metric-value">{metrics.ordersToday}</div>
            <div className="metric-change change-up">{metrics.ordersChange}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Doanh thu tháng</div>
            <div className="metric-value">{metrics.revenueMonth}</div>
            <div className="metric-change change-up">{metrics.revenueChange}</div>
          </div>
          <div className="metric-card highlight">
            <div className="metric-label">Hoa hồng chờ</div>
            <div className="metric-value" style={{ color: '#f5a623' }}>{metrics.commissionPending}</div>
            <div className="metric-change" style={{ color: '#f5a623' }}>Chờ nhận</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Sản phẩm</div>
            <div className="metric-value">{metrics.productsActive}</div>
            <div className="metric-change" style={{ color: '#a0aec0' }}>Đang bán</div>
          </div>
        </div>
      </section>

      {/* Action Alert */}
      <div className="action-alert">
        <div className="alert-content">
          <p>Bạn có 3 đơn mới cần xác nhận</p>
          <span className="text-[10px] text-orange-600 font-bold uppercase">Ưu tiên xử lý ngay</span>
        </div>
        <Link href="/kenh-nguoi-ban/orders" className="view-btn">Xem ngay</Link>
      </div>

      {/* Revenue Chart */}
      <section className="chart-section">
        <h3 className="section-title">Doanh thu 7 ngày qua</h3>
        <div className="chart-card">
          <div className="bar-chart">
            {chartData.map((item, index) => (
              <div key={index} className="chart-bar-container">
                <div className="bar-hitbox">
                  <div className="bar-fill" style={{ height: `${item.value}%` }}></div>
                </div>
                <span className="bar-label">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="orders-section">
        <h3 className="section-title">Đơn hàng gần đây</h3>
        <div className="orders-card">
          {recentOrders.map((order, index) => (
            <div key={index} className="order-item">
              <div className="order-main">
                <h4>{order.id}</h4>
                <p className="order-meta">{order.name}</p>
              </div>
              <div className="order-right">
                <span className="order-amount">{order.amount}</span>
                <span className={`status-badge ${order.statusClass}`}>{order.status}</span>
              </div>
            </div>
          ))}
          <Link href="/kenh-nguoi-ban/orders" className="view-all-btn">
            Xem tất cả đơn hàng →
          </Link>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link href="/kenh-nguoi-ban" className="nav-item active">
          <span className="nav-icon">📊</span>
          <span className="nav-label">Tổng quan</span>
        </Link>
        <Link href="/kenh-nguoi-ban/orders" className="nav-item">
          <span className="nav-icon">📦</span>
          <span className="nav-label">Đơn hàng</span>
        </Link>
        <Link href="/kenh-nguoi-ban/products" className="nav-item">
          <span className="nav-icon">🌱</span>
          <span className="nav-label">Sản phẩm</span>
        </Link>
        <Link href="/kenh-nguoi-ban/profile" className="nav-item">
          <span className="nav-icon">👤</span>
          <span className="nav-label">Tài khoản</span>
        </Link>
      </nav>
    </div>
  );
}
