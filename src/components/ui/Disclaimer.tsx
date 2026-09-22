import { clsx } from 'clsx';
import { AlertTriangle, Info, Scale } from 'lucide-react';
import { LEGAL_DISCLAIMERS } from '../../constants/disclaimers';

export interface DisclaimerProps {
  type?: 'banner' | 'summary' | 'risk' | 'comparison' | 'chat' | 'lawyer_prep';
  className?: string;
  compact?: boolean;
}

export function Disclaimer({ type = 'banner', className, compact = false }: DisclaimerProps) {
  const textMap = {
    banner: LEGAL_DISCLAIMERS.BANNER,
    summary: LEGAL_DISCLAIMERS.SUMMARY,
    risk: LEGAL_DISCLAIMERS.RISK,
    comparison: LEGAL_DISCLAIMERS.COMPARISON,
    chat: LEGAL_DISCLAIMERS.CHAT,
    lawyer_prep: LEGAL_DISCLAIMERS.LAWYER_PREP,
  };

  const text = textMap[type];

  if (compact) {
    return (
      <div
        role="note"
        aria-label="Legal Notice"
        className={clsx(
          'flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 py-1.5 px-3 bg-slate-100/70 dark:bg-slate-800/50 rounded-lg border border-slate-200/60 dark:border-slate-800',
          className,
        )}
      >
        <Scale className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
        <span>
          <strong>Informational Only:</strong> Not formal legal advice. Consult a licensed advocate before signing.
        </span>
      </div>
    );
  }

  return (
    <aside
      role="note"
      aria-label="Legal Disclaimer"
      className={clsx(
        'flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs leading-relaxed',
        className,
      )}
    >
      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1">
        <strong className="font-semibold block mb-0.5 text-amber-800 dark:text-amber-300">
          Important Legal Notice & Advisory
        </strong>
        <p className="text-amber-700/90 dark:text-amber-200/90">{text}</p>
      </div>
    </aside>
  );
}

export function JurisdictionNotice({ hint, className }: { hint?: string; className?: string }) {
  if (!hint) return null;

  return (
    <div
      className={clsx(
        'flex items-center gap-2 text-xs py-2 px-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-800 dark:text-blue-300',
        className,
      )}
    >
      <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
      <span>
        <strong>Jurisdiction Framework:</strong> {hint}
      </span>
    </div>
  );
}
