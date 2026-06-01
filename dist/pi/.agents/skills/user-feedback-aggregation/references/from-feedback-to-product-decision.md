# From feedback to product decision

The synthesis loop. Cadences. The discipline of decisions traceable to feedback.

Feedback aggregation produces value when it informs decisions. Without the synthesis loop that turns aggregated feedback into decision input, the program produces volume without action.

---

## The synthesis loop

The cycle that turns continuous feedback into continuous decisions.

**The stages.**

1. Feedback arrives across channels.
2. Triage categorizes and weights.
3. Periodic synthesis surfaces patterns.
4. Patterns inform roadmap discussions, spec drafts, prioritization debates.
5. Decisions reference specific feedback patterns as input.
6. Decisions ship; the loop continues with new feedback informed by the changes.

**The discipline.** The loop is continuous. Feedback aggregation is not a one-time research project; it is a steady-state discipline.

---

## The cadences

Feedback synthesis benefits from multiple cadences operating in parallel.

**Daily: critical issues.**

- Critical feedback (security incidents, data loss, broken core flows) handled immediately.
- The triage system surfaces critical items for immediate attention.
- Response within hours to a day.

**Weekly: pattern review.**

- Team review of recent feedback patterns.
- Categorization, tagging, and pattern identification.
- Adjusts current-quarter execution where patterns suggest changes.
- 1-2 hours per week typical.

**Monthly: synthesis review.**

- Surfaces trending patterns over the past month.
- Identifies what to escalate to roadmap discussions.
- Compares current month patterns to prior months (drift detection).
- 2-4 hours per month.

**Quarterly: strategic synthesis.**

- Patterns over the quarter inform strategic planning and next-quarter roadmap.
- Customer council inputs and other longer-cadence channels integrated.
- Pairs with the team's broader strategic planning.
- A multi-day effort within the quarter's planning cycle.

The cadences compose. Critical issues do not wait for weekly review; weekly review captures patterns that monthly review aggregates; monthly synthesis informs quarterly strategic decisions.

---

## The synthesis output

What each cadence produces.

**Daily/critical:** specific incidents handled, no formal output beyond the response.

**Weekly:** internal team notes on emerging patterns. May include a short summary email or dashboard update.

**Monthly:** a synthesis document covering the month's patterns. Surfaces what is emerging, what is stable, what has resolved. Roadmap discussions reference this document.

**Quarterly:** a strategic synthesis document. Trends over the quarter, recommendations for next quarter, strategic implications. Senior product leadership reviews this.

The output gets richer at longer cadences. Daily and weekly are tactical; monthly and quarterly are strategic.

---

## Decisions traceable to feedback

The discipline that distinguishes triaged-synthesis from feedback ceremony.

**The pattern.** Each major product decision can be traced to specific feedback patterns. The team can articulate: "We decided to prioritize X because feedback showed Y pattern across Z channels."

**The anti-pattern.** Decisions get made on intuition or politics. Feedback aggregation happens in parallel but does not inform the decisions. The team uses general impressions ("we hear a lot about this from customers") rather than specific patterns.

**The discipline.**

- Roadmap items reference the feedback patterns that motivated them.
- Prioritization debates reference specific signal weight.
- Spec drafts include feedback context for the design decisions.
- Stakeholder communication explains decisions in terms of feedback patterns.

**The audit.** For recent decisions, can the team trace each to specific feedback signals? If yes, the program is informing decisions. If the answer is "we generally know what customers want," the program is feedback theater.

---

## Roadmap input from feedback

How feedback aggregation informs roadmap planning.

**The roadmap inputs.**

- High-frequency-high-intensity patterns (quadrant 1 from the frequency-intensity matrix).
- Strategic-segment patterns (quadrant 3 from segments that matter for strategy).
- Cross-channel patterns that have validated across multiple sources.
- Drift signals that suggest emerging issues.

**The roadmap-output mapping.** Roadmap candidates get characterized by which feedback patterns they address.

- Candidate: "Onboarding redesign." Feedback motivation: configuration step 3 abandonment pattern across support, NPS, in-app feedback.
- Candidate: "Enterprise admin overhaul." Feedback motivation: enterprise sales-call objections + enterprise customer support patterns.

The mapping makes the roadmap defensible: each item has a feedback-grounded reason.

