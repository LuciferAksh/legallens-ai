import { useDocumentStore } from '../store/documentStore';
import { useAnalysisStore } from '../store/analysisStore';
import { RiskDashboard } from '../components/analysis/RiskDashboard';

export function RisksPage() {
  const { activeDocument } = useDocumentStore();
  const { risks } = useAnalysisStore();

  const docRisks = activeDocument ? risks[activeDocument.id] || activeDocument.risks || [] : [];

  return (
    <div className="space-y-6">
      <RiskDashboard document={activeDocument} risks={docRisks} />
    </div>
  );
}
