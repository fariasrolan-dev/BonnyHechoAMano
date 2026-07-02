// validaciones.js
// Valida el formulario de contacto y prepara el mensaje por WhatsApp.

function mostrarError(campo, mensaje) {
  const idError = `error-${campo.id || campo.name}`;
  let mensajeError = document.getElementById(idError);

  if (!mensajeError) {
    mensajeError = document.createElement("p");
    mensajeError.className = "error";
    mensajeError.id = idError;
    campo.insertAdjacentElement("afterend", mensajeError);
  }

  campo.classList.add("campo-error");
  campo.setAttribute("aria-invalid", "true");
  campo.setAttribute("aria-describedby", idError);
  mensajeError.textContent = mensaje;
}

function limpiarError(campo) {
  const idError = `error-${campo.id || campo.name}`;
  const mensajeError = document.getElementById(idError);

  campo.classList.remove("campo-error");
  campo.removeAttribute("aria-invalid");
  campo.removeAttribute("aria-describedby");

  if (mensajeError) {
    mensajeError.remove();
  }
}

function validarNombre(campo) {
  const valor = campo.value.trim();
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

  if (valor === "") {
    mostrarError(campo, "Ingresa tu nombre completo.");
    return false;
  }

  if (!soloLetras.test(valor)) {
    mostrarError(campo, "El nombre solo debe contener letras.");
    return false;
  }

  limpiarError(campo);
  return true;
}

function validarCorreo(campo) {
  const valor = campo.value.trim();
  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (valor === "") {
    mostrarError(campo, "Ingresa tu correo electronico.");
    return false;
  }

  if (!formatoCorreo.test(valor)) {
    mostrarError(campo, "Escribe un correo valido, por ejemplo nombre@correo.com.");
    return false;
  }

  limpiarError(campo);
  return true;
}

function validarTelefono(campo) {
  const valor = campo.value.trim();
  const soloNumeros = /^\d{7,15}$/;

  if (valor === "") {
    mostrarError(campo, "Ingresa tu telefono.");
    return false;
  }

  if (!soloNumeros.test(valor)) {
    mostrarError(campo, "El telefono debe tener solo numeros, entre 7 y 15 digitos.");
    return false;
  }

  limpiarError(campo);
  return true;
}

function validarSeleccion(campo) {
  if (campo.value.trim() === "") {
    mostrarError(campo, "Selecciona una opcion.");
    return false;
  }

  limpiarError(campo);
  return true;
}

function validarMensaje(campo) {
  if (campo.value.trim() === "") {
    mostrarError(campo, "Escribe tu mensaje o consulta.");
    return false;
  }

  limpiarError(campo);
  return true;
}

function mostrarMensajeExito(formulario) {
  let mensajeExito = formulario.querySelector(".mensaje-exito");

  if (!mensajeExito) {
    mensajeExito = document.createElement("p");
    mensajeExito.className = "mensaje-exito";
    formulario.appendChild(mensajeExito);
  }

  mensajeExito.textContent =
    "Se abrira WhatsApp con tu mensaje listo para enviar.";
}

function obtenerTextoAsunto(campoAsunto) {
  if (!campoAsunto) {
    return "consulta general";
  }

  const opcionSeleccionada = campoAsunto.selectedOptions[0];
  return opcionSeleccionada ? opcionSeleccionada.textContent : campoAsunto.value;
}

function crearMensajeWhatsappContacto(campos) {
  const asunto = obtenerTextoAsunto(campos.asunto).toLowerCase();
  const mensaje = campos.mensaje.value.trim();

  return [
    `Hola Bonny, vengo desde tu pagina web, mi nombre es ${campos.nombre.value.trim()}.`,
    `Te escribo para ${asunto} y queria comentarte que ${mensaje}`,
  ].join("\n");
}

function enviarFormularioPorWhatsapp(formulario, campos) {
  const telefonoBonny = "51929008614";
  const mensaje = crearMensajeWhatsappContacto(campos);
  const enlaceWhatsapp = `https://wa.me/${telefonoBonny}?text=${encodeURIComponent(mensaje)}`;

  window.open(enlaceWhatsapp, "_blank", "noopener");
  mostrarMensajeExito(formulario);
  formulario.reset();
}

function inicializarValidaciones() {
  const formularios = document.querySelectorAll(".formulario");

  formularios.forEach((formulario) => {
    const campoNombre = formulario.querySelector("#nombre, [name='nombre']");
    const campoTelefono = formulario.querySelector("#telefono, [name='telefono']");
    const campoAsunto = formulario.querySelector("#asunto, [name='asunto']");
    const campoMensaje = formulario.querySelector("#mensaje, [name='mensaje']");

    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const nombreValido = campoNombre ? validarNombre(campoNombre) : true;
      const telefonoValido = campoTelefono ? validarTelefono(campoTelefono) : true;
      const asuntoValido = campoAsunto ? validarSeleccion(campoAsunto) : true;
      const mensajeValido = campoMensaje ? validarMensaje(campoMensaje) : true;

      if (nombreValido && telefonoValido && asuntoValido && mensajeValido) {
        enviarFormularioPorWhatsapp(formulario, {
          nombre: campoNombre,
          asunto: campoAsunto,
          mensaje: campoMensaje,
        });
      }
    });

    if (campoNombre) {
      campoNombre.addEventListener("input", () => validarNombre(campoNombre));
    }

    if (campoTelefono) {
      campoTelefono.addEventListener("input", () => validarTelefono(campoTelefono));
    }

    if (campoAsunto) {
      campoAsunto.addEventListener("change", () => validarSeleccion(campoAsunto));
    }

    if (campoMensaje) {
      campoMensaje.addEventListener("input", () => validarMensaje(campoMensaje));
    }
  });
}
