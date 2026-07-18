#!/usr/bin/env node
// Mechanical checks for transcript-generated HTML pages.
// Usage: node check-html.mjs <page.html>
// Exit 0 = no errors (warnings allowed), exit 1 = errors found.
// Regex-level checks only — the Codex pass and Sol gate do the semantic work.

import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node check-html.mjs <page.html>");
  process.exit(2);
}
const html = readFileSync(file, "utf8");
const errors = [];
const warnings = [];

// --- Document skeleton ---
if (!/^\s*<!doctype html>/i.test(html)) errors.push("Missing <!doctype html> at top");
if (!/<html[^>]*\blang=/i.test(html)) errors.push("<html> missing lang attribute");
if (!/<meta[^>]*charset/i.test(html)) errors.push("Missing <meta charset>");
if (!/<title>[^<]+<\/title>/i.test(html)) errors.push("Missing or empty <title>");
if (!/<main[\s>]/i.test(html)) errors.push("Missing <main>");
if (!/<meta[^>]*name=["']description["']/i.test(html))
  warnings.push("Missing <meta name=\"description\">");

// --- Headings ---
const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
if (h1Count !== 1) errors.push(`Expected exactly one <h1>, found ${h1Count}`);
const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
for (let i = 1; i < levels.length; i++) {
  if (levels[i] > levels[i - 1] + 1) {
    errors.push(`Heading level skip: h${levels[i - 1]} -> h${levels[i]} (heading #${i + 1})`);
    break; // one report is enough
  }
}

// --- Tag balance (structural tags only) ---
for (const tag of ["main", "section", "article", "aside", "header", "footer", "ul", "ol", "table", "blockquote"]) {
  const open = (html.match(new RegExp(`<${tag}[\\s>]`, "gi")) || []).length;
  const close = (html.match(new RegExp(`</${tag}>`, "gi")) || []).length;
  if (open !== close) errors.push(`Unbalanced <${tag}>: ${open} open, ${close} close`);
}

// --- Markdown remnants ---
if (/```/.test(html)) errors.push("Markdown code fence (```) in output");
if (/^#{1,6}\s/m.test(html)) errors.push("Markdown heading (# ...) in output");
if (/\*\*[^*\n]+\*\*/.test(html)) errors.push("Markdown bold (**...**) in output");
if (/^\s*[-*]\s+\S/m.test(html.replace(/<!--[\s\S]*?-->/g, "")))
  warnings.push("Possible markdown list bullets (- item) — verify these are intentional text");

// --- Transcript noise ---
const body = html.replace(/<[^>]+>/g, " "); // text content, rough
if (/\b\d{1,2}:\d{2}\b/.test(body)) errors.push("Timestamp-like token (MM:SS) in page text");
const voicePhrases = [
  "in this video", "in this episode", "in today's video", "welcome to the",
  "thanks for watching", "like and subscribe", "hit the bell", "the speaker says",
  "in this transcript", "in the podcast", "as discussed in the video",
];
for (const p of voicePhrases) {
  if (body.toLowerCase().includes(p)) errors.push(`Transcript-voice phrase: "${p}"`);
}
const fillers = [...body.toLowerCase().matchAll(/\b(um+|uh+|you know|gonna|kinda|sort of like)\b/g)];
if (fillers.length > 0)
  warnings.push(`Possible filler speech (${fillers.length}x): ${[...new Set(fillers.map((m) => m[1]))].join(", ")}`);

// --- Hygiene ---
// Shared assets are allowed (<script src="../assets/site.js">); inline code is not.
for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)) {
  if (!/\bsrc=/i.test(m[1])) errors.push("Inline <script> block — only shared asset scripts allowed");
  else if (m[2].trim()) errors.push("<script src> tag contains inline code");
}
if (/<style[\s>]/i.test(html)) errors.push("<style> block — styling belongs in the shared stylesheet");
if (/style\s*=\s*["']/i.test(html)) errors.push("Inline style attribute — styling belongs in the shared stylesheet");
if (!/<link[^>]*rel=["']stylesheet["'][^>]*assets\/site\.css/i.test(html))
  warnings.push("No link to shared stylesheet (assets/site.css)");
if (!/<body[^>]*class=["'][^"']*theme-/i.test(html))
  warnings.push("<body> has no theme-* class — page won't pick up a topic palette");
if (/\b(TODO|FIXME|PLACEHOLDER|Lorem ipsum)\b/i.test(html)) errors.push("Placeholder/TODO text in output");

// --- Empty sections ---
for (const m of html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gi)) {
  const inner = m[1];
  if (!/<(p|ul|ol|table|blockquote|figure)[\s>]/i.test(inner)) {
    const heading = inner.match(/<h[1-6][^>]*>([^<]*)</i);
    errors.push(`Section with no content: "${heading ? heading[1].trim() : "(unnamed)"}"`);
  }
}

// --- Report ---
for (const e of errors) console.log(`ERROR: ${e}`);
for (const w of warnings) console.log(`WARN:  ${w}`);
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s) — ${errors.length ? "FAIL" : "PASS"}`);
process.exit(errors.length ? 1 : 0);
