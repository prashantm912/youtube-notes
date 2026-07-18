---
name: transcript-to-html
description: Use when converting a transcript (YouTube captions, podcast, interview, lecture, meeting recording) into a professional HTML website page or knowledge article — including noisy auto-captions, timestamped text, or multilingual/Hinglish speech. Covers health, wellness, fitness, skin care, nutrition, software, AI/ML, system design, and general educational content.
---

# Transcript to HTML Page

## Overview

Turn spoken-word transcripts into standalone, professional HTML knowledge pages. Core principle: **the page is an evergreen article that happens to be sourced from a transcript — the reader must never be able to tell.** Extract the learnings, discard the speech, restructure by topic, output clean semantic HTML.

## The Output Contract

The deliverable IS:

1. **A standalone knowledge page.** It exists independently of any video, episode, show, or speaker session. No episode numbers, durations, host framing, "question:" cards, viewing/listening references, or chronological "then we discussed" ordering. Expert credibility is carried by credential, not by show: "Dermatologist Dr. Jushya Bhatia advises…" — yes; "In Episode 09 of Decoding Health…" — no.
2. **Professional English copy** (unless the user names another target language). Multilingual and code-switched speech (e.g., Hinglish) is rewritten as polished English. Technical, medical, and product terms stay exact.
3. **A thematic structure, not a transcript-shaped one.** Group content by topic, not by the order things were said. Twenty-four scattered myths become five or six themed sections. Choose sections using [references/section-patterns.md](references/section-patterns.md) — read it before structuring; section names must fit the domain (health pages get mechanisms/routines/cautions-type sections; technical pages get concepts/architecture/tradeoffs-type sections) and be renamed to content-specific headings.
4. **A complete, themed semantic HTML5 document.** `<!doctype html>`, `<html lang>`, `<head>` with charset, viewport, `<title>`, `<meta name="description">`, and `<link rel="stylesheet" href="../assets/site.css">`. `<body>` carries exactly one theme class chosen from [references/theming.md](references/theming.md) by the page's topic cluster (e.g. `class="theme-nutrition"`), and ends with `<script src="../assets/site.js" defer></script>` just before `</body>`. Body content: `<header class="page-header">` (single `<h1>` + one-line `<p class="standfirst">`), `<main>` with `<section>` blocks, `<aside class="callout">` for warnings/tips, `<footer>` (health content: brief medical disclaimer). Headings descend without skips. Lists as `<ul>`/`<ol>`, comparisons as `<table>`, at most 1–2 attributed `<blockquote>`s. Verdict paragraphs open with `<p class="verdict"><strong>Verdict word.</strong> …` — the stylesheet renders that strong as a chip. All styling lives in the shared stylesheet: zero inline styles, zero inline `<script>` blocks, zero `<style>` tags, zero markdown syntax in the page itself.
5. **Faithful content.** Every claim, number, dosage, product, and recommendation traces to the transcript. Reconstruct garbled auto-captions only when context makes the intended word unambiguous. Where the expert hedged, the page hedges. Standard boilerplate (medical disclaimer) is the only permitted addition.

## Workflow (batch pipeline)

The project uses changelog folders: `not-analyzed/` holds pending transcripts, `analyzed/` holds processed ones, `site/` holds the generated website. Invoking this skill means: process **every** transcript currently in `not-analyzed/`.

For each transcript in `not-analyzed/` (one at a time, fully, before the next):

1. Read the whole transcript. Note domain, content shape, and the expert/speaker roles.
2. Classify domain + shape via [references/section-patterns.md](references/section-patterns.md); pick 4–8 supported sections.
3. Extract learnings: claims, mechanisms, numbers, recommendations, examples, cautions. Skip greetings, sponsor reads, filler, banter, repetition.
4. Write the page per the Output Contract to `site/pages/<slug>.html` — slug is a short kebab-case name derived from the page topic (not the source filename). Title and meta description describe the knowledge, not the source.
5. Self-check against the contract; run the mechanical lint (`node .claude/skills/html-review-gate/scripts/check-html.mjs site/pages/<slug>.html`) and fix any errors.
6. Move the transcript file from `not-analyzed/` to `analyzed/` — only after the page exists and lints clean. A transcript in `analyzed/` with no corresponding page is a pipeline bug.
7. Rebuild the central index per [references/site-index.md](references/site-index.md).

After the batch: report which transcripts were processed, their page slugs, and offer to run the full **html-review-gate** skill (Codex + Sol) on the new pages — it is slow, so it runs on request rather than inline.

If `not-analyzed/` is empty, say so and stop — do not reprocess `analyzed/` transcripts.

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Page mirrors transcript order | Reorganize by theme; ordering rule is in section-patterns.md |
| Keeping source language of casual speech | Target language is English professional copy by default |
| Shipping CSS/JS "to look finished" | Markup only; styling is a separate, user-requested step |
| Episode/show metadata in header or footer | Credential-based attribution only |
| Filling a thin section to complete a template | Cut or merge the section; menus are menus, not checklists |
| "Improving" facts (rounding doses, strengthening hedges) | Transcript wording bounds every claim |
| Padding with true-but-unsourced background knowledge | If the transcript didn't say it, the page doesn't say it — even when you know it's true. The review gate traces every claim; unsourced additions are automatic blockers |
