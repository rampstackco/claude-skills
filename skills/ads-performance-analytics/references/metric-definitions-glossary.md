# Metric definitions glossary

The paid media metrics that show up on every dashboard, with explicit definitions, formulas, and the common pitfalls in usage.

The point of an explicit glossary. Two teams using the same metric name often compute different numbers. "Conversion rate" might mean clicks-to-conversion or impressions-to-conversion or unique-users-to-conversion. The team that does not pin definitions ends up arguing about numbers that are not the same number.

---

## Volume metrics

**Impressions.** Count of times an ad was displayed. Includes the same user seeing the ad multiple times.

**Reach.** Count of unique users who saw the ad. Always less than or equal to impressions.

**Frequency.** Impressions divided by reach. The average number of times a unique user saw the ad. Above 4 to 5 per week is the fatigue alarm.

**Clicks.** Count of clicks on the ad. Some platforms count "outbound clicks" (which leave the platform) separately from "all clicks" (which include in-platform interactions like saves and shares). Use outbound for direct response.

---

## Cost metrics

**CPC (cost per click).** Spend divided by clicks. Formula: `spend / clicks`. The cost of one click; not the cost of one conversion. Conflating them is the most common reporting error.

**CPM (cost per thousand impressions).** Spend divided by (impressions / 1000). Formula: `spend / (impressions / 1000)`. The cost of reach. Useful for comparing platforms on awareness efficiency.

**CPA (cost per acquisition).** Spend divided by conversions. Formula: `spend / conversions`. The variant where "conversion" is defined matters; the same campaign reports different CPAs depending on whether the conversion is a click, a lead form submission, a purchase, or a paid customer.

**ROAS (return on ad spend).** Revenue from ad-attributed conversions divided by spend. Formula: `attributed revenue / spend`. NOT profit-divided-by-spend. ROAS is a revenue metric, not a profit metric. A 3x ROAS at 30% margin is a 0.9x return on cost; the ROAS reading on its own is misleading.

**MER (marketing efficiency ratio).** Total revenue divided by total marketing spend, across all channels. Formula: `total revenue / total marketing spend`. The most honest top-line number; resistant to per-channel attribution debates.

**Blended CAC.** Total ad spend divided by total new customers from warehouse. Formula: `total ad spend / new customers from warehouse`. The board-deck number. Channel-level CAC depends on attribution; blended CAC does not.

---

## Conversion metrics

**Conversion.** The event the campaign optimizes for. Definition varies. Always document: which event, what window, which attribution model. Without these three, "conversions = 800" is unreadable.

**Conversion rate.** Conversions divided by something. The denominator changes the meaning. Click-through conversion rate (`conversions / clicks`) is different from impression conversion rate (`conversions / impressions`) which is different from unique-user conversion rate (`conversions / reach`). Pin the denominator at every report.

**Conversion window.** The maximum time between the ad event (click or view) and the conversion for which the platform takes credit. Meta default: 7-day click plus 1-day view. Google default: 30-day click plus 1-day view. Different windows mean different reported counts from the same activity.

**View-through conversion.** A conversion attributed to an ad the user saw but did not click. Counted by Meta and Google. Often half the platform-reported conversions are view-through. Treat as a soft signal of awareness contribution, not as direct response measurement.

**Modeled conversion.** A statistically estimated conversion when actual tracking is blocked (most commonly iOS users on Meta after ATT). The platform models what the conversion would have been based on aggregated data. Modeled is an estimate, not a measurement; precision is low.

---

## Customer-value metrics

**LTV (lifetime value).** Total revenue from a customer over their relationship with the brand. Many definitions; the right one for paid media analytics is gross revenue or contribution margin, not unit count. Pair with CAC for the LTV:CAC ratio.

**LTV:CAC ratio.** LTV divided by CAC. Formula: `LTV / CAC`. The unit-economics test. 3:1 is the venture-capital benchmark; the right number for any specific business depends on payback period and gross margin.

**Payback period.** Months until cumulative revenue from a customer equals the CAC to acquire them. The cash-flow companion to LTV:CAC. Investors care about payback; operators care about both.

**AOV (average order value).** Revenue divided by order count. Formula: `revenue / orders`. Useful for e-commerce; less for subscription. The number that turns "increased conversion rate" into "increased revenue."

---

## Engagement metrics (less direct)

**CTR (click-through rate).** Clicks divided by impressions. Formula: `clicks / impressions`. Useful for hook quality. Less useful for conversion quality; high CTR with low conversion rate means the hook is too aggressive for the offer.

**Hide ratio (negative feedback).** Count of users who explicitly hid or marked the ad as not-interested, divided by impressions. Above 1.5% is the alarm; the platform algorithm will throttle delivery to that audience.

**Engagement rate.** Likes plus comments plus shares plus saves divided by impressions. Useful for organic-style content; less directly tied to performance for paid.

---

## Common pitfalls

**Treating ROAS as profit.** ROAS is revenue-divided-by-spend. Profit-divided-by-spend is "return on ad investment" or "ROI." Confusing the two leads to greenlit campaigns that lose money on every conversion.

**Ignoring conversion window in cross-platform comparisons.** Meta's 7-day-click count is not comparable to Google's 30-day-click count without normalization.

**Treating frequency as a vanity number.** Frequency above 4 to 5 per week is a fatigue signal. Many teams celebrate high frequency as proof of "audience saturation"; it is the inverse.

**Using CPA when conversion definitions differ across campaigns.** A search campaign with a "lead-form-submission" conversion has a CPA in different units from a display campaign with a "purchase" conversion. Compare campaign-level CPA only when the conversion event matches.

**Confusing modeled conversions with measured conversions.** Modeled is an estimate; measured is a count. Treating the two as interchangeable produces false confidence in the size of the effect.
