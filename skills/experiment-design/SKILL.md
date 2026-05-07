---
name: experiment-design
description: A discipline for designing experiments (A/B tests, multivariate, holdouts) so the results actually answer the question you asked. Hypothesis writing, sample size, duration, segment analysis, interpretation, decision-making, and the common failure modes that produce confidently wrong shipping decisions.
category: product
catalog_summary: "Hypothesis to decision: sample size, duration, segment analysis, interpretation, and the failure modes that produce wrong shipping calls"
display_order: 4
---

# Experiment Design

A senior product manager's playbook for running experiments that produce trustworthy decisions.

The default state of experimentation in most companies is sloppy. PMs run tests against vague hypotheses, look at results too early, ignore guardrails, stratify into noise, and ship features whose lift is mostly measurement error. The cost is real: ship the wrong thing, kill the right thing, learn the wrong lesson, repeat.

This skill is the discipline that prevents most of those mistakes. It assumes you have a working experimentation platform (Statsig, PostHog, GrowthBook, Optimizely, Amplitude, Eppo, Kameleoon; the platform does not matter for the principles). It assumes you have product-design and engineering pipelines that can deliver real treatment changes. The hard part is the thinking, and that is what is here.

When to use this skill: any time you are about to design or interpret an experiment. Read the relevant section before you start, not after the test is running.

---

## What this skill covers

The skill spans the full experiment lifecycle. Pre-experiment readiness (is this thing even worth testing). Hypothesis design (cause, effect, magnitude, mechanism). Sample size and minimum detectable effect (do you have enough traffic to learn anything). Duration (how long is long enough, when does the cycle bias the result). Running discipline (no peeking, guardrails, sequential testing). Interpretation (the three buckets and the inconclusive case). Decision-making (matching the result to a pre-committed rule).

The skill does not cover feature flag operational mechanics; those live in the `feature-flagging` skill, which handles flag taxonomy, environment management, and stale-flag cleanup as a separate discipline. The skill does not cover statistical analysis depth; for delta methods, variance reduction techniques like CUPED, and Bayesian alternatives, see the `experimentation-analytics` skill. The skill does not cover platform-specific tooling; for MCP commands, auth models, and platform-specific configuration, consult the chosen platform's official documentation. This skill produces the experiment design; the platform implements it.

For the orchestration layer above (which experiments to run, in what order, with what cadence), see the forthcoming `experimentation-platform-orchestrator` skill. That skill schedules; this skill designs.

---

## The framework: 12 considerations for trustworthy experiment results

A defensible experiment design sits at the intersection of twelve considerations. Each is covered in detail in its own section below.

1. **Hypothesis discipline.** Cause, effect, magnitude, and mechanism. The hypothesis names what is being tested, what should move, by how much, and why.
2. **Sample size and minimum detectable effect (MDE).** Whether the test has enough traffic to detect the effect at the chosen power. Refuse to run underpowered tests.
3. **Test duration.** Longer of the sample-size-hit duration and a full weekly cycle. UI/UX changes need at least 14 days regardless.
4. **What NOT to A/B test.** UX bugs, legal-required changes, brand-philosophy questions, decisions already made, designs whose randomization cannot be clean.
5. **Segment analysis.** Pre-registered segments are evidence; post-hoc segments are noise mining. The multiple comparisons problem is real.
6. **Interaction effects.** Concurrent tests on the same surface can interfere. Mutex enforcement or coordination required.
7. **Ratio metrics and variance estimation.** Naive variance estimators on ratios understate uncertainty. Confirm the platform uses a ratio-aware estimator.
8. **Network effects and two-sided markets.** Treatment can leak into control via interference. Cluster randomization, switchback, or geographic isolation when needed.
9. **Sequential testing and the peeking problem.** Daily peeking inflates false positive rates. Use sequential testing methods when available; pre-commit otherwise.
10. **Pre-commitment vs p-hacking.** Write down the primary metric, MDE, duration, segments, and decision rule before launch. Apply mechanically when results come in.
11. **Reading results and making the call.** Three buckets: clear win, clear loss, inconclusive. The inconclusive bucket exists for a reason; resist the pull to ship anyway.
12. **Common failures and fixes.** A short rapid-fire pattern catalog, expanded in [`references/common-failures.md`](references/common-failures.md).

