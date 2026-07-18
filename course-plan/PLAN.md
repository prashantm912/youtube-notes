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
  - TypeScript: TS Handbook table of contents + release notes 1.x→7.x feature list (6.0 default changes, 7.0 native compiler)
- Checklist item shape: `{ "id": "html.forms.input.range", "label": "<input type=range>", "lesson": null }`
  — `lesson` filled with the lesson file path when covered.
- Script `course-plan/scripts/coverage.mjs` (to be written in Phase 0) reports uncovered items
  per track. A track is DONE only when its checklist shows zero uncovered items.
- Every lesson page ends with a "Features covered" list naming its checklist ids.

## 2b. Scope, Non-Goals, Coverage Tiers (added by gap review)

**In scope, DEEP tier (checklist-verified 100%):** the HTML language, the CSS language,
ECMAScript (through the latest published edition — **ES2026, ratified 2026-06**; ES2024/25/26
features are named in modules below), TypeScript language + compiler options, and the CORE browser
APIs (DOM, events, fetch, storage, workers incl. service workers, observers, streams, URL,
history/navigation, forms, canvas 2D basics, web components).

**In scope, SURVEY tier (one awareness lesson each, not feature-complete):** WebRTC, Web Audio,
WebGL/WebGPU, WebAuthn, Payment, Speech, sensors/device APIs, Houdini paint worklets,
inline SVG (as used from HTML/CSS), MathML existence.

**Out of scope (named non-goals):** Node.js runtime, frameworks (React/Vue/...), build tools
beyond a bundler-awareness lesson, the full SVG spec as its own language.

Every checklist item carries `"tier": "deep" | "survey"`. The 100% claim = 100% of deep-tier
items covered + every survey item having its awareness lesson. Checklists record source +
retrieval date; refresh pass scheduled at each phase boundary.

## 3. Tracks and Modules

### Track 0 — How the Web Works (4 modules, foundation)
1. Browsers and the request cycle (URL anatomy → DNS resolution → HTTP → response)
2. HTTP essentials: methods, status codes, headers, redirects; HTTPS/TLS 1.3 (handshake, certificates)
3. HTTP in depth: HTTP/1.1 vs 2 vs 3+QUIC evolution, connection management (keep-alive/multiplexing/head-of-line blocking), caching (Cache-Control/ETag/Vary/conditional requests), cookie mechanics (Set-Cookie attributes/SameSite/sessions), content negotiation, compression (gzip/brotli/zstd)
4. The rendering pipeline (HTML parsing → DOM → CSSOM → layout → paint → composite)

### Track 1 — HTML (~10 modules)
1. Document anatomy: doctype, html/head/body, metadata elements (meta, title, link, base, style, script attributes incl. defer/async/module)
2. Text semantics: headings, paragraphs, blockquote/pre/div/span/menu, edit demarcation (del/ins), lists (ul/ol/dl), inline semantics (em/strong/small/s/cite/q/dfn/abbr/ruby/rt/rp/data/time/code/var/samp/kbd/sub/sup/i/b/u/mark/bdi/bdo/wbr/br/hr)
3. Sectioning and landmarks: main/header/footer/nav/aside/section/article/search/address/h1-h6/hgroup; document outline reality
4. Links and navigation: a (every attribute: href schemes, target, rel values, download, ping), anchors, tabindex
5. Media: img (srcset/sizes/loading/decoding), picture/source, figure/figcaption, audio, video, track, canvas intro, svg inline intro, map/area
6. Tables: table/caption/thead/tbody/tfoot/tr/th/td/colgroup/col, scope/headers, accessibility
7. Forms A: form element, every input type (text, password, email, url, tel, search, number, range, date, time, datetime-local, month, week, color, checkbox, radio, file, hidden, submit, reset, button, image), labels
8. Forms B: select/option/optgroup, customizable select (selectedcontent + appearance: base-select), datalist, textarea, button, fieldset/legend, output, progress, meter; every form attribute; constraint validation API; form submission mechanics
9. Interactive and embedded: details/summary, dialog, popover attribute, invoker commands (button command/commandfor), iframe (sandbox/allow/srcdoc/loading/referrerpolicy), embed/object, template, slot, declarative shadow DOM (template shadowrootmode), custom-element usage from HTML; script type=importmap/speculationrules, noscript; SVG-in-HTML and MathML awareness
10. Global attributes (id/class/style/title/lang/dir/hidden/inert/contenteditable/draggable/spellcheck/translate/autocapitalize/data-*/is/part/exportparts/nonce/itemprop microdata), ARIA + accessibility fundamentals, deprecated elements awareness

