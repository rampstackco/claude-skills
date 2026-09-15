# Common failures

Twelve patterns that recur across paid media accounts. For each: name, symptom, root cause, fix, prevention.

---

## 1. Scaling but CAC went up

**Symptom.** You doubled budget on the primary audience. Conversion volume rose less than 2x. CAC drifted up by 20 to 40%.

**Root cause.** Audience saturation on the primary segment. The platform finds the easiest converters first; pushing more spend into the same audience produces diminishing returns at higher cost.

**Fix.** Either expand the audience (broader lookalike, additional interests, geo expansion) or diversify across channels. Do not keep pushing the same audience harder; the marginal CAC will keep climbing.

**Prevention.** Project the saturation curve before scaling. If a 1.5x spend increase doubled CAC over the prior 90 days, expect another 1.5x to push CAC past your threshold. Plan the diversification before the saturation.

---

## 2. Conversions look fine in the platform, terrible in revenue

**Symptom.** Platform reports stable conversion volume and CAC. Revenue per conversion or LTV is dropping.

**Root cause.** Attribution mismatch plus customer-quality drift. The platform optimizes for finding "any conversion." The optimizer drifts toward lower-quality converters because they are easier to find.

**Fix.** Switch from conversion-count optimization to conversion-value optimization (Maximum Conversion Value or tROAS). Feed accurate conversion values into the platform. Tighten audiences toward higher-LTV proxies.

**Prevention.** Track LTV cohorts per channel monthly. If channel-LTV diverges from blended LTV by more than 15%, investigate the cohort quality before defending the channel.

---

## 3. A/B test winner by 5%

**Symptom.** Two variations tested. One wins by 5%. The team wants to ship the winner.

**Root cause.** 5% is within typical platform noise. Across-campaign tests have higher variance than statistical lift implies.

**Fix.** Re-run the test with more volume. Or run it longer. Or accept that the difference is not meaningful and pick the one that is easier to maintain (cheaper to produce, easier to refresh).

**Prevention.** Set the minimum detectable effect (MDE) before testing. If the test cannot detect anything below 10%, do not act on a 5% difference.

---

## 4. Turned off underperformer, total conversions dropped

**Symptom.** A campaign was reading as underperforming. Pause it. Total account conversions drop more than the campaign's reported conversions would suggest.

**Root cause.** View-through or assist conversions you were not counting in the campaign's CAC. The campaign was contributing upper-funnel exposure that drove conversions on other campaigns.

**Fix.** Restart the campaign with a held-out portion of the audience to measure incrementality. Compare the held-out cohort against the exposed cohort over 30 days.

**Prevention.** Run hold-out tests, not flat off-ons. The flat-off causes a discontinuity that is hard to attribute back to the right campaign.

---

## 5. Frequency hit 8 last week

**Symptom.** Frequency report shows 8 impressions per user last week. CTR is dropping.

**Root cause.** Creative fatigue. Audience has seen the creative too many times.

**Fix.** Refresh creative. Rotate in 3 to 5 new variations. Cap frequency explicitly at 4 to 6 per week.

**Prevention.** Set explicit frequency caps at campaign launch. Track frequency weekly. Refresh creative on a 30 to 60 day cadence at scale, weekly for high-frequency campaigns.

---

## 6. Trying to scale Meta from $20K to $100K per day

**Symptom.** Aggressive scale plan. Budget multiplier is 5x in one move.

**Root cause.** That is not scaling. That is a 5x jump that will crash through the audience at the new spend level. Expect efficiency drop of 30 to 50% in the first 14 days.

**Fix.** Phase the increase. 25% per week is a typical safe pace. Larger jumps should pair with audience expansion or new channels to absorb the spend.

**Prevention.** Plan the scale curve before starting. 5x in a month is fine if it is 4 weekly 1.4x increases. 5x in a single move is not fine.

---

## 7. LinkedIn for a B2C product

**Symptom.** Tested LinkedIn for a $40 AOV consumer product. CAC came in at $200.

