# Dashboard reconciliation patterns

The single-source-of-truth pattern for paid media reporting. Warehouse as canonical; platforms as in-flight signals.

The principle. Sum-of-platform-reports is always greater than reality because every platform claims credit for conversions other platforms also touched. Reporting platform-summed numbers as fact in board decks is the most expensive error in paid media analytics.

---

## The three-layer reporting model

**Layer 1: platform metrics.** Use for in-flight optimization only. Ad-set-level CAC, creative-level CTR, audience-level frequency. The platform's view of its own performance is fine for optimizing the platform's own levers.

**Layer 2: warehouse multi-touch attribution.** Use for cross-platform comparison and channel-level decisions. Each conversion gets attributed across all platforms that touched the path. Pick one model (last-click, first-click, linear, U-shaped, DDA) and standardize across the team.

**Layer 3: marketing-mix modeling (MMM) at scale.** Use for budget allocation across channels. MMM treats spend as input and revenue as output; it does not rely on platform-reported attribution at all. The strongest defense against platform self-attribution bias.

The cadence. Layer 1 in real time. Layer 2 weekly. Layer 3 quarterly.

---

## Blended CAC

The board-deck number. Resistant to attribution debates because it does not require choosing an attribution model.

**Formula.**

```
Blended CAC = (total ad spend across platforms) / (total new customers from warehouse)
```

**Worked example.**

In Q4, the team spent $200K total: $80K on Google Ads, $70K on Meta, $30K on LinkedIn, $20K on TikTok. The warehouse shows 1,250 new customers in Q4 from all sources (paid, organic, direct, referral).

But the team needs to attribute the new customers to paid specifically. Two ways to do this:

1. **Approximate.** Assume the proportion of paid-attributed customers in the warehouse roughly equals the proportion that paid contributed to traffic. If 60% of traffic in Q4 was paid-attributed, then 60% of 1,250 equals 750 paid-acquired customers. Blended paid CAC: $200K / 750 = $267.
2. **Precise.** Use the warehouse's multi-touch attribution to credit paid channels with a fraction of each conversion. Sum the paid-attributed share across all conversions; that becomes the denominator.

The precise version is better when available. The approximate version works when the warehouse data is incomplete. Both produce a number that does not double-count across platforms.

---

## The board-deck pattern

Three rules for reporting paid media numbers to leadership.

1. **Lead with blended CAC, not channel CAC.** Channel CAC depends on attribution model; blended CAC does not. Stakeholders not in the weeds on attribution find blended CAC easier to compare across quarters.
2. **Show the range.** Report the conservative view (last-click) and the generous view (linear or DDA) for any high-stakes channel decision. The range tells stakeholders what they are not learning.
3. **Always label the source.** "Meta drove 800 conversions" is unreadable. "Meta drove 800 conversions per Meta's 7-day-click attribution; warehouse-attributed: 540" is honest.

A worked example board slide.

```
Q4 paid media performance

Total spend: $200K (vs $185K Q3, +8%)
New customers from paid (warehouse-attributed): 750 (vs 680 Q3, +10%)
Blended paid CAC: $267 (vs $272 Q3, -2%)

Channel CAC (warehouse-attributed, last-click):
  Google: $240 (40% of new customers)
  Meta: $290 (35% of new customers)
  LinkedIn: $480 (15% of new customers)
  TikTok: $180 (10% of new customers)

Platform-reported CAC (for in-flight context, not board decision):
  Google: $190 (Google reports 26% more attributed conversions than warehouse)
  Meta: $210 (Meta reports 38% more)
  LinkedIn: $475 (roughly aligned)
  TikTok: $135 (TikTok reports 33% more)

Quarterly incrementality test result (geo holdout, October):
  Brand search: 12% incremental (95% CI: 6-18%). Reduced spend 30%; CAC dropped.
  Meta retargeting: 31% incremental (95% CI: 22-40%). Maintained spend; CAC view adjusted.
```

The slide tells the truth: the warehouse number is the canonical CAC, the platform numbers are inflated, the incrementality test confirms which channels are real.

---

## Reconciliation cadence

**Weekly.** Pull platform-reported numbers and warehouse numbers. Confirm the sum-of-platforms vs warehouse ratio is in the expected range. A sudden divergence means a tracking break, an attribution-model change, or a platform reporting bug. Investigate.

**Monthly.** Deeper reconciliation. Compare channel-level attribution across last-click, first-click, and the team's chosen model. Identify channels whose ranking changes by model.

**Quarterly.** Run an incrementality test on the highest-spend channel. Update the channel-level CAC adjustment factor based on the test result.

---

## Common reconciliation mistakes

**Reporting platform-summed conversions to the board.** The most common error. The board sees "1,600 conversions across paid channels" when the warehouse says 950. The team gets caught when someone divides revenue by 1,600 and gets a CAC that does not match the P&L.

**Comparing platforms on platform-reported CAC.** Each platform's CAC is computed against a different attribution window and a different set of self-attribution biases. Compare on warehouse-attributed CAC instead.

**Treating "lift" as incrementality without a controlled test.** A campaign that ran during a period of overall conversion growth gets credit for "lift" that was actually seasonality or organic momentum. Lift requires a control group; otherwise it is correlation reported as causation.

**Updating attribution models mid-quarter.** Switching from last-click to DDA mid-quarter makes the quarter's data uninterpretable. Pick a model for the quarter; switch only at quarter boundaries with a documented changelog.

**Reporting blended CAC without naming the time window.** "$267 blended CAC" depends on whether you measured over 30, 60, or 90 days. Pin the window.

---

## When the platforms agree more than usual

A useful diagnostic. If platform-reported sums match warehouse total within 10%, something has changed. Possibilities:

- The team set up Conversions API on Meta or server-side tagging on Google, which improved tracking precision.
- The mix shifted toward branded search, where attribution overlap is lower.
- One platform's conversion volume dropped significantly (saturation, fatigue, or campaign issue).

Investigate any sudden alignment. The platforms diverging is the normal state; alignment usually has a cause worth understanding.
