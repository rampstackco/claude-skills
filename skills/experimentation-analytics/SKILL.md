---
name: experimentation-analytics
description: How to read experiment results without fooling yourself. Confidence intervals, p-values, multiple testing, sequential testing, CUPED, heterogeneous treatment effects, ratio metrics, network effects, dashboard reconciliation, and the interpretation failures that produce confidently wrong shipping decisions.
category: product
catalog_summary: "Read result panels without fooling yourself: confidence intervals, p-values, multiple testing, sequential testing, CUPED, ratio metrics, network effects, dashboard reconciliation"
display_order: 6
---

# Experimentation Analytics

A data-team-mentor's playbook for interpreting experiment results without fooling yourself.

The result panel is the moment-of-truth for an experiment. The numbers on it determine whether you ship, kill, or iterate. They also expose every shortcut taken in the design phase: an underpowered test produces wide confidence intervals; a peeked test produces a too-narrow p-value; a ratio metric without delta-method correction produces overconfident lift estimates. Most ship-the-wrong-thing decisions trace back to misreading the result panel.

This skill is the discipline that prevents misreading. It assumes the experiment was designed well (see the `experiment-design` skill). It assumes the platform's results panel is technically correct (most modern platforms are; some older ones are not). It assumes you can read a number off a screen. The hard part is knowing what each number actually means and what it does not, and that is what is here.

When to use this skill: any time you are reading an experiment result panel and about to make a ship, kill, or iterate decision.

---

## What this skill is for

This skill covers result interpretation, the statistical concepts that make the numbers trustworthy, and the dashboard reconciliation work that prevents executive-level confusion when the experiment number does not match the BI number. The audience is product managers and data analysts who read experiment results together and need a shared vocabulary that does not paper over the dangerous parts of statistics.

Companion skills cover the adjacent territory. The `experiment-design` skill covers pre-experiment thinking: hypothesis, sample size, MDE, segments, what NOT to test. Read it before designing the test; read this skill when reading the result. The `feature-flagging` skill covers the operational mechanics of flag management, environment promotion, and stale-flag cleanup. Together the three skills span the experimentation lifecycle from intent through interpretation. For platform-specific MCP commands, consult the chosen platform's docs; Statsig, PostHog, Optimizely, GrowthBook, Eppo, Amplitude, and Kameleoon all expose rich analytics surfaces that this skill informs how to read.

---

## The result panel: what every modern platform should expose

A result panel that omits any of the following is a black box. Treat results from black-box platforms with extra skepticism, and consider exporting raw assignment and event data into a notebook where you can compute the missing pieces yourself.

What a competent platform exposes:

- Variants and traffic allocation (e.g., 50/50, 33/33/33). Allocation drift across the test window indicates assignment bugs.
- Per-variant primary metric: point estimate, confidence interval (or credible interval for Bayesian), sample size at the variant level.
- Lift: variant minus control, expressed as both absolute change and relative percent. Both numbers matter; relative is intuitive, absolute is what shows up in revenue calculations.
- Statistical significance: p-value (frequentist) or probability of being best (Bayesian). The methodology should be labeled clearly so you know which interpretation rules apply.
- Variance reduction technique applied: CUPED, post-stratification, regression adjustment. If the platform applies these silently, ask which.
- Guardrail metric statuses: each guardrail labeled green, amber, or red against its tolerance. The tolerance was set at design time; the panel just enforces it.
- Per-segment results for pre-registered segments only. Post-hoc segment slicers are tempting and dangerous.
- Test status: running, ended, decision filed.
- A time series of the lift across the test window. This is where novelty effects, primacy effects, and assignment bugs become visible.

If you are looking at a result panel that hides any of these, the first move is to surface them, not to ship.

---

## Confidence intervals: the most important number

The single most important number on the result panel is the confidence interval (CI) on the lift. More important than the point estimate. More important than the p-value. The CI tells you what you actually know.

What a 95% CI of [+2%, +6%] means: under repeated sampling, the true effect would fall in this range 95% of the time. The true effect is most likely somewhere near the middle, but the extremes are entirely consistent with the data.

