
import React from 'react';
import { 
  ShieldAlert, 
  Mail, 
  MessageSquare, 
  PhoneCall, 
  UserPlus, 
  Fish, 
  Zap, 
  Eye, 
  Cpu, 
  Scale, 
  FileWarning, 
  Lock,
  Smartphone,
  Globe,
  Database,
  Search,
  BookOpen,
  FileText,
  CheckSquare,
  HardDrive,
  ShieldCheck,
  Video,
  Gavel,
  LifeBuoy
} from 'lucide-react';
import { AwarenessTopic, ReportCategory } from './types';

export interface SafetyResource {
  id: string;
  title: string;
  description: string;
  icon: string;
  fileSize: string;
  category: string;
}

export interface VideoRedirection {
  id: string;
  title: string;
  channel: string;
  url: string;
  category: 'Demo' | 'Protection' | 'Laws' | 'Reporting';
  description: string;
  thumbnail: string;
}

export const VIDEO_RESOURCES: VideoRedirection[] = [
  // Attack Simulations & Demos
  {
    id: 'v1',
    title: 'Phishing Attack Simulation',
    channel: 'Cybersecurity Demos',
    url: 'https://www.youtube.com/results?search_query=phishing+attack+simulation+social+engineering',
    category: 'Demo',
    description: 'Watch step-by-step demonstrations of how attackers create fake login pages and deceive users.',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'v2',
    title: 'Vishing & Voice Spoofing',
    channel: 'Hacking Exposed',
    url: 'https://www.youtube.com/results?search_query=vishing+voice+spoofing+social+engineering+demo',
    category: 'Demo',
    description: 'Realistic scenarios showing how AI voice cloning is used to impersonate family members and bosses.',
    thumbnail: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=400'
  },
  // Securing & Protecting
  {
    id: 'v3',
    title: 'MFA & Digital Hygiene',
    channel: 'All Things Secured',
    url: 'https://www.youtube.com/@AllThingsSecured',
    category: 'Protection',
    description: 'Comprehensive guides on setting up hardware keys, authenticator apps, and securing your online presence.',
    thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'v4',
    title: 'Social Media Privacy Settings',
    channel: 'Privacy First',
    url: 'https://www.youtube.com/results?search_query=secure+social+media+privacy+settings+2024',
    category: 'Protection',
    description: 'How to lock down your Meta, X, and Instagram accounts to prevent data harvesting by social engineers.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400'
  },
  // Indian Cyber Laws
  {
    id: 'v5',
    title: 'IT Act 2000 & Amendments',
    channel: 'Legal Awareness India',
    url: 'https://www.youtube.com/results?search_query=IT+Act+2000+cyber+crime+laws+india',
    category: 'Laws',
    description: 'Detailed explanation of Sections 66C and 66D regarding identity theft and cheating by impersonation.',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400'
  },
  // Reporting & Justice
  {
    id: 'v6',
    title: 'CyberDost (Official Portal Guide)',
    channel: 'MHA - CyberDost',
    url: 'https://www.youtube.com/@CyberDost',
    category: 'Reporting',
    description: 'Official guides from the Ministry of Home Affairs on how to use the National Cyber Crime Reporting Portal.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400'
  }
];

export const SAFETY_RESOURCES: SafetyResource[] = [
  {
    id: 'phishing-checklist',
    title: 'Phishing Detection Checklist',
    description: 'A 10-point checklist to verify any email, SMS, or link before you interact with it.',
    icon: 'CheckSquare',
    fileSize: '1.2 MB',
    category: 'Checklist'
  },
  {
    id: 'reporting-manual',
    title: 'Cyber Crime Reporting Manual',
    description: 'Official step-by-step guide for filing complaints on National Cyber Crime Portals.',
    icon: 'FileText',
    fileSize: '2.5 MB',
    category: 'Manual'
  },
  {
    id: 'hygiene-handbook',
    title: 'Digital Hygiene Handbook',
    description: 'Best practices for MFA, password management, and secure browsing habits.',
    icon: 'ShieldAlert',
    fileSize: '3.8 MB',
    category: 'Guide'
  },
  {
    id: 'legal-cheat-sheet',
    title: 'IT Act & Laws Cheat Sheet',
    description: 'A summary of relevant sections of the IT Act 2000 for quick reference during fraud.',
    icon: 'Scale',
    fileSize: '1.5 MB',
    category: 'Legal'
  }
];

