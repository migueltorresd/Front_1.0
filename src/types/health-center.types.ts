import { ReactNode } from "react";

// Tipos de centros
export type CenterType = "hospital" | "clinic" | "foundation" | "support";

// Estructura de un centro
export type HealthCenter = {
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

// Iconos para los tipos de centros
export const centerTypeIcons: Record<CenterType, ReactNode> = {
  hospital: null,
  clinic: null,
  foundation: null,
  support: null,
};

// Nombres en español para los tipos de centros
export const centerTypeNames: Record<CenterType, string> = {
  hospital: "Hospital",
  clinic: "Clínica",
  foundation: "Fundación",
  support: "Centro de Apoyo",
};

// Colores para los tipos de centros
export const centerTypeColors: Record<CenterType, string> = {
  hospital: "bg-blue-50 text-blue-700",
  clinic: "bg-green-50 text-green-700",
  foundation: "bg-purple-50 text-purple-700",
  support: "bg-amber-50 text-amber-700",
};
