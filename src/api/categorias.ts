import type { Categoria } from "../interfaces/Categoria";
import { api } from "./client";

export const getCategorias = async (): Promise<Categoria[]> => {
  const res = await api.get<Categoria[]>("/categorias");
  console.log("CATEGORIAS:", res.data);
  return res.data;
};

export const getCategoriaPorId = async (id: number): Promise<Categoria> => {
  const res = await api.get<Categoria>(`/categorias/${id}`);
  return res.data;
};

export const crearCategoria = async (categoria: Omit<Categoria, 'id'>): Promise<Categoria> => {
  const res = await api.post<Categoria>("/categorias", categoria);
  return res.data;
};

export const eliminarCategoria = async (id: number): Promise<void> => {
  await api.delete(`/categorias/${id}`);
};