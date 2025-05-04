import SectionHeader from "@/components/shared/Section-Header";
import { FaHeartbeat, FaHandsHelping, FaBook, FaUsers } from "react-icons/fa";

const Values = () => {
  const values = [
    {
      icon: <FaHeartbeat size={32} className="text-green-600" />,
      title: "Compromiso",
      description:
        "Dedicación total al bienestar de los pacientes con cáncer y sus familias en cada paso del camino.",
    },
    {
      icon: <FaHandsHelping size={32} className="text-green-600" />,
      title: "Solidaridad",
      description:
        "Ayuda mutua y colaboración constante entre todos los miembros de nuestra comunidad.",
    },
    {
      icon: <FaBook size={32} className="text-green-600" />,
      title: "Educación",
      description:
        "Difusión de información precisa y actualizada para empoderar a pacientes y cuidadores.",
    },
    {
      icon: <FaUsers size={32} className="text-green-600" />,
      title: "Comunidad",
      description:
        "Creación de redes de apoyo para que nadie tenga que enfrentar el cáncer en soledad.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-green-50">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Principios que guían nuestra labor"
          description="Nuestros valores"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Nuestra Misión
              </h3>
              <p className="text-gray-600">
                Proporcionar información, recursos y apoyo de calidad a las
                personas afectadas por el cáncer, facilitando el acceso a
                centros de salud especializados y recursos educativos que
                mejoren su calidad de vida y la de sus familias durante todo el
                proceso de la enfermedad.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Nuestra Visión
              </h3>
              <p className="text-gray-600">
                Ser la plataforma de referencia en Latinoamérica para pacientes
                con cáncer y sus familias, creando una red integral de apoyo que
                combine tecnología de vanguardia con calidez humana para
                acompañar en cada etapa del camino hacia el bienestar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
