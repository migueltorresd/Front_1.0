import { Resource } from "@/types/resource.types";
import { staticImages } from "@/constants/static_images";

// Datos simulados de recursos
export const resourcesData: Resource[] = [
  {
    id: 1,
    title: "Guía básica sobre el cáncer: Lo que debes saber",
    description:
      "Una introducción completa a los conceptos básicos del cáncer, tipos comunes y factores de riesgo.",
    type: "article",
    category: "general",
    url: "#",
    author: "Dr. Carlos Rodríguez",
    date: "15/03/2023",
  },
  {
    id: 2,
    title: "Nutrición durante el tratamiento oncológico",
    description:
      "Recomendaciones nutricionales para pacientes que están recibiendo tratamiento contra el cáncer.",
    type: "article",
    category: "nutrition",
    url: "#",
    author: "Dra. María González, Nutricionista",
    date: "22/05/2023",
  },
  {
    id: 3,
    title: "Entendiendo la quimioterapia: Qué esperar",
    description:
      "Video explicativo sobre el proceso de quimioterapia, efectos secundarios comunes y consejos para manejarlos.",
    type: "video",
    category: "treatment",
    url: "#",
    thumbnail: staticImages.PLACEHOLDER_IMAGE,
    duration: "18:45",
    author: "Hospital Oncológico Nacional",
  },
  {
    id: 4,
    title: "Guía para cuidadores: Apoyo emocional y práctico",
    description:
      "Documento descargable con consejos para familiares y cuidadores de pacientes con cáncer.",
    type: "document",
    category: "caregivers",
    url: "#",
    fileSize: "2.4 MB",
    author: "Fundación Apoyo Oncológico",
    date: "10/01/2023",
  },
  {
    id: 5,
    title: "Señales de alerta: Cuándo consultar a un médico",
    description:
      "Artículo sobre los síntomas que podrían indicar la presencia de cáncer y requieren atención médica.",
    type: "article",
    category: "diagnosis",
    url: "#",
    author: "Dr. Javier Méndez",
    date: "05/04/2023",
  },
  {
    id: 6,
    title: "Técnicas de relajación para pacientes oncológicos",
    description:
      "Video tutorial con ejercicios de respiración y meditación para reducir el estrés durante el tratamiento.",
    type: "video",
    category: "emotional",
    url: "#",
    thumbnail: staticImages.PLACEHOLDER_IMAGE,
    duration: "24:10",
    author: "Centro de Bienestar Integral",
  },
  {
    id: 7,
    title: "Prevención del cáncer: Hábitos saludables",
    description:
      "Artículo sobre cómo reducir el riesgo de cáncer a través de cambios en el estilo de vida.",
    type: "article",
    category: "prevention",
    url: "#",
    author: "Dra. Laura Sánchez",
    date: "18/06/2023",
  },
  {
    id: 8,
    title: "Guía de ejercicios para pacientes en recuperación",
    description:
      "Documento con rutinas de ejercicios adaptadas para personas en proceso de recuperación.",
    type: "document",
    category: "treatment",
    url: "#",
    fileSize: "3.1 MB",
    author: "Asociación de Fisioterapeutas Oncológicos",
    date: "30/07/2023",
  },
  {
    id: 9,
    title: "Testimonios de supervivientes: Historias de esperanza",
    description:
      "Video recopilatorio con testimonios de personas que han superado el cáncer.",
    type: "video",
    category: "emotional",
    url: "#",
    thumbnail: staticImages.PLACEHOLDER_IMAGE,
    duration: "32:15",
    author: "Red de Supervivientes",
  },
  {
    id: 10,
    title: "Avances recientes en tratamientos oncológicos",
    description:
      "Artículo sobre las últimas innovaciones en tratamientos contra el cáncer.",
    type: "article",
    category: "treatment",
    url: "#",
    author: "Dr. Roberto Alonso",
    date: "12/08/2023",
  },
  {
    id: 11,
    title: "Guía de recursos financieros para pacientes",
    description:
      "Documento con información sobre programas de asistencia financiera y seguros médicos.",
    type: "document",
    category: "general",
    url: "#",
    fileSize: "1.8 MB",
    author: "Fundación Apoyo Integral",
    date: "25/02/2023",
  },
  {
    id: 12,
    title: "Alimentación para prevenir el cáncer",
    description:
      "Video sobre alimentos que pueden ayudar a reducir el riesgo de desarrollar cáncer.",
    type: "video",
    category: "prevention",
    url: "#",
    thumbnail: staticImages.PLACEHOLDER_IMAGE,
    duration: "15:30",
    author: "Instituto de Nutrición y Salud",
  },
];
