#!/usr/bin/env node
// Whole-site verification gate. One command, five checks.
//
//   node course-plan/scripts/verify.mjs                 → lint + coverage + internal links
//   node course-plan/scripts/verify.mjs --external      → also vet every external URL (slow, ~7k)
//   node course-plan/scripts/verify.mjs --render        → also smoke-test that pages actually paint
//   node course-plan/scripts/verify.mjs --all           → everything
//   node course-plan/scripts/verify.mjs --track spring  → limit coverage/external work to one track
//
// Why this exists rather than just coverage.mjs --links: status codes alone are not
// evidence. Several docs hosts return 200 for pages that do not exist, one returns 403
// for everything, and a page can lint clean, cover every checklist item and still render
// invisible. Each check below exists because that failure actually happened.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = join(root, "site");
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const ALL = has("--all");
const DO_EXTERNAL = ALL || has("--external");
const DO_RENDER = ALL || has("--render");
const trackArg = argv.includes("--track") ? argv[argv.indexOf("--track") + 1] : null;

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const failures = [];
const note = (stage, msg) => failures.push(`[${stage}] ${msg}`);

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
});
const pages = walk(SITE);
const rel = (p) => relative(root, p).split("\\").join("/");

// ---------------------------------------------------------------- 1. lint
function lint() {
  const script = join(root, ".claude", "skills", "html-review-gate", "scripts", "check-html.mjs");
  if (!existsSync(script)) { console.log("  (lint script missing — skipped)"); return; }
  let bad = 0;
  for (const p of pages) {
    const r = spawnSync(process.execPath, [script, p], { encoding: "utf8" });
    const last = (r.stdout || "").trim().split("\n").pop() || "";
    if (!/—\s*PASS/.test(last)) { bad++; note("lint", `${rel(p)} :: ${last.trim()}`); }
  }
  console.log(`  ${pages.length} pages, ${bad} failing`);
}

// ------------------------------------------------------------ 2. coverage
function coverage() {
  const dir = join(root, "course-plan", "checklists");
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"))
    .filter((f) => !trackArg || f === `${trackArg}.json`);
  let items = 0, uncovered = 0;
  for (const f of files) {
    const cl = JSON.parse(readFileSync(join(dir, f), "utf8"));
    const trackDir = join(SITE, "courses", cl.track);
    const html = existsSync(trackDir)
      ? readdirSync(trackDir).filter((x) => x.endsWith(".html")).map((x) => readFileSync(join(trackDir, x), "utf8")).join("\n")
      : "";
    const covered = new Set();
    for (const m of html.matchAll(/<li>\s*([a-z][a-z0-9]*(?:\.[a-z0-9-]+)+)\s*(?:—|<\/li>)/gi)) covered.add(m[1]);
    const ids = cl.modules.flatMap((m) => m.items.map((i) => i.id));
    items += ids.length;
    for (const id of ids) if (!covered.has(id)) { uncovered++; note("coverage", `${cl.track} :: ${id}`); }
  }
  console.log(`  ${files.length} tracks, ${items} items, ${uncovered} uncovered`);
}

// ------------------------------------------------- 3. internal relative links
function internalLinks() {
  let total = 0, broken = 0;
  for (const p of pages) {
    const html = readFileSync(p, "utf8");
    // Skip hrefs inside <pre>/<code>: teaching pages show example markup like
    // href="main.css" that is content, not navigation.
    const stripped = html.replace(/<pre[\s\S]*?<\/pre>/gi, "").replace(/<code[\s\S]*?<\/code>/gi, "");
    for (const m of stripped.matchAll(/href="(?!https?:|mailto:|tel:|#)([^"]+)"/g)) {
      const target = m[1].split("#")[0];
      if (!target) continue;
      total++;
      if (!existsSync(resolve(dirname(p), target))) { broken++; note("internal", `${rel(p)} -> ${target}`); }
    }
  }
  console.log(`  ${total} links, ${broken} broken`);
}

// ------------------------------------------------------ 4. external URLs
// Hosts where an HTTP status is not evidence, and what to do instead.
const angularSitemap = { loaded: false, urls: new Set() };
async function loadAngularSitemap() {
  if (angularSitemap.loaded) return;
  angularSitemap.loaded = true;
  try {
    const xml = await (await fetch("https://angular.dev/sitemap.xml", { headers: { "User-Agent": UA } })).text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) angularSitemap.urls.add(m[1].replace(/\/$/, ""));
  } catch { /* fall back to status check below */ }
}
const rawExists = async (...cands) => {
  for (const c of cands) { try { if ((await fetch(c)).ok) return true; } catch { /* next */ } }
  return false;
};

