import { useAuthUser } from "@/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function Profile() {
  const {
    isAuthenticated,
    email,
    displayName,
    photoURL,
    getUsernameFromEmail,
    logout,
    updateProfile,
  } = useAuthUser();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(
    displayName || getUsernameFromEmail() || ""
  );
  const [newPhotoURL, setNewPhotoURL] = useState(photoURL || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setError("Error al cerrar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await updateProfile(newDisplayName || null, newPhotoURL || null);
      setIsEditing(false);
      setSuccessMessage("¡Perfil actualizado correctamente!");

      // Eliminar el mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setError("Error al actualizar el perfil. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // No renderizar nada si no está autenticado (será redirigido por ProtectedRoute)
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 border border-orange-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-800">Mi Perfil</h1>
        </div>

        <div className="flex flex-col items-center mb-6">
          {photoURL ? (
            <img
              src={photoURL}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full mb-4 border-2 border-orange-300"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-orange-500 mb-4" />
          )}
        </div>

        {/* Mensajes de error o éxito */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Información de la cuenta
          </h2>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Correo electrónico</p>
            <p className="text-gray-800">{email}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Nombre de usuario</p>
            <p className="text-gray-800">
              {displayName || getUsernameFromEmail()}
            </p>
          </div>
        </div>

        {isEditing ? (
          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleSaveChanges}
              disabled={isLoading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                "Guardar cambios"
              )}
            </Button>
            <Button
              onClick={() => {
                setIsEditing(false);
                setNewDisplayName(displayName || getUsernameFromEmail() || "");
                setNewPhotoURL(photoURL || "");
              }}
              variant="outline"
              disabled={isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        ) : (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full bg-white border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              Cerrar sesión
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
