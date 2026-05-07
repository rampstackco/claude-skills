---
name: okr-design
description: "OKR design as actually shipped, not as conference-talk theory. Outcome statements that drive decisions, key results that measure the right thing, scoring discipline, mid-quarter recalibration, and the difference between sandbagged OKRs (always 100%) and aspirational OKRs (always 30%) and stretch OKRs (genuine ambition with quarterly accountability). Triggers on OKR design, OKR setting, key result design, OKR scoring, mid-quarter recalibration, OKR cascading, outcomes vs outputs, quarterly planning, goal setting. Also triggers when a team's OKRs are always hit and producing no learning, when OKRs are demoralizing because they were set as fantasy, or when the team uses OKR vocabulary but the practice has decayed."
category: product
catalog_summary: "OKR design discipline. Outcome statements, key results, scoring, mid-quarter recalibration. Distinguishes sandbagged OKRs (always hit, useless) from aspirational fantasy (impossible, demoralizing) from stretch OKRs (genuine ambition with quarterly accountability)"
display_order: 12
---

# OKR Design

A senior product leader's playbook for OKR design as actually shipped, not as conference-talk theory. Outcome statements that drive decisions, key results that measure the right thing, scoring discipline, mid-quarter recalibration, and the practical disciplines that distinguish OKRs from quarterly to-do lists or impossible-fantasy goal-setting.

OKRs are accountability infrastructure. When designed well, they produce a quarterly rhythm of ambitious goal-setting, mid-quarter learning, end-of-quarter scoring, and adjustment for the next quarter. When designed badly, they become a tax on the team that produces no signal: sandbagged OKRs that always hit 100% (no ambition, no learning), aspirational fantasy OKRs that nobody can hit (demoralizing, ignored after week 2), or vague OKRs that the team scores generously regardless of outcome.

This skill is OKR design as practical methodology. The teams that benefit from OKRs are the ones that hold the discipline: outcomes over outputs, key results that actually measure the outcome, scoring honestly even when uncomfortable, recalibrating mid-quarter when warranted, and using the OKR review cadence to drive learning rather than performance theater.

The voice is the senior product leader who has run OKRs in healthy organizations and watched the practice decay in others. Concrete, opinionated about what actually works, willing to call out the failure modes that conference talks gloss over.

When to use this skill: designing OKRs for the next quarter, auditing why current OKRs are not driving decisions, recalibrating an OKR practice that has decayed, or onboarding a team to OKRs that has never used them.

---

## What this skill is for

This skill spans OKR design and the operational rhythm around them. The PM-skill distinction:

- **`okr-design` (this skill)** is outcomes (results to be achieved).
- `roadmap-planning` is outputs (features and initiatives sequenced).
- `feature-launch-playbook` is post-ship execution.
- `product-analytics-setup` is measurement infrastructure (the metrics that key results depend on).
- `experiment-design` is the discipline for testing whether specific initiatives produce outcomes.
- `discovery-research-synthesis` informs which outcomes to pursue.

The audience: senior PMs, product directors, engineering leaders, executives setting org-wide OKRs, in-house teams operating in OKR-driven cultures.

What is not in scope: the broader strategic planning that decides which outcomes matter (other strategy frameworks); the execution of specific initiatives toward OKRs (covered by roadmap-planning, pm-spec-writing, feature-launch-playbook); the analytics infrastructure (covered by product-analytics-setup, analytics-strategy).

---

## Sandbagged vs aspirational-fantasy vs stretch

The keystone framing.

**Sandbagged.** OKRs designed to hit 100%. The key results target outcomes the team is already on track to deliver. End of quarter: 100% scores across the board. The team celebrates; nobody learns anything. Output: an OKR practice that produces no signal. The team has the same OKRs every quarter dressed in different vocabulary because nothing pushes them past where they would have gone anyway.

