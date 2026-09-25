/**
 * Hook: useDocumentAnalysis
 * Orchestrates multi-pass legal intelligence extraction with Loop Engineering.
 */

import { useCallback } from 'react';
import { LegalDocument, RiskAssessment, DocumentSummary } from '../types/legal';
import { useAnalysisStore } from '../store/analysisStore';
import { geminiClient } from '../services/geminiClient';
import { LoopRunner } from '../services/loopEngine/loopRunner';
import { buildRiskAnalysisPrompt } from '../services/prompts/riskAnalysisPrompt';
import { buildSummaryPrompt } from '../services/prompts/summaryPrompt';
import { extractJsonFromText } from '../utils/jsonParser';
import { announceToScreenReader } from '../utils/accessibility';
import { getCachedAnalysis, setCachedAnalysis } from '../services/analysisCache';
import { LoopTelemetry } from '../services/loopEngine/types';

interface CachedAnalysisData {
  verifiedRisks: RiskAssessment[];
  summary: DocumentSummary | null;
  loopTelemetry: LoopTelemetry | null;
}

export function useDocumentAnalysis() {
  const {
    summaries,
    risks,
    telemetry,
    isAnalyzing,
    analysisProgress,
    analysisStatusText,
    setSummary,
    setRisks,
    setTelemetry,
    addLoopStepTrace,
    clearLoopStepTraces,
    setAnalyzing,
  } = useAnalysisStore();

  const analyzeDocument = useCallback(
    async (doc: LegalDocument) => {
      // Check deterministic memory cache for instant performance
      const cached = getCachedAnalysis<CachedAnalysisData>(doc.rawText, 'full_analysis');
      if (cached) {
        setRisks(doc.id, cached.verifiedRisks);
        if (cached.summary) setSummary(doc.id, cached.summary);
        if (cached.loopTelemetry) setTelemetry(doc.id, cached.loopTelemetry);
        setAnalyzing(false, 'Analysis loaded from cache', 100);
        announceToScreenReader(`Analysis loaded from cache for ${doc.name}`, 'polite');
        return;
      }

      setAnalyzing(true, 'Initiating Agentic Legal Processing Engine...', 10);
      clearLoopStepTraces();
      announceToScreenReader(`Starting deep legal analysis on ${doc.name}`, 'polite');

      try {
        // Step 1: Execute Loop Engineering on Risk & Obligation Assessment
        setAnalyzing(true, 'Running Loop Engineering: Act -> Observe -> Evaluate -> Refine...', 30);

        const loopRunner = new LoopRunner(doc.id, 'risk_analysis', 3, {
          onStep: (trace) => {
            addLoopStepTrace(trace);
            announceToScreenReader(`Loop Step: ${trace.description}`, 'polite');
          },
        });

        const initialGenerator = async (): Promise<RiskAssessment[]> => {
          const prompt = buildRiskAnalysisPrompt(doc.clauses, doc.metadata.detectedType, doc.metadata.jurisdictionHint);
          const response = await geminiClient.generateContent(prompt);
          const parsed = extractJsonFromText<RiskAssessment[]>(response.text, []);
          return parsed.length > 0 ? parsed : (doc.risks || []);
        };

        const refiner = async (critiques: string[], prevDraft: RiskAssessment[]): Promise<RiskAssessment[]> => {
          const refinePrompt = `Refine and self-correct this draft legal risk analysis based on the following critic findings:
CRITIQUES:
${critiques.map((c, i) => `${i + 1}. ${c}`).join('\n')}

PREVIOUS DRAFT:
${JSON.stringify(prevDraft, null, 2)}

RAW DOCUMENT TEXT:
${doc.rawText.slice(0, 5000)}

Ensure all source quotes are verbatim, replace complex legalese with 8th-grade plain English, and remove any unverified claims.
Return ONLY the updated valid JSON array.`;

          const response = await geminiClient.generateContent(refinePrompt);
          return extractJsonFromText<RiskAssessment[]>(response.text, prevDraft);
        };

        const { results: verifiedRisks, telemetry: loopTelemetry } = await loopRunner.runRiskLoop(
          doc,
          initialGenerator,
          refiner,
        );

        setRisks(doc.id, verifiedRisks);
        setTelemetry(doc.id, loopTelemetry);

        // Step 2: Generate Document Summary, Key Terms, Checklist, and Lawyer Prep Guide
        setAnalyzing(true, 'Synthesizing Executive Summary, Checklist & Lawyer Prep Guide...', 75);

        const summaryPrompt = buildSummaryPrompt(doc);
        const summaryResponse = await geminiClient.generateContent(summaryPrompt);
        const parsedSummary = extractJsonFromText<DocumentSummary | null>(summaryResponse.text, null);

        if (parsedSummary) {
          setSummary(doc.id, parsedSummary);
        } else if (doc.summary) {
          setSummary(doc.id, doc.summary);
        }

        // Cache the verified results for instant future lookups
        setCachedAnalysis<CachedAnalysisData>(doc.rawText, 'full_analysis', {
          verifiedRisks,
          summary: parsedSummary || doc.summary || null,
          loopTelemetry,
        });

        setAnalyzing(false, 'Analysis Complete', 100);
        announceToScreenReader(`Analysis complete for ${doc.name}. Found ${verifiedRisks.length} key points.`, 'polite');
      } catch (err) {
        console.error('Analysis failed:', err);
        setAnalyzing(false, 'Analysis encountered an issue', 0);
        announceToScreenReader('Analysis failed. Please check your network or try again.', 'assertive');
      }
    },
    [setAnalyzing, clearLoopStepTraces, addLoopStepTrace, setRisks, setTelemetry, setSummary],
  );

  return {
    summaries,
    risks,
    telemetry,
    isAnalyzing,
    analysisProgress,
    analysisStatusText,
    analyzeDocument,
  };
}
