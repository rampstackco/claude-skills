# Common launch failures

Twelve patterns that recur across feature launches. For each: name, symptom, root cause, fix, prevention. Cross-references to other reference files.

---

## 1. We shipped it but nothing happened

**Symptom.** The team reports "we shipped feature X." Three weeks later, nobody is using it. The metric the spec said this would move has not moved. Internal stakeholders ask if the feature is live; nobody is sure.

**Root cause.** Unlaunched. Engineering completed the work; the team did not execute the launch. No comms plan, no internal alignment, no measurement plan tied to spec hypotheses.

**Fix.** Treat it as a re-launch. Audit against the playbook: positioning, internal alignment, customer comms, sales enablement, support readiness, measurement plan. Distribute the launch brief. Sequence comms. Re-measure at the four-week checkpoint.

**Prevention.** The launch brief is the artifact that prevents this. Without a brief, the launch defaults to engineering completion plus silence. With a brief, the launch has a calendar, owners, and measurement.

See: `internal-alignment-checklist.md`, `customer-comms-playbook.md`, `post-launch-measurement-framework.md`.

---

## 2. Sales is confused and selling it wrong

**Symptom.** Customers ask sales questions sales cannot answer. Reps over-promise capabilities the feature does not have. Customers churn because the feature was sold wrong.

**Root cause.** No sales enablement. Battlecard, demo, training were skipped or rushed. Reps are improvising in front of customers.

**Fix.** Pause the launch (pause public comms; let in-app and release notes continue). Run the sales enablement playbook in compressed form: write the battlecard, record the demo, hold the training. Resume public comms after sales is enabled.

**Prevention.** Sales enablement is mandatory for B2B Tier 1 and Tier 2 launches. Battlecard plus 30-minute training plus recorded demo. The investment is small; skipping it is the largest avoidable launch cost.

See: `sales-enablement-template.md`.

---

## 3. Support is overwhelmed

**Symptom.** Support ticket volume doubles or triples on launch day. Tickets pile up. Customer wait times balloon. Support reps escalate everything to the PM.

**Root cause.** No training, no FAQ, or both. Support is encountering the feature for the first time when customers ask about it. They cannot answer questions; they escalate; the queue grows.

**Fix.** Emergency FAQ. PM and support lead spend 4 hours documenting every question that has come in. FAQ updates push to support immediately. Re-train if needed (a short refresher).

**Prevention.** Support training one week before launch. FAQ written before launch, not during. Estimate support volume realistically; staff for elevated volume.

See: `support-readiness-checklist.md`.

---

## 4. We rolled out and immediately rolled back

**Symptom.** Big-bang deploy hit production. Within minutes, error rate was up. The team rolled back. Customers experienced a broken feature for 30 minutes; some saw error states.

**Root cause.** Wrong rollout strategy. All-at-once was used when gradual was the right pattern.

**Fix.** Audit the rollback. What was the bug; what would have caught it earlier in a gradual rollout. Pre-mortem the next launch.

**Prevention.** Default to gradual percentage rollout for most launches. Use all-at-once only when the marketing-coordinated launch makes it unavoidable, AND the team has high confidence in correctness, AND the blast radius is low.

See: `rollout-strategy-patterns.md`.

---

## 5. The blog post went out but the feature is broken

**Symptom.** Blog post auto-published at the announced time. Rollout had been paused two hours earlier due to an issue. Customers click through; 75 percent of them do not have the feature; they report "broken" feature that is actually a paused rollout.

**Root cause.** Comms not gated on rollout health. Auto-fire schedule executed regardless of rollout state.

**Fix.** Pull or update the blog post. Communicate transparently: "We hit an issue in our rollout; the feature is paused while we resolve. Your account will get access once we resume."

**Prevention.** Make external comms manually triggered, gated on health check. Auto-fire is convenient but brittle.

See: `customer-comms-playbook.md`.

---

## 6. Adoption was great in week 1, now it is flat

**Symptom.** The launch announcement drove a spike of users trying the feature. By week 4, adoption has dropped back to near-baseline. The team had declared victory in week 1.

**Root cause.** Declared victory on the launch spike. The metric reverted because the launch announcement was the only driver of usage; users tried the feature once but did not come back.

**Fix.** Re-evaluate as if the launch is unfinished. Diagnose: was it an awareness problem (users forgot the feature exists), a usability problem (users tried and bounced), a value problem (users tried and did not see value), a wrong-segment problem (the audience was wrong). Iterate based on the diagnosis.

**Prevention.** Declare success or failure on the stable post-launch trend, not the launch-week spike. Minimum measurement window is four weeks.

See: `post-launch-measurement-framework.md`.

---

## 7. We do not know if it worked

