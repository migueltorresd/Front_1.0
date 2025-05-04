// Tipos de recursos
export type ResourceType = "article" | "video" | "document";

// Categorías de recursos
export type ResourceCategory =
  | "general"
  | "prevention"
  | "diagnosis"
  | "treatment"
  | "emotional"
  | "nutrition"
  | "caregivers";

// Estructura de un recurso
export type Resource = {
  id: number;
  title: string;
  description: string;
  type: ResourceType;
  category: ResourceCategory;
  url: string;
  thumbnail?: string;
  author?: string;
  date?: string;
  duration?: string; // Para videos
  fileSize?: string; // Para documentos
};

// Mapeo de categorías a nombres en español
export const categoryNames: Record<ResourceCategory, string> = {
  general: "General",
  prevention: "Prevención",
  diagnosis: "Diagnóstico",
  treatment: "Tratamiento",
  emotional: "Apoyo Emocional",
  nutrition: "Nutrición",
  caregivers: "Para Cuidadores",
};
