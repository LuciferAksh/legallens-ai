/**
 * UI Store (Zustand)
 * Manages theme, layout responsiveness, modals, and user preferences.
 */

import { create } from 'zustand';
import { APP_CONFIG } from '../constants';

interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  isApiKeyModalOpen: boolean;
  isLoopInspectorOpen: boolean;
  activeTab: 'summary' | 'simplify' | 'risks' | 'obligations' | 'compare' | 'chat';

  // Actions
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setApiKeyModalOpen: (open: boolean) => void;
  setLoopInspectorOpen: (open: boolean) => void;
  setActiveTab: (tab: UiState['activeTab']) => void;
}

export const useUiStore = create<UiState>((set) => {
  // Initialize theme from localStorage or system preference
  let initialTheme: 'light' | 'dark' = 'light';
  try {
    const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') {
      initialTheme = saved;
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initialTheme = 'dark';
    }
  } catch {
    // ignore
  }

  // Apply dark class to document
  if (typeof document !== 'undefined') {
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return {
    theme: initialTheme,
    sidebarOpen: true,
    isApiKeyModalOpen: false,
    isLoopInspectorOpen: false,
    activeTab: 'summary',

    toggleTheme: () =>
      set((state) => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        try {
          localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, nextTheme);
        } catch {
          // ignore
        }
        if (typeof document !== 'undefined') {
          if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        return { theme: nextTheme };
      }),

    setTheme: (theme) => {
      try {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, theme);
      } catch {
        // ignore
      }
      if (typeof document !== 'undefined') {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      set({ theme });
    },

    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setApiKeyModalOpen: (open) => set({ isApiKeyModalOpen: open }),
    setLoopInspectorOpen: (open) => set({ isLoopInspectorOpen: open }),
    setActiveTab: (activeTab) => set({ activeTab }),
  };
});
