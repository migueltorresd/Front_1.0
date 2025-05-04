import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FaCalendarAlt, FaClock, FaBell, FaEnvelope } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { FuturisticCard, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/ui-card";
import { Appointment } from "@/types/appointment.types";
import { CustomCalendar } from "@/components/ui/custom-calendar";

type CalendarSectionProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  appointments: Appointment[];
};

const CalendarSection: React.FC<CalendarSectionProps> = ({
  selectedDate,
  setSelectedDate,
  appointments,
}) => {
  // Obtener las citas para la fecha seleccionada
  const appointmentsForSelectedDate = selectedDate
    ? appointments.filter(
        (appointment) =>
          appointment.date.getDate() === selectedDate.getDate() &&
          appointment.date.getMonth() === selectedDate.getMonth() &&
          appointment.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  // Obtener las próximas citas (ordenadas por fecha)
  const upcomingAppointments = [...appointments]
    .filter((appointment) => appointment.status !== "cancelled" && appointment.status !== "completed")
    .sort((a, b) => {
      const dateA = new Date(`${format(a.date, "yyyy-MM-dd")}T${a.time}`);
      const dateB = new Date(`${format(b.date, "yyyy-MM-dd")}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3); // Mostrar solo las 3 próximas citas

  // Función para obtener las fechas con citas para resaltarlas en el calendario
  const getDaysWithAppointments = () => {
    return appointments.map((appointment) => appointment.date);
  };

  // Función para obtener el color de la insignia según el estado
  const getStatusBadgeColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-700 dark:from-orange-500/30 dark:to-orange-600/30 dark:text-orange-400 border-orange-500/30";
      case "pending":
        return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-700 dark:from-yellow-500/30 dark:to-yellow-600/30 dark:text-yellow-400 border-yellow-500/30";
      case "completed":
        return "bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 text-indigo-700 dark:from-indigo-500/30 dark:to-indigo-600/30 dark:text-indigo-400 border-indigo-500/30";
      case "cancelled":
        return "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-700 dark:from-red-500/30 dark:to-red-600/30 dark:text-red-400 border-red-500/30";
      default:
        return "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-700 dark:from-gray-500/30 dark:to-gray-600/30 dark:text-gray-400 border-gray-500/30";
    }
  };

  // Función para traducir el estado
  const getStatusText = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "completed":
        return "Completada";
      case "cancelled":
        return "Cancelada";
      default:
        return status;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendario */}
      <FuturisticCard gradient hover className="lg:col-span-2 shadow-md">
        <CardHeader>
          <CardTitle>Tu Calendario de Citas</CardTitle>
          <CardDescription>Visualiza y gestiona tus citas médicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <CustomCalendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                modifiers={{
                  appointment: getDaysWithAppointments(),
                }}
                modifiersStyles={{
                  appointment: {
                    fontWeight: "bold",
                    backgroundColor: "rgba(249, 115, 22, 0.2)",
                    color: "rgb(194, 65, 12)",
                  },
                }}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-400 dark:to-orange-500">
                {selectedDate
                  ? `Citas para ${format(selectedDate, "PPP", { locale: es })}`
                  : "Selecciona una fecha"}
              </h3>

              {appointmentsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {appointmentsForSelectedDate.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 rounded-xl border border-orange-100/50 dark:border-orange-900/30 bg-gradient-to-br from-white to-orange-50/80 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{appointment.specialistType}</h4>
                        <Badge className={`${getStatusBadgeColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center">
                          <FaClock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                          <span>{appointment.time}</span>
                        </div>
                        {appointment.location && (
                          <div className="flex items-center">
                            <FaCalendarAlt className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                            <span>{appointment.location}</span>
                          </div>
                        )}
                        {appointment.notes && (
                          <p className="text-gray-600 dark:text-gray-300 mt-2">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gradient-to-br from-white to-orange-50/80 dark:from-gray-900 dark:to-gray-800/80 rounded-xl border border-orange-100/50 dark:border-orange-900/30 backdrop-blur-sm">
                  <p className="text-gray-500 dark:text-gray-400">No tienes citas para esta fecha</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </FuturisticCard>

      {/* Próximas citas */}
      <FuturisticCard gradient hover className="shadow-md">
        <CardHeader>
          <CardTitle>Próximas Citas</CardTitle>
          <CardDescription>Recibirás recordatorios por correo</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 rounded-xl border border-orange-100/50 dark:border-orange-900/30 bg-gradient-to-br from-white to-orange-50/80 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{appointment.specialistType}</h4>
                    <Badge className={`${getStatusBadgeColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center">
                      <FaCalendarAlt className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span>{format(appointment.date, "PPP", { locale: es })}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200/50 dark:border-orange-800/30 backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="relative mr-2 flex-shrink-0 mt-0.5">
                    <div className="absolute inset-0 bg-orange-400 rounded-full blur-sm opacity-20"></div>
                    <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-1">
                      <FaBell className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      Recibirás recordatorios por correo electrónico 24 horas antes de cada cita.
                    </p>
                    <div className="flex items-center mt-2 text-xs text-orange-600 dark:text-orange-400">
                      <FaEnvelope className="h-3 w-3 mr-1" />
                      <span>ejemplo@correo.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-gradient-to-br from-white to-orange-50/80 dark:from-gray-900 dark:to-gray-800/80 rounded-xl border border-orange-100/50 dark:border-orange-900/30 backdrop-blur-sm">
              <p className="text-gray-500 dark:text-gray-400">No tienes citas programadas</p>
            </div>
          )}
        </CardContent>
      </FuturisticCard>
    </div>
  );
};

export default CalendarSection;