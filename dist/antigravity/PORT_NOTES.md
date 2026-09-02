# Antigravity port notes (spike)

Feasibility spike: porting the RampStack `claude-skills` catalog to a Google
Antigravity-compatible distribution via a repeatable build step.

## Catalog at a glance

- Source skill count: **102** (`find skills -name SKILL.md | wc -l`).
- Reference files: **488**, all Markdown, copied byte-for-byte.
- Structure is uniform: every `skills/<name>/` holds exactly `SKILL.md` plus a
  `references/` subtree. References nest at most one level deep (for example
  `references/by-vertical/`, `references/core-archetypes/`); the build copies the
  tree recursively so nesting is preserved.

## Frontmatter normalization

Every source `SKILL.md` carries the same five frontmatter keys:

| key | role | action |
| --- | --- | --- |
| `name` | skill identifier | kept (portable core) |
| `description` | trigger text Antigravity matches on | kept (portable core) |
| `category` | RampStack catalog grouping | moved to sidecar |
| `catalog_summary` | RampStack catalog one-liner | moved to sidecar |
| `display_order` | RampStack catalog sort order | moved to sidecar |

Antigravity discovers a skill from its `---` frontmatter block by matching the
`description`. It does not use the three RampStack presentation keys. Rather than
drop them, the build moves them into a per-skill sidecar at
`references/_claude-frontmatter-extras.yaml` so the port is lossless and fully
reversible. Each emitted `SKILL.md` is left with exactly `name` and
`description`, and the body below the frontmatter is preserved byte-for-byte
(verified across all 102 skills).

`description` values appear in the source both as bare scalars and as
double-quoted strings; the hand parser strips one layer of surrounding quotes
and re-emits with defensive quoting only when the value contains characters a
naive YAML reader could trip on.

## Taxonomy classification: Skills vs Rules vs Workflows

Antigravity splits agent knowledge into three buckets:

- **Skills**: on-demand procedural knowledge in `.agents/skills/`, surfaced by
  description match.
- **Rules**: always-on guardrails injected into every turn.
- **Workflows**: slash-triggered macros.

All **102** catalog entries are on-demand procedural knowledge with
trigger-rich descriptions ("Use this skill whenever..."). Every one maps cleanly
to an Antigravity **Skill**. No entry is authored as an always-on guardrail or a
fixed slash macro, so the port emits **0 Rules** and **0 Workflows**.

Candidates one could promote to Rules later: `design-standards`,
`security-baseline`, and `vertical-site-conventions` read like standing
guardrails a team might want always-on. They are deliberately left as Skills
here. Promoting them changes runtime semantics (always-on injection rather than
on-demand load), which is a product decision, not a mechanical transform, and
would make the spike less cleanly reversible. `seo-audit-orchestration`
orchestrates other skills but is itself invoked on-demand, so it stays a Skill
rather than becoming a Workflow.

## What maps cleanly

- One source skill becomes one `.agents/skills/<name>/` folder.
- Frontmatter reduces to the two fields Antigravity needs, always present and
  non-empty.
- The `references/` subtree, including nested folders, copies verbatim.
- The SKILL.md body and section structure are untouched.

## Known caveats

- The frontmatter parser is intentionally minimal: flat `key: value` scalars
  only. It is sufficient for this catalog (confirmed uniform) but would need
  extension for nested maps, block lists, or folded/multi-line scalars.
- Sidecars live under `references/`, so they travel with the skill and are
  visible to the agent as reference material. They are not read by Antigravity
  for discovery; they exist to keep the RampStack metadata recoverable.
- This is a one-way build (source to dist). There is no reverse step; the
  sidecars make a manual round-trip possible but that is not automated here.
- Skill behavior under Antigravity's runtime was not tested end-to-end; the
  spike validates structural compatibility (discovery shape, frontmatter,
  reference integrity), not live invocation.

## Phase 2: verification and hardening

Phase 1 produced the build and the dist. Phase 2 hardens the build and verifies
discovery so PR #87 can come out of draft. Summary of what was added and found.

### 1. Build idempotency and drift guard

`scripts/build-antigravity.mjs` now:

- Builds into a parameterized output root, so it can build into temp dirs for
  self-checks without touching the committed tree.
