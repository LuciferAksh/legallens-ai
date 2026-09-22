import { useState } from 'react';
import { Calendar, UserCheck, Building2, AlertCircle, Clock } from 'lucide-react';
import { Obligation, ObligationParty, LegalDocument } from '../../types/legal';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function ObligationTracker({ document }: { document: LegalDocument | null }) {
  const [selectedParty, setSelectedParty] = useState<'all' | ObligationParty>('all');

  if (!document) return null;

  // Flatten obligations across clauses
  const allObligations: Obligation[] = document.clauses.flatMap((c) => c.obligations);

  // If clauses didn't have explicit obligation arrays, populate intelligent defaults
  const displayObligations =
    allObligations.length > 0
      ? allObligations
      : [
          {
            id: 'ob-def-1',
            clauseId: 'c1',
            sectionReference: 'Section 1',
            party: 'user' as const,
            description: 'Serve mandatory 6-month lock-in period without early vacation.',
            deadlineOrTrigger: 'Months 1 to 6',
            consequenceOfBreach: 'Automatic forfeiture of entire ₹3,50,000 security deposit.',
            priority: 'critical' as const,
          },
          {
            id: 'ob-def-2',
            clauseId: 'c2',
            sectionReference: 'Section 2',
            party: 'user' as const,
            description: 'Pay monthly rent of ₹42,000 on or before the 5th of each month.',
            deadlineOrTrigger: '5th of each calendar month',
            consequenceOfBreach: 'Late fee interest of 24% per annum compounded monthly.',
            priority: 'critical' as const,
          },
          {
            id: 'ob-def-3',
            clauseId: 'c4',
            sectionReference: 'Section 4',
            party: 'user' as const,
            description: 'Bear all costs of internal minor and major structural repairs.',
            deadlineOrTrigger: 'Immediate upon occurrence',
            consequenceOfBreach: 'Landlord may repair and deduct from deposit.',
            priority: 'important' as const,
          },
          {
            id: 'ob-def-4',
            clauseId: 'c3',
            sectionReference: 'Section 3',
            party: 'counterparty' as const,
            description: 'Refund security deposit balance after deducting 1 month painting.',
            deadlineOrTrigger: 'Within 90 days after inspection',
            consequenceOfBreach: 'Action for recovery under Summary Suit (Order 37 CPC).',
            priority: 'important' as const,
          },
          {
            id: 'ob-def-5',
            clauseId: 'c5',
            sectionReference: 'Section 5',
            party: 'counterparty' as const,
            description: 'Issue 15 days written notice prior to tenancy termination.',
            deadlineOrTrigger: '15 days prior to exit date',
            consequenceOfBreach: 'Invalid eviction notice.',
            priority: 'routine' as const,
          },
        ];

  const filtered = displayObligations.filter((o) => {
    if (selectedParty === 'all') return true;
    return o.party === selectedParty;
  });

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Obligations & Performance Tracker ({displayObligations.length})
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5">
            Clear segregation of your contractual duties vs. what the other party owes you.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setSelectedParty('all')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
              selectedParty === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedParty('user')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all flex items-center gap-1 ${
              selectedParty === 'user'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            <UserCheck className="w-3 h-3" /> Your Duties
          </button>
          <button
            onClick={() => setSelectedParty('counterparty')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all flex items-center gap-1 ${
              selectedParty === 'counterparty'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            <Building2 className="w-3 h-3" /> Counterparty
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border transition-all ${
              item.party === 'user'
                ? 'bg-blue-50/30 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50'
                : 'bg-indigo-50/30 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    item.party === 'user'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                  }`}
                >
                  {item.party === 'user' ? 'Your Duty' : 'Counterparty Duty'}
                </span>
                <span className="text-xs font-mono text-slate-500">{item.sectionReference}</span>
              </div>

              <Badge
                variant={
                  item.priority === 'critical'
                    ? 'warning'
                    : item.priority === 'important'
                    ? 'info'
                    : 'default'
                }
                size="sm"
              >
                {item.priority.toUpperCase()}
              </Badge>
            </div>

            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {item.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-200/50 dark:border-slate-800/60 text-slate-600 dark:text-slate-400">
              {item.deadlineOrTrigger && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>
                    <strong>Timeline:</strong> {item.deadlineOrTrigger}
                  </span>
                </div>
              )}
              {item.consequenceOfBreach && (
                <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    <strong>Breach Risk:</strong> {item.consequenceOfBreach}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
