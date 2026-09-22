import { describe, it, expect } from 'vitest';
import { evaluateRiskAnalysisLoop, evaluateSimplificationLoop } from '../loopEngine/evaluator';
import { LoopRunner } from '../loopEngine/loopRunner';
import { SAMPLE_RENTAL_AGREEMENT } from '../../constants/sampleDocuments';
import { RiskAssessment } from '../../types/legal';

describe('Loop Engineering Engine', () => {
  it('passes high-fidelity grounded citations with 90%+ score', () => {
    const verifiedRisks: RiskAssessment[] = [
      {
        id: 'r1',
        clauseId: 'c1',
        clauseTitle: 'Term and Tenure',
        sectionPath: 'Section 1',
        severity: 'high',
        category: 'termination',
        sourceQuote: 'mandatory lock-in period of 6 (six) months',
        title: 'Lock-in Penalty',
        explanation: 'You cannot leave during the first six months.',
        practicalImpact: 'Loss of deposit if leaving early.',
        recommendedAction: 'Shorten lock-in to three months.',
      },
    ];

    const evaluation = evaluateRiskAnalysisLoop(SAMPLE_RENTAL_AGREEMENT, verifiedRisks, 1);
    expect(evaluation.groundednessScore).toBeGreaterThanOrEqual(90);
    expect(evaluation.isPassed).toBe(true);
    expect(evaluation.hallucinationRisk).toBe('none');
  });

  it('detects unverified or hallucinated quotes and triggers corrective critique', () => {
    const fakeQuoteRisk: RiskAssessment[] = [
      {
        id: 'r-fake',
        clauseId: 'c99',
        clauseTitle: 'Fake Clause',
        sectionPath: 'Section 99 > Imaginary Tax',
        severity: 'critical',
        category: 'financial',
        sourceQuote: 'tenant shall pay an imaginary tax of 500 percent every Sunday',
        title: 'Hallucinated Tax',
        explanation: 'Very bad term.',
        practicalImpact: 'High cost.',
        recommendedAction: 'Remove.',
      },
    ];

    const evaluation = evaluateRiskAnalysisLoop(SAMPLE_RENTAL_AGREEMENT, fakeQuoteRisk, 1);
    expect(evaluation.isPassed).toBe(false);
    expect(evaluation.groundednessScore).toBeLessThan(50);
    expect(evaluation.critiques.some((c) => c.category === 'unverified_citation')).toBe(true);
    expect(evaluation.critiques.some((c) => c.category === 'hallucination_detected')).toBe(true);
  });

  it('evaluates plain language simplification readability and preserved figures', () => {
    const rawClause = 'Rent is Rs. 42,000 payable on the 5th of each month for 11 months.';
    const goodPlain = 'You will pay Rs. 42,000 rent by the 5th day of every month for 11 months.';
    const evalResult = evaluateSimplificationLoop(rawClause, goodPlain, 1);

    expect(evalResult.isPassed).toBe(true);
    expect(evalResult.readabilityGrade).toBeLessThanOrEqual(8.5);
  });

  it('LoopRunner executes multi-step Act -> Observe -> Evaluate -> Refine cycle', async () => {
    const loopRunner = new LoopRunner(SAMPLE_RENTAL_AGREEMENT.id, 'risk_analysis', 2);

    const initialGen = async () => [
      {
        id: 'r1',
        clauseId: 'c1',
        clauseTitle: 'Term and Tenure',
        sectionPath: 'Section 1',
        severity: 'high' as const,
        category: 'termination' as const,
        sourceQuote: 'mandatory lock-in period of 6 (six) months',
        title: 'Lock-in Period',
        explanation: 'Short plain explanation.',
        practicalImpact: 'Impact note.',
        recommendedAction: 'Counter-propose.',
      },
    ];

    const refiner = async (_critiques: string[], draft: RiskAssessment[]) => draft;

    const { results, telemetry } = await loopRunner.runRiskLoop(
      SAMPLE_RENTAL_AGREEMENT,
      initialGen,
      refiner,
    );

    expect(results).toHaveLength(1);
    expect(telemetry.steps.length).toBeGreaterThanOrEqual(3);
    expect(telemetry.steps.some((s) => s.step === 'act')).toBe(true);
    expect(telemetry.steps.some((s) => s.step === 'observe')).toBe(true);
    expect(telemetry.steps.some((s) => s.step === 'evaluate')).toBe(true);
  });
});
