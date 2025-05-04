import { useState } from "react";
import { Message } from "@/types/chatbot.types";
import {
  Hero,
  ChatInterface,
  SuggestedQuestions,
} from "@/components/pages/chatbot/sections";

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
  const simulateQuestion = (question: string) => {
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

    // Simular respuesta del bot
    setTimeout(() => {
      let botResponse = "";

      // Determinar respuesta según la pregunta
      if (question.includes("síntomas")) {
        botResponse =
          "Los síntomas del cáncer pueden variar ampliamente según el tipo y la etapa. Algunos síntomas comunes incluyen fatiga persistente, pérdida de peso inexplicable, dolor, cambios en la piel o bultos inusuales. Es importante consultar con un médico si experimentas síntomas preocupantes.";
      } else if (question.includes("tratamientos")) {
        botResponse =
          "Existen varios tipos de tratamientos para el cáncer, incluyendo cirugía, quimioterapia, radioterapia, inmunoterapia y terapias dirigidas. El plan de tratamiento depende del tipo de cáncer, su etapa y la salud general del paciente.";
      } else if (question.includes("prevenir")) {
        botResponse =
          "Algunas formas de reducir el riesgo de cáncer incluyen: no fumar, mantener un peso saludable, limitar el consumo de alcohol, protegerse del sol, vacunarse contra ciertos virus (como el VPH), y realizar exámenes de detección regulares.";
      } else if (question.includes("apoyo")) {
        botResponse =
          "Existen muchos recursos de apoyo disponibles para pacientes con cáncer y sus cuidadores, incluyendo grupos de apoyo, asesoramiento psicológico, y organizaciones que ofrecen asistencia práctica y financiera.";
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
          }),
      );

      setIsTyping(false);
    }, 1500);
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
