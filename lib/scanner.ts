import { ScanResult } from '@/types';

// Tunisian threat patterns
const TUNISIAN_PATTERNS = {
  suspiciousDomains: [
    'laposte-tn',
    'poste-tunisienne',
    'ooredoo-tn',
    'orange-tn',
    'biat-secure',
    'bnat-online',
    'attijari-secure',
    'stb-secure',
    'ministere-interieur',
    'douane-tn',
    'cnss-tn',
    'telecom-tn',
  ],
  tunisianBanks: ['biat', 'bna', 'attijari', 'stb', 'zitouna', 'amen', 'atb'],
  tunisianTelcos: ['ooredoo', 'orange', 'telecom'],
  phishingKeywords: [
    'تأكيد',
    'احصل',
    'فوز',
    'جائزة',
    'عاجل',
    'فوري',
    'مبروك',
    'حساب',
    'بطاقة',
    'تحديث',
    'suspended',
    'verify',
    'urgent',
    'prize',
    'winner',
    'confirm',
    'account',
    'password',
  ],
  urgencyWords: ['فوراً', 'حالاً', 'الآن', 'عاجل', 'urgent', 'now', 'immediately'],
  tunisianEntities: [
    'البريد التونسي',
    'la poste',
    'ooredoo',
    'orange tunisie',
    'tunisie telecom',
    'بنك',
    'bank',
  ],
};

export function analyzeURL(url: string): ScanResult {
  const reasons: string[] = [];
  let score = 100;
  let verdict: 'safe' | 'suspicious' | 'dangerous' = 'safe';

  try {
    const urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
    const domain = urlObj.hostname.toLowerCase();
    const path = urlObj.pathname.toLowerCase();

    // Check for suspicious domain patterns
    TUNISIAN_PATTERNS.suspiciousDomains.forEach((pattern) => {
      if (domain.includes(pattern) && !domain.endsWith('.tn')) {
        score -= 40;
        reasons.push(`⚠️ النطاق يحتوي على "${pattern}" لكن ليس موقعاً تونسياً رسمياً (.tn)`);
      }
    });

    // Check for HTTP instead of HTTPS
    if (urlObj.protocol === 'http:') {
      score -= 20;
      reasons.push('⚠️ الموقع لا يستخدم HTTPS - غير آمن لإدخال معلومات حساسة');
    }

    // Check for suspicious TLDs
    const suspiciousTLDs = ['.click', '.xyz', '.top', '.win', '.tk'];
    if (suspiciousTLDs.some((tld) => domain.endsWith(tld))) {
      score -= 35;
      reasons.push('🚫 امتداد النطاق مشبوه - غالباً يُستخدم في الاحتيال');
    }

    // Check for IP address instead of domain
    if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) {
      score -= 40;
      reasons.push('🚫 الموقع يستخدم عنوان IP بدلاً من اسم نطاق - علامة احتيال');
    }

    // Check for excessive subdomains
    const subdomains = domain.split('.');
    if (subdomains.length > 4) {
      score -= 25;
      reasons.push('⚠️ عدد كبير من النطاقات الفرعية - قد يكون موقعاً مزيفاً');
    }

    // Check for login/signin pages without HTTPS
    if (
      (path.includes('login') || path.includes('signin') || path.includes('account')) &&
      urlObj.protocol === 'http:'
    ) {
      score -= 30;
      reasons.push('🚫 صفحة تسجيل دخول بدون HTTPS - خطر شديد!');
    }

    // Check for typosquatting
    TUNISIAN_PATTERNS.tunisianBanks.forEach((bank) => {
      if (
        (domain.includes(bank) && !domain.includes(`${bank}.com.tn`)) ||
        (domain.includes(bank) && domain.includes('-'))
      ) {
        score -= 35;
        reasons.push(`🚫 اسم النطاق يشبه "${bank}" لكن ليس الموقع الرسمي`);
      }
    });

    // Determine verdict
    if (score < 40) {
      verdict = 'dangerous';
    } else if (score < 70) {
      verdict = 'suspicious';
    }

    // Add positive indicators if safe
    if (score >= 80) {
      if (urlObj.protocol === 'https:') {
        reasons.push('✅ يستخدم HTTPS - اتصال مشفر');
      }
      if (domain.endsWith('.tn') || domain.endsWith('.com.tn')) {
        reasons.push('✅ موقع تونسي رسمي (.tn)');
      }
    }
  } catch (error) {
    score = 0;
    verdict = 'dangerous';
    reasons.push('🚫 رابط غير صالح أو تنسيق خاطئ');
  }

  const recommendations: string[] = [];
  if (verdict === 'dangerous') {
    recommendations.push('❌ لا تفتح هذا الرابط أبداً');
    recommendations.push('📱 أبلغ عن هذا الرابط إذا تلقيته من شخص ما');
    recommendations.push('🚨 احذف الرسالة التي تحتوي على هذا الرابط');
  } else if (verdict === 'suspicious') {
    recommendations.push('⚠️ تحقق من مصدر الرابط قبل فتحه');
    recommendations.push('📞 اتصل بالجهة المعنية مباشرة للتأكد');
    recommendations.push('🔍 ابحث عن تقييمات وآراء حول هذا الموقع');
  } else {
    recommendations.push('✅ الرابط يبدو آمناً بشكل عام');
    recommendations.push('🔐 مع ذلك، تحقق دائماً قبل إدخال معلومات حساسة');
  }

  return {
    url,
    verdict,
    score,
    reasons: reasons.length > 0 ? reasons : ['لا توجد علامات مشبوهة واضحة'],
    recommendations,
  };
}

