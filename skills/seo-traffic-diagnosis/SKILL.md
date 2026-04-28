---
name: seo-traffic-diagnosis
description: "Diagnose organic traffic changes (drops, stalls, or unexpected wins) using Ahrefs MCP plus Search Console data. Use this skill when traffic suddenly dropped, has been flat despite investment, after an algorithm update, after a migration or deploy, or when a competitor seems to be taking share. Triggers on traffic dropped, traffic decline, traffic stalled, organic decline, lost rankings, why is traffic down, algorithm update, post-migration traffic loss, traffic diagnosis. Also triggers when stakeholders are panicking about analytics."
---

# SEO Traffic Diagnosis

Diagnose why organic traffic moved (down, flat, or unexpectedly up) using Ahrefs MCP combined with Search Console and analytics data. Stack-agnostic. Produces a root-cause diagnosis and an action plan.

---

## When to use

- Organic traffic dropped sharply
- Organic traffic has been flat for months despite content investment
- After a known Google algorithm update
- After a migration, replatform, or domain change
- After a deploy that touched routing, redirects, or rendering
- When a competitor is visibly taking organic share
- When a single page dropped from a ranked position
- When stakeholders need an explanation, fast

## When NOT to use

- Routine performance reporting (use `analytics-strategy`)
- Pre-emptive content planning (use `seo-content-gap-audit`)
- Backlink-only investigations (use `seo-backlink-audit`)
- Technical issue triage outside of traffic concerns (use `seo-site-health-audit`)

---

## Required inputs

- Description of the symptom (what changed, when, magnitude)
- Date the change started (best estimate)
- Recent SEO history: deploys, migrations, content changes, link campaigns
- Access to Ahrefs MCP, Search Console, and analytics
- Confirmation the change is real (not a tracking artifact)

---

## The framework: 5 layers of diagnosis

A traffic change has one or more root causes. Move through the layers in order. Stop when you have enough evidence.

### Layer 1: Confirm the change is real

Before diagnosing, rule out:

- Tracking gaps (analytics outages, tag manager issues)
- Bot traffic changes
- Reporting comparison errors (different date ranges, wrong segment)
- Seasonality (compare year-over-year, not just month-over-month)
- Holiday or weekday effects

Cross-check Search Console clicks against analytics organic sessions. Significant divergence often points to a tracking issue, not a real traffic change.

### Layer 2: Localize the change

Where is the change happening?

Segment by:

- Country and language
- Device (mobile, desktop, tablet)
- Page or section (homepage, blog, product, category)
- Query type (branded vs non-branded)
- Landing page

A change in one segment requires different diagnosis than a change everywhere.

| Pattern | Likely cause |
| --- | --- |
| One country dropped | Local algorithm update, hreflang issue, geo redirect issue |
| Mobile dropped, desktop flat | Mobile usability or page speed regression |
| One section dropped | Topical algorithm update or section-specific quality issue |
| Branded queries dropped | Brand-level issue: site outage, reputation, manual action |
| Non-branded dropped | Algorithmic ranking issue |
| Single page dropped | Page-level issue: content, technical, or competitive |
| Sitewide dropped | Sitewide issue: penalty, technical, migration, or algorithm |

### Layer 3: Page-level analysis

For affected pages, audit:

- Position changes per ranked keyword (Ahrefs Rank Tracker history)
- SERP composition changes (more ads, AI overviews, featured snippets, video)
- Click-through rate changes
- Index status (Search Console coverage)
- Crawl errors and accessibility
- Recent content changes
- Internal link changes
- Backlink changes (lost links, redirect chains)

A page can lose traffic without losing rank if SERP composition changed.

### Layer 4: Technical analysis

Did anything break technically?

Check:

- Robots.txt changes
- Canonical tag changes
- Meta robots changes (accidental noindex)
- Redirect chains and loops
- Render issues (especially for JS-heavy frameworks)
- Site speed regressions
- Hreflang errors
- Sitemap freshness
- HTTP status codes (4xx, 5xx spikes)
- Server log evidence of crawl behavior changes

Recent deploys are the prime suspect. Compare deploy dates to traffic change dates.

### Layer 5: External analysis

If layers 1-4 do not explain the change, look outward.

- Algorithm update calendar (cross-reference timing)
- Competitor moves (new content, new SERP features they captured)
- Industry trend (declining search demand for the topic)
- Manual action (Search Console security and manual actions)
- Negative SEO (sudden link velocity changes)

---

## Workflow

1. **Confirm the symptom.** Get exact dates, magnitude, segment if known.
2. **Validate the data.** Layer 1 checks. Rule out tracking and seasonality.
3. **Localize.** Layer 2. Segment until the pattern is clear.
4. **Page-level dive.** Layer 3 on the most affected pages.
5. **Technical check.** Layer 4. Recent deploys, robots, canonicals, redirects.
6. **External check.** Layer 5. Algorithm updates, competitors, industry.
7. **Build the hypothesis.** State the cause as a single sentence.
8. **Validate the hypothesis.** Find the evidence that confirms or refutes it. See `references/diagnosis-checklist.md`.
9. **Action plan.** Specific fixes mapped to specific evidence.
10. **Communicate.** Write up the diagnosis. Stakeholders want clarity, not exhaustive analysis.

---

## Failure patterns

- **Jumping to algorithm update.** "It must be the algorithm" is the lazy answer. Eliminate technical and page-level causes first.
- **Solving the wrong problem.** A drop diagnosed as "content quality" when the real cause was an accidental noindex on a deploy. Validate the hypothesis before fixing.
- **No baseline for "normal."** Without a baseline, every fluctuation looks alarming. Establish what normal noise looks like before reacting.
- **Treating one page as the site.** Site-wide and page-level diagnoses are different. Confirm scope first.
- **Ignoring branded vs non-branded.** A drop in branded queries means a brand-level problem. A drop in non-branded means an SEO problem. Different teams own them.
- **Comparing wrong date ranges.** Comparing 28 days to the previous 28 days during a holiday distorts the picture. Use year-over-year for seasonal businesses.
- **Stopping at correlation.** A deploy and a drop on the same day is a strong correlation, not proof. Find the mechanism.
- **Single-source diagnosis.** Ahrefs sees position. Search Console sees clicks and queries. Analytics sees behavior. Logs see crawl. Use them together.
- **Premature reassurance.** Telling stakeholders "it is just an algorithm update, will recover" without evidence sets up a worse conversation later.

---

## Output format

A diagnosis document with:

1. **Summary.** What changed, when, magnitude, root cause in one paragraph.
2. **The symptom.** Charts and segment breakdowns.
3. **Layer-by-layer findings.** What each layer ruled in or out.
4. **Root cause hypothesis.** Single statement with evidence.
5. **Action plan.** Ordered fixes with owners and timelines.
6. **Recovery forecast.** Realistic expectations on timeline and ceiling.
7. **Monitoring plan.** What to watch for confirmation of recovery.

Length: 4-10 pages. Stakeholders read this fast.

---

## Reference files

- `references/diagnosis-checklist.md` - Layer-by-layer diagnostic checklist with the specific data to pull at each layer and how to interpret each signal.
