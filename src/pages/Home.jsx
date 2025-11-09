import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Bloom Clouds</h1>
          <p>El mejor vape del mercado</p>
          <Link to="/productos" className="btn primary-btn">Ver Catálogo</Link>
        </div>
      </section>
      <section className="section quienes-somos" id="quienes-somos">
        <h2>Quiénes somos</h2>
        <p>Bloom Clouds es una tienda especializada en vapes y accesorios. Nos dedicamos a ofrecer productos de calidad y la mejor atención.</p>
      </section>
      <section className="cta" id="contacto">
        <div className="cta-container">
          <h2>¿Listo para hacer tu pedido?</h2>
          <p>Escríbenos por WhatsApp y te asesoramos.</p>
          <a href="https://wa.me/1234567890" className="btn primary-btn">Contactar</a>
        </div>
      </section>
    </>
  );
}