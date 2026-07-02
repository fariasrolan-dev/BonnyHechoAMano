# Bonny Hecho a Mano

Sitio web informativo y comercial para un emprendimiento artesanal de tejidos a mano ubicado en Chongoyape, Lambayeque. Muestra productos como ramos tejidos, amigurumis, llaveros, personalizados y vírgenes tejidas. El usuario puede conocer los modelos disponibles, revisar precios referenciales y comunicarse por WhatsApp para consultas o pedidos.

## Público objetivo

Personas que buscan regalos personalizados, decorativos y hechos a mano para cumpleaños, aniversarios, fechas especiales o detalles personalizados.

## Estructura del sitio

- `index.html` — Página de inicio con productos destacados y presentación general.
- `catalogo.html` — Catálogo completo con buscador, filtro por categoría y productos generados dinámicamente.
- `ramos.html`, `amigurumis.html`, `llaveros.html`, `personalizados.html`, `virgenes.html` — Páginas por categoría.
- `precios.html` — Tabla de precios referenciales generada con JavaScript.
- `promociones.html` — Promociones destacadas con buscador.
- `nosotros.html` — Información sobre la marca, misión, visión y valores.
- `contacto.html` — Formulario de contacto con validación y envío por WhatsApp.

## Funcionalidades JavaScript

- **Menú responsivo**: Botón hamburguesa en pantallas pequeñas. Usa `classList.toggle("activo")` con atributos de accesibilidad (`aria-expanded`). Vinculado en las 11 páginas.
- **Validación del formulario de contacto**: Valida nombre (solo letras), teléfono (7-15 dígitos), asunto y mensaje. Muestra errores específicos debajo de cada campo con `insertAdjacentElement`. Al validar, abre WhatsApp con mensaje prellenado.
- **Catálogo dinámico**: 55 productos definidos en `catalogo-data.js` como objetos JS. `catalogo-render.js` genera las tarjetas con `innerHTML` y atributos `dataset`.
- **Filtro por categoría con localStorage**: Botones de categoría en el catálogo. Al elegir una, se guarda en `localStorage` y se reaplicar automáticamente al volver a la página.
- **Búsqueda y filtrado de productos**: Buscador que filtra tarjetas en tiempo real por texto, normalizando tildes y mayúsculas.
- **Galería modal**: Click en imagen de producto abre un modal reutilizable. Se cierra con botón X, tecla Escape o click fuera.
- **Tabla de precios dinámica**: Generada desde los mismos datos del catálogo. Cada fila permite abrir el modal de imagen.
- **Botón flotante**: Botón para volver al inicio de la página.

## Organización de archivos

- `css/` — `global.css` para estilos compartidos (nav, footer, colores, fuentes) y archivos CSS específicos por página.
- `js/` — Archivos JavaScript externos organizados por responsabilidad:
  - `main.js` — Punto de entrada, conecta funcionalidades al arranque.
  - `menu.js` — Toggle del menú responsivo.
  - `validaciones.js` — Validación del formulario de contacto.
  - `catalogo-data.js` — Datos de los 55 productos.
  - `catalogo-render.js` — Renderizado dinámico de tarjetas y filtro por categoría.
  - `funcionalidades.js` — Buscador, galería modal, tabla de precios, botón scroll-to-top.
- `media/` — Imágenes de productos organizadas por categoría, logo e íconos SVG.

## Criterios técnicos

- HTML + CSS + JS integrado, sin frameworks.
- JavaScript en archivos externos, sin código inline.
- Solo `const` y `let`, sin `var`.
- Funciones reutilizables y comentarios descriptivos.
- Sin errores en la consola del navegador.
- Diseño responsivo con media queries (breakpoint 768px).
- Google Fonts y Font Awesome cargados por CDN.