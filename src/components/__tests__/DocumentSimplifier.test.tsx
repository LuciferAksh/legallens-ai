import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DocumentSimplifier } from '../analysis/DocumentSimplifier';
import { SAMPLE_RENTAL_AGREEMENT } from '../../constants/sampleDocuments';

describe('DocumentSimplifier component', () => {
  it('renders simplification header and side-by-side legalese comparison', () => {
    render(<DocumentSimplifier document={SAMPLE_RENTAL_AGREEMENT} />);

    expect(screen.getByText(/Plain Language Simplification Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/Original Legalese/i)).toBeInTheDocument();
    expect(screen.getByText(/Plain English Translation/i)).toBeInTheDocument();
    expect(screen.getByText(/What You Are Required To Do/i)).toBeInTheDocument();
  });

  it('renders fallback empty state when document is null', () => {
    render(<DocumentSimplifier document={null} />);
    expect(screen.getByText(/No clauses available to simplify/i)).toBeInTheDocument();
  });
});