**Aspirational-fantasy.** OKRs that nobody can hit. 1000% growth in 90 days. Demoralizing, performative, ignored after week 2. Teams that ship aspirational-fantasy OKRs typically discover by week 6 that no realistic effort path produces the targets; they disengage; the OKRs become decoration on the planning doc that nobody references.

**Stretch.** Genuine ambition with quarterly accountability. Designed to hit 60-70% on average. Hits and misses both teach something. The 60% case ("we hit 60% of our key results") is informative about what the team can deliver in a quarter; the 100% case is rare and usually signals sandbagging in retrospect; the 30% case signals either fantasy or the team encountered something unexpected (which is also informative).

The litmus test. Look at the team's last four quarters of OKRs. If the average score is 95%+, the OKRs are sandbagged. If the average is below 30%, they are fantasy. If the average is 50-75%, the design is in the stretch zone. Adjust upcoming OKRs to bring the practice into stretch territory.

---

## Objective design

Objectives are outcome statements. They name what the team is trying to achieve in the quarter.

**Strong objective characteristics.**

- Outcome-focused, not output-focused. "Improve activation for new sign-ups" is an outcome; "Ship the new onboarding flow" is an output.
- Specific to the quarter. Vague aspirations ("be more user-focused") do not focus quarterly work.
- Inspiring without being fantasy. The team should feel pulled toward the objective, not crushed by it.
- Few in number. Most teams should have 2-4 objectives per quarter; more than 5 dilutes focus.

**Worked examples.**

- "Improve activation for new sign-ups so that more reach the value-realization moment within the first week."
- "Make the support experience deflect predictable issues so the team can focus on harder cases."
- "Establish enterprise-readiness foundations so we can serve the segment we are targeting next year."

**Weak objective characteristics.**

- Output-disguised-as-outcome. "Ship the activation redesign" is an output; the objective should be the result the redesign is meant to produce.
- Too vague. "Improve user experience" is too broad to focus quarterly work.
- Too tactical. "Refactor the auth service" is a tactical decision, not a quarterly objective.
- Too many. 8 objectives produces no focus; the team works on too many things and excels at none.

Detail in [`references/objective-design-patterns.md`](references/objective-design-patterns.md).

---

## Key result design

Key results measure progress toward the objective. They are the quantitative or testable indicators that show whether the objective is being achieved.

**Strong key result characteristics.**

- Measurable. There is a specific number or testable threshold.
- Outcome-aligned. Achieving the key result actually moves the objective forward.
- Within team influence. The team can affect the key result through their work.
- Time-bounded. The measurement window is the quarter (or appropriate sub-window).

**Worked example.** Objective: "Improve activation for new sign-ups."

Strong key results:

- "Increase the percentage of new sign-ups reaching the value-realization moment within their first week from 32% to 45%."
- "Reduce the median time-to-first-value from 4.2 days to under 2 days."
- "Reach 80% completion rate on the onboarding flow (up from 64%)."

Each key result is measurable, ties to activation, the team can influence it through onboarding redesign work, and is time-bounded to the quarter.

**Weak key results.**

- Vague: "Improve activation significantly."
- Output: "Ship 5 onboarding redesign initiatives." (counts work done, not outcomes produced.)
- Outside influence: "Increase total signups by 50%." (signups are mostly upstream of activation work.)
- Vanity: "Reach 1M users." (impressive number; not directly tied to activation outcome.)

**The 3-5 key results rule.** Most objectives benefit from 3-5 key results. One key result is fragile (single measurement may not capture the outcome); 6+ key results dilute focus.

Detail in [`references/key-result-design-patterns.md`](references/key-result-design-patterns.md).

---

## Cascading OKRs across the org

When and how to cascade OKRs from leadership to teams.

**The trade-off.**

- Cascaded OKRs ensure team work aligns with company priorities. The product team's objective derives from the company's objective; the engineering team's objective derives from the product team's.
- Strict cascading produces top-down OKRs that miss bottom-up insight. The team closer to the work sometimes knows what to prioritize better than the layer above.
- Too-loose cascading produces team OKRs that do not connect to company priorities; teams optimize locally without contributing to org goals.

