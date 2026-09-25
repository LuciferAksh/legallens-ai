import { describe, it, expect } from 'vitest';
import { buildRiskAnalysisPrompt } from '../prompts/riskAnalysisPrompt';
import { buildSimplifyPrompt } from '../prompts/simplifyPrompt';
import { buildSummaryPrompt } from '../prompts/summaryPrompt';
import { buildChatSystemPrompt, formatChatHistory } from '../prompts/chatPrompt';
import { buildComparisonPrompt } from '../prompts/comparisonPrompt';
import { buildClauseClassifierPrompt } from '../prompts/clauseClassifierPrompt';
import { SAMPLE_RENTAL_AGREEMENT, SAMPLE_NDA } from '../../constants/sampleDocuments';
import { ChatMessage } from '../../types/legal';

describe('AI prompt builders', () => {
  it('constructs risk analysis prompt with clauses and jurisdiction context', () => {
    const prompt = buildRiskAnalysisPrompt(SAMPLE_RENTAL_AGREEMENT.clauses, 'rental_agreement', 'Karnataka, India');
    expect(prompt).toContain('rental_agreement');
    expect(prompt).toContain('Karnataka, India');
    expect(prompt).toContain('Risk Evaluation Rubric:');
    expect(prompt).toContain('sourceQuote');
    expect(prompt).toContain(SAMPLE_RENTAL_AGREEMENT.clauses[0].sectionPath);
  });

  it('constructs simplify prompt for individual clauses', () => {
    const clause = SAMPLE_RENTAL_AGREEMENT.clauses[0];
    const prompt = buildSimplifyPrompt(clause, 'Karnataka, India');
    expect(prompt).toContain('plainLanguageSummary');
    expect(prompt).toContain('whatYouMustDo');
    expect(prompt).toContain('hiddenTrapsOrRisks');
    expect(prompt).toContain(clause.title);
  });

  it('constructs summary prompt with document metadata and schema requirements', () => {
    const prompt = buildSummaryPrompt(SAMPLE_NDA);
    expect(prompt).toContain(SAMPLE_NDA.name);
    expect(prompt).toContain('executiveSummary');
    expect(prompt).toContain('lawyerPrepGuide');
    expect(prompt).toContain('overallRiskScore');
  });

  it('constructs chat system prompt enforcing citation and refusal calibration', () => {
    const prompt = buildChatSystemPrompt(SAMPLE_RENTAL_AGREEMENT);
    expect(prompt).toContain('CRITICAL GROUNDING RULES:');
    expect(prompt).toContain('REFUSAL CALIBRATION:');
    expect(prompt).toContain('citations');
  });

  it('formats chat history correctly for Gemini API', () => {
    const messages: ChatMessage[] = [
      { id: '1', sender: 'user', content: 'What is the deposit amount?', timestamp: '12:00' },
      { id: '2', sender: 'assistant', content: 'The deposit is ₹3,50,000.', timestamp: '12:01' },
    ];
    const history = formatChatHistory(messages);
    expect(history.length).toBe(2);
    expect(history[0].role).toBe('user');
    expect(history[1].role).toBe('model');
    expect(history[0].parts[0].text).toBe('What is the deposit amount?');
  });

  it('constructs comparison prompt for diffing two contracts', () => {
    const prompt = buildComparisonPrompt(SAMPLE_RENTAL_AGREEMENT.rawText, SAMPLE_NDA.rawText);
    expect(prompt).toContain('Document A');
    expect(prompt).toContain('Document B');
    expect(prompt).toContain('Task:');
  });

  it('constructs clause classification prompt', () => {
    const clause = SAMPLE_RENTAL_AGREEMENT.clauses[0];
    const prompt = buildClauseClassifierPrompt(clause);
    expect(prompt).toContain(clause.title);
    expect(prompt).toContain(clause.sectionPath);
    expect(prompt).toContain('Instructions:');
  });
});
