# Pi port notes

Spike: a Pi-compatible distribution of the RampStack skills catalog, produced
by a repeatable, dependency-free build (`scripts/build-pi.mjs`). Do not merge.

## Count

- Source skills (`skills/*/SKILL.md`): 102
- Emitted skills (`dist/pi/.agents/skills/*/SKILL.md`): 102
- Reference files preserved: 488

Note on the count: this dist was first built on a stale 99-skill base after a
disk-full event left a `git reset --hard origin/main` un-applied. It has since
been rebased onto the corrected `main` (PR #90), which is 102 skills with all
descriptions shortened under the 1024-char cap. The build now emits exactly 102
skills, including `creative-brief-selector`, and validation asserts emitted
count equals source count.

## Key decision: preserve native frontmatter (no sidecar)

This is the one substantive difference from the Codex and Antigravity dists.

- Codex and Antigravity trim each skill's frontmatter down to `name` and
  `description`, and move the remaining keys (`category`, `catalog_summary`,
  `display_order`) into a `references/_claude-frontmatter-extras.yaml` sidecar
  so the port stays lossless and reversible. They do this because those agents
  validate frontmatter against a fixed key set and reject or warn on unknown
  keys.
- Pi does not. Pi's frontmatter type is `{ name?, description?,
  "disable-model-invocation"?, [key: string]: unknown }`. Arbitrary keys are
  accepted and ignored. So the correct, simplest, and most faithful port is to
  copy each `SKILL.md` byte-for-byte with its native frontmatter intact. No
  trimming, no sidecar, no transformation.

Consequences:
- The build is a pure byte-for-byte directory copy. Building twice yields
  byte-identical output. `--check` rebuilds to a temp dir and diffs against the
  committed tree, exiting nonzero and listing any differing paths (staleness
  guard).
- `category`, `catalog_summary`, and `display_order` remain visible in every
  emitted `SKILL.md` exactly as authored. Pi ignores them; they cost nothing and
  keep the dist a faithful mirror of source.

## Validation results

Run `node scripts/build-pi.mjs --validate`:

- PASS: every emitted SKILL.md has valid `---` frontmatter
- PASS: every emitted SKILL.md has non-empty `name` and `description`
- PASS: every name conforms to Pi rules (lowercase a-z / 0-9 / hyphen, max 64
  chars, no consecutive hyphens)
- PASS: every description is <= 1024 chars
- PASS: emitted skill count equals source (102)
- PASS: every source references file has an emitted counterpart (488)

No warnings. An earlier build on the stale 99-skill base reported three
descriptions over 1024 chars (`creative-direction`, `integration-orchestrator`,
`logo-design`). Those were shortened at source in PR #90, so the over-length
warning is now gone. Pi would have loaded those skills anyway (an over-length
description is a non-fatal warning; only a missing description prevents
loading), but the source fix removes the warning entirely.

## Live discovery check

Pi CLI is installable, so this was exercised for real, not skipped.

- Installed `@mariozechner/pi-coding-agent` (v0.73.1) locally into a throwaway
  directory outside the repo (so no `node_modules` or lockfile lands in the
  lane).
- Called Pi's own loader, `loadSkillsFromDir({ dir, source })`, against
  `dist/pi/.agents/skills/`.

Results (on the corrected 102-skill base):
- 102 skills discovered (matches emitted count).
- 0 diagnostics. The three description-length warnings seen on the earlier
  99-skill base are gone now that PR #90 shortened those descriptions.
- `creative-brief` loaded cleanly (description length 701,
  `disableModelInvocation: false`, filePath resolved).
- `formatSkillsForPrompt(skills)` rendered all 102 skills into a system-prompt
  block (about 92k chars) with no errors thrown.

Conclusion: Pi discovers and parses the entire emitted catalog with zero parse
errors and zero warnings.

Manual repro (if installing fresh):

```
mkdir pi-cli-test && cd pi-cli-test
npm init -y && npm i @mariozechner/pi-coding-agent
# then, from a script that imports the package:
#   import { loadSkillsFromDir } from '@mariozechner/pi-coding-agent';
#   loadSkillsFromDir({ dir: '<repo>/dist/pi/.agents/skills', source: 'check' });
# or, to exercise the CLI interactively after configuring a provider:
cd <repo>/dist/pi && pi   # ancestor discovery finds .agents/skills, then /skill:creative-brief
```

## Future options (NOT applied here)

These are deliberately out of scope for this spike. Listed for whoever takes
the port forward.

(a) Publishable Pi package wrapper. Pi can load skills from a `skills/`
    directory or a `pi.skills` entry in a package's `package.json`, distributed
    over npm or git. A thin wrapper package that points `pi.skills` at this
    catalog would let users `pi install <source>` instead of copying `.agents`
    by hand. Not applied: the spike's goal is a copy-in distribution, and a
    published package is a separate release decision.

(b) Explicit-only orchestration skills. Pi supports a frontmatter key
    `disable-model-invocation: true` (the practical equivalent of a "hidden"
    skill). A skill with this set is excluded from the always-in-context
    descriptions and can only be invoked explicitly via `/skill:<name>`. This
    would be a good fit for noisy orchestration skills (for example
    `seo-audit-orchestration`) so they do not crowd the model's skill list and
    are only run on purpose. Not applied: it changes runtime behavior and would
    edit source frontmatter, which is outside this preserve-native build.

## Running Pi on alternative models

Pi is model-agnostic through its `pi-ai` provider layer, so the same skills run
unchanged on any supported provider. To run Pi on Kimi K2.6, point Pi at
Moonshot's API (platform.moonshot.ai) as a provider; Moonshot exposes both an
OpenAI-compatible and an Anthropic-compatible endpoint. Recommended sampling
temperature for K2.6 is 0.6. Important: Moonshot's Anthropic-compatible endpoint
already scales the incoming temperature by 0.6 internally, so do not apply the
0.6 a second time when using that endpoint (doing so would effectively send
0.36). This is provider/model configuration only; it is not a skills change and
nothing in this distribution depends on it.