What it does not mean: it does not literally mean "there is a 95% chance the true effect is between +2% and +6%." That is the Bayesian credible interval, which often gives similar numerical answers but is conceptually different. PMs can usually live with the loose intuition; analysts should know the precise version when defending a number to a skeptic.

The width of the CI matters more than the center for most ship decisions. A wide CI means you do not know much yet. A narrow CI means you know with precision. The point estimate is your best guess; the width is your humility.

Practical decision rules, in order of importance:

1. If the CI includes zero AND a meaningful positive number (say [-1%, +5%]), you do not have enough data to ship. Period. The point estimate may look favorable, but the data is consistent with no effect and consistent with a meaningful win. You cannot tell which.
2. If the CI is all-positive (lower bound greater than zero, e.g., [+1%, +4%]), there is a real effect. Now evaluate magnitude: is the lower bound large enough to be worth the implementation cost?
3. If the CI is all-negative (upper bound less than zero, e.g., [-5%, -1%]), there is real harm. Kill the test.
4. If the CI straddles zero but is narrow (e.g., [-0.5%, +0.5%]), this is a real null result. The effect is small enough to call essentially zero. Useful information; do not ship the change for "lift" reasons (you found none) but do not panic about harm either.
5. If the CI straddles zero and is wide (e.g., [-5%, +8%]), the test is inconclusive. The data is consistent with a moderate win, no effect, or a moderate loss. Run longer, run bigger, or accept that the question cannot be answered at the available traffic.

For a worked-example cheatsheet, see [`references/confidence-interval-cheatsheet.md`](references/confidence-interval-cheatsheet.md).

---

## P-values: what they mean and what they do not

The p-value is the probability of observing the lift you saw (or a larger one) IF the true effect were zero. A p-value of 0.04 means: under the null hypothesis of no effect, you would see this much lift purely by chance about 4% of the time.

What the p-value does not mean, despite frequent abuse:

- It does not mean "there is a 96% chance the treatment works." That sentence has no defensible interpretation; the p-value is computed under the assumption that the treatment does NOT work, so it cannot tell you the probability that it does.
- It does not mean "the effect is large." A tiny effect tested against a huge sample can produce a vanishingly small p-value. The p-value is about the strength of evidence against the null, not the size of the effect.
- It does not mean "the result will replicate." A p-value of 0.04 is associated with replication rates well below 50% in most published research; statistical significance is not reproducibility.

The 0.05 cutoff is convention, not law. If you pre-committed to alpha equals 0.05, follow it; the discipline of pre-commitment is more valuable than the specific threshold. If you did not pre-commit, p equals 0.06 is not categorically different from p equals 0.04, and treating it as such is theater.

Always read the CI alongside the p-value. The p-value tells you about the null hypothesis; the CI tells you about the magnitude. Both matter; neither is sufficient alone. A p-value of 0.001 with a CI of [+0.1%, +0.3%] is a real but practically tiny effect; a p-value of 0.08 with a CI of [-1%, +12%] is a noisy estimate that could be huge or zero. The former is technically significant and not worth shipping; the latter is technically not significant and you might still want to dig deeper.

The peeking problem applies to p-values directly. Standard p-values assume one analysis at the end of the test. Multiple analyses inflate the false positive rate. Modern platforms with sequential testing report "always-valid" or "anytime-valid" p-values that survive peeking; older platforms do not. Know which you are looking at. See [`references/p-value-interpretation-guide.md`](references/p-value-interpretation-guide.md) for deeper coverage.

---

## Multiple testing corrections

The problem in one sentence: with twenty independent comparisons at alpha equals 0.05, you expect one false positive purely by chance. With fifty comparisons, two or three. With a hundred, five.

Where multiple testing creeps in unintentionally:

- Multiple variants: A vs B vs C vs D is three pairwise comparisons against control, not one.
- Multiple metrics: tracking primary plus six guardrails plus three secondary metrics is ten chances to find significance somewhere.
- Multiple segments: ten segments times three metrics is thirty chances.
- Multiple time windows: looking at week 1, week 2, week 3, and the full test is four chances per metric per segment.

Two correction methods you should know:

