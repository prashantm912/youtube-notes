---
name: fetch-transcripts
description: Use when downloading YouTube transcripts for the links listed in youtube-links.txt — when the user says "fetch transcripts", "download transcripts", "get the transcripts for these videos", or adds YouTube links/URLs to the list file. Feeds the transcript-to-html pipeline.
---

# Fetch YouTube Transcripts

## Overview

Turn the link list in `youtube-links.txt` (project root) into transcript files in `not-analyzed/`, ready for the **transcript-to-html** skill. Uses the youtube-transcript.io API. The script does everything; the skill's job is running it and reporting honestly.

## Prerequisite: API token (one-time)

The API needs a token from https://www.youtube-transcript.io (create account → profile → API token). The script looks for it in:

1. Env var `YT_TRANSCRIPT_TOKEN`, or
2. File `.claude/yt-token` (gitignored — NEVER commit it)

If the token is missing, the script exits with instructions. Relay them to the user and stop — do not invent a token, do not paste a token into chat. The user adds the token themselves.

## Workflow

1. Preview what will happen:

```
node .claude/skills/fetch-transcripts/scripts/fetch-transcripts.mjs --dry-run
```

2. If the dry run shows unparseable lines, tell the user which ones (typos, playlist links — playlists are not supported, only individual videos).

3. Run for real:

```
node .claude/skills/fetch-transcripts/scripts/fetch-transcripts.mjs
```

4. Report: saved count, skipped duplicates, failures with reasons. Fetched links are removed from `youtube-links.txt` automatically; failed lines stay for retry.

5. If transcripts were saved, offer to run the **transcript-to-html** skill next (it processes everything in `not-analyzed/`).

## What the script handles (don't re-implement in chat)

- ID extraction: `watch?v=`, `youtu.be/`, `shorts/`, `embed/`, `live/`, bare 11-char ids
- Dedupe: skips ids already present in `not-analyzed/` or `analyzed/` (ids are embedded in filenames as `__<id>.txt`)
- Batching: 50 ids per request; 429 rate-limit retries honoring `Retry-After` (limit: 5 requests per 10 s)
- Output: `not-analyzed/<title-slug>__<videoId>.txt` — title on line 1, transcript text after

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Committing the token | `.claude/yt-token` must stay gitignored; check `git status` after setup |
| Fetching transcripts by scraping YouTube directly | The API is the supported path; scraping breaks and violates ToS |
| Marking a failed link as done | Only the script removes lines; failures stay in the file with reasons reported |
| Running transcript-to-html when fetch saved nothing | Zero saved → report failures and stop |
