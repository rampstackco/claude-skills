# Changelog

All notable changes to this library are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

**Distribution**

- Claude Code plugin marketplace. `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json` publish the full catalog as an installable plugin: `/plugin marketplace add rampstackco/claude-skills` then `/plugin install rampstack-skills@rampstack`.

**README sections**

- "Install in Claude Code" section documenting the one-command marketplace install path.

### Changed

- "The framework's range" cards now link to their live showcase demos (Pulse, Forge, Bloom, Observatory), and the section closes with a CTA to the full creative-direction showcase.
- Hand-authored rampstack.co showcase demo links across the README now open in a new tab (`target="_blank" rel="noopener"`).

## [1.2.0] - 2026-05-07

### Added

**Skills (38 net additions, 60 → 98)**

- `logo-design` skill (Brand category). Logo variants across architectures (wordmark, lockup, monogram, letterform-as-symbol, abstract, pictorial, combination, emblem) with rationale and application specs.
- Tier 2 PM experimentation track (6 skills): `experiment-design`, `feature-flagging`, `experimentation-platform-orchestrator`, `experimentation-analytics`, `product-analytics-setup`, `data-warehouse-experimentation`. Statistical discipline for shipping changes with confidence: hypothesis to decision, sample size, sequential testing, CUPED variance reduction, dashboard reconciliation, the failure modes that produce wrong shipping calls.
- Tier 2 PM gap-closing track (4 new + 2 expanded): `feature-launch-playbook`, `jtbd-framing`, `okr-design`, `beta-program-management`, plus expanded coverage in `roadmap-planning` and `pm-spec-writing`. Operational discipline for shipping features that land: positioning, internal alignment, customer comms, sales enablement, support readiness, rollout strategy, monitoring, post-launch measurement.
- Tier 2 content lifecycle (9 skills): `pillar-content-architecture`, `content-brief-authoring`, `programmatic-seo`, `editorial-qa`, `ai-content-collaboration`, `long-form-content-frameworks`, `content-refresh-system`, `content-repurposing`, `content-distribution`. Hub-and-cluster topical authority, per-piece editorial brief authoring, pSEO programs, pre-publish QA, AI-content workflows, long-form structural patterns, refresh cadence, cross-format adaptation, distribution discipline.
- Growth tooling cluster (12 skills): `funnel-flow-architecture` (orchestrator), `lead-magnet-design`, `calculator-design`, `quiz-and-assessment-design`, `multi-step-form-design`, `chatbot-flow-design`, `onboarding-wizard-design`, `interactive-product-tour`, `upgrade-flow-design`, `scheduler-and-booking-design`, `comparison-tool-design`, `product-configurator-design`. Interactive web tools that turn visitors into leads, activate signups, and convert intent to action.
- Marketing paid media (3 skills): `paid-media-strategy`, `ads-creative-development`, `ads-performance-analytics`. Channel selection, creative variations, performance analytics for budgets at scale.
- Research expansion (2 skills): `discovery-research-synthesis`, `user-feedback-aggregation`. Synthesizing customer interviews and feedback into actionable PM decisions; weighted feedback triage across channels.
- `integration-orchestrator` skill (Product category). Sequence creative-direction work across phases, gates, handoffs, and QA verification.

**Reference files**

