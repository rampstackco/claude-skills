---
name: experimentation-platform-orchestrator
description: "A platform decision framework for experimentation. When to use Statsig vs PostHog vs GrowthBook vs Optimizely vs Amplitude vs Eppo vs Kameleoon. How to migrate between them. How to coordinate when multi-platform is genuinely warranted. The decisions that compound for years and the ones you can defer. Triggers on which experimentation platform, choose Statsig vs PostHog, evaluate experimentation tools, switch experimentation platform, migrate from Optimizely, consolidate experimentation tools, multi-platform experimentation, experimentation platform decision, ab test platform selection, feature flag platform vs experiment platform, warehouse-native experiments, vendor lock-in experimentation. Also triggers when a team is asking about cost, governance, or migration cost across experimentation tools, or when an evaluation is starting."
category: product
catalog_summary: "Pick the right experimentation platform, migrate when wrong, coordinate when multi-platform: a decision framework for Statsig, PostHog, GrowthBook, Optimizely, Amplitude, Eppo, Kameleoon"
display_order: 7
---

# Experimentation Platform Orchestrator

A senior product and engineering leader's playbook for making the experimentation platform decision and recovering from making it wrong.

Picking an experimentation platform is one of those decisions that looks easy at the start and compounds for years afterward. The wrong choice costs you in lost experiments (because the team avoids the painful workflow), in cost (because the wrong pricing model penalizes your usage shape), in vendor lock-in (because migration is real engineering work, not a config change), and in cultural drift (because the platform's defaults shape what your team thinks experimentation is).

This skill is the discipline that makes the decision well the first time and the migration plan when you didn't.

When to use this skill: choosing a platform from scratch, evaluating whether to switch, deciding whether to consolidate from multi-platform to single, or planning a migration that has already been approved.

---

## What this skill is for

This skill spans platform selection, multi-platform decisions, migration planning, and governance setup. It does not cover experiment design (use `experiment-design`), result interpretation (use `experimentation-analytics`), or feature flag operations (use `feature-flagging`). Pair this skill with the relevant integrations microsite when you need platform-specific MCP details.

The audience is a PM, engineering leader, or data lead who is making the decision or recovering from a previous one. The voice is decisive. There is no "it depends, evaluate them all yourself." The decision space has real shape, and a senior advisor can map your situation to a defensible answer in an afternoon.

---

## The 7 considerations for the platform decision

Every platform evaluation walks the same seven questions. Answer them honestly first, then read the per-platform profiles, then consult the decision matrix. The order matters: data architecture and statistical rigor are foundational; the rest are layered on top.

1. **Data architecture.** Where does experiment data live? Three patterns. Vendor-native (Statsig, Optimizely) keeps the data in the vendor's storage. Product-suite (PostHog, Amplitude) combines analytics and experiments behind one event pipeline. Warehouse-native (GrowthBook, Eppo) runs SQL on your existing data warehouse. The pattern dictates security review depth, residency, statistical depth, and cost shape.

2. **Statistical rigor.** Does the platform implement CUPED, sequential testing, the delta method for ratio metrics, and multiple testing corrections? Cheap to verify in a sales call: ask "what variance estimator do you use for ratio metrics?" and "do you support always-valid p-values?" Modern platforms (Statsig, Eppo, parts of PostHog) have these. Older or homegrown platforms often do not.

3. **MCP availability.** All seven platforms covered here have a first-party or hosted MCP except Eppo (as of May 2026). MCP availability matters more for agentic workflows where AI agents create and read experiments end to end. It matters less for traditional human-driven experimentation. Worth weighting if your team is AI-forward.

4. **Feature flag integration.** Do experiments and feature flags live in the same platform? Statsig, Optimizely, GrowthBook, and PostHog all unify them. Eppo is experiment-only. Kameleoon is creative-personalization-focused. If you also need feature flag operations as production infrastructure, check `feature-flagging` for the operational discipline; the platform choice has to support both surfaces or you accept a second tool.

5. **Analytics depth.** Can you see funnels, retention, and cohorts in the same surface as experiment results? PostHog and Amplitude are strongest here (analytics-first products). Statsig has a strong analytics overlay. Optimizely and GrowthBook are experiment-first, with analytics as a supplementary feature.

6. **Governance and audit.** Who can change targeting in production, who can ship experiments, who can read sensitive metrics? Enterprise tiers (Optimizely, LaunchDarkly Federal) handle this with maturity. Open-source platforms (GrowthBook, PostHog self-hosted) require self-built governance. For regulated industries (healthcare, finance, public sector), this question is the deciding factor.

7. **Cost shape.** Vendor-native scales with events. Warehouse-native scales with seats and warehouse compute. Product-suite scales with combined event volume across all features. Match the pricing shape to your actual usage shape. A high-traffic startup pays vendor-native pricing differently from a lower-traffic enterprise; pick the shape that is friendly to your trajectory, not just your current month.

---

## Statsig

Modern experimentation and feature management combined in one platform. CUPED and sequential testing built in. Strong PM-led ergonomics. Used by OpenAI, Notion, Brex, Figma.

**Strengths.** Fast time to first experiment. Combined experiments and feature flags eliminate the second-tool tax. Statistical rigor is current with the literature. The MCP exposes full CRUD across experiments, gates, dynamic configs, and metrics.

**Gotchas.** Pricing scales with events, which can become expensive at high scale. The platform has strong opinions about how experiments should run; teams that want a custom statistical workflow will fight the defaults. Self-host is not a first-class option.

**Ideal customer.** Fast-growing SaaS that wants one platform for flags and experiments, values out-of-the-box statistical depth, and is comfortable with vendor-native data architecture.

---

## PostHog

Open-source product OS combining product analytics, experiments, feature flags, surveys, session replays, error tracking, and LLM analytics. Free tier available.

**Strengths.** Full-funnel context. Experiments live next to the analytics that contextualize them. The MCP exposes 200+ tools (use scoping like `?features=` to keep the agent context tight). Self-host option is mature. Open-source license keeps you outside the vendor lock-in trap.

**Gotchas.** Combined event volume across all features can make pricing surprising at scale. The breadth of features can make onboarding feel busy. Statistical depth in experiments is good but a step behind dedicated experiment platforms (Statsig, Eppo) on advanced features like CUPED defaults.

**Ideal customer.** Product-led-growth SaaS that wants analytics, experiments, and feature flags in one surface, values open-source flexibility, and is comfortable with the breadth.

---

## GrowthBook

Open-source warehouse-native experimentation. Data stays in your warehouse (Snowflake, BigQuery, Redshift, Postgres). Self-host or cloud.

**Strengths.** Data sovereignty. Cost control at scale because the warehouse is already paid for. First open-source production MCP for experimentation per their announcement. Mature statistical defaults including Bayesian and frequentist toggles. Bring-your-own metrics from the warehouse means experiment metrics match analytics metrics by definition.

**Gotchas.** Setup overhead is higher than vendor-native. You own the warehouse compute cost (this is usually a feature, not a bug, but it shows up in different finance line items). Smaller community than Statsig or PostHog. UI polish lags vendor platforms by half a step.

**Ideal customer.** Data-mature teams that already run a warehouse, regulated industries that need data residency, and teams that prefer open-source for the exit option.

---

## Optimizely

Long-time enterprise leader. Web Experimentation plus Feature Experimentation. Strong personalization and visual editing for non-technical users.

**Strengths.** Enterprise governance is mature. Visual editing lets marketers ship experiments without engineer help. Strong customer success organization. Hosted Remote MCP works in browser-based ChatGPT and Claude.ai.

**Gotchas.** Expensive. Pricing targets marketing budgets, not engineering budgets. The product has decades of accumulated features; navigating it takes time. Statistical defaults are conservative but the platform is not the place to look for the latest variance reduction techniques.

**Ideal customer.** Marketing-led organizations, enterprises with mature experimentation programs, and teams where non-technical experiment creation is a hard requirement.

---

## Amplitude

Behavioral analytics platform with experiments and feature flags as additional features. Hosted MCP available to all customers including the free tier.

**Strengths.** If your team already lives in Amplitude for analytics, adding experiments is the path of least resistance. Cohort and behavioral segmentation are excellent. Free tier (10M events/month) is generous.

**Gotchas.** Experiments are a secondary feature, not the headline. Statistical depth is moderate. If experimentation is your team's primary discipline, Amplitude is rarely the right choice; if experimentation is a supporting capability and analytics is the headline, it works.

**Ideal customer.** Analytics-first teams that need experiments as a supplementary capability, not the centerpiece. Pre-PMF teams that want a free tier with analytics and experiments together.

---

## Eppo

Warehouse-native, statistically rigorous, used by Twitch, DraftKings, Perplexity. Strong statistical defaults including Bayesian and frequentist toggles, sequential testing, and CUPED.

**Strengths.** Statistical correctness is the headline. The team is heavy on data scientists and statisticians, and it shows in the defaults. Warehouse-native architecture matches the pattern data-mature teams already run. Reporting is clear and oriented to decisions.

**Gotchas.** No first-party MCP as of May 2026. REST API only. If your workflow depends on AI agents reading and writing experiments, Eppo is currently a gap. Track for a future MCP release. Pricing is enterprise; no meaningful free tier.

**Ideal customer.** Data-team-led organizations where statistical correctness is paramount, the warehouse is already the system of record, and AI agent workflows are a future concern rather than a current requirement.

---

## Kameleoon

Specialty platform focused on the winning-experiment-to-production-code workflow. AI-driven personalization. Hosted MCP at `mcp.kameleoon.com/mcp` with OAuth and 7 specialized tools.

**Strengths.** Converts marketing-site experiment wins into permanent React components, which is a real workflow that other platforms force teams to handle manually. AI-driven personalization for content sites. The MCP is purpose-built for the win-to-code path.

**Gotchas.** Narrower than the others. Not a replacement for Statsig or Optimizely on product experiments. Often shows up alongside another platform rather than as the primary.

**Ideal customer.** Teams running experiments on marketing or content sites that need the winning variant to become permanent code. Almost always layered with a primary product-experiment platform.

---

## Decision matrix: which platform for which context

The matrix lives in [`references/platform-decision-matrix.md`](references/platform-decision-matrix.md) with worked examples. The summary:

- Pure SaaS, fast-growing, want one platform for flags and experiments. Choose Statsig. Choose PostHog if you also want analytics.
- Open-source preference, want data sovereignty, warehouse-native. Choose GrowthBook or Eppo.
- Enterprise, marketing-led, deep personalization. Choose Optimizely.
- Already deeply on Amplitude for analytics. Stay on Amplitude unless statistical depth becomes the bottleneck.
- Data-team-led, statistical correctness paramount, MCP not yet required. Choose Eppo.
- Need to convert marketing-site wins into production code. Add Kameleoon alongside your primary platform.
- Regulated industry (HIPAA, FedRAMP), self-hosting required. Choose GrowthBook self-hosted. PostHog self-hosted is also viable.
- Pre-PMF startup, low traffic, need a free tier. Use PostHog free tier or Statsig free tier; defer the real decision until traffic justifies the cost calculation.
- 100M+ events per month, cost control is the headline constraint. Choose GrowthBook or Eppo. Warehouse-native pricing scales better at this volume.
- AI-forward team, MCP-first workflow. Choose Statsig, PostHog, or Optimizely. Defer Eppo until its MCP ships.

---

## Multi-platform: when warranted, when a mess

Multi-platform is warranted when the surfaces are genuinely different and the platforms overlap zero. Marketing site personalization on Kameleoon plus product experiments on Statsig is a clean split: different surface, different audience, different metric set, no overlap. The cost of the second tool is justified because the workflows do not collide.

Multi-platform is a mess when the surfaces overlap. Running both Statsig and Optimizely for product experiments creates duplicate cost, split data, and a "which one is the source of truth" problem that surfaces in the worst possible moment, which is when a leadership disagreement needs an answer.

The 80/20 rule. Eighty percent of teams should pick one platform and consolidate. The 20% with genuine multi-surface needs (marketing site plus product app plus content site) can justify multi-platform with clear ownership boundaries.

When multi-platform is genuine, three coordination patterns are non-negotiable. An ownership matrix names which platform owns which surface. Shared metric definitions ensure that "activation rate" computes the same way in both platforms (this is hard, and it is the reason most multi-platform setups quietly drift). Reconcilable dashboards let you see the same metric across both platforms with the same definitions. Detail in [`references/multi-platform-orchestration.md`](references/multi-platform-orchestration.md).

---

## Migration patterns

Migration is the unglamorous engineering work that makes the platform decision recoverable. Five common paths.

**Statsig to PostHog.** Typical when a company outgrows pure experimentation and wants analytics plus experiments combined. Effort: 3 to 5 engineer-weeks. Parallel-run for 4 to 8 weeks, validate experiments produce the same results on both, cut over once trust is established.

**Optimizely to Statsig.** Typical under budget pressure or modernization. Effort: 4 to 8 engineer-weeks. Audit for feature parity first (Optimizely has personalization features Statsig does not). Migrate experiments before flags. Retire Optimizely only after all in-flight experiments complete on the old platform.

**PostHog to Eppo.** Typical when statistical rigor becomes the binding constraint and the warehouse is already the system of record. Effort: 6 to 10 engineer-weeks. Often results in PostHog staying for analytics and Eppo running experiments. Plan for the dual-platform end state, not a clean replacement.

**GrowthBook to Eppo.** Typical when commercial support and deeper statistical features become worth the price. Effort: 2 to 4 engineer-weeks because both are warehouse-native; the data already lives in your stack.

**Any to Statsig.** Typical consolidation move from multi-platform mess. Effort scales with the number of platforms and in-flight experiments; a clean consolidation can run 6 to 12 engineer-weeks.

The migration discipline is in [`references/migration-playbook.md`](references/migration-playbook.md). Three rules apply to every migration: do not parallel-run forever, do not big-bang switch, and do not retire the old platform before all in-flight experiments complete.

---

## The cost reality

Plain talk. Vendor-native (Statsig, Optimizely) bills on events, typically $0.10 to $0.50 per million events. Easy to predict at small scale, painful at very high scale. Warehouse-native (Eppo, GrowthBook paid) bills on seats and warehouse compute; $5K to $50K per year is the typical range for paid tiers, with warehouse compute showing up on a different finance line. Product-suite (PostHog, Amplitude) bills on combined event volume across all features; often the most cost-effective when used heavily and the most expensive when only experiments are needed.

Free tiers. PostHog gives 1M events per month free. Statsig gives 1M events free. Amplitude gives 10M events per month free with basic features. GrowthBook is free open-source. Optimizely and Eppo do not have meaningful free tiers.

The trap. Optimizing for sticker price ignores total cost. Total cost includes engineer time, statistical correctness (a wrong-result experiment can cost more than a year of platform fees), governance overhead, and migration risk. Sticker price matters for finance; total cost matters for product velocity. Detail and finance conversation patterns in [`references/cost-and-pricing-models.md`](references/cost-and-pricing-models.md).

---

## Governance and team fit

Permission tiers, approval workflows, audit trails, and environment promotion are the four pillars of governance. Who creates experiments, who modifies targeting in production, who reads sensitive metrics, who approves a rollout. Enterprise tiers handle these out of the box. Open-source self-hosted requires you to build them, which is fine if you have the engineering capacity and a dealbreaker if you do not.

Team fit shapes the decision more than most evaluations admit. PostHog and GrowthBook suit engineer-led and PLG teams. Optimizely suits marketing-led teams. Eppo and GrowthBook suit data-team-led teams. Statsig suits PM-led teams. The platform's defaults will pull your team's experimentation culture in the direction of its primary user; pick the alignment that matches who you actually want running experiments.

Onboarding cost. How long until a new PM can ship their first experiment? Statsig and PostHog: hours to days. Optimizely: days to weeks. Eppo and GrowthBook: depends on whether the warehouse and metrics are already wired in (days if yes, weeks if no). Detail in [`references/governance-and-team-setup.md`](references/governance-and-team-setup.md).

---

## The MCP capability layer

For AI-forward teams, the MCP capability layer is becoming the deciding factor. The current state as of May 2026:

- All seven covered platforms have first-party or hosted MCPs, with the exception of Eppo. Eppo offers REST API only.
- Capability differs by an order of magnitude. PostHog exposes 200+ tools; Kameleoon exposes 7. More is not better; the right size depends on your workflow.
- For agentic workflows where AI agents run experiments end to end, prefer platforms with full CRUD via MCP: Statsig, PostHog, GrowthBook, Optimizely.
- For human-driven workflows where MCP supplements human action, any of the seven works (Eppo via the REST path).

MCP availability is evolving fast. Check the current state of any platform before committing. Eppo is worth tracking for a future MCP release that would close its current gap. Side-by-side capability matrix in [`references/mcp-capability-comparison.md`](references/mcp-capability-comparison.md).

---

## When to defer the decision

Sometimes the right answer is "not now." Four cases.

Pre-PMF. Experimentation infrastructure is premature. Use a free tier (PostHog or Statsig) to remove blockers, defer the real decision until you have enough traffic to make any platform meaningful.

Single-experiment validation. Do not pick a platform for one experiment. Use whatever is free and easy. The platform decision is for the team that runs experiments as a discipline, not the team running its first.

No experimentation culture yet. Tooling does not fix culture. If your team is not running experiments, picking a fancy platform will not change that. Build the culture first; the platform decision becomes obvious once experiments are flowing.

Pending acquisition or major pivot. Defer until the dust settles. The acquirer will likely have a preferred platform anyway.

---

## Common mistakes

Twelve patterns recur across platform decisions. The short version:

- Picked the cheapest. Total cost dominates sticker price.
- Picked the most-featured. Features you do not use are technical debt.
- Tried multi-platform first. Almost always becomes a consolidation project later.
- Outgrew the platform but stayed for migration cost. The platform tax compounds; migration cost is fixed.
- Picked based on a demo. Demos optimize for the show; real usage reveals real tradeoffs.
- Did not check governance. Discovered after rollout that anyone can modify production targeting.
- Picked a platform that does not fit team type. PM-led team on a marketing-led platform is constant friction.
- Underestimated the warehouse setup. Warehouse-native platforms expect the warehouse to already be there.
- Skipped statistical depth review. Then a critical experiment surfaced a wrong-result decision.
- Ignored MCP trajectory. Picked a platform without MCP for an AI-forward team.
- Locked the brief on the demo, not the trial. Brief assumptions did not survive contact with real usage.
- Renewed without re-evaluating. The market changed; the brief did not.

Detail in [`references/common-mistakes.md`](references/common-mistakes.md) with symptoms, root causes, fixes, and prevention.

---

## The framework: 11 considerations for sustainable platform choice

When choosing or evaluating an experimentation platform, walk these 11 considerations. Answer each one before reaching a recommendation. Skipping any of them is how teams end up in a migration project a year later.

1. **Data architecture.** Vendor-native, product-suite, or warehouse-native. The pattern is downstream of every other decision.
2. **Statistical rigor.** CUPED, sequential testing, delta method for ratio metrics, multiple testing corrections. Verify at the sales-call level; do not assume.
3. **MCP availability.** Current capability and trajectory. Weight higher if your team is AI-forward.
4. **Feature flag integration.** Same platform or separate. Decide once and live with the implications.
5. **Analytics depth.** Funnels, retention, cohorts in the same surface. Decides whether you need a second tool for the analytics layer.
6. **Governance.** Permissions, audit, approval workflows, environment promotion. Non-negotiable for regulated industries.
7. **Cost shape.** Events vs seats vs warehouse compute. Match the shape to your usage trajectory.
8. **Team fit.** PM-led, engineer-led, data-led, marketing-led. The platform's defaults will pull your culture in the direction of its primary user.
9. **Onboarding cost.** Time to first experiment for a new team member. Faster is better; varies wildly across platforms.
10. **Migration cost.** What is the exit plan if you choose wrong. Higher migration cost means higher confidence required at decision time.
11. **Multi-platform fit.** Does this layer cleanly with platforms you already have, or does it create overlap.

The output of this framework is one of three answers. A primary recommendation with reasoning. A short list of two if the situation is genuinely ambiguous. A "defer" if a precondition is not met (no traffic, no culture, pending pivot).

---

## Reference files

- [`references/platform-decision-matrix.md`](references/platform-decision-matrix.md) - Context-to-platform matrix with worked examples for the most common decision contexts.
- [`references/migration-playbook.md`](references/migration-playbook.md) - Step-by-step migration patterns for the five common migrations including effort estimates and validation approaches.
- [`references/mcp-capability-comparison.md`](references/mcp-capability-comparison.md) - Side-by-side MCP capability matrix across the seven platforms.
- [`references/multi-platform-orchestration.md`](references/multi-platform-orchestration.md) - Ownership boundaries, shared metric definitions, and reconciliation dashboards for genuine multi-platform setups.
- [`references/cost-and-pricing-models.md`](references/cost-and-pricing-models.md) - Pricing shapes, real-world cost ranges at different traffic tiers, and finance conversation patterns.
- [`references/governance-and-team-setup.md`](references/governance-and-team-setup.md) - Permission tiers, audit trail requirements, environment promotion rules, and team fit assessment.
- [`references/common-mistakes.md`](references/common-mistakes.md) - Twelve failure patterns with symptom, root cause, fix, and prevention for each.

---

## Closing: when in doubt, pick boring

When the analysis is genuinely ambiguous, pick the boring choice. Boring means mature, well-documented, large user base, and a recoverable migration if you turn out to be wrong. Statsig is boring for SaaS. PostHog is boring for product-led growth. Optimizely is boring for enterprise. GrowthBook is boring for warehouse-native.

Boring is not the optimum, but it is almost never wrong. The optimum can come later, when the situation has clarified and the team has the experience to know what it actually needs. The cost of picking boring is a small efficiency tax. The cost of picking exotic and being wrong is a migration project that interrupts a year of product work.

If the team disagrees on which boring choice is the right one, that is a data signal: the situation is not yet clear enough for any answer to be obviously correct. Run a 30-day trial on the top two, evaluate against the 11-consideration framework with real usage data, and pick. Do not skip the trial; demos lie about real usage in ways that only the trial reveals.
