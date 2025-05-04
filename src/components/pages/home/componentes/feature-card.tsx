import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  href: string;
  linkText: string;
  className?: string;
  iconClassName?: string;
  variant?: "default" | "highlight";
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  linkText,
  className,
  iconClassName,
  variant = "default",
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-xl",
        variant === "default"
          ? "bg-white dark:bg-gray-800 border border-orange-100 dark:border-orange-900/30 hover:border-orange-200 dark:hover:border-orange-800/50"
          : "bg-gradient-to-br from-orange-50 to-orange-100/70 dark:from-orange-900/40 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800/50 hover:border-orange-300 dark:hover:border-orange-700",
        className,
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
          variant === "default"
            ? "bg-orange-100 dark:bg-orange-900/30"
            : "bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20 dark:shadow-orange-900/30",
          iconClassName,
        )}
      >
        <Icon
          className={cn(
            "h-6 w-6",
            variant === "default"
              ? "text-orange-600 dark:text-orange-400"
              : "text-white",
          )}
        />
      </div>

      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>

      <Link
        to={href}
        className={cn(
          "inline-flex items-center text-sm font-medium",
          variant === "default"
            ? "text-orange-600 dark:text-orange-400"
            : "text-orange-700 dark:text-orange-300",
        )}
      >
        {linkText} →
      </Link>

      {variant === "highlight" && (
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl"></div>
      )}
    </div>
  );
}
