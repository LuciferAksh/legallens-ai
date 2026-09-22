import { describe, it, expect } from 'vitest';
import { sanitizeHtml, sanitizeText, cleanMarkdown, maskApiKey } from '../sanitize';

describe('sanitize utils', () => {
  it('escapes dangerous HTML characters', () => {
    const raw = '<script>alert("xss")</script>&"\'/';
    const sanitized = sanitizeHtml(raw);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toContain('&lt;script&gt;');
    expect(sanitized).toContain('&amp;');
    expect(sanitized).toContain('&quot;');
    expect(sanitized).toContain('&#x27;');
  });

  it('removes control and zero-width characters from text', () => {
    const textWithZeroWidth = 'Legal\u200BContract\u0000Text';
    const cleaned = sanitizeText(textWithZeroWidth);
    expect(cleaned).toBe('LegalContractText');
  });

  it('strips script, iframe, and javascript pseudoprotocols from markdown', () => {
    const md = 'Hello [link](javascript:alert(1)) <script>dangerous()</script> <iframe src="evil.com"></iframe>';
    const cleaned = cleanMarkdown(md);
    expect(cleaned).not.toContain('<script>');
    expect(cleaned).not.toContain('<iframe');
    expect(cleaned).not.toContain('javascript:');
  });

  it('masks API keys safely', () => {
    expect(maskApiKey('')).toBe('');
    expect(maskApiKey('short')).toBe('••••••••');
    expect(maskApiKey('AIzaSy1234567890abcdef')).toBe('AIza••••••••cdef');
  });
});
