'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-surface-dark border-primary/30 neon-glow-cyan',
    secondary: 'bg-success hover:bg-success-dark text-surface-dark border-success/30 neon-glow-green',
    success: 'bg-success hover:bg-success-dark text-surface-dark border-success/30 neon-glow-green',
    danger: 'bg-danger hover:bg-danger-dark text-white border-danger/30 neon-glow-pink',
    warning: 'bg-warning hover:bg-warning-dark text-surface-dark border-warning/30 neon-glow-yellow',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
