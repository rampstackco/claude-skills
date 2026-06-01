# Statistical analysis templates

SQL and Python templates for the most common warehouse-native analyses. t-test, proportions test, Mann-Whitney, bootstrap. Plus the recommended notebook structure.

---

## Welch's t-test (continuous metrics)

The default for continuous metrics where group variances may differ.

### SQL

```sql
WITH joined AS (
  SELECT e.variant_id, m.net_revenue_cents
  FROM exposures e
  LEFT JOIN exp_metrics_revenue m USING (user_id)
  WHERE e.experiment_id = 'exp_button_color_v1'
),
metric_by_variant AS (
  SELECT
    variant_id,
    COUNT(*) AS n,
    AVG(COALESCE(net_revenue_cents, 0)) AS mean,
    VAR_SAMP(COALESCE(net_revenue_cents, 0)) AS variance
  FROM joined
  GROUP BY variant_id
)
SELECT
  control.mean   AS control_mean,
  treatment.mean AS treatment_mean,
  treatment.mean - control.mean AS absolute_lift,
  (treatment.mean - control.mean) / NULLIF(control.mean, 0) AS relative_lift,
  -- Welch's t-statistic
  (treatment.mean - control.mean) /
    SQRT(treatment.variance / treatment.n + control.variance / control.n)
    AS t_statistic,
  -- Standard error of the mean difference
  SQRT(treatment.variance / treatment.n + control.variance / control.n)
    AS se,
  control.n   AS control_n,
  treatment.n AS treatment_n
FROM
  (SELECT * FROM metric_by_variant WHERE variant_id = 'control')   control,
  (SELECT * FROM metric_by_variant WHERE variant_id = 'treatment') treatment;
```

The query returns the t-statistic and standard error. Convert to p-value and confidence interval via a UDF or in Python.

### Python

```python
import pandas as pd
from scipy import stats
import numpy as np

df = warehouse.query("""
  SELECT e.variant_id, COALESCE(m.net_revenue_cents, 0) AS metric
  FROM exposures e
  LEFT JOIN exp_metrics_revenue m USING (user_id)
  WHERE e.experiment_id = 'exp_button_color_v1'
""")

control   = df[df.variant_id == 'control'].metric
treatment = df[df.variant_id == 'treatment'].metric

t_stat, p_value = stats.ttest_ind(treatment, control, equal_var=False)

# 95 percent confidence interval on the mean difference
diff = treatment.mean() - control.mean()
se = np.sqrt(treatment.var() / len(treatment) + control.var() / len(control))
ci_low, ci_high = diff - 1.96 * se, diff + 1.96 * se

print(f"Lift: {diff:.2f} (95% CI: [{ci_low:.2f}, {ci_high:.2f}])")
print(f"t = {t_stat:.3f}, p = {p_value:.4f}")
```

---

## Proportions test (binary metrics)

For binary outcomes (converted vs not, retained vs not).

### Python

```python
from statsmodels.stats.proportion import proportions_ztest, proportion_confint

# Counts and totals per variant
control_conv  = 1240
control_n     = 25000
treatment_conv = 1390
treatment_n    = 25000

# Z-test
z_stat, p_value = proportions_ztest(
    [control_conv, treatment_conv],
    [control_n, treatment_n]
)

# Confidence intervals on each proportion
control_ci   = proportion_confint(control_conv, control_n, method='wilson')
treatment_ci = proportion_confint(treatment_conv, treatment_n, method='wilson')

# Lift
control_rate   = control_conv / control_n
treatment_rate = treatment_conv / treatment_n
relative_lift  = (treatment_rate - control_rate) / control_rate

print(f"Control: {control_rate:.4f}, CI: {control_ci}")
print(f"Treatment: {treatment_rate:.4f}, CI: {treatment_ci}")
print(f"Relative lift: {relative_lift:.2%}")
print(f"z = {z_stat:.3f}, p = {p_value:.4f}")
```

The Wilson score interval is more accurate than the normal approximation for small samples or extreme proportions.

---

## Mann-Whitney U test (non-parametric)

For metrics with skewed distributions (revenue, time-on-site) where the t-test's normal-distribution assumption is violated.

