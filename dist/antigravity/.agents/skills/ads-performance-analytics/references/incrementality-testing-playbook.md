# Incrementality testing playbook

The honest test in paid media analytics. If we had not run this ad, would we still have gotten the conversion? The answer above zero is the incremental contribution.

The principle. Most paid media is not 100% incremental. Branded search bidding is often 5 to 20% incremental. Retargeting is often 20 to 40% incremental. Prospecting is often 50 to 90% incremental. The number that matters for spend decisions is the incremental rate, not the platform-reported attribution rate.

---

## Method 1: Geo holdout

The cleanest causal test for paid media at scale.

**Setup.** Pick two regions with similar baseline conversion rates and demographic profiles (matched markets). Run the campaign in one region (test); turn it off in the other (holdout).

**Duration.** Two to four weeks minimum. Statistical power calculation upfront determines the right length given the spend scale and expected lift.

**Analysis.** Compare conversions in test vs holdout, normalized by population. The difference is the incremental contribution.

**Expected incremental rate ranges.**

| Channel | Typical incremental rate |
|---|---|
| Branded search | 5 to 20% |
| Retargeting | 20 to 40% |
| Lookalike audiences | 40 to 70% |
| Cold prospecting | 50 to 90% |
| Awareness video | 30 to 60% |

**Common pitfalls.**

- Picking holdout regions with confounding factors (different competitive presence, weather event, retail launch). Confounded results are worse than no test.
- Stopping the test early when the data looks good. Pre-commit the duration and stick to it.
- Holding out for too long. A 6-week holdout in a small region is expensive in lost conversions; 2 to 4 weeks is usually enough at scale.

---

## Method 2: Ghost bidding (Google)

Google's own incrementality tool. The platform bids on a holdout share of impressions but does not actually serve the ad. The reported delta between served and ghost is incremental.

**Setup.** Configure within Google Ads. Choose the campaigns and the holdout share (typically 5 to 20%).

**Duration.** Two to four weeks.

**Analysis.** Google reports incremental conversions directly. Cross-validate against your own warehouse measurement.

**Pitfalls.**

- The math is opaque to many teams. The output is a single incremental number; the underlying methodology is Google's. Trust but verify with a manual geo test on the same campaign.
- Only available within Google Ads, not cross-channel.

---

## Method 3: Conversion lift studies (Meta)

Meta's incrementality tool. Splits audiences into test (sees the ad) and control (does not). Measures lift.

**Setup.** Configure within Meta Ads Manager. Specify the campaign and the test-control split.

**Duration.** Three to four weeks. Meta requires a minimum spend per study.

**Analysis.** Meta reports incremental lift. The reporting includes statistical significance bands.

**Pitfalls.**

- The minimum spend requirement makes it expensive for small accounts.
- Only available within Meta, not cross-channel.
- Meta's interpretation tilts toward generous (their incentive). Cross-validate with geo holdout when possible.

---

## Method 4: PSA tests

Serve some users a public service announcement instead of your ad. Compare conversion rates.

**Setup.** Run two parallel campaigns: one with your ad, one with a PSA (typically a charity or public-interest message). Match audiences.

**Duration.** Three to six weeks.

**Analysis.** Compare conversion rate of the PSA-exposed audience against the ad-exposed audience. The difference is incremental.

**Pitfalls.**

- Ethically and brand-wise, choose PSAs that align with brand values.
- Setup overhead is high. Reserved for legacy brands with deep budgets and serious incrementality questions.

---

## Method 5: Switchback designs

Alternate weeks of campaign on and off. Compare on-weeks to off-weeks.

**Setup.** Run for at least 8 weeks. Alternate weekly: on, off, on, off. Or alternate by audience segment.

**Duration.** Eight to twelve weeks. Shorter switchbacks have low statistical power.

**Analysis.** Difference in conversions between on-weeks and off-weeks, normalized for week-of-year and external variance.

**Pitfalls.**

- Confounded by exogenous factors (news, competitor activity, seasonality). Best for steady-state campaigns where the external context is stable.
- Audience contamination: users who saw the ad in week 1 may convert in week 2 even when the campaign is off. The contamination dilutes the measured incremental rate.

---

## Choosing the right method

| Constraint | Recommended method |
|---|---|
| Single platform, want quick answer | Platform-native (ghost bidding for Google, conversion lift for Meta) |
| Cross-platform incremental test | Geo holdout |
| Small account, limited budget | Geo holdout in two small matched markets |
| Long campaign cycle, steady-state | Switchback |
| Brand or awareness channel | PSA test or geo holdout |
| Regulated industry, ethics concern | Geo holdout (no PSA) |

The default. Geo holdout. It is the most honest causal test, works cross-channel, and produces results that are interpretable without trusting the platform's methodology.

---

## How to run a geo holdout step by step

1. **Pick matched markets.** Use designated market areas (DMAs) or postal-code-level regions with similar baseline conversion rates and demographic profiles. Aim for at least three test and three holdout regions for statistical power.
2. **Calculate statistical power.** Given the expected lift and the regional conversion volume, can the test detect the effect? If the regions are too small, the test is underpowered and inconclusive results are likely.
3. **Pre-commit the analysis window.** Define the start date and end date before the test begins. Do not adjust based on early results.
4. **Run the test.** Campaign on in test regions; off in holdout. No mid-test changes.
5. **Wait for the full window.** Analyzing early produces noise.
6. **Compute the delta.** Conversions in test minus conversions in holdout, normalized by population. The delta divided by spend is the incremental CPA. Compare against the platform-reported CPA; the gap is the over-attribution.
7. **Report incremental contribution.** Do not report platform-reported CAC alongside warehouse CAC and incremental CAC without labeling. The unit of measurement matters as much as the number.

---

## Cadence

For accounts spending $25K+ per month, run incrementality tests at least quarterly on the highest-spend channels. The cost of the test is small relative to the cost of running un-incremental spend at scale.

For accounts under $25K per month, annual or semi-annual tests are typically enough. The test cost vs the spend savings does not pencil out as often.

The discipline. Schedule the tests. Do not wait for a "we should test this" moment; the moment never comes voluntarily.