### Track 2 — CSS (~18 modules)
1. Applying CSS, cascade, specificity, inheritance, @layer, !important
2. Selectors A: type/class/id/attribute selectors, combinators (descendant, >, +, ~), selector lists
3. Selectors B: every pseudo-class (:hover…:focus-visible, structural :nth-*, :is/:where/:not/:has, form states, :target, :lang, :dir, :popover-open, :modal, :fullscreen, shadow-DOM set :host/:host()/:host-context()/:defined/:state()/:has-slotted…) and every pseudo-element (::before/::after/::first-line/::first-letter/::marker/::selection/::placeholder/::backdrop/::file-selector-button/::part/::slotted/::highlight/::target-text/::spelling-error/::grammar-error/::details-content/::cue/::picker()/::picker-icon/::checkmark)
4. Values and units: absolute/relative lengths, percentages, viewport units (incl. sv/lv/dv), angle/time/resolution, custom properties (--*, var()), env(), attr(), sibling-index()/sibling-count(), full math function set: calc/calc-size/min/max/clamp/round/mod/rem/pow/sqrt/log/exp/hypot/abs/sign + trig (sin/cos/tan/asin/acos/atan/atan2)
5. Box model: content/padding/border/margin, box-sizing, margin collapse, outline, overflow (all values), aspect-ratio
6. Colors and backgrounds: every color syntax (named/hex/rgb/hsl/hwb/lab/lch/oklab/oklch/color-mix/color()), gradients (linear/radial/conic/repeating), background-* longhands, multiple backgrounds, box-shadow
7. Typography: font-* properties, @font-face, variable fonts, line-height, text-* properties (incl. text-box-trim/text-box-edge), white-space, word-break/overflow-wrap, hyphens, writing-mode, web font loading
8. Normal flow, display (every value incl. flow-root/contents), float/clear, position (static/relative/absolute/fixed/sticky), z-index and stacking contexts, reading-flow/reading-order
9. Flexbox: complete — container and item properties, axes, wrapping, gap, order, alignment (justify-/align-*)
10. Grid: complete — template rows/columns/areas, repeat/minmax/auto-fit/auto-fill, fr, implicit grid, placement, subgrid, alignment
11. Responsive design: media queries (all features incl. prefers-*/forced-colors/scripting/display-mode), container queries (@container size, style() AND scroll-state() queries, cq units), fluid patterns, mobile-first
12. Transforms: 2D and 3D, transform-origin, perspective, backface-visibility; will-change
13. Transitions and animations: transition-*, @keyframes, animation-* (all), animation-composition, scroll-driven animations (animation-timeline/scroll()/view()), animating to intrinsic sizes (interpolate-size, calc-size())
14. Visual effects: opacity, filter (every function), backdrop-filter, mix-blend-mode/background-blend-mode, clip-path, mask-*, shape-outside
15. Modern layout extras: multi-column (column-*), logical properties (inline/block variants), gap everywhere, contain/content-visibility, isolation, CSS motion path (offset-path/offset-distance/offset-rotate, ray()/path()), anchor positioning (anchor(), position-anchor, position-try, @position-try)
16. Modern selectors/features in practice: nesting syntax, :has() patterns, @scope, @supports, view transitions (CSS side + @view-transition), @property (Houdini custom properties), @starting-style, transition-behavior allow-discrete, custom functions @function + if() conditionals; at-rule census: @import (incl. layer()/supports()), @charset, @namespace, @font-feature-values, @font-palette-values, @page, @color-profile
17. UI details: cursors, scroll-behavior/scroll-snap (all), overscroll-behavior, CSS carousels (::scroll-marker/::scroll-marker-group/::scroll-button()/::column, scroll-marker-group, scroll-initial-target), accent-color, color-scheme + light-dark(), appearance, user-select, pointer-events, resize, field-sizing, image-set()/cross-fade()
18. Print styles, counters (counter()/counters()/@counter-style), generated content, lists (list-style-*), tables CSS, and a wrap-up architecture module (BEM-ish conventions, layers strategy, our own site.css as case study)

