import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategorias,
  crearCategoria,
  eliminarCategoria,
} from "../api/categorias";
import type { Categoria } from "../interfaces/Categoria";
import "../assets/AdminCategorias.css";

export const AdminCategorias = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
      alert("Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!nombreCategoria.trim()) {
      newErrors.nombre = "El nombre de la categoría es obligatorio";
    } else if (nombreCategoria.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    } else if (nombreCategoria.length > 30) {
      newErrors.nombre = "El nombre no puede exceder 30 caracteres";
    }

    const nombreExiste = categorias.some(
      (c) => c.nombre.toLowerCase() === nombreCategoria.toLowerCase()
    );
    if (nombreExiste) {
      newErrors.nombre = "Ya existe una categoría con este nombre";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await crearCategoria({ nombre: nombreCategoria });
      alert("Categoría creada correctamente");
      setNombreCategoria("");
      closeModal();
      loadData();
    } catch (error: any) {
      console.error("Error creando categoría:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Error al crear la categoría");
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "¿Estás seguro de eliminar esta categoría? Los productos asignados a esta categoría se verán afectados."
      )
    ) {
      return;
    }

    try {
      await eliminarCategoria(id);
      alert("Categoría eliminada correctamente");
      loadData();
    } catch (error: any) {
      console.error("Error eliminando categoría:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Error al eliminar la categoría");
      }
    }
  };

  const openModal = () => {
    setNombreCategoria("");
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNombreCategoria("");
    setErrors({});
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando gestión de categorías...</p>
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
            <i className="fa fa-tags"></i> Gestión de Categorías
          </h1>
        </div>
        <button className="btn-add-category" onClick={openModal}>
          <i className="fa fa-plus"></i> Agregar Categoría
        </button>
      </div>

      <div className="categories-grid">
        {categorias.length > 0 ? (
          categorias.map((categoria) => (
            <div key={categoria.id} className="category-card">
              <div className="category-icon">
                <i className="fa fa-folder"></i>
              </div>
              <h3>{categoria.nombre}</h3>
              <p>ID: {categoria.id}</p>
              <button
                className="btn-delete-category"
                onClick={() => handleDelete(categoria.id)}
                title="Eliminar"
              >
                <i className="fa fa-trash"></i> Eliminar
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <i className="fa fa-inbox"></i>
            <p>No hay categorías registradas</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fa fa-plus"></i> Nueva Categoría
              </h2>
              <button className="btn-close-modal" onClick={closeModal}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="category-form" noValidate>
              <div className="form-group">
                <label htmlFor="nombreCategoria">
                  Nombre de la Categoría <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nombreCategoria"
                  value={nombreCategoria}
                  onChange={(e) => {
                    setNombreCategoria(e.target.value);
                    if (errors.nombre) {
                      setErrors({});
                    }
                  }}
                  className={errors.nombre ? "input-error" : ""}
                  maxLength={30}
                  placeholder="Ej: Gaming Chairs"
                />
                {errors.nombre && (
                  <span className="error-message">
                    <i className="fa fa-exclamation-circle"></i> {errors.nombre}
                  </span>
                )}
                <small>{nombreCategoria.length}/30 caracteres</small>
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
                  <i className="fa fa-save"></i> Crear Categoría
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
