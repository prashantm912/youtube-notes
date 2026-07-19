#!/usr/bin/env node
// Course coverage + link-rot checker.
//   node coverage.mjs <checklist.json>            → coverage report (which items have a page)
//   node coverage.mjs <checklist.json> --links    → also HTTP-check every resource URL in the pages
// A track is DONE when coverage shows 0 uncovered items. Reads generated pages under
// site/courses/<track>/ to confirm each checklist id appears in a page's covered-list.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const file = process.argv[2];
const checkLinks = process.argv.includes("--links");
if (!file) { console.error("Usage: node coverage.mjs <checklist.json> [--links]"); process.exit(2); }

const checklist = JSON.parse(readFileSync(file, "utf8"));
const trackDir = join(root, "site", "courses", checklist.track);
const pages = existsSync(trackDir)
  ? readdirSync(trackDir).filter((f) => f.endsWith(".html")).map((f) => ({ f, html: readFileSync(join(trackDir, f), "utf8") }))
  : [];

// --- Coverage: is each checklist id named in some page's covered-list? ---
const allIds = checklist.modules.flatMap((m) => m.items.map((i) => i.id));
const coveredIds = new Set();
const urls = new Set();
for (const { html } of pages) {
  for (const m of html.matchAll(/<li>([a-z0-9.\-]+)<\/li>/gi)) coveredIds.add(m[1]);
  // Only vet URLs inside resource lists — illustrative href demos in prose/snippets are not
  // resources we vouch for (and often use RFC 2606 reserved example domains).
  for (const block of html.matchAll(/<ul class="resources">([\s\S]*?)<\/ul>/gi))
    for (const m of block[1].matchAll(/href="(https?:\/\/[^"]+)"/gi)) urls.add(m[1]);
}
const uncovered = allIds.filter((id) => !coveredIds.has(id));

console.log(`Track: ${checklist.track}  |  items: ${allIds.length}  |  covered: ${allIds.length - uncovered.length}  |  pages: ${pages.length}`);
if (uncovered.length) {
  console.log("\nUNCOVERED:");
  for (const id of uncovered) console.log("  " + id);
} else if (allIds.length) {
  console.log("All checklist items covered.");
}

// --- Optional link-rot check ---
if (checkLinks) {
  console.log(`\nChecking ${urls.size} unique URL(s)...`);
  let dead = 0;
  async function check(u) {
    // Try HEAD, then GET if HEAD is not ok (many hosts reject/404 HEAD but serve GET fine).
    try {
      const res = await fetch(u, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(12000) });
      if (res.ok) return { ok: true, note: String(res.status) };
    } catch { /* fall through to GET */ }
    try {
      const res = await fetch(u, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(20000) });
      return { ok: res.ok, note: String(res.status) };
    } catch (e) { return { ok: false, note: e.name === "TimeoutError" ? "timeout" : e.message.slice(0, 40) }; }
  }
  for (const u of urls) {
    let r = await check(u);
    if (!r.ok) r = await check(u); // one retry to absorb transient network blips
    if (!r.ok) { dead++; console.log(`  DEAD [${r.note}] ${u}`); }
  }
  console.log(dead ? `\n${dead} dead link(s) — fix before shipping.` : "\nAll links reachable.");
  if (dead) process.exit(1);
}

process.exit(uncovered.length ? 1 : 0);
