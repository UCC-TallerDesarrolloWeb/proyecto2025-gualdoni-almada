import React, { useContext, useEffect, useMemo, useState } from 'react';
import data from '@data/productos.json';
import Card from '@components/Card';
import { CartContext } from '@context/CartContext';

export default function Products(){
  const { addToCart } = useContext(CartContext);
  const [texto, setTexto] = useState('');
  const [marca, setMarca] = useState('');
  const [ordPrecio, setOrdPrecio] = useState('');
  const [ordPuffs, setOrdPuffs] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{ if(!texto && !marca && !ordPrecio && !ordPuffs){ setError('Seleccioná al menos un criterio para filtrar o escribe algo.'); } else { setError(''); } }, [texto, marca, ordPrecio, ordPuffs]);

  const filtrados = useMemo(()=>{
    let lista = [...data];
    const t = texto.trim().toLowerCase();
    if (t) lista = lista.filter(p => p.nombre.toLowerCase().includes(t) || p.features?.some(f=>f.toLowerCase().includes(t)));
    if (marca) lista = lista.filter(p => p.marca === marca);
    if (ordPrecio === 'mayor-menor') lista.sort((a,b)=>b.precio-a.precio);
    if (ordPrecio === 'menor-mayor') lista.sort((a,b)=>a.precio-b.precio);
    if (ordPuffs === 'mayor-menor') lista.sort((a,b)=>b.puffs-a.puffs);
    if (ordPuffs === 'menor-mayor') lista.sort((a,b)=>a.puffs-b.puffs);
    return lista;
  }, [texto, marca, ordPrecio, ordPuffs]);

  return (
    <section id="productos" className="section">
      <h2>Catálogo</h2>
      <div className="filtros">
        <div className="filtro-grupo">
          <label htmlFor="busqueda-texto">Buscar producto</label>
          <input id="busqueda-texto" type="text" placeholder="Buscar por nombre o sabor..." size={30} maxLength={50} onChange={e=>setTexto(e.target.value)} />
        </div>
        <div className="filtro-grupo">
          <label htmlFor="filtro-marca">Filtrar por marca</label>
          <select id="filtro-marca" onChange={e=>setMarca(e.target.value)}>
            <option value="">Todas las marcas</option>
            <option value="Elf Bar">Elf Bar</option>
            <option value="Lost Mary">Lost Mary</option>
            <option value="Vuse">Vuse</option>
          </select>
        </div>
        <div className="filtro-grupo">
          <label htmlFor="filtro-precio">Ordenar por precio</label>
          <select id="filtro-precio" onChange={e=>setOrdPrecio(e.target.value)}>
            <option value="">Sin orden</option>
            <option value="menor-mayor">Menor a mayor</option>
            <option value="mayor-menor">Mayor a menor</option>
          </select>
        </div>
        <div className="filtro-grupo">
          <label htmlFor="filtro-puffs">Ordenar por puffs</label>
          <select id="filtro-puffs" onChange={e=>setOrdPuffs(e.target.value)}>
            <option value="">Sin orden</option>
            <option value="menor-mayor">Menor a mayor</option>
            <option value="mayor-menor">Mayor a menor</option>
          </select>
        </div>
      </div>
      {error && <p className="error-text" role="alert">{error}</p>}
      <div className="product-grid">
        {filtrados.map(p => <Card key={p.id} product={p} onAdd={addToCart} />)}
      </div>
    </section>
  );
}