- Bonferroni correction. Divide alpha by the number of comparisons. Conservative; controls the family-wise error rate (the probability of even one false positive across the family of tests). Use when false positives are catastrophic.
- Benjamini-Hochberg (BH) correction. Less conservative; controls the false discovery rate (the expected proportion of false positives among the things called significant). Better for exploratory analysis.

Most modern platforms support these natively as a configuration option. Configure them, or know which the platform applies by default. Some platforms apply corrections silently to the displayed p-values; others report uncorrected numbers and expect you to do the math.

The PM-friendly heuristic: pre-register your primary metric and primary segment. Treat everything else as exploratory. Findings in non-primary metrics or non-primary segments require larger effects, replication in a follow-up test, or both before they justify shipping. The discipline of designating primary up front protects you from the multiple-testing trap better than any correction formula.

---

## Sequential testing math

The peeking problem revisited from the analytics side. Classical t-tests, z-tests, and proportion tests assume one analysis at the end of a test. If you analyze the data five times during the test and stop the moment you see significance, your false positive rate is much higher than the nominal 5%. With daily peeking on a four-week test, false positive rate can climb above 30%.

Sequential testing methods adjust the math to allow continuous monitoring without inflating false positives. The names you will encounter:

- mSPRT (mixture sequential probability ratio test). Produces "always-valid" p-values: you can look any time, and the false positive rate stays at the nominal alpha. Common in modern platforms.
- Group sequential designs. Plan a fixed set of interim analyses (say, three) with adjusted significance thresholds at each. Less flexible than mSPRT but well-understood.
- Anytime-valid confidence intervals. The CI version of always-valid p-values. Wider than fixed-horizon CIs by design; the cost of peek-safety is some statistical efficiency.

Modern platforms with sequential testing built in: Statsig (always-valid by default), Eppo (sequential CIs as a configuration), parts of PostHog (depending on the experiment type), GrowthBook (mSPRT supported). If your panel says "always-valid p-value" or "anytime-valid CI," that is sequential. If it says "p-value" with no qualifier, it is probably fixed-horizon and peeking inflates false positives.

If your platform does not support sequential testing, the discipline is: pre-commit to a single analysis date at launch, do not peek, and if you must peek, do not make decisions based on the peek. Save the decision-making for the pre-committed date. This is hard. Sequential testing makes it easier.

The trade-off: sequential tests have wider CIs and less aggressive p-values than fixed-horizon tests at the same sample size. The cost is real but usually worth it for PM contexts where the discipline of not peeking is impractical.

---

## CUPED variance reduction

CUPED (Controlled-experiment Using Pre-Experiment Data) uses pre-experiment behavior of the same users to subtract out their baseline, leaving a cleaner signal of the treatment effect. The result is the same point estimate with a much narrower confidence interval, often 30% to 50% narrower, which is equivalent to roughly doubling your effective sample size for free.

When CUPED helps:

- Metrics with high pre-experiment baseline variance: revenue per user, sessions per user, engagement minutes, content consumption.
- Tests where users have meaningful history (logged-in users, users from before a certain date).
- Long-running products where pre-experiment behavior strongly predicts in-experiment behavior.

When CUPED does not help:

- Brand-new users with no pre-experiment data.
- One-time conversion metrics with no pre-experiment baseline (a user either signs up or does not; there is nothing to subtract).
- Tests where pre-experiment behavior is essentially uncorrelated with the metric being moved.

How to read CUPED-adjusted results: the point estimate is roughly the same as the unadjusted estimate; the CI is narrower. If a result switched from "significant with CUPED" to "not significant without CUPED," that is normal and the CUPED-adjusted version is the more powerful test. If a result went the other way (significant without CUPED, not significant with), the unadjusted result was probably noise that CUPED correctly removed.

A common confusion: "CUPED made our lift smaller, so we should ship the unadjusted version." This is wrong. CUPED reduces variance, not point estimates. If the lift looks smaller after CUPED, the unadjusted lift was probably inflated by chance correlation with pre-experiment behavior; the CUPED estimate is closer to the true effect. Trust the adjusted version.

Platform support: Statsig, Eppo, GrowthBook, parts of PostHog, Amplitude (Experiment product). Optimizely has equivalent variance reduction. If your platform offers CUPED, turn it on for any metric where pre-experiment data exists.

