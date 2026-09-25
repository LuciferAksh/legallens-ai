import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatMessage } from '../chat/ChatMessage';
import { SuggestedQuestions } from '../chat/SuggestedQuestions';
import { ChatMessage as ChatMessageType } from '../../types/legal';

describe('Chat Components', () => {
  it('renders user and assistant messages properly', () => {
    const userMsg: ChatMessageType = {
      id: '1',
      sender: 'user',
      content: 'Can the landlord evict me without notice?',
      timestamp: '10:30 AM',
    };

    const { rerender } = render(<ChatMessage message={userMsg} />);
    expect(screen.getByText('You')).toBeDefined();
    expect(screen.getByText('Can the landlord evict me without notice?')).toBeDefined();

    const assistantMsg: ChatMessageType = {
      id: '2',
      sender: 'assistant',
      content: 'Under Clause 5, the landlord must provide 15 days notice.',
      timestamp: '10:31 AM',
      citations: [
        {
          clauseNumber: '5',
          sectionPath: 'Section 5',
          quoteSnippet: '15 days written notice',
        },
      ],
    };

    rerender(<ChatMessage message={assistantMsg} />);
    expect(screen.getByText('LegalLens Assistant')).toBeDefined();
    expect(screen.getByText(/15 days notice/)).toBeDefined();
    expect(screen.getAllByText(/Clause 5/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders suggested questions and triggers callback on click', async () => {
    const onSelect = vi.fn();

    render(<SuggestedQuestions docType="rental_agreement" onSelect={onSelect} />);

    const questionText = 'What happens to my deposit if I leave before 6 months?';
    expect(screen.getByText(questionText)).toBeDefined();

    const button = screen.getByText(questionText);
    await userEvent.click(button);
    expect(onSelect).toHaveBeenCalledWith(questionText);
  });
});
