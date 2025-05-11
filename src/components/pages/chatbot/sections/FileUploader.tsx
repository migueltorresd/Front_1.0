import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaFileUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface FileUploaderProps {
  onDocumentSelected: (file: File) => void;
}

const FileUploader = ({ onDocumentSelected }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
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

  const handleUpload = () => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setUploadStatus({
        success: false,
        message:
          "Formato no válido. Solo se permiten archivos PDF, DOC, DOCX o TXT.",
      });
      return;
    }

    // Notificar al componente padre que se seleccionó un archivo
    onDocumentSelected(file);

    // Mostrar mensaje de éxito
    setUploadStatus({
      success: true,
      message:
        "Documento seleccionado correctamente. Ya puedes hacer preguntas sobre su contenido.",
    });
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
          disabled={!file}
          className="bg-orange-600 hover:bg-orange-700 transition-colors"
        >
          Seleccionar
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
