import { describe, it, expect, beforeEach } from 'vitest';
import { getCachedAnalysis, setCachedAnalysis, clearAnalysisCache } from '../analysisCache';

describe('analysisCache service', () => {
  beforeEach(() => {
    clearAnalysisCache();
  });

  it('returns null when document analysis has not been cached', () => {
    const result = getCachedAnalysis('sample text', 'simplify');
    expect(result).toBeNull();
  });

  it('stores and retrieves cached analysis results by content and operation', () => {
    const content = 'Employment Agreement content text...';
    const mockData = { readabilityScore: 8.2, clausesCount: 12 };

    setCachedAnalysis(content, 'simplify', mockData);
    const cached = getCachedAnalysis<typeof mockData>(content, 'simplify');

    expect(cached).toEqual(mockData);
  });

  it('isolates cache entries by operation type', () => {
    const content = 'Lease Agreement text...';
    setCachedAnalysis(content, 'risks', { criticalCount: 2 });

    expect(getCachedAnalysis(content, 'summary')).toBeNull();
    expect(getCachedAnalysis(content, 'risks')).toEqual({ criticalCount: 2 });
  });

  it('clears all entries when clearAnalysisCache is invoked', () => {
    setCachedAnalysis('doc', 'op', { ok: true });
    clearAnalysisCache();
    expect(getCachedAnalysis('doc', 'op')).toBeNull();
  });
});
