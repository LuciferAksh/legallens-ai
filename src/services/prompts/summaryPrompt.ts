/**
 * Document Summary, Actionable Checklist & Lawyer Preparation Guide Prompt
 */

import { LegalDocument } from '../../types/legal';

export function buildSummaryPrompt(doc: LegalDocument): string {
  const clauseSample = doc.clauses
    .slice(0, 15)
    .map((c) => `[${c.clauseNumber}] ${c.sectionPath}:\n${c.rawText}`)
    .join('\n\n');

  return `You are a legal summarizer and consumer advocacy strategist.
Document Name: ${doc.name}
Document Type: ${doc.metadata.detectedType}
Jurisdiction Hint: ${doc.metadata.jurisdictionHint || 'Republic of India'}

Document Clauses:
"""
${clauseSample || doc.rawText.slice(0, 6000)}
"""

Task:
Analyze the document and produce a complete, highly structured intelligence report containing:
1. Executive Summary: High-level overview (150-200 words) explaining purpose, main parties, key commitments, and standout red flags.
2. Overall Risk Score: Numeric score 0 to 100 (where 0 is completely standard/safe, and 100 is predatory/hazardous) + severity label.
3. Key Terms Glossary: Identify 3-5 critical legal or defined terms (e.g. liquidated damages, lock-in period, indemnity) with plain English explanations and why it matters to the reader.
4. Actionable Next Steps Checklist: 4-6 specific, concrete steps the user must take (before signing, during term, for record keeping).
5. Lawyer Consultation Preparation Guide: 2-4 strategic questions the user should ask an advocate or legal advisor, including which clauses to bring to their attention.

Respond ONLY with a JSON object in this exact schema:
{
  "executiveSummary": "Concise plain-English breakdown of this document.",
  "overallRiskScore": 75,
  "overallRiskSeverity": "critical",
  "keyTerms": [
    {
      "term": "Term Name",
      "definedInClause": "Section X",
      "legalMeaning": "Formal legal definition",
      "plainEnglishExplanation": "What it means in normal words",
      "whyItMattersToYou": "Practical implication"
    }
  ],
  "checklist": [
    {
      "id": "chk-1",
      "category": "before_signing",
      "action": "Actionable task to execute",
      "sourceSection": "Section X",
      "priority": "must_do",
      "completed": false
    }
  ],
  "lawyerPrepGuide": [
    {
      "id": "lp-1",
      "topic": "Topic Name",
      "specificClauseReference": "Section X",
      "suggestedQuestion": "Exact wording of the question to ask your lawyer",
      "contextWhyAsk": "Why this question is critical to ask",
      "documentsToBring": ["Item 1", "Item 2"],
      "targetOutcome": "What you want your lawyer to help negotiate"
    }
  ]
}`;
}