**Root cause.** Wrong channel for the offer. LinkedIn's floor is set for B2B economics; B2C does not justify it.

**Fix.** Stop. Move budget to Meta, TikTok, or Search.

**Prevention.** Match channel to offer at the strategy stage. Use the channel decision matrix. Do not try platforms because "we should be on LinkedIn"; be on LinkedIn only when the math supports it.

---

## 8. tROAS will not deliver

**Symptom.** Set tROAS at 4.0. Platform delivers almost no impressions.

**Root cause.** tROAS target is too aggressive relative to recent performance. The platform throttles delivery to almost zero rather than deliver below the floor.

**Fix.** Loosen the target to 110 to 115% of the prior 30-day actual ROAS. Let the platform learn at the new target, then incrementally tighten.

**Prevention.** Set tROAS based on actual recent performance, not aspirational targets. Aspirational targets shut off delivery; pragmatic targets keep volume flowing while improving efficiency.

---

## 9. Search Impression Share dropped

**Symptom.** Search Impression Share fell from 70% to 50% over two weeks. Conversions held but you are missing volume.

**Root cause.** Either competition increased (someone else is bidding more aggressively) or budget is constrained (you ran out of daily budget at peak hours).

**Fix.** Check both. Compare auction-insight reports for new entrants. Check the time-of-day spend distribution; if budget runs out at noon, raise the daily cap.

**Prevention.** Track Impression Share weekly. Set alerts on 10%+ week-over-week drops. The signal is leading; conversion drops typically follow within 2 to 3 weeks.

---

## 10. PMax is hard to optimize

**Symptom.** Performance Max is running. CAC is fine. You want to push it harder but cannot find levers.

**Root cause.** PMax is by design a black box. The platform manages placements, audiences, and creative weighting. The levers you have are budget, asset groups, and exclusions.

**Fix.** Treat PMax as a tested channel with constrained levers. Optimize via asset group quality (better creative, more variants), audience signals (Customer Match, in-market lists), and exclusions (branded queries, low-value SKUs).

**Prevention.** Set expectations at launch. PMax is not a place to fine-tune at the keyword level. It is a place to feed strong inputs and let the platform optimize.

---

## 11. Lookalike performance dropped after expansion

**Symptom.** Expanded the lookalike from 1% to 5% to add volume. CAC drifted up.

**Root cause.** Wider lookalikes are looser; the floor is lower. The expansion brought in users less similar to the seed.

**Fix.** Tighten back to 1 to 2% if CAC is the constraint. Or split into two ad sets: the 1% as the workhorse and the 1 to 5% as a separate scale-out audience with its own budget.

**Prevention.** When you need volume, expand horizontally (add a new audience type) rather than vertically (loosen the existing audience). The horizontal expansion preserves the working audience's CAC.

---

## 12. Brand search lift after a Super Bowl-style ad

**Symptom.** Brand search volume jumped after a brand campaign ran. Paid attribution did not credit it.

**Root cause.** Brand effect on existing demand, surfaced in organic and branded paid search rather than the brand campaign's direct-attribution column. The platform's direct response metrics did not capture it.

**Fix.** Track brand-search lift as a separate metric. Define a baseline brand-search rate before the campaign. Measure the lift during and after.

**Prevention.** Plan brand campaigns with brand-search lift as a primary KPI, not direct response. Direct response measurement underrates brand campaigns; using it as the only success metric kills brand investment unfairly.

---

## The pattern across all twelve

Most paid media failures share one root cause: optimizing one number without checking what the optimization did to the system. Scale CAC at the cost of LTV. Pause an underperformer at the cost of total volume. Expand the audience at the cost of the floor. Optimize one platform without checking incrementality.

The fix at the meta level. Decide on the success metric (CAC, ROAS, LTV-adjusted) and the guardrails (volume, frequency, creative quality, customer-cohort quality) before scaling. Audit guardrails monthly. Pull back the moment a guardrail breaks, even if the success metric still looks fine.
