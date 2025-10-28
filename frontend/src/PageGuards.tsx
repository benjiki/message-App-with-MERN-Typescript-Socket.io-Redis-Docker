import { Navigate, Outlet } from "react-router";

import { useAuth } from "./hooks/useAuth";

// Only accessible if the user is authenticated
export function PrivateRoute() {
  const { data: user, isLoading, isError } = useAuth();
  if (isLoading) return <div>Loding...</div>;

  if (isError || !user) return <Navigate to="/auth" />;

  return <Outlet />;
}

// Only accessible if the user is NOT authenticated
export function GuestRoute() {
  const { data: user, isLoading } = useAuth();
  if (isLoading) return <div>Loding...</div>;

  return !user ? <Outlet /> : <Navigate to="/auth" />;
}
