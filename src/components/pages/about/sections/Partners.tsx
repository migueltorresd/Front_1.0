import SectionHeader from "@/components/shared/Section-Header";
import { staticImages } from "@/constants/static_images";

const Partners = () => {
  const partners = [
    {
      name: "Hospital Internacional",
      logo: "/partner-logo-1.png",
      url: "#",
    },
    {
      name: "Fundación Salud Global",
      logo: "/partner-logo-2.png",
      url: "#",
    },
    {
      name: "Centro de Investigación Oncológica",
      logo: "/partner-logo-3.png",
      url: "#",
    },
    {
      name: "Asociación Latinoamericana Contra el Cáncer",
      logo: "/partner-logo-4.png",
      url: "#",
    },
    {
      name: "Instituto de Ciencias Médicas",
      logo: "/partner-logo-5.png",
      url: "#",
    },
    {
      name: "Red de Apoyo Internacional",
      logo: "/partner-logo-6.png",
      url: "#",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Trabajamos en colaboración"
          description="Colaboramos con hospitales, fundaciones y organizaciones líderes en el campo de la oncología para ofrecer los mejores recursos y apoyo a nuestra comunidad."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors h-40"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-20 max-w-full grayscale hover:grayscale-0 transition-all"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =staticImages.PLACEHOLDER_IMAGE;
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
