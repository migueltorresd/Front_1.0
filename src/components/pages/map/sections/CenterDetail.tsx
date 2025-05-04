import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HealthCenter,
  centerTypeColors,
  centerTypeNames,
} from "@/types/health-center.types";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaClock,
  FaExternalLinkAlt,
  FaBuilding,
  FaHeart,
} from "react-icons/fa";

interface CenterDetailProps {
  selectedCenter: HealthCenter | null;
}

const CenterDetail = ({ selectedCenter }: CenterDetailProps) => {
  if (!selectedCenter) {
    return null;
  }

  // Iconos para los tipos de centros
  const centerTypeIcons: Record<string, React.ReactNode> = {
    hospital: <FaBuilding className="h-4 w-4 mr-1" />,
    clinic: <FaBuilding className="h-4 w-4 mr-1" />,
    foundation: <FaHeart className="h-4 w-4 mr-1" />,
    support: <FaHeart className="h-4 w-4 mr-1" />,
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge className={`mb-2 ${centerTypeColors[selectedCenter.type]}`}>
              {centerTypeIcons[selectedCenter.type]}
              {centerTypeNames[selectedCenter.type]}
            </Badge>
            <CardTitle>{selectedCenter.name}</CardTitle>
            <CardDescription>
              {selectedCenter.city}, {selectedCenter.country}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Dirección
            </h3>
            <p className="flex items-start">
              <FaMapMarkerAlt className="h-4 w-4 mr-2 mt-1 text-gray-400" />
              <span>
                {selectedCenter.address}, {selectedCenter.city},{" "}
                {selectedCenter.country}
              </span>
            </p>
          </div>

          {selectedCenter.phone && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Teléfono
              </h3>
              <p className="flex items-center">
                <FaPhone className="h-4 w-4 mr-2 text-gray-400" />
                <span>{selectedCenter.phone}</span>
              </p>
            </div>
          )}

          {selectedCenter.website && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Sitio web
              </h3>
              <p className="flex items-center">
                <FaGlobe className="h-4 w-4 mr-2 text-gray-400" />
                <a
                  href={`https://${selectedCenter.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  {selectedCenter.website}
                </a>
              </p>
            </div>
          )}

          {selectedCenter.schedule && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Horario
              </h3>
              <p className="flex items-start">
                <FaClock className="h-4 w-4 mr-2 mt-1 text-gray-400" />
                <span>{selectedCenter.schedule}</span>
              </p>
            </div>
          )}
        </div>

        {selectedCenter.services && selectedCenter.services.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Servicios
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCenter.services.map((service, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <FaExternalLinkAlt className="h-4 w-4 mr-2" />
          Cómo llegar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CenterDetail;
