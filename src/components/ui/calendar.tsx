import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 justify-center",
        month: "space-y-4",
        month_caption: "hidden",
        caption: "hidden",
        caption_label: "hidden",
        nav: "hidden",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-zinc-500 dark:text-zinc-400 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex justify-center w-full mt-2",
        cell: "flex items-center justify-center h-9 w-9 p-0",
        day: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-red-100 dark:[&:has([aria-selected])]:bg-red-900 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-red-100/50 dark:[&:has([aria-selected].day-outside)]:bg-red-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        ),
        day_button: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-red-100 dark:[&:has([aria-selected])]:bg-red-900 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-red-100/50 dark:[&:has([aria-selected].day-outside)]:bg-red-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 cursor-pointer",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-500 hover:text-white focus:bg-red-600 focus:text-white",
        day_today: "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-200",
        day_outside:
          "day-outside text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-red-100 dark:aria-selected:bg-red-900 aria-selected:text-red-900 dark:aria-selected:text-red-200",
        day_hidden: "invisible",
        selected: "bg-red-100 dark:bg-red-800 text-red-900 dark:text-red-200",
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };