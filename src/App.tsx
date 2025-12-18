import { Route, Routes } from "react-router-dom";
import { Products } from "./pages/Products";
import { Comunidad } from "./pages/Comunidad";
import { Nosotros } from "./pages/Nosotros";
import { Layout } from "./layout/Layout";
import { ProductDetail } from "./pages/ProductDetail";
import ScrollToTop from "./components/ScrollToTop";
import { Login } from "./pages/Login";
import Register from "./pages/Registrar";
import { Perfil } from "./pages/Perfil";
import CarritoPage from "./pages/Carrito";
import { UsersList } from "./components/UserList";
import Forbidden from "./pages/Forbbiden";
import AdminRoute from "./components/AdminRoute";
import { AdminHome } from "./pages/AdminHome";
import { AdminProductos } from "./pages/AdminProductos";
import { AdminCategorias } from "./pages/AdminCategorias";
import { AdminUsuarios } from "./pages/AdminUsuarios";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/403" element={<Forbidden />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminHome />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <AdminRoute>
                <AdminProductos />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categorias"
            element={
              <AdminRoute>
                <AdminCategorias />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <AdminRoute>
                <AdminUsuarios />
              </AdminRoute>
            }
          />
          <Route path="/" element={<Products />} /> {/* Products como inicio */}
          <Route path="comunidad" element={<Comunidad />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="login" element={<Login />} />
          <Route path="registrar" element={<Register />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="productos/:id" element={<ProductDetail />} />
          <Route path="carrito" element={<CarritoPage />} />
          <Route path="usuarios" element={<UsersList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