The sections below cover each consideration in turn. Read the relevant section before running the experiment, not after.

---

## Hypothesis discipline

The most important section in the skill. Most experiment failures trace back to a vague hypothesis.

A real hypothesis has four parts: cause, effect, magnitude, mechanism. Cause is the change you are making. Effect is the metric you expect to move. Magnitude is how much you expect it to move and from what baseline. Mechanism is why you expect this change to produce this effect.

Bad hypothesis, common shape: "We think the new pricing page will increase conversions." What is wrong with it: no magnitude (how much), no mechanism (why), and the metric is "conversions" rather than a specific event with a clear definition. The team will run this test, look at the result, and argue about what counts as a win. Pre-commitment is impossible because nothing was committed.

Good hypothesis, same domain: "Replacing the three-tier pricing comparison with a single recommended tier will increase signup-to-paid conversion by 8 percent (currently 12 percent, target 13 percent) by reducing decision friction for users who already know they want to subscribe." Cause is the tier replacement. Effect is signup-to-paid conversion, defined as the user reaches the paywall and completes payment within seven days. Magnitude is 8 percent relative lift, taking the rate from 12 to 13 percent absolute. Mechanism is decision friction reduction. Now the team has something to test, a number to hit, and a story to falsify.

Primary metric vs guardrails. The primary metric is the thing you are trying to move. Guardrails are the things that must not break: revenue, retention, support ticket volume, page load time, error rates. Pick exactly one primary metric. Pick three to five guardrails. Multiple primary metrics destroy the discipline because they let you cherry-pick the favorable one when results come in.

Falsifiability test. Before launching the experiment, write down what would make you NOT ship this. If the answer is "nothing, we are committed to the change regardless," the hypothesis is not real and the experiment is theater. Skip the test, save the engineering time, and just ship the change.

Directional vs magnitude distinction. Knowing the change moves the needle is different from knowing it moves the needle enough to matter. A 0.3 percent absolute lift on signup conversion may be statistically significant with enough traffic and still not justify the engineering cost of maintaining the change. Magnitude matters as much as direction; the hypothesis names the magnitude that would justify shipping.

For templates and worked examples across common metric types, see [`references/hypothesis-templates.md`](references/hypothesis-templates.md).

---

## Sample size and minimum detectable effect

Sample size grows with the inverse square of the effect you want to detect. Detecting a 1 percent lift requires roughly one hundred times the sample needed to detect a 10 percent lift. Most PMs underestimate this.

The basic decision rule: if your minimum detectable effect (MDE) at current traffic and a reasonable test duration is greater than 5 percent absolute lift, you probably need a bigger MDE. Tiny changes that need huge samples to detect are usually not worth shipping anyway. The change is small either because the underlying mechanism is weak or because the implementation is timid. A weak mechanism is not worth a launch. A timid implementation should be made bolder before testing.

The "we do not have enough traffic" trap. Real for very small products. Lazy for everyone else. If you have ten thousand users a week and you are trying to detect a half-percent absolute lift, you are not running an experiment, you are sampling noise. Pick changes whose expected effect is large enough to detect at your traffic level. If the change is genuinely small, ship it without a test (small upside, small downside, low cost) or do not ship it at all.

Power. The test's ability to detect an effect that is actually present. The conventional floor is 80 percent. Below that, you are rolling dice; the test will frequently miss real effects. Higher power costs more sample. Most platforms default to 80; if you change it, document why.

One-sided vs two-sided. Most PM tests are two-sided despite the temptation to claim otherwise. A one-sided test says "I only care about the positive direction; if the change makes things worse, I do not need to detect it." That is rarely true. If the new pricing page tanks conversion, you want to know. Default to two-sided. If you genuinely want one-sided, document the asymmetry before running.

For pre-calculated sample size tables across common conversion rate baselines and MDEs, see [`references/sample-size-tables.md`](references/sample-size-tables.md). The tables are starting points, not substitutes for running the math against your specific traffic and metric.