For deeper coverage of CUPED, the delta method, and other statistical methods, see [`references/statistical-method-reference.md`](references/statistical-method-reference.md).

---

## Heterogeneous treatment effects (HTE) and segments

A heterogeneous treatment effect is when the treatment works differently for different segments. New users see +5%, power users see -2%, average is +1%. This is common, often interesting, and easy to over-read.

Why HTE is tempting: "let us just ship to new users." Why it is dangerous: post-hoc segment discovery is often noise; targeting infrastructure costs are real; UI complexity from per-segment behavior compounds over time.

The right way to handle HTE:

- Pre-register the segments you care about before launching. Two or three is plenty; ten is overfitting waiting to happen.
- If a pre-registered segment shows a meaningfully different effect, treat it as evidence worth following up. Not as a green light to ship to that segment alone.
- Before shipping segment-only behavior, ask: is the segment large enough to matter, is the effect large enough to justify the targeting work, and can we build the targeting cleanly in production?
- If the segment was discovered post-hoc by slicing the data many ways, treat the finding as a hypothesis for a follow-up test. Do not ship based on one observation.

HTE versus simple averaging: when segments have meaningfully different effects, the average underrepresents both. A treatment that is +10% for half the population and -5% for the other half averages to +2.5%, which understates the win for half and ignores the loss for the other. The average is still the right number for "ship to everyone" decisions; per-segment numbers are the right inputs for "should we invest in segment-specific targeting" decisions.

Practical heuristic: if pre-registered segments show meaningfully different effects, write a follow-up hypothesis. Run a follow-up test that confirms the segment behavior with appropriate power. Then decide on segment-specific shipping. The cost of the follow-up test is much smaller than the cost of shipping segment-targeted behavior that does not actually work.

---

## Ratio metrics and the delta method

Most "rate" metrics are ratios. Conversion rate equals conversions divided by users. Click-through rate equals clicks divided by impressions. Revenue per user equals revenue divided by users. Average order value equals revenue divided by orders.

Why this matters for analytics: standard variance estimation for sums does not apply directly to ratios. Naive variance estimation on ratios produces incorrectly narrow confidence intervals and inflated false positive rates. You ship things that look significant but are not, because the math under the hood was wrong.

Two correct approaches:

- Delta method. A calculus-based correction (Taylor expansion linearization) that produces correct CIs and p-values for ratio metrics. Fast, well-understood, what most modern platforms use.
- Bootstrap. A simulation-based alternative: resample users with replacement many times, compute the ratio each time, and read off the empirical distribution. Distribution-free and intuitive; slower than delta method.

How to verify your platform: ask "what variance estimator do you use for ratio metrics?" If the answer is "standard t-test on proportions," that is wrong for any ratio that is not a simple binary conversion (one row per user, converted yes or no). If the answer is "delta method," "linearization," or "bootstrap," correct.

Most modern platforms (Statsig, Eppo, PostHog, Optimizely, GrowthBook) handle this correctly. Older or homegrown platforms often do not. The risk is silent: the panel shows confidence intervals that look reasonable but are too narrow, and you ship changes that do not produce the claimed effect.

Worked example. Revenue per user is a ratio: total revenue divided by total users. Suppose treatment shows a 5% lift with a CI that excludes zero under the wrong (naive) variance estimator. Under the correct delta-method estimator, the same point estimate has a CI that includes zero. The wrong math says "significant, ship." The correct math says "inconclusive, run longer or accept noise." Shipping based on the wrong math means shipping changes that do not produce the claimed effect in production, then puzzling over why the launch did not move the dashboard.

---

## Bayesian vs frequentist results panels

Frequentist panels (most older platforms, parts of most modern ones) show p-values, confidence intervals, and "statistically significant" labels. Bayesian panels (Eppo by default, Statsig as an option, parts of PostHog) show probability of being best, credible intervals, and posterior distributions.

For most PM contexts, both approaches produce similar ship-or-kill decisions when the experiment was designed correctly. The vocabulary differs; the underlying judgment is similar.

Bayesian advantages:

