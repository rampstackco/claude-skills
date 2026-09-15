# Result presentation templates

Five templates for stakeholder communication on experiment results. Each names the structure, the vocabulary, what to emphasize, and what to omit. Use the right template for the result you have, not the one that flatters the team.

---

## Template 1: Clear win

**When to use.** Primary metric moved past MDE, CI on lift excludes zero, all guardrails clean, pre-registered segments consistent.

**Structure.**

1. **Headline.** "We are shipping [feature]. The test showed a [X percent] lift in [primary metric] with [Y percent] confidence. Guardrails are clean."
2. **The number.** Point estimate of the lift, with the CI in parentheses. "Revenue per visitor lifted 4.2% (CI [+2.8%, +5.6%])."
3. **Magnitude in business terms.** "At our enrolled traffic, that is roughly [$Z] in incremental [period] revenue from this cohort. Full-launch impact depends on rollout assumptions."
4. **Guardrails.** One line per guardrail confirming it stayed within tolerance.
5. **Decision and timing.** "Filing the launch this week. Post-launch monitoring at days 7, 14, and 30."

**Vocabulary to use.** "Real lift," "high confidence," "exceeds the threshold we committed to," "shipping."

**Vocabulary to avoid.** Superlatives ("dramatic," "unprecedented," "transformative"). The number speaks; superlatives do not add to it.

**What to omit.** Long discussion of why the test worked, deep statistical detail, exhaustive caveats. The headline result is clean; the writeup should be too.

---

## Template 2: Clear loss

**When to use.** Primary metric moved against expected direction with significance, OR a guardrail was violated.

**Structure.**

1. **Headline.** "We are not shipping [feature]. The test showed [a negative effect / a guardrail violation]."
2. **The number.** Point estimate and CI. Be precise about which metric showed the issue.
3. **Likely cause, if known.** Brief diagnosis: "Conversion dropped because users did not understand the new flow. Session recordings confirm confusion at step three."
4. **What we learned.** One or two sentences naming the lesson for the next hypothesis.
5. **Decision and follow-up.** "Killing the test. Filing the learning in the team retrospective. Considering [follow-up direction] as a next test."

**Vocabulary to use.** "The test showed," "killing," "the change made things worse on [metric]," "we learned."

**Vocabulary to avoid.** "Failed" applied to the team. "Setback." Defensive language. The test produced a clear answer; the team did its job.

**What to omit.** Speculation about what would have happened with a different design. Excessive postmortem detail. The kill is the right decision; do not over-justify it.

---

## Template 3: Inconclusive (the most common, hardest)

**When to use.** Primary metric did not clearly move past MDE, CI is wide, OR guardrails are clean but signal is weak. The most frequent real outcome and the hardest to communicate without slipping into "we should ship anyway."

**Structure.**

1. **Headline.** "The test was inconclusive. We do not have enough signal to ship and we do not have enough signal to kill."
2. **The number.** Point estimate and the wide CI. Name the width: "Lift was +1.8%, but the CI is [-2.1%, +5.7%]; the data is consistent with a moderate win, no effect, or a moderate loss."
3. **What we know vs what we do not.** "We can rule out a large negative effect. We cannot distinguish a small positive effect from no effect. We cannot say whether shipping would help or hurt."
4. **The three resolution paths.**

   - Run bigger or longer: extend the test to narrow the CI. Cost: [time and traffic]. Benefit: a clearer answer.
   - Make the treatment bolder: redesign with a larger expected effect, then re-test. Cost: design and engineering effort. Benefit: addresses the underlying mechanism rather than the measurement.
   - Kill the idea: accept that the change does not produce a meaningfully detectable effect at our traffic. Cost: closing the hypothesis. Benefit: team time freed for higher-signal work.
5. **Recommendation.** Pick one path and explain why.
6. **Decision.** "Going with [path]. Re-evaluating in [timeframe]."

**Vocabulary to use.** "Inconclusive," "the data does not distinguish," "we cannot confidently say," "the right call is to [chosen path]."

**Vocabulary to avoid.** "Trending positive," "directional improvement," "looks promising." These are the phrases that get teams to ship inconclusive tests; they are wishful reading of noise.

