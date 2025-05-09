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
import { axiosInstance } from "@/lib/axios";

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

  // Función para crear usuario en el backend
  const createUserInBackend = async (user: User) => {
    try {
      // Obtén el token de autenticación para enviarlo en el header
      const token = await user.getIdToken();

      // Aquí haces tu petición al backend
      const response = await axiosInstance.post("/auth/login", {
        token,
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Error al registrar usuario en el backend");
      }

      const data = response.data;
      console.log("Usuario registrado en el backend:", data);
      return data;
    } catch (error) {
      console.error("Error al crear usuario en el backend:", error);
    }
  };

  // Monitorear cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      // Si hay un usuario autenticado, verificamos si es necesario registrarlo en el backend
      if (user) {
        // Aquí puedes implementar alguna lógica para determinar si es la primera vez
        // Una opción es usar localStorage para guardar un flag
        const userRegistered = localStorage.getItem(`token`);

        if (!userRegistered) {
          // Es la primera vez que este usuario se autentica
          await createUserInBackend(user);
          // Guardamos en localStorage que ya se ha registrado
          localStorage.setItem(`token`, await user.getIdToken());
        }
      } else {
        // Si no hay usuario autenticado, eliminamos el token de localStorage
        localStorage.removeItem(`token`);
      }

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
      localStorage.removeItem(`token`);
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
