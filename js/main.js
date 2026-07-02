// main.js
// Punto de inicio de los comportamientos interactivos del sitio.

// Espera a que el HTML este cargado antes de buscar elementos en el DOM.
document.addEventListener("DOMContentLoaded", () => {
  // Cada bloque comprueba si la funcion existe para que todas las paginas puedan
  // compartir este archivo aunque no usen exactamente las mismas funcionalidades.
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