---

## Test duration

Minimum duration is the longer of two constraints. Constraint one: the sample size hits the calculated requirement. Constraint two: the test runs at least one full weekly cycle. Testing only Monday through Wednesday misses weekend behavior, which on most consumer products differs meaningfully from weekday behavior.

Novelty effects. New things attract attention. The first few days of a winning test often overstate the lift. Users notice the change, click it, and produce a temporary effect that fades as the novelty wears off. Run long enough to see if the lift survives the novelty period. Two weeks is the conventional minimum for any UI/UX experiment, even if the sample size hits faster.

Primacy effects. The opposite problem. Existing users may resist the change in week one and adapt by week three. Common in UI rearrangement tests. Killing the test in week one because the result looks negative misses the point that primacy is bigger than the underlying effect at that timescale.

Holdout periods. If the experiment changes a permanent feature (notification frequency, default settings, search ranking), keep a holdout group OFF the new behavior for at least a month after launch. The holdout measures long-term effect, not just the day-1 lift. Long-term effects are often different from short-term effects: a notification change that increases day-1 engagement may decrease month-three retention.

Maximum duration. Usually four to six weeks. Beyond that, the world changes around the test. Seasonality shifts. Marketing campaigns launch. The product evolves. The comparison between treatment and control stops being clean because the underlying user population is no longer comparable across the test window. If the test needs to run longer than six weeks to hit power, the MDE is probably wrong; the change is too small to detect cleanly.

---

## What NOT to A/B test

This is a section many discussions of experimentation skip. Worth being direct about.

UX bug fixes. If the current behavior is objectively broken (button does not work, copy says the wrong thing, accessibility fails), fix it. A/B testing it is theater. The right answer is not "let's see if our users prefer a working button"; the right answer is to ship the working button.

Legal-required changes. GDPR consent flows, accessibility compliance, regulatory disclaimers. Ship them. The lift is irrelevant; the compliance is the point. A/B testing whether to comply with the law is not a serious question.

Strategic or philosophical brand questions. "Should our voice be playful or serious?" is not an A/B test question; it is a brand strategy question that needs to be made by humans with context, weighed against brand equity, audience expectation, and long-term positioning. Picking the variant with the higher click-through rate does not answer it because click-through rate was not the brand decision. Use the experiment data as one input to the brand decision, not as the decision itself.

Things you have already decided. If leadership has committed to a direction regardless of test result, do not run an experiment. A/B testing as theater (running tests where the outcome does not change the decision) corrodes trust in the experimentation discipline overall. Other PMs see the test, see the result ignored, and conclude that experiment results do not matter at this company. Then they stop pre-committing. Then the discipline collapses.

Things where the test design is impossible. Cross-device experiences, network effects, internal tooling for a ten-person ops team, anything where the sample size is fundamentally too small or the randomization is fundamentally contaminated. Sometimes the right answer is qualitative research, longitudinal cohort analysis, or just shipping and watching. An experiment that cannot be designed cleanly will not produce a clean answer.

---

## Segment analysis

Pre-registered segments versus post-hoc segments. Declaring before the test runs that "we will look at the result for new users versus returning users" is fine. Discovering after the test that "users from California who signed up on Tuesdays via mobile" had a huge lift is almost always noise mining.

The multiple comparisons problem. Every additional segment you analyze increases the probability of finding a "significant" result by chance. With twenty independent segments at p equals 0.05, you expect one false positive purely by chance. With fifty segments, two or three. Do not analyze fifty segments and report the one that hit significance.

When stratification helps versus misleads. Stratification is useful when three things are true. The segment was pre-registered. There is a real prior reason to expect different behavior in this segment. There is enough sample within the segment to detect the effect at the chosen power. If any of the three is missing, stratification is noise mining. The default posture should be: report the overall result. Report pre-registered segments as additional context. Do not report unplanned segments.

The "weighted average" reframe. If a treatment is positive for one segment and negative for another, the right question is "what is the weighted average effect across the population we will actually ship to" not "let's just ship to the segment where it works." Shipping to a segment usually requires UI complexity, audience targeting infrastructure, and ongoing maintenance that the segment-specific lift does not justify. The bias against segment-specific shipping is healthy.

