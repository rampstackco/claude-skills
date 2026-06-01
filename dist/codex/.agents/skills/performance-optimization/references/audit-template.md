# Performance Audit Report

A fillable template for documenting a web performance audit. Fill every section. Empty sections signal an incomplete audit.

The output is the report. The report is what the team acts on. Weak reports produce no fixes.

---

## Audit metadata

**Site / app:** [Name and URL]
**Pages audited:** [List the specific URLs, not "the site"]
**Audit date:** [YYYY-MM-DD]
**Auditor:** [Name]
**Devices and conditions tested:**
- Mobile: [Device class, network throttling]
- Desktop: [Network throttling]
- Geographies: [If multi-region tested]
**Tools used:** [Lighthouse, WebPageTest, Chrome DevTools, real-user data source, etc.]

---

## Executive summary

Three to five sentences. Anyone reading only this section should know:

1. The overall state of performance.
2. Whether the site passes Core Web Vitals at the 75th percentile.
3. The single biggest issue and what it costs.
4. The recommended next move.
5. Estimated effort and impact for the top fix.

> [Summary]

---

## Core Web Vitals scorecard

Use field data (CrUX, RUM) where available. Lab data (Lighthouse) is a fallback and a diagnostic, not a final verdict.

| Metric | Target (good) | Mobile p75 | Desktop p75 | Status |
|---|---|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | | | Pass / Needs work / Fail |
| INP (Interaction to Next Paint) | < 200ms | | | Pass / Needs work / Fail |
| CLS (Cumulative Layout Shift) | < 0.1 | | | Pass / Needs work / Fail |
| TTFB (Time to First Byte) | < 800ms | | | Pass / Needs work / Fail |
| FCP (First Contentful Paint) | < 1.8s | | | Pass / Needs work / Fail |

### Trend

- [ ] Improving over the past 28 days
- [ ] Stable
- [ ] Regressing

### Field data source

[CrUX history, Search Console, Sentry, RUM tool. Note the date range and traffic volume that the data covers.]

---

## Page-level findings

For each audited page, fill out:

### Page: [URL or template name]

**Type:** [Marketing / product / app shell / API-driven]
**Traffic share:** [Rough % of site traffic]
**Field metrics (if available):**
- LCP p75:
- INP p75:
- CLS p75:

#### Lab metrics (Lighthouse mobile, slow 4G)

- Performance score:
- LCP:
- INP (or TBT as proxy):
- CLS:
- Total page weight:
- Total requests:
- JS payload (parsed):

#### Top issues on this page

| # | Issue | Impact metric | Severity | Effort |
|---|---|---|---|---|
| 1 | | LCP / INP / CLS / TTFB | High / Med / Low | S / M / L |
| 2 | | | | |
| 3 | | | | |

(Repeat the page block for each audited page.)

---

## Cross-cutting findings

Issues that affect many pages or the whole site. Often higher leverage than per-page fixes.

### Asset pipeline

- [ ] Images served in modern formats (WebP, AVIF)?
- [ ] Images served at appropriate sizes (responsive `srcset`)?
- [ ] Critical above-the-fold images preloaded?
- [ ] Below-the-fold images lazy-loaded?
- [ ] Video uses `preload="none"` or poster image until interaction?
- [ ] Fonts subsetted, woff2, `font-display: swap` (or `optional` for stable layout)?
- [ ] Self-hosted vs third-party fonts considered?

### JavaScript

- [ ] Bundle size budget defined?
- [ ] Code splitting per route?
- [ ] Third-party scripts inventoried, justified, and budgeted?
- [ ] Unused JavaScript flagged (Coverage tab in DevTools)?
- [ ] Long tasks (>50ms) inventoried?

### CSS

- [ ] Render-blocking CSS minimized?
- [ ] Critical CSS inlined for above-the-fold?
- [ ] Unused CSS flagged?

### Server / network

- [ ] HTTPS, HTTP/2 or HTTP/3 enabled?
- [ ] Compression (Brotli or gzip) enabled for text assets?
- [ ] Cache headers correct for static assets (long max-age, immutable)?
- [ ] CDN in front of origin?
- [ ] Origin response time (TTFB) measured and acceptable?

### Layout stability

- [ ] Images and embeds have explicit `width` and `height` (or `aspect-ratio`)?
- [ ] No layout shift from late-loading fonts?
- [ ] No layout shift from injected ads or banners?

### Interactivity

- [ ] Main-thread blocking under 200ms p75?
- [ ] Heavy listeners debounced or moved off main thread?
- [ ] Hydration cost measured (for SSR / partially hydrated frameworks)?

### Third-party scripts

| Vendor | Purpose | Bytes | Main-thread cost | Necessary? |
|---|---|---|---|---|
| | | | | |
| | | | | |

---

## Recommendations

Prioritized action list. Each item is concrete, owned, and sized.

### Now (this week)

| # | Recommendation | Owner | Estimated impact | Effort |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |

### Next (this sprint or month)

| # | Recommendation | Owner | Estimated impact | Effort |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |

### Later (this quarter or beyond)

| # | Recommendation | Owner | Estimated impact | Effort |
|---|---|---|---|---|
| 1 | | | | |

---

## Monitoring and re-test plan

- **Re-test cadence:** [When will the audit be re-run?]
- **Field data tracking:** [Where will Core Web Vitals be tracked over time? CrUX dashboard, RUM tool, Search Console.]
- **Performance budget:** [Define and link the budget. Example: LCP under 2.0s p75 mobile, JS payload under 200KB compressed per route.]
- **Alert thresholds:** [When does someone get paged?]
- **Owner of ongoing performance:** [Person or team]

---

## Open questions

- [ ] [Question]
- [ ] [Question]
- [ ] [Question]

---

## Appendix: methodology

- **Lab tests run:** [Tool, settings, run count]
- **Field data window:** [Date range, traffic volume]
- **Throttling profile:** [Slow 4G, Fast 3G, etc.]
- **Geographies tested:** [List]
- **Caveats:** [Anything that limits the audit's confidence, e.g., no field data, low traffic, single-page sample]
