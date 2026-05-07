---
name: feature-flagging
description: Operational discipline for feature flags as production infrastructure. Flag types, naming, targeting rules, rollout strategy, lifecycle, governance, stale flag management, and the technical debt patterns that bite teams who weren't deliberate about it.
category: product
catalog_summary: "Flags as production infrastructure: types, naming, lifecycle, targeting, rollout, stale flag cleanup, governance"
display_order: 5
---

# Feature Flagging

A senior engineer's playbook for using feature flags well, not just frequently.

Feature flags are infrastructure. Treated as such, they enable kill switches, gradual rollouts, A/B experiments, permission gates, and operational toggles without redeploys. Treated casually, they become the largest accumulating technical debt in your codebase: thousands of dead flags, conflicting evaluation logic, brittle targeting, and a permission surface no one fully understands.

This skill is the discipline that prevents the second outcome. It assumes you have a feature flag platform (LaunchDarkly, Flagsmith, Split.io, VWO FME, GrowthBook, Statsig, PostHog, Optimizely; the platform does not matter for the principles). It assumes your engineering team can implement targeting rules and SDK integration. The hard part is the operational discipline, and that is what is here.

When to use this skill: any time you are about to introduce a flag, modify a flag, audit existing flags, or design a flag-related governance policy.

---

## What this skill is for

The skill spans the operational lifecycle of a flag from creation through retirement. Flag types and the discipline of not mixing them. Naming conventions that survive code review. Lifecycle expectations baked in at creation, not bolted on later. Targeting rules that compose without fragility. Rollout strategies that match the risk profile of the launch. Stale flag management on a quarterly cadence. Governance and permissions that balance access with audit. Performance considerations so flags do not become a latency tax. Testing patterns that cover both branches. Rollback discipline. Observability across rollouts.

The skill does not cover experiment design; for hypothesis writing, sample size, MDE, and the discipline of arriving at a defensible decision, see the `experiment-design` skill. It does not cover statistical analysis or variance reduction; those live in the `experimentation-analytics` skill. It does not cover platform-specific tooling; for MCP commands, auth, and platform-specific configuration, consult the chosen platform's documentation. This skill produces the operational shape; the platform implements it.

---

## The five flag types

Mixing flag types is the root cause of most flag mess. A flag is one of five things; commit at creation and do not let it drift.

**Release flag.** Code is in production but disabled. The new feature ships dark, gets toggled on for a percentage, then ramps to 100. Lifetime: short, days to weeks. Lifecycle: clean removal after launch. Common name prefix: `release_`.

**Experiment flag.** Users are randomly assigned to variants; conversion is measured. The flag controls which variant a user sees. Lifetime: medium, one to six weeks. Lifecycle: variant chosen, code paths consolidated, flag removed. Common name prefix: `exp_`.

**Operational flag.** A kill switch or circuit breaker that lets ops disable a misbehaving feature without a redeploy. Lifetime: long-lived, often years. Lifecycle: usually never removed; remains as standby. Common name prefix: `ops_`.

**Permission flag.** Controls feature access by plan tier, customer cohort, or region. The free tier sees one set of features; the enterprise tier sees another. Lifetime: long-lived. Lifecycle: managed alongside billing and access infrastructure. Common name prefix: `perm_`.

**Configuration flag.** Lets some customers see different behavior based on contractual configuration. White-label tenants, regulated regions, custom rollout schedules per account. Lifetime: long-lived. Lifecycle: governed by sales and product agreements. Common name prefix: `cfg_`.

Each type has different lifecycle, governance, and removal expectations. Mixing them in one flag (the flag is both a kill switch AND a permission gate AND now we are using it for an experiment) is the most common source of flag mess. When the flag's purpose changes, create a new flag and migrate. Do not overload an existing one.

---

## Flag naming conventions

A flag name encodes type, owner, and purpose. Without that encoding, a flag list at month nine is unreadable and the cleanup playbook from [`references/stale-flag-cleanup-playbook.md`](references/stale-flag-cleanup-playbook.md) cannot tell what is safe to remove.

The convention this skill recommends is `<type>_<owner>_<semantic_name>_<version_or_date>`:

- `release_checkout_redesign_2026q2`
- `exp_billing_pricing_v2`
- `ops_search_circuit_breaker`
- `perm_enterprise_audit_log`
- `cfg_tenant_acme_custom_dashboard`

