#!/usr/bin/env node
// Fetch YouTube transcripts via youtube-transcript.io API.
// Usage: node fetch-transcripts.mjs [--dry-run]
//   Reads youtube-links.txt at the project root, extracts video ids,
//   downloads transcripts into not-analyzed/, removes fetched links.
// Token: env YT_TRANSCRIPT_TOKEN, or file .claude/yt-token (gitignored).

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "..");
const linksFile = join(root, "youtube-links.txt");
const outDir = join(root, "not-analyzed");
const analyzedDir = join(root, "analyzed");
const dryRun = process.argv.includes("--dry-run");

// ---- Token ----
function getToken() {
  if (process.env.YT_TRANSCRIPT_TOKEN) return process.env.YT_TRANSCRIPT_TOKEN.trim();
  const f = join(root, ".claude", "yt-token");
  if (existsSync(f)) return readFileSync(f, "utf8").trim();
  return null;
}

// ---- Parse links ----
const ID = /^[A-Za-z0-9_-]{11}$/;
function extractId(line) {
  const s = line.trim();
  if (ID.test(s)) return s;
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /\/(?:shorts|embed|live)\/([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = s.match(p);
    if (m) return m[1];
  }
  return null;
}

const rawLines = existsSync(linksFile) ? readFileSync(linksFile, "utf8").split(/\r?\n/) : [];
const entries = []; // {line, id|null}
for (const line of rawLines) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  entries.push({ line, id: extractId(t) });
}

if (entries.length === 0) {
  console.log("No links in youtube-links.txt — nothing to fetch.");
  process.exit(0);
}

// ---- Dedupe against existing transcripts (id embedded in filenames as __<id>) ----
function existingIds() {
  const ids = new Set();
  for (const dir of [outDir, analyzedDir]) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      const m = f.match(/__([A-Za-z0-9_-]{11})\.txt$/);
      if (m) ids.add(m[1]);
    }
  }
  return ids;
}
const already = existingIds();

const bad = entries.filter((e) => !e.id);
const dup = entries.filter((e) => e.id && already.has(e.id));
const seen = new Set();
const todo = entries.filter((e) => {
  if (!e.id || already.has(e.id) || seen.has(e.id)) return false;
  seen.add(e.id);
  return true;
});

console.log(`Links: ${entries.length} | to fetch: ${todo.length} | already have: ${dup.length} | unparseable: ${bad.length}`);
for (const b of bad) console.log(`  UNPARSEABLE: ${b.line.trim()}`);
for (const d of dup) console.log(`  SKIP (already downloaded): ${d.id}`);

if (dryRun) {
  for (const t of todo) console.log(`  WOULD FETCH: ${t.id}  (${t.line.trim()})`);
  process.exit(0);
}
if (todo.length === 0) {
  finishLinksFile([]);
  process.exit(0);
}

const token = getToken();
if (!token) {
  console.error("ERROR: no API token. Set YT_TRANSCRIPT_TOKEN or put the token in .claude/yt-token");
  console.error("Get one at https://www.youtube-transcript.io (profile -> API token).");
  process.exit(2);
}

// ---- Extract plain text from one video's API payload (defensive walk) ----
function videoText(v) {
  // Known shape: { id, title, tracks: [{ language, transcript: [{ text, start, dur }] }] }
  const title = v.title || v.videoTitle || (v.microformat && v.microformat.playerMicroformatRenderer?.title?.simpleText) || v.id;
  let segs = null;
  if (Array.isArray(v.tracks) && v.tracks.length) {
    const track = v.tracks.find((t) => /^en/i.test(t.language || "")) || v.tracks[0];
    segs = track.transcript || track.segments || null;
  }
  if (!segs && Array.isArray(v.transcript)) segs = v.transcript;
  if (!segs) return { title, text: null };
  const text = segs.map((s) => (typeof s === "string" ? s : s.text || "")).filter(Boolean).join("\n");
  return { title, text: text.trim() || null };
}

function slugify(s) {
  return s.normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").toLowerCase().slice(0, 60) || "video";
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callApi(ids, attempt = 1) {
  const res = await fetch("https://www.youtube-transcript.io/api/transcripts", {
    method: "POST",
    headers: { Authorization: `Basic ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  if (res.status === 429 && attempt <= 3) {
    const wait = Number(res.headers.get("retry-after") || 10);
    console.log(`  429 rate limited — waiting ${wait}s (attempt ${attempt}/3)`);
    await sleep(wait * 1000);
    return callApi(ids, attempt + 1);
  }
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

// ---- Fetch in batches of 50, ~2.5s apart (5 req / 10 s limit) ----
const fetchedIds = new Set();
const failures = [];
for (let i = 0; i < todo.length; i += 50) {
  const batch = todo.slice(i, i + 50);
  if (i > 0) await sleep(2500);
  console.log(`Batch ${i / 50 + 1}: ${batch.length} video(s)...`);
  let data;
  try {
    data = await callApi(batch.map((e) => e.id));
  } catch (err) {
    failures.push(...batch.map((e) => ({ id: e.id, reason: err.message })));
    continue;
  }
  const videos = Array.isArray(data) ? data : data.transcripts || data.videos || [data];
  const byId = new Map(videos.filter((v) => v && v.id).map((v) => [v.id, v]));
  for (const e of batch) {
    const v = byId.get(e.id);
    if (!v) { failures.push({ id: e.id, reason: "not in API response" }); continue; }
    const { title, text } = videoText(v);
    if (!text) { failures.push({ id: e.id, reason: "no transcript available" }); continue; }
    const file = join(outDir, `${slugify(title)}__${e.id}.txt`);
    writeFileSync(file, `${title}\n\n${text}\n`, "utf8");
    fetchedIds.add(e.id);
    console.log(`  SAVED: ${file}`);
  }
}

// ---- Rewrite links file: drop fetched + duplicate lines, keep failures & comments ----
function finishLinksFile(okIds) {
  const keep = rawLines.filter((line) => {
    const t = line.trim();
    if (!t || t.startsWith("#")) return true;
    const id = extractId(t);
    return !(id && (okIds.includes(id) || already.has(id)));
  });
  writeFileSync(linksFile, keep.join("\n").replace(/\n{3,}$/, "\n"), "utf8");
}
finishLinksFile([...fetchedIds]);

console.log(`\nDone: ${fetchedIds.size} saved to not-analyzed/, ${failures.length} failed.`);
for (const f of failures) console.log(`  FAILED ${f.id}: ${f.reason}`);
process.exit(failures.length && !fetchedIds.size ? 1 : 0);
