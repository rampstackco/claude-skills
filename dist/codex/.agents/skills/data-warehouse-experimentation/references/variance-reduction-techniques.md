# Variance reduction techniques

CUPED is the most powerful variance reduction technique for warehouse-native experimentation. Stratification, regression adjustment, and doubly robust estimation cover specific cases.

The principle. Variance reduction makes confidence intervals narrower at the same sample size. A 30 to 50 percent variance reduction (typical with CUPED on engagement metrics) is equivalent to running the experiment 1.5 to 2x longer for the same statistical power. Worth the engineering investment for any team running 5+ experiments per quarter.

---

## CUPED: the workhorse

**CUPED** stands for Controlled-experiment Using Pre-Experiment Data. Originally from Microsoft (Deng et al, 2013).

The intuition. If you can predict a user's metric behavior from pre-experiment data (their behavior before the experiment started), you can subtract that prediction from the metric, leaving a smaller residual to test on. The mean is preserved (CUPED does not change the point estimate of the lift), but the variance shrinks because predictable variance has been removed.

### The math

For each user, compute a pre-experiment covariate (e.g., revenue in the 28 days before the experiment started). Call this `pre_metric`. The CUPED-adjusted metric is:

```
adjusted_metric = metric - theta * (pre_metric - mean(pre_metric))
```

where `theta` is the regression coefficient of `metric` on `pre_metric`:

```
theta = cov(metric, pre_metric) / var(pre_metric)
```

Run the t-test on `adjusted_metric` instead of `metric`. The mean difference between treatment and control is preserved; the variance is reduced.

### Python implementation

```python
import pandas as pd
import numpy as np

# df has columns: user_id, variant_id, metric, pre_metric
df = warehouse.query("""
  SELECT
    e.user_id,
    e.variant_id,
    COALESCE(m.net_revenue_cents, 0) AS metric,
    COALESCE(p.pre_net_revenue_cents, 0) AS pre_metric
  FROM exposures e
  LEFT JOIN exp_metrics_revenue m USING (user_id)
  LEFT JOIN pre_experiment_revenue p USING (user_id)
  WHERE e.experiment_id = 'exp_button_color_v1'
""")

# Compute theta from the entire dataset (control and treatment combined)
theta = np.cov(df.metric, df.pre_metric)[0, 1] / np.var(df.pre_metric)

# CUPED-adjusted metric
df['adjusted_metric'] = df.metric - theta * (df.pre_metric - df.pre_metric.mean())

# Run t-test on the adjusted metric
from scipy import stats
control_adj   = df[df.variant_id == 'control'].adjusted_metric
treatment_adj = df[df.variant_id == 'treatment'].adjusted_metric
t_stat, p_value = stats.ttest_ind(treatment_adj, control_adj, equal_var=False)

# Compare to unadjusted variance
unadjusted_var = df.metric.var()
adjusted_var   = df.adjusted_metric.var()
variance_reduction = 1 - adjusted_var / unadjusted_var
print(f"Variance reduction: {variance_reduction:.1%}")
```

### When CUPED works well

- Engagement metrics with strong autocorrelation. Pre-experiment activity strongly predicts in-experiment activity.
- Revenue metrics on consumer products with repeat customers.
- Retention metrics where past retention predicts future retention.

### When CUPED works poorly

- New users (no pre-experiment data). They drop out of the analysis or are imputed.
- Metrics with weak temporal autocorrelation. The pre-period does not predict the in-period.
- Metrics that are zero for most users (highly skewed binary outcomes). The t-test's normal-distribution assumption fails; CUPED on top inherits the failure.

### Pre-experiment window length

A 28-day pre-experiment window is the typical default. Longer windows (60 to 90 days) capture more of the user's behavior pattern and may reduce variance more, but also reduce eligibility (users who joined within the window have no pre-period).

The discipline. Pre-register the pre-period length when designing the experiment. Do not change it after looking at results.

---

## Stratification

Slice the analysis by a pre-experiment covariate (segment, region, device) and pool the per-stratum estimates. Useful when the covariate is strongly predictive of the metric.

