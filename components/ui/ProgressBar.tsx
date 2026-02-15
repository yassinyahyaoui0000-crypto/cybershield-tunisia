'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ value, max = 100, className, showLabel = false }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('w-full', className)}>
      <div className="w-full bg-surface-dark-elevated dark:bg-surface-dark rounded-full h-3 overflow-hidden border border-primary/20">
        <div
          className="h-full bg-gradient-to-r from-primary via-success to-primary transition-all duration-300 neon-glow-cyan"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-text-secondary text-center">
          {value} / {max}
        </div>
      )}
    </div>
  );
}
