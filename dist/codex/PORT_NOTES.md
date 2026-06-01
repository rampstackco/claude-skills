# Codex Port Notes (spike)

Feasibility notes for porting the claude-skills catalog to OpenAI Codex. Generated
by `scripts/build-codex.mjs`. This is a spike: the transform favors a clean,
reversible mapping over polish.

## Skill count

- **102 skills** in the source catalog (`skills/<name>/SKILL.md`).
- **102 skills** emitted to `dist/codex/.agents/skills/`.
- **488 reference files** copied across all skills, byte for byte.

## Frontmatter normalization

Every source skill carries exactly five frontmatter keys, uniformly:

- `name`
- `description`
- `category`
- `catalog_summary`
- `display_order`

Codex consumes only the portable core, `name` and `description`. The build keeps
those two on the emitted `SKILL.md` and moves the other three into a per-skill
sidecar:

```
dist/codex/.agents/skills/<name>/references/_claude-frontmatter-extras.yaml
```

### Keys sidecar'd and why

| Key | Why it is removed | Why it is kept (in sidecar) |
| --- | --- | --- |
| `category` | Claude-catalog grouping; not part of the skill contract Codex reads. | Lets the port be reversed and preserves catalog taxonomy. |
| `catalog_summary` | Short marketing summary for the Claude catalog UI; redundant with `description` for Codex. | Reversibility and catalog regeneration. |
| `display_order` | Ordering hint for the Claude catalog listing; meaningless to Codex. | Reversibility. |

The transform is fully reversible: merging the sidecar keys back into the
`SKILL.md` frontmatter block restores the original. The SKILL.md body and section
structure are left untouched (verified byte-identical below the frontmatter).

### Description length conformance (Codex 1024-char cap)

Codex refuses to load any skill whose `description` exceeds 1024 characters
(confirmed empirically against codex-cli 0.118.0, which logs `invalid
description: exceeds maximum length of 1024 characters` and drops the skill).
Three source descriptions are over the cap:

| Skill | Original length | Emitted length |
| --- | --- | --- |
| `integration-orchestrator` | 1483 | 996 |
| `creative-direction` | 1322 | within cap, truncated at a sentence boundary |
| `logo-design` | 1222 | within cap, truncated at a sentence boundary |

For these, the build emits a description truncated at a sentence (or word)
boundary under the cap, and writes the full original into the sidecar as
`description_full`. Nothing is lost and the change is reversible. A gating check
(`E. every emitted description is within Codex 1024-char cap`) prevents
regression. Owners who prefer richer discovery text should shorten the source
descriptions in `skills/` (out of this lane) rather than rely on truncation.

## MCP dependencies detected

16 skills reference an MCP. Named servers detected by the build:

- **Ahrefs MCP** (7 skills): `seo-audit-orchestration`, `seo-backlink-audit`,
  `seo-content-gap-audit`, `seo-keyword-gap-audit`, `seo-rank-tracking`,
  `seo-site-health-audit`, `seo-traffic-diagnosis`. This is the key dependency:
  it powers the entire SEO audit suite. Note that `seo-competitor` and other SEO
  skills also mention Ahrefs in prose; the build flags a server only where the
  text uses the explicit "Ahrefs MCP" phrasing, so the per-skill list is a floor,
  not a ceiling.
- **Similarweb MCP** (1): `seo-competitor`.
- **Chrome / Playwright / Windows / Linear / GitHub MCP** (1 skill each):
  `integration-orchestrator` (illustrative integration examples).
- **Generic MCP mentions** (7): `ads-creative-development`,
  `ads-performance-analytics`, `experiment-design`, `experimentation-analytics`,
  `experimentation-platform-orchestrator`, `feature-flagging`,
  `paid-media-strategy`. These mention "MCP" without a recognized server name and
  need operator review.

A commented MCP wiring template is emitted at `dist/codex/agents/openai.yaml`. It
lists every detected server with placeholder `url` / `name` / `transport` fields.
No real server config or credentials are fabricated; the operator fills these in.

## What maps cleanly vs what needs an operator decision

Maps cleanly:

- Skill discovery shape. Codex scans `.agents/skills/` from cwd up to the repo
  root, so dropping `.agents/skills/<name>/SKILL.md` is a direct fit.
- The `name` + `description` contract. Both are present and non-empty for all 102
  skills.
- Reference material. The `references/` subtree (including nested folders in
  `brand-archetype-system` and `creative-brief-selector`) copies verbatim.

Needs an operator decision:

- **MCP wiring.** Codex must be pointed at real MCP server endpoints. The
  template enumerates what is needed but cannot supply environment-specific URLs
  or auth.
- **Catalog metadata.** If Codex tooling later wants categories or ordering, the
  operator decides whether to read the sidecar or discard it.
- **Generic MCP mentions.** Seven skills reference MCP without naming a server;
  an operator should confirm which concrete server (if any) each needs.

## Known caveats

