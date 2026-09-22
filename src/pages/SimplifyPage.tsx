import { useDocumentStore } from '../store/documentStore';
import { DocumentSimplifier } from '../components/analysis/DocumentSimplifier';
import { KeyTermsGlossary } from '../components/analysis/KeyTermsGlossary';

export function SimplifyPage() {
  const { activeDocument } = useDocumentStore();

  return (
    <div className="space-y-6">
      <DocumentSimplifier document={activeDocument} />

      {activeDocument?.summary?.keyTerms && (
        <KeyTermsGlossary terms={activeDocument.summary.keyTerms} />
      )}
    </div>
  );
}
