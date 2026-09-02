# Multi-platform orchestration

When multi-platform is genuine, three coordination patterns are non-negotiable: an ownership matrix, shared metric definitions, and reconciliable dashboards.

This reference is for the 20% of teams whose surfaces genuinely warrant more than one platform. The 80% should consolidate. If you are not sure which group you are in, the test is whether the platforms overlap. Zero overlap is a candidate for multi-platform; any overlap is a candidate for consolidation.

---

## When multi-platform is warranted

The pattern is: different surface, different audience, different metric set, no overlap.

**Marketing site plus product app.** Kameleoon for personalization on the marketing site. Statsig for product experiments. The marketing site's metrics (conversion to signup, page-level engagement) do not collide with the product app's metrics (activation, retention, revenue). The two surfaces are run by different teams with different cadences.

**Content site plus product app.** Optimizely or Kameleoon for content experiments. PostHog or Statsig for product. Same pattern: different surface, different audience.

**Pre-acquisition multi-tool reality.** Two products from two acquired companies on different platforms. Multi-platform is the temporary reality; consolidation is the eventual answer. Plan a retirement date during the integration project.

**Specialized statistical needs.** A core product on Statsig plus a specialized statistical workload (causal inference, network effects analysis) running on a separate tool. Rare but legitimate when the specialty platform has capabilities the primary platform lacks.

---

## When multi-platform is a mess

Three signals that the multi-platform setup has drifted into a consolidation candidate:

1. **The same experiment can be defined on more than one platform.** Stakeholders ask "which one are we using?" and the answer is unclear.
2. **Metrics differ between platforms.** "Activation rate" computes one way in Statsig and another way in PostHog. Stakeholders see two numbers and trust neither.
3. **Operational overhead exceeds the value of platform diversity.** Engineers spend more time keeping platforms in sync than they save by using each platform's strengths.

If two of three apply, plan a consolidation.

---

## The ownership matrix

The first artifact of a multi-platform setup is an explicit ownership matrix. It names which platform owns which surface, which metrics, and which experiments. Disagreements between platforms are resolved against the matrix.

| Surface | Primary platform | Secondary platform (if any) | Owner |
|---|---|---|---|
| Marketing site | Kameleoon | None | Marketing team |
| Product app | Statsig | None | Product team |
| Mobile app | Statsig | None | Mobile team |
| Email | None | None | n/a |
| Pricing page | Kameleoon | Statsig (revenue metrics) | Marketing team primary, product team consulted |

Where two platforms touch the same surface (the pricing page row), name a primary and clarify what the secondary is responsible for. Ambiguity here is the source of every multi-platform drift.

The ownership matrix lives in a single document, version-controlled, reviewed quarterly. Stakeholders refer to it instead of arguing.

---

## Shared metric definitions

The second artifact is a shared metric definitions document. The same metric should compute the same way across platforms.

Example. "Activation rate" might be defined as: percentage of users who completed onboarding within 7 days of signup. The definition includes the event name, the time window, the denominator population, and any exclusions. Both platforms reference the same definition.

In practice, sharing definitions across platforms is hard. Three approaches.

**Single source warehouse layer.** Define metrics in your warehouse using a metrics layer (dbt, Cube, Metricflow). Both platforms query the warehouse. This is the strongest pattern. It works if both platforms support warehouse-native metrics (GrowthBook, Eppo) or have warehouse integration paths.

**Documented definitions with periodic reconciliation.** Each platform has its own metric. The definitions document records what each is supposed to compute. A weekly or monthly reconciliation job compares the two and surfaces variance. This works for vendor-native platforms that do not share a warehouse.

**Tolerance for variance.** Accept that the two platforms compute slightly differently and document the expected variance range. Over 1 to 2% triggers an investigation. Under 1% is treated as noise. This works when the platforms are used for different surfaces and the metrics are not directly compared across them.

The wrong approach is no approach. Without one of these three patterns, the platforms drift, and a leadership disagreement surfaces in the worst possible moment.

---

## Reconciliable dashboards

The third artifact is dashboards that surface the same metrics from both platforms side by side. The point is not that the numbers always agree (they will not). The point is that disagreements are visible and explainable.

A reconciliation dashboard has three columns per metric: the value from platform A, the value from platform B, and the variance with a threshold. Variance over the threshold triggers a notification. Owners investigate and either explain the variance or fix the underlying definition mismatch.

Reconciliation runs daily for high-stakes metrics, weekly for everything else. Outputs go to a shared channel where the team sees them; do not let reconciliation reports live in a folder no one reads.

---

## The "primary platform" rule

In every multi-platform setup, one platform is canonical. If the platforms disagree, the canonical answer wins. Pick the canonical platform once, document it, and stop arguing.

The canonical platform is usually the one that owns the surface where the metric originates. Revenue metrics: the warehouse is canonical. Product engagement: the product analytics platform is canonical. Marketing-site conversion: the marketing experiment platform is canonical.

Without a canonical, every disagreement becomes a debate. With a canonical, disagreements become investigations into why the non-canonical platform diverged.

---

## When to consolidate

Three signals that consolidation is overdue:

1. **The reconciliation dashboard reports variance more often than not.** The platforms drift faster than the team can reconcile. The cost of staying multi-platform exceeds the cost of consolidating.
2. **A leadership disagreement surfaces a "which one is the source of truth" debate.** Multi-platform is meant to support different surfaces, not different versions of the same answer. If the same answer has two values, consolidation is the fix.
3. **The team is spending more than 10% of its experimentation operational time on platform coordination.** That time should be on experiments, not platform plumbing.

When consolidation is the right answer, see `migration-playbook.md` for the patterns. The consolidation move is almost always to whichever platform is closest to the canonical for the highest-stakes surface.