**The middle path.**

- Company-level OKRs set quarterly. Team-level OKRs set with reference to company OKRs but with team-level autonomy on how to contribute.
- Each team's OKRs explicitly identify which company OKRs they ladder up to.
- Some team OKRs may be team-specific (technical debt, infrastructure, experimentation infrastructure) without direct company-OKR ladders. Surface these explicitly so the team's full work is visible.

**When to cascade strictly.** Early-stage companies aligning around a small number of company priorities. Times of strategic shift where the org needs to move in a coordinated direction.

**When to cascade loosely.** Mature organizations with established team mandates. Cross-functional teams where strict cascading would over-constrain.

**The honest disclosure.** Cascading is harder than conference talks suggest. Most orgs over-cascade in the first few cycles and learn to relax it; some never learn and produce OKRs that are increasingly performative as they propagate down.

Detail in [`references/cascading-okrs-decisions.md`](references/cascading-okrs-decisions.md).

---

## Scoring discipline

End-of-quarter scoring is where OKR practice succeeds or decays.

**The 0.0-1.0 scale.** Each key result scores from 0.0 (no progress) to 1.0 (fully achieved). The objective scores as the average of its key results.

**The 60-70% target.** Stretch OKRs are designed so that the average score across the team's OKRs is 0.6-0.7. Higher average suggests sandbagging; lower suggests fantasy or unexpected disruption.

**Scoring honesty.**

- Score the actual outcome, not the effort. The team that worked hard but did not move the metric scores low; the team that got lucky and moved the metric without much effort scores high. The score reflects outcome.
- Do not round up. A key result at 0.55 is 0.55, not 0.6. Honest scoring produces honest signal.
- Acknowledge what changed mid-quarter. Some misses reflect priority shifts; surface those without using them as excuses.

**What 100% means.** 100% scores warrant scrutiny. Either the OKR was sandbagged (under-set), the team had a great quarter (informative), or the team is rounding up. Investigate which.

**What 30% means.** 30% scores warrant scrutiny. Either the OKR was fantasy (over-set), the team encountered unexpected disruption (informative), or the work was deprioritized mid-quarter (also informative). Investigate which.

**The compensation question.** OKRs work best when not directly tied to compensation. When OKRs determine bonuses, sandbagging incentives become severe; teams set OKRs they know they can hit. Most healthy OKR cultures separate goal-setting from compensation.

Detail in [`references/scoring-discipline.md`](references/scoring-discipline.md).

---

## Mid-quarter recalibration

When OKRs should change vs when teams should adapt.

**The default.** OKRs hold for the quarter. Teams adapt their tactics to the OKR; OKRs do not change to match what the team is doing.

**When to recalibrate.**

- Strategic shift. The company's strategy changed materially mid-quarter; OKRs that no longer reflect the strategy are no longer the right targets.
- Major external disruption. A market change, regulatory event, or significant outage warrants resetting the quarter's targets.
- Information that invalidates the OKR. The team learned mid-quarter that the metric they were targeting does not actually represent the outcome.

**When NOT to recalibrate.**

- The team is not on track. OKRs that are missing should remain as set; the miss is the signal.
- The OKR is uncomfortable. Teams uncomfortable with stretch OKRs should not lower them mid-quarter to feel better.
- Easier OKRs would feel achievable. The temptation to swap hard OKRs for easy ones is sandbagging in slow motion.

**The recalibration discipline.** Recalibration should be rare (1-2 quarters out of 8). Frequent recalibration signals OKR design failure: either too aggressive or not strategically aligned. The recalibration itself should be transparent: surface what changed, why, and what the new targets are.

Detail in [`references/mid-quarter-recalibration.md`](references/mid-quarter-recalibration.md).

---

## The OKR review cadence

OKRs benefit from a structured review rhythm.

**Weekly check-ins.**

