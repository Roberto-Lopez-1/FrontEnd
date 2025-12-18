import { useState } from "react";
import { api } from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import "../assets/login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/usuarios/login", form);
      localStorage.setItem("token", response.data.token);

      const usuario = response.data;
      localStorage.setItem("usuario", JSON.stringify(usuario));

      navigate("/");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="form-box-gamer rounded-4 mx-auto p-4">
            <div className="text-center mb-4">
              <img src="/img/level-up.png" alt="Level-Up Gamer" width={90} />
              <p className="text-muted mb-0">Inicio de sesión</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  placeholder="Correo"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Contraseña"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="d-grid gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  Ingresar
                </button>
                <button type="submit" className="btn btn-outline-secondary">
                  <Link to="/registrar">Crear una cuenta</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
