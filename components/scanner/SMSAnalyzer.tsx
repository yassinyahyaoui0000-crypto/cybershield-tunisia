'use client';

import { useState } from 'react';
import { analyzeSMS } from '@/lib/scanner';
import { ScanResult } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ThreatLevel from '@/components/ui/ThreatLevel';

export default function SMSAnalyzer() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!message.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const scanResult = analyzeSMS(message);
      setResult(scanResult);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-2xl font-bold mb-4">💬 تحليل الرسائل النصية</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          الصق نص الرسالة المشبوهة هنا لتحليلها
        </p>

        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="مثال: البريد التونسي: طرد بانتظارك! اضغط على الرابط لتأكيد عنوانك..."
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 resize-none"
            rows={5}
          />

          <Button
            onClick={handleAnalyze}
            disabled={!message.trim() || isAnalyzing}
            fullWidth
            size="lg"
          >
            {isAnalyzing ? 'جاري التحليل...' : 'تحليل الرسالة 🔍'}
          </Button>
        </div>

        {/* Examples */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold mb-2">جرّب هذه الأمثلة:</p>
          <div className="space-y-2">
            <button
              onClick={() =>
                setMessage(
                  'البريد التونسي: طرد بانتظارك! اضغط على الرابط لتأكيد عنوانك وتسديد رسوم الشحن 5 دنانير: http://laposte-tn.click/confirm'
                )
              }
              className="block text-sm text-primary hover:underline text-right"
            >
              رسالة تصيد من "البريد التونسي"
            </button>
            <button
              onClick={() =>
                setMessage(
                  'مبروك! فزت بجائزة 1000 دينار من Ooredoo! للحصول على الجائزة، أرسل اسمك الكامل ورقم بطاقتك الوطنية على هذا الرقم فوراً.'
                )
              }
              className="block text-sm text-primary hover:underline text-right"
            >
              رسالة احتيال - جائزة مزيفة
            </button>
            <button
              onClick={() =>
                setMessage('رصيدك الحالي: 25.50 دينار. شكراً لاستخدامك خدمات Ooredoo.')
              }
              className="block text-sm text-primary hover:underline text-right"
            >
              رسالة عادية من مشغل الهاتف
            </button>
          </div>
        </div>
      </Card>

      {result && (
        <Card className="animate-fadeIn">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">نتيجة التحليل</h3>
              <ThreatLevel level={result.verdict} />
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الرسالة المفحوصة:</p>
              <p className="text-sm whitespace-pre-line">{result.message}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">درجة الأمان:</h4>
                <span className="text-2xl font-bold">{result.score}/100</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    result.score >= 70
                      ? 'bg-success'
                      : result.score >= 40
                      ? 'bg-warning'
                      : 'bg-danger'
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-3">📋 التفاصيل:</h4>
              <ul className="space-y-2">
                {result.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1">{reason.startsWith('✅') ? '✅' : reason.startsWith('⚠️') ? '⚠️' : '🚫'}</span>
                    <span>{reason.replace(/^[✅⚠️🚫]\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">💡 التوصيات:</h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
