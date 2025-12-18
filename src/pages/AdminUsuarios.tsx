import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, crearUsuario, eliminarUsuario } from "../api/users";
import type { User } from "../interfaces/User";
import "../assets/AdminUsuarios.css";

export const AdminUsuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<"Todos" | "Admin" | "Usuario">("Todos");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    fechaNacimiento: "",
    tipoUsuario: "Usuario",
  });
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
      const data = await getUsers();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      alert("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    if (filtro === "Todos") return true;
    return u.tipoUsuario === filtro;
  });

  const openModal = () => {
    setFormData({
      nombre: "",
      apellido: "",
      correo: "",
      password: "",
      fechaNacimiento: "",
      tipoUsuario: "Usuario",
    });
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Nombre requerido";
    if (!formData.apellido.trim()) newErrors.apellido = "Apellido requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo))
      newErrors.correo = "Correo inválido";
    if (formData.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (!formData.fechaNacimiento)
      newErrors.fechaNacimiento = "Fecha requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await crearUsuario({
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        password: formData.password,
        fechaNacimiento: formData.fechaNacimiento,
        tipoUsuario: formData.tipoUsuario,
      });
      alert("Usuario creado correctamente");
      closeModal();
      loadData();
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.error || "Error creando usuario");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar usuario?")) return;
    try {
      await eliminarUsuario(id);
      alert("Usuario eliminado");
      loadData();
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.error || "Error eliminando usuario");
    }
  };

  const getEstadoColor = (tipo: string) => {
    return tipo === "Admin" ? "#00d9ff" : "#51cf66";
  };

  const getEstadoTexto = (tipo: string) => {
    return tipo === "Admin" ? "Administrador" : "Usuario";
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando gestión de usuarios...</p>
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
            <i className="fa fa-users"></i> Gestión de Usuarios
          </h1>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-number">{usuarios.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {usuarios.filter((u) => u.tipoUsuario === "Admin").length}
            </span>
            <span className="stat-label">Admins</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {usuarios.filter((u) => u.tipoUsuario === "Usuario").length}
            </span>
            <span className="stat-label">Usuarios</span>
          </div>
          <div>
            <button className="btn-add-user" onClick={openModal}>
              <i className="fa fa-user-plus"></i> Agregar Usuario
            </button>
          </div>
        </div>
      </div>

      <div className="filtros-usuarios">
        <div className="filtro-group">
          <label>Filtrar por tipo:</label>
          <div className="filtro-buttons">
            {(["Todos", "Admin", "Usuario"] as const).map((tipo) => (
              <button
                key={tipo}
                className={`filtro-btn ${filtro === tipo ? "activo" : ""}`}
                onClick={() => setFiltro(tipo)}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="usuarios-container">
        {usuariosFiltrados.length > 0 ? (
          <div className="usuarios-grid">
            {usuariosFiltrados.map((usuario) => (
              <div key={usuario.id} className="usuario-card">
                <div className="usuario-header">
                  <div className="usuario-avatar">
                    <i className="fa fa-user"></i>
                  </div>
                  <div className="usuario-tipo">
                    <span
                      className="tipo-badge"
                      style={{
                        backgroundColor: getEstadoColor(usuario.tipoUsuario),
                        color:
                          usuario.tipoUsuario === "Admin" ? "#000" : "#fff",
                      }}
                    >
                      {getEstadoTexto(usuario.tipoUsuario)}
                    </span>
                  </div>
                </div>

                <div className="usuario-info">
                  <h3>
                    {usuario.nombre} {usuario.apellido}
                  </h3>
                  <p>
                    <i className="fa fa-envelope"></i>
                    <span>{usuario.correo}</span>
                  </p>
                  <p>
                    <i className="fa fa-birthday-cake"></i>
                    <span>
                      {new Date(usuario.fechaNacimiento).toLocaleDateString(
                        "es-CL"
                      )}
                    </span>
                  </p>
                  <p className="usuario-id">
                    ID: <code>{usuario.id}</code>
                  </p>
                </div>

                <div className="usuario-footer">
                  <small>Registrado</small>
                  <div style={{ marginTop: 8 }}>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(usuario.id)}
                      title="Eliminar usuario"
                    >
                      <i className="fa fa-trash"></i> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <i className="fa fa-inbox"></i>
            <p>No hay usuarios registrados con los filtros seleccionados</p>
          </div>
        )}
      </div>
      {/* Modal Nuevo Usuario */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="fa fa-user-plus"></i> Nuevo Usuario
              </h2>
              <button className="btn-close-modal" onClick={closeModal}>
                &times;
              </button>
            </div>

            <form onSubmit={handleCreate} className="product-form" noValidate>
              <div className="form-group">
                <label>
                  Nombre <span className="required">*</span>
                </label>
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && (
                  <span className="error-message">{errors.nombre}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Apellido <span className="required">*</span>
                </label>
                <input
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                />
                {errors.apellido && (
                  <span className="error-message">{errors.apellido}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Correo <span className="required">*</span>
                </label>
                <input
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                />
                {errors.correo && (
                  <span className="error-message">{errors.correo}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Contraseña <span className="required">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Fecha de Nacimiento <span className="required">*</span>
                </label>
                <input
                  name="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                />
                {errors.fechaNacimiento && (
                  <span className="error-message">
                    {errors.fechaNacimiento}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Tipo de Usuario</label>
                <select
                  name="tipoUsuario"
                  value={formData.tipoUsuario}
                  onChange={handleChange}
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Admin">Admin</option>
                </select>
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
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
