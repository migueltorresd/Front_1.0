import { ROUTES } from "@/lib/routes";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthWithUser from "@/components/shared/AuthWithUser";

const WelcomeBanner = () => {
  return (
    <div className="bg-orange-50 p-4 rounded-lg shadow-sm mb-8 max-w-4xl mx-auto">
      <AuthWithUser
        fallback={
          <div className="flex justify-between items-center">
            <p className="text-gray-700">
              ¡Bienvenido! Para personalizar tu experiencia y acceder a todas
              las funciones
            </p>
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white h-8 px-4 rounded-full transition-colors"
            >
              Iniciar sesión
            </Link>
          </div>
        }
      >
        {({ displayName, getUsernameFromEmail }) => (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2">
                <FaUser className="text-orange-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  ¡Bienvenido, {displayName || getUsernameFromEmail()}!
                </p>
                <p className="text-sm text-gray-600">
                  Estamos aquí para acompañarte en tu camino
                </p>
              </div>
            </div>
            <Link
              to={ROUTES.PROFILE}
              className="text-orange-600 hover:text-orange-700 font-medium text-sm"
            >
              Ver mi perfil
            </Link>
          </div>
        )}
      </AuthWithUser>
    </div>
  );
};

export default WelcomeBanner;
