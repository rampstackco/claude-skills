# Common interpretation failures

Fifteen-plus failure patterns that produce confidently wrong shipping decisions. Each pattern is described as: name, symptom (what it looks like in the panel or the discussion), root cause (why it happens), fix (what to do this time), prevention (how to avoid it next time).

---

## Pattern 1: P-value worship

**Symptom.** "P equals 0.04, ship it." No discussion of CI width, magnitude, or guardrails.

**Root cause.** Treating statistical significance as a binary truth. The p-value answers one specific question (how surprising is this data under the null) and people use it to answer all questions.

**Fix.** Always pair the p-value with the CI on the lift and the guardrail status. A significant p-value with a wide CI that includes practically tiny effects is not a ship signal.

**Prevention.** Pre-commitment includes the MDE, not just the alpha. The decision rule should reference the lift magnitude relative to the MDE, not just the p-value.

---

## Pattern 2: Early stop on a peek

**Symptom.** Test ended on day 3 or day 5 because the result "looked great." Headline lift is 5% to 10%; later analysis shows the effect was much smaller.

**Root cause.** Standard p-values inflate under peeking. Early-test lifts are systematically larger than late-test lifts due to regression to the mean and novelty effects.

**Fix.** Re-run the test to the pre-committed end date. Treat the early result as suggestive only. If the platform supports always-valid p-values, those are peek-safe; otherwise, do not stop early.

**Prevention.** Pre-commit the analysis date at launch. If the platform offers sequential testing, enable it. If not, do not look at intermediate results.

---

## Pattern 3: Post-hoc segment mining

**Symptom.** "The new flow worked for power users on Android in the EU on weekends." The segment was discovered by slicing the data many ways looking for an effect.

**Root cause.** Multiple comparisons. With enough segments, some will show a "significant" effect purely by chance. The pattern is real for the test data; it does not replicate.

**Fix.** Treat the post-hoc segment finding as a hypothesis for a follow-up test, not as a ship signal. Pre-register the segment in the new test and run it cleanly.

**Prevention.** Pre-register segments at design time. Two or three is plenty; ten is overfitting waiting to happen. Treat any segment not in the pre-registration list as exploratory.

---

## Pattern 4: Launch dilution misread

**Symptom.** "Our experiment said +2%, but launch only delivered +0.5%. The experiment was wrong."

**Root cause.** The experiment lift applied to enrolled users in test conditions. Launch dilution from non-enrolled users, novelty fade, and interference effects routinely produce smaller production effects than test effects. The experiment was usually correct; the production measurement is correctly capturing the diluted effect.

**Fix.** Compare apples to apples: the launch effect on the same enrolled-user population, in the same conditions. If the launch effect on enrolled users matches the test, the experiment was right; the dashboard sees a smaller number because the dashboard includes everyone.

**Prevention.** Communicate experiment results in enrolled-user terms, not extrapolated to the full base. The blended-attribution trap is the source of most "experiment wrong" complaints.

---

## Pattern 5: Guardrail reframing

**Symptom.** "Revenue went up but the CI for retention straddled zero so we ignored it." A guardrail movement that was reframed as "no signal" rather than treated as binding.

**Root cause.** The guardrail was pre-committed but the team did not pre-commit a clear rule for "what counts as a guardrail violation." A wide CI on the guardrail leaves room for interpretation; the interpretation usually favors shipping.

**Fix.** If retention is a guardrail, the guardrail binds. "We did not see a clear signal" is not the same as "we have evidence of safety." A wide guardrail CI means the test was underpowered for the guardrail; the right answer is more sample, not "ship anyway."

**Prevention.** At pre-commitment, define guardrail rules as: "ship only if the CI on the guardrail clearly excludes a [X percent] degradation." Then apply the rule mechanically when results come in.

---

## Pattern 6: CUPED misinterpretation

**Symptom.** "We CUPED-adjusted away a real treatment effect. Let us report the unadjusted version." OR "The unadjusted lift is bigger; CUPED is hiding our win."