---

## Interaction effects

The classic problem: you are running five concurrent A/B tests on the checkout flow. Each test individually shows a small lift. Together, the combinations may not multiply cleanly. They may not even sum cleanly. They may interfere in ways the individual tests cannot reveal.

Pre-experiment hygiene. Before launching a new experiment, check what other experiments are running on the same surface. Ask the other PM owners. Coordinate on which tests are mutually exclusive and which can overlap.

Mutex (mutually exclusive) experiment groups. Most platforms support exclusion rules so users in test A are not also in test B. Use them when interactions are likely. The cost is sample size; the benefit is interpretable results. For a small set of high-stakes tests, mutex is the right call. For dozens of lower-stakes tests, full mutex is impractical; coordinate and document overlap instead.

The "we will analyze it later" fallacy. Post-hoc detangling of overlapping experiments is hard, expensive, and usually inconclusive. The factorial design that would isolate interaction effects requires sample sizes most products do not have. Coordinate up front rather than untangle afterwards.

---

## Ratio metrics and the delta method

The trap. Conversion rate is a ratio: conversions divided by users. Standard deviation calculations for raw counts do not apply directly to ratios. A naive variance estimate on a ratio metric tends to be too narrow, leading to overstated confidence and false-positive ship decisions.

Why it matters. Many experimentation platforms quietly use the delta method (or bootstrap, or some other ratio-aware estimator) for ratio metrics. If yours does not, your confidence intervals are wrong. Wrong in the direction that matters: you ship things that look significant but are not.

How to check. Ask your platform vendor: "What is your variance estimator for ratio metrics?" If the answer is "standard t-test on proportions," that is wrong for any ratio that is not a simple binary conversion (converted yes or no, with one row per user). If the answer is "delta method" or "bootstrap with re-sampling at the user level" or "linearization with Taylor expansion," that is correct. Other reasonable answers exist; the test is whether the platform team can articulate a ratio-aware estimator at all.

Worked example. Revenue per user is a ratio: total revenue divided by total users. RPU lift estimates that do not use a ratio-aware estimator tend to overstate confidence. A 5 percent reported lift with p equals 0.04 might actually be a 5 percent point estimate with no statistical significance once the variance is computed correctly. Shipping based on the wrong math means shipping changes that do not produce the claimed effect in production.

For deeper coverage of variance reduction (CUPED, stratified sampling, control variates), see the `experimentation-analytics` skill when it ships.

---

## Network effects and two-sided markets

The interference problem. In a two-sided marketplace (Uber, Airbnb, eBay, DoorDash, any platform with buyers and sellers), a treatment for buyers may affect sellers regardless of which group is in the test. A treatment that increases buyer demand changes seller behavior. The "control" buyers, who are competing for the same sellers, see different supply because of treatment buyers' actions. The test no longer measures the treatment effect cleanly; it measures treatment effect plus interference.

Common pattern. Marketplace experiments where the control group is contaminated. The test reports a small effect because half the effect leaked into the control. The team underestimates the true effect, kills a winning idea, and learns the wrong lesson.

Mitigations, none perfect. Cluster randomization assigns whole markets (cities, regions, market segments) to treatment or control rather than individual users. Eliminates within-cluster interference but reduces effective sample size by orders of magnitude. Switchback experiments alternate the entire population between treatment and control across time windows (week 1 treatment, week 2 control, week 3 treatment, etc.). Eliminates cross-user interference but requires careful temporal modeling. Geographic isolation runs the experiment in one city while keeping the rest of the network on the original behavior. Eliminates interference but is expensive and slow.

When to call qualitative. If interference is severe and randomization cannot isolate it, the test will not tell you what you want to know. Switch to user research, longitudinal cohort analysis, or a phased rollout with careful instrumentation. The decision is "do we believe this works enough to invest in the rollout monitoring" rather than "did the lift hit significance."

---

## Sequential testing and the peeking problem

The peeking problem. If you check results every day and stop the test as soon as you see significance, your false positive rate is much higher than the nominal 5 percent. Standard statistical tests assume one analysis at the end of the test. Multiple analyses inflate alpha.

