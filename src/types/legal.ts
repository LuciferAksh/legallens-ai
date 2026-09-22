/**
 * LegalLens Core Domain Types
 * Strict typing across document processing, clause segmentation,
 * risk scoring, contract comparison, and actionable guidance.
 */

export type DocumentType =
  | 'rental_agreement'
  | 'employment_contract'
  | 'insurance_policy'
  | 'terms_of_service'
  | 'nda'
  | 'loan_agreement'
  | 'freelance_service_agreement'
  | 'partnership_deed'
  | 'general_contract';

export type RiskSeverity = 'critical' | 'high' | 'medium' | 'low' | 'safe';

export type RiskCategory =
  | 'financial'
  | 'liability'
  | 'termination'
  | 'penalty'
  | 'ip_rights'
  | 'non_compete'
  | 'dispute_resolution'
  | 'privacy_data'
  | 'indemnification'
  | 'compliance';

export type ObligationParty = 'user' | 'counterparty' | 'mutual' | 'third_party';

export type ObligationPriority = 'critical' | 'important' | 'routine';

export interface Obligation {
  id: string;
  clauseId: string;
  sectionReference: string;
  party: ObligationParty;
  description: string;
  deadlineOrTrigger?: string;
  consequenceOfBreach?: string;
  priority: ObligationPriority;
}

export interface LegalRight {
  id: string;
  clauseId: string;
  sectionReference: string;
  holder: ObligationParty;
  description: string;
  conditions?: string;
}

export interface Clause {
  id: string;
  clauseNumber: string;
  title: string;
  sectionPath: string; // e.g. "Article 4 > Section 4.2 > Termination for Cause"
  rawText: string;
  plainLanguageSummary: string;
  simplifiedReadabilityScore?: number; // Flesch-Kincaid Grade level
  riskLevel: RiskSeverity;
  riskCategory?: RiskCategory;
  obligations: Obligation[];
  rights: LegalRight[];
  isStandardClause: boolean;
  unusualAspects?: string[];
  indianLawReference?: string; // e.g. "Section 27, Indian Contract Act 1872"
}

export interface RiskAssessment {
  id: string;
  clauseId: string;
  clauseTitle: string;
  sectionPath: string;
  severity: RiskSeverity;
  category: RiskCategory;
  sourceQuote: string;
  title: string;
  explanation: string;
  practicalImpact: string;
  recommendedAction: string;
  suggestedNegotiationRedline?: string;
  legalBasisOrJurisdictionNotice?: string;
}

export type DiffChangeType = 'unchanged' | 'modified' | 'added' | 'removed';

export interface DiffDifference {
  type: 'addition' | 'deletion' | 'modification';
  textA?: string;
  textB?: string;
  plainExplanation: string;
}

export interface ClauseComparison {
  id: string;
  topic: string;
  clauseA?: {
    section: string;
    text: string;
    summary: string;
  };
  clauseB?: {
    section: string;
    text: string;
    summary: string;
  };
  status: DiffChangeType;
  materiality: 'material' | 'minor' | 'cosmetic';
  differences: DiffDifference[];
  favorability: 'favors_doc_a' | 'favors_doc_b' | 'neutral' | 'unfavorable_both';
  analysis: string;
  recommendation: string;
}

export interface KeyTermDefinition {
  term: string;
  definedInClause?: string;
  legalMeaning: string;
  plainEnglishExplanation: string;
  whyItMattersToYou: string;
}

export interface ChecklistItem {
  id: string;
  category: 'before_signing' | 'during_term' | 'termination' | 'record_keeping';
  action: string;
  sourceSection?: string;
  priority: 'must_do' | 'should_do' | 'optional';
  completed: boolean;
  notes?: string;
}

export interface LawyerPrepItem {
  id: string;
  topic: string;
  specificClauseReference: string;
  suggestedQuestion: string;
  contextWhyAsk: string;
  documentsToBring: string[];
  targetOutcome: string;
}

export interface DocumentSummary {
  executiveSummary: string;
  overallRiskScore: number; // 0 (safest) to 100 (highest risk)
  overallRiskSeverity: RiskSeverity;
  totalClauses: number;
  criticalRisksCount: number;
  highRisksCount: number;
  mediumRisksCount: number;
  lowRisksCount: number;
  keyTerms: KeyTermDefinition[];
  obligationsSummary: {
    userCount: number;
    counterpartyCount: number;
    topObligations: Obligation[];
  };
  checklist: ChecklistItem[];
  lawyerPrepGuide: LawyerPrepItem[];
}

export interface DocumentMetadata {
  fileName: string;
  fileSize: number;
  fileType: 'pdf' | 'docx' | 'txt';
  pageCount?: number;
  wordCount: number;
  characterCount: number;
  detectedType: DocumentType;
  jurisdictionHint?: string;
  parsedAt: string;
}

export interface LegalDocument {
  id: string;
  name: string;
  metadata: DocumentMetadata;
  rawText: string;
  clauses: Clause[];
  summary?: DocumentSummary;
  risks?: RiskAssessment[];
  uploadedAt: string;
}

export interface ComparisonSession {
  id: string;
  docA: LegalDocument;
  docB: LegalDocument;
  overallComparisonSummary: string;
  clausesComparison: ClauseComparison[];
  majorTakeaways: string[];
  recommendationWinner?: 'doc_a' | 'doc_b' | 'renegotiate_both';
  comparedAt: string;
}

export interface ChatCitation {
  clauseNumber: string;
  sectionPath: string;
  quoteSnippet: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: ChatCitation[];
  suggestedFollowUps?: string[];
  isStreaming?: boolean;
}
