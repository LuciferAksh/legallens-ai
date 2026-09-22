import { clsx } from 'clsx';

export interface ProgressBarProps {
  progress: number; // 0 - 100
  label?: string;
  className?: string;
  variant?: 'blue' | 'emerald' | 'amber' | 'gold';
  showPercentage?: boolean;
}

export function ProgressBar({
  progress,
  label,
  className,
  variant = 'blue',
  showPercentage = true,
}: ProgressBarProps) {
  const boundedProgress = Math.max(0, Math.min(100, progress));

  const variantStyles = {
    blue: 'bg-blue-600 dark:bg-blue-500',
    emerald: 'bg-emerald-600 dark:bg-emerald-500',
    amber: 'bg-amber-500 dark:bg-amber-400',
    gold: 'bg-gradient-to-r from-amber-500 to-yellow-400',
  };

  return (
    <div className={clsx('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 mb-1.5 font-medium">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-mono">{Math.round(boundedProgress)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={boundedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
        className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"
      >
        <div
          className={clsx('h-full transition-all duration-300 ease-out rounded-full', variantStyles[variant])}
          style={{ width: `${boundedProgress}%` }}
        />
      </div>
    </div>
  );
}
