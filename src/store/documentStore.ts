/**
 * Document Store (Zustand)
 * Manages active document, uploaded documents library, and sample contract initialization.
 */

import { create } from 'zustand';
import { LegalDocument } from '../types/legal';
import { SAMPLE_RENTAL_AGREEMENT, SAMPLE_EMPLOYMENT_CONTRACT, SAMPLE_COMPARISON_TARGET } from '../constants/sampleDocuments';

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
  loadSampleDocument: (sampleType: 'rental' | 'employment') => void;
  clearAll: () => void;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [SAMPLE_RENTAL_AGREEMENT, SAMPLE_EMPLOYMENT_CONTRACT],
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

  loadSampleDocument: (sampleType) => {
    const doc = sampleType === 'rental' ? SAMPLE_RENTAL_AGREEMENT : SAMPLE_EMPLOYMENT_CONTRACT;
    set((state) => ({
      documents: [doc, ...state.documents.filter((d) => d.id !== doc.id)],
      activeDocument: doc,
    }));
  },

  clearAll: () => set({ documents: [], activeDocument: null }),
}));
