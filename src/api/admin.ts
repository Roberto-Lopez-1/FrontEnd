import type { Product } from "../interfaces/Product";
import { api } from "./client";

export const crearProducto = async (producto: Omit<Product, 'id'>): Promise<Product> => {
  const res = await api.post<Product>("/productos", producto);
  return res.data;
};

export const actualizarProducto = async (id: number, producto: Product): Promise<Product> => {
  const res = await api.put<Product>(`/productos/${id}`, producto);
  return res.data;
};

export const eliminarProducto = async (id: number): Promise<void> => {
  await api.delete(`/productos/${id}`);
};
export const obtenerProductos = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/productos");
  return res.data;
}