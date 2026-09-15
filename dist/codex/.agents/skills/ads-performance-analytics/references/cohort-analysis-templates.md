# Cohort analysis templates

Three cohort cuts that matter for paid media. By acquisition month, by channel, by campaign. Plus retention curves and when to act.

The principle. Daily metrics tell you what happened today. Cohort analysis tells you whether today's customers are different from last month's. The difference is the leading indicator that a channel or campaign is degrading; daily metrics catch the same problem two to three months later when it shows up in revenue.

---

## Template 1: Cohort by acquisition month

The standard rolling 12-month view of LTV growth.

**Setup.** For each acquisition month over the last 12 months, compute the cumulative revenue per customer at month 1, month 3, month 6, and month 12 (where data is available).

**Output.**

| Acquisition month | M1 revenue/customer | M3 revenue/customer | M6 revenue/customer | M12 revenue/customer |
|---|---|---|---|---|
| 2025-05 | $42 | $86 | $128 | $185 |
| 2025-06 | $44 | $89 | $135 | $192 |
| 2025-07 | $40 | $82 | $122 | $178 |
| 2025-08 | $43 | $85 | $130 | (incomplete) |
| 2025-09 | $38 | $78 | (incomplete) | (incomplete) |
| 2025-10 | $35 | $72 | (incomplete) | (incomplete) |
| 2025-11 | $33 | $68 | (incomplete) | (incomplete) |
| 2025-12 | $34 | (incomplete) | (incomplete) | (incomplete) |

**The signal.** The M3 revenue per customer dropped from $86 to $68 over six months. Recent acquisitions are lower-quality customers. The daily metrics will show this as ROAS deterioration in two to three months when the recent cohorts hit their declining LTV plateau.

**Action.** Investigate which channels or campaigns shifted in the last six months. The drop usually correlates with a specific channel scaling into lower-quality audiences.

---

## Template 2: Cohort by acquisition channel

The channel-level LTV story that ROAS hides.

**Setup.** For each channel, compute LTV at fixed time windows (30, 60, 90, 180, 365 days post-acquisition). Track the trend over multiple acquisition cohorts.

**Output (cohort: 2025-Q3 acquisitions, measured at 90 days post-acquisition).**

| Channel | New customers | CAC | 90-day revenue/customer | 90-day LTV/CAC | Verdict |
|---|---|---|---|---|---|
| Google brand search | 420 | $45 | $128 | 2.8x | Strong |
| Google generic search | 280 | $95 | $112 | 1.2x | Marginal |
| Meta prospecting | 540 | $72 | $84 | 1.2x | Marginal |
| Meta retargeting | 320 | $48 | $156 | 3.3x | Strong |
| LinkedIn Sponsored | 95 | $320 | $580 | 1.8x | Long payback; B2B-typical |
| TikTok In-Feed | 180 | $58 | $61 | 1.1x | Marginal |
| Direct (organic) | 1,200 | n/a | $145 | n/a | Reference baseline |

**The signal.** Meta retargeting and Google brand search are the strong performers on LTV-CAC. Meta prospecting and TikTok In-Feed are marginal; the customer quality is lower than the platform-reported ROAS suggests.

**Action.** The marginal channels need either CAC reduction or audience-quality improvement. Pulling back on the marginal channels and reallocating to the strong ones improves blended LTV-CAC.

---

## Template 3: Cohort by acquisition campaign

Campaign-level cohort signals. Use sparingly; sample sizes get small fast.

**Setup.** For each campaign with sufficient acquisition volume (typically 100+ customers per cohort), compute LTV at 30 and 60 days. Compare against the channel average.

**Output.**

| Campaign | New customers | CAC | 60-day revenue/customer | vs channel average |
|---|---|---|---|---|
| Meta-Lookalike-1pct | 320 | $58 | $112 | +30% |
| Meta-Lookalike-5pct | 180 | $48 | $74 | -15% |
| Meta-Interest-SaaS | 90 | $72 | $86 | -5% |
| Meta-Retargeting-30day | 240 | $42 | $148 | +60% |

**The signal.** The 5% lookalike is finding lower-quality customers than the 1% lookalike, even at lower CAC. The ROAS view favors the 5% lookalike (lower CAC, decent revenue); the cohort view shows the customer quality dropped.

**Action.** Pull back the 5% lookalike. Concentrate spend on the 1% lookalike and the retargeting segments. Watch for next-cohort confirmation before a permanent reallocation.

---

## Retention curves

A retention curve plots customer activity over time. Three patterns to recognize.

**Plateau curve.** Activity drops in the first 30 days, then stabilizes at a level it sustains long-term. The plateau height is the long-run user value. Healthy SaaS, subscription consumer, marketplace.

**Smile curve.** Activity drops, plateaus, then trends upward (resurrection effect). Less common; characteristic of products with seasonal or lifecycle re-engagement.

**Decay curve.** Activity drops continuously without stabilizing. The product is not retaining; the unit economics will not work no matter what CAC the channel produces. Common in low-engagement consumer apps.

**The curve to watch by acquisition channel.** A channel whose retention curve plateaus higher than another is delivering higher-LTV customers, regardless of the CAC ratio. This is the data behind LTV-CAC channel comparisons.

---

## When to act on cohort signals

Three triggers.

1. **Two consecutive months of LTV decline at the same time horizon.** A single month is noise; two is signal. Investigate which channels shifted.
2. **Channel-level LTV-CAC ratio falls below 2x for two consecutive cohorts.** Pause or reallocate the channel. The 2x threshold accounts for gross margin, payback period, and the variance in LTV measurement.
3. **A campaign-level cohort underperforms the channel average by 20%+ for two consecutive cohorts.** The campaign is bringing in lower-quality audiences than the rest of the channel. Pause or reallocate.

The discipline. Watch cohort signals on a monthly cadence. Most teams over-index on weekly platform metrics and under-index on cohort signals; the cohort-watchers see the problems first.

---

## Common cohort mistakes

**Reading recent cohorts as final.** A 30-day cohort's "LTV" is actually 30-day revenue, not LTV. Naming matters. If the team treats 30-day revenue as LTV in spreadsheets, they will undercount channels with longer payback periods.

**Comparing cohorts at different ages.** A January cohort measured at 12 months vs a November cohort measured at 2 months is comparing different things. Always compare at matched ages.

**Ignoring seasonal cohorts.** Q4 cohorts often have higher first-purchase value but lower retention because Q4 acquisition includes one-time gifters. Account for the seasonal pattern; do not over-index on Q4 cohort numbers.

**Not segmenting by channel.** Aggregate LTV trends hide channel-level shifts. The channel-segmented cohort is where the action signal lives.
