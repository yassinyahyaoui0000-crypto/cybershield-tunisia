export interface Scenario {
  id: string;
  title: string;
  description: string;
  type: 'sms' | 'ecommerce' | 'whatsapp' | 'social' | 'identity';
  difficulty: 'easy' | 'medium' | 'hard';
  steps: ScenarioStep[];
}

export interface ScenarioStep {
  id: string;
  content: string;
  choices: Choice[];
  feedback?: string;
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  points: number;
  nextStepId?: string;
}

export interface UserProgress {
  totalPoints: number;
  level: number;
  completedScenarios: string[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
}

export interface ScanResult {
  url?: string;
  message?: string;
  verdict: 'safe' | 'suspicious' | 'dangerous';
  score: number;
  reasons: string[];
  recommendations: string[];
}

export interface Threat {
  id: string;
  type: 'phishing' | 'scam' | 'malware' | 'identity-theft';
  title: string;
  description: string;
  url?: string;
  reportedAt: Date;
  reportCount: number;
  confirmed: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface PrivacyScore {
  overall: number;
  passwordStrength: number;
  mfaEnabled: number;
  privacySettings: number;
  socialMediaSafety: number;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: number;
  content: string;
  quiz: QuizQuestion[];
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface EmergencyGuide {
  id: string;
  type: string;
  title: string;
  steps: string[];
  contacts: Contact[];
}

export interface Contact {
  name: string;
  phone?: string;
  email?: string;
  website?: string;
}

export type ThemeMode = 'light' | 'dark';
