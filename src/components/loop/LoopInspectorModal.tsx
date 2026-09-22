import { useUiStore } from '../../store/uiStore';
import { useAnalysisStore } from '../../store/analysisStore';
import { useDocumentStore } from '../../store/documentStore';
import { Modal } from '../ui/Modal';
import { LoopInspector } from './LoopInspector';

export function LoopInspectorModal() {
  const { isLoopInspectorOpen, setLoopInspectorOpen } = useUiStore();
  const { activeDocument } = useDocumentStore();
  const telemetry = useAnalysisStore((s) => (activeDocument ? s.telemetry[activeDocument.id] : undefined));

  return (
    <Modal
      isOpen={isLoopInspectorOpen}
      onClose={() => setLoopInspectorOpen(false)}
      title="Agentic Loop Engineering Inspector"
      description="Inspect how the multi-pass self-correction loop evaluated citations, measured readability, and eliminated hallucinations."
      maxWidth="4xl"
    >
      <div className="space-y-4">
        <LoopInspector telemetry={telemetry} />
      </div>
    </Modal>
  );
}
