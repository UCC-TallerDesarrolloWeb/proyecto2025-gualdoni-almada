/**
 * Array de productos disponibles en el catálogo
 * @constant {Array<Object>} productos
 */
const productos = [
  {
    id: 1,
    nombre: "Elf Bar BC5000 Ultra",
    marca: "Elf Bar",
    precio: 85000,
    puffs: 10000,
    features: ["Diseño compacto"],
    imagen: "imagenes/elf-bar-bc5000-ultra.jpg"
  },
  {
    id: 2,
    nombre: "Lost Mary Galaxy",
    marca: "Lost Mary",
    precio: 90000,
    puffs: 11000,
    features: ["Sabores frutales"],
    imagen: "imagenes/lost-mary-galaxy.jpg"
  },
  {
    id: 3,
    nombre: "Vuse Pod Max",
    marca: "Vuse",
    precio: 58000,
    puffs: 5000,
    features: ["Variedad de cápsulas"],
    imagen: "imagenes/vuse-pod-max.jpg"
  },
  {
    id: 4,
    nombre: "Elf Bar BC4000",
    marca: "Elf Bar",
    precio: 70000,
    puffs: 9000,
    features: ["Tamaño portátil"],
    imagen: "imagenes/elf-bar-bc4000.jpg"
  },
  {
    id: 5,
    nombre: "Lost Mary Pro",
    marca: "Lost Mary",
    precio: 80000,
    puffs: 10000,
    features: ["Sabores intensos"],
    imagen: "imagenes/lost-mary-pro.jpg"
  },
  {
    id: 6,
    nombre: "Vuse Pod Standard",
    marca: "Vuse",
    precio: 50000,
    puffs: 4000,
    features: ["Diseño ergonómico"],
    imagen: "imagenes/vuse-pod-standard.jpg"
  },
  {
    id: 7,
    nombre: "Elf Bar Crystal",
    marca: "Elf Bar",
    precio: 98000,
    puffs: 13000,
    features: ["Diseño transparente"],
    imagen: "imagenes/elf-bar-crystal.jpg"
  },
  {
    id: 8,
    nombre: "Lost Mary Ice",
    marca: "Lost Mary",
    precio: 87000,
    puffs: 9000,
    features: ["Notas mentoladas"],
    imagen: "imagenes/lost-mary-ice.jpg"
  },
  {
    id: 9,
    nombre: "Vuse Eco",
    marca: "Vuse",
    precio: 55000,
    puffs: 6000,
    features: ["Reciclable"],
    imagen: "imagenes/vuse-eco.jpg"
  },
  {
    id: 10,
    nombre: "Elf Bar Lux 1500",
    marca: "Elf Bar",
    precio: 65000,
    puffs: 1500,
    features: ["Compacto y elegante"],
    imagen: "imagenes/elf-bar-lux-1500.jpg",
    masVendido: true
  },
  {
    id: 11,
    nombre: "Lost Mary OS5000",
    marca: "Lost Mary",
    precio: 95000,
    puffs: 5000,
    features: ["Sabores premium"],
    imagen: "imagenes/lost-mary-os5000.jpg",
    masVendido: true
  },
  {
    id: 12,
    nombre: "Vuse Alto",
    marca: "Vuse",
    precio: 60000,
    puffs: 1800,
    features: ["Fácil de usar"],
    imagen: "imagenes/vuse-alto.jpg",
    masVendido: true
  }
];

/**
 * Renderiza una lista de productos en un contenedor especificado
 * @method renderizarProductos
 * @param {Array<Object>} lista - Lista de productos a renderizar
 * @param {string} contenedorId - ID del contenedor HTML donde se renderizarán los productos
 * @return {void}
 */
