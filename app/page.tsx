'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ScoreGauge from '@/components/ui/ScoreGauge';
import { useScore } from '@/hooks/useScore';

export default function Home() {
  const { progress } = useScore();
  const vantaRef = useRef<HTMLElement>(null);
  const vantaEffect = useRef<any>(null);
  
  // Password strength state
  const [password, setPassword] = useState('');
  const [showPasswordHelper, setShowPasswordHelper] = useState(false);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      const loadVanta = async () => {
        const THREE = await import('three');
        const VANTA = await import('vanta/dist/vanta.net.min');
        
        vantaEffect.current = (VANTA as any).default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x504b96,
          backgroundColor: 0x151521
        });
      };
      
      loadVanta();
    }
    
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  // Password strength calculation
  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    const checks = {
      length: pwd.length >= 8,
      hasLower: /[a-z]/.test(pwd),
      hasUpper: /[A-Z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
    
    // Length scoring
    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 10;
    if (pwd.length >= 16) score += 10;
    
    // Character type scoring
    if (checks.hasLower) score += 15;
    if (checks.hasUpper) score += 15;
    if (checks.hasNumber) score += 15;
    if (checks.hasSymbol) score += 15;
    
    // Cap at 100
    score = Math.min(score, 100);
    
    // Determine label and color
    let label = 'ضعيفة';
    let color = 'from-red-500 to-red-700';
    if (score >= 70) {
      label = 'قوية';
      color = 'from-green-500 to-green-700';
    } else if (score >= 40) {
      label = 'متوسطة';
      color = 'from-yellow-500 to-yellow-700';
    }
    
    // Generate tips
    const tips = [];
    if (!checks.length) tips.push('استخدم 8 أحرف على الأقل');
    if (!checks.hasLower) tips.push('أضف أحرفاً صغيرة (a-z)');
    if (!checks.hasUpper) tips.push('أضف أحرفاً كبيرة (A-Z)');
    if (!checks.hasNumber) tips.push('أضف أرقاماً (0-9)');
    if (!checks.hasSymbol) tips.push('أضف رموزاً خاصة (!@#$%...)');
    
    return { score, label, color, tips };
  };

  const passwordStrength = calculatePasswordStrength(password);

  const modules = [
    {
      href: '/simulator',
      icon: '🎮',
      title: 'محاكي التهديدات',
      description: 'تعلم كيفية التعرف على التهديدات السيبرانية من خلال سيناريوهات واقعية',
      color: 'from-blue-500 to-blue-700',
    },
    {
      href: '/scanner',
      icon: '🤖',
      title: 'الماسح الذكي',
      description: 'افحص الروابط والرسائل للكشف عن التهديدات المحتملة',
      color: 'from-purple-500 to-purple-700',
    },
    {
      href: '#',
      icon: '🔒',
      title: 'فاحص قوة كلمة المرور',
      description: 'تحقق من قوة كلمة المرور واحصل على نصائح لتحسينها',
      color: 'from-green-500 to-green-700',
      onClick: () => setShowPasswordHelper(true),
    },
  ];

  const stats = [
    { label: 'نقاط الحماية', value: progress.totalPoints, icon: '⭐' },
    { label: 'المستوى', value: progress.level, icon: '🏆' },
    { label: 'السيناريوهات المكتملة', value: progress.completedScenarios.length, icon: '✅' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={vantaRef} className="text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-300">
              🛡️ CyberShield Tunisia
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-gray-400">
              حماية التونسيين من التهديدات السيبرانية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/simulator">
                <Button size="lg" variant="secondary">
                  ابدأ رحلة الحماية 🚀
                </Button>
              </Link>
              <Link href="/scanner">
                <Button size="lg" className="bg-black text-primary hover:bg-gray-100">
                  افحص رابطاً مشبوهاً 🔍
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {progress.totalPoints > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <Card className="bg-blue dark:bg-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex justify-center">
                <ScoreGauge score={progress.totalPoints} maxScore={progress.level * 100} />
              </div>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          ابدأ رحلة الحماية الرقمية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            module.onClick ? (
              <div key={index} onClick={module.onClick}>
                <Card hover className="h-full">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center text-3xl mb-4`}>
                    {module.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{module.description}</p>
                </Card>
              </div>
            ) : (
              <Link key={index} href={module.href}>
                <Card hover className="h-full">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center text-3xl mb-4`}>
                    {module.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{module.description}</p>
                </Card>
              </Link>
            )
          ))}
        </div>
      </section>

      {/* Password Strength Helper */}
      {showPasswordHelper && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">🔒 فاحص قوة كلمة المرور</h2>
              <button
                onClick={() => {
                  setShowPasswordHelper(false);
                  setPassword('');
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-lg font-semibold mb-2">
                  أدخل كلمة المرور
                </label>
                <input
                  id="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="اكتب كلمة المرور هنا..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              {password && (
                <>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">القوة: {passwordStrength.label}</span>
                      <span className="text-lg font-bold text-primary">{passwordStrength.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${passwordStrength.score}%` }}
                      />
                    </div>
                  </div>

                  {passwordStrength.tips.length > 0 && (
                    <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 text-lg">💡 نصائح لتحسين قوة كلمة المرور:</h3>
                      <ul className="space-y-1">
                        {passwordStrength.tips.map((tip, index) => (
                          <li key={index} className="text-gray-700 dark:text-gray-300">
                            • {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {passwordStrength.score === 100 && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-4xl mb-2">✅</div>
                      <p className="font-bold text-green-700 dark:text-green-400 text-lg">
                        ممتاز! كلمة المرور قوية جداً
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            انضم إلى مجتمع الحماية السيبرانية التونسي
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            معاً نبني مجتمعاً رقمياً أكثر أماناً لجميع التونسيين
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/simulator">
              <Button size="lg" variant="primary">
                🎮 ابدأ رحلة الحماية
              </Button>
            </Link>
            <Link href="/scanner">
              <Button size="lg" variant="success">
                🔍 افحص رابطاً مشبوهاً
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">محتوى تونسي 100%</h3>
            <p className="text-gray-600 dark:text-gray-400">
              سيناريوهات واقعية تعكس التهديدات المحلية في تونس
            </p>
          </div>
          <div>
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-2">مجتمع نشط</h3>
            <p className="text-gray-600 dark:text-gray-400">
              شارك في حماية المجتمع من خلال الإبلاغ عن التهديدات
            </p>
          </div>
          <div>
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">تطبيق تدريجي</h3>
            <p className="text-gray-600 dark:text-gray-400">
              يعمل بدون اتصال بالإنترنت ويمكن تثبيته كتطبيق
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
