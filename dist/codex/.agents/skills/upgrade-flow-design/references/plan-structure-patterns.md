# Plan structure patterns

Tier count, feature gating, audience-fit per tier.

The plans the upgrade flow leads to. Done well, plan structure makes upgrade decisions clear; done poorly, plan structure produces decision paralysis or upgrade-then-downgrade churn.

---

## The clear-tier-fit principle

Each tier should have a clear "this is for [audience] because of [reason]." Tiers without clear audience-fit produce weak conversions.

**The win.** A SaaS analytics product has 3 tiers. Starter ("solo analysts and small teams"), Growth ("10-50 person analytics teams"), Enterprise ("complex analytics needs at scale"). Each tier maps to a specific audience; users self-select by recognizing themselves.

**The fail.** Same product has 3 tiers labeled Bronze, Silver, Gold with feature checkmarks. Audiences cannot tell which is for them; many pick the wrong tier; downgrade rates climb.

The discipline. Each tier has clear audience-fit articulated.

---

## Tier count

How many tiers.

**2-tier (Free + Paid).**

How it works. Free for some users, paid for everyone else.

Strengths. Simple; clear upgrade path.

Weaknesses. Cannot capture enterprise-tier revenue; cannot serve segmented audiences differently.

When to use. Single-audience products; products with limited feature differentiation.

**3-tier (Starter + Pro + Enterprise).**

How it works. Three plans serving three audiences.

Strengths. Captures entry-level, mid-market, and enterprise. Industry-standard.

Weaknesses. Requires clear audience differentiation; can create decision paralysis if audiences are not clear.

When to use. Most B2B SaaS products. Default for products with diverse audiences.

**4+ tier.**

How it works. Four or more plans.

Strengths. Highly granular; serves many audiences.

Weaknesses. Decision paralysis; users cannot tell which tier fits.

When to use. Rarely. Most products do better with 3 tiers and add-ons rather than 4+ tiers.

The simplest tier count that fits the audience is usually best.

---

## Feature gating patterns

How features differ between tiers.

**Pattern A: Capacity-based gating.**

How it works. All tiers have most features; tiers differ in volume (seats, queries, storage).

Strengths. Clear upgrade trigger when capacity hit. Easy to understand.

Weaknesses. Encourages users to optimize against limits.

When to use. Products where capacity is the key cost driver.

**Pattern B: Feature-based gating.**

How it works. Lower tiers missing specific features; higher tiers unlock them.

Strengths. Clear value differentiation between tiers.

Weaknesses. Feature gating can feel arbitrary; users may want one paid feature but not the rest.

When to use. Products with clearly tiered feature sets (basic vs advanced vs enterprise).

**Pattern C: Hybrid gating.**

How it works. Both capacity and features differ between tiers.

Strengths. Most flexibility; serves diverse audiences.

Weaknesses. More complex to communicate; feature comparison tables get long.

When to use. Default for production B2B SaaS; most products benefit from hybrid.

**Pattern D: Service-based gating.**

How it works. Tiers differ in service level (support, onboarding, SLA).

Strengths. Aligns with enterprise expectations.

Weaknesses. Service costs scale with tier.

When to use. Often for top tier (Enterprise); rarely the only differentiation.

---

## Plan naming

What to call the plans.

**Audience-named plans.** "For solo creators," "For growing teams," "For enterprise."

Strengths. Self-selecting; users know which fits.

Weaknesses. Audience names age; "for startups" can feel limiting.

**Tier-named plans.** "Starter," "Pro," "Enterprise" or "Basic," "Pro," "Premium."

Strengths. Industry-standard; users recognize.

Weaknesses. Generic; does not differentiate from competitors.

**Outcome-named plans.** "Build," "Grow," "Scale."

Strengths. Aspirational; aligns with user goals.

Weaknesses. Vague; users may not know which outcome describes them.

The discipline. Names should be specific enough that users self-select correctly.

---

## Pricing structure

How prices map to tiers.

**Per-seat.** Cost scales with team size.

When to use. Team collaboration products.

**Per-feature.** Cost scales with feature set.

When to use. Modular products.

**Per-usage.** Cost scales with use volume.

When to use. Capacity-driven products.

**Flat per-tier.** Each tier has fixed price regardless of usage.

When to use. Predictable-budget audiences (often enterprise).

**Hybrid pricing.** Combinations of the above.

When to use. Most production products use hybrid (per-seat with usage caps; flat tier with feature differences).

---

## Annual vs monthly

Commitment options.

**Monthly.** Lower commitment; higher friction at cancellation; users can leave easily.

**Annual.** Higher commitment; usually discounted; reduces churn but requires upfront payment.

**Both offered.** Most products offer both; annual discount incentivizes commitment.

**Discipline.** Discount on annual should reflect real value to the company (lower churn, predictable revenue) rather than arbitrary marketing percent-off.

---

## Plan transition design

How users move between plans.

**Free to paid.** First commitment. Smooth experience matters most.

**Tier upgrade (within paid).** From Pro to Enterprise. Often involves billing transition.

**Downgrade (within paid).** From Enterprise to Pro. Should be friction-low to maintain trust; aggressive downgrade prevention damages trust.

**Cancellation to free.** Some products auto-downgrade on cancellation; others fully cancel. Each has tradeoffs.

The transitions should be smooth. Friction at transition damages trust.

---

## Pricing-page coordination

Plan structure decisions reflect on the pricing page.

**The principle.** Plan structure decisions made for the upgrade flow appear on the pricing page. Users should see consistent information.

**The integration.** Pricing-page copy (covered by `landing-page-copy`) implements the plan structure decisions made here. The two skills coordinate.

---

## Plan maintenance

Plans decay.

**What decays.**

- Capacity limits set years ago no longer match product capability.
- Features moved between tiers over time without comprehensive update.
- Pricing levels no longer match market.
- Tier audiences shifted.

**Maintenance cadence.** Annual review at minimum; major product or market changes trigger more frequent.

**The decay-driven redesign.** When plan structure no longer reflects reality, redesign rather than patch.

---

## Common plan structure failures

**Too many tiers.** Decision paralysis; users pick wrong tier.

**Tiers without clear audience-fit.** Generic names without differentiation.

**Misaligned pricing.** Prices that do not reflect value differences between tiers.

**Feature gating arbitrary.** Features gated based on what is easy rather than what audiences need.

**No annual discount.** Users default to monthly; cumulative revenue lower.

**Aggressive downgrade prevention.** Users want to downgrade; friction damages trust.

**Plans not updated.** Pricing or tiers from years ago no longer fit current product or market.

**Pricing-page mismatched.** Plans on the page differ from plans in the upgrade flow.

---

## Methodology-level choices that stay in the public skill

The clear-tier-fit principle. Tier count guidance. Feature gating patterns A through D. Plan naming patterns. Pricing structure patterns. Annual vs monthly. Plan transition design. Pricing-page coordination. Plan maintenance. Common failures.

## Implementation choices that stay internal

Specific plans for specific products. Specific feature gating decisions. Specific pricing levels. Specific naming conventions. The team's pricing review calendar. These vary by team and product.
