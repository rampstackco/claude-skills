# Cohort definition patterns

Four cohort patterns: acquisition, behavioral, property, combined. With SQL examples for warehouse-native and tool-specific examples for Mixpanel, Amplitude, and PostHog.

---

## Pattern 1: acquisition cohort

Users acquired in a specific time window. The standard for retention analysis.

### Definition

```sql
-- Warehouse-native (BigQuery / Snowflake / Postgres)
SELECT user_id
FROM dim_users
WHERE first_seen_at >= '2026-04-01'
  AND first_seen_at <  '2026-05-01';
```

### Tool-specific

**Mixpanel.** Cohort builder, condition: "First time the user did `user_signed_up` was between April 1 and April 30, 2026."

**Amplitude.** User segment, condition: "First event date between April 1 and April 30, 2026."

**PostHog.** Cohort, condition: "Person property `first_seen` is between April 1 and April 30, 2026."

### Use cases

- Retention analysis. Compare retention curves across acquisition cohorts to detect product or onboarding regressions.
- Onboarding A/B test results. The treatment cohort and control cohort are both acquisition cohorts.
- Cohort revenue tracking. How much did April's signups generate over the next 12 months?

### Common mistakes

- Comparing cohorts at different ages. A 30-day-old cohort has lower retention than a 90-day-old cohort by definition.
- Using "user created" vs "first event" inconsistently. Pick one and document it.

---

## Pattern 2: behavioral cohort

Users who completed a specific action. The standard for activation and engagement analysis.

### Definition

```sql
-- Users who fired first_value_action_completed within 14 days of signup
SELECT u.user_id
FROM dim_users u
JOIN fct_events e ON e.user_id = u.user_id
WHERE e.event_name = 'first_value_action_completed'
  AND e.event_timestamp <= u.first_seen_at + INTERVAL '14 days';
```

### Tool-specific

**Mixpanel.** Cohort builder, condition: "User did `first_value_action_completed` at least once where event time was within 14 days of `user_signed_up`."

**Amplitude.** Behavioral cohort, "Performed event `first_value_action_completed` within 14 days after first event."

**PostHog.** Cohort, condition: "Person performed event `first_value_action_completed` and the event happened within 14 days of person creation."

### Use cases

- Activation funnel: activated users vs non-activated users.
- Feature adopters: users who used feature X. How does their retention compare to non-adopters?
- Power users: users who fired a specific high-value event 5 or more times.

### Common mistakes

- Using behavioral cohorts for retention without a time anchor. "Users who completed onboarding" includes users from January and users from October; their retention curves are at different ages.
- Confusing "users who ever did X" with "users who did X recently." Specify the time window.

---

## Pattern 3: property cohort

Users with a specific property value. The standard for segment-level analysis.

### Definition

```sql
SELECT user_id
FROM dim_users
WHERE subscription_tier = 'pro'
  AND region = 'us'
  AND is_admin = false;
```

### Tool-specific

**Mixpanel.** Cohort, condition: "User properties: `subscription_tier = pro` AND `region = us`."

**Amplitude.** User segment, condition: "User properties match: `subscription_tier = pro` AND `region = us`."

**PostHog.** Cohort, condition: "Person properties: `subscription_tier = pro` AND `region = us`."

### Use cases

- Segment performance: how does the Pro tier behave differently from the Free tier?
- Geographic analysis: do EU users convert at a different rate than US users?
- Role-based analysis: do admins use the product differently than members?

### Common mistakes

- Using event-level properties as if they were user-level. "Users who fired any event with `cart_value > 100`" returns events, not users; use a behavioral cohort for "users who fired a high-value event."
- Snapshot vs current property values. "Users who were Pro in March" vs "users who are Pro now" are different cohorts; some platforms default to current values without warning.

---

## Pattern 4: combined cohort

Combinations of the above. The most common in real analytics work.

### Definition

```sql
-- Users who signed up in March, completed onboarding within 7 days,
-- are in EU, and are on the Pro tier
SELECT u.user_id
FROM dim_users u
WHERE u.first_seen_at >= '2026-03-01'
  AND u.first_seen_at <  '2026-04-01'
  AND u.region = 'eu'
  AND u.subscription_tier = 'pro'
  AND EXISTS (
    SELECT 1 FROM fct_events e
    WHERE e.user_id = u.user_id
      AND e.event_name = 'onboarding_completed'
      AND e.event_timestamp <= u.first_seen_at + INTERVAL '7 days'
  );
```

### Tool-specific

All three platforms support combined cohorts via boolean composition (AND, OR, NOT). The composition gets unwieldy past 4 or 5 conditions; consider whether the cohort is genuinely useful or whether the team is over-segmenting.

### Use cases

- Activation analysis by acquisition channel: "Paid Meta users who signed up in March and activated within 7 days."
- Quality cohorts: "Pro tier users acquired via organic search who reached aha_moment within 14 days."
- Test cohorts: "Treatment group users who completed the onboarding A/B test within 7 days."

### Common mistakes

- Cohorts so narrow that the population is too small for analysis. A cohort of 50 users has high variance on every metric.
- Combining conditions that contradict each other. "Pro tier free users" returns nothing.
- Forgetting to time-box. A combined cohort without acquisition or behavioral time bounds drifts as users join and leave.

---

## Cohort discipline

Three rules that apply across all four patterns.

### Rule 1: define cohorts in code (or saved in the tool)

Re-querying the same cohort definition by hand each time produces inconsistencies. Define the cohort once; reuse the definition across analyses.

In SQL: a `WITH` clause or a saved view.

```sql
WITH march_cohort AS (
  SELECT user_id
  FROM dim_users
  WHERE first_seen_at >= '2026-03-01'
    AND first_seen_at <  '2026-04-01'
)
SELECT COUNT(*) FROM march_cohort;
```

In analytics tools: saved cohorts. Every analysis references the saved cohort by name.

### Rule 2: version when criteria change

A cohort definition that evolves over time produces non-comparable results. If you change the activation definition, the new cohort is a different cohort.

Pattern. Append `_v2` to the cohort name when criteria change. Keep the old definition queryable for historical comparison.

### Rule 3: compare apples-to-apples

Two cohorts compared at different ages produce misleading conclusions. Always compare at matched ages.

If comparing March cohort retention against November cohort retention, both should be measured at the same number of days post-acquisition. November cohort at 30 days vs March cohort at 60 days is not a fair comparison.

---

## When to introduce a cohort

The team has a question that filters on a user attribute or behavior. The question repeats across analyses. The team is computing the same filter 5+ times by hand.

That is the trigger. Define the cohort once; reuse it.

---

## When to deprecate a cohort

The cohort has not been queried in 90 days. The cohort criteria no longer match a real product question (e.g., the feature it tracked was deprecated). The team has built a more precise replacement cohort.

Stale cohorts in the analytics tool produce dropdown clutter and tempt analysts to use them when newer cohorts are appropriate. Deprecate explicitly.
