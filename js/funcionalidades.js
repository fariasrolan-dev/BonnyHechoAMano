// funcionalidades.js
// Busqueda, galeria modal y boton volver arriba.

// Normaliza textos para que la busqueda no dependa de mayusculas ni tildes.
function normalizarTexto(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Obtiene la imagen principal de una tarjeta para usar su alt y ruta en filtros.
function obtenerImagenPrincipal(tarjeta) {
  return Array.from(tarjeta.children).find(
    (elemento) => elemento.tagName === "IMG"
  );
}

// Amplia las palabras clave por categoria para mejorar los resultados de busqueda.
function obtenerCategoriaVisible(categoria) {
  const categorias = {
    amigurumis: "amigurumi amigurumis tejidos",
    llaveros: "llavero llaveros",
    personalizados: "personalizado personalizados regalos",
    ramos: "ramo ramos flores",
    virgenes: "virgen virgenes religiosa",
  };

  return categorias[categoria] || categoria || "";
}

// Junta el contenido visible y metadatos de cada tarjeta en un texto buscable.
function obtenerTextoBuscable(tarjeta) {
  const imagen = obtenerImagenPrincipal(tarjeta);
  const categoria = tarjeta.dataset.categoria;
  const partes = [
    tarjeta.textContent,
    categoria,
    obtenerCategoriaVisible(categoria),
    imagen ? imagen.alt : "",
    imagen ? imagen.src : "",
  ];

  return normalizarTexto(partes.filter(Boolean).join(" "));
}

// Activa todos los buscadores declarados con data-contenedor y data-tarjetas.
function inicializarBuscadoresProductos() {
  const buscadores = document.querySelectorAll(".buscador-productos");

  buscadores.forEach((buscador) => {
    const seccionBuscador = buscador.closest("section") || document;
    const contenedor =
      seccionBuscador.querySelector(buscador.dataset.contenedor) ||
      document.querySelector(buscador.dataset.contenedor);
    const selectorTarjetas = buscador.dataset.tarjetas;
    const mensajeSinResultados =
      buscador.parentElement.querySelector(".sin-resultados");

    if (!contenedor || !selectorTarjetas) {
      return;
    }

    // Filtra cada tarjeta y muestra un mensaje cuando no hay coincidencias.
    function filtrarTarjetas() {
      const tarjetas = Array.from(contenedor.querySelectorAll(selectorTarjetas));
      const textoBuscado = normalizarTexto(buscador.value);
      const terminosBuscados = textoBuscado.split(/\s+/).filter(Boolean);
      const esCatalogoGeneral = contenedor.matches(".contenedor-productos");
      const categoriaActiva = esCatalogoGeneral
        ? document.querySelector(".filtro-boton.activo")?.dataset.categoria || "todos"
        : "todos";
      const buscarEnTodoElCatalogo = esCatalogoGeneral && terminosBuscados.length > 0;
      let cantidadVisible = 0;

      tarjetas.forEach((tarjeta) => {
        const textoTarjeta = obtenerTextoBuscable(tarjeta);
        const coincide =
          terminosBuscados.length === 0 ||
          terminosBuscados.every((termino) => textoTarjeta.includes(termino));
        const coincideCategoria =
          categoriaActiva === "todos" || tarjeta.dataset.categoria === categoriaActiva;

        if (esCatalogoGeneral) {
          tarjeta.classList.toggle(
            "oculto-categoria",
            !buscarEnTodoElCatalogo && !coincideCategoria
          );
        }

        tarjeta.classList.toggle("oculto-busqueda", !coincide);

        if (coincide && !tarjeta.classList.contains("oculto-categoria")) {
          cantidadVisible += 1;
        }
      });

      if (mensajeSinResultados) {
        mensajeSinResultados.hidden = cantidadVisible > 0;
      }
    }

    buscador.addEventListener("input", filtrarTarjetas);
    filtrarTarjetas();
  });
}

// Crea un modal reutilizable para ampliar imagenes del sitio.
function inicializarGaleriaModal() {
  const imagenes = document.querySelectorAll(
    ".card > img, .producto-card > img, .promo-card > img, .hero-imagen img, .hero-categoria .imagen img, .nosotros-imagen img, .contacto-texto img"
  );
  const filasConImagen = document.querySelectorAll(".fila-precio-producto[data-imagen]");

  if (imagenes.length === 0 && filasConImagen.length === 0) {
    return;
  }

  const modal = document.createElement("div");
  modal.className = "galeria-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Imagen ampliada");
  modal.innerHTML = `
    <div class="galeria-contenido">
      <button class="galeria-cerrar" type="button" aria-label="Cerrar imagen">x</button>
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="" />
      <p></p>
    </div>
  `;
  document.body.appendChild(modal);

  const imagenModal = modal.querySelector("img");
  const textoModal = modal.querySelector("p");
  const botonCerrar = modal.querySelector(".galeria-cerrar");

  // Carga la imagen elegida dentro del modal y mueve el foco al boton cerrar.
  function abrirModal(src, alt) {
    imagenModal.src = src;
    imagenModal.alt = alt;
    textoModal.textContent = alt;
    modal.classList.add("activo");
    botonCerrar.focus();
  }

  // Abre el mismo modal usando los datos guardados en una fila de la tabla.
  function abrirModalDesdeFila(fila) {
    abrirModal(fila.dataset.imagen, fila.dataset.nombre);
  }

  // Oculta el modal y limpia la imagen para evitar referencias innecesarias.
  function cerrarModal() {
    modal.classList.remove("activo");
    imagenModal.src = "";
  }

  imagenes.forEach((imagen) => {
    imagen.classList.add("imagen-interactiva");
    imagen.addEventListener("click", () => abrirModal(imagen.src, imagen.alt));
  });

  filasConImagen.forEach((fila) => {
    fila.addEventListener("click", () => abrirModalDesdeFila(fila));
    fila.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirModalDesdeFila(fila);
      }
    });
  });

  botonCerrar.addEventListener("click", cerrarModal);

  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
      cerrarModal();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modal.classList.contains("activo")) {
      cerrarModal();
    }
  });
}