const renderizarProductos = (lista, contenedorId) => {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) {
    console.error(`Error: Elemento con ID "${contenedorId}" no encontrado.`);
    return;
  }
  contenedor.innerHTML = '';
  if (lista.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron productos.</p>';
    return;
  }
  lista.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img class="product-image" src="${producto.imagen}" alt="Imagen del producto ${producto.nombre}">
      <div class="product-info">
        <h3>${producto.nombre}</h3>
        <p class="price">$${producto.precio.toLocaleString()}</p>
        <ul class="features">
          <li>${producto.puffs} puffs</li>
          ${producto.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <button class="cart-btn" data-id="${producto.id}">Agregar al carrito</button>
      </div>
    `;
    contenedor.appendChild(card);
  });
  contenedor.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', () => agregarAlCarrito(Number(btn.dataset.id), 1));
  });
};

/**
 * Aplica filtros y ordena los productos basados en los inputs del usuario
 * @method aplicarFiltros
 * @return {void}
 */
const aplicarFiltros = () => {
  const busquedaTexto = document.getElementById('busqueda-texto');
  const filtroMarca = document.getElementById('filtro-marca');
  const filtroPrecio = document.getElementById('filtro-precio');
  const filtroPuffs = document.getElementById('filtro-puffs');

  if (!busquedaTexto || !filtroMarca || !filtroPrecio || !filtroPuffs) {
    console.error('Error: Uno o más elementos de filtro no encontrados.');
    return;
  }

  let listaFiltrada = [...productos];

  const texto = busquedaTexto.value.toLowerCase();
  if (texto) {
    listaFiltrada = listaFiltrada.filter(prod =>
      prod.nombre.toLowerCase().includes(texto) ||
      prod.features.some(feature => feature.toLowerCase().includes(texto))
    );
  }

  const marca = filtroMarca.value;
  if (marca) {
    listaFiltrada = listaFiltrada.filter(prod => prod.marca === marca);
  }

  const ordenPrecio = filtroPrecio.value;
  if (ordenPrecio === 'mayor-menor') {
    listaFiltrada.sort((a, b) => b.precio - a.precio);
  } else if (ordenPrecio === 'menor-mayor') {
    listaFiltrada.sort((a, b) => a.precio - b.precio);
  }

  const ordenPuffs = filtroPuffs.value;
  if (ordenPuffs === 'mayor-menor') {
    listaFiltrada.sort((a, b) => b.puffs - a.puffs);
  } else if (ordenPuffs === 'menor-mayor') {
    listaFiltrada.sort((a, b) => a.puffs - b.puffs);
  }

  renderizarProductos(listaFiltrada, 'catalogo');
};

/**
 * Agrega un producto al carrito y lo guarda en localStorage
 * @method agregarAlCarrito
 * @param {number} id - ID del producto a agregar
 * @param {number} initialQuantity - Cantidad inicial a agregar
 * @return {void}
 */
const agregarAlCarrito = (id, initialQuantity) => {
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    alert('Producto no encontrado.');
    return;
  }

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existingItem = carrito.find(item => item.id === id);
  if (existingItem) {
    existingItem.cantidad += initialQuantity;
  } else {
    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: initialQuantity });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
  alert(`${producto.nombre} agregado al carrito.`);
};

/**
 * Actualiza la visualización del carrito y el contador
 * @method actualizarCarrito
 * @return {void}
 */
const actualizarCarrito = () => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const cartItems = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const contactarWhatsApp = document.getElementById('contactar-whatsapp');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const ageModal = document.getElementById('age-modal');

  if (!cartItems || !cartEmpty || !contactarWhatsApp || !cartCount || !cartTotal || !ageModal) {
    console.error('Error: Uno o más elementos del carrito o modal de edad no encontrados.');
    return;
  }

  cartCount.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);

  if (carrito.length === 0) {
    cartItems.innerHTML = '';
    cartTotal.textContent = '';
    cartEmpty.style.display = 'block';
    contactarWhatsApp.style.display = 'none';
    ageModal.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  contactarWhatsApp.style.display = 'block';
  cartItems.innerHTML = '';
  carrito.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <h3>${item.nombre}</h3>
      <p>$${item.precio.toLocaleString()} x ${item.cantidad} = $${(item.precio * item.cantidad).toLocaleString()}</p>
      <button class="quantity-btn decrease" data-id="${item.id}">-</button>
      <span class="quantity">${item.cantidad}</span>
      <button class="quantity-btn increase" data-id="${item.id}">+</button>
      <button class="remove-btn" data-id="${item.id}">Eliminar</button>
    `;
    cartItems.appendChild(itemDiv);
  });

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  cartTotal.textContent = `Total: $${total.toLocaleString()}`;

  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(e.target.dataset.id);
      const action = e.target.classList.contains('increase') ? 'increase' : 'decrease';
      ajustarCantidad(id, action);
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => eliminarDelCarrito(Number(btn.dataset.id)));
  });

  const mensaje = encodeURIComponent(`Hola, quiero comprar: ${carrito.map(item => `${item.cantidad}x ${item.nombre}`).join(', ')}. Total: $${total.toLocaleString()}`);
  contactarWhatsApp.onclick = () => {
    ageModal.style.display = 'block';
    document.getElementById('verify-age').onclick = verificarEdad.bind(null, contactarWhatsApp, mensaje);
  };
};

