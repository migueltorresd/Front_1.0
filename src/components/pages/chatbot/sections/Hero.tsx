import SectionHeader from "@/components/shared/Section-Header";
import Breadcrumb from "@/components/ui/breadcrumb";

const Hero = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4">
      <Breadcrumb />
      <SectionHeader
        title="Asistente Virtual"
        description="Haz preguntas sobre salud oncológica y recibe respuestas inmediatas basadas en información verificada por profesionales."
      />
    </div>
  );
};

export default Hero;