```python
# Stratify by device
strata = df.device_type.unique()
stratum_estimates = []
for s in strata:
    sub = df[df.device_type == s]
    diff = sub[sub.variant_id == 'treatment'].metric.mean() - sub[sub.variant_id == 'control'].metric.mean()
    stratum_estimates.append({
        'stratum': s,
        'n': len(sub),
        'diff': diff,
    })

# Pool: weighted average by stratum size
total_n = sum(s['n'] for s in stratum_estimates)
pooled_diff = sum(s['diff'] * s['n'] / total_n for s in stratum_estimates)
```

The variance of the pooled estimate is lower than the unpooled t-test when the strata have different baseline metrics (the across-stratum variance is removed).

The downside. Stratification by too many covariates produces small per-stratum samples, which inflates per-stratum variance. Use stratification on one or two strong predictors, not on every covariate available.

---

## Regression adjustment (covariate adjustment via OLS)

A generalization of CUPED to multiple covariates.

```python
import statsmodels.api as sm

# X: covariates (pre_metric, device_type encoded, region encoded)
X = pd.get_dummies(df[['pre_metric', 'device_type', 'region']], drop_first=True)
X['variant_treatment'] = (df.variant_id == 'treatment').astype(int)
X = sm.add_constant(X)
y = df.metric

# OLS regression
model = sm.OLS(y, X).fit()
print(model.summary())

# The coefficient on 'variant_treatment' is the adjusted effect estimate.
# Its standard error is typically smaller than the unadjusted t-test SE.
```

Regression adjustment is more flexible than CUPED but requires more care: collinearity among covariates, model misspecification, and overfitting on small samples are all possible failure modes.

For most warehouse-native experiments, CUPED with a single pre-period covariate is enough. Regression adjustment with multiple covariates is for edge cases.

---

## Doubly robust estimation

Useful in observational and quasi-experimental settings where randomization was imperfect (geo experiments, switchback designs, natural experiments).

The intuition. Combine an outcome model (predict the metric from covariates) with a propensity-score model (predict the probability of treatment from covariates). The combined estimator is unbiased if either of the two models is correct (hence "doubly robust estimation").

For the standard A/B test where assignment is random, doubly robust estimation does not help. The benefit is in observational settings where the assignment mechanism may be confounded.

The implementation requires `causalml`, `dowhy`, or a custom implementation. Outside the scope of the typical experiment notebook; pointer to the academic literature for full treatment.

References.

- Bang and Robins (2005), "Doubly Robust Estimation in Missing Data and Causal Inference Models."
- Funk et al. (2011), "Doubly Robust Estimation of Causal Effects."

---

## When to invest in variance reduction

Three signals.

1. **Running 5+ experiments per quarter.** The amortized engineering investment in CUPED pays back across many experiments.
2. **The team is power-constrained.** Experiments routinely run too long or hit inconclusive results because of insufficient sample size. CUPED extends the effective sample size by 30 to 50 percent.
3. **The team has data scientists who understand the math.** CUPED is straightforward but easy to implement incorrectly (theta computed on the wrong subset, pre-period window misaligned, regression diagnostics ignored). Without someone on the team who can audit the implementation, the variance reduction may not be real.

The order of investment. CUPED first; it is the highest ROI. Stratification second; useful for one or two strong predictors. Regression adjustment third; for edge cases where multiple covariates matter. Doubly robust estimation last; for genuine quasi-experiments.

---

## Common variance reduction mistakes

- **Computing theta on treatment data only.** Theta should be computed on the combined dataset (control plus treatment) for unbiased estimation. Computing on treatment alone re-introduces the bias CUPED is trying to remove.
- **Pre-period contamination.** The pre-period overlaps with the experiment period. Users in the experiment have already been exposed when their "pre-period" metric is measured. The pre-metric is not actually pre.
- **CUPED on heavily skewed binary metrics.** CUPED reduces variance but does not change the metric's distribution. A binary metric where 99 percent of users are 0 is still skewed after CUPED; the t-test is still misspecified.
- **Stratification on a post-experiment covariate.** The covariate must be measured before the experiment, otherwise the stratification creates selection bias. Use only pre-experiment covariates for stratification.
- **Forgetting to validate that variance actually decreased.** Run both adjusted and unadjusted analyses; verify the adjusted variance is smaller. If it is not, CUPED is not helping for this metric and pre-period.
