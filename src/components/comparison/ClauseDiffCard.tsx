
import { ClauseComparison } from '../../types/legal';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function ClauseDiffCard({ comparison }: { comparison: ClauseComparison }) {
  const isDocBFavored = comparison.favorability === 'favors_doc_b';

  return (
    <Card className="overflow-hidden shadow-xs hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 bg-slate-50/50 dark:bg-slate-800/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
              {comparison.materiality.toUpperCase()} CHANGE
            </span>
            <span className="text-xs font-mono text-slate-400">
              {comparison.clauseA?.section || comparison.clauseB?.section}
            </span>
          </div>
          <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {comparison.topic}
          </CardTitle>
        </div>

        <Badge variant={isDocBFavored ? 'success' : 'default'} size="sm">
          {comparison.favorability === 'favors_doc_b'
            ? '✓ Favors Tenant / Counter-Proposal'
            : comparison.favorability === 'favors_doc_a'
            ? 'Favors Landlord / Original'
            : 'Neutral / Balanced'}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Side-by-Side Clause Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Document A (Original) */}
          <div className="p-3.5 rounded-xl border border-red-200/70 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/20 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 dark:text-red-300">
                Document A (Original Draft)
              </span>
              <span className="text-[10px] text-red-500 font-mono">
                {comparison.clauseA?.section}
              </span>
            </div>
            <p className="font-serif italic text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
              "{comparison.clauseA?.text}"
            </p>
            <p className="text-[11px] font-medium text-red-900 dark:text-red-200 pt-1 border-t border-red-200/50 dark:border-red-900/40">
              Summary: {comparison.clauseA?.summary}
            </p>
          </div>

          {/* Document B (Revised / Counter-Proposal) */}
          <div className="p-3.5 rounded-xl border border-emerald-200/70 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Document B (Revised Draft)
              </span>
              <span className="text-[10px] text-emerald-500 font-mono">
                {comparison.clauseB?.section}
              </span>
            </div>
            <p className="font-serif italic text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
              "{comparison.clauseB?.text}"
            </p>
            <p className="text-[11px] font-medium text-emerald-900 dark:text-emerald-200 pt-1 border-t border-emerald-200/50 dark:border-emerald-900/40">
              Summary: {comparison.clauseB?.summary}
            </p>
          </div>
        </div>

        {/* Differences & Impact Explanation */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
          <div>
            <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">
              Legal & Financial Impact:
            </strong>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {comparison.analysis}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <span className="text-blue-700 dark:text-blue-300 font-semibold">
              Recommendation: {comparison.recommendation}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
