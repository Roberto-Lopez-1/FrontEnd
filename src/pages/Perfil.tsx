import { Link } from "react-router-dom";
import "../assets/perfil.css";

export const Perfil = () => {
  return (
    <section className="container my-5 gamer-profile-section">
      <h2 className="gamer-title mb-4">
        <i className="fa fa-user-plus"></i> Registro de Usuarios
      </h2>

      <form id="formRegistro" className="neon-border p-4 text-white" noValidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="nombre">
            Nombre completo
          </label>
          <input
            id="nombre"
            className="form-control"
            type="text"
            maxLength={50}
            placeholder="Ej: Juan Pérez"
            required
          />
          <div className="invalid-feedback">Sólo letras y espacios, máximo 50 caracteres.</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="correo">
            Correo @duoc.cl
          </label>
          <input id="correo" className="form-control" type="email" placeholder="usuario@duoc.cl" required />
          <div className="invalid-feedback">Debe ser un correo válido @duoc.cl y no estar registrado.</div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input id="password" className="form-control" type="password" required />
            <div className="form-text">Mín. 8, con mayúscula, minúscula, número y símbolo.</div>
            <div className="invalid-feedback">La contraseña no cumple los requisitos.</div>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="password2">Repetir contraseña</label>
            <input id="password2" className="form-control" type="password" required />
            <div className="invalid-feedback">Las contraseñas no coinciden.</div>
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label" htmlFor="telefono">Teléfono (opcional)</label>
          <input id="telefono" className="form-control" type="tel" placeholder="+56 9 1234 5678" />
          <div className="invalid-feedback">Ingresa un teléfono válido (7-15 dígitos/símbolos).</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="comuna">Comuna</label>
          <select id="comuna" className="form-select" required>
            <option value="">Selecciona tu comuna…</option>
          </select>
          <div className="invalid-feedback">Selecciona una comuna.</div>
        </div>

        <div className="d-grid gap-2 mt-4">
          <button type="submit" className="btn btn-primary">Actualizar cuenta</button>
          <Link to="/login" className="btn btn-outline-secondary">Ir a Login</Link>
        </div>
      </form>
    </section>
  );
};

export default Perfil;
