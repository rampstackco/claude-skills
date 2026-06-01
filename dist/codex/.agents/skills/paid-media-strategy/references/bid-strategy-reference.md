# Bid strategy reference

Each major bid strategy with definition, fit criteria, common mistakes, and the migration path as data accumulates.

The decision shape. Bid strategy depends on data state. New campaigns need a different strategy than mature ones. Switching too often resets the learning phase and wastes the data you just gathered. Pick the strategy that fits the current data state, run it long enough to gather signal, then promote.

---

## Manual CPC or CPM

**Definition.** Set a max cost per click or cost per thousand impressions. The platform charges no more than the cap.

**When to use.** Diagnostics. Very early campaigns with no data history. Niche audiences where the platform's machine learning would over-broaden. Branded keyword campaigns where you want explicit cost control.

**When not to use.** Most production campaigns at scale. Manual scales slowly because every adjustment requires a human decision; automated strategies optimize across thousands of micro-decisions per hour.

**Common mistakes.** Setting CPC caps below the auction floor (the campaign delivers nothing). Switching from manual to automated too early before there is enough data for the automated strategy to optimize against.

---

## Maximize Conversions

**Definition.** Platform optimizes for conversion volume within the budget. The platform decides CPC.

**When to use.** Early-stage campaigns where you want as many conversions as possible regardless of unit cost. Good for gathering the conversion data needed to graduate to tCPA later. Good for awareness or list-building campaigns where volume matters more than per-unit cost.

**When not to use.** Once CAC is the binding constraint. Maximize Conversions does not respect CAC; it just optimizes for count.

**Common mistakes.** Running Maximize Conversions for too long when CAC is creeping up. Set a cadence to evaluate the migration to tCPA once you have 30+ conversions in the recent window.

---

## Target CPA (tCPA)

**Definition.** Set a max CPA. Platform delivers conversions within the target.

**When to use.** Once you have 30+ conversions in the recent 30 day window for the platform to optimize against. Use when CPA is the constraint and you have enough data for the platform's machine learning to converge.

**When not to use.** Before you have enough conversion data. The platform cannot optimize tCPA without enough signal; it will either underdeliver or learn against noise.

**Common mistakes.** Setting tCPA below the prior 30-day actual CPA (platform throttles delivery to almost zero). Setting tCPA too aggressive in a thin-data campaign (same effect; throttled delivery and no learning). Switching tCPA targets every week (each change resets the learning phase). Set the target reasonably (within 15% of recent actual) and let it run.

---

## Target ROAS (tROAS)

**Definition.** Set a min ROAS. Platform delivers conversions above the target.

**When to use.** When revenue per conversion varies substantially (e-commerce with mixed AOV, marketplaces with mixed take rates). Once you have 50+ conversions and conversion-value tracking is wired in.

**When not to use.** Before conversion-value tracking is reliable. Without conversion values, tROAS has nothing to optimize against and falls back to behavior similar to Maximize Conversions but with throttled delivery.

**Common mistakes.** Setting tROAS too aggressively (platform delivers almost nothing). Not feeding accurate conversion values (the platform optimizes for the wrong number). Switching tROAS targets too often.

---

## Maximum Conversion Value

**Definition.** Like Maximize Conversions, but the platform optimizes for total conversion value rather than count.

**When to use.** Same conditions as tROAS, but without a fixed target. Good when you want to maximize revenue within budget without specifying the per-unit ROAS floor.

**When not to use.** Without conversion-value tracking. Without volume confidence; same as tROAS, the platform needs enough conversions to optimize against value.

**Common mistakes.** Running without conversion values configured (the platform falls back to count). Treating it identically to Maximize Conversions; the value optimization changes which conversions the platform finds.

---

## Enhanced CPC

**Definition.** Manual CPC with platform adjustments based on conversion likelihood.

**When to use.** Rarely. The hybrid muddies the signal. If you want manual control, run pure manual CPC. If you want automation, graduate to Maximize Conversions or tCPA.

**When not to use.** Most situations. The hybrid is a transitional state from a previous platform default; modern campaigns should pick a clear strategy.

**Common mistakes.** Treating Enhanced CPC as the safe default. It is neither full control nor full automation; the worst of both.

---

## The migration path

The progression for a new campaign as data accumulates.

| Data state | Strategy | Rationale |
|---|---|---|
| Day 1 to ~30 conversions | Manual CPC or Maximize Conversions | Gather data. Platform machine learning has nothing to optimize against yet. |
| 30 to 100 conversions | Target CPA | Platform has enough signal to optimize against a CPA target. Set within 15% of recent actual. |
| 100+ conversions, value tracking on | Target ROAS or Max Conversion Value | Optimize for revenue or ROAS rather than count. |
| Mature campaign at scale | Whichever produces best CAC + ROAS | Stay there. Switching strategies on a mature campaign restarts the learning phase. |

The migration cadence. Evaluate the migration after every 30 days or every 50% conversion volume increase, whichever comes first. Do not switch every week; the learning phase reset cost is real.

---

## When to NOT switch strategy

Three signals that suggest staying on the current strategy even when something else looks better.

1. **Recent change.** If you switched strategy in the last 14 days, give it more time. The learning phase needs at least 2 weeks of consistent volume to converge.
2. **Volatile conversion volume.** If conversion volume is bouncing 50%+ week-over-week, the platform's optimization signal is noisy. Stabilize volume before switching.
3. **Active creative test.** If you are mid-test on creative or audience, do not also change bid strategy. One variable at a time. The bid strategy change muddies the creative test signal.

The rule. Switch strategy when one variable is stable and the data state has clearly progressed. Avoid stacking changes; you cannot tell which change drove the result.
