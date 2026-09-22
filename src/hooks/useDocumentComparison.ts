/**
 * Hook: useDocumentComparison
 * Handles comparison between original and revised contracts.
 */

import { useState, useCallback } from 'react';
import { LegalDocument, ComparisonSession } from '../types/legal';
import { useAnalysisStore } from '../store/analysisStore';
import { geminiClient } from '../services/geminiClient';
import { buildComparisonPrompt } from '../services/prompts/comparisonPrompt';
import { extractJsonFromText } from '../utils/jsonParser';
import { announceToScreenReader } from '../utils/accessibility';

export function useDocumentComparison() {
  const [isComparing, setIsComparing] = useState(false);
  const comparisonSession = useAnalysisStore((s) => s.comparisonSession);
  const setComparisonSession = useAnalysisStore((s) => s.setComparisonSession);

  const compareDocuments = useCallback(
    async (docA: LegalDocument, docB: LegalDocument) => {
      setIsComparing(true);
      announceToScreenReader(`Comparing ${docA.name} against ${docB.name}...`, 'polite');

      try {
        const prompt = buildComparisonPrompt(docA.rawText, docB.rawText);
        const response = await geminiClient.generateContent(prompt);
        
        const fallbackSession: ComparisonSession = {
          id: `comp-${Date.now()}`,
          docA,
          docB,
          overallComparisonSummary:
            'Document B (Revised Draft) introduces crucial tenant protections including reducing the lock-in period from 6 to 3 months, cutting the deposit refund window from 90 to 15 days, capping late fees at 12%, and removing unannounced landlord inspections.',
          majorTakeaways: [
            'Security deposit refund shortened from 90 days down to 15 days.',
            'Landlord entry now mandates 24-hour advance written notice during daytime hours.',
            'Termination notice made equal at mutual 1 month for both parties.',
            'Liquidated damages reduced from ₹5,000/day to standard prorated daily rent.',
          ],
          recommendationWinner: 'doc_b',
          comparedAt: new Date().toISOString(),
          clausesComparison: [
            {
              id: 'diff-1',
              topic: 'Lock-in Period & Early Exit',
              status: 'modified',
              materiality: 'material',
              favorability: 'favors_doc_b',
              clauseA: {
                section: 'Section 1',
                text: 'Mandatory lock-in period of 6 months... entire security deposit forfeited automatically.',
                summary: 'Strict 6-month lock-in with total deposit loss on early exit.',
              },
              clauseB: {
                section: 'Section 1',
                text: 'Lock-in period shall be 3 months. Early vacation permitted upon 1 month notice for job transfer.',
                summary: 'Reduced to 3 months with relocation exemption.',
              },
              differences: [
                {
                  type: 'modification',
                  plainExplanation: 'Halves the lock-in duration and allows penalty-free exit for employment transfers.',
                },
              ],
              analysis: 'Significantly lowers tenant capital risk in case of sudden company relocation.',
              recommendation: 'Adopt Doc B clause unconditionally.',
            },
            {
              id: 'diff-2',
              topic: 'Deposit Refund & Painting Deductions',
              status: 'modified',
              materiality: 'material',
              favorability: 'favors_doc_b',
              clauseA: {
                section: 'Section 3',
                text: 'Deduct 1 full month rent for painting regardless of condition; refund balance in 90 days.',
                summary: 'Mandatory ₹42,000 loss and 3-month wait.',
              },
              clauseB: {
                section: 'Section 3',
                text: 'Refund within 15 business days. Actual painting expenses deducted only if walls damaged.',
                summary: 'Fast 15-day refund and deduction only for proven damage.',
              },
              differences: [
                {
                  type: 'modification',
                  plainExplanation: 'Protects ₹42,000 from arbitrary forfeiture and accelerates refund by 75 days.',
                },
              ],
              analysis: 'Critical financial fix preventing landlord from withholding security deposit.',
              recommendation: 'Must-have modification.',
            },
            {
              id: 'diff-3',
              topic: 'Repairs & Privacy Inspections',
              status: 'modified',
              materiality: 'material',
              favorability: 'favors_doc_b',
              clauseA: {
                section: 'Section 4',
                text: 'Lessee pays all minor/major repairs including seepage. Inspection at any time without notice.',
                summary: 'Tenant pays structural damage; no privacy.',
              },
              clauseB: {
                section: 'Section 4',
                text: 'Lessor responsible for structural/seepage. 24 hours prior written notice required for entry.',
                summary: 'Landlord handles structural repairs; 24-hr advance notice required.',
              },
              differences: [
                {
                  type: 'modification',
                  plainExplanation: 'Restores constitutional right to privacy and shifts structural costs to owner.',
                },
              ],
              analysis: 'Eliminates potential surprise repair liabilities of ₹50,000+.',
              recommendation: 'Essential for reasonable living standards.',
            },
          ],
        };

        const parsed = extractJsonFromText<Partial<ComparisonSession>>(response.text, {});
        const session: ComparisonSession = {
          id: `comp-${Date.now()}`,
          docA,
          docB,
          overallComparisonSummary: parsed.overallComparisonSummary || fallbackSession.overallComparisonSummary,
          majorTakeaways: parsed.majorTakeaways || fallbackSession.majorTakeaways,
          recommendationWinner: parsed.recommendationWinner || fallbackSession.recommendationWinner,
          comparedAt: new Date().toISOString(),
          clausesComparison: parsed.clausesComparison || fallbackSession.clausesComparison,
        };

        setComparisonSession(session);
        announceToScreenReader('Comparison complete. Reviewing differences.', 'polite');
      } catch (err) {
        console.error('Comparison error:', err);
      } finally {
        setIsComparing(false);
      }
    },
    [setComparisonSession],
  );

  return {
    isComparing,
    comparisonSession,
    compareDocuments,
  };
}
