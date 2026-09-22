/**
 * Hook: useDocumentUpload
 * Manages drag & drop file upload, multi-file queuing, parsing, and error feedback.
 */

import { useState, useCallback } from 'react';
import { parseLegalDocument } from '../services/documentParser';
import { useDocumentStore } from '../store/documentStore';
import { announceToScreenReader } from '../utils/accessibility';

export function useDocumentUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const addDocument = useDocumentStore((s) => s.addDocument);

  const handleFile = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setUploadError(null);
      announceToScreenReader(`Uploading and analyzing ${file.name}...`, 'polite');

      const result = await parseLegalDocument(file);

      if (result.success && result.document) {
        addDocument(result.document);
        announceToScreenReader(`Successfully parsed ${result.document.name} with ${result.document.clauses.length} clauses.`, 'polite');
      } else {
        const err = result.error || 'Failed to process document.';
        setUploadError(err);
        announceToScreenReader(`Error uploading document: ${err}`, 'assertive');
      }

      setIsProcessing(false);
    },
    [addDocument],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        await handleFile(files[0]);
      }
    },
    [handleFile],
  );

  return {
    isDragging,
    isProcessing,
    uploadError,
    handleFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearError: () => setUploadError(null),
  };
}
