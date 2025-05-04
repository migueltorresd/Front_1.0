import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Corregir los iconos de Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Importando tipos
type CenterType = "hospital" | "clinic" | "foundation" | "support";

type HealthCenter = {
  id: number;
  name: string;
  type: CenterType;
  address: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [latitud, longitud]
  phone?: string;
  website?: string;
  schedule?: string;
  services?: string[];
};

// Configuración de iconos para Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Colores para los tipos de centros
const markerColors: Record<CenterType, string> = {
  hospital: "#3b82f6", // blue
  clinic: "#10b981", // green
  foundation: "#8b5cf6", // purple
  support: "#f59e0b", // amber
};

// Crear iconos personalizados para cada tipo
const createCustomIcon = (type: CenterType, selected: boolean) => {
  const color = markerColors[type];
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        background-color: ${selected ? "#ef4444" : color}; 
        width: 24px; 
        height: 24px; 
        border-radius: 50%; 
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        transform: ${selected ? "scale(1.2)" : "scale(1)"};
      ">
        <span style="color: white; font-size: 12px; font-weight: bold;">
          ${type.charAt(0).toUpperCase()}
        </span>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

interface MapComponentProps {
  centers: HealthCenter[];
  selectedCenter: HealthCenter | null;
  onCenterSelect: (center: HealthCenter) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  centers,
  selectedCenter,
  onCenterSelect,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<number, L.Marker>>({});

  useEffect(() => {
    // Inicializar el mapa si no existe
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    // Limpiar marcadores existentes
    Object.values(markersRef.current).forEach((marker) => {
      marker.remove();
    });
    markersRef.current = {};

    // Añadir nuevos marcadores
    centers.forEach((center) => {
      const isSelected = selectedCenter?.id === center.id;
      const marker = L.marker(center.coordinates, {
        icon: createCustomIcon(center.type, isSelected),
      }).addTo(map);

      // Popup con información básica
      marker.bindPopup(`
        <strong>${center.name}</strong><br>
        ${center.city}, ${center.country}
      `);

      // Evento click
      marker.on("click", () => {
        onCenterSelect(center);
      });

      // Guardar referencia
      markersRef.current[center.id] = marker;
    });

    // Ajustar vista si hay centros
    if (centers.length > 0) {
      if (selectedCenter) {
        map.setView(selectedCenter.coordinates, 12);
      } else {
        const bounds = L.latLngBounds(centers.map((c) => c.coordinates));
        map.fitBounds(bounds, { padding: [30, 30] });
      }
    }

    return () => {
      // No destruimos el mapa en cleanup para evitar problemas con el renderizado dinámico
    };
  }, [centers, selectedCenter, onCenterSelect]);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "500px" }}
      className="bg-gray-100 flex items-center justify-center rounded-lg"
    >
      {/* Si el mapa no se ha cargado correctamente, mostrar mensaje */}
      {!mapRef.current && <p className="text-gray-500">Cargando mapa...</p>}
    </div>
  );
};

export default MapComponent;
