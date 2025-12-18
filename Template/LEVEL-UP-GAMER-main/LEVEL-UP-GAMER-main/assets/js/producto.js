document.querySelectorAll(".producto").forEach((productoDiv) => {
  productoDiv.addEventListener("click", function (event) {
    if (event.target.classList.contains("agregarCarrito")) {
      return;
    }

    const codigo = this.getAttribute("data-codigo");
    document.getElementById("modalCodigoProducto").textContent = codigo;

    const titulo = this.querySelector("h3").textContent;
    const imagenSrc = this.querySelector("img").src;
    const precio = this.querySelector("p").textContent;
    let descripcion = "";

    switch (titulo) {
      case "Catan":
        descripcion =
          "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.";
        break;
      case "Carcassonne":
        descripcion =
          "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.";
        break;
      case "Controlador Xbox Series X":
        descripcion =
          "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.";
        break;
      case "Auriculares HyperX Cloud II":
        descripcion =
          "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.";
        break;
      case "Playstation 5":
        descripcion =
          "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.";
        break;
      case "PC Gamer ASUS ROG Strix":
        descripcion =
          "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.";
        break;
      case "Silla Gamer Secretlab Titan":
        descripcion =
          "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.";
        break;
      case "Mouse Gamer Logitech G502 HERO":
        descripcion =
          "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.";
        break;
      case "Mousepad Razer Goliathus Exteded Chroma":
        descripcion =
          "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.";
        break;
      case 'Polera Negra Persoalizada "Level-Up"':
      case 'Polera Roja Persoalizada "Level-Up"':
        descripcion =
          "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.";
        break;
      case 'Poleron Negro Persoalizado "Level-Up"':
      case 'Poleron Rojo Persoalizado "Level-Up"':
        descripcion =
          "Un polerón cómodo y versátil, con un diseño moderno que puedes personalizar con tu gamer tag o gráfico favorito para llevar tu estilo al siguiente nivel.";
        break;
      default:
        descripcion = "Descripción no disponible.";
    }

    document.getElementById("detalleProductoModalLabel").textContent = titulo;
    document.getElementById("modalCodigoProducto").textContent = codigo;
    const imgModal = document.getElementById("modalImagenProducto");
    imgModal.src = imagenSrc;
    imgModal.alt = titulo;
    document.getElementById("modalPrecioProducto").textContent = precio;
    document.getElementById("modalDescripcionProducto").textContent =
      descripcion;

    const btnAgregar = document.getElementById("modalAgregarCarrito");
    btnAgregar.dataset.precio = this.querySelector(
      "button.agregarCarrito"
    ).dataset.precio;
    btnAgregar.dataset.nombre = titulo;

    const modal = new bootstrap.Modal(
      document.getElementById("detalleProductoModal")
    );
    modal.show();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const verResenasBtn = document.getElementById("verResenasBtn");
  if (verResenasBtn) {
    verResenasBtn.addEventListener("click", function () {
      let modal = bootstrap.Modal.getInstance(
        document.getElementById("detalleProductoModal")
      );
      if (modal) modal.hide();

      setTimeout(function () {
        document
          .getElementById("resenas")
          .scrollIntoView({ behavior: "smooth" });
      }, 500);
    });
  }
});
