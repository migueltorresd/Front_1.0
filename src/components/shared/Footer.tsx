import {
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import Logo from "@/components/shared/Logo";
import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/routes";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-orange-100 dark:border-orange-900/30">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Brindando apoyo e información confiable para personas con cáncer y
              sus cuidadores en América Latina.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                to="#"
                className="text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <FaFacebookF className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <FaYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Enlaces rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to={ROUTES.HOME}
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.CHATBOT}
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Chatbot
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.APPOINTMENTS}
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Agendar Cita
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.RESOURCES}
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.MAP}
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Mapa
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to={ROUTES.TERMS}
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.PRIVACY}
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.ACCESSIBILITY}
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Accesibilidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MdEmail className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  contacto@cancercare.org
                </span>
              </li>
              <li className="flex items-start">
                <MdPhone className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  +123 456 7890
                </span>
              </li>
              <li className="flex items-start">
                <MdLocationOn className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  Av. Ejemplo 123, Ciudad
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-orange-100 dark:border-orange-900/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} CancerCare. Todos los derechos
            reservados.
          </p>
          <div className="text-gray-600 dark:text-gray-400 text-sm mt-2 md:mt-0 flex items-center gap-1">
            <span>Desarrollado con</span>
            <FaHeart className="inline-block h-4 w-4 text-red-500" />
            <span>para</span>
            <a
              href="https://www.ai-hackathon.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors font-semibold"
            >
              IA Hackathon
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