The math. With one analysis, false positive rate is 5 percent (at alpha equals 0.05). With three analyses spread across the test, false positive rate climbs toward 14 percent. With daily peeking on a 28-day test, false positive rate can exceed 30 percent. You will see "significant" results that are not real, ship them, and watch them fail to replicate in production.

Sequential testing methods. Most modern platforms (Statsig, Eppo, parts of PostHog, GrowthBook with mSPRT) support sequential testing that adjusts the math to allow daily peeking without inflating alpha. The methods include sequential probability ratio tests, group sequential designs, and always-valid p-values via mixture sequential probability ratio tests (mSPRT). Use them when the platform offers them. They cost some statistical power in exchange for valid mid-test inference.

Pre-registered stopping rules. If the platform does not support sequential testing, declare the planned analysis date before the test runs. Save the pre-commitment. Do not look at results until that date. If you must look (some platforms make it hard not to), do not make decisions based on what you see. The decision happens at the pre-committed analysis date, not when the early peek looks favorable.

The "ship early because results look great" trap. Results almost always look more dramatic on day 3 than they do at day 14. Regression to the mean kicks in. Novelty fades. The metric stabilizes. The tests that survive the full window and still look great are the ones worth shipping. The ones that "looked great early" and were shipped early are disproportionately the ones that disappointed in production.

---

## Pre-commitment vs p-hacking

The p-hacking inventory. Things people do, often unconsciously, when results do not come out the way they hoped:

- Run additional segments until something hits significance
- Drop "outliers" until the headline result moves
- Switch the primary metric mid-flight
- Extend the test duration "just a bit longer"
- Reframe the hypothesis to match what the data showed
- Combine multiple inconclusive tests into a "directional pattern" that justifies shipping

Each individually feels like a small judgment call. Cumulatively they destroy the discipline. The result is not "we found a real effect"; the result is "we ran enough analytical knobs that something looked significant."

The pre-commitment fix. Before the test runs, write down: the primary metric and how it is computed; the MDE you are powered to detect; the duration in calendar days; the segments you will analyze (if any); the decision rule that maps each possible result to a ship or kill. Save the pre-commitment somewhere with a timestamp. The PR description that ships the experiment configuration. A signed Slack message. A pinned ticket. Anywhere that makes it immutable.

When the results come in, follow the pre-commitment. If the result was clean and you want to ship, file the launch. If the result was bad and you want to kill, kill. If the result was inconclusive, follow the inconclusive resolution path described below; do not invent new analyses.

The "we learned so much" trap. If the test ran and produced an inconclusive result, the answer is "inconclusive." Not "we learned that the underlying mechanism is more nuanced than expected" or "we discovered a fascinating segment dynamic." Inconclusive is inconclusive. The lesson, if there is one, is for the next hypothesis, not retrofitted onto this one.

---

## Reading results and making the call

Three buckets. Clear win: ship. Clear loss: kill. Inconclusive: the hardest case.

Inconclusive resolution paths, ranked from most acceptable to least:

1. Ship anyway because the change is cheap and reversible (defensible only if guardrails are clean and you genuinely have no information that the change is harmful). The bar here is high; "the directional movement was favorable" is not enough.
2. Run a bigger version: more traffic, longer duration, larger MDE if the change can be made bolder. Use the inconclusive result as evidence that the original was underpowered or the effect is smaller than expected.
3. Kill the idea. The most common right answer; the hardest to do because PMs have invested in the hypothesis.
4. Iterate the hypothesis and re-test. Use the inconclusive result to refine the mechanism. The new test is a new test, not a continuation; pre-commit again.

Bayesian thinking layer. If your prior was strong (this should obviously work, given everything we know about user behavior), an inconclusive result should still update your belief somewhat. The prior was wrong, or the effect is smaller than expected, or the implementation was too timid to capture it. If your prior was weak (we genuinely had no idea what would happen), an inconclusive result means inconclusive; the prior was already uncertain and the result did not narrow it.

