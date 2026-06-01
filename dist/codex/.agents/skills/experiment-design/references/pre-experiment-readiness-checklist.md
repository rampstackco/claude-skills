# Pre-experiment readiness checklist

A go/no-go decision checklist to run through before launching any experiment. If any item is "no," delay the launch until it is "yes." Running an experiment without these in place produces results that cannot be defended, decisions that get second-guessed, and a long-term erosion of trust in the experimentation discipline.

The checklist takes ten to fifteen minutes per experiment. The cost of skipping it is much higher.

---

## 1. Hypothesis written in cause-effect-magnitude-mechanism format

The hypothesis names: what change is being made (cause), what metric will move (effect), how much you expect it to move with what baseline and target (magnitude), and why you expect this change to produce this effect (mechanism).

If the draft hypothesis is missing any of the four parts, rewrite using one of the templates from `hypothesis-templates.md` before launch.

---

## 2. Primary metric defined with success threshold

Exactly one primary metric. Specified with the same precision the platform's metric configuration requires (event name, deduplication window, user identity logic). Success threshold pre-committed: the lift you would consider sufficient to ship.

If multiple metrics feel "primary," collapse to one and demote the others to guardrails.

---

## 3. Guardrails defined (3 to 5)

Three to five guardrail metrics that must not break: revenue, retention, support tickets, page load time, error rate, satisfaction scores. Each with a tolerance threshold pre-committed.

Avoid: more than five guardrails (creates analysis paralysis), or zero guardrails (the test cannot detect collateral damage), or vague guardrails like "user happiness" (not measurable).

---

## 4. Sample size calculated for chosen MDE

The required sample size for the chosen minimum detectable effect, at standard alpha (0.05) and power (0.80), through your platform's calculator or via a stats library. Documented in the pre-commitment.

If the math says "you need 200,000 users to detect this lift and you have 5,000 a week," accept a larger MDE or do not run the test. Do not run an underpowered test and hope for the best.

---

## 5. Duration committed (longer of sample-size-hit and full weekly cycle)

Calendar duration committed in advance. The longer of: time to hit the calculated sample size at expected daily traffic, or one full weekly cycle (typically 7 days). UI/UX changes get a 14-day minimum regardless.

If the duration is "we will see how long it takes," that is not a duration. Pick a date.

---

## 6. Segments pre-registered (if any)

If you plan to analyze segment-level results, name the segments before launch. Three to five maximum, each with a real prior reason to expect different behavior in that segment.

If you do not plan to analyze segments, write that down too. The pre-commitment to "no segment analysis" is itself a defense against post-hoc segment mining.

---

## 7. Decision rule pre-committed (saved with timestamp)

Map each possible result to a decision:
- Result above target threshold + guardrails clean: ship
- Result below MDE: kill
- Result inconclusive (point above zero, CI crosses zero): default to do not ship; document next-step options
- Guardrail violation: do not ship regardless of primary

Save the decision rule somewhere immutable: the PR description, a pinned ticket, a signed Slack message, anywhere with a timestamp.

---

## 8. No conflicting concurrent experiments on the same surface

Check the experiment registry for what else is running on the same surface (checkout flow, signup form, pricing page). If there are interactions, set up mutex enforcement so users in this test are not also in the others.

If you cannot enforce mutex (sample size constraints), document the overlap and accept the interpretability cost. Do not pretend there is no overlap.

---

## 9. Instrumentation tested with a small canary

Before launching to the full population, expose a small canary group (5 to 10 percent) and confirm:
- Treatment users actually see the treatment
- Events fire correctly for both groups
- The platform reports the right exposure counts
- Internal traffic is excluded
- The metric definitions match between the platform and production analytics

Catching instrumentation bugs in canary saves a wasted full test run.

---

## 10. Stakeholders aligned on what each outcome means

The PM, the engineering lead, the design lead, and any other decision-maker have all agreed: if the test wins, we ship; if it loses, we kill; if it is inconclusive, we follow the inconclusive path documented in the decision rule.

If a stakeholder is going to dispute the result regardless of what it shows, the experiment is theater. Resolve the strategic question first; run the experiment only if the result genuinely changes the decision.

---

## Decision

If all ten items are "yes," launch.

If any item is "no":
- Items 1, 2, 3 (hypothesis, metric, guardrails): blocking. Fix before launch.
- Items 4, 5, 7 (math, duration, decision rule): blocking. Fix before launch.
- Items 6, 8, 9 (segments, mutex, canary): worth fixing but launch can proceed if the fix is impractical and the team accepts the risk.
- Item 10 (stakeholder alignment): blocking. An experiment that cannot change the decision is theater.

The cost of delaying a launch by a day to fix a checklist item is small. The cost of running a test that produces an indefensible result is much higher.