- Natural multi-variant comparison: "variant B has 87% probability of being best" reads more naturally than the equivalent Bonferroni-corrected p-value soup.
- Peek-safe by construction: posterior probabilities are valid at any time without sequential corrections.
- More intuitive for stakeholders unfamiliar with hypothesis testing.
- Allows informative priors when you have prior knowledge (rare in practice for shipping decisions).

Frequentist advantages:

- Better-understood: most analytics teams have stronger frequentist training.
- Clearer pre-registration semantics: "alpha equals 0.05, MDE equals 5%, decision rule X" is unambiguous.
- Longer track record in regulated contexts.

Mixing them within a single experiment is fine. Most platforms (Eppo, Statsig) let you toggle. Pick one per experiment and stick with it; do not switch mid-flight to chase a more favorable interpretation. That is the Bayesian-frequentist version of p-hacking and corrodes the discipline.

---

## Network effects and SUTVA violation

SUTVA (Stable Unit Treatment Value Assumption) is the technical name for "one user's treatment does not affect another user's outcome." When SUTVA holds, standard A/B test math works. When it is violated, the math systematically understates or overstates the true effect.

When SUTVA is violated:

- Two-sided marketplaces. Changes to buyers shift seller behavior, which affects control buyers competing for the same supply. Treatment buyers' actions leak into the control group's experience.
- Social products. A treatment user's changed behavior affects the experience of users they interact with, regardless of which group those friends are in.
- Supply-constrained features. When supply is limited, treatment users compete with control users for the same scarce resource, and the test cannot cleanly separate treatment effect from substitution.
- Notification systems. A treatment that increases notification volume changes user behavior across the whole platform, not just in the treatment cell.

The "interference dampens lift" pattern is the most common version. In marketplace experiments, if your treatment looks small, the true effect (in the absence of interference) may be 2x to 3x larger than what the standard A/B test reports. Killing a winning test because the leaked-into-control lift looked small is a common mistake.

Detection methods:

- Switchback experiments. Toggle the entire population between treatment and control across time windows (week 1 treatment, week 2 control, etc.). Eliminates cross-user interference within each window; requires careful temporal modeling.
- Cluster randomization. Assign whole units (cities, markets, friend groups) rather than individual users. Eliminates within-cluster interference at the cost of effective sample size.
- Geographic experiments. Launch in some regions, hold others. Slow and expensive but interference-clean.

When in doubt about whether interference is present, run a small cluster-randomized version as a check. If the cluster-randomized lift is much larger than the user-randomized lift, you have evidence of interference and should rerun the main test as cluster-randomized.

---

## Dashboard metric vs experiment metric reconciliation

The scenario: your business intelligence dashboard shows revenue grew 8% last week. Your experiment platform shows the treatment lifted revenue 2%. How can both be true?

Likely answers, ranked by frequency:

- Different denominators. The dashboard shows all users; the experiment shows just enrolled users. Most experiments enroll a subset; the lift only applies to that subset.
- Different time windows. The dashboard is rolling 7 days; the experiment is fixed start to end. The two windows can move independently.
- External effects. Marketing campaigns, seasonality, competitor activity, news cycles. The experiment correctly excludes these by random assignment; the dashboard reflects them.
- Selection effects. Who gets enrolled in the experiment matters. New users only? Logged-in users only? Users who passed a feature flag check? Each filter changes the population the lift applies to.
- Different metric definitions. "Revenue" might be gross in one place and net of refunds in another. "Conversions" might count differently across systems.

Reconciliation discipline: never report experiment results as "the feature drove $X in revenue this week." Always report as "the feature lifted enrolled-user revenue Y% during the test period." The first phrasing implies a company-wide impact that the experiment cannot measure; the second phrasing is precise about what the experiment actually showed.

The "blended attribution" trap is the most common reconciliation failure. PM takes the experiment lift (say +2% revenue per user) and multiplies by the total user base for a company-wide impact estimate ("$10M in incremental revenue"). This is wrong twice over. The lift only applies to enrolled users (typically 10% to 50% of the base). Even within the enrolled group, the lift was measured during the test conditions; long-term and at full scale, the effect can be different. The right phrasing is "during the four-week test, enrolled users (about 30% of the active base) showed a 2% revenue-per-user lift relative to control." Then leadership can do the careful arithmetic of how that translates at full launch.

