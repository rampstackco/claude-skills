<div align="center">

<img src="docs/rampstack-complete-banner.jpg" alt="Complete Claude Skills for the full web lifecycle. Build, ship, audit, optimize." />

# Brand Build Skills for Claude

**A complete, opinionated library of [Claude Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) covering the full lifecycle of building, launching, running, and growing a brand and a website.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Skills](https://img.shields.io/badge/Skills-60-blue.svg)](#the-60-skill-catalog)
[![Made for Claude](https://img.shields.io/badge/Made%20for-Claude-orange.svg)](https://claude.ai)

[![Website](https://img.shields.io/badge/rampstack.co-FF6B35?style=for-the-badge&logo=googlechrome&logoColor=white)](https://rampstack.co)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/company/rampstack/)
[![X](https://img.shields.io/badge/Follow-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/RampStackco)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/rampstack)

</div>

> 60 stack-agnostic skills covering brand, design, content, SEO, dev, ops, growth, and research. Includes an Ahrefs MCP-powered SEO audit suite. Use them on Next.js, WordPress, Shopify, Webflow, plain HTML, or anything else.

*Featured in [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) under Business & Marketing.*

---

## Table of contents

- [What are Claude Skills?](#what-are-claude-skills)
- [What is in this library](#what-is-in-this-library)
- [See it in action](#see-it-in-action)
- [Getting started](#getting-started)
- [Quick example](#quick-example)
- [How they compose](#how-they-compose)
- [The 60-skill catalog](#the-60-skill-catalog)
- [Recommended MCPs](#recommended-mcps)
- [Authoring conventions](#authoring-conventions)
- [Repository structure](#repository-structure)
- [Contributing](#contributing)
- [Resources](#resources)
- [License](#license)

---

## What are Claude Skills?

Claude Skills are reusable capability packages that teach Claude how to handle a specific kind of task with a consistent framework, vocabulary, and output format. Each skill is a folder containing a `SKILL.md` (instructions plus YAML metadata) and optional reference files (templates, checklists, worked examples). Claude loads a skill automatically when a user request matches the skill's description.

Skills work across [Claude.ai](https://claude.ai), [Claude Code](https://docs.claude.com/en/docs/claude-code/overview), and the [Anthropic API](https://docs.claude.com/en/api/agent-skills). Once you write a skill, it is portable across all three.

For the official deep dive, see [Anthropic's Agent Skills documentation](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview).

---

## What is in this library

This is not a curated list of other people's skills. It is a single, opinionated library where every skill follows the same structure and conventions, so the skills compose cleanly across a real project lifecycle.

What you get:

- **60 skills** across 14 categories, every one with a complete `SKILL.md` and at least one reference file
- **98 reference files** (templates, checklists, decision matrices, worked examples)
- **Stack-agnostic.** Works on any web stack. The only named-tool exception is the SEO audit suite, which assumes the Ahrefs MCP.
- **Future-proof.** Principles over tools. Stable concepts over trending techniques. References to durable specs (W3C, WHATWG, Schema.org, MDN, NN/g, WCAG) over content that ages with each algorithm update.
- **Uniform structure.** Every skill uses the same section order, the same tone, and the same authoring conventions. Predictable in, predictable out.
- **Composable.** Skills reference each other. `creative-brief` points to `brand-voice`. `incident-response` points to `monitoring-and-alerting`. Each skill's "When NOT to use" tells you which sibling fits your adjacent work.

Highlight categories: brand strategy, design systems, content production, full SEO suite, frontend dev, accessibility, performance, QA, launch and incident ops, growth and CRO, UX research, plus a meta-skill that teaches you to write your own.

---

## See it in action

**[The creative-direction skill rendered as a live showcase →](https://rampstack.co/showcase/creative-direction)**

Thirty fictional brands generated from briefs that all use the same skill. Each is a fully styled brand site, not a mockup. The showcase demonstrates what the four-axis framework produces in practice and lets you filter by axis position to see how each combination renders.

<p align="center">
  <img src="assets/showcase/showcase-grid-hero.png" alt="Showcase grid of brand archetypes including Pulse, Volt, Anode, Drift, and others, with type and motion intensity filter pills above the cards." />
</p>

### Filter by any axis position

The skill defines four axes: tone, aesthetic, relationship, sensory. The showcase lets you filter by any combination and see which examples match. Pre-filtered URLs deep-link from the [SKILL.md](skills/creative-direction/SKILL.md) and [axes-explained reference](skills/creative-direction/references/axes-explained.md), so you can read about a position and click straight through to the rendered examples.

<p align="center">
  <img src="assets/showcase/showcase-filter-active.png" alt="Showcase grid filtered by Tone equals Provocative and Sensory equals Resonant, showing eight matching brand cards with the axis disclosure auto-expanded." />
</p>

### The empty state is the lesson

The framework is generative. The showcase is illustrative. Most rare-but-powerful combinations are valid creative choices that simply have not been built yet. Set Provocative + Editorial Restrained + Coach + Resonant and the grid is empty.

<p align="center">
  <img src="assets/showcase/showcase-empty-state.png" alt="Showcase grid with all four axis filters set to Provocative, Editorial Restrained, Coach, and Resonant, showing zero matching examples and the empty state copy: No example yet. The framework allows this combination, it just hasn't been built as one of the thirty worked examples." />
</p>

### The framework's range

Same skill, same brief format. Four completely different visual systems. Notice that Pulse and Bloom share identical axis positions yet read as opposite visual languages. The reference brands and aesthetic interpretation do the rest.

<table>
  <tr>
    <td width="50%"><img src="assets/showcase/archetype-pulse.png" alt="Pulse music streaming brand. Saturated gradient hero with the headline 'Sound that moves with you' and pink-to-cyan equalizer bars below." /></td>
    <td width="50%"><img src="assets/showcase/archetype-forge-fitness.png" alt="Forge boutique fitness studio. Dark industrial hero with intense typography and motivational copy." /></td>
  </tr>
  <tr>
    <td><strong>Pulse</strong> · music streaming<br/><em>Sound that moves with you.</em><br/>Playful / Expressive Maximalist / Companion / Resonant</td>
    <td><strong>Forge</strong> · boutique fitness<br/><em>Show up. Get hammered.</em><br/>Provocative / Expressive Maximalist / Coach / Resonant</td>
  </tr>
  <tr>
    <td><img src="assets/showcase/archetype-bloom-soda.png" alt="Bloom adaptogenic soda brand. Peachy gradient hero with tri-color headline 'Soda that loves you back' and a strawberries-around-soda-can product photo." /></td>
    <td><img src="assets/showcase/archetype-observatory-editorial.png" alt="Observatory Editorial. Cream paper hero with restrained serif headline 'An observability tool for the engineers who already know what they are doing'." /></td>
  </tr>
  <tr>
    <td><strong>Bloom</strong> · adaptogenic soda<br/><em>Soda that loves you back.</em><br/>Playful / Expressive Maximalist / Companion / Resonant</td>
    <td><strong>Observatory Editorial</strong> · observability tool<br/><em>An open-source tool that respects engineer time.</em><br/>Conversational / Editorial Restrained / Peer / Considered</td>
  </tr>
</table>

### Run this on your own brand

The creative-direction skill lives at [`skills/creative-direction/`](skills/creative-direction/). Install it (see below), give Claude a project name and a few inspiration references, and the skill walks you through producing a brief that downstream skills can consume. The brand sites in the showcase were built from briefs of exactly that shape.

---

## Getting started

Skills install in three different places depending on where you use Claude. Pick the platform that matches your workflow.

### Option 1: Claude.ai (web and desktop)

If your Claude.ai plan supports custom Skills:

1. Go to **Settings → Capabilities → Skills**.
2. Upload the skill folder you want as a `.zip` (one zip per skill folder containing `SKILL.md` and the `references/` subfolder).
3. Enable the skill in the chat interface.

Claude will load the skill automatically when your request matches its description.

For current plan availability and the exact upload UI, see [Anthropic's Skills user guide](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview).

### Option 2: Claude Code (recommended)

Skills are first-class citizens in Claude Code. Drop them into your skills directory and Claude Code picks them up automatically.

**User-level skills** (available in every project):

```bash
# macOS / Linux
mkdir -p ~/.claude/skills
cp -r skills/* ~/.claude/skills/

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "$HOME\.claude\skills"
Copy-Item -Recurse skills\* "$HOME\.claude\skills\"
```

**Project-level skills** (available only in a specific project):

```bash
mkdir -p .claude/skills
cp -r path/to/this-repo/skills/* .claude/skills/
```

Start (or restart) Claude Code. Skills load automatically.

For exact current paths and config flags, see the [Claude Code documentation](https://docs.claude.com/en/docs/claude-code/overview).

### Option 3: Anthropic API

Use Skills programmatically by referencing them in your API calls. Skills must first be uploaded to your workspace (via the Console or API), then referenced by ID when creating messages.

For the current API surface, request format, and limits, see the [Agent Skills API documentation](https://docs.claude.com/en/api/agent-skills).

### Want only a few skills?

You do not have to install all 60. Pick the categories that match your work. The library is modular: each skill stands on its own.

---

## Quick example

Once installed, skills trigger automatically based on your request. You do not have to name the skill or change how you talk to Claude.

**You ask:**

> "Our organic traffic dropped 30% last week. Help me figure out why."

**What happens:**

Claude recognizes the request matches `seo-traffic-diagnosis`, loads the skill, and walks through its 5-layer root cause framework: confirm the change is real → localize the change → page-level analysis → technical analysis → external analysis. By the end, you have a hypothesis statement, evidence, and an action plan, structured the same way every time.

**Other natural triggers:**

- "Help me write a creative brief" → `creative-brief`
- "Audit my homepage for SEO" → `seo-onpage`
- "We need a backlink audit" → `seo-backlink-audit`
- "Plan our content roadmap for Q3" → `seo-content-gap-audit` plus `content-strategy`
- "Postmortem template for last night's incident" → `after-action-report`
- "How do I write my own skill?" → `skill-creation-walkthrough`

You can also call a skill explicitly: "Use the `seo-audit-orchestration` skill to run a full audit on example.com."

---

## How they compose

The skills compose into a full project flow:

```
brand-discovery → brand-ideation → brand-identity → brand-style-guide → brand-voice
                                                                        ↓
creative-brief → information-architecture → content-strategy → design-system
                                                              ↓
seo-keyword → seo-content-audit → content-and-copy → landing-page-copy
                                                    ↓
seo-onpage → seo-technical → seo-aeo-geo → seo-offpage → seo-competitor
                                          ↓
frontend-component-build → accessibility-audit → performance-optimization
                                                ↓
code-review-web → qa-testing → security-baseline → launch-runbook
                                                  ↓
domain-strategy → monitoring-and-alerting → backup-and-disaster-recovery
                                          ↓
incident-response → after-action-report
                  ↓
analytics-strategy → cro-optimization → ux-research → usability-testing → journey-mapping
```

The SEO audit suite (Ahrefs MCP-powered) wraps around the SEO foundation skills:

```
seo-audit-orchestration
  ├── seo-site-health-audit
  ├── seo-backlink-audit
  ├── seo-keyword-gap-audit
  ├── seo-content-gap-audit
  ├── seo-traffic-diagnosis  (also runs standalone for incident-style work)
  └── seo-rank-tracking      (ongoing, feeds the others)
```

Operations, cross-cutting, and team skills (`stakeholder-communication`, `documentation-strategy`, `vendor-evaluation`, `team-onboarding-playbook`, `dependency-management`, `cost-optimization`, etc.) cut across the lifecycle.

You can also pull individual skills for one-off work. Need just a backlink audit? Use `seo-backlink-audit`. Need to write a creative brief? Use `creative-brief`. Each skill stands on its own.

---

## The 60-skill catalog

All 60 skills are shipped. Each has a complete SKILL.md plus at least one reference file (template, checklist, or playbook).

### Strategy and discovery (5)

| # | Skill | What it does |
|---|---|---|
| 1 | [`brand-discovery`](skills/brand-discovery/SKILL.md) | Audience research, competitive scan, positioning territory exploration |
| 2 | [`creative-brief`](skills/creative-brief/SKILL.md) | Project briefs that align stakeholders before work starts |
| 3 | [`creative-direction`](skills/creative-direction/SKILL.md) | Four-axis aesthetic brief (tone, aesthetic, audience, sensory ambition) for cross-skill coherence |
| 4 | [`information-architecture`](skills/information-architecture/SKILL.md) | Sitemap, navigation, URL structure, content types, taxonomy |
| 5 | [`content-strategy`](skills/content-strategy/SKILL.md) | Editorial strategy, content calendar, topical authority planning |

### Brand (4)

| # | Skill | What it does |
|---|---|---|
| 6 | [`brand-ideation`](skills/brand-ideation/SKILL.md) | Naming, positioning territories, mood directions, narrative angles |
| 7 | [`brand-identity`](skills/brand-identity/SKILL.md) | Logo system, color, typography, imagery, iconography, motion |
| 8 | [`brand-style-guide`](skills/brand-style-guide/SKILL.md) | The canonical reference document for the full brand system |
| 9 | [`brand-voice`](skills/brand-voice/SKILL.md) | Voice attributes, tone shifts, vocabulary, paired-example library |

### Design (3)

| # | Skill | What it does |
|---|---|---|
| 10 | [`design-system`](skills/design-system/SKILL.md) | Component library, design tokens, design system documentation |
| 11 | [`design-standards`](skills/design-standards/SKILL.md) | Production-grade page and component design standards |
| 12 | [`art-direction`](skills/art-direction/SKILL.md) | Photography, illustration, and visual direction for campaigns |

### Content (3)

| # | Skill | What it does |
|---|---|---|
| 13 | [`content-and-copy`](skills/content-and-copy/SKILL.md) | Website copy, blog content, content production frameworks |
| 14 | [`landing-page-copy`](skills/landing-page-copy/SKILL.md) | Landing pages, sales pages, hero-to-CTA flow |
| 15 | [`email-sequences`](skills/email-sequences/SKILL.md) | Onboarding flows, lifecycle campaigns, transactional copy |

### SEO foundation (7)

Tool-agnostic SEO skills. These define the conceptual frameworks. The SEO audit suite below adds the Ahrefs MCP-powered execution layer.

| # | Skill | What it does |
|---|---|---|
| 16 | [`seo-onpage`](skills/seo-onpage/SKILL.md) | Single-page audits and optimization across 8 dimensions |
| 17 | [`seo-technical`](skills/seo-technical/SKILL.md) | Crawlability, indexability, rendering, schema, page experience |
| 18 | [`seo-keyword`](skills/seo-keyword/SKILL.md) | Discovery, intent classification, clustering, prioritization |
| 19 | [`seo-competitor`](skills/seo-competitor/SKILL.md) | SERP overlap, content gaps, backlink gaps, technical comparison |
| 20 | [`seo-offpage`](skills/seo-offpage/SKILL.md) | Link building, digital PR, citations, linkable assets |
| 21 | [`seo-content-audit`](skills/seo-content-audit/SKILL.md) | Keep/update/merge/redirect/delete decisions across a site |
| 22 | [`seo-aeo-geo`](skills/seo-aeo-geo/SKILL.md) | AI search optimization, llms.txt, extraction-friendly content |

### SEO audit suite (Ahrefs MCP-powered) (7)

End-to-end SEO audit workflows that pull data from the Ahrefs MCP and produce concrete deliverables. These skills assume the Ahrefs MCP is connected.

| # | Skill | What it does |
|---|---|---|
| 23 | [`seo-audit-orchestration`](skills/seo-audit-orchestration/SKILL.md) | Master orchestrator: sequences the suite, produces a rollup report |
| 24 | [`seo-backlink-audit`](skills/seo-backlink-audit/SKILL.md) | Profile health, anchor mix, toxic links, reclamation, gap analysis |
| 25 | [`seo-keyword-gap-audit`](skills/seo-keyword-gap-audit/SKILL.md) | Competitor keyword gaps with opportunity scoring and clustering |
| 26 | [`seo-content-gap-audit`](skills/seo-content-gap-audit/SKILL.md) | Missing topics, thin coverage, outdated content, decay diagnosis |
| 27 | [`seo-traffic-diagnosis`](skills/seo-traffic-diagnosis/SKILL.md) | Diagnose drops, stalls, or wins via 5-layer root cause analysis |
| 28 | [`seo-site-health-audit`](skills/seo-site-health-audit/SKILL.md) | Triage Ahrefs Site Audit findings by SEO impact, not severity |
| 29 | [`seo-rank-tracking`](skills/seo-rank-tracking/SKILL.md) | Setup, baseline, segmentation, alerting, dashboarding |

### Product (2)

| # | Skill | What it does |
|---|---|---|
| 30 | [`pm-spec-writing`](skills/pm-spec-writing/SKILL.md) | PRDs, user stories, acceptance criteria, dev briefs |
| 31 | [`roadmap-planning`](skills/roadmap-planning/SKILL.md) | Quarterly planning, prioritization, dependency mapping |

### Development (4)

| # | Skill | What it does |
|---|---|---|
| 32 | [`code-review-web`](skills/code-review-web/SKILL.md) | PR review, build error diagnosis, security and quality checks |
| 33 | [`frontend-component-build`](skills/frontend-component-build/SKILL.md) | Component architecture, props design, accessibility from the start |
| 34 | [`accessibility-audit`](skills/accessibility-audit/SKILL.md) | WCAG compliance audit with remediation plan |
| 35 | [`performance-optimization`](skills/performance-optimization/SKILL.md) | Core Web Vitals, asset optimization, render performance |

### Quality assurance (1)

| # | Skill | What it does |
|---|---|---|
| 36 | [`qa-testing`](skills/qa-testing/SKILL.md) | Pre-launch QA, regression testing, cross-browser checks |

### Operations (9)

| # | Skill | What it does |
|---|---|---|
| 37 | [`launch-runbook`](skills/launch-runbook/SKILL.md) | Go-live runbook, DNS cutover, deploy day procedures |
| 38 | [`incident-response`](skills/incident-response/SKILL.md) | Incident triage, comms, mitigation, escalation |
| 39 | [`after-action-report`](skills/after-action-report/SKILL.md) | Post-mortems, retros, learnings documentation |
| 40 | [`domain-strategy`](skills/domain-strategy/SKILL.md) | DNS architecture, redirects, registrars, multi-domain portfolios |
| 41 | [`monitoring-and-alerting`](skills/monitoring-and-alerting/SKILL.md) | SLO design, uptime checks, alert routing, on-call rotations |
| 42 | [`backup-and-disaster-recovery`](skills/backup-and-disaster-recovery/SKILL.md) | RPO/RTO targets, backup strategy, restoration drills |
| 43 | [`security-baseline`](skills/security-baseline/SKILL.md) | HTTPS, security headers, CSP, secrets management, vulnerability scans |
| 44 | [`email-deliverability`](skills/email-deliverability/SKILL.md) | DMARC, SPF, DKIM, sender reputation, deliverability monitoring |
| 45 | [`media-asset-management`](skills/media-asset-management/SKILL.md) | Image pipelines, video hosting, asset libraries, format selection |

### Growth (2)

| # | Skill | What it does |
|---|---|---|
| 46 | [`analytics-strategy`](skills/analytics-strategy/SKILL.md) | Measurement frameworks, dashboard design, event taxonomy |
| 47 | [`cro-optimization`](skills/cro-optimization/SKILL.md) | Hypothesis-driven testing, conversion optimization |

### Research (3)

| # | Skill | What it does |
|---|---|---|
| 48 | [`ux-research`](skills/ux-research/SKILL.md) | Research planning, user interviews, qualitative synthesis |
| 49 | [`usability-testing`](skills/usability-testing/SKILL.md) | Test design, moderation, findings reports |
| 50 | [`journey-mapping`](skills/journey-mapping/SKILL.md) | Customer journey maps, service blueprints, friction analysis |

### Cross-cutting workflows (5)

| # | Skill | What it does |
|---|---|---|
| 51 | [`form-strategy`](skills/form-strategy/SKILL.md) | Form design, validation patterns, spam prevention, conversion tuning |
| 52 | [`content-migration`](skills/content-migration/SKILL.md) | Platform migrations with SEO equity preservation |
| 53 | [`internationalization`](skills/internationalization/SKILL.md) | Locale strategy, hreflang, translation workflow, RTL design |
| 54 | [`dependency-management`](skills/dependency-management/SKILL.md) | Package updates, security patches, lockfile hygiene |
| 55 | [`cost-optimization`](skills/cost-optimization/SKILL.md) | Infrastructure spend audits, rightsizing, contract negotiation |

### Process and team (5)

| # | Skill | What it does |
|---|---|---|
| 56 | [`stakeholder-communication`](skills/stakeholder-communication/SKILL.md) | Status updates, exec readouts, project communications |
| 57 | [`documentation-strategy`](skills/documentation-strategy/SKILL.md) | Documentation systems, what to document, maintenance cadence |
| 58 | [`vendor-evaluation`](skills/vendor-evaluation/SKILL.md) | Tool and vendor selection using a structured rubric |
| 59 | [`team-onboarding-playbook`](skills/team-onboarding-playbook/SKILL.md) | 30-60-90 onboarding plans for new hires and contractors |
| 60 | [`skill-creation-walkthrough`](skills/skill-creation-walkthrough/SKILL.md) | The meta-skill: how to write your own custom skills |

---

## Recommended MCPs

Skills compose best when Claude has live access to your data and tools. [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers provide that bridge. The skills in this library work without any MCPs, but pair them with the right ones and they go from "frameworks Claude follows" to "workflows Claude executes against your real systems."

Below is the MCP shortlist by skill area. None of these are required (except the Ahrefs MCP for the SEO audit suite). All are categorical recommendations: where multiple options exist for the same job, pick the one that fits your stack.

### SEO and search data

The SEO audit suite (skills 23-29) is built around the Ahrefs MCP. The foundation SEO skills (16-22) work with any equivalent.

- **Ahrefs MCP** - referenced explicitly by `seo-audit-orchestration` and the 6 audit suite skills (backlink, keyword gap, content gap, traffic, site health, rank tracking)
- **DataForSEO MCP** - alternative for SERP, keyword, and backlink data; useful as a complement to Ahrefs for cross-validation
- **Google Search Console MCP** - free, official Google data; essential for `seo-traffic-diagnosis` and any audit that needs ground-truth click and impression data
- **PageSpeed Insights MCP** - free, paired with `performance-optimization` and `seo-site-health-audit` for Core Web Vitals field data

### Development and code

- **GitHub MCP** - paired with `code-review-web`, `pm-spec-writing`, `roadmap-planning`, `incident-response`. Lets Claude read PRs, file issues, search code, and reference real commits.
- **Filesystem MCP** - local file and code operations; pairs with most dev and content skills
- **Sentry MCP** - paired with `monitoring-and-alerting` and `incident-response`. Real error data turns generic incident frameworks into specific diagnoses.

### Hosting and infrastructure

- **Cloudflare MCP** - paired with `domain-strategy`, `security-baseline`, `performance-optimization`. DNS records, redirects, page rules, security headers.
- **Vercel MCP** - paired with `launch-runbook` and `incident-response`. Deployments, env vars, build logs.
- **Supabase MCP** - paired with `code-review-web`, `pm-spec-writing`, `backup-and-disaster-recovery`. Schema, queries, edge functions.

### Analytics and monitoring

- **PostHog MCP** - paired with `analytics-strategy`, `cro-optimization`, `journey-mapping`. Event taxonomy review and funnel analysis grounded in real data.
- **Datadog MCP** - paired with `monitoring-and-alerting`, `incident-response`. SLO design and alert routing against actual metrics.

### Communication and project management

- **Slack MCP** - paired with `incident-response`, `stakeholder-communication`, `after-action-report`. Read channel context, draft updates, post incident comms.
- **Linear MCP** (or Jira MCP) - paired with `pm-spec-writing`, `roadmap-planning`. Spec writing against the actual issue tracker, not a generic template.

### Research and search

- **Web search** (built into Claude in most environments) - paired with `brand-discovery`, `seo-keyword`, `seo-competitor`, `ux-research`
- **Tavily MCP** or **Brave Search MCP** - alternatives for deeper research workflows

### Where to find them

- [modelcontextprotocol.io/servers](https://modelcontextprotocol.io/servers) - the canonical directory of MCP servers
- The Connectors directory inside Claude.ai (Settings → Connectors)
- `claude mcp add` in Claude Code for direct installation
- Vendor websites for first-party servers (most major SaaS tools now ship official MCPs)

### Building your own MCP

If a skill in this library would benefit from a tool integration that does not yet exist, the [MCP documentation](https://modelcontextprotocol.io/) walks through building one. The `seo-audit-orchestration` skill is a worked example of how to design a skill suite around a specific MCP's capabilities.

---

## Authoring conventions

Every skill follows the same structure. See [SKILL_AUTHORING.md](SKILL_AUTHORING.md) for the full spec.

Highlights:

- **Stack-agnostic.** No specific framework versions in SKILL.md. Stack-specific patterns go in reference files. The Ahrefs-powered audit suite is the single named-tool exception.
- **Future-proof.** Reference durable specs (W3C, WHATWG, Schema.org, MDN, NN/g, WCAG). Avoid trend pieces.
- **Uniform structure.** Every SKILL.md has the same section order: When to use, When NOT to use, Required inputs, The framework, Workflow, Failure patterns, Output format, Reference files.
- **Tight length.** SKILL.md under 250 lines. References under 400.
- **Punchy voice.** Short sentences. Concrete examples beat abstract advice.

---

## Repository structure

```
skills/
  skill-name/
    SKILL.md
    references/
      template.md
      checklist.md
      example.md
SKILL_AUTHORING.md          (the authoring guide)
CONTRIBUTING.md             (how to contribute)
MAPPING.md                  (origin notes for skills ported from existing work)
README.md                   (this file)
LICENSE                     (MIT)
```

---

## Contributing

Contributions are welcome. Whether you want to fix a typo, add a reference file, or propose an entirely new skill, the bar is the same: follow the uniform structure, keep the voice consistent, and prove the skill earns its place.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full process.

The fastest path: use the [`skill-creation-walkthrough`](skills/skill-creation-walkthrough/SKILL.md) skill itself. It teaches the same authoring discipline used across all 60 skills, with worked examples and a blank template.

---

## Resources

### Official Anthropic documentation

- [Agent Skills overview](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) - The canonical reference
- [Anthropic engineering blog on Skills](https://www.anthropic.com/engineering) - Background on the design
- [Claude Code documentation](https://docs.claude.com/en/docs/claude-code/overview) - Where most of these skills will run
- [Anthropic API reference](https://docs.claude.com/en/api/getting-started) - For programmatic use

### Other skill libraries worth knowing

- [Anthropic's official skills repository](https://github.com/anthropics/skills) - Examples and primitives published by Anthropic
- [Awesome Claude Skills (Composio)](https://github.com/ComposioHQ/awesome-claude-skills) - A curated index of community skills, where this library is featured under Business & Marketing

### Companion concepts

- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) - The protocol behind the Ahrefs MCP and other tool integrations referenced in this library
- [WCAG quick reference](https://www.w3.org/WAI/WCAG22/quickref/) - Accessibility standard cited by the accessibility audit and design skills
- [Schema.org](https://schema.org/) - Structured data vocabulary cited across the SEO suite

---

## License

[MIT](LICENSE). Use it. Fork it. Ship things with it.
