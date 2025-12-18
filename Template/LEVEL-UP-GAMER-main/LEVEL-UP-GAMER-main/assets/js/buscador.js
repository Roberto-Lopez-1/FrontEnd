const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll("#catalogo .col-12");

searchInput.addEventListener("input", function () {
  const query = searchInput.value.trim().toLowerCase();

  let found = false;
  productCards.forEach((card) => {
    const title = card.querySelector(".producto h3").textContent.toLowerCase();
    if (title.includes(query) || query === "") {
      card.style.display = "";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  let noResultDiv = document.getElementById("noResultsMsg");
  if (!found && query !== "") {
    if (!noResultDiv) {
      noResultDiv = document.createElement("div");
      noResultDiv.id = "noResultsMsg";
      noResultDiv.className = "text-center mt-4 text-danger";
      noResultDiv.innerText = "No se encontraron resultados.";
      document.getElementById("catalogo").appendChild(noResultDiv);
    }
  } else if (noResultDiv) {
    noResultDiv.remove();
  }
});
