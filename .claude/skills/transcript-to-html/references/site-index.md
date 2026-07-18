# Central Index Page (site/index.html)

The index is the library's front door: every generated page, organized by content, always rebuilt from what actually exists on disk.

## Rebuild rule (no memory, no appending)

On every batch run, regenerate `site/index.html` from scratch by scanning `site/pages/*.html`. For each page read its `<title>` and `<meta name="description">` — those supply the link text and the one-line summary. Never hand-maintain the list, never append to a stale index: pages deleted from disk disappear from the index, pages added appear. The scan is the source of truth.

## Menu structure (two levels, content-derived)

Group entries into **menus** (domain family) and **submenus** (topic cluster):

- **Menu** = domain family from section-patterns.md: `Health & Wellness`, `Software & Technology`, `General Knowledge`. Only render menus that have at least one page.
- **Submenu** = topic cluster within the family, derived from what the pages are actually about: e.g. Skin Care, Nutrition & Diet, Fitness & Exercise, Supplements, Hair Care under Health & Wellness; Languages & Frameworks, System Design & Architecture, AI & Machine Learning, Data Structures & Algorithms under Software & Technology. Invent a new submenu when a page fits no existing one; merge submenus that would hold a single page each into a broader one only if a natural parent exists — a one-page submenu is acceptable.
- A page belongs to exactly one submenu (its dominant topic). Alphabetical order within a submenu; menus and submenus in the order listed above, new ones appended.

## Markup contract

Same rules as generated pages: complete semantic HTML5 document, kebab-case classes, shared design system, no inline styles/scripts/markdown. Shape:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Library of knowledge pages: <topic list>.">
  <title>Knowledge Library</title>
  <link rel="stylesheet" href="assets/site.css">
</head>
<body class="theme-library index-page">
<header class="site-header">
  <h1>Knowledge Library</h1>
  <p class="standfirst">One line describing the library's current scope.</p>
  <p class="hero-stats"><span class="stat"><strong>N</strong> pages</span><span class="stat"><strong>M</strong> topics</span><span class="stat"><strong>100%</strong> expert-sourced</span></p>
  <p class="filter-wrap"><input id="library-filter" type="search" placeholder="Search all pages — try &quot;keyword&quot;…" aria-label="Search pages"></p>
</header>
<main>
  <nav class="topic-chips" aria-label="Jump to topic">
    <a class="chip theme-skin-care" href="#skin-care">Skin Care <span class="count">16</span></a>
    <!-- one chip per submenu, theme class matches the submenu's, count = its pages -->
  </nav>
  <p class="no-results" hidden>No pages match your search.</p>
  <nav class="library-nav" aria-label="All pages">
    <section class="menu health-wellness">
      <h2>Health &amp; Wellness</h2>
      <section class="submenu theme-skin-care" id="skin-care">
        <h3>Skin Care</h3>
        <ul class="card-grid">
          <li class="card"><a href="pages/<slug>.html">Page Title (trim to ~60 chars if long)</a><p class="card-desc">One-to-two line description from the page's meta description.</p></li>
        </ul>
      </section>
    </section>
  </nav>
</main>
<footer>
  <p class="page-count">N pages and growing.</p>
</footer>
<script src="assets/site.js" defer></script>
</body>
</html>
```

Rules for the rebuild:
- Each submenu `<section>` carries its theme class (from theming.md) and an `id` used by its chip's `href="#id"`.
- One chip per submenu in `.topic-chips`, same theme class, count in `<span class="count">`.
- The search filter, chip hiding, and empty-state are handled by shared `assets/site.js` — the markup only needs `#library-filter`, `.no-results`, `.card` items.
- Relative links only (`pages/<slug>.html`). Update hero stats, chip counts, and footer count to match the actual contents. Lint the rebuilt index with `check-html.mjs`.
