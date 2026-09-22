import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RiskDashboard } from '../analysis/RiskDashboard';
import { SAMPLE_RENTAL_AGREEMENT } from '../../constants/sampleDocuments';

describe('RiskDashboard component', () => {
  it('renders overall risk score gauge and critical red flags', () => {
    render(
      <RiskDashboard
        document={SAMPLE_RENTAL_AGREEMENT}
        risks={SAMPLE_RENTAL_AGREEMENT.risks || []}
      />,
    );

    expect(screen.getByText(/Overall Risk Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Critical Red Flags/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter Findings:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Painting/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders empty fallback when no risks detected', () => {
    render(<RiskDashboard document={SAMPLE_RENTAL_AGREEMENT} risks={[]} />);
    expect(screen.getByText(/No risks detected yet/i)).toBeInTheDocument();
  });
});
