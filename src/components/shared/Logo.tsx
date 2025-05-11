import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import { FaRegHeart } from "react-icons/fa";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal";
  className?: string;
}

export default function Logo({
  size = "md",
  variant = "default",
  className,
}: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Link to={ROUTES.HOME} className={cn("flex items-center group", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-orange-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-2">
          <FaRegHeart className={cn("text-white", iconSizes[size])} />
        </div>
      </div>
      {variant !== "minimal" && (
        <div className="ml-2">
          <span
            className={cn(
              "font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-400 dark:to-orange-600",
              sizeClasses[size]
            )}
          >
            A Tu{" "}
          </span>
          <span
            className={cn(
              "font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-300 dark:to-orange-500",
              sizeClasses[size]
            )}
          >
            AlCancer
          </span>
        </div>
      )}
    </Link>
  );
}
