// Tipo para los datos del formulario
export type FormData = {
  name: string
  email: string
  phone: string
  specialistType: string
  date: Date | undefined
  time: string
  notes: string
}

// Tipo para las citas
export type Appointment = {
  id: string
  date: Date
  time: string
  specialistType: string
  specialistName?: string
  location?: string
  notes?: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
}

// Tipo para el toast de feedback
export type ToastData = {
  show: boolean
  type: "success" | "error" | "info"
  message: string
  position?: "top" | "bottom"
}