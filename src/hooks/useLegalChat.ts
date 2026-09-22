/**
 * Hook: useLegalChat
 * Manages streaming conversational Q&A with document citations and follow-up generation.
 */

import { useState, useCallback } from 'react';
import { LegalDocument, ChatMessage, ChatCitation } from '../types/legal';
import { useAnalysisStore } from '../store/analysisStore';
import { geminiClient } from '../services/geminiClient';
import { buildChatSystemPrompt } from '../services/prompts/chatPrompt';
import { announceToScreenReader } from '../utils/accessibility';

export function useLegalChat(document: LegalDocument | null) {
  const [inputQuery, setInputQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatMessages = useAnalysisStore((s) => (document ? s.chatMessages[document.id] || [] : []));
  const addChatMessage = useAnalysisStore((s) => s.addChatMessage);
  const updateLastChatMessage = useAnalysisStore((s) => s.updateLastChatMessage);

  const sendMessage = useCallback(
    async (queryText?: string) => {
      const text = (queryText || inputQuery).trim();
      if (!text || !document || isSending) return;

      setInputQuery('');
      setIsSending(true);

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        content: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const assistantPlaceholder: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true,
      };

      addChatMessage(document.id, userMsg);
      addChatMessage(document.id, assistantPlaceholder);
      announceToScreenReader('Searching document clauses and preparing answer...', 'polite');

      const systemInstruction = buildChatSystemPrompt(document);

      let accumulated = '';
      await geminiClient.streamGenerateContent(
        text,
        {
          onChunk: (chunk) => {
            accumulated += chunk;
            // Clean away meta block while streaming
            const displayPart = accumulated.split('```meta')[0].trim();
            updateLastChatMessage(document.id, displayPart);
          },
          onComplete: (full) => {
            let cleanDisplay = full;
            let citations: ChatCitation[] | undefined;

            // Extract ```meta ... ```
            const metaMatch = full.match(/```meta\s*([\s\S]*?)\s*```/i);
            if (metaMatch && metaMatch[1]) {
              try {
                const parsedMeta = JSON.parse(metaMatch[1]);
                citations = parsedMeta.citations;
                cleanDisplay = full.replace(/```meta[\s\S]*?```/i, '').trim();
              } catch {
                // ignore meta parse error
              }
            }

            updateLastChatMessage(document.id, cleanDisplay, citations);
            setIsSending(false);
            announceToScreenReader('Answer ready with verified clause citations.', 'polite');
          },
          onError: (err) => {
            console.error('Chat error:', err);
            updateLastChatMessage(
              document.id,
              'I encountered an error retrieving this from the document. Please try asking again.',
            );
            setIsSending(false);
          },
        },
        { systemInstruction },
      );
    },
    [inputQuery, document, isSending, addChatMessage, updateLastChatMessage],
  );

  return {
    messages: chatMessages,
    inputQuery,
    setInputQuery,
    isSending,
    sendMessage,
  };
}
