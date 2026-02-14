'use client';

import { Scenario } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface ScenarioCardProps {
  scenario: Scenario;
  onClick: () => void;
  completed: boolean;
}

export default function ScenarioCard({ scenario, onClick, completed }: ScenarioCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sms': return '💬';
      case 'ecommerce': return '🛒';
      case 'whatsapp': return '📱';
      case 'social': return '👥';
      case 'identity': return '🆔';
      default: return '🔒';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'sms': return 'رسالة نصية';
      case 'ecommerce': return 'تجارة إلكترونية';
      case 'whatsapp': return 'واتساب';
      case 'social': return 'وسائل التواصل';
      case 'identity': return 'سرقة الهوية';
      default: return type;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'info';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'سهل';
      case 'medium': return 'متوسط';
      case 'hard': return 'صعب';
      default: return difficulty;
    }
  };

  return (
    <Card hover onClick={onClick} className="h-full relative">
      {completed && (
        <div className="absolute top-4 left-4 text-4xl">✅</div>
      )}
      <div className="text-5xl mb-4">{getTypeIcon(scenario.type)}</div>
      <h3 className="text-xl font-bold mb-2">{scenario.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{scenario.description}</p>
      <div className="flex gap-2">
        <Badge variant="info">{getTypeLabel(scenario.type)}</Badge>
        <Badge variant={getDifficultyColor(scenario.difficulty)}>
          {getDifficultyLabel(scenario.difficulty)}
        </Badge>
      </div>
    </Card>
  );
}
