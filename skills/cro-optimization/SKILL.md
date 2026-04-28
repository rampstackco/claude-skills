---
name: cro-optimization
description: "Run conversion rate optimization through hypothesis-driven testing including audit, hypothesis generation, test design, statistical analysis, and rollout decisions. Use this skill whenever the user wants to optimize conversion, run A/B tests, audit a funnel, generate test hypotheses, design experiments, or analyze test results. Triggers on conversion optimization, CRO, A/B test, split test, multivariate test, hypothesis, conversion funnel, funnel audit, experiment design, statistical significance, lift, optimization. Also triggers when the user has a conversion problem and isn't sure where to start, or when test results are ambiguous and need interpretation."
---

# CRO Optimization

Run conversion rate optimization as a structured discipline: audit → hypothesize → test → decide. Stack-agnostic. Tool-agnostic.

This skill is for running tests against existing pages and flows. For writing landing page copy from scratch, use `landing-page-copy`. For setting up the analytics that make CRO possible, use `analytics-strategy`.

---

## When to use

- Converting traffic at lower rate than expected
- Specific funnel step has high drop-off
- Pages with high traffic that could move the needle if optimized
- A/B testing infrastructure exists (or can be set up)
- Statistical significance and sample size questions

## When NOT to use

- Without sufficient traffic to test (under ~5,000 monthly conversions per variant)
- Pre-launch (no users to test on yet)
- Strategy or messaging-level questions that need qualitative research first
- Brand-defining choices (CRO can't optimize a fundamentally wrong brand)

---

## Required inputs

- The page or flow under optimization
- Current conversion rate and traffic volume
- Access to analytics (event tracking, funnel data)
- An A/B testing tool (or willingness to set one up)
- Time and budget for testing (typically 2 to 8 weeks per test)

---

## The framework: 4 phases

### 1. Audit

Diagnose before treating.

**Quantitative audit:**

- **Funnel data.** Where are users dropping off? The biggest drop is the biggest opportunity.
- **Segmentation.** Does the funnel perform differently by source, device, geography, audience type?
- **Performance data.** Are slow pages dragging conversions?
- **Search Console / on-site search.** What are users looking for that they can't find?

**Qualitative audit:**

- **Session replay.** Watch 20+ sessions of users on the target flow. Note friction, confusion, hesitation.
- **Heatmaps.** Where do users click? Where do they scroll? Where do they not?
- **User interviews / surveys.** Why did users not convert? Survey people who started but abandoned.
- **Form analytics.** Which fields cause abandonment? Which cause errors?
- **Customer support tickets.** What conversion-related questions come in?

**Heuristic audit:**

- Apply CRO heuristics to the flow:
  - Is the value proposition clear in 5 seconds?
  - Is there a single primary CTA per page?
  - Is the form length appropriate to the offer?
  - Is the trust/social proof present?
  - Are objections handled?
  - Is the page accessible? (Accessibility issues hurt conversion silently.)

The audit produces a list of suspected friction points. Each becomes a hypothesis candidate.

### 2. Hypothesis

A testable statement.

**Hypothesis structure:**

> Because [observation from audit], we believe that [change] will produce [predicted outcome] for [user segment], because [reason].

**Example:**

> Because session replays show users abandoning at the shipping step (audit), we believe that adding visible shipping cost to the product page (change) will increase add-to-cart conversion by 5 percent (outcome) for desktop users (segment), because users are surprised by shipping cost and abandon (reason).

**Hypothesis quality criteria:**

- Specific change (not "improve the design")
- Measurable outcome (with a target)
- Grounded in evidence (audit, research, prior tests)
- Tied to a known mechanism (why would this work?)

**Hypothesis prioritization (ICE or PIE):**

- **Impact:** How much could this move the metric?
- **Confidence:** How likely is the hypothesis to be right?
- **Ease:** How easy to test? (Time, complexity, risk)

Score each 1 to 10. Highest combined scores test first.

### 3. Test design

A test that produces an unambiguous answer.

**Sample size and duration:**

Use a sample size calculator (most A/B tools have one) before launching. Inputs:

- Baseline conversion rate
- Minimum detectable effect (the smallest lift you'd care about)
- Statistical power (typically 80%)
- Significance level (typically 95%)

This produces required sample size per variant. Run the test until that sample is reached, OR for a minimum duration that captures full business cycle (typically 2 weeks minimum, to cover weekends and weekly patterns).

**Common test setup mistakes:**

- Stopping the test the moment significance is hit (peeking)
- Running tests for too short to capture a full business cycle
- Running multiple overlapping tests on the same flow
- Testing during atypical periods (Black Friday, holidays, major campaigns)
- Excluding mobile when 50%+ of traffic is mobile (or vice versa)
- Testing on too small a slice of traffic (low statistical power)
- Not segmenting analysis (overall lift can hide negative impact on a segment)

**Test parameters to define before launch:**

- Primary metric (one)
- Guardrail metrics (do not go down)
- Sample size
- Duration (minimum and maximum)
- Decision criteria (when to ship, when to kill, when to extend)
- Segments to analyze in addition to overall

### 4. Decide

After the test concludes.

**Decision framework:**

| Outcome | Decision |
|---|---|
| Variant clearly wins (>95% significance, exceeds minimum effect) | Ship variant. Document. Continue testing. |
| Variant clearly loses | Kill. Capture the lesson. Iterate hypothesis. |
| Inconclusive (neither significant) | Larger test, different angle, or move on. Don't ship "tied" variants. |
| Small lift, lots of variance | Probably not worth shipping. Even if "winner," may not replicate. |
| Wins overall, loses for important segment | Investigate segment. Consider segment-specific solution. |

**Anti-patterns:**

- "It looks like it's winning, ship it" before reaching significance
- Shipping a variant because the team wants to (HiPPO - highest paid person's opinion)
- Killing tests too early because they look bad
- Re-running tests until they "win" (false positive risk)
- Not capturing the learning when a test loses

---

## Statistical foundations

### Significance and confidence

A 95% significance level means: if there were truly no difference between variants, there's only a 5% chance you'd see results this extreme by chance.

That's not the same as "95% chance the variant wins."

Most CRO tools report Bayesian probabilities ("95% chance of being best"). Read the methodology your tool uses.

### Sample size

Conversion testing needs more sample than people intuit. Quick reference:

| Baseline rate | Minimum detectable effect | Sample per variant |
|---|---|---|
| 2% | 10% relative lift | ~75,000 |
| 2% | 20% relative lift | ~19,000 |
| 5% | 10% relative lift | ~30,000 |
| 5% | 20% relative lift | ~7,500 |
| 10% | 10% relative lift | ~14,000 |
| 10% | 20% relative lift | ~3,500 |

(Approximate. Use a calculator.)

If your monthly conversions per variant don't reach these numbers, A/B testing won't produce reliable results. Iterate via design and qualitative research instead.

### Multiple testing

The more variants and metrics tested simultaneously, the more false positives. Adjust significance thresholds for multiple comparisons (Bonferroni or similar).

---

## Workflow

1. **Audit.** Quantitative + qualitative + heuristic.
2. **Generate hypotheses.** From audit findings. Apply hypothesis structure.
3. **Prioritize.** ICE or PIE. Top 3 to 5 to test next.
4. **Design the test.** Sample size, duration, primary and guardrail metrics, decision criteria.
5. **Implement.** Build variants. QA carefully (broken variants invalidate tests).
6. **Run.** Don't peek. Don't stop early.
7. **Analyze.** Overall and by segment. Note interesting patterns regardless of significance.
8. **Decide.** Ship, kill, or extend.
9. **Document.** Hypothesis, design, results, decision, lesson.
10. **Compound.** Apply lessons to next round of hypotheses.

---

## Failure patterns

- **Testing without audit.** Random changes, random results.
- **Vague hypotheses.** "Make it better" is not a hypothesis.
- **Peeking and early stopping.** Bias toward false positives.
- **Underpowered tests.** Not enough sample for a real conclusion.
- **HiPPO override.** Highest paid person's opinion overrides the data.
- **Testing during atypical periods.** Holidays distort results.
- **Single metric obsession.** Conversion ups but average order value craters. Net loss.
- **No guardrail metrics.** Testing for one outcome, missing damage to others.
- **Documentation gap.** Wins captured, losses forgotten. Same hypothesis re-tested 3 times.
- **Treating each test in isolation.** Compounding learning across tests is where CRO programs really win.

---

## Output format

Default output: a markdown test plan at `cro-test-[hypothesis-slug].md` per test. After the test runs, append the results section.

Structure:

```markdown
# Test: [Hypothesis short name]

## Hypothesis
Because [observation], we believe that [change] will produce [outcome] for [segment], because [reason].

## Audit evidence
[What evidence supports this hypothesis]

## Test design
- Primary metric:
- Guardrail metrics:
- Sample size required:
- Duration: minimum X, maximum Y
- Variant traffic split:
- Segments to analyze:

## Decision criteria
- Ship if: [conditions]
- Kill if: [conditions]
- Extend if: [conditions]

## Results (filled after test)
- Sample reached:
- Duration actual:
- Primary metric: [variant vs control + significance]
- Guardrail metrics: [results]
- Segment analysis: [findings]

## Decision
[Ship / Kill / Extend / Iterate] - [Why]

## Lesson
[What this teaches us, regardless of outcome]
```

---

## Reference files

- `references/hypothesis-library.md` - Common high-impact hypothesis patterns by funnel stage.
