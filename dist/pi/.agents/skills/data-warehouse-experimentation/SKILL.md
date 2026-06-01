---
name: data-warehouse-experimentation
description: "Running experiments out of the data warehouse instead of via dedicated experiment platforms. SQL-based assignment, exposure logging discipline, metric definitions in dbt models, statistical analysis in SQL or Python, variance reduction with CUPED, sequential testing, and the operational tradeoffs vs platforms like Statsig and Optimizely. Triggers on warehouse-native experimentation, run experiments in BigQuery, run experiments in Snowflake, dbt experiments, SQL t-test, CUPED variance reduction, exposure log, sample ratio mismatch, sequential testing, mSPRT, doubly robust estimation, build vs buy experimentation. Also triggers when the team is choosing between platform and warehouse, building warehouse-native experiment infrastructure, auditing one, or running an experiment with a custom metric the platform cannot handle."
category: product
catalog_summary: "Run experiments out of the warehouse: SQL assignment, exposure logs, dbt metric definitions, statistical analysis, variance reduction with CUPED, sequential testing, and the operational tradeoffs vs platforms"
display_order: 9
---

# Data Warehouse Experimentation

A senior data scientist's playbook for running experiments natively out of BigQuery, Snowflake, or any modern data warehouse, with metric definitions in dbt and statistical analysis in SQL or Python.

Most companies that run experiments at scale use a dedicated platform. Statsig, Optimizely, LaunchDarkly with experimentation, PostHog, Amplitude Experiment. The platforms are good. They handle assignment, instrumentation, and analysis in one product, and the SQL-savvy data team does not have to reinvent the variance reduction wheel.

There is a different operational model that mature data teams increasingly choose: warehouse-native experimentation. Assignment happens in code or via feature flags. Exposure events fire to the warehouse like any other event. Metrics are defined as dbt models. Statistical analysis runs as SQL or in a Python notebook against warehouse data. The "experiment platform" is just your existing data stack.

This skill covers when warehouse-native is the right call, the architecture, and the specific techniques that make it work: assignment patterns, exposure logging discipline, metric definitions in dbt, t-tests and CUPED in SQL, sequential testing, and the pitfalls that take down homegrown setups.

When to use this skill: deciding between platform vs warehouse-native, building a warehouse-native experiment infrastructure, auditing an existing one, or running a specific experiment when the platform of record cannot handle a custom metric or segmentation.

---

## What this skill is for

This skill spans the operational execution model for warehouse-native experimentation. It does not replace the methodology and interpretation skills; it composes with them.

- `experiment-design` covers methodology: hypotheses, sample size, randomization unit, primary metric. Tool-agnostic. Read it first to design the experiment correctly regardless of where it runs.
- `experimentation-analytics` covers interpretation: confidence intervals, p-values, effect size, decision frameworks. Tool-agnostic. Read it when results land.
- `experimentation-platform-orchestrator` covers the platform-vs-warehouse decision in detail. Read it to decide whether to use a platform or this skill.
- `feature-flagging` covers assignment infrastructure when not running through a platform. Read it for the flag-management discipline that this skill assumes.
- This skill (`data-warehouse-experimentation`) covers the operational execution: SQL-based assignment, exposure logging, metric definitions in dbt, statistical analysis in SQL or Python, variance reduction, sequential testing.

The distinction is between "what to do" (the methodology and interpretation skills) and "how to do it without a vendor platform" (this skill). Read this skill after you have decided warehouse-native is the right call. If you are still deciding, start with `experimentation-platform-orchestrator`.

---

## When warehouse-native is the right call

Six factors push the decision toward warehouse-native.

1. **Cost at volume.** Platforms charge per MAU or per event. At 10K MAU the platform is cheap; at 1M MAU the bill becomes a real budget item. Warehouse-native runs on infrastructure you already pay for.
2. **Custom metrics.** If your primary metric is a complex business metric (revenue with refund-aware logic, cohort LTV, retention bracket, multi-event composites), platforms can struggle. Warehouse-native expresses any metric you can write in SQL.
3. **Custom segmentation.** Enterprise customers, account-tier crosscuts, complex behavioral segments. Platforms have segmentation features; the depth varies. dbt models compose without limit.
4. **Trust requirements.** Regulated industries (healthcare, finance, government) need full transparency into the math. Warehouse-native gives you every step of the calculation auditable in SQL.
5. **Existing data team strength.** If you have data engineers and data scientists, you have most of the infrastructure. Adding experimentation discipline on top costs less than adopting a new platform.
6. **Iteration on metric definitions.** Platforms ship metric updates on their own cadence. Warehouse-native iterates as fast as your dbt deployments.