- MCP detection is text-based against a curated server allowlist. It is
  deliberately conservative to avoid noise from phrases like "the MCP" or "hosted
  MCP", so prose mentions of a tool that do not use the "<Name> MCP" phrasing are
  not auto-detected.
- Skills that depend on the Ahrefs MCP degrade to manual guidance if the server
  is not wired up; they do not hard-fail, but their data-pull steps will not run.
- This distribution does not transform skill bodies for any Codex-specific
  prompt conventions. Bodies are carried over as-is; behavioral parity assumes
  Codex interprets the same Markdown instructions Claude does.
- The sidecar file lives under `references/`. If a future Codex feature recurses
  `references/` as model-readable context, the operator may want to exclude
  `_claude-frontmatter-extras.yaml`.

## Phase 2: verification and hardening

This round hardened the build and verified discovery. All results below are
reproducible with `node scripts/build-codex.mjs` (and `--check`).

### Step 1 - Idempotency and drift guard

- The build is deterministic: building twice produces byte-identical generated
  output (`.agents/` + `agents/openai.yaml`). The default run asserts this and
  prints PASS/FAIL.
- `node scripts/build-codex.mjs --check` rebuilds the generated tree into a temp
  dir and diffs it against the committed `dist/codex/`. It exits nonzero and
  lists any differing paths. This is the staleness guard so the committed dist
  can never silently drift from `skills/`. Result: PASS (in sync).

### Step 2 - Description-discrimination audit (heuristic)

Written to `dist/codex/SKILL_DISCOVERY_AUDIT.md`. This is a static token-overlap
proxy, not a runtime test, and is labeled as such throughout. Findings:

- 6 of 8 fixture prompts placed the expected skill in the top 3 by token overlap.
- 2 low-confidence prompts: `brand-archetype-system` (rank 4, crowded brand-* term
  cluster) and `experiment-design` (rank 22). Both reflect overlapping vocabulary
  among neighboring skills, not broken discovery.
- 3 descriptions lack an explicit use cue (`experiment-design`,
  `experimentation-analytics`, `feature-flagging`): they are written as prose
  summaries without "use when / triggers on" phrasing. Sharpening these in the
  source would improve discovery. No thin or duplicate descriptions.

### Step 3 - openai.yaml sanity

All PASS: the file exists and is non-empty; all seven detected MCP servers
(Ahrefs, Similarweb, Chrome, Playwright, Windows, Linear, GitHub) appear as
commented entries; every non-empty line is a comment, so there are no uncommented
urls, keys, or tokens.

### Step 4 - Real discovery check (Codex CLI)

Verified against the installed `codex-cli 0.118.0` (logged in via ChatGPT). A
scratch workspace containing the emitted `.agents/` tree was loaded via
`codex exec --cd <scratch> --skip-git-repo-check -s read-only`, with
`RUST_LOG=info` capturing the skill manager logs.

- **Before the description fix:** 3 skills failed to load with `invalid
  description: exceeds maximum length of 1024 characters` (`creative-direction`,
  `integration-orchestrator`, `logo-design`).
- **After the fix:** zero load errors. All 102 skills load cleanly.
- Caveat: the subsequent model turn errored with "the 'gpt-5.3-codex' model is
  not supported when using Codex with a ChatGPT account." That is an
  account/model issue unrelated to skill discovery; the discovery and load phase
  completed successfully before it. This is why Step 4 is a discovery/parse
  check, not an end-to-end behavioral test.

### Manual smoke test (owner, authoritative)

The automated checks are necessary but not sufficient. The one remaining gate
before merge is a live smoke test by the owner:

1. Copy the distribution into a scratch Codex workspace:
   `cp -r dist/codex/.agents <scratch-project>/`
2. From inside `<scratch-project>`, start Codex (interactive `codex`, or
   `codex exec --cd <scratch-project> --skip-git-repo-check`).
3. Give it a prompt that should trigger a specific skill, for example:
   "write a creative brief for a new marketing site".
4. Confirm Codex loads and applies the `creative-brief` skill (its guidance
   should shape the output). Repeat with an on-page SEO prompt (expect
   `seo-onpage`) and a brand-archetype prompt (expect `brand-archetype-system`).
5. If a skill needs an MCP (for example the SEO suite needs Ahrefs), wire the
   server from `dist/codex/agents/openai.yaml` first.

Note: Codex also discovers skills from `~/.codex/skills/` (the `$CODEX_HOME/skills`
directory), in addition to scanning `.agents/skills/` from cwd up to the repo
root. To install globally instead of per-project, copy the skill folders there.

## Feasibility

The port is mechanically straightforward and low risk: a dependency-free,
reversible transform produces a clean `.agents/skills/` tree for all 102 skills,
and the real Codex CLI loads all 102 with zero parse errors once descriptions are
held under Codex's 1024-char cap. The only remaining integration work is
operator-supplied MCP server config and the owner's live smoke test.
