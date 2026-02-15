'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-light dark:bg-surface-dark-elevated rounded-xl shadow-lg border border-primary/10 p-6 transition-all duration-200',
        hover && 'hover:shadow-xl hover:scale-105 hover:border-primary/30 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
