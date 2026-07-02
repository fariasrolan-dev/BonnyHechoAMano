// menu.js
// Controla el menu responsive y marca la pagina activa.

function inicializarMenuResponsive() {
  const botonMenu = document.querySelector(".menu-toggle");
  const menuPrincipal = document.querySelector("#menu-principal");

  if (!botonMenu || !menuPrincipal) {
    return;
  }

  function alternarMenu() {
    const menuAbierto = menuPrincipal.classList.toggle("activo");
    botonMenu.setAttribute("aria-expanded", menuAbierto.toString());
  }

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

function marcarPaginaActual(menuPrincipal) {
  const paginaActiva = obtenerPaginaActiva();
  const enlaces = menuPrincipal.querySelectorAll("a");

  enlaces.forEach((enlace) => {
    const paginaEnlace = enlace.getAttribute("href");
    enlace.classList.toggle("activo", paginaEnlace === paginaActiva);
  });
}
