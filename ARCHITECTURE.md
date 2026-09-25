# LegalLens AI — Architectural Specification & Engineering Manifesto

## 🏛️ System Architecture Overview

LegalLens AI follows a modular, decoupled architecture adhering strictly to **SOLID design principles**, separating UI rendering, state management, autonomous agentic loops, and client-side security barriers.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Presentation Layer (React 18)                   │
│  [Dashboard] [Simplifier] [RiskMatrix] [Obligations] [Compare] [Chat]   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        State Management (Zustand)                      │
│   ├── documentStore.ts   (Contract models, parsing, active state)      │
│   ├── analysisStore.ts   (Clauses, risks, summaries, obligations)      │
│   └── uiStore.ts         (Tabs, modals, Telemetry drawer state)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Autonomous Loop Engineering Engine                   │
│                                                                        │
│   1. ACT        ───► Gemini 2.0 Flash structured JSON generator        │
│        │                                                               │
│   2. OBSERVE    ───► Verbatim citation substring verification          │
│        │                                                               │
│   3. EVALUATE   ───► Critic Agent (Groundedness % & Flesch-Kincaid)    │
│        │                                                               │
│   4. REFINE     ───► Autonomous feedback-directed correction loop       │
│        │                                                               │
│   5. TELEMETRY  ───► Real-time step inspection drawer & metrics        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Security & Efficiency Barriers                    │
│   ├── securitySanitizer.ts  (Prompt injection & boundary isolation)    │
│   ├── analysisCache.ts      (Deterministic content-hash memoization)   │
│   ├── documentValidator.ts  (Magic-byte binary format inspection)      │
│   └── textProcessing.ts     (Flesch-Kincaid readability scoring)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🔁 Loop Engineering Specification

### The 4-Stage Autonomous Convergence Loop
1. **Act (Generator):** Prompts `gemini-2.0-flash` with domain-specific legal personas and explicit output JSON schemas.
2. **Observe (Citation Extractor):** Verifies that every extracted clause quote exists verbatim in the source contract text using normalized substring matching.
3. **Evaluate (Critic):**
   - **Groundedness Score:** Calculated as `(Verbatim Citations / Total Citations) * 100`.
   - **Readability Grade:** Calculated using the Flesch-Kincaid formula:
     $$\text{Grade Level} = 0.39 \times \left(\frac{\text{total words}}{\text{total sentences}}\right) + 11.8 \times \left(\frac{\text{total syllables}}{\text{total words}}\right) - 15.59$$
   - **Target Metric:** $\text{Grade} \le 8.0$ (8th-grade reading level accessibility) and $\text{Groundedness} \ge 85\%$.
4. **Refine (Self-Correction):** If criteria fail, the critic constructs a corrective critique prompt and triggers an autonomous second-pass generation before presenting results to the user.

---

## 🛡️ Threat Model & Defense-in-Depth

| Threat Vector | Severity | Mitigation Architecture |
|---|---|---|
| **Prompt Injection** | Critical | Strict `<untrusted_legal_document_boundary>` encapsulation + heuristic regex redaction of jailbreak tokens. |
| **Data Exfiltration** | Critical | 100% in-browser processing; zero persistence of raw text or API credentials on external servers. |
| **XSS via Malicious File** | High | Sanitization of parsed text through `DOMPurify` before DOM insertion; rejection of executable file headers. |
| **Denial of Service (DoS)**| Medium | Client-side file size caps (15 MB), streaming throttles, and fast LRU/hash analysis caching. |
| **Framing / Clickjacking**| Medium | `X-Frame-Options: DENY` and `frame-ancestors 'none'` in Content-Security-Policy headers. |

---

## ⚡ Performance & Efficiency Invariants
1. **Route-Level Code Splitting:** Every page is dynamically imported via `React.lazy()` with `<Suspense>`, keeping initial bundle transfer under 200 kB gzipped.
2. **Deterministic Hash Caching:** Contract analysis results are cached using SHA-256 / content hashes, enabling instant (<1ms) multi-view switching with zero redundant API calls.
3. **Optimized Asset Delivery:** Production assets are immutable-cached for 1 year (`max-age=31536000, immutable`).
