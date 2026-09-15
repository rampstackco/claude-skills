# P-value interpretation guide

The p-value is the most-mentioned and most-misunderstood number on the result panel. This guide covers what it actually means, what people pretend it means, when the 0.05 cutoff binds and when it does not, and how to read p-values alongside the CI.

---

## What the p-value is

The p-value is the probability of observing the lift you saw (or one larger in magnitude), IF the true effect were zero. It is computed under the assumption that the treatment had no effect; the value tells you how surprised you should be by the observed data under that assumption.

A p-value of 0.04 means: under the null hypothesis of no effect, you would see this much lift purely by chance about 4% of the time. A p-value of 0.001 means it would happen 0.1% of the time. Smaller p-values are stronger evidence against the null; larger p-values are weaker evidence.

That is the whole technical definition. Everything else is interpretation, and most of it is wrong.

---

## What the p-value is not

These are the most common misinterpretations. Each one is wrong for a specific reason.

**"P equals 0.04 means 96% chance the treatment works."** No. The p-value is computed under the assumption that the treatment does NOT work; it cannot tell you the probability that it does. The Bayesian probability of the alternative depends on the prior, which the p-value does not contain.

**"P equals 0.001 means the effect is huge."** No. P-values are about the strength of evidence against the null, not the size of the effect. A tiny effect tested against a very large sample produces a tiny p-value. The CI tells you the size; the p-value tells you the certainty.

**"A significant result will replicate."** Not necessarily. A p-value of 0.05 is associated with replication rates well below 50% in most published research. Statistical significance is one piece of evidence; reproducibility requires confirmation.

**"P greater than 0.05 means there is no effect."** No. P-values cannot prove the null. A non-significant result means "we do not have enough evidence to reject no-effect," which is weaker than "no-effect is true." The CI tells you the practical conclusion: a wide CI straddling zero is "we do not know," while a narrow CI around zero is "the effect is small enough to call zero."

**"P equals 0.06 is much worse than p equals 0.04."** No. The 0.05 cutoff is convention; the underlying evidence is roughly the same. Treating 0.06 as categorically different from 0.04 is theater unless you pre-committed to the cutoff.

---

## The 0.05 convention

Alpha equals 0.05 is the standard significance threshold by historical convention, not because the math says 0.05 is special. The convention is useful because it provides a shared reference point, and pre-committing to a threshold prevents post-hoc rationalization.

Two valid uses of the threshold:

- **Pre-committed alpha.** You declared at design time that you would ship if p was less than 0.05 and the CI excluded zero. Now apply the rule mechanically. If the result hit 0.04, follow the pre-commitment.
- **Convention reference point.** When communicating with stakeholders, "significant at the conventional 5% threshold" is a familiar phrasing. Use it as long as the underlying CI is also reported.

Two invalid uses:

- **Post-hoc threshold games.** Result is p equals 0.06; you decide that 0.10 is "good enough this time." This is p-hacking.
- **Treating the threshold as a binary truth.** Result is p equals 0.04; you ship without reading the CI. The threshold is necessary but not sufficient evidence to ship.

---

## Always read the CI alongside the p-value

The p-value tells you about the null hypothesis. The CI tells you about the magnitude. They answer different questions, and decisions need both answers.

| Scenario | P-value | CI on lift | Decision |
|---|---|---|---|
| Real, meaningful effect | 0.001 | [+3%, +6%] | Ship if guardrails clean |
| Real but tiny effect | 0.001 | [+0.2%, +0.4%] | Probably do not ship; magnitude too small |
| Suggestive but uncertain | 0.08 | [-0.5%, +12%] | Inconclusive; run longer or kill |
| Inconclusive null | 0.30 | [-1%, +1%] | Real null result; do not ship for lift reasons |
| Inconclusive wide | 0.30 | [-7%, +9%] | Underpowered; not enough information |

Reading just the p-value loses the magnitude. Reading just the CI loses the certainty calibration. Both are routine on every result panel; both deserve attention.

---

## The peeking problem

Standard p-values assume one analysis at the end of the test. Multiple analyses inflate the false positive rate.

The math: at one analysis, alpha equals 5% means 5% false positive rate. At three analyses, it climbs toward 14%. At daily peeking on a four-week test, it can exceed 30%. The "significant" results you find by peeking are disproportionately false positives that will not replicate.

Two fixes:

- **Sequential testing methods.** Modern platforms (Statsig, Eppo, GrowthBook with mSPRT, parts of PostHog) report "always-valid" or "anytime-valid" p-values that survive peeking. The math is wider by design; the cost of peek-safety is some statistical efficiency.
- **Pre-commitment.** If your platform does not support sequential testing, declare the analysis date at launch and do not peek. If you must peek (some platforms make it hard not to), do not make decisions on intermediate peeks.

If your panel says "p-value" without a qualifier, assume fixed-horizon. Treat early-peek results as suggestive only.

---

## Multiple testing context

A p-value of 0.05 means a 5% false positive rate per comparison. With twenty comparisons, you expect one false positive purely by chance.

Where this matters:

- Multiple variants (A vs B vs C vs D is three pairwise tests).
- Multiple metrics (primary plus six guardrails plus three secondary is ten chances).
- Multiple segments (ten segments times three metrics is thirty chances).

Pre-register the primary metric and primary segment. Treat the rest as exploratory. A "significant" finding in a non-primary metric or non-primary segment requires either a larger effect, a follow-up test, or both before it justifies shipping. The discipline of pre-registration protects you from the multiple-testing trap better than any correction formula.

When the platform applies a correction (Bonferroni, Benjamini-Hochberg) silently, the p-values you see have already been adjusted. Know which the platform applies by default; otherwise you may double-correct in your interpretation.

---

## Bayesian alternatives

Some platforms (Eppo by default, Statsig as a configuration option) report Bayesian probabilities rather than frequentist p-values. The vocabulary differs:

- "Probability variant B is best": the Bayesian equivalent of multi-variant frequentist comparison.
- "Probability of beating control by at least X%": directly answers the magnitude question that frequentist p-values dance around.
- "Posterior credible interval": the Bayesian analogue of the confidence interval, with an interpretation closer to lay intuition ("there is a 95% chance the true effect is in this range").

For most PM contexts, both approaches produce similar ship decisions when the experiment was designed correctly. Pick one per experiment and stick with it. Switching mid-flight to chase a more favorable interpretation is the Bayesian-frequentist version of p-hacking.

---

## Communicating p-values to non-technical stakeholders

Stakeholders often want a one-sentence summary. The temptation is "p equals 0.04, so we should ship." The temptation is wrong because it loses the magnitude.

Better one-liners:

- "We saw a 4% lift in revenue per visitor; the data rules out no-effect and is consistent with a 2% to 6% true lift."
- "The test was inconclusive: the lift could be anywhere from a small loss to a moderate win."
- "We measured a small but real effect: about 0.5% lift, which is statistically detectable but probably not worth shipping."

Each names the magnitude, the uncertainty, and the decision implication. None reduces the question to a p-value threshold check.
