import React from 'react';
import { clsx } from 'clsx';
import { RiskSeverity } from '../../types/legal';
import { RISK_SEVERITY_CONFIG } from '../../constants';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'risk' | 'success' | 'warning' | 'info';
  riskSeverity?: RiskSeverity;
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  riskSeverity,
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  let badgeStyle = 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';

  if (variant === 'risk' && riskSeverity) {
    badgeStyle = RISK_SEVERITY_CONFIG[riskSeverity]?.badgeClass || badgeStyle;
  } else if (variant === 'outline') {
    badgeStyle = 'bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300';
  } else if (variant === 'success') {
    badgeStyle = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
  } else if (variant === 'warning') {
    badgeStyle = 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
  } else if (variant === 'info') {
    badgeStyle = 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
  }

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border leading-none font-medium transition-colors select-none',
        badgeStyle,
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
