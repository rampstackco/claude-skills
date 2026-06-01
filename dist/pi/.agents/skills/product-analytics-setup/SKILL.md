---
name: product-analytics-setup
description: "How to actually instrument product analytics correctly. Event taxonomy, property design, naming conventions, schema versioning, identity stitching, funnel design, retention cohorts, North Star metric selection, dashboard hygiene, instrumentation debt, and the failure modes that produce data nobody trusts. Triggers on product analytics setup, event taxonomy, tracking plan, instrumentation, schema versioning, North Star metric, retention cohorts, funnel design, naming conventions, instrument new feature, audit existing analytics, dashboard reconciliation, instrumentation debt, Mixpanel setup, Amplitude setup, PostHog setup, warehouse-native analytics. Also triggers when the team has data but cannot trust it, or when designing instrumentation for a new feature, or when auditing an existing setup that has drifted."
category: product
catalog_summary: "Instrument product analytics correctly: event taxonomy, properties, naming conventions, schema versioning, funnels, retention cohorts, North Star selection, and the instrumentation debt that compounds without discipline"
display_order: 8
---

# Product Analytics Setup

A senior PM and analyst's playbook for instrumenting product analytics correctly the first time.

Most product analytics setups are some combination of inherited mistakes, dashboard sprawl, and events nobody trusts. The team launches a new feature; instrumentation gets bolted on under deadline pressure; naming drifts; properties are inconsistent; six months later nobody can answer simple questions because the answer depends on which event you trust.

This skill is the discipline that prevents that. It assumes you have answered the strategic questions about what to measure (see `analytics-strategy`). It assumes you have a tool connected (Mixpanel, Heap, PostHog, Amplitude, or warehouse-native via BigQuery, Snowflake, or dbt). The hard part is the systematic execution: naming conventions, property design, schema versioning, funnel construction, cohort definitions, retention measurement.

When to use this skill: setting up product analytics from scratch, auditing an existing instrumentation, fixing a "we have data but cannot trust it" problem, or designing instrumentation for a new feature.

---

## What this skill is for

This skill spans instrumentation execution. It does not cover measurement strategy (use `analytics-strategy`), experimentation result interpretation (use `experimentation-analytics`), paid media analytics (use `ads-performance-analytics`), or platform decisions (use `experimentation-platform-orchestrator`). Pair this skill with the relevant integrations microsite for your specific tool.

The clean distinction from analytics-strategy. That skill (Growth category) is strategic: what to measure and why, KPI hierarchy, dashboard architecture, attribution models. This skill (Product category) is execution: how to actually instrument the product correctly. The two compose. Read analytics-strategy first to decide what matters; read this skill to instrument it.

---

## The instrumentation hierarchy

The mental model. Every analytics setup is a stack of layers. Each layer depends on the one below it being correct.

- **Events** are the atomic facts: `user_signed_up`, `checkout_completed`, `feature_x_used`.
- **Properties** describe events: who, what, where, when, with what context.
- **Identities** map events to people: `anonymous_id`, `user_id`, `account_id`.
- **Cohorts** are filters across events: "users acquired via paid in March."
- **Funnels** are sequences of events: signup, then activated, then first paid action.
- **Retention** measures repeat behavior: signups still active at week N.

You cannot construct higher levels without correct lower levels. Garbage events produce garbage funnels. The discipline is bottom-up. Most "we have data but cannot trust it" problems trace back to the bottom two layers.

---

## Event taxonomy design

Three rules for event design.

1. **Past tense, action-oriented.** `checkout_completed`, not `checkout_complete` or `completing_checkout`. Past tense reads as "this happened" rather than as a state.
2. **Object-action format.** Noun then verb. `video_played`, `form_submitted`, `email_opened`. Reading the event name aloud should describe what happened.
3. **Granular but not redundant.** Track distinct user actions, not button clicks. Fire `checkout_completed` once at the moment of completion, not `submit_button_clicked` plus `checkout_completed`. UI events are noise; semantic events are signal.

The verbs vs states trap.

