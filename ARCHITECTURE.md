# LegalLens Technical Architecture & System Design

This document details the architectural principles, data flow, agentic Loop Engineering mechanics, security policies, and performance optimizations implemented in **LegalLens**.

---

## 1. High-Level Architectural Layers

LegalLens is built around a decoupled 5-tier architecture:

```
┌────────────────────────────────────────────────────────┐
│                   1. Presentation Layer                │
│    React 18 + Tailwind CSS + Lucide + WCAG 2.1 AA UI   │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    2. State Management                 │
│      Zustand Stores: documentStore, analysisStore      │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                 3. Processing & Segmentation           │
│   DocumentParser (PDF/DOCX/TXT) + ClauseExtractor      │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│           4. Autonomous Loop Engineering Engine         │
│  Act (Draft) ➔ Observe (Extract) ➔ Evaluate (Critic)   │
│             ➔ Refine (Correct) ➔ Inspector Trace       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  5. AI & Grounding Layer               │
│  Google Gemini 2.0 Flash / Pro + Streaming + Fallback   │
└────────────────────────────────────────────────────────┘
```

---

## 2. The Loop Engineering Engine (Act ➔ Observe ➔ Evaluate ➔ Refine)

### 2.1 Why Loop Engineering Over Naive Prompting
Single-turn prompts in legal applications frequently suffer from:
- **Hallucinated section numbers or penalties.**
- **Unverified quotes** that diverge from the actual contract language.
- **Complex jargon leakage** that fails readability benchmarks.

LegalLens implements **Loop Engineering** (`src/services/loopEngine/`):

### 2.2 The Four Loop Phases

#### Phase 1: Act (Generator)
- Inputs: Segmented clauses, document type, jurisdiction hint.
- Generates initial assessment using structured JSON schemas (`src/services/prompts/`).

#### Phase 2: Observe (Extraction & Fact Checking)
- The evaluator extracts every cited `sourceQuote` and compares it verbatim against the raw document string.
- Validates section path cross-references to confirm each cited section exists in the contract.

#### Phase 3: Evaluate (Critic & Scoring Rubric)
- **Groundedness Score (0–100%):** Percentage of claims backed by verified verbatim excerpts.
- **Readability Grade:** Evaluates plain-language output via the Flesch-Kincaid formula:
  $$\text{Grade} = 0.39 \times \left(\frac{\text{words}}{\text{sentences}}\right) + 11.8 \times \left(\frac{\text{syllables}}{\text{words}}\right) - 15.59$$
- **Hallucination Risk:** Flags unsupported claims.
- **Pass Threshold:** Groundedness $\ge 85\%$, Readability Grade $\le 8.5$, Hallucination Risk = `none`.

#### Phase 4: Refine (Targeted Self-Correction)
- If the pass condition is not met, the evaluator generates an array of actionable `LoopCritique` objects (e.g. `unverified_citation`, `complex_jargon`).
- The Refiner re-prompts the model with the exact critiques, re-anchoring quotations and simplifying language until convergence.

---

## 3. Document Processing Pipeline

### 3.1 Clause-Boundary Segmentation (2026 Legal AI Standard)
Unlike naive chunkers that arbitrarily divide documents by token count (severing legal clauses mid-sentence), `clauseExtractor.ts` uses regex boundary recognition:
- Identifies numbered sections (`1.`, `1.1`, `Section 4`, `Article II`, `Schedule A`).
- Preserves complete legal units with section paths (`Section 3 > Security Deposit`).
- Retains cross-references and internal conditions.

### 3.2 Multi-Format Intake
- **PDF:** Dynamic client-side extraction via `pdfjs-dist` with page-by-page text layout.
- **DOCX:** Native extraction via `mammoth.js` preserving document hierarchy.
- **TXT / Markdown:** Raw string parsing with encoding normalization.

---

## 4. Security Architecture (Medium Impact Parameter)

1. **Zero PII Persistence:** Documents are parsed and stored solely in client memory. No contract text is saved to remote databases or external servers.
2. **File Sanitization:** `documentValidator.ts` validates file size ($\le 10$ MB), mime-types, and scans content for executable script injection (`<script>`, `javascript:`, `data:text/html`).
3. **Content Security Policy (CSP):** Configured in `index.html` meta headers, restricting script execution and network endpoints.
4. **API Key Isolation:** API keys are held in client state and masked in UI displays.

---

## 5. Efficiency & Performance (Medium Impact Parameter)

1. **Chunked Streaming:** Gemini responses are streamed via SSE with client-side text chunking, delivering immediate sub-second time-to-first-token (TTFT).
2. **Bundle Code-Splitting:** Configured in `vite.config.ts`:
   - `vendor`: React, React-DOM, Zustand, React-Router-DOM
   - `icons`: Lucide React
   - `pdf`: pdfjs-dist / mammoth
3. **Client-Side Throttling:** Built-in rate limiter ensures API calls remain within rate limits.

---

## 6. Accessibility & UX Architecture (WCAG 2.1 AA)

- **Keyboard Navigation:** Custom hook `useKeyboardNavigation.ts` provides hotkey switching (1–6) across core workspaces and ESC modal dismissals.
- **ARIA Live Regions:** `announceToScreenReader()` dynamically informs assistive technologies of document parsing, analysis steps, and completion.
- **Color Contrast:** Dark and light theme palettes maintain contrast ratios $> 4.5:1$ across all risk severity tiers.
- **Skip Links:** Implemented via `<SkipLink />` for direct keyboard navigation to main content.
