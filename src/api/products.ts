import type { Product } from "../interfaces/Product";
import { api } from "./client";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/productos");
  console.log("PRODUCTOS:", res.data);
  return res.data;
};
