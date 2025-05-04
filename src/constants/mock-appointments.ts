import { Appointment } from "@/types/appointment.types";

// Datos simulados de citas
export const mockAppointments: Appointment[] = [
  {
    id: "1",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "10:00",
    specialistType: "Oncólogo",
    specialistName: "Dr. Carlos Rodríguez",
    location: "Hospital Oncológico Nacional",
    status: "confirmed",
  },
  {
    id: "2",
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    time: "15:30",
    specialistType: "Psico-oncólogo",
    specialistName: "Dra. Laura Sánchez",
    location: "Centro de Apoyo Integral",
    status: "pending",
  },
  {
    id: "3",
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    time: "11:00",
    specialistType: "Nutricionista Oncológico",
    specialistName: "Lic. María González",
    location: "Clínica Especializada",
    status: "completed",
    notes: "Seguimiento de plan alimenticio",
  },
];