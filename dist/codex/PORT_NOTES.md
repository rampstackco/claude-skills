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

Scope: **`creative-brief` load observed on the 103-skill tree on 2026-09-07; that
run's second-skill check is inconclusive, and the contamination that made it
inconclusive is a session defect, not a distribution defect. The owner smoke
test of 2026-09-14/15 (below) records both `creative-brief` and `seo-onpage`
LOADED in the desktop app, by derivation.** The original 102-skill result is kept
below as history. Read the dates before citing any of them.

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

### Live smoke test on the 103-skill tree (2026-09-07)

Run against this PR's head `ea99f11`, with the required checks green on that
head. Four calls, sequential, `-s read-only`, `RUST_LOG=info`, the emitted
`.agents/` extracted into an OS-temp workspace with control and treatment roots
kept separate. Model `gpt-5.4-mini` requested explicitly on every call.

**Execution identity: `codex-cli 0.118.0`.** An earlier sandbox-only observation
of `0.153.4` was not the run binary, so nothing here attests to 0.153.4.

| Call | Prompt | Verdict |
| --- | --- | --- |
| 1 | write a creative brief for a new marketing site (no `.agents`) | Not loaded, control. Generic brief, no tool reads. |
| 2 | same prompt, `.agents` present | **Loaded.** Reads `treatment/.agents/skills/creative-brief/SKILL.md` in full, then follows the skill's missing-input workflow. |
| 3 | "Use the creative-brief skill to ..." | **Loaded.** Explicit skill announcement, reads `creative-brief/SKILL.md` in full, then the same intake workflow. |
| 4 | on-page SEO audit prompt | **Inconclusive, contaminated.** Announces `seo-onpage` but never reads its `SKILL.md`. |

What this establishes: `creative-brief` loads live from the 103-skill tree. The
proof is the file read, not the prose. The control invented a generic brief and
performed no reads; the treatment opened the actual skill file and then asked for
the missing project details the skill requires.

Note the discriminator that did **not** fire. The ten-section framework was never
emitted, because the skill mandates an intake pass on an underspecified request
and the model correctly did that instead. So the anticipated
control-versus-treatment framework comparison was not observed. The full file
read carries the finding on its own; do not cite a framework match that did not
happen.

Why call 4 proves nothing either way: a Node MCP server inherited from the Codex
app session retained `F:/rampstack-codex-deploy` as its cwd, outside `--cd`. It
read lane dispatch and registration files, and its own live transcript, none of
which the workspace isolation could reach. The call's final answer correctly
noted no page source was supplied, but that is not skill loading. **This is a
session defect in the instrument, not a defect in the distribution:** ancestor
isolation constrains the walk-up, and it did not and could not constrain an
inherited MCP server. Repair belongs to the instrument, in a separately
registered fresh run, not to `dist/codex`. No reserve call was spent and the run
was not repaired in place.

Validity limits, stated rather than buried. CLI response-event telemetry reports
model and slug `gpt-5.4-mini`, but the backend-served identity is not
independently attested by the retained surface, so strict identity validation is
false. Every observation above is therefore **qualitative**: a load did or did
not happen. No performance, quality, or lift claim is made or supportable from
this run. Cache messages are not load evidence. No `invalid description` cap
failure was observed, consistent with gating check E.

Two different gates, easily conflated. The gate this PR has waited on since June
is a **live load**: does a skill from this distribution actually load in a real
Codex session. Calls 2 and 3 answer that, and the answer is yes. The gate the
recon report records as **unresolved** is the **scored-run** gate for Plan B
Step 2, which needs attested model identity and an uncontaminated session before
any lift number can be claimed. This run clears the first and not the second, so
nothing here should be read as a scored or comparative result.

Evidence: `recon/planb-step1-smoke-test-2026-09-07.md` in the Codex lane, with
raw JSONL, `RUST_LOG` stderr, exit statuses, tree hashes and verbatim usage
envelopes in the adjacent `planb-smoke-20260907-evidence/`. Evidence commit
`04b65b3` (`04b65b3e0f8e450b5d28492b250bcd59364f896b`), preserved in
`evidence.bundle`. The commit was made after the calls, not before, so it is a
preservation signature and not a pre-call one; the registration itself did exist
before call 1.

Anyone re-running this should pass an explicit model the account supports, since
the default `gpt-5.3-codex` errors out on a ChatGPT account before the turn does
any work, and should disable or align inherited MCP access first.

### Owner smoke test (2026-09-14/15, gate record)

