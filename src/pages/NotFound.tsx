import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import { FaHome, FaHeadset, FaBookMedical } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen py-20 px-6 flex items-center justify-center bg-gradient-to-br from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-2 text-orange-600 dark:text-orange-400">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
            Página no encontrada
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
            Sabemos que tu tiempo es valioso, especialmente cuando buscas
            información sobre salud.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Puedes volver a la página principal o explorar algunos de nuestros
            recursos más utilizados a continuación.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            to={ROUTES.HOME}
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-100 dark:border-orange-900/30 hover:shadow-md transition-all"
          >
            <FaHome className="text-orange-500 text-2xl mb-2" />
            <span className="font-medium text-gray-800 dark:text-white">
              Página principal
            </span>
          </Link>
          <Link
            to={ROUTES.CHATBOT}
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-100 dark:border-orange-900/30 hover:shadow-md transition-all"
          >
            <FaHeadset className="text-orange-500 text-2xl mb-2" />
            <span className="font-medium text-gray-800 dark:text-white">
              Hablar con asistente
            </span>
          </Link>
          <Link
            to={ROUTES.RESOURCES}
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-100 dark:border-orange-900/30 hover:shadow-md transition-all"
          >
            <FaBookMedical className="text-orange-500 text-2xl mb-2" />
            <span className="font-medium text-gray-800 dark:text-white">
              Recursos útiles
            </span>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-orange-50 dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-orange-900/30">
          <p className="text-gray-700 dark:text-gray-300">
            ¿Necesitas ayuda inmediata? Nuestro{" "}
            <Link
              to={ROUTES.CHATBOT}
              className="text-orange-600 dark:text-orange-400 font-medium hover:underline"
            >
              asistente virtual
            </Link>{" "}
            está disponible 24/7 para responder tus preguntas sobre salud
            oncológica.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
