import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FaInfoCircle, FaPaperPlane } from "react-icons/fa";
import { FaRobot, FaUser } from "react-icons/fa6";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Message } from "@/types/chatbot.types";
import { useAuthUser } from "@/hooks/useAuthUser";
import { ROUTES } from "@/lib/routes";
import { axiosInstance } from "@/lib/axios";
import { endpoints } from "@/lib/endpoint";

interface ChatInterfaceProps {
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatInterface = ({
  isTyping,
  setIsTyping,
  messages,
  setMessages,
}: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuthUser();

  // Scroll al final de los mensajes cuando se añade uno nuevo
  useEffect(() => {
    if (messagesEndRef.current) {
      const scrollContainer = chatContainerRef.current;
      if (scrollContainer) {
        const timer = setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
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
    setInput("");
    setIsTyping(true);

    let botResponse: string;

    // Buscar palabras clave en el mensaje del usuario
    const lowercaseInput = input.toLowerCase();

    try {
      const response = await axiosInstance.post(
        `${endpoints.base}/api/cancer-chatbot/ask`,
        {
          pregunta: lowercaseInput,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      botResponse = "Lo siento, ha ocurrido un error.";
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

    setIsTyping(false);
  };
  return (
    <Card className="border-orange-200 shadow-md overflow-hidden">
      <CardContent className="p-0">
        {/* Información sobre el chatbot */}
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 border-b border-orange-100 dark:border-orange-800/30">
          <div className="flex items-start">
            <FaInfoCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Este asistente virtual proporciona información general sobre el
              cáncer. No sustituye el consejo médico profesional. Para
              emergencias o consultas específicas, contacta a un profesional de
              la salud.
            </p>
          </div>
          {!isAuthenticated && (
            <div className="mt-3 p-2 bg-orange-100 dark:bg-orange-800/30 rounded-md">
              <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                Para usar el chatbot completo, por favor inicia sesión.
              </p>
            </div>
          )}
        </div>{" "}
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="h-[450px] overflow-y-auto p-4 space-y-4"
        >
          {!isAuthenticated ? (
            <div className="flex h-full flex-col items-center justify-center">
              <FaRobot className="h-16 w-16 text-orange-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chatbot bloqueado
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-400 max-w-md">
                Para interactuar con nuestro asistente virtual y obtener
                información personalizada, por favor inicia sesión con tu
                cuenta.
              </p>
              <Button
                className="mt-6 bg-orange-600 hover:bg-orange-700 transition-colors"
                onClick={() => (window.location.href = ROUTES.LOGIN)}
              >
                Iniciar sesión
              </Button>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full ${
                        message.sender === "user"
                          ? "bg-orange-100 ml-2"
                          : "bg-gray-100 mr-2"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <FaUser className="h-4 w-4 text-orange-600" />
                      ) : (
                        <FaRobot className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.isLoading ? (
                        <LoadingSpinner
                          variant="dots"
                          size="sm"
                          color={
                            message.sender === "user" ? "white" : "primary"
                          }
                          className="mx-auto py-2"
                        />
                      ) : (
                        <>
                          <p>{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${message.sender === "user" ? "text-orange-100" : "text-gray-500"}`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>{" "}
        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 flex gap-2">
          {isAuthenticated ? (
            <>
              <Input
                placeholder="Escribe tu pregunta aquí..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                className="flex-grow focus-visible:ring-orange-500"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-orange-600 hover:bg-orange-700 transition-colors"
                disabled={isTyping || !input.trim()}
              >
                {isTyping ? (
                  <LoadingSpinner size="sm" color="white" variant="dots" />
                ) : (
                  <FaPaperPlane className="h-4 w-4" />
                )}
                <span className="sr-only">Enviar mensaje</span>
              </Button>
            </>
          ) : (
            <div className="w-full text-center py-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Debes iniciar sesión para utilizar el chat
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
