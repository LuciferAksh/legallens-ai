import { describe, it, expect } from 'vitest';
import { geminiClient } from '../geminiClient';

describe('geminiClient service', () => {
  it('manages API key and model selection', () => {
    geminiClient.setApiKey('test-api-key-1234567890', false);
    expect(geminiClient.getApiKey()).toBe('test-api-key-1234567890');
    expect(geminiClient.hasApiKey()).toBe(true);

    geminiClient.setModel('gemini-2.0-flash');
    expect(geminiClient.getModel()).toBe('gemini-2.0-flash');
  });

  it('generates simulated responses safely when offline or without an active key', async () => {
    geminiClient.setApiKey('', false); // Clear key to trigger safe simulation
    expect(geminiClient.hasApiKey()).toBe(false);

    const res = await geminiClient.generateContent('Review contract clauses and identify significant risks');
    expect(res.text).toBeDefined();
    expect(res.text.length).toBeGreaterThan(10);
    expect(res.metrics.latencyMs).toBeGreaterThan(0);
  });

  it('simulates streaming callbacks correctly', async () => {
    geminiClient.setApiKey('', false);

    const chunks: string[] = [];
    let completedText = '';

    await geminiClient.streamGenerateContent('What is the deposit refund timeline?', {
      onChunk: (chunk) => chunks.push(chunk),
      onComplete: (full) => {
        completedText = full;
      },
      onError: () => {},
    });

    expect(chunks.length).toBeGreaterThan(0);
    expect(completedText.length).toBeGreaterThan(10);
    expect(completedText).toContain('Security Deposit');
  });
});
