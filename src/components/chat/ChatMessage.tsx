import { useState } from 'react';
import { User, Scale, Copy, Check, Quote } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types/legal';
import { cleanMarkdown } from '../../utils/sanitize';

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
          <Scale className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-2xl rounded-2xl p-4 space-y-2.5 transition-all shadow-xs ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-xs'
            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-xs'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold text-[11px] opacity-75">
            {isUser ? 'You' : 'LegalLens Assistant'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] opacity-60 font-mono">{message.timestamp}</span>
            {!isUser && message.content && (
              <button
                onClick={handleCopy}
                className="opacity-60 hover:opacity-100 transition-opacity p-0.5"
                title="Copy response"
                aria-label="Copy response"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>
            )}
          </div>
        </div>

        {/* Message Body */}
        <div className="leading-relaxed whitespace-pre-wrap font-sans text-xs">
          {message.content ? cleanMarkdown(message.content) : (
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
              Searching clauses and synthesizing grounded answer...
            </span>
          )}
        </div>

        {/* Citations Box (Groundedness Evidence) */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
              <Quote className="w-3 h-3 text-blue-500" />
              Verified Document Citations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {message.citations.map((c, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-[10px] text-blue-900 dark:text-blue-300 font-medium"
                >
                  Clause {c.clauseNumber} ({c.sectionPath})
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-1">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
