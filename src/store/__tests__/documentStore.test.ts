import { describe, it, expect } from 'vitest';
import { useDocumentStore } from '../documentStore';
import { SAMPLE_RENTAL_AGREEMENT, SAMPLE_EMPLOYMENT_CONTRACT } from '../../constants/sampleDocuments';

describe('documentStore', () => {
  it('initializes with pre-loaded realistic sample contracts', () => {
    const store = useDocumentStore.getState();
    expect(store.documents.length).toBeGreaterThanOrEqual(2);
    expect(store.activeDocument).toBeDefined();
  });

  it('switches active document by ID', () => {
    const store = useDocumentStore.getState();
    store.setActiveDocumentById(SAMPLE_EMPLOYMENT_CONTRACT.id);
    expect(useDocumentStore.getState().activeDocument?.id).toBe(SAMPLE_EMPLOYMENT_CONTRACT.id);

    store.setActiveDocumentById(SAMPLE_RENTAL_AGREEMENT.id);
    expect(useDocumentStore.getState().activeDocument?.id).toBe(SAMPLE_RENTAL_AGREEMENT.id);
  });

  it('adds and removes a document cleanly', () => {
    const store = useDocumentStore.getState();
    const tempDoc = {
      ...SAMPLE_RENTAL_AGREEMENT,
      id: 'temp-doc-123',
      name: 'Temporary.pdf',
    };

    store.addDocument(tempDoc);
    expect(useDocumentStore.getState().activeDocument?.id).toBe('temp-doc-123');

    store.removeDocument('temp-doc-123');
    expect(useDocumentStore.getState().documents.some((d) => d.id === 'temp-doc-123')).toBe(false);
  });
});
