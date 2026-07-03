// catalogo-render.js
// Renderiza cards y tabla de precios desde catalogo-data.js.

// Etiquetas cortas que aparecen en las tarjetas por categoria.
const nombresCategorias = {
  amigurumis: "Amigurumi",
  llaveros: "Llavero",
  personalizados: "Personalizado",
  ramos: "Ramo",
  virgenes: "Virgen tejida",
};

// Etiquetas en plural para la tabla de precios.
const nombresCategoriasTabla = {
  amigurumis: "Amigurumis",
  llaveros: "Llaveros",
  personalizados: "Personalizados",
  ramos: "Ramos",
  virgenes: "Virgenes",
};

// Numero de WhatsApp usado en botones de consulta.
const whatsappBonny = "51929008614";

// Devuelve la descripcion guardada en la data del producto.
function obtenerDescripcionProducto(producto) {
  return producto.descripcion || "Producto artesanal hecho a mano.";
}

// Convierte la ruta relativa de una imagen en URL completa para enviarla por WhatsApp.
function obtenerUrlImagenProducto(producto) {
  if (typeof window !== "undefined" && window.location) {
    return new URL(producto.imagen, window.location.href).href;
  }

  return producto.imagen;
}

// Crea un enlace de WhatsApp con nombre e imagen de referencia del producto.
function obtenerLinkWhatsapp(producto) {
  const urlImagen = obtenerUrlImagenProducto(producto);
  const mensaje = `Hola Bonny, quiero consultar por ${producto.nombre}. Imagen de referencia: ${urlImagen}`;

  return `https://wa.me/${whatsappBonny}?text=${encodeURIComponent(mensaje)}`;
}

// Formatea el precio; si no hay precio definido, muestra "Consultar".
function obtenerPrecioVisible(precio) {
  if (!precio || precio <= 0) {
    return "Consultar";
  }

  return `S/ ${precio.toFixed(2)}`;
}

// Define tiempos de entrega referenciales por categoria.
function obtenerTiempoEntrega(categoria) {
  if (categoria === "amigurumis") {
    return "5 a 8 dias";
  }

  return "Hasta 5 dias";
}

// Crea la tarjeta usada en el catalogo general.
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

// Crea la tarjeta usada en las paginas individuales de categoria.
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

// Clave usada para recordar en localStorage la categoria elegida en el catalogo.
const CLAVE_CATEGORIA_FILTRO = "bonny-catalogo-categoria";

// Filtra las tarjetas del catalogo general por categoria y recuerda la eleccion
// en localStorage para reaplicarla la proxima vez que se cargue la pagina.
function inicializarFiltroCategoriaCatalogo() {
  const contenedorFiltros = document.querySelector(".filtro-categorias");
  const contenedorProductos = document.querySelector(".contenedor-productos");

  if (!contenedorFiltros || !contenedorProductos) {
    return;
  }

  const botones = Array.from(contenedorFiltros.querySelectorAll(".filtro-boton"));

  // Oculta las tarjetas que no pertenecen a la categoria elegida y marca el boton activo.
  function aplicarFiltroCategoria(categoria) {
    const tarjetas = contenedorProductos.querySelectorAll(".card");

    tarjetas.forEach((tarjeta) => {
      const coincide = categoria === "todos" || tarjeta.dataset.categoria === categoria;
      tarjeta.classList.toggle("oculto-categoria", !coincide);
    });

    botones.forEach((boton) => {
      const estaActivo = boton.dataset.categoria === categoria;
      boton.classList.toggle("activo", estaActivo);
      boton.setAttribute("aria-selected", String(estaActivo));
    });
  }

  botones.forEach((boton) => {
    boton.setAttribute("aria-selected", "false");

    boton.addEventListener("click", () => {
      const categoria = boton.dataset.categoria;
      localStorage.setItem(CLAVE_CATEGORIA_FILTRO, categoria);

      if (boton.tagName === "A") {
        return;
      }

      aplicarFiltroCategoria(categoria);

      const buscador = document.querySelector(".buscador-productos");
      if (buscador) {
        buscador.dispatchEvent(new Event("input"));
      }
    });
  });

  const categoriaUrl = new URLSearchParams(window.location.search).get("categoria");
  if (categoriaUrl) {
    localStorage.setItem(CLAVE_CATEGORIA_FILTRO, categoriaUrl);
  }

  // Al cargar la pagina, recupera la categoria indicada en la URL o la ultima guardada.
  const categoriaGuardada = categoriaUrl || localStorage.getItem(CLAVE_CATEGORIA_FILTRO) || "todos";
  const categoriaInicial = botones.some((boton) => boton.dataset.categoria === categoriaGuardada)
    ? categoriaGuardada
    : "todos";
  aplicarFiltroCategoria(categoriaInicial);
}

// Busca contenedores con data-catalogo y les inyecta sus productos.
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

// Crea celdas de tabla con data-label para convertirlas en tarjetas en movil.
function crearCeldaTabla(texto, etiqueta) {
  const celda = document.createElement("td");
  celda.textContent = texto;

  if (etiqueta) {
    celda.dataset.label = etiqueta;
  }

  return celda;
}

// Genera todas las filas de la lista de precios desde la misma data del catalogo.
function inicializarTablaPreciosDesdeDatos() {
  const cuerposTabla = document.querySelectorAll("[data-tabla-precios]");

  cuerposTabla.forEach((cuerpoTabla) => {
    cuerpoTabla.textContent = "";

    data.forEach((producto) => {
      const fila = document.createElement("tr");
      const categoria = nombresCategoriasTabla[producto.categoria] || "Producto";

      fila.className = "fila-precio-producto";
      fila.tabIndex = 0;
      fila.dataset.imagen = producto.imagen;
      fila.dataset.nombre = producto.nombre;
      fila.setAttribute("role", "button");
      fila.setAttribute("aria-label", `Ver imagen de ${producto.nombre}`);
      fila.setAttribute("title", `Ver imagen de ${producto.nombre}`);

      fila.appendChild(crearCeldaTabla(producto.nombre, "Producto"));
      fila.appendChild(crearCeldaTabla(categoria, "Categoria"));
      fila.appendChild(crearCeldaTabla(obtenerPrecioVisible(producto.precio), "Precio"));
      fila.appendChild(crearCeldaTabla(obtenerTiempoEntrega(producto.categoria), "Tiempo de entrega"));

      cuerpoTabla.appendChild(fila);
    });
  });
}
