/**
 * Loop Engineering Types
 * Supports autonomous agentic self-reflection, critique, citation evaluation,
 * and iterative refinement loops for high-assurance legal document intelligence.
 */

export type LoopStepType = 'act' | 'observe' | 'evaluate' | 'refine' | 'final';

export interface LoopStepTrace {
  id: string;
  step: LoopStepType;
  iteration: number;
  timestamp: string;
  description: string;
  detail: string;
  metrics?: {
    groundednessScore?: number; // 0-100%
    readabilityGrade?: number; // Target <= 8th grade
    hallucinationRisk?: 'none' | 'low' | 'medium' | 'high';
    unsupportedClaimCount?: number;
    clauseVerificationRatio?: number; // e.g., 1.0 = 100% citations exist
  };
}

export interface LoopCritique {
  category: 'unverified_citation' | 'complex_jargon' | 'missing_obligation' | 'hallucination_detected' | 'insufficient_redline';
  issue: string;
  recommendedCorrection: string;
  targetClauseOrSection?: string;
}

export interface LoopEvaluationResult {
  isPassed: boolean;
  iteration: number;
  groundednessScore: number; // 0 - 100
  readabilityGrade: number; // Flesch-Kincaid Grade Level
  hallucinationRisk: 'none' | 'low' | 'medium' | 'high';
  critiques: LoopCritique[];
  summaryJudgment: string;
}

export interface LoopTelemetry {
  loopId: string;
  documentId: string;
  taskType: 'simplify' | 'risk_analysis' | 'comparison' | 'chat_qa' | 'lawyer_prep';
  startedAt: string;
  completedAt?: string;
  durationMs: number;
  iterationCount: number;
  maxIterations: number;
  isPassed: boolean;
  initialConfidenceScore: number;
  finalConfidenceScore: number;
  groundednessScore: number;
  readabilityGrade: number;
  hallucinationRisk: 'none' | 'low' | 'medium' | 'high';
  steps: LoopStepTrace[];
  critiquesApplied: string[];
}
