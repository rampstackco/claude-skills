# Warehouse vs platform decision

Side-by-side comparison. Cost considerations at scale. Hybrid patterns. Migration patterns. Decision tree.

The principle. Both operational models are valid. The right choice depends on team strength, volume, custom-metric needs, and how much engineering time you are willing to invest in experimentation infrastructure.

---

## Side-by-side comparison

| Dimension | Platform (Statsig, Optimizely, etc.) | Warehouse-native |
|---|---|---|
| Time to first experiment | Hours to days | Days to weeks |
| Custom metric depth | Limited to platform's metric library | Anything you can write in SQL |
| Custom segmentation | Platform-specific filters | dbt models compose without limit |
| Cost shape | Per-MAU or per-event subscription | Existing warehouse compute |
| Engineering investment | Low | Medium to high |
| Sequential testing | Out of the box | Build it yourself or skip |
| Frontend visual editing | Optimizely, VWO ship this | Not applicable |
| Mobile SDK assignment | Out of the box | Build it yourself |
| Trust and audit | Platform's math is a black box | Every step is auditable SQL |
| Iteration speed on metric definitions | Platform release cadence | dbt deploy cadence |
| Ecosystem integration | Platform's connectors | Warehouse already has the data |

---

## Cost considerations at scale

Approximate costs as of 2025-2026. Verify with vendor pricing.

### 10K MAU

- Platform (mid-tier): $0 to $500 per month. Free tiers from PostHog, Statsig, Amplitude cover this.
- Warehouse-native: warehouse compute already paid for. Engineering time cost: 1 to 2 weeks of a data engineer's time to set up infrastructure.

Recommendation. Platform. The engineering time on warehouse-native at this scale does not pay back.

### 100K MAU

- Platform (mid-tier): $1K to $10K per month. Statsig, PostHog paid tiers; Optimizely contract.
- Warehouse-native: same warehouse compute; engineering time amortized over more experiments.

Recommendation. Either. Depends on team strength and custom-metric needs. Many teams stay on a platform; some graduate to warehouse-native.

### 1M MAU

- Platform: $10K to $80K per month, often more for enterprise contracts. Optimizely Enterprise can hit $200K+ per year.
- Warehouse-native: same warehouse compute. The engineering investment pays back at this scale.

Recommendation. Warehouse-native is increasingly attractive. Many enterprise data teams run warehouse-native primary, with a platform for specific use cases (frontend visual experiments).

### 10M+ MAU

- Platform: enterprise contracts at $200K to $1M+ per year.
- Warehouse-native: dominant pattern at this scale. Custom infrastructure plus dbt plus Python notebooks.

Recommendation. Warehouse-native, often with a thin platform for fast frontend iteration.

---

## Hybrid patterns

Three common hybrid patterns.

### Pattern 1: platform for product, warehouse-native for analytics

The platform handles assignment and exposure for product experiments. The warehouse handles analysis for the same experiments by reading the platform's exposure data.

Why. The platform's analysis is fine for standard cases; warehouse-native analysis allows custom metrics and segmentation the platform cannot express.

Operational shape. The platform's exposure events flow to the warehouse (typically via webhook or scheduled export). dbt models compute custom metrics; the analyst runs the t-test in Python against the joined data.

### Pattern 2: warehouse-native for backend, platform for frontend

Warehouse-native handles backend experiments where assignment is server-side (pricing, recommendations, ML model variants). The platform handles frontend visual experiments (button colors, copy, layout).

Why. Frontend visual experiments benefit from the platform's WYSIWYG editor and script-tag injection. Backend experiments benefit from warehouse-native's metric flexibility.

Operational shape. Two separate experiment registries. Each team picks the right tool for the experiment type.

### Pattern 3: platform for fast iteration, warehouse-native for hard cases

The platform handles experiments where time-to-result matters more than custom depth. Warehouse-native handles experiments where the platform cannot express the metric.

Why. Most experiments are standard; the platform is faster. The 10 percent that are not standard need the warehouse.

Operational shape. Default to platform; escalate to warehouse-native when the platform fails to support the experiment design.

---

## Migration patterns

### Platform to warehouse-native

Triggered by cost (the platform bill became a budget item) or capability (the platform cannot handle a specific experiment design that matters). Typical effort: 6 to 12 engineer-weeks for the first warehouse-native experiment with full infrastructure; later experiments amortize the investment.

Steps. Build the assignment hash function. Build the exposure logging discipline. Define the first metric in dbt. Run a parallel experiment on the platform and warehouse-native; verify results match within statistical noise. Migrate experiments one at a time; retire the platform when the last in-flight experiment completes.

### Warehouse-native to platform

Triggered by team contraction (the data engineer who built the infrastructure left) or by velocity needs (experiments are taking too long to set up). Typical effort: 2 to 4 engineer-weeks; the platform handles the heavy lifting.

Steps. Pick the platform. Wire up assignment and exposure. Migrate the metric library to the platform's format. Run the first experiment on the platform; verify results align with what warehouse-native would have produced.

The frequent reverse migration. Companies that move to warehouse-native and discover the engineering investment is too much. The migration back is usually faster than the migration out.

---

## Decision tree

```
Is your team running 5+ experiments per quarter?
├── No → Platform. Warehouse-native does not pay back at low volume.
└── Yes → Continue.
   │
   Do you have a data engineer and a data scientist?
   ├── No → Platform. Warehouse-native requires both roles.
   └── Yes → Continue.
      │
      Are your experiments primarily frontend visual?
      ├── Yes → Platform (Optimizely, VWO). Warehouse-native cannot match.
      └── No → Continue.
         │
         Do you need custom metrics the platform cannot express?
         ├── Yes → Warehouse-native. The custom metric is the use case.
         └── No → Continue.
            │
            Is the platform bill exceeding 10x the cost of the engineering time?
            ├── Yes → Warehouse-native. The math justifies it.
            └── No → Platform. The simplicity is worth the cost.
```

The defaults. New teams: platform. Mature teams with strong data infrastructure and high volume: hybrid or warehouse-native primary. The decision is never permanent; revisit annually.

---

## When the math is wrong

Two situations where teams misjudge the build-vs-buy.

**Underestimating engineering cost.** "We can build this in a week" rarely holds. The first experiment takes weeks; the second takes days; the long tail of pitfalls (CUPED, sequential testing, SRM checks, dashboard reconciliation) adds up to months of engineering investment. Budget realistically.

**Overestimating platform limitations.** "The platform cannot handle our metric" is sometimes true and sometimes a workflow problem. Verify with the vendor; many platforms have advanced features (Cortex Analyst on Snowflake, custom SQL metrics on Statsig) that solve the apparent limitation.

The honest test. Run a 30-day proof of concept on the platform with the actual experiment you say it cannot handle. If the platform truly fails, warehouse-native is justified. If the platform works (even if imperfectly), the cost-benefit shifts back toward the platform.