- Team reviews progress on each key result. 15-30 minutes.
- Surfaces blockers, dependencies, signal that the trajectory is off.
- Not for adjusting OKRs; for adjusting tactics to keep moving toward them.

**Mid-quarter review.**

- Roughly week 6 of the quarter. 60-90 minutes.
- Honest assessment of trajectory: which key results are on track, which are off.
- Decision point for any recalibration (rare; should not be the default outcome).
- Surface external dependencies that affect end-of-quarter outcomes.

**End-of-quarter review.**

- Score each key result honestly.
- Identify what produced the scores: tactical choices, external factors, OKR design decisions.
- Inform next-quarter OKR design with the lessons.

**Quarterly retrospective.**

- Distinct from the scoring review. The retrospective examines the OKR practice itself: were the OKRs the right ones, did the cadence work, what should change.
- Often combined with the next-quarter OKR setting session.

Detail in [`references/review-cadence-templates.md`](references/review-cadence-templates.md).

---

## OKRs vs roadmap items vs metrics

Three concepts often conflated. Each serves a different purpose.

**OKRs.** Outcome targets for the quarter. "Improve activation for new sign-ups" is an OKR; "Increase first-week activation rate from 32% to 45%" is a key result.

**Roadmap items.** Initiatives the team is building or doing. "Onboarding redesign" is a roadmap item. Roadmap items contribute to OKRs but are not the OKRs themselves.

**Metrics.** Ongoing measurements the team tracks. "First-week activation rate" is a metric. Metrics inform key results (which are quarterly targets on metrics) and are tracked continuously regardless of whether the team has an OKR aimed at them.

**The relationship.**

- OKR: "Improve activation for new sign-ups."
- Key result: "First-week activation rate from 32% to 45%."
- Metric: "First-week activation rate" (tracked continuously).
- Roadmap items contributing: "Onboarding redesign," "Welcome email sequence revision," "Activation triage automation."

**Common conflations.**

- Treating roadmap items as OKRs. "Ship the onboarding redesign" as an OKR; the OKR should be the outcome the redesign is meant to produce.
- Treating every metric as needing an OKR. Some metrics matter for the team to track without setting quarterly targets on them.
- Treating OKRs as roadmap commitments. OKRs name outcomes; the team is committed to pursuing them but may shift tactics; treating OKRs as roadmap commitments locks in tactics that may need to change.

Detail in [`references/okrs-vs-roadmap-vs-metrics.md`](references/okrs-vs-roadmap-vs-metrics.md).

---

## Common failure modes

Rapid-fire. Diagnoses in [`references/common-okr-failures.md`](references/common-okr-failures.md).

- "Our OKRs are always 100% and produce no signal." Sandbagged. Set with stretch ambition; expect 60-70% scores.
- "Our OKRs are always 30% and demoralizing." Fantasy. Recalibrate to genuine stretch; investigate whether the targets are achievable in any realistic effort path.
- "Our key results measure work, not outcomes." Output-disguised-as-outcome. Rewrite key results to measure the result, not the work.
- "We have 12 OKRs and the team is working on 47 things." Too many OKRs; cap at 2-4 objectives, 3-5 KRs each.
- "Our OKRs are vague." Lack measurable targets; rewrite key results with specific numbers and thresholds.
- "Our cascading produces team OKRs that do not match team work." Strict cascading mismatched to team mandate; loosen cascading or change team mandate.
- "We never recalibrate even when the strategy shifts." Recalibration too tightly avoided; surface strategic-shift criteria and use them.
- "We recalibrate every quarter." Recalibration too easy; OKR design is failing; investigate.
- "Our weekly check-ins became status reports." Tactical-discussion missing; reform the check-in format.
- "Our scoring rounds up." Scoring discipline missing; commit to honest scoring.
- "OKRs and bonuses are tied; people sandbag." Predictable; decouple OKRs from compensation.

---

## The framework: 12 considerations for OKR design

When designing or auditing OKRs, walk these 12 considerations.

