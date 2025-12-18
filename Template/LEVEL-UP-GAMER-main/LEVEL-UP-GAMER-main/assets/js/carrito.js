let carrito = [];

const cartSidebar = document.getElementById("cartSidebar");
const cartCount = document.getElementById("cart-count");
const cartItemsElement = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

document.getElementById("openCartModal").onclick = () => {
  cartSidebar.classList.add("show");
  cartSidebar.style.visibility = "visible";
};
document.getElementById("closeCartBtn").onclick = () => {
  cartSidebar.classList.remove("show");
  cartSidebar.style.visibility = "hidden";
};

function agregarAlCarrito(nombre, precio) {
  const precioNum = parseInt(precio, 10);
  const existente = carrito.find((p) => p.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio: precioNum, cantidad: 1 });
  }
  actualizarCarrito();
}

function eliminarUnoDelCarrito(nombre) {
  const item = carrito.find((p) => p.nombre === nombre);
  if (item) {
    item.cantidad--;
    if (item.cantidad <= 0) {
      carrito = carrito.filter((i) => i.nombre !== nombre);
    }
    actualizarCarrito();
  }
}
window.eliminarUnoDelCarrito = eliminarUnoDelCarrito;

function eliminarDelCarrito(nombre) {
  carrito = carrito.filter((item) => item.nombre !== nombre);
  actualizarCarrito();
}
window.eliminarDelCarrito = eliminarDelCarrito;

function modificarCantidad(nombre, nuevaCantidad) {
  const item = carrito.find((p) => p.nombre === nombre);
  nuevaCantidad = parseInt(nuevaCantidad, 10) || 1;
  if (item) {
    item.cantidad = nuevaCantidad;
    if (item.cantidad <= 0) eliminarDelCarrito(nombre);
    else actualizarCarrito();
  }
}
window.modificarCantidad = modificarCantidad;

function actualizarCarrito() {
  cartItemsElement.innerHTML = "";
  let total = 0,
    count = 0;
  carrito.forEach((item) => {
    total += item.precio * item.cantidad;
    count += item.cantidad;
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${item.nombre}</span>
      <input type="number" min="1" value="${
        item.cantidad
      }" style="width:55px;" onchange="modificarCantidad('${
      item.nombre
    }', this.value)">
      <span>$${item.precio * item.cantidad}</span>
      <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito('${
        item.nombre
      }')">X</button>
      <button class="btn btn-sm btn-warning ms-2" onclick="eliminarUnoDelCarrito('${
        item.nombre
      }')">-1</button>
    `;
    cartItemsElement.appendChild(li);
  });
  cartTotal.textContent = "$" + total;
  cartCount.textContent = count;
}

document.getElementById("payBtn").onclick = () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  alert("Gracias por tu compra!");
  carrito = [];
  actualizarCarrito();
  document.getElementById("closeCartBtn").click();
};

document.querySelectorAll(".agregarCarrito").forEach((btn) => {
  btn.addEventListener("click", function (event) {
    event.stopPropagation();
    const productoDiv = this.closest(".producto");
    const nombre = productoDiv.querySelector("h3").textContent;
    const precio = this.dataset.precio;
    agregarAlCarrito(nombre, precio);
  });
});
document.getElementById("closeCartGamerBtn").onclick = function () {
  cartSidebar.classList.remove("show");
  cartSidebar.style.visibility = "hidden";
};

document.getElementById("modalAgregarCarrito").onclick = function () {
  const nombre = document.getElementById(
    "detalleProductoModalLabel"
  ).textContent;
  let precioText = document.getElementById("modalPrecioProducto").textContent;
  let precioNum = precioText.replace("$", "").replace(".", "");
  agregarAlCarrito(nombre, precioNum);
};
