import { useEffect, useState } from "react";
import type { User } from "../interfaces/User";
import { getUsers } from "../api/users";

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

  return (
    <>
      <div>Lista de usuarios</div>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <div className="row">
            <div className="column">
              <strong>Nombre:</strong> {user.nombre}
            </div>
            <div className="column">
              <strong>Apellido:</strong> {user.apellido}
            </div>
          </div>

          <div className="row">
            <div className="column">
              <strong>Correo:</strong> {user.correo}
            </div>
            <div className="column">
              <strong>Password:</strong> {user.password}
            </div>
          </div>
          <div className="row">
            <div className="column">
              <strong>Fecha de nacimiento:</strong>{" "}
              {new Date(user.fechaNacimiento).toLocaleDateString()}
            </div>
            <div className="column">
              <strong>Tipo usuario:</strong>
              {user.tipoUsuario}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
