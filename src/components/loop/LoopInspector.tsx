/**
 * Loop Engineering Inspector (UI Component)
 * Provides full transparency into the autonomous self-correction loop,
 * showing iteration traces, critique feedback, citation verifications, and readability metrics.
 */

import { useState } from 'react';
import { clsx } from 'clsx';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  Clock,
  Sparkles,
} from 'lucide-react';
import { LoopTelemetry } from '../../services/loopEngine/types';
import { Badge } from '../ui/Badge';
import { getReadabilityLabel } from '../../utils/textProcessing';

export interface LoopInspectorProps {
  telemetry?: LoopTelemetry;
  className?: string;
}

export function LoopInspector({ telemetry, className }: LoopInspectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!telemetry) {
    return (
      <div className={clsx('p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500', className)}>
        <span className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-blue-500 animate-spin" />
          Loop Engineering Engine initialized (Awaiting generation pass...)
        </span>
      </div>
    );
  }

  const readabilityInfo = getReadabilityLabel(telemetry.readabilityGrade);

  return (
    <div
      className={clsx(
        'rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm',
        telemetry.isPassed
          ? 'bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/40 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border-blue-200 dark:border-blue-900/60'
          : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60',
        className,
      )}
    >
      {/* Header Summary Bar */}
      <div className="p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shadow-sm shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                Loop Engineering Engine
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </h4>
              <Badge variant="success" size="sm">
                Verified in {telemetry.iterationCount} {telemetry.iterationCount === 1 ? 'Loop' : 'Loops'}
              </Badge>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Closed-loop self-correction: Act → Observe → Evaluate → Refine
            </p>
          </div>
        </div>

        {/* Telemetry Metric Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Groundedness Metric */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-slate-500 dark:text-slate-400">Groundedness:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {telemetry.groundednessScore}%
            </span>
          </div>

          {/* Readability Metric */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-slate-500 dark:text-slate-400">Readability:</span>
            <span className={clsx('font-semibold', readabilityInfo.color)}>
              Grade {telemetry.readabilityGrade}
            </span>
          </div>

          {/* Hallucination Shield */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-slate-500 dark:text-slate-400">Hallucination Risk:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">
              {telemetry.hallucinationRisk}
            </span>
          </div>

          {/* Execution Time */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{telemetry.durationMs}ms</span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors ml-1"
            aria-expanded={isExpanded}
            aria-label="Toggle loop execution trace"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Step-by-Step Loop Trace Drawer */}
      {isExpanded && (
        <div className="border-t border-blue-100 dark:border-blue-900/40 p-4 bg-white/50 dark:bg-slate-900/60 animate-fade-in space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Autonomous Agent Execution Trace
            </h5>
            <span className="text-[11px] text-slate-400">
              Max Budget: {telemetry.maxIterations} Loops
            </span>
          </div>

          {/* Timeline of Steps */}
          <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 pl-8">
            {telemetry.steps.map((trace) => {
              const iconMap = {
                act: <Sparkles className="w-3.5 h-3.5 text-blue-500" />,
                observe: <BookOpen className="w-3.5 h-3.5 text-indigo-500" />,
                evaluate: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />,
                refine: <RotateCcw className="w-3.5 h-3.5 text-purple-500" />,
                final: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
              };

              return (
                <div key={trace.id} className="relative group">
                  <div className="absolute -left-[30px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-xs">
                    {iconMap[trace.step] || <Cpu className="w-3 h-3 text-slate-500" />}
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 capitalize">
                          {trace.step} (Loop {trace.iteration})
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          — {trace.description}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {trace.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {trace.detail}
                    </p>

                    {trace.metrics && (
                      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                        {trace.metrics.groundednessScore !== undefined && (
                          <span>Groundedness: <strong>{trace.metrics.groundednessScore}%</strong></span>
                        )}
                        {trace.metrics.readabilityGrade !== undefined && (
                          <span>Grade Level: <strong>{trace.metrics.readabilityGrade}</strong></span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Self-Correction Critiques Applied */}
          {telemetry.critiquesApplied.length > 0 && (
            <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-900/50">
              <h6 className="text-xs font-semibold text-purple-900 dark:text-purple-300 mb-1.5 flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Auto-Critiques Applied & Rectified:
              </h6>
              <ul className="list-disc list-inside text-xs text-purple-800/90 dark:text-purple-200/90 space-y-1">
                {telemetry.critiquesApplied.map((critique, idx) => (
                  <li key={idx}>{critique}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
