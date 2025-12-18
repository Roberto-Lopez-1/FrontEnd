import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext, type CartItem } from "../context/CartContext";

export const Carrito = () => {
  const { items, removeItem, total, clearCart, loading, carritoBackendItems } =
    useContext(CartContext);
  const navigate = useNavigate();

  // Verificar si hay usuario logueado
  const datosAlmacenados = JSON.parse(
    localStorage.getItem("usuario") || "null"
  );
  const usuario = datosAlmacenados?.usuario || null;

  const handlePay = () => {
    if (items.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (!usuario) {
      alert("Debes iniciar sesión para proceder al pago");
      navigate("/login");
      return;
    }

    alert("Gracias por su compra");
    clearCart();
    navigate("/");
  };

  // Función para obtener el código del producto
  const getProductCode = (item: CartItem): string => {
    // Buscar en carritoBackendItems para obtener el código real del backend
    const backendItem = carritoBackendItems.find(
      (bItem) => String(bItem.productoId) === item.id
    );

    if (backendItem) {
      // Si está en el backend, usar su ID
      return `PRD${String(backendItem.productoId).padStart(3, "0")}`;
    }

    // Si no está en backend (carrito local), usar el ID local
    return `PRD${String(item.id).padStart(3, "0")}`;
  };

  if (loading) {
    return (
      <main
        className="container py-5"
        style={{
          background: "#111",
          border: "3px solid #39ff14",
          borderRadius: "16px",
          boxShadow: "0 4px 18px rgba(0, 224, 255, 0.2)",
          marginTop: "40px",
          marginBottom: "40px",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#1e90ff" }}>
          <div
            className="spinner-border"
            role="status"
            style={{ width: "3rem", height: "3rem", marginBottom: "1rem" }}
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h3>Cargando carrito...</h3>
        </div>
      </main>
    );
  }

  return (
    <main
      className="container py-5"
      id="carrito"
      style={{
        background: "#111",
        border: "3px solid #39ff14",
        borderRadius: "16px",
        boxShadow: "0 4px 18px rgba(0, 224, 255, 0.2)",
        marginTop: "40px",
        marginBottom: "40px",
      }}
    >
      <h1
        className="display-5 fw-bold mb-4"
        style={{
          color: "#1e90ff",
          fontFamily: "Orbitron, Roboto, Arial, sans-serif",
          letterSpacing: "1px",
          textAlign: "center",
        }}
      >
        Carrito de Compras
      </h1>

      {!usuario && (
        <div
          className="alert alert-warning text-center mb-4"
          style={{
            background: "rgba(255, 193, 7, 0.1)",
            border: "2px solid #ffc107",
            color: "#ffc107",
          }}
        >
          <i className="fa fa-info-circle me-2"></i>
          Tu carrito está guardado localmente.{" "}
          <Link
            to="/login"
            style={{ color: "#00d9ff", textDecoration: "underline" }}
          >
            Inicia sesión
          </Link>{" "}
          para sincronizarlo.
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table
              className="table align-middle gamer-cart-table"
              style={{
                background: "#181c2e",
                color: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                borderCollapse: "separate",
                borderSpacing: 0,
              }}
            >
              <thead className="gamer-cart-thead">
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio Unitario</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      <div style={{ padding: "2rem" }}>
                        <i
                          className="fa fa-shopping-cart"
                          style={{
                            fontSize: "3rem",
                            color: "#1e90ff",
                            marginBottom: "1rem",
                          }}
                        ></i>
                        <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                          No hay productos en el carrito.
                        </p>
                        <Link to="/" className="btn-gamer-neon">
                          Ir a Comprar
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
                {items.map((it) => (
                  <tr key={it.id} className="gamer-cart-row">
                    <td style={{ maxWidth: 300 }}>
                      <div className="d-flex align-items-center gap-3">
                        {it.imgSrc && (
                          <img
                            src={`http://localhost:8080${it.imgSrc}`}
                            alt={it.title}
                            style={{
                              width: 80,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 6,
                              border: "2px solid #00d9ff",
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder-image.jpg";
                            }}
                          />
                        )}
                        <div>
                          <div className="fw-bold">{it.title}</div>
                          <div className="small" style={{ color: "#39ff14" }}>
                            Código: {getProductCode(it)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {new Intl.NumberFormat("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      }).format(it.price)}
                    </td>

                    <td>
                      <QuantityControl item={it} />
                    </td>

                    <td style={{ color: "#39ff14", fontWeight: "bold" }}>
                      {new Intl.NumberFormat("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      }).format(it.price * it.quantity)}
                    </td>
                    <td>
                      <button
                        className="btn-gamer-neon btn-sm"
                        onClick={() => {
                          if (confirm("¿Eliminar este producto del carrito?")) {
                            removeItem(it.id);
                          }
                        }}
                        disabled={loading}
                        style={{
                          background: "#ff1744",
                          borderColor: "#ff1744",
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length > 0 && (
                  <tr style={{ background: "#181c2e" }}>
                    <td
                      colSpan={3}
                      className="text-end fw-bold"
                      style={{
                        color: "#1e90ff",
                        fontSize: "1.3rem",
                      }}
                    >
                      Total:
                    </td>
                    <td
                      colSpan={2}
                      className="fw-bold fs-5"
                      style={{
                        color: "#39ff14",
                        fontSize: "1.5rem !important",
                        textShadow: "0 0 10px #39ff14",
                      }}
                    >
                      {new Intl.NumberFormat("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      }).format(total)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {items.length > 0 && (
            <div className="d-flex justify-content-end gap-3 mt-4">
              <Link
                to="/"
                className="btn-gamer-neon"
                style={{
                  fontSize: "1.1rem",
                  padding: "8px 22px",
                  border: "2px solid #00d9ff",
                  color: "#00d9ff",
                }}
              >
                Seguir Comprando
              </Link>
              <button
                onClick={handlePay}
                className="btn-gamer-neon"
                style={{
                  fontSize: "1.1rem",
                  padding: "8px 22px",
                  background: "linear-gradient(45deg, #39ff14, #00d9ff)",
                  border: "none",
                  color: "#000",
                  fontWeight: "bold",
                }}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Proceder al Pago"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

/* Control de cantidad: botones + campo numérico (similar a AddToCartButton) */
function QuantityControl({ item }: { item: CartItem }) {
  const { updateQuantity, loading } = useContext(CartContext);
  const [qty, setQty] = useState<number>(item.quantity);

  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const increment = () => {
    const next = Math.min(99, qty + 1);
    setQty(next);
    updateQuantity(item.id, next);
  };

  const decrement = () => {
    const next = Math.max(1, qty - 1);
    setQty(next);
    updateQuantity(item.id, next);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(99, Number(e.target.value || 1)));
    setQty(value);
  };

  const handleBlur = () => {
    updateQuantity(item.id, qty);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="input-group" style={{ width: 140 }}>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={decrement}
          disabled={loading || qty <= 1}
          style={{
            background: "#39ff14",
            borderColor: "#39ff14",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          -
        </button>
        <input
          value={qty}
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="number"
          className="form-control text-center"
          min={1}
          max={99}
          disabled={loading}
          style={{
            background: "#0a0a0a",
            color: "#fff",
            border: "1px solid #39ff14",
            fontWeight: "bold",
          }}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={increment}
          disabled={loading || qty >= 99}
          style={{
            background: "#39ff14",
            borderColor: "#39ff14",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Carrito;
