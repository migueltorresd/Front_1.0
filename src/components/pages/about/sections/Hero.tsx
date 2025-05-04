import SectionHeader from "@/components/shared/Section-Header";
import { Button } from "@/components/ui/button";
import { staticImages } from "@/constants/static_images";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title="Misión y visión en la lucha contra el cáncer"
              description="Somos una organización dedicada a mejorar la calidad de vida de los pacientes con cáncer"
              align="left"
            />
            <p className="text-gray-600 mb-6">
              Somos una organización dedicada a mejorar la calidad de vida de
              los pacientes con cáncer y sus familias a través de recursos
              educativos, apoyo emocional y orientación hacia centros
              especializados. Trabajamos con un equipo multidisciplinario de
              profesionales comprometidos con la lucha contra el cáncer.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Únete a nuestra causa <FaArrowRight className="ml-2" />
            </Button>
          </div>
          <div className="relative">
            <div className="bg-orange-50 rounded-lg p-3 absolute -left-4 -top-4 w-full h-full"></div>
            <img
              src={staticImages.ABOUT}
              alt="Equipo de profesionales"
              className="rounded-lg relative z-10 w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
