"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  slug: string;
  category: string;
  seller?: {
    _id: string;
    username: string;
    role?: string;
    vendorInfo?: {
      storeName: string;
    }
  };
  selectedVariant?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  updateQuantity: (index: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    // 1. Initialize Session ID
    let sid = localStorage.getItem('cartSessionId');
    if (!sid) {
      sid = 'pbg-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('cartSessionId', sid);
    }
    setSessionId(sid);

    // 2. Initial Load from LocalStorage (for speed)
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }

    // 3. Fetch from Server (for sync/cross-device)
    const fetchFromServer = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cart?sessionId=${sid}`);
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            // Merge logic: if server has data, trust server more or merge
            // For now: if local is empty, use server. If local has data, trust local but sync later
            if (!savedCart || JSON.parse(savedCart).length === 0) {
               const serverItems = data.items.map((i: any) => ({
                 ...i.product,
                 _id: i.product._id,
                 quantity: i.qty
               }));
               setCart(serverItems);
            }
          }
        }
      } catch (e) {}
    };
    fetchFromServer();
  }, []);

  // Sync with server on change + periodically
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    if (!sessionId) return;

    const syncWithServer = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cart/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            items: cart.map(item => ({
              product: item._id,
              qty: item.quantity,
              price: item.price,
              name: item.name
            }))
          })
        });
      } catch (e) {}
    };

    const timer = setTimeout(syncWithServer, 2000); // Debounce sync
    return () => clearTimeout(timer);
  }, [cart, sessionId]);

  const addToCart = (product: any, quantity: number = 1) => {
    setCart(prev => {
      // Find item with same ID AND same Variant
      const existing = prev.find(item => 
        item._id === product._id && item.selectedVariant === product.selectedVariant
      );
      
      if (existing) {
        return prev.map(item => 
          (item._id === product._id && item.selectedVariant === product.selectedVariant)
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => prev.map((item, i) => i === index ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