- Verbs ARE events. `checkout_completed`, `subscription_canceled`, `account_upgraded`.
- States are NOT events; they are properties. `user_status: active` is a property on the user, not an event. Setting state via events ("status_changed_to_active") is a code smell that produces double-counting.

How many events to design. Thirty to fifty events is the sweet spot for a typical SaaS product. Below twenty means under-instrumented; above one hundred almost always means tracking UI noise or duplicating events in different formats.

Detail and a canonical event spec in [`references/event-taxonomy-template.md`](references/event-taxonomy-template.md).

---

## Property design: event-level vs user-level

Two property types, treated separately.

**Event-level properties** describe THIS event. The `checkout_completed` event has properties like `cart_value`, `item_count`, `payment_method`, `discount_code`. They live on the event payload and are immutable once fired.

**User-level properties** describe the USER over time. `subscription_tier`, `lifetime_value`, `acquisition_channel`. Set them once on the user profile; the analytics tool joins them onto every event the user fires. They update over time as the user changes.

The trap. Putting user-level properties on every event. Do not track `subscription_tier` on every event payload; set it once on the user profile and rely on the join. Putting it on the event creates payload bloat, schema drift when the value changes, and reporting confusion when a user upgrades mid-session.

Data type discipline.

- **Strings** for enums: status, tier, channel, region. Enumerable values where the set is bounded.
- **Numbers** only for actual numbers: count, value, duration, score. Never use strings for numeric data ("free trial day 7" should be `trial_day: 7`).
- **Booleans** for actual booleans: `is_admin`, `has_trial`, `is_new_user`. Two values; nothing else.
- **Timestamps** in ISO 8601, always. Always. The number of bugs caused by inconsistent date formats is uncountable.
- **Arrays** rarely. An array property is usually a sign you should split into multiple events with one item per event.

Worked example in [`references/property-design-patterns.md`](references/property-design-patterns.md) showing right and wrong design for a `product_viewed` event.

---

## Naming conventions

Pick ONE convention and enforce it. Three conventions worth picking.

- **snake_case** for events and properties: `user_signed_up`, `cart_value`. Most platforms default to this; pushback is rarely worth it.
- **Object-action format** for events: `user_signed_up`, `video_played`. Reading the name should describe what happened.
- **Verb-noun for user properties** (or just nouns): `subscription_tier`, `is_admin`, `last_active_at`.

What NOT to do.

- Mixed case across events. `user_signedUp`, `User Signed Up`, `userSignedUp` all coexisting in the same project. Pick one and migrate.
- Spaces in event or property names. "Sign Up Completed" breaks every URL-encoding scenario and confuses every tool.
- Inconsistent verbs. `user_signed_up` plus `completedCheckout` plus `VIEW_PRODUCT` in the same project means nobody can predict an event name without looking it up.
- Brand names in event names. `mailchimp_email_opened` ages badly when you switch to Customer.io.

The naming convention reference file provides a complete style guide. Cite it in your team's data contract.

Detail in [`references/naming-convention-reference.md`](references/naming-convention-reference.md).

---

## Schema versioning

Schema changes are inevitable. The pattern.

**Additive changes** are safe. New event, new property on an existing event, new value in an enum. Just ship. Existing dashboards continue to work.

**Breaking changes** require migration. Renamed event, removed property, changed property type, narrowed enum. These break dashboards downstream; the migration plan is part of the change.

Versioning patterns.

- Append `_v2` to events when semantics change. `checkout_completed_v2` fires alongside `checkout_completed` during a transition.
- Keep old events firing during the transition (90 days is typical). Both versions fire; analytics queries gradually migrate to v2.
- Migrate dashboards to v2 before retiring v1. Then deprecate v1 explicitly with a documentation note.

The data contract idea.

- Document the canonical schema in code: TypeScript interface, JSON Schema, or Protobuf definition.
- Code review every schema change. Schema is product, not afterthought.
- CI lint rejects schema violations before they hit production. The deploy that adds an event with the wrong type fails the build.

Detail in [`references/schema-versioning-patterns.md`](references/schema-versioning-patterns.md).

