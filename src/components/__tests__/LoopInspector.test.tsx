import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { LoopInspector } from '../loop/LoopInspector';
import { LoopTelemetry } from '../../services/loopEngine/types';

describe('LoopInspector component', () => {
  const mockTelemetry: LoopTelemetry = {
    loopId: 'test-loop-1',
    documentId: 'doc-1',
    taskType: 'risk_analysis',
    startedAt: new Date().toISOString(),
    durationMs: 950,
    iterationCount: 2,
    maxIterations: 3,
    isPassed: true,
    initialConfidenceScore: 70,
    finalConfidenceScore: 95,
    groundednessScore: 95,
    readabilityGrade: 7.4,
    hallucinationRisk: 'none',
    steps: [
      {
        id: 's1',
        step: 'act',
        iteration: 1,
        timestamp: '11:00 AM',
        description: 'Generating draft',
        detail: 'Initial clause drafting',
      },
      {
        id: 's2',
        step: 'evaluate',
        iteration: 1,
        timestamp: '11:01 AM',
        description: 'Critic evaluation',
        detail: 'Checked citations and readability',
      },
    ],
    critiquesApplied: ['Simplified legal jargon in Section 2'],
  };

  it('renders loop telemetry metrics including groundedness and grade level', () => {
    render(<LoopInspector telemetry={mockTelemetry} />);
    expect(screen.getByText(/Loop Engineering Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/Verified in 2 Loops/i)).toBeInTheDocument();
    expect(screen.getByText(/95%/i)).toBeInTheDocument();
    expect(screen.getByText(/Grade 7.4/i)).toBeInTheDocument();
    expect(screen.getByText(/none/i)).toBeInTheDocument();
  });

  it('expands the step trace timeline on toggle click', async () => {
    render(<LoopInspector telemetry={mockTelemetry} />);
    const toggleBtn = screen.getByLabelText(/toggle loop execution trace/i);
    await userEvent.click(toggleBtn);

    expect(screen.getByText(/Autonomous Agent Execution Trace/i)).toBeInTheDocument();
    expect(screen.getByText(/Initial clause drafting/i)).toBeInTheDocument();
    expect(screen.getByText(/Simplified legal jargon in Section 2/i)).toBeInTheDocument();
  });
});