Scope: **qualitative. Discovery fired 3 of 3 in the terminal; `creative-brief`
and `seo-onpage` both LOADED in the desktop app, by derivation from output
structure.** Served model identity is not independently attested. No
performance, quality, or lift claim.

Terminal phase (2026-09-14). `codex exec` with `codex-cli 0.154.0-alpha.6.2` run
by full path, an isolated `CODEX_HOME`, and the 103-skill tree from head
`016b435` as the only content of the treatment workspace. No `-m`; the CLI
reported `gpt-6-astra`.

- **Discovery fired 3 of 3.** The creative-brief prompt, an implicit on-page SEO
  prompt, and a named one each selected the intended skill and attempted to read
  its local `SKILL.md`.
- **Local reads were blocked.** The app runtime's exec policy rejected every
  shell read (`blocked by policy`). Requesting `-s workspace-write`, and later
  marking the workspace trusted, still produced an effective read-only sandbox
  and the same rejection. This is a test-environment limit, not a distribution
  defect, and it means the load gate cannot close under `codex exec` here.
- Connector and plugin calls: 0 in every run, counted from the log's tool-result
  records.
- After the blocked read, both SEO runs fetched the public `main` skill from
  GitHub with the built-in web tool. Those reads do not attest a local load.

App phase (2026-09-15). The Codex desktop app, project rooted at the treatment
workspace, account default model.

| Skill | Artifact at the skill-specified path | Structural match |
| --- | --- | --- |
| `creative-brief` | `creative-brief.md`, project root | Ten sections by name and order, 10 of 10; 1408 words, under the skill's 1500 cap |
| `seo-onpage` | `seo-audit-skills.md` (`seo-audit-[page-slug].md`), project root | Eight dimensions by name and order, 8 of 8; the six output sections in order; 1169 words |

Before auditing, `seo-onpage` asked for the primary target query, as its
workflow step 1 requires; the artifact records "Target query: Claude skills
(confirmed by client)". `creative-brief` did not run an intake pass: the brief
declares its details invented for a demo, so the skill's elicitation behavior is
not evidenced.

Both verdicts are derivation, not transcript: no `SKILL.md` read line backs them.
Skill bodies here are byte-identical to the public source, so structure alone
cannot separate a local load from a remote copy of the same text. This closes the
live-load gate for the second skill that the 2026-09-07 run left inconclusive. It
does not close the scored-run gate.

Evidence, cited and not copied into this repo:
`F:\rampstack-codex-deploy\smoke\owner-smoke-test-2026-09-14.md` (terminal runs,
isolation, TLS, budget log lines, and the "App phase 2026-09-15" section with
the structural comparison), and the two artifacts,
`F:\codex-smoke\ws\creative-brief.md` and `F:\codex-smoke\ws\seo-audit-skills.md`.

### Manual smoke test (owner, authoritative)

The automated checks are necessary but not sufficient. The live-load gate is a
smoke test by the owner, last run 2026-09-14/15 (gate record above). A repeat
follows the recipe below.

**Pre-flight: six checks, each earned by a gate tripping.**

1. **A separate `CODEX_HOME`.** Point `CODEX_HOME` at a fresh directory for the
   test. Auth is per home, so sign in again and let that home hold its own
   `auth.json`.
2. **`codex mcp list` is empty, and the log proves zero calls.** The empty list
   is necessary, not sufficient: connectors and plugins injected by the app
   runtime are not listed. After each run, count connector and plugin tool calls
   in the log and require zero. (The 2026-09-07 second-skill check was lost to
   an inherited MCP server.)
3. **No `AGENTS.md` or `.codex/config.toml` in any workspace ancestor.** Walk
   from the workspace itself up to the drive root, and refuse to run if either
   file exists anywhere on that path.
4. **The binary by full path, from a non-elevated shell.** Two Codex binaries can
   coexist, and an elevated shell resolves `codex` differently. Take
   `--version` from the same full path you run.
5. **TLS trust for the run binary on intercepting hosts.** Where antivirus or a
   proxy intercepts TLS, set `SSL_CERT_FILE` to a PEM holding the intercepting
   root, and confirm the log reports the custom CA bundle loaded. Never disable
   verification.
6. **Terminal runs test discovery; the app closes the load gate.** Under
   `codex exec`, expect the app runtime's exec policy to block shell reads of
   `SKILL.md` regardless of the sandbox flag or project trust. A selected skill
   plus an attempted read is discovery, not a load.

