import { useState } from 'react';
import { FileText, Search, Info } from 'lucide-react';
import { LegalDocument } from '../../types/legal';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatFileSize, formatDate } from '../../utils/formatters';

export function DocumentPreview({ document }: { document: LegalDocument | null }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!document) {
    return (
      <Card className="p-8 text-center text-slate-500">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
        <p className="text-sm">No document selected. Please upload or choose a sample contract.</p>
      </Card>
    );
  }

  const filteredClauses = document.clauses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rawText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.sectionPath.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Document Metadata Bar */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{document.name}</CardTitle>
              <Badge variant="outline" size="sm" className="capitalize">
                {document.metadata.detectedType.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
              <span>Size: <strong>{formatFileSize(document.metadata.fileSize)}</strong></span>
              <span>Words: <strong>{document.metadata.wordCount.toLocaleString()}</strong></span>
              <span>Clauses: <strong>{document.clauses.length}</strong></span>
              <span>Uploaded: <strong>{formatDate(document.uploadedAt)}</strong></span>
            </div>
          </div>

          {/* Search within document */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search clauses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
          </div>
        </CardHeader>

        {/* Clause Segmentation Viewer */}
        <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800 max-h-[600px] overflow-y-auto">
          {filteredClauses.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No clauses matched "{searchTerm}".
            </div>
          ) : (
            filteredClauses.map((clause, idx) => (
              <div
                key={clause.id}
                className="p-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px] font-semibold flex items-center justify-center shrink-0">
                      {clause.clauseNumber || idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {clause.title}
                    </h4>
                  </div>
                  <Badge variant="risk" riskSeverity={clause.riskLevel} size="sm">
                    {clause.riskLevel.toUpperCase()}
                  </Badge>
                </div>

                <p className="text-xs font-mono text-slate-400">
                  {clause.sectionPath}
                </p>

                <p className="text-xs text-slate-700 dark:text-slate-300 font-serif leading-relaxed pl-8 border-l-2 border-slate-200 dark:border-slate-700">
                  {clause.rawText}
                </p>

                {clause.indianLawReference && (
                  <div className="ml-8 mt-1 text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1.5 font-medium">
                    <Info className="w-3 h-3" />
                    <span>Reference: {clause.indianLawReference}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
