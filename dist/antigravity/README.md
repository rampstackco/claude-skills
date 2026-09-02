# RampStack skills for Google Antigravity

This is an Antigravity-compatible distribution of the RampStack `claude-skills`
catalog, produced by `scripts/build-antigravity.mjs`. It is a generated
artifact; edit the source under `skills/` and rerun the build, do not edit files
here by hand.

## What this is

- 102 skills under `.agents/skills/<name>/`, one folder per source skill.
- Each skill is a `SKILL.md` with a minimal `---` frontmatter block (`name` and
  `description` only) plus its original body and `references/` subtree.
- RampStack catalog metadata (`category`, `catalog_summary`, `display_order`)
  that Antigravity does not use is preserved per skill in
  `references/_claude-frontmatter-extras.yaml`.

## How Antigravity uses it

Antigravity discovers skills on-demand from `.agents/skills/`. It reads each
skill's `SKILL.md` frontmatter and loads a skill into context when the
`description` field matches what the agent is doing. There is no manifest to
register and no always-on cost; a skill stays dormant until its description is
relevant.

## Install

Copy the `.agents` tree into the root of your target project:

```
cp -r dist/antigravity/.agents <target-project>/
```

Antigravity picks up `.agents/skills/` automatically from the project root.

## Rebuild

```
node scripts/build-antigravity.mjs
```

The build is dependency-free (Node built-ins only) and idempotent: it clears and
regenerates `.agents/skills/` on each run.

See `PORT_NOTES.md` for the frontmatter normalization details, the Skills vs
Rules vs Workflows classification, and known caveats.
