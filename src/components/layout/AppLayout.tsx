import React from 'react';
import { Header } from './Header';
import { Sidebar, NavTabId } from './Sidebar';
import { SkipLink } from '../ui/SkipLink';
import { Disclaimer } from '../ui/Disclaimer';
import { ApiKeyModal } from '../common/ApiKeyModal';
import { LoopInspectorModal } from '../loop/LoopInspectorModal';

export interface AppLayoutProps {
  currentTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  children: React.ReactNode;
}

export function AppLayout({ currentTab, onSelectTab, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans">
      <SkipLink targetId="main-content" />

      {/* Top Header */}
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar currentTab={currentTab} onSelectTab={onSelectTab} />

        {/* Main Content Area */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto focus:outline-none flex flex-col"
        >
          {/* Top Legal Disclaimer Banner */}
          <div className="px-4 sm:px-6 pt-4">
            <Disclaimer type="banner" compact />
          </div>

          <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <ApiKeyModal />
      <LoopInspectorModal />
    </div>
  );
}
