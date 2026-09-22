import { describe, it, expect } from 'vitest';
import { extractJsonFromText } from '../jsonParser';

describe('jsonParser utils', () => {
  it('parses valid raw JSON directly', () => {
    const raw = '{"risk": "critical", "score": 90}';
    const result = extractJsonFromText<{ risk: string; score: number }>(raw, { risk: 'none', score: 0 });
    expect(result.risk).toBe('critical');
    expect(result.score).toBe(90);
  });

  it('extracts JSON enclosed within markdown code fences', () => {
    const text = 'Here is the analysis:\n```json\n{"clauses": ["c1", "c2"]}\n```\nHope this helps!';
    const result = extractJsonFromText<{ clauses: string[] }>(text, { clauses: [] });
    expect(result.clauses).toEqual(['c1', 'c2']);
  });

  it('extracts JSON array with leading and trailing conversational text', () => {
    const text = 'Sure! Here are the findings: [{"id": 1}, {"id": 2}] Please review.';
    const result = extractJsonFromText<{ id: number }[]>(text, []);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
  });

  it('handles trailing commas safely', () => {
    const text = '{"items": ["a", "b",], "done": true,}';
    const result = extractJsonFromText<{ items: string[]; done: boolean }>(text, { items: [], done: false });
    expect(result.done).toBe(true);
    expect(result.items).toEqual(['a', 'b']);
  });

  it('returns fallback value on unparseable garbage input', () => {
    const garbage = 'Not a json document at all.';
    const fallback = { fallbackUsed: true };
    const result = extractJsonFromText(garbage, fallback);
    expect(result).toEqual(fallback);
  });
});
