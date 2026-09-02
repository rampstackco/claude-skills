# Power analysis calculations

Pre-experiment power analysis. MDE math. Sample size calculations. Calibrating effect-size assumptions from historical experiments.

The principle. Most underpowered experiments come from optimistic effect-size assumptions. The team designs the experiment expecting a 10 percent lift; the actual effect is 1 percent, undetectable at the planned sample size; the experiment runs forever or stops with an inconclusive result. Power analysis prevents this by forcing a concrete decision about how big the lift needs to be before the experiment starts.

---

## The four parameters

Power analysis ties together four numbers. Fix any three; the fourth is determined.

1. **Effect size (or MDE, minimum detectable effect).** The smallest lift the experiment can reliably detect. Expressed as a relative percentage, an absolute difference, or Cohen's d (effect size in standard deviations).
2. **Sample size per arm.** Number of users in each variant.
3. **Alpha (significance level).** Default 0.05. The false-positive rate.
4. **Power.** Default 0.8. One minus the false-negative rate. The probability of detecting a real effect.

The standard practice. Fix alpha at 0.05, power at 0.8, decide on either the MDE (and solve for sample size) or the sample size (and solve for MDE).

---

## Solving for sample size given MDE

```python
from statsmodels.stats.power import tt_ind_solve_power

# Continuous metric, two-sample t-test
# Cohen's d = (mean_treatment - mean_control) / pooled_std

cohens_d = 0.05  # 5 percent of one standard deviation

n_per_arm = tt_ind_solve_power(
    effect_size=cohens_d,
    nobs1=None,
    alpha=0.05,
    power=0.8,
    ratio=1.0  # equal sample sizes per arm
)
print(f"Required sample size per arm: {n_per_arm:.0f}")
```

For a Cohen's d of 0.05 (small effect), expect roughly 6,300 users per arm. For 0.1 (still small), roughly 1,600 per arm. For 0.2 (medium), roughly 400 per arm.

### Solving for proportions

```python
from statsmodels.stats.power import zt_ind_solve_power

# Binary metric, proportions test
# baseline conversion rate = 5 percent; target lift = 5 percent relative
baseline_p = 0.05
relative_lift = 0.05
treatment_p = baseline_p * (1 + relative_lift)

# Cohen's h for proportions
import numpy as np
def cohens_h(p1, p2):
    return 2 * np.arcsin(np.sqrt(p1)) - 2 * np.arcsin(np.sqrt(p2))

h = cohens_h(treatment_p, baseline_p)

n_per_arm = zt_ind_solve_power(
    effect_size=h,
    nobs1=None,
    alpha=0.05,
    power=0.8
)
print(f"Required sample size per arm: {n_per_arm:.0f}")
```

For a 5 percent relative lift on a 5 percent baseline conversion rate, expect roughly 60,000 users per arm. Small relative lifts on small baselines need very large samples.

---

## Solving for MDE given sample size

The reverse calculation. Given the available sample (e.g., 8,000 users per arm), what is the smallest effect the experiment can detect?

```python
from statsmodels.stats.power import tt_ind_solve_power

mde_cohens_d = tt_ind_solve_power(
    effect_size=None,
    nobs1=8000,
    alpha=0.05,
    power=0.8,
    ratio=1.0
)
print(f"MDE in Cohen's d: {mde_cohens_d:.4f}")

# Convert to relative MDE assuming the metric's standard deviation
metric_std = 50.0  # in cents, for example
metric_mean = 200.0
mde_absolute = mde_cohens_d * metric_std
mde_relative = mde_absolute / metric_mean
print(f"MDE absolute: {mde_absolute:.2f}")
print(f"MDE relative: {mde_relative:.2%}")
```

If the available sample yields an MDE of 8 percent and the team expects only a 2 percent lift, the experiment is underpowered. Either secure more sample (run longer or expand the audience) or accept that the experiment will produce an inconclusive result.

---

## Calibrating effect-size assumptions from historical experiments

The most common power-analysis mistake is over-optimistic effect-size estimates. Three patterns help calibrate.

### Pattern 1: pull the historical distribution

For the last 30 (or however many) experiments, pull the observed lifts. Compute the median, 25th percentile, and 75th percentile.

```python
df = warehouse.query("""
  SELECT experiment_id, observed_relative_lift
  FROM experiment_results
  WHERE shipped = true
  ORDER BY ended_at DESC
  LIMIT 30
""")

print(f"Median observed lift: {df.observed_relative_lift.median():.2%}")
print(f"P25: {df.observed_relative_lift.quantile(0.25):.2%}")
print(f"P75: {df.observed_relative_lift.quantile(0.75):.2%}")
```

The median observed lift is the realistic expectation for the next experiment. If past experiments show a median lift of 1 percent, planning for a 5 percent lift on the next experiment is optimistic.

### Pattern 2: stratify by experiment type

Pricing experiments often produce larger lifts than UI experiments. Onboarding experiments often produce larger lifts than feature-discovery experiments. Pull the distribution by experiment type to set type-specific expectations.

### Pattern 3: ask the team about prior experiments they remember

The "we usually see X" estimate from team members is anchored on memorable experiments (the wins, the disasters). Compare against the actual distribution; the memorable estimate is usually too high.

The honest conversation. "Our last 30 experiments had a median observed lift of 0.5 percent. We are planning this experiment for a 5 percent MDE. Either the experiment is going to produce an inconclusive result, or we are expecting an unusually large effect. Which is it?"

---

## When the math says "we cannot run this"

Three escalation paths when the available sample is insufficient.

1. **Run longer.** The default. If the experiment needs 60,000 users per arm and you have 10,000 per week, plan for a 6-week run. Document the duration before starting.
2. **Expand the audience.** If the experiment is targeting only paid users (10 percent of the user base), consider running on all users. The result is generalizable to a broader population, but the intervention may need to work for the broader population too.
3. **Accept inconclusive.** Some experiments cannot be powered with the available sample. Document the MDE; design the experiment to detect a larger effect or accept that it will be inconclusive. The discipline of saying "we cannot reliably answer this with our sample" is hard but honest.

---

## The underpowered-experiment cost

A team running 12 experiments per quarter, 4 of which are underpowered. The cost.

- Underpowered experiments produce inconclusive results. The team learns nothing.
- Engineering and design effort spent on the experiment is wasted.
- Stakeholders treat inconclusive as "no effect"; later experiments that would have shown the same effect at a larger sample also produce inconclusive, reinforcing the false belief that no effect exists.
- The team's experimentation discipline degrades because the visible track record looks bad.

Power analysis at the design stage prevents most of this. The cost is 30 minutes of work; the benefit is avoiding multi-week runs of experiments that cannot answer the question.

---

## Common power-analysis mistakes

- **Optimistic effect-size assumption.** Plan for a 10 percent lift; observe a 1 percent lift. The experiment is 100x underpowered.
- **Forgetting variance from the historical metric.** Power calculations use Cohen's d, which depends on the metric's standard deviation. A high-variance metric requires a larger sample for the same MDE than a low-variance metric.
- **Computing power on aggregate when the assignment unit is something else.** If the assignment unit is user but the metric is per-event, the per-event variance includes within-user correlation. Use the user-level variance for the calculation.
- **Skipping the calculation for "small" experiments.** "We will just see what happens" is the path to a quarter of inconclusive experiments.
- **Confusing statistical significance with practical significance.** A p-value below 0.05 with a 0.3 percent effect on a 100,000-user experiment is statistically significant but may not be worth shipping. Use the MDE as the practical-significance threshold; a 0.3 percent effect is below most teams' MDE.