1. **Stretch, not sandbagged or fantasy.** 60-70% average score target.
2. **Objectives are outcomes, not outputs.** What we are trying to achieve.
3. **Few objectives, well-focused.** 2-4 per team per quarter.
4. **Key results are measurable.** Specific numbers or testable thresholds.
5. **Key results are outcome-aligned.** Achieving them moves the objective forward.
6. **Key results are within team influence.** Not entirely dependent on external factors.
7. **3-5 key results per objective.** Single key results are fragile; many dilute focus.
8. **Cascading explicit but not over-constrained.** Team OKRs ladder up but with autonomy on how.
9. **Scoring honest, not rounded.** 0.0-1.0 reflects actual outcomes.
10. **Recalibration rare.** OKRs hold absent strategic shift or major disruption.
11. **Review cadence weekly + mid-quarter + end-of-quarter.** Tactical, then strategic, then scoring.
12. **OKRs separate from roadmap items and metrics.** Each serves a different purpose.

The output of the framework is OKRs that produce quarterly accountability infrastructure: ambitious goal-setting, mid-quarter learning, end-of-quarter scoring honest enough to inform the next quarter.

---

## Reference files

- [`references/objective-design-patterns.md`](references/objective-design-patterns.md) - Outcome-vs-output distinction. Strong vs weak objective characteristics. Worked examples across domains. The few-objectives discipline.
- [`references/key-result-design-patterns.md`](references/key-result-design-patterns.md) - Measurable, outcome-aligned, within-influence, time-bounded characteristics. Strong vs weak key results. The 3-5 KR rule. Worked examples.
- [`references/cascading-okrs-decisions.md`](references/cascading-okrs-decisions.md) - When to cascade strictly vs loosely. The middle path. Cascading anti-patterns. The honest disclosure about cascading difficulty.
- [`references/scoring-discipline.md`](references/scoring-discipline.md) - The 0.0-1.0 scale. The 60-70% target. Scoring honesty. What 100% and 30% mean. The compensation question.
- [`references/mid-quarter-recalibration.md`](references/mid-quarter-recalibration.md) - When to recalibrate vs adapt tactics. Strategic shift vs uncomfortable OKRs. The recalibration discipline.
- [`references/review-cadence-templates.md`](references/review-cadence-templates.md) - Weekly check-ins, mid-quarter review, end-of-quarter scoring, quarterly retrospective. Format and time investment per cadence.
- [`references/okrs-vs-roadmap-vs-metrics.md`](references/okrs-vs-roadmap-vs-metrics.md) - The three concepts and their relationships. Common conflations. The complete picture across all three.
- [`references/okr-anti-patterns.md`](references/okr-anti-patterns.md) - 8+ anti-patterns including OKR-as-roadmap, sandbagging, fantasy, vanity metrics, OKR theater, compensation coupling.
- [`references/common-okr-failures.md`](references/common-okr-failures.md) - 11+ failure patterns with diagnoses and cures.

---

## Closing: OKRs are accountability infrastructure

OKRs at their best produce quarterly accountability that informs the org's strategic learning. The team commits to outcomes; works toward them; scores honestly; learns from the gap between target and outcome; designs the next quarter's OKRs better.

OKRs at their worst produce ritual that consumes time without producing signal. Sandbagged OKRs that always hit. Fantasy OKRs that nobody can. Vague OKRs that score generously regardless of outcome. The vocabulary persists; the practice has decayed.

The teams that benefit from OKRs are the ones that hold the discipline: outcomes over outputs, measurable key results, stretch ambition, scoring honesty, recalibration only when warranted, and the review cadence that drives learning rather than performance theater.

When in doubt about whether an OKR practice is working, ask: do the OKRs drive decisions about what to prioritize, do the scores produce learning that informs the next quarter, are key results actually measuring outcomes the team can influence, is the average score in the 60-70% range that stretch OKRs target? If yes to all of those, the practice is real. If no to any, the gap is where the OKR work is failing to produce the accountability infrastructure it is meant to provide.
