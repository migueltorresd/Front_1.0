import { ROUTES } from "@/lib/routes";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/shared/Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    { name: "Inicio", path: ROUTES.HOME },
    { name: "Chatbot", path: ROUTES.CHATBOT },
    { name: "Agendar Cita", path: ROUTES.APPOINTMENTS },
    { name: "Recursos", path: ROUTES.RESOURCES },
    { name: "Mapa", path: ROUTES.MAP },
    { name: "Sobre Nosotros", path: ROUTES.ABOUT },
  ];

  const { pathname } = useLocation();

  return (
    <header className="flex items-center justify-between lg:justify-around sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-orange-100 w-full px-4">
      <Logo />

      {/* Botón de menú móvil */}
      <div className="lg:hidden flex items-center py-2">
        <button
          className="lg:hidden p-2 hover:bg-orange-100 rounded-full transition-colors cursor-pointer"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <IoMdClose size={24} /> : <RxHamburgerMenu size={24} />}
        </button>
      </div>

      {/* Navegación para pantallas medianas y grandes */}
      <div className="hidden lg:block">
        <nav>
          <ul className="flex justify-center gap-4 p-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50/50  rounded-full px-4 ${pathname === link.path ? "bg-orange-50 text-orange-600" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={ROUTES.LOGIN}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 rounded-full border-orange-500 text-orange-600 hover:bg-orange-50 transition-all duration-300 cursor-pointer"
              >
                Iniciar sesión
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-orange-100 lg:hidden">
          <nav className="container mx-auto">
            <ul className="flex flex-col py-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors duration-300 ${
                      pathname === link.path ? "bg-orange-50 dark:bg-orange-900/20" : ""
                    }`}
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="px-4 py-3">
                <Link
                  to={ROUTES.LOGIN}
                  className="inline-flex items-center justify-center w-full gap-2 whitespace-nowrap text-sm font-medium ring-offset-background border bg-background h-10 px-4 py-2 rounded-full border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
