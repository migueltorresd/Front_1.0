import SectionHeader from "@/components/shared/Section-Header";
import { LiaCheckCircle } from "react-icons/lia";

const ProblemsAndSolutions = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-orange-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          title="El problema y nuestra solución"
          description="En América Latina, muchas personas enfrentan barreras para acceder a información confiable y apoyo durante su proceso oncológico."
          className="mb-12"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/30">
            <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-6">
              El problema
            </h3>
            <ul className="space-y-4">
              {[
                "Información dispersa y poco confiable",
                "Dificultad para encontrar centros especializados",
                "Falta de acompañamiento emocional y práctico",
                "Barreras de acceso a especialistas",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-orange-100 dark:border-orange-900/30">
            <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              Nuestra solución
            </h3>
            <ul className="space-y-4">
              {[
                "Plataforma centralizada con información verificada",
                "Mapa interactivo de centros de salud y fundaciones",
                "Asistente virtual para resolver dudas 24/7",
                "Sistema de agendamiento de citas con especialistas",
                "Gestión digital de exámenes médicos",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mr-3 flex-shrink-0">
                    <LiaCheckCircle size={18} />
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProblemsAndSolutions;
