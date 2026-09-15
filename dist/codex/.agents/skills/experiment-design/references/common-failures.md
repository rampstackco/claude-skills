# Common failures and fixes

Anti-patterns that produce confidently wrong shipping decisions, with the symptom you observe, the root cause, the fix that resolves it, and the prevention that stops it from recurring.

---

## 1. The vague hypothesis

**Symptom.** "We think the new pricing page will increase conversions." The team runs the test, the result is ambiguous, and a heated meeting follows about whether to ship.

**Root cause.** The hypothesis lacks magnitude and mechanism. When the result comes in, there is no pre-committed bar to compare against, so the decision becomes political.

**Fix.** Rewrite the hypothesis with the cause-effect-magnitude-mechanism format from [SKILL.md](../SKILL.md). Save it before launching.

**Prevention.** Make hypothesis review part of the experiment kickoff. A peer reads the hypothesis and confirms all four parts are present before the test launches.

---

## 2. The novelty effect ship

**Symptom.** Test ran for 5 days, lift looked great, the team shipped, and the lift disappeared in production within two weeks.

**Root cause.** Users notice new things and click them disproportionately during the novelty window. The early lift was novelty, not durable preference.

**Fix.** Re-test the change with at least a two-week test window. Most novelty effects fade in 7-10 days. If the lift survives 14 days, it is likely durable.

**Prevention.** Set minimum test duration of 14 days for any UI/UX change, regardless of how fast sample size hits. Document the rule and enforce it.

---

## 3. The post-hoc segment win

**Symptom.** Test was inconclusive overall, but "users from California who signed up via mobile on Tuesdays" had a huge lift. The team wants to ship to that segment.

**Root cause.** Multiple comparisons. With enough segments analyzed, one will hit "significance" by chance. The California-mobile-Tuesday segment is almost certainly noise.

**Fix.** Do not ship to the segment. Either ship to all (if guardrails hold), or kill, or re-test with the segment pre-registered as a hypothesis.

**Prevention.** Pre-register the segments to be analyzed. Limit to three to five segments per test, each with a real prior reason to differ from the population.

---

## 4. The peeking creep

**Symptom.** P-value drifted around 0.06 for the first week, then crept to 0.04 on day 12, the team called it significant and shipped.

**Root cause.** The platform did not use sequential testing. Daily peeking inflated the false positive rate. The "significance" on day 12 was a peeking artifact.

**Fix.** Either use a platform with sequential testing, or pre-commit to a single end-of-test analysis. If you peeked and the test is over, treat the result as inconclusive and consider rerunning.

**Prevention.** If your platform supports sequential testing (mSPRT, group sequential), enable it. If not, set up the test with calendar reminders for the analysis date, not before.

---

## 5. The guardrail violation overlook

**Symptom.** Primary metric (revenue) went up. Retention dropped. The team shipped because revenue was the headline metric.

**Root cause.** Guardrails were defined but not treated as binding. When the primary metric looked favorable, the team rationalized the guardrail violation as acceptable.

**Fix.** Do not ship. Investigate the retention drop. The change may be capturing short-term revenue at the cost of long-term value, which is a worse trade than no change at all.

**Prevention.** Pre-commit on the guardrail trade-off. Write down explicitly: "We will not ship if retention drops by more than X." If you cannot specify the bar in advance, you do not understand the trade-off well enough to test it.

---

## 6. The non-replicable result

**Symptom.** Test reported a 5 percent lift. The team shipped. A month later the same change tested with a holdout group shows no effect.

**Root cause.** Could be many things: original test was a false positive, platform bug, external event during the test window, contamination. Without investigation, you do not know which.

**Fix.** Stop, investigate, find the cause. Possible findings: the metric was computed differently in the test versus production; the test exposure was lower than reported; an unrelated change confounded the result. Do not "just rerun and hope."

**Prevention.** Schedule a post-launch holdout test for any change with a reported lift greater than 3 percent. Confirm the production behavior matches the test before declaring the win.

---

## 7. The campaign confound

**Symptom.** Test launched the same week as a major marketing campaign. Test reported a huge lift. The team shipped. The lift was the campaign's traffic mix, not the treatment.

**Root cause.** The campaign brought a different user mix into the test population: higher-intent visitors, different geographies, different device types. Treatment and control both saw the campaign traffic, but the campaign-driven users may have responded differently to the variants than the baseline population would.

**Fix.** Pause campaigns during sensitive tests, or stratify the analysis by acquisition source so campaign traffic is analyzed separately from baseline traffic.

**Prevention.** Coordinate with the marketing team before launching tests. Maintain a calendar of upcoming campaigns and avoid launching experiments on the same surfaces during major pushes.

