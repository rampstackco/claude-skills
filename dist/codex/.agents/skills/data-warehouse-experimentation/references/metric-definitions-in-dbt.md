# Metric definitions in dbt

dbt model patterns for experiment metrics. Reusing fct models. The exp_metrics namespace. Versioning. Aligning with board metrics.

The principle. Define experiment metrics as dbt models so they are version-controlled, testable, and aligned with board metrics. The same source of truth for both surfaces eliminates the "experiment said X but the board says Y" problem.

---

## The namespace pattern

Three layers in a typical dbt project.

- `stg_*`: staging models. Light cleanup of source data. One per source table.
- `fct_*` and `dim_*`: marts models. Business-logic transformations. Joined and enriched data ready for consumption.
- `exp_metrics_*`: experiment-shaped models. One row per assignment unit (typically `user_id`) with the metrics needed for analysis.

Example structure.

```
models/
  staging/
    stg_orders.sql
    stg_users.sql
    stg_events.sql
  marts/
    fct_orders.sql
    fct_sessions.sql
    dim_users.sql
  experiments/
    exp_metrics_revenue.sql
    exp_metrics_engagement.sql
    exp_metrics_retention.sql
```

The `fct_*` models feed both the board dashboard and the experiment metrics. The `exp_metrics_*` models pivot to one row per user with the metrics joined or aggregated.

---

## Pattern 1: revenue metric

```sql
-- models/experiments/exp_metrics_revenue.sql
{{ config(materialized='table') }}

WITH order_data AS (
  SELECT
    user_id,
    occurred_at,
    amount_cents,
    refunded
  FROM {{ ref('fct_orders') }}
  WHERE occurred_at >= '{{ var("experiment_start") }}'
    AND occurred_at < '{{ var("experiment_end") }}'
)
SELECT
  user_id,
  SUM(CASE WHEN refunded THEN 0 ELSE amount_cents END) AS net_revenue_cents,
  SUM(amount_cents) AS gross_revenue_cents,
  COUNT(*) AS order_count,
  MIN(occurred_at) AS first_order_at
FROM order_data
GROUP BY user_id;
```

Note the `var()` references for experiment start and end dates. The variables come from the dbt project's variables file or are passed at run time.

The same `fct_orders` model feeds the board's revenue dashboard. Aligned definitions.

---

## Pattern 2: engagement metric

```sql
-- models/experiments/exp_metrics_engagement.sql
{{ config(materialized='table') }}

WITH event_data AS (
  SELECT
    user_id,
    occurred_at,
    event_name
  FROM {{ ref('fct_events') }}
  WHERE occurred_at >= '{{ var("experiment_start") }}'
    AND occurred_at < '{{ var("experiment_end") }}'
    AND event_name IN ('content_created', 'content_edited', 'content_shared')
)
SELECT
  user_id,
  COUNT(*) AS engagement_event_count,
  COUNT(DISTINCT DATE(occurred_at)) AS active_day_count,
  SUM(CASE WHEN event_name = 'content_shared' THEN 1 ELSE 0 END) AS shares_count
FROM event_data
GROUP BY user_id;
```

The metric definition specifies exactly which events count as engagement. The board's "weekly active users" dashboard uses the same event filter via the same `fct_events` model.

---

## Pattern 3: retention metric (bracket retention)

```sql
-- models/experiments/exp_metrics_retention_w2.sql
{{ config(materialized='table') }}

WITH user_first_activity AS (
  SELECT user_id, MIN(occurred_at) AS first_active_at
  FROM {{ ref('fct_events') }}
  WHERE occurred_at >= '{{ var("experiment_start") }}'
  GROUP BY user_id
),
week2_activity AS (
  SELECT DISTINCT u.user_id
  FROM user_first_activity u
  JOIN {{ ref('fct_events') }} e ON e.user_id = u.user_id
  WHERE e.occurred_at >= u.first_active_at + INTERVAL '7 days'
    AND e.occurred_at <  u.first_active_at + INTERVAL '14 days'
)
SELECT
  u.user_id,
  CASE WHEN w2.user_id IS NOT NULL THEN 1 ELSE 0 END AS retained_w2
FROM user_first_activity u
LEFT JOIN week2_activity w2 USING (user_id);
```

