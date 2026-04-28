---
name: seo-audit-orchestration
description: "Master orchestrator for a full SEO audit suite powered by the Ahrefs MCP. Use this skill when running a comprehensive SEO audit, scoping a quarterly health check, doing pre-acquisition SEO due diligence, or post-migration verification. Triggers on full SEO audit, comprehensive SEO review, SEO health check, audit my site, SEO due diligence, audit suite, comprehensive audit, end-to-end SEO. Also triggers when a stakeholder wants the complete picture rather than a single-dimension audit."
---

# SEO Audit Orchestration

Run a complete SEO audit by sequencing the sibling audit skills in a defined order. Stack-agnostic. Assumes the Ahrefs MCP is connected. Produces a single rollup report that synthesizes findings across backlinks, keywords, content, traffic, technical health, and rankings.

---

## When to use

- Running a full SEO audit (quarterly, biannual, annual)
- Pre-acquisition SEO due diligence
- Post-migration verification (after content move, replatform, or domain change)
- Onboarding a new client or new property
- Building a baseline before a major SEO investment
- Diagnosing chronic underperformance

## When NOT to use

- Single-dimension audits (use the specific child skill: `seo-onpage`, `seo-backlink-audit`, etc.)
- Investigating a specific traffic drop (use `seo-traffic-diagnosis`)
- Tactical questions like "which keywords should we target" (use `seo-keyword-gap-audit`)
- Routine monitoring (use `seo-rank-tracking`)

---

## Required inputs

- The site or properties in scope
- Target market and primary languages
- Competitor set (3-5 properties)
- Goal of the audit (baseline, due diligence, fix plan, growth roadmap)
- Time and reporting constraints
- Confirmation that the Ahrefs MCP is connected and the workspace has access to the target property

---

## The framework: 6 phases of an end-to-end audit

A complete audit moves through six phases in order. Skipping phases produces gaps. Reordering them produces rework.

### Phase 1: Scope and baseline

Define the audit before running it.

- What is in scope (subdomains, paths, languages)
- What is out of scope
- Goal of the audit (baseline, fix plan, growth roadmap, due diligence)
- Stakeholders and their priorities
- Reporting format and length expectations

Output: a 1-page audit charter.

### Phase 2: Data gather

Pull the raw data from Ahrefs and any companion sources.

Required pulls:

- Site Explorer: organic keywords, organic traffic, top pages, top countries, referring domains, backlinks, anchor text profile
- Site Audit: full crawl results
- Keywords Explorer: target keyword universe and competitor keyword overlap
- Content Explorer: top performing content in target topics
- Rank Tracker: current tracked positions if set up

Companion pulls (not Ahrefs-native):

- Search Console: query and page data, coverage issues
- Analytics: traffic, conversions, segment by source
- Server logs (if available): bot crawl behavior

Document data freshness for every pull. Stale data yields wrong conclusions.

### Phase 3: Run the sub-audits

Run each child audit. Each produces its own findings doc.

| Sub-audit | Skill | What it produces |
| --- | --- | --- |
| Site health | `seo-site-health-audit` | Prioritized technical fix backlog |
| Backlinks | `seo-backlink-audit` | Profile health, toxic list, reclamation list |
| Keywords | `seo-keyword-gap-audit` | Prioritized opportunity list |
| Content | `seo-content-gap-audit` | Create/update/merge roadmap |
| Page-level | `seo-onpage` | Per-page audit on top pages |
| AI search | `seo-aeo-geo` | AI search readiness gaps |

The child skills do the analysis. This skill sequences them and integrates the outputs.

### Phase 4: Synthesize

Combine findings into themes. A list of 200 issues is not an audit. A list of 5-7 themes is.

Themes typically emerge in categories like:

- Technical foundation gaps that cap upside
- Content depth gaps in priority topics
- Backlink profile concentration risks
- Keyword opportunities the site is leaving on the table
- Cannibalization or thin coverage
- AI search readiness

Each theme should answer: what is happening, why it matters, what is the size of prize, what is the fix.

### Phase 5: Prioritize

Rank the themes. Use a simple impact/effort matrix.

- Quick wins: high impact, low effort. Do now.
- Strategic plays: high impact, high effort. Plan and resource.
- Maintenance: low impact, low effort. Backlog.
- Avoid: low impact, high effort. Drop.

Tie each theme to a measurable target (organic clicks, ranked keywords in target band, conversions from organic).

### Phase 6: Deliver

Produce the rollup report. See `references/audit-rollup-template.md`.

Structure:

- Executive summary (1 page)
- Themes and recommendations (5-7 themes, 1 page each)
- Sub-audit findings (linked or appended)
- Roadmap (next 90 days)

Walk stakeholders through it. Get commitment to the next 90 days of work.

---

## Workflow

1. **Charter the audit.** 1-page scope, goal, stakeholders, format.
2. **Confirm Ahrefs MCP access.** Verify the workspace has the target property and recent data.
3. **Pull all data.** Run the gather list in phase 2. Document freshness.
4. **Run each sub-audit.** Use the child skills. Each produces its own findings doc.
5. **Synthesize themes.** 5-7 themes max. Each ties to an impact and a fix.
6. **Prioritize.** Impact/effort matrix. Quick wins surface to the top.
7. **Draft the rollup.** Use the template. Executive summary first.
8. **Review with the team.** Pressure-test conclusions before stakeholder readout.
9. **Deliver.** Walk stakeholders through. Get commitment to next 90 days.
10. **Schedule the next one.** Audits decay. Rerun on a cadence.

---

## Failure patterns

- **Audit without a goal.** Produces a 60-page document nobody reads. Charter the audit first.
- **All findings, no themes.** A list of 200 issues is data, not an audit. Synthesize into themes.
- **Skipping the sub-audits.** Running one big audit instead of six focused ones produces shallow analysis everywhere.
- **No prioritization.** "Here are 47 things to fix" gets nothing fixed. Rank them.
- **Stale data.** Ahrefs index updates on a delay. Note freshness. Do not draw conclusions from week-old movement.
- **Tool worship.** Ahrefs is one source. Search Console, analytics, and logs add ground truth. Triangulate.
- **Audit-to-audit drift.** Running every audit differently makes trends impossible to spot. Standardize the structure.
- **No 90-day roadmap.** Without a plan after the audit, the audit is shelfware.
- **Solo audit.** Audits done alone miss context. Pull in the people who own the work.

---

## Output format

A rollup audit report with:

1. **Executive summary** (1 page).
2. **Audit charter** (scope, goal, methodology).
3. **Themes and recommendations** (5-7 themes, each with what, why, size of prize, fix).
4. **Sub-audit appendix** (linked outputs from each child skill).
5. **90-day roadmap** (sequenced work with owners and targets).
6. **Methodology notes** (data sources, pull dates, caveats).

Total length: 15-30 pages including appendices. Executive summary readable in 5 minutes.

---

## Reference files

- `references/audit-rollup-template.md` - Template for the rollup report including executive summary, theme structure, and roadmap format.