For deeper reconciliation patterns and stakeholder-facing language, see [`references/dashboard-vs-experiment-reconciliation.md`](references/dashboard-vs-experiment-reconciliation.md).

---

## Long-term effect estimation

Most A/B tests run for two to four weeks. Many feature decisions need a thirty- to ninety-day understanding because behavior changes over longer windows: novelty fades, primacy fades, retention impacts emerge, network effects compound.

Three patterns for long-term measurement:

- Holdout groups. Keep a percentage of users (often 5% to 10%) on the control treatment for thirty or more days post-launch. Compare their long-term behavior to the launched-to users. The comparison measures the long-term effect cleanly because the holdout was randomized at the same time as the original test.
- Geo experiments. Launch the change in some markets and hold others. Measure long-term differences across market pairs. Slow, expensive, and the markets need to be comparable, but interference-clean and capable of measuring effects that user-randomization cannot.
- Difference-in-differences (diff-in-diff). Pre-launch versus post-launch measurement in a treated market versus a control market. Useful when you cannot randomize at all (regulatory rollouts, partner-specific changes). Weaker than randomized methods but defensible when randomization is impossible.

Practical heuristic: any feature with novelty risk (new UI, new mechanic, new pricing, new notification cadence) deserves a thirty-day holdout. Set it up at launch, not later; setting it up later requires unwinding the launch and is rarely done in practice. The cost of the holdout is small (a small percentage of users on the old experience for a month); the value is the ability to detect long-term degradation before it compounds.

---

## Common interpretation failures

Rapid-fire reference. Each pattern is described in more detail in [`references/common-interpretation-failures.md`](references/common-interpretation-failures.md).

- "P equals 0.04, ship it." No consideration of CI width, magnitude, or guardrails. Significance is a necessary condition, not a sufficient one.
- "We saw +5% on day 3, ending early." Peeking, novelty effect, or both. Day-3 lifts are routinely larger than day-14 lifts; ending early ships noise.
- "The new flow worked for power users (post-hoc segment)." Noise mining. The segment was found by slicing the data multiple ways; the apparent lift will not replicate.
- "Our experiment said +2%, but launch only delivered +0.5%." Often the experiment was correct: the lift applied to enrolled users in test conditions, and at full launch the effect is diluted by non-enrolled users, novelty fade, or interference effects the test could not capture.
- "Revenue went up but the CI for retention straddled zero so we ignored it." A guardrail violation that was reframed as "no signal." If retention is a guardrail, the guardrail is binding; "we did not see a clear signal" is not the same as "we have evidence of safety."
- "We CUPED-adjusted away a real treatment effect." CUPED reduces variance, not the point estimate. If the lift looked smaller after CUPED, the unadjusted lift was probably noise that CUPED correctly removed. Trust the adjusted version.
- "Two segments showed opposite effects; we shipped to the better segment." Likely overfitting unless both segments were pre-registered and the targeting infrastructure exists. Re-test before shipping.
- "We ran the test, it was inconclusive, but the trend was directional so we shipped." Inconclusive is inconclusive. Directional patterns are not evidence; they are wishful reading of noise.

---

## The framework: 14 considerations for trustworthy experiment interpretation

Trustworthy interpretation sits at the intersection of fourteen considerations. Each is covered in detail in its own section above.

