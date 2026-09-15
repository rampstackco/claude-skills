# Flag rollout strategies

Different launches deserve different rollout strategies. Match the strategy to the risk profile of the change. The five patterns below cover most cases; combine them when needed.

---

## Percentage rollout

The default for release flags. The flag advances through fixed percentage steps with a monitoring gate at each step.

Typical sequence:

| Step | Percentage | Hold time |
|---|---|---|
| 1 | 1% | At least one peak hour |
| 2 | 10% | At least 24 hours |
| 3 | 50% | At least 48 hours |
| 4 | 100% | Hold for 7 days before declaring complete |

Hold times are minimums. If the metric being watched takes longer than 24 hours to stabilize (retention, downstream conversion), extend the holds accordingly.

Abort criteria at each step:
- Error rate exceeds baseline by 10 percent.
- Latency p95 exceeds baseline by 20 percent.
- Primary success metric trends materially negative.
- Any P1 alert fires that traces back to the flag.

If any abort criterion fires, hold or roll back. Do not advance.

---

## Cohort rollout

For risky launches where the blast radius matters. Each cohort is a named segment; the flag advances through cohorts in sequence.

Typical sequence:

1. Internal employees only. Bugs surface from the team that can fix them quickly.
2. Beta customers (opt-in). Engaged users who tolerate roughness in exchange for early access.
3. Free-tier customers. Larger population; risk to revenue is bounded because they are unpaid.
4. Paid customers, smaller plans first. Tier-by-tier escalation.
5. Paid customers, enterprise. Last; highest revenue impact, lowest tolerance for issues.

Each cohort hold is at least one full business cycle (5-7 days). Compress only with strong upstream confidence (the change has already shipped through internal and beta with zero issues).

Abort criteria same as percentage rollout, plus: support ticket volume from the cohort exceeds baseline.

---

## Geo-staged rollout

Default for compliance-sensitive features (data residency, region-specific regulations, locale-specific UX). One region at a time.

Typical sequence:

1. Single test region (often the team's home region; US-East or EU-West for most products).
2. English-speaking regions (US, CA, UK, AU, NZ).
3. Western Europe (DE, FR, ES, IT, NL, etc.).
4. APAC (JP, SG, AU, etc.).
5. LATAM and remaining regions.

Hold per region depends on the product. For compliance features, hold long enough to detect any regulatory complaint or support escalation; for UX features, one full business cycle suffices.

Abort criteria same as cohort, plus: any region-specific regulatory escalation. Compliance issues are non-negotiable rollback triggers.

---

## Time-based rollout

Scheduled flips at known times. Useful for marketing-coordinated launches where the toggle has to fire at a specific moment (a press release, a partner co-launch, a planned downtime window).

Pattern:

1. The flag has a `time > $LAUNCH_TIMESTAMP` condition.
2. Internal QA confirms the timestamp is correct in the platform UI.
3. The launch hour arrives; the flag flips automatically.
4. The team monitors the same metrics as a percentage rollout but at the full population from minute one.

Watch the timezone. Coordinate the timestamp explicitly: midnight Eastern is not midnight UTC; "Friday at 9 AM" is ambiguous across timezones. Use UTC in the rule and let the platform UI display in the user's local time.

Avoid time-based rollouts:
- On weekends, unless weekend on-call exists.
- On major holidays, unless the launch is the holiday itself (rare).
- Overlapping with other major launches or known marketing campaigns; the metrics get confounded.

---

## Combination strategies

The strategies above compose. Common combinations:

**Percentage within cohort.** "Roll out to 50 percent of beta customers, then ramp to 100 percent of beta, then start the cohort rollout to free tier." Useful when the blast radius matters even within a single cohort.

**Geo within percentage.** "Roll out to 1 percent of users in US-East only, then 10 percent of US-East, then expand to other regions." Useful when geo isolation is important for incident containment.

**Time-based gated by cohort.** "At time T, the flag turns on, but only for the beta cohort. The rollout to other cohorts happens later." Useful when the public announcement matters but the broader rollout should still be cautious.

---

## Worked example: checkout redesign launch

A team is launching a redesigned checkout flow. The change is high-risk (revenue surface, complex code, third-party payment integrations).

Rollout plan:

| Day | Stage | Rule | Hold | Watch |
|---|---|---|---|---|
| 1 | Internal | `user.email_domain == "yourcompany.com"` | 24 hours | Bug reports from team |
| 2-4 | Internal extended | Same | 72 hours | Conversion, error rate |
| 5 | Beta | `user.beta_opted_in == true` | 24 hours | Conversion, error rate, support |
| 6-8 | Beta extended | Same | 72 hours | Conversion, primary funnel metrics |
| 9 | Production 1% | `rollout 1% of all users` | 24 hours (must include peak) | Full alerting |
| 10 | Production 10% | `rollout 10%` | 24 hours | Full alerting |
| 11 | Production 50% | `rollout 50%` | 48 hours | Full alerting |
| 13 | Production 100% | `rollout 100%` | 7 days | Full alerting |
| 20 | Launch declared complete | Same rule | n/a | 30-day review scheduled |
| 50 | 30-day review | Same rule | n/a | Decide on flag removal |
| 60-80 | Flag removal PR | Code path consolidated | n/a | n/a |

Abort criteria at every stage:
- Checkout completion rate drops more than 1 percent absolute.
- Payment failure rate increases at all.
- Error rate (any 5xx) increases by more than 10 percent.
- Support ticket volume on checkout increases.

Total time from launch to flag-removed: about 80 days. The work to remove the flag at day 60-80 is part of the launch plan, not an afterthought.

---

## When to compress

The cadences above are conservative defaults. Compress only with strong upstream confidence:

- The change has already shipped behind a feature flag for an extended period (release-as-experiment-as-release).
- The blast radius is genuinely small (an internal admin tool, a low-traffic settings page).
- A previous similar launch went through the full cadence with zero issues, and the new launch is structurally analogous.

Even with strong confidence, do not skip the production 1 percent stage. The first 1 percent in production is the only stage where production-specific issues (real user agents, real network conditions, real account distributions) surface.

---

## When to extend

Extend the cadence when:

- The metric being watched is slow (retention measured at day-7 or day-30 cannot be observed at a 24-hour hold).
- The change involves a third party (payment processor, email provider, analytics vendor) whose behavior under load is unknown.
- The team is new to flag rollouts and benefits from the slower pace as a learning exercise.

Extension is cheaper than incident response. Conservative defaults are correct defaults.