Pick snake_case or kebab-case once, organization-wide, and stick with it. Mixing both in the same platform produces typo-driven bugs that bite at 3 AM. Vague names die a slow death: `new_feature`, `temp_toggle`, `test_flag`, `pricing_update_v3`. Within months, no one knows which `pricing_update` shipped and which is dead.

For deeper coverage including the table of typed prefixes, owner conventions, and the migration plan for existing badly-named flags, see [`references/flag-naming-conventions.md`](references/flag-naming-conventions.md).

---

## The flag lifecycle

Every flag has five life phases. Each phase has explicit entry and exit criteria. Skipping phases is how flag mess accumulates.

**Birth.** Flag created with explicit metadata: owner, type, target removal date (for release and experiment flags), rollout plan, monitoring approach. The metadata is not optional; without it the flag has no end-of-life.

**Adolescence.** The feature behind the flag is being built. Code paths exist for both the disabled (current production) branch and the enabled (new) branch. Both are tested. The flag remains off in production.

**Launch.** Production rollout begins. Percentage starts low (1 or 5 percent), monitored at each step, ramps if metrics hold. Ramp gates documented in [`references/flag-rollout-strategies.md`](references/flag-rollout-strategies.md).

**Maturity.** The flag is at 100 percent rollout. The new code path is the production path. Monitoring continues for at least 30 days to catch issues that did not show up during the ramp.

**Death.** The flag is removed from code (PR that deletes the gating logic) and removed from the platform. The audit trail records the removal.

The asymmetry: birth is fast (one PR creates the flag and gates the new code), death requires intentional cleanup. Most flag mess is unfinished death. Birth-and-death have to be planned together; the death plan is part of the birth metadata.

For the per-phase checklist, see [`references/flag-lifecycle-checklist.md`](references/flag-lifecycle-checklist.md).

---

## Targeting rules and segmentation

A targeting rule is the boolean expression that determines whether a user, account, or request gets the treatment branch. There are four useful target dimensions:

- **User attributes.** `user.email_domain == "acme.com"`, `user.signup_date > "2026-01-01"`, `user.plan == "enterprise"`.
- **Account attributes.** `account.tier == "enterprise"`, `account.region == "EU"`, `account.feature_x_enabled == true`.
- **Request attributes.** `request.country == "US"`, `request.device_type == "mobile"`, `request.api_version >= 3`.
- **Time-based.** `time > "2026-06-01T00:00:00Z"`, `time < "2026-12-31T23:59:59Z"`.

Compose with AND, OR, and NOT. Keep the expressions simple. If your rule needs three nested clauses, your taxonomy is wrong. Either define a segment (a named group of users with shared attributes) and target the segment, or split into multiple flags.

The most common pitfall: targeting on attributes that change frequently. If the rule is `user.last_login_date > "2026-04-01"`, a user who logs in on May 1 sees the treatment, then their value changes the next day, and they see the control again. The user experience whiplashes. Volatile attributes belong in segments computed off snapshots, not in live targeting rules.

For pattern catalog and anti-patterns, see [`references/targeting-rule-patterns.md`](references/targeting-rule-patterns.md).

---

## Rollout strategies

Different launches deserve different rollout strategies. Match the strategy to the risk profile.

**Percentage rollout.** The default for release flags. Start at 1 or 5 percent. Watch error rates, latency, and the primary success metric for at least one peak hour. If clean, ramp to 10. Watch. Ramp to 25, then 50, then 100. Total elapsed time depends on traffic, but a typical pattern is 1 percent for one day, then 10 percent for two days, then 50 for two days, then 100. Production rollouts that complete in under four hours are usually rolling too fast.

**Cohort rollout.** Internal employees first, then beta customers, then free tier, then paid. Each cohort is a named segment; the flag advances through them in sequence. Use this for risky launches where the blast radius matters more than rollout speed.

**Geo-staged rollout.** One region at a time. The default for compliance-sensitive features (data residency, regulatory disclosures, region-specific UX). Pair with the platform's region targeting capability so the rule does not have to be hand-written.

