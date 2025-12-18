import { HomeCarousel } from "../components/Carousel";
import { Reviews } from "../components/Reviews";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "../assets/Filtros.css";
import "../assets/Productos.css";
import { getProducts } from "../api/products";
import { getCategorias } from "../api/categorias";
import type { Product } from "../interfaces/Product";
import type { Categoria } from "../interfaces/Categoria";

export const Products = () => {
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

  const [products, setProducts] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);

    // Cargar categorías desde la API
    getCategorias()
      .then(setCategorias)
      .catch(console.error)
      .finally(() => setLoadingCategorias(false));
  }, []);

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase().trim() ?? "";
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);

  // Estados para los filtros
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);

  // Obtener precio mínimo y máximo de los productos
  const minPriceProductos = useMemo(
    () =>
      products.length > 0 ? Math.min(...products.map((p) => p.precio)) : 0,
    [products]
  );

  const maxPriceProductos = useMemo(
    () =>
      products.length > 0 ? Math.max(...products.map((p) => p.precio)) : 0,
    [products]
  );

  // Aplicar todos los filtros
  const filtered = useMemo(() => {
    return products
      .filter((p) => (q ? p.nombre.toLowerCase().includes(q) : true))
      .filter((p) =>
        selectedCategory === "all" ? true : p.categoria === selectedCategory
      )
      .filter((p) => p.precio >= minPrice && p.precio <= maxPrice);
  }, [q, selectedCategory, minPrice, maxPrice, products]);

  return (
    <>
      {usuario ? (
        <>
          <h3>
            Bienvenido, {usuario.nombre} {usuario.apellido}
          </h3>
        </>
      ) : (
        <></>
      )}
      <HomeCarousel />
      <main className="container mt-5">
        {/* Filtros con nuevo diseño */}
        <div className="filters-container">
          <h3 className="filters-title">
            <i className="fa fa-filter"></i> Filtros de Búsqueda
          </h3>
          <div className="filters-content">
            {/* FILTRO DE CATEGORIA */}
            <div className="filter-group">
              <label htmlFor="category">
                <i className="fa fa-tags"></i> Categoría
              </label>
              {loadingCategorias ? (
                <p>Cargando categorías...</p>
              ) : (
                <select
                  name="category"
                  id="category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  value={selectedCategory}
                >
                  <option value="all">Todos los productos</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.nombre}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* FILTRO DE PRECIO */}
            <div className="filter-group">
              <label>
                <i className="fa fa-dollar-sign"></i> Rango de Precio
              </label>
              <div className="price-inputs">
                <div className="price-group">
                  <input
                    id="minPrice"
                    type="number"
                    placeholder="Mín"
                    value={minPrice}
                    onChange={(e) =>
                      e.target.value === ""
                        ? setMinPrice(minPriceProductos)
                        : setMinPrice(Number(e.target.value))
                    }
                  />
                  <div className="price-value">
                    {new Intl.NumberFormat("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    }).format(minPrice)}
                  </div>
                </div>
                <div className="price-group">
                  <input
                    id="maxPrice"
                    type="number"
                    placeholder="Máx"
                    value={maxPrice}
                    onChange={(e) =>
                      e.target.value === ""
                        ? setMaxPrice(maxPriceProductos)
                        : setMaxPrice(Number(e.target.value))
                    }
                  />
                  <div className="price-value">
                    {new Intl.NumberFormat("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    }).format(maxPrice)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="alert alert-info">
            <i className="fa fa-info-circle"></i> No se encontraron productos
            con los filtros seleccionados
          </div>
        )}
        <section id="catalogo" className="row g-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              data-categoria={p.categoria}
            >
              <div className="producto" data-codigo={p.id}>
                <h3>{p.nombre}</h3>
                <img
                  src={`http://localhost:8080${p.imgUrl}`}
                  alt={p.nombre}
                  className="img-fluid"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    (e.target as HTMLImageElement).src =
                      "/placeholder-image.jpg";
                  }}
                />
                <p>
                  {new Intl.NumberFormat("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  }).format(p.precio)}
                </p>
                <div className="d-flex flex-column gap-2">
                  <button
                    type="button"
                    className="agregarCarrito"
                    onClick={() => {
                      addItem(
                        {
                          id: String(p.id),
                          title: p.nombre,
                          price: p.precio,
                          imgSrc: p.imgUrl,
                        },
                        1
                      );
                      const cb = document.getElementById(
                        "toggle-menu"
                      ) as HTMLInputElement | null;
                      if (cb && cb.checked) cb.checked = false;
                      alert("Producto añadido al carrito");
                    }}
                  >
                    Agregar al Carro
                  </button>

                  <button
                    type="button"
                    className="btn-gamer-neon mt-2"
                    onClick={() => {
                      navigate(`/productos/${p.id}`);
                      const cb = document.getElementById(
                        "toggle-menu"
                      ) as HTMLInputElement | null;
                      if (cb && cb.checked) cb.checked = false;
                    }}
                  >
                    Ver Detalle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
        <Reviews />
      </main>
    </>
  );
};
