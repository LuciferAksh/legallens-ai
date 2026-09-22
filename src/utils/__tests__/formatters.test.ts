import { describe, it, expect } from 'vitest';
import { formatFileSize, formatDate, formatCurrencyINR, getRiskScoreColor } from '../formatters';

describe('formatters utils', () => {
  it('formats file sizes accurately', () => {
    expect(formatFileSize(0)).toBe('0 B');
    expect(formatFileSize(500)).toBe('500.0 B');
    expect(formatFileSize(1024)).toBe('1.0 KB');
    expect(formatFileSize(1024 * 1024 * 3.5)).toBe('3.5 MB');
  });

  it('formats dates cleanly', () => {
    const iso = '2025-04-01T10:00:00.000Z';
    const formatted = formatDate(iso);
    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });

  it('formats Indian currency (INR)', () => {
    const formatted = formatCurrencyINR(42000);
    expect(formatted).toContain('42,000');
  });

  it('categorizes risk scores into appropriate color tiers', () => {
    const crit = getRiskScoreColor(85);
    expect(crit.label).toContain('High Legal Risk');
    expect(crit.bg).toContain('red');

    const mod = getRiskScoreColor(60);
    expect(mod.label).toContain('Moderate Legal Risk');

    const low = getRiskScoreColor(30);
    expect(low.label).toContain('Low / Standard Risk');

    const safe = getRiskScoreColor(10);
    expect(safe.label).toContain('Favorable');
  });
});
