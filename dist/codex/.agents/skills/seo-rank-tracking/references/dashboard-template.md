# Rank tracking dashboard template

A template for the rank tracking dashboard and the recurring weekly and monthly rank reports.

---

## Dashboard layout principle

The dashboard should answer three questions in order:

1. **Are we okay?** (brand and money buckets)
2. **Are we growing?** (opportunity bucket)
3. **How do we compare?** (competitor benchmark bucket)

Anything that does not serve those three questions is clutter.

---

## Section 1: Brand health (top of dashboard)

Single panel. Status indicator. Should be glanceable.

Display:

- Position 1 status across all brand variants (count: e.g., "27 of 30 variants at position 1")
- Any brand variant not at position 1, listed below the status

Alert color coding:

- Green: all brand variants at position 1
- Yellow: 1-3 variants below position 1
- Red: 4+ variants below position 1, or any branded query showing competitor in top 3

---

## Section 2: Money keyword health

The keystone section. Show:

### Headline metric

- Average position across all money keywords (current vs 30 days ago vs 90 days ago)
- Count of money keywords in top 3, top 10, top 20, beyond

### Movement table

Top 10 movers (positive and negative) over the chosen window:

| Keyword | Bucket | Current position | Change | Page mapped |
| --- | --- | --- | --- | --- |
| [keyword] | Money | 4 | +6 | /products/[slug] |

### Distribution chart

Stacked bar showing how many money keywords are at each position band:

- Top 3
- Positions 4-10
- Positions 11-20
- Positions 21-50
- Beyond 50 or unranked

Track this distribution over time. Improving SEO shifts the distribution upward.

---

## Section 3: Opportunity progress

The growth section.

### Headline metric

- Count of opportunity keywords that broke into top 10 over the chosen window
- Count that fell out of opportunity range (past 30 or to top 10)
- Net opportunity bucket size (with quarterly refresh)

### Top breakthroughs

Keywords that crossed from positions 11-30 into top 10:

| Keyword | Previous position | Current position | Page mapped | Likely cause |
| --- | --- | --- | --- | --- |
| [keyword] | 14 | 7 | /guides/[slug] | Refresh shipped 30 days ago |

### Top regressions

Keywords moving the wrong way:

| Keyword | Previous position | Current position | Page mapped | Likely cause |
| --- | --- | --- | --- | --- |

---

## Section 4: Competitor benchmark

### Share of voice

Aggregate position-weighted share of voice across the benchmark keyword set:

| Property | SOV (current) | SOV (90 days ago) | Change |
| --- | --- | --- | --- |
| [Target] | 18% | 14% | +4 |
| [Competitor A] | 22% | 23% | -1 |
| [Competitor B] | 15% | 16% | -1 |
| [Competitor C] | 12% | 10% | +2 |

### Head-to-head

For top 20 strategic head terms, show position for target and each competitor side by side.

---

## Section 5: SERP feature awareness

Dashboard should call attention to SERP composition changes.

Track:

- Featured snippets owned by target (count, change)
- AI overviews appearing on target's tracked queries (count, change)
- Featured snippets owned by competitors on tracked queries
- New SERP feature types appearing (video carousels, image packs, etc.)

A position-1 ranking that loses its featured snippet can lose 30%+ clicks while position stays the same.

---

## Section 6: Filters

The dashboard must be filterable by:

- Bucket (brand, money, opportunity, benchmark)
- Topic or pillar tag
- Funnel stage tag
- Country and language
- Device
- Page mapped (URL)

Filters let stakeholders drill from "the dashboard" to "my section".

---

## Weekly report template

The weekly report is for the SEO team and immediate stakeholders.

```
# Weekly rank report: [property]
**Week of:** [date range]
**Prepared:** [date]

## Brand health

[Green/Yellow/Red indicator]
[1-2 sentences. Anything not at position 1.]

## Money keyword movement

- Average position: [N] (vs [N] last week, [N] 90 days ago)
- Top 3 count: [N] (vs [N] last week)
- Top 10 count: [N] (vs [N] last week)

### Notable gainers

| Keyword | Previous | Current | Change |
| --- | --- | --- | --- |

### Notable decliners

| Keyword | Previous | Current | Change |
| --- | --- | --- | --- |

## Opportunity progress

- Breakthroughs to top 10: [N]
- Regressions out of opportunity range: [N]

## Alerts triggered this week

| Date | Keyword | Bucket | Alert | Action taken |
| --- | --- | --- | --- | --- |

## Hypothesis or call-out

[1-2 sentences on the most interesting movement and what it suggests.]
```

Length: 1 page. Readable in 3 minutes.

---

## Monthly report template

The monthly report is for broader stakeholders. Add narrative.

```
# Monthly rank report: [property]
**Month:** [month]
**Prepared:** [date]

## Headline

[1 paragraph. State of organic visibility.]

## Brand and money keywords

- Brand health: [status, with any concerns]
- Money keyword distribution: [chart description, key shifts]
- Notable wins: [bullet list]
- Notable concerns: [bullet list]

## Opportunity progress

- Breakthroughs to top 10 this month: [N]
- Quarterly target progress: [N of target N]
- Top opportunities watched

## Competitive landscape

- Share of voice: [target % vs competitor set]
- Notable competitor movement
- New SERP features observed

## Themes for the month

[3-5 themes from the data. Each is 1 paragraph.]

## Recommendations for next month

[Specific actions with owners and expected outcomes.]

## Methodology

- Tracking set: [N] keywords across [N] buckets
- Country: [list]
- Device: [list]
- Last refresh: [date]
- Data caveats: [list]
```

Length: 4-8 pages.

---

## Quarterly rebuild

Every 90 days, audit the tracked set itself.

### Rebuild checklist

- [ ] Brand bucket: any new product names, brand variants, or PR-driven query patterns?
- [ ] Money bucket: any keywords no longer aligned with current product or content focus?
- [ ] Money bucket: any new high-value queries identified by analytics or Search Console?
- [ ] Opportunity bucket: rebuild from current page 2-3 rankings; remove keywords that broke into top 10 (move to money) or fell past 30 (drop)
- [ ] Benchmark bucket: still representative of competitive landscape?
- [ ] Tags: any new pillars or topics that need tagging?
- [ ] Alert thresholds: too noisy? too quiet? recalibrate
- [ ] Reporting cadence: still useful at this frequency?

Document the rebuild in a short changelog so historical comparisons remain interpretable.

---

## Common dashboard pitfalls

- **Single big number.** "Average position" alone hides bucket-level signal.
- **No trend lines.** Current state without trend is half the picture.
- **No segmentation visible.** A dashboard that cannot be filtered cannot answer follow-up questions.
- **Showing every keyword.** Stakeholders cannot read 500 rows. Show distributions and movers.
- **Hiding SERP features.** Feature changes cause invisible click drops. Always show them.
- **Showing only target, not competitors.** Movement is meaningless without context.
- **Static data.** A rank dashboard updated monthly is too slow for fast-moving niches. Match refresh to volatility.
- **No annotations.** Mark deploy dates, content launches, and known algorithm updates on charts so movement has context.
