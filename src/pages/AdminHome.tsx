import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../assets/AdminHome.css";

export const AdminHome = () => {
  const navigate = useNavigate();

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
  }, [navigate]);

  const menuItems = [
    {
      id: 1,
      title: "Gestión de Productos",
      description: "Crear, editar y eliminar productos",
      icon: "fa-box",
      path: "/admin/productos",
      color: "#00d9ff",
    },
    {
      id: 2,
      title: "Gestión de Categorías",
      description: "Administrar categorías de productos",
      icon: "fa-tags",
      path: "/admin/categorias",
      color: "#ff6b6b",
    },
    {
      id: 3,
      title: "Gestión de Usuarios",
      description: "Ver y administrar usuarios del sistema",
      icon: "fa-users",
      path: "/admin/usuarios",
      color: "#51cf66",
    },
  ];

  return (
    <div className="admin-home-container">
      <div className="admin-home-header">
        <h1>
          <i className="fa fa-shield"></i> Panel de Administración
        </h1>
        <p>Bienvenido al panel de control de LevelUp Gamer</p>
      </div>

      <div className="admin-menu-grid">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="admin-menu-card"
            onClick={() => navigate(item.path)}
            style={{ borderTopColor: item.color }}
          >
            <div className="card-icon" style={{ color: item.color }}>
              <i className={`fa ${item.icon}`}></i>
            </div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className="card-arrow" style={{ color: item.color }}>
              <i className="fa fa-chevron-right"></i>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-stats">
        <div className="stat-item">
          <i className="fa fa-chart-bar"></i>
          <span>Centro de control centralizado</span>
        </div>
        <div className="stat-item">
          <i className="fa fa-lock"></i>
          <span>Acceso solo para administradores</span>
        </div>
        <div className="stat-item">
          <i className="fa fa-cogs"></i>
          <span>Gestión completa del sistema</span>
        </div>
      </div>
    </div>
  );
};
