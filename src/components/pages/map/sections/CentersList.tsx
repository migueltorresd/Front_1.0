import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HealthCenter,
  centerTypeColors,
  centerTypeNames,
} from "@/types/health-center.types";
import { FaMapMarkerAlt, FaPhone, FaBuilding, FaHeart } from "react-icons/fa";

interface CentersListProps {
  filteredCenters: HealthCenter[];
  selectedCenter: HealthCenter | null;
  setSelectedCenter: (center: HealthCenter) => void;
  resetFilters: () => void;
}

const CentersList = ({
  filteredCenters,
  selectedCenter,
  setSelectedCenter,
  resetFilters,
}: CentersListProps) => {
  // Iconos para los tipos de centros
  const centerTypeIcons: Record<string, React.ReactNode> = {
    hospital: <FaBuilding className="h-4 w-4 mr-1" />,
    clinic: <FaBuilding className="h-4 w-4 mr-1" />,
    foundation: <FaHeart className="h-4 w-4 mr-1" />,
    support: <FaHeart className="h-4 w-4 mr-1" />,
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {filteredCenters.length}{" "}
        {filteredCenters.length === 1
          ? "centro encontrado"
          : "centros encontrados"}
      </h2>

      {filteredCenters.length > 0 ? (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {filteredCenters.map((center) => (
            <Card
              key={center.id}
              className={`cursor-pointer transition-all ${
                selectedCenter?.id === center.id
                  ? "ring-2 ring-green-500"
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedCenter(center)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={`${centerTypeColors[center.type]}`}>
                    {centerTypeIcons[center.type]}
                    {centerTypeNames[center.type]}
                  </Badge>
                </div>
                <h3 className="font-semibold text-green-800">{center.name}</h3>
                <div className="text-sm text-gray-600 mt-1 flex items-start">
                  <FaMapMarkerAlt className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                  <span>
                    {center.address}, {center.city}, {center.country}
                  </span>
                </div>
                {center.phone && (
                  <div className="text-sm text-gray-600 mt-1 flex items-center">
                    <FaPhone className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{center.phone}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-2">
            No se encontraron centros con los filtros seleccionados.
          </p>
          <Button variant="outline" onClick={resetFilters}>
            Mostrar todos los centros
          </Button>
        </div>
      )}
    </div>
  );
};

export default CentersList;
