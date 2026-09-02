# OKRs vs roadmap vs metrics

The three concepts and their relationships. Common conflations. The complete picture across all three.

OKRs, roadmaps, and metrics are often conflated. Each serves a different purpose; conflating them produces confusion that decays each practice. Distinguishing them clarifies what each is for and how they compose.

---

## OKRs

Outcome targets for the quarter.

**Characteristics.**

- Quarterly time horizon.
- Outcome-focused.
- Stretch-ambition.
- Designed for accountability and learning, not for execution sequencing.

**Examples.**

- Objective: "Improve activation for new sign-ups."
- Key result: "Increase first-week activation rate from 32% to 45%."

**What OKRs are not.**

- A roadmap. OKRs do not specify which initiatives to ship.
- A metric. OKRs are quarterly targets on metrics; the metrics themselves are tracked continuously regardless of OKRs.
- A commitment to specific work. The team commits to pursuing the outcome; the tactics adapt.

---

## Roadmap items

Initiatives the team is building or doing.

**Characteristics.**

- Variable time horizon (weeks to months per initiative).
- Output-focused (the work being done).
- Sequenced by priority and dependency.
- Designed for execution coordination.

**Examples.**

- "Onboarding redesign."
- "Migrate to new auth service."
- "Build admin role overhaul."

**What roadmap items are not.**

- OKRs. Roadmap items are work; OKRs are outcomes.
- Metrics. Roadmap items contribute to moving metrics but are not metrics themselves.
- Permanent commitments. Items can be added, dropped, or re-prioritized as circumstances change.

---

## Metrics

Ongoing measurements the team tracks.

**Characteristics.**

- Continuous time horizon (always tracked).
- Quantitative, time-stamped, queryable.
- Designed for monitoring, learning, and OKR target-setting.

**Examples.**

- "First-week activation rate."
- "Median time-to-first-value."
- "Onboarding flow completion rate."

**What metrics are not.**

- OKRs. Metrics are continuous; OKRs are quarterly targets on metrics.
- Roadmap items. Metrics are measurements; roadmap items are work.
- Targets. Metrics are values; targets on metrics are KRs (or more generally, performance targets).

---

## The relationship

How the three compose.

**OKR: "Improve activation for new sign-ups."**

- Key result: "First-week activation rate from 32% to 45% by end of quarter."
  - Underlying metric: "First-week activation rate" (tracked continuously).
  - Roadmap items contributing: "Onboarding redesign," "Welcome email sequence revision," "Activation triage automation."

**The composition.**

- OKR names the outcome.
- Key result quantifies the outcome with a metric and target.
- Metric is the underlying measurement.
- Roadmap items are the work the team does to move the metric.

**The flow.**

- Strategy informs OKRs.
- OKRs inform roadmap prioritization (which work moves which OKR).
- Roadmap items get executed.
- Metrics track the impact.
- Scoring at end of quarter assesses the OKR's actual outcome.

---

## Common conflations

### OKRs treated as roadmap commitments

**The pattern.** "Ship the onboarding redesign" written as an OKR.

**The diagnosis.** This is a roadmap item, not an OKR. The OKR is the outcome the redesign is meant to produce.

**The cure.** Rewrite as outcome: "Improve activation through onboarding redesign that reaches first-week activation 45%." The redesign is the contributing work; the outcome is what the work is meant to produce.

### Roadmap items treated as OKRs

**The pattern.** Quarterly OKRs are a list of features the team plans to ship.

**The diagnosis.** Output disguised as outcome. The team is committing to work, not to results.

**The cure.** For each output OKR, identify the outcome the output is meant to produce. The OKR is the outcome; the output is roadmap work that contributes.

### Every metric needing an OKR

**The pattern.** The team feels every metric they track must have an OKR target.

**The diagnosis.** Metrics serve monitoring purposes regardless of whether the team is currently driving them. Some metrics are leading indicators the team watches without driving; some are protective metrics the team watches to ensure they do not degrade.

**The cure.** OKRs select which metrics the team is actively driving this quarter. Other metrics get tracked without OKR targets.

### OKRs as roadmap commitments to stakeholders

