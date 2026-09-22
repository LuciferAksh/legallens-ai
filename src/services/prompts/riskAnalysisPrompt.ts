/**
 * Risk Assessment & Red Flag Detection Prompt
 * Analyzes clauses for unfavorable covenants, liability traps, and statutory violations.
 */

import { Clause, DocumentType } from '../../types/legal';

export function buildRiskAnalysisPrompt(
  clauses: Clause[],
  docType: DocumentType,
  jurisdictionHint?: string,
): string {
  const clauseSnippets = clauses
    .slice(0, 15) // Batch for token efficiency
    .map((c) => `[ID: ${c.id}] ${c.sectionPath}:\n"${c.rawText}"`)
    .join('\n\n---\n\n');

  return `You are a senior contract risk analyst and legal auditor.
Document Classification: ${docType}
Jurisdiction: ${jurisdictionHint || 'Republic of India'}

Review the following contract clauses and identify significant risks, imbalances, or red flags for the individual/consumer/signing party.

Document Clauses:
${clauseSnippets}

Risk Evaluation Rubric:
- CRITICAL: Complete forfeiture of funds, unlimited personal indemnity, post-employment global non-compete (void in India under Sec 27 Contract Act), unannounced warrantless entry, unilateral termination without cause under 15 days, unilateral appointment of sole arbitrator.
- HIGH: Disproportionate late fees (>18% p.a.), mandatory arbitrary painting deductions, 60+ day delay in returning deposits, wide IP assignment covering personal off-hours creations.
- MEDIUM: Extended probation without salary increase, maintenance ambiguities, notice period imbalances (e.g. 15 days vs 60 days).
- LOW / SAFE: Standard mutual boilerplate, statutory tax compliance, customary confidentiality.

Instructions:
For every identified risk, you MUST include:
1. Exact "sourceQuote" copied verbatim from the clause (this will be verified by our citation loop).
2. Practical, real-world impact (e.g., "You lose ₹42,000 immediately upon vacating").
3. Actionable recommendation & counter-proposal.
4. Suggested negotiation redline sentence.

Return ONLY a valid JSON array of objects conforming to this schema:
[
  {
    "clauseId": "c1",
    "clauseTitle": "Clause title",
    "sectionPath": "Section path",
    "severity": "critical",
    "category": "financial",
    "sourceQuote": "Exact verbatim quote from the clause",
    "title": "Clear punchy title of the risk",
    "explanation": "Why this clause is risky",
    "practicalImpact": "What actually happens to the user financially or operationally",
    "recommendedAction": "What the user should do before signing",
    "suggestedNegotiationRedline": "Clean substitute wording to propose",
    "legalBasisOrJurisdictionNotice": "Statutory citation (e.g. Sec 74 or Sec 27 Indian Contract Act 1872) if applicable"
  }
]`;
}
