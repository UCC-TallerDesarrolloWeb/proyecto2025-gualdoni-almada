import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from '@pages/Home';
import Products from '@pages/Products';
import About from '@pages/About';
import Contact from '@pages/Contact';
import Cart from '@pages/Cart';
import Header from '@components/Header';
import Footer from '@components/Footer';

const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'productos', element: <Products /> },
    { path: 'carrito', element: <Cart /> },
    { path: 'nosotros', element: <About /> },
    { path: 'contacto', element: <Contact /> },
  ]
}]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}