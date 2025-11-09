import React from 'react';
import Button from './Button';

export default function Card({ product, onAdd }) {
  return (
    <div className="product-card">
      <img className="product-image" src={product.imagen} alt={`Imagen del producto ${product.nombre}`} />
      <div className="product-info">
        <h3>{product.nombre}</h3>
        <p className="price">${product.precio.toLocaleString()}</p>
        <ul className="features">
          <li>{product.puffs} puffs</li>
          {product.features?.map((f,i)=>(<li key={i}>{f}</li>))}
        </ul>
        <Button className="cart-btn" onClick={() => onAdd(product)}>Agregar al carrito</Button>
      </div>
    </div>
  );
}