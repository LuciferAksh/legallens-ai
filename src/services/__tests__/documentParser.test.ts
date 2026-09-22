import { describe, it, expect } from 'vitest';
import { parseLegalDocument } from '../documentParser';

describe('documentParser service', () => {
  it('parses plain text contract file into structured LegalDocument', async () => {
    const textContent = `RESIDENTIAL LEASE AGREEMENT
1. TERM
The lease shall be for 11 months.

2. RENT
Lessee shall pay Rs. 40,000 rent per month in Bengaluru, Karnataka.`;

    const file = new File([textContent], 'lease.txt', { type: 'text/plain' });
    const result = await parseLegalDocument(file);

    expect(result.success).toBe(true);
    expect(result.document).toBeDefined();
    expect(result.document?.name).toBe('lease.txt');
    expect(result.document?.clauses.length).toBeGreaterThanOrEqual(2);
    expect(result.document?.metadata.detectedType).toBe('rental_agreement');
    expect(result.document?.metadata.jurisdictionHint).toContain('Karnataka');
  });

  it('handles empty or whitespace file gracefully', async () => {
    const file = new File(['   '], 'blank.txt', { type: 'text/plain' });
    const result = await parseLegalDocument(file);
    expect(result.success).toBe(false);
    expect(result.error).toContain('empty');
  });
});
