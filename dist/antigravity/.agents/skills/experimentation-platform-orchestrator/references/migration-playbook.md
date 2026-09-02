# Migration playbook

Five common migration paths with effort estimates, the first 30 days plan, the 30-90 day cutover plan, and what NOT to do.

The discipline applies to every migration. Three rules are non-negotiable:

1. Do not parallel-run forever. Set a cutover date and hold to it.
2. Do not big-bang switch. The risk of a silent miscount is too high; you cannot tell whether the new platform is computing correctly without overlap.
3. Do not retire the old platform before all in-flight experiments complete.

---

## Statsig to PostHog

Trigger. Company has outgrown a pure experimentation platform and wants analytics, experiments, and feature flags in one surface. Often coincides with consolidating away from a separate analytics tool.

Effort. 3 to 5 engineer-weeks. Add 2 to 4 weeks if you are also consolidating analytics.

First 30 days plan.
- Week 1: Provision PostHog. Wire the SDK alongside Statsig. Verify event volume matches.
- Week 2: Recreate the top 5 metrics in PostHog. Compare totals against Statsig over a 7-day window. Investigate any variance over 1%.
- Week 3: Recreate 1 active experiment in PostHog as a parallel experiment. Run both for 7 to 14 days. Confirm results agree within statistical noise.
- Week 4: Decision review. Either commit to migration or roll back to Statsig only. Document the decision.

30-90 day cutover plan.
- Migrate experiments one at a time. New experiments start in PostHog. Existing experiments complete in Statsig.
- Migrate feature flags by service. Highest-risk services move last.
- Build dashboards in PostHog before retiring Statsig dashboards.
- Final week: retire Statsig SDK from the codebase. Remove credentials.

What NOT to do.
- Parallel-run the SDKs for more than 90 days. The dual cost compounds; the integration tax distracts.
- Migrate flags before experiments. Flags are operational; experiments are time-bound. Flag migration creates production risk that overshadows the migration value.
- Skip the metric reconciliation. Discovering a metric definition mismatch a month into the migration is the worst possible time.

---

## Optimizely to Statsig

Trigger. Budget pressure or modernization push. Often coincides with a CFO-led cost review.

Effort. 4 to 8 engineer-weeks. Add weeks proportional to how heavily personalization features are used (Optimizely has personalization that Statsig does not match).

First 30 days plan.
- Week 1: Feature parity audit. List every Optimizely feature in active use. Mark which ones Statsig covers, which it does not, and which need a workaround.
- Week 2: Migrate the simplest 3 experiments. Validate results match.
- Week 3: Address the personalization gap. If personalization is heavy, plan a hybrid (Statsig for product experiments, Optimizely retained for personalization, with a retirement date in 6 to 12 months).
- Week 4: Decision review. Commit to full migration or hybrid.

30-90 day cutover plan.
- Migrate experiments first, flags second. Personalization last (or retain in Optimizely).
- Communicate clearly with non-engineering experiment authors. The visual editor change is the friction point.
- Train non-engineering authors on Statsig's experiment definition format.
- Final phase: cancel Optimizely contract on its renewal date. Do not cancel mid-term; the savings rarely justify the early-termination friction.

What NOT to do.
- Underestimate the non-engineering author retraining. Marketing-led teams will resist the platform change harder than engineering-led teams.
- Force personalization into Statsig if the use case does not fit. A hybrid setup is cheaper than a forced consolidation that the team cannot use.
- Cancel the Optimizely contract before all in-flight experiments complete on the old platform.

---

## PostHog to Eppo

Trigger. Statistical rigor becomes the binding constraint. A data team has joined or grown, and a critical experiment surfaced a wrong-result decision that PostHog's defaults did not catch.

Effort. 6 to 10 engineer-weeks. The migration is harder because PostHog includes session replay, error tracking, and analytics that Eppo does not replace. Plan for a dual-platform end state.

First 30 days plan.
- Week 1: Define the scope. Eppo replaces experiments. PostHog stays for analytics, replay, and tracking. Document which surface owns what.
- Week 2: Wire Eppo SDK alongside PostHog. Configure metric definitions in the warehouse.
- Week 3: Run one parallel experiment. Compare statistical conclusions. Investigate any disagreement; this is where the rigor difference shows up.
- Week 4: Decision review. Commit to the dual-platform end state or rethink scope.

30-90 day cutover plan.
- New experiments start in Eppo. Existing experiments complete in PostHog.
- Build the metric definition layer in the warehouse so both platforms can agree on what "activation" means.
- Set up reconciliation dashboards. The two platforms will disagree on edge metrics; surface those proactively rather than letting stakeholders find them.

What NOT to do.
- Try to retire PostHog. The non-experiment features (replay, tracking, analytics) do not have a clean Eppo replacement.
- Skip the warehouse metric layer. Without it, the two platforms compute metrics differently and stakeholders lose trust in both.
- Use Eppo for the small experiments where statistical depth is overkill. The analyst overhead per experiment is higher in Eppo than in PostHog.

---

## GrowthBook to Eppo

Trigger. Team growth and a desire for commercial support, deeper Bayesian and sequential testing features, and decision-oriented reporting.

Effort. 2 to 4 engineer-weeks. This is the easiest migration in the playbook because both platforms are warehouse-native; the data already lives in your stack.

First 30 days plan.
- Week 1: Provision Eppo. Reuse the warehouse connection.
- Week 2: Recreate metric definitions. Most translate cleanly.
- Week 3: Run 1 to 2 parallel experiments to validate.
- Week 4: Cutover. New experiments in Eppo. In-flight in GrowthBook complete on GrowthBook.

30-90 day cutover plan.
- Migrate active flag rollouts to Eppo if Eppo's flag features are sufficient.
- Retire GrowthBook 30 to 60 days after the last in-flight experiment completes.

What NOT to do.
- Migrate flags if Eppo's flag features do not match. Run a separate flag platform if needed.
- Cancel GrowthBook before all dashboards are recreated.

---

## Any to Statsig (consolidation)

Trigger. Multi-platform mess. Common when a company has accumulated 2 to 3 platforms over time and wants to consolidate.

Effort. 6 to 12 engineer-weeks, scaling with the number of platforms and in-flight experiments.

First 30 days plan.
- Week 1: Inventory. List every experiment, flag, and dashboard across all platforms. Identify the canonical source of truth where they disagree.
- Week 2: Statsig provisioning. Configure metrics. Validate event volume matches.
- Week 3: Migrate the simplest 5 experiments. Validate results.
- Week 4: Migration plan with explicit retirement dates per old platform.

30-90 day cutover plan.
- Per-platform retirement. Pick one of the old platforms to retire first (usually the smallest user base).
- Communicate retirement dates clearly. Stakeholders need 30 days of warning per platform.
- Build dashboards before retiring; never after.

What NOT to do.
- Try to retire all old platforms at once. Sequential retirement is slower but lower risk.
- Skip the inventory step. Discovering a forgotten experiment in production after retirement is the failure mode.
- Underestimate the team training cost. Multi-platform teams have built workflow muscle memory across all of them; consolidation requires retraining.

---

## Validation: how to know the migration succeeded

Three signals that the migration is complete and successful.

1. **All in-flight experiments completed on the original platform.** No experiment was stranded mid-test.
2. **Metric values match within statistical noise on the new platform** for at least 30 days post-cutover. Variance over 1 to 2% needs investigation.
3. **The team is shipping experiments at the pre-migration rate or faster** within 60 days of cutover. If velocity has not recovered, retraining or workflow changes are still needed.
