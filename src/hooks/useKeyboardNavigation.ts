/**
 * Hook: useKeyboardNavigation
 * Accessible global keyboard shortcuts and tab switching (WCAG 2.1 AA).
 */

import { useEffect } from 'react';
import { useUiStore } from '../store/uiStore';

export function useKeyboardNavigation() {
  const setActiveTab = useUiStore((s) => s.setActiveTab);
  const setApiKeyModalOpen = useUiStore((s) => s.setApiKeyModalOpen);
  const setLoopInspectorOpen = useUiStore((s) => s.setLoopInspectorOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is actively typing in an input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        if (e.key === 'Escape') {
          target.blur();
        }
        return;
      }

      // Escape closes open modals
      if (e.key === 'Escape') {
        setApiKeyModalOpen(false);
        setLoopInspectorOpen(false);
      }

      // Quick tab switching via keys 1-6
      if (e.key === '1') setActiveTab('summary');
      if (e.key === '2') setActiveTab('simplify');
      if (e.key === '3') setActiveTab('risks');
      if (e.key === '4') setActiveTab('obligations');
      if (e.key === '5') setActiveTab('compare');
      if (e.key === '6') setActiveTab('chat');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTab, setApiKeyModalOpen, setLoopInspectorOpen]);
}
