# Section Patterns by Domain

How to pick a page structure that fits the transcript. Never force one template.

## Step 1 — Classify the domain family

| Family | Signals in transcript |
|--------|----------------------|
| **Health & wellness** | Body, symptoms, skin, hair, diet, nutrition, supplements, exercise, sleep, longevity, medical terms, doctor/expert guest, dosages, routines |
| **Technical** | Code, languages, frameworks, APIs, data structures, algorithms, system design, architecture, AI/ML, tooling, deployment |
| **General educational** | History, business, science explainers, productivity, careers, finance concepts — anything not clearly the above |

## Step 2 — Classify the content shape

| Shape | Signals | Structural consequence |
|-------|---------|----------------------|
| Myth-busting / Q&A interview | Host asks, expert answers; "is it true that..." | Claim → verdict → explanation blocks; group by theme |
| Tutorial / how-to | Sequential steps, "first... then..." | Ordered progression; prerequisites first; steps as `<ol>` or step sections |
| Deep-dive lecture | Single topic, layered explanation | Concept ladder: fundamentals → depth → implications |
| Panel / discussion | Multiple viewpoints | Organize by theme, not by speaker; note disagreements honestly |
| Case study / story | Narrative arc, one example | Context → what happened → lessons |

## Step 3 — Select sections from the domain menu

Pick **4–8 sections the content actually supports**. Rename every section to a content-specific heading — "Sunscreen: what actually matters" beats "Benefits". Never emit a section with fewer than two substantive points; fold thin material into a neighbor.

### Health & wellness menu

- Key takeaways / At a glance
- Myths vs. facts (claim–verdict pattern)
- How it works (mechanisms, physiology)
- Benefits (only those stated in transcript)
- Routines / protocols (morning-evening, weekly, step order)
- Dosage, timing, and application (only figures the expert gave)
- Who should be cautious (contraindications, skin/body types, conditions)
- Common mistakes
- Lifestyle factors (sleep, diet, stress, sun, environment)
- Product / ingredient guidance (categories and ingredients named in transcript)
- When to see a professional
- Practical application / getting started
- FAQ (only if transcript contains real Q&A)

### Technical menu

- Overview / What this covers
- Core concepts (definitions, mental models)
- Architecture (components, data flow, boundaries)
- Implementation walkthrough
- Code examples (only code actually shown or described)
- Tradeoffs and alternatives
- Workflows (dev loop, deployment, debugging)
- Performance and scaling considerations
- Pitfalls and edge cases
- Best practices
- When to use / when not to
- Where to go next

### General educational menu

- Key ideas
- Background / context
- Main insights (grouped by theme)
- Examples and case studies
- Counterpoints and open questions (if present)
- Implications
- Practical takeaways

## Ordering rule

Hook/overview → core substance → cautions/limits → practical application. Cautions before practice: readers act on the last thing they read.

## Element mapping

- Claim–verdict pairs → `<h3>` claim + verdict paragraph opening with the verdict (**Myth.** / **Partly true.** / **Fact.**)
- Warnings, contraindications, pro tips → `<aside class="callout">`
- Comparisons (ingredient A vs B, framework X vs Y) → `<table>`
- Step sequences → `<ol>`; unordered facts → `<ul>`
- Direct memorable expert quote → `<blockquote>` with attribution (sparingly, max 1–2 per page)
