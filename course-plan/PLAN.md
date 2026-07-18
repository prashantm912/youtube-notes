# Web Platform, Complete — Course Plan

Status: **PLANNED, NOT STARTED**. This file is the single source of truth for the course.
If you are an agent starting mid-way: read this file fully, then read the Status Tracker at
the bottom to see what is already built, then continue from the next unchecked item.
Do not redesign what is already decided here.

## 1. Goal

A step-by-step course teaching **every feature** of HTML, CSS, JavaScript and TypeScript,
beginner to pro, published as pages on this project's site (`site/`), using the existing
design system (`site/assets/site.css` + `site.js`) and deployment pipeline
(git push to main → GitHub Actions → GitHub Pages at https://prashantm912.github.io/youtube-notes/).

## 2. Completeness Method (non-negotiable)

"Every feature" is verifiable, not aspirational:

- Each track has a **machine-readable coverage checklist** at `course-plan/checklists/<track>.json`
  derived from official reference indexes:
  - HTML: MDN HTML element reference (~110 elements) + global attributes + input types
  - CSS: MDN CSS property/selector/at-rule/function indexes
  - JavaScript: ECMAScript spec chapter list + MDN JS reference + curated Web API index
  - TypeScript: TS Handbook table of contents + release notes 1.x→5.x feature list
- Checklist item shape: `{ "id": "html.forms.input.range", "label": "<input type=range>", "lesson": null }`
  — `lesson` filled with the lesson file path when covered.
- Script `course-plan/scripts/coverage.mjs` (to be written in Phase 0) reports uncovered items
  per track. A track is DONE only when its checklist shows zero uncovered items.
- Every lesson page ends with a "Features covered" list naming its checklist ids.

## 3. Tracks and Modules

### Track 0 — How the Web Works (3 modules, foundation)
1. Browsers and the request cycle (URL → DNS → HTTP → response)
2. HTTP essentials (methods, status codes, headers, caching, HTTPS)
3. The rendering pipeline (HTML parsing → DOM → CSSOM → layout → paint → composite)

### Track 1 — HTML (~10 modules)
1. Document anatomy: doctype, html/head/body, metadata elements (meta, title, link, base, style, script attributes incl. defer/async/module)
2. Text semantics: headings, paragraphs, lists (ul/ol/dl), inline semantics (em/strong/small/s/cite/q/dfn/abbr/ruby/rt/rp/data/time/code/var/samp/kbd/sub/sup/i/b/u/mark/bdi/bdo/wbr/br/hr)
3. Sectioning and landmarks: main/header/footer/nav/aside/section/article/address/h1-h6/hgroup; document outline reality
4. Links and navigation: a (every attribute: href schemes, target, rel values, download, ping), anchors, tabindex
5. Media: img (srcset/sizes/loading/decoding), picture/source, figure/figcaption, audio, video, track, canvas intro, svg inline intro, map/area
6. Tables: table/caption/thead/tbody/tfoot/tr/th/td/colgroup/col, scope/headers, accessibility
7. Forms A: form element, every input type (text, password, email, url, tel, search, number, range, date, time, datetime-local, month, week, color, checkbox, radio, file, hidden, submit, reset, button, image), labels
8. Forms B: select/option/optgroup, datalist, textarea, button, fieldset/legend, output, progress, meter; every form attribute; constraint validation API; form submission mechanics
9. Interactive and embedded: details/summary, dialog, popover attribute, iframe (sandbox/allow), embed/object, template, slot, custom elements intro
10. Global attributes (id/class/style/title/lang/dir/hidden/inert/contenteditable/draggable/spellcheck/translate/autocapitalize/data-*/is/part/exportparts), ARIA + accessibility fundamentals, deprecated elements awareness

### Track 2 — CSS (~18 modules)
1. Applying CSS, cascade, specificity, inheritance, @layer, !important
2. Selectors A: type/class/id/attribute selectors, combinators (descendant, >, +, ~), selector lists
3. Selectors B: every pseudo-class (:hover…:focus-visible, structural :nth-*, :is/:where/:not/:has, form states, :target, :lang, :dir…) and pseudo-elements (::before/::after/::first-line/::first-letter/::marker/::selection/::placeholder/::backdrop/::file-selector-button)
4. Values and units: absolute/relative lengths, percentages, viewport units (incl. sv/lv/dv), angle/time/resolution, custom properties (--*, var()), calc/min/max/clamp
5. Box model: content/padding/border/margin, box-sizing, margin collapse, outline, overflow (all values), aspect-ratio
6. Colors and backgrounds: every color syntax (named/hex/rgb/hsl/hwb/lab/lch/oklab/oklch/color-mix/color()), gradients (linear/radial/conic/repeating), background-* longhands, multiple backgrounds
7. Typography: font-* properties, @font-face, variable fonts, line-height, text-* properties, white-space, word-break/overflow-wrap, hyphens, writing-mode, web font loading
8. Normal flow, display (every value incl. flow-root/contents), float/clear, position (static/relative/absolute/fixed/sticky), z-index and stacking contexts
9. Flexbox: complete — container and item properties, axes, wrapping, gap, order, alignment (justify-/align-*)
10. Grid: complete — template rows/columns/areas, repeat/minmax/auto-fit/auto-fill, fr, implicit grid, placement, subgrid, alignment
11. Responsive design: media queries (all features incl. prefers-*), container queries (@container, cq units), fluid patterns, mobile-first
12. Transforms: 2D and 3D, transform-origin, perspective, backface-visibility; will-change
13. Transitions and animations: transition-*, @keyframes, animation-* (all), animation-composition, scroll-driven animations (animation-timeline/scroll()/view())
14. Visual effects: opacity, filter (every function), backdrop-filter, mix-blend-mode/background-blend-mode, clip-path, mask-*, shape-outside
15. Modern layout extras: multi-column (column-*), logical properties (inline/block variants), gap everywhere, contain/content-visibility, isolation
16. Modern selectors/features in practice: nesting syntax, :has() patterns, @scope, @supports, view transitions API (CSS side), @property (Houdini custom properties)
17. UI details: cursors, scroll-behavior/scroll-snap (all), overscroll-behavior, accent-color, color-scheme, appearance, user-select, pointer-events, resize
18. Print styles, counters (counter()/counters()/@counter-style), generated content, lists (list-style-*), tables CSS, and a wrap-up architecture module (BEM-ish conventions, layers strategy, our own site.css as case study)

### Track 3 — JavaScript (~20 modules)
1. Language basics: values/types (all primitives + object), typeof, coercion rules (== vs ===), template literals, var/let/const, hoisting, TDZ, scope
2. Operators: every one — arithmetic, comparison, logical (&&/||/??), assignment variants, ternary, comma, in, instanceof, delete, void, spread/rest, optional chaining ?., exponentiation, bitwise set
3. Control flow: if/switch, all loop forms (for, for-in, for-of, while, do-while), break/continue/labels, error handling (throw/try/catch/finally, Error hierarchy, cause, custom errors)
4. Functions: declarations vs expressions, arrow functions, default/rest params, arguments object, IIFE, closures deep, recursion
5. this and binding: call/apply/bind, method context, arrow this, globalThis, strict mode effects
6. Objects: literals, property descriptors (defineProperty, getters/setters, enumerable/configurable/writable), Object.* statics (keys/values/entries/assign/freeze/seal/create/fromEntries/groupBy…), shorthand/computed properties
7. Prototypes and classes: prototype chain, __proto__ vs prototype, class syntax complete (constructor, fields, private #fields/#methods, static, static blocks, accessors, inheritance/super, mixins pattern)
8. Arrays: every method (iteration, mutation, non-mutating variants toSorted/toReversed/toSpliced/with, at, flat/flatMap, reduce deep, findLast, includes, copyWithin, fill…), array-likes, typed arrays overview
9. Strings: every method, unicode/code points, normalization, raw strings, tagged templates
10. Numbers and math: Number statics/methods, floating point reality, BigInt, Math complete, parse functions
11. Symbols, iterators, generators: Symbol registry + well-known symbols, iteration protocols, generator functions/yield/delegation, async generators
12. Collections: Map/Set/WeakMap/WeakSet/WeakRef/FinalizationRegistry, when each
13. Destructuring and modern syntax: object/array destructuring (nested, defaults, rest), spread patterns, logical assignment, numeric separators
14. Async A: event loop deep (call stack, task/microtask queues), callbacks, Promise complete (states, chaining, error flow, all/allSettled/any/race, withResolvers)
15. Async B: async/await patterns, top-level await, cancellation with AbortController, timers, queueMicrotask, requestAnimationFrame
16. Modules: ESM complete (import/export forms, dynamic import(), import.meta, module resolution), CJS awareness, bundler reality
17. Regex: complete — syntax, flags (d/g/i/m/s/u/v/y), groups (named/capturing), lookaround, unicode properties, String/RegExp methods, replacement patterns
18. Meta-programming and built-ins: Proxy (all traps), Reflect, structuredClone, JSON (replacer/reviver), Date + Temporal overview, Intl (NumberFormat/DateTimeFormat/Collator/RelativeTimeFormat/ListFormat/PluralRules/Segmenter), globalThis utilities (encode/decodeURI*)
19. Browser APIs A: DOM complete (selection, traversal, manipulation, classList/dataset, events — bubbling/capture/delegation/custom events, every common event type), forms via JS, storage (localStorage/sessionStorage/cookies/IndexedDB overview)
20. Browser APIs B: fetch complete (Request/Response/Headers/streams basics), URL/URLSearchParams, History/Location, observers (Intersection/Mutation/Resize/Performance), Web Workers, WebSockets, Canvas 2D basics, media/geolocation/notifications/clipboard/share/fullscreen/battery, performance API, memory/GC notes

### Track 4 — TypeScript (~12 modules)
1. Why TS + setup: tsc, tsconfig anatomy, strictness flags philosophy
2. Basic types: primitives, arrays, tuples (named/optional/rest elements), any/unknown/never/void, literal types, as const
3. Object types: interfaces vs type aliases, optional/readonly, index signatures, extending, declaration merging
4. Unions/intersections and narrowing: every narrowing technique (typeof/instanceof/in/truthiness/equality/discriminated unions/type predicates/assertion functions)
5. Functions: signatures, overloads, this typing, generic functions, contextual typing
6. Generics deep: constraints, defaults, inference, variance intuition, generic classes
7. Utility types: ALL built-ins (Partial/Required/Readonly/Record/Pick/Omit/Exclude/Extract/NonNullable/Parameters/ReturnType/ConstructorParameters/InstanceType/ThisParameterType/OmitThisParameter/Awaited/NoInfer/Uppercase/Lowercase/Capitalize/Uncapitalize) — each rebuilt from scratch
8. Type-level programming: conditional types, infer, distributivity, mapped types (key remapping, modifiers), template literal types, recursive types
9. Classes and decorators: TS class features (parameter properties, abstract, implements, access modifiers), 5.0 decorators
10. Modules and declarations: .d.ts files, declare, ambient modules, module augmentation, DefinitelyTyped, JSDoc typing
11. Enums, namespaces, satisfies, const type parameters, special directives (@ts-expect-error etc.), tsconfig every flag reference
12. Feature timeline 1.x→5.x + TS in practice (with DOM, with our site.js as case study), migration strategy

## 4. Lesson Anatomy (fixed template — every lesson identical shape)

1. **Concept** — why it exists, then what it is
2. **Visual** — inline SVG diagram styled by the design system (accent-colored, theme-aware).
   Diagram types: box/flow diagrams, axis diagrams (flexbox/grid), timeline (event loop), tree (DOM/prototype chain)
3. **Runnable example** — live playground: `<textarea>` editor + `<iframe srcdoc>` output, powered by
   a shared `site/assets/playground.js` (to be written Phase 0). No external CDNs (site rule).
   TS lessons: show compiled JS output side-by-side (precompiled at authoring time, not in-browser).
4. **Gotchas** — edge cases, browser quirks, common bugs (aside.callout)
5. **Exercise** — one task with a hidden solution (details/summary)
6. **Interview Q&A** — 3–5 per lesson in `<details>`, tagged [Beginner]/[Intermediate]/[Pro]
7. **Features covered** — checklist ids this lesson covers (traceability footer)

Per track additionally: one **question-bank page** aggregating all its interview Q&A, and a **track TOC page**.

## 5. Site Integration

- Files: `site/courses/<track-slug>/<nn>-<lesson-slug>.html`; track TOC at `site/courses/<track-slug>/index.html`
- Track slugs: `web-basics`, `html`, `css`, `javascript`, `typescript`
- New theme classes to ADD to site.css (follow existing pattern, light+dark lines):
  `theme-web` (neutral teal), `theme-html` (orange #e34f26-ish), `theme-css` (blue #2965f1-ish),
  `theme-js` (amber #b8860b-ish, dark bg card feel), `theme-ts` (steel blue #3178c6-ish)
  and add rows to `.claude/skills/transcript-to-html/references/theming.md`
- New shared components in site.css: `.lesson-nav` (prev/next), `.playground`, `.code-block` (pre/code styling),
  `.qa` (interview Q&A details styling), `.exercise`, `.covered-list`, `.track-progress` (localStorage bar)
- Index page: new top-level menu `Courses` with a submenu per track (chips + cards, same card-grid format)
- Lesson pages carry `class="theme-<track> lesson-page"`; lesson-page gets prev/next injected nav via site.js
  reading a per-track manifest `site/courses/<track-slug>/manifest.json` (ordered lesson list)
- check-html.mjs: will need a lesson-page allowance — lessons may contain `<pre><code>` blocks whose content
  can legitimately contain markdown-like text and "filler" words; adjust script to skip `<pre>` content
  during noise/markdown checks (Phase 0 task)

## 6. Build Pipeline

Mirrors the transcript pipeline that already works in this repo:

- New skill: `.claude/skills/course-lesson/SKILL.md` — generates ONE lesson from
  (track, module, lesson spec, checklist ids). References: lesson template markup file,
  visual/diagram guidelines, playground usage, Q&A format.
- Batches of ~5 parallel agents (one lesson each), then main thread: lint each page,
  run coverage.mjs, update manifest.json + track TOC + index, commit, push (auto-deploys).
- `course-plan/checklists/*.json` = the changelog analog: item `lesson: null` → pending; filled → done.
- Review: html-review-gate stays usable; for lessons the "source transcript" is replaced by the
  lesson spec + MDN — fidelity check = technical accuracy pass via Codex.

## 7. Build Order (phases)

- **Phase 0 (infra, one session):** checklists JSON scaffolds, coverage.mjs, playground.js,
  lesson CSS components + new themes, lesson template reference, course-lesson skill,
  check-html.mjs pre-block exemption, Courses menu stub on index. Commit.
- **Phase 1:** Track 0 (3 lessons) — validates template end-to-end. Commit per batch.
- **Phase 2:** Track 1 HTML (~10 modules, ~50-60 lessons; multiple lessons per module where needed)
- **Phase 3:** Track 2 CSS (~18 modules)
- **Phase 4:** Track 3 JavaScript (~20 modules)
- **Phase 5:** Track 4 TypeScript (~12 modules)
- **Phase 6:** cross-track capstone: build-a-project lessons + full interview bank page

Scale estimate: ~300+ lessons total. Each phase ships incrementally; site stays consistent throughout.

## 8. Status Tracker (update this section as work lands)

- [ ] Phase 0: infra
  - [ ] course-plan/checklists/{web-basics,html,css,javascript,typescript}.json scaffolds
  - [ ] course-plan/scripts/coverage.mjs
  - [ ] site/assets/playground.js
  - [ ] site.css: lesson components + theme-web/html/css/js/ts (+ theming.md rows)
  - [ ] .claude/skills/course-lesson/ (SKILL.md + references/lesson-template.md)
  - [ ] check-html.mjs: skip <pre> content in noise/markdown checks
  - [ ] index.html: Courses menu
- [ ] Phase 1: Track 0 web-basics (0/3 lessons)
- [ ] Phase 2: Track 1 html (0 modules started)
- [ ] Phase 3: Track 2 css (0 modules started)
- [ ] Phase 4: Track 3 javascript (0 modules started)
- [ ] Phase 5: Track 4 typescript (0 modules started)
- [ ] Phase 6: capstone + interview bank

## 9. Decisions Already Made (do not relitigate)

- Design system: reuse site.css/site.js; no external CDNs ever; file:// must keep working
- Completeness = checklist-verified, not narrative claims
- Lesson shape fixed (section 4); interview Q&A embedded per lesson AND aggregated per track
- Batch generation with parallel agents + lint gate + push-per-batch, same as transcript pipeline
- Playground = textarea + iframe srcdoc, no external editor libraries
- TS compilation shown precompiled, not in-browser
