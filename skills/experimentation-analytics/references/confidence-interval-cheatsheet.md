# Confidence interval cheatsheet

The CI on the lift is the single most important number on the result panel. This cheatsheet covers what it means, what to ignore, and the five decision rules that map a CI to a ship, kill, or wait decision.

---

## What the CI is

A 95% confidence interval (CI) on a lift estimate is a range of values that, under repeated sampling of the experiment, would contain the true effect 95% of the time. The point estimate (the center) is your best single guess at the true effect. The width is your humility about how much you actually know.

Three common CI shapes you will see on result panels:

- Symmetric. Lift estimate +3% with CI [+1%, +5%]. The middle is the best guess; the bounds are equidistant.
- Skewed. Lift estimate +3% with CI [-0.5%, +8%]. Common with small samples or distributions with long tails. The point estimate is still the best guess; the asymmetry tells you the data is consistent with a wider range on the upside than the downside.
- Always-valid (sequential). Same shape as a normal CI but wider by design. Survives daily peeking. If your panel says "anytime-valid CI," that is what you are looking at.

---

## What to read first

Width before center. A narrow CI tells you a lot about the true effect; a wide CI tells you very little, regardless of where it is centered. A point estimate of +5% with CI [+4.5%, +5.5%] is a precise estimate of a real lift. A point estimate of +5% with CI [-3%, +13%] is essentially "we have no idea, somewhere between a meaningful loss and a huge win."

The position of zero relative to the CI. If zero is well outside the CI on the positive side, you have a real positive effect. If zero is well outside on the negative side, you have a real harm. If zero is inside the CI, you cannot rule out "no effect."

---

## What to ignore

The point estimate alone. Without the CI, the point estimate is a single number with no honesty about how much it could move under different sampling. Reading "lift was +3%" without the CI is reading half the result.

The p-value alone. P-values tell you about the strength of evidence against the null; CIs tell you about the magnitude of the effect. Both matter. A tiny lift with p equals 0.001 is technically significant and not worth shipping. A big lift with p equals 0.10 is technically inconclusive and worth a follow-up test.

The "statistically significant" label as a binary. Most platforms color-code significance as a green check or a red X. The label is fine as a heuristic; the underlying CI is what you should defend the decision on.

---

## The five decision rules

### Rule 1: CI all-positive, lift above MDE. Ship.

**Example.** MDE was 2%; CI is [+3%, +6%].

The lower bound of the CI exceeds the MDE you committed to detect. The data is inconsistent with no effect AND inconsistent with a trivial effect. Confidence is high, magnitude is meaningful. Ship.

Confirm guardrails are clean before filing the launch.

### Rule 2: CI all-positive, lift below MDE. Probably do not ship.

**Example.** MDE was 5%; CI is [+0.5%, +1.2%].

The lift is real (CI excludes zero) but small (entire CI is below the MDE). The test was overpowered for the question, or the effect is smaller than expected. Real but tiny lifts are rarely worth shipping; the engineering, testing, and cognitive surface area exceeds the gain.

The exception: changes that are essentially free to ship and maintain. A copy tweak with a +0.5% lift might be worth shipping; a feature requiring ongoing infrastructure with the same lift is not.

### Rule 3: CI all-negative. Kill.

**Example.** CI is [-4%, -1%].

The data is inconsistent with no effect and inconsistent with a positive effect. The change made things worse with high confidence. Kill the test. Document the lesson if the result is surprising; sometimes the lesson is "users wanted what we already had."

### Rule 4: CI straddles zero, narrow. Real null result.

**Example.** CI is [-0.5%, +0.8%].

Zero is inside the CI, but so is everything else within a small range. The data is consistent with no effect and inconsistent with any meaningful positive or negative effect. This is a real "we tested and it does not move the metric" result. Useful information; do not ship for "lift" reasons (you found none) but do not panic about harm either.

The product question becomes: does the change have value beyond the metric we measured (brand consistency, code maintainability, accessibility)? If yes, ship for those reasons. If no, do not ship.

### Rule 5: CI straddles zero, wide. Inconclusive.

**Example.** CI is [-5%, +8%].

Zero is inside the CI and so is a wide range of meaningful effects in both directions. The data does not distinguish "moderate win" from "no effect" from "moderate loss." The test was underpowered for the question.

Three follow-up paths:

- Run longer or run bigger to narrow the CI.
- Make the treatment bolder so the expected effect is larger and detectable at the available traffic.
- Accept that the question cannot be answered cleanly and move on.

The temptation is to ship anyway because "the point estimate was favorable." The point estimate is not evidence when the CI is this wide. Resist.

---

## Pairing the CI with guardrails

The CI on the primary metric is where the ship decision lives. The CI on each guardrail is where the safety check lives. Read both.

A guardrail CI that excludes the threshold of concern is clean. For example, if retention is a guardrail and you require it to not drop more than 1%, a guardrail CI of [-0.3%, +0.4%] is clean. A CI of [-2%, +0.5%] is not clean even though it includes zero, because the lower bound exceeds the threshold.

Wide guardrail CIs mean the test was underpowered for the guardrail. That is a real problem: you cannot claim safety on a metric you did not measure precisely. The fix is more sample, not "the point estimate looked fine."

---

## Worked example: the "looks great" trap

**Setup.** PM running a checkout redesign. Pre-committed primary: revenue per visitor. MDE: 3%. Guardrail: refund rate not increasing by more than 0.5%.

**Day 5.** Result panel shows revenue per visitor +6%, p equals 0.03, CI [+0.5%, +11.5%]. Refund rate +0.3%, CI [-0.4%, +1.0%].

**The temptation.** Both metrics moved favorably; the headline is significant. PM proposes ending the test early.

**The CI read.** Revenue CI [+0.5%, +11.5%] has a lower bound (+0.5%) below the MDE (+3%). The data is consistent with a real but tiny lift, not just the headline +6%. The guardrail CI [-0.4%, +1.0%] has an upper bound (+1.0%) that exceeds the threshold (+0.5%); the test cannot rule out a guardrail violation.

**The right call.** Do not ship yet. Run to the pre-committed end date. Both CIs need to narrow before the ship case is defensible. The day-5 read is suggestive but not decisive; it is exactly the case the pre-commitment discipline was designed to handle.

**Common variant.** PM ships anyway because "the trend is positive." Three weeks later the launch shows a refund rate increase that wipes out the revenue gain. The day-5 CI was warning of this exact possibility; the team did not read the width.