- ~330 new reference files (95 → ~424), bringing every skill above the floor of one reference file each, with most skills carrying 4-6 references covering templates, checklists, decision matrices, and worked examples.
- ARIA patterns reference for `accessibility-audit` skill ([PR #36](https://github.com/rampstackco/claude-skills/pull/36) community contribution).
- "Methodology-level / Implementation choices" closing section added across reference files.

**Categories (14 → 16)**

- Growth tooling category (12 skills). Interactive web tools that turn visitors into leads.
- Marketing category (3 skills). Paid media discipline.

**README sections**

- "Logo design in action" H2 section showcasing the logo-design skill rendered as two parallel surfaces on rampstack.co (per-brand variant explorer at /showcase/logo-design and architectural taxonomy gallery at /showcase/logos).
- "Surfaces" section naming the rampstack.co commercial layer (skills directory, walkthroughs, integrations directory, showcase) that extends the open-source methodology.
- "How the catalog connects" section with AI-generated hub-and-spoke architecture diagram (Gemini-generated JPG, responsive variants for desktop and mobile via `<picture>` element) showing 98 skills at the center and 35 integrations across 6 categories radiating out.
- HTML `<picture>` element pattern for responsive image swaps on README and at rampstack.co/integrations.
- Acknowledgments section crediting [@IgnacioChiaravalle](https://github.com/IgnacioChiaravalle) for the PR #36 community feedback (CONTRIBUTING typo fix, cross-linking pass, ARIA patterns reference).

**Generator scripts**

- `scripts/generate_readme_catalog.py`. Build-time README generator with `FEATURED_SKILLS`, `SURFACES`, and `COUNT_*` markers driven by skills/ folder contents. Eliminates drift between catalog state and README.
- `scripts/generate_og_card.py`. Pillow-based reproducible OG social card.
- `scripts/crosslink_pass.py`. Idempotent script from PR #36 that maintains cross-references between SKILL.md files and reference files.

### Changed

- Catalog renumbered to 98 entries across 16 categories. README catalog tables now drop the # column (was creating mobile readability issues).
- Featured Skills section restructured to 2-column with audience track parenthetical (was 3-column without track).
- Architecture image redesigned as AI-generated illustration (Gemini) matching the rampstack.co aesthetic, replacing the prior Pillow-rendered diagram. JPG variants for desktop and mobile.
- README "Recommended MCPs" section restructured with explicit cost-model framing (free with rate limits, credits-per-call, etc.) per integration. SEO competitive intelligence section expanded to cover Ahrefs, Semrush, DataForSEO, Similarweb with explicit complementarity framing.
- Cross-skill cross-references expanded across the catalog: every skill's "When NOT to use" section names sibling skills, and "Pairs with" references made bidirectional.
- README archetype count updated from "Thirty fictional brands" to "Forty-two fictional brands" reflecting the actual count on rampstack.co/showcase/creative-direction (Wave 1 + Wave 2 expansions).

### Fixed

- Stale archetype count reference in README "See it in action" intro.
- Mobile readability of catalog tables (# column was forcing horizontal scroll on narrow viewports).
- Logo showcase mark clipping on /showcase/logos (Tarsus and Caval marks had viewBox declarations too tight for their rendered content; expanded viewBoxes preserve design intent while giving content room to render). Live at rampstack.co/showcase/logos.

## [1.1.0] - 2026-04-30

### Added

**Community standards**

- `CONTRIBUTING.md` with full contribution process and authoring discipline.
- `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1).
- `SECURITY.md` with vulnerability reporting process.
- `CHANGELOG.md` (this file).
- Issue templates: new skill request, bug report, improve reference file.
- Pull request template.
- 100% Community Standards score on GitHub repo health check.

**Reference files**

- 20 new reference files (75 → 95).

**README**

- Recommended MCPs section listing categorical recommendations by skill area.
- Banner image at `docs/banner.jpg`.
- Social profile links (LinkedIn, X/Twitter, Facebook).
- Expanded table of contents.

### Changed

- Audit reports moved from repo root to `docs/audits/`.

### Fixed

- 21 broken SKILL.md to reference file links.
- 6 orphan reference files (referenced from no SKILL.md).
- Cross-skill reference (`pm-framework` → `pm-spec-writing`).
- 3 SKILL.md framework section headers normalized.
- `SKILL_AUTHORING.md` updated with section-naming clarification.

## [1.0.0] - 2026-04-28

### Added

The initial public release. 59 stack-agnostic Claude Skills covering the full website lifecycle.

**Strategy and discovery (4):** `brand-discovery`, `creative-brief`, `information-architecture`, `content-strategy`

**Brand (4):** `brand-ideation`, `brand-identity`, `brand-style-guide`, `brand-voice`

**Design (3):** `design-system`, `design-standards`, `art-direction`

**Content (3):** `content-and-copy`, `landing-page-copy`, `email-sequences`

**SEO foundation (7):** `seo-onpage`, `seo-technical`, `seo-keyword`, `seo-competitor`, `seo-offpage`, `seo-content-audit`, `seo-aeo-geo`

**SEO audit suite (Ahrefs MCP-powered) (7):** `seo-audit-orchestration`, `seo-backlink-audit`, `seo-keyword-gap-audit`, `seo-content-gap-audit`, `seo-traffic-diagnosis`, `seo-site-health-audit`, `seo-rank-tracking`

**Product (2):** `pm-spec-writing`, `roadmap-planning`

**Development (4):** `code-review-web`, `frontend-component-build`, `accessibility-audit`, `performance-optimization`

**Quality assurance (1):** `qa-testing`

**Operations (9):** `launch-runbook`, `incident-response`, `after-action-report`, `domain-strategy`, `monitoring-and-alerting`, `backup-and-disaster-recovery`, `security-baseline`, `email-deliverability`, `media-asset-management`

**Growth (2):** `analytics-strategy`, `cro-optimization`

**Research (3):** `ux-research`, `usability-testing`, `journey-mapping`

**Cross-cutting workflows (5):** `form-strategy`, `content-migration`, `internationalization`, `dependency-management`, `cost-optimization`

**Process and team (5):** `stakeholder-communication`, `documentation-strategy`, `vendor-evaluation`, `team-onboarding-playbook`, `skill-creation-walkthrough`

### Repo metadata

- 59 `SKILL.md` files
- 75 reference files
- Companion docs: `README.md`, `SKILL_AUTHORING.md`, `MAPPING.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`
- MIT License

[Unreleased]: https://github.com/rampstackco/claude-skills/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/rampstackco/claude-skills/releases/tag/v1.2.0
[1.1.0]: https://github.com/rampstackco/claude-skills/releases/tag/v1.1.0
[1.0.0]: https://github.com/rampstackco/claude-skills/releases/tag/v1.0.0
