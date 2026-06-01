# Flag types reference

The five flag types in detail. Mixing them in one flag is the most common source of flag mess; commit at creation and do not let the type drift.

---

## Release flag

**Definition.** A flag that gates a new feature so the code can ship to production while disabled. The team toggles it on for a percentage, ramps to 100, then removes the flag.

**Lifetime.** Days to weeks. Most release flags should be removed within 30 days of reaching 100 percent rollout.

**Lifecycle pattern.** Birth (PR adds gated code), adolescence (testing in dev/staging), launch (gradual percentage ramp in production), maturity (100 percent, monitor for 30 days), death (removal PR consolidates code paths).

**Worked example.** `release_checkout_redesign_2026q2` gates a new checkout flow. Created when the new flow PR merges. Toggled on for 1 percent of users on day 1; ramps to 10 percent on day 2, 50 percent on day 4, 100 percent on day 6. Removed on day 36 after the 30-day review confirms no regressions.

**Common pitfalls.** Skipping the removal step (the most common). Conflating with an experiment flag (the team wants to A/B test the rollout instead of just ramping it; that is a different type). Leaving the flag at 50 percent forever because the team is "watching" it (either ramp to 100 or roll back; do not park).

---

## Experiment flag

**Definition.** A flag that randomly assigns users to variants for an A/B or multivariate test. The platform tracks conversion per variant; the team decides which variant wins, then ships the winner.

**Lifetime.** One to six weeks. Tied to the duration of the test.

**Lifecycle pattern.** Birth (PR adds the variants behind the flag), adolescence (canary in dev/staging), launch (test runs at the full target audience), maturity (test ends, decision made), death (winning variant code consolidated; flag removed).

**Worked example.** `exp_billing_pricing_v2` tests two pricing page layouts. 50/50 split. Test runs for 21 days, hits the pre-committed sample size. Variant B wins. The PR removes the flag and the variant A code path; only variant B remains in production.

**Common pitfalls.** Letting the experiment flag persist after the decision (the most common). Treating an inconclusive result as "let's keep the test running" instead of "kill or redesign." Mixing experiment with release: the team uses an experiment flag to gradually ramp a feature; if it is a ramp, it is a release flag.

---

## Operational flag

**Definition.** A kill switch or circuit breaker. Lets ops disable a misbehaving feature without a code redeploy. The flag is on by default in production; flipped off only during incidents.

**Lifetime.** Long-lived. Often years. Removed only when the underlying feature is removed.

**Lifecycle pattern.** Birth (PR adds the kill switch around a risk surface), maturity (the flag sits at "on" indefinitely), occasional use during incidents.

**Worked example.** `ops_search_circuit_breaker` wraps the search service. If the search service starts returning errors at high rates during a 3 AM incident, on-call flips the flag off, and the search bar shows a graceful fallback message until the underlying issue is fixed.

**Common pitfalls.** No incident drill (the first time the kill switch is used should not be at 3 AM). Wrapping logic that does not need a kill switch (every feature does not need one; pick the high-risk surfaces). Conflating with a release flag (the team uses the kill switch as a rollout control; if it is a ramp, the new code path needs its own release flag, and the kill switch wraps the larger feature).

---

## Permission flag

**Definition.** Controls feature access by plan tier, customer cohort, or region. The free tier sees one set of features; the enterprise tier sees another. The flag is the access control mechanism.

**Lifetime.** Long-lived. Tied to the business model.

**Lifecycle pattern.** Birth (PR adds the gate around a paid feature), maturity (the flag stays in production indefinitely), evolution (the rule changes as plans evolve, but the flag remains).

**Worked example.** `perm_enterprise_audit_log` controls access to the audit log feature. Only accounts on the enterprise plan see it. When the plan structure changes (audit log opens up to the team plan too), the rule changes; the flag remains.

**Common pitfalls.** Putting permission logic in code instead of in the flag (so the team has to deploy when plans change). Conflating with configuration: permission flags govern access by plan/role; configuration flags govern behavior per tenant contract. Permission flags use the same evaluation surface as release flags but the lifecycle is fundamentally different.

---

## Configuration flag

**Definition.** Lets some customers see different behavior based on contractual configuration. White-label tenants, regulated regions, custom rollout schedules per account, partner integrations.

**Lifetime.** Long-lived. Tied to the contract or regulatory requirement.

**Lifecycle pattern.** Birth (PR adds the configuration switch for a specific tenant or partner), maturity (the flag remains as long as the contract is active), evolution (the rule changes as new tenants come on or existing ones renegotiate).

**Worked example.** `cfg_tenant_acme_custom_dashboard` enables a custom dashboard for Acme Corp because their contract specifies it. The flag's targeting rule is `account.tenant_id == "acme"`. The flag remains in production as long as Acme is a customer.

**Common pitfalls.** Configuration sprawl: every tenant request becomes a new flag, the platform has hundreds, no one can audit. Mitigation: use segments and tenant-attribute targeting on a smaller set of feature flags rather than per-tenant flags. Conflating with permission: configuration governs custom behavior per tenant contract; permission governs access by plan tier.

---

## Anti-pattern: type drift

A flag created as a release flag gets repurposed as an experiment, then later as a permission gate. The name still says `release_`. The targeting rule is now multi-purpose. The lifecycle expectation is unclear. Removing the flag breaks something somewhere.

The fix is to refuse type drift. When the purpose changes, create a new flag of the new type and migrate the rule. The original flag is removed once nothing depends on it. This is more work than just changing the rule on the existing flag, but it preserves the type-clarity discipline.

The recovery for an existing type-drifted flag: rename to one of the five types, document the current actual purpose, and treat the flag as that type from now on. The original mixed history is grandfathered; the going-forward behavior is single-typed.
