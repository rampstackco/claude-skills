# Diagnosis checklist

A layer-by-layer checklist for diagnosing organic traffic changes. Use it after the symptom is confirmed real and you need to narrow root cause.

---

## Layer 1: Confirm the change is real

### Pulls

- Search Console clicks and impressions (last 90 days, day-by-day)
- Analytics organic sessions (matching window)
- Year-over-year same-period comparison
- Bot or crawler traffic if filterable

### Checks

- [ ] Date range comparison is apples to apples
- [ ] No tracking outage in analytics during the window
- [ ] No tag manager deploys during the window
- [ ] Search Console clicks and analytics organic sessions move together (within 10-20%)
- [ ] Year-over-year shows the same pattern (rules out seasonality)
- [ ] No major holiday or industry event explains the change

If clicks and sessions diverge significantly: the issue may be tracking, not traffic.
If year-over-year shows the same pattern: the change is seasonal, not anomalous.

---

## Layer 2: Localize the change

### Pulls

- Search Console: clicks segmented by country, device, query type, page
- Analytics: organic sessions segmented by landing page, country, device

### Checks for each segment

- [ ] One country dropped, others stable: local algorithm or geo issue
- [ ] One device dropped, others stable: device-specific issue
- [ ] One section dropped, others stable: section-specific quality or technical issue
- [ ] Branded queries dropped: brand-level issue
- [ ] Non-branded dropped: SEO ranking issue
- [ ] Single page dropped: page-level issue
- [ ] Everything dropped: sitewide issue

### Decision

Pick the dominant pattern. Carry the most affected segment into Layer 3.

---

## Layer 3: Page-level analysis

For each affected page or page cluster:

### Pulls

- Ahrefs: ranked keywords with current and historical positions
- Ahrefs: SERP overview for top 5-10 ranked keywords (current and from before the drop)
- Search Console: queries, impressions, clicks, position, CTR for each affected page
- Analytics: landing page sessions, conversion rate, bounce rate
- Index status in Search Console
- Recent edits to the page (CMS history)
- Internal links pointing to the page (Ahrefs Site Explorer)
- Backlinks to the page (Ahrefs)

### Checks

- [ ] Did position drop, or did position stay flat with CTR drop?
- [ ] Did the SERP composition change (new AI overviews, featured snippet steal, more ads, more video)?
- [ ] Are click-through rates lower than benchmarks for the position?
- [ ] Has the page been recently edited (intentionally or accidentally)?
- [ ] Has the page lost backlinks?
- [ ] Have internal links to the page decreased?
- [ ] Is the page indexed?

### Interpretation

| Pattern | Cause |
| --- | --- |
| Position fell, SERP same | Quality, freshness, or competitor improved |
| Position stable, CTR fell | SERP feature change (snippet, AI overview, ads) |
| Position fell, SERP added new strong domain | Competitor took share |
| Position fell after a CMS edit | Recent edit broke something |
| Page deindexed | Technical issue (robots, canonical, noindex) |
| Backlinks fell | Link-based ranking signal decline |
| Internal links fell | Internal link equity dilution |

---

## Layer 4: Technical analysis

### Pulls

- Robots.txt (current and historical via web archive if needed)
- Canonical tag check on affected pages
- Meta robots tag check on affected pages
- Redirect map for any URL changes
- HTTP status codes for affected URLs
- Sitemap freshness
- Hreflang implementation (multilingual sites)
- Server logs (Googlebot crawl behavior)
- Recent deploy log
- Recent infrastructure changes (CDN, DNS, hosting)

### Checks

- [ ] Robots.txt has not blocked anything new
- [ ] No accidental `noindex` on affected pages
- [ ] No accidental canonical to a different URL
- [ ] Redirects resolve in 1 hop with 301 status
- [ ] No 4xx or 5xx spikes for affected URLs
- [ ] Sitemap includes affected URLs and is current
- [ ] Hreflang is reciprocal and points to live URLs (multilingual)
- [ ] Googlebot is crawling at normal rates
- [ ] No deploy date matches the traffic drop date

### Common technical regressions

| Symptom | Likely cause |
| --- | --- |
| Sudden full-site drop after a deploy | Robots.txt blocked everything, accidental sitewide noindex, or routing broke |
| Pages return 404 or 410 | URL structure changed, redirects missing |
| Pages return 5xx | Server or hosting issue, possible CDN misconfiguration |
| Render mismatch | JS rendering broke for crawlers (especially with framework upgrades) |
| Hreflang broken | Cross-country traffic falls but other markets shift |
| Mass canonical change | Pages canonicalized to wrong URLs after redesign |

---

## Layer 5: External analysis

### Pulls

- Algorithm update calendar (cross-reference traffic change date)
- Ahrefs SERP overview for affected keywords (looking for new ranking domains)
- Ahrefs competitor traffic estimates (their gain may be your loss)
- Search Console security and manual actions
- Backlink velocity changes (sudden gains or losses)
- News or industry trend search interest

### Checks

- [ ] No manual action notice in Search Console
- [ ] Drop date does not align with a known algorithm update
- [ ] No competitor has visibly taken share on affected keywords
- [ ] Industry-wide search demand for the topic has not shifted
- [ ] No spike in suspicious backlinks (negative SEO signal)
- [ ] No negative news or PR event affecting the brand

### If layers 1-4 are clean

- Drop on a known update date is likely algorithmic. Audit content quality and E-E-A-T signals. Recovery often takes the next update cycle.
- Drop with new dominant SERP domain is likely a competitive shift. Audit their content and update yours.
- Drop with industry-wide demand decline is not your fault. Manage stakeholder expectations.

---

## Hypothesis statement template

After working through the layers, state the hypothesis as a single sentence:

```
[Property] lost [magnitude] organic traffic starting [date]
because [root cause],
evidenced by [specific data points],
and recovery requires [specific actions]
with an expected timeline of [duration].
```

Examples:

> Site organic clicks dropped 35% starting March 12 because a deploy on March 11 added an accidental `noindex` meta tag sitewide, evidenced by Search Console coverage going from 2,400 indexed pages to 180 in 14 days, and recovery requires removing the noindex tag and resubmitting the sitemap with an expected timeline of 4-8 weeks.

> Blog section organic clicks dropped 22% starting August 8 because Google rolled out a core update on that date that emphasizes E-E-A-T signals our author bylines lacked, evidenced by position drops on informational queries while transactional queries held, and recovery requires adding author E-E-A-T signals and improving content depth with an expected timeline of 1-2 update cycles (3-6 months).

---

## When the diagnosis is unclear

Sometimes the data points in multiple directions. In that case:

1. State the top 2 hypotheses with evidence for each.
2. Recommend the lowest-risk action that helps in either case.
3. Identify the data that would distinguish the hypotheses.
4. Propose a monitoring plan to gather that data.

Avoid forcing a clean conclusion when the evidence does not support one. Stakeholders prefer honest uncertainty to confident-but-wrong.

---

## Communication template

When delivering the diagnosis to stakeholders:

```
**What happened:** [1 sentence]

**Why it happened:** [1 sentence]

**What we are doing:** [3-5 specific actions]

**When to expect recovery:** [timeline with confidence level]

**What to watch for:** [leading indicators of recovery or further decline]
```

Stakeholders rarely want the layer-by-layer detail. They want clarity, accountability, and timeline. Keep the full diagnosis as an appendix.
