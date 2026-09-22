import { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Copy,
  Check,
  Filter,
  TrendingDown,
  Info,
  Scale,
  Sparkles,
} from 'lucide-react';
import { LegalDocument, RiskAssessment } from '../../types/legal';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { getRiskScoreColor } from '../../utils/formatters';
import { RISK_SEVERITY_CONFIG, RISK_CATEGORY_LABELS } from '../../constants';

export function RiskDashboard({
  document,
  risks,
}: {
  document: LegalDocument | null;
  risks: RiskAssessment[];
}) {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!document || risks.length === 0) {
    return (
      <Card className="p-12 text-center text-slate-500">
        <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-sm">No risks detected yet. Click "Analyze Document" to run detection.</p>
      </Card>
    );
  }

  const overallScore = document.summary?.overallRiskScore ?? 75;
  const scoreInfo = getRiskScoreColor(overallScore);

  const filteredRisks = risks.filter((r) => {
    if (selectedSeverity !== 'all' && r.severity !== selectedSeverity) return false;
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    return true;
  });

  const handleCopyRedline = (id: string, text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const criticalCount = risks.filter((r) => r.severity === 'critical').length;
  const highCount = risks.filter((r) => r.severity === 'high').length;
  const mediumCount = risks.filter((r) => r.severity === 'medium').length;

  return (
    <div className="space-y-6">
      {/* Top Risk Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Score Gauge */}
        <Card className="p-5 flex flex-col justify-between border-l-4 border-l-red-500">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Overall Risk Profile
            </span>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold ${scoreInfo.color}`}>
                {overallScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
              {scoreInfo.label}
            </p>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
            <div className={`h-full ${scoreInfo.bg}`} style={{ width: `${overallScore}%` }} />
          </div>
        </Card>

        {/* Critical Red Flags */}
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-red-600">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Critical Red Flags
            </span>
            <span className="text-3xl font-extrabold text-red-600 dark:text-red-400">
              {criticalCount}
            </span>
            <p className="text-xs text-slate-500 mt-0.5">Disproportionate liabilities & traps</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </Card>

        {/* High Concerns */}
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-orange-500">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              High Concerns
            </span>
            <span className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">
              {highCount}
            </span>
            <p className="text-xs text-slate-500 mt-0.5">Heavy covenants needing revision</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center shrink-0">
            <TrendingDown className="w-5 h-5" />
          </div>
        </Card>

        {/* Caution Points */}
        <Card className="p-5 flex items-center justify-between border-l-4 border-l-amber-500">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Caution Notes
            </span>
            <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {mediumCount}
            </span>
            <p className="text-xs text-slate-500 mt-0.5">Clarify before final execution</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Findings:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Severity filter buttons */}
          {(['all', 'critical', 'high', 'medium'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                selectedSeverity === sev
                  ? 'bg-slate-900 text-white dark:bg-blue-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {sev.toUpperCase()}
            </button>
          ))}

          {/* Category Dropdown */}
          <select
            aria-label="Filter risks by category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <option value="all">All Categories</option>
            {Object.entries(RISK_CATEGORY_LABELS).map(([cat, label]) => (
              <option key={cat} value={cat}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Risk Cards List */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => {
          const sevConfig = RISK_SEVERITY_CONFIG[risk.severity];

          return (
            <Card
              key={risk.id}
              className={`border-l-4 ${
                risk.severity === 'critical'
                  ? 'border-l-red-600'
                  : risk.severity === 'high'
                  ? 'border-l-orange-500'
                  : 'border-l-amber-500'
              } overflow-hidden shadow-xs hover:shadow-md transition-shadow`}
            >
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="risk" riskSeverity={risk.severity} size="sm">
                      {sevConfig.label}
                    </Badge>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                      {RISK_CATEGORY_LABELS[risk.category] || risk.category}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-xs font-mono text-slate-500">{risk.sectionPath}</span>
                  </div>
                  <CardTitle className="text-base text-slate-900 dark:text-slate-100">
                    {risk.title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-1">
                {/* Verbatim Source Quote (Ground Truth Verification) */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Verbatim Contract Excerpt (Verified Citation)
                  </span>
                  <p className="font-serif italic text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{risk.sourceQuote}"
                  </p>
                </div>

                {/* Explanation & Practical Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <strong className="text-slate-700 dark:text-slate-300 block">
                      Why It Is Unfavorable
                    </strong>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {risk.explanation}
                    </p>
                  </div>
                  <div className="space-y-1 p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                    <strong className="text-amber-800 dark:text-amber-300 block">
                      Direct Practical Impact On You
                    </strong>
                    <p className="text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                      {risk.practicalImpact}
                    </p>
                  </div>
                </div>

                {/* Action & Redline Counter-Proposal */}
                <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      Recommended Counter-Proposal & Redline
                    </span>
                    {risk.suggestedNegotiationRedline && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[11px] gap-1 text-blue-700 dark:text-blue-300"
                        onClick={() => handleCopyRedline(risk.id, risk.suggestedNegotiationRedline)}
                      >
                        {copiedId === risk.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copied Redline
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy Redline
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    <strong>Strategy:</strong> {risk.recommendedAction}
                  </p>
                  {risk.suggestedNegotiationRedline && (
                    <div className="mt-1 p-2 rounded bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/40 font-mono text-[11px] text-blue-800 dark:text-blue-300">
                      "{risk.suggestedNegotiationRedline}"
                    </div>
                  )}
                </div>

                {/* Statutory Basis if applicable */}
                {risk.legalBasisOrJurisdictionNotice && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <Scale className="w-3.5 h-3.5 text-blue-500" />
                    <span>Statutory Grounding: {risk.legalBasisOrJurisdictionNotice}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
