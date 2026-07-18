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
  <meta name="description" content="Library of knowledge pages: <menu names>.">
  <title>Knowledge Library</title>
  <link rel="stylesheet" href="assets/site.css">
</head>
<body class="theme-library">
<header class="site-header">
  <h1>Knowledge Library</h1>
  <p class="standfirst">One line describing the library's current scope.</p>
</header>
<main>
  <nav class="library-nav" aria-label="All pages">
    <section class="menu health-wellness">
      <h2>Health &amp; Wellness</h2>
      <section class="submenu skin-care">
        <h3>Skin Care</h3>
        <ul>
          <li><a href="pages/skin-care-myths.html">Page Title</a> — one-line description from the page's meta description.</li>
        </ul>
      </section>
    </section>
  </nav>
</main>
<footer>
  <p class="page-count">N pages.</p>
</footer>
<script src="assets/site.js" defer></script>
</body>
</html>
```

Relative links only (`pages/<slug>.html`). Update the footer count and the standfirst to match the actual contents. Lint the rebuilt index with the same `check-html.mjs` script.
