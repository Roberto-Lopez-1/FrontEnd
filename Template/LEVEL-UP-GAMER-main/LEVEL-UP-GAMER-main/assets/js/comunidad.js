 document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([-33.45, -70.65], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);
    L.marker([-33.476842, -70.657381]).addTo(map).bindPopup('Entretenimientos Paranoia');
    L.marker([-33.426544, -70.612153]).addTo(map).bindPopup('InGaming Providencia');
  });