/**
 * Formatting helpers for UI presentation
 */

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export function formatDate(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return isoDate;
  }
}

export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getRiskScoreColor(score: number): {
  color: string;
  bg: string;
  border: string;
  label: string;
} {
  if (score >= 75) {
    return {
      color: 'text-red-700 dark:text-red-400',
      bg: 'bg-red-500',
      border: 'border-red-500',
      label: 'High Legal Risk',
    };
  }
  if (score >= 50) {
    return {
      color: 'text-orange-700 dark:text-orange-400',
      bg: 'bg-orange-500',
      border: 'border-orange-500',
      label: 'Moderate Legal Risk',
    };
  }
  if (score >= 25) {
    return {
      color: 'text-amber-700 dark:text-amber-400',
      bg: 'bg-amber-500',
      border: 'border-amber-500',
      label: 'Low / Standard Risk',
    };
  }
  return {
    color: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-500',
    border: 'border-emerald-500',
    label: 'Favorable Terms',
  };
}
