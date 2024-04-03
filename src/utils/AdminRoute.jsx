import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

export const AdminRoute = () => {
  const { role } = useAuth();
  return role === "ROLE_ADMIN" ? <Outlet /> : <Navigate to="/" />;
};