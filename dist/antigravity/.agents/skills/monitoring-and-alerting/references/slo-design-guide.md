# SLO Design Guide

A walkthrough for designing Service Level Objectives that are useful, achievable, and aligned to user experience.

---

## What an SLO is and isn't

A Service Level Objective is a target for reliability, expressed as a percentage of "good" events out of all events, measured over a specific time window.

An SLO is:
- A reliability target the team commits to
- Measured automatically
- Tied to user-visible behavior
- Reviewed and adjusted over time

An SLO is not:
- A guarantee (that's an SLA, which has contractual consequences)
- A goal to maximize (100% is the wrong target)
- A vanity metric (uptime alone tells you almost nothing)
- Permanent (revise as the system evolves)

---

## The structure of a good SLO

Every SLO has four components:

1. **The thing being measured (the SLI - Service Level Indicator)**
2. **The success criterion (what counts as "good")**
3. **The target (the percentage of events that should be "good")**
4. **The window (the time period over which to measure)**

Example:

> "99.9% of homepage requests return a 2xx status code in under 2 seconds, measured over a rolling 30-day window."

Breaking it down:
- SLI: latency and status of homepage requests
- Good event: 2xx response in under 2 seconds
- Target: 99.9%
- Window: rolling 30 days

If the system serves 1 million homepage requests in 30 days, this SLO allows 1,000 bad events. That's the error budget.

---

## Picking SLIs

The SLI is what you measure. Pick SLIs that reflect what users actually experience.

### Good SLI categories

**Availability:** the proportion of valid requests that succeed.
- "% of HTTP requests that return non-5xx"
- "% of API calls that complete without error"

**Latency:** the proportion of requests that complete fast enough.
- "% of homepage requests with TTFB under 600ms"
- "% of search queries returning results in under 1 second"

**Quality:** the proportion of requests that produce correct results.
- "% of recommendations served from the personalized model (vs fallback)"
- "% of search queries returning at least one result"

**Freshness:** the proportion of data that's fresh enough.
- "% of cached pages updated within the last 24 hours"
- "% of analytics data ingested within 15 minutes of event"

**Throughput:** the proportion of time the system handles required load.
- "% of minutes during which queue depth was below 1000"

### Bad SLI patterns

**CPU or memory utilization.** These are causes of problems, not symptoms users feel. Don't make them SLIs.

**Number of incidents.** Too coarse. One nasty incident can blow it for the whole window.

**Average response time.** Averages hide tail latency. P95 or P99 is closer to user experience.

**Internal metrics that don't map to user impact.** "Database replica lag." Useful to monitor. Not a great SLO unless it directly affects users.

---

## Picking targets

Target percentages have specific implications. Here's the practical math:

| Target | Allowed bad time per 30 days | Allowed bad events per million |
|---|---|---|
| 90% | 3 days | 100,000 |
| 99% | 7 hours, 18 minutes | 10,000 |
| 99.9% | 43 minutes, 30 seconds | 1,000 |
| 99.95% | 21 minutes, 48 seconds | 500 |
| 99.99% | 4 minutes, 22 seconds | 100 |
| 99.999% | 26 seconds | 10 |

Each "9" added is roughly 10x harder. Pick the lowest target that's acceptable to users.

### How to pick

1. **Look at current performance.** What's the system actually achieving? Use that as the floor.
2. **Look at user expectations.** What do users tolerate? For a marketing site, occasional slow pages are fine. For a payment system, they're not.
3. **Look at competitive bar.** What do similar services achieve?
4. **Pick something achievable but slightly aspirational.** If the current achievement is 99.5%, set the SLO at 99.7%. Don't jump to 99.99%.

### Common mistakes

**Setting the SLO at 100%.** Impossible. Wastes infrastructure. Creates false promises.

**Setting the SLO based on what marketing wants to advertise.** If marketing says "99.99% uptime!" but engineering can't deliver, the SLO is fiction.

**Setting different SLOs for different teams without coordination.** End-to-end user experience depends on all of them. If one team has a 99.9% SLO and another has 99%, the combined experience is worse than either.

---

## Picking windows

The window affects how SLOs feel.

**Calendar windows:** "99.9% in March." Resets at month boundaries. Good for reporting, bad for operating (the budget can be exhausted on March 1 with nothing you can do until April).

**Rolling windows:** "99.9% over the last 30 days." Always current. Better for operations because the budget continuously updates.

Common windows:
- 7 days: too short, noise dominates
- 28-30 days (rolling): the sweet spot for most operations
- 90 days: better for SLAs and stability assessment, worse for fast feedback

For most teams: 30-day rolling.

---

## Error budgets

The error budget is `1 - SLO`. If your SLO is 99.9%, your error budget is 0.1%.

The budget is what allows for change. Every release, every config change, every dependency update consumes some budget. The budget exists so the team can ship.

### Error budget policy

A written policy that says what happens when the budget is at different levels. Example:

| Budget remaining | What's allowed |
|---|---|
| > 50% | Normal operation. Ship features, run experiments. |
| 25-50% | Caution. Postpone risky migrations. Prefer smaller releases. |
| 10-25% | Slow down. Only ship reliability fixes and security patches. Defer feature releases. |
| < 10% | Freeze. No non-urgent changes. Focus on reliability. |

This is the operationally useful part of SLOs. It connects reliability to product velocity in a measurable way.

### Burning the budget

If the budget burns at a rate of, say, 10% in an hour, that's a fast burn. Alert on fast burns: "we'll exhaust the budget in 4 hours at this rate."

Slow burn alerts catch sustained low-grade issues. Fast burn alerts catch acute incidents.

### Refilling the budget

The budget refills as the rolling window moves forward. If today is the last day of a bad month, tomorrow the worst day rolls off and the budget recovers slightly.

Don't "make up" budget by tightening the SLO temporarily. SLOs are user-facing commitments. Don't move them to make numbers look better.

---

## Multi-tier SLOs

For complex systems, one SLO isn't enough. Multi-tier SLOs cover different aspects.

A typical web app might have:

1. **Availability SLO:** 99.95% of requests return non-5xx.
2. **Latency SLO:** 99% of requests complete in under 1 second.
3. **Critical flow SLO:** 99.9% of checkout flows complete successfully.

Each has its own error budget and policy.

For products with multiple tiers of importance, you can also have different SLOs per tier:

- Critical pages (homepage, checkout): 99.95%
- Standard pages (product, category): 99.9%
- Long-tail pages (search, archive): 99%

This reflects user impact: a slow checkout matters more than a slow archive page.

---

## Reviewing and revising SLOs

SLOs aren't set-and-forget. Review:

- **Quarterly:** is the SLO still right? Has the system or user expectation changed?
- **After major incidents:** did the SLO catch it? Should the SLO be tighter?
- **After major launches:** did the new feature change the math?
- **Annually:** big-picture review of all SLOs.

Common revisions:
- Tightening (e.g., 99.9% → 99.95%) when the system has improved and the team can sustain it
- Loosening (e.g., 99.95% → 99.9%) when the previous target was too aggressive (rare, requires justification)
- Splitting an SLO into multiple (e.g., one combined SLO becomes separate availability and latency SLOs)
- Retiring SLOs that no longer reflect what matters

---

## Example: a marketing site

For a typical marketing site:

| SLO | Target | Window |
|---|---|---|
| Homepage availability (2xx response) | 99.9% | 30-day rolling |
| Homepage latency (TTFB < 800ms) | 95% | 30-day rolling |
| Form submission success | 99.5% | 30-day rolling |
| Critical-page availability (top 10 pages 2xx) | 99.9% | 30-day rolling |

Error budget policy:
- Above 50% budget: ship freely
- 10-50% budget: defer risky changes
- Below 10%: freeze non-essential changes

This is a reasonable starting point. Tune based on actual operating history.

---

## Example: a SaaS product

For a SaaS product with paying customers:

| SLO | Target | Window |
|---|---|---|
| API availability (non-5xx) | 99.95% | 30-day rolling |
| API latency (p95 under 500ms) | 99% | 30-day rolling |
| Login success | 99.99% | 30-day rolling |
| Critical action success (e.g., save data) | 99.95% | 30-day rolling |
| Background job completion within 1 hour | 99% | 7-day rolling |

Error budget policy is stricter (paying customers have higher expectations). Below 25% budget triggers a slowdown; below 10% triggers a freeze with executive approval needed to override.

---

## When you don't have an SLO yet

Start small. Pick one SLO that maps to the most important user-facing behavior. Live with it for a quarter. Add more once the team is comfortable.

Trying to roll out 10 SLOs at once usually fails. Trying to roll out 1 SLO and using it well usually succeeds.
