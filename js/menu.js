// menu.js
// Controla el menu responsive y marca la pagina activa en la navegacion.

// Inicializa el boton hamburguesa y conecta sus eventos con el menu principal.
function inicializarMenuResponsive() {
  const botonMenu = document.querySelector(".menu-toggle");
  const menuPrincipal = document.querySelector("#menu-principal");

  // Si una pagina no tiene menu responsive, la funcion termina sin errores.
  if (!botonMenu || !menuPrincipal) {
    return;
  }

  // Abre o cierra el menu y actualiza el atributo ARIA para accesibilidad.
  function alternarMenu() {
    const menuAbierto = menuPrincipal.classList.toggle("activo");
    botonMenu.setAttribute("aria-expanded", menuAbierto.toString());
  }

  // Cierra el menu movil despues de elegir un enlace de navegacion.
  function cerrarMenuAlElegirOpcion(evento) {
    if (evento.target.tagName !== "A") {
      return;
    }

    menuPrincipal.classList.remove("activo");
    botonMenu.setAttribute("aria-expanded", "false");
  }

  botonMenu.addEventListener("click", alternarMenu);
  menuPrincipal.addEventListener("click", cerrarMenuAlElegirOpcion);
  marcarPaginaActual(menuPrincipal);
}

// Obtiene el archivo HTML actual y agrupa las categorias dentro de Catalogo.
function obtenerPaginaActiva() {
  const paginaActual = window.location.pathname.split("/").pop() || "index.html";
  const paginasCatalogo = [
    "amigurumis.html",
    "llaveros.html",
    "personalizados.html",
    "ramos.html",
    "virgenes.html",
  ];

  if (paginasCatalogo.includes(paginaActual)) {
    return "catalogo.html";
  }

  return paginaActual;
}

// Marca visualmente el enlace del menu que corresponde a la pagina actual.
function marcarPaginaActual(menuPrincipal) {
  const paginaActiva = obtenerPaginaActiva();
  const enlaces = menuPrincipal.querySelectorAll("a");

  enlaces.forEach((enlace) => {
    const paginaEnlace = enlace.getAttribute("href");
    enlace.classList.toggle("activo", paginaEnlace === paginaActiva);
  });
}
