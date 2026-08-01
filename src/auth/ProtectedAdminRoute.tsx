import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL ?? "").toLowerCase();

export default function ProtectedAdminRoute() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return null; // show nothing while auth is checking

  // not logged in → force login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // wrong user → kick them back home
  const email = (user?.email || "").toLowerCase();
  if (!ADMIN_EMAIL || email !== ADMIN_EMAIL) return <Navigate to="/" replace />;

  // ✅ render nested routes
  return <Outlet />;
}
