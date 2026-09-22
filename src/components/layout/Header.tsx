import { Scale, Key, Moon, Sun, Cpu, Sparkles, FileText } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { useDocumentStore } from '../../store/documentStore';
import { geminiClient } from '../../services/geminiClient';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { maskApiKey } from '../../utils/sanitize';

export function Header() {
  const { theme, toggleTheme, setApiKeyModalOpen, setLoopInspectorOpen } = useUiStore();
  const { documents, activeDocument, setActiveDocumentById } = useDocumentStore();
  const hasKey = geminiClient.hasApiKey();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between transition-colors">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              LegalLens
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Exclusive
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
            AI Legal Access & Intelligence with Loop Engineering
          </p>
        </div>
      </div>

      {/* Center: Active Document Selector */}
      <div className="hidden md:flex items-center gap-2 max-w-sm">
        <FileText className="w-4 h-4 text-slate-400 shrink-0" />
        <select
          aria-label="Active Legal Document"
          value={activeDocument?.id || ''}
          onChange={(e) => setActiveDocumentById(e.target.value)}
          className="text-xs font-medium bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[220px] truncate"
        >
          {documents.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
        {activeDocument && (
          <Badge variant="outline" size="sm" className="hidden lg:inline-flex capitalize">
            {activeDocument.metadata.detectedType.replace('_', ' ')}
          </Badge>
        )}
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-2">
        {/* Loop Engine Status Indicator */}
        <button
          onClick={() => setLoopInspectorOpen(true)}
          title="Open Loop Engineering Telemetry Inspector"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 transition-colors"
        >
          <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>Loop Engine</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        {/* Gemini API Key Config */}
        <Button
          variant={hasKey ? 'outline' : 'gold'}
          size="sm"
          leftIcon={<Key className="w-3.5 h-3.5" />}
          onClick={() => setApiKeyModalOpen(true)}
          className="text-xs"
        >
          {hasKey ? (
            <span className="font-mono text-[11px]">{maskApiKey(geminiClient.getApiKey())}</span>
          ) : (
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Connect Key
            </span>
          )}
        </Button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
