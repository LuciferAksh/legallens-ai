import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Disclaimer, JurisdictionNotice } from '../ui/Disclaimer';

describe('Disclaimer components', () => {
  it('renders prominent legal advisory statement', () => {
    render(<Disclaimer type="banner" />);
    expect(screen.getByRole('note', { name: /legal disclaimer/i })).toBeInTheDocument();
    expect(screen.getByText(/important legal notice/i)).toBeInTheDocument();
    expect(screen.getByText(/does NOT provide legal advice/i)).toBeInTheDocument();
  });

  it('renders compact disclaimer variant', () => {
    render(<Disclaimer type="banner" compact />);
    expect(screen.getByText(/Informational Only:/i)).toBeInTheDocument();
  });

  it('renders jurisdiction framework notice if provided', () => {
    render(<JurisdictionNotice hint="Karnataka, India" />);
    expect(screen.getByText(/Karnataka, India/i)).toBeInTheDocument();
  });
});
