import { Appointment } from "@/types/appointment.types";

const APPOINTMENTS_KEY = "medical_appointments_reminders";

/**
 * Guarda los recordatorios de citas en el localStorage
 * @param appointments Lista de recordatorios de citas a guardar
 */
export const saveAppointmentsToLocalStorage = (
  appointments: Appointment[]
): void => {
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error(
      "Error al guardar recordatorios de citas en localStorage:",
      error
    );
  }
};

/**
 * Recupera los recordatorios de citas desde el localStorage
 * @returns Lista de recordatorios de citas o un array vacío si no hay datos
 */
export const getAppointmentsFromLocalStorage = (): Appointment[] => {
  try {
    const storedAppointments = localStorage.getItem(APPOINTMENTS_KEY);
    if (storedAppointments) {
      // Necesitamos procesar las fechas ya que JSON.parse no preserva los objetos Date
      const parsedAppointments = JSON.parse(storedAppointments);
      return parsedAppointments.map((appointment: any) => ({
        ...appointment,
        date: new Date(appointment.date),
      }));
    }
    return [];
  } catch (error) {
    console.error(
      "Error al recuperar recordatorios de citas desde localStorage:",
      error
    );
    return [];
  }
};
