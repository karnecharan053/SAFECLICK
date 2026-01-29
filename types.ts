
export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export enum UserRole {
  STUDENT = 'Student',
  CYBER_EXPERT = 'Cyber Expert'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AnalysisResult {
  isSafe: boolean;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  attackType: string;
  reasoning: string[];
  suspiciousPatterns: string[];
  recommendations: string[];
}

export interface TopicVideo {
  lang: string;
  id: string;
}

export interface AwarenessTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedContent: string;
  howItWorks: string[];
  prevention: string[];
  videos: TopicVideo[]; 
  icon: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ReportCategory {
  title: string;
  description: string;
  portalName: string;
  portalUrl: string;
  steps: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  links?: Array<{ title: string; uri: string }>;
  timestamp: Date;
}

export interface UserProgress {
  userId: string;
  completedTopicIds: string[];
  downloadedResourceIds: string[]; // New field
  lastAccessed: Date;
}
