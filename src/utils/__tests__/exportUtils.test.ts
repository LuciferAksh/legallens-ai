import { describe, it, expect } from 'vitest';
import { exportDocumentAnalysisMarkdown } from '../exportUtils';
import { SAMPLE_RENTAL_AGREEMENT } from '../../constants/sampleDocuments';

describe('exportUtils', () => {
  it('generates rich markdown report from document analysis', () => {
    const md = exportDocumentAnalysisMarkdown(SAMPLE_RENTAL_AGREEMENT);

    expect(md).toContain('# Legal Analysis Report:');
    expect(md).toContain(SAMPLE_RENTAL_AGREEMENT.name);
    expect(md).toContain('Executive Summary');
    expect(md).toContain('Critical Risks & Red Flags');
    expect(md).toContain('Actionable Next Steps Checklist');
    expect(md).toContain('Lawyer Consultation Brief');
    expect(md).toContain('DISCLAIMER:');
  });
});