---

## Funnel design

Funnels measure progression through a sequence. Four rules.

1. **Order matters.** A then B then C is a different funnel from B then A then C. The platform will compute different conversion rates depending on order.
2. **Time windows matter.** Most funnels use a 1 to 30 day window from the first event. Document the window explicitly; "users who completed signup AND activated" is meaningless without "within 14 days."
3. **Drop-off interpretation is hard.** Eighty percent of users dropping at step 2 might be the funnel design (audience is wrong), might be the audience (timing is wrong), or might be the product (genuine drop-off). Investigate before declaring.
4. **The anchor event pattern.** Every funnel starts with a high-intent action: signup, trial start, key feature use. Not a vanity event like `page_view` or `session_start`. Vanity-event-anchored funnels show 99% drop-off and tell you nothing.

Common funnel mistakes.

- Funnels that include events firing automatically. `session_started` happens for every visit; using it as a step inflates the denominator and makes the rest of the funnel meaningless.
- Funnels too long (10+ steps). Break into two or three shorter funnels. A 10-step funnel produces near-zero end-to-end conversion that is hard to interpret.
- Funnels with the same event in multiple positions. The platform handles this poorly; the analyst handles it worse.
- Mixing different time windows in one funnel. "Users who signed up within 7 days AND converted within 30 days" is two different cohort definitions glued together.

Common funnel shapes and time-window guidance in [`references/funnel-design-templates.md`](references/funnel-design-templates.md).

---

## Cohort definitions

A cohort is a group of users sharing an attribute or behavior. Useful patterns.

- **Acquisition cohorts.** Users acquired in month X. The standard for retention analysis.
- **Behavioral cohorts.** Users who completed action Y. Useful for activation analysis ("users who sent first message in week 1").
- **Property cohorts.** Users with `subscription_tier: pro`. Useful for segment-level analysis.
- **Combined cohorts.** Signup in March AND completed onboarding AND in EU. The most common in real analytics work.

Cohort discipline.

