import { useRef, useEffect } from 'react';
import { Send, MessageSquare, ShieldCheck } from 'lucide-react';
import { useLegalChat } from '../../hooks/useLegalChat';
import { useDocumentStore } from '../../store/documentStore';
import { ChatMessage } from './ChatMessage';
import { SuggestedQuestions } from './SuggestedQuestions';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function LegalChatInterface() {
  const { activeDocument } = useDocumentStore();
  const { messages, inputQuery, setInputQuery, isSending, sendMessage } = useLegalChat(activeDocument);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      sendMessage();
    }
  };

  if (!activeDocument) {
    return (
      <Card className="p-12 text-center text-slate-500">
        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-sm">Please select or upload a document to begin questioning.</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-[750px] space-y-4">
      {/* Top Header Information */}
      <Card className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Grounded Legal Q&A Assistant
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
              Zero-Hallucination Guardrails
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Active Context: <strong>{activeDocument.name}</strong> ({activeDocument.clauses.length} clauses indexed)
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          <span>Refusal calibrated: Declines to invent terms not present in contract.</span>
        </div>
      </Card>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips */}
      <div className="shrink-0 px-1">
        <SuggestedQuestions
          docType={activeDocument.metadata.detectedType}
          onSelect={(q) => sendMessage(q)}
          disabled={isSending}
        />
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSubmit} className="flex gap-2 shrink-0">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask anything about ${activeDocument.name} (e.g. deposit, notice, penalties)...`}
          disabled={isSending}
          className="flex-1 text-xs px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs disabled:opacity-60"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSending}
          disabled={!inputQuery.trim() || isSending}
          leftIcon={<Send className="w-4 h-4" />}
          className="px-5 shadow-xs"
        >
          Ask
        </Button>
      </form>
    </div>
  );
}
