import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import { useAuthUser } from "@/hooks/useAuthUser";
import { useState } from "react";
import LoadingSpinner from "@/components/shared/loading-spinner";

const LoginForm = () => {
  const { isAuthenticated, googleSignIn } = useAuthUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar redirección en caso de autenticación exitosa
  if (isAuthenticated) {
    navigate(ROUTES.HOME);
    return null;
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const user = await googleSignIn();
      if (user) {
        console.log("Usuario autenticado:", user.email);
        navigate(ROUTES.HOME);
      } else {
        setError("No se pudo completar el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en la autenticación con Google:", error);
      setError("Error en la autenticación con Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-orange-200 shadow-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <FaUserCircle className="h-16 w-16 text-orange-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-orange-800">
          Iniciar Sesión
        </CardTitle>
        <CardDescription>
          Utiliza tu cuenta de Google para acceder
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 flex items-center justify-center gap-2 py-6"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <FcGoogle className="h-5 w-5" />
          )}
          <span className="font-medium">
            {isLoading ? "Iniciando sesión..." : "Continuar con Google"}
          </span>
        </Button>

        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="w-full border-t border-gray-200 my-2"></div>
        <p className="text-center text-sm text-gray-600">
          Accede de forma segura con tu cuenta de Google para sincronizar tus
          preferencias y guardar tu progreso.
        </p>
        <p className="text-center text-xs text-gray-500">
          Al acceder, aceptas nuestros{" "}
          <Link to={ROUTES.TERMS} className="text-orange-600 hover:underline">
            Términos de Servicio
          </Link>{" "}
          y{" "}
          <Link to={ROUTES.PRIVACY} className="text-orange-600 hover:underline">
            Política de Privacidad
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
