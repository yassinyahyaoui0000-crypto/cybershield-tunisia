'use client';

import { useLocalStorage } from './useLocalStorage';
import { UserProgress } from '@/types';

const initialProgress: UserProgress = {
  totalPoints: 0,
  level: 1,
  completedScenarios: [],
  badges: [],
};

export function useScore() {
  const [progress, setProgress] = useLocalStorage<UserProgress>('userProgress', initialProgress);

  const addPoints = (points: number) => {
    setProgress({
      ...progress,
      totalPoints: progress.totalPoints + points,
      level: Math.floor((progress.totalPoints + points) / 100) + 1,
    });
  };

  const completeScenario = (scenarioId: string, points: number) => {
    if (!progress.completedScenarios.includes(scenarioId)) {
      setProgress({
        ...progress,
        totalPoints: progress.totalPoints + points,
        level: Math.floor((progress.totalPoints + points) / 100) + 1,
        completedScenarios: [...progress.completedScenarios, scenarioId],
      });
    }
  };

  const resetProgress = () => {
    setProgress(initialProgress);
  };

  return {
    progress,
    addPoints,
    completeScenario,
    resetProgress,
  };
}
