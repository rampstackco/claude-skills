# Common pitfalls

Eleven failure patterns that recur in warehouse-native experimentation. For each: name, symptom, root cause, fix, prevention.

---

## 1. Exposure log fires at page load

**Symptom.** The experiment shows a 1 percent lift; the team expected 10 percent. The lift is real but diluted because most exposed users never saw the variant.

**Root cause.** Exposure fires at page load (or session start) regardless of whether the user reaches the variant-specific code path. The control group includes users who never saw the variant; the treatment group does too.

**Fix.** Move exposure firing to the moment the variant-specific UI renders or the variant-specific code path executes. Re-run the experiment with corrected logging.

**Prevention.** Document the exposure-firing rule in the experiment record. Code review the implementation. Check the exposure-to-metric ratio (if exposure count is much higher than expected metric count, exposure is firing too broadly).

---

## 2. Lift in control, not treatment

**Symptom.** The control group has a higher mean than the treatment group. The team is confused because the variant-specific changes should have increased the metric.

**Root cause.** Assignment hash collision or salt reuse with a prior experiment. Users in control of the new experiment are correlated with users in treatment of an old experiment that also affected the metric.

**Fix.** Audit the salt. Use a unique salt per experiment. Re-run with corrected assignment.

**Prevention.** Salt naming convention with version suffix. Code review for new experiments. Run a chi-squared test of independence between the new experiment's assignment and recent prior experiments' assignments before launching.

---

## 3. P-value is 0.04, we are shipping

**Symptom.** The primary metric p-value is 0.04. The team declares victory and ships. Three months later the metric in production has not moved.

**Root cause.** Some combination of underpowered experiment, multiple comparisons without correction, and peeking. Each of these inflates the false-positive rate; together they make a 0.04 p-value uninformative.

**Fix.** Re-run with a pre-registered sample size, single primary metric, no peeking. If the lift is real, the second experiment will confirm it. If not, the first result was a false positive.

**Prevention.** Pre-register the sample size, the primary metric, and the analysis method. Do not peek. Apply Bonferroni or BH correction across secondary metrics. Treat 0.04 with much more skepticism than 0.001.

---

## 4. Experiment shows 30 percent lift

**Symptom.** The treatment shows a 30 percent lift on the primary metric. The team is excited.

**Root cause.** Almost certainly a bug. Effects that big rarely exist outside truly novel features. Common bugs: exposure log fires only for treatment users (control is missing); metric model has a join error that double-counts treatment events; assignment is non-random and treatment is over-represented in heavy users.

**Fix.** Audit the exposure log balance, the assignment ratio, and the metric model. Compare metric values to the historical baseline; if the treatment metric is higher than the all-users historical metric, something is wrong.

**Prevention.** Skepticism about large effects. Run an SRM check before any analysis. Compare exposed-treatment metric to the historical baseline as a sanity check.

---

## 5. Treatment users are different (sample ratio mismatch)

**Symptom.** The exposure log shows 52,000 control users and 48,000 treatment users for a planned 50/50 split. The chi-squared test rejects the null at p < 0.001.

**Root cause.** Assignment is not balanced. Possible causes: hash function bug, biased exposure logging, instrumentation that fires for one variant but not the other, eligibility check that runs differently across variants.

**Fix.** Do not analyze the experiment. Find and fix the assignment bug. Restart.

**Prevention.** Run the SRM check at the top of every analysis notebook. Abort with a clear error message if SRM is detected. Code review the exposure logging for both variants.

---

## 6. Cannot reproduce yesterday's number

**Symptom.** Yesterday's analysis showed 5.2 percent lift; today's shows 4.8 percent. Same query, same data, same notebook. The team cannot tell which is "the" answer.

**Root cause.** Non-deterministic queries. Window functions without explicit `ORDER BY` produce different results on different runs. Sampling without a seed produces different samples. Floating-point aggregations on large datasets produce slight numeric differences depending on the order of summation.

**Fix.** Make queries deterministic. Add explicit `ORDER BY` to window functions. Set a seed for any sampling. For floating-point precision, sum integers (cents) instead of floats; convert to dollars only at display time.

**Prevention.** Code review for non-determinism. Save the query plan or the result set; compare across runs to detect drift early.

---

## 7. Custom metric definition disagrees with board metric

