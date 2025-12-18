import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  obtenerCarritoUsuario,
  agregarAlCarrito,
  actualizarCantidad,
  eliminarItem,
  vaciarCarrito,
} from "../api/carrito";
import type { CarritoItem } from "../interfaces/Carrito";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imgSrc?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  count: number;
  total: number;
  updateQuantity: (id: string, quantity: number) => void;
  loading: boolean;
  carritoBackendItems: CarritoItem[]; // Items originales del backend
};

const STORAGE_KEY = "levelup_cart_v1";

export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  count: 0,
  total: 0,
  updateQuantity: () => {},
  loading: false,
  carritoBackendItems: [],
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Items del carrito en formato local (para compatibilidad)
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as CartItem[];
    } catch (e) {
      console.error("Error leyendo carrito desde localStorage", e);
      return [];
    }
  });

  // Items del backend (formato completo)
  const [carritoBackendItems, setCarritoBackendItems] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Función para obtener el usuario logueado
  const getUsuarioId = (): number | null => {
    try {
      const datosAlmacenados = JSON.parse(
        localStorage.getItem("usuario") || "null"
      );
      return datosAlmacenados?.usuario?.id || null;
    } catch {
      return null;
    }
  };

  // Función para verificar si hay usuario logueado
  const isLoggedIn = (): boolean => {
    return getUsuarioId() !== null;
  };

  // Cargar carrito al montar el componente
  useEffect(() => {
    const usuarioId = getUsuarioId();
    if (usuarioId) {
      loadCarritoFromBackend(usuarioId);
    }
  }, []);

  // Sincronizar carrito local con backend cuando el usuario inicia sesión
  useEffect(() => {
    const usuarioId = getUsuarioId();
    if (usuarioId && items.length > 0 && carritoBackendItems.length === 0) {
      // Hay items locales pero no del backend, sincronizar
      syncLocalCartToBackend(usuarioId);
    }
  }, []);

  // Guardar en localStorage (para usuarios no logueados)
  useEffect(() => {
    if (!isLoggedIn()) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Error guardando carrito en localStorage", e);
      }
    }
  }, [items]);

  // Cargar carrito desde el backend
  const loadCarritoFromBackend = async (usuarioId: number) => {
    try {
      setLoading(true);
      const carrito = await obtenerCarritoUsuario(usuarioId);
      setCarritoBackendItems(carrito);

      // Convertir a formato local para compatibilidad
      const localItems: CartItem[] = carrito.map((item) => ({
        id: String(item.productoId),
        title: item.nombreProducto,
        price: item.precio,
        quantity: item.cantidad,
        imgSrc: item.imgUrl,
      }));
      setItems(localItems);

      // Limpiar localStorage ya que usamos backend
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error al cargar carrito desde backend:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sincronizar carrito local con backend
  const syncLocalCartToBackend = async (usuarioId: number) => {
    try {
      for (const item of items) {
        await agregarAlCarrito({
          usuarioId,
          productoId: Number(item.id),
          cantidad: item.quantity,
        });
      }
      // Recargar desde backend
      await loadCarritoFromBackend(usuarioId);
    } catch (error) {
      console.error("Error sincronizando carrito:", error);
    }
  };

  // Agregar item
  const addItem = useCallback(
    async (item: Omit<CartItem, "quantity">, quantity = 1) => {
      const usuarioId = getUsuarioId();

      if (usuarioId) {
        // Usuario logueado: usar backend
        try {
          setLoading(true);
          await agregarAlCarrito({
            usuarioId,
            productoId: Number(item.id),
            cantidad: quantity,
          });
          await loadCarritoFromBackend(usuarioId);
        } catch (error) {
          console.error("Error al agregar al carrito:", error);
          alert("Error al agregar producto al carrito");
        } finally {
          setLoading(false);
        }
      } else {
        // Sin usuario: usar localStorage
        setItems((prev) => {
          const idx = prev.findIndex((p) => p.id === item.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = {
              ...next[idx],
              quantity: Math.min(next[idx].quantity + quantity, 99),
            };
            return next;
          }
          return [...prev, { ...item, quantity }];
        });
      }
    },
    []
  );

  // Eliminar item
  const removeItem = useCallback(async (id: string) => {
    const usuarioId = getUsuarioId();

    if (usuarioId) {
      // Usuario logueado: usar backend
      try {
        setLoading(true);
        // Encontrar el carritoId del backend
        const backendItem = carritoBackendItems.find(
          (item) => String(item.productoId) === id
        );
        if (backendItem) {
          await eliminarItem(backendItem.id);
          await loadCarritoFromBackend(usuarioId);
        }
      } catch (error) {
        console.error("Error al eliminar item:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Sin usuario: usar localStorage
      setItems((prev) => prev.filter((p) => p.id !== id));
    }
  }, [carritoBackendItems]);

  // Limpiar carrito
  const clearCart = useCallback(async () => {
    const usuarioId = getUsuarioId();

    if (usuarioId) {
      // Usuario logueado: usar backend
      try {
        setLoading(true);
        await vaciarCarrito(usuarioId);
        setItems([]);
        setCarritoBackendItems([]);
      } catch (error) {
        console.error("Error al vaciar carrito:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Sin usuario: usar localStorage
      setItems([]);
    }
  }, []);

  // Actualizar cantidad
  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      const usuarioId = getUsuarioId();

      if (usuarioId) {
        // Usuario logueado: usar backend
        try {
          setLoading(true);
          // Encontrar el carritoId del backend
          const backendItem = carritoBackendItems.find(
            (item) => String(item.productoId) === id
          );
          if (backendItem) {
            await actualizarCantidad(
              backendItem.id,
              Math.max(1, Math.min(quantity, 99))
            );
            await loadCarritoFromBackend(usuarioId);
          }
        } catch (error) {
          console.error("Error al actualizar cantidad:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Sin usuario: usar localStorage
        setItems((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, quantity: Math.max(1, Math.min(quantity, 99)) }
              : p
          )
        );
      }
    },
    [carritoBackendItems]
  );

  const count = useMemo(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((s, i) => s + i.price * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clearCart,
      count,
      total,
      updateQuantity,
      loading,
      carritoBackendItems,
    }),
    [
      items,
      addItem,
      removeItem,
      clearCart,
      count,
      total,
      updateQuantity,
      loading,
      carritoBackendItems,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;