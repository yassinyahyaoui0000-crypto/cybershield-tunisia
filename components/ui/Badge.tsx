'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variantClasses = {
    primary: 'bg-primary/10 text-primary border border-primary/30 neon-glow-cyan',
    success: 'bg-success/10 text-success border border-success/30 neon-glow-green',
    warning: 'bg-warning/10 text-warning border border-warning/30 neon-glow-yellow',
    danger: 'bg-danger/10 text-danger border border-danger/30 neon-glow-pink',
    info: 'bg-text-secondary/10 text-text-secondary border border-text-secondary/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
