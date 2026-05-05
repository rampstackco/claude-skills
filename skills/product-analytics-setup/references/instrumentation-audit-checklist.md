# Instrumentation audit checklist

The quarterly playbook for keeping product analytics trustworthy. Five categories: schema, volume, dashboard freshness, ownership, deprecation.

The principle. Instrumentation decays without active maintenance. Quarterly audits catch decay early; without them, the team ends up with the "we have data but cannot trust it" problem.

---

## 1. Schema review

Goal. Ensure the event taxonomy and property schema match the canonical contract.

Steps.

- **Pull the event list from the analytics tool.** Mixpanel: Lexicon. Amplitude: Govern. PostHog: Data Management. Or directly from the warehouse if warehouse-native.
- **Compare against the schema definition in code.** Every event in the tool should appear in the schema; every event in the schema should appear in the tool.
- **Flag drift.** Events firing without a schema entry. Schema entries with no events firing in the last 90 days. Property type mismatches between schema and observed values.
- **Audit naming.** Events that do not match the naming convention (snake_case, past tense, object-action). Property names with inconsistent casing or typo variants.
- **Action items.** For each drift item, decide: fix the schema, fix the tracking code, or deprecate the event. Document the decision.

Cadence. Quarterly. More frequently if the team is shipping rapidly.

---

## 2. Volume sanity check

Goal. Confirm event volumes match expectations.

Steps.

- **Pull weekly event counts** for the last 90 days. Group by event name.
- **Identify volume anomalies.** Sudden drops (deployment broke instrumentation). Sudden spikes (a new code path is firing the event excessively or a bot is hitting the endpoint). Events whose volume drifts steadily down (the feature behind them was deprecated; instrumentation should follow).
- **Check ratios.** If `signup_started` fires 10x more than `signup_completed`, signup completion is broken or the events fire under different conditions than expected. If `checkout_started` fires more than `add_to_cart`, the events are misordered or one fires automatically.
- **Compare against business reality.** The dashboard says 50,000 weekly signups; the warehouse says 38,000 paying customers were acquired in the same period. The gap is fine if the business is in trial mode; alarming if the gap should be smaller.
- **Action items.** For each anomaly, identify the cause. Either the instrumentation is broken (fix it), the business changed (update expectations), or the event semantics drifted (version it).

Cadence. Quarterly minimum. Real-time alerts on the highest-volume events for major deviations.

---

## 3. Dashboard freshness review

Goal. Identify dashboards that have rotted.

Steps.

- **Pull the dashboard inventory** from the analytics tool or BI platform.
- **Check last-viewed dates.** Dashboards not viewed in the last 90 days are candidates for deprecation. Dashboards not viewed in the last 180 days are almost always stale.
- **Check last-edited dates.** A dashboard last edited 18 months ago whose underlying schema changed is silently broken. Audit whether the dashboard's metrics still compute correctly.
- **Check ownership.** Every dashboard should have a named owner. Dashboards with no owner or with an owner who has left the company need reassignment or deprecation.
- **Spot-check key metrics.** Pick 5 to 10 dashboards. Compute the same metric directly from the warehouse. Compare. Drift over 5% needs investigation.
- **Action items.** Reassign orphan dashboards. Deprecate stale dashboards. Fix or rewrite dashboards that have drifted from underlying truth.

Cadence. Quarterly.

---

## 4. Owner assignment audit

Goal. Every event, dashboard, cohort, and saved query has a named owner who can answer questions about it.

Steps.

- **Pull the ownership map** for events, dashboards, cohorts, saved queries. Most analytics tools support tagging or property fields for owner.
- **Identify orphans.** Items with no owner. Items whose owner has left the company.
- **Reassign.** For each orphan, assign a new owner or deprecate. Owner means "the person who can explain why this exists and what depends on it." It is not a vanity tag.
- **Document the chain of custody.** If the original owner left and the new owner is unfamiliar with the history, write down what you know.
- **Action items.** Update the ownership tags. Notify owners of items they are now responsible for. Set up a review cycle (every 6 months minimum) for owners to confirm or release ownership.

Cadence. Quarterly minimum. Whenever someone leaves the team, immediately for their owned items.

---

## 5. Deprecation candidates

Goal. Identify and remove instrumentation, cohorts, and dashboards that no longer serve a purpose.

Steps.

- **Identify candidate events.** Events whose volume is below 10 per week. Events not referenced in any active dashboard or query in the last 90 days. Events that are duplicate or near-duplicate of other events.
- **Identify candidate cohorts and saved queries.** Items not used in the last 90 days. Items whose source data is now stale.
- **Identify candidate dashboards.** Already covered in step 3; gather candidates here.
- **Soft deprecation.** Tag items as deprecated; remove from default views. Wait 30 days. If anyone notices, reverse the deprecation; if nobody notices, hard delete.
- **Communicate.** Post the deprecation list to the data channel. Anyone with a use case has 14 days to push back.
- **Action items.** Soft deprecate. Wait. Hard delete on the next audit if no objections.

Cadence. Quarterly. Hard deletion happens at the next audit, not the same one.

---

## The audit deliverable

Each quarterly audit produces a written report with five sections matching the steps above. The report includes.

- **What changed since the last audit.** Events added, removed, renamed. Schema migrations completed.
- **Drift identified.** Events firing without schema entries. Property type mismatches. Volume anomalies.
- **Decisions made.** What was fixed, what was deprecated, what was deferred.
- **Open items.** Drift not yet resolved. Pending decisions. Owners reassigned but not yet confirmed.
- **Forward planning.** Schema changes anticipated next quarter. Dashboards likely to be migrated. Events likely to be deprecated.

The report goes to the data team and the eng leads. It does not need to go to the entire company; the value is in the discipline of writing it.

---

## When to skip an audit

Never. The cost of skipping a quarter compounds. The team that audits twice a year ends up doing 3x the work each audit; the team that audits quarterly maintains a steady state.

The exception. A team in a 30-day sprint to launch a major product version may defer one audit by 4 to 6 weeks. After that, the audit is overdue and the discipline is at risk.

---

## What the audit is not

Three things to avoid.

- **Not a witch hunt.** The audit identifies drift, not blame. Many drift items are produced by good-faith engineering decisions that did not include the analytics-debt cost.
- **Not perfectionism.** Some drift is acceptable. Aim for 95% clean, not 100%. Spending the audit cycle chasing the last 5% leaves real problems unaddressed.
- **Not silent.** The audit produces a deliverable. Without the deliverable, the audit happened in someone's head; it does not transfer to the next quarter or the next team.
