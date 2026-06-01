# Post-experiment decision framework

The moment-of-decision framework for what to do when a test ends. Each step builds on the prior; do not skip ahead. The discipline at this stage is what separates teams that learn from experiments from teams that confirm their priors.

---

## Step 1: Confirm pre-commitment was followed

Before reading the results, pull up the pre-commitment document. Verify:
- The test ran for the pre-committed duration (not stopped early, not extended).
- The primary metric was the one pre-committed (not silently swapped).
- The segments analyzed were the ones pre-committed (not new ones discovered post-hoc).
- The guardrails are the ones pre-committed (not narrowed or widened after the fact).

If any item failed the check, the result is compromised. Treat as inconclusive at minimum; consider re-running.

---

## Step 2: Apply the pre-committed decision rule mechanically

The pre-commitment mapped each possible result to a ship-or-kill decision. Find the bucket the result falls into. Apply the rule.

Resist the temptation to add new analysis "just to be sure." If new analysis is required to make a decision, the pre-commitment was inadequate; the lesson is for next time, not a license to dig until the answer feels right.

The mechanical-application discipline is the most important habit at this step. Teams that deliberate about whether to follow their own pre-commitment have already lost the discipline. Apply the rule. Document any second-guessing as feedback for the next pre-commitment.

---

## Step 3a: If decision is "ship"

1. File the launch ticket. Include: the test ID, the primary metric lift, confidence interval, guardrails status, segments status, and a link to the pre-commitment.
2. Schedule post-launch monitoring at +7 days, +30 days, +60 days. Calendar reminders, not "I'll check it later."
3. Confirm the launch removes the experiment infrastructure (the flag, the variant code paths) on the schedule the team has for stale-flag cleanup. See the `feature-flagging` skill for the cleanup discipline.
4. Post a brief launch summary to the team's experiment log.

---

## Step 3b: If decision is "kill"

1. Document the learning. What did the team predict? What happened? What is the most likely reason for the gap?
2. Propose a follow-up hypothesis if applicable. The hypothesis can be "we should not test this idea again" if the test was definitive in the negative direction. It can be "let's iterate the mechanism" if the test was inconclusive and the team has a clearer story now.
3. Archive the experiment infrastructure: remove the flag, clean up the variant code, remove instrumentation that was specific to this test.
4. Post the kill summary to the team's experiment log. Killed experiments are as valuable as winning experiments; they prevent the team from repeating the mistake.

---

## Step 3c: If decision is "inconclusive"

The inconclusive path is the hardest. The temptation is to ship anyway because the team has invested in the hypothesis. Resist it.

Run through the resolution paths in order:

1. **Was the MDE realistic?** If the test was underpowered (you needed a 5 percent lift to be detectable, and you got a 2 percent point estimate with a confidence interval crossing zero), the right answer may be to redesign the test with a bolder change and rerun. Do not extend the existing test; that produces a peeking artifact. Plan a new test, pre-commit, run.
2. **Was the test contaminated?** If a confounder (campaign, outage, instrumentation bug) is identifiable, fix and rerun. Do not handwave the confounder.
3. **Is the change cheap and reversible?** If the change is small, easy to maintain, and easy to roll back, shipping despite an inconclusive result is defensible. The bar is high; the change has to be genuinely cheap, and the guardrails have to be clean. If the change is expensive to maintain (additional UI complexity, additional code paths, additional analytics surface), ship is the wrong call.
4. **Otherwise: kill, document, move on.** The discipline of accepting inconclusive results as inconclusive is what makes experimentation a learning system. Treating every inconclusive result as a "we just need more data" justification destroys the discipline.

---

## Step 4: Write the post-mortem within one week

Regardless of the decision, write a short post-mortem within one week. The post-mortem covers:

- The hypothesis (cause, effect, magnitude, mechanism)
- The pre-commitment (primary metric, MDE, duration, decision rule)
- The result (lift, CI, guardrails, segments)
- The decision (ship / kill / inconclusive)
- The action taken (launch, archive, redesign)
- The learning (what would the team do differently next time)

Keep post-mortems short: half a page is plenty. Long post-mortems do not get written; short ones do. The compounding value of a written experiment log over years is enormous; the compounding value of a vague memory of past tests is zero.

---

## Post-launch monitoring (the 30-day rule)

Even shipped experiments need monitoring. The first 30 days after launch are when the production behavior diverges from the test behavior, if it is going to.

Schedule a review at:

- **Day 7.** Production metric matches the experiment lift within reasonable tolerance. If it does not, investigate before declaring the launch successful.
- **Day 14.** Lift has not decayed (which would suggest novelty effect that the test underweighted) or amplified (which would suggest the change interacts with something the test could not capture).
- **Day 30.** Long-term metrics (retention, downstream conversion, support load) are not eroding. The change continues to deliver value, not just an initial bump.

If the production behavior diverges materially from the test behavior at any review:

1. Quantify the divergence. Is it within statistical noise, or is it a real effect?
2. Investigate the cause. Common ones: novelty wore off, segment distribution shifted, instrumentation bug, interaction with another concurrent change.
3. Decide: roll back, hot-fix, or accept and document. Most successful tests behave the same way in production as in the test; the ones that diverge are usually telling you something is wrong.

The 30-day rule prevents the "we shipped, it worked, then it stopped working but nobody noticed" failure mode. Most teams skip post-launch monitoring; the ones that do it consistently learn faster.
