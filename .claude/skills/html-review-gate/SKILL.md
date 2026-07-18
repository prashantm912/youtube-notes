---
name: html-review-gate
description: Use when reviewing or validating an HTML page generated from a transcript before it ships — checking factual fidelity to the source transcript, semantic HTML correctness, domain-appropriate structure, and removal of transcript noise. Also use when asked to "review the generated page", "QA the article", or run a quality gate on transcript-to-html output.
---

# HTML Review Gate

## Overview

Three-layer quality gate for transcript-generated HTML pages: mechanical lint → independent Codex CLI review → Sol final gate. Core principle: **the page ships only when its claims trace to the transcript and its markup is semantically sound.** Sol's verdict (ACCEPT/REVISE) is the only exit.

## Inputs

- Path to the generated HTML page (required).
- Path to the source transcript (required for a full review). If the transcript is unavailable, run layers 1–3 anyway but the report MUST open with: "Fidelity not verified — source transcript unavailable" and the verdict cannot be ACCEPT.

## Workflow

**Layer 1 — Mechanical lint.** Run:

```
node <this-skill-dir>/scripts/check-html.mjs <page.html>
```

Catches doctype/heading/balance errors, markdown remnants, timestamps, transcript-voice phrases, empty sections, scripts. Any ERROR is an automatic finding; fix-worthy before deeper review, but continue to layer 2 regardless — later layers need the full picture.

**Layer 2 — Codex CLI pass.** Follow [references/codex-prompt.md](references/codex-prompt.md) exactly: run `codex exec --sandbox read-only` with the prompt template (both file paths substituted), then run the completeness check. Codex output must contain all four sections — SUMMARY, FINDINGS, FIDELITY_SPOTCHECK, STRUCTURE_FIT. Missing or empty sections are named exactly in the final report, never paraphrased around. If Codex CLI is unavailable, say so, and proceed with layers 1 and 3 only, flagging the gap.

**Layer 3 — Sol gate.** Read [references/sol-review.md](references/sol-review.md) and execute it fully: independent fidelity spot-check against the transcript, coverage check, noise scan, structure-fit check, semantic HTML check, Codex reconciliation. Produce the report in Sol's format with a severity-tagged findings table and the verdict.

## Verdict (fixed rules, no discretion)

- Any BLOCKER (hallucination, transcript-voice leak, markdown in output, structure-breaking HTML) → **REVISE**
- Any MAJOR count ≥ 1 → **REVISE**, listing only the required fixes
- Zero BLOCKER + zero MAJOR → **ACCEPT**, stated plainly in one line; at most 3 non-binding nits

Strong pages pass. Do not manufacture findings to appear rigorous, and do not restyle prose that already works — Sol is a gate, not an editor.

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Trusting Codex verdict as final | Codex is layer 2 input; Sol reconciles it with evidence |
| Skipping fidelity spot-check on long transcripts | Long transcript → spot-check more claims, never fewer |
| Passing a polished page without tracing claims | Polish hides hallucinations best; trace numbers/dosages/products first |
| Reporting "Codex output incomplete" vaguely | Name the exact missing sections (e.g., "FIDELITY_SPOTCHECK missing") |
| Nit-flooding a good page | 0 BLOCKER + 0 MAJOR = ACCEPT; cap nits at 3 |
| Accepting with unavailable transcript | Fidelity unverified → verdict cannot be ACCEPT |
