/**
 * Contract Comparison Prompt
 * Performs semantic clause-by-clause diffing and impact evaluation between two contract versions.
 */

export function buildComparisonPrompt(textA: string, textB: string): string {
  return `You are a specialist contract attorney specializing in document redlines and counter-proposal negotiations.

Compare Document A (Original / Landlord / Employer Draft) with Document B (Revised / Counter-Proposal Draft).

Document A:
"""
${textA.slice(0, 5000)}
"""

Document B:
"""
${textB.slice(0, 5000)}
"""

Task:
1. Provide an executive summary of how the two documents differ in overall tone, balance, and risk profile.
2. Group comparison by key contractual topics (e.g., Term & Lock-in, Rent & Late Fees, Security Deposit & Refund, Repairs & Maintenance, Termination & Notice, Governing Law).
3. Evaluate whether changes are "material" (substantive legal/financial shift), "minor", or "cosmetic".
4. Determine which document is more favorable to the individual/consumer/signing party.
5. Provide practical recommendations for final execution.

Return ONLY a valid JSON object in this schema:
{
  "overallComparisonSummary": "High-level summary of the critical changes between Document A and Document B.",
  "majorTakeaways": [
    "Key difference 1",
    "Key difference 2"
  ],
  "recommendationWinner": "doc_b",
  "clausesComparison": [
    {
      "id": "comp-1",
      "topic": "Security Deposit & Refund Timeline",
      "clauseA": {
        "section": "Section 3",
        "text": "Brief excerpt of Doc A",
        "summary": "Plain English summary of Doc A term"
      },
      "clauseB": {
        "section": "Section 3",
        "text": "Brief excerpt of Doc B",
        "summary": "Plain English summary of Doc B term"
      },
      "status": "modified",
      "materiality": "material",
      "favorability": "favors_doc_b",
      "analysis": "Explains how the revised draft protects tenant capital by shortening refund from 90 days to 15 days.",
      "recommendation": "Accept Doc B revision; this is a standard and necessary tenant protection."
    }
  ]
}`;
}
