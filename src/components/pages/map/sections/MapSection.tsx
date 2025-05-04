import { Card, CardContent } from "@/components/ui/card";
import { HealthCenter } from "@/types/health-center.types";
import MapComponent from "@/components/pages/map/components/map-component";

interface MapSectionProps {
  filteredCenters: HealthCenter[];
  selectedCenter: HealthCenter | null;
  onCenterSelect: (center: HealthCenter) => void;
}

const MapSection = ({
  filteredCenters,
  selectedCenter,
  onCenterSelect,
}: MapSectionProps) => {
  return (
    <Card>
      <CardContent className="p-0 overflow-hidden rounded-lg">
        <MapComponent
          centers={filteredCenters}
          selectedCenter={selectedCenter}
          onCenterSelect={onCenterSelect}
        />
      </CardContent>
    </Card>
  );
};

export default MapSection;
