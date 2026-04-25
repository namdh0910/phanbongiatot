"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import './VendorOrders.css';

export default function VendorOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  
  // New UI States
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusToUpdate, setStatusToUpdate] = useState<any>(null);
  const [cancelReason, setCancelReason] = useState("");

  const tabs = [
    { name: "Tất cả", count: 24 },
    { name: "Mới", count: 3 },
    { name: "Đang xử lý", count: 5 },
    { name: "Đang giao", count: 8 },
    { name: "Hoàn thành", count: 12 },
    { name: "Đã hủy", count: 2 },
  ];

  // Mock data for demonstration if no real orders
  const mockOrders = [
    {
      _id: "1",
      orderCode: "PBG-2026-001",
      createdAt: "2026-04-25T10:00:00Z",
      orderStatus: "Mới",
      customerInfo: { name: "Nguyễn Văn An", phone: "0912345678", address: "Hòa Thành, Tây Ninh" },
      orderItems: [
        { name: "Acti Rooti 5L", qty: 2, price: 340000 },
        { name: "Nemano 1L", qty: 1, price: 255000 },
        { name: "Amino Acid", qty: 3, price: 99000 }
      ],
      totalPrice: 1232000
    },
    {
      _id: "2",
      orderCode: "PBG-2026-002",
      createdAt: "2026-04-25T09:30:00Z",
      orderStatus: "Đang giao",
      customerInfo: { name: "Trần Thị Bình", phone: "0987654321", address: "Gia Nghĩa, Đắk Nông" },
      orderItems: [
        { name: "Combo Sầu Riêng", qty: 1, price: 1160000 }
      ],
      totalPrice: 1160000
    },
    {
      _id: "3",
      orderCode: "PBG-2026-003",
      createdAt: "2026-04-24T15:20:00Z",
      orderStatus: "Hoàn thành",
      customerInfo: { name: "Chú Năm Sầu Riêng", phone: "0333444555", address: "Bình Phước" },
      orderItems: [
        { name: "Kích Rễ Siêu Tốc", qty: 10, price: 120000 }
      ],
      totalPrice: 1200000
    }
  ];

  useEffect(() => {
    setMounted(true);
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/orders/vendor/me`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setOrders(data);
      } else {
        setOrders(mockOrders); // Use mock if empty
      }
    } catch (err) {
      console.error(err);
      setOrders(mockOrders); // Fallback to mock on error
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!statusToUpdate) return;
    setUpdating(statusToUpdate.orderId);
    
    // Simulate API
    await new Promise(r => setTimeout(r, 1000));
    
    setOrders(prev => prev.map(o => o._id === statusToUpdate.orderId ? {...o, orderStatus: statusToUpdate.status} : o));
    setUpdating(null);
    setStatusToUpdate(null);
    setCancelReason("");
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Mới': return 'status-new';
      case 'Đang xử lý': return 'status-processing';
      case 'Đang giao': return 'status-shipping';
      case 'Hoàn thành': return 'status-done';
      case 'Đã hủy': return 'status-cancel';
      default: return '';
    }
  };

  if (!mounted) return null;

  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === "Tất cả" || order.orderStatus === activeTab;
    const matchesSearch = order.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="vendor-orders-page">
      {/* Header & Search */}
      <header className="orders-header">
        <h1>Quản lý đơn hàng</h1>
        <div className="search-container">
          <input 
            className="search-input"
            placeholder="Tìm mã đơn hoặc tên khách..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery("")}>✕</button>
          )}
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="filter-tabs-wrapper">
        <div className="filter-tabs">
          {tabs.map(tab => (
            <button 
              key={tab.name}
              className={`tab-btn ${activeTab === tab.name ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name} <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {loading ? (
          <div className="text-center py-10 text-gray-400 font-bold">Đang tải dữ liệu...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
             <div className="text-4xl mb-4">📦</div>
             <p className="text-gray-400 font-bold">Không tìm thấy đơn hàng nào</p>
          </div>
        ) : filteredOrders.map(order => (
          <div key={order._id} className="order-card">
            <div className="card-row-1">
              <div className="order-id-meta">
                <span className="order-id">{order.orderCode}</span>
                <span className="order-date">{new Date(order.createdAt).toLocaleDateString("vi-VN")}</span>
              </div>
              <span className={`status-badge ${getStatusClass(order.orderStatus)}`}>
                {order.orderStatus}
              </span>
            </div>

            <div className="card-row-2">
              <div className="product-snippet">
                {order.orderItems[0].name} {order.orderItems.length > 1 ? `và ${order.orderItems[1].name}` : ''}
              </div>
              {order.orderItems.length > 2 && (
                <div className="more-products">+{order.orderItems.length - 2} sản phẩm khác</div>
              )}
            </div>

            <div className="card-row-3">
              <span className="customer-name">{order.customerInfo.name}</span>
              <div className="customer-contact">
                📞 <a href={`tel:${order.customerInfo.phone}`} className="phone-link">{order.customerInfo.phone}</a>
              </div>
              <span className="customer-address">📍 {order.customerInfo.address}</span>
            </div>

            <div className="card-row-4">
              <div className="total-price-box">
                <span className="price-label">Tổng thanh toán</span>
                <span className="price-value">₫{order.totalPrice.toLocaleString()}</span>
              </div>
              <div className="card-actions">
                <button className="action-outline-btn" onClick={() => setSelectedOrder(order)}>Chi tiết</button>
                <button className="action-solid-btn" onClick={() => setStatusToUpdate({orderId: order._id, status: order.orderStatus})}>Cập nhật</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="pagination">
          <button className="load-more-btn">Tải thêm đơn hàng...</button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="overlay" onClick={() => setSelectedOrder(null)}>
          <div className="detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chi tiết đơn hàng</h2>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <section className="modal-section">
              <h3>Thông tin khách hàng</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Người nhận</label>
                  <span>{selectedOrder.customerInfo.name}</span>
                </div>
                <div className="info-item">
                  <label>Số điện thoại</label>
                  <span>{selectedOrder.customerInfo.phone}</span>
                </div>
                <div className="info-item">
                  <label>Địa chỉ</label>
                  <span>{selectedOrder.customerInfo.address}</span>
                </div>
              </div>
            </section>

            <section className="modal-section">
              <h3>Danh sách sản phẩm</h3>
              <div className="product-list">
                {selectedOrder.orderItems.map((item: any, idx: number) => (
                  <div key={idx} className="product-item">
                    <div className="prod-info">
                      <h4>{item.name}</h4>
                      <span className="prod-meta">₫{item.price.toLocaleString()} x {item.qty}</span>
                    </div>
                    <span className="prod-total">₫{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 mt-2 border-t-2 border-dashed border-gray-100">
                  <span className="font-black text-gray-400 uppercase text-xs">Tổng cộng</span>
                  <span className="font-black text-red-600 text-lg">₫{selectedOrder.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </section>

            <section className="modal-section">
              <h3>Lịch trình đơn hàng</h3>
              <div className="timeline">
                <div className="timeline-step">
                  <div className="step-circle active">✓</div>
                  <div className="step-content active">
                    <h4>Đã đặt hàng</h4>
                    <p>{new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}</p>
                  </div>
                </div>
                <div className={`timeline-step ${['Đang chuẩn bị', 'Đang giao', 'Hoàn thành'].includes(selectedOrder.orderStatus) ? 'active' : ''}`}>
                  <div className={`step-circle ${['Đang chuẩn bị', 'Đang giao', 'Hoàn thành'].includes(selectedOrder.orderStatus) ? 'active' : ''}`}>
                    {['Đang chuẩn bị', 'Đang giao', 'Hoàn thành'].includes(selectedOrder.orderStatus) ? '✓' : '2'}
                  </div>
                  <div className={`step-content ${['Đang chuẩn bị', 'Đang giao', 'Hoàn thành'].includes(selectedOrder.orderStatus) ? 'active' : ''}`}>
                    <h4>Xác nhận đơn</h4>
                    <p>Đã kiểm kho & chuẩn bị hàng</p>
                  </div>
                </div>
                <div className={`timeline-step ${['Đang giao', 'Hoàn thành'].includes(selectedOrder.orderStatus) ? 'active' : ''}`}>
                  <div className={`step-circle ${['Đang giao', 'Hoàn thành'].includes(selectedOrder.orderStatus) ? 'active' : ''}`}>
                    {['Đang giao', 'Hoàn thành'].includes(selectedOrder.orderStatus) ? '✓' : '3'}
                  </div>
                  <div className={`step-content ${['Đang giao', 'Hoàn thành'].includes(selectedOrder.orderStatus) ? 'active' : ''}`}>
                    <h4>Đang vận chuyển</h4>
                    <p>Đang trên đường giao tới khách</p>
                  </div>
                </div>
                <div className={`timeline-step ${selectedOrder.orderStatus === 'Hoàn thành' ? 'active' : ''}`}>
                  <div className={`step-circle ${selectedOrder.orderStatus === 'Hoàn thành' ? 'active' : ''}`}>
                    {selectedOrder.orderStatus === 'Hoàn thành' ? '✓' : '4'}
                  </div>
                  <div className={`step-content ${selectedOrder.orderStatus === 'Hoàn thành' ? 'active' : ''}`}>
                    <h4>Hoàn thành</h4>
                    <p>Khách đã nhận hàng thành công</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="action-outline-btn py-4" onClick={() => window.print()}>In phiếu giao</button>
              <a href={`tel:${selectedOrder.customerInfo.phone}`} className="action-solid-btn py-4 text-center">Gọi khách</a>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Bottom Sheet */}
      {statusToUpdate && (
        <div className="overlay" onClick={() => setStatusToUpdate(null)}>
          <div className="status-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Cập nhật trạng thái</h2>
              <button className="close-btn" onClick={() => setStatusToUpdate(null)}>✕</button>
            </div>

            <div className="status-options">
              {['Mới', 'Đang xử lý', 'Đang giao', 'Hoàn thành', 'Đã hủy'].map(status => (
                <div 
                  key={status}
                  className={`status-option ${statusToUpdate.status === status ? 'active' : ''}`}
                  onClick={() => setStatusToUpdate({...statusToUpdate, status})}
                >
                  <div className="radio-circle"></div>
                  <span className="status-text">{status}</span>
                </div>
              ))}
            </div>

            {statusToUpdate.status === 'Đã hủy' && (
              <textarea 
                className="cancel-reason"
                placeholder="Nhập lý do hủy đơn (bắt buộc)..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            )}

            <button 
              className="save-btn mt-6" 
              onClick={handleUpdateStatus}
              disabled={updating === statusToUpdate.orderId}
            >
              {updating === statusToUpdate.orderId ? 'Đang lưu...' : 'LƯU TRẠNG THÁI'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
