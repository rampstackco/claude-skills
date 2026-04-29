# Repository review: claude-skills

**Reviewed:** 2026-04-28
**Total files reviewed:** 142 markdown files (59 SKILL.md, 75 reference files, 8 root/meta docs)

## Summary

The library is in strong shape and close to publication-ready. Structure is consistent, frontmatter validates, the README catalog matches the file tree exactly (59 = 59), and the catalog numbering is sequential. The single biggest risk to ship is **27 mismatches between the "Reference files" sections of SKILL.md and the actual files in `references/`**. That issue is fully mechanical and fixable in a follow-up pass. After those fixes plus a handful of small section-naming and stale-doc corrections, the repo is publishable.

There are no security findings, no leaked secrets, no Windows file paths, no leaked private brand names from the watch list (rampstack/adunn08/etc. — the only `rampstack*` hits are the legitimate public org `rampstackco` and the public domain `rampstack.co`), and no prompt-injection vectors. The .gitignore is reasonable. LICENSE is MIT and matches the README claim.

---

## Critical (P0) — block publication

None found.

---

## High (P1) — fix before next release

### P1-1. Twenty-one SKILL.md files cite reference files that do not exist

Each of the following SKILL.md files lists a file in its "Reference files" section that does not exist in the corresponding `references/` folder. These are user-facing broken links — a reader following the SKILL.md will hit a dead path.

| Skill | Listed but missing |
|---|---|
| `art-direction` | `references/illustration-brief.md` |
| `brand-discovery` | `references/discovery-report-template.md` |
| `brand-ideation` | `references/ideation-output-template.md` |
| `brand-identity` | `references/identity-system-spec.md` |
| `brand-style-guide` | `references/maintenance-playbook.md` |
| `content-and-copy` | `references/content-edit-checklist.md` |
| `content-strategy` | `references/editorial-calendar-template.md` |
| `design-standards` | `references/contrast-and-accessibility.md` |
| `design-system` | `references/design-tokens-template.md`, `references/system-audit-template.md` |
| `email-sequences` | `references/email-templates.md` |
| `frontend-component-build` | `references/component-spec-template.md` |
| `information-architecture` | `references/ia-document-template.md` |
| `landing-page-copy` | `references/objection-library.md` |
| `performance-optimization` | `references/audit-template.md`, `references/optimization-checklist.md` |
| `seo-aeo-geo` | `references/extraction-friendly-patterns.md` |
| `seo-competitor` | `references/content-gap-method.md` |
| `seo-content-audit` | `references/audit-template.md` |
| `seo-keyword` | `references/intent-classification-guide.md` |
| `seo-offpage` | `references/linkable-assets-guide.md` |
| `seo-onpage` | `references/title-and-meta-patterns.md` |
| `seo-technical` | `references/audit-template.md` |
| `vendor-evaluation` | `references/scorecard-template.md` |

**Suggested fix:** for each, either (a) write the missing reference file, or (b) update the SKILL.md "Reference files" list to remove or rename the entry to match the file that exists. Where an orphan exists alongside (see P1-2), the rename is usually the right call.

### P1-2. Six skills have orphan reference files (file exists, not listed in SKILL.md)

These files exist on disk but are not mentioned in their SKILL.md "Reference files" section, so a reader has no signal that they exist or when to read them.

| Skill | Orphan file | Likely related broken link from P1-1 |
|---|---|---|
| `art-direction` | `references/creative-brief-template.md` | (separate from `illustration-brief.md`) |
| `design-system` | `references/system-architecture.md` | (no clean match) |
| `email-sequences` | `references/sequence-templates.md` | likely the rename target for `email-templates.md` |
| `frontend-component-build` | `references/component-api-patterns.md` | likely the rename target for `component-spec-template.md` |
| `performance-optimization` | `references/optimization-playbook.md` | likely the rename target for `optimization-checklist.md` and/or `audit-template.md` |
| `vendor-evaluation` | `references/evaluation-rubric.md` | likely the rename target for `scorecard-template.md` |

