# Sample size tables

Pre-calculated sample size tables for the most common experimentation scenarios. These tables are starting points, not substitutes for running the math against your specific traffic and metric. The math depends on the variance of the metric, the desired power, the alpha threshold, and the test design (one-sided, two-sided, sequential).

Use these tables to:
- Sanity-check a sample size estimate from your platform's calculator
- Decide whether the planned test is feasible given your traffic
- Choose an MDE that is realistic for your traffic level

For exact figures, run the math through your platform's calculator (most experimentation platforms expose one) or use a stats library (`scipy.stats`, R's `pwr` package, or an online calculator).

---

## How to use these tables

Each table assumes:
- Two-sided test (the standard default for PM experiments)
- Alpha equals 0.05 (5 percent false positive rate)
- Power equals 0.80 (80 percent chance of detecting an effect that is really there)
- Equal group sizes (50/50 split)

Total sample size is the sum across both groups. Per-group sample is half the total.

If you change any of those assumptions, multiply by the indicated factor:
- Power 0.90 instead of 0.80: multiply sample size by ~1.34
- Alpha 0.01 instead of 0.05: multiply sample size by ~1.49
- One-sided test: multiply by ~0.79

Worked example for using Table 1: a product has a baseline conversion rate of 10 percent and wants to detect a 1 percent absolute lift (target 11 percent). Total sample size required is roughly 31,400 users. With 1,000 daily new users in the test population, the test needs about 31 days plus one full weekly cycle. If you can only run it for 14 days, the MDE you can detect at this traffic is closer to 1.5 percent absolute. Pick the change you can detect; do not run an underpowered test.

---

## Table 1: Conversion rate experiments

Total sample size required (across both groups) for a two-sided test, alpha 0.05, power 0.80.

| Baseline rate | MDE 1% abs | MDE 2% abs | MDE 5% abs | MDE 10% abs |
|---|---|---|---|---|
| 5% | 14,800 | 4,400 | 1,000 | 360 |
| 10% | 31,400 | 8,400 | 1,700 | 540 |
| 20% | 51,800 | 13,400 | 2,500 | 720 |
| 30% | 65,600 | 16,600 | 3,000 | 800 |
| 50% | 78,400 | 19,600 | 3,200 | 800 |

**Reading the table.** A product with 30 percent baseline conversion that wants to detect a 2 percent absolute lift (target 32 percent) needs ~16,600 users total, ~8,300 per group. Numbers are approximate and rounded.

**Choosing an MDE that matches traffic.** If you have 5,000 weekly users in the test population:
- One week of traffic supports detection of ~5 percent absolute lift on a 30 percent baseline (3,000 users, MDE 5 percent matches)
- Two weeks supports ~3 percent absolute lift
- Four weeks supports ~2 percent absolute lift
- Six weeks supports ~1.5 percent absolute lift

Beyond six weeks the test runs into seasonality and product-evolution problems described in [SKILL.md](../SKILL.md). If the change you want to test would only produce a 1 percent absolute lift and your traffic supports 5 percent MDE in a reasonable window, the test is not worth running. Pick a bigger change.

---

## Table 2: Mean comparison experiments (continuous metrics)

For continuous metrics like time-on-task, session length, page views per session, the math depends on the metric's standard deviation, which varies by product. The table below shows sample sizes assuming a coefficient of variation (standard deviation divided by mean) of 1.0, which is typical for engagement metrics.

| Baseline mean | MDE 5% rel | MDE 10% rel | MDE 20% rel |
|---|---|---|---|
| Any (CoV ~1.0) | 12,600 | 3,200 | 800 |
| Any (CoV ~2.0) | 50,400 | 12,600 | 3,200 |

For revenue metrics the CoV is often higher (2.0 to 3.0) because revenue is concentrated in a small fraction of users. Run your variance through the platform calculator before committing to a sample size; the table is illustrative, not authoritative.

---

## Common pitfalls in sample size planning

- **Forgetting to count exposure, not allocation.** If 1,000 users see the experiment per day but only 200 reach the surface where the variant is rendered, your effective sample is 200 per day. Use exposure counts, not bucketing counts.
- **Treating session-level and user-level differently.** Some metrics are evaluated per session (page views per session), others per user (day-7 retention). Sample size requirements differ. Specify which level the metric is evaluated at and use the matching count.
- **Forgetting variance reduction.** Methods like CUPED, stratified sampling, and control variates can reduce required sample size by 30 to 50 percent for the same power. If your platform supports them, use them. Sample size tables ignoring variance reduction overstate what you actually need.
- **Underestimating the weekly cycle requirement.** A test that hits sample size in three days still needs to run a full week to capture cycle effects. Sample size hit is necessary but not sufficient.
- **Assuming traffic is stable.** If a marketing campaign launches mid-test, the user mix changes and the test may no longer be a clean comparison. Coordinate with marketing before launching tests on user-acquisition-sensitive surfaces.

---

## When the math says "you cannot detect this"

Sometimes the table reads "you need 200,000 users to detect this lift and you have 5,000 a week." Three options:

1. **Accept a larger MDE.** Pick a bigger change worth detecting. A 3 percent absolute lift may be detectable in two weeks; a 0.3 percent lift may take a year. Test the bigger change.
2. **Find a more sensitive metric.** Sometimes the metric is the constraint, not the change. Switching from "purchases" to "add-to-cart" gives you a higher-frequency event with more sample. The trade-off is that ATC is less directly tied to revenue; pair the more-sensitive primary with a revenue guardrail.
3. **Skip the test.** If the change is small but cheap and reversible, ship without testing. If it is small and expensive to maintain, do not ship. Running an underpowered test produces noise dressed up as evidence; that is worse than no test.

The discipline is to refuse to run tests that cannot answer the question. An underpowered test is not "better than nothing"; it is worse than nothing because it produces a result that feels meaningful but is not.