async function checkExternal(u) {
  const { host, pathname, hash } = new URL(u);
  const p = pathname.replace(/^\/|\/$/g, "");

  // SPA / prerendered hosts: 200 for any path, so match against a real index.
  if (host === "angular.dev") {
    await loadAngularSitemap();
    if (angularSitemap.urls.size) {
      return angularSitemap.urls.has(u.split("#")[0].replace(/\/$/, ""))
        ? { ok: true } : { ok: false, why: "not in angular.dev sitemap" };
    }
  }
  if (host === "ngrx.io" && !p.startsWith("api/")) {
    const base = "https://raw.githubusercontent.com/ngrx/platform/main/projects/www/src/app/pages";
    return (await rawExists(`${base}/${p}.md`, `${base}/${p}/index.md`))
      ? { ok: true } : { ok: false, why: "no backing doc in ngrx/platform" };
  }
  if (host === "rxjs.dev" && !p.startsWith("api/")) {
    const base = "https://raw.githubusercontent.com/ReactiveX/rxjs/master/apps/rxjs.dev/content";
    return (await rawExists(`${base}/${p}.md`, `${base}/${p}/index.md`))
      ? { ok: true } : { ok: false, why: "no backing doc in ReactiveX/rxjs" };
  }
  // Retired single-page Kafka docs: /documentation/#anchor now 200s as an empty shell.
  if (host === "kafka.apache.org" && /^documentation\/?$/.test(p) && hash) {
    return { ok: false, why: "retired /documentation/#anchor — use a versioned path" };
  }
  // youtube: oEmbed is the only cheap existence check.
  if (/(^|\.)youtube\.com$|(^|\.)youtu\.be$/.test(host)) {
    try {
      const r = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(u)}&format=json`);
      if (r.ok) return { ok: true };
      if (r.status === 401) return { ok: true, warn: "embedding disabled — existence unconfirmed" };
      return { ok: false, why: `oEmbed ${r.status}` };
    } catch (e) { return { ok: false, why: "oEmbed " + e.message.slice(0, 30) }; }
  }

  // Everything else: real status, with a browser UA so Baeldung-style hosts
  // return true 404s instead of a blanket 403.
  const hit = async (method) => {
    try {
      return await fetch(u, {
        method, redirect: "follow", headers: { "User-Agent": UA, Accept: "text/html,*/*" },
        signal: AbortSignal.timeout(method === "HEAD" ? 12000 : 20000),
      });
    } catch (e) { return { status: 0, err: e.name === "TimeoutError" ? "timeout" : e.message.slice(0, 40) }; }
  };
  let res = await hit("HEAD");
  if (!(res.status >= 200 && res.status < 400)) res = await hit("GET");
  const s = res.status;
  if (s >= 200 && s < 400) {
    // An anchor that no longer exists is a silent dead link.
    if (hash && res.text) {
      try {
        const body = await res.text();
        const a = hash.slice(1);
        if (body && !(body.includes(`id="${a}"`) || body.includes(`id=${a}`) || body.includes(`name="${a}"`)))
          return { ok: true, warn: `anchor #${a} not found` };
      } catch { /* body unavailable on HEAD */ }
    }
    return { ok: true };
  }
  if ([401, 403, 429, 503, 999].includes(s)) return { ok: true, warn: `${s} bot-blocked, unverified` };
  // Distinguish "this page is gone" from "the whole host is down right now".
  // javadoc.io served 522 for every path including its root during one run;
  // rewriting those links would have been churn against a transient outage.
  if (await hostDown(host)) return { ok: true, warn: `host unreachable (${res.err || s}) — recheck later` };
  return { ok: false, why: res.err || String(s) };
}

const hostState = new Map();
async function hostDown(host) {
  if (hostState.has(host)) return hostState.get(host);
  let down = false;
  try {
    const r = await fetch(`https://${host}/`, {
      redirect: "follow", headers: { "User-Agent": UA },
      signal: AbortSignal.timeout(15000),
    });
    down = r.status >= 500;
  } catch { down = true; }
  hostState.set(host, down);
  return down;
}

async function external() {
  const urls = new Map(); // url -> first page that cites it
  for (const p of pages) {
    if (trackArg && !p.includes(join("courses", trackArg))) continue;
    const html = readFileSync(p, "utf8");
    for (const block of html.matchAll(/<ul class="resources">([\s\S]*?)<\/ul>/gi))
      for (const m of block[1].matchAll(/href="(https?:\/\/[^"]+)"/gi))
        if (!urls.has(m[1])) urls.set(m[1], rel(p));
  }
  console.log(`  vetting ${urls.size} unique URLs (concurrency 12)…`);
  const list = [...urls.entries()];
  let dead = 0, warned = 0, done = 0;
  const workers = Array.from({ length: 12 }, async () => {
    for (;;) {
      const next = list.shift();
      if (!next) return;
      const [u, page] = next;
      let r = await checkExternal(u);
      if (!r.ok) r = await checkExternal(u); // one retry for transient blips
      if (!r.ok) { dead++; note("external", `${u}  (${r.why})  in ${page}`); }
      else if (r.warn) warned++;
      if (++done % 500 === 0) console.log(`    …${done} checked`);
    }
  });
  await Promise.all(workers);
  console.log(`  ${dead} dead, ${warned} unverifiable (bot-blocked / embed-disabled)`);
}

// ------------------------------------------------------- 5. render smoke test
// A page can lint clean, cover every item and still be invisible: the index once
// rendered all 26 Technology sections at opacity 0 because a hidden realm's
// sections never intersect the scroll-reveal observer. Static checks cannot see that.
function renderNotice() {
  console.log("  requires a browser; run these against a local server (node serve.mjs):");
  console.log("    - index.html: switch to each realm, assert every .card has non-zero box AND opacity > 0.9");
  console.log("    - one page per track: assert main sections have opacity > 0.9 and .resources a count > 0");
  console.log("  the browser MCP tools do this; see the render checklist in this file's header.");
}

// ---------------------------------------------------------------- run
const t0 = Date.now();
console.log("html lint");            lint();
console.log("checklist coverage");   coverage();
console.log("internal links");       internalLinks();
if (DO_EXTERNAL) { console.log("external URLs"); await external(); }
else console.log("external URLs\n  skipped (pass --external)");
if (DO_RENDER) { console.log("render smoke test"); renderNotice(); }

console.log(`\n${((Date.now() - t0) / 1000).toFixed(1)}s`);
if (failures.length) {
  console.log(`\n${failures.length} problem(s):`);
  for (const f of failures.slice(0, 60)) console.log("  " + f);
  if (failures.length > 60) console.log(`  …and ${failures.length - 60} more`);
  process.exit(1);
}
console.log("\nAll checks passed.");
