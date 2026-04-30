# Changelog

All notable changes to this library are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `creative-direction` skill (Strategy and discovery category). Structured aesthetic brief using four directional axes (tone register, aesthetic philosophy, audience relationship, sensory ambition) for cross-skill coherence.
- Reference files for `creative-direction`: `axes-explained.md`, `brief-template.md`, `example-aesthetic-brief.md`.

### Changed

- Added bidirectional cross-references between `creative-brief` and `creative-direction` to clarify scope (operational kickoff vs aesthetic depth).
- Added bidirectional cross-references between `art-direction` and `creative-direction`. Removed overlapping trigger phrases (`creative direction` from `art-direction`, `art direction` from `creative-direction`) to resolve trigger collision.
- README catalog renumbered (1-60) with `creative-direction` inserted at position 3 in Strategy and discovery.
- README updated: 60 skills, 14 categories, 98 reference files. Catalog count badge, headings, and TOC anchor all updated to match.
- Replaced README banner with an evergreen version (no skill count, "COMPLETE" as the orange anchor word). New file at `docs/rampstack-complete-banner.jpg`.

### Fixed

- Stale skill range references in README "Recommended MCPs" section. SEO audit suite range corrected from 22-28 to 23-29; SEO foundation range corrected from 15-21 to 16-22.
- Pre-existing miscount of categories (was 13, actual 14) and reference files (was 75 / shifted to 78, actual 98).
- Issue template `.github/ISSUE_TEMPLATE/new-skill.yml` updated to reference 60 skills and the renamed `#the-60-skill-catalog` anchor.

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

[Unreleased]: https://github.com/rampstackco/claude-skills/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/rampstackco/claude-skills/releases/tag/v1.0.0
