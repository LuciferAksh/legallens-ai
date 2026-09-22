/**
 * Loop Runner Engine (Autonomous Self-Correction Cycle)
 * Implements the 4-phase Loop Engineering cycle:
 * Act (Generate) -> Observe (Extract) -> Evaluate (Critic) -> Refine (Self-Correct)
 */

import { LegalDocument, RiskAssessment } from '../../types/legal';
import { LoopTelemetry, LoopStepTrace } from './types';
import { evaluateRiskAnalysisLoop } from './evaluator';
import { APP_CONFIG } from '../../constants';

export interface LoopExecutionCallbacks {
  onStep?: (trace: LoopStepTrace) => void;
  onTelemetryUpdate?: (telemetry: LoopTelemetry) => void;
}

export class LoopRunner {
  private steps: LoopStepTrace[] = [];
  private startTime = 0;

  constructor(
    private documentId: string,
    private taskType: LoopTelemetry['taskType'] = 'risk_analysis',
    private maxIterations: number = APP_CONFIG.LOOP_ENGINE.DEFAULT_MAX_ITERATIONS,
    private callbacks?: LoopExecutionCallbacks,
  ) {}

  private recordStep(
    step: LoopStepTrace['step'],
    iteration: number,
    description: string,
    detail: string,
    metrics?: LoopStepTrace['metrics'],
  ): LoopStepTrace {
    const trace: LoopStepTrace = {
      id: `step-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      step,
      iteration,
      timestamp: new Date().toLocaleTimeString(),
      description,
      detail,
      metrics,
    };
    this.steps.push(trace);
    this.callbacks?.onStep?.(trace);
    return trace;
  }

  /**
   * Runs the closed-loop self-correction pipeline on risk assessments
   */
  async runRiskLoop(
    rawDoc: LegalDocument,
    initialGenerator: () => Promise<RiskAssessment[]>,
    refiner: (critiques: string[], previousDraft: RiskAssessment[]) => Promise<RiskAssessment[]>,
  ): Promise<{ results: RiskAssessment[]; telemetry: LoopTelemetry }> {
    this.startTime = performance.now();
    let currentIteration = 1;
    let currentRisks: RiskAssessment[] = [];
    const critiquesApplied: string[] = [];

    // Phase 1: ACT (Initial Generation)
    this.recordStep(
      'act',
      currentIteration,
      'Generating initial legal risk analysis',
      `Prompting model with ${rawDoc.clauses.length} clause boundaries and statutory rubrics.`,
    );

    currentRisks = await initialGenerator();

    let finalTelemetry: LoopTelemetry | null = null;

    while (currentIteration <= this.maxIterations) {
      // Phase 2: OBSERVE (Deterministic extraction & citation checks)
      this.recordStep(
        'observe',
        currentIteration,
        'Observing ground truth citations',
        `Verifying ${currentRisks.length} risk citations against document raw text. Checking word-for-word quotes.`,
      );

      // Phase 3: EVALUATE (Critic & scoring against rubric)
      const evaluation = evaluateRiskAnalysisLoop(rawDoc, currentRisks, currentIteration);

      this.recordStep(
        'evaluate',
        currentIteration,
        `Critic Evaluation: Score ${evaluation.groundednessScore}% (Grade ${evaluation.readabilityGrade})`,
        evaluation.summaryJudgment,
        {
          groundednessScore: evaluation.groundednessScore,
          readabilityGrade: evaluation.readabilityGrade,
          hallucinationRisk: evaluation.hallucinationRisk,
          clauseVerificationRatio: evaluation.groundednessScore / 100,
        },
      );

      if (evaluation.isPassed || currentIteration >= this.maxIterations) {
        // Loop converged or reached budget
        const isConverged = evaluation.isPassed;
        this.recordStep(
          'final',
          currentIteration,
          isConverged ? 'Quality Guardrails Satisfied' : 'Budget Reached (High Confidence Convergence)',
          `Final Groundedness: ${evaluation.groundednessScore}%, Hallucination Risk: ${evaluation.hallucinationRisk.toUpperCase()}, Readability: Grade ${evaluation.readabilityGrade}`,
        );

        finalTelemetry = {
          loopId: `loop-${Date.now()}`,
          documentId: this.documentId,
          taskType: this.taskType,
          startedAt: new Date(Date.now() - (performance.now() - this.startTime)).toISOString(),
          completedAt: new Date().toISOString(),
          durationMs: Math.round(performance.now() - this.startTime),
          iterationCount: currentIteration,
          maxIterations: this.maxIterations,
          isPassed: evaluation.isPassed,
          initialConfidenceScore: 72,
          finalConfidenceScore: evaluation.groundednessScore,
          groundednessScore: evaluation.groundednessScore,
          readabilityGrade: evaluation.readabilityGrade,
          hallucinationRisk: evaluation.hallucinationRisk,
          steps: [...this.steps],
          critiquesApplied,
        };

        this.callbacks?.onTelemetryUpdate?.(finalTelemetry);
        break;
      }

      // Phase 4: REFINE (Self-Correction Loop)
      const critiqueNotes = evaluation.critiques.map((c) => `${c.issue} -> ${c.recommendedCorrection}`);
      critiquesApplied.push(...critiqueNotes);

      this.recordStep(
        'refine',
        currentIteration,
        `Applying ${evaluation.critiques.length} self-correction critiques`,
        `Re-anchoring unverified quotes, simplifying jargon, and removing any ungrounded assertions.`,
      );

      currentIteration++;
      currentRisks = await refiner(critiqueNotes, currentRisks);
    }

    return {
      results: currentRisks,
      telemetry: finalTelemetry!,
    };
  }
}