**Symptom.** The experiment says revenue lifted 5 percent; the board's revenue dashboard shows revenue flat. The team cannot tell which is right.

**Root cause.** Two different SQL queries computing "revenue" with subtly different rules. The experiment query may include or exclude refunds, internal users, test orders, or specific time windows in different ways than the board.

**Fix.** Align via shared dbt models. The board's revenue dashboard and the experiment's revenue metric reference the same `fct_orders` model with the same filters.

**Prevention.** Schema discipline. Every metric used in an experiment is also used somewhere in the board or weekly review. Drift between the two is a code smell that should be caught at code review.

---

## 8. We never finished the experiment

**Symptom.** The experiment has been running for 8 weeks. The team has looked at the dashboard three times. Each time the result was inconclusive. The team keeps running it hoping for a clear answer.

**Root cause.** No pre-registered stop criteria. The experiment was launched without a clear "we will stop when X" rule. The team is implicitly peeking and refusing to call it.

**Fix.** Set a stop date and honor it. Analyze once on the stop date; report the result (which may be inconclusive). Document the inconclusive result and the design improvements needed for the next attempt.

**Prevention.** Pre-register the sample size, the stop date, and the decision rule. Honor them.

---

## 9. iOS users converted 3x in treatment

**Symptom.** The aggregate treatment lift is small (1 percent), but the iOS segment shows a 3x lift. The team wants to ship the variant for iOS specifically.

**Root cause.** Three possibilities. (a) Real segment effect: iOS users genuinely prefer the variant. (b) Instrumentation bug: iOS metric tracking differs from the rest. (c) Multiple comparisons: among many segments, one shows a large effect by chance.

**Fix.** Investigate. Compare iOS metric tracking to other platforms (is the same event firing the same way?). Check the iOS sample size (if small, the 3x is high variance). Re-run the experiment with iOS as the primary segment if the team genuinely wants iOS-specific results.

**Prevention.** Pre-register segments of interest. Apply multiple-comparisons correction across segments. Treat unexpected segment effects as hypotheses to confirm in a follow-up experiment, not as ship signals.

---

## 10. Worked on phase 1, broke on phase 2

**Symptom.** Phase 1 of a staged rollout showed a clear positive lift. Phase 2 (broader audience) shows a much smaller or negative lift. The team is confused.

**Root cause.** Simpson's paradox from cohort mix shift. Phase 1's audience is enriched in a segment where the treatment works well; phase 2 includes more of a segment where the treatment works poorly. The aggregate result reverses.

**Fix.** Decompose by segment. The phase 2 result is the truer estimate (broader audience), but the phase 1 result tells you which segments respond. Consider a segment-specific rollout if the segment-level economics support it.

**Prevention.** Run the experiment on the full target audience from the start, not on a phase-1 sub-audience. If staged rollout is operationally required, plan for the cohort mix shift in the analysis.

---

## 11. Statistical significance but tiny effect

**Symptom.** The p-value is 0.001. The lift is 0.3 percent. The experiment is statistically significant but the team is unsure whether to ship.

**Root cause.** Large sample inflated the test's power. The test detects effects much smaller than the team's practical significance threshold.

**Fix.** Apply the practical-significance check. If the team's threshold is "ship at 1 percent or larger," 0.3 percent does not meet the bar regardless of the p-value. Document the result; do not ship.

**Prevention.** Pre-register the practical-significance threshold (the MDE) at experiment design time. Treat statistical significance below the MDE as inconclusive, not as a ship signal.

---

## The pattern across all eleven

Most warehouse-native experimentation failures share one root cause: the team did not pre-register enough discipline before the experiment started. Pre-registered sample size prevents underpowered analysis. Pre-registered exposure rule prevents the delayed-exposure trap. Pre-registered primary metric prevents multiple-comparisons fishing. Pre-registered stop criteria prevent the experiment-runs-forever pattern.

The fix at the meta level. Treat each experiment as a contract. Before launching, write down the assignment unit, the salt, the exposure rule, the primary metric, the secondary metrics with multiple-comparisons correction, the sample size, the stop criteria, the practical-significance threshold. The contract is reviewed at launch. Deviations from the contract during the experiment require explicit re-registration. The discipline is the only thing that scales as the team runs more experiments.
