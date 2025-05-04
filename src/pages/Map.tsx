import { useState } from "react";
import { HealthCenter } from "@/types/health-center.types";
import { healthCentersData } from "@/constants/mock-health-centers";
import {
  SearchFilters,
  CentersList,
  MapSection,
  CenterDetail,
} from "@/components/pages/map/sections";

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCenter, setSelectedCenter] = useState<HealthCenter | null>(
    null,
  );

  // Filtrar centros según los criterios de búsqueda
  const filteredCenters = healthCentersData.filter((center) => {
    // Filtrar por tipo
    const typeMatch = selectedType === "all" || center.type === selectedType;

    // Filtrar por país
    const countryMatch =
      selectedCountry === "all" || center.country === selectedCountry;

    // Filtrar por búsqueda
    const searchMatch =
      searchQuery === "" ||
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatch && countryMatch && searchMatch;
  });

  // Obtener lista única de países
  const countries = Array.from(
    new Set(healthCentersData.map((center) => center.country)),
  );

  // Función para restablecer todos los filtros
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedCountry("all");
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Mapa de Centros de Salud y Fundaciones
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Encuentra hospitales, clínicas y fundaciones especializadas en
          oncología cerca de ti
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filtros y listado */}
        <div className="lg:col-span-1 space-y-6">
          {/* Filtros */}
          <SearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            countries={countries}
          />

          {/* Listado de centros */}
          <CentersList
            filteredCenters={filteredCenters}
            selectedCenter={selectedCenter}
            setSelectedCenter={setSelectedCenter}
            resetFilters={resetFilters}
          />
        </div>

        {/* Mapa y detalles */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mapa */}
          <MapSection
            filteredCenters={filteredCenters}
            selectedCenter={selectedCenter}
            onCenterSelect={setSelectedCenter}
          />

          {/* Detalles del centro seleccionado */}
          {selectedCenter && <CenterDetail selectedCenter={selectedCenter} />}
        </div>
      </div>
    </div>
  );
}
