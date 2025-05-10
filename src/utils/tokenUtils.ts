import { auth } from "@/utils/firebase.config";

/**
 * Verifica si el token actual de Firebase es válido
 * @returns Promise<boolean> - true si el token es válido, false si no lo es
 */
export const isTokenValid = async (): Promise<boolean> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return false;
  }

  try {
    // Intentar obtener un nuevo token - esto forzará a Firebase a verificar si el token es válido
    await currentUser.getIdToken(true);
    return true;
  } catch (error) {
    console.error("Error al validar el token:", error);
    return false;
  }
};

/**
 * Obtiene el token actual o regenera uno nuevo si es necesario
 * @returns Promise<string | null> - El token de autenticación o null si no hay usuario autenticado
 */
export const getValidToken = async (): Promise<string | null> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return null;
  }

  try {
    // Force token refresh if it's expired
    return await currentUser.getIdToken(true);
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return null;
  }
};

/**
 * Establece un timer para verificar la validez del token periódicamente
 * @param onInvalidToken - Función a ejecutar cuando el token es inválido
 * @param intervalMinutes - Intervalo de verificación en minutos (por defecto 5)
 * @returns Función para limpiar el intervalo
 */
export const setupTokenRefreshMonitor = (
  onInvalidToken: () => void,
  intervalMinutes = 5
): (() => void) => {
  const interval = setInterval(
    async () => {
      const isValid = await isTokenValid();
      if (!isValid) {
        onInvalidToken();
      }
    },
    intervalMinutes * 60 * 1000
  );

  return () => clearInterval(interval);
};
