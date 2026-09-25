import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionableChecklist } from '../summary/ActionableChecklist';
import { LawyerPrepGuide } from '../summary/LawyerPrepGuide';
import { KeyTermsGlossary } from '../analysis/KeyTermsGlossary';
import { SAMPLE_RENTAL_AGREEMENT } from '../../constants/sampleDocuments';

describe('Summary & Legal Guidance Components', () => {
  it('renders actionable checklist and toggles completion status', async () => {
    const checklistItems = SAMPLE_RENTAL_AGREEMENT.summary!.checklist;
    render(<ActionableChecklist initialItems={checklistItems} />);

    expect(screen.getByText(/Actionable Next Steps Checklist/)).toBeDefined();
    expect(screen.getByText(checklistItems[0].action)).toBeDefined();

    // Find and click the toggle button
    const firstCheckbox = screen.getAllByLabelText(/mark complete/i)[0];
    await userEvent.click(firstCheckbox);

    // Progress updates to 1 completed
    expect(screen.getByText(/1\//)).toBeDefined();
  });

  it('renders lawyer prep guide with strategic questions and clause references', () => {
    const prepItems = SAMPLE_RENTAL_AGREEMENT.summary!.lawyerPrepGuide;
    render(<LawyerPrepGuide items={prepItems} />);

    expect(screen.getByText(/Lawyer Consultation Preparation Brief/)).toBeDefined();
    expect(screen.getByText(prepItems[0].topic)).toBeDefined();
    expect(screen.getByText(new RegExp(prepItems[0].suggestedQuestion.slice(0, 30)))).toBeDefined();
  });

  it('renders key terms glossary and filters terms via search', async () => {
    const terms = SAMPLE_RENTAL_AGREEMENT.summary!.keyTerms;
    render(<KeyTermsGlossary terms={terms} />);

    expect(screen.getByText(/Plain-English Legal Glossary/)).toBeDefined();
    expect(screen.getByText(terms[0].term)).toBeDefined();

    const searchInput = screen.getByPlaceholderText('Search defined terms...');
    await userEvent.type(searchInput, terms[0].term);
    expect(screen.getByText(terms[0].plainEnglishExplanation)).toBeDefined();
  });
});
