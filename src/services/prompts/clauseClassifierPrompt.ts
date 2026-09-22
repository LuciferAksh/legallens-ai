/**
 * Clause Classification & Anomaly Detector Prompt
 */

import { Clause } from '../../types/legal';

export function buildClauseClassifierPrompt(clause: Clause): string {
  return `You are an automated legal clause taxonomist and anomaly detector.

Clause Title: ${clause.title}
Section Reference: ${clause.sectionPath}
Clause Text:
"""
${clause.rawText}
"""

Instructions:
1. Classify this clause into one primary category: financial, liability, termination, penalty, ip_rights, non_compete, dispute_resolution, privacy_data, indemnification, or compliance.
2. Determine if this clause is standard boilerplate or if it contains non-standard / unusual / aggressive covenants.
3. If Indian law applies, identify any statutory provision (e.g., Section 27, 73, 74 Indian Contract Act 1872; Section 12 Arbitration & Conciliation Act 1996; Transfer of Property Act 1882) directly relevant to this clause.

Return ONLY a JSON object:
{
  "category": "termination",
  "isStandard": false,
  "riskLevel": "high",
  "anomalies": ["Specific unusual requirement 1"],
  "indianLawReference": "Statutory section or landmark precedent if applicable"
}`;
}