Five factors push toward platform.

1. **Frontend visual experiments.** Optimizely's bread and butter. Variant code injected via a script tag, with WYSIWYG editing.
2. **Sub-week iteration speed.** Some platforms set up an experiment in 30 minutes; warehouse-native often takes a day or more for the first run of a new metric pattern.
3. **Teams without strong data infrastructure.** If you do not have a warehouse, dbt, and analysts, do not start with warehouse-native. The platform is the right call.
4. **Mobile experimentation.** SDK-based assignment with offline support is the platform's job, not the warehouse's.
5. **Out-of-the-box sequential testing with strict guarantees.** Statsig and Eppo ship mSPRT with calibrated alpha-spending. Building this in-house is real work.

Detail and a decision tree in [`references/warehouse-vs-platform-decision.md`](references/warehouse-vs-platform-decision.md). Many mature teams use both; warehouse-native for the hard cases, platform for fast iteration on standard experiments.

---

## The architecture

Four components, in order of data flow.

1. **Assignment.** How users get bucketed into variants. Hash function, feature flag, or randomized assignment table.
2. **Exposure logging.** A discrete event fired the first time a user is exposed to the experiment, written to the warehouse like any other event.
3. **Metric definitions.** SQL queries (or dbt models) that compute the primary and secondary metrics from warehouse events.
4. **Analysis.** Statistical computation in SQL or Python that joins exposure to metrics and produces effect estimates with confidence intervals.

The flow. User visits the product. Assignment determines the bucket (control or treatment). If the user is exposed to the variant (sees the treatment-specific behavior), an exposure event fires to the warehouse. The user takes actions, generating metric events to the same warehouse. At analysis time, exposure joins to metrics on the assignment unit (typically `user_id`); the analysis computes lift and produces a decision.

The exposure-event pattern is critical. Without it you can compute only an "intent-to-treat" analysis (everyone assigned, regardless of whether they saw the variant). With it you compute the "exposed" analysis on the population that actually experienced the variant. The latter is usually what you want, especially when the variant only affects a subset of the assigned users (e.g., users who reached a specific page).

---

## Assignment patterns

Three approaches.

**Deterministic hash assignment.** The default for warehouse-native.

```sql
MOD(ABS(FARM_FINGERPRINT(CONCAT(user_id, 'exp_button_color_v1'))), 100) < 50
```

The salt (`'exp_button_color_v1'`) ensures different experiments produce uncorrelated assignments for the same user. Reproducible (same input always produces the same bucket), no service dependency, salt isolation across experiments. The assignment can be computed inline in any SQL query.

**Feature flag assignment.** Rely on a feature flag service (LaunchDarkly, Statsig flags, Unleash, internal) to do bucketing; the warehouse just records the assignment that the flag service chose.

```sql
-- Read assignment from the flag service's logs
SELECT user_id, variant_id, assigned_at
FROM flag_service.assignments
WHERE flag_key = 'exp_button_color_v1'
```

This works when the flag service is the source of truth for assignment and the warehouse mirrors the assignment table. Useful when assignment must respect flag-service rules (e.g., percentage rollouts, targeting rules) that are inconvenient to replicate in SQL.

**Randomized assignment table.** Pre-randomize users into a table at experiment start.

```sql
CREATE TABLE exp_button_color_v1_assignments AS
SELECT
  user_id,
  CASE WHEN RAND() < 0.5 THEN 'control' ELSE 'treatment' END AS variant_id
FROM dim_users
WHERE eligible = true;
```

Less common; useful when the eligibility set is fixed at experiment start and you want assignment to be deterministic and explicit (e.g., for compliance audit). The downside: new users joining mid-experiment are not in the table; either skip them or fall back to hash assignment.

The deterministic hash approach is the default for warehouse-native because it requires no service dependency and produces stable, auditable assignments. Detail in [`references/assignment-and-exposure-patterns.md`](references/assignment-and-exposure-patterns.md).

