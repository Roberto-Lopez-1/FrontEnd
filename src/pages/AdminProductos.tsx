import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/products";
import {
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../api/admin";
import { getCategorias } from "../api/categorias";
import type { Product } from "../interfaces/Product";
import type { Categoria } from "../interfaces/Categoria";
import "../assets/Admin.css";

export const AdminProductos = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: 0,
    imgUrl: "",
  });

  // Verificar si es admin
  useEffect(() => {
    const datosAlmacenados = JSON.parse(
      localStorage.getItem("usuario") || "null"
    );
    const usuario = datosAlmacenados?.usuario || null;

    if (!usuario || usuario.tipoUsuario !== "Admin") {
      alert("Acceso denegado. Solo administradores.");
      navigate("/");
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriasData] = await Promise.all([
        getProducts(),
        getCategorias(),
      ]);
      setProducts(productsData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error cargando datos:", error);
      alert("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    } else if (formData.nombre.length > 50) {
      newErrors.nombre = "El nombre no puede exceder 50 caracteres";
    }

    // Validar nombre único (solo al crear o si cambió el nombre)
    const nombreExiste = products.some(
      (p) =>
        p.nombre.toLowerCase() === formData.nombre.toLowerCase() &&
        (!editingProduct || p.id !== editingProduct.id)
    );
    if (nombreExiste) {
      newErrors.nombre = "Ya existe un producto con este nombre";
    }

    // Validar categoría
    if (!formData.categoria) {
      newErrors.categoria = "La categoría es obligatoria";
    }

    // Validar descripción
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    } else if (formData.descripcion.length < 10) {
      newErrors.descripcion =
        "La descripción debe tener al menos 10 caracteres";
    } else if (formData.descripcion.length > 200) {
      newErrors.descripcion = "La descripción no puede exceder 200 caracteres";
    }

    // Validar precio
    if (formData.precio <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0";
    } else if (formData.precio > 999999999) {
      newErrors.precio = "El precio es demasiado alto";
    }

    // Validar imagen
    if (!formData.imgUrl.trim()) {
      newErrors.imgUrl = "La URL de la imagen es obligatoria";
    } else if (!/^\/img\/.*\.(jpg|jpeg|png|webp|gif)$/i.test(formData.imgUrl)) {
      newErrors.imgUrl =
        "La URL debe empezar con /img/ y terminar en .jpg, .jpeg, .png, .webp o .gif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) : value,
    }));

    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        nombre: product.nombre,
        categoria: product.categoria,
        descripcion: product.descripcion,
        precio: product.precio,
        imgUrl: product.imgUrl,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        nombre: "",
        categoria: "",
        descripcion: "",
        precio: 0,
        imgUrl: "",
      });
    }
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    try {
      if (editingProduct) {
        // Actualizar
        await actualizarProducto(editingProduct.id, {
          ...formData,
          id: editingProduct.id,
        });
        alert("Producto actualizado correctamente");
      } else {
        // Crear
        await crearProducto(formData);
        alert("Producto creado correctamente");
      }

      closeModal();
      loadData();
    } catch (error: any) {
      console.error("Error guardando producto:", error);

      // Manejar errores del backend
      if (error.response?.data) {
        const backendErrors = error.response.data;

        if (typeof backendErrors === "object") {
          // Si el backend devuelve un objeto de errores
          setErrors(backendErrors);
        } else if (backendErrors.error) {
          // Si el backend devuelve un mensaje de error
          alert(backendErrors.error);
        } else {
          alert("Error al guardar el producto");
        }
      } else {
        alert("Error al guardar el producto");
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await eliminarProducto(id);
      alert("Producto eliminado correctamente");
      loadData();
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Error al eliminar el producto. Puede estar en uso en carritos.");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando gestión de productos...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <button
            className="btn-back"
            onClick={() => navigate("/admin")}
            title="Volver al panel"
          >
            <i className="fa fa-chevron-left"></i> Volver
          </button>
          <h1>
            <i className="fa fa-box"></i> Gestión de Productos
          </h1>
        </div>
        <button className="btn-add-product" onClick={() => openModal()}>
          <i className="fa fa-plus"></i> Agregar Producto
        </button>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={`http://localhost:8080${product.imgUrl}`}
                    alt={product.nombre}
                    className="product-thumbnail"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/placeholder-image.jpg";
                    }}
                  />
                </td>
                <td className="product-name">{product.nombre}</td>
                <td>
                  <span className="badge-category">{product.categoria}</span>
                </td>
                <td className="product-price">
                  {new Intl.NumberFormat("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  }).format(product.precio)}
                </td>
                <td className="product-description">{product.descripcion}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => openModal(product)}
                      title="Editar"
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(product.id)}
                      title="Eliminar"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {editingProduct ? (
                  <>
                    <i className="fa fa-edit"></i> Editar Producto
                  </>
                ) : (
                  <>
                    <i className="fa fa-plus"></i> Nuevo Producto
                  </>
                )}
              </h2>
              <button className="btn-close-modal" onClick={closeModal}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form" noValidate>
              <div className="form-group">
                <label htmlFor="nombre">
                  Nombre del Producto <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={errors.nombre ? "input-error" : ""}
                  maxLength={50}
                />
                {errors.nombre && (
                  <span className="error-message">
                    <i className="fa fa-exclamation-circle"></i> {errors.nombre}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="categoria">
                  Categoría <span className="required">*</span>
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className={errors.categoria ? "input-error" : ""}
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.nombre}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
                {errors.categoria && (
                  <span className="error-message">
                    <i className="fa fa-exclamation-circle"></i>{" "}
                    {errors.categoria}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="precio">
                  Precio (CLP) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  className={errors.precio ? "input-error" : ""}
                  min={1}
                  max={999999999}
                />
                {errors.precio && (
                  <span className="error-message">
                    <i className="fa fa-exclamation-circle"></i> {errors.precio}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="imgUrl">
                  URL de la Imagen <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="imgUrl"
                  name="imgUrl"
                  value={formData.imgUrl}
                  onChange={handleInputChange}
                  className={errors.imgUrl ? "input-error" : ""}
                  placeholder="/img/producto.jpg"
                  maxLength={50}
                />
                <small>
                  Debe empezar con <code>/img/</code> y terminar en .jpg, .jpeg,
                  .png, .webp o .gif
                </small>
                {errors.imgUrl && (
                  <span className="error-message">
                    <i className="fa fa-exclamation-circle"></i> {errors.imgUrl}
                  </span>
                )}
                {formData.imgUrl && !errors.imgUrl && (
                  <div className="image-preview">
                    <img
                      src={`http://localhost:8080${formData.imgUrl}`}
                      alt="Preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">
                  Descripción <span className="required">*</span>
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  className={errors.descripcion ? "input-error" : ""}
                  rows={4}
                  maxLength={200}
                />
                <small>
                  {formData.descripcion.length}/200 caracteres (mínimo 10)
                </small>
                {errors.descripcion && (
                  <span className="error-message">
                    <i className="fa fa-exclamation-circle"></i>{" "}
                    {errors.descripcion}
                  </span>
                )}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  <i className="fa fa-save"></i>{" "}
                  {editingProduct ? "Actualizar" : "Crear"} Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
