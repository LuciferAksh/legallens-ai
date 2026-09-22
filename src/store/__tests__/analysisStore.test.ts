import { describe, it, expect } from 'vitest';
import { useAnalysisStore } from '../analysisStore';
import { SAMPLE_RENTAL_AGREEMENT } from '../../constants/sampleDocuments';

describe('analysisStore', () => {
  it('stores summaries and risk assessments keyed by documentId', () => {
    const store = useAnalysisStore.getState();
    expect(store.summaries[SAMPLE_RENTAL_AGREEMENT.id]).toBeDefined();
    expect(store.risks[SAMPLE_RENTAL_AGREEMENT.id]).toBeDefined();
  });

  it('records Loop Step traces incrementally', () => {
    const store = useAnalysisStore.getState();
    store.clearLoopStepTraces();
    expect(useAnalysisStore.getState().activeLoopTrace).toHaveLength(0);

    store.addLoopStepTrace({
      id: 'trace-1',
      step: 'act',
      iteration: 1,
      timestamp: '12:00:00 PM',
      description: 'Drafting analysis',
      detail: 'Testing detail',
    });

    expect(useAnalysisStore.getState().activeLoopTrace).toHaveLength(1);
    expect(useAnalysisStore.getState().activeLoopTrace[0].step).toBe('act');
  });

  it('appends and updates chat messages', () => {
    const store = useAnalysisStore.getState();
    const docId = 'test-doc-chat';

    store.addChatMessage(docId, {
      id: 'msg-1',
      sender: 'user',
      content: 'Can I negotiate the deposit?',
      timestamp: '12:05 PM',
    });

    expect(useAnalysisStore.getState().chatMessages[docId]).toHaveLength(1);

    store.addChatMessage(docId, {
      id: 'msg-2',
      sender: 'assistant',
      content: '',
      timestamp: '12:05 PM',
      isStreaming: true,
    });

    store.updateLastChatMessage(docId, 'Yes, you can propose a 15-day refund.');
    const msgs = useAnalysisStore.getState().chatMessages[docId];
    expect(msgs[1].content).toBe('Yes, you can propose a 15-day refund.');
  });
});
