import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Button } from '../ui/Button';

describe('Button component', () => {
  it('renders children text properly', () => {
    render(<Button>Analyze Contract</Button>);
    expect(screen.getByRole('button', { name: /analyze contract/i })).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    await userEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled and shows spinner when isLoading is true', () => {
    render(<Button isLoading>Generating</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });
});
