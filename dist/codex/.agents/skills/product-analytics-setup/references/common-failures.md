# Common failures

Twelve patterns that recur across product analytics setups. For each: name, symptom, root cause, fix, prevention.

---

## 1. We have data but cannot trust it

**Symptom.** The team has years of events. Two analysts run the same query and get different numbers. Stakeholders ask for "the real number" and the answer is "it depends."

**Root cause.** Naming and schema drift over time. Same event name has slightly different semantics in different code paths. Properties have inconsistent types or values.

**Fix.** Schema audit. Identify the canonical events; deprecate the duplicates and aliases. Standardize property types. Document the canonical definitions.

**Prevention.** Schema in code (TypeScript interface or JSON Schema). CI lint that rejects schema violations. Naming convention enforcement.

---

## 2. Funnel says 80% drop-off but real conversion is fine

**Symptom.** The activation funnel shows 20% conversion. The team knows from revenue numbers that real activation is 60%.

**Root cause.** Wrong anchor event (using a too-broad event like `page_view` as the start) or wrong time window (asking for activation within 24 hours when the real cycle is 14 days).

**Fix.** Audit the funnel definition. Anchor on a high-intent event (signup, trial start). Set the time window to match the actual activation cycle.

**Prevention.** Document the funnel anchor and window in the funnel definition itself, not implicit in dashboard text. Review funnels at each quarterly audit.

---

## 3. Retention curve is flat at 5%

**Symptom.** Retention curve drops fast then plateaus at 5%. The team panics; only 5% of users are active.

**Root cause.** Not always a problem. Some products are power-user products with small but engaged bases (developer tools, niche B2B software). The 5% may be the natural shape.

**Fix.** Compare against business reality. If 5% retention with strong unit economics, the curve is healthy. If 5% retention and the business model assumes 20% retention, then it is a problem and the cohort needs investigation.

**Prevention.** Set retention targets based on business model assumptions, not industry benchmarks. The right retention for a niche tool is different from the right retention for a consumer app.

---

## 4. Mixpanel says 1000 conversions, warehouse says 800

**Symptom.** Two systems report different conversion counts for the same event.

**Root cause.** Identity stitching mismatch. Mixpanel may stitch anonymous-to-authenticated differently than the warehouse. Server-side and client-side fires of the same event may not deduplicate correctly. Time-window differences (Mixpanel using event time, warehouse using ingest time).

**Fix.** Pick one source as canonical (warehouse for board metrics, tool for in-flight). Reconcile the gap by understanding the cause. Document the expected gap so stakeholders are not surprised.

**Prevention.** Identity stitching pattern documented and consistent. Server-side and client-side firing for the same event handled with explicit deduplication. Use a single time field consistently.

---

## 5. Dashboards take 30 seconds to load

**Symptom.** The team's main dashboard takes 30+ seconds to refresh. Reviewing a metric becomes a coffee break.

**Root cause.** Over-broad queries (scanning years of data for a 30-day metric). Unindexed properties used as filters. Schema bloat from too many events or too many properties on each event.

**Fix.** Profile the slow queries. Add date filters. Index the filter properties. Pre-aggregate metrics into a daily summary table; query the summary, not the raw events.

**Prevention.** Set query budgets per dashboard (target: under 5 seconds). Audit performance during the quarterly audit. Cap the data volume per query.

---

## 6. Everyone has their own definition of MAU

**Symptom.** Three people compute MAU; three different numbers.

**Root cause.** No canonical definition. One person counts unique user_ids firing any event. Another counts users who fired a specific qualifying event. Another counts authenticated users only.

**Fix.** Write a canonical metric document. "MAU is unique user_ids firing any event in the last 30 days, deduplicated, excluding employee accounts (employees identified by email domain) and excluding test accounts (account_type = 'test')." Force everyone to use this definition.

**Prevention.** Canonical metric document maintained as living documentation. Every dashboard's metric definitions reference the canonical document. Disagreements get resolved by updating the document, not by recomputing on the fly.

---

## 7. We track every button click

**Symptom.** The event list has 800 events. Many are individual button clicks. Dashboards are slow; analyses produce noise.

