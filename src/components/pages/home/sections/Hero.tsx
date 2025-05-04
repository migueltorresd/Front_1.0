import { ROUTES } from "@/lib/routes";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto max-w-6xl relative md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 bg-gradient-to-b from-orange-50 to-white">
          {/* Lado izquierdo */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              <span className="text-gray-900 dark:text-white">
                Acompañando{" "}
              </span>
              <span
                className="
          text-transparent
          bg-clip-text
          bg-gradient-to-r
          from-orange-600
          to-orange-500"
              >
                tu camino hacia la salud
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700  max-w-lg">
              Una plataforma integral para personas con cáncer, cuidadores y
              quienes buscan información confiable sobre salud oncológica en
              América Latina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Link
                to={ROUTES.LOGIN}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 rounded-full font-medium transition-all duration-300 group text-lg px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 dark:shadow-orange-800/30 dark:hover:shadow-orange-800/40 border-0"
              >
                <span>Comenzar ahora</span>
                <FaArrowRight size={18} />
              </Link>
            </div>
          </div>
          {/* Lado derecho */}
          <div className="relative flex justify-center items-center">
            <img
              alt="Hero illustration"
              className="relative z-10 rounded-2xl shadow-2xl mx-auto"
              src="https://v0-react-web-app-base.vercel.app/placeholder.svg?height=500&width=600"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
