import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/lib/routes";
import LoadingSpinner from "@/components/shared/loading-spinner";

interface PublicOnlyRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Componente para rutas que solo deberían estar disponibles para usuarios no autenticados
 *
 * Si el usuario está autenticado, será redirigido a la ruta especificada en redirectTo
 * Si está cargando la autenticación, mostrará un spinner
 *
 * @param children - Componente hijo a renderizar si el usuario NO está autenticado
 * @param redirectTo - Ruta a la que redirigir si está autenticado (por defecto: home)
 */
export default function PublicOnlyRoute({
  children,
  redirectTo = ROUTES.HOME,
}: PublicOnlyRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  // Mientras se verifica la autenticación, mostrar un spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Si está autenticado, redirigir
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si no está autenticado, mostrar el contenido
  return <>{children}</>;
}
