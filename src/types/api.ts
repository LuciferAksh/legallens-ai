/**
 * Gemini API and Service Layer Types
 */

export interface GeminiConfig {
  apiKey: string;
  model: string;
  temperature?: number;
  topP?: number;
  maxOutputTokens?: number;
}

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onComplete: (fullText: string) => void;
  onError: (error: Error) => void;
}

export type ApiStatus = 'idle' | 'loading' | 'streaming' | 'success' | 'error';

export interface ApiError {
  code: string;
  message: string;
  isRetryable: boolean;
  timestamp: string;
}

export interface GenerationMetrics {
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  latencyMs: number;
}
