/**
 * Text Processing and Readability Metrics for Legal Intelligence
 */

export function countWords(text: string): number {
  if (!text) return 0;
  const matches = text.trim().match(/\b[\w'-]+\b/g);
  return matches ? matches.length : 0;
}

export function countCharacters(text: string): number {
  return text ? text.length : 0;
}

export function countSentences(text: string): number {
  if (!text) return 0;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  return Math.max(1, sentences.length);
}

export function countSyllablesInWord(word: string): number {
  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
  if (cleanWord.length <= 3) return 1;
  
  // Basic syllable counting heuristics
  const processed = cleanWord
    .replace(/(?:[^laeiouy]|ed|es|e)$/, '')
    .replace(/^y/, '');
  
  const matches = processed.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

export function countTotalSyllables(text: string): number {
  const words = text.match(/\b[a-zA-Z]+\b/g) || [];
  return words.reduce((acc, word) => acc + countSyllablesInWord(word), 0);
}

/**
 * Calculates Flesch-Kincaid Grade Level:
 * 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
 * Standard goal for plain language legal translation: <= 8.0 (8th grade reading level)
 */
export function calculateFleschKincaidGrade(text: string): number {
  const words = countWords(text);
  if (words < 5) return 6.0; // fallback for very short phrases
  
  const sentences = countSentences(text);
  const syllables = countTotalSyllables(text);
  
  const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
  return Math.max(1.0, Math.min(18.0, Number(grade.toFixed(1))));
}

export function getReadabilityLabel(grade: number): { label: string; color: string } {
  if (grade <= 6) return { label: 'Extremely Simple (Grade 5-6)', color: 'text-emerald-600 dark:text-emerald-400' };
  if (grade <= 8) return { label: 'Plain English (Grade 7-8)', color: 'text-emerald-500 dark:text-emerald-300' };
  if (grade <= 10) return { label: 'Moderate (High School)', color: 'text-amber-500 dark:text-amber-300' };
  if (grade <= 12) return { label: 'Complex (College Level)', color: 'text-orange-500 dark:text-orange-400' };
  return { label: 'Dense Legalese (Post-Graduate)', color: 'text-red-600 dark:text-red-400' };
}

export function truncateText(text: string, maxLength = 160): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export interface WordDiffToken {
  type: 'same' | 'added' | 'removed';
  value: string;
}

/**
 * Fast word-level token diffing for contract comparison
 */
export function computeWordDiff(oldText: string, newText: string): WordDiffToken[] {
  const oldWords = oldText.split(/(\s+)/);
  const newWords = newText.split(/(\s+)/);
  
  const result: WordDiffToken[] = [];
  const maxLen = Math.max(oldWords.length, newWords.length);
  
  let i = 0;
  let j = 0;
  
  while (i < oldWords.length || j < newWords.length) {
    if (i < oldWords.length && j < newWords.length && oldWords[i] === newWords[j]) {
      result.push({ type: 'same', value: oldWords[i] });
      i++;
      j++;
    } else if (j < newWords.length && (!oldWords.includes(newWords[j], i) || (i >= oldWords.length))) {
      result.push({ type: 'added', value: newWords[j] });
      j++;
    } else if (i < oldWords.length) {
      result.push({ type: 'removed', value: oldWords[i] });
      i++;
    } else {
      break;
    }
    
    // Safety guard against infinite loops
    if (result.length > maxLen * 3) break;
  }
  
  return result;
}
