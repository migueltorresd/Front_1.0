import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/lib/routes";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { isTokenValid } from "@/utils/tokenUtils";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Componente para proteger rutas que requieren autenticación
 *
 * Si el usuario no está autenticado o el token está expirado, será redirigido
 * Si está cargando la autenticación, mostrará un spinner
 *
 * @param children - Componente hijo a renderizar si el usuario está autenticado
 * @param redirectTo - Ruta a la que redirigir si no está autenticado (por defecto: login)
 */
export default function ProtectedRoute({
  children,
  redirectTo = ROUTES.LOGIN,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading, logout } = useAuth();
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    // Solo validamos el token si el usuario está autenticado
    if (isAuthenticated) {
      const validateToken = async () => {
        try {
          const valid = await isTokenValid();
          setTokenValid(valid);

          if (!valid) {
            // Si el token no es válido, cerramos sesión
            await logout();
          }
        } catch (error) {
          console.error("Error al validar token en ruta protegida:", error);
          setTokenValid(false);
        } finally {
          setValidatingToken(false);
        }
      };

      validateToken();

      // Configuramos una verificación periódica del token (cada 5 minutos)
      const interval = setInterval(
        async () => {
          const valid = await isTokenValid();
          if (!valid) {
            await logout();
            setTokenValid(false);
          }
        },
        5 * 60 * 1000
      );

      return () => {
        clearInterval(interval);
      };
    } else {
      setValidatingToken(false);
    }
  }, [isAuthenticated, logout]);

  // Mientras se verifica la autenticación o el token, mostrar un spinner
  if (loading || (isAuthenticated && validatingToken)) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Si no está autenticado o el token no es válido, redirigir
  if (!isAuthenticated || !tokenValid) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si está autenticado y el token es válido, mostrar el contenido
  return <>{children}</>;
}
