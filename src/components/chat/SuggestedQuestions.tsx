import { Sparkles } from 'lucide-react';
import { DocumentType } from '../../types/legal';

interface SuggestedQuestionsProps {
  docType?: DocumentType;
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export function SuggestedQuestions({ docType = 'rental_agreement', onSelect, disabled }: SuggestedQuestionsProps) {
  const suggestionsMap: Record<string, string[]> = {
    rental_agreement: [
      'What happens to my deposit if I leave before 6 months?',
      'Is the mandatory 1-month painting deduction enforceable?',
      'Can the landlord enter my flat without prior notice?',
      'What is the notice period required to terminate this lease?',
    ],
    employment_contract: [
      'Is the 24-month non-compete clause legally valid in India?',
      'Does the company own my personal weekend side-projects?',
      'What are the penalties if I leave before the 90-day notice period?',
      'Am I personally liable if my code has bugs or defects?',
    ],
    general_contract: [
      'What are my primary obligations in this agreement?',
      'What are the termination conditions and notice requirements?',
      'Are there any unusual penalties or liquidated damages?',
      'How are disputes resolved under this contract?',
    ],
  };

  const questions = suggestionsMap[docType] || suggestionsMap.general_contract;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Suggested Inquiries For This Contract:</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {questions.map((q, idx) => (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => onSelect(q)}
            className="text-left text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
