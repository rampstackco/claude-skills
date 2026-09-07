# Assignment and exposure patterns

Hash assignment SQL templates. Salt naming conventions. Exposure event schema. The delayed-exposure trap. Sample ratio mismatch (SRM) check.

---

## Hash assignment SQL templates

### BigQuery

```sql
-- 50/50 split for experiment exp_button_color_v1
SELECT
  user_id,
  CASE
    WHEN MOD(ABS(FARM_FINGERPRINT(CONCAT(user_id, 'exp_button_color_v1'))), 100) < 50
      THEN 'control'
    ELSE 'treatment'
  END AS variant_id
FROM dim_users;
```

### Snowflake

```sql
-- 50/50 split using SHA1 hash and modulo
SELECT
  user_id,
  CASE
    WHEN MOD(ABS(HASH(CONCAT(user_id, 'exp_button_color_v1'))), 100) < 50
      THEN 'control'
    ELSE 'treatment'
  END AS variant_id
FROM dim_users;
```

### Postgres

```sql
-- 50/50 split using md5 hash; convert hex to integer
SELECT
  user_id,
  CASE
    WHEN ('x' || SUBSTRING(MD5(user_id || 'exp_button_color_v1'), 1, 8))::bit(32)::int % 100 < 50
      THEN 'control'
    ELSE 'treatment'
  END AS variant_id
FROM dim_users;
```

### Three-arm split

```sql
-- 33/33/34 split (control / variant_a / variant_b)
SELECT
  user_id,
  CASE
    WHEN MOD(ABS(FARM_FINGERPRINT(CONCAT(user_id, 'exp_three_way_v1'))), 100) < 33
      THEN 'control'
    WHEN MOD(ABS(FARM_FINGERPRINT(CONCAT(user_id, 'exp_three_way_v1'))), 100) < 66
      THEN 'variant_a'
    ELSE 'variant_b'
  END AS variant_id
FROM dim_users;
```

### Sub-sampling for opt-in experiments

```sql
-- 10% of users in the experiment, 50/50 split among them
SELECT
  user_id,
  CASE
    WHEN MOD(ABS(FARM_FINGERPRINT(CONCAT(user_id, 'exp_pricing_test_eligibility'))), 100) >= 10
      THEN 'not_in_experiment'
    WHEN MOD(ABS(FARM_FINGERPRINT(CONCAT(user_id, 'exp_pricing_test_v1'))), 100) < 50
      THEN 'control'
    ELSE 'treatment'
  END AS variant_id
FROM dim_users;
```

Note the two different salts: one for eligibility, one for assignment. This ensures the eligibility decision is independent of the variant decision.

---

## Salt naming conventions

Three rules.

1. **Unique per experiment.** Reuse the same salt across experiments and you correlate assignments. A user in control of experiment A is more likely to be in control of experiment B; the experiments interfere.
2. **Stable across the experiment lifecycle.** Do not change the salt mid-experiment. Changing the salt re-randomizes existing users; the analysis becomes uninterpretable.
3. **Versioned.** When semantics change, append `_v2`. The old experiment data remains queryable; the new salt produces independent assignments.

Convention.

```
{prefix}_{descriptor}_{version}
```

Examples.

- `exp_button_color_v1`
- `exp_pricing_test_v1` (eligibility salt)
- `exp_pricing_test_assign_v1` (assignment salt within eligible)
- `exp_recommendation_model_v2` (version 2 of an existing experiment)

Document the salt convention. Add it to the experiment record.

---

## Exposure event schema

The required fields.

| Field | Type | Required | Notes |
|---|---|---|---|
| `experiment_id` | string | Required | Unique identifier per experiment. |
| `variant_id` | string | Required | The variant the user was bucketed into. |
| `user_id` | string | Required | The assignment unit. |
| `exposed_at` | timestamp | Required | ISO 8601 UTC. Server-stamped. |
| `assigned_at` | timestamp | Optional | When the user was first assigned (may differ from exposed). |
| `device_type` | string | Optional | mobile, web, desktop. |
| `app_version` | string | Optional | For change-tracking when version-specific bugs surface. |
| `account_id` | string | Optional | For B2B; the account context. |
| `session_id` | string | Optional | For session-level path analysis. |

