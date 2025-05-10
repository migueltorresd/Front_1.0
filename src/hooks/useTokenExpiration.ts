import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { isTokenValid } from "@/utils/tokenUtils";

interface UseTokenExpirationOptions {
  /**
   * Intervalo de verificación en minutos
   * @default 5
   */
  checkInterval?: number;
  /**
   * Función a ejecutar cuando el token es inválido
   * Por defecto, cierra la sesión automáticamente
   */
  onInvalidToken?: () => void;
}

/**
 * Hook para monitorear la expiración del token de autenticación
 * @param options Opciones de configuración del monitor
 * @returns [isTokenExpired, isChecking] - Estado de expiración y estado de verificación
 */
export const useTokenExpiration = (
  options?: UseTokenExpirationOptions
): [boolean, boolean] => {
  const { logout, isAuthenticated } = useAuth();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkInterval = options?.checkInterval || 5;
  const onInvalidToken = options?.onInvalidToken || logout;

  useEffect(() => {
    // No hacemos nada si el usuario no está autenticado
    if (!isAuthenticated) {
      setIsChecking(false);
      return;
    }

    // Verificación inicial
    const checkTokenValidity = async () => {
      setIsChecking(true);
      const valid = await isTokenValid();
      setIsTokenExpired(!valid);
      setIsChecking(false);

      if (!valid) {
        onInvalidToken();
      }
    };

    checkTokenValidity();

    // Configuración de la verificación periódica
    const intervalId = setInterval(
      checkTokenValidity,
      checkInterval * 60 * 1000
    );

    // Limpieza al desmontar el componente
    return () => clearInterval(intervalId);
  }, [isAuthenticated, checkInterval, onInvalidToken]);

  return [isTokenExpired, isChecking];
};