**Time-based rollout.** Scheduled flips at known times. Useful for marketing-coordinated launches where the toggle has to fire at a specific moment. Watch the timezone; midnight Eastern is not midnight UTC. Avoid time-based rollouts on holidays unless you have weekend on-call coverage.

The "ramp and watch" rule: at each percentage step, monitor the system for at least one peak hour before advancing. The peak hour is when the rate of any new failure mode is highest; if the system holds at peak for an hour, the next step is safe. If you ramp during off-peak and immediately advance, you have not actually tested the change.

For full strategy detail and a worked example for a checkout redesign, see [`references/flag-rollout-strategies.md`](references/flag-rollout-strategies.md).

---

## Stale flag management

Every live flag adds runtime cost: evaluation overhead, two code paths to maintain, mental overhead for engineers who read the code. One flag is fine. Two hundred dead flags is a productivity tax that compounds.

Most platforms support stale flag reporting: flags that have not been evaluated in N days. Threshold defaults: 30 days for release flags and experiment flags, 90 days for operational and permission flags. A flag that has not been evaluated in 30 days is either retired in production (no users in the targeting rule) or completely dead in code (the gating call has been removed but the flag itself was never deleted).

The cleanup playbook is mechanical:

1. Generate the stale flag report from the platform.
2. For each flag: identify owner, last evaluation, type, recommended action.
3. Triage in a quarterly meeting: keep, remove, or investigate.
4. Open one PR per flag for code-side removal. One per PR is reviewable; bundling ten is not.
5. Delete from the platform after the PR merges.

The reason cleanup does not happen by default: removing a flag is a code change PR with review, testing, and deploy overhead. PMs do not reward it (the feature already shipped). SREs eventually get fed up with the noise. The fix is to make removal part of the launch checklist, not a separate effort. When a flag is created, the removal date is in the metadata. The launch ticket has a follow-up sub-ticket scheduled 30 days out that says "remove flag X." If the launch goes well, the sub-ticket gets done.

For the full quarterly cadence including ownership rotation for orphan flags, see [`references/stale-flag-cleanup-playbook.md`](references/stale-flag-cleanup-playbook.md).

---

## Governance and permissions

Different roles need different access. Engineering can create flags broadly. Product can author targeting rules in dev and staging. Production targeting changes deserve a smaller set of approvers.

Recommended permission tiers:

- **Viewer.** Read-only across all environments. Includes most of engineering, product, support.
- **Editor.** Can create and modify flags in dev and staging. Includes the team that owns the flag.
- **Approver.** Can promote flag changes from staging to production. Smaller group; usually the team lead and the on-call engineer.
- **Admin.** Full control including deleting flags, modifying permissions, and accessing audit logs. Smallest group; platform team plus a backup.

Production-impacting flag changes go through review like deploys, not chat. The change request describes the rule diff, the rollout plan, and the abort criteria. An approver applies the change after review; the rule does not silently appear in production because someone clicked a button.

Audit trail: every flag change logged with actor, timestamp, before/after rule, reason. Most platforms expose this; configure it to write to the central log aggregator alongside other infrastructure events.

Environment promotion: rules tested in dev, promoted to staging, promoted to production. Authoring a production rule directly in production skips both staging tests and the review gate. Treat it as a deploy: dev → staging → production, with the same review and approval at each stage.

Emergency override: who can flip the kill switch at 3 AM? Document, test in incident drills, and confirm the override path actually works. A kill switch nobody can find is not a kill switch.

---

## Flag dependencies and conflicts

Two failure modes that come from flags interacting:

**Dependency.** Flag B's code path requires flag A to be on. Hard to model in most platforms; the SDK does not know about the inter-flag relationship. Avoid where possible; if you need to express it, document in the flag description and add a unit test that fails if A is off and B is on.

**Conflict.** Two flags target the same surface, last-write-wins. The result depends on evaluation order, which depends on SDK implementation, which depends on platform internals. Detect via shared-key audit: any two flags whose targeting rules overlap on the same code path is a conflict candidate. The platform usually does not flag this; the team has to audit.

Cross-team conflict is the dangerous version: team Alpha's release flag for the checkout redesign interacts with team Bravo's experiment on the pricing page. The interaction is invisible until production users see broken UI because both flags fired. The fix is up-front coordination via the experiment registry described in `experiment-design`. Discover before launch via planning, not via a 2 AM incident.

