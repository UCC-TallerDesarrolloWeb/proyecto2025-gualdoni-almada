import React, { useState } from 'react';

export default function Input({ label, id, type='text', placeholder='', validator, errorMsg='Valor inválido', onChange, size, maxLength }) {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    if (validator && !validator(val)) setError(errorMsg);
    else setError('');
    onChange?.(val);
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} aria-invalid={!!error} aria-describedby={`${id}-error`} onChange={handleChange} size={size} maxLength={maxLength} />
      {error && <p id={`${id}-error`} role="alert" className="error-text">{error}</p>}
    </div>
  );
}