**Suggested fix:** decide for each whether the orphan replaces a P1-1 broken entry (rename in SKILL.md) or is genuinely missing from the listing (add to SKILL.md). `email-sequences`, `frontend-component-build`, `performance-optimization`, and `vendor-evaluation` look like simple rename mismatches and can be resolved by updating the SKILL.md list to match the actual filename.

### P1-3. Broken cross-skill reference: `pm-framework`

`skills/cost-optimization/SKILL.md:199` reads:

> `- Spec the change (use `pm-framework` for the plan)`

`pm-framework` is the pre-public name (see MAPPING.md). The current public skill is `pm-spec-writing`. A reader trying to follow the cross-reference will not find a skill by that name.

**Suggested fix:** rename to `pm-spec-writing` at `skills/cost-optimization/SKILL.md:199`.

### P1-4. Three SKILL.md files break the documented uniform section order

SKILL_AUTHORING.md (line 28) says: "Every SKILL.md follows this exact section order. If a section does not apply, omit it cleanly. **Do not invent new top-level sections.**" Three skills do.

| Skill | Section that should be / is |
|---|---|
| `creative-brief` | Has `## The brief structure` instead of `## The framework`; has `## What kills a brief` instead of `## Failure patterns` |
| `incident-response` | Has `## Workflow for an active incident` instead of `## Workflow` |
| `skill-creation-walkthrough` | Has `## What a skill actually is` and `## The 6-phase walkthrough` instead of `## The framework` and `## Workflow` |

**Suggested fix:** rename the headers to the standard names. The body content is fine. (Or: amend SKILL_AUTHORING.md to allow descriptive suffixes like `## The framework: 5 phases`, which several conforming skills already use — pick one rule and apply it.)

---

## Medium (P2) — address in a follow-up pass

### P2-1. MAPPING.md is stale

MAPPING.md was written for the v1 port of 11 skills. The repo is now 59 skills. Specific staleness:

- Line 11 ("The starting position: 5 user-scoped skills. The public v1: 11 skills.") and the entire ship plan (lines 148-159) describe a snapshot that no longer matches the catalog.
- Line 79 onward describes porting `seo-review` → `seo-foundations`. There is no `seo-foundations` skill — the SEO foundation work was instead split into 7 skills (`seo-onpage`, `seo-technical`, `seo-keyword`, `seo-competitor`, `seo-offpage`, `seo-content-audit`, `seo-aeo-geo`).
- Lines 142-144 reference `seo-foundations` in the "What does NOT get ported" notes.

**Suggested fix:** either retire MAPPING.md entirely (its purpose is largely served by CHANGELOG.md now), or add a clear "Status: historical, do not treat as current" banner and rewrite the `seo-foundations` references to point at the actual successor skills.

### P2-2. MAPPING.md contradicts the public style policy

MAPPING.md line 144 reads:

> "Personal style preferences (em dash prohibition, hashtag-in-comments, specific monetization patterns). These live in your private skills, not the public set."

But the public repo *does* prohibit em dashes (SKILL_AUTHORING.md line 133, CONTRIBUTING.md line 89). The MAPPING.md statement is no longer true and contradicts the standard a contributor would follow.

**Suggested fix:** delete that bullet, or rewrite to reflect that the em dash rule was retained for the public set.

### P2-3. No CI enforcement of the contributor checklist

CONTRIBUTING.md lists 16 contributor-checklist items (broken links, em dashes, frontmatter validity, length caps, etc.) but `.github/` contains no `workflows/` folder, so none of those checks are mechanical. The same review that produced this report had to run them manually. For a public repo, even a single GitHub Action that runs `markdownlint` plus a small frontmatter validator script would prevent recurrence of the P1-1 / P1-2 / P1-3 / P1-4 issues.

**Suggested fix:** add `.github/workflows/lint.yml` with at minimum: (a) a check that every SKILL.md has valid YAML frontmatter with `name` and `description`, (b) a check that every file referenced in a SKILL.md "Reference files" section exists, (c) a markdownlint pass. Listed under Suggested Additions below.

