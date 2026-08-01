// src/auth/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from './useAuth';

type Props = { children: ReactNode };

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) return <div className="p-6 text-sm opacity-70">Loading…</div>;

  if (!isAuthenticated) {
    // You can also do: login(); return null;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