For mutually exclusive experiment groups (where the platform enforces that a user is in either test A or test B but never both), see the experiment-design skill's coverage of mutex enforcement.

---

## Performance considerations

A flag evaluation is a function call (cheap) plus possibly a network call to the platform (expensive). The performance question is how much you spend in the latter.

Cache aggressively. Most server-side SDKs cache flag values per request, per session, or per user; configure the cache so the network call happens once per relevant scope, not on every flag check. A request that evaluates fifty flags should hit the platform once at request start, not fifty times.

Bulk evaluation: most platforms support evaluating all flags for a user or context in one call. Use it. The latency cost of "fifty individual flag checks" is fifty times the per-check overhead; the latency cost of "one bulk evaluation that returns all fifty" is one round trip plus a fast lookup per check.

SDK selection: server-side SDKs are usually preferable to client-side for sensitive logic where latency, security, and freshness matter. Client-side SDKs are appropriate for UI-only behavior where the user can see the flag value in DevTools anyway. Mixing the two creates inconsistencies; if a user gets a different flag value on the server than the client, the UI breaks.

Latency budget: evaluating fifty flags per request should add no more than 5 ms in the typical case. If it adds more, the SDK is misconfigured (no caching, no bulk evaluation, evaluating in a hot loop). Audit before scaling.

---

## Testing flag-gated code

Both branches need tests. The disabled branch is the existing production behavior; the enabled branch is the new code. Unit tests cover both with explicit flag overrides at test setup.

Test the transition. What happens to a user mid-session when their flag value changes? In most well-behaved systems, the user finishes their current request with the value they had at request start, then sees the new value on the next request. Document the assumption explicitly. If your system mid-flips a user inside a session, that is usually a bug.

Integration tests with flag overrides: most platforms support test-only flag overrides that do not affect production. Use them for end-to-end tests that exercise both branches. Without test overrides, integration tests have to share the production flag config, which means you cannot test new features that are still gated off in production.

Common failure: shipping a "wins" experiment but only the test environment had the right targeting rules. The test environment let in 100 percent of test users via a permissive rule; production rules are stricter and let in only 20 percent. The lift you measured does not translate. Catch via staged rollout: the first 1 percent in production should match the test result before you ramp further.

---

## Rollback discipline

Flags are useful for instant rollback of the gated change. They are not a substitute for code rollback. If a bug ships in code that is not flag-gated (a fix to the existing path, an unrelated change in the same deploy), flipping the flag does nothing. Treat flag rollback as one tool among several, not as the only tool.

If flipping the flag does work, document the rollback. If it does not work, the bug is in non-flag-gated code or in flag dependencies. Diagnose accordingly; do not assume the flag failed.

Speed matters. How fast can you flip a flag in production? The target is under 60 seconds via UI or MCP, under 5 minutes via API plus auth. If your platform takes 15 minutes to propagate a flag change, that is a real incident-response constraint and the team should know.

Practice. Include flag rollback in incident drills. The first time you flip a kill switch should not be at 3 AM with revenue dropping; it should be in a drill with everyone calm.

---

## Observability on flags

Log flag evaluations alongside other request data. The flag value at evaluation time goes on the request log as a contextual field. When you investigate a slow request or an error, the log shows which flag values were active.

Alert on flag evaluation rate changes. If a flag's evaluation rate suddenly drops, the rule is misconfigured (no users matching) or the SDK is broken. Either way, the team should know within minutes.

Build dashboards for production rollouts. What percentage of users see treatment versus control, broken down by region, plan, device, etc. Without the dashboard, the rollout is a black box; with it, the team can answer "are we actually rolling out evenly across segments?" without writing a SQL query.

Connect to error tracking. When errors spike during a rollout, the dashboard should show whether errors correlate with the flag value. Spike on treatment branch = roll back the flag. Spike on both branches = the issue is unrelated and the flag rollback will not help.

---

## Common failures (rapid-fire)

A short pattern catalog. Detail in `references/`.

