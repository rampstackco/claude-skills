# Upgrade flow anti-patterns

The patterns that look like upgrade flows but degrade trust. Easy to ship; the cost shows up in conversion, retention, and brand reputation.

---

## The paywall-everywhere flow

The pattern. Paywall blocks meaningful product use; free tier too constrained.

The signal. Users churn before reaching value; conversion stays low despite aggressive paywalling.

The cost. Users who would have paid after seeing value never reach it.

The cure. Loosen the free tier; surface paywalls at moments of demonstrated value.

---

## The free-forever-trap flow

The pattern. Generous free tier; no upgrade path surfaces.

The signal. Conversion stays at single-digit indefinitely.

The cost. Product is loved free; revenue does not follow.

The cure. Add value-triggered paywalls. Connect upgrade to demonstrated value.

---

## The premature-paywall flow

The pattern. Paywall on first login or before value is demonstrated.

The signal. High dismiss rate; conversion does not lift.

The cost. Users associate the brand with hard-sell early; some leave entirely.

The cure. Move paywalls to moments of demonstrated value.

---

## The unconnected-paywall flow

The pattern. Paywall not connected to user behavior; appears at random or on every page.

The signal. Visual noise; users develop blindness.

The cost. Cumulative exposure becomes spam; trust degrades.

The cure. Tie each paywall to specific user-demonstrated value.

---

## The plan-paralysis flow

The pattern. 5+ tiers presented in upgrade flow; users cannot decide.

The signal. Click rate on plans is even across tiers; conversion does not match interest.

The cost. Decision paralysis prevents conversion.

The cure. Reduce tier count to 3. Recommend a default plan based on user signals.

---

## The hidden-price flow

The pattern. Prices buried; users have to dig to find them.

The signal. Users abandon at the price-discovery step.

The cost. Friction at the moment of decision; users leave.

The cure. Surface prices clearly. Hidden pricing damages trust.

---

## The decline-ignored flow

The pattern. User dismisses paywall; same paywall fires immediately.

The signal. Users disable tours globally; complain about persistent paywalls.

The cost. Trust degrades; users may churn from the friction itself.

The cure. Respect declines. Wait substantial time before re-asking.

---

## The aggressive-downsell flow

The pattern. User declines primary; multiple decline-and-counter rounds; user feels pressured.

The signal. Users associate the brand with manipulation.

The cost. Even users who eventually convert leave with negative impressions.

The cure. One downsell at most. Respect the second decline.

---

## The bait-and-switch flow

The pattern. User believed feature was free (because of marketing); paywall surfaces when they try to use it.

The signal. Users complain about deception; trust collapses.

The cost. Long-term brand damage.

The cure. Marketing and product align on what is free. No surprise paywalls on advertised-as-free features.

---

## The discount-led-win-back flow

The pattern. Win-back discount-only; no value-prop change.

The signal. Re-engaged users churn again; users learn to lapse for discounts.

The cost. Reverse incentive; lapse rate rises strategically.

The cure. Lead with value-prop change; discount sparingly.

---

## The aggressive-cancellation-prevention flow

The pattern. User wants to cancel; flow makes cancellation hard (multi-step, hidden, support-only).

The signal. Users complain publicly; brand earns "hard to cancel" reputation.

The cost. Long-term trust damage; sometimes regulatory issue.

The cure. Cancellation should be as easy as signup. Friction at exit damages reputation.

---

## The plan-mismatch flow

The pattern. Tier audiences not clearly differentiated; users pick wrong plan.

The signal. Upgrade rate looks fine; downgrade rate climbs as users realize they picked wrong.

The cost. Churn through dissatisfaction.

The cure. Clarify tier audiences. Each plan should have specific audience-fit visible.

---

## The post-upgrade-empty flow

The pattern. User upgrades; nothing changes immediately. New features unlocked but not surfaced.

The signal. Upgraded users do not engage with paid features they paid for.

The cost. Buyer's remorse; downgrade rate climbs.

The cure. Post-upgrade welcome; surface what changed; help users access new features immediately.

---

## The aggressive-upsell flow

The pattern. Customers paying already; upsell asks fire constantly.

The signal. Customer fatigue; cross-sell rate drops over time.

The cost. Existing customer relationship damaged.

The cure. Frequency limits on upsell. Cross-sell at moments of relevance, not constantly.

---

## The win-back-spam flow

The pattern. Lapsed users get win-back outreach repeatedly without segmentation.

The signal. Unsubscribe rate climbs; brand earns spammy reputation.

The cost. Loses users who might have returned with better outreach.

The cure. Segment win-back; respect non-response; abandon after reasonable attempts.

---

## How to detect anti-patterns

Audit cadence. Quarterly review of upgrade flows.

**Audit questions per flow.**

- Are paywalls connected to demonstrated value (anti-pattern check: paywall-everywhere, premature, unconnected)?
- Is decline respected (anti-pattern check: decline-ignored, aggressive-downsell)?
- Is plan structure clear (anti-pattern check: plan-paralysis, plan-mismatch)?
- Is pricing visible (anti-pattern check: hidden-price)?
- Is cancellation easy (anti-pattern check: aggressive-cancellation-prevention)?
- Does post-upgrade experience deliver (anti-pattern check: post-upgrade-empty)?
- Is win-back honest (anti-pattern check: discount-led, win-back-spam)?
- Is marketing-product alignment maintained (anti-pattern check: bait-and-switch)?

**The retire decision.** Anti-pattern flows often warrant redesign or retirement.

---

## Methodology-level choices that stay in the public skill

The catalog of anti-patterns. Signal-pattern-cost framing for each. Cures matched. The audit cadence and questions. The retire decision.

## Implementation choices that stay internal

Specific anti-patterns the team has shipped historically and the lessons learned. Specific portfolio audit results. Specific retirement decisions. The team's audit calendar. These vary by team.
