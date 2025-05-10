import { useState } from "react";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { endpoints } from "@/lib/endpoint";
import { FaFileUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { DocumentInfo, ResponseAnalizeDocument } from "@/types/chatbot.types";

interface FileUploaderProps {
  onDocumentProcessed: (documentInfo: DocumentInfo) => void;
}

const FileUploader = ({ onDocumentProcessed }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setUploadStatus(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setUploadStatus({
        success: false,
        message:
          "Formato no válido. Solo se permiten archivos PDF, DOC, DOCX o TXT.",
      });
      return;
    }

    setIsLoading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("document", file);
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
        setUploadStatus({
          success: true,
          message: "Documento procesado correctamente",
        });

        // Combinar los datos del backend con los datos del cliente
        const backendData: ResponseAnalizeDocument = response.data;

        // Crear el objeto DocumentInfo
        const documentInfo: DocumentInfo = {
          // Datos que vienen del backend
          analysis: backendData.analysis,
          analysisType: backendData.analysisType,

          // Datos que se agregan en el cliente
          documentId: `doc-${Date.now()}`, // Generar un ID único
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          uploadDate: new Date(),
        };

        onDocumentProcessed(documentInfo);
      } else {
        setUploadStatus({
          success: false,
          message: "Error al procesar el documento",
        });
      }
    } catch (error) {
      console.error("Error al procesar el documento:", error);
      setUploadStatus({
        success: false,
        message: "Error al procesar el documento",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus(null);
  };

  return (
    <div className="p-4 border border-orange-200 rounded-md mb-4">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
        Subir documento
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Sube un archivo PDF, DOC, DOCX o TXT para obtener respuestas basadas en
        su contenido.
      </p>

      <div className="flex items-center gap-2">
        <input
          type="file"
          id="document-upload"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <label
          htmlFor="document-upload"
          className={`flex-1 p-2 border-2 border-dashed rounded-md text-center cursor-pointer ${
            file
              ? "border-orange-400 bg-orange-50"
              : "border-gray-300 hover:border-orange-300"
          }`}
        >
          <div className="flex flex-col items-center py-2">
            <FaFileUpload className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-sm font-medium">
              {file ? file.name : "Haz clic para seleccionar un archivo"}
            </span>
            {file && (
              <span className="text-xs text-gray-500 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            )}
          </div>
        </label>

        <Button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className="bg-orange-600 hover:bg-orange-700 transition-colors"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" color="white" variant="dots" />
          ) : (
            "Procesar"
          )}
        </Button>
      </div>

      {uploadStatus && (
        <div
          className={`mt-3 p-2 rounded-md flex items-center ${
            uploadStatus.success
              ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {uploadStatus.success ? (
            <FaCheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          ) : (
            <FaTimesCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          )}
          <span className="text-sm">{uploadStatus.message}</span>
          <Button
            variant="link"
            className={uploadStatus.success ? "text-green-700" : "text-red-700"}
            onClick={resetUpload}
          >
            Limpiar
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
