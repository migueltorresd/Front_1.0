import SectionHeader from "@/components/shared/Section-Header";
import TestimonialCard from "@/components/pages/home/componentes/testimonial-card";

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-orange-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          title="Lo que dicen nuestros usuarios"
          description="Historias reales de personas que han encontrado apoyo en nuestra plataforma"
          className="mb-12"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="Esta plataforma ha sido fundamental en mi proceso de tratamiento. El poder agendar citas fácilmente y tener toda la información en un solo lugar me ha dado tranquilidad en momentos difíciles."
            author="María González"
            role="Paciente"
            rating={5}
          />
          <TestimonialCard
            quote="Como cuidador, los recursos y la comunidad me han ayudado a entender mejor cómo apoyar a mi madre durante su tratamiento. El chatbot responde mis dudas a cualquier hora."
            author="Carlos Rodríguez"
            role="Cuidador"
            rating={5}
          />
          <TestimonialCard
            quote="La posibilidad de cargar mis exámenes y compartirlos directamente con mi médico ha simplificado enormemente el seguimiento de mi tratamiento. Una herramienta indispensable."
            author="Laura Martínez"
            role="Paciente"
            rating={4}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
