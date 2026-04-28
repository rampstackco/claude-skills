# Brand Build Skills for Claude

A complete library of [Claude Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) covering the full lifecycle of building, launching, running, and growing a brand and a website: discovery, strategy, brand, design, content, SEO, development, QA, launch, ops, growth, research, and an SEO audit suite that integrates with the Ahrefs MCP.

Every skill is stack-agnostic. Use them on Next.js, WordPress, Shopify, Webflow, plain HTML, or any other web stack. References to specific tools are categorical ("your crawler of choice"), not vendor-specific. The exception is the SEO audit suite, which assumes the Ahrefs MCP is connected.

The skills are designed to be future-proof. Principles over tools. Stable concepts over trending techniques. References to durable specs (W3C, WHATWG, Schema.org, MDN, NN/g, WCAG) over content that ages with each algorithm update.

**Status: 59 of 59 skills shipped.** Each skill has a complete `SKILL.md` and at least one reference file.

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

## The 59-skill catalog

All 59 skills are shipped. Each has a complete SKILL.md plus at least one reference file (template, checklist, or playbook).

### Strategy and discovery (4)

| # | Skill | What it does |
|---|---|---|
| 1 | `brand-discovery` | Audience research, competitive scan, positioning territory exploration |
| 2 | `creative-brief` | Project briefs that align stakeholders before work starts |
| 3 | `information-architecture` | Sitemap, navigation, URL structure, content types, taxonomy |
| 4 | `content-strategy` | Editorial strategy, content calendar, topical authority planning |

### Brand (4)

| # | Skill | What it does |
|---|---|---|
| 5 | `brand-ideation` | Naming, positioning territories, mood directions, narrative angles |
| 6 | `brand-identity` | Logo system, color, typography, imagery, iconography, motion |
| 7 | `brand-style-guide` | The canonical reference document for the full brand system |
| 8 | `brand-voice` | Voice attributes, tone shifts, vocabulary, paired-example library |

### Design (3)

| # | Skill | What it does |
|---|---|---|
| 9 | `design-system` | Component library, design tokens, design system documentation |
| 10 | `design-standards` | Production-grade page and component design standards |
| 11 | `art-direction` | Photography, illustration, and visual direction for campaigns |

### Content (3)

| # | Skill | What it does |
|---|---|---|
| 12 | `content-and-copy` | Website copy, blog content, content production frameworks |
| 13 | `landing-page-copy` | Landing pages, sales pages, hero-to-CTA flow |
| 14 | `email-sequences` | Onboarding flows, lifecycle campaigns, transactional copy |

### SEO foundation (7)

Tool-agnostic SEO skills. These define the conceptual frameworks. The SEO audit suite below adds the Ahrefs MCP-powered execution layer.

| # | Skill | What it does |
|---|---|---|
| 15 | `seo-onpage` | Single-page audits and optimization across 8 dimensions |
| 16 | `seo-technical` | Crawlability, indexability, rendering, schema, page experience |
| 17 | `seo-keyword` | Discovery, intent classification, clustering, prioritization |
| 18 | `seo-competitor` | SERP overlap, content gaps, backlink gaps, technical comparison |
| 19 | `seo-offpage` | Link building, digital PR, citations, linkable assets |
| 20 | `seo-content-audit` | Keep/update/merge/redirect/delete decisions across a site |
| 21 | `seo-aeo-geo` | AI search optimization, llms.txt, extraction-friendly content |

### SEO audit suite (Ahrefs MCP-powered) (7)

End-to-end SEO audit workflows that pull data from the Ahrefs MCP and produce concrete deliverables. These skills assume the Ahrefs MCP is connected.

| # | Skill | What it does |
|---|---|---|
| 22 | `seo-audit-orchestration` | Master orchestrator: sequences the suite, produces a rollup report |
| 23 | `seo-backlink-audit` | Profile health, anchor mix, toxic links, reclamation, gap analysis |
| 24 | `seo-keyword-gap-audit` | Competitor keyword gaps with opportunity scoring and clustering |
| 25 | `seo-content-gap-audit` | Missing topics, thin coverage, outdated content, decay diagnosis |
| 26 | `seo-traffic-diagnosis` | Diagnose drops, stalls, or wins via 5-layer root cause analysis |
| 27 | `seo-site-health-audit` | Triage Ahrefs Site Audit findings by SEO impact, not severity |
| 28 | `seo-rank-tracking` | Setup, baseline, segmentation, alerting, dashboarding |

### Product (2)

| # | Skill | What it does |
|---|---|---|
| 29 | `pm-spec-writing` | PRDs, user stories, acceptance criteria, dev briefs |
| 30 | `roadmap-planning` | Quarterly planning, prioritization, dependency mapping |

### Development (4)

