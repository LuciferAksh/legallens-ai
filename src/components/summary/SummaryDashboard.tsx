import { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
} from 'lucide-react';
import { LegalDocument } from '../../types/legal';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ActionableChecklist } from './ActionableChecklist';
import { LawyerPrepGuide } from './LawyerPrepGuide';
import { KeyTermsGlossary } from '../analysis/KeyTermsGlossary';
import { exportDocumentAnalysisMarkdown, downloadFile } from '../../utils/exportUtils';

export function SummaryDashboard({ document }: { document: LegalDocument | null }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'lawyer_prep' | 'glossary'>('overview');

  if (!document) {
    return (
      <Card className="p-12 text-center text-slate-500">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-sm">Please select or upload a document to view summary insights.</p>
      </Card>
    );
  }

  const summary = document.summary;

  const handleExportMarkdown = () => {
    const md = exportDocumentAnalysisMarkdown(document);
    downloadFile(md, `${document.name.replace(/\.[^/.]+$/, '')}_LegalLens_Report.md`, 'text/markdown');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Legal Intelligence Brief: {document.name}
            </h2>
            <Badge variant="outline" size="sm" className="capitalize">
              {document.metadata.detectedType.replace('_', ' ')}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated synthesis across {document.clauses.length} clauses, obligations, and risk indices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleExportMarkdown}
          >
            Export Report (.md)
          </Button>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Printer className="w-4 h-4" />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Executive Overview
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'checklist'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Action Checklist ({summary?.checklist.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('lawyer_prep')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'lawyer_prep'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Lawyer Prep Guide ({summary?.lawyerPrepGuide.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('glossary')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'glossary'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Defined Terms ({summary?.keyTerms.length || 0})
        </button>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {/* Executive Summary Card */}
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Executive Plain-Language Summary</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">High-level operational overview</p>
              </div>
              <Badge variant="risk" riskSeverity={summary?.overallRiskSeverity || 'critical'} size="md">
                Overall: {summary?.overallRiskScore || 78}/100 Risk
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {summary?.executiveSummary ||
                  'This document establishes formal contractual relationships between the parties. High-risk terms have been isolated in the Risk Matrix.'}
              </p>
            </CardContent>
          </Card>

          {/* Quick Checklist Preview & Quick Lawyer Prep Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {summary?.checklist && (
              <ActionableChecklist initialItems={summary.checklist} />
            )}
            {summary?.lawyerPrepGuide && (
              <LawyerPrepGuide items={summary.lawyerPrepGuide} />
            )}
          </div>
        </div>
      )}

      {/* Checklist Tab */}
      {activeTab === 'checklist' && summary?.checklist && (
        <div className="animate-fade-in">
          <ActionableChecklist initialItems={summary.checklist} />
        </div>
      )}

      {/* Lawyer Prep Tab */}
      {activeTab === 'lawyer_prep' && summary?.lawyerPrepGuide && (
        <div className="animate-fade-in">
          <LawyerPrepGuide items={summary.lawyerPrepGuide} />
        </div>
      )}

      {/* Glossary Tab */}
      {activeTab === 'glossary' && summary?.keyTerms && (
        <div className="animate-fade-in">
          <KeyTermsGlossary terms={summary.keyTerms} />
        </div>
      )}
    </div>
  );
}
