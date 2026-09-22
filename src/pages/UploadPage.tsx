import { FileUploadZone } from '../components/upload/FileUploadZone';
import { DocumentPreview } from '../components/upload/DocumentPreview';
import { useDocumentStore } from '../store/documentStore';

export function UploadPage({ onAnalyze }: { onAnalyze: () => void }) {
  const { activeDocument } = useDocumentStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Document Intake & Parsing Engine
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Upload any legal contract (PDF, DOCX, TXT) to execute client-side parsing, clause boundary segmentation, and PII protection.
        </p>
      </div>

      <FileUploadZone onFileLoaded={onAnalyze} />

      <DocumentPreview document={activeDocument} />
    </div>
  );
}
