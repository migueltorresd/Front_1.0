import { ReactNode } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";

interface AuthWithUserProps {
  children: (authData: ReturnType<typeof useAuthUser>) => ReactNode;
  fallback?: ReactNode;
}

/**
 * Componente para acceder fácilmente a los datos de autenticación
 *
 * Este componente proporciona los datos de usuario autenticado como prop
 * a su componente hijo mediante una función render.
 *
 * @example
 * <AuthWithUser>
 *   {({ email, displayName, isAuthenticated }) => (
 *     <div>Usuario: {displayName || email}</div>
 *   )}
 * </AuthWithUser>
 */
export default function AuthWithUser({
  children,
  fallback,
}: AuthWithUserProps) {
  const authData = useAuthUser();

  if (!authData.isAuthenticated && fallback) {
    return <>{fallback}</>;
  }

  return <>{children(authData)}</>;
}
