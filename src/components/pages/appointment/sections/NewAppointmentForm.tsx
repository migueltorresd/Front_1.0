import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  FuturisticCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/ui-card";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { FormData } from "@/types/appointment.types";

type NewAppointmentFormProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Partial<Record<keyof FormData, string>>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
};

const NewAppointmentForm: React.FC<NewAppointmentFormProps> = ({
  formData,
  setFormData,
  errors,
  isSubmitting,
  onSubmit,
  onReset,
}) => {
  const appointmentTypes = [
    "Quimioterapia",
    "Radioterapia",
    "Consulta de seguimiento",
    "Análisis de sangre",
    "Terapia hormonal",
    "Terapia física",
    "Terapia psicológica",
    "Terapia nutricional",
    "Medicación",
    "Cirugía",
    "Otro tratamiento",
  ];

  const timeSlots = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  return (
    <FuturisticCard gradient hover className="shadow-md">
      <form onSubmit={onSubmit}>
        <CardHeader>
          {" "}
          <CardTitle>Nuevo Recordatorio de Cita</CardTitle>
          <CardDescription>
            Registra tus próximas citas médicas en este dispositivo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Información sobre el formulario */}{" "}
          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 border border-orange-200/50 dark:border-orange-800/30 shadow-sm">
            <div className="flex items-start">
              <FaInfoCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-orange-800 dark:text-orange-300 mb-1">
                  Recordatorios de citas locales
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Registra tus próximas citas o tratamientos médicos. Todos los
                  datos se guardan localmente en tu dispositivo. Por ejemplo:
                  "Tengo quimioterapia el 26 de marzo a las 10:00".
                </p>
              </div>
            </div>
          </div>
          {/* Tipo de cita */}
          <div className="space-y-2">
            <Label htmlFor="specialistType">
              Tipo de cita o tratamiento <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.specialistType}
              onValueChange={(value) =>
                handleSelectChange("specialistType", value)
              }
            >
              <SelectTrigger
                id="specialistType"
                className={`rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-orange-100/50 dark:border-orange-900/30 focus:border-orange-500 focus:ring-orange-500 ${
                  errors.specialistType ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Selecciona el tipo de cita" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100/50 dark:border-orange-900/30 rounded-lg">
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.specialistType && (
              <p className="text-sm text-red-500">{errors.specialistType}</p>
            )}
          </div>
          {/* Fecha y Hora */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-400 dark:to-orange-500">
              Fecha y Hora
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">
                  Fecha <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-orange-100/50 dark:border-orange-900/30 hover:bg-orange-50 dark:hover:bg-orange-900/30 ${
                        !formData.date ? "text-muted-foreground" : ""
                      } ${errors.date ? "border-red-500" : ""}`}
                    >
                      <FaCalendarAlt className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        format(formData.date, "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100/50 dark:border-orange-900/30 rounded-lg">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateChange}
                      locale={es}
                      disabled={(date) => {
                        const today = new Date();
                        return date < today || date.getDay() === 0;
                      }}
                      className="rounded-lg"
                      classNames={{
                        month_caption:
                          "flex items-center justify-between px-4 py-2",
                        caption:
                          "flex items-center justify-center pt-1 relative",
                        caption_label:
                          "text-sm font-medium text-orange-700 dark:text-orange-300",
                        nav: "absolute top-3 right-1 flex gap-2 items-center space-x-1 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 rounded-lg p-1.5 shadow-sm",
                        nav_button:
                          "h-7 w-7 bg-white/70 dark:bg-gray-800/50 hover:bg-orange-200 dark:hover:bg-orange-700/40 rounded-md flex items-center justify-center transition-colors duration-200 border border-orange-100/50 dark:border-orange-800/30 cursor-pointer",
                        disabled: "opacity-50 cursor-not-allowed",
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">
                  Hora <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => handleSelectChange("time", value)}
                  disabled={!formData.date}
                >
                  <SelectTrigger
                    id="time"
                    className={`rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-orange-100/50 dark:border-orange-900/30 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.time ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Selecciona una hora" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-orange-100/50 dark:border-orange-900/30 rounded-lg">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && (
                  <p className="text-sm text-red-500">{errors.time}</p>
                )}
              </div>
            </div>
          </div>
          {/* Lugar (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="location">Lugar (opcional)</Label>
            <Input
              id="location"
              name="location"
              placeholder="Ej: Hospital Nacional, Clínica Especializada, etc."
              onChange={handleInputChange}
              className="rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-orange-100/50 dark:border-orange-900/30 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          {/* Notas adicionales */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas adicionales (opcional)</Label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Ej: Llevar resultados anteriores, ayuno de 8 horas, etc."
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full min-h-[100px] rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-orange-100/50 dark:border-orange-900/30 focus:border-orange-500 focus:ring-orange-500 px-3 py-2 text-sm"
            />
          </div>
          {/* Notificaciones */}{" "}
          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200/50 dark:border-orange-800/30 backdrop-blur-sm">
            <h3 className="font-medium text-orange-800 dark:text-orange-300 mb-2">
              Almacenamiento local
            </h3>
            <p className="text-sm text-orange-700 dark:text-orange-400">
              Los recordatorios se guardan localmente en tu dispositivo. Podrás
              consultarlos en cualquier momento, incluso si cierras el navegador
              o apagas tu dispositivo.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            className="rounded-full border-orange-500 text-orange-600 dark:text-orange-400 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-all duration-300"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Guardando...
              </>
            ) : (
              "Guardar Recordatorio"
            )}
          </Button>
        </CardFooter>
      </form>
    </FuturisticCard>
  );
};

export default NewAppointmentForm;
