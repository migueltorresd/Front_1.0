import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FaInfoCircle, FaPaperPlane } from "react-icons/fa";
import { FaRobot, FaUser } from "react-icons/fa6";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Message, simulatedResponses } from "@/types/chatbot.types";

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

  const handleSendMessage = () => {
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

    // Simular respuesta del bot
    setTimeout(() => {
      let botResponse = simulatedResponses.default;

      // Buscar palabras clave en el mensaje del usuario
      const lowercaseInput = input.toLowerCase();
      for (const [keyword, response] of Object.entries(simulatedResponses)) {
        if (lowercaseInput.includes(keyword)) {
          botResponse = response;
          break;
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
          }),
      );

      setIsTyping(false);
    }, 1500);
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
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="h-[450px] overflow-y-auto p-4 space-y-4"
        >
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
                      color={message.sender === "user" ? "white" : "primary"}
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
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 flex gap-2">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