---

## The exposure log

The single most important discipline in warehouse-native experimentation.

Required exposure event schema:

| Field | Type | Notes |
|---|---|---|
| `experiment_id` | string | Unique identifier per experiment. |
| `variant_id` | string | The variant the user was bucketed into. |
| `user_id` | string | The assignment unit. |
| `exposed_at` | timestamp | ISO 8601 UTC. The moment exposure fired. |
| `context_*` | various | Optional context properties: device, page, account_id. |

Fire exposure exactly when the user has seen the variant-specific behavior. Not at page load. Not at session start. Not at app open.

The "delayed exposure" trap. If the variant only matters at button click and you fire exposure at page load, every page-load user enters the analysis whether or not they ever saw the variant. The control group includes users who never reached the button; the treatment group does too. The analysis dilutes the real effect.

Worked example. The treatment shows a new pricing page; the control shows the old one. Fire exposure when the pricing page loads, not when the user lands on the homepage. Users who never reach the pricing page are not exposed to either variant; they should not be in the analysis.

The "always-fire" trap. Some implementations fire exposure on every variant-specific interaction. The user clicks the button five times; exposure fires five times. The exposure log is now five times larger than it should be, and analysis tools that count distinct user_ids in exposure handle this correctly while tools that count rows do not.

The discipline. Fire exactly one exposure event per user per experiment, at the moment of first variant-specific exposure. Use a deterministic flag in the client (or a server-side cache) to enforce single-fire. Detail in [`references/assignment-and-exposure-patterns.md`](references/assignment-and-exposure-patterns.md).

---

## Metric definitions in dbt models

Defining metrics as dbt models gives you four things.

1. **Version control on metric definitions.** Every change to a metric is a git commit. The history is queryable.
2. **Testability.** dbt tests on the metric output catch regressions.
3. **Composability.** The same `fct_orders` model feeds the board dashboard, the experiment analysis, and the executive report. Aligned definitions, no drift.
4. **Single source of truth.** When the experiment says X and the board says Y, the answer is in the dbt model, not in two unrelated SQL files.

Pattern.

```sql
-- models/experiments/exp_metrics_revenue.sql
SELECT
  user_id,
  SUM(CASE WHEN refunded THEN 0 ELSE amount_cents END) AS net_revenue_cents,
  MIN(occurred_at) AS first_purchase_at
FROM {{ ref('fct_orders') }}
WHERE occurred_at >= '{{ var("experiment_start") }}'
GROUP BY user_id
```

The experiment analysis joins this to the exposure log on `user_id` and computes group means.

The variance discipline. The same metric definition is used in board dashboards AND in experiment analysis. No "experiment-specific revenue calculation" that is slightly different. Otherwise you get the "the experiment said the revenue lifted but the board did not move" problem, which is almost always a metric-definition mismatch.

The namespace pattern. Use `exp_metrics_*` for experiment-shaped models that group by `user_id` and produce one row per user. Use `fct_*` for the underlying fact tables that feed both metric models and dashboards. Detail in [`references/metric-definitions-in-dbt.md`](references/metric-definitions-in-dbt.md).

---

## Statistical analysis in SQL

The basic two-sample Welch's t-test in SQL.

```sql
WITH metric_by_variant AS (
  SELECT
    e.variant_id,
    COUNT(*) AS n,
    AVG(m.net_revenue_cents) AS mean,
    VAR_SAMP(m.net_revenue_cents) AS variance
  FROM exposures e
  LEFT JOIN exp_metrics_revenue m USING (user_id)
  WHERE e.experiment_id = 'exp_button_color_v1'
  GROUP BY e.variant_id
)
SELECT
  control.mean AS control_mean,
  treatment.mean AS treatment_mean,
  treatment.mean - control.mean AS absolute_lift,
  (treatment.mean - control.mean) / NULLIF(control.mean, 0) AS relative_lift,
  -- Welch's t-statistic
  (treatment.mean - control.mean) /
    SQRT(treatment.variance / treatment.n + control.variance / control.n)
    AS t_statistic
FROM
  (SELECT * FROM metric_by_variant WHERE variant_id = 'control') control,
  (SELECT * FROM metric_by_variant WHERE variant_id = 'treatment') treatment
```

