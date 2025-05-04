import type React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  size?: "default" | "lg" | "sm";
  variant?: "primary" | "secondary" | "outline";
  icon?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function CTAButton({
  href,
  children,
  size = "default",
  variant = "primary",
  icon = true,
  className,
  onClick,
}: CTAButtonProps) {
  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    default: "px-6 py-2.5",
    lg: "text-lg px-8 py-3",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 dark:shadow-orange-800/30 dark:hover:shadow-orange-800/40 border-0",
    secondary:
      "bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-900/30 shadow-md",
    outline:
      "bg-transparent border-2 border-orange-500 dark:border-orange-400 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20",
  };

  const buttonClasses = cn(
    "rounded-full font-medium transition-all duration-300 group inline-flex items-center justify-center",
    sizeClasses[size],
    variantClasses[variant],
    className,
  );

  const buttonContent = (
    <>
      <span>{children}</span>
      {icon && (
        <FaArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={buttonClasses}>
        {buttonContent}
      </button>
    );
  }

  return (
    <Link to={href} className={buttonClasses}>
      {buttonContent}
    </Link>
  );
}