**Symptom.** Six months after launch, the team cannot answer "did feature X work?" Nobody measured. The feature is now maintenance debt.

**Root cause.** No measurement plan tied to spec hypotheses. The launch did not commit to specific metrics with specific decision rules.

**Fix.** Retroactive measurement. Pull the data; compare to a pre-launch baseline (if one exists); compute the lift. The retroactive measurement is less rigorous than a planned one but better than nothing.

**Prevention.** Every launch has a measurement plan. The plan is part of the launch brief. A launch without a measurement plan does not get scheduled.

See: `post-launch-measurement-framework.md`.

---

## 8. Customers say we did not tell them

**Symptom.** A customer reaches out asking why nobody told them about a feature that has been live for two months. The customer was on the email list; the email was sent; the customer missed it.

**Root cause.** Comms did not reach the right segments. Email went to active users only; inactive users were not notified. Or the email subject line was generic and customers archived without reading.

**Fix.** Re-send to the cohort that missed it. Use a different channel (in-app banner, account-manager outreach for top accounts). Improve the discoverability for new visitors (pricing page mention, feature-tour highlight).

**Prevention.** Channel-mix analysis. For each launch, plan which channels will reach which cohorts. Inactive users need a different reach plan than active users.

See: `customer-comms-playbook.md`.

---

## 9. Enterprise customers found out from their account manager three days late

**Symptom.** Enterprise customer hears about a launch from their account manager three days after public comms went out. The customer is annoyed; their AM is embarrassed; trust erodes.

**Root cause.** No high-touch tier in comms. Public comms hit before account managers had been briefed.

**Fix.** Apologize to the affected customer. Brief their AM immediately with the full context. Adjust process for the next launch.

**Prevention.** Sales-led briefing for top accounts before public comms. Account managers should know about the feature one to three days before customers do, with talking points for the customer conversation.

See: `customer-comms-playbook.md`, `sales-enablement-template.md`.

---

## 10. Metric moved but it was actually because of a different launch that week

**Symptom.** Outcome metric is up 8 percent in the four weeks post-launch. Team celebrates. Then someone notices a different launch happened the same week, and a price test concluded, and a marketing campaign ran. The 8 percent cannot be attributed to this specific feature launch.

**Root cause.** No isolation. Multiple changes hit production in the same window; effects are confounded; the team cannot tell which change drove which metric.

**Fix.** Run a follow-up isolated test. Roll back the feature for a cohort; measure the gap. If the gap is large, the feature was driving the metric. If the gap is small, other concurrent changes were the driver.

**Prevention.** Stagger launches. Major launches should not coincide with each other; at minimum two weeks of separation for measurement isolation. For experiments, use the warehouse-native experimentation framework to isolate.

See: `data-warehouse-experimentation` skill.

---

## 11. We launched the wrong feature

**Symptom.** The launch goes out. Customers respond with "this is great but it does not solve the problem we asked you to solve." The feature works; it just was not what customers expected.

**Root cause.** Positioning unclear. The customer expected something different from what shipped because the spec, the comms, or both implied a different scope.

**Fix.** Re-position. Re-write the comms to match what the feature actually does. Acknowledge the gap to customers who feel misled. Plan a follow-up that addresses the original ask.

**Prevention.** The positioning canvas plus anti-positioning section forces explicit definition of what the feature is and is not. Review the canvas with sales and customer success before launch; their pushback often catches the positioning gap.

See: `positioning-canvas.md`.

---

## 12. It worked but nobody knew about it internally

**Symptom.** The metric moved. Customer adoption was strong. The launch was a success. Six weeks later, sales is not pitching the feature, customer success is not using it as a save argument, and the executive team has forgotten about it.

**Root cause.** No sustained internal awareness. The launch hit; the team moved to the next thing; internal momentum did not carry.

**Fix.** Re-brief internal stakeholders at the four-week checkpoint. Share the metrics. Highlight customer use cases. Make the feature part of the next sales kickoff or company all-hands.

**Prevention.** Internal launch is not a one-time event. After the four-week measurement, revisit. Share the win story. Update the sales playbook. The launch is not over until the feature is part of the team's vocabulary for at least a quarter.

See: `internal-alignment-checklist.md`.

---

## The pattern across all twelve

Most launch failures share one root cause. The team treated the launch as a single event (the day the feature ships) rather than a multi-week discipline (the period when the feature lands).

The shipping vs releasing vs launching distinction names this. Shipping is a moment; releasing is a moment; launching is a discipline that spans the four to eight weeks before and after. Teams that invest in the discipline catch most failure modes early; teams that treat the launch as a moment hit failure modes late or never.

The fix at the meta level. Pre-launch checklist. Launch-day standup. Post-launch measurement at four-week and eight-week checkpoints. The discipline is the only thing that produces consistent launches across many features.