### Track 3 — JavaScript (~24 modules)
1. Language basics: values/types (all primitives + object), typeof, coercion rules (== vs ===), template literals, var/let/const, hoisting, TDZ, scope
2. Operators: every one — arithmetic, comparison, logical (&&/||/??), assignment variants, ternary, comma, in, instanceof, delete, void, spread/rest, optional chaining ?., exponentiation, bitwise set
3. Control flow: if/switch, all loop forms (for, for-in, for-of, while, do-while), break/continue/labels, error handling (throw/try/catch/finally, Error hierarchy, cause, custom errors)
4. Functions: declarations vs expressions, arrow functions, default/rest params, arguments object, IIFE, closures deep, recursion
5. this and binding: call/apply/bind, method context, arrow this, globalThis, strict mode effects
6. Objects: literals, property descriptors (defineProperty, getters/setters, enumerable/configurable/writable), Object.* statics (keys/values/entries/assign/freeze/seal/create/fromEntries/groupBy…), shorthand/computed properties
7. Prototypes and classes: prototype chain, __proto__ vs prototype, class syntax complete (constructor, fields, private #fields/#methods, static, static blocks, accessors, inheritance/super, mixins pattern)
8. Arrays: every method (iteration, mutation, non-mutating variants toSorted/toReversed/toSpliced/with, at, flat/flatMap, reduce deep, findLast, includes, copyWithin, fill, Array.fromAsync [ES2026]…), array-likes; binary data: ArrayBuffer (incl. resizable/transfer), every TypedArray incl. Float16Array, Uint8Array base64/hex methods, DataView, SharedArrayBuffer + Atomics
9. Strings: every method, unicode/code points, normalization, raw strings, tagged templates
10. Numbers and math: Number statics/methods, floating point reality, BigInt, Math complete, parse functions
11. Symbols, iterators, generators: Symbol registry + well-known symbols, iteration protocols, generator functions/yield/delegation, async generators, iterator helpers (Iterator.prototype.map/filter/take/drop/flatMap/reduce/toArray/forEach/some/every/find) + iterator sequencing (Iterator.concat)
12. Collections: Map/Set/WeakMap/WeakSet/WeakRef/FinalizationRegistry, when each; Set methods (union/intersection/difference/symmetricDifference/isSubsetOf/isSupersetOf/isDisjointFrom); Map.groupBy/Object.groupBy, Map.prototype.getOrInsert (upsert)
13. Destructuring and modern syntax: object/array destructuring (nested, defaults, rest), spread patterns, logical assignment, numeric separators
14. Async A: event loop deep (call stack, task/microtask queues), callbacks, Promise complete (states, chaining, error flow, all/allSettled/any/race, withResolvers, Promise.try)
15. Async B: async/await patterns, top-level await, cancellation with AbortController, timers, queueMicrotask, requestAnimationFrame, requestIdleCallback
16. Modules: ESM complete (import/export forms, dynamic import(), import defer, import.meta, import attributes with {type:"json"}, module resolution, import maps), CJS awareness, bundler reality; explicit resource management (using/await using, Symbol.dispose)
17. Regex: complete — syntax, flags (d/g/i/m/s/u/v/y), inline flag modifiers, groups (named/capturing, duplicate named groups), lookaround, unicode properties, RegExp.escape, String/RegExp methods, replacement patterns
18. Meta-programming and built-ins: Proxy (all traps), Reflect, structuredClone, JSON (replacer/reviver, parse source access), Date legacy + **Temporal complete** (ES2026 — Instant/PlainDate/ZonedDateTime/Duration, full API), Intl complete (NumberFormat/DateTimeFormat/DurationFormat/DisplayNames/Locale/Collator/RelativeTimeFormat/ListFormat/PluralRules/Segmenter), globalThis utilities (encode/decodeURI*)
19. Browser APIs A: DOM complete (traversal, manipulation, classList/dataset, Selection API + Range, events — bubbling/capture/delegation/custom events, every common event type incl. pointer/touch/keyboard/input/composition), CSSOM (getComputedStyle, element.style, CSSStyleSheet + constructable stylesheets/adoptedStyleSheets, matchMedia), Popover API JS (showPopover/togglePopover, toggle events), forms via JS + constraint validation, focus management and JS accessibility patterns, storage (localStorage/sessionStorage/cookies, IndexedDB full lesson: object stores, indexes, transactions, cursors)
20. Browser APIs B: fetch complete (Request/Response/Headers), URL/URLSearchParams, History/Location + Navigation API, observers (Intersection/Mutation/Resize/Performance), Web Animations API (element.animate), View Transitions JS (document.startViewTransition), WebSockets, File/Blob/FileReader/object URLs, TextEncoder/TextDecoder, drag-and-drop API, MessageChannel/BroadcastChannel, Canvas 2D basics, media/geolocation/notifications/clipboard/share/fullscreen, performance API, memory/GC notes
21. Web Components: customElements.define, lifecycle callbacks, Shadow DOM API (attachShadow, slots, events across shadow boundaries), form-associated custom elements + ElementInternals, template/slot patterns, ::part/::slotted styling contract
22. Streams and workers deep: ReadableStream/WritableStream/TransformStream (backpressure, piping, byte streams), CompressionStream/DecompressionStream, Web Workers (module workers, transfer), Service Workers + PWA (registration, lifecycle, fetch interception, Cache API, offline strategies, web app manifest, push overview)
23. Security for JS developers: XSS classes and defenses, CSP in practice, CORS mechanics (preflight, credentials), cookies (SameSite/HttpOnly/Secure), clickjacking/frame-ancestors, SRI, Trusted Types + Sanitizer API, Web Crypto basics (randomUUID/getRandomValues/subtle.digest), prototype pollution, supply-chain hygiene. (This module owns browser-side security depth; server/enterprise security lives in PLAN-JAVA-STACK Tracks S3/Y2, which cross-reference here)
24. Debugging and legacy: complete console API (every method), debugger statement, breakpoints/DevTools workflow, error monitoring patterns; strict vs sloppy mode differences, eval/with, deprecated-but-real features awareness (document.write, __proto__ accessor…); SURVEY-tier lesson: WebRTC, Web Audio, WebGL/WebGPU, WebAuthn, Speech, sensors, Houdini worklets

### Track 4 — TypeScript (~13 modules)
1. Why TS + setup: tsc (TS 7 native compiler era), tsconfig anatomy, TS 6.0 defaults (strict:true, module esnext, target es2025) + removed legacy flags (baseUrl/outFile/downlevelIteration/moduleResolution classic-node), strictness philosophy
2. Basic types: primitives, arrays, tuples (named/optional/rest elements), any/unknown/never/void, literal types, as const
3. Object types: interfaces vs type aliases, optional/readonly, index signatures, extending, declaration merging, structural typing/assignability (Type Compatibility: excess property checks, freshness)
4. Unions/intersections and narrowing: every narrowing technique (typeof/instanceof/in/truthiness/equality/discriminated unions/type predicates incl. inferred type predicates/assertion functions)
5. Functions: signatures, overloads, this typing, generic functions, contextual typing
6. Generics deep: constraints, defaults, inference, variance intuition + explicit variance annotations (in/out), generic classes
7. Utility types: ALL built-ins (Partial/Required/Readonly/Record/Pick/Omit/Exclude/Extract/NonNullable/Parameters/ReturnType/ConstructorParameters/InstanceType/ThisType/ThisParameterType/OmitThisParameter/Awaited/NoInfer/Uppercase/Lowercase/Capitalize/Uncapitalize) — each rebuilt from scratch
8. Type-level programming: keyof and typeof type operators, indexed access types, conditional types, infer, distributivity, mapped types (key remapping, modifiers), template literal types, recursive types
9. Classes and decorators: TS class features (parameter properties, abstract, implements, access modifiers), 5.0 decorators + decorator metadata (Symbol.metadata)
10. Modules and declarations: .d.ts files, declare (incl. declare global), ambient modules, module augmentation, triple-slash directives, DefinitelyTyped, JSDoc typing, import type/export type, verbatimModuleSyntax, moduleResolution strategies (node16/nodenext/bundler) + ESM/CJS interop, unique symbol
11. Enums (numeric/string/const enum/ambient), namespaces, satisfies, const type parameters, erasableSyntaxOnly (type-stripping era), isolatedDeclarations, special directives (@ts-expect-error/@ts-ignore/@ts-nocheck/@ts-check), tsconfig every flag reference (incl. ${configDir}, noUncheckedSideEffectImports, rewriteRelativeImportExtensions, module node18/node20)
12. JSX/TSX as a TS language feature: jsx compiler options, JSX namespace, typing components/props/children (framework-agnostic)
13. Feature timeline 1.x→7.x: 6.0 (default flips, last JS-based compiler) → 7.0 (native Go port, ~10x faster) + import defer; TS in practice (with DOM, with our site.js as case study), migration strategy

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
- **Phase 1:** Track 0 (4 modules) — validates template end-to-end. Commit per batch.
- **Phase 2:** Track 1 HTML (~10 modules, ~50-60 lessons; multiple lessons per module where needed)
- **Phase 3:** Track 2 CSS (~18 modules)
- **Phase 4:** Track 3 JavaScript (~24 modules)
- **Phase 5:** Track 4 TypeScript (~13 modules)
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
- [ ] Phase 1: Track 0 web-basics (0/4 modules)
- [ ] Phase 2: Track 1 html (0 modules started)
- [ ] Phase 3: Track 2 css (0 modules started)
- [ ] Phase 4: Track 3 javascript (0 modules started)
- [ ] Phase 5: Track 4 typescript (0 modules started)
- [ ] Phase 6: capstone + interview bank

## 9. Review Log

- 2026-07-19 source-verified review (6 research agents vs MDN/WHATWG/TC39/TS docs). Currency fixes:
  ES2026 ratified (deep tier updated; Temporal now Stage 4 → complete coverage, not overview);
  TS 6.0 (default flips, removed flags) + TS 7.0 native compiler → module 1/13 rewritten.
  Structural adds: CSSOM family + Popover JS + Selection/Range (M19), Web Animations + View
  Transitions JS (M20), Web Crypto (M23), TextEncoder + CompressionStream (M20/22); CSS carousels,
  @function/if(), sibling-index(), interpolate-size/calc-size(), reading-flow, scroll-state(),
  shadow-DOM pseudo-classes, ::picker(); HTML customizable select, invoker commands, search element,
  missing text elements; TS keyof/typeof/indexed-access, Type Compatibility, moduleResolution/interop,
  isolatedDeclarations/erasableSyntaxOnly, decorator metadata, ThisType. No fabricated features found.
- 2026-07-19 round 2 (Track 0 depth + consistency agents): Track 0 expanded 3→4 modules (HTTP versions/
  QUIC, caching, cookies, negotiation, compression, connection management were homeless); security
  ownership split vs enterprise plan stated on JS M23. Counts/references/currency verified consistent.

- 2026-07-19 gap review vs "100% coverage" goal. Added: scope/non-goals/coverage-tier section (2b);
  JS modules 21-24 (Web Components, Streams+Service Workers/PWA, Security, Debugging/legacy/survey);
  TS module 12 (JSX); CSS additions (::part/::slotted/::highlight et al, full math+trig functions,
  anchor positioning, motion path, @starting-style, style() container queries, at-rule census,
  light-dark(), field-sizing); HTML additions (declarative shadow DOM, importmap/speculationrules,
  MathML/SVG awareness); JS in-module additions (ArrayBuffer/Atomics, iterator helpers, Set methods,
  import attributes, using, Navigation API, File/Blob, drag-and-drop, IndexedDB full, focus management);
  TS in-module additions (variance annotations, triple-slash, const enum, declare global, import type).

## 10. Decisions Already Made (do not relitigate)

- Design system: reuse site.css/site.js; no external CDNs ever; file:// must keep working
- Completeness = checklist-verified, not narrative claims
- Lesson shape fixed (section 4); interview Q&A embedded per lesson AND aggregated per track
- Batch generation with parallel agents + lint gate + push-per-batch, same as transcript pipeline
- Playground = textarea + iframe srcdoc, no external editor libraries
- TS compilation shown precompiled, not in-browser
