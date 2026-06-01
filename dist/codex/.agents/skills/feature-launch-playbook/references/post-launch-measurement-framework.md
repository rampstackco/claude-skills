# Post-launch measurement framework

Adoption, engagement, outcome, side effects. Time horizons. Tying back to spec hypotheses. The "declared victory on launch spike" failure mode.

The principle. The launch measurement plan answers "did this work." Without it, the team moves on without knowing.

---

## Four measurement dimensions

### 1. Adoption (the reach question)

Did the right users actually use the feature.

**Metrics.**

- Reach: of users in the rollout cohort, what fraction has tried the feature.
- Time to first use: of users who tried the feature, how long after rollout.
- Distribution by cohort: are the right segments (per the positioning canvas) the ones using the feature.

**Signal interpretation.**

- High reach plus right cohorts: the launch reached the target audience.
- High reach plus wrong cohorts: the launch reached the wrong audience; positioning or comms missed the target.
- Low reach: comms problem or discovery problem. Investigate which channel users would have learned about the feature from.

### 2. Engagement (the stickiness question)

Did users who tried the feature come back.

**Metrics.**

- Retention: of users who tried the feature once, what fraction used it again within 7, 14, 30 days.
- Frequency: how many times per week did adopters use the feature.
- Depth: did adopters use the full feature or only the first step.

**Signal interpretation.**

- High first-time use plus high retention: the feature is delivering value.
- High first-time use plus low retention: the feature failed to deliver on the first-use experience. Usability or value-prop problem.
- Low first-time use plus high retention among the few who tried: the feature is valuable to a niche; reach the niche better, or accept that it serves a smaller audience.

### 3. Outcome (the effect question)

Did the metric the spec said this would move actually move.

**Metrics.**

- The primary metric from the spec. Usually a business metric (revenue, retention, support deflection, conversion rate).
- The lift relative to a pre-launch baseline.
- The statistical significance of the lift, if a controlled comparison is available.

**Signal interpretation.**

- Metric moved as predicted: the feature delivered the value the team committed to.
- Metric moved less than predicted: partial success; the feature works but did not have the size of impact the team expected. Investigate why (smaller cohort than expected, smaller per-user impact, or simply optimistic projection).
- Metric did not move: the launch did not deliver the promised value. Investigate before declaring failure (could be measurement timeline, isolation issues, or the feature genuinely failing).

### 4. Side effects (the safety question)

Did any other metric move that was not supposed to.

**Metrics.**

- Cohorts adjacent to the target: did the feature affect users it was not designed for.
- Adjacent metrics: did related metrics move (positively or negatively).
- Support volume on adjacent topics: did the feature confuse customers about other parts of the product.

**Signal interpretation.**

- No side effects: clean launch.
- Positive side effects: the feature delivered value beyond the target. Document for the next iteration.
- Negative side effects: the feature broke something else. Triage urgently; this is a launch quality issue regardless of whether the primary metric moved.

---

## Time horizons

Different signals stabilize at different times.

| Signal type | Stable at |
|---|---|
| Adoption (reach) | 1 to 2 weeks post-launch |
| Engagement (retention) | 4 weeks for week-2 retention; 8 weeks for week-4 retention |
| Outcome | 4 to 8 weeks for most business metrics; longer for retention or LTV |
| Side effects | 2 to 4 weeks |

The rule. Do not declare success or failure on the outcome metric before week 4. The launch-week spike is unrepresentative; the metric needs time to stabilize at its post-launch level.

---

## Tying back to spec hypotheses

The spec (per `pm-spec-writing`) should have stated explicit hypotheses. The launch measurement plan validates each.

Example hypotheses from a hypothetical spec.

- "We expect this feature to be used by 40 percent of paid users within 30 days of rollout." (Adoption hypothesis.)
- "Of users who try the feature, we expect 60 percent to use it again within 7 days." (Engagement hypothesis.)
- "We expect this feature to reduce support tickets in the X category by 25 percent." (Outcome hypothesis.)
- "We do not expect this feature to affect billing-related support volume." (Side-effect hypothesis.)

