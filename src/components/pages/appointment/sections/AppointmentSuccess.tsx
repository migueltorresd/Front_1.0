import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FuturisticCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/ui-card";
import { FormData } from "@/types/appointment.types";

type AppointmentSuccessProps = {
  formData: FormData;
  onReset: () => void;
  onViewCalendar: () => void;
};

const AppointmentSuccess: React.FC<AppointmentSuccessProps> = ({ formData, onReset, onViewCalendar }) => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <FuturisticCard gradient hover className="shadow-lg shadow-orange-200/20 dark:shadow-orange-900/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-400 dark:to-orange-500">
            ¡Cita Agendada!
          </CardTitle>
          <CardDescription>Tu solicitud ha sido recibida correctamente</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-orange-400 rounded-full blur-md opacity-20"></div>
            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-6">
              <FaCheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <div className="text-center max-w-md">
            <p className="text-lg font-medium mb-2">Gracias, {formData.name}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Hemos recibido tu solicitud para una cita con un {formData.specialistType} el día{" "}
              {formData.date && format(formData.date, "PPP", { locale: es })} a las {formData.time}.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Te enviaremos un correo de confirmación a <span className="font-medium">{formData.email}</span> con los
              detalles de tu cita.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-center gap-4">
          <Button
            onClick={onReset}
            className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            Agendar otra cita
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-all duration-300"
            onClick={onViewCalendar}
          >
            Ver mi calendario
          </Button>
        </CardFooter>
      </FuturisticCard>
    </div>
  );
};

export default AppointmentSuccess;