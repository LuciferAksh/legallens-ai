import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { KeyTermDefinition } from '../../types/legal';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export function KeyTermsGlossary({ terms }: { terms: KeyTermDefinition[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.plainEnglishExplanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.legalMeaning.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            Plain-English Legal Glossary ({terms.length})
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5">
            Key defined terms from this document translated into everyday language.
          </p>
        </div>

        <div className="relative w-full sm:w-60">
          <input
            type="text"
            placeholder="Search defined terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 p-8 text-center text-xs text-slate-400">
            No terms matched your search.
          </div>
        ) : (
          filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-300 dark:hover:border-blue-700 transition-colors space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300">
                  {item.term}
                </h4>
                {item.definedInClause && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {item.definedInClause}
                  </span>
                )}
              </div>

              <div className="text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Plain English Meaning
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-medium">
                  {item.plainEnglishExplanation}
                </p>
              </div>

              <div className="text-xs space-y-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                  Why It Matters To You
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  {item.whyItMattersToYou}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
