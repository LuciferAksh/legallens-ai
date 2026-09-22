import { DocumentType, RiskSeverity, RiskCategory } from '../types/legal';

export const APP_CONFIG = {
  APP_NAME: 'LegalLens AI',
  VERSION: '1.0.0',
  DEFAULT_MODEL: 'gemini-2.0-flash',
  MAX_FILE_SIZE_MB: 10,
  MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024,
  SUPPORTED_EXTENSIONS: ['.pdf', '.docx', '.txt'],
  SUPPORTED_MIME_TYPES: [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  STORAGE_KEYS: {
    API_KEY: 'legallens_gemini_key',
    ACTIVE_DOC: 'legallens_active_doc',
    THEME: 'legallens_theme',
  },
  LOOP_ENGINE: {
    DEFAULT_MAX_ITERATIONS: 3,
    DEFAULT_GROUNDEDNESS_THRESHOLD: 85,
    TARGET_READABILITY_GRADE: 8,
  },
};

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, { label: string; icon: string; description: string }> = {
  rental_agreement: {
    label: 'Residential / Commercial Lease',
    icon: 'Home',
    description: 'Tenancy agreements, security deposits, lock-in periods, notice terms, and maintenance obligations.',
  },
  employment_contract: {
    label: 'Employment & Offer Letters',
    icon: 'Briefcase',
    description: 'Compensation structures, probation, notice periods, non-compete clauses, and IP assignments.',
  },
  insurance_policy: {
    label: 'Insurance Policy & Terms',
    icon: 'Shield',
    description: 'Exclusions, co-pay clauses, pre-existing condition waiting times, and claim settlement conditions.',
  },
  terms_of_service: {
    label: 'Terms of Service / EULA',
    icon: 'FileText',
    description: 'User rights, subscription renewals, arbitration clauses, data licensing, and liability waivers.',
  },
  nda: {
    label: 'Non-Disclosure Agreement',
    icon: 'Lock',
    description: 'Confidentiality boundaries, exclusions, survival periods, and remedies for disclosure.',
  },
  loan_agreement: {
    label: 'Loan & Financial Facility',
    icon: 'CreditCard',
    description: 'Interest rates, default penalties, foreclosure charges, collateral, and acceleration clauses.',
  },
  freelance_service_agreement: {
    label: 'Freelance & Service Contract',
    icon: 'Code',
    description: 'Deliverables, milestone payments, revision limits, scope creep protections, and ownership.',
  },
  partnership_deed: {
    label: 'Partnership Deed & LLP',
    icon: 'Users',
    description: 'Profit sharing ratios, capital contributions, dispute mechanisms, and dissolution protocols.',
  },
  general_contract: {
    label: 'Standard Contract / Agreement',
    icon: 'ScrollText',
    description: 'General legal agreements, vendor contracts, sales deeds, or generic contractual instruments.',
  },
};

export const RISK_SEVERITY_CONFIG: Record<
  RiskSeverity,
  { label: string; color: string; bgColor: string; borderColor: string; badgeClass: string }
> = {
  critical: {
    label: 'Critical Risk',
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/40',
    borderColor: 'border-red-200 dark:border-red-800',
    badgeClass: 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200 border-red-300',
  },
  high: {
    label: 'High Concern',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    borderColor: 'border-orange-200 dark:border-orange-800',
    badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200 border-orange-300',
  },
  medium: {
    label: 'Medium Caution',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-200 dark:border-amber-800',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 border-amber-300',
  },
  low: {
    label: 'Low Note',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    borderColor: 'border-blue-200 dark:border-blue-800',
    badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border-blue-300',
  },
  safe: {
    label: 'Standard / Safe',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border-emerald-300',
  },
};

export const RISK_CATEGORY_LABELS: Record<RiskCategory, string> = {
  financial: 'Financial & Payment Risks',
  liability: 'Liability & Indemnity Exposure',
  termination: 'One-Sided Termination & Lock-in',
  penalty: 'Disproportionate Penalties & Forfeitures',
  ip_rights: 'Broad IP Ownership & Assignment',
  non_compete: 'Restrictive Covenants & Non-Compete',
  dispute_resolution: 'Unfair Jurisdiction & Costly Arbitration',
  privacy_data: 'Overreaching Data Collection & Usage',
  indemnification: 'Unlimited Indemnity Obligations',
  compliance: 'Statutory & Regulatory Compliance',
};
