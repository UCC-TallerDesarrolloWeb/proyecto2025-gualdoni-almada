import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => i.id === product.id ? ({ ...i, qty: i.qty + qty }) : i);
      return [...prev, { id: product.id, name: product.nombre, price: product.precio, qty }];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const changeQty = (id, dir) => setCart(prev => prev.map(i => i.id === id ? ({ ...i, qty: Math.max( (dir==='dec'? i.qty-1 : i.qty+1), 0) }) : i).filter(i => i.qty>0));
  const clear = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQty, clear, theme, setTheme }}>
      {children}
    </CartContext.Provider>
  );
};