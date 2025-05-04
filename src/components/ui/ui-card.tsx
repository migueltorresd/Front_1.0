import * as React from "react";
import { cn } from "@/lib/utils";

// Componentes básicos del card
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Componente de tarjeta futurística
interface FuturisticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  hover?: boolean;
}

const FuturisticCard = React.forwardRef<HTMLDivElement, FuturisticCardProps>(
  ({ className, gradient = false, hover = false, children, ...props }, ref) => {
    const baseClasses = "rounded-xl border bg-white dark:bg-gray-900 overflow-hidden";
    const gradientClasses = gradient
      ? "border-orange-100/50 dark:border-orange-900/30 relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-orange-50 before:to-white dark:before:from-gray-900 dark:before:to-gray-800 before:z-0"
      : "border-gray-200 dark:border-gray-800";
    
    const hoverClasses = hover
      ? "transition-all duration-300 hover:shadow-lg hover:shadow-orange-900/5 dark:hover:shadow-orange-900/10 hover:border-orange-200/60 dark:hover:border-orange-800/60"
      : "";

    return (
      <div
        ref={ref}
        className={cn(baseClasses, gradientClasses, hoverClasses, className)}
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
FuturisticCard.displayName = "FuturisticCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  FuturisticCard
};