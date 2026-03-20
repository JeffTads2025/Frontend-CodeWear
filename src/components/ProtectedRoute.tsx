import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
  isAdminOnly?: boolean;
}

export function ProtectedRoute({ children, isAdminOnly = false }: ProtectedRouteProps) {
  // SIMULAÇÃO: No futuro, isso virá do seu Contexto de Autenticação (AuthContext)
  // Troque 'customer' por 'admin' para testar o acesso!
  const user = {
    isAuthenticated: true,
    role: 'customer' // Altere manualmente aqui para 'admin' para testar
  };

  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdminOnly && user.role !== 'admin') {
    // Se não for admin, manda para a Home
    return <Navigate to="/" />;
  }

  return children;
}