# Flag naming conventions

A flag name encodes type, owner, and purpose. Encoding makes flag lists readable at month nine and lets the cleanup playbook tell what is safe to remove. This reference documents the conventions, shows worked examples, and provides the migration plan for existing badly-named flags.

---

## The format

`<type>_<owner>_<semantic_name>_<version_or_date>`

Each segment is mandatory for new flags except the version/date suffix, which is recommended but optional for short-lived release flags.

---

## Typed prefixes

| Prefix | Type | Lifetime | Example |
|---|---|---|---|
| `release_` | Release flag | Days to weeks | `release_checkout_redesign_2026q2` |
| `exp_` | Experiment flag | 1-6 weeks | `exp_billing_pricing_v2` |
| `ops_` | Operational flag | Long-lived | `ops_search_circuit_breaker` |
| `perm_` | Permission flag | Long-lived | `perm_enterprise_audit_log` |
| `cfg_` | Configuration flag | Long-lived | `cfg_tenant_acme_custom_dashboard` |

Pick one prefix style organization-wide. Mixing `release_` with `release-` produces typo bugs that bite during 3 AM rollbacks.

---

## Owner prefix

The owner segment is the team or component that owns the code behind the flag. It does not have to be the team that created the flag.

Examples:
- `checkout` for the checkout team
- `billing` for the billing team
- `search` for the search team
- `growth` for the growth team
- `infra` for platform/SRE work

Organizations with many small teams may use a two-segment owner like `growth_signup` or `infra_db_failover`. Organizations with a single product team may use a component-level owner like `pricing`, `dashboard`, `api`.

---

## Semantic name

The semantic name describes what the flag controls. It should read naturally to someone who has not seen the flag before.

Good semantic names:
- `redesign` (the team is redesigning a surface)
- `ml_recommendations` (the feature is ML-driven recommendations)
- `circuit_breaker` (the flag is a circuit breaker, an operational kill switch)
- `audit_log` (the feature behind the flag is an audit log)
- `single_step_billing` (a specific UX pattern the flag controls)

Bad semantic names:
- `new_feature` (which feature?)
- `temp_toggle` (temporary for what?)
- `test_flag` (for testing what?)
- `pricing_update_v3` (which version was v3? was there a v2?)

---

## Version or date suffix

For experiment flags and release flags that may iterate, include a version or date suffix so old and new variants are distinguishable.

- `release_checkout_redesign_2026q2`: quarter-stamped release
- `exp_pricing_test_v2`: second iteration of a pricing test
- `release_signup_form_v3_2026_05`: third iteration, May 2026

Operational, permission, and configuration flags usually do not need a version suffix; they are stable infrastructure.

---

## Worked examples (good)

```
release_checkout_redesign_2026q2
release_signup_passwordless_2026_06
exp_billing_pricing_v2
exp_homepage_hero_copy_test_v1
ops_search_circuit_breaker
ops_db_failover_manual_override
perm_enterprise_audit_log
perm_eu_data_residency
cfg_tenant_acme_custom_dashboard
cfg_white_label_partner_xyz
```

Each name says: what type of flag, who owns it, what it controls, and (where applicable) which iteration.

---

## Worked examples (bad)

```
new_pricing                  // bad: no type, no owner, no version
temp_homepage_test           // bad: "temp" promises removal that never happens
billing_flag_2               // bad: vague semantic, what does flag_2 do?
killswitch                   // bad: which feature does this kill?
enterprise_features          // bad: ambiguous, is this permission or configuration?
beta_users_only              // bad: targeting concept in the flag name; rule should target, not name
```

---

## Migration plan for badly-named flags

If the existing platform has hundreds of badly-named flags, do not rename them all at once. The pattern is to rename on touch:

1. Establish the convention. Document it; share with the team.
2. New flags follow the convention. No exceptions.
3. Existing flags get renamed when touched: when the rule changes, when the rollout advances, when ownership transfers, when removal is scheduled.
4. Quarterly cleanup includes a "rename batch" of the 5-10 worst-named flags, especially ones that are confusing during the cleanup itself.
5. After 6-12 months, the platform stabilizes on the convention.

Bulk renames can be scripted via the platform's API, but renaming forces a code change in every place the flag key is referenced. Bundle renames with refactors, not as standalone PRs.

---

## Anti-pattern: targeting in the name

Do not put targeting concepts in the flag name. The flag name describes what the flag controls; the targeting rule describes who sees it.

Bad: `enterprise_users_audit_log` (the "enterprise_users" is targeting)
Better: `perm_audit_log` (the flag is a permission flag for the audit log; the rule targets enterprise users)

If the targeting rule changes (audit log opens up to all paid customers), the flag does not need to be renamed. The rule does the work.
