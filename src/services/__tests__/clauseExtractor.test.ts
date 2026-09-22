import { describe, it, expect } from 'vitest';
import { extractClausesFromText } from '../clauseExtractor';

describe('clauseExtractor service', () => {
  it('returns empty array for blank or whitespace text', () => {
    expect(extractClausesFromText('')).toEqual([]);
    expect(extractClausesFromText('   \n\n  ')).toEqual([]);
  });

  it('correctly segments formal numbered legal clauses', () => {
    const legalDoc = `1. TERM AND TENURE
The lease shall be for 11 months commencing April 2025.

2. MONTHLY RENT AND MAINTENANCE
Rent is Rs. 42,000 per month payable before the 5th.

3. SECURITY DEPOSIT
Lessee deposits Rs. 3,50,000 as refundable deposit.`;

    const clauses = extractClausesFromText(legalDoc, 'rental_agreement');
    expect(clauses).toHaveLength(3);
    expect(clauses[0].clauseNumber).toBe('1');
    expect(clauses[0].title).toBe('TERM AND TENURE');
    expect(clauses[1].clauseNumber).toBe('2');
    expect(clauses[2].clauseNumber).toBe('3');
  });

  it('identifies critical risk clauses using preliminary heuristics', () => {
    const textWithTrap = `1. TERMINATION
In case of dispute, the entire deposit shall stand forfeited automatically without notice.`;

    const clauses = extractClausesFromText(textWithTrap, 'rental_agreement');
    expect(clauses[0].riskLevel).toBe('critical');
  });

  it('falls back to paragraph-level splitting when no formal headers exist', () => {
    const informalAgreement = `We agree that Alice will provide software development services to Bob.

Bob will pay Alice 500 dollars every week upon receipt of invoices.

Either party may cancel this agreement by giving two weeks notice.`;

    const clauses = extractClausesFromText(informalAgreement, 'freelance_service_agreement');
    expect(clauses.length).toBeGreaterThanOrEqual(3);
    expect(clauses[0].sectionPath).toContain('Paragraph 1');
  });
});
