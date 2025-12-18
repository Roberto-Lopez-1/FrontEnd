document.addEventListener("DOMContentLoaded", function () {
  const filtros = document.querySelectorAll(".btn-categoria");
  const productos = document.querySelectorAll(".producto");

  filtros.forEach((filtro) => {
    filtro.addEventListener("click", function () {
      filtros.forEach((btn) => btn.classList.remove("active"));

      this.classList.add("active");

      const categoria = this.getAttribute("data-categoria");

      productos.forEach((producto) => {
        const productoCategoria =
          producto.parentElement.getAttribute("data-categoria");

        if (categoria === "todos" || productoCategoria === categoria) {
          producto.parentElement.style.display = "block";
        } else {
          producto.parentElement.style.display = "none";
        }
      });
    });
  });
});
