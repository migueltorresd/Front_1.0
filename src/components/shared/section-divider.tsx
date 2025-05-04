import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  variant?: "wave" | "angle" | "curve" | "simple";
  position?: "top" | "bottom";
  color?: "white" | "orange-50" | "gray-50" | "green-50" | "transparent";
}

export default function SectionDivider({
  className,
  variant = "simple",
  position = "bottom",
  color = "white",
}: SectionDividerProps) {
  const colorClasses = {
    white: "fill-white dark:fill-gray-950",
    "orange-50": "fill-orange-50 dark:fill-gray-900",
    "gray-50": "fill-gray-50 dark:fill-gray-900",
    "green-50": "fill-green-50 dark:fill-gray-900",
    transparent: "fill-transparent",
  };

  const renderDivider = () => {
    switch (variant) {
      case "wave":
        return (
          <svg
            className={cn(
              "w-full h-12 md:h-16",
              position === "top" && "rotate-180",
              colorClasses[color],
              className,
            )}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        );
      case "angle":
        return (
          <svg
            className={cn(
              "w-full h-12 md:h-16",
              position === "top" && "rotate-180",
              colorClasses[color],
              className,
            )}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
          </svg>
        );
      case "curve":
        return (
          <svg
            className={cn(
              "w-full h-12 md:h-16",
              position === "top" && "rotate-180",
              colorClasses[color],
              className,
            )}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V0H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"></path>
          </svg>
        );
      default:
        return (
          <div
            className={cn(
              "w-full h-px bg-gradient-to-r from-transparent via-orange-300 dark:via-orange-800 to-transparent",
              className,
            )}
          ></div>
        );
    }
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden",
        position === "top" ? "-mt-1" : "-mb-1",
      )}
    >
      {renderDivider()}
    </div>
  );
}
