import {
  Scale,
  ShieldAlert,
  GitCompare,
  MessageSquare,
  BookOpen,
  Upload,
  Cpu,
  Sparkles,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { useDocumentStore } from '../store/documentStore';
import { useAnalysisStore } from '../store/analysisStore';
import { useDocumentAnalysis } from '../hooks/useDocumentAnalysis';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoopInspector } from '../components/loop/LoopInspector';
import { NavTabId } from '../components/layout/Sidebar';
import { JurisdictionNotice } from '../components/ui/Disclaimer';
import { RiskAssessment } from '../types/legal';

export function DashboardPage({ onNavigate }: { onNavigate: (tab: NavTabId) => void }) {
  const { activeDocument } = useDocumentStore();
  const { risks, telemetry, isAnalyzing, analysisStatusText, analysisProgress } = useAnalysisStore();
  const { analyzeDocument } = useDocumentAnalysis();

  const docRisks = activeDocument ? risks[activeDocument.id] || activeDocument.risks || [] : [];
  const docTelemetry = activeDocument ? telemetry[activeDocument.id] : undefined;

  const handleRunAnalysis = () => {
    if (activeDocument) {
      analyzeDocument(activeDocument);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-navy-900 to-blue-950 p-6 sm:p-8 text-white overflow-hidden shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Prompt Wars Exclusive • AI for Legal Assistance & Access</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Democratizing Legal Intelligence for Everyone
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Understand contracts in plain English, pinpoint hazardous traps and one-sided clauses, compare negotiated drafts, and verify citations with autonomous <strong>Loop Engineering</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Button
              variant="gold"
              size="md"
              leftIcon={<Sparkles className="w-4 h-4" />}
              isLoading={isAnalyzing}
              onClick={handleRunAnalysis}
            >
              {docRisks.length > 0 ? 'Re-Run Loop Analysis' : 'Analyze Current Document'}
            </Button>

            <Button
              variant="outline"
              size="md"
              leftIcon={<Upload className="w-4 h-4" />}
              onClick={() => onNavigate('upload')}
              className="text-white border-white/20 hover:bg-white/10"
            >
              Upload New Contract
            </Button>

            <Button
              variant="ghost"
              size="md"
              leftIcon={<GitCompare className="w-4 h-4" />}
              onClick={() => onNavigate('compare')}
              className="text-slate-300 hover:text-white hover:bg-white/10"
            >
              Side-by-Side Compare
            </Button>
          </div>
        </div>

        {/* Decorative Watermark */}
        <Scale className="w-96 h-96 absolute -right-12 -bottom-24 text-white/5 pointer-events-none" />
      </div>

      {/* Real-time Analysis Progress Banner (if active) */}
      {isAnalyzing && (
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 animate-pulse-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-900 dark:text-blue-200">
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600 animate-spin" />
              {analysisStatusText || 'Running Autonomous Agent Loop...'}
            </span>
            <span>{analysisProgress}%</span>
          </div>
          <div className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Loop Engineering Telemetry Inspector Preview */}
      <LoopInspector telemetry={docTelemetry} />

      {/* Active Document Quick Stats */}
      {activeDocument && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Document Summary: {activeDocument.name}
            </h3>
            <JurisdictionNotice hint={activeDocument.metadata.jurisdictionHint} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4 cursor-pointer hover:border-blue-400 transition-colors" onClick={() => onNavigate('simplify')}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Clauses Segmented
              </span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {activeDocument.clauses.length}
                </span>
                <BookOpen className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 inline-flex items-center gap-0.5 font-medium">
                Translate in Plain English <ArrowRight className="w-3 h-3" />
              </span>
            </Card>

            <Card className="p-4 cursor-pointer hover:border-red-400 transition-colors" onClick={() => onNavigate('risks')}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Critical Red Flags
              </span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold text-red-600 dark:text-red-400">
                  {docRisks.filter((r: RiskAssessment) => r.severity === 'critical').length}
                </span>
                <ShieldAlert className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-[11px] text-red-600 dark:text-red-400 mt-1 inline-flex items-center gap-0.5 font-medium">
                View Risk Matrix <ArrowRight className="w-3 h-3" />
              </span>
            </Card>

            <Card className="p-4 cursor-pointer hover:border-indigo-400 transition-colors" onClick={() => onNavigate('obligations')}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Your Obligations
              </span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {activeDocument.summary?.obligationsSummary?.userCount || 5}
                </span>
                <TrendingDown className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-1 inline-flex items-center gap-0.5 font-medium">
                Check Deadlines <ArrowRight className="w-3 h-3" />
              </span>
            </Card>

            <Card className="p-4 cursor-pointer hover:border-purple-400 transition-colors" onClick={() => onNavigate('chat')}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Grounded Q&A
              </span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                  Live
                </span>
                <MessageSquare className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-[11px] text-purple-600 dark:text-purple-400 mt-1 inline-flex items-center gap-0.5 font-medium">
                Ask Questions <ArrowRight className="w-3 h-3" />
              </span>
            </Card>
          </div>
        </div>
      )}

      {/* Feature Exploration Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Core GenAI Legal Capabilities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 hover:shadow-md transition-all space-y-3 cursor-pointer" onClick={() => onNavigate('simplify')}>
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                1. Plain Language Simplification
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Rewrites dense clauses at an 8th-grade reading level. Clearly highlights what you must do vs. what rights you get.
              </p>
            </div>
            <span className="text-xs text-blue-600 font-semibold inline-flex items-center gap-1">
              Explore Simplifier <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Card>

          <Card className="p-5 hover:shadow-md transition-all space-y-3 cursor-pointer" onClick={() => onNavigate('compare')}>
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                2. Semantic Contract Comparison
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Compare original drafts against tenant/employee counter-proposals with side-by-side favorability and materiality markers.
              </p>
            </div>
            <span className="text-xs text-purple-600 font-semibold inline-flex items-center gap-1">
              Compare Contracts <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Card>

          <Card className="p-5 hover:shadow-md transition-all space-y-3 cursor-pointer" onClick={() => onNavigate('summary')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                3. Actionable Checklist & Lawyer Prep
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Generates actionable step-by-step checklists, defined terms glossary, and strategic talking points for meeting with an advocate.
              </p>
            </div>
            <span className="text-xs text-emerald-600 font-semibold inline-flex items-center gap-1">
              View Prep Guide <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
}
