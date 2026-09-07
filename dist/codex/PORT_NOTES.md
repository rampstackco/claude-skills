# Codex Port Notes (spike)

Feasibility notes for porting the claude-skills catalog to OpenAI Codex. Generated
by `scripts/build-codex.mjs`. This is a spike: the transform favors a clean,
reversible mapping over polish.

## Skill count

- **103 skills** in the source catalog (`skills/<name>/SKILL.md`).
- **103 skills** emitted to `dist/codex/.agents/skills/`.
- **103 entries** in `SKILLS.lock`, the catalog manifest. Gating check F asserts
  the emitted set matches it by name, not merely by count.
- **490 reference files** copied across all skills, byte for byte.

## Frontmatter normalization

All 103 source skills carry exactly five frontmatter keys, uniformly (the build
reports the distinct key sets it actually observed, so a skill that grows a sixth
key shows up in the transform log rather than being hidden by this sentence):

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

**No source description is over the cap today, so the build truncates nothing.**
The three skills that needed truncation when this spike was first written have
since been shortened at the source, on main, out of this lane:

| Skill | Length when the spike was written | Length now | Truncated? |
| --- | --- | --- | --- |
| `integration-orchestrator` | 1483 | 968 | no |
| `creative-direction` | 1322 | 900 | no |
| `logo-design` | 1222 | 976 | no |

The longest emitted description in the catalog is `logo-design` at **976
characters, 48 characters of headroom** under the cap. That is a thin margin: one
added sentence in the wrong skill puts the catalog back over the line. The build
prints the longest description and its headroom on every run so the margin is a
visible number rather than an assumption, and gating check `E` fails the build if
anything crosses.

The truncation path therefore remains in the builder as a safety net. Because
live data no longer exercises it, it was verified separately against a synthetic
over-cap description (1396 chars): the emitted description came out at 976 chars,
was a prefix of the original with no rewriting, and the sidecar carried
`description_full` byte-identical to the full 1396-character original. The
transform stays lossless and reversible if the cap is ever hit again.

Owners who prefer richer discovery text should keep shortening the source
descriptions in `skills/` rather than rely on truncation.

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
- The `name` + `description` contract. Both are present and non-empty for all 103
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

- 7 of 8 fixture prompts placed the expected skill in the top 3 by token overlap.
- 1 low-confidence prompt: `brand-archetype-system` (rank 4, behind
  `brand-identity`, `brand-voice` and `creative-brief-selector`, all tied at the
  same score). That is a crowded `brand-*` vocabulary cluster, not broken
  discovery.
- 1 description lacks an explicit use cue (`feature-flagging`): it is written as
  a prose summary without "use when / triggers on" phrasing. Sharpening it in the
  source would improve discovery. No thin or duplicate descriptions.

Both numbers improved against the earlier 102-skill tree (6/8 fixtures, 2
low-confidence, 3 without a use cue) because the source descriptions were
rewritten on main, not because this builder changed. The audit is regenerated on
every build, so these figures track the catalog rather than this PR.

### Step 3 - openai.yaml sanity

All PASS: the file exists and is non-empty; all seven detected MCP servers
(Ahrefs, Similarweb, Chrome, Playwright, Windows, Linear, GitHub) appear as
commented entries; every non-empty line is a comment, so there are no uncommented
urls, keys, or tokens.

### Step 4 - Real discovery check (Codex CLI)

**This step was performed against the earlier 102-skill tree and has NOT been
re-run successfully against the current 103-skill tree. Read the dates before
citing it.**

Original run (102-skill tree), against the installed `codex-cli 0.118.0` (logged
in via ChatGPT). A scratch workspace containing the emitted `.agents/` tree was
loaded via `codex exec --cd <scratch> --skip-git-repo-check -s read-only`, with
`RUST_LOG=info` capturing the skill manager logs.

- **Before the description fix:** 3 skills failed to load with `invalid
  description: exceeds maximum length of 1024 characters` (`creative-direction`,
  `integration-orchestrator`, `logo-design`).
- **After the fix:** zero load errors. All 102 skills loaded cleanly.
- Caveat: the subsequent model turn errored with "the 'gpt-5.3-codex' model is
  not supported when using Codex with a ChatGPT account." That is an
  account/model issue unrelated to skill discovery; the discovery and load phase
  completed before it. This is why Step 4 is a discovery/parse check, not an
  end-to-end behavioral test.

Re-run attempt on the 103-skill tree (same CLI version, same account): the model
turn failed with the same `gpt-5.3-codex` account/model error, and this time the
captured log contained **no per-skill load lines at all** -- neither errors nor
successes, and none of the 103 skill names appeared in it. So the re-run is
inconclusive: it is not evidence that the current tree loads, and it is not
evidence that it fails. It produced zero `invalid description` errors, which is
consistent with gating check E (nothing is near the cap), but absence of an error
in a turn that died early proves nothing on its own.

What this means practically: the automated gates in this repo cover the shape of
the distribution (counts, references, frontmatter, description cap, lock parity,
drift, determinism). Whether the current tree actually loads in a live Codex
session is **unverified** and is exactly what the owner smoke test below is for.
Anyone running it should pass an explicit model that the account supports, since
the default `gpt-5.3-codex` errors out on a ChatGPT account before the turn does
any work.

### Manual smoke test (owner, authoritative)

The automated checks are necessary but not sufficient. The one remaining gate
before merge is a live smoke test by the owner:

1. Copy the distribution into a scratch Codex workspace **outside this repo**, so
   the walk-up scan cannot reach the repo's own `.agents`:
   `cp -r dist/codex/.agents <scratch-project>/`
2. From inside `<scratch-project>`, start Codex (interactive `codex`, or
   `codex exec --cd <scratch-project> --skip-git-repo-check -s read-only`).
   Pass an explicit `-m <model>` your account supports: the default
   `gpt-5.3-codex` fails on a ChatGPT account before the turn does any work.
3. Give it a prompt that should trigger a specific skill, for example:
   "write a creative brief for a new marketing site".
4. Confirm Codex loads and applies the `creative-brief` skill (its guidance
   should shape the output). Repeat with an on-page SEO prompt (expect
   `seo-onpage`) and a brand-archetype prompt (expect `brand-archetype-system`).
5. If a skill needs an MCP (for example the SEO suite needs Ahrefs), wire the
   server from `dist/codex/agents/openai.yaml` first.

A step-by-step dispatch version of this recipe, including what "the skill loaded"
looks like in a transcript and how to tell loading apart from the model merely
writing something plausible, is kept with the deploy tooling rather than in this
generated tree.

Note: Codex also discovers skills from `~/.codex/skills/` (the `$CODEX_HOME/skills`
directory), in addition to scanning `.agents/skills/` from cwd up to the repo
root. To install globally instead of per-project, copy the skill folders there.

## Feasibility

The port is mechanically straightforward and low risk: a dependency-free,
reversible transform produces a clean `.agents/skills/` tree for all 103 skills,
matching `SKILLS.lock` name for name, with every description inside Codex's
1024-char cap. The real Codex CLI was observed loading the earlier 102-skill tree
with zero parse errors; the current tree's live load is unverified (see Step 4).
The remaining integration work is operator-supplied MCP server config and the
owner's live smoke test.
