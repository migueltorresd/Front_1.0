import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
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
  };

  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-solid',
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