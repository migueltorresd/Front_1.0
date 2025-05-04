import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const handleGoogleLogin = () => {
    // Aquí iría la lógica de autenticación con Google
    console.log("Iniciando sesión con Google");
  };

  return (
    <Card className="border-orange-200 shadow-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <FaUserCircle className="h-16 w-16 text-orange-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-orange-800">Iniciar Sesión</CardTitle>
        <CardDescription>Utiliza tu cuenta de Google para acceder</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleGoogleLogin} 
          className="w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 flex items-center justify-center gap-2 py-6"
        >
          <FcGoogle className="h-5 w-5 text-blue-600" />
          <span className="font-medium">Continuar con Google</span>
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="w-full border-t border-gray-200 my-2"></div>
        <p className="text-center text-sm text-gray-600">
          Accede de forma segura con tu cuenta de Google para sincronizar tus preferencias y guardar tu progreso.
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