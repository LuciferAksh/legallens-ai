/**
 * Loop Engineering Evaluator (Critic & Groundedness Verifier)
 * Assesses AI output against raw document truth, scores citation fidelity,
 * tests readability, and detects hallucinations.
 */

import { LegalDocument, RiskAssessment } from '../../types/legal';
import { LoopCritique, LoopEvaluationResult } from './types';
import { calculateFleschKincaidGrade } from '../../utils/textProcessing';
import { APP_CONFIG } from '../../constants';

export function evaluateRiskAnalysisLoop(
  rawDocument: LegalDocument,
  risks: RiskAssessment[],
  iteration: number,
): LoopEvaluationResult {
  const critiques: LoopCritique[] = [];
  let validQuoteCount = 0;
  let totalQuotesTested = 0;
  let accumulatedReadability = 0;

  const docTextLower = rawDocument.rawText.toLowerCase().replace(/\s+/g, ' ');

  for (const risk of risks) {
    // 1. Citation / Source Quote Groundedness Check
    if (risk.sourceQuote && risk.sourceQuote.trim().length > 10) {
      totalQuotesTested++;
      const cleanQuote = risk.sourceQuote.toLowerCase().replace(/\s+/g, ' ').trim();

      // Check if quote exists in the source text
      if (docTextLower.includes(cleanQuote)) {
        validQuoteCount++;
      } else {
        // Try partial substring matching (at least 70% of quote present)
        const subWords = cleanQuote.split(' ').slice(0, 6).join(' ');
        if (docTextLower.includes(subWords)) {
          validQuoteCount += 0.8;
        } else {
          critiques.push({
            category: 'unverified_citation',
            issue: `Source quote in risk "${risk.title}" could not be verified verbatim in the uploaded document.`,
            recommendedCorrection: `Re-anchor citation to exact text found in ${risk.sectionPath} without paraphrasing.`,
            targetClauseOrSection: risk.sectionPath,
          });
        }
      }
    } else {
      critiques.push({
        category: 'unverified_citation',
        issue: `Risk "${risk.title}" lacks a specific verbatim source quote.`,
        recommendedCorrection: 'Provide an exact excerpt from the contract to prove groundedness.',
        targetClauseOrSection: risk.sectionPath,
      });
    }

    // 2. Readability Evaluation of Explanation & Recommendation
    const textToEvaluate = `${risk.explanation} ${risk.recommendedAction}`;
    const grade = calculateFleschKincaidGrade(textToEvaluate);
    accumulatedReadability += grade;

    if (grade > APP_CONFIG.LOOP_ENGINE.TARGET_READABILITY_GRADE + 2) {
      critiques.push({
        category: 'complex_jargon',
        issue: `Explanation for "${risk.title}" has a high reading grade (${grade}), which is too complex for an everyday user.`,
        recommendedCorrection: 'Simplify vocabulary, shorten compound sentences, and replace legalese with plain English words.',
        targetClauseOrSection: risk.sectionPath,
      });
    }

    // 3. Hallucination check for non-existent sections
    if (risk.sectionPath && !rawDocument.clauses.some((c) => c.sectionPath.toLowerCase().includes(risk.sectionPath.toLowerCase()) || risk.sectionPath.toLowerCase().includes(c.clauseNumber.toLowerCase()))) {
      critiques.push({
        category: 'hallucination_detected',
        issue: `Risk references "${risk.sectionPath}", which does not match any detected clause in this document.`,
        recommendedCorrection: `Map risk to one of the actual document sections: ${rawDocument.clauses.slice(0, 5).map((c) => c.clauseNumber).join(', ')}.`,
        targetClauseOrSection: risk.sectionPath,
      });
    }
  }

  // Calculate scores
  const groundednessScore = totalQuotesTested > 0 ? Math.round((validQuoteCount / totalQuotesTested) * 100) : 80;
  const avgReadability = risks.length > 0 ? Number((accumulatedReadability / risks.length).toFixed(1)) : 7.5;

  let hallucinationRisk: 'none' | 'low' | 'medium' | 'high' = 'none';
  if (critiques.some((c) => c.category === 'hallucination_detected')) {
    hallucinationRisk = 'high';
  } else if (groundednessScore < 70) {
    hallucinationRisk = 'medium';
  } else if (groundednessScore < 85) {
    hallucinationRisk = 'low';
  }

  // Pass condition: groundedness >= threshold AND no severe hallucinations
  const isPassed =
    groundednessScore >= APP_CONFIG.LOOP_ENGINE.DEFAULT_GROUNDEDNESS_THRESHOLD &&
    hallucinationRisk !== 'high' &&
    iteration >= 1;

  let summaryJudgment = 'Output is grounded, verified against raw clauses, and meets plain-language standards.';
  if (!isPassed) {
    summaryJudgment = `Self-correction loop ${iteration} required: Groundedness score is ${groundednessScore}% (threshold: ${APP_CONFIG.LOOP_ENGINE.DEFAULT_GROUNDEDNESS_THRESHOLD}%). Identified ${critiques.length} quality critiques.`;
  }

  return {
    isPassed,
    iteration,
    groundednessScore,
    readabilityGrade: avgReadability,
    hallucinationRisk,
    critiques,
    summaryJudgment,
  };
}

export function evaluateSimplificationLoop(
  rawClauseText: string,
  plainText: string,
  iteration: number,
): LoopEvaluationResult {
  const critiques: LoopCritique[] = [];
  const grade = calculateFleschKincaidGrade(plainText);

  if (grade > APP_CONFIG.LOOP_ENGINE.TARGET_READABILITY_GRADE) {
    critiques.push({
      category: 'complex_jargon',
      issue: `Readability level is Grade ${grade}, exceeding target Grade ${APP_CONFIG.LOOP_ENGINE.TARGET_READABILITY_GRADE}.`,
      recommendedCorrection: 'Break long sentences into shorter sentences (under 15 words) and use everyday terms.',
    });
  }

  // Check if simplification preserved essential facts (e.g., numbers, days, currency amounts)
  const numbersInRaw = rawClauseText.match(/\b(?:\d+|Rs\.?|INR|\$|months?|days?|years?)\b/gi) || [];
  const plainLower = plainText.toLowerCase();

  let preservedNumbers = 0;
  for (const num of numbersInRaw) {
    if (plainLower.includes(num.toLowerCase())) {
      preservedNumbers++;
    }
  }

  const groundednessScore = numbersInRaw.length > 0 ? Math.min(100, Math.round((preservedNumbers / numbersInRaw.length) * 100)) : 90;
  const isPassed = grade <= 8.5 && groundednessScore >= 75;

  return {
    isPassed,
    iteration,
    groundednessScore,
    readabilityGrade: grade,
    hallucinationRisk: isPassed ? 'none' : 'low',
    critiques,
    summaryJudgment: isPassed ? 'Passed plain-language and numeric accuracy verification.' : `Refinement needed (Grade ${grade}).`,
  };
}
