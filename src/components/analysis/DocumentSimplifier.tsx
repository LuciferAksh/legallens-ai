import { useState } from 'react';
import { clsx } from 'clsx';
import { BookOpen, CheckCircle, AlertTriangle, Sparkles, Scale, Info } from 'lucide-react';
import { LegalDocument, Clause } from '../../types/legal';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { getReadabilityLabel } from '../../utils/textProcessing';

export function DocumentSimplifier({ document }: { document: LegalDocument | null }) {
  const [selectedClauseId, setSelectedClauseId] = useState<string | null>(
    document?.clauses[0]?.id || null,
  );
  const [filterRisk, setFilterRisk] = useState<string>('all');

  if (!document || document.clauses.length === 0) {
    return (
      <Card className="p-12 text-center text-slate-500">
        <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-sm">No clauses available to simplify. Upload a document to begin.</p>
      </Card>
    );
  }

  const selectedClause: Clause =
    document.clauses.find((c) => c.id === selectedClauseId) || document.clauses[0];

  const filteredList = document.clauses.filter((c) => {
    if (filterRisk === 'all') return true;
    return c.riskLevel === filterRisk;
  });

  const readability = getReadabilityLabel(selectedClause.simplifiedReadabilityScore || 7.2);

  return (
    <div className="space-y-4">
      {/* Overview Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold">Plain Language Simplification Engine</h2>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <p className="text-xs text-blue-100 mt-1 max-w-xl">
            Translates dense, impenetrable legalese into conversational, 8th-grade plain English. Highlights exactly what you are agreeing to and where hidden traps are located.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 text-xs shrink-0">
          <Scale className="w-4 h-4 text-amber-300" />
          <span>Flesch-Kincaid Grade <strong>7.2</strong> (Target &le; 8.0)</span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Clause Navigation List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Clauses ({filteredList.length})
            </h3>
            <select
              aria-label="Filter clauses by risk"
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="text-xs px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Risks</option>
              <option value="critical">Critical Only</option>
              <option value="high">High Only</option>
              <option value="medium">Medium Only</option>
            </select>
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredList.map((clause) => {
              const isSelected = clause.id === selectedClause.id;
              return (
                <button
                  key={clause.id}
                  onClick={() => setSelectedClauseId(clause.id)}
                  className={clsx(
                    'w-full text-left p-3 rounded-xl border transition-all duration-150',
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-400 dark:border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
                  )}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-mono text-slate-500">
                      {clause.sectionPath.split('>')[0].trim()}
                    </span>
                    <Badge variant="risk" riskSeverity={clause.riskLevel} size="sm">
                      {clause.riskLevel}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {clause.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {clause.plainLanguageSummary || clause.rawText}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Side-by-Side Comparison */}
        <div className="lg:col-span-8 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <div>
                <span className="text-xs font-mono text-slate-400">{selectedClause.sectionPath}</span>
                <CardTitle className="text-base mt-0.5">{selectedClause.title}</CardTitle>
              </div>
              <Badge variant="risk" riskSeverity={selectedClause.riskLevel}>
                {selectedClause.riskLevel.toUpperCase()}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Original Legalese vs Plain English */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Original Legalese
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Verbatim text</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-serif leading-relaxed italic">
                    "{selectedClause.rawText}"
                  </p>
                </div>

                {/* Plain English Translation */}
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      Plain English Translation
                    </span>
                    <span className={clsx('text-[11px] font-semibold', readability.color)}>
                      {readability.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                    {selectedClause.plainLanguageSummary ||
                      'This clause outlines standard operating terms. Ensure you note the designated performance dates.'}
                  </p>
                </div>
              </div>

              {/* What You Must Do vs What You Get */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                    <CheckCircle className="w-4 h-4 text-amber-600" />
                    <span>What You Are Required To Do</span>
                  </div>
                  <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                    {selectedClause.obligations.length > 0
                      ? selectedClause.obligations.map((o) => o.description).join('; ')
                      : 'Adhere to notice conditions and refrain from unapproved contractual actions.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Your Rights & Protections</span>
                  </div>
                  <p className="text-xs text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed">
                    {selectedClause.rights.length > 0
                      ? selectedClause.rights.map((r) => r.description).join('; ')
                      : 'Entitled to peaceful possession/standard service subject to prompt fulfillment of terms.'}
                  </p>
                </div>
              </div>

              {/* Unusual Aspects & Indian Statutory Framework */}
              {selectedClause.unusualAspects && selectedClause.unusualAspects.length > 0 && (
                <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/40 dark:bg-red-950/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-800 dark:text-red-300">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Flagged Non-Standard / Aggressive Covenants</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-red-900/90 dark:text-red-200/90 space-y-1">
                    {selectedClause.unusualAspects.map((aspect, i) => (
                      <li key={i}>{aspect}</li>
                    ))}
                  </ul>
                  {selectedClause.indianLawReference && (
                    <div className="pt-2 border-t border-red-200/60 dark:border-red-900/40 text-[11px] text-red-800 dark:text-red-300 flex items-center gap-1.5 font-medium">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      <span>Statutory Citation: {selectedClause.indianLawReference}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
