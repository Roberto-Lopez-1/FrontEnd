import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
// Importamos el contexto del carrito para poder leer el número total de productos
// que el usuario ha añadido. El contexto persiste en localStorage, por lo que
// el contador se mantiene aunque el usuario cambie de página o recargue.
import { CartContext } from "../context/CartContext";

export const Navbar = () => {
  const datosAlmacenados = JSON.parse(
    localStorage.getItem("usuario") || "null"
  );

  // Extraer el objeto usuario interno
  const usuario = datosAlmacenados?.usuario || null;
  const token = datosAlmacenados?.token || null;

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { pathname } = useLocation();
  // ocultar buscador y carrito en rutas de autenticación/perfil
  const hideControls =
    pathname === "/login" ||
    pathname === "/registrar" ||
    pathname === "/perfil";
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // Obtenemos 'count' desde el CartContext. 'count' es la suma de las
  // cantidades de todos los items del carrito y se actualiza automáticamente
  // cuando se añade/elimina un producto.
  const { count } = useContext(CartContext);

  // Realizar búsqueda en tiempo real
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const q = value.trim();
    // Navegar a home con o sin parámetro de búsqueda
    if (q.length > 0) {
      navigate(`/?q=${encodeURIComponent(q)}`);
    } else {
      navigate("/");
    }
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir envío del formulario
  };

  const closeMobileMenu = () => {
    const cb = document.getElementById(
      "toggle-menu"
    ) as HTMLInputElement | null;
    if (cb && cb.checked) cb.checked = false;
  };
  return (
    <>
      <nav className="gamer-navbar">
        <div className="gamer-navbar-logo">
          <Link to="/">
            <img src="/img/level-up.png" alt="Logo gamer" />
          </Link>
          <Link to="/">
            <span>Level-Up Gamers</span>
          </Link>
        </div>
        <input type="checkbox" id="toggle-menu" className="toggle-menu" />
        <label htmlFor="toggle-menu" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className="gamer-navbar-content">
          <button
            className="close-nav-mobile"
            id="closeNavMobileBtn"
            type="button"
            onClick={closeMobileMenu}
          >
            &times;
          </button>
          {!hideControls && (
            <form
              className="gamer-navbar-search"
              onSubmit={onSearch}
              role="search"
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar Producto"
                aria-label="Search"
                id="searchInput"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          )}
          <div className="gamer-navbar-actions">
            <Link to="/comunidad" onClick={closeMobileMenu}>
              <i className="fa fa-users"></i> Comunidad
            </Link>
            {usuario ? (
              <>
                <a onClick={cerrarSesion}>
                  <i className="fa fa-user"></i> Cerrar sesión
                </a>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu}>
                  <i className="fa fa-user"></i> Inicia sesión
                </Link>
              </>
            )}
            {!hideControls && (
              <>
                <Link
                  to="/carrito"
                  className="cart-btn"
                  id="openCartModal"
                  onClick={closeMobileMenu}
                >
                  <i className="fa fa-shopping-cart"></i>
                  Carrito (
                  {/* Mostramos aquí el contador total de productos del carrito. */}
                  <span id="cart-count">{count}</span>)
                </Link>
                <div
                  id="cartSidebar"
                  className="offcanvas offcanvas-end"
                  tabIndex={-1}
                >
                  <button className="close-gamer-cart" id="closeCartGamerBtn">
                    &times;
                  </button>
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title">Resumen</h5>
                    <button
                      type="button"
                      className="btn-close"
                      id="closeCartBtn"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <ul id="cartItems" className="list-group mb-4"></ul>
                    <hr />
                    <p>
                      <b>Total:</b> <span id="cartTotal">$0</span>
                    </p>
                    <button className="btn btn-success w-100" id="payBtn">
                      Pagar
                    </button>
                  </div>
                </div>
              </>
            )}
            <div
              id="cartSidebar"
              className="offcanvas offcanvas-end"
              tabIndex={-1}
            >
              <button className="close-gamer-cart" id="closeCartGamerBtn">
                &times;
              </button>
              <div className="offcanvas-header">
                <h5 className="offcanvas-title">Resumen</h5>
                <button
                  type="button"
                  className="btn-close"
                  id="closeCartBtn"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul id="cartItems" className="list-group mb-4"></ul>
                <hr />
                <p>
                  <b>Total:</b> <span id="cartTotal">$0</span>
                </p>
                <button className="btn btn-success w-100" id="payBtn">
                  Pagar
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