Convert the t-statistic to a p-value or confidence interval using a SQL function (BigQuery: a UDF; Snowflake: native or a stored procedure) or compute in Python on the result of the SQL query.

The SQL pattern is fine for simple t-tests on continuous metrics. For proportions tests, swap variance for `p * (1 - p)`. For non-parametric tests (Mann-Whitney), the SQL gets ugly fast; switch to Python.

Anything more complex than a simple t-test (CUPED, bootstrap, doubly robust estimation, sequential testing) is easier in Python. Use SQL for the SUM-and-AVG aggregations; ship the result to Python for the statistical math. Detail in [`references/statistical-analysis-templates.md`](references/statistical-analysis-templates.md).

---

## Statistical analysis in Python

The Python pattern, typically in a Jupyter or Hex notebook.

```python
import pandas as pd
import numpy as np
from scipy import stats

# Pull aggregated data from the warehouse
df = warehouse.query("""
  SELECT user_id, variant_id, net_revenue_cents
  FROM exp_results
  WHERE experiment_id = 'exp_button_color_v1'
""")

control = df[df.variant_id == 'control'].net_revenue_cents
treatment = df[df.variant_id == 'treatment'].net_revenue_cents

# Welch's t-test
t, p = stats.ttest_ind(treatment, control, equal_var=False)

# Confidence interval on the mean difference
diff = treatment.mean() - control.mean()
se = np.sqrt(treatment.var() / len(treatment) + control.var() / len(control))
ci_low, ci_high = diff - 1.96 * se, diff + 1.96 * se

print(f"Lift: {diff:.2f} cents (95% CI: [{ci_low:.2f}, {ci_high:.2f}])")
print(f"p-value: {p:.4f}")
```

Python gives you access to the full statistical ecosystem (`scipy`, `statsmodels`, `numpy`) for techniques SQL cannot easily express.

The notebook pattern. One notebook per experiment, parameterized by `experiment_id`. Version-controlled in git or as Hex projects. Each notebook produces a written-up decision document at the end, archived in a queryable repository (Notion, GitHub markdown, or a dedicated experiment-results table in the warehouse).

Detail and bootstrap templates in [`references/statistical-analysis-templates.md`](references/statistical-analysis-templates.md).

---

## Variance reduction: CUPED and beyond

The most powerful variance reduction technique for warehouse-native experimentation: **CUPED** (Controlled-experiment Using Pre-Experiment Data). Originally from Microsoft.

The intuition. If you can predict a user's metric behavior from pre-experiment data, you can subtract out that predicted variance, leaving a smaller residual to test on.

```python
# Pre-experiment metric for each user (e.g., last 28 days revenue)
pre = pre_period_revenue(user_id)

# Theta is the regression coefficient of the metric on the pre-period
theta = np.cov(metric, pre)[0, 1] / np.var(pre)

# Adjusted metric
adjusted_metric = metric - theta * (pre - pre.mean())
```

Run the t-test on the adjusted metric instead of the raw metric. The mean is preserved (CUPED does not change the point estimate) but the variance is smaller, so the confidence interval is narrower.

CUPED typically reduces variance by 30 to 50 percent on engagement metrics. That is equivalent to running an experiment 1.5x to 2x longer for the same statistical power. Worth the engineering investment for any team running 5+ experiments per quarter.

Other variance reduction techniques.

- **Stratification.** Slice the analysis by a pre-experiment covariate (segment, region, device) and pool the per-stratum estimates. Useful when the covariate is strongly predictive of the metric.
- **Regression adjustment.** Fit an OLS regression with covariates; the residual analysis has lower variance. Generalizes CUPED to multiple covariates.
- **Doubly robust estimation.** Combines outcome modeling and propensity-score weighting. Useful in observational and quasi-experimental settings where randomization was imperfect. Outside the scope of typical A/B tests; pointer to academic references in the variance-reduction reference file.

Detail with worked examples in [`references/variance-reduction-techniques.md`](references/variance-reduction-techniques.md).

---

## Pre-experiment power analysis

Before running, compute required sample size.

