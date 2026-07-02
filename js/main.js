// main.js
// Punto de inicio de los comportamientos interactivos del sitio.

document.addEventListener("DOMContentLoaded", () => {
  if (typeof inicializarMenuResponsive === "function") {
    inicializarMenuResponsive();
  }

  if (typeof inicializarValidaciones === "function") {
    inicializarValidaciones();
  }

  if (typeof inicializarCatalogoDesdeDatos === "function") {
    inicializarCatalogoDesdeDatos();
  }

  if (typeof inicializarTablaPreciosDesdeDatos === "function") {
    inicializarTablaPreciosDesdeDatos();
  }

  if (typeof inicializarBuscadoresProductos === "function") {
    inicializarBuscadoresProductos();
  }

  if (typeof inicializarGaleriaModal === "function") {
    inicializarGaleriaModal();
  }

  if (typeof inicializarBotonVolverArriba === "function") {
    inicializarBotonVolverArriba();
  }
});