**The pattern.** Stakeholders ask "what are you committing to ship next quarter?" The team answers with OKRs.

**The diagnosis.** The team is using OKRs as roadmap; stakeholders interpret them as roadmap commitments; mid-quarter tactical adjustments feel like broken promises.

**The cure.** Distinguish between OKRs (outcomes the team commits to pursue) and roadmap (work the team plans to do). Stakeholders can see both; the OKR is what the team is accountable for; the roadmap is the team's current best guess at what work will produce the outcome.

### Treating metrics as OKRs

**The pattern.** "Maintain CSAT at 4.5" written as an OKR for a quarter when the team has no specific work aimed at CSAT.

**The diagnosis.** This is metric monitoring, not an OKR. OKRs are stretch outcomes the team is actively pursuing; metric monitoring continues regardless.

**The cure.** Track CSAT as a metric. Set an OKR if the team is actively driving CSAT improvement; otherwise, the metric is monitored without an OKR.

---

## When the three diverge

Sometimes OKRs, roadmap, and metrics tell different stories.

**The pattern.**

- OKR is on track (KR moving toward target).
- Roadmap items are shipping on schedule.
- A different metric the team tracks is degrading.

**The interpretation.** The OKR work is succeeding at its target; an unintended consequence may be hurting another metric. The team must decide whether to address the unintended consequence within the quarter or to defer.

**The discipline.** OKRs are the formal commitment; roadmap items contribute to OKRs; metrics monitor everything (including OKR targets and protective metrics). When the three diverge, the team has decisions to make.

---

## Roadmap-OKR alignment

How the roadmap maps to OKRs.

**The mapping.**

- Each roadmap item gets associated with the OKR(s) it contributes to.
- Items not associated with any OKR are either team-specific work (technical debt, tooling) or candidates for deferral.

**Worked example.**

- OKR: "Improve activation for new sign-ups."
- Contributing roadmap items: "Onboarding redesign," "Welcome email sequence revision," "Activation triage automation."

- OKR: "Establish enterprise-readiness foundations."
- Contributing roadmap items: "Admin role overhaul," "SOC 2 audit preparation."

- Team-specific roadmap items (no OKR ladder): "Migrate to new auth service" (foundational; supports many OKRs), "Strengthen test coverage in critical paths" (engineering health).

**The discipline.** All roadmap items have either an OKR ladder or an explicit team-specific designation. Items with neither are candidates for deprioritization.

---

## Metric coverage and OKR targets

How metrics are selected and how OKR targets relate.

**Metric coverage.** The team tracks metrics that:

- Reflect strategic outcomes (input metrics for OKRs).
- Monitor protective concerns (metrics that should not degrade).
- Surface leading indicators of larger outcomes.
- Provide diagnostic signal for issues.

**OKR target selection.** Each quarter, the team selects which metrics to set OKR targets on:

- Metrics tied to the quarter's strategic priorities.
- Metrics where stretch progress is plausible and meaningful.
- Often a subset of the broader metric set.

**The remaining metrics.** Tracked without OKR targets. Monitored for movement; surfaced if they shift unexpectedly.

---

## Common failures across the three

**OKR-as-roadmap.** Quarterly commitments written as features rather than outcomes.

**Roadmap-as-OKR.** Roadmap items called OKRs; output disguised as outcome.

**Every-metric-as-OKR.** OKRs proliferate to cover every tracked metric; focus diluted.

**OKR-without-roadmap-mapping.** OKRs set without identifying which work will move them; teams miss the OKRs because no work is aimed at them.

**Roadmap-without-OKR-mapping.** Work happens without explicit OKR connection; teams cannot tell what their work is contributing to.

**Metrics-without-OKR-distinction.** All metrics treated as targets; team cannot prioritize.

---

## Methodology-level choices that stay in the public skill

The three concepts and their characteristics. The relationship and composition. Common conflations and cures. When the three diverge. Roadmap-OKR alignment. Metric coverage and OKR target selection. Common failures.

## Implementation choices that stay internal

Specific OKR-tracking tools. Specific roadmap tools. Specific metrics dashboards. Specific integration between OKR system and roadmap system. The team's own conventions for OKR-roadmap-metric documentation. These vary by team and tooling.
