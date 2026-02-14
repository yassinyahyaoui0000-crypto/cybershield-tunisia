'use client';

import { useState } from 'react';
import { Scenario, Choice } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface SimulatorGameProps {
  scenario: Scenario;
  onComplete: (points: number) => void;
}

export default function SimulatorGame({ scenario, onComplete }: SimulatorGameProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentStep = scenario.steps[currentStepIndex];
  const isGameOver = currentStep.choices.length === 0;

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    setFeedback(choice.feedback);
    setTotalPoints(totalPoints + choice.points);
  };

  const handleNext = () => {
    if (!selectedChoice) return;

    if (selectedChoice.nextStepId) {
      const nextStep = scenario.steps.find(s => s.id === selectedChoice.nextStepId);
      if (nextStep) {
        const nextIndex = scenario.steps.indexOf(nextStep);
        setCurrentStepIndex(nextIndex);
        setSelectedChoice(null);
        setFeedback(null);
        
        // Check if game is over
        if (nextStep.choices.length === 0) {
          onComplete(totalPoints + selectedChoice.points);
        }
      }
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
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{scenario.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{scenario.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant={getDifficultyColor(scenario.difficulty)}>
              {getDifficultyLabel(scenario.difficulty)}
            </Badge>
            <Badge variant="primary">
              {totalPoints} نقطة
            </Badge>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6">
          <p className="text-lg whitespace-pre-line">{currentStep.content}</p>
        </div>

        {!isGameOver && (
          <>
            <div className="space-y-3 mb-6">
              {currentStep.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  disabled={selectedChoice !== null}
                  className={`w-full text-right p-4 rounded-lg border-2 transition-all ${
                    selectedChoice?.id === choice.id
                      ? choice.isCorrect
                        ? 'border-success bg-green-50 dark:bg-green-900/20'
                        : 'border-danger bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                  } ${selectedChoice ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {choice.text}
                </button>
              ))}
            </div>

            {feedback && (
              <div className={`p-4 rounded-lg mb-6 ${
                selectedChoice?.isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
              }`}>
                <p className="text-lg">{feedback}</p>
              </div>
            )}

            {selectedChoice && selectedChoice.nextStepId && (
              <Button onClick={handleNext} fullWidth variant="primary" size="lg">
                التالي ←
              </Button>
            )}
          </>
        )}

        {isGameOver && (
          <div className="text-center">
            <div className="text-6xl mb-4">
              {totalPoints >= 200 ? '🏆' : totalPoints >= 100 ? '⭐' : '💪'}
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {totalPoints >= 200 ? 'ممتاز!' : totalPoints >= 100 ? 'جيد!' : 'حاول مرة أخرى'}
            </h3>
            <p className="text-xl mb-6">مجموع نقاطك: {totalPoints}</p>
            <Button onClick={() => window.location.href = '/simulator'} variant="primary" size="lg">
              العودة للسيناريوهات
            </Button>
          </div>
        )}
      </Card>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2">
        {scenario.steps.filter(s => s.choices.length > 0).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-12 rounded-full ${
              index <= currentStepIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