```python
from scipy.stats import mannwhitneyu

control   = df[df.variant_id == 'control'].metric
treatment = df[df.variant_id == 'treatment'].metric

u_stat, p_value = mannwhitneyu(treatment, control, alternative='two-sided')

# Mann-Whitney tests stochastic dominance, not the mean.
# Report median lift alongside.
median_lift = treatment.median() - control.median()
print(f"Median lift: {median_lift:.2f}")
print(f"U = {u_stat:.0f}, p = {p_value:.4f}")
```

The Mann-Whitney U test is the standard non-parametric alternative. Use when the metric distribution is skewed and the t-test's assumption fails.

---

## Bootstrap confidence interval

For metrics where the analytic distribution is unclear or unusual (e.g., retention bracket, complex composite metrics).

```python
import numpy as np

def bootstrap_ci(treatment, control, n_iterations=10000, alpha=0.05):
    diffs = []
    for _ in range(n_iterations):
        t_sample = treatment.sample(n=len(treatment), replace=True)
        c_sample = control.sample(n=len(control), replace=True)
        diffs.append(t_sample.mean() - c_sample.mean())
    diffs = np.array(diffs)
    return np.quantile(diffs, [alpha / 2, 1 - alpha / 2])

ci_low, ci_high = bootstrap_ci(treatment, control)
diff = treatment.mean() - control.mean()
print(f"Lift: {diff:.2f} (95% CI: [{ci_low:.2f}, {ci_high:.2f}])")
```

10,000 bootstrap iterations is the standard. More iterations produce tighter intervals at the cost of compute time.

---

## Notebook structure

The recommended structure for an experiment analysis notebook.

### Cell 1: parameters

```python
EXPERIMENT_ID = 'exp_button_color_v1'
EXPERIMENT_START = '2026-04-01'
EXPERIMENT_END   = '2026-04-15'
PRIMARY_METRIC   = 'net_revenue_cents'
SECONDARY_METRICS = ['order_count', 'session_count']
ALPHA = 0.05
```

Parameters at the top. Parametrize the notebook so the same template runs for any experiment.

### Cell 2: SRM check

```python
df_exposures = warehouse.query(f"""
  SELECT variant_id, COUNT(*) AS n
  FROM exposures
  WHERE experiment_id = '{EXPERIMENT_ID}'
  GROUP BY variant_id
""")

# Chi-squared test against expected ratio
from scipy.stats import chi2_contingency
observed = df_exposures.n.values
expected = [observed.sum() / len(observed)] * len(observed)
chi2, p, _, _ = chi2_contingency([observed, expected])
assert p > 0.01, f"SRM detected (p = {p:.4f}). Aborting analysis."
print(f"SRM check passed (p = {p:.4f})")
```

Abort the notebook if SRM is detected. Do not proceed to metric analysis with broken assignment.

### Cell 3: pull data

```python
df = warehouse.query(f"""
  SELECT
    e.variant_id,
    e.user_id,
    COALESCE(m.{PRIMARY_METRIC}, 0) AS metric
  FROM exposures e
  LEFT JOIN exp_metrics_revenue m USING (user_id)
  WHERE e.experiment_id = '{EXPERIMENT_ID}'
""")
```

### Cell 4: primary analysis

t-test, proportions test, or bootstrap depending on the metric.

### Cell 5: secondary metrics

Loop over secondary metrics; apply Bonferroni correction for multiple comparisons.

### Cell 6: written-up decision

A markdown cell with the conclusion. Ship, kill, or inconclusive. Include the lift, the CI, the p-value, the SRM result, and any caveats. This cell is the deliverable.

---

## Common analysis mistakes

- **No SRM check.** Analyzing an experiment with broken assignment produces meaningless numbers.
- **Equal-variance t-test on unequal-variance data.** Use Welch's (`equal_var=False`) by default.
- **t-test on heavily skewed metrics.** Use bootstrap or Mann-Whitney instead.
- **Per-user ratios for ratio metrics.** Heavy users get under-weighted. Use the delta method.
- **Multiple secondary metrics without correction.** With 5 secondary metrics at alpha 0.05, expect a 25 percent chance of a false positive somewhere. Bonferroni or BH correction.
- **Stop-on-significance peeking.** Inflates the false-positive rate. Either pre-register the sample size or use a sequential testing method correctly.
