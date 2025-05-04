// Tipos para el chatbot
export type MessageSender = "user" | "bot";

export interface Message {
  id: number;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  isLoading?: boolean;
}

// Simulación de respuestas del chatbot
export const simulatedResponses: Record<string, string> = {
  hola: "¡Hola! Soy tu asistente virtual especializado en información sobre cáncer. ¿En qué puedo ayudarte hoy?",
  síntomas:
    "Los síntomas del cáncer pueden variar ampliamente según el tipo y la etapa. Algunos síntomas comunes incluyen fatiga persistente, pérdida de peso inexplicable, dolor, cambios en la piel o bultos inusuales. Es importante consultar con un médico si experimentas síntomas preocupantes.",
  tratamiento:
    "Existen varios tipos de tratamientos para el cáncer, incluyendo cirugía, quimioterapia, radioterapia, inmunoterapia y terapias dirigidas. El plan de tratamiento depende del tipo de cáncer, su etapa y la salud general del paciente.",
  prevención:
    "Algunas formas de reducir el riesgo de cáncer incluyen: no fumar, mantener un peso saludable, limitar el consumo de alcohol, protegerse del sol, vacunarse contra ciertos virus (como el VPH), y realizar exámenes de detección regulares.",
  apoyo:
    "Existen muchos recursos de apoyo disponibles para pacientes con cáncer y sus cuidadores, incluyendo grupos de apoyo, asesoramiento psicológico, y organizaciones que ofrecen asistencia práctica y financiera.",
  default:
    "Gracias por tu pregunta. Como asistente virtual, puedo proporcionar información general sobre el cáncer, pero no puedo dar consejos médicos personalizados. Te recomiendo consultar con un profesional de la salud para obtener orientación específica para tu situación.",
};
