import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '@context/CartContext';

export default function Header(){
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const count = cart.reduce((acc,i)=>acc+i.qty,0);

  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="logo" onClick={()=>navigate('/')}>Bloom Clouds</div>
        <nav className="nav">
          <ul>
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/productos">Productos</NavLink></li>
            <li><NavLink to="/nosotros">Quiénes somos</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
            <li><button className="linklike" onClick={()=>navigate('/carrito')}>Carrito (<span id="cart-count">{count}</span>)</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}