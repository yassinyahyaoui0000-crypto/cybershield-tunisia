// ... ضمن قسم الهيرو تمت إضافة زر جرّب اللعبة ورأس الملخص
<div className="text-center animate-fadeIn">
  <h1 className="text-5xl font-bold mb-4 text-primary drop-shadow-lg">🎮 محاكي التهديدات</h1>
  <p className="text-xl text-text-primary mb-8">
    تعلم كيفية التعرف على التهديدات السيبرانية من خلال سيناريوهات واقعية تونسية
  </p>
  <div className="flex justify-center">
    <a href="https://cyber-hero-coral.vercel.app/" target="_blank" rel="noopener noreferrer">
      <Button size="lg" variant="primary" className="shadow-lg">
        🎯 جرّب اللعبة
      </Button>
    </a>
  </div>
</div>

// ... ملخص الميزة والفئات
<Card className="mb-10 bg-surface-grey text-text-primary">
  <div className="space-y-4">
    <h2 className="text-3xl font-bold text-primary">Threat Awareness Feature – Summary</h2>
    <p className="text-lg">
      This feature highlights the most common cybersecurity risks affecting citizens, presenting them in a clear and structured format to improve public awareness and digital safety.
    </p>
    <div className="space-y-3">
      <div>
        <h4 className="text-xl font-semibold">Phishing &amp; SMS Scams</h4>
        <p className="text-base text-text-secondary">
          Fraudulent messages impersonating trusted entities such as banks or government services to steal sensitive information like passwords or financial data.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-semibold">Social Media Fraud</h4>
        <p className="text-base text-text-secondary">
          Scams involving fake seller profiles, hacked accounts, and deceptive marketplace listings targeting online users.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-semibold">Weak Credentials</h4>
        <p className="text-base text-text-secondary">
          Security risks caused by password reuse and the lack of multi-factor authentication (MFA), making accounts easier to compromise.
        </p>
      </div>
    </div>
  </div>
</Card>
