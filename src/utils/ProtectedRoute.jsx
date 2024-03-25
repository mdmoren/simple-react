import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

export const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};