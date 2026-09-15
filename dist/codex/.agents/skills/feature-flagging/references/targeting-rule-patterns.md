# Targeting rule patterns

Common patterns and anti-patterns for flag targeting rules. The patterns work; the anti-patterns produce flag mess that takes quarters to unwind.

---

## Pattern: percentage rollout

Default: flag off (0 percent). Override: flag on for a percentage of the user population.

```
Default rule: off
Override: rollout 10% of all users
```

The platform handles the bucketing (usually a stable hash on user ID, so the same user gets the same value across requests). Use this for release flags during ramps.

Variation: percentage within a segment. `Default off; rollout 50% of users where account.tier == "enterprise"`. Useful when the rollout should reach only a subset of the population.

---

## Pattern: internal-only

Restrict the flag to internal employees first. The flag is on for `@yourcompany.com` emails; everyone else sees the disabled state.

```
Default rule: off
Override: on if user.email_domain == "yourcompany.com"
```

Use this for the first stage of a sensitive release. Internal users find bugs without external exposure.

---

## Pattern: opt-in beta

Users who have opted into beta features see the flag on. Implementation requires an opt-in mechanism somewhere in the product (settings page, signup flow, support request).

```
Default rule: off
Override: on if user.beta_opted_in == true
```

Use this for risky features that need engaged-user feedback. The opt-in is the consent mechanism; the flag is the access mechanism.

---

## Pattern: cohort-based

Target a named segment defined elsewhere in the platform. The segment captures the cohort logic so the flag rule stays simple.

```
Default rule: off
Override: on if user IN segment "early_access_2026q2"
```

Use this when the cohort is shared across multiple flags (the same set of "early access" users sees several features). The segment is the single source of truth; flags reference it.

---

## Pattern: geo-staged

Target users by region. The country or region attribute usually comes from the request (IP-based geolocation) or the account profile.

```
Default rule: off
Override: on if request.country IN ("US", "CA")
```

Use this for compliance launches (data residency regulations, region-specific UX). Stage the rollout: US first, then EU, then APAC.

---

## Pattern: time-based scheduled flip

The flag turns on at a specific time. Useful for marketing-coordinated launches.

```
Default rule: off
Override: on if time > "2026-06-01T12:00:00Z"
```

Watch the timezone. Avoid scheduling on weekends or holidays unless on-call coverage exists for the rollout window.

---

## Pattern: composition (cohort within percentage)

A percentage of a cohort. Useful when the rollout should be slow even within an opt-in group.

```
Default rule: off
Override: on if user.beta_opted_in == true AND rollout 25% of those users
```

Order matters: the percentage applies to the cohort, not the full population. The platform's rule editor usually makes this clear.

---

## Anti-pattern: volatile-attribute targeting

Targeting on attributes that change frequently produces user-experience whiplash.

Bad:
```
Override: on if user.last_login_date > "2026-04-01"
```

A user's last_login_date changes every time they log in. They see the treatment one day, the control the next. The experience flickers; conversion data is noise.

Fix: target on stable attributes. Or, snapshot the attribute at a fixed point (`user.first_login_date_was_after_2026_04_01`) and use the snapshot.

---

## Anti-pattern: deeply nested AND/OR

If your rule has three levels of nesting, the taxonomy is wrong.

Bad:
```
Override: on if (
  (user.country == "US" AND user.signup_date > "2026-01-01")
  OR
  (account.tier == "enterprise" AND NOT user.churned)
  OR
  (user.beta_opted_in == true AND request.device == "mobile")
)
```

The intent is unclear, the rule is fragile, and reviewing it during incidents is slow.

Fix: define a segment that captures the intent (e.g., "eligible_for_new_dashboard") and use the segment in the flag rule. Or split into multiple flags (one for the US/recent-signup case, one for the enterprise case, one for the mobile-beta case) and let the calling code combine them.

---

## Anti-pattern: production rules drift from staging

The team tests the flag in staging with rule X. The rule that ships in production is rule Y, written directly in the production console without re-testing in staging.

Result: the staging tests do not predict production behavior. The first 1 percent rollout in production reveals the gap, and the team scrambles to align.

Fix: rules go through environment promotion. Author in staging, test in staging, promote to production via the platform's promotion workflow. If the platform does not have promotion, copy the rule from staging to production via a documented process and confirm the rule is identical in both before flipping production on.

---

## Anti-pattern: targeting in the flag name

Bad: `flag_name = "enterprise_audit_log"` with rule `account.tier == "enterprise"`.

When the rule changes (audit log opens up to team-tier accounts), the flag name lies.

Fix: name the flag for what it controls (`perm_audit_log`), let the rule do the targeting work. The rule can change without renaming the flag.

---

## Anti-pattern: kill switch with a complex rule

A kill switch (operational flag) should have a simple rule: `on for everyone` or `off for everyone`. If your kill switch's rule is `on for everyone except a specific cohort with these conditions`, you are using an operational flag as a permission gate.

Fix: use a permission flag for the per-cohort access; use a separate operational flag (`ops_feature_x_killswitch`) for the universal kill. The operational flag wraps the entire feature; the permission flag wraps the access to the feature.

---

## Pattern: explicit ramp gate

Some platforms let you tag a flag's rule with explicit "stages." The flag advances through stages on a button press, with each stage having its own rule.

```
Stage 1: rollout 1%
Stage 2: rollout 10% (advance from stage 1 manually)
Stage 3: rollout 50% (advance from stage 2 manually)
Stage 4: rollout 100% (advance from stage 3 manually)
```

Use this when the platform supports it. The explicit stages make rollout history readable: you can see when each stage advanced, by whom, with what observed metrics.

---

## Composition rule of thumb

If a flag's rule reads naturally to a non-engineer ("on for enterprise customers in the US"), the rule is simple enough. If the rule requires a five-minute explanation, it is too complex; refactor into segments or split into multiple flags.

The rule is read more times than it is written. Optimize for readability.
