/**
 * Analysis Store (Zustand)
 * Manages risk assessments, plain-language summaries, Loop Engineering telemetry,
 * side-by-side comparison data, and chat sessions.
 */

import { create } from 'zustand';
import {
  DocumentSummary,
  RiskAssessment,
  ComparisonSession,
  ChatMessage,
} from '../types/legal';
import { LoopTelemetry, LoopStepTrace } from '../services/loopEngine/types';
import { SAMPLE_RENTAL_AGREEMENT } from '../constants/sampleDocuments';

interface AnalysisState {
  summaries: Record<string, DocumentSummary>; // keyed by documentId
  risks: Record<string, RiskAssessment[]>; // keyed by documentId
  telemetry: Record<string, LoopTelemetry>; // keyed by documentId
  activeLoopTrace: LoopStepTrace[];
  isAnalyzing: boolean;
  analysisProgress: number; // 0 - 100
  analysisStatusText: string;
  comparisonSession: ComparisonSession | null;
  chatMessages: Record<string, ChatMessage[]>; // keyed by documentId

  // Actions
  setSummary: (documentId: string, summary: DocumentSummary) => void;
  setRisks: (documentId: string, risks: RiskAssessment[]) => void;
  setTelemetry: (documentId: string, telemetry: LoopTelemetry) => void;
  addLoopStepTrace: (trace: LoopStepTrace) => void;
  clearLoopStepTraces: () => void;
  setAnalyzing: (isAnalyzing: boolean, statusText?: string, progress?: number) => void;
  setComparisonSession: (session: ComparisonSession | null) => void;
  addChatMessage: (documentId: string, message: ChatMessage) => void;
  updateLastChatMessage: (documentId: string, content: string, citations?: ChatMessage['citations']) => void;
  clearChat: (documentId: string) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  summaries: {
    [SAMPLE_RENTAL_AGREEMENT.id]: SAMPLE_RENTAL_AGREEMENT.summary!,
  },
  risks: {
    [SAMPLE_RENTAL_AGREEMENT.id]: SAMPLE_RENTAL_AGREEMENT.risks!,
  },
  telemetry: {
    [SAMPLE_RENTAL_AGREEMENT.id]: {
      loopId: 'loop-sample-rental',
      documentId: SAMPLE_RENTAL_AGREEMENT.id,
      taskType: 'risk_analysis',
      startedAt: new Date(Date.now() - 3600000).toISOString(),
      completedAt: new Date(Date.now() - 3598000).toISOString(),
      durationMs: 1420,
      iterationCount: 2,
      maxIterations: 3,
      isPassed: true,
      initialConfidenceScore: 74,
      finalConfidenceScore: 96,
      groundednessScore: 96,
      readabilityGrade: 7.2,
      hallucinationRisk: 'none',
      steps: [
        {
          id: 'step-1',
          step: 'act',
          iteration: 1,
          timestamp: '10:14:02 AM',
          description: 'Generating initial legal risk analysis',
          detail: 'Analyzed 7 clauses with Indian Contract Act 1872 and Karnataka tenancy norms.',
        },
        {
          id: 'step-2',
          step: 'observe',
          iteration: 1,
          timestamp: '10:14:03 AM',
          description: 'Observing ground truth citations',
          detail: 'Tested verbatim source quote matches against raw document text.',
        },
        {
          id: 'step-3',
          step: 'evaluate',
          iteration: 1,
          timestamp: '10:14:04 AM',
          description: 'Critic Evaluation: Score 80% (Grade 9.1)',
          detail: 'Flagged 1 citation discrepancy in Section 4 and high readability grade (9.1).',
          metrics: {
            groundednessScore: 80,
            readabilityGrade: 9.1,
            hallucinationRisk: 'low',
          },
        },
        {
          id: 'step-4',
          step: 'refine',
          iteration: 1,
          timestamp: '10:14:04 AM',
          description: 'Applying self-correction critiques',
          detail: 'Re-anchored verbatim text for seepage repair clause and simplified legal jargon.',
        },
        {
          id: 'step-5',
          step: 'evaluate',
          iteration: 2,
          timestamp: '10:14:05 AM',
          description: 'Critic Evaluation: Score 96% (Grade 7.2)',
          detail: 'All citations verified verbatim. Readability matches 7th grade plain English.',
          metrics: {
            groundednessScore: 96,
            readabilityGrade: 7.2,
            hallucinationRisk: 'none',
          },
        },
        {
          id: 'step-6',
          step: 'final',
          iteration: 2,
          timestamp: '10:14:05 AM',
          description: 'Quality Guardrails Satisfied',
          detail: 'Loop converged in 2 iterations. Passed citation fidelity and safety threshold.',
        },
      ],
      critiquesApplied: [
        'Re-anchored verbatim text for seepage repair clause',
        'Simplified vocabulary in liquidated damages explanation to Grade 7.2',
      ],
    },
  },
  activeLoopTrace: [],
  isAnalyzing: false,
  analysisProgress: 0,
  analysisStatusText: '',
  comparisonSession: null,
  chatMessages: {
    [SAMPLE_RENTAL_AGREEMENT.id]: [
      {
        id: 'msg-init',
        sender: 'assistant',
        content:
          'Hello! I am your LegalLens AI Assistant. I have analyzed **Residential_Rental_Agreement_Indiranagar.pdf**. You can ask me any question about your rights, obligations, deposit refund terms, or lock-in restrictions.',
        timestamp: new Date().toLocaleTimeString(),
        suggestedFollowUps: [
          'What happens to my deposit if I leave early?',
          'Is the 1-month painting deduction normal?',
          'Can my landlord enter without notice?',
        ],
      },
    ],
  },

  setSummary: (docId, summary) =>
    set((state) => ({ summaries: { ...state.summaries, [docId]: summary } })),

  setRisks: (docId, risks) =>
    set((state) => ({ risks: { ...state.risks, [docId]: risks } })),

  setTelemetry: (docId, telemetry) =>
    set((state) => ({ telemetry: { ...state.telemetry, [docId]: telemetry } })),

  addLoopStepTrace: (trace) =>
    set((state) => ({ activeLoopTrace: [...state.activeLoopTrace, trace] })),

  clearLoopStepTraces: () => set({ activeLoopTrace: [] }),

  setAnalyzing: (isAnalyzing, statusText = '', progress = 0) =>
    set({
      isAnalyzing,
      analysisStatusText: statusText,
      analysisProgress: progress,
    }),

  setComparisonSession: (session) => set({ comparisonSession: session }),

  addChatMessage: (docId, message) =>
    set((state) => {
      const existing = state.chatMessages[docId] || [];
      return {
        chatMessages: {
          ...state.chatMessages,
          [docId]: [...existing, message],
        },
      };
    }),

  updateLastChatMessage: (docId, content, citations) =>
    set((state) => {
      const msgs = state.chatMessages[docId] || [];
      if (msgs.length === 0) return state;
      const last = msgs[msgs.length - 1];
      const updated = [...msgs.slice(0, -1), { ...last, content, citations, isStreaming: false }];
      return {
        chatMessages: {
          ...state.chatMessages,
          [docId]: updated,
        },
      };
    }),

  clearChat: (docId) =>
    set((state) => ({
      chatMessages: {
        ...state.chatMessages,
        [docId]: [],
      },
    })),
}));
