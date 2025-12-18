document.addEventListener("DOMContentLoaded", function () {
  const openLoginModal = document.getElementById("openLoginModal");
  const closeLoginModal = document.getElementById("closeLoginModal");
  const loginModal = document.getElementById("loginModal");

  openLoginModal.addEventListener("click", function (e) {
    e.preventDefault();
    loginModal.style.display = "flex";
  });

  closeLoginModal.addEventListener("click", function () {
    loginModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = "none";
    }
  });
});

let carrito = [];

const cartCount = document.getElementById("cart-count");
const cartItemsElement = document.getElementById("cartItems");
const cartModal = document.getElementById("cartModal");
const cartTotal = document.getElementById("cartTotalModal");
const openCartModalBtn = document.getElementById("openCartModal");
const closeCartModalBtn = document.getElementById("closeCartModal");
const payBtn = document.getElementById("payBtnModal");

openCartModalBtn.onclick = function (e) {
  e.preventDefault();
  cartModal.style.display = "block";
};
closeCartModalBtn.onclick = function () {
  cartModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target === cartModal) cartModal.style.display = "none";
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

function actualizarCarrito() {
  cartItemsElement.innerHTML = "";
  let total = 0;
  let count = 0;
  if (carrito.length === 0) {
    cartItemsElement.innerHTML = "<em>El carrito está vacío.</em>";
  }
  carrito.forEach((item) => {
    total += item.precio * item.cantidad;
    count += item.cantidad;
    const div = document.createElement("div");
    div.className = "cart-modal-item";
    div.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span>$${item.precio * item.cantidad}</span>
      <button class="btn-eliminar" onclick="eliminarDelCarrito('${
        item.nombre
      }')">X</button>
    `;
    cartItemsElement.appendChild(div);
  });
  cartTotal.textContent = "$" + total;
  cartCount.textContent = count;
}

window.eliminarDelCarrito = function (nombre) {
  carrito = carrito.filter((item) => item.nombre !== nombre);
  actualizarCarrito();
};

payBtn.onclick = function () {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  alert("¡Gracias por tu compra!");
  carrito = [];
  actualizarCarrito();
  closeCartModalBtn.click();
};

document.querySelectorAll(".agregarCarrito").forEach((btn) => {
  btn.addEventListener("click", function (event) {
    event.stopPropagation();
    const nombre =
      btn.dataset.nombre ||
      btn.closest(".producto").querySelector("h3").textContent;
    const precio = btn.dataset.precio;
    agregarAlCarrito(nombre, precio);
  });
});
