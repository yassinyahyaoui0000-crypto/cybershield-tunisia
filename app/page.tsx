'use client';

import { useState } from 'react';
import { useScore } from '@/hooks/useScore';
import { scenarios } from '@/data/scenarios';
import ScenarioCard from '@/components/simulator/ScenarioCard';
import SimulatorGame from '@/components/simulator/SimulatorGame';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';

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
    <div className="min-h-screen">
      {/* Hero Section with Cyber Gradient */}
      <section className="cyber-gradient-bg text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl font-bold mb-4 text-primary drop-shadow-lg">🎮 محاكي التهديدات</h1>
            <p className="text-xl text-text-primary mb-8">
              تعلم كيفية التعرف على التهديدات السيبرانية من خلال سيناريوهات واقعية تونسية
            </p>
            <div className="flex justify-center">
              <a
                href="https://cyber-hero-coral.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="primary" className="shadow-lg">
                  🎯 جرّب اللعبة
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Threat Awareness Feature Summary */}
        <Card className="mb-10 bg-surface-grey text-text-primary">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">ميزة التوعية بالتهديدات – ملخص</h2>
            <p className="text-lg">
              تُسلط هذه الميزة الضوء على أكثر مخاطر الأمن السيبراني شيوعًا التي تؤثر على المواطنين، وتقدمها بتنسيق واضح ومنظم لتحسين الوعي العام والسلامة الرقمية..
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="text-xl font-semibold">عمليات الاحتيال الإلكتروني عبر الرسائل النصية</h4>
                <p className="text-base text-text-secondary">
                  رسائل احتيالية تنتحل صفة جهات موثوقة مثل البنوك أو الخدمات الحكومية لسرقة معلومات حساسة مثل كلمات المرور أو البيانات المالية.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">الاحتيال عبر وسائل التواصل الاجتماعي</h4>
                <p className="text-base text-text-secondary">
                  عمليات احتيال تتضمن ملفات تعريف مزيفة للبائعين، وحسابات مخترقة، وقوائم مضللة في الأسواق الإلكترونية تستهدف مستخدمي الإنترنت.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">مؤهلات ضعيفة</h4>
                <p className="text-base text-text-secondary">
                  المخاطر الأمنية الناجمة عن إعادة استخدام كلمات المرور وعدم وجود المصادقة متعددة العوامل (MFA)، مما يجعل اختراق الحسابات أسهل.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* User Stats */}
        <Card className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-2">⭐</div>
              <div className="text-3xl font-bold text-primary">{progress.totalPoints}</div>
              <div className="text-text-secondary">نقاط الحماية</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">🏆</div>
              <div className="text-3xl font-bold text-success">{progress.level}</div>
              <div className="text-text-secondary">المستوى</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">✅</div>
              <div className="text-3xl font-bold text-warning">
                {progress.completedScenarios.length}/{scenarios.length}
              </div>
              <div className="text-text-secondary">السيناريوهات المكتملة</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">🎯</div>
              <div className="text-3xl font-bold text-primary">
                {Math.round((progress.completedScenarios.length / scenarios.length) * 100)}%
              </div>
              <div className="text-text-secondary">نسبة الإنجاز</div>
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
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <h3 className="text-2xl font-bold mb-4 text-primary">💡 نصائح عامة للحماية:</h3>
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
