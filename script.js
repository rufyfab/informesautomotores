// Esperamos a que todo el contenido del HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {
  const selectTipo = document.getElementById("tipo");
  const preciosLista = document.querySelectorAll(".precios li");
  const form = document.getElementById("informeForm");
  const patenteInput = document.getElementById("patente");

  // Expresión regular para patentes argentinas válidas (ABC123 o AA123BB)
  const formatoPatente = /^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z]{2})$/i;

  // ✅ Validar patente mientras el usuario escribe
  patenteInput.addEventListener("input", () => {
    const patente = patenteInput.value.toUpperCase().trim();

    if (patente === "") {
      // Si está vacío, volver al borde gris
      patenteInput.style.border = "2px solid #ccc";
    } else if (formatoPatente.test(patente)) {
      patenteInput.style.border = "2px solid #0b74de"; // azul = válido
    } else {
      patenteInput.style.border = "2px solid red"; // rojo = inválido
    }

    patenteInput.value = patente; // convertir a mayúsculas automáticamente
  });

  // 🔵 Función para actualizar el resaltado de precios
  selectTipo.addEventListener("change", () => {
    const valor = selectTipo.value;

    // Primero quitamos cualquier resaltado previo
    preciosLista.forEach(item => {
      item.style.background = "transparent";
      item.style.fontWeight = "normal";
    });

    // Según el valor seleccionado, destacamos el precio correspondiente
    if (valor === "dominio") {
      preciosLista[0].style.background = "#d9ecff";
      preciosLista[0].style.fontWeight = "bold";
    } else if (valor === "multas") {
      preciosLista[1].style.background = "#d9ecff";
      preciosLista[1].style.fontWeight = "bold";
    } else if (valor === "ambos") {
      preciosLista[2].style.background = "#d9ecff";
      preciosLista[2].style.fontWeight = "bold";
    }
  });

  // 📩 Manejamos el envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita recargar la página

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const patente = patenteInput.value.trim();
    const tipo = selectTipo.value;

    if (!formatoPatente.test(patente)) {
      alert("⚠️ Ingresá un dominio o patente válido.\nEjemplo: ABC123 o AA123BB");
      patenteInput.focus();
      patenteInput.style.border = "2px solid red";
      return;
    }

    if (!nombre || !email || !patente || !tipo) {
      alert("Por favor completá todos los campos antes de enviar.");
      return;
    }

  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("informeForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const patente = document.getElementById("patente").value;
    const tipo = document.getElementById("tipo").value;

    const data = { nombre, email, telefono, patente, tipo };

    try {
await fetch("https://script.google.com/macros/s/AKfycbzvIRQiYREa3r7pOknqtzqpIjNWD17pg8pd3PGXLYfRWUB-WRxdIv0iL_qldE0NQO8a/exec", {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});


  // ✔ No mostramos alert
  form.reset();
// 🔵 Cambiar botón después de enviar
  const boton = document.querySelector("#informeForm button");
  boton.disabled = true;
  boton.style.background = "#28a745"; // verde
  boton.innerText = "Enviado";

  setTimeout(() => {
    boton.disabled = false;
    boton.style.background = "#0b74de"; // color original
    boton.innerText = "Solicitar informe";
  }, 2500);
} catch (error) {
  alert("❌ Error al enviar los datos.");
  console.log(error);
}

  });
});