**What to omit.** Pleas to ship "since we are already here." Optimistic projections of what the lift "would be" with more sample. Alternative analyses that conveniently show significance.

The hardest version of this template is the case where the team has invested in the hypothesis and the result is inconclusive. The temptation is to find a way to justify shipping. The discipline is to use the structure above and let the inconclusive result be inconclusive.

---

## Template 4: Mixed result (positive primary, ambiguous guardrail)

**When to use.** Primary metric moved past MDE with clean significance, but a guardrail metric showed concerning movement that did not clearly violate tolerance.

**Structure.**

1. **Headline.** "The primary metric moved as expected. A guardrail showed concerning movement; we are [shipping with monitoring / holding for further investigation]."
2. **Primary metric result.** Point estimate and CI. "Conversion lifted 5.1% (CI [+3.4%, +6.8%])."
3. **Guardrail concern.** Specific. "Refund rate point estimate moved +0.4%, with CI [-0.1%, +0.9%]. Pre-committed tolerance was no more than +0.5%. The CI does not clearly violate tolerance, but the upper bound is right at the threshold."
4. **The interpretation question.** "Pre-committed decision rule was 'do not ship if the guardrail CI excludes safe behavior.' The CI does not exclude safe behavior, but it does not exclude a violation either."
5. **Recommendation with reasoning.** Two valid paths:

   - Ship with extra monitoring: production behavior at +1, +2, +4 weeks specifically watching the guardrail. Roll back if it crosses tolerance in production. Acceptable when the primary lift is large and the guardrail risk is reversible.
   - Hold and re-test: extend the test to narrow the guardrail CI. Acceptable when the primary lift is marginal or the guardrail is hard to monitor in production.
6. **Decision.** Pick the path. Document the guardrail-specific monitoring or the re-test plan.

**Vocabulary to use.** "The guardrail CI does not clearly exclude tolerance," "shipping with intensified monitoring," "the pre-committed rule was."

**Vocabulary to avoid.** "The guardrail did not move significantly" (when the CI does not exclude movement, do not pretend it did). "The primary lift outweighs the guardrail concern" (the guardrail was set as binding for a reason).

**What to omit.** Reframing the guardrail as a "secondary metric" that does not need to bind. The guardrail was set during pre-commitment; it binds.

---

## Template 5: Long-term holdout report (30 / 60 / 90 days post-launch)

**When to use.** Reporting back on a feature that shipped with a holdout group, after the holdout period has elapsed.

**Structure.**

1. **Headline.** "[Feature] post-launch holdout report at [day count]. Long-term effect [confirms / diverges from / disconfirms] the test result."
2. **Test result reminder.** What the test showed at launch. "At launch, the test measured a +4% lift in [metric]."
3. **Long-term result.** What the holdout shows now. "At day 30, the launched cohort shows a +3.2% lift over the holdout (CI [+1.8%, +4.6%])."
4. **Comparison.** Direct: "The long-term effect is [in line with / smaller than / larger than] the test estimate. [If smaller: the difference is consistent with novelty fade / interference / dilution. If larger: the difference is consistent with network effects / learning effects.]"
5. **Decision implications.** "[Continue the launch as is / revisit the design / consider rollback]."
6. **Holdout disposition.** "[Releasing the holdout into the launched cohort / extending the holdout for another 30 days]."

**Vocabulary to use.** "Long-term effect," "confirms / diverges from," "novelty fade," "we observe."

**Vocabulary to avoid.** "Vindication" or "we were right." Long-term reports are about updating the prior, not declaring victory.

**What to omit.** Excessive celebration of a confirmed lift. Excessive panic about a divergent lift. The report is information for the next decision; let the information drive it.

---

## A note on the "we should report this differently" temptation

When a result is inconclusive or mixed, there is always a way to slice the data, frame the writeup, or pick the chart that makes the result look more decisive. Resist.

The cost of overstating an inconclusive result is shipping changes that do not work, eroding trust in the experimentation discipline, and accumulating production complexity for no gain. The cost of accurately reporting an inconclusive result is one round of disappointment from stakeholders who wanted a cleaner answer. The first cost compounds; the second does not. Use the right template for the actual result.
