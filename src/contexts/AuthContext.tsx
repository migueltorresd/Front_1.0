import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { auth } from "@/utils/firebase.config";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  userEmail: string | null;
  googleSignIn: () => Promise<User | null>;
  logout: () => Promise<void>;
  updateUserProfile: (
    displayName?: string | null,
    photoURL?: string | null
  ) => Promise<void>;
  updateUserEmail: (email: string) => Promise<void>;
}

const initialAuthContext: AuthContextType = {
  currentUser: null,
  loading: true,
  isAuthenticated: false,
  userEmail: null,
  googleSignIn: async () => null,
  logout: async () => {},
  updateUserProfile: async () => {},
  updateUserEmail: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitorear cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Iniciar sesión con Google
  const googleSignIn = async (): Promise<User | null> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Error en la autenticación con Google:", error);
      return null;
    }
  };

  // Cerrar sesión
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Actualizar perfil de usuario
  const updateUserProfile = async (
    displayName?: string | null,
    photoURL?: string | null
  ): Promise<void> => {
    try {
      if (!currentUser) throw new Error("No hay usuario autenticado");

      await updateProfile(currentUser, {
        displayName: displayName ?? currentUser.displayName,
        photoURL: photoURL ?? currentUser.photoURL,
      });

      // Forzar actualización del estado
      setCurrentUser({ ...currentUser });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  // Actualizar email de usuario
  const updateUserEmail = async (email: string): Promise<void> => {
    try {
      if (!currentUser) throw new Error("No hay usuario autenticado");
      await updateEmail(currentUser, email);

      // Forzar actualización del estado
      setCurrentUser({ ...currentUser });
    } catch (error) {
      console.error("Error al actualizar el email:", error);
    }
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    isAuthenticated: !!currentUser,
    userEmail: currentUser?.email || null,
    googleSignIn,
    logout,
    updateUserProfile,
    updateUserEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
