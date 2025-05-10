// Tipos para el chatbot
export type MessageSender = "user" | "bot";

export interface Message {
  id: number;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  isLoading?: boolean;
}