---

## 8. The directional ship

**Symptom.** Test was inconclusive. Primary metric trended up but did not hit significance. The team shipped because "the trend was directional."

**Root cause.** Directional trend without significance is noise that happens to point in a flattering direction. Treating it as evidence is exactly the discipline failure that erodes experimentation rigor.

**Fix.** Do not ship based on directional trends. Either run a bigger test (more traffic, longer duration), kill, or accept inconclusive as the answer.

**Prevention.** Pre-commit to the decision rule. "Inconclusive" as a category requires acceptance, not creative reframing.

---

## 9. The interaction effect blind spot

**Symptom.** Five concurrent tests on the checkout flow. Each individually reported a small lift. Combined, total checkout conversion did not move.

**Root cause.** Interactions between concurrent tests. The lifts did not multiply or even sum. Some may have canceled out, some may have interfered with each other.

**Fix.** Roll back, run tests with mutex enforcement, or run them sequentially. Re-test the combination as a multivariate.

**Prevention.** Maintain an experiment registry per surface. Before launching a new test, check which others are running on the same surface and coordinate. Use mutex when interactions are likely.

---

## 10. The selection bias ship

**Symptom.** ARPU went up. The team shipped. After launch, MAU dropped because the lowest-revenue users churned.

**Root cause.** The treatment caused selection: lower-value users left, higher-value users stayed. ARPU went up arithmetically because the denominator shrank, not because anyone made more money.

**Fix.** Pair ARPU primary metrics with retention or MAU guardrails. Investigate the source of the lift before shipping.

**Prevention.** When the primary metric is a ratio, always pair with absolute count guardrails. ARPU plus revenue. Conversion rate plus conversion count. Engagement rate plus DAU.

---

## 11. The internal traffic contamination

**Symptom.** Test reported strong lift in the first week. Investigation showed half the test users were internal employees clicking around the new feature.

**Root cause.** Internal traffic was not excluded from the test population. Employees behave differently from real users.

**Fix.** Re-bucket the test excluding internal IPs and employee accounts. Re-analyze.

**Prevention.** Maintain an internal-traffic exclusion list at the platform level. Apply it to all experiments by default. Audit the user counts on test launch to confirm internal traffic is excluded.

---

## 12. The metric definition mismatch

**Symptom.** Test reported a 5 percent lift in "conversion." Production analytics reported a 0.5 percent lift. The team blamed the platform.

**Root cause.** The conversion event was defined differently in the test platform versus production analytics. Different conversion windows, different deduplication rules, different user-identity logic.

**Fix.** Reconcile the metric definitions before re-running. Document the canonical definition and confirm both systems produce matching numbers on a known historical period.

**Prevention.** Maintain a metric dictionary. Before adding a metric to an experimentation platform, document the canonical definition and validate against production analytics. Treat the metric definition as a versioned artifact.

---

## 13. The ratio metric variance error

**Symptom.** Test reported a "significant" lift in revenue per user with p equals 0.04. Production rollout produced no measurable change.

**Root cause.** The platform used a naive variance estimator on a ratio metric. Confidence interval was too narrow; the "significance" was an artifact of bad math.

**Fix.** Switch to a platform that uses a ratio-aware estimator (delta method, bootstrap). Re-run the test or confirm via holdout.

**Prevention.** Audit your platform's variance estimator. Ask the vendor what they use for ratio metrics. If the answer is "standard t-test on proportions" for anything other than simple binary conversion, plan a workaround.

---

## 14. The "we will fix it later" rollout

**Symptom.** Test was inconclusive but engineering had already deployed the change. Rolling back was hard. The team shipped because the cost of rollback was higher than the expected cost of shipping.

**Root cause.** The rollout was not gated on the experiment result. Engineering shipped to production before the test had concluded.

**Fix.** Roll back if possible. If not, accept the change is shipped and instrument production carefully to confirm whether it actually works.

**Prevention.** Gate rollouts behind experiment conclusions. Use feature flags so the change can be toggled off without a code revert. Coordinate engineering schedules with experiment timelines.

---

## 15. The retroactive hypothesis

**Symptom.** Test was set up to validate "the new homepage increases signups." Result showed signups flat but engagement up. The team rewrote the hypothesis as "the new homepage drives engagement" and shipped.

**Root cause.** Hypothesis was changed after the result was visible. This is p-hacking even if no statistical math was changed.

**Fix.** The original hypothesis was inconclusive on signups. Either kill, or run a new test with the engagement hypothesis pre-registered.

**Prevention.** Pre-commit the primary metric and stick with it. If the data suggests a different metric is more interesting, treat that as the hypothesis for the next test, not a rewrite of the current one.
