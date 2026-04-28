---
name: seo-rank-tracking
description: "Set up and run rank tracking using Ahrefs MCP: pick the right keywords to track, segment them by purpose, set baselines, and define alert thresholds. Use this skill when starting a new tracking project, baselining for a campaign, choosing what to monitor, or building a rank reporting cadence. Triggers on rank tracking, keyword tracking, monitor rankings, track positions, what should we track, ranking dashboard, baseline rankings, alert thresholds. Also triggers when a stakeholder wants weekly or monthly ranking visibility."
---

# SEO Rank Tracking

Set up and run an ongoing rank tracking program using Ahrefs MCP data. Stack-agnostic. Produces a tracked keyword set, segmentation, baseline, alert thresholds, and a review cadence.

---

## When to use

- Starting rank tracking for a new property or section
- Baselining before a campaign, content launch, or major site change
- Deciding what keywords are worth tracking
- Setting up a ranking dashboard for stakeholders
- Establishing alert thresholds for ranking drops
- Reviewing whether the current tracked set is still meaningful

## When NOT to use

- Keyword discovery (use `seo-keyword`)
- Competitor keyword analysis (use `seo-keyword-gap-audit`)
- Diagnosing a ranking change that already happened (use `seo-traffic-diagnosis`)
- Single-page audits (use `seo-onpage`)

---

## Required inputs

- Target property
- Target market and language
- Business priorities (which segments matter)
- Existing ranked keywords (Ahrefs Site Explorer)
- Stakeholder reporting cadence (weekly, monthly, quarterly)
- Confirmation Ahrefs MCP and Rank Tracker access

---

## The framework: tracking taxonomy

A good tracked keyword set has structure. Random keyword lists produce noisy dashboards. Segmented keyword sets produce signal.

Group every tracked keyword into one of four buckets.

### Bucket 1: Brand keywords

Queries containing the brand name (and major variants and misspellings).

Why track:

- Detect brand visibility issues
- Catch competitors bidding on the brand
- Spot reputation problems early

Volume in this bucket: typically 10-30 keywords for most brands.

Healthy signal: position 1 for all variants. Anything else is investigate-worthy.

### Bucket 2: Money keywords

Queries that drive (or should drive) revenue: high-intent transactional and evaluation-stage queries directly tied to the business model.

Why track:

- These are the keywords that pay the bills
- Movement here directly affects revenue
- Stakeholders care most about these

Volume in this bucket: 30-100 keywords for most properties. More for ecommerce.

Healthy signal: top 3-5 positions. Watch for position drift in either direction.

### Bucket 3: Opportunity keywords

Queries the property is currently ranking on page 2-3 (positions 11-30) with potential to break into top 10.

Why track:

- These are the active growth bets
- Movement reflects whether content investment is working
- Quick wins typically come from this bucket

Volume in this bucket: 50-200 keywords typically.

Healthy signal: trending toward page 1 over a 90-day window.

### Bucket 4: Competitor benchmark keywords

A representative sample of head and torso queries shared with the competitor set, used to track relative position over time.

Why track:

- Measure share of voice
- Spot competitor gains in real time
- Provide industry context for movement

Volume in this bucket: 50-150 keywords.

Healthy signal: relative position improving or holding within a defined competitive band.

---

## Selection criteria

### Brand bucket

- Brand name (exact)
- Brand name + product or service
- Brand name common misspellings
- Brand name + "review", "vs", "alternative"
- Brand-owned product names if relevant

### Money bucket

- Top 20 ranked keywords by traffic value (Ahrefs Site Explorer)
- Top transactional queries from Search Console with non-trivial impressions
- Conversion-driving queries identified in analytics
- Strategic head terms from `seo-keyword-gap-audit` output

Quality over volume. 50 well-chosen money keywords beats 500 noisy ones.

### Opportunity bucket

- All keywords currently ranking positions 11-30 with monthly volume above a relevance-appropriate threshold
- Queries with rising impression volume in Search Console
- Output from the keyword gap audit's quick wins list

Refresh this bucket quarterly. Opportunity is a moving target.

### Competitor benchmark bucket

- Keywords where 3+ competitors rank in top 20
- Mix of head, torso, and informational queries
- Sized to represent the broader category

This bucket is for relative comparison, not absolute targeting.

---