export function analyzeSMS(message: string): ScanResult {
  const reasons: string[] = [];
  let score = 100;
  let verdict: 'safe' | 'suspicious' | 'dangerous' = 'safe';

  const lowerMessage = message.toLowerCase();

  // Check for URL in SMS
  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-z0-9-]+\.(com|net|org|click|xyz|tk)[^\s]*)/gi;
  const urls = message.match(urlPattern);

  if (urls) {
    score -= 30;
    reasons.push('⚠️ الرسالة تحتوي على روابط - كن حذراً');

    urls.forEach((url) => {
      const urlAnalysis = analyzeURL(url);
      if (urlAnalysis.verdict === 'dangerous') {
        score -= 40;
        reasons.push('🚫 الرابط في الرسالة خطير');
      }
    });
  }

  // Check for phishing keywords
  const foundKeywords = TUNISIAN_PATTERNS.phishingKeywords.filter((keyword) =>
    lowerMessage.includes(keyword.toLowerCase())
  );
  if (foundKeywords.length >= 3) {
    score -= 25;
    reasons.push(`⚠️ كلمات مشبوهة: ${foundKeywords.slice(0, 3).join(', ')}`);
  }

  // Check for urgency
  const urgencyWords = TUNISIAN_PATTERNS.urgencyWords.filter((word) =>
    lowerMessage.includes(word.toLowerCase())
  );
  if (urgencyWords.length > 0) {
    score -= 15;
    reasons.push('⚠️ لغة ضاغطة - علامة احتيال شائعة');
  }

  // Check for requests for personal information
  const sensitiveInfoKeywords = [
    'رقم البطاقة',
    'رمز التحقق',
    'كلمة المرور',
    'الرقم السري',
    'otp',
    'code',
    'password',
    'pin',
    'carte',
    'cvv',
  ];
  const foundSensitive = sensitiveInfoKeywords.filter((keyword) =>
    lowerMessage.includes(keyword.toLowerCase())
  );
  if (foundSensitive.length > 0) {
    score -= 35;
    reasons.push('🚫 تطلب معلومات حساسة - خطر!');
  }

  // Check for impersonation of Tunisian entities
  TUNISIAN_PATTERNS.tunisianEntities.forEach((entity) => {
    if (lowerMessage.includes(entity.toLowerCase())) {
      // If it's from a known entity but uses suspicious patterns
      if (foundKeywords.length > 0 || urls) {
        score -= 20;
        reasons.push(`⚠️ تنتحل صفة "${entity}" - قد تكون مزيفة`);
      }
    }
  });

  // Check for money requests
  const moneyKeywords = ['دينار', 'دفع', 'تحويل', 'دفعة', 'dinar', 'payment', 'transfer'];
  const foundMoney = moneyKeywords.filter((keyword) =>
    lowerMessage.includes(keyword.toLowerCase())
  );
  if (foundMoney.length > 0 && urls) {
    score -= 30;
    reasons.push('🚫 تطلب أموالاً مع روابط - احتيال محتمل');
  }

  // Determine verdict
  if (score < 40) {
    verdict = 'dangerous';
  } else if (score < 70) {
    verdict = 'suspicious';
  }

  // Add positive indicators
  if (score >= 80) {
    reasons.push('✅ لا توجد علامات احتيال واضحة');
  }

  const recommendations: string[] = [];
  if (verdict === 'dangerous') {
    recommendations.push('❌ هذه رسالة احتيالية - لا تتفاعل معها');
    recommendations.push('🗑️ احذف الرسالة فوراً');
    recommendations.push('📱 أبلغ عن الرقم لمشغل الهاتف');
    recommendations.push('📞 اتصل بالجهة المعنية مباشرة إذا كنت قلقاً');
  } else if (verdict === 'suspicious') {
    recommendations.push('⚠️ لا تضغط على أي روابط في الرسالة');
    recommendations.push('📞 اتصل بالجهة المرسلة عبر رقمها الرسمي للتأكد');
    recommendations.push('🔍 ابحث عن هذا النوع من الرسائل لمعرفة إذا كانت احتيالية معروفة');
  } else {
    recommendations.push('✅ الرسالة تبدو آمنة بشكل عام');
    recommendations.push('🔐 مع ذلك، لا تشارك معلومات حساسة عبر الرسائل');
  }

  return {
    message,
    verdict,
    score,
    reasons,
    recommendations,
  };
}
