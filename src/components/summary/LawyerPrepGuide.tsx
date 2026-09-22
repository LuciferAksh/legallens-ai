import { useState } from 'react';
import { Briefcase, FileText, Copy, Check } from 'lucide-react';
import { LawyerPrepItem } from '../../types/legal';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export function LawyerPrepGuide({ items }: { items: LawyerPrepItem[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-blue-600" />
          Lawyer Consultation Preparation Brief ({items.length} Strategic Inquiries)
        </CardTitle>
        <p className="text-xs text-slate-500 mt-0.5">
          Empowers you with targeted, professional questions to ask your attorney or advocate to maximize consultation value.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {item.topic}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  ({item.specificClauseReference})
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-[11px] gap-1 text-blue-600 dark:text-blue-400"
                onClick={() => handleCopy(item.id, item.suggestedQuestion)}
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" /> Copied Question
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Question
                  </>
                )}
              </Button>
            </div>

            {/* The Question */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                Suggested Question To Ask Your Advocate:
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                "{item.suggestedQuestion}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Context / Why Ask */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Why Ask This
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                  {item.contextWhyAsk}
                </p>
              </div>

              {/* Target Outcome */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                  Target Negotiation Goal
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                  {item.targetOutcome}
                </p>
              </div>
            </div>

            {/* Documents to Bring */}
            {item.documentsToBring && item.documentsToBring.length > 0 && (
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  <strong>Bring to consultation:</strong> {item.documentsToBring.join(', ')}
                </span>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
