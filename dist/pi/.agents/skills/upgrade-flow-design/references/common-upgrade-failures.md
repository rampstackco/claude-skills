# Common upgrade failures

9+ failure patterns with diagnoses and cures.

---

## "Conversion rate is low; users churn before reaching upgrade."

**The diagnosis.** Paywall-everywhere; gates blocking value demonstration.

**The cure.** Loosen free tier. Surface paywalls at moments of demonstrated value. Detail in `references/trigger-moment-design.md`.

---

## "Conversion rate is single-digit; free users use the product for years."

**The diagnosis.** Free-forever-trap; no upgrade path surfaces.

**The cure.** Add value-triggered paywalls. Connect upgrade asks to demonstrated value.

---

## "Paywall fires; users dismiss; conversion does not lift."

**The diagnosis.** Trigger moments wrong; paywall not connected to demonstrated value.

**The cure.** Audit trigger logic. Each paywall should answer "what value did the user just demonstrate?"

---

## "Users hit paywall and churn."

**The diagnosis.** Wrong moment; paywall blocks before value is fresh.

**The cure.** Move paywalls to moments of demonstrated value, not pre-value moments.

---

## "Upgrade rate looks fine; downgrade rate is high."

**The diagnosis.** Plan structure wrong; users upgrade then realize they did not need the higher tier.

**The cure.** Clarify tier audiences. Each plan should have specific audience-fit. Detail in `references/plan-structure-patterns.md`.

---

## "Win-back attempts have low conversion."

**The diagnosis.** Re-engagement timing wrong, or value-prop unchanged from what failed initially.

**The cure.** Lead with value-prop change. Avoid discount-only win-back. Detail in `references/win-back-flow-patterns.md`.

---

## "Annual plans not converting; monthly plans dominate."

**The diagnosis.** Annual value-prop weak; or commitment friction too high.

**The cure.** Strengthen annual value (better discount, additional features). Reduce commitment friction (easier mid-year cancellation, prorated refunds).

---

## "Sales says many leads come from churned users coming back."

**The diagnosis.** Win-back working but the previous churn was avoidable; audit upstream.

**The cure.** Invest in churn prevention upstream. Detail in `references/churn-prevention-upstream.md`.

---

## "Conversion did not change after we redesigned the paywall."

**The diagnosis.** Paywall design was not the problem; trigger or plan structure may be.

**The cure.** Test variables that matter. Trigger moment, plan structure, value-prop copy. Paywall presentation alone often does not move the needle.

---

## "Upgrade flow works for new users; existing users do not upgrade."

**The diagnosis.** Triggers designed for new-user behavior; existing users do not hit them.

**The cure.** Segment trigger logic. Existing users may need different triggers (feature-launch upgrades, capacity-growth upgrades).

---

## "Conversion increased but new customer churn climbed."

**The diagnosis.** Paywall too aggressive; converting users who do not see value.

**The cure.** Audit conversion-to-retention correlation. Aggressive conversion may produce buyer's remorse.

---

## "Users complain about hidden charges after upgrade."

**The diagnosis.** Pricing not transparent; users surprised by total cost.

**The cure.** Surface all costs upfront. Annual price, monthly price, taxes if applicable. Hidden costs damage trust.

---

## "Cancellation rate spikes 3 months after upgrade."

**The diagnosis.** Upgrade was made but value did not materialize; users gave it 3 months and left.

**The cure.** Post-upgrade welcome and onboarding. Surface paid features; help users access value of paid plan.

---

## "Different audience segments convert at different rates; we cannot tell why."

**The diagnosis.** Per-segment data not tracked.

**The cure.** Per-segment conversion analytics. Different segments may need different upgrade flows.

---

## "Win-back outreach has unsubscribe rate climbing."

**The diagnosis.** Outreach too frequent or generic.

**The cure.** Segment outreach. Respect non-response. Reduce frequency.

---

## "We A/B tested annual vs monthly default; result was wash."

**The diagnosis.** Default may not have been the issue; price-anchoring or commitment friction may be.

**The cure.** Test different variables. Price level, discount magnitude, presentation order.

---

## "Sales-led upgrades convert at higher rate than self-serve."

**The diagnosis.** Self-serve flow misses something that sales touches address.

**The cure.** Audit what sales does that the flow does not. Often: clarifies value, addresses objections, customizes recommendation.

---

## "We added more upsell prompts; existing customer churn went up."

**The diagnosis.** Prompt fatigue. Existing customers feel squeezed.

**The cure.** Frequency limits on upsell. Less is often more.

---

## "Conversion drops at the credit-card-entry step."

**The diagnosis.** Form friction or trust signals missing.

**The cure.** Optimize the credit-card form. Add trust signals (security badges, refund policy). Reduce required fields.

---

## The pattern across failures

Most upgrade flow failures fall into one of three patterns.

**Pattern 1: Paywalls at wrong moments.** Paywall-everywhere, premature, unconnected, free-forever-trap. The fix is to align paywalls with demonstrated value.

**Pattern 2: Plan structure misaligned.** Plan-paralysis, plan-mismatch, post-upgrade-empty. The fix is clearer tier audiences and post-upgrade experience.

**Pattern 3: Trust damage.** Bait-and-switch, hidden-price, aggressive-downsell, hard-to-cancel. The fix is transparency and respect for the user.

The metric pattern: upgrade flow failures often look fine on conversion alone. The signal is in retention post-upgrade, churn rate, win-back conversion. Programs that track only conversion keep shipping the same patterns.

---

## Methodology-level choices that stay in the public skill

The catalog of failure patterns with diagnoses and cures. The pattern across failures (paywall timing, plan structure, trust). The principle that conversion alone is insufficient.

## Implementation choices that stay internal

Specific failure cases the team has encountered. Specific multi-metric dashboards. Specific cures. The team's audit and retirement processes. These vary by team.