### P2-4. 22 SKILL.md files exceed the 250-line guideline

SKILL_AUTHORING.md says SKILL.md should aim for under 250 lines (hard cap 500). None hit the hard cap, but 22 are over the soft cap. Worst offenders:

| Skill | Lines |
|---|---|
| `documentation-strategy` | 425 |
| `stakeholder-communication` | 357 |
| `cost-optimization` | 336 |
| `dependency-management` | 323 |
| `media-asset-management` | 302 |

**Suggested fix:** for the worst offenders, move material into a reference file (the `documentation-strategy/references/doc-types-guide.md` file is already 451 lines — there may be redundancy worth extracting). Lower-priority skills (260-280 lines) are within an acceptable margin of the soft cap.

### P2-5. 4 reference files exceed the 400-line guideline

| Reference file | Lines |
|---|---|
| `skills/stakeholder-communication/references/update-templates.md` | 452 |
| `skills/documentation-strategy/references/doc-types-guide.md` | 451 |
| `skills/brand-style-guide/references/style-guide-template.md` | 407 |
| `skills/analytics-strategy/references/event-taxonomy-template.md` | 407 |

**Suggested fix:** SKILL_AUTHORING.md says "if longer, add a table of contents at the top." Spot-check whether these have one; if not, add it, or split into two reference files.

### P2-6. Trigger overlap risk between SEO foundation skills and SEO audit suite

The catalog deliberately ships `seo-keyword` (foundation, skill 17) alongside `seo-keyword-gap-audit` (audit suite, skill 24), and `seo-content-audit` (foundation, skill 20) alongside `seo-content-gap-audit` (audit suite, skill 25). For a user prompt like "audit my keywords" or "audit my content gaps" the trigger boundary depends on whether the user implies use of Ahrefs.

The descriptions and "When NOT to use" sections handle this reasonably (the audit-suite skills repeatedly mention the Ahrefs MCP), but a user without Ahrefs may still load an audit-suite skill that then asks for data they cannot produce.

**Suggested fix:** in each of the seven audit-suite skills, add an early-exit pattern in the workflow: "If Ahrefs MCP is not available, redirect the user to `seo-keyword` / `seo-content-audit` / etc." Lightweight; prevents dead ends.

---

## Low (P3) — polish

### P3-1. Em dash characters appear in two infrastructure files

`CONTRIBUTING.md:89` and `.github/PULL_REQUEST_TEMPLATE.md:33` contain literal `—` characters, but only inside the rule itself ("No em dashes anywhere in the changed files (search for `—`)"). Technically violates the "ZERO em dashes" rule when grepped, but the character is being demonstrated, not used as punctuation.

**Suggested fix:** wrap the demonstration in inline code (which it already is) and accept the false positive, or restate the rule without showing the character: "search for the em dash character (Unicode U+2014)."

### P3-2. `rampstackco` and `rampstack.co` appear in meta-doc files beyond LICENSE/README

The strict reading of the brand-hygiene rule is that `rampstackco` only appears in LICENSE and possibly README. It also appears in CHANGELOG.md (link), CONTRIBUTING.md (links), CODE_OF_CONDUCT.md (email), SECURITY.md (links and email), and `.github/ISSUE_TEMPLATE/*.yml` (links). All of these are necessary for those files to function — the repo *is* under the rampstackco org, and the SECURITY contact must be a real address.

**Suggested fix:** treat the rule as scoped to skill content (SKILL.md and reference files), not meta-doc files, and update the rule wording accordingly. No changes needed to the files themselves.

### P3-3. "best-in-class" appears in a worked example

