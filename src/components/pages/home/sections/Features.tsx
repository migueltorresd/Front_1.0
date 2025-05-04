import FeatureCard from "@/components/pages/home/componentes/feature-card";
import SectionHeader from "@/components/shared/Section-Header";
import { ROUTES } from "@/lib/routes";
import { CiCalendar } from "react-icons/ci";
import { FiBookOpen, FiMessageSquare } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";

const Features = () => {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          title="Nuestras funcionalidades"
          description="Herramientas diseñadas para acompañarte en cada etapa de tu proceso"
          className="mb-12"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Chatbot */}
          <FeatureCard
            icon={FiMessageSquare}
            title="Asistente Virtual"
            description="Resuelve tus dudas sobre salud oncológica con nuestro chatbot disponible 24/7, basado en información verificada por profesionales."
            href={ROUTES.CHATBOT}
            linkText="Conversar ahora"
          />

          {/* Appointments */}
          <FeatureCard
            icon={CiCalendar}
            title="Agenda de Citas"
            description="Programa consultas con especialistas de manera sencilla y recibe recordatorios automáticos para no perder ninguna cita importante."
            href={ROUTES.APPOINTMENTS}
            linkText="Agendar cita"
          />

          {/* Resources */}
          <FeatureCard
            icon={FiBookOpen}
            title="Biblioteca de Recursos"
            description="Accede a artículos, videos y guías verificadas por profesionales para entender mejor tu condición y opciones de tratamiento."
            href={ROUTES.RESOURCES}
            linkText="Explorar recursos"
          />

          {/* Map */}
          <FeatureCard
            icon={LuMapPin}
            title="Mapa de Centros"
            description="Encuentra hospitales, clínicas y fundaciones especializadas en oncología cerca de tu ubicación con información detallada de contacto."
            href={ROUTES.MAP}
            linkText="Ver mapa"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
