# Sequential testing patterns

mSPRT, confidence sequences, group sequential designs. Plus an honest framing on when to peek.

The principle. Looking at experiment results before completion (peeking) inflates the false-positive rate. The naive solution is "do not peek." The practical solution is sequential testing methods that allow valid early stopping. The honest middle ground: if you do not understand the math, do not peek.

---

## The peeking problem

The standard t-test assumes a fixed sample size pre-registered before the experiment runs. When the team peeks early, the test is implicitly running multiple times; some of those peeks will hit p < 0.05 by chance even when no effect exists.

A team that peeks daily on a 4-week experiment runs the test roughly 28 times. The implicit false-positive rate becomes much higher than the nominal 5 percent. Estimates suggest 30 percent or more in this case; the experiment is more likely to show a fake significant result than a real one.

The four solutions.

1. **Do not peek.** Pre-register the sample size; analyze once.
2. **mSPRT.** Always-valid p-values that survive peeking.
3. **Confidence sequences.** Always-valid confidence intervals via the Howard et al construction.
4. **Group sequential designs.** Pre-specified interim analyses with calibrated alpha-spending.

Each solution requires implementation discipline. Incorrect implementation is worse than no peeking solution at all (the team thinks the math is correct and ships based on inflated false-positives).

---

## mSPRT (mixture Sequential Probability Ratio Test)

The most commonly deployed sequential testing method. Used by Optimizely, Statsig.

The intuition. Compute a Bayes-factor-like statistic that updates as data arrives. The statistic crosses a fixed threshold when the evidence is strong enough to reject the null; it never crosses by chance under the null (with the correct calibration).

### Python implementation sketch

```python
import numpy as np

def mSPRT(treatment, control, prior_var=1.0, alpha=0.05):
    """
    Mixture SPRT for two-sample mean difference.
    Returns the always-valid p-value at the current sample.
    """
    n_t = len(treatment)
    n_c = len(control)
    diff = treatment.mean() - control.mean()
    pooled_var = (treatment.var() / n_t + control.var() / n_c)
    se = np.sqrt(pooled_var)

    # Test statistic
    z = diff / se

    # Mixture prior with variance prior_var
    # Always-valid p-value via the mixture-likelihood ratio
    n_eff = (n_t * n_c) / (n_t + n_c)
    weight = np.sqrt(prior_var / (prior_var + 1.0 / n_eff))
    log_lr = 0.5 * z**2 * (1 - weight**2) - 0.5 * np.log(1.0 / weight**2)
    p_always_valid = min(1.0, np.exp(-log_lr))

    return p_always_valid
```

Note: the implementation above is a sketch for illustration. Production implementations should use a peer-reviewed library or expert review. Do not deploy this verbatim.

The honest version. Use a maintained library (`sequential` in R, custom Python adapted from peer-reviewed papers like Johari et al 2017). Have a statistician on the team review the implementation.

---

## Confidence sequences (Always-Valid Inference)

The Howard et al construction. Confidence intervals that are valid at any sample size; the team can peek arbitrarily often without inflating the false-positive rate.

The math is more involved than mSPRT. Useful when the team needs not just always-valid p-values but always-valid confidence intervals (effect size with uncertainty).

References.

- Howard, Ramdas, McAuliffe, Sekhon (2021), "Time-uniform, nonparametric, nonasymptotic confidence sequences."
- Code: `sequential` package in R, or custom Python.

For most warehouse-native teams, mSPRT is enough. Confidence sequences are for teams with a statistician who has read the paper and validated the implementation.

---

## Group sequential designs

The classical frequentist approach. Pre-specified interim analysis points (e.g., at 25 percent, 50 percent, 75 percent of the planned sample) with calibrated alpha-spending boundaries.

The most common boundary is **O'Brien-Fleming**. Conservative early (high effect size required to stop early); lenient late (lower effect size required to stop at the final analysis).

```python
# Hypothetical O'Brien-Fleming boundaries for 4 interim analyses
# Z-values; if observed Z exceeds, reject the null and stop
boundaries = {
    0.25: 4.05,
    0.50: 2.86,
    0.75: 2.34,
    1.00: 2.02,
}
```

The discipline.

1. Pre-register the interim analysis points and the boundary values.
2. At each interim point, compute the test statistic.
3. If the statistic exceeds the boundary, stop the experiment and reject the null.
4. If the statistic does not exceed any boundary by the final analysis, fail to reject (treat as inconclusive or as "no effect detected").

Group sequential designs require commitment up front. Adding interim analyses after the experiment starts is post-hoc peeking and inflates the false-positive rate.

---

## When to peek and when not to

Three scenarios.

### Scenario 1: small team, no statistician, simple experiments

Do not peek. Pre-register the sample size; analyze once at completion. The discipline is simpler than implementing sequential testing correctly, and the cost (running for the full pre-registered duration) is usually small.

### Scenario 2: high-volume team running many experiments, has a statistician

Implement mSPRT. The peeking is operationally useful (early stops free up the testing infrastructure for the next experiment) and the math is well-understood. Train the team on the implementation; review periodically.

### Scenario 3: regulated industry, strong audit requirements

Group sequential design. Pre-registered interim analyses with calibrated boundaries. The audit trail is clean: every interim analysis was specified before the experiment started; the boundaries are reproducible from the design document.

---

## Common sequential testing mistakes

- **Implementing mSPRT without understanding the math.** A wrong implementation produces inflated false-positives that the team trusts. Worse than no peeking.
- **Adding interim analyses after the experiment starts.** Group sequential designs require pre-registration. Post-hoc interim analyses are just peeking.
- **Mixing methods.** Compute mSPRT for some peeks and a standard t-test for others. The latter inflates false-positives; the former does not. Pick one method per experiment and stick to it.
- **Using mSPRT but reporting the standard p-value.** The mSPRT p-value is always-valid; the standard p-value is not. Reporting the standard p-value while peeking is the same as not using mSPRT at all.
- **Stopping early on a tiny effect.** mSPRT may show "significant" before the team has enough evidence on practical significance. The effect is real but small; shipping it may not be worth the engineering complexity.

---

## The honest recommendation

For most warehouse-native experimentation teams, the right answer is "do not peek."

- Pre-register the sample size based on power analysis.
- Run to the pre-registered sample.
- Analyze once at completion.

The cost is some early stops the team would have liked. The benefit is no implementation risk in sequential testing math, no false-positives from mis-implemented peeking, and a clean audit trail.

Move to sequential testing when the team has the statistical expertise to implement correctly and the operational pressure to peek (high-volume infrastructure where early stops materially affect the next experiment's timeline).