```python
from statsmodels.stats.power import tt_ind_solve_power

# Solve for sample size given desired MDE
n_per_arm = tt_ind_solve_power(
    effect_size=0.05,  # Cohen's d
    nobs1=None,
    alpha=0.05,
    power=0.8
)

# Or solve for MDE given sample size
mde = tt_ind_solve_power(
    effect_size=None,
    nobs1=8000,
    alpha=0.05,
    power=0.8
)
```

The "we need 10x more users than we thought" lesson. Most underpowered experiments come from optimistic effect-size assumptions. The team designs the experiment expecting a 10% lift; the actual effect is 1%, undetectable at the planned sample size; the experiment runs forever or stops with an inconclusive result.

The fix. Use the historical distribution of past experiments' observed effects to set realistic MDE expectations. If the median observed effect across the last 30 experiments is 0.5%, plan for a 0.5% MDE on new experiments. The optimism asymmetry is real; correcting it requires looking at the actual distribution of effects, not the wished-for distribution.

Detail in [`references/power-analysis-calculations.md`](references/power-analysis-calculations.md).

---

## Sequential testing patterns

The "peeking" problem. Looking at experiment results before completion inflates the false-positive rate. The naive solution is "do not peek." The practical solution is sequential testing methods that allow valid early stopping.

Three approaches.

