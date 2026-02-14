'use client';

import { cn } from '@/lib/utils';

interface ThreatLevelProps {
  level: 'safe' | 'suspicious' | 'dangerous';
  className?: string;
}

export default function ThreatLevel({ level, className }: ThreatLevelProps) {
  const config = {
    safe: {
      icon: '✅',
      text: 'آمن',
      color: 'text-success bg-green-100 dark:bg-green-900',
    },
    suspicious: {
      icon: '⚠️',
      text: 'مشبوه',
      color: 'text-warning bg-orange-100 dark:bg-orange-900',
    },
    dangerous: {
      icon: '🚫',
      text: 'خطير',
      color: 'text-danger bg-red-100 dark:bg-red-900',
    },
  };

  const { icon, text, color } = config[level];

  return (
    <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold', color, className)}>
      <span className="text-2xl">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
