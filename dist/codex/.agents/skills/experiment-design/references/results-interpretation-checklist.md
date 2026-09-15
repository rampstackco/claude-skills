# Results interpretation checklist

A step-by-step checklist for reading experiment results and arriving at a defensible decision. Run through it in order. Do not skip steps because the result "looks obvious"; the obvious-looking results are often the ones that fail in production.

---

## Step 1: Did the test run for the pre-committed duration?

**What to look for.** The test ended on the date pre-committed at launch, with the planned analysis happening on that date.

**Red flags.** The test was stopped early because results "looked great." The test was extended past the pre-commitment because results "had not stabilized." The test ran for an arbitrary duration not tied to the pre-commitment.

**When to escalate.** If the duration was changed after launch without documented rationale, the result is compromised. Treat as inconclusive and consider re-running.

---

## Step 2: Did all guardrails stay within tolerance?

**What to look for.** Each pre-defined guardrail (revenue, retention, support tickets, page load time, error rate) within its acceptable range. Confidence intervals around guardrail metrics that exclude the threshold of concern.

**Red flags.** A guardrail moved in the wrong direction even if the change was not "significant." Wide confidence intervals on guardrails (the test was underpowered for the guardrail). A guardrail you did not pre-define being raised post-hoc.

**When to escalate.** A guardrail violation should be treated as binding. The fix is "do not ship," not "the primary metric was good enough to outweigh the guardrail." If the guardrail was poorly chosen, that is a lesson for next time, not a license to ignore it on this test.

---

## Step 3: Did the primary metric move beyond the MDE?

**What to look for.** The point estimate of the primary metric exceeds the pre-committed minimum detectable effect, and the confidence interval excludes zero (or excludes the no-effect threshold for one-sided tests).

**Red flags.** Point estimate is above MDE but the confidence interval crosses zero. The "significance" comes from a peeking artifact (interim analysis that became the headline). The lift comes from a small number of outlier users.

**When to escalate.** If the primary metric is significant but the lift is below MDE, the test was overpowered for the question; the result is technically real but practically too small to matter. Do not ship a 0.3 percent lift just because p equals 0.001.

---

## Step 4: Was the confidence interval clean?

**What to look for.** A confidence interval around the lift estimate that is well-bounded and not crossing zero. Symmetric (or appropriately skewed for the metric type).

**Red flags.** Very wide CI (test was underpowered). Skewed CI hinting at distributional weirdness (a few outliers drove the result). CI computed without ratio-aware variance for ratio metrics.

**When to escalate.** If the CI is wide enough that the practical lift could be anywhere from "not worth shipping" to "amazing," the test does not support a confident ship decision. Run longer or accept inconclusive.

---

## Step 5: Are the results consistent across pre-registered segments?

**What to look for.** The pre-registered segments show effects in the same direction as the overall result. Magnitude can vary; direction should not flip.

**Red flags.** Some segments show effects opposite to the overall result. The overall lift comes from one segment and the rest are flat or negative.

**When to escalate.** If one segment is driving the entire effect and others are negative, the right ship decision is "ship to the segment where it works" only if the targeting infrastructure exists and is worth the maintenance cost. More often the right answer is to redesign the change so it works for the whole population.

Reminder: this step covers PRE-REGISTERED segments only. Post-hoc segments are noise mining; do not re-analyze the data through new segments looking for an interpretation.

---

## Step 6: Did any external events potentially confound the results?

**What to look for.** A timeline of events during the test window: marketing campaigns, product launches, outages, news cycles, holidays, seasonality shifts.

**Red flags.** A campaign launched mid-test that brought a different user mix. A product release mid-test that changed user behavior. An outage during the test that affected one variant differently from the other.

**When to escalate.** If a confounder is identified, isolate it. Stratify the analysis by acquisition source (excludes campaign-driven users), or by date (excludes the outage day), or rerun. Do not handwave the confounder; either fix it or accept that the result is tainted.

---

## Step 7: Is the magnitude practically significant, not just statistically significant?

**What to look for.** The lift is large enough to matter for the business. A 0.3 percent absolute lift on a 30 percent baseline is statistically significant with enough sample but may not justify the engineering cost of maintaining the change.

**Red flags.** "Statistically significant" being used as the only justification. No conversation about whether the lift is large enough to be worth the implementation, maintenance, and complexity cost.

**When to escalate.** If the magnitude is small, ask: "Is this worth the code surface area, the testing surface area, and the cognitive load on the team?" Often the answer is no. Do not ship marginal lifts unless the change is also cheap to maintain.

---

## Step 8: Does the decision match the pre-committed rule?

**What to look for.** The pre-commitment document mapped each possible result to a ship-or-kill decision. The result fits clearly into one of those buckets.

**Red flags.** The result does not fit cleanly. The team is debating which bucket applies. Someone is proposing a new analytical knob to clarify the bucket.

**When to escalate.** If the result is genuinely ambiguous, default to "do not ship" and document why. Inconclusive is a valid outcome; treating it as one is the discipline.

---

## Decision matrix

After running through the checklist, the result fits one of three buckets:

| Bucket | Conditions | Action |
|---|---|---|
| Clear win | Primary moved past MDE, CI excludes zero, guardrails clean, segments consistent, no confounders | Ship. File launch. Schedule post-launch monitoring at +30 and +60 days. |
| Clear loss | Primary moved against expected direction with significance, OR guardrail violated | Kill. Document the learning. Propose follow-up hypothesis if applicable. |
| Inconclusive | Anything else | Default to do not ship. Run a bigger version, kill, or iterate the hypothesis. |

The inconclusive bucket is the most common and the hardest. The discipline is to recognize it and resist the pull to ship anyway.

---

## Post-launch monitoring (the 30-day rule)

Even shipped experiments need monitoring. The first 30 days after launch are when the production behavior diverges from the test behavior, if it is going to. Schedule a review at day 7, day 14, and day 30.

What to check at each review:
- Day 7: Production metric matches the experiment lift within reasonable tolerance.
- Day 14: Lift has not decayed (novelty effect) or amplified (the change interacts with something the test could not capture).
- Day 30: Long-term metrics (retention, downstream conversion) are not eroding.

If the production behavior diverges materially from the test behavior, the right call is to roll back and investigate, not to "wait and see." Most successful tests behave the same way in production as in the test; the ones that diverge are usually telling you something is wrong.
