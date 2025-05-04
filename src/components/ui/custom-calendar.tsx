import React from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CustomCalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date | undefined) => void;
  modifiers?: Record<string, any>;
  modifiersStyles?: Record<string, any>;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedDate,
  onDateSelect,
  modifiers,
  modifiersStyles
}) => {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(selectedDate || new Date());

  // Avanzar un mes
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Retroceder un mes
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Ir al día de hoy
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(today); // Selecciona el día actual
  };

  // Formatear nombre del mes y año
  const formattedMonth = format(currentMonth, 'MMMM yyyy', { locale: es });
  // Convertir la primera letra a mayúscula
  const capitalizedMonth = formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-900/30 dark:to-orange-800/20 rounded-xl border border-orange-100/50 dark:border-orange-900/30">
        <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-400 dark:to-orange-500">
          {capitalizedMonth}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={goToToday}
            className="px-2 py-1 text-xs rounded-md bg-orange-100 hover:bg-orange-200 dark:bg-orange-700/30 dark:hover:bg-orange-700/50 text-orange-600 dark:text-orange-400 transition-colors cursor-pointer"
            aria-label="Ir a hoy"
            type="button"
          >
            Hoy
          </button>
          <button
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-orange-200/50 dark:hover:bg-orange-700/30 transition-colors cursor-pointer"
            aria-label="Mes anterior"
            type="button"
          >
            <FaChevronLeft className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-orange-200/50 dark:hover:bg-orange-700/30 transition-colors cursor-pointer"
            aria-label="Mes siguiente"
            type="button"
          >
            <FaChevronRight className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </button>
        </div>
      </div>

      <div className="rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden w-fit">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          locale={es}
          showOutsideDays={true}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="p-3"
        />
      </div>
    </div>
  );
};

export { CustomCalendar };