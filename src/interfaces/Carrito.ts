export interface CarritoItem {
  id: number;
  usuarioId: number;
  productoId: number;
  nombreProducto: string;
  imgUrl: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

export interface CarritoRequest {
  usuarioId: number;
  productoId: number;
  cantidad: number;
}