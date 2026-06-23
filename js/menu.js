// Menú hamburguesa - toggle del nav en pantallas pequeñas
const boton = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

boton.addEventListener('click', function() {
  nav.classList.toggle('activo');
});