export const AWARENESS_TOPICS: AwarenessTopic[] = [
  {
    id: 'intro-social-eng',
    title: 'What is Social Engineering?',
    category: 'Foundations',
    level: 'Beginner',
    icon: 'ShieldAlert',
    description: 'The art of manipulating people so they give up confidential information.',
    detailedContent: 'Social engineering is a psychological attack where hackers manipulate human emotions like fear, curiosity, or urgency to bypass security protocols. Instead of finding technical vulnerabilities in software, they find vulnerabilities in people.',
    howItWorks: [
      'Investigation: Identifying victims and gathering background information.',
      'Hook: Engaging the victim and building trust.',
      'Play: Executing the attack to retrieve information.',
      'Exit: Closing the interaction without raising suspicion.'
    ],
    prevention: [
      'Be skeptical of urgent requests.',
      'Verify the identity of anyone asking for information.',
      'Slow down and think before you click.',
      'Set your social media accounts to private.'
    ],
    videos: [
      { lang: 'English', id: 'bO7r9S_tS-k' },
      { lang: 'Hindi', id: 'yXW2X-0P8dY' },
      { lang: 'Telugu', id: 'p6fA830u-sU' }
    ]
  },
  {
    id: 'phishing-basics',
    title: 'Phishing Attacks',
    category: 'Common Attacks',
    level: 'Beginner',
    icon: 'Fish',
    description: 'Fraudulent attempts to obtain sensitive info via electronic communication.',
    detailedContent: 'Phishing is the most common form of social engineering. It usually arrives as an email or message that looks like it is from a legitimate source like your bank, Netflix, or a government agency.',
    howItWorks: [
      'The attacker sends a mass email with a sense of urgency.',
      'The email contains a link to a fake login page.',
      'The victim enters their credentials.',
      'The attacker steals the password and drains the account.'
    ],
    prevention: [
      'Check the sender\'s email address carefully.',
      'Hover over links to see the real destination URL.',
      'Use multi-factor authentication (MFA).',
      'Never provide passwords via email.'
    ],
    videos: [
      { lang: 'English', id: 'Y7zNlEMDmI8' },
      { lang: 'Hindi', id: 'X-6K3K8V6_c' },
      { lang: 'Telugu', id: 'YI_Y9G9-S_U' }
    ]
  },
  {
    id: 'deepfake-scams',
    title: 'Deepfake & AI Scams',
    category: 'Advanced Threats',
    level: 'Advanced',
    icon: 'Cpu',
    description: 'Using AI to impersonate voices or video of trusted individuals.',
    detailedContent: 'Artificial Intelligence has given social engineers new tools. Deepfakes use machine learning to create realistic but fake audio or video. An attacker might call you using a cloned version of your boss\'s or family member\'s voice.',
    howItWorks: [
      'Attacker collects audio/video samples of a target.',
      'AI models are trained to mimic the voice and appearance.',
      'A real-time call is made using the cloned identity.',
      'The victim is asked to transfer money or share secrets.'
    ],
    prevention: [
      'Establish a "safe word" with family for emergencies.',
      'Ask unexpected questions that only the real person would know.',
      'Look for unnatural facial movements or glitches in video calls.',
      'Be extremely cautious of "urgent" financial requests.'
    ],
    videos: [
      { lang: 'English', id: 'o2DDU4g0Ppg' },
      { lang: 'Hindi', id: 'o2DDU4g0Ppg' }, 
      { lang: 'Telugu', id: 'o2DDU4g0Ppg' }
    ]
  },
  {
    id: 'vishing-smishing',
    title: 'Vishing & Smishing',
    category: 'Communication Scams',
    level: 'Intermediate',
    icon: 'PhoneCall',
    description: 'Voice Phishing (Vishing) and SMS Phishing (Smishing).',
    detailedContent: 'These attacks use phone calls or text messages instead of emails. Smishing often includes links to "track a package" or "unlock an account," while Vishing involves a person or automated voice asking for verification codes.',
    howItWorks: [
      'You receive a text saying your bank account is locked.',
      'The text asks you to call a number or click a link.',
      'On the call, a "representative" asks for your OTP.',
      'The attacker uses the OTP to authorize a transaction.'
    ],
    prevention: [
      'Never share OTPs (One Time Passwords) with anyone.',
      'Banks will never ask for your PIN or password over the phone.',
      'Block suspicious numbers immediately.',
      'Use caller ID apps but don\'t trust them blindly (number spoofing).'
    ],
    videos: [
      { lang: 'English', id: 'zM8O4vQ-SRE' },
      { lang: 'Hindi', id: 'zM8O4vQ-SRE' },
      { lang: 'Telugu', id: 'zM8O4vQ-SRE' }
    ]
  }
];

export const LEGAL_RESOURCES: ReportCategory[] = [
  {
    title: 'Financial Fraud & Phishing',
    description: 'Reporting unauthorized transactions or fake banking links.',
    portalName: 'National Cyber Crime Reporting Portal (India)',
    portalUrl: 'https://www.cybercrime.gov.in',
    steps: [
      'Keep screenshots of the transaction/message.',
      'Note down the transaction ID and bank details.',
      'File a complaint on cybercrime.gov.in.',
      'Immediately inform your bank to block your accounts.'
    ]
  },
  {
    title: 'Identity Theft & Social Media',
    description: 'Reporting hacked accounts or impersonation profiles.',
    portalName: 'Social Media Grievance Redressal',
    portalUrl: 'https://www.meity.gov.in/cyber-surveillence-and-cyber-security',
    steps: [
      'Report the profile directly to the platform (Meta, X, etc.).',
      'Inform your contacts not to engage with the fake profile.',
      'Collect evidence of the impersonation (URLs, screenshots).',
      'File a complaint under IT Act Section 66C/66D.'
    ]
  }
];

export const ICON_MAP: Record<string, any> = {
  ShieldAlert,
  Mail,
  MessageSquare,
  PhoneCall,
  UserPlus,
  Fish,
  Zap,
  Eye,
  Cpu,
  Scale,
  FileWarning,
  Lock,
  Smartphone,
  Globe,
  Database,
  Search,
  BookOpen,
  FileText,
  CheckSquare,
  HardDrive,
  ShieldCheck,
  Video,
  Gavel,
  LifeBuoy
};