**Root cause.** Tracking UI events (clicks, hovers, page views) rather than semantic events (created, completed, shared). Each button gets its own event "for completeness."

**Fix.** Audit the event list. Deprecate UI events. Replace with semantic events that capture user intent.

**Prevention.** Naming convention enforcement (verbs are events; UI states are properties). Code review on new events asks "is this a semantic event or a UI event?" UI events get rejected unless there is a specific use case.

---

## 8. Our event names changed three times

**Symptom.** `signup_complete`, then `signupCompleted`, then `user_signed_up`. Dashboards reference all three; nobody knows which is current.

**Root cause.** No versioning. Each rename happened without coordination, leaving old events in the warehouse and old queries in the dashboards.

**Fix.** Migrate to a single canonical version. Use the `_v2` pattern if semantics changed. Deprecate old versions explicitly. Update all dashboards.

**Prevention.** Versioning pattern in the schema documentation. Schema review on every PR that adds or modifies an event. CI lint on event names.

---

## 9. Analytics tool says iOS users converted 3% but warehouse says 5%

**Symptom.** iOS conversion rate looks bad in the analytics tool but fine in the warehouse.

**Root cause.** iOS Intelligent Tracking Prevention (ITP) blocks third-party cookies, breaking attribution for iOS users. The analytics tool models the missing data; the warehouse uses server-side conversion tracking that is unaffected.

**Fix.** Treat iOS analytics-tool data with extra skepticism. Use the warehouse for canonical iOS metrics. Set up server-side event tracking (Conversions API for Meta, server-side GA4) where possible.

**Prevention.** Document the iOS measurement gap. Pair every iOS-specific metric with a note on the data source.

---

## 10. We cannot answer simple questions

**Symptom.** Stakeholder asks: "How many users came back this week?" Three days of analyst time later, still no clean answer.

**Root cause.** Under-instrumented or wrong abstraction layer. The events list does not include the right event. The user identity layer does not stitch correctly. The cohort definition is too narrow or too broad.

**Fix.** Audit the event list against the questions the team actually asks. Fill gaps with new events; fix identity stitching; create canonical cohorts for the most common questions.

**Prevention.** Quarterly review of the question backlog. Map questions to events; identify gaps. Fill gaps proactively, not after the question goes unanswered.

---

## 11. Two analysts compute different MAU on the same data

**Symptom.** Same query, same data, different numbers. The discrepancy is not because of a definition disagreement; it is because the queries silently return different rows.

**Root cause.** Different identity stitching layers. One query uses user_id; another uses anonymous_id with stitching applied at query time. Edge cases (users who logged out and back in, users on multiple devices) get counted differently.

**Fix.** Pick one canonical identity layer. Build a `dim_users` table in the warehouse that resolves identity once. Force all queries to join through this table.

**Prevention.** Identity-stitching pattern documented. New queries use the canonical table. Code review rejects queries that bypass the layer.

---

## 12. Numbers different than last quarter for no reason

**Symptom.** A dashboard's metrics shifted between Q1 and Q2 by 30%. No product change, no instrumentation change... or so it seems.

**Root cause.** Underlying schema changed without versioning. An event was renamed; the dashboard's query points at the old name and now silently returns nothing or returns a different cohort. Often discovered weeks after the fact.

**Fix.** Audit the dashboard's query against the current schema. Update to current event names. Check for similar drift in other dashboards.

**Prevention.** Versioning pattern enforced. CI lint catches event renames before they ship. Quarterly dashboard audit catches drift early.

---

## The pattern across all twelve

Most product analytics failures share one root cause: cutting corners during instrumentation produces compounded debt that surfaces months later as untrustworthy data. The team that ships without a tracking plan saves an hour at instrumentation time and pays 20+ hours at audit time.

The fix at the meta level. Treat instrumentation as a first-class engineering concern. Schema in code. Naming convention enforced. Quarterly audits. Single source of truth for canonical metrics. Instrumentation debt is real; the discipline of paying it down regularly is the only thing that keeps the data trustworthy.
