import { Navigate } from "react-router-dom";
import { getUserRole } from "../util/auth";

function AdminRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  const role = getUserRole();

  if (!token) return <Navigate to={"/login"} />;

  if (role !== "Admin") {
    return <Navigate to="/403" />;
  }

  return children;
}
export default AdminRoute;