**Root cause.** Misunderstanding what CUPED does. CUPED reduces variance, not the point estimate. If the lift looks smaller after CUPED, the unadjusted lift was probably inflated by chance correlation with pre-experiment behavior.

**Fix.** Trust the CUPED-adjusted estimate. If the estimate is smaller and the CI is narrower, the CUPED estimate is closer to the true effect.

**Prevention.** Educate the team on what CUPED does before enabling it. The first time the unadjusted and adjusted numbers diverge, walk through why.

---

## Pattern 7: Opposite-segment shipping

**Symptom.** "Two segments showed opposite effects; we shipped to the better segment." Often without re-testing or without infrastructure to support segment-specific behavior.

**Root cause.** Post-hoc segment discovery (most common) or pre-registered segments where the targeting infrastructure does not exist. Either way, segment-only shipping is a significant commitment that requires more evidence than a single observation.

**Fix.** Treat the segment finding as a hypothesis for a follow-up test. Confirm the effect with an appropriately powered re-test. Build the targeting infrastructure with eyes open about ongoing maintenance cost.

**Prevention.** Pre-register segments. Build the targeting infrastructure separately, before any segment-specific shipping decision; do not let the decision force the infrastructure into existence under deadline pressure.

---

## Pattern 8: Directional ship

**Symptom.** "The result was technically inconclusive, but the trend was directional so we shipped."

**Root cause.** Inconclusive is hard to communicate; directional language sounds more decisive. The team substitutes the appearance of evidence for actual evidence.

**Fix.** Inconclusive is inconclusive. The directional pattern is wishful reading of noise. Do not ship; either run a bigger test or kill the hypothesis.

**Prevention.** Pre-commit decision rules that map each possible result to a ship-or-kill decision. The inconclusive case should map to "do not ship" by default. Discussions of "directional" outcomes are a sign that pre-commitment was incomplete or is being ignored.

---

## Pattern 9: Mid-test methodology switch

**Symptom.** Test was running with frequentist analysis; results were ambiguous; team switched to Bayesian (or vice versa) and the new view "shows we should ship."

**Root cause.** Different methodologies can produce different ship recommendations on the same data, particularly near the significance threshold. Switching mid-flight to find the more favorable interpretation is the Bayesian-frequentist version of p-hacking.

**Fix.** Stick with the methodology pre-committed at launch. If the result is ambiguous under the pre-committed method, that is the result.

**Prevention.** Pre-commit the methodology along with the metric and the alpha. Document the choice in the experiment configuration so the change is visible if anyone tries.

---

## Pattern 10: Ratio metric without delta method

**Symptom.** Conversion rate or revenue per user with a CI that looks suspiciously narrow. The result panel shows significance that does not replicate at launch.

**Root cause.** Naive variance estimation on ratio metrics produces incorrectly narrow CIs and inflated false positive rates. The platform did not use delta method, bootstrap, or another ratio-aware estimator.

**Fix.** Re-analyze with a ratio-aware estimator. If the platform does not support one, export raw data and compute correctly in a notebook.

**Prevention.** Verify your platform's variance estimator for ratio metrics during onboarding. If the answer is "standard t-test on proportions," consider migrating or implementing the correction yourself.

---

## Pattern 11: Marketplace interference undercount

**Symptom.** Marketplace experiment shows a small lift; team kills the test as not worth the effort. Later, a feature implemented for other reasons shows a much larger effect on the same metric.

**Root cause.** SUTVA violation. In two-sided marketplaces, treatment users compete with control users for the same supply; the lift "leaks" into control. The standard A/B test undercounts the true effect, often by a factor of 2x to 3x.

**Fix.** Re-run as cluster randomized (whole markets to treatment or control) or switchback. Compare the results to the user-randomized version to estimate the interference factor.

**Prevention.** Identify SUTVA violation risk at design time. For marketplace, social, and supply-constrained features, default to cluster randomization or switchback unless interference is demonstrably negligible.

