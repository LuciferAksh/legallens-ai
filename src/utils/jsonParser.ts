/**
 * Resilient JSON Parser for LLM Responses
 * Handles code fences, conversational preambles, trailing commas, and edge cases.
 */

export function extractJsonFromText<T>(text: string, fallbackDefault: T): T {
  if (!text) return fallbackDefault;

  // 1. Try direct parse
  try {
    return JSON.parse(text) as T;
  } catch {
    // Continue to extractions
  }

  // 2. Extract content within markdown code fences ```json ... ``` or ``` ... ```
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeBlockMatch && codeBlockMatch[1]) {
    try {
      const sanitized = sanitizeJsonString(codeBlockMatch[1]);
      return JSON.parse(sanitized) as T;
    } catch {
      // Fall through to object/array bracket extraction
    }
  }

  // 3. Find outermost curly braces { ... } or brackets [ ... ]
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  const firstBracket = text.indexOf('[');
  const lastBracket = text.lastIndexOf(']');

  let candidate = '';
  if (firstBrace !== -1 && lastBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    candidate = text.slice(firstBrace, lastBrace + 1);
  } else if (firstBracket !== -1 && lastBracket !== -1) {
    candidate = text.slice(firstBracket, lastBracket + 1);
  }

  if (candidate) {
    try {
      const sanitized = sanitizeJsonString(candidate);
      return JSON.parse(sanitized) as T;
    } catch {
      // Fall through
    }
  }

  return fallbackDefault;
}

/**
 * Strips common JSON errors like trailing commas before closing braces/brackets
 */
function sanitizeJsonString(str: string): string {
  return str
    .replace(/,\s*([}\]])/g, '$1') // remove trailing commas
    .replace(/[\u0000-\u001F]+/g, ' ') // replace control chars with spaces
    .trim();
}
