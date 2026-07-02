// funcionalidades.js
// Busqueda, galeria modal y boton volver arriba.

function normalizarTexto(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function obtenerImagenPrincipal(tarjeta) {
  return Array.from(tarjeta.children).find(
    (elemento) => elemento.tagName === "IMG"
  );
}

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

    function filtrarTarjetas() {
      const tarjetas = Array.from(contenedor.querySelectorAll(selectorTarjetas));
      const textoBuscado = normalizarTexto(buscador.value.trim());
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

function inicializarGaleriaModal() {
  const imagenes = document.querySelectorAll(
    ".card > img, .producto-card > img, .promo-card > img, .hero-imagen img, .hero-categoria .imagen img, .contacto-texto img"
  );

  if (imagenes.length === 0) {
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

  function abrirModal(imagen) {
    imagenModal.src = imagen.src;
    imagenModal.alt = imagen.alt;
    textoModal.textContent = imagen.alt;
    modal.classList.add("activo");
    botonCerrar.focus();
  }

  function cerrarModal() {
    modal.classList.remove("activo");
    imagenModal.src = "";
  }

  imagenes.forEach((imagen) => {
    imagen.classList.add("imagen-interactiva");
    imagen.addEventListener("click", () => abrirModal(imagen));
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
