import { useAuth } from "@/contexts/AuthContext";

/**
 * Hook personalizado para acceder a la información del usuario autenticado
 *
 * Este hook proporciona una forma sencilla de acceder a la información del usuario
 * actualmente autenticado y a funciones relacionadas con la autenticación.
 *
 * @returns {Object} Objeto con información del usuario y funciones de autenticación
 */
export const useAuthUser = () => {
  const auth = useAuth();

  return {
    // Información del usuario
    user: auth.currentUser,
    email: auth.userEmail,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,

    // Información básica de perfil
    displayName: auth.currentUser?.displayName || null,
    photoURL: auth.currentUser?.photoURL || null,

    // Funciones de autenticación
    googleSignIn: auth.googleSignIn,
    logout: auth.logout,
    updateProfile: auth.updateUserProfile,
    updateEmail: auth.updateUserEmail,

    // Métodos de utilidad
    getUsernameFromEmail: () => {
      if (auth.userEmail) {
        return auth.userEmail.split("@")[0];
      }
      return null;
    },

    // Verifica si el usuario está completamente cargado y autenticado
    isReady: !auth.loading && auth.isAuthenticated,
  };
};
