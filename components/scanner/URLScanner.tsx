'use client';

import { useState } from 'react';
import { analyzeURL } from '@/lib/scanner';
import { ScanResult } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ThreatLevel from '@/components/ui/ThreatLevel';

export default function URLScanner() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (!url.trim()) return;

    setIsScanning(true);
    // Simulate scanning delay for better UX
    setTimeout(() => {
      const scanResult = analyzeURL(url);
      setResult(scanResult);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-2xl font-bold mb-4">🔍 فحص الروابط (URL)</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          الصق الرابط المشبوه هنا للتحقق من أمانه
        </p>

        <div className="space-y-4">
          <textarea
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="مثال: https://laposte-tn.click/confirm"
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 resize-none"
            rows={3}
          />

          <Button
            onClick={handleScan}
            disabled={!url.trim() || isScanning}
            fullWidth
            size="lg"
          >
            {isScanning ? 'جاري الفحص...' : 'فحص الرابط 🔎'}
          </Button>
        </div>

        {/* Examples */}
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="font-semibold mb-2">جرّب هذه الأمثلة:</p>
          <div className="space-y-2">
            <button
              onClick={() => setUrl('https://laposte-tn.click/confirm')}
              className="block text-sm text-primary hover:underline"
            >
              https://laposte-tn.click/confirm (رابط مشبوه)
            </button>
            <button
              onClick={() => setUrl('http://biat-secure-login.com/update')}
              className="block text-sm text-primary hover:underline"
            >
              http://biat-secure-login.com/update (تصيد بنكي)
            </button>
            <button
              onClick={() => setUrl('https://www.poste.tn')}
              className="block text-sm text-primary hover:underline"
            >
              https://www.poste.tn (موقع رسمي آمن)
            </button>
          </div>
        </div>
      </Card>

      {result && (
        <Card className="animate-fadeIn">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">نتيجة الفحص</h3>
              <ThreatLevel level={result.verdict} />
            </div>

            <div className="bg-surface-dark-elevated dark:bg-surface-dark p-4 rounded-lg border border-primary/10">
              <p className="text-sm text-text-secondary mb-1">الرابط المفحوص:</p>
              <p className="font-mono text-sm break-all text-primary">{result.url}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">درجة الأمان:</h4>
                <span className="text-2xl font-bold">{result.score}/100</span>
              </div>
              <div className="w-full bg-surface-dark-elevated dark:bg-surface-dark rounded-full h-4 overflow-hidden border border-primary/20">
                <div
                  className={`h-full transition-all duration-500 ${
                    result.score >= 70
                      ? 'bg-success neon-glow-green'
                      : result.score >= 40
                      ? 'bg-warning neon-glow-yellow'
                      : 'bg-danger neon-glow-pink'
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
