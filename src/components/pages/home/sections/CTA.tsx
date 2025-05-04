import { ROUTES } from "@/lib/routes";
import CTAButton from "../componentes/cta-button";

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 text-white">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Comienza tu camino hacia el bienestar
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Únete a nuestra comunidad y accede a todas las herramientas que hemos
          creado para apoyarte en este proceso.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton href={ROUTES.LOGIN} size="lg" variant="secondary">
            Iniciar Sesion
          </CTAButton>
          <CTAButton
            href={ROUTES.CHATBOT}
            size="lg"
            variant="outline"
            className="border-white text-white"
          >
            Probar asistente
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default CTA;
