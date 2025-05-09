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
} from "firebase/auth";
import { auth } from "@/utils/firebase.config";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  userEmail: string | null;
  googleSignIn: () => Promise<User | null>;
  logout: () => Promise<void>;
}

const initialAuthContext: AuthContextType = {
  currentUser: null,
  loading: true,
  isAuthenticated: false,
  userEmail: null,
  googleSignIn: async () => null,
  logout: async () => {},
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

  const value: AuthContextType = {
    currentUser,
    loading,
    isAuthenticated: !!currentUser,
    userEmail: currentUser?.email || null,
    googleSignIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
