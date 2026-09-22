import { describe, it, expect } from 'vitest';
import {
  countWords,
  countSentences,
  countTotalSyllables,
  calculateFleschKincaidGrade,
  getReadabilityLabel,
  truncateText,
  computeWordDiff,
} from '../textProcessing';

describe('textProcessing utils', () => {
  it('correctly counts words in simple and complex text', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('The lessee shall pay rent.')).toBe(5);
    expect(countWords('   Multiple   spaces   between words   ')).toBe(4);
  });

  it('correctly counts sentences based on terminal punctuation', () => {
    expect(countSentences('')).toBe(0);
    expect(countSentences('First sentence. Second sentence! Third sentence?')).toBe(3);
  });

  it('computes realistic syllable counts', () => {
    expect(countTotalSyllables('lease')).toBeGreaterThanOrEqual(1);
    expect(countTotalSyllables('indemnification')).toBeGreaterThanOrEqual(5);
  });

  it('calculates Flesch-Kincaid Grade Level within sensible boundaries', () => {
    const simpleText = 'The cat sat on the mat. The dog ran in the sun.';
    const simpleGrade = calculateFleschKincaidGrade(simpleText);
    expect(simpleGrade).toBeLessThan(6.0);

    const legaleseText =
      'Notwithstanding anything to the contrary contained herein, the lessee shall indemnify, defend, and hold harmless the lessor from and against any and all liabilities, encumbrances, and judgments.';
    const legaleseGrade = calculateFleschKincaidGrade(legaleseText);
    expect(legaleseGrade).toBeGreaterThan(10.0);
  });

  it('returns appropriate human-readable readability labels', () => {
    expect(getReadabilityLabel(5.5).label).toContain('Simple');
    expect(getReadabilityLabel(7.5).label).toContain('Plain English');
    expect(getReadabilityLabel(14.0).label).toContain('Legalese');
  });

  it('truncates text with ellipsis properly', () => {
    expect(truncateText('Short text', 20)).toBe('Short text');
    expect(truncateText('A very long legal sentence that extends beyond limit', 15)).toBe('A very long leg...');
  });

  it('computes word-level diffs correctly', () => {
    const oldText = 'Rent is payable on the 5th.';
    const newText = 'Rent is payable on the 10th.';
    const diff = computeWordDiff(oldText, newText);

    expect(diff.some((d) => d.type === 'removed' && d.value.includes('5th'))).toBe(true);
    expect(diff.some((d) => d.type === 'added' && d.value.includes('10th'))).toBe(true);
  });
});
