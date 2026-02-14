'use client';

import { cn } from '@/lib/utils';

interface ScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ScoreGauge({ score, maxScore = 100, size = 'md', className }: ScoreGaugeProps) {
  const percentage = Math.min((score / maxScore) * 100, 100);
  const radius = size === 'sm' ? 40 : size === 'md' ? 60 : 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (percent: number) => {
    if (percent >= 80) return '#16a34a'; // green
    if (percent >= 50) return '#ea580c'; // orange
    return '#dc2626'; // red
  };

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48',
  };

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={getColor(percentage)}
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{Math.round(score)}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">من {maxScore}</span>
      </div>
    </div>
  );
}
