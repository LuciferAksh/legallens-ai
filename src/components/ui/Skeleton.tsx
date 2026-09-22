import React from 'react';
import { clsx } from 'clsx';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('animate-pulse rounded-md bg-slate-200 dark:bg-slate-800', className)}
      {...props}
    />
  );
}

export function ClauseSkeleton() {
  return (
    <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex gap-2">
        <Skeleton className="h-7 w-24 rounded-lg" />
        <Skeleton className="h-7 w-20 rounded-lg" />
      </div>
    </div>
  );
}
