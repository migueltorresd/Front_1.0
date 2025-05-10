import * as axios from "axios";
import { endpoints } from "@/lib/endpoint";
import { auth } from "@/utils/firebase.config";

export const axiosInstance = axios.default.create({
  baseURL: `${endpoints.base}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para validar el token y actualizar los headers en cada petición
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Forzar la actualización del token si está expirado
        const token = await currentUser.getIdToken(true);

        // Actualizar el token en localStorage
        localStorage.setItem("token", token);

        // Agregar el token en las cabeceras
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error al validar o refrescar el token:", error);

      // Si hay un error con el token, cerramos sesión
      await auth.signOut();
      localStorage.removeItem("token");

      // Redireccionar al login (opcional)
      window.location.href = "/login";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
