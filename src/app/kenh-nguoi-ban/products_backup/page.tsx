"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import './VendorProducts.css';

export default function VendorProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // New UI States
  const [showWarehouse, setShowWarehouse] = useState(false);
  const [editingPrice, setEditingPrice] = useState<any>(null);
  const [selectedWarehouseItems, setSelectedWarehouseItems] = useState<string[]>([]);
  const [newPrice, setNewPrice] = useState<number>(0);

  // Mock Warehouse Products
  const warehouseProducts = [
    { id: "W1", name: "Acti Rooti 5L", category: "Kích rễ", floorPrice: 280000, img: "https://images.unsplash.com/photo-1592323860533-899478f654b0?q=80&w=200" },
    { id: "W2", name: "Nemano 1L", category: "Tuyến trùng", floorPrice: 195000, img: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=200" },
    { id: "W3", name: "Acti Flora 1L", category: "Phân bón lá", floorPrice: 155000, img: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=200" },
    { id: "W4", name: "Combo Sầu Riêng", category: "Combo", floorPrice: 850000, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=200" },
  ];

  // Initial Dealer Products (Mock)
  const mockDealerProducts = [
    {
      _id: "P1",
      name: "Acti Rooti 5L",
      category: "Kích rễ",
      importPrice: 280000,
      price: 340000,
      stock: 50,
      isVisible: true,
      images: ["https://images.unsplash.com/photo-1592323860533-899478f654b0?q=80&w=200"]
    },
    {
      _id: "P2",
      name: "Nemano 1L",
      category: "Tuyến trùng",
      importPrice: 195000,
      price: 255000,
      stock: 12,
      isVisible: false,
      images: ["https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=200"]
    }
  ];

  useEffect(() => {
    setMounted(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/products/vendor/me`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(mockDealerProducts);
      }
    } catch (err) {
      console.error(err);
      setProducts(mockDealerProducts);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = (id: string) => {
    setProducts(prev => prev.map(p => p._id === id ? { ...p, isVisible: !p.isVisible } : p));
  };

  const handleEditPrice = (product: any) => {
    setEditingPrice(product);
    setNewPrice(product.price);
  };

  const savePrice = () => {
    if (newPrice < editingPrice.importPrice) {
      alert("Giá bán không được thấp hơn giá nhập!");
      return;
    }
    setProducts(prev => prev.map(p => p._id === editingPrice._id ? { ...p, price: newPrice } : p));
    setEditingPrice(null);
  };

  const addFromWarehouse = () => {
    const selected = warehouseProducts.filter(w => selectedWarehouseItems.includes(w.id));
    const newItems = selected.map(w => ({
      _id: `NEW-${Math.random()}`,
      name: w.name,
      category: w.category,
      importPrice: w.floorPrice,
      price: w.floorPrice + 50000, // Default markup
      stock: 0,
      isVisible: true,
      images: [w.img]
    }));
    setProducts([...products, ...newItems]);
    setShowWarehouse(false);
    setSelectedWarehouseItems([]);
  };

  if (!mounted) return null;

  return (
    <div className="vendor-products-wrapper">
      {/* Header & Stats */}
      <header className="products-header">
        <div className="header-top">
          <h1>Sản phẩm</h1>
          <button className="add-btn" onClick={() => setShowWarehouse(true)}>+ Nhập hàng kho</button>
        </div>
        <div className="stats-grid">
          <div className="stat-box">
            <label>Đang bán</label>
            <span>{products.filter(p => p.isVisible).length}</span>
          </div>
          <div className="stat-box">
            <label>Đang ẩn</label>
            <span>{products.filter(p => !p.isVisible).length}</span>
          </div>
          <div className="stat-box">
            <label>Hết hàng</label>
            <span>{products.filter(p => p.stock === 0).length}</span>
          </div>
        </div>
      </header>

      {/* Product List */}
      <div className="products-list">
        {loading ? (
          <div className="text-center py-10 text-gray-400 font-bold">Đang tải...</div>
        ) : products.map(product => (
          <div key={product._id} className={`product-row ${!product.isVisible ? 'hidden-mode' : ''}`}>
            <div className="row-main">
              <img src={product.images[0]} className="prod-thumb" alt="" />
              <div className="prod-info">
                <div className="flex justify-between">
                   <span className="category">{product.category}</span>
                   <span className={`text-[9px] font-black uppercase ${product.stock > 10 ? 'text-green-600' : 'text-orange-500'}`}>
                     Tồn: {product.stock}
                   </span>
                </div>
                <h3>{product.name}</h3>
                <div className="price-stock-bar">
                  <div className="price-item">
                    <label>Giá nhập</label>
                    <span>₫{product.importPrice.toLocaleString()}</span>
                  </div>
                  <div className="price-item selling-price">
                    <label>Giá bán</label>
                    <span>₫{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row-footer">
              <div className="visibility-toggle">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={product.isVisible} 
                    onChange={() => toggleVisibility(product._id)} 
                  />
                  <span className="slider"></span>
                </label>
                <span className="toggle-label">{product.isVisible ? 'Đang hiện' : 'Đang ẩn'}</span>
              </div>
              <button className="edit-price-btn" onClick={() => handleEditPrice(product)}>Sửa giá</button>
            </div>
          </div>
        ))}
      </div>

      {/* Store Link Section */}
      <section className="store-link-section">
        <div className="store-card">
          <h3>Gian hàng của bạn</h3>
          <p className="text-xs opacity-80">Chia sẻ link này để bà con vào mua hàng trực tiếp từ bạn</p>
          <div className="link-box">
            <span>phanbongiatot.com/cua-hang/dai-ly-tu-anh</span>
            <button className="copy-btn" onClick={() => alert("Đã copy!")}>Copy</button>
          </div>
          <div className="store-footer">
            <div className="qr-preview">
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://phanbongiatot.com" alt="QR Code" />
            </div>
            <div className="share-btns">
               <button className="share-btn">Chia sẻ Zalo</button>
               <button className="share-btn">Tải QR</button>
            </div>
          </div>
        </div>
      </section>

      {/* Warehouse Modal */}
      {showWarehouse && (
        <div className="overlay" onClick={() => setShowWarehouse(false)}>
          <div className="warehouse-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Kho Phân Bón Giá Tốt</h2>
              <button className="text-2xl" onClick={() => setShowWarehouse(false)}>✕</button>
            </div>
            <div className="warehouse-list">
              {warehouseProducts.map(p => (
                <div 
                  key={p.id} 
                  className={`warehouse-item ${selectedWarehouseItems.includes(p.id) ? 'selected' : ''}`}
                  onClick={() => setSelectedWarehouseItems(prev => prev.includes(p.id) ? prev.filter(i => i !== p.id) : [...prev, p.id])}
                >
                  <div className="item-check">{selectedWarehouseItems.includes(p.id) ? '✓' : ''}</div>
                  <img src={p.img} className="w-12 h-12 rounded-lg object-cover" alt="" />
                  <div className="flex-1">
                    <div className="font-bold text-sm">{p.name}</div>
                    <div className="text-[10px] text-gray-400">Giá nhập: ₫{p.floorPrice.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="save-btn mt-8" 
              onClick={addFromWarehouse}
              disabled={selectedWarehouseItems.length === 0}
            >
              THÊM VÀO GIAN HÀNG ({selectedWarehouseItems.length})
            </button>
          </div>
        </div>
      )}

      {/* Edit Price Sheet */}
      {editingPrice && (
        <div className="overlay" onClick={() => setEditingPrice(null)}>
          <div className="price-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Điều chỉnh giá bán</h2>
              <button className="text-2xl" onClick={() => setEditingPrice(null)}>✕</button>
            </div>
            <div className="price-info-box">
               <div className="price-row">
                  <label>Giá sàn (Giá nhập)</label>
                  <span>₫{editingPrice.importPrice.toLocaleString()}</span>
               </div>
               <div className="price-row">
                  <label>Giá bán hiện tại</label>
                  <span>₫{editingPrice.price.toLocaleString()}</span>
               </div>
            </div>
            
            <div className="price-input-group">
               <label>Giá bán mong muốn của đại lý</label>
               <div className="input-with-unit">
                  <input 
                    type="number" 
                    className="price-input" 
                    value={newPrice} 
                    onChange={e => setNewPrice(Number(e.target.value))}
                  />
                  <span className="unit-tag">đ</span>
               </div>
            </div>

            <div className="profit-preview">
               <label>Lợi nhuận ước tính / đơn:</label>
               <div className="profit-value">₫{(newPrice - editingPrice.importPrice).toLocaleString()}</div>
            </div>

            <button className="save-btn" onClick={savePrice}>LƯU GIÁ MỚI</button>
          </div>
        </div>
      )}
    </div>
  );
}