| # | Skill | What it does |
|---|---|---|
| 31 | `code-review-web` | PR review, build error diagnosis, security and quality checks |
| 32 | `frontend-component-build` | Component architecture, props design, accessibility from the start |
| 33 | `accessibility-audit` | WCAG compliance audit with remediation plan |
| 34 | `performance-optimization` | Core Web Vitals, asset optimization, render performance |

### Quality assurance (1)

| # | Skill | What it does |
|---|---|---|
| 35 | `qa-testing` | Pre-launch QA, regression testing, cross-browser checks |

### Operations (9)

| # | Skill | What it does |
|---|---|---|
| 36 | `launch-runbook` | Go-live runbook, DNS cutover, deploy day procedures |
| 37 | `incident-response` | Incident triage, comms, mitigation, escalation |
| 38 | `after-action-report` | Post-mortems, retros, learnings documentation |
| 39 | `domain-strategy` | DNS architecture, redirects, registrars, multi-domain portfolios |
| 40 | `monitoring-and-alerting` | SLO design, uptime checks, alert routing, on-call rotations |
| 41 | `backup-and-disaster-recovery` | RPO/RTO targets, backup strategy, restoration drills |
| 42 | `security-baseline` | HTTPS, security headers, CSP, secrets management, vulnerability scans |
| 43 | `email-deliverability` | DMARC, SPF, DKIM, sender reputation, deliverability monitoring |
| 44 | `media-asset-management` | Image pipelines, video hosting, asset libraries, format selection |

### Growth (2)

| # | Skill | What it does |
|---|---|---|
| 45 | `analytics-strategy` | Measurement frameworks, dashboard design, event taxonomy |
| 46 | `cro-optimization` | Hypothesis-driven testing, conversion optimization |

### Research (3)

| # | Skill | What it does |
|---|---|---|
| 47 | `ux-research` | Research planning, user interviews, qualitative synthesis |
| 48 | `usability-testing` | Test design, moderation, findings reports |
| 49 | `journey-mapping` | Customer journey maps, service blueprints, friction analysis |

### Cross-cutting workflows (5)

| # | Skill | What it does |
|---|---|---|
| 50 | `form-strategy` | Form design, validation patterns, spam prevention, conversion tuning |
| 51 | `content-migration` | Platform migrations with SEO equity preservation |
| 52 | `internationalization` | Locale strategy, hreflang, translation workflow, RTL design |
| 53 | `dependency-management` | Package updates, security patches, lockfile hygiene |
| 54 | `cost-optimization` | Infrastructure spend audits, rightsizing, contract negotiation |

### Process and team (5)

| # | Skill | What it does |
|---|---|---|
| 55 | `stakeholder-communication` | Status updates, exec readouts, project communications |
| 56 | `documentation-strategy` | Documentation systems, what to document, maintenance cadence |
| 57 | `vendor-evaluation` | Tool and vendor selection using a structured rubric |
| 58 | `team-onboarding-playbook` | 30-60-90 onboarding plans for new hires and contractors |
| 59 | `skill-creation-walkthrough` | The meta-skill: how to write your own custom skills |

---

## How to use

### Add to Claude Code or Claude Desktop

Copy the skill folders into the appropriate skills directory. Each `SKILL.md` is the entry point. References live alongside in a `references/` subfolder.

### Trigger by description

Each skill has a description that triggers Claude to load it when relevant. The triggers are listed in the `description` field of each `SKILL.md`. Triggers cover both explicit phrasings ("audit my SEO") and implicit ones ("why is my traffic dropping").

### Connect the Ahrefs MCP for the audit suite

The 7 skills in the SEO audit suite (`seo-audit-orchestration` through `seo-rank-tracking`) assume the Ahrefs MCP is connected to your Claude environment. The other SEO skills (`seo-onpage`, `seo-technical`, etc.) are tool-agnostic and do not require any specific MCP.

### Compose

Skills reference each other. `creative-brief` points to `brand-voice`. `seo-content-audit` points to `seo-keyword`. `seo-audit-orchestration` orchestrates the full audit suite. `incident-response` points to `monitoring-and-alerting` and `after-action-report`. Reading the "When NOT to use" section in any skill tells you which sibling skill is the right one for adjacent work.

### Build your own

Use `skill-creation-walkthrough` to package your own recurring workflows into skills using the same uniform structure.

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
MAPPING.md                  (origin notes for skills ported from existing work)
README.md                   (this file)
```

---

## Contributing

If you fork this and add skills, follow [SKILL_AUTHORING.md](SKILL_AUTHORING.md). The triggering checklist at the end of that doc is the bar for shipping. Or use the `skill-creation-walkthrough` skill itself, which packages the same authoring discipline as a Claude-native workflow.

---

## License

MIT