- After a normal build, runs a **determinism self-test**: it builds twice into
  separate temp dirs and asserts the two `.agents/skills` trees are
  byte-identical. Result: **PASS**.
- Accepts a **`--check`** flag: it rebuilds into a temp dir and diffs against the
  committed `dist/antigravity/.agents/skills`, exiting nonzero and listing any
  differing paths. This is a staleness guard against `skills/` drift. Result on
  the committed tree: **PASS**. Verified the guard fails loudly by mutating an
  emitted file and confirming a nonzero exit naming that path.

Run them with `node scripts/build-antigravity.mjs` (build + determinism) and
`node scripts/build-antigravity.mjs --check` (drift guard).

### 2. Description-discrimination audit (heuristic)

`node scripts/build-antigravity.mjs --audit` writes
`SKILL_DISCOVERY_AUDIT.md`. It is the closest automated proxy to runtime
triggering and is **heuristic, not a runtime test** (labeled throughout). It
token-overlap scores a fixture of 8 prompts against all 102 descriptions and
lints the descriptions. Findings:

- Expected skill in the top 3 for **8/8** fixture prompts; ranked #1 for **6/8**.
  The two #2 cases (`brand-archetype-system`, `onboarding-wizard-design`) lose to
  near-neighbor skills that share vocabulary (`creative-brief-selector`,
  `multi-step-form-design`); flagged as low-confidence for the owner to spot
  check live.
- Lint: no descriptions under 40 chars, no duplicate descriptions, no duplicate
  first sentences. Three descriptions lack an explicit "use/trigger" cue
  (`experiment-design`, `experimentation-analytics`, `feature-flagging`); not
  necessarily defects (`feature-flagging` still ranked #1 for its prompt), noted
  for review.

### 3. Rules candidates (documented, not converted)

`RULES_CANDIDATES.md` covers `design-standards`, `security-baseline`, and
`vertical-site-conventions`: why each is a plausible always-on Rule and a sketch
of what a thin companion Rule would contain. They remain Skills in the dist. No
conversion was done; the file is a v2 option for the owner.

### 4. Real discovery check (best effort, partial)

Antigravity is a Google IDE product with no installable CLI in this environment,
so a true runtime trigger test was not possible. As a directory-contract proxy I
used the Pi CLI (`@mariozechner/pi-coding-agent`, v0.73.1), which implements the
same `.agents/skills/` discovery contract:

- Pi installed via `npx` and **accepted the contract**: pointed at the emitted
  tree with `--skill .agents/skills`, it loaded the full 102-skill set at startup
  with no crash and proceeded to the model step, failing only on the absent model
  API key (expected in this sandbox), which is downstream of skill loading.
- However, Pi is **not** an independent frontmatter validator here: it exposes no
  credential-free "list discovered skills" mode, the sandbox has no model API
  key, and its loader is tolerant and silent (a deliberately malformed control
  skill produced the same behavior as a valid one). So the clean run shows the
  tree does not break the loader, but does not by itself prove parse-correctness.

Authoritative parse validation therefore remains the build's own checks (all 102
emitted `SKILL.md` asserted to have valid `---` delimiters and non-empty
`name`/`description` in phase 1) plus the new `--check` drift guard. The live
runtime trigger test stays the owner's smoke test below.

### Manual smoke-test recipe for the owner

The one remaining gate before merge. In Antigravity:

1. Install the dist into a test workspace: `cp -r dist/antigravity/.agents <target-project>/`.
2. Open that project in Antigravity so it picks up `.agents/skills/`.
3. Confirm two or three skills surface on description match. Suggested prompts:
   - "write a creative brief" should pull **`creative-brief`**.
   - "optimize the on-page SEO of this page" should pull **`seo-onpage`**.
   - "run a WCAG accessibility audit" should pull **`accessibility-audit`**.
4. Confirm the loaded skill can read its `references/` files, and that no skill
   throws a parse or load error on open.

If those surface as expected, the distribution is good to merge.

## Feasibility

Mechanically straightforward and low-risk: the catalog is uniform, the
transform is a frontmatter trim plus a recursive copy, and all structural
validation passes. Phase 2 adds determinism, a drift guard, and a heuristic
discovery audit, all green. The only unverified dimension is live runtime
triggering in Antigravity itself, which is the owner's manual smoke test.
