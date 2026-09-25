/**
 * Analysis Memoization & Hash Cache
 * Prevents redundant LLM calls and expensive parsing cycles by caching results against content hashes.
 */

function simpleContentHash(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `hash_${Math.abs(hash).toString(36)}_${content.length}`;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const MAX_CACHE_ENTRIES = 100;
const memoryCache = new Map<string, CacheEntry<unknown>>();

/**
 * Retrieves a cached analysis result if it exists.
 */
export function getCachedAnalysis<T>(documentContent: string, operation: string): T | null {
  if (!documentContent) return null;
  const key = `${operation}:${simpleContentHash(documentContent)}`;
  const entry = memoryCache.get(key);
  if (entry) {
    return entry.data as T;
  }
  return null;
}

/**
 * Stores an analysis result in memory cache.
 */
export function setCachedAnalysis<T>(documentContent: string, operation: string, data: T): void {
  if (!documentContent || !data) return;

  // Prune oldest entries if cache exceeds limit
  if (memoryCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = memoryCache.keys().next().value;
    if (oldestKey) {
      memoryCache.delete(oldestKey);
    }
  }

  const key = `${operation}:${simpleContentHash(documentContent)}`;
  memoryCache.set(key, { data, timestamp: Date.now() });
}

/**
 * Clears the in-memory cache.
 */
export function clearAnalysisCache(): void {
  memoryCache.clear();
}
