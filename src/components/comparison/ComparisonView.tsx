import { useState } from 'react';
import { GitCompare, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import { useDocumentStore } from '../../store/documentStore';
import { useDocumentComparison } from '../../hooks/useDocumentComparison';
import { ClauseDiffCard } from './ClauseDiffCard';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SAMPLE_RENTAL_AGREEMENT, SAMPLE_COMPARISON_TARGET } from '../../constants/sampleDocuments';

export function ComparisonView() {
  const { documents } = useDocumentStore();
  const [docAId, setDocAId] = useState(documents[0]?.id || SAMPLE_RENTAL_AGREEMENT.id);
  const [docBId, setDocBId] = useState(SAMPLE_COMPARISON_TARGET.id);

  const { isComparing, comparisonSession, compareDocuments } = useDocumentComparison();

  const docA = documents.find((d) => d.id === docAId) || SAMPLE_RENTAL_AGREEMENT;
  const docB =
    documents.find((d) => d.id === docBId) ||
    (docBId === SAMPLE_COMPARISON_TARGET.id ? SAMPLE_COMPARISON_TARGET : documents[1] || SAMPLE_COMPARISON_TARGET);

  const handleRunComparison = () => {
    compareDocuments(docA, docB);
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold">Intelligent Contract Comparison & Redline Engine</h2>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <p className="text-xs text-indigo-100 mt-1 max-w-xl leading-relaxed">
            Upload two contract drafts or select counter-proposals to visualize clause-by-clause differences, evaluate materiality, and identify whether changes favor you or the counterparty.
          </p>
        </div>

        <Button
          variant="gold"
          size="md"
          leftIcon={<GitCompare className="w-4 h-4" />}
          isLoading={isComparing}
          onClick={handleRunComparison}
          className="shrink-0"
        >
          {comparisonSession ? 'Re-run Comparison' : 'Compare Contracts'}
        </Button>
      </div>

      {/* Dual Document Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Document A Selector */}
        <Card className="p-4 border-l-4 border-l-red-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Baseline / Original Contract (Doc A)
          </span>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-500 shrink-0" />
            <select
              aria-label="Select baseline contract A"
              value={docAId}
              onChange={(e) => setDocAId(e.target.value)}
              className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </Card>

        {/* Document B Selector */}
        <Card className="p-4 border-l-4 border-l-emerald-500">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Revised / Counter-Proposal Draft (Doc B)
          </span>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
            <select
              aria-label="Select revised contract B"
              value={docBId}
              onChange={(e) => setDocBId(e.target.value)}
              className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={SAMPLE_COMPARISON_TARGET.id}>
                {SAMPLE_COMPARISON_TARGET.name} (Tenant Counter-Proposal)
              </option>
              {documents.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </Card>
      </div>

      {/* Comparison Results */}
      {comparisonSession && (
        <div className="space-y-6 animate-fade-in">
          {/* Executive Diff Summary */}
          <Card className="border-t-4 border-t-purple-600">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Executive Comparison Summary</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Synthesized analysis of material shifts between drafts.
                </p>
              </div>
              <Badge variant="success" size="md">
                ✓ Doc B (Counter-Proposal) Strongly Recommended
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {comparisonSession.overallComparisonSummary}
              </p>

              {/* Major Takeaways Grid */}
              <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/60 space-y-2">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-300 block">
                  Key Strategic Wins in Revised Draft (Doc B):
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-purple-800 dark:text-purple-200">
                  {comparisonSession.majorTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Clause-by-Clause Differences List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Clause-by-Clause Material Changes ({comparisonSession.clausesComparison.length})
            </h3>

            <div className="space-y-4">
              {comparisonSession.clausesComparison.map((comp) => (
                <ClauseDiffCard key={comp.id} comparison={comp} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
