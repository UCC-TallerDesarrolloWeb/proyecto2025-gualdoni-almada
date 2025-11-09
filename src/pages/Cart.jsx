import React, { useContext, useMemo, useState } from 'react';
import { CartContext } from '@context/CartContext';
import Button from '@components/Button';
import AgeModal from '@components/AgeModal';

export default function Cart(){
  const { cart, changeQty, removeFromCart, clear } = useContext(CartContext);
  const [openAge, setOpenAge] = useState(false);
  const [total, setTotal] = useState(0);
  const [descInfo, setDescInfo] = useState('');
  const sum = useMemo(()=>cart.reduce((s,i)=>s + (i.price * i.qty), 0), [cart]);

  const handleDesc = () => {
    const codigo = window.prompt('Ingresá tu código de descuento:');
    if (!codigo) return;
    if (codigo === 'BLOOM1'){
      const nuevo = Math.round(sum * 0.9);
      setDescInfo(`Descuento aplicado (10%). Nuevo total: $${nuevo.toLocaleString()}`);
      setTotal(nuevo);
    } else {
      window.alert('Código inválido. Intenta nuevamente.');
      setDescInfo('');
      setTotal(0);
    }
  };

  const totalFinal = total || sum;

  const sendWhats = () => {
    setOpenAge(true);
  };

  const confirmAge = () => {
    setOpenAge(false);
    const msg = encodeURIComponent(`Hola, quiero comprar: ${cart.map(i=>i.qty+'x '+i.name).join(', ')}. Total: $${totalFinal.toLocaleString()}`);
    window.location.href = `https://wa.me/1234567890?text=${msg}`;
  };

  if(cart.length === 0){
    return <section className="section"><h2>Carrito</h2><p id="cart-empty">El carrito está vacío.</p></section>;
  }

  return (
    <section className="section">
      <h2>Carrito de Compras</h2>
      {cart.map(i => (
        <div className="cart-item" key={i.id}>
          <h3>{i.name}</h3>
          <p>${i.price.toLocaleString()} x {i.qty} = ${(i.price*i.qty).toLocaleString()}</p>
          <button className="quantity-btn decrease" onClick={()=>changeQty(i.id, 'dec')}>-</button>
          <span className="quantity">{i.qty}</span>
          <button className="quantity-btn increase" onClick={()=>changeQty(i.id, 'inc')}>+</button>
          <button className="remove-btn" onClick={()=>removeFromCart(i.id)}>Eliminar</button>
        </div>
      ))}
      <p id="cart-total" className="cart-total">Total: ${sum.toLocaleString()}</p>
      <Button className="secondary-btn" onClick={handleDesc}>Aplicar descuento</Button>
      {descInfo && <p className="info-text" role="status">{descInfo}</p>}
      <div style={{marginTop:'12px'}}>
        <Button className="primary-btn" onClick={sendWhats}>Continuar compra por WhatsApp</Button>
        <Button className="secondary-btn" onClick={clear} style={{marginLeft:'8px'}}>Vaciar carrito</Button>
      </div>
      <AgeModal open={openAge} onClose={()=>setOpenAge(false)} onConfirm={confirmAge} />
    </section>
  );
}