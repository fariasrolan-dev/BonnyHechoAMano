# Bonny Hecho a Mano

Sitio web informativo y comercial para un emprendimiento artesanal de tejidos a mano ubicado en Chongoyape, Lambayeque. Muestra productos como ramos tejidos, amigurumis, llaveros, personalizados y vírgenes tejidas. El usuario puede conocer los modelos disponibles, revisar precios referenciales y comunicarse por WhatsApp para consultas o pedidos.

## Estado actual

- Sitio multipágina compuesto por 11 archivos HTML.
- Diseño responsive para monitores, laptops, tablets y móviles.
- Catálogo centralizado con 55 productos y páginas por categoría.
- Integración de WhatsApp para consultas y pedidos.
- Google Analytics 4 instalado con el ID `G-S07XRV1R4G`.
- Publicación en Vercel y segunda herramienta de analítica pendientes.

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
- **Validación del formulario de contacto**: Valida nombre, asunto y mensaje. Muestra errores específicos debajo de cada campo y, al validar, abre WhatsApp con el mensaje prellenado.
- **Catálogo dinámico**: 55 productos definidos en `catalogo-data.js`. `catalogo-render.js` genera tarjetas, promociones y la tabla de precios mediante elementos del DOM y atributos `dataset`.
- **Filtro por categoría con localStorage**: La categoría seleccionada se guarda en `localStorage` y se reaplica automáticamente al volver al catálogo. Las páginas individuales marcan visualmente su categoría activa.
- **Búsqueda y filtrado de productos**: Buscador que filtra tarjetas en tiempo real por texto, normalizando tildes y mayúsculas.
- **Galería modal**: Click en imagen de producto abre un modal reutilizable. Se cierra con botón X, tecla Escape o click fuera.
- **Tabla de precios dinámica**: Generada desde los mismos datos del catálogo. Cada fila permite abrir el modal de imagen.
- **Botón flotante**: Botón para volver al inicio de la página.

## Organización de archivos

- `css/` — `global.css` para estilos compartidos, archivos específicos por página y `responsive.css` para los ajustes comunes entre tamaños de pantalla.
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
- JavaScript organizado en archivos externos; la única excepción es la etiqueta oficial de Google Analytics incluida en cada página.
- Solo `const` y `let`, sin `var`.
- Funciones reutilizables y comentarios descriptivos.
- Sin errores en la consola del navegador.
- Diseño responsive con puntos de quiebre para pantallas amplias, laptops, tablets y móviles de distintos tamaños.
- Google Fonts y Font Awesome cargados por CDN.
- Google Analytics 4 configurado en las 11 páginas.

## Publicación y medición

El proyecto está preparado para publicarse como sitio HTML estático. El flujo previsto es conectar el repositorio con Vercel, obtener una URL pública y comprobar Google Analytics desde el informe en tiempo real. Para completar los requisitos de medición todavía debe activarse una segunda herramienta, recomendablemente Vercel Web Analytics.
