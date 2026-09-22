import { useDocumentStore } from '../store/documentStore';
import { ObligationTracker } from '../components/analysis/ObligationTracker';

export function ObligationsPage() {
  const { activeDocument } = useDocumentStore();

  return (
    <div className="space-y-6">
      <ObligationTracker document={activeDocument} />
    </div>
  );
}
