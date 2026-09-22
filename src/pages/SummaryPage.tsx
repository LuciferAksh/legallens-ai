import { useDocumentStore } from '../store/documentStore';
import { SummaryDashboard } from '../components/summary/SummaryDashboard';

export function SummaryPage() {
  const { activeDocument } = useDocumentStore();

  return (
    <div className="space-y-6">
      <SummaryDashboard document={activeDocument} />
    </div>
  );
}