The measurement plan validates each.

| Hypothesis | Measurement | Decision rule |
|---|---|---|
| 40% paid user adoption in 30 days | Cohort: paid users in rollout. Metric: distinct user count using the feature divided by cohort size. | Above 30% acceptable; below 20% requires intervention. |
| 60% week-1 retention | Cohort: users who tried the feature in week 1. Metric: fraction of cohort using the feature again in week 2. | Above 50% acceptable; below 40% indicates value or usability problem. |
| 25% reduction in X-category support tickets | Pre-launch baseline 30 days; post-launch 30 days. Compare ticket volumes. | Above 15% reduction acceptable; below 10% indicates the feature is not solving the right problem. |
| No effect on billing support | Billing ticket volume pre vs post. | Volume change above 20% requires investigation. |

The measurement plan is written before launch. The decision rules are pre-committed; the team does not move the goalposts after seeing the data.

---

## The "declared victory on launch spike" failure

The pattern.

- Week 1: adoption is high. The team announced the feature; users tried it; the metric is up.
- Week 2: adoption flat. The launch announcement spike has passed; the new users have tried the feature.
- Week 3: adoption declining. Users who tried the feature once are not coming back.
- Week 4: adoption near pre-launch baseline. The metric has reverted.
- The team had already declared the launch a success in week 1 and moved on.

The cost. The team's roadmap is now built on a launch that did not actually work. The next quarter's plan assumes the metric is at the elevated level; when it does not stay there, the plan does not deliver.

The fix. Declare success or failure based on the stable post-launch trend, not the launch-week spike. The minimum measurement window is four weeks; for retention or LTV signals, eight to twelve weeks.

The discipline. The four-week checkpoint is on the calendar before launch. The team holds itself accountable to revisit; the executive sponsor holds the team accountable to revisit. Launches that are reported as successful in week 1 and never revisited are silent failures.

---

## The "no measurement plan" failure

The pattern.

- Feature ships.
- Team moves on to the next feature.
- Six months later, someone asks "did feature X work?" Nobody knows.
- The feature becomes maintenance debt; the team cannot decide whether to invest in iteration.

The cost. The team accumulates features whose value is unknown. Roadmap decisions get harder because the historical track record is opaque. Engineering investment is wasted on features that did not work; the team does not learn from them because they did not measure.

The fix. Every launch has a measurement plan. The plan is short (one page); it names the four dimensions, the metrics, the time horizons, and the decision rules. The plan is reviewed at week 4 and again at week 8 or 12 depending on the signal.

The discipline. The measurement plan is part of the launch brief. A launch without a measurement plan does not get scheduled.

---

## When the metric did not move

If the outcome metric did not move at week 4, the next investigation.

1. **Is adoption strong?** If adoption is below target, the launch may be a comms or discovery problem, not a feature problem.
2. **Is engagement strong?** If engagement is below target among adopters, the value is not landing for the right reasons.
3. **Is the metric correctly attributed?** Did another concurrent change interfere with the measurement.
4. **Did the side-effects analysis catch a counterweight?** A negative side effect could be cancelling the positive primary effect.

Each diagnosis maps to a different fix.

- Adoption problem: more comms, repeat comms, deeper sales reactivation, in-app discovery surface.
- Engagement problem: usability or value-prop iteration. The feature may need redesign.
- Attribution problem: re-run measurement after the concurrent change has been accounted for.
- Side-effect counterweight: fix the side effect, then re-measure the primary.

---

## When the launch worked but quietly

Sometimes the launch works at every level (adoption strong, engagement strong, outcome metric moved) but the team does not feel like it succeeded. Usually the gap is internal awareness.

Signs.

- Sales is not using the feature in pitches.
- Customer success is not mentioning it in customer calls.
- The product narrative has not updated to include the feature.

The fix. Internal launch effectiveness is part of the launch playbook. Even successful feature launches need ongoing internal advocacy.

The discipline. After the four-week checkpoint, briefly re-engage internal stakeholders. Share the metrics. Highlight customer use cases. The internal awareness is not a one-time event at launch; it is sustained for a quarter or more.
