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
      color: 'text-success bg-success/10 border border-success/30 neon-glow-green',
    },
    suspicious: {
      icon: '⚠️',
      text: 'مشبوه',
      color: 'text-warning bg-warning/10 border border-warning/30 neon-glow-yellow',
    },
    dangerous: {
      icon: '🚫',
      text: 'خطير',
      color: 'text-danger bg-danger/10 border border-danger/30 neon-glow-pink',
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
