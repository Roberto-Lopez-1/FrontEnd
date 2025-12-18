import type { User } from "../interfaces/User";
import { api } from "./client";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/usuarios");
  return res.data;
};

export const crearUsuario = async (
  usuario: Omit<User, "id">
): Promise<User> => {
  const res = await api.post<User>("/usuarios", usuario);
  return res.data;
};

export const eliminarUsuario = async (id: number): Promise<void> => {
  await api.delete(`/usuarios/${id}`);
};
