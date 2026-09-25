/**
 * Clause Extractor & Legal Hierarchy Segmentation Engine
 * Implements clause-boundary parsing rather than naive chunking
 * to preserve full legal context, cross-references, and traceability.
 */

import { Clause, DocumentType } from '../types/legal';
import { calculateFleschKincaidGrade } from '../utils/textProcessing';

const SECTION_HEADER_PATTERNS = [
  // "1. TERM AND TENURE" or "1.1 Notice Period"
  /^(\d+(?:\.\d+)*)\.?[ \t]+([A-Z0-9 \t,/\-()&]{3,80})/m,
  // "SECTION 1: TERM" or "Section 4. Termination"
  /^(?:SECTION|Section|CLAUSE|Clause|ARTICLE|Article)\s+([A-Z0-9IVXLCDM.]+)(?::|\.|\s+-)?\s+([^\n\r]{3,80})/m,
  // "SCHEDULE A" or "ANNEXURE I"
  /^(?:SCHEDULE|Schedule|ANNEXURE|Annexure|EXHIBIT|Exhibit)\s+([A-Z0-9IVXLCDM.]+)(?::|\.|\s+-)?\s+([^\n\r]{3,80})/m,
];

export function extractClausesFromText(text: string, docType: DocumentType = 'general_contract'): Clause[] {
  if (!text || text.trim().length === 0) return [];

  // Normalize newlines
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const paragraphs = normalized.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  const rawSections: { number: string; title: string; body: string[] }[] = [];
  let currentSection = {
    number: 'Preamble',
    title: 'Recitals & Initial Definitions',
    body: [] as string[],
  };

  for (const para of paragraphs) {
    let matchedHeader = false;

    for (const pattern of SECTION_HEADER_PATTERNS) {
      const match = para.match(pattern);
      if (match && match.index === 0) {
        // We hit a new section
        if (currentSection.body.length > 0 || currentSection.number !== 'Preamble') {
          rawSections.push({ ...currentSection });
        }

        const sectionNum = match[1].trim();
        const sectionTitle = match[2].trim().replace(/[:.-]+$/, '');
        const remainder = para.slice(match[0].length).trim();

        currentSection = {
          number: sectionNum,
          title: sectionTitle,
          body: remainder ? [remainder] : [],
        };
        matchedHeader = true;
        break;
      }
    }

    if (!matchedHeader) {
      currentSection.body.push(para);
    }
  }

  // Push the final section
  if (currentSection.body.length > 0) {
    rawSections.push(currentSection);
  }

  // If the document had no formal numbered headings, fallback to paragraph-level splitting
  if (rawSections.length <= 1 && paragraphs.length > 1) {
    return paragraphs.map((para, index) => {
      const firstLine = para.split('\n')[0].slice(0, 50);
      return {
        id: `clause-${index + 1}`,
        clauseNumber: `${index + 1}`,
        title: firstLine.length > 40 ? `${firstLine}...` : firstLine,
        sectionPath: `Paragraph ${index + 1}`,
        rawText: para,
        plainLanguageSummary: '',
        riskLevel: 'safe',
        obligations: [],
        rights: [],
        isStandardClause: true,
      };
    });
  }

  // Map raw sections into structured Clause objects
  return rawSections.map((sec, index) => {
    const rawContent = sec.body.join('\n\n').trim();
    const clauseId = `clause-${index + 1}`;
    const sectionPath = sec.number === 'Preamble' ? 'Preamble' : `Section ${sec.number} > ${sec.title}`;

    return {
      id: clauseId,
      clauseNumber: sec.number,
      title: sec.title || `Clause ${sec.number}`,
      sectionPath,
      rawText: rawContent || sec.title,
      plainLanguageSummary: '', // Will be enriched by Generator or heuristic
      simplifiedReadabilityScore: calculateFleschKincaidGrade(rawContent),
      riskLevel: evaluatePreliminaryClauseRisk(sec.title, rawContent, docType),
      obligations: [],
      rights: [],
      isStandardClause: isStandardClauseTopic(sec.title),
    };
  });
}

function isStandardClauseTopic(title: string): boolean {
  const standardTopics = [
    'term',
    'tenure',
    'rent',
    'deposit',
    'severability',
    'governing law',
    'entire agreement',
    'notice',
    'confidentiality',
    'counterparts',
  ];
  const lower = title.toLowerCase();
  return standardTopics.some((t) => lower.includes(t));
}

function evaluatePreliminaryClauseRisk(
  title: string,
  content: string,
  _docType: DocumentType,
): Clause['riskLevel'] {
  const combined = `${title} ${content}`.toLowerCase();

  // Critical patterns across all contract domains:
  // - Real Estate: automatic deposit forfeiture, unannounced entry
  // - Employment: void non-compete, personal software indemnity
  // - NDAs: perpetual confidentiality, liquidated damages, injunction without bond
  // - Freelance/SaaS: pre-payment IP transfer, uncapped contractor liability
  // - Insurance: proportionate deduction penalty, claim notice forfeiture
  // - Loans: subjective acceleration recall, blanket lien on personal assets, 24%+ compound penal interest
  if (
    combined.includes('forfeited automatically') ||
    combined.includes('sole discretion without assigning reason') ||
    combined.includes('indemnify, defend, and hold harmless') ||
    combined.includes('non-compete') ||
    combined.includes('restraint of trade') ||
    combined.includes('liquidated damages') ||
    combined.includes('without the necessity of posting any bond') ||
    combined.includes('transfer and vest in client immediately upon creation') ||
    combined.includes('proportionate deduction') ||
    combined.includes('declare the entire outstanding principal immediately due') ||
    combined.includes('absolute forfeiture and rejection of the entire claim') ||
    combined.includes('negative lien is created over all personal bank accounts')
  ) {
    return 'critical';
  }

  // High patterns: penalty rates, long holdbacks, asymmetric notice, co-pays
  if (
    combined.includes('without prior written notice') ||
    combined.includes('lock-in') ||
    combined.includes('withhold relieving') ||
    combined.includes('sole arbitrator appointed exclusively') ||
    combined.includes('interest penalty of 24%') ||
    combined.includes('penal interest of 24%') ||
    combined.includes('net 90') ||
    combined.includes('perpetually in perpetuity') ||
    combined.includes('co-payment of 20%') ||
    combined.includes('foreclosure penalty') ||
    combined.includes('room rent is capped') ||
    combined.includes('pre-existing disease')
  ) {
    return 'high';
  }

  // Medium patterns: standard commercial friction terms
  if (
    combined.includes('probation') ||
    combined.includes('maintenance charges') ||
    combined.includes('prior written consent') ||
    combined.includes('net 60') ||
    combined.includes('work made for hire') ||
    combined.includes('subrogation') ||
    combined.includes('benchmark floating rate')
  ) {
    return 'medium';
  }

  return 'safe';
}
