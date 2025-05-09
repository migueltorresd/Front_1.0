import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/lib/routes";
import LoadingSpinner from "@/components/shared/loading-spinner";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Componente para proteger rutas que requieren autenticación
 *
 * Si el usuario no está autenticado, será redirigido a la ruta especificada en redirectTo
 * Si está cargando la autenticación, mostrará un spinner
 *
 * @param children - Componente hijo a renderizar si el usuario está autenticado
 * @param redirectTo - Ruta a la que redirigir si no está autenticado (por defecto: login)
 */
export default function ProtectedRoute({
  children,
  redirectTo = ROUTES.LOGIN,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  // Mientras se verifica la autenticación, mostrar un spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Si no está autenticado, redirigir
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si está autenticado, mostrar el contenido
  return <>{children}</>;
}
