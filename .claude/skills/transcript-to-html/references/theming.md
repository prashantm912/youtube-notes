# Page Theming

Every generated page links the shared design system (`site/assets/site.css` + `site/assets/site.js`) and declares its topic via one body class. The stylesheet maps each theme to its own accent palette (light and dark); technical themes also switch to the precision font stack.

## Theme classes by topic cluster

| Body class | Topic cluster |
|------------|--------------|
| `theme-skin-care` | Skin care, dermatology |
| `theme-nutrition` | Diet, nutrition, food |
| `theme-fitness` | Exercise, fitness, training |
| `theme-hair-care` | Hair care |
| `theme-supplements` | Supplements |
| `theme-longevity` | Longevity, aging |
| `theme-wellness` | Sleep, stress, general wellness, self-care |
| `theme-medicine` | Medicine, clinical topics |
| `theme-software` | Programming languages, frameworks, general software development |
| `theme-dsa` | Data structures and algorithms |
| `theme-system-design` | System design, architecture |
| `theme-ai-ml` | AI and machine learning |

The index page uses `theme-library` (base palette).

Course lesson themes (lesson pages add `lesson-page` beside the theme class): `theme-html`, `theme-css`, `theme-js`, `theme-ts` (web platform tracks), `theme-java` (Java tracks). More enterprise course themes (`theme-spring`, `theme-angular`, `theme-db`, `theme-devops`, `theme-cloud`, `theme-arch`) get added to site.css when their tracks start — pattern in course-plan/PLAN-JAVA-STACK.md §4.

## Rules

- Exactly one theme class per page, matching the page's index submenu (a skin-care page sits in the Skin Care submenu AND carries `theme-skin-care`).
- New topic cluster with no matching theme: add a theme block to `site/assets/site.css` — one light-mode line (`--accent`, `--accent-ink`, `--accent-soft`) plus a dark-mode override line, following the existing pattern — then add the row here. Do not inline ad-hoc styles in the page.
- Pages must render acceptably with the stylesheet missing (semantic markup carries the content); never rely on CSS/JS for meaning. The site opens directly from `file://` — asset links stay relative, and no page may fetch anything except the shared assets and Google Fonts (which degrade to system fallbacks offline).
