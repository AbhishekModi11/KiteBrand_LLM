export interface DiscoveryData {
  coreProblem: string;
  targetAudience: string;
  antiAudience: string;
  marketCategory: string;
  valueProposition: string;
}

export interface ArchetypeDirection {
  archetypeId: "utilitarian" | "cultural_rebel" | "empathic_mentor";
  archetypeName: string;
  brandName: string;
  namingRationale: string;
  tagline: string;
  palette: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
  };
  voiceTraits: string[];
  wordsToAvoid: string[];
  strategicAngle: string;
  recommended?: boolean;
  matchScore?: number;
  recommendationReason?: string;
}

export interface ClicheAuditData {
  clichesDetected: string[];
  critiqueSummary: string;
  scoreBefore: number;
  scoreAfter: number;
  contrastRatio?: number;
  draftBrandName?: string;
  draftTagline?: string;
  refinedDirection: ArchetypeDirection;
}

export interface BrandKitData {
  heroHeadline: string;
  heroSubheadline: string;
  elevatorPitch: string;
  socialLaunchThread: string[];
}

export interface LaunchMetrics {
  distinctivenessScore: number;
  wcagContrastRatio: string;
  wcagStatus: string;
  clichePurity: string;
  memorabilityIndex: string;
}