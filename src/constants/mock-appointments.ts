import { Appointment } from "@/types/appointment.types";

// Datos simulados de recordatorios de citas
export const mockAppointments: Appointment[] = [
  {
    id: "1",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "10:00",
    specialistType: "Quimioterapia",
    location: "Hospital Oncológico Nacional",
    status: "confirmed",
    notes: "Llevar resultados de los análisis previos"
  },
  {
    id: "2",
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    time: "15:30",
    specialistType: "Terapia psicológica",
    location: "Centro de Apoyo Integral",
    status: "pending",
    notes: "Sesión de seguimiento"
  },
  {
    id: "3",
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    time: "11:00",
    specialistType: "Terapia nutricional",
    location: "Clínica Especializada",
    status: "completed",
    notes: "Evaluación del plan alimenticio mensual"
  },
  {
    id: "4",
    date: new Date(new Date().setDate(new Date().getDate() + 14)),
    time: "09:30",
    specialistType: "Análisis de sangre",
    location: "Laboratorio Central",
    status: "confirmed",
    notes: "Ayuno de 8 horas"
  },
  {
    id: "5",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    time: "12:00",
    specialistType: "Radioterapia",
    location: "Centro Médico Especializado",
    status: "pending"
  }
];