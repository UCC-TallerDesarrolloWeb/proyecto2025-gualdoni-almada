import React, { useState } from 'react';
import Input from '@components/Input';
import Button from '@components/Button';

export default function Contact(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const emailVal = (v)=>/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);

  return (
    <section className="section">
      <h2>Contacto</h2>
      {sent ? <p>¡Gracias por tu mensaje! Te responderemos pronto.</p> : (
        <form onSubmit={(e)=>{e.preventDefault(); setSent(true);}}>
          <Input id="nombre" label="Nombre" placeholder="Tu nombre" validator={(v)=>v.trim().length>=2} errorMsg="Mínimo 2 caracteres" onChange={setName} />
          <Input id="email" label="Email" type="email" placeholder="tucorreo@mail.com" validator={emailVal} errorMsg="Email inválido" onChange={setEmail} />
          <Input id="mensaje" label="Mensaje" placeholder="¿En qué podemos ayudarte?" validator={(v)=>v.trim().length>=5} errorMsg="Mínimo 5 caracteres" onChange={setMsg} />
          <Button className="primary-btn" type="submit">Enviar</Button>
        </form>
      )}
    </section>
  );
}