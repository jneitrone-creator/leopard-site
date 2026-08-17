export type IndustryType = 'all' | 'real-estate' | 'healthcare' | 'construction' | 'beauty' | 'ecommerce' | 'b2b-services';
export type ProblemSolvedType = 'all' | 'lead-leakage' | 'process-automation' | 'customer-retention' | 'sales-growth';

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  client: string;
  niche: string;
  industryId: IndustryType;
  industryLabel: string;
  problemSolved: ProblemSolvedType[];
  problemSolvedLabel: string;
  location: string;
  team: string;
  duration: string;
  payback: string;
  image: string;
  problem: string;
  problemBullets: string[];
  solution: string;
  solutionBullets: string[];
  metrics: {
    label: string;
    before: string;
    after: string;
    gain?: string;
  }[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export type RoleType = 'owner' | 'rop' | 'marketer';

export interface RolePainItem {
  id: string;
  pain: string;
  painDetails: string;
  solution: string;
  solutionDetails: string;
  effect: string;
  iconName: string;
}

export interface RoleDiagnostic {
  id: RoleType;
  title: string;
  subtitle: string;
  badge: string;
  items: RolePainItem[];
}

export interface PipelineStage {
  step: number;
  title: string;
  stageName: string;
  trigger: string;
  automationAction: string;
  crmResult: string;
  systems: string[];
  metricImpact: string;
  iconName: string;
}

export interface ServiceModule {
  id: string;
  name: string;
  category: 'core' | 'ai' | 'analytics' | 'integration' | 'support';
  price: number;
  timelineDays: number;
  description: string;
  impact: string;
  iconName: string;
  defaultInTiers: string[];
  isExtraAddon?: boolean;
}

export interface PricingTier {
  id: string;
  title: string;
  basePrice: number;
  priceFormatted: string;
  timeline: string;
  timelineDays: number;
  popular?: boolean;
  tagline: string;
  badge?: string;
  targetAudience?: string;
  features: string[];
  deliverables: string[];
  defaultModuleIds: string[];
  support: string;
  ctaText: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface BotChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'system';
  text: string;
  timestamp: string;
  options?: string[];
  leadPayload?: {
    clientName?: string;
    phone?: string;
    budget?: string;
    urgency?: string;
    niche?: string;
    score?: number;
  };
}

export interface BotNicheConfig {
  id: string;
  title: string;
  badge: string;
  avatar: string;
  description: string;
  metrics: string;
  dialogueTree: {
    step: number;
    botMessage: string;
    userOptions: {
      text: string;
      leadValue?: Record<string, any>;
    }[];
  }[];
}

export interface AuditFormData {
  name: string;
  phone: string;
  telegram?: string;
  teamSize: string;
  niche: string;
  currentCrm: string;
  preferredContact: 'telegram' | 'whatsapp' | 'call';
  calculatedLoss?: number;
}
