import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Mapeo de rutas a nombres más amigables
  const getPathName = (path: string) => {
    switch (path.toLowerCase()) {
      case "resources":
        return "Recursos";
      case "map":
        return "Mapa";
      case "chatbot":
        return "Asistente Virtual";
      case "about":
        return "Sobre Nosotros";
      default:
        return path;
    }
  };

  return (
    <div className="flex items-center text-sm text-gray-500 mb-6">
      <Link
        to="/"
        className="flex items-center hover:text-orange-600 transition-colors"
      >
        <FaHome className="mr-1" />
        <span>Inicio</span>
      </Link>

      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={path} className="flex items-center">
            <FaChevronRight className="mx-2 text-gray-400" />
            {isLast ? (
              <span className="font-medium text-orange-600">
                {getPathName(path)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-orange-600 transition-colors"
              >
                {getPathName(path)}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
