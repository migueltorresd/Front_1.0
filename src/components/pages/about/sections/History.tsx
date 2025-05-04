import SectionHeader from "@/components/shared/Section-Header";

const History = () => {
  const milestones = [
    {
      year: "2015",
      title: "Fundación",
      description:
        "Nacimos como iniciativa de un grupo de profesionales de la salud y personas afectadas por el cáncer.",
    },
    {
      year: "2017",
      title: "Primer centro de orientación",
      description:
        "Abrimos nuestro primer centro físico para brindar orientación personalizada.",
    },
    {
      year: "2019",
      title: "Plataforma digital",
      description:
        "Lanzamos nuestra primera versión de la plataforma digital para llegar a más personas.",
    },
    {
      year: "2023",
      title: "Expansión regional",
      description:
        "Ampliamos nuestros servicios a más países de Latinoamérica.",
    },
    {
      year: "2025",
      title: "Actualidad",
      description:
        "Continuamos creciendo y mejorando nuestros recursos para ayudar a más personas.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Una década dedicada a hacer la diferencia"
          description="Nuestra historia"
        />

        <div className="relative mt-16">
          {/* Línea de tiempo */}
          <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-green-200 transform -translate-x-1/2"></div>

          {/* Hitos */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`md:w-1/2 p-6 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                    <h3 className="text-2xl font-semibold text-green-700 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                <div className="relative flex-shrink-0 my-4 md:my-0">
                  <div className="rounded-full w-16 h-16 flex items-center justify-center bg-green-600 text-white font-bold text-lg z-10 relative">
                    {milestone.year}
                  </div>
                </div>

                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