- Define cohorts in code (or in your tool's saved-cohort feature) so they are reusable.
- Version them when criteria change. Compare apples-to-apples.
- Do not compare a 30-day-old cohort to a 365-day-old cohort on retention; the older cohort has had more time to retain by definition.

Detail in [`references/cohort-definition-patterns.md`](references/cohort-definition-patterns.md).

---

## Retention measurement

Retention is repeat behavior over time. Three flavors.

- **N-day retention.** Did user X come back on day 7, day 14, day 30 specifically. High noise on any single day; useful for short-cycle products.
- **Bracket retention.** Did user X come back at any point during the week 7 to 13 window. More stable than N-day; reads cleaner on retention curves.
- **Unbounded (rolling) retention.** Did user X come back any time after signup. Useful for longer-cycle products where weekly cadence is misleading.

For most SaaS products, bracket retention is the right default. Day-7 is high-noise; week-2 (bracket) is more stable. Day-1 retention is almost always over-indexed to onboarding effects rather than product-market-fit signal.

Retention curve interpretation.

- Steep early drop, then plateau. The product has core users; the rest churn fast. Typical for most SaaS products.
- Gradual decay across weeks with no plateau. No one is sticking. Usually a value-prop or onboarding problem; the product is not delivering recurring value.
- Flat line at low percentage. A power-user product with a small but engaged base. Not a problem; just a different shape.

Detail in [`references/retention-measurement-patterns.md`](references/retention-measurement-patterns.md).

---

## North Star and supporting metrics

North Star metric (NSM) selection rules.

- Reflects user value, not company value alone.
- Captures the core action that, if it grows, the business grows.
- Measurable consistently across time.
- Hard to game.

Bad NSMs. Signups (vanity; many signups never activate). Revenue (lagging; not action-oriented; varies by mix). DAU (only useful for engagement-driven products; misleads on monthly-cadence products).

Better NSMs. Weekly active editors (Figma). Nights booked (Airbnb). Messages sent per day (Slack). Products created per workspace per week (Linear). Each names a user-value action that maps to business growth.

Supporting metrics framework.

- One NSM.
- Three to five input metrics that drive the NSM. For "weekly active editors" these might be: signups per week, signup-to-active conversion rate, week-over-week active retention.
- Five to ten health metrics that warn of problems. Monthly churn rate, account-level concentration, support ticket volume.

Detail and product-type-specific examples in [`references/north-star-metric-selection.md`](references/north-star-metric-selection.md).

---

## The trustable dashboard principle

A dashboard is trustable when four things are true.

1. **Each metric has a clear definition** documented inline. Not "active users" but "users who fired any event in the last 7 days, deduplicated by user_id, excluding employees."
2. **Each metric has a known data source.** Not "from the warehouse" but "from `fct_orders`, last 30 days, joined to `dim_customers`."
3. **Each metric has known caveats.** Modeled iOS conversions excluded. Internal employees excluded. Test users in QA accounts excluded.
4. **Each metric is reproducible.** The same query, run tomorrow, produces the same number for the same time period.

The stale dashboard failure mode. A dashboard built two years ago is still in use. The underlying schema changed; the dashboard's query points at columns that no longer exist or now mean something different. The team makes decisions on broken numbers and does not realize until something breaks loudly.

Prevention. Every dashboard has an owner, a refresh cadence, and a quarterly audit. Dashboards without an owner get deprecated. Dashboards that have not been refreshed in 90 days get deprecated. The half-life of a dashboard is shorter than the half-life of the product.

---

## Instrumentation debt

The compounding cost of cutting corners.

- New feature ships without instrumentation: 1 hour saved.
- Six months later: nobody can answer "is feature X working?"
- Cost to retroactively instrument: 20 hours (re-deploy, backfill, validate).
- Cost in lost decisions during the gap: untrackable but real. Decisions get made on intuition rather than data; sometimes the intuition is wrong.

Instrumentation debt is real and compounds like technical debt. The discipline.

- Every PR for new functionality includes instrumentation. The PR template asks "what events does this fire?" and rejects the PR if the answer is none.
- Quarterly schema audits. Identify orphan events (firing but not used in any dashboard or query) and deprecate them. Identify gaps (features without events) and fill them.
- "If we cannot measure it, we do not ship it" with explicit exceptions for genuinely experimental features where the cost of instrumentation exceeds the value of the data.

Detail in [`references/instrumentation-audit-checklist.md`](references/instrumentation-audit-checklist.md).

---

## Common failure modes

Twelve patterns recur across product analytics setups. The short version.

- "We have data but cannot trust it." Naming and schema drift. Fix is a schema audit plus naming convention enforcement.
- "Our funnel says 80% drop-off but real conversion is fine." Wrong anchor event or wrong window. Fix the funnel definition.
- "Retention curve is flat at 5%." Often not a problem. Power-user products genuinely have small engaged bases. Compare against business reality before treating as a fix-it.
- "Mixpanel says 1000 conversions, warehouse says 800." Attribution plus identity stitching mismatch. Reconcile against warehouse for canonical numbers.
- "Dashboards take 30 seconds to load." Over-broad queries, unindexed properties, or schema bloat. Profile and refactor.
- "Everyone has their own definition of MAU." No canonical metric document. Ship one; force everyone to use the same definition.
- "We track every button click." UI noise. Audit and remove events that are not used by any dashboard or query.
- "Our event names changed three times." No versioning. Migrate to a versioning pattern; freeze further renames.
- "Analytics tool says iOS users converted 3% but warehouse says 5%." iOS Intelligent Tracking Prevention plus modeled conversions. Treat platform iOS data with extra skepticism.
- "We cannot answer simple questions." Under-instrumented or wrong abstraction layer. Audit the events list against the questions the team is asking; fill the gaps.
- "Two analysts compute different MAU." Different identity stitching. Pick one canonical identity layer and make everyone query from it.
- "Numbers are different than last quarter for no reason." Underlying schema changed without versioning. The dashboard quietly broke; nobody noticed until the gap got large.

Detail in [`references/common-failures.md`](references/common-failures.md).

---

## The framework: 12 considerations for trustable product analytics

When designing or auditing product analytics, walk these 12 considerations. Skipping any of them is how the team ends up with data nobody trusts.

1. **Event taxonomy.** Past tense, object-action, granular but not redundant. Verbs are events; states are properties.
2. **Property design.** Event-level vs user-level. Type discipline. ISO 8601 timestamps everywhere.
3. **Naming conventions.** Pick one and enforce it. snake_case wins by default.
4. **Schema versioning.** Additive vs breaking. `_v2` suffix during transitions. Data contract in code.
5. **Identity stitching.** Anonymous to authenticated, cross-device, cross-tool. One canonical identity layer.
6. **Funnel design.** Anchor on high-intent events. Document time windows. No auto-firing events as steps.
7. **Cohort definitions.** Reusable, versioned, apples-to-apples. Defined in code or saved in the tool.
8. **Retention measurement.** Bracket over N-day for stability. Compare cohorts at matched ages.
9. **North Star.** Captures user value. Hard to game. One NSM, three to five inputs, five to ten health metrics.
10. **Dashboard hygiene.** Definitions, sources, owners, refresh cadence. Stale dashboards get deprecated.
11. **Instrumentation debt.** Every PR includes instrumentation. Quarterly audits.
12. **Single source of truth.** Warehouse for board metrics. Tool for in-flight optimization. Reconcile when they disagree.

The output of the framework is a tracking plan. A list of events with their properties, the canonical user identity, the named cohorts, the named funnels, the retention measurement choice, the named NSM, the dashboard owners. The plan lives in code and gets reviewed like any other product spec.

---

## Reference files

- [`references/event-taxonomy-template.md`](references/event-taxonomy-template.md) - Canonical event spec for typical SaaS: account, user, activation, engagement, conversion, retention events with required properties.
- [`references/property-design-patterns.md`](references/property-design-patterns.md) - Event-level vs user-level patterns. Type discipline. Worked example: `product_viewed` right vs wrong.
- [`references/naming-convention-reference.md`](references/naming-convention-reference.md) - Complete style guide. snake_case, past tense, object-action. Boolean prefixes. Money in cents. Timestamps with `_at` suffix. Do/don't side-by-side.
- [`references/schema-versioning-patterns.md`](references/schema-versioning-patterns.md) - Additive vs breaking changes. `_v2` suffix pattern. Data contract in TypeScript. CI lint patterns.
- [`references/funnel-design-templates.md`](references/funnel-design-templates.md) - Activation, conversion, engagement, feature adoption funnels. Time windows, anchor events, drop-off interpretation.
- [`references/cohort-definition-patterns.md`](references/cohort-definition-patterns.md) - Acquisition, behavioral, property, combined cohorts. SQL examples plus tool-specific examples.
- [`references/north-star-metric-selection.md`](references/north-star-metric-selection.md) - NSM rules with examples by product type. Anti-patterns. Migration patterns when changing NSM.
- [`references/instrumentation-audit-checklist.md`](references/instrumentation-audit-checklist.md) - Quarterly audit playbook: schema review, volume sanity checks, dashboard freshness, owner audit, deprecation candidates.
- [`references/common-failures.md`](references/common-failures.md) - Twelve failure patterns with symptom, root cause, fix, prevention.

---

## Closing: when in doubt, instrument less

Most product analytics setups are over-instrumented, not under-instrumented. Tracking every button click produces noise that drowns the signal. The discipline of saying "we do not need to track that" is harder than "let us track that just in case." Default to less.

The data you do not have can be added later. The data you over-collected costs you forever, in dashboard performance, in schema complexity, in signal-to-noise. The team that ships with thirty well-designed events and a small set of named cohorts outperforms the team that ships with two hundred events and no cohort discipline.

When the team disagrees on whether to add an event, the question is not "could this be useful?" but "what specific decision will this event inform, and is the decision worth the instrumentation cost?" If the answer is "we might want to know" the answer to the question is no.
