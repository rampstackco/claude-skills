# Statistical method reference

The technical reference for analysts. Covers the methods named in the [SKILL.md](../SKILL.md) with enough depth to verify a platform's implementation, recognize when a method is needed, and explain the choice to a skeptical reviewer.

---

## CUPED (Controlled-experiment Using Pre-Experiment Data)

**What it does.** Uses pre-experiment behavior of the same users to subtract out their baseline, leaving a cleaner signal of the treatment effect. Same point estimate as the unadjusted analysis; narrower CI.

**The math, in one paragraph.** For each user, take their in-experiment metric value Y and their pre-experiment metric value X. Compute the regression coefficient theta that relates X to Y in the control group. Replace Y with Y minus theta times (X minus X-bar) for every user. Run the analysis on the adjusted Y. The variance of the adjusted Y is lower than the variance of Y by a factor proportional to the squared correlation between X and Y, which directly narrows the CI.

**Variance reduction in practice.** Typical reduction is 30% to 50% for engagement metrics, 20% to 40% for revenue metrics, near zero for one-time conversions. Effective sample size roughly doubles when variance halves.

**When to use.**

- Metrics with high pre-experiment baseline variance (revenue per user, sessions per user, engagement minutes).
- Tests where users have meaningful history (logged-in users, users from before a certain date).
- Long-running products where pre-experiment behavior strongly predicts in-experiment behavior.

**When NOT to use.**

- Brand-new users with no pre-experiment data.
- One-time conversion metrics with no pre-experiment baseline.
- Tests where pre-experiment behavior is uncorrelated with the metric being moved (a notification redesign rarely correlates with prior revenue, for example).

**How to verify your platform implements it correctly.** Ask: "Do you compute theta on control only, or on the pooled population?" Pooled is technically wrong (induces bias). Control-only is correct. "What pre-experiment window do you use?" Common defaults are 14 to 28 days; the choice should be documented.

**Common confusion.** "CUPED made our lift smaller, so we should report the unadjusted version." Wrong. CUPED reduces variance, not the point estimate. If the lift looks smaller after CUPED, the unadjusted lift was probably inflated by chance correlation with pre-experiment behavior; the CUPED estimate is closer to the true effect.

---

## The delta method

**What it does.** Provides correct variance estimation for ratio metrics. Naive variance estimation on ratios produces incorrectly narrow CIs and inflated false positive rates.

**Why ratios are special.** Standard variance formulas assume sums of independent observations. Ratios are functions of two correlated sums (numerator and denominator). The variance of a ratio depends on the variance of the numerator, the variance of the denominator, AND the covariance between them. Naive estimators ignore the denominator variance and the covariance.

**The math, in one paragraph.** For a ratio R equals N divided by D, the delta method approximates the variance of R using a first-order Taylor expansion around the means of N and D. The result expresses Var(R) as a function of Var(N), Var(D), Cov(N, D), and the means. The approximation is excellent when the sample size is moderate to large, which it is for almost any A/B test.

**When to use.**

- Conversion rate (conversions per user, when users can have multiple events).
- Click-through rate (clicks per impression).
- Revenue per user.
- Average order value.
- Any metric expressible as numerator divided by denominator where users can contribute multiple values.

**When the simple formula is fine.**

- Per-user binary conversion (one row per user, converted yes or no). The standard proportion variance formula is correct here.

**Bootstrap as an alternative.** Resample users with replacement many times, compute the ratio each time, read off the empirical CI. Distribution-free; slower than delta method. Both produce similar CIs for typical A/B test sizes.

**How to verify your platform.** Ask "what variance estimator do you use for ratio metrics?" Acceptable answers: delta method, linearization, bootstrap with user-level resampling. Unacceptable: standard t-test on proportions (wrong for non-binary ratios), bootstrap with row-level resampling (ignores within-user correlation).

---

## Sequential testing methods

**The peeking problem.** Standard p-values assume one analysis at the end of the test. Multiple analyses inflate the false positive rate. Daily peeking on a four-week test can push false positive rate above 30%.

**Group sequential designs (GSD).** Plan a fixed set of interim analyses (often three) with adjusted significance thresholds at each. The thresholds are computed so the overall false positive rate stays at the nominal alpha. Well-understood; less flexible than always-valid methods.

**Mixture sequential probability ratio test (mSPRT).** Produces "always-valid" p-values: the false positive rate stays at nominal alpha regardless of how many times you analyze. Common in modern platforms. The math: define a likelihood ratio between the alternative and null hypotheses, integrated over a prior on the effect size. The test rejects when the ratio exceeds 1/alpha.

**Anytime-valid confidence intervals.** The CI version of always-valid p-values. Produced by taking the inverse of the always-valid test family. Wider than fixed-horizon CIs; the cost of peek-safety is some statistical efficiency, typically 10% to 30% wider.

**Implementation across platforms.**

