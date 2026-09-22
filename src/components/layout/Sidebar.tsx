import {
  LayoutDashboard,
  Upload,
  BookOpen,
  AlertTriangle,
  CalendarCheck,
  GitCompare,
  MessageSquare,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { useDocumentStore } from '../../store/documentStore';
import { clsx } from 'clsx';

export type NavTabId =
  | 'dashboard'
  | 'upload'
  | 'simplify'
  | 'risks'
  | 'obligations'
  | 'compare'
  | 'chat'
  | 'summary';

interface NavItem {
  id: NavTabId;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
  { id: 'upload', label: 'Upload & Parse', icon: Upload },
  { id: 'simplify', label: 'Plain Language Translate', icon: BookOpen },
  { id: 'risks', label: 'Risk & Red Flags Matrix', icon: AlertTriangle, badge: 'High Impact' },
  { id: 'obligations', label: 'Obligation Tracker', icon: CalendarCheck },
  { id: 'compare', label: 'Contract Comparison', icon: GitCompare },
  { id: 'chat', label: 'Document Q&A Chat', icon: MessageSquare },
  { id: 'summary', label: 'Summary & Lawyer Prep', icon: FileCheck2 },
];

export function Sidebar({
  currentTab,
  onSelectTab,
}: {
  currentTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
}) {
  const { sidebarOpen } = useUiStore();
  const { loadSampleDocument, activeDocument } = useDocumentStore();

  return (
    <aside
      className={clsx(
        'w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between transition-all duration-200 shrink-0 select-none',
        !sidebarOpen && 'hidden md:flex',
      )}
    >
      {/* Navigation Links */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Core Workspaces
        </div>
        <nav aria-label="Main Navigation" className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={clsx(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group',
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100',
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={clsx(
                      'w-4 h-4 transition-colors',
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300',
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Quick Sample Contract Loader */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Quick Sample Demos</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 px-1">
          <button
            onClick={() => loadSampleDocument('rental')}
            className={clsx(
              'px-2 py-1.5 text-[11px] text-left rounded-lg border transition-all truncate',
              activeDocument?.id === 'sample-rental-agreement-01'
                ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-medium'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400',
            )}
            title="Load Bengaluru Rental Lease Sample"
          >
            🏠 Lease Draft
          </button>
          <button
            onClick={() => loadSampleDocument('employment')}
            className={clsx(
              'px-2 py-1.5 text-[11px] text-left rounded-lg border transition-all truncate',
              activeDocument?.id === 'sample-employment-agreement-02'
                ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-medium'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400',
            )}
            title="Load Tech Employment Offer Sample"
          >
            💼 Tech Offer
          </button>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
            Prompt Wars Exclusive
          </div>
          Targeting 100% compliance with Problem Statement Alignment, Security, and Code Quality.
        </div>
      </div>
    </aside>
  );
}
