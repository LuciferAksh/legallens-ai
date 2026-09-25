/**
 * Security & Prompt Injection Defense Engine
 * Protects LLM pipelines against adversarial jailbreaks, prompt injections, and data exfiltration.
 */

const INJECTION_PATTERNS = [
  /ignore\s+(?:all\s+)?(?:previous|above|prior)\s+(?:instructions|prompts|directions)/i,
  /disregard\s+(?:all\s+)?(?:previous|above|prior)\s+(?:instructions|prompts|directions)/i,
  /you\s+are\s+now\s+(?:an?\s+)?(?:unrestricted|dan|jailbroken)/i,
  /system\s+prompt\s+(?:override|leak|reveal|output|exfiltrate)/i,
  /repeat\s+(?:everything|the\s+instructions)\s+above/i,
  /as\s+an\s+ai\s+without\s+rules/i,
  /\bjailbreak\b/i,
  /<script\b[^>]*>[\s\S]*?<\/script>/gi,
  /javascript\s*:/gi,
  /<\/untrusted_legal_document_boundary>/gi,
];

export interface SanitizationResult {
  sanitizedText: string;
  injectionsDetected: number;
  warnings: string[];
}

/**
 * Scans input text for known adversarial prompt injection patterns,
 * neutralizing them and returning a sanitized string along with audit telemetry.
 */
export function sanitizePromptInput(rawText: string): SanitizationResult {
  if (!rawText || typeof rawText !== 'string') {
    return { sanitizedText: '', injectionsDetected: 0, warnings: [] };
  }

  let sanitized = rawText;
  let injectionsDetected = 0;
  const warnings: string[] = [];

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(sanitized)) {
      injectionsDetected++;
      warnings.push(`Neutralized potential prompt injection pattern: ${pattern.source}`);
      sanitized = sanitized.replace(pattern, '[REDACTED_SECURITY_RISK]');
    }
  }

  return {
    sanitizedText: sanitized,
    injectionsDetected,
    warnings,
  };
}

/**
 * Wraps untrusted legal contract text in rigid cryptographic boundary tags
 * to ensure LLMs treat the content strictly as data rather than instructions.
 */
export function wrapInBoundaryTags(text: string): string {
  const safeText = text.replace(/<\/untrusted_legal_document_boundary>/gi, '[ESCAPED_DELIMITER]');
  return `<untrusted_legal_document_boundary>\n${safeText}\n</untrusted_legal_document_boundary>`;
}
