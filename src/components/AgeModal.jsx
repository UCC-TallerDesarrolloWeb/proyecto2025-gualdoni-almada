import React, { useState } from 'react';
import Button from './Button';

export default function AgeModal({ open, onClose, onConfirm }){
  const [birth, setBirth] = useState('');
  const [error, setError] = useState('');

  const validarFecha = () => {
    if(!birth){ setError('Por favor, ingresa tu fecha de nacimiento.'); return false; }
    const fecha = new Date(birth);
    const hoy = new Date();
    if(isNaN(fecha.getTime()) || fecha > hoy){ setError('La fecha no puede ser futura.'); return false; }
    setError('');
    return true;
  };

  const handleVerify = () => {
    if(!validarFecha()) return;
    const fecha = new Date(birth);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) edad--;
    if(edad >= 18){ onConfirm(); } else { setError('Gracias por visitarnos. Vuelve cuando tengas la edad requerida.'); }
  };

  if(!open) return null;
  return (
    <div className="age-modal">
      <div className="age-content">
        <h2>¿Eres mayor de 18 años?</h2>
        <p>Esta página requiere que tengas 18 años o más para completar la compra.</p>
        <label htmlFor="birthdate">Ingresa tu fecha de nacimiento:</label>
        <input type="date" id="birthdate" onChange={e=>setBirth(e.target.value)} />
        <Button className="primary-btn" onClick={handleVerify}>Verificar</Button>
        {error && <p className="age-error" role="alert">{error}</p>}
        <Button className="secondary-btn" onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
}