The minimum schema is the four required fields. Optional fields support segmentation and debugging.

### Storage pattern

Either as a dedicated `experiment_exposures` table or as an event in the main events table with `event_name = 'experiment_exposed'`.

Dedicated table is cleaner for analysis. Main events table is simpler for instrumentation. Pick one and stick to it.

---

## The delayed-exposure trap

The single most common warehouse-native experimentation bug.

**The setup.** The treatment shows a new pricing page; the control shows the old one. The team fires exposure at homepage load.

**The problem.** Many users land on the homepage but never click through to the pricing page. They are counted as "exposed" to the experiment but never saw the variant. The control group includes users who never reached the pricing page; the treatment group does too.

**The result.** The analysis dilutes the real effect. The treatment may have produced a 20 percent lift among users who actually saw the pricing page, but the analysis shows a 2 percent lift because 90 percent of "exposed" users never reached the variant.

**The fix.** Fire exposure exactly when the user has seen the variant-specific behavior.

```javascript
// Wrong: fires at every page load
function onHomepageLoad(user) {
  fireExposure({
    experiment_id: 'exp_pricing_v1',
    variant_id: getVariant(user),
    user_id: user.id,
  });
}

// Right: fires when the pricing page renders the variant-specific UI
function onPricingPageLoad(user) {
  const variant = getVariant(user);
  if (variant === 'treatment') {
    renderNewPricingPage();
  } else {
    renderOldPricingPage();
  }
  // Fire once per user per experiment
  if (!hasExposureFired(user, 'exp_pricing_v1')) {
    fireExposure({
      experiment_id: 'exp_pricing_v1',
      variant_id: variant,
      user_id: user.id,
    });
    markExposureFired(user, 'exp_pricing_v1');
  }
}
```

The discipline. Fire exposure when the variant-specific UI renders or the variant-specific code path executes. Use a single-fire flag (client-side cache or server-side state) to ensure exposure fires exactly once per user per experiment.

---

## Sample ratio mismatch (SRM) check

Before computing any metric, check that the assignment is balanced.

```sql
-- For a 50/50 split, expect roughly equal counts in control and treatment
SELECT
  variant_id,
  COUNT(*) AS n,
  COUNT(*) * 1.0 / SUM(COUNT(*)) OVER () AS share
FROM exposures
WHERE experiment_id = 'exp_button_color_v1'
GROUP BY variant_id;
```

Expected output.

| variant_id | n      | share |
|------------|--------|-------|
| control    | 50,123 | 0.501 |
| treatment  | 49,877 | 0.499 |

If the share deviates from the expected 50 percent by more than 1 percentage point at large samples, you have an SRM. The chi-squared test detects this formally.

```python
from scipy.stats import chi2_contingency

observed = [50123, 49877]  # control, treatment
expected_ratio = [0.5, 0.5]
chi2, p, dof, _ = chi2_contingency([observed, [sum(observed) * r for r in expected_ratio]])
print(f"SRM chi-squared p-value: {p:.4f}")
# p < 0.001 indicates SRM
```

If you have an SRM. Do not analyze the experiment. The assignment is broken (hash collision, biased exposure logging, instrumentation that fires for one variant but not the other). Fix the bug; restart the experiment.

The honest pattern. Run an SRM check at the top of every experiment analysis notebook. If SRM is detected, abort with a clear error message; do not let the analysis proceed.

---

## Common assignment and exposure mistakes

- **Salt reuse across experiments.** A user in control of experiment A is correlated with control of experiment B. Use unique salts per experiment.
- **Changing the salt mid-experiment.** Re-randomizes existing users. The analysis becomes a mix of two different assignment functions. Pre-register the salt; freeze it at experiment start.
- **Firing exposure on every event.** Inflates the exposure log by 10 to 100x. Use single-fire enforcement.
- **Server-side fire when only client renders the variant.** Server-side fires for every API call; client-side fires only when the user reaches the variant-specific UI. Match exposure to where the variant matters.
- **Eligibility check in the wrong place.** Eligibility (e.g., paid users only) checked client-side after assignment produces biased exposure (only paid users in the log). Check eligibility before assignment, server-side.
