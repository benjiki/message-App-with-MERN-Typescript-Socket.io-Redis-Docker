// frontend\src\PageGuards.tsx
import { Navigate, Outlet } from "react-router";
// import { useAuthStore } from "./stores/authStore";
import { useAuth } from "./hooks/useAuth";
import Loader from "./components/Loader";

// Only accessible if the user is authenticated
// export function PrivateRoute() {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
// }

// // Only accessible if the user is NOT authenticated
// export function GuestRoute() {
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
// }

export function PrivateRoute() {
  const { data: user, isLoading, isError } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader color="#6F4E37" loading={true} />
      </div>
    );
  }
  if (isError || !user) return <Navigate to={"/auth"} />;

  return <Outlet />;
}

export function GuestRoute() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader color="#6F4E37" loading={true} />
      </div>
    );
  }

  return !user ? <Outlet /> : <Navigate to={"/"} />;
}
