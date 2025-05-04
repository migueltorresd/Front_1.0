import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gradient';
  variant?: 'circle' | 'dots' | 'pulse';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  variant = 'circle',
  className 
}) => {
  // Mapear tamaños a clases CSS
  const sizeClasses = {
    xs: 'h-3 w-3 border-[1.5px]',
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-[3px]',
  };

  // Mapear colores a clases CSS
  const colorClasses = {
    primary: 'border-orange-200 border-t-orange-600 dark:border-orange-800 dark:border-t-orange-400',
    white: 'border-white/30 border-t-white',
    gradient: 'border-transparent before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-orange-500 before:to-yellow-400 before:opacity-75',
  };

  // Renderizar diferentes variantes de spinner
  if (variant === 'dots') {
    return (
      <div className={cn("flex space-x-1", className)} role="status" aria-label="Cargando">
        <div className={cn(
          "animate-bounce rounded-full bg-orange-600",
          {
            'h-1 w-1': size === 'xs',
            'h-2 w-2': size === 'sm',
            'h-3 w-3': size === 'md',
            'h-4 w-4': size === 'lg',
          },
          {
            'bg-orange-600 dark:bg-orange-400': color === 'primary',
            'bg-white': color === 'white',
            'bg-gradient-to-r from-orange-500 to-yellow-400': color === 'gradient',
          }
        )} style={{ animationDelay: '0ms' }}></div>
        <div className={cn(
          "animate-bounce rounded-full bg-orange-600",
          {
            'h-1 w-1': size === 'xs',
            'h-2 w-2': size === 'sm',
            'h-3 w-3': size === 'md',
            'h-4 w-4': size === 'lg',
          },
          {
            'bg-orange-600 dark:bg-orange-400': color === 'primary',
            'bg-white': color === 'white',
            'bg-gradient-to-r from-orange-500 to-yellow-400': color === 'gradient',
          }
        )} style={{ animationDelay: '150ms' }}></div>
        <div className={cn(
          "animate-bounce rounded-full bg-orange-600",
          {
            'h-1 w-1': size === 'xs',
            'h-2 w-2': size === 'sm',
            'h-3 w-3': size === 'md',
            'h-4 w-4': size === 'lg',
          },
          {
            'bg-orange-600 dark:bg-orange-400': color === 'primary',
            'bg-white': color === 'white',
            'bg-gradient-to-r from-orange-500 to-yellow-400': color === 'gradient',
          }
        )} style={{ animationDelay: '300ms' }}></div>
        <span className="sr-only">Cargando...</span>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn("flex items-center", className)} role="status" aria-label="Cargando">
        <div className={cn(
          "animate-pulse rounded-md",
          {
            'h-2 w-8': size === 'xs',
            'h-3 w-12': size === 'sm',
            'h-4 w-16': size === 'md',
            'h-5 w-20': size === 'lg',
          },
          {
            'bg-orange-600 dark:bg-orange-400': color === 'primary',
            'bg-white': color === 'white',
            'bg-gradient-to-r from-orange-500 to-yellow-400': color === 'gradient',
          }
        )}></div>
        <span className="sr-only">Cargando...</span>
      </div>
    );
  }

  // Por defecto, renderizar el spinner circular
  return (
    <div className={cn(
        'relative animate-spin rounded-full border-solid',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Cargando"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

export default LoadingSpinner;