The hardest version. Positive primary metric, ambiguous guardrail. Revenue went up but support tickets ticked up. Conversion went up but session length went down. Use the pre-committed decision rule. If you did not pre-commit on the guardrail trade-off, default to "do not ship." The guardrails exist because you cared about them before you saw the result. Do not lower the bar after the fact.

For a step-by-step results-reading checklist, see [`references/results-interpretation-checklist.md`](references/results-interpretation-checklist.md).

---

## Common failures and fixes

Rapid-fire reference. Each pattern is described in more detail in [`references/common-failures.md`](references/common-failures.md).

- "We did not have enough traffic" means the MDE was too small. Pick bigger changes worth detecting.
- "The lift disappeared after launch" means the test ran for 5 days and caught a novelty effect. Run longer next time; minimum two weeks for UI changes.
- "It worked for new users but not returning users" means the segment was post-hoc, probably noise. Ship to all or kill, do not ship to the segment.
- "The p-value crept up to 0.04 after 12 days of peeking" means the false-positive rate is much higher than nominal. Pre-commit and use sequential testing.
- "Revenue went up but retention went down" means a guardrail was violated. Do not ship.
- "We cannot replicate the result" means the original was probably noise or platform-bug. Investigate before re-running.
- "Conversion went up but only because of the bot traffic from the new ad campaign" means the result was confounded by an external event. Pause campaigns during sensitive tests, or stratify by acquisition source.
- "We ran the test, it was inconclusive, but the trend was directional so we shipped" means you ignored your own discipline. The inconclusive bucket exists for a reason; do not let directional patterns substitute for evidence.

---

## Reference files

- [`references/hypothesis-templates.md`](references/hypothesis-templates.md). Concrete formats for writing hypotheses that pass the cause-effect-magnitude-mechanism test, with worked examples across conversion, engagement, revenue, retention, and funnel-step metric types.
- [`references/sample-size-tables.md`](references/sample-size-tables.md). Pre-calculated sample size tables for the most common conversion-rate experiments, with how-to-use guidance and the common pitfalls in sample-size planning.
- [`references/common-failures.md`](references/common-failures.md). Fifteen anti-patterns that produce wrong shipping decisions, each with symptom, root cause, fix, and prevention.
- [`references/results-interpretation-checklist.md`](references/results-interpretation-checklist.md). Step-by-step checklist for reading results, the three-bucket decision matrix (win, loss, inconclusive), and the post-launch monitoring discipline.
- [`references/platform-comparison.md`](references/platform-comparison.md). Profiles of the major experimentation platforms (Statsig, PostHog, GrowthBook, Optimizely, Amplitude, Eppo, Kameleoon) with strengths, gotchas, and a decision matrix for choosing.
- [`references/pre-experiment-readiness-checklist.md`](references/pre-experiment-readiness-checklist.md). Ten-item go/no-go checklist run through before launch.
- [`references/post-experiment-decision-framework.md`](references/post-experiment-decision-framework.md). The moment-of-decision framework: confirm pre-commitment, apply rule mechanically, route to ship/kill/inconclusive paths, write the post-mortem within a week.

---

## Closing: when in doubt

Default conservative posture. When results are unclear, do not ship. The cost of a false negative (you did not ship a real win) is usually smaller than the cost of a false positive (you shipped something that does not actually work and now you have to maintain it forever). The maintenance cost compounds; the missed-opportunity cost does not, because you can always test again.

The discipline of experiment design is the discipline of saying "I do not know" out loud when you do not know. Saying it is often the most consequential thing a PM does in a given week. The instinct is to pretend the result is more conclusive than it is, ship to look decisive, and absorb the failure quietly when the change does not work in production. The discipline is to say "the test was inconclusive, here is what I would change to get a real answer, here is the new test plan." Saying that is professional. Pretending otherwise is theater.

For platform-specific patterns (which platform handles which experiment type best, what the MCP commands look like, where the gotchas live), consult the chosen platform's documentation. For the operational layer below this skill (managing flags, retiring stale ones, coordinating environments), see the `feature-flagging` skill. For the analytical layer above this skill (variance reduction, Bayesian alternatives, sequential testing math), see the `experimentation-analytics` skill.
