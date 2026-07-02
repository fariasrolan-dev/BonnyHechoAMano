// catalogo-render.js
// Renderiza cards y tabla de precios desde catalogo-data.js.

const nombresCategorias = {
  amigurumis: "Amigurumi",
  llaveros: "Llavero",
  personalizados: "Personalizado",
  ramos: "Ramo",
  virgenes: "Virgen tejida",
};

const nombresCategoriasTabla = {
  amigurumis: "Amigurumis",
  llaveros: "Llaveros",
  personalizados: "Personalizados",
  ramos: "Ramos",
  virgenes: "Virgenes",
};

const whatsappBonny = "51929008614";

function quitarPrefijoProducto(nombre, prefijo) {
  return nombre.replace(prefijo, "").trim();
}

function obtenerDescripcionProducto(producto) {
  const nombre = producto.nombre;
  const nombreNormalizado = nombre.toLowerCase();

  if (producto.categoria === "amigurumis") {
    const modelo = quitarPrefijoProducto(nombre, "Amigurumi");

    if (
      nombreNormalizado.includes("bella") ||
      nombreNormalizado.includes("ariel") ||
      nombreNormalizado.includes("rapunzel")
    ) {
      return `Amigurumi inspirado en ${modelo}, tejido con detalles delicados para un regalo lleno de encanto.`;
    }

    if (nombreNormalizado.includes("boo") || nombreNormalizado.includes("sulivan")) {
      return `Amigurumi de ${modelo}, una pieza tierna y expresiva para coleccionar o regalar.`;
    }

    return `Amigurumi ${modelo} tejido a mano, suave y cuidado en cada detalle para acompanar momentos especiales.`;
  }

  if (producto.categoria === "llaveros") {
    const modelo = quitarPrefijoProducto(nombre, "Llavero");
    return `Llavero ${modelo} tejido a mano, pequeno, practico y pensado para llevar un detalle bonito todos los dias.`;
  }

  if (producto.categoria === "personalizados") {
    const modelo = quitarPrefijoProducto(nombre, "Personalizado");

    if (nombreNormalizado.includes("policia") || nombreNormalizado.includes("obstetra")) {
      return `Figura personalizada ${modelo}, elaborada con detalles que representan su profesion de forma especial.`;
    }

    if (nombreNormalizado.includes("gemelas") || nombreNormalizado.includes("ositos")) {
      return `Detalle personalizado ${modelo}, ideal para celebrar vinculos, recuerdos y momentos compartidos.`;
    }

    return `Regalo personalizado ${modelo}, hecho a mano para reflejar una idea, persona o recuerdo unico.`;
  }

  if (producto.categoria === "ramos") {
    const modelo = quitarPrefijoProducto(nombre, "Ramo");

    if (nombreNormalizado.includes("madre")) {
      return `Ramo ${modelo} elaborado a mano, pensado para expresar carino en una fecha muy especial.`;
    }

    if (
      nombreNormalizado.includes("cr7") ||
      nombreNormalizado.includes("messi") ||
      nombreNormalizado.includes("snoopy") ||
      nombreNormalizado.includes("pooh")
    ) {
      return `Ramo ${modelo} con un detalle tematico, ideal para sorprender con un regalo original y emotivo.`;
    }

    return `Ramo ${modelo} tejido con acabado artesanal, una opcion elegante para regalar flores que perduran.`;
  }

  if (producto.categoria === "virgenes") {
    const modelo = quitarPrefijoProducto(nombre, "Virgen");
    return `Virgen ${modelo} tejida a mano, una pieza sobria y delicada para regalar, decorar o acompanar un espacio especial.`;
  }

  return "Producto artesanal de Bonny, elaborado a mano con dedicacion y detalles pensados para cada pedido.";
}

function obtenerUrlImagenProducto(producto) {
  if (typeof window !== "undefined" && window.location) {
    return new URL(producto.imagen, window.location.href).href;
  }

  return producto.imagen;
}

function obtenerLinkWhatsapp(producto) {
  const urlImagen = obtenerUrlImagenProducto(producto);
  const mensaje = `Hola Bonny, quiero consultar por ${producto.nombre}. Imagen de referencia: ${urlImagen}`;

  return `https://wa.me/${whatsappBonny}?text=${encodeURIComponent(mensaje)}`;
}

function obtenerPrecioVisible(precio) {
  if (!precio || precio <= 0) {
    return "Consultar";
  }

  return `S/ ${precio.toFixed(2)}`;
}

function obtenerTiempoEntrega(categoria) {
  if (categoria === "amigurumis") {
    return "5 a 8 dias";
  }

  return "Hasta 5 dias";
}

function crearCardCatalogo(producto) {
  return `
        <div class="card fade-up" data-id="${producto.id}" data-categoria="${producto.categoria}">
          <img src="${producto.imagen}" alt="${producto.nombre}" />
          <h3>${producto.nombre}</h3>
          <p class="descripcion">${obtenerDescripcionProducto(producto)}</p>
          <p class="precio-card">${obtenerPrecioVisible(producto.precio)}</p>
          <a class="boton-card" href="${obtenerLinkWhatsapp(producto)}" target="_blank" rel="noopener" aria-label="Consultar por WhatsApp sobre ${producto.nombre}">
            <img src="media/svg/whatsapp_logo.svg" alt="" aria-hidden="true" />
          </a>
        </div>
  `;
}

function crearCardCategoria(producto) {
  const etiqueta = nombresCategorias[producto.categoria] || "Producto";

  return `
        <article class="producto-card fade-up" data-id="${producto.id}" data-categoria="${producto.categoria}">
          <img src="${producto.imagen}" alt="${producto.nombre}" />
          <div class="contenido">
            <span class="tag">${etiqueta}</span>
            <h3>${producto.nombre}</h3>
            <p class="descripcion">${obtenerDescripcionProducto(producto)}</p>
            <div class="fila">
              <span class="precio">${obtenerPrecioVisible(producto.precio)}</span>
              <a class="boton-card" href="${obtenerLinkWhatsapp(producto)}" target="_blank" rel="noopener" aria-label="Consultar por WhatsApp sobre ${producto.nombre}">
                <img src="media/svg/whatsapp_logo.svg" alt="" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
  `;
}

function inicializarCatalogoDesdeDatos() {
  const contenedores = document.querySelectorAll("[data-catalogo]");

  contenedores.forEach((contenedor) => {
    const categoria = contenedor.dataset.categoria;
    const tipo = contenedor.dataset.tipo;
    const productos = categoria === "todos"
      ? data
      : data.filter((producto) => producto.categoria === categoria);

    const cards = productos.map((producto) => {
      if (tipo === "catalogo") {
        return crearCardCatalogo(producto);
      }

      return crearCardCategoria(producto);
    });

    contenedor.innerHTML = cards.join("");
  });
}

function crearCeldaTabla(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

function inicializarTablaPreciosDesdeDatos() {
  const cuerposTabla = document.querySelectorAll("[data-tabla-precios]");

  cuerposTabla.forEach((cuerpoTabla) => {
    cuerpoTabla.textContent = "";

    data.forEach((producto) => {
      const fila = document.createElement("tr");
      const categoria = nombresCategoriasTabla[producto.categoria] || "Producto";

      fila.appendChild(crearCeldaTabla(producto.nombre));
      fila.appendChild(crearCeldaTabla(categoria));
      fila.appendChild(crearCeldaTabla(obtenerPrecioVisible(producto.precio)));
      fila.appendChild(crearCeldaTabla(obtenerTiempoEntrega(producto.categoria)));

      cuerpoTabla.appendChild(fila);
    });
  });
}
