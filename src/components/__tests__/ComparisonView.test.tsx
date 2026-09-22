import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ComparisonView } from '../comparison/ComparisonView';

describe('ComparisonView component', () => {
  it('renders dual document selector and comparison CTA button', () => {
    render(<ComparisonView />);

    expect(screen.getByText(/Intelligent Contract Comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/Baseline \/ Original Contract/i)).toBeInTheDocument();
    expect(screen.getByText(/Revised \/ Counter-Proposal Draft/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /compare contracts/i })).toBeInTheDocument();
  });
});