Bracket retention (week 2 = days 7 to 13 from first activity) is more stable than N-day retention. The metric is binary: 1 if retained, 0 if not.

---

## Pattern 4: ratio metric (delta method required)

Some metrics are ratios (conversion rate, click-through rate). They require the delta method for correct variance estimation.

```sql
-- models/experiments/exp_metrics_conversion.sql
{{ config(materialized='table') }}

SELECT
  user_id,
  COUNT(*) AS impressions,
  SUM(CASE WHEN converted THEN 1 ELSE 0 END) AS conversions
FROM {{ ref('fct_funnel_events') }}
WHERE occurred_at >= '{{ var("experiment_start") }}'
  AND occurred_at <  '{{ var("experiment_end") }}'
GROUP BY user_id;
```

The model produces numerator and denominator per user. The analysis layer (Python) computes the ratio and applies the delta method for variance.

```python
# Per-user numerator and denominator
df = warehouse.query("SELECT * FROM exp_metrics_conversion")

# Group means
control = df[df.variant_id == 'control']
treatment = df[df.variant_id == 'treatment']

# Conversion rate per group
control_rate = control.conversions.sum() / control.impressions.sum()
treatment_rate = treatment.conversions.sum() / treatment.impressions.sum()

# Delta method variance (skipping the math here; see statistical-analysis-templates.md)
# ...
```

Do not compute the ratio per user and average it. That undercounts heavy users; the delta method is the correct treatment.

---

## Versioning metric definitions

Same versioning pattern as elsewhere. When the metric definition changes meaningfully, append `_v2`.

```
exp_metrics_revenue.sql       <- v1, fires alongside v2 during transition
exp_metrics_revenue_v2.sql    <- new semantics
```

The transition is the same: ship v2 alongside v1, migrate experiments to v2 over 90 days, deprecate v1.

dbt's built-in versioning (the `models:` config with `versions:`) is also useful here; lets you serve both versions from the same model name with explicit version selection.

---

## Aligning experiment metrics with board metrics

The variance discipline. The same dbt model feeds both surfaces.

If the board reports "monthly revenue" by summing `amount_cents` from `fct_orders` and excluding refunded orders, the experiment's revenue metric does the same. No special "experiment revenue" calculation that subtly differs.

The mechanism. Both the board dashboard's SQL and the `exp_metrics_revenue` model reference the same `fct_orders` table with the same filters. dbt tests verify the table contains the expected rows.

The check. When an experiment lands and the team reports "revenue lifted 5 percent in treatment," the team can pull the same numbers from the board and compare. If the board's revenue is flat or the experiment's lift is much larger than the board's revenue trend, the metric definitions disagree somewhere. Investigate.

---

## Testing experiment metrics

dbt tests on the metric models catch regressions.

```yaml
# models/experiments/_experiments.yml
version: 2

models:
  - name: exp_metrics_revenue
    columns:
      - name: user_id
        tests:
          - not_null
          - unique
      - name: net_revenue_cents
        tests:
          - not_null
          - dbt_utils.expression_is_true:
              expression: ">= 0"
```

The `unique` test on `user_id` confirms the model produces one row per user (no accidental duplicates from a bad join). The `>= 0` test confirms revenue is non-negative (refunds are subtracted, never additive).

---

## Common metric-definition mistakes

- **Drift between board and experiment.** "Experiment revenue" is computed differently from "board revenue." Align via shared dbt models.
- **Wrong time window.** The experiment runs for 14 days but the metric model includes 30 days of data. The control and treatment numbers are similar because the variant signal is diluted.
- **One row per event instead of one row per user.** Joining the metric to exposure on `user_id` produces a row explosion. Always aggregate to one row per user before joining.
- **Forgetting to handle nulls.** Users with no activity should appear with metric = 0, not be missing from the model. Use `LEFT JOIN` from exposure or include all eligible users in the metric model.
- **Non-deterministic queries.** Window functions without explicit `ORDER BY`, sampling without a random seed. The same query produces different numbers on different days.
