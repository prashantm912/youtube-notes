---
name: course-lesson
description: Use when generating a course MODULE PAGE for the Web Platform or Enterprise course (directory format — orientation paragraphs + verified resource links + interview Q&A). Triggered during course build phases from a module spec and checklist ids. Not for the transcript-to-html pipeline.
---

# Course Module Page Generator

## Overview

Generate ONE course module page in the project's **directory format**: we curate, we don't
author full tutorials. Each page orients the learner on every topic in the module (what + why,
1–2 paragraphs), links the best existing resources (official docs first, all URL-verified), and
supplies interview questions weighted to Indian interviews. Depth is deferred to the linked resources.

**Canonical examples — read both before generating, they ARE the template:**
- `site/courses/css/05-box-model.html` (web platform track)
- `site/courses/advanced-java/04-optional.html` (enterprise track)

**Governing plans:** `course-plan/PLAN.md` §4 (page anatomy), §4b (resource policy); the module
list lives in PLAN.md (web) or PLAN-JAVA-STACK.md (enterprise). Read the relevant module's line.

## Inputs (given by the orchestrator)

- Track slug + theme class (e.g. `web` / `theme-web`), module number + slug, module title.
- The module's topic list (from the plan) and its checklist ids.
- Output path: `site/courses/<track-slug>/<nn>-<module-slug>.html`.
- Prev/next module titles+paths and the track TOC path (for static nav).

## Workflow

1. **Research resources** for each topic with WebSearch/WebFetch. Source hierarchy (§4b):
   official documentation → official tutorial/example → established third parties (web: MDN,
   web.dev, javascript.info, CSS-Tricks, TypeScript handbook; enterprise: dev.java, Baeldung,
   official Spring/Angular/Kafka/Postgres docs) → high-quality videos (established channels;
   Indian-audience channels fine when quality holds).
2. **Verify every URL** — fetch it. 404 / paywall / login-wall / redirect-to-homepage = reject,
   find a substitute. Never ship an unverified link. Prefer evergreen (unversioned) doc URLs.
   - **Bot-blocked hosts (403/429) are NOT dead.** Baeldung, PortSwigger, some Cloudflare-fronted
     sites, and a few others return 403 to automated fetches but are live, high-quality pages.
     Confirm the exact page exists via a domain-scoped search and KEEP the link — do not drop a
     good Baeldung URL just because WebFetch got a 403. (The link-checker treats these as live too.)
3. **Write the page** to the template (see structure below). One page per module.
4. **Lint:** `node .claude/skills/html-review-gate/scripts/check-html.mjs <path>` — fix to PASS.
5. Return: module title, path, topic count, total verified links, interview-question count, lint result.

## Page structure (match the pilots exactly)

```
<!doctype html><html lang="en"><head>
  charset, viewport, meta description, <title>…Learn It Right</title>,
  <link rel="stylesheet" href="../../assets/site.css">
</head>
<body class="theme-<track> lesson-page">
<header class="page-header"><h1>Module: <Title></h1>
  <p class="standfirst">VARY THIS per module — no boilerplate sentence reused across pages.</p></header>
<main>
  <nav class="breadcrumb"><a href="../../index.html">Knowledge Library</a> → Courses → <Track> → <Module></nav>
  <section id="intro"><h2>What this module covers</h2><p>2–3 sentences.</p></section>
  <section id="topics"><h2>Topics</h2>
    <!-- per topic: -->
    <h3>Topic name</h3>
    <p>WHAT it is + WHY it matters (1–2 paras). Orientation, not instruction.</p>
    <pre class="code-block" data-label="LANG"><code>optional 3–8 line snippet when code says it faster</code></pre>
    <ul class="resources">  <!-- 3–5 links, official first; each URL appears ONCE per page -->
      <li>[Official] <a href="…" rel="noopener">Title — Source</a></li>
      <li>[Article] <a href="…" rel="noopener">Title — Source</a></li>
      <li>[Video] <a href="…" rel="noopener">Title — Channel</a></li>
    </ul>
  </section>
  <section id="nav-prev-next"> … static prev/next links … </section>
  <section id="interview"><h2>Interview questions</h2>
    <p>One line framing (India-weighted).</p>
    <details class="qa"><summary><span class="level">Beginner</span> Question?</summary>
      <div class="answer"><p>Concise, correct answer.</p></div></details>
    <!-- ≥10 questions, tags Beginner/Intermediate/Pro, hardest last -->
  </section>
  <section id="covered"><h2>Features covered</h2>
    <p>Traceability against the <Track> checklist:</p>
    <details><summary>Show checklist ids</summary>
      <ul class="covered-list"><li>id.one</li>…</ul></details></section>
</main>
<footer><p>Part of the <Track> track — <Course>. Links verified: <time datetime="YYYY-MM-DD">D Month YYYY</time>.</p></footer>
<script src="../../assets/site.js" defer></script>
</body></html>
```

## Fixed rules (from pilot review — do not deviate)

- **Every checklist id in the module gets covered** — the page's `covered-list` must name them all.
- **A URL appears at most once per page** at its best-fit topic. A topic may carry 3 links instead
  of padding to 5 with repeats. Total unique links roughly = 3–5 × topic count.
- **Q&A level tags are real text** in a `<span class="level">` inside `<summary>` — not attributes.
- **Dated verification stamp** in the footer (`<time datetime>`), today's date.
- **Static nav only** — breadcrumb + prev/next emitted as literal links. No manifest fetch (file:// CORS).
- **No markdown** in output; snippets escape `<` `>` as `&lt;`/`&gt;` inside `<pre><code>`.
- **No** per-resource durations, difficulty scores, or estimated study times.
- Vary the standfirst; never reuse the "This module orients you…" boilerplate.

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Shipping an unverified link | Fetch every URL first; reject dead/paywalled/redirected |
| Teaching the topic in full | 1–2 orientation paras only; depth lives in the links |
| < 10 interview questions | Minimum 10, more for interview-heavy modules |
| Repeating the same URL across topics | Once per page, best-fit topic |
| Missing a checklist id | Every id in the module spec appears in covered-list |
| Attribute-only level tags | Visible `<span class="level">` text (screen-reader accessible) |
