import { useState, lazy, Suspense } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { NavTabId } from './components/layout/Sidebar';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

// Dynamic route-level code splitting for optimal initial bundle efficiency
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const UploadPage = lazy(() => import('./pages/UploadPage').then(m => ({ default: m.UploadPage })));
const SimplifyPage = lazy(() => import('./pages/SimplifyPage').then(m => ({ default: m.SimplifyPage })));
const RisksPage = lazy(() => import('./pages/RisksPage').then(m => ({ default: m.RisksPage })));
const ObligationsPage = lazy(() => import('./pages/ObligationsPage').then(m => ({ default: m.ObligationsPage })));
const ComparePage = lazy(() => import('./pages/ComparePage').then(m => ({ default: m.ComparePage })));
const ChatPage = lazy(() => import('./pages/ChatPage').then(m => ({ default: m.ChatPage })));
const SummaryPage = lazy(() => import('./pages/SummaryPage').then(m => ({ default: m.SummaryPage })));

/**
 * Accessible page loading fallback spinner
 */
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[360px]" role="status" aria-label="Loading page content">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading module...</span>
      </div>
    </div>
  );
}

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTabId>('dashboard');

  // Register accessible keyboard shortcuts
  useKeyboardNavigation();

  const renderActivePage = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage onNavigate={(tab) => setCurrentTab(tab)} />;
      case 'upload':
        return <UploadPage onAnalyze={() => setCurrentTab('risks')} />;
      case 'simplify':
        return <SimplifyPage />;
      case 'risks':
        return <RisksPage />;
      case 'obligations':
        return <ObligationsPage />;
      case 'compare':
        return <ComparePage />;
      case 'chat':
        return <ChatPage />;
      case 'summary':
        return <SummaryPage />;
      default:
        return <DashboardPage onNavigate={(tab) => setCurrentTab(tab)} />;
    }
  };

  return (
    <ErrorBoundary>
      <AppLayout currentTab={currentTab} onSelectTab={setCurrentTab}>
        <Suspense fallback={<PageLoader />}>
          {renderActivePage()}
        </Suspense>
      </AppLayout>
    </ErrorBoundary>
  );
}

export default App;
