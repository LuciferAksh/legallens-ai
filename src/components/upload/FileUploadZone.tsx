import React, { useRef } from 'react';
import { clsx } from 'clsx';
import { UploadCloud, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useDocumentUpload } from '../../hooks/useDocumentUpload';
import { Button } from '../ui/Button';

export function FileUploadZone({ onFileLoaded }: { onFileLoaded?: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isDragging,
    isProcessing,
    uploadError,
    handleFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearError,
  } = useDocumentUpload();

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFile(files[0]);
      onFileLoaded?.();
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Drag & Drop Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={clsx(
          'relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center',
          isDragging
            ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-slate-50/60 dark:hover:bg-slate-800/40',
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={onFileInputChange}
          className="hidden"
          aria-label="Upload legal contract"
        />

        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
          Drop your legal document here, or <span className="text-blue-600 dark:text-blue-400 underline">browse</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mb-4 leading-relaxed">
          Supports contracts, leases, offer letters, insurance terms, and NDAs in <strong>PDF</strong>, <strong>DOCX</strong>, or <strong>TXT</strong> (up to 10MB).
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Client-side parsing
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Clause-boundary extraction
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Zero PII retention
          </span>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 rounded-2xl flex flex-col items-center justify-center backdrop-blur-xs">
            <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Parsing and segmenting clauses...
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Extracting section paths, obligations, and definitions
            </p>
          </div>
        )}
      </div>

      {/* Error Banner */}
      {uploadError && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start justify-between gap-3 text-xs text-red-800 dark:text-red-200 animate-slide-up">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong>Upload Failed:</strong> {uploadError}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clearError} className="text-xs h-7">
            Dismiss
          </Button>
        </div>
      )}
    </div>
  );
}