**The "no feedback signal, no priority" discipline.** Candidates that lack feedback grounding may still be valuable but should be defensible on other grounds (technical foundation, strategic bet). Candidates without any defensible grounding should be deprioritized.

Pair with `roadmap-planning` for the broader prioritization discipline.

---

## Spec input from feedback

How feedback aggregation informs spec writing.

**The pattern.** Specs reference feedback context for design decisions.

**Worked example.** A spec for an onboarding redesign:

- Background: feedback shows 40% of new signups abandon at configuration step 3. Cross-channel pattern (support tickets, in-app feedback, NPS comments).
- User stories: grounded in the specific feedback patterns. "As a new signup, I want to defer credit-card configuration until after I have seen the value, so I do not need my card on hand at signup."
- Design decisions: tied to the feedback. "Step 3 deferral chosen because feedback specifically cites credit-card-not-on-hand as the abandonment cause; alternative approaches that do not address this would not move the metric."

The spec is grounded in feedback rather than in intuition.

Pair with `pm-spec-writing` for the broader spec discipline.

---

## Stakeholder communication from feedback

How feedback aggregation informs stakeholder discussions.

**The pattern.** Decisions presented to stakeholders are explained in terms of feedback patterns.

**Strong stakeholder communication.**

- "We are prioritizing the onboarding redesign because feedback across support, NPS, and in-app surveys consistently shows 40%+ abandonment at configuration step 3, with users citing credit-card friction as the cause."
- "We are deferring the dashboard expansion because feedback signal is mixed: enterprise customers want it; small-team customers do not need it; the strategic priority for this quarter is small-team activation."

**Weak stakeholder communication.**

- "We have heard a lot of feedback about onboarding."
- "Customers want this feature."

The strong version is defensible; readers can engage substantively. The weak version is hand-waving.

---

## Closing the synthesis loop

After decisions ship, feedback responds.

**The post-decision feedback.**

- Did the change reduce the feedback patterns that motivated it?
- Did new patterns emerge as a result?
- Did the change introduce new friction in adjacent areas?

**The discipline.** Track post-decision feedback to validate that the decision worked. Decisions that ship without post-decision feedback tracking lose the loop's learning value.

---

## Cadence drift

When the synthesis cadence breaks down.

**Common drift patterns.**

- Critical issues handled but no weekly pattern review. Tactical signal lost.
- Weekly review happens but does not aggregate to monthly synthesis. Patterns over time invisible.
- Monthly synthesis happens but does not inform quarterly planning. Strategic input missing.
- Quarterly strategic synthesis happens but the team does not act on it. Synthesis ceremony.

**The signal.** When decisions stop being traceable to feedback, the cadence has drifted. The fix is restoring the cadence rather than blaming the team.

---

## Synthesis ownership

Who owns the synthesis loop.

**Common ownership patterns.**

- A dedicated feedback program owner (often a senior PM, product ops, or customer-success-product liaison).
- The product team's PM rotates through synthesis duties.
- A customer feedback team that synthesizes and feeds product teams.

**The discipline.** Whoever owns synthesis is accountable for the loop's continuity. Without explicit ownership, synthesis falls to whoever has time, which often means it does not happen.

---

## Common decision-loop failures

**Synthesis without decisions.** Patterns surfaced; team does not use them. Documentation theater.

**Decisions without synthesis grounding.** Team makes decisions on intuition; feedback aggregation happens in parallel but does not inform.

**Cadence breakdown.** Daily critical handled; weekly and monthly synthesis fall behind. Loop loses continuity.

**No post-decision tracking.** Decisions ship; feedback response not tracked; learning lost.

**Synthesis ownership missing.** No clear owner; synthesis falls between roles.

**Synthesis output not actionable.** Documents produced but framed in ways that do not inform decisions. Dense, generic, or unfocused.

**Stakeholder communication still hand-waving.** Synthesis happens internally but stakeholder communication does not reference the patterns.

---

## Methodology-level choices that stay in the public skill

The synthesis loop. The cadences (daily, weekly, monthly, quarterly). The synthesis output per cadence. Decisions traceable to feedback. Roadmap input. Spec input. Stakeholder communication. Closing the loop after decisions ship. Cadence drift. Synthesis ownership. Common failures.

## Implementation choices that stay internal

Specific tooling for synthesis production. Specific document templates per cadence. Specific reviewer workflows. Specific dashboard configurations. The team's own conventions for owning synthesis. These vary by team.