**Steps.**

1. Copy the distribution into a scratch Codex workspace **outside this repo**, so
   the walk-up scan cannot reach the repo's own `.agents`:
   `cp -r dist/codex/.agents <scratch-project>/`
2. For discovery, run `codex exec --cd <scratch-project> --skip-git-repo-check
   -s read-only` by full path. For the load gate, open `<scratch-project>` as a
   project in the Codex desktop app. If you pass `-m`, use a model your account
   supports (on 0.118.0 the default `gpt-5.3-codex` failed on a ChatGPT account
   before the turn did any work).
3. Give it a prompt that should trigger a specific skill, for example:
   "write a creative brief for a new marketing site".
4. Confirm `creative-brief` loaded: a `SKILL.md` read line in the log, or output
   that matches the skill's ten sections and is written to `creative-brief.md` in
   the project root. Repeat with an on-page SEO prompt (expect `seo-onpage`, the
   eight dimensions, `seo-audit-[page-slug].md`) and a brand-archetype prompt
   (expect `brand-archetype-system`).
5. If a skill needs an MCP (for example the SEO suite needs Ahrefs), wire the
   server from `dist/codex/agents/openai.yaml` first.

A step-by-step dispatch version of this recipe, including what "the skill loaded"
looks like in a transcript and how to tell loading apart from the model merely
writing something plausible, is kept with the deploy tooling rather than in this
generated tree.

Note: Codex also discovers skills from `~/.codex/skills/` (the `$CODEX_HOME/skills`
directory), in addition to scanning `.agents/skills/` from cwd up to the repo
root. To install globally instead of per-project, copy the skill folders there.

## Skills description budget (measured)

Codex renders the available-skills catalog into a budget,
`[skills] max_context_tokens`, and shortens descriptions to fit it. Measured in
the 2026-09-14 runs (`codex-cli 0.154.0-alpha.6.2`, log field `budget_limit`):

- **Default: 5440.** Every run logged `budget_limit=5440`; the setting was not
  changed.
- **Every description is cut to roughly 535 characters at 108 to 110 installed
  skills.** With 108 skills visible, descriptions were cut to 537 characters and
  107 of 108 were shortened. With 110 visible, 534 characters and 109 of 110.
  The runtime, not this tree, supplied the skills beyond this distribution's 103.
- **The back half is invisible at the default.** At head `016b435`, 88 of this
  distribution's 103 descriptions are longer than 537 characters (median 686,
  longest 976). The front survives: what the skill does and its trigger list.
  The yield clauses that send a request to a sibling skill sit after that. For
  example, `art-direction`'s "Use `creative-direction` instead" starts at
  character 613 of 704.
- **Documented cap: 10,000.** OpenAI's Codex configuration reference caps
  explicit values at 10,000 tokens (its default is 2% of the model context
  window). At the cap the room roughly doubles, but the logged math is not linear
  enough to promise full descriptions.
- **Tested value: none yet.** No run has changed the setting, and support for
  the key in this alpha binary has not been validated by changing it.

Install guidance. The reliable path is a subset: install only the skills a
project needs (a subset repo), so fewer descriptions share the budget. The
secondary lever is raising the budget in `config.toml`, untested as stated above:

```toml
[skills]
max_context_tokens = 10000
```

## Filed follow-ups

- **A Codex description tier in `scripts/build-codex.mjs`.** Emit a Codex
  description sized for the runtime budget, through the existing
  sentence-boundary truncation path, so the build chooses what survives instead
  of the runtime's cut. The full description stays in the sidecar, as it does
  for the cap today. Recorded here only; no issue is open.

## Feasibility

The port is mechanically straightforward and low risk: a dependency-free,
reversible transform produces a clean `.agents/skills/` tree for all 103 skills,
matching `SKILLS.lock` name for name, with every description inside Codex's
1024-char cap. The real Codex CLI was observed loading the earlier 102-skill tree
with zero parse errors, and on 2026-09-07 `creative-brief` was observed loading
live from the current 103-skill tree at head `ea99f11` (Step 4). The owner smoke
test of 2026-09-14/15 closed the second-skill check the 2026-09-07 run left
open: discovery fired 3 of 3 in the terminal, and `creative-brief` and
`seo-onpage` both loaded in the desktop app, by derivation from output
structure. Scored claims remain gated on a clean, identity-attested run. The
remaining integration work is operator-supplied MCP server config and the
runtime description budget: install a subset, or raise `max_context_tokens`.
