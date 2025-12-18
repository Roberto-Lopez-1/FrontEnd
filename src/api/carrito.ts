import type { CarritoItem, CarritoRequest } from "../interfaces/Carrito";
import { api } from "./client";

export const obtenerCarritoUsuario = async (usuarioId: number): Promise<CarritoItem[]> => {
  const res = await api.get<CarritoItem[]>(`/carrito/usuario/${usuarioId}`);
  console.log("CARRITO:", res.data);
  return res.data;
};

export const agregarAlCarrito = async (request: CarritoRequest): Promise<CarritoItem> => {
  const res = await api.post<CarritoItem>("/carrito", request);
  return res.data;
};

export const actualizarCantidad = async (carritoId: number, cantidad: number): Promise<void> => {
  await api.put(`/carrito/${carritoId}/cantidad/${cantidad}`);
};

export const eliminarItem = async (carritoId: number): Promise<void> => {
  await api.delete(`/carrito/${carritoId}`);
};

export const vaciarCarrito = async (usuarioId: number): Promise<void> => {
  await api.delete(`/carrito/usuario/${usuarioId}`);
};