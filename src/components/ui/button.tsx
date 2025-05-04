import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Exportamos la interfaz para que pueda ser importada desde otros archivos
// y también se considera "usada" al ser exportada explícitamente
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500",
      primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
      link: "bg-transparent text-green-600 hover:underline focus:ring-green-500 p-0",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-9 px-3 text-xs",
      lg: "h-11 px-6 text-base",
      icon: "h-10 w-10 p-2",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };

// También podemos crear una variante de botón para diferentes componentes
export const buttonVariants = ({
  variant = "default",
  size = "default",
  className = "",
}: ButtonProps = {}) => {
  const variantStyles = {
    default: "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500",
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
    link: "bg-transparent text-green-600 hover:underline focus:ring-green-500 p-0",
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 px-3 text-xs",
    lg: "h-11 px-6 text-base",
    icon: "h-10 w-10 p-2",
  };

  return cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
    variant in variantStyles ? variantStyles[variant as keyof typeof variantStyles] : variantStyles.default,
    size in sizeStyles ? sizeStyles[size as keyof typeof sizeStyles] : sizeStyles.default,
    className
  );
};