- **mSPRT** (mixture Sequential Probability Ratio Test). Used by Optimizely and Statsig. Provides an always-valid p-value that survives peeking. Implementation in Python via `statsmodels` or custom code; not natively in SQL.
- **Always-Valid Inference** with confidence sequences. Howard et al. Confidence intervals that are valid at any sample size. Implementation requires careful Python; not for the data team that has not read the paper.
- **Group sequential designs** (O'Brien-Fleming boundaries). Pre-specified interim analysis points with calibrated alpha-spending. The classic frequentist approach.

For warehouse-native, the practical recommendation is mSPRT in Python. Document the alpha-spending function used. Train one team member on the math; do not rely on a black-box implementation.

The honest version. If you do not have someone on the team who understands sequential testing math, just do not peek. Pre-register sample size, run to completion, analyze once. Sequential testing is statistically correct only when implemented correctly; an incorrect implementation is worse than no peeking discipline at all.

Detail in [`references/sequential-testing-patterns.md`](references/sequential-testing-patterns.md).

---

## Common pitfalls

Eleven patterns recur in warehouse-native experimentation. Detail in [`references/common-pitfalls.md`](references/common-pitfalls.md).

- "Our exposure log fires at page load." Should fire when the variant-specific behavior is shown, not at page load. The "delayed exposure" trap dilutes the effect.
- "We see lift in control, not treatment." Assignment-hash collision or salt reuse. Audit the salt; check that different experiments produce different bucket assignments for the same user.
- "P-value is 0.04, we are shipping." Probably underpowered plus multiple comparisons plus peeking. Compute the test at the planned sample size only; correct for multiple secondary metrics.
- "Experiment shows 30% lift." Almost certainly a bug. Effects that big rarely exist; first action is to audit the exposure log and metric definitions before celebrating.
- "Treatment users are different." Sample ratio mismatch (SRM). The assignment hash is broken or the exposure log is biased. Check the SRM before computing any metric.
- "We cannot reproduce yesterday's number." Non-deterministic queries (window functions without explicit ORDER BY, sampling without a seed) or floating-point issues in aggregations. Make queries deterministic; document the random seed if any.
- "Custom metric definition disagrees with the board metric." Bad. Align them by using the same dbt model. Otherwise nobody trusts either number.
- "We never finished the experiment." Pre-register stop criteria; honor them. Experiments that drift indefinitely waste team time and produce ambiguous decisions.
- "iOS users converted 3x in treatment." Segment effect or instrumentation bug. Check if iOS instrumentation differs from the rest. Beware over-claiming on small segments.
- "It worked on phase 1, broke on phase 2." Simpson's paradox from cohort mix shift. The aggregate trend reverses when the underlying segments are weighted differently across phases.
- "Statistical significance but tiny effect." Large sample inflated power. The p-value is below 0.05 but the effect is 0.3%. Consider practical significance: is 0.3% worth shipping?

---

## The framework: 12 considerations for warehouse-native experimentation

When designing or running a warehouse-native experiment, walk these 12 considerations.

1. **Platform vs warehouse decision.** Cost, custom metrics, segmentation, trust, team strength. Read `experimentation-platform-orchestrator` if undecided.
2. **Assignment unit.** User, account, session, device. Pick once at experiment start and stick to it.
3. **Assignment salt.** Unique per experiment to prevent correlation with prior experiments. Document the salt convention.
4. **Exposure logging discipline.** Fire when the variant matters, not at page load. One exposure event per user per experiment.
5. **SRM check.** Sample ratio mismatch indicates assignment bugs. Check before computing any metric.
6. **Metric definition reuse.** Same dbt model for board and experiment. No experiment-specific calculations that drift from canonical metrics.
7. **Pre-experiment power analysis.** Realistic MDE based on the historical distribution of past observed effects.
8. **Variance reduction.** CUPED for engagement metrics. 30 to 50 percent variance reduction is worth the engineering for any team running 5+ experiments per quarter.
9. **Statistical method.** Welch's t-test as default. Bootstrap for skewed distributions. Doubly robust estimation for quasi-experiments.
10. **Sequential testing.** mSPRT or stop-at-N. Document alpha-spending. If you cannot implement correctly, do not peek.
11. **Multiple comparisons.** Bonferroni or Benjamini-Hochberg correction across secondary metrics.
12. **Decision documentation.** Write the result up. Archive in a queryable repository. The next experiment will benefit from the institutional memory.

The output of the framework is an experiment record. Pre-registered sample size and stop criteria, the assignment salt, the exposure log specification, the dbt metric model, the analysis notebook, and a written-up decision. The record lives in version control or in a dedicated experiment-tracking system; the analysis is reproducible from the record.

---

## Reference files

- [`references/warehouse-vs-platform-decision.md`](references/warehouse-vs-platform-decision.md) - When each operational model is the right call. Cost considerations at different scales. Hybrid patterns. Migration patterns.
- [`references/assignment-and-exposure-patterns.md`](references/assignment-and-exposure-patterns.md) - Hash assignment SQL templates for BigQuery and Snowflake. Salt naming conventions. Exposure event schema. SRM check SQL.
- [`references/metric-definitions-in-dbt.md`](references/metric-definitions-in-dbt.md) - dbt model patterns for experiment metrics. Reusing fct models. The exp_metrics namespace. Versioning.
- [`references/statistical-analysis-templates.md`](references/statistical-analysis-templates.md) - SQL and Python templates for Welch's t-test, proportions test, Mann-Whitney, bootstrap. Notebook structure.
- [`references/variance-reduction-techniques.md`](references/variance-reduction-techniques.md) - CUPED math and Python implementation with worked example. Stratification. Regression adjustment. Doubly robust estimation primer.
- [`references/power-analysis-calculations.md`](references/power-analysis-calculations.md) - MDE math. Sample size calculations. Calibrating effect-size assumptions from historical experiments.
- [`references/sequential-testing-patterns.md`](references/sequential-testing-patterns.md) - mSPRT, confidence sequences, group sequential designs. Honest framing on when to peek.
- [`references/common-pitfalls.md`](references/common-pitfalls.md) - Eleven failure patterns with diagnoses and fixes.

---

## Closing: the build-vs-buy decision is real

Warehouse-native experimentation is powerful but expensive in engineering time. A first-year experimentation team should almost always start with a platform; the platform handles 90 percent of cases and lets you focus on hypotheses, not infrastructure. The team that graduates to warehouse-native does so because their volume, custom metric needs, or trust requirements outgrew what platforms offer.

If you are building warehouse-native because "platforms cost too much" without first running the math: you are underestimating the cost of your team's engineering time. The platform fee that looks expensive on a procurement form is often cheaper than three months of a data engineer's time spent reinventing CUPED.

If you are building it because the platform cannot handle your specific needs: you are probably right and the investment will pay back. Platforms are general; your business is specific. The custom metric the platform cannot express is often the metric that matters most for your decisions.

Honest middle ground: many mature teams use both. The platform for fast iteration on standard experiments where time-to-result matters more than custom depth. Warehouse-native for the hard cases where the platform's metric library or segmentation cannot reach. The hybrid is operationally complex; document the rule for which experiments go where, and revisit annually.
