/**
 * Document Store (Zustand)
 * Manages active document, uploaded documents library, and sample contract initialization.
 */

import { create } from 'zustand';
import { LegalDocument } from '../types/legal';
import {
  SAMPLE_RENTAL_AGREEMENT,
  SAMPLE_COMPARISON_TARGET,
  ALL_SAMPLE_DOCUMENTS,
} from '../constants/sampleDocuments';

interface DocumentState {
  documents: LegalDocument[];
  activeDocument: LegalDocument | null;
  comparisonDocumentA: LegalDocument | null;
  comparisonDocumentB: LegalDocument | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  addDocument: (doc: LegalDocument) => void;
  setActiveDocument: (doc: LegalDocument | null) => void;
  setActiveDocumentById: (id: string) => void;
  removeDocument: (id: string) => void;
  setComparisonDocs: (docA: LegalDocument | null, docB: LegalDocument | null) => void;
  loadSampleDocument: (sampleTypeOrId: string) => void;
  clearAll: () => void;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: ALL_SAMPLE_DOCUMENTS,
  activeDocument: SAMPLE_RENTAL_AGREEMENT,
  comparisonDocumentA: SAMPLE_RENTAL_AGREEMENT,
  comparisonDocumentB: SAMPLE_COMPARISON_TARGET,
  isLoading: false,
  error: null,

  addDocument: (doc) => {
    set((state) => ({
      documents: [doc, ...state.documents.filter((d) => d.id !== doc.id)],
      activeDocument: doc,
      error: null,
    }));
  },

  setActiveDocument: (doc) => set({ activeDocument: doc }),

  setActiveDocumentById: (id) => {
    const found = get().documents.find((d) => d.id === id);
    if (found) {
      set({ activeDocument: found });
    }
  },

  removeDocument: (id) => {
    set((state) => {
      const remaining = state.documents.filter((d) => d.id !== id);
      return {
        documents: remaining,
        activeDocument: state.activeDocument?.id === id ? remaining[0] || null : state.activeDocument,
      };
    });
  },

  setComparisonDocs: (docA, docB) => {
    set({
      comparisonDocumentA: docA,
      comparisonDocumentB: docB,
    });
  },

  loadSampleDocument: (sampleTypeOrId) => {
    const key = sampleTypeOrId.toLowerCase();
    const doc =
      ALL_SAMPLE_DOCUMENTS.find(
        (d) =>
          d.id === sampleTypeOrId ||
          d.metadata.detectedType.includes(key) ||
          (key === 'rental' && d.id.includes('rental')) ||
          (key === 'employment' && d.id.includes('employment')) ||
          (key === 'nda' && d.id.includes('nda')) ||
          (key === 'freelance' && d.id.includes('freelance')) ||
          (key === 'insurance' && d.id.includes('insurance')) ||
          (key === 'loan' && d.id.includes('loan')),
      ) || ALL_SAMPLE_DOCUMENTS[0];

    set((state) => ({
      documents: state.documents.some((d) => d.id === doc.id) ? state.documents : [doc, ...state.documents],
      activeDocument: doc,
    }));
  },

  clearAll: () => set({ documents: [], activeDocument: null }),
}));
