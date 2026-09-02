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

## Feasibility

The port is mechanically straightforward and low risk: a dependency-free,
reversible transform produces a clean `.agents/skills/` tree for all 102 skills,
with the only real integration work being operator-supplied MCP server config.