## Segmentation beyond buckets

Tag every tracked keyword on additional dimensions for filtering:

| Tag | Purpose |
| --- | --- |
| Topic or pillar | Group by editorial theme |
| Funnel stage | TOFU, MOFU, BOFU |
| Content type expected | Article, product page, calculator, etc. |
| Page mapped | Which URL is targeting this query |
| Country and language | For multi-market sites |
| Device | Desktop, mobile |
| SERP feature presence | Featured snippet, AI overview, video, etc. |

Tagging up front pays off when filtering reports later.

---

## Baselines

Capture the starting state on day one.

For each keyword, record:

- Current position
- Current SERP composition (top 10 domains, dominant content type, SERP features present)
- Current click-through rate at that position (from Search Console if available)
- Date of baseline

Baselines are the reference for measuring future movement. Without one, every dashboard is just current state.

---

## Alert thresholds

Not every position change deserves attention. Set thresholds that filter noise.

### Default thresholds

| Bucket | Alert if |
| --- | --- |
| Brand | Position drops below 1 for any tracked variant |
| Money | Position drops by 5+ places, or out of top 10 |
| Opportunity | Position rises into top 10 (positive alert), or drops past 30 |
| Competitor benchmark | Aggregate share-of-voice changes by 10%+ |

Adjust thresholds based on volatility of the niche. High-competition spaces need looser thresholds to reduce false alarms.

### Alert routing

- Brand alerts: notify SEO lead and brand manager immediately
- Money alerts: notify SEO lead within a daily digest
- Opportunity alerts: weekly summary
- Competitor alerts: monthly summary

---

## Workflow

1. **Define scope.** Target property, market, language, stakeholders.
2. **Pull starting data.** Existing ranked keywords, Search Console queries, competitor overlap.
3. **Build the tracked set.** 4 buckets, 200-500 total keywords for most properties.
4. **Segment with tags.** Topic, funnel stage, page mapped, etc.
5. **Configure tracking.** Set up Ahrefs Rank Tracker projects with tags and locations.
6. **Capture baseline.** Day-one positions and SERP composition.
7. **Define alert thresholds.** By bucket. Wire to notification system.
8. **Build the dashboard.** See `references/dashboard-template.md`.
9. **Set the cadence.** Weekly review of money + brand. Monthly review of all. Quarterly rebuild of opportunity bucket.
10. **Iterate.** Drop dead keywords. Add new ones. Recalibrate thresholds based on noise.

---

## Failure patterns

- **Tracking too many keywords.** A 5,000-keyword tracker is unreadable. Pick fewer, watch closer.
- **Tracking too few.** A 30-keyword tracker misses the picture. Most properties need 200-500.
- **No segmentation.** Untagged tracked keywords produce dashboards that cannot be filtered.
- **No baseline.** Without day-one snapshots, "did the campaign work" becomes unanswerable.
- **Alert fatigue.** Loose thresholds produce too many alerts. Stakeholders stop reading. Tighten.
- **Set and forget.** Tracked keyword sets need quarterly review. Opportunity moves. Money keywords shift.
- **Conflating position with traffic.** A position-1 keyword with no clicks is worse than a position-5 keyword with steady traffic. Layer in CTR and clicks data.
- **Single-device tracking on a mobile-dominant business.** Track the device that matches the audience.
- **Tracking aggregate position only.** Aggregate position averages can hide important movement in specific buckets. Always show by bucket.
- **Reporting absolute position without context.** "We are position 4" means nothing. "Up from position 11 over 60 days" means something.

---

## Output format

A rank tracking setup document with:

1. **Tracking charter.** Property, scope, stakeholders, cadence.
2. **Tracked keyword set.** All keywords with bucket and tag assignments.
3. **Baseline snapshot.** Position, SERP composition, CTR per keyword.
4. **Alert configuration.** Thresholds by bucket, routing.
5. **Dashboard layout.** What charts, what filters, what is visible.
6. **Review cadence.** Weekly, monthly, quarterly responsibilities.
7. **Methodology notes.** Country and device settings, refresh frequency, data caveats.

Plus a recurring rank report at the chosen cadence (typically weekly or monthly).

---

## Reference files

- `references/dashboard-template.md` - Template for the rank tracking dashboard layout, including the recurring report structure for weekly and monthly cadences.