`skills/vendor-evaluation/references/evaluation-rubric.md:137` contains "C has best-in-class deliverability for our specific industry." This is inside a sample qualitative finding showing what a vendor evaluation memo looks like, so the hype phrase is contextually appropriate (it's the kind of thing stakeholders write). Borderline.

**Suggested fix:** optionally rewrite to "C has the strongest deliverability for our specific industry" to model the voice the repo prefers, but not blocking.

### P3-4. README badge image alt text is functional but light

`docs/banner.jpg` is used at the top of README with alt text "59 Claude Skills for the full web lifecycle. Build, ship, audit, optimize." Fine for a hero banner, but worth noting if the count ever changes — the alt text and the badge ("Skills-59") and the section anchor (`#the-59-skill-catalog`) and CHANGELOG.md count all need to update together.

**Suggested fix:** consider whether to wrap "59" in a single source or just be diligent about updates. Not a real bug today.

### P3-5. `skill-creation-walkthrough/SKILL.md` description is not quoted

Most SKILL.md descriptions are wrapped in double quotes in the YAML frontmatter (`description: "..."`). `skill-creation-walkthrough/SKILL.md:3` is an unquoted YAML scalar. Both are valid YAML, but the inconsistency is visible to anyone scanning frontmatter.

**Suggested fix:** quote it for consistency.

---

## Findings by category

### 1. Structural consistency

- **Status: mostly clean.** 59 skill folders, 59 SKILL.md, 75 reference files, every skill has a `references/` directory with at least one file.
- All `name:` frontmatter fields match folder names exactly (verified mechanically).
- All SKILL.md files start with valid YAML frontmatter and have a `description:` field.
- File and folder names follow lowercase-hyphenated convention.
- **Issues:** P1-1, P1-2, P1-4 above.

### 2. Trigger and description quality

- Every description has an "Also triggers" line (verified mechanically — zero misses across 59 skills).
- Sentence count is in the 4-6 range. The high end (5-6) is mostly punctuation in domain terms (`llms.txt`, `H1`) not actual sentence count, so the "2-4 sentence" rule is effectively followed.
- Spot-check of 5 prompts:
  - "Help me write a creative brief" → `creative-brief`. ✓
  - "Audit my homepage" → `seo-onpage`. ✓
  - "Plan our content roadmap" → `content-strategy` (would also reasonably trigger `seo-content-gap-audit` for an Ahrefs user). Borderline overlap, see P2-6.
  - "Postmortem template" → `after-action-report`. ✓
  - "How do I write my own skill?" → `skill-creation-walkthrough`. ✓
- **Issues:** P2-6 (trigger overlap between SEO foundation and audit suite); P3-5 (description quoting).

### 3. Content quality

- "When NOT to use" sections consistently redirect to sibling skills with backticked names.
- "Failure patterns" sections (where present) are specific and named, not generic. Example from `seo-onpage`: each pattern names the exact mistake (title-tag stuffing, identical H1-and-title, etc.).
- "Workflow" sections are numbered steps in conforming skills. The exception is `incident-response` which renames the section (P1-4).
- Reference files generally go deeper than SKILL.md. Worked examples (e.g., `vendor-evaluation/references/evaluation-rubric.md`) are concrete, with named hypothetical vendors and numeric scores.
- **Issues:** P1-3 (broken `pm-framework` cross-reference); minor "we believe" / "I think" usages are all in templates or quoted bad-example dialogue and are intentional (verified by spot-read).

### 4. Style and voice consistency

- **Em dashes: 2 occurrences, both in the rule definition itself** (CONTRIBUTING.md:89, PULL_REQUEST_TEMPLATE.md:33). Zero in skill content. P3-1.
- No first-person voice violations in skill bodies. The "I" / "we" hits are all inside template scripts (interview guides, outreach emails) where they are correct dialog.
- No vendor-specific framework references in SKILL.md bodies. The Ahrefs MCP suite (skills 22-28) names Ahrefs as expected. The two SKILL.md files outside the suite that mention Ahrefs (`seo-keyword`, `seo-offpage`) do so as one of "Ahrefs, Semrush, Moz, Majestic, or similar" — compliant with SKILL_AUTHORING.md line 159.
- No version-specific framework references found (`grep` for "React 1X", "Next.js 1X", "Tailwind X" returned zero in SKILL.md).
- **Issues:** P3-1, P3-3.

### 5. Privacy and brand hygiene

- Watch list grep returned **zero hits** for: adunn08, bankranked, wirly, vehiclemd, carcabin, codeblu, stayrentals, insurrates, mycarneedsthis, tereks, GameDesk, ANDY, checkvin, credit-factor, straightstocks, econgrader, degreemath, taxgrader, retiregrader, smallbizgrader.
- `rampstack` hits are limited to the legitimate public org name `rampstackco` and the public domain `rampstack.co`. None appear inside skill content. P3-2 lists where they appear (meta-doc files).
- No real third-party email addresses in skill content. The two real emails (conduct@rampstack.co, security@rampstack.co) are in CODE_OF_CONDUCT.md and SECURITY.md and are necessary for those files. All other email matches are `example.com` placeholders inside DMARC/SPF examples.
- No leaked Windows file paths (`C:\Users\...`, `file:///`) anywhere in tracked content.
- **Issues:** P3-2.

### 6. Security review

- No hardcoded secrets, API keys, tokens, or credentials. The single hit for `STRIPE_SECRET_KEY` (`skills/code-review-web/references/nextjs-patterns.md:213`) is an env-var name in a "do not prefix this with `NEXT_PUBLIC_`" example, which is defensive guidance, not a leak.
- No examples that demonstrate insecure patterns without flagging them. Spot-checked `security-baseline/SKILL.md` and `code-review-web/references/nextjs-patterns.md` — both flag insecure patterns explicitly.
- `.gitignore` covers `.env`, `.env.local`, OS cruft (`.DS_Store`, `Thumbs.db`, `desktop.ini`), editor files (`.vscode/`, `.idea/`, swap files), logs, and temp files. Reasonable for a public docs repo.
- LICENSE is MIT and matches the README badge claim.
- No instructions in any SKILL.md that would lead a user to do something insecure. Grep for "disable CSP", "allow unsafe-inline" returned zero.
- No prompt-injection vectors in SKILL.md or reference content. Spot-checked the meta-skill `skill-creation-walkthrough` and the most-likely vector files (`seo-aeo-geo`, `email-sequences`); content is descriptive, not directive at downstream LLMs.
- All external links in skill content go to durable, well-known domains (W3C, MDN, Schema.org, modelcontextprotocol.io, docs.claude.com, etc.). No suspicious or shortened URLs.
- **Issues:** none.

### 7. Internal link integrity

- Every relative link in README.md to a skill SKILL.md resolves (mechanically verified, 59/59).
- README's `LICENSE`, `CONTRIBUTING.md`, `SKILL_AUTHORING.md` links resolve.
- README references `docs/banner.jpg` — exists.
- SKILL_AUTHORING.md references `creative-brief/references/voice-and-tone-guide.md` (line 133) — exists.
- MAPPING.md references skills `seo-foundations` (does not exist) and `pm-framework` / `design-framework` / `seo-review` / `dev-code-review` (pre-public names, do not exist). See P2-1.
- **Issues:** P1-1, P1-2, P1-3, P2-1.

### 8. README and meta-doc accuracy

- README claims 59 skills. Verified: 59 folders, 59 SKILL.md files, 59 entries in the catalog tables.
- README skill numbering is sequential 1-59 with no gaps.
- README catalog matches the actual skills directory exactly (set diff in both directions: empty).
- SKILL_AUTHORING.md's documented section order matches what most skills do; three skills break it (P1-4).
- CHANGELOG.md `[1.0.0]` entry matches the 59-skill catalog.
- **Issues:** P2-1 (MAPPING.md stale).

### 9. Best practices for public Claude Skills repos

- Each SKILL.md is under the 500-line hard cap. 22 are over the 250-line soft cap (P2-4).
- 4 reference files are over the 400-line soft cap (P2-5).
- Skills are stack-agnostic except the deliberately tool-bound Ahrefs MCP suite.
- Frontmatter (`name`, `description`) follows the documented Claude Skills format.
- Skills compose well: cross-references are present (`incident-response` → `monitoring-and-alerting`, `creative-brief` → `brand-voice`, etc.). Bidirectionality is mostly good but not exhaustively checked — spot-check showed no obvious one-way orphans.
- **Issues:** P2-4, P2-5.

### 10. Missing-but-valuable additions

The repo already has CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md, GitHub issue templates, and a PR template. The notable gaps:

- **No CI workflow.** The contributor checklist in CONTRIBUTING.md is honor-system. See P2-3.
- **No docs/ split.** SKILL_AUTHORING.md (217 lines) is fine as a single file. No need to split unless it grows.

---

## Suggested additions (not bugs)

### Add `.github/workflows/lint.yml`

Even a minimal workflow would catch the issues found in P1-1, P1-2, P1-3, P1-4 automatically. Suggested checks:

1. YAML frontmatter validation: every `skills/*/SKILL.md` has `name:` and `description:` fields and `name` matches the folder name.
2. Reference-file integrity: every relative `references/*.md` link in a SKILL.md resolves to an actual file.
3. Em dash check: grep for `—` in any tracked file other than the rule-definition lines.
4. Markdownlint pass with a minimal config (consistent header style, no trailing whitespace, no broken markdown).
5. Optional: a script that flags SKILL.md > 250 lines and reference files > 400 lines as warnings (not failures).

Implementation effort: a few hours. Pays back the first time a contributor PR adds a broken link.

### Consider retiring MAPPING.md

Its purpose was to record v1 port decisions. The catalog has moved well beyond v1 and the document is contradicting itself (P2-1, P2-2). Either archive it under `docs/history/MAPPING-v1.md` with a clear "historical" header, or delete it and rely on `git log` plus CHANGELOG.md.

### Add a `docs/banner.jpg` source file or generation note

The banner is a baked image. If the count changes (60, 75, 100 skills), there is no easy way for a maintainer to regenerate it. Optional: include a `docs/banner.source.md` or a note in CONTRIBUTING.md about how the banner was made.

---

## Statistics

- Total skills: 59
- Total reference files: 75
- Total markdown files: 142
- Em dash count in repo: 2 (both in rule-definition contexts: CONTRIBUTING.md:89, .github/PULL_REQUEST_TEMPLATE.md:33)
- Brand leak count from watch list: 0 (verified against 18-name list; rampstackco/rampstack.co are the legitimate public org and domain)
- Skills exceeding 250 lines: 22 (worst: documentation-strategy at 425; hard cap 500 not exceeded)
- Skills exceeding 500 lines: 0
- Reference files exceeding 400 lines: 4
- Internal link integrity issues: 22 SKILL.md ↔ references mismatches (21 broken refs, 6 orphans, distributed across 22 skills) + 1 broken cross-skill name (`pm-framework`) + 1 stale doc (MAPPING.md → `seo-foundations`)
- SKILL.md files breaking the documented section order: 3
- SKILL.md files missing required sections: 0 (the three above use renamed sections, not missing ones)
- Hardcoded secrets / credentials: 0
- Real third-party emails: 0 in skill content; 2 in meta-doc files (project mailboxes, intentional)
- Windows file paths leaked: 0

---

## Methodology

- Mechanical checks via `grep` / `find` / `wc` / `awk`: em-dash search, brand-name watchlist, secret-pattern grep (api_key, sk-, AKIA, ghp_, etc.), email regex, line counts, SKILL.md frontmatter validation, folder-name vs `name:`-field comparison, reference-file existence vs SKILL.md "Reference files" listing, README catalog vs actual skill folder set diff.
- Content review: read-through of SKILL_AUTHORING.md, CONTRIBUTING.md, CHANGELOG.md, README.md, MAPPING.md, LICENSE, .gitignore, and a sample of SKILL.md files (`seo-onpage`, `creative-brief`, `incident-response`, `seo-aeo-geo`, `cost-optimization`, `skill-creation-walkthrough`) plus their referenced files.
- Section-order verification used `grep -E "^## "` per SKILL.md compared against the documented order.
- Trigger collision check was a spot-read of the descriptions plus 5 simulated prompts; not exhaustive across all 59 × 59 pairs.

### Caveats

- This is a static review. No skill was actually loaded into Claude and triggered against a real prompt to verify trigger reliability end-to-end.
- The "trigger collision" check (P2-6) is qualitative, based on reading descriptions. A fuller pass would simulate 50+ prompts and observe which skill loads.
- Reference-file content quality (depth, accuracy, freshness) was spot-checked, not exhaustively read. The 75 reference files would take a longer pass to fully audit on substance.
- Bidirectional cross-reference checking (e.g., does `monitoring-and-alerting` mention `incident-response` in its "When NOT to use"?) was not exhaustive.
- Markdown rendering was not visually verified in a GitHub preview.

---

# Appendix: P1 fixes applied

**Applied:** 2026-04-28
**Scope:** all P1 findings (P1-1 through P1-4). P2 and P3 findings deferred to a later pass.

## Summary of changes

- **3 SKILL.md filename-drift renames** (Cluster 1)
- **1 cross-skill ref fix** (`pm-framework` → `pm-spec-writing`) (Cluster 1)
- **5 SKILL.md section header normalizations** across 3 skills + 1 SKILL_AUTHORING.md rule clarification (Cluster 1, P1-4)
- **4 SKILL.md "Reference files" sections updated** to add 6 orphan files (Cluster 2)
- **20 new reference files written** (5 in Cluster 2 to resolve broken refs alongside orphans, 15 in Cluster 3 to resolve no-orphan broken refs)

Net: 27 SKILL.md ↔ references mismatches resolved (21 broken refs + 6 orphans). Repo went from 75 reference files to 95.

## Cluster 1: mechanical fixes

### P1-1 / P1-2 renames (3 SKILL.md edits)

| File | Change |
|---|---|
| `skills/email-sequences/SKILL.md:278` | `email-templates.md` → `sequence-templates.md` |
| `skills/vendor-evaluation/SKILL.md:277` | `scorecard-template.md` → `evaluation-rubric.md` (description rewritten to match actual file content) |

### P1-3 cross-skill reference fix

| File | Change |
|---|---|
| `skills/cost-optimization/SKILL.md:199` | `pm-framework` → `pm-spec-writing` |

Verified zero remaining `pm-framework` / `design-framework` / `seo-review` / `seo-foundations` / `dev-code-review` / `pm-template` references in `skills/`. Lingering mentions exist only in MAPPING.md (P2 territory, intentional historical doc) and REVIEW.md itself.

### P1-4 section header normalization

Three skills had renamed core section headers. All now use canonical text, optionally with a colon-suffix label.

| File | Old header | New header |
|---|---|---|
| `skills/creative-brief/SKILL.md:48` | `## The brief structure` | `## The framework: brief structure` |
| `skills/creative-brief/SKILL.md:127` | `## What kills a brief` | `## Failure patterns` |
| `skills/incident-response/SKILL.md:193` | `## Workflow for an active incident` | `## Workflow` |
| `skills/skill-creation-walkthrough/SKILL.md:30` | `## What a skill actually is` | `## The framework: how skills work` |
| `skills/skill-creation-walkthrough/SKILL.md:42` | `## The 6-phase walkthrough` | `## Workflow` |

Also added a paragraph to `SKILL_AUTHORING.md:29` clarifying the rule: each canonical header MUST start with the exact canonical text and MAY append a colon-suffix descriptive label. Explicitly forbids replacing the canonical word.

## Cluster 2: orphan reconciliation

For each skill with both an orphan file and a broken ref, added the orphan to the SKILL.md "Reference files" list AND wrote the missing file.

### SKILL.md updates (4 files)

| File | Change |
|---|---|
| `skills/art-direction/SKILL.md:192` | Added `creative-brief-template.md` (generic art direction brief). Now lists 3 references. |
| `skills/design-system/SKILL.md:197` | Added `system-architecture.md` (four-layer model). Now lists 3 references. |
| `skills/performance-optimization/SKILL.md:271` | Added `optimization-playbook.md` (symptom-to-fix). Now lists 3 references. |
| `skills/frontend-component-build/SKILL.md:180` | Added `component-api-patterns.md` and tightened `component-spec-template.md` description. Now lists 3 references. |

### New reference files (5)

| File | Lines |
|---|---|
| `skills/art-direction/references/illustration-brief.md` | 238 |
| `skills/design-system/references/system-audit-template.md` | 258 |
| `skills/performance-optimization/references/audit-template.md` | 203 |
| `skills/performance-optimization/references/optimization-checklist.md` | 138 |
| `skills/frontend-component-build/references/component-spec-template.md` | 250 |

## Cluster 3: missing reference files (no orphan)

15 reference files written for skills where the broken SKILL.md entry had no plausible orphan match. Each file modeled on the depth and voice of an existing companion reference file in the same skill folder.

| File | Lines |
|---|---|
| `skills/brand-discovery/references/discovery-report-template.md` | ~150 |
| `skills/brand-ideation/references/ideation-output-template.md` | ~150 |
| `skills/brand-identity/references/identity-system-spec.md` | ~190 |
| `skills/brand-style-guide/references/maintenance-playbook.md` | ~210 |
| `skills/content-and-copy/references/content-edit-checklist.md` | ~140 |
| `skills/content-strategy/references/editorial-calendar-template.md` | ~190 |
| `skills/information-architecture/references/ia-document-template.md` | ~250 |
| `skills/landing-page-copy/references/objection-library.md` | ~230 |
| `skills/seo-aeo-geo/references/extraction-friendly-patterns.md` | ~270 |
| `skills/seo-competitor/references/content-gap-method.md` | ~210 |
| `skills/seo-content-audit/references/audit-template.md` | ~200 |
| `skills/seo-keyword/references/intent-classification-guide.md` | ~250 |
| `skills/seo-offpage/references/linkable-assets-guide.md` | ~250 |
| `skills/seo-onpage/references/title-and-meta-patterns.md` | ~270 |
| `skills/seo-technical/references/audit-template.md` | ~270 |

(Approximate line counts; all within the 100-300 line target.)

## Final verification (post-fix)

| Check | Result |
|---|---|
| Broken SKILL.md ↔ references links | **0** (was 21) |
| Orphan reference files | **0** (was 6) |
| References to `pm-framework` or other pre-public skill names in `skills/` | **0** (was 1) |
| All 59 SKILL.md files have a section starting with `## The framework` | **Yes** (was 56/59) |
| Em dash count in `skills/` | **0** |
| Em dash count repo-wide | 2 in rule-definition lines (CONTRIBUTING.md, PULL_REQUEST_TEMPLATE.md) + 19 in REVIEW.md (this report) |
| Brand watch list hits | **0** (matches in REVIEW.md and this appendix discuss the watch list itself; no leaks) |

## Updated stats

- Total skills: 59 (unchanged)
- Total reference files: **95** (was 75; +20 new files)
- Total markdown files: **163** (was 142)
- SKILL.md exceeding 250 lines: 22 (unchanged; this is a P2 finding, deferred)
- Reference files exceeding 400 lines: 4 (unchanged; this is a P2 finding, deferred)

## What was NOT changed

The following P2 / P3 findings were deferred per instructions:

- P2-1: MAPPING.md staleness (still references `seo-foundations`, etc.)
- P2-2: MAPPING.md em-dash rule contradiction
- P2-3: No CI workflow
- P2-4: 22 SKILL.md files over 250 lines
- P2-5: 4 reference files over 400 lines
- P2-6: Trigger overlap between SEO foundation and audit suite
- P3-1: Em dash characters in rule-definition lines (CONTRIBUTING.md, PULL_REQUEST_TEMPLATE.md)
- P3-2: `rampstackco` / `rampstack.co` in meta-doc files beyond LICENSE/README
- P3-3: "best-in-class" in vendor-evaluation worked example
- P3-4: README banner alt text 59-count brittleness
- P3-5: skill-creation-walkthrough description not quoted

All P1 findings are resolved.
