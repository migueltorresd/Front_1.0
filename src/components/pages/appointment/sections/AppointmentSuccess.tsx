import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FaCalendarCheck, FaClock, FaNotesMedical } from "react-icons/fa";
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
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 rounded-full mb-4">
          <FaCalendarCheck className="h-12 w-12 text-orange-500 dark:text-orange-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-500 dark:to-orange-400 mb-2">
          ¡Recordatorio guardado!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Tu recordatorio para esta cita ha sido guardado con éxito.
        </p>
      </div>

      <FuturisticCard gradient className="shadow-lg mb-6">
        <CardHeader>
          <CardTitle>Detalles del recordatorio</CardTitle>
          <CardDescription>Resumen de la cita que has registrado</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/30 dark:to-orange-800/20 rounded-xl p-4 border border-orange-200/50 dark:border-orange-800/30 backdrop-blur-sm">
            <div className="flex flex-wrap gap-y-4">
              <div className="w-full md:w-1/2 flex items-start space-x-4 px-2">
                <div className="rounded-full bg-white/70 dark:bg-gray-800/70 p-2 shadow-sm">
                  <FaCalendarCheck className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo de cita/tratamiento</p>
                  <p className="font-medium text-lg text-orange-800 dark:text-orange-300">{formData.specialistType}</p>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 flex items-start space-x-4 px-2">
                <div className="rounded-full bg-white/70 dark:bg-gray-800/70 p-2 shadow-sm">
                  <FaClock className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha y hora</p>
                  <p className="font-medium text-lg text-orange-800 dark:text-orange-300">
                    {formData.date && format(formData.date, "PPP", { locale: es })} - {formData.time}
                  </p>
                </div>
              </div>
              
              {formData.notes && (
                <div className="w-full flex items-start space-x-4 mt-2 px-2">
                  <div className="rounded-full bg-white/70 dark:bg-gray-800/70 p-2 shadow-sm flex-shrink-0">
                    <FaNotesMedical className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notas adicionales</p>
                    <p className="font-medium text-orange-800 dark:text-orange-300">{formData.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200/50 dark:border-orange-800/30">
            <h3 className="font-medium text-orange-800 dark:text-orange-300 mb-2">¿Qué sigue?</h3>
            <p className="text-sm text-orange-700 dark:text-orange-400">
              Te enviaremos recordatorios por correo electrónico un día antes y 2 horas antes de tu cita para que estés preparado y no la olvides.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full sm:w-auto rounded-full border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-all duration-300"
          >
            Crear otro recordatorio
          </Button>
          <Button
            onClick={onViewCalendar}
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            Ver mi calendario
          </Button>
        </CardFooter>
      </FuturisticCard>
    </div>
  );
};

export default AppointmentSuccess;