1. **Result panel completeness.** The panel exposes variants, allocation, per-variant metrics, lifts, significance, variance reduction, guardrails, segments, time series, and status. Missing pieces are red flags.
2. **Confidence interval reading.** Width matters more than center. Five practical decision rules cover the cases where CI excludes zero, includes zero narrowly, and includes zero widely.
3. **P-value semantics.** The probability of seeing the lift if the null is true. Not the probability that the treatment works. Always read alongside the CI.
4. **Multiple testing corrections.** Bonferroni for family-wise control, BH for false discovery rate. Pre-register primary metrics and segments; treat the rest as exploratory.
5. **Sequential testing math.** Always-valid p-values and anytime-valid CIs survive peeking. Fixed-horizon p-values inflate false positives under daily monitoring.
6. **CUPED variance reduction.** Same point estimate, narrower CI. Use whenever pre-experiment data is available and informative.
7. **Heterogeneous treatment effects.** Pre-register segments. Treat post-hoc segment effects as hypotheses for follow-up tests, not as ship signals.
8. **Ratio metrics.** Use delta method or bootstrap. Naive proportion estimators understate variance and inflate false positives.
9. **Bayesian vs frequentist.** Pick one per experiment and stick with it. Both produce similar ship decisions when the experiment was designed correctly.
10. **Network effects and SUTVA.** Marketplace and social products often violate SUTVA. Cluster randomization, switchback, or geographic experiments when interference is suspected.
11. **Dashboard reconciliation.** Different denominators, time windows, external effects, and metric definitions explain most disagreements between BI dashboards and experiment panels.
12. **Long-term effect estimation.** Holdouts, geo experiments, and diff-in-diff for effects that emerge over thirty to ninety days.
13. **Common interpretation failures.** A pattern catalog of the most frequent ways smart teams ship wrong things.
14. **The discipline of inconclusive.** The hardest call is "we do not have enough signal to ship." It is often the right call.

The sections above expand each consideration in turn. Read the relevant section before making the decision, not after.

---

## Reference files

- [`references/confidence-interval-cheatsheet.md`](references/confidence-interval-cheatsheet.md). How to read a CI, what to ignore, the five decision rules with worked examples for each.
- [`references/p-value-interpretation-guide.md`](references/p-value-interpretation-guide.md). What it means, what people pretend it means, the 0.05 convention, the peeking problem, and the multiple-testing context.
- [`references/statistical-method-reference.md`](references/statistical-method-reference.md). CUPED, the delta method, sequential testing methods (mSPRT, group sequential, anytime-valid), HTE handling, multiple testing corrections, cluster randomization. The technical reference for analysts.
- [`references/dashboard-vs-experiment-reconciliation.md`](references/dashboard-vs-experiment-reconciliation.md). Why the BI number does not match the experiment number, the blended-attribution trap, and how to communicate the difference to non-statistical stakeholders.
- [`references/result-presentation-templates.md`](references/result-presentation-templates.md). Five templates for stakeholder communication: clear win, clear loss, inconclusive (the most common, hardest), mixed (positive primary with ambiguous guardrail), and long-term holdout report.
- [`references/analytics-platform-comparison.md`](references/analytics-platform-comparison.md). Profiles of seven major platforms (Statsig, PostHog, Optimizely, GrowthBook, Eppo, Amplitude, Kameleoon) covering what each exposes, what each hides, and the gotchas in each.
- [`references/common-interpretation-failures.md`](references/common-interpretation-failures.md). Fifteen-plus failure patterns: name, symptom, root cause, fix, prevention.

---

## Closing: the courage to call it inconclusive

Most experiment results are not clear ship-or-kill. They are inconclusive: lift exists but the CI straddles zero; lift is real but does not justify the implementation cost; lift is significant but a guardrail is concerning; lift looks great in one segment but the segment is small or the targeting infrastructure does not exist.

The hardest decision a PM makes in a given week is often "we do not have enough signal to ship." The temptation to lower the bar after seeing the result is enormous. The discipline of saying "inconclusive" is the discipline of caring about being right more than being decisive.

The same discipline applies to analysts. The temptation to slice the data one more way until something looks significant, to apply one more variance reduction technique, to switch from frequentist to Bayesian mid-test, is constant. Each individual move feels like a small judgment call. Cumulatively they destroy the integrity of the analysis. The result is not "we found a real effect"; the result is "we ran enough analytical knobs that something looked significant."

Inconclusive is a valid outcome. The lesson, if there is one, is for the next hypothesis: the effect is smaller than expected, the segment matters, the test was underpowered, the metric was the wrong one. Use the inconclusive result to design a better next test. Do not retrofit a story onto the current one.

For pre-experiment design discipline, see the `experiment-design` skill. For the operational mechanics of feature flags that deliver the variants, see the `feature-flagging` skill. For platform-specific MCP commands and example prompts, consult the chosen platform's documentation.