- "We launched but 90 percent of users still see the old version" means the rollout rule is wrong. Audit the rule against actual user attributes.
- "We disabled the flag but the bug is still happening" means the affected code path is not flag-gated, or there is a cached value, or a dependent flag is still on.
- "We have 400 dead flags and removing them is too risky" means cleanup never happened. Start the quarterly cadence now; one PR per flag.
- "Two flags target the same code path and we don't know which wins" means a conflict. Audit shared keys, decide one of them is canonical, retire the other.
- "Our flag evaluator is causing latency spikes" means bulk evaluation or caching is missing. Audit the SDK config.
- "We need to give finance access to feature toggles but they shouldn't change production rules" means permission tiering. Viewer for finance, editor for the owning team, approver for the team lead.

---

## The framework: 14 considerations for sustainable feature flagging

When designing or auditing feature flags, walk these 14 considerations:

1. **Type clarity.** Release, experiment, operational, permission, or configuration. Pick one at creation; do not let it drift.
2. **Naming.** Typed prefix, owner prefix, semantic name. Avoid vague.
3. **Lifecycle planning.** Birth and death committed at creation. Removal date in metadata.
4. **Targeting taxonomy.** User, account, request, or time-based. Avoid volatile attributes.
5. **Rule simplicity.** AND, OR, NOT only. Three nested clauses means the taxonomy is wrong.
6. **Rollout match.** Strategy matches the risk profile. Percentage for low risk, cohort for medium, geo for compliance, time-based for coordinated launches.
7. **Ramp discipline.** One peak hour at each percentage step. No four-hour rollouts.
8. **Stale flag cadence.** Quarterly cleanup. One PR per removal. Make removal part of the launch checklist.
9. **Permission tiering.** Viewer / editor / approver / admin. Fewer admins than approvers, fewer approvers than editors.
10. **Environment promotion.** Dev to staging to production with review gates. Production rules are not authored in production.
11. **Conflict audit.** Two flags on the same surface = conflict. Detect via shared-key audit; coordinate cross-team via the experiment registry.
12. **Performance budget.** Bulk evaluation, caching, server-side SDKs for sensitive logic. 5 ms total budget for fifty flag checks.
13. **Branch testing.** Both code paths covered by tests. Transition behavior documented.
14. **Observability.** Every flag evaluation logged. Every rollout dashboarded. Errors correlated with flag value during incidents.

---

## Reference files

The following reference files extend this skill:

- [`references/flag-naming-conventions.md`](references/flag-naming-conventions.md): typed prefixes, owner prefixes, semantic naming patterns, and the migration plan for existing badly-named flags.
- [`references/flag-lifecycle-checklist.md`](references/flag-lifecycle-checklist.md): birth-to-death checklist organized by lifecycle phase.
- [`references/flag-types-reference.md`](references/flag-types-reference.md): the five flag types in detail with worked examples and common pitfalls.
- [`references/stale-flag-cleanup-playbook.md`](references/stale-flag-cleanup-playbook.md): quarterly cleanup process and the orphan-ownership pattern.
- [`references/targeting-rule-patterns.md`](references/targeting-rule-patterns.md): common patterns and anti-patterns for targeting rules.
- [`references/flag-rollout-strategies.md`](references/flag-rollout-strategies.md): percentage, cohort, geo, time-based, and combination strategies with a worked example.
- [`references/governance-and-permissions.md`](references/governance-and-permissions.md): permission tiers, environment promotion, approval workflows, and emergency override.

---

## Closing: when to remove a flag

The default disposition for any flag should be removal. Flags that earn permanent residence in the codebase (operational kill switches, permission flags tied to billing, configuration flags tied to contracts) are exceptions, not norms. Most release and experiment flags should be removed within 30 days of the launch decision.

The cost of leaving them is real: every dead flag is two code paths to maintain, two test suites to keep green, and one more line of mental overhead for the engineer who reads the file next quarter. The cost compounds across hundreds of flags.

The discipline of removing them is the discipline of caring about the codebase you will work in next quarter. It is the same discipline behind cleaning up after a deploy, removing dead imports, and writing a post-mortem within a week of the incident. None of it ships features today. All of it makes shipping features tomorrow easier.

For platform-specific patterns (which platform handles which flag type best, what the MCP commands look like, where the gotchas live), consult the chosen platform's documentation. For the experiment-design layer above this skill (hypothesis discipline, sample size, decision-making), see the `experiment-design` skill. For the analytical layer below this skill (variance reduction, sequential testing math, Bayesian alternatives), see the `experimentation-analytics` skill.
