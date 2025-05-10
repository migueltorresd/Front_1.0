import { useState } from "react";
import { Message } from "@/types/chatbot.types";
import {
  Hero,
  ChatInterface,
  SuggestedQuestions,
} from "@/components/pages/chatbot/sections";
import { axiosInstance } from "@/lib/axios";
import { endpoints } from "@/lib/endpoint";

export default function ChatBot() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual especializado en información sobre cáncer. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  // Función para simular una pregunta sugerida
  const simulateQuestion = async (question: string) => {
    // Establecer la pregunta seleccionada
    const userMessage: Message = {
      id: messages.length + 1,
      text: question,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Agregar mensaje de carga del bot
    const loadingMessage: Message = {
      id: messages.length + 2,
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, loadingMessage]);
    setIsTyping(true);

    try {
      // Usar el mismo endpoint que ChatInterface
      const response = await axiosInstance.post(
        endpoints.ChatBot.ask,
        {
          pregunta: question.toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      let botResponse: string;

      if (response.status < 200 || response.status >= 300) {
        botResponse = "Lo siento, no tengo una respuesta para eso.";
      } else {
        const data = response.data;
        if (data.respuesta) {
          botResponse = data.respuesta;
        } else {
          botResponse = "Lo siento, no tengo una respuesta para eso.";
        }
      }

      // Eliminar el mensaje de carga y añadir la respuesta real
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isLoading)
          .concat({
            id: messages.length + 2,
            text: botResponse,
            sender: "bot",
            timestamp: new Date(),
          })
      );
    } catch (error) {
      console.error("Error al enviar mensaje sugerido:", error);

      // Eliminar el mensaje de carga y añadir mensaje de error
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isLoading)
          .concat({
            id: messages.length + 2,
            text: "Lo siento, ha ocurrido un error al procesar tu consulta.",
            sender: "bot",
            timestamp: new Date(),
          })
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      {/* Sección de héroe */}
      <Hero />

      {/* Interfaz de chat */}
      <div className="mt-6">
        <ChatInterface
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          messages={messages}
          setMessages={setMessages}
        />
      </div>

      {/* Preguntas sugeridas */}
      <SuggestedQuestions
        isTyping={isTyping}
        setMessages={setMessages}
        simulateQuestion={simulateQuestion}
      />
    </div>
  );
}
