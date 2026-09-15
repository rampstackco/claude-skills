# Platform decision matrix

A context-to-platform map. The left column is the situation. The center column is the recommendation. The right column is the reasoning and the common alternative.

Read top to bottom and stop at the first row that matches your situation in three or more dimensions. The remaining rows are useful as cross-checks rather than primary picks.

---

## The matrix

| Situation | Primary recommendation | Reasoning and common alternative |
|---|---|---|
| Pure SaaS, fast-growing, want one platform for flags and experiments | Statsig | Combined feature flags and experiments, modern statistical defaults, fast time to first experiment. Alternative: PostHog if you also want analytics. |
| Product-led growth, want analytics and experiments together | PostHog | Full-funnel context, free tier covers early growth, mature MCP for AI workflows. Alternative: Amplitude if analytics depth matters more than experiment depth. |
| Open-source preference, data sovereignty, warehouse-native | GrowthBook | Data stays in your warehouse, OSS license avoids vendor lock-in, mature statistical defaults. Alternative: PostHog self-hosted if you also need analytics. |
| Enterprise, marketing-led, deep personalization | Optimizely | Visual editing for non-engineers, mature governance, decades of features. Alternative: Adobe Target if you are already on the Adobe stack. |
| Already deep on Amplitude for analytics | Amplitude | Adding experiments is the path of least resistance. Alternative: layer Statsig or Eppo only if statistical depth becomes the binding constraint. |
| Data-team-led, statistical correctness paramount, MCP not yet required | Eppo | Strongest statistical defaults among warehouse-native platforms, decision-oriented reporting. Alternative: GrowthBook if open-source is non-negotiable. |
| Convert marketing-site wins into permanent code | Kameleoon | Purpose-built for the win-to-code path; the only platform with this workflow as a primary feature. Use alongside a primary product-experiment platform. |
| Regulated industry (HIPAA, FedRAMP, healthcare), self-hosting required | GrowthBook self-hosted | Full data residency, audit-friendly, OSS auditable. Alternative: PostHog self-hosted if you also need analytics. |
| Pre-PMF, low traffic, need free tier | PostHog free or Statsig free | Both free tiers cover the early phase. Defer the real platform decision until you have the traffic to make any platform meaningful. |
| 100M+ events per month, cost control is the binding constraint | GrowthBook or Eppo | Warehouse-native pricing scales better than vendor-native at this volume. Alternative: negotiate a custom contract with Statsig or PostHog; only worth it if vendor-native features justify the premium. |
| AI-forward team, MCP-first workflow important | Statsig, PostHog, GrowthBook, or Optimizely | All four have mature MCPs with full CRUD coverage. Avoid Eppo for now (REST only). |
| Mid-market SaaS, governance important, single tool preference | Statsig | Enterprise governance is mature, combined flags and experiments simplify the operational surface. Alternative: Optimizely if marketing-led, GrowthBook if open-source preferred. |
| Web-only personalization, content site, no product app | Kameleoon or Optimizely | Both are strong on visual editing and personalization. Kameleoon for the win-to-code workflow; Optimizely for enterprise governance. |
| Data warehouse already in place (Snowflake, BigQuery), small data team | Eppo | Statistical defaults are decision-grade, warehouse compute is already a line item, low operational burden. Alternative: GrowthBook if commercial support is not required. |
| Solo founder or pre-seed startup | PostHog free or Statsig free | Both work, both are free at this stage. Pick whichever you are more familiar with; the decision is reversible. |

---

## Worked examples

### Example 1: Series B SaaS, 5M events/month, PM-led, considering Statsig vs PostHog

The team has feature flags in LaunchDarkly already, has analytics in Amplitude, and is considering experiments. The PM-led culture wants experiments shipped weekly with low engineer overhead.

**Recommendation.** Statsig. The PM-led culture matches Statsig's defaults. The 5M event volume is comfortably in the free tier or a small paid contract. Combined flags and experiments will likely cause a LaunchDarkly migration in 12 to 18 months, but that is a future decision, not a current one. PostHog is the alternative if the team also wants to consolidate analytics, but Amplitude is already paid for and migrating analytics is a bigger project than starting experiments.

### Example 2: 50-person fintech, regulated industry, need data residency

The team needs HIPAA-equivalent controls (financial regulations), data must stay in their VPC, and the engineering team is comfortable with a more hands-on platform.

**Recommendation.** GrowthBook self-hosted. Data residency is a hard requirement and rules out all vendor-native options. The engineering team has the capacity to operate self-hosted. PostHog self-hosted is the alternative if analytics is also needed.

### Example 3: Marketing-led brand, want non-engineer-shipped experiments

The team is a marketing organization with a small engineering function. The marketing leads want to ship experiments without filing engineering tickets.

**Recommendation.** Optimizely. Visual editing for non-engineers is a hard requirement. Statsig and PostHog can be used by non-engineers but require more comfort with structured experiment definitions. Kameleoon is the alternative if the win-to-code workflow is important.

### Example 4: Data-team-led, 100M events/month, statistical depth required

The data science team owns experimentation, runs the warehouse, and has been burned by misleading results from a less rigorous platform.

**Recommendation.** Eppo. Statistical correctness is the headline. The 100M event volume makes warehouse-native pricing more attractive. The lack of MCP is acceptable because the team's workflow is data-scientist-driven, not agent-driven. GrowthBook is the alternative if open-source is required.

### Example 5: Pre-PMF startup, 200K events/month

The team has a product but no product-market fit. They want to start experimenting to find the wedge.

**Recommendation.** PostHog free tier. Free covers the volume. Analytics plus experiments in one place lets the team learn. Defer the real platform decision until traffic is 10x higher and the platform tax becomes a real number.
