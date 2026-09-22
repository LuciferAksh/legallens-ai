import { useState } from 'react';
import { Key, ShieldCheck, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { geminiClient } from '../../services/geminiClient';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function ApiKeyModal() {
  const { isApiKeyModalOpen, setApiKeyModalOpen } = useUiStore();
  const [keyInput, setKeyInput] = useState(geminiClient.getApiKey());
  const [selectedModel, setSelectedModel] = useState(geminiClient.getModel());
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSave = () => {
    geminiClient.setApiKey(keyInput, true);
    geminiClient.setModel(selectedModel);
    setApiKeyModalOpen(false);
  };

  const handleTestConnection = async () => {
    if (!keyInput.trim()) {
      setTestStatus('failed');
      setStatusMessage('Please enter an API key to test.');
      return;
    }

    setTestStatus('testing');
    setStatusMessage('Verifying connection with Google Generative AI API...');

    try {
      geminiClient.setApiKey(keyInput, false);
      geminiClient.setModel(selectedModel);
      const res = await geminiClient.generateContent('Respond with "OK" if connected.', { maxRetries: 0 });
      if (res.text) {
        setTestStatus('success');
        setStatusMessage('Connection confirmed! API key is valid.');
      } else {
        setTestStatus('failed');
        setStatusMessage('No response returned from model.');
      }
    } catch (err) {
      setTestStatus('failed');
      setStatusMessage(err instanceof Error ? err.message : 'Connection test failed.');
    }
  };

  return (
    <Modal
      isOpen={isApiKeyModalOpen}
      onClose={() => setApiKeyModalOpen(false)}
      title="Google Gemini AI Configuration"
      description="Connect your Google AI Studio API key for live analysis and streaming."
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Security assurance note */}
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-start gap-2.5 text-xs text-blue-900 dark:text-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong>Client-Side Security:</strong> Your API key is stored locally in your browser memory and never transmitted to any third-party server other than official Google AI endpoints.
          </span>
        </div>

        {/* API Key Input */}
        <div>
          <label htmlFor="gemini-api-key" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Gemini API Key
          </label>
          <div className="relative">
            <input
              id="gemini-api-key"
              type="password"
              value={keyInput}
              onChange={(e) => {
                setKeyInput(e.target.value);
                setTestStatus('idle');
              }}
              placeholder="AIzaSy..."
              className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Key className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>Don't have a key?</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center gap-1 font-medium"
            >
              Get free key from Google AI Studio <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Model Selection */}
        <div>
          <label htmlFor="model-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Target Model
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="gemini-2.0-flash">gemini-2.0-flash (Recommended: Ultra fast & cost-efficient)</option>
            <option value="gemini-1.5-flash">gemini-1.5-flash</option>
            <option value="gemini-1.5-pro">gemini-1.5-pro (Deep reasoning for complex multi-page contracts)</option>
          </select>
        </div>

        {/* Test Result Message */}
        {testStatus !== 'idle' && (
          <div
            className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
              testStatus === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                : testStatus === 'testing'
                ? 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800'
                : 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800'
            }`}
          >
            {testStatus === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : testStatus === 'testing' ? (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTestConnection}
            isLoading={testStatus === 'testing'}
          >
            Test Connection
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setApiKeyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleSave}>
              Save & Apply
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