---

## Pattern 12: Definition drift between systems

**Symptom.** Experiment result shows +X% on conversion. Dashboard shows the launch having no effect on conversion. Investigation reveals the two systems define "conversion" differently.

**Root cause.** Metric definitions live in different places (experiment platform, BI dashboard, data warehouse) and drift over time. Each definition individually makes sense; the comparison is meaningless.

**Fix.** Reconcile the definitions before the next post-launch report. Pick one canonical definition and align both systems.

**Prevention.** Centralize metric definitions (semantic layer, dbt model, shared SQL library). Audit all "the same metric" usages quarterly.

---

## Pattern 13: Confounded test window

**Symptom.** Test ran during a marketing campaign, a product launch, an outage, or a holiday. The result is reported without acknowledging the external event.

**Root cause.** Random assignment usually handles external events (treatment and control are equally affected). But if the external event affects the metric definition (campaign brings different user mix), the populations stop being comparable.

**Fix.** Stratify the analysis by the relevant covariate (acquisition source for campaigns, date for outages). If the stratified analysis differs meaningfully from the pooled analysis, report the stratified version and explain.

**Prevention.** Maintain a calendar of marketing campaigns, product launches, and known external events. Avoid scheduling sensitive tests during these windows. If unavoidable, plan the stratification at design time.

---

## Pattern 14: Long-tail metric overweighted by outliers

**Symptom.** Revenue per user shows a large lift driven by a few high-value users. The lift is "significant" but unstable across re-samples.

**Root cause.** Long-tailed distributions (revenue, session length, content engagement) have a few users contributing disproportionately. Random assignment of those users to treatment or control can drive large apparent effects that do not represent the underlying treatment effect.

**Fix.** Winsorize the metric (cap extreme values at the 99th percentile, for example) and re-analyze. If the winsorized result is materially different from the raw result, the outliers were driving the effect.

**Prevention.** Pre-commit to a winsorization threshold for long-tailed metrics. Apply the same threshold across treatment and control. Document the choice.

---

## Pattern 15: Significance from sample size, not effect

**Symptom.** "P equals 0.001, very significant." CI on the lift is [+0.1%, +0.3%]. Magnitude is tiny.

**Root cause.** With enough sample, even tiny effects produce small p-values. Significance is not the same as magnitude. Shipping a 0.2% lift because "p was tiny" is a misuse of the framework.

**Fix.** Read the CI alongside the p-value. If the practical lift is too small to matter, do not ship regardless of significance.

**Prevention.** Pre-commit to an MDE (minimum detectable effect) as part of the design. If the observed lift is below the MDE, the test was overpowered and the result, while real, is not actionable.

---

## Pattern 16: Overcorrection panic

**Symptom.** Result shows a clean lift on the primary metric. Team adds five new metrics post-hoc and applies Bonferroni correction across all of them. Now the primary metric is "not significant."

**Root cause.** Multiple testing corrections apply to pre-registered comparisons, not to post-hoc analyses meant to "stress-test" the result. Adding metrics after seeing the result and then correcting is statistically incoherent.

**Fix.** Apply corrections only to the pre-registered comparison set. Post-hoc metrics are exploratory and should be reported as such, without claiming to update the primary inference.

**Prevention.** Pre-register the metric set at design time. Treat any metric not on the list as exploratory.

---

## The pattern behind the patterns

Most of these failures share a common shape: the team had a hypothesis they wanted to confirm, the result was less clean than hoped, and the team applied an analytical knob (slice, switch methodology, drop outliers, reframe the guardrail, peek early) to make the result look cleaner. Each individual move feels like a small judgment call. Cumulatively they destroy the integrity of the analysis.

The defense against this pattern is pre-commitment. The defense against pre-commitment being weakened over time is documenting the pre-commitment somewhere immutable (PR description, signed Slack message, pinned ticket) and applying it mechanically when results come in. The pre-commitment is not the team's enemy; it is the team's protection from its own future motivated reasoning.
