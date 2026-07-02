# Bonny Hecho a Mano

## Documento de planificacion del sitio web

Bonny Hecho a Mano es un sitio web informativo y comercial para mostrar productos artesanales como ramos tejidos, amigurumis, llaveros, personalizados y virgenes tejidas. El objetivo principal es que el usuario pueda conocer los modelos disponibles, revisar precios referenciales y comunicarse por WhatsApp para realizar consultas o pedidos.

## Publico objetivo

El sitio esta dirigido a personas que buscan regalos personalizados, decorativos y hechos a mano para cumpleanos, aniversarios, fechas especiales o detalles personalizados.

## Estructura del sitio

- `index.html`: pagina de inicio con productos destacados y presentacion general.
- `catalogo.html`: catalogo completo con buscador y productos dinamicos.
- `ramos.html`, `amigurumis.html`, `llaveros.html`, `personalizados.html`, `virgenes.html`: paginas por categoria.
- `precios.html`: lista de precios referenciales generada con JavaScript.
- `promociones.html`: promociones destacadas con buscador.
- `nosotros.html`: informacion sobre la marca, mision, vision y valores.
- `contacto.html`: formulario de contacto con envio por WhatsApp.

## Funcionalidades JavaScript

- Menu responsive con boton toggle en pantallas pequenas.
- Validacion del formulario de contacto con mensajes de error.
- Generacion dinamica de catalogo y tabla de precios desde `catalogo-data.js`.
- Busqueda y filtrado de productos/promociones.
- Galeria modal para ampliar imagenes.
- Boton flotante para volver al inicio.
- Enlaces de consulta por WhatsApp con mensaje personalizado.

## Organizacion de archivos

- `css/`: estilos globales y estilos especificos por seccion.
- `js/`: funciones JavaScript externas, reutilizables y organizadas.
- `media/`: imagenes de productos, logo e iconos SVG.

## Criterios del Proyecto

- El sitio esta integrado con HTML, CSS y JavaScript.
- El JavaScript esta en archivos externos, sin codigo inline.
- El menu responsive usa manipulacion del DOM.
- El formulario tiene validacion de campos obligatorios y mensajes de error.
- El catalogo, los filtros, la galeria modal y la tabla de precios agregan interactividad significativa.