- Statsig: always-valid by default for sequential metrics.
- Eppo: sequential CIs available as a configuration.
- GrowthBook: mSPRT supported.
- PostHog: depends on the experiment type and configuration.
- Optimizely: supports sequential via Stats Engine.
- Amplitude (Experiment): supports sequential testing.

**How to read the panel.** "Always-valid p-value" or "anytime-valid CI" labels indicate sequential. "P-value" with no qualifier is fixed-horizon; treat early peeks as suggestive only.

---

## Heterogeneous treatment effects (HTE)

**What HTE is.** The treatment works differently for different segments. New users see +5%, power users see -2%, average is +1%.

**Pre-registered vs post-hoc.** Pre-registered HTE analysis is one of the segment definitions you committed to at design time, with sample size budgeted for the segment. Post-hoc HTE discovery is finding a segment whose effect is large by mining the data; this is noise mining and the apparent lift will not replicate.

**When to ship segment-only.** Three conditions must all hold:

- The segment was pre-registered.
- The effect within the segment is large enough to justify shipping.
- The targeting infrastructure exists (or is cheap to build) and the maintenance cost is acceptable.

If any condition fails, do not ship segment-only. Either ship to everyone (taking the average effect) or do not ship.

**Methods for principled HTE detection.**

- Causal forests: machine learning method for estimating heterogeneous treatment effects across many features.
- Conditional average treatment effects (CATE) with regression: model the effect as a function of covariates.
- Pre-registered segment analysis: simpler, more defensible, and sufficient for most PM contexts.

For most A/B tests, pre-registered segment analysis is the right level of sophistication. Causal forests are useful for marketplace and personalization research where the effect is genuinely expected to vary across many dimensions.

---

## Multiple testing corrections

**The problem.** With twenty independent comparisons at alpha equals 0.05, you expect one false positive purely by chance. With fifty, two or three.

**Bonferroni correction.** Divide alpha by the number of comparisons. With 20 comparisons, use alpha equals 0.0025 per comparison. Conservative; controls the family-wise error rate (probability of any false positive across the family).

**Benjamini-Hochberg (BH) correction.** Less conservative; controls the false discovery rate (expected proportion of false positives among the things called significant). Better for exploratory analysis where some false positives are tolerable.

**When to use which.**

- Small number of pre-registered comparisons with high stakes: Bonferroni.
- Larger exploratory analysis where some false positives are acceptable: BH.
- Single pre-registered primary metric: no correction needed (one comparison).

**How platforms apply corrections.** Some platforms apply corrections silently to displayed p-values; others report uncorrected numbers. Know which your platform does. The "5 of 12 metrics significant" headline means very different things depending on whether the p-values were corrected.

---

## Cluster randomization

**When SUTVA is violated.** SUTVA (Stable Unit Treatment Value Assumption) says one user's treatment does not affect another user's outcome. Violated in two-sided marketplaces, social products, supply-constrained features, and notification systems.

**Cluster randomization as a fix.** Assign whole units (cities, markets, friend groups, sessions) to treatment or control rather than individual users. Eliminates within-cluster interference at the cost of effective sample size.

**Trade-off.** A cluster of 1000 users behaves more like one observation than 1000 independent observations. Effective sample size is roughly the number of clusters times the within-cluster correlation factor. Cluster randomization with 50 clusters has roughly the power of a user-randomized test with 200 to 500 users, even if the clusters contain millions of users total.

**Designing for cluster randomization.** Choose the cluster boundary so that interference happens within clusters but not across them. Cities work for marketplace experiments. Friend groups work for social products. Sessions work for some notification studies.

**Switchback experiments as an alternative.** Toggle the entire population between treatment and control across time windows (week 1 treatment, week 2 control). Eliminates cross-user interference within each window. Requires careful temporal modeling because the windows are not independent (carryover effects, day-of-week effects).

**Detection of SUTVA violation without redesign.** Compare a small cluster-randomized version to the user-randomized version. If the cluster-randomized lift is much larger than the user-randomized lift, the user-randomized test is leaking treatment into control via interference. The user-randomized test is undercounting the effect.

---

## Variance reduction beyond CUPED

**Stratified sampling.** Pre-stratify users by a known covariate (geography, segment, signup cohort) and randomize within strata. Reduces variance from imbalanced randomization at the cost of slightly more complex analysis.

**Post-stratification.** Run normal randomization, then adjust the analysis for known covariates after the fact. Similar variance reduction to CUPED for the right covariates.

**Regression adjustment.** Include covariates as controls in the regression that estimates the treatment effect. Equivalent to post-stratification for one covariate; generalizes to multiple.

**Doubly robust estimation.** Combines regression adjustment with inverse-probability weighting. Robust to misspecification of either the outcome model or the propensity model. Overkill for most A/B tests; useful for observational analysis and some quasi-experiments.

For most PM contexts, CUPED plus pre-registered segment analysis covers the variance reduction needs. The methods above are the next step up when the standard tools are insufficient.
