'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-400">
              <span className="text-2xl">🛡️</span>
              CyberShield Tunisia
            </h3>
            <p className="text-gray-400">
              حماية التونسيين من التهديدات السيبرانية الحقيقية من خلال التعليم والحماية الفورية والذكاء المجتمعي.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link href="/simulator" className="text-gray-400 hover:text-white transition-colors">محاكي التهديدات</Link></li>
              <li><Link href="/scanner" className="text-gray-400 hover:text-white transition-colors">الماسح الذكي</Link></li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-xl font-bold mb-4">جهات الاتصال الطارئة</h3>
            <ul className="space-y-2 text-gray-400">
              <li>🚔 الشرطة: 197</li>
              <li>📞 الطوارئ: 190</li>
              <li>🔐 الحماية المدنية: 198</li>
              <li>⚖️ وزارة الداخلية: (+216) 71 340 000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} CyberShield Tunisia. جميع الحقوق محفوظة.</p>
          <p className="mt-2 text-sm">
            مشروع تعليمي مفتوح المصدر لحماية المجتمع التونسي من التهديدات السيبرانية
          </p>
        </div>
      </div>
    </footer>
  );
}
