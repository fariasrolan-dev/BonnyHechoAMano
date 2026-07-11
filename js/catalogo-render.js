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

// Clave usada para recordar en localStorage la categoria elegida en el catalogo.
import { data } from "./catalogo-data.js";
const CLAVE_CATEGORIA_FILTRO = "bonny-catalogo-categoria";
let CATEGORIA_ACTUAL = (localStorage.getItem(CLAVE_CATEGORIA_FILTRO) || "todos");;

//#region Construccion del catálogo
// Principal
function crearCardCatalogo(producto) {
  let div = crearDivCatalogo(producto.id, producto.categoria);
  let img = crearImagen(producto.imagen, producto.nombre, "imagen-interactiva");
  let h3 = document.createElement("h3"); h3.innerText = producto.nombre;
  let pDescp = crearParrafo("descripcion",obtenerDescripcionProducto(producto));
  let pPrecio = crearParrafo("precio-card",obtenerPrecioVisible(producto.precio));
  let a = crearElementoA(producto);
  div.appendChild(img); div.appendChild(h3); div.appendChild(pDescp);
  div.appendChild(pPrecio); div.appendChild(a); return div;
}

function crearCardCategoria(producto) {
  let etiqueta = nombresCategorias[producto.categoria] || "Producto";
  let artc = crearArticuloCatalogo(producto.id, producto.categoria);
  let div = document.createElement("div"); div.setAttribute("class","contenido");
  let span = crearSpan("tag",etiqueta);
  let h3 = document.createElement("h3"); h3.innerText = producto.nombre;
  let p = crearParrafo("descripcion",obtenerDescripcionProducto(producto));
  let divFila = document.createElement("div"); divFila.setAttribute("class","fila");
  divFila.appendChild(crearSpan("precio",obtenerPrecioVisible(producto.precio)));
  divFila.appendChild(crearElementoA(producto));
  div.appendChild(span); div.appendChild(h3); div.appendChild(p); div.appendChild(divFila);
  artc.appendChild(crearImagen(producto.imagen,producto.nombre)); artc.appendChild(div);
  return artc;
}

// Auxiliares
function crearDivCatalogo(id,categoria) {let div = document.createElement("div"); div.classList.add("card", "fade-up");
  div.dataset.id = id; div.dataset.categoria = categoria; return div;}

function crearArticuloCatalogo(id,categoria) {let artc = document.createElement("article"); 
  artc.classList.add("producto-card","fade-up"); artc.dataset.id = id; artc.dataset.categoria = categoria; return artc;}

function crearParrafo(class_name = "", text = "") {let p = document.createElement("p"); 
  p.setAttribute("class", class_name); p.innerText = text; return p;}

function crearElementoA(producto) {let a = document.createElement("a"); a.setAttribute("class", "boton-card");
  a.href = obtenerLinkWhatsapp(producto); a.target = "_blank"; a.rel = "noopener";
  a.setAttribute("aria-label",`Consultar por WhatsApp sobre ${producto.nombre}`);
  let img = crearImagen("media/svg/whatsapp_logo.svg"); img.setAttribute("aria-hidden", "true");
  a.appendChild(img); return a;
}

function crearImagen(src, alt = "", class_name = "") {let img = document.createElement("img"); img.src = src; 
  img.alt = alt; img.setAttribute("class", class_name); return img;}

function crearSpan(class_name,text) {let span = document.createElement("span"); 
  span.setAttribute("class",class_name); span.innerText = text; return span;}
//#endregion

//#region Filtro por categoría 
// Recordar la elección en localStorage para reaplicarla la proxima vez que se cargue la pagina.
function actualizarLocalstorage(event) {
  let categoria = event.target.dataset.categoria;
  localStorage.setItem(CLAVE_CATEGORIA_FILTRO,categoria);
  CATEGORIA_ACTUAL = categoria;

  // Reiniciar catalogo
  let contenedor = document.querySelector('.contenedor-productos');
  if (contenedor) contenedor.innerHTML = ''; 

  inicializarCatalogo();
}

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
  apli
  carFiltroCategoria(categoriaInicial);
}
//#endregion
  
//#region Construcción de las promociones
function actualizarPromoCard(card) {
  let id = parseInt(card.dataset.id);
  let descuento = parseFloat(card.dataset.descuento);
  let producto = data.find(p => p.id === id);
  if (!producto) return;

  let div = document.createElement("div"); div.classList.add("descuento"); div.innerText = `-${descuento*100}%`;
  let img = crearImagen(producto.imagen,`${producto.nombre} en promoción`);
  let h2 = document.createElement("h2"); h2.innerText = producto.nombre;
  let pAnterior = crearParrafo("precio-anterior",`S/ ${producto.precio.toFixed(2)}`);
  let pActual = crearParrafo("precio",`S/ ${(producto.precio * (1 - descuento)).toFixed(2)}`);
  let a = crearElementoA(producto);
  card.append(div,img,h2,pAnterior,pActual,a);
}

function inicializarPromociones() {
  let cards = document.querySelectorAll(".promo-card");
  if (cards.length === 0) return;

  cards.forEach(actualizarPromoCard);
}

//#endregion

// Busca el contenedor local con data-catalogo y les inyecta sus productos.
function inicializarCatalogo() {
  let contenedor = document.querySelector("[data-catalogo]");
  if (!contenedor) return;

  let productos = CATEGORIA_ACTUAL === "todos" ? 
    data : data.filter(p => p.categoria === CATEGORIA_ACTUAL);

  productos.forEach(p => {
    const card = contenedor.dataset.tipo === "catalogo" ? 
      crearCardCatalogo(p) : crearCardCategoria(p);
    contenedor.appendChild(card);
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

// Uso de funciones
inicializarTablaPreciosDesdeDatos();

inicializarCatalogo();

inicializarPromociones();

document.querySelectorAll(".filtro-boton").forEach(b => {
    b.addEventListener("click", actualizarLocalstorage);
});
