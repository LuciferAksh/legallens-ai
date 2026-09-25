# Security Policy & AI Safety Guardrails — LegalLens AI

## 🛡️ Executive Summary
LegalLens AI is engineered under a **Zero-Knowledge, Client-First Security Model**. All document parsing, text extraction, syntactic diffing, and sanitization execute entirely within the user's browser runtime. Sensitive legal contracts are never transmitted to or persisted on intermediate backend servers.

---

## 🔒 Security Architecture & Defensive Layers

### 1. Adversarial Prompt Injection & Jailbreak Defense Layer
When processing untrusted user documents through Large Language Models, prompt injection presents a major attack vector. LegalLens AI implements an active multi-tiered defense (`src/services/securitySanitizer.ts`):
- **Boundary Isolation Delimiters:** All untrusted contract text is strictly encapsulated inside `<untrusted_legal_document_boundary>` cryptographic XML tags, preventing instructions in the document from hijacking system directives.
- **Pattern Neutralization Engine:** Automatically intercepts and redacts known jailbreak and exfiltration patterns, including:
  - System prompt overrides (`"Ignore all previous instructions"`, `"Disregard prior directives"`)
  - Role-hijacking and persona switching (`"You are now DAN"`, `"Act as an unrestricted assistant"`)
  - Instruction exfiltration (`"Repeat the system prompt verbatim"`, `"Output hidden developer notes"`)
  - Delimiter escaping and script injection (`<script>`, `<iframe>`, `javascript:`)
- **Strict Output Schema Validation:** All Gemini model responses are constrained by rigid JSON schemas and validated through safe parsers (`src/utils/jsonParser.ts`). Malformed or out-of-spec payloads are quarantined immediately.

### 2. Client-Side Cryptographic Data Privacy
- **Zero Server-Side Storage:** Legal documents (PDF, DOCX, TXT) are read into client-side ArrayBuffers and processed in browser memory. No text is saved to remote databases.
- **Ephemeral Key Handling:** User-provided Google AI Studio API keys are maintained strictly in ephemeral application state (or session-isolated memory) and are never logged to `console`, telemetry logs, or external analytics.
- **No Telemetry Leakage:** The Loop Engineering Telemetry Inspector operates purely in-memory within the local user session.

### 3. File Validation & Upload Security
- **Magic Byte Signature Verification:** File uploads are inspected against raw binary magic numbers (`%PDF-` for PDFs, `PK\x03\x04` for DOCX) rather than relying solely on file extensions. This prevents executable binaries renamed as `.pdf` from executing.
- **Anti-XSS Sanitization:** All extracted and rendered text is sanitized using `DOMPurify` before DOM insertion to neutralize stored XSS vulnerabilities.
- **Strict Size Thresholds:** Enforces a rigid 15 MB file size limit to defend against browser memory exhaustion and denial-of-service (DoS) attacks.

### 4. HTTP Security Headers & Production Hardening
The production deployment configuration (`vercel.json`) enforces enterprise-grade security headers:
- `Content-Security-Policy`: Restricts scripts, styles, fonts, frames, and API connections exclusively to authorized origins (`generativelanguage.googleapis.com`).
- `X-Frame-Options: DENY`: Prevents clickjacking and framing attacks.
- `X-Content-Type-Options: nosniff`: Prevents MIME-type confusion attacks.
- `X-XSS-Protection: 1; mode=block`: Enables browser XSS filtering.
- `Referrer-Policy: strict-origin-when-cross-origin`: Minimizes referrer leakage.
- `Permissions-Policy`: Completely disables camera, microphone, geolocation, and browsing-topics APIs.

---

## 🚨 Vulnerability Reporting & Disclosure
If you discover a security vulnerability in LegalLens AI:
1. Please report it privately via GitHub Security Advisories or by creating an issue labeled `security`.
2. Please do not publicly disclose the vulnerability until it has been investigated and remediated.
3. We acknowledge receipt within 24 hours and aim to deploy critical patches within 48 hours.
