import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { NavTabId } from './components/layout/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { UploadPage } from './pages/UploadPage';
import { SimplifyPage } from './pages/SimplifyPage';
import { RisksPage } from './pages/RisksPage';
import { ObligationsPage } from './pages/ObligationsPage';
import { ComparePage } from './pages/ComparePage';
import { ChatPage } from './pages/ChatPage';
import { SummaryPage } from './pages/SummaryPage';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

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
        {renderActivePage()}
      </AppLayout>
    </ErrorBoundary>
  );
}

export default App;
