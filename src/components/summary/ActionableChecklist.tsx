import { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { ChecklistItem } from '../../types/legal';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function ActionableChecklist({
  initialItems,
}: {
  initialItems: ChecklistItem[];
}) {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-blue-600" />
            Actionable Next Steps Checklist ({completedCount}/{items.length} Completed)
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5">
            Key steps to protect your legal and financial interests before executing this document.
          </p>
        </div>

        {/* Progress Bar Badge */}
        <div className="flex items-center gap-2">
          <div className="w-32 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            {progressPercent}%
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
              item.completed
                ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-xs'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 text-blue-600 dark:text-blue-400 focus:outline-none"
              aria-label={item.completed ? 'Mark incomplete' : 'Mark complete'}
            >
              {item.completed ? (
                <CheckSquare className="w-5 h-5 text-emerald-500" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 hover:text-blue-600" />
              )}
            </button>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-semibold leading-relaxed ${
                    item.completed
                      ? 'line-through text-slate-500'
                      : 'text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {item.action}
                </span>

                <Badge
                  variant={
                    item.priority === 'must_do'
                      ? 'warning'
                      : item.priority === 'should_do'
                      ? 'info'
                      : 'default'
                  }
                  size="sm"
                >
                  {item.priority === 'must_do' ? 'MUST DO' : 'RECOMMENDED'}
                </Badge>
              </div>

              {item.sourceSection && (
                <p className="text-[11px] font-mono text-slate-400">
                  Ref: {item.sourceSection}
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
