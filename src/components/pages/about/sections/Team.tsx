import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/shared/Section-Header";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { staticImages } from "@/constants/static_images";

const Team = () => {
  const teamMembers = [
    {
      name: "Dra. Ana Rodríguez",
      role: "Directora Médica",
      bio: "Oncóloga con más de 15 años de experiencia en el tratamiento del cáncer.",
      image: "/team-member-1.jpg",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Carlos Méndez",
      role: "Director de Tecnología",
      bio: "Especialista en desarrollo de plataformas digitales para el sector salud.",
      image: "/team-member-2.jpg",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "María González",
      role: "Coordinadora de Recursos",
      bio: "Experta en gestión de contenidos educativos sobre salud.",
      image: "/team-member-3.jpg",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Dr. Javier Torres",
      role: "Asesor Científico",
      bio: "Investigador especializado en avances para el tratamiento del cáncer.",
      image: "/team-member-4.jpg",
      linkedin: "#",
      twitter: "#",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Profesionales comprometidos"
          description="Nuestro equipo"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = staticImages.PLACEHOLDER_USER;
                  }}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-green-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-2">
                  <a
                    href={member.linkedin}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href={member.twitter}
                    className="text-gray-500 hover:text-blue-400 transition-colors"
                    aria-label={`Twitter de ${member.name}`}
                  >
                    <FaTwitter size={20} />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
