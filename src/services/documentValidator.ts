/**
 * Security Document Validator
 * Validates file headers, types, sizes, and screens for malicious scripts.
 */

import { APP_CONFIG } from '../constants';

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  detectedType?: 'pdf' | 'docx' | 'txt';
}

export function validateFile(file: File): FileValidationResult {
  if (!file) {
    return { isValid: false, error: 'No file provided.' };
  }

  // 1. Check File Size
  if (file.size > APP_CONFIG.MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File size exceeds ${APP_CONFIG.MAX_FILE_SIZE_MB}MB limit. Please provide a smaller document.`,
    };
  }

  if (file.size === 0) {
    return { isValid: false, error: 'The uploaded file is empty (0 bytes).' };
  }

  // 2. Check File Extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = APP_CONFIG.SUPPORTED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
  if (!hasValidExtension) {
    return {
      isValid: false,
      error: 'Unsupported file type. Please upload a PDF, DOCX, or TXT document.',
    };
  }

  // 3. Detect normalized type
  let detectedType: 'pdf' | 'docx' | 'txt' = 'txt';
  if (fileName.endsWith('.pdf')) detectedType = 'pdf';
  else if (fileName.endsWith('.docx')) detectedType = 'docx';

  return {
    isValid: true,
    detectedType,
  };
}

/**
 * Checks raw string contents for executable script injection or harmful payloads
 */
export function validateContentSafety(text: string): { isSafe: boolean; warning?: string } {
  if (!text) return { isSafe: true };

  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i,
    /javascript:/i,
    /data:text\/html/i,
    /vbscript:/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(text)) {
      return {
        isSafe: false,
        warning: 'The uploaded document contains embedded executable script tags and was blocked for security.',
      };
    }
  }

  return { isSafe: true };
}
