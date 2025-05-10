// Tipos para el chatbot
export type MessageSender = "user" | "bot";

export interface Message {
  id: number;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  isLoading?: boolean;
}

// Respuesta del backend al analizar un documento
export interface ResponseAnalizeDocument {
  success: boolean;
  analysisType: string;
  analysis: string;
}

// Información del documento procesado
// Combina datos del backend y datos del cliente
export interface DocumentInfo {
  // Datos que vienen del backend
  analysis: string;
  analysisType: string;

  // Datos que se agregan en el cliente
  documentId?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  uploadDate: Date;
}