// Numero de WhatsApp usado en el boton de consulta de productos destacados.
const whatsappBonnyDestacados = "51929008614";

// Arma el link de WhatsApp con el nombre y la imagen de referencia del producto.
function obtenerLinkWhatsappDestacado(nombre, urlImagen) {
  const mensaje = `Hola Bonny, quiero consultar por ${nombre}. Imagen de referencia: ${urlImagen}`;
  return `https://wa.me/${whatsappBonnyDestacados}?text=${encodeURIComponent(mensaje)}`;
}

// Crea el boton de WhatsApp con el mismo icono usado en las cards del catalogo.
function crearBotonWhatsappDestacado(nombre, urlImagen) {
  const a = document.createElement("a");
  a.className = "boton-card";
  a.href = obtenerLinkWhatsappDestacado(nombre, urlImagen);
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", `Consultar por WhatsApp sobre ${nombre}`);

  const img = document.createElement("img");
  img.src = "media/svg/whatsapp_logo.svg";
  img.alt = "";
  img.setAttribute("aria-hidden", "true");

  a.appendChild(img);
  return a;
}

// Agrega el boton de WhatsApp a cada card de productos destacados.
function inicializarWhatsappDestacados() {
  const cards = document.querySelectorAll(".productos .contenedor-productos .card");

  cards.forEach((card) => {
    const nombre = card.querySelector("h3")?.textContent.trim();
    const imagen = card.querySelector("img");

    if (!nombre || !imagen) {
      return;
    }

    card.appendChild(crearBotonWhatsappDestacado(nombre, imagen.src));
  });
}

// Agrega un boton flotante para regresar suavemente al inicio de la pagina.
function inicializarBotonVolverArriba() {
  const botonArriba = document.createElement("button");
  botonArriba.className = "volver-arriba";
  botonArriba.type = "button";
  botonArriba.setAttribute("aria-label", "Volver arriba");
  botonArriba.textContent = "^";
  document.body.appendChild(botonArriba);

  window.addEventListener("scroll", () => {
    botonArriba.classList.toggle("visible", window.scrollY > 350);
  });

  botonArriba.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
