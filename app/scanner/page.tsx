'use client';

import { useState } from 'react';
import URLScanner from '@/components/scanner/URLScanner';
import SMSAnalyzer from '@/components/scanner/SMSAnalyzer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

type ScannerType = 'url' | 'sms';

export default function ScannerPage() {
  const [activeScanner, setActiveScanner] = useState<ScannerType>('url');

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">🤖 الماسح الذكي</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            افحص الروابط والرسائل للكشف عن التهديدات السيبرانية
          </p>
        </div>

        {/* Scanner Type Selector */}
        <div className="flex gap-4 mb-8 justify-center">
          <Button
            variant={activeScanner === 'url' ? 'primary' : 'secondary'}
            onClick={() => setActiveScanner('url')}
            size="lg"
          >
            🔗 فحص الروابط
          </Button>
          <Button
            variant={activeScanner === 'sms' ? 'primary' : 'secondary'}
            onClick={() => setActiveScanner('sms')}
            size="lg"
          >
            💬 تحليل الرسائل
          </Button>
        </div>

        {/* Active Scanner */}
        {activeScanner === 'url' ? <URLScanner /> : <SMSAnalyzer />}

        {/* Information Section */}
        <Card className="mt-12 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <h3 className="text-2xl font-bold mb-4">🛡️ كيف يعمل الماسح الذكي؟</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-lg mb-2">🔍 فحص الروابط (URLs):</h4>
              <ul className="space-y-2 mr-6">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>التحقق من النطاق (Domain) والامتداد</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>الكشف عن المواقع المزيفة (Phishing Sites)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>فحص بروتوكول الأمان (HTTPS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>اكتشاف تقليد المواقع الرسمية (Typosquatting)</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-2">💬 تحليل الرسائل النصية:</h4>
              <ul className="space-y-2 mr-6">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>الكشف عن الكلمات المشبوهة والتصيد</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>تحديد طلبات المعلومات الحساسة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>اكتشاف انتحال صفة الجهات الرسمية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>تحليل اللغة الضاغطة والمستعجلة</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Warning */}
        <Card className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500">
          <div className="flex items-start gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <h4 className="font-bold text-lg mb-2">تنبيه مهم:</h4>
              <p className="text-gray-700 dark:text-gray-300">
                هذا الماسح يقدم تحليلاً تلقائياً قد لا يكون دقيقاً بنسبة 100%. استخدمه كأداة مساعدة،
                ولكن اعتمد دائماً على حكمك الشخصي. عند الشك، اتصل بالجهة المعنية مباشرة.
              </p>
            </div>
          </div>
        </Card>

        {/* Common Tunisian Threats */}
        <Card className="mt-6">
          <h3 className="text-2xl font-bold mb-4">🎯 تهديدات شائعة في تونس:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-bold mb-2">📬 تصيد البريد التونسي</h4>
              <p className="text-sm">مواقع مزيفة تنتحل صفة البريد التونسي (laposte.tn)</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-bold mb-2">🏦 تصيد البنوك</h4>
              <p className="text-sm">مواقع مزيفة لبنوك تونسية (BIAT, BNA, Attijari, STB)</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-bold mb-2">📱 جوائز مزيفة</h4>
              <p className="text-sm">رسائل تدعي الفوز بجوائز من Ooredoo, Orange</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-bold mb-2">🛒 متاجر وهمية</h4>
              <p className="text-sm">مواقع تجارة إلكترونية مزيفة بأسعار مغرية</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
