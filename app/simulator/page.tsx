'use client';

import { useState } from 'react';
import { useScore } from '@/hooks/useScore';
import { scenarios } from '@/data/scenarios';
import ScenarioCard from '@/components/simulator/ScenarioCard';
import SimulatorGame from '@/components/simulator/SimulatorGame';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';

export default function SimulatorPage() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const { progress, completeScenario, addPoints } = useScore();

  const currentScenario = selectedScenario 
    ? scenarios.find(s => s.id === selectedScenario) 
    : null;

  const handleComplete = (scenarioId: string, points: number) => {
    completeScenario(scenarioId, points);
    setSelectedScenario(null);
  };

  if (currentScenario) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setSelectedScenario(null)}
            className="mb-6 text-primary hover:text-primary-dark transition-colors"
          >
            ← العودة للسيناريوهات
          </button>
          <SimulatorGame 
            scenario={currentScenario} 
            onComplete={(points) => handleComplete(currentScenario.id, points)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">🎮 محاكي التهديدات</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            تعلم كيفية التعرف على التهديدات السيبرانية من خلال سيناريوهات واقعية تونسية
          </p>
        </div>

        {/* User Stats */}
        <Card className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-2">⭐</div>
              <div className="text-3xl font-bold text-primary">{progress.totalPoints}</div>
              <div className="text-gray-600 dark:text-gray-400">نقاط الحماية</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">🏆</div>
              <div className="text-3xl font-bold text-primary">{progress.level}</div>
              <div className="text-gray-600 dark:text-gray-400">المستوى</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">✅</div>
              <div className="text-3xl font-bold text-primary">
                {progress.completedScenarios.length}/{scenarios.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">السيناريوهات المكتملة</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">🎯</div>
              <div className="text-3xl font-bold text-primary">
                {Math.round((progress.completedScenarios.length / scenarios.length) * 100)}%
              </div>
              <div className="text-gray-600 dark:text-gray-400">نسبة الإنجاز</div>
            </div>
          </div>
          <div className="mt-6">
            <ProgressBar 
              value={progress.completedScenarios.length} 
              max={scenarios.length}
              showLabel
            />
          </div>
        </Card>

        {/* Difficulty Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">اختر السيناريو:</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="success">🟢 سهل - للمبتدئين</Badge>
            <Badge variant="warning">🟡 متوسط - تحدي معتدل</Badge>
            <Badge variant="danger">🔴 صعب - للخبراء</Badge>
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onClick={() => setSelectedScenario(scenario.id)}
              completed={progress.completedScenarios.includes(scenario.id)}
            />
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <h3 className="text-2xl font-bold mb-4">💡 نصائح عامة للحماية:</h3>
          <ul className="space-y-3 text-lg">
            <li className="flex items-start gap-2">
              <span>🔐</span>
              <span>لا تشارك أبداً رموز التحقق أو كلمات المرور مع أي شخص</span>
            </li>
            <li className="flex items-start gap-2">
              <span>🔍</span>
              <span>تحقق دائماً من عنوان الموقع (URL) قبل إدخال معلومات حساسة</span>
            </li>
            <li className="flex items-start gap-2">
              <span>📞</span>
              <span>عند الشك، اتصل بالجهة المعنية مباشرة عبر رقمها الرسمي</span>
            </li>
            <li className="flex items-start gap-2">
              <span>💰</span>
              <span>احذر من العروض الجيدة جداً - غالباً ما تكون احتيالية</span>
            </li>
            <li className="flex items-start gap-2">
              <span>👥</span>
              <span>شارك معرفتك مع العائلة والأصدقاء لحمايتهم أيضاً</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
