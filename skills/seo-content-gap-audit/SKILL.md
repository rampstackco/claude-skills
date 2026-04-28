---
name: seo-content-gap-audit
description: "Audit content gaps and decay using Ahrefs MCP data: missing topics, thin coverage, outdated content, and decaying pages. Use this skill when planning a content roadmap, refreshing a stale catalog, building topical authority, or identifying which existing pages need update versus replacement. Triggers on content gap, content audit, content refresh, content roadmap, decaying content, content decay, topical authority, what topics should we cover, where is competitor content stronger. Also triggers when organic traffic is flat despite consistent publishing."
---

# SEO Content Gap Audit

Find content gaps and decay using Ahrefs MCP data. Stack-agnostic. Produces a roadmap of create, update, merge, and prune actions across the existing content catalog and identified topic gaps.

---

## When to use

- Planning the next quarter or half of content investment
- Refreshing a stale or underperforming content catalog
- Building topical authority in a target space
- Identifying decaying pages before they tank traffic
- Audit prep before a major site redesign or migration
- Diagnosing why content investment is not driving organic growth

## When NOT to use

- Pure keyword research (use `seo-keyword`)
- Competitor keyword gap (use `seo-keyword-gap-audit`)
- Single-page optimization (use `seo-onpage`)
- Pure prune-and-redirect decisions (use `seo-content-audit`)
- New site planning with no existing content (use `content-strategy`)

---

## Required inputs

- Target property and content scope
- Competitor set (3-5 properties with comparable content depth)
- Target topics or pillars (if defined)
- Existing content inventory with URLs, primary topics, publish dates
- Performance data (organic clicks per page, ranked keywords per page)
- Confirmation Ahrefs MCP is connected

---

## The framework: 4 categories of content opportunity

Every content opportunity falls into one of four categories. Different categories need different actions.

### Category 1: Missing topics

Topics with traffic potential where the property has no relevant page at all. Competitors often rank in the top 10. The fix: create new content.

Pulled from:

- Ahrefs Content Explorer (top performing content in target topics)
- Competitor top pages (Ahrefs Site Explorer)
- Keyword gap audit output (clustered into topics)

### Category 2: Thin coverage

Topics where the property has a page but it is too shallow, narrow, or single-keyword to compete with topical hubs. Competitor pages cover the topic across multiple subtopics. The fix: deepen the existing page or expand into a topic cluster.

Pulled from:

- Pages ranking on page 2-3 for target keywords
- Pages with low organic click share relative to ranked keyword volume
- Pages where competitors have longer or broader equivalents

### Category 3: Outdated content

Pages that ranked well historically but have lost ground due to staleness. Information is dated, examples are old, the SERP intent has shifted. The fix: refresh with current information and re-promote.

Pulled from:

- Pages with declining organic clicks over the last 6-12 months
- Pages with publish dates over 18 months old
- Pages with ranked keywords slipping in position

### Category 4: Decaying content

Pages that have lost traffic for reasons not obviously about staleness: SERP feature changes, competitor publishing, intent shifts, internal linking dilution. The fix: diagnose why, then refresh, merge, or redirect.

Pulled from:

- Pages with sharp recent traffic drops
- Pages where SERP composition has shifted (more video, more featured snippets, AI overviews)
- Pages that compete with newer pages on the same site (cannibalization)

---

## Workflow

1. **Charter the audit.** Scope (whole site or section), goal, time window for performance data.
2. **Pull the inventory.** Every URL, with publish date, primary topic, organic clicks, ranked keywords.
3. **Pull competitor coverage.** Top pages and content clusters from each competitor.
4. **Classify each existing page.** Healthy / thin / outdated / decaying / off-topic.
5. **Identify missing topics.** Cross-reference competitor top pages and keyword gap output.
6. **Score each opportunity.** See `references/content-decision-matrix.md`.
7. **Cluster.** Group related missing topics into pillar concepts.
8. **Decide actions.** Create / update / merge / redirect / prune for each opportunity.
9. **Sequence the roadmap.** Quarter by quarter, with effort estimates and traffic forecasts.
10. **Hand off.** Output feeds `content-strategy`, `content-and-copy`, and `seo-onpage`.

---

## The action decision matrix

For each piece of existing content or proposed new content, decide one action.

| Signal | Action |
| --- | --- |
| Strong page, healthy traffic, current information | Keep. Defend with internal linking and refresh on schedule. |
| Page exists, ranking on page 2-3, content is thin vs SERP | Update. Deepen, restructure, broaden. |
| Page exists, traffic declining, content is dated | Refresh. Update facts, examples, year references, screenshots. |
| Page exists, low or zero traffic, low ranking, no improvement path | Prune or merge. Redirect to a stronger relative if one exists. |
| Multiple pages on overlapping topics | Merge into one canonical page. Redirect the others. |
| Topic missing entirely, competitor coverage strong | Create new page or pillar. |
| Topic missing, but competitors do not rank well either | Validate intent before investing. Could be an opportunity or could be a dead end. |
| Page is off-topic for the property | Redirect to most relevant page or remove from sitemap. |

---

## Failure patterns

- **All-create, no-update bias.** Teams default to creating new content. Updates and merges often outperform new pieces by a wide margin and at lower cost.
- **Treating publish date as currency.** A 5-year-old page can outrank a 1-month-old page if it is better. Stop deleting old content reflexively.
- **Cannibalization blind spots.** Two pages on overlapping topics dilute each other. Audit for it explicitly.
- **No effort estimates.** A roadmap without effort sizes cannot be sequenced realistically.
- **No traffic forecast.** A roadmap without forecasted impact loses funding fights. Forecast even with wide confidence bands.
- **Refreshing without re-promotion.** A refreshed page needs a re-crawl signal: update sitemap, internal links, distribution.
- **Ignoring intent shift.** Some keywords have shifted from informational to transactional or to AI-answer-dominated. Recognize when the SERP is no longer addressable by the existing format.
- **Confusing decay with seasonality.** A 30% click drop in summer for a back-to-school topic is not decay. Compare year-over-year, not month-over-month.
- **Auditing in isolation from the keyword gap.** The two audits feed each other. Run them adjacent.

---

## Output format

A content gap audit document with:

1. **Executive summary.** Top 3 themes, content health verdict, recommended quarterly investment split.
2. **Content inventory snapshot.** Counts by health classification.
3. **Missing topics.** Prioritized list with cluster mapping and traffic forecast.
4. **Thin coverage.** Pages to deepen, with recommendation for each.
5. **Outdated content.** Pages to refresh, with refresh scope.
6. **Decaying content.** Pages to diagnose and act on, with hypothesis for each.
7. **Cannibalization findings.** Page pairs to merge.
8. **Action roadmap.** Quarter by quarter, with effort and forecast.
9. **Methodology.** Data sources, classification criteria, caveats.

Length: 8-15 pages plus an attached inventory spreadsheet.

---

## Reference files

- `references/content-decision-matrix.md` - Detailed decision tree for classifying pages and choosing the create/update/merge/prune action, with worked examples.
