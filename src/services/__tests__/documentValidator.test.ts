import { describe, it, expect } from 'vitest';
import { validateFile, validateContentSafety } from '../documentValidator';

describe('documentValidator service', () => {
  it('validates acceptable PDF and DOCX files', () => {
    const validPdf = new File(['%PDF-1.4 test content'], 'contract.pdf', { type: 'application/pdf' });
    const resPdf = validateFile(validPdf);
    expect(resPdf.isValid).toBe(true);
    expect(resPdf.detectedType).toBe('pdf');

    const validDocx = new File(['fake docx bytes'], 'agreement.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const resDocx = validateFile(validDocx);
    expect(resDocx.isValid).toBe(true);
    expect(resDocx.detectedType).toBe('docx');
  });

  it('rejects unsupported file formats', () => {
    const exeFile = new File(['MZ executable'], 'virus.exe', { type: 'application/x-msdownload' });
    const res = validateFile(exeFile);
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('Unsupported file type');
  });

  it('rejects oversized files exceeding 10MB', () => {
    // Mock a 15MB file without allocating 15MB of RAM
    const hugeFile = {
      name: 'large_contract.pdf',
      size: 15 * 1024 * 1024,
      type: 'application/pdf',
    } as unknown as File;

    const res = validateFile(hugeFile);
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('exceeds 10MB limit');
  });

  it('rejects empty 0-byte files', () => {
    const emptyFile = new File([], 'empty.txt', { type: 'text/plain' });
    const res = validateFile(emptyFile);
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('empty');
  });

  it('detects embedded malicious script patterns in text', () => {
    const cleanText = 'The lessor hereby leases the flat to lessee.';
    expect(validateContentSafety(cleanText).isSafe).toBe(true);

    const maliciousText = 'Agreement <script>fetch("evil.com")</script> clause.';
    const safetyCheck = validateContentSafety(maliciousText);
    expect(safetyCheck.isSafe).toBe(false);
    expect(safetyCheck.warning).toContain('embedded executable script');
  });
});
