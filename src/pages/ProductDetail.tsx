import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/productos/${id}`)
      .then((res) => res.json())
      .then((p) =>
        setProduct({
          id: p.id,
          title: p.nombre,
          price: p.precio,
          imgSrc: "http://localhost:8080" + p.imgUrl,
          category: p.categoria,
          description: p.descripcion,
        })
      )
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;

  if (!product) {
    return (
      <main className="container mt-5">
        <p className="lead">Producto no encontrado.</p>
        <Link to="/" className="btn btn-outline-secondary">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="row g-4 mt-4">
        <div className="col-12 col-lg-6">
          <div className="card border-0">
            <div className="ratio ratio-16x9 bg-body-secondary rounded d-flex align-items-center justify-content-center">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="rounded"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="d-flex align-items-center justify-content-between">
            <span className="text-uppercase small text-secondary">
              {product.category}
            </span>
            <span className="small text-secondary">Código: {product.id}</span>
          </div>

          <h1 className="h3 mt-1">{product.title}</h1>

          <hr className="my-3" />

          <div className="d-flex align-items-center gap-3">
            <div className="price-now">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(product.price)}
            </div>
          </div>

          <div className="buy-cta mt-3">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <div className="row g-6 mt-1 mt-lg-4">
        <div className="col-12 col-lg-12">
          <div className="card border-0">
            <div className="card-body">
              <h3 className="h5">Descripción</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;

function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-2">
        <div className="input-group" style={{ width: "140px" }}>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setQty((s) => Math.max(1, s - 1))}
          >
            -
          </button>
          <input
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
            type="number"
            className="form-control text-center"
            min={1}
            max={5}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setQty((s) => Math.min(5, s + 1))}
          >
            +
          </button>
        </div>
      </div>

      <button
        className="agregarCarrito btn-lg w-50"
        onClick={() => {
          addItem(
            {
              id: product.id,
              title: product.title,
              price: product.price,
              imgSrc: product.imgSrc,
            },
            qty
          );
          alert("Producto añadido al carrito");
        }}
      >
        <i className="fa fa-cart-plus me-2"></i> Agregar al Carro
      </button>
    </div>
  );
}
