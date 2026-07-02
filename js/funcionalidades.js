// funcionalidades.js
// Busqueda, galeria modal y boton volver arriba.

// Normaliza textos para que la busqueda no dependa de mayusculas ni tildes.
function normalizarTexto(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s/+.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Agrega variantes frecuentes para que la busqueda encuentre nombres similares.
function obtenerVariantesBusqueda(texto) {
  const variantes = [texto];

  if (texto.includes("sulivan")) {
    variantes.push(texto.replace(/sulivan/g, "sullivan"));
  }

  if (texto.includes("sullivan")) {
    variantes.push(texto.replace(/sullivan/g, "sulivan"));
  }

  if (texto.includes("virgen")) {
    variantes.push(texto.replace(/virgen/g, "virgenes"));
  }

  if (texto.includes("personalizado")) {
    variantes.push(texto.replace(/personalizado/g, "personalizados"));
  }

  if (texto.includes("ramo")) {
    variantes.push(texto.replace(/ramo/g, "ramos"));
  }

  return variantes.join(" ");
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
  if (tarjeta.dataset.busqueda) {
    return tarjeta.dataset.busqueda;
  }

  const imagen = obtenerImagenPrincipal(tarjeta);
  const categoria = tarjeta.dataset.categoria;
  const partes = [
    tarjeta.textContent,
    categoria,
    obtenerCategoriaVisible(categoria),
    imagen ? imagen.alt : "",
    imagen ? imagen.src : "",
  ];

  const textoNormalizado = normalizarTexto(partes.filter(Boolean).join(" "));
  const textoBuscable = normalizarTexto(obtenerVariantesBusqueda(textoNormalizado));
  tarjeta.dataset.busqueda = textoBuscable;

  return textoBuscable;
}

// Activa todos los buscadores declarados con data-contenedor y data-tarjetas.
function inicializarBuscadoresProductos() {
  const buscadores = document.querySelectorAll(".buscador-productos");

  buscadores.forEach((buscador) => {
    const contenedor = document.querySelector(buscador.dataset.contenedor);
    const selectorTarjetas = buscador.dataset.tarjetas;
    const mensajeSinResultados =
      buscador.parentElement.querySelector(".sin-resultados");

    if (!contenedor || !selectorTarjetas) {
      return;
    }

    // Filtra cada tarjeta y muestra un mensaje cuando no hay coincidencias.
    function filtrarTarjetas() {
      const tarjetas = Array.from(contenedor.querySelectorAll(selectorTarjetas));
      const textoBuscado = normalizarTexto(obtenerVariantesBusqueda(buscador.value));
      const terminosBuscados = textoBuscado.split(/\s+/).filter(Boolean);
      let cantidadVisible = 0;

      tarjetas.forEach((tarjeta) => {
        const textoTarjeta = obtenerTextoBuscable(tarjeta);
        const coincide =
          terminosBuscados.length === 0 ||
          terminosBuscados.every((termino) => textoTarjeta.includes(termino));

        tarjeta.classList.toggle("oculto-busqueda", !coincide);

        if (coincide) {
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
  function abrirModal(imagen) {
    imagenModal.src = imagen.src;
    imagenModal.alt = imagen.alt;
    textoModal.textContent = imagen.alt;
    modal.classList.add("activo");
    botonCerrar.focus();
  }

  // Abre el mismo modal usando los datos guardados en una fila de la tabla.
  function abrirModalDesdeFila(fila) {
    imagenModal.src = fila.dataset.imagen;
    imagenModal.alt = fila.dataset.nombre;
    textoModal.textContent = fila.dataset.nombre;
    modal.classList.add("activo");
    botonCerrar.focus();
  }

  // Oculta el modal y limpia la imagen para evitar referencias innecesarias.
  function cerrarModal() {
    modal.classList.remove("activo");
    imagenModal.src = "";
  }

  imagenes.forEach((imagen) => {
    imagen.classList.add("imagen-interactiva");
    imagen.addEventListener("click", () => abrirModal(imagen));
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
