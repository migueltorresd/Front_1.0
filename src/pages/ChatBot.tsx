import { useState } from "react";
import {
  Message,
  DocumentInfo,
  ResponseAnalizeDocument,
} from "@/types/chatbot.types";
import {
  Hero,
  ChatInterface,
  SuggestedQuestions,
  FileUploader,
} from "@/components/pages/chatbot/sections";
import { axiosInstance } from "@/lib/axios";
import { endpoints } from "@/lib/endpoint";

export default function ChatBot() {
  const [isTyping, setIsTyping] = useState(false);
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual especializado en información sobre cáncer. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  // Función para manejar la selección de un documento
  const handleDocumentSelected = (file: File) => {
    setSelectedFile(file);

    // Crear un objeto DocumentInfo preliminar (sin análisis)
    const preliminaryInfo: DocumentInfo = {
      analysis: "", // Este campo se llenará cuando se procese
      analysisType: "",
      documentId: `doc-${Date.now()}`,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      uploadDate: new Date(),
    };

    setDocumentInfo(preliminaryInfo);

    // Notificar al usuario que el documento ha sido seleccionado
    setMessages((prev) => [
      ...prev,
      {
        id: messages.length + 1,
        text: `He seleccionado tu documento "${file.name}". Puedes hacer preguntas sobre su contenido y lo analizaré.`,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  // Función para procesar el documento con una pregunta
  const processDocumentWithPrompt = async (prompt: string) => {
    if (!selectedFile) return null;

    try {
      const formData = new FormData();
      formData.append("document", selectedFile);
      formData.append("customPrompt", prompt);

      const response = await axiosInstance.post(
        endpoints.ChatBot.analyze,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const backendData: ResponseAnalizeDocument = response.data;

        // Actualizar el DocumentInfo con los datos del análisis
        if (documentInfo) {
          const updatedDocInfo: DocumentInfo = {
            ...documentInfo,
            analysis: backendData.analysis,
            analysisType: backendData.analysisType,
          };

          setDocumentInfo(updatedDocInfo);
        }

        return backendData;
      }
      return null;
    } catch (error) {
      console.error("Error al procesar el documento con la pregunta:", error);
      return null;
    }
  };

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
      let botResponse: string;

      if (selectedFile && documentInfo) {
        // Procesar el documento con la pregunta
        const processResult = await processDocumentWithPrompt(
          question.toLowerCase()
        );

        if (processResult) {
          botResponse =
            processResult.analysis ||
            "No se pudo analizar el documento con esta pregunta.";
        } else {
          botResponse = "Lo siento, ocurrió un error al analizar el documento.";
        }
      } else {
        // Usar el endpoint normal sin documento
        const response = await axiosInstance.post(
          endpoints.ChatBot.ask,
          { pregunta: question.toLowerCase() },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (
          response.status >= 200 &&
          response.status < 300 &&
          response.data.respuesta
        ) {
          botResponse = response.data.respuesta;
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
      console.error("Error al procesar la consulta:", error);

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

  // Función para limpiar la información del documento
  const clearDocumentInfo = () => {
    setDocumentInfo(null);
    setSelectedFile(null);

    // Notificar al usuario que el documento ha sido eliminado
    setMessages((prev) => [
      ...prev,
      {
        id: messages.length + 1,
        text: "El documento ha sido eliminado. Las respuestas ya no considerarán su contenido.",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      {/* Sección de héroe */}
      <Hero />

      {/* Cargador de documentos */}
      <div className="mt-6">
        <FileUploader onDocumentSelected={handleDocumentSelected} />
      </div>

      {/* Indicador de documento activo */}
      {documentInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-blue-800">
              Documento activo:{" "}
              {documentInfo.fileName || "Documento sin nombre"}
            </p>
            <p className="text-xs text-blue-600">
              Las respuestas del chatbot tendrán en cuenta el contenido de este
              documento
            </p>
          </div>
          <button
            onClick={clearDocumentInfo}
            className="text-xs text-blue-800 hover:underline"
          >
            Eliminar documento
          </button>
        </div>
      )}

      {/* Interfaz de chat */}
      <div className="mt-3">
        <ChatInterface
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          messages={messages}
          setMessages={setMessages}
          documentInfo={documentInfo}
          processDocumentWithPrompt={processDocumentWithPrompt}
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