/**
 * Ajusta la cantidad de un producto en el carrito
 * @method ajustarCantidad
 * @param {number} id - ID del producto
 * @param {string} action - Acción a realizar: 'increase' o 'decrease'
 * @return {void}
 */
const ajustarCantidad = (id, action) => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const item = carrito.find(item => item.id === id);
  if (item) {
    if (action === 'increase') {
      item.cantidad += 1;
    } else if (action === 'decrease' && item.cantidad > 1) {
      item.cantidad -= 1;
    } else if (action === 'decrease' && item.cantidad === 1) {
      carrito = carrito.filter(item => item.id !== id);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  }
};

/**
 * Elimina un producto del carrito
 * @method eliminarDelCarrito
 * @param {number} id - ID del producto a eliminar
 * @return {void}
 */
const eliminarDelCarrito = (id) => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
};

/**
 * Muestra u oculta el modal del carrito
 * @method toggleCarrito
 * @return {void}
 */
const toggleCarrito = () => {
  const modal = document.getElementById('cart-modal');
  if (!modal) {
    console.error('Error: Elemento con ID "cart-modal" no encontrado.');
    return;
  }
  modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
};

/**
 * Verifica si el usuario es mayor de 18 años basado en la fecha de nacimiento
 * @method verificarEdad
 * @param {HTMLElement} whatsappButton - Elemento del botón de WhatsApp
 * @param {string} mensaje - Mensaje codificado para WhatsApp
 * @return {void}
 */
const verificarEdad = (whatsappButton, mensaje) => {
  const birthdateInput = document.getElementById('birthdate');
  const ageError = document.getElementById('age-error');
  const ageModal = document.getElementById('age-modal');

  const birthdate = new Date(birthdateInput.value);
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }

  if (age >= 18) {
    ageModal.style.display = 'none';
    whatsappButton.href = `https://wa.me/1234567890?text=${mensaje}`;
    whatsappButton.click();
  } else {
    ageError.style.display = 'block';
    birthdateInput.disabled = true;
    document.getElementById('verify-age').disabled = true;
  }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  try {
    const masVendidos = productos.filter(p => p.masVendido === true);
    renderizarProductos(masVendidos, 'mas-vendidos');
    renderizarProductos(productos, 'catalogo');
    actualizarCarrito();

    const btnAplicar = document.getElementById('aplicar-filtros');
    const busquedaTexto = document.getElementById('busqueda-texto');
    const verCarrito = document.getElementById('ver-carrito');
    const cerrarCarrito = document.getElementById('cerrar-carrito');

    if (!btnAplicar || !busquedaTexto || !verCarrito || !cerrarCarrito) {
      console.error('Error: Uno o más elementos de inicialización no encontrados.');
      return;
    }

    btnAplicar.addEventListener('click', aplicarFiltros);
    busquedaTexto.addEventListener('input', aplicarFiltros);
    verCarrito.addEventListener('click', toggleCarrito);
    cerrarCarrito.addEventListener('click', toggleCarrito);
  } catch (error) {
    console.error('Error durante la inicialización:', error);
  }
});