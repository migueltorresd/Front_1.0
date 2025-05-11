import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumb from "@/components/ui/breadcrumb";
import SectionHeader from "@/components/shared/Section-Header";
import FeedbackToast from "@/components/ui/feedback-toast";
import {
  CalendarSection,
  NewAppointmentForm,
  AppointmentSuccess,
} from "@/components/pages/appointment/sections";
import {
  FormData,
  Appointment as AppointmentType,
  ToastData,
} from "@/types/appointment.types";
import { mockAppointments } from "@/constants/mock-appointments";
import {
  saveAppointmentsToLocalStorage,
  getAppointmentsFromLocalStorage,
} from "@/utils/localStorage";

const Appointment = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // Cargar los recordatorios de citas desde localStorage al iniciar
  useEffect(() => {
    const storedAppointments = getAppointmentsFromLocalStorage();
    // Si no hay citas guardadas localmente, usar los datos de ejemplo
    setAppointments(
      storedAppointments.length > 0 ? storedAppointments : mockAppointments
    );
  }, []);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    specialistType: "",
    date: undefined,
    time: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: "info",
    message: "",
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // Para recordatorios personales, solo necesitamos el tipo de cita, fecha, hora y opcionalmente notas
    if (!formData.specialistType) {
      newErrors.specialistType = "Selecciona un tipo de cita médica";
    }

    if (!formData.date) {
      newErrors.date = "Selecciona una fecha";
    }

    if (!formData.time) {
      newErrors.time = "Selecciona una hora";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Crear un nuevo recordatorio de cita
      const newAppointment: AppointmentType = {
        id: `${appointments.length + 1}`,
        date: formData.date!,
        time: formData.time,
        specialistType: formData.specialistType,
        notes: formData.notes || undefined,
        status: "pending",
      };

      // Simular envío al servidor
      setTimeout(() => {
        // Agregar el nuevo recordatorio al estado
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);

        // Guardar los recordatorios actualizados en localStorage
        saveAppointmentsToLocalStorage(updatedAppointments);

        setIsSubmitting(false);

        // Reiniciar los datos del formulario pero mantener una copia para mostrarla
        const submittedData = { ...formData };
        handleReset();

        // Mostrar toast de éxito
        setToast({
          show: true,
          type: "success",
          message:
            "¡Recordatorio de cita guardado con éxito en tu dispositivo! Podrás consultarlo en cualquier momento.",
          position: "bottom",
        });

        // Establecer los datos para la pantalla de éxito
        setFormData(submittedData);
        setIsSubmitted(true);
      }, 1500);
    } else {
      // Mostrar toast de error
      setToast({
        show: true,
        type: "error",
        message: "Por favor, completa todos los campos requeridos.",
        position: "bottom",
      });
    }
  };

  const handleDeleteAppointment = (id: string) => {
    // Filtrar las citas para eliminar la que tiene el ID especificado
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );

    // Actualizar el estado
    setAppointments(updatedAppointments);

    // Actualizar localStorage
    saveAppointmentsToLocalStorage(updatedAppointments);

    // Mostrar mensaje de confirmación
    setToast({
      show: true,
      type: "info",
      message: "Recordatorio de cita eliminado correctamente",
      position: "bottom",
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialistType: "",
      date: undefined,
      time: "",
      notes: "",
    });
    setIsSubmitted(false);
    setErrors({});
  };

  const handleViewCalendar = () => {
    setActiveTab("calendar");
    setIsSubmitted(false);
    setToast({ ...toast, show: false });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  if (isSubmitted) {
    return (
      <>
        <AppointmentSuccess
          formData={formData}
          onReset={handleReset}
          onViewCalendar={handleViewCalendar}
        />
        {toast.show && (
          <FeedbackToast
            type={toast.type}
            message={toast.message}
            show={toast.show}
            position={toast.position}
            onClose={handleCloseToast}
          />
        )}
      </>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb />{" "}
      <SectionHeader
        title="Mis Recordatorios de Citas"
        description="Guarda recordatorios de tus citas médicas y tratamientos para no olvidarlos. Todos los datos se guardan localmente en tu dispositivo."
      />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-2 max-w-md mx-auto bg-orange-100/50 dark:bg-orange-900/20 p-1 rounded-full">
          <TabsTrigger
            value="calendar"
            className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-sm"
          >
            Mi Calendario
          </TabsTrigger>
          <TabsTrigger
            value="new"
            className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-sm"
          >
            Nuevo Recordatorio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-6">
          {" "}
          <CalendarSection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            appointments={appointments}
            onDeleteAppointment={handleDeleteAppointment}
          />
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <NewAppointmentForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </TabsContent>
      </Tabs>
      {/* Toast de feedback */}
      {toast.show && (
        <FeedbackToast
          type={toast.type}
          message={toast.message}
          show={toast.show}
          position={toast.position}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default Appointment;
