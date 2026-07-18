# Codex CLI Review Pass

Second-model independent review. Run BEFORE the Sol gate; Sol reconciles these findings.

## Command

From the directory containing both files (or pass absolute paths inside the prompt):

```powershell
$prompt = @"
<paste the prompt template below, with real file paths substituted>
"@
$prompt | codex exec --skip-git-repo-check --sandbox read-only -C "<project-dir>" -
```

Bash equivalent:

```bash
codex exec --skip-git-repo-check --sandbox read-only -C "<project-dir>" - <<'EOF'
<prompt template with real paths>
EOF
```

- `--sandbox read-only` — review must not modify files.
- `--skip-git-repo-check` — required when the working directory is not a git repository (codex refuses untrusted dirs otherwise).
- Stdout includes a session header, tool-call traces, and the review twice (once as the final `codex` message, once after `tokens used`). The review content is the block containing the four section headings — ignore the rest.
- Timeout guidance: allow up to 10 minutes for long transcripts.
- If `codex` is not installed or errors, do NOT fake its output. Report "Codex pass unavailable: <reason>" and continue to the Sol gate with mechanical-check results only, stating clearly that the review ran without the second-model pass.

## Prompt template

```
You are reviewing an HTML page that was generated from a spoken-word transcript.

HTML file: <ABSOLUTE_PATH_TO_HTML>
Source transcript: <ABSOLUTE_PATH_TO_TRANSCRIPT>

Read both files. The transcript may be auto-captioned, multilingual, and noisy — that is expected; the HTML must NOT be.

Produce a review with EXACTLY these four sections, using these exact headings:

SUMMARY
2-4 sentences: what the page covers, overall quality.

FINDINGS
Numbered list. Each finding: [severity: blocker|major|minor] [location: element or heading] [issue] [suggested fix].
Check: semantic HTML5 correctness (single h1, heading hierarchy, main/section/article usage, list markup),
markdown remnants, transcript noise (filler words, greetings, sponsor reads, "in this video"-style phrases, timestamps),
readability (paragraph length, scannability), unsupported or invented claims.

FIDELITY_SPOTCHECK
Pick 8 concrete claims from the HTML (prioritize numbers, dosages, named products/ingredients/tools, strong recommendations).
For each: quote the HTML claim, then either quote the supporting transcript passage or write NOT FOUND.

STRUCTURE_FIT
2-3 sentences: does the section structure fit this content's domain and shape (e.g., myth-busting health interview vs technical tutorial), or does it read like a generic forced template?

Do not rewrite the page. Do not output anything outside these four sections.
```

## Completeness check (mandatory)

After the run, verify the output contains all four headings: `SUMMARY`, `FINDINGS`, `FIDELITY_SPOTCHECK`, `STRUCTURE_FIT`. If any is missing or empty, the Sol report must name exactly which sections are missing — never paraphrase around a gap.
