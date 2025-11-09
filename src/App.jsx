import React from 'react';
import AppRouter from '@router/AppRouter';
import { CartProvider } from '@context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}