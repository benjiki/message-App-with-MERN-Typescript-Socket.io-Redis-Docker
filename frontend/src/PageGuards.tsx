import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "./stores/authStore";

// Only accessible if the user is authenticated
export function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}

// Only accessible if the user is NOT authenticated
export function GuestRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
