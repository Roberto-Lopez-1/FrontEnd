document.querySelectorAll(".resenas").forEach(renderizarResenas);

document.querySelectorAll(".form-resena").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const contenedor = this.closest(".resenas");
    const codigo = contenedor.dataset.codigo;
    const nombre = this.querySelector(".nombre-resena").value;
    const texto = this.querySelector(".texto-resena").value;
    const estrellas =
      Number(this.querySelector(".estrellas").dataset.valor) || 0;

    if (!nombre || !texto || estrellas === 0)
      return alert("Completa todos los campos y elige una calificación.");

    let resenas = JSON.parse(localStorage.getItem("resenas_" + codigo)) || [];
    resenas.push({
      nombre,
      texto,
      estrellas,
      fecha: new Date().toLocaleDateString(),
    });
    localStorage.setItem("resenas_" + codigo, JSON.stringify(resenas));
    renderizarResenas(contenedor);
    this.reset();
    this.querySelector(".estrellas").dataset.valor = 0;
    actualizarEstrellasVisuales(this.querySelector(".estrellas"));
  });
});

document.querySelectorAll(".estrellas").forEach((starsDiv) => {
  starsDiv.addEventListener("click", function (e) {
    if (e.target.dataset.star) {
      this.dataset.valor = e.target.dataset.star;
      actualizarEstrellasVisuales(this);
    }
  });
});

function actualizarEstrellasVisuales(div) {
  const val = Number(div.dataset.valor) || 0;
  div.querySelectorAll("span").forEach((span, idx) => {
    span.innerHTML = idx < val ? "&#9733;" : "&#9734;";
  });
}

function renderizarResenas(contenedor) {
  const codigo = contenedor.dataset.codigo;
  const listaDiv = contenedor.querySelector(".lista-resenas");
  let resenas = JSON.parse(localStorage.getItem("resenas_" + codigo)) || [];
  if (resenas.length === 0) {
    listaDiv.innerHTML = "<p>Sé el primero en dejar una reseña.</p>";
    return;
  }
  listaDiv.innerHTML = resenas
    .map(
      (r) => `
    <div class="item-resena">
      <strong>${r.nombre}</strong> 
      <span>${"★".repeat(r.estrellas)}${"☆".repeat(5 - r.estrellas)}</span>
      <small>(${r.fecha})</small>
      <div>${r.texto}</div>
    </div>
  `
    )
    .join("");
}

const stars = document.querySelectorAll("#ratingStars i");
const puntajeInput = document.getElementById("puntaje");
stars.forEach((star) => {
  star.addEventListener("click", function () {
    const rating = this.getAttribute("data-rating");
    puntajeInput.value = rating;
    stars.forEach((s, idx) => {
      s.classList.toggle("fa-solid", idx < rating);
      s.classList.toggle("fa-regular", idx >= rating);
    });
  });
});

document.getElementById("formResena").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreUsuario").value.trim();
  const comentario = document.getElementById("comentario").value.trim();
  const puntaje = document.getElementById("puntaje").value;
  if (!puntaje) return alert("Selecciona una calificación de estrellas.");

  let estrellas = "★★★★★☆☆☆☆☆".slice(5 - puntaje, 10 - puntaje);

  document.getElementById("resenas").innerHTML += `
    <div class="list-group-item">
      <div class="d-flex justify-content-between align-items-center">
        <span class="fw-bold">${nombre}</span>
        <small class="text-secondary">${estrellas}</small>
      </div>
      <p class="mb-1">${comentario}</p>
      <small class="text-muted">Publicado el ${new Date().toLocaleDateString(
        "es-CL"
      )}</small>
    </div>
  `;
  this.reset();
  stars.forEach((s) => s.classList.remove("fa-solid"));
  puntajeInput.value = "";
});
