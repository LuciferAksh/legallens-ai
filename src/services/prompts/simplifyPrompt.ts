/**
 * Plain Language Simplification Prompt
 * Translates legalese into accessible, 8th-grade plain English.
 */

import { Clause } from '../../types/legal';

export function buildSimplifyPrompt(clause: Clause, jurisdictionHint?: string): string {
  return `You are a public interest legal expert and plain-language specialist. Your mission is to democratize legal comprehension for everyday citizens.

Jurisdiction Context: ${jurisdictionHint || 'Republic of India / Common Law'}

Original Legal Clause:
Section Path: ${clause.sectionPath}
Title: ${clause.title}
Text:
"""
${clause.rawText}
"""

Instructions:
1. Explain what this clause means in plain, accessible English (targeting an 8th-grade reading level).
2. Avoid legal jargon; if a necessary legal concept appears (e.g. indemnity, lien, arbitration), immediately define it in brackets.
3. Explicitly explain:
   - What does the reader HAVE to do? (Obligations)
   - What does the reader GET? (Rights/Benefits)
   - What is the worst-case scenario if something goes wrong? (Hidden risks/traps)
4. Highlight any one-sided or unfair terms.
5. If Indian law applies, note any relevant statutory protections (e.g. Section 27 Contract Act, Model Tenancy Act).

Respond ONLY with a JSON object in this exact schema:
{
  "plainLanguageSummary": "2-3 clear, jargon-free sentences explaining the clause.",
  "whatYouMustDo": "Concise bullet point or explanation of the user's direct duties.",
  "whatYouGet": "Rights, protections, or benefits provided to the user, if any.",
  "hiddenTrapsOrRisks": "Specific risks, forfeitures, or harsh penalties lurking in this clause.",
  "readabilityLevel": "8th Grade",
  "isOneSided": true,
  "statutoryNotes": "Relevant statutory references or judicial precedents if applicable."
}`;
}
