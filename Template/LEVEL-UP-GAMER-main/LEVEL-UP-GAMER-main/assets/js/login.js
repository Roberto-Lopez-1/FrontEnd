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
const perfilBtn = document.getElementById("perfilBtn");
perfilBtn.addEventListener("click", function () {
  window.location.href = "perfil.html";
});
const registrarBtn = document.getElementById("registrarBtn");
registrarBtn.addEventListener("click", function () {
  window.location.href = "registrar.html";
});
