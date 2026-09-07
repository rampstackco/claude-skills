# Free-tier decision criteria

Freemium, free-trial, reverse trial, no-free. Choice criteria.

The free-tier decision is upstream of upgrade flow design. The structure determines what the upgrade flow looks like, which trigger moments matter, and what conversion rates are achievable.

---

## The free-tier decision matters

Different free-tier structures warrant different upgrade flows.

**The win.** A SaaS product chooses freemium because users provide product value (data, virality, network). Upgrade flow surfaces capacity-based paywalls. Conversion is 3 percent but volume produces meaningful revenue.

**The fail.** Same product chooses free-trial without realizing user value matters more than time-bound trial. Trial ends; users churn rather than convert; the product loses the network effect users were providing for free.

The decision is strategic; downstream design choices follow from it.

---

## Pattern A: Freemium (free-forever tier)

Users use the product indefinitely without paying.

**How it works.**

- Free tier offers core value with constraints (capacity limits, feature limits).
- Paid tier removes constraints or unlocks more.
- Users may stay free forever; conversion happens when they hit constraints they value enough to pay around.

**Conversion baseline.** 2-5 percent typical for B2B SaaS; varies widely.

**Strengths.**

- Volume.
- Network effects from free users.
- Users provide product value (data, content, virality).
- Lower acquisition cost.

**Weaknesses.**

- Most users do not convert.
- Free-tier capacity costs.
- Plan-design pressure to gate the right things.

**When to use.** Products with strong network effects, or where free users genuinely contribute to product value.

---

## Pattern B: Free-trial (time-limited)

Users get full or near-full product for a defined period.

**How it works.**

- Trial period (7-30 days typical).
- After trial, must pay to continue.
- Often credit-card-required at start (with auto-charge) or credit-card-not-required (with explicit conversion at end).

**Conversion baseline.** 10-25 percent of trial signups; higher with credit-card-required.

**Strengths.**

- Strong commitment from users who start.
- Clear conversion deadline.
- Revenue arrives quickly post-trial.

**Weaknesses.**

- Friction at signup if credit card required.
- Users churn if trial ends before they reach value.
- Trial extension dynamics can become a negotiation.

**When to use.** Products where value is clear within the trial period; audiences willing to commit time before paying.

---

## Pattern C: Reverse trial

Users start on paid plan; auto-downgrade to free after period.

**How it works.**

- Signup grants paid features for a defined period.
- After period, auto-downgrades to free tier.
- Users who want continued paid features upgrade.

**Conversion baseline.** Moderate; mixes signals.

**Strengths.**

- Users see paid features; familiarity may drive conversion.
- Easier to start than credit-card-required trial.

**Weaknesses.**

- Surprise when downgrade hits.
- Some users dislike the loss-aversion framing.
- Less common; users may not know what to expect.

**When to use.** When the team has tested both freemium and free-trial and reverse-trial outperforms; specific product-audience fits.

---

## Pattern D: No-free (paid-only)

No free tier; users pay to start.

**How it works.**

- Sales conversation or demo; user signs contract or starts subscription.
- No self-serve free path.

**Strengths.**

- Higher revenue per signup.
- Clearer signal of intent.
- No free-tier capacity costs.

**Weaknesses.**

- Lower top-of-funnel volume.
- Higher acquisition cost.
- Sales-motion dependent.

**When to use.** Enterprise products, high-touch sales, products where free would dilute brand or capacity.

---

## Pattern E: Hybrid

Combining patterns. Most production products mix.

**Common combinations.**

- Freemium with free-trial of paid tier (free forever; trial of higher tier for free users).
- Free-trial with credit-card-not-required for self-serve, plus paid-only for enterprise.
- Reverse-trial for new users, freemium for users who downgrade at end of reverse-trial.

**The hybrid challenge.** More complexity; more paths to maintain. Justify complexity with conversion data.

---

## Choice criteria

How to decide.

**Use freemium when:**

- Network effects matter; free users contribute value.
- Audience expects free; paid-only would limit reach.
- Conversion rate at scale produces meaningful revenue.

**Use free-trial when:**

- Value is clear within a trial period.
- Audience willing to commit time before paying.
- Conversion economics favor higher rate over higher volume.

**Use reverse-trial when:**

- Both freemium and free-trial have been tested and reverse-trial outperforms.
- Audience signal-strength is high (paid features get used).

**Use no-free when:**

- Audience is enterprise or high-touch.
- Product capacity costs prohibit freemium.
- Sales motion is the dominant funnel.

**Use hybrid when:**

- Different audience segments warrant different free structures.
- Data justifies the complexity.

---

## Free-tier capacity design

For freemium, the capacity decision.

**The principle.** Free tier offers enough capacity to demonstrate value; not enough to replace paid tier.

**Capacity dimensions.**

- **Use volume.** Number of items, queries, exports per month.
- **Capacity.** Storage, seats, integrations.
- **Feature set.** Specific features paid only.
- **Support level.** Self-serve only on free; live support on paid.
- **Branding.** Free tier shows brand; paid removes.

**Design discipline.** Free tier should let users hit the ah-ha moment; paid tier should be necessary for sustained or scaled use. Too generous: users do not convert. Too constrained: users do not reach ah-ha.

---

## Trial period length

For free-trial, how long.

**Common periods.**

- **7 days.** Aggressive; works when ah-ha moment is clear and quick.
- **14 days.** Common B2B; balances time-to-value with urgency.
- **30 days.** Generous; works for products with longer evaluation cycles.
- **60+ days.** Rare; usually reflects enterprise sales cycles.

**Decision factors.**

- Time-to-value of the product.
- Audience evaluation cycle.
- Conversion rate by trial length (test if uncertain).

---

## Free-tier maintenance

Free-tier structures decay.

**What decays.**

- Capacity limits set years ago no longer match current product capability.
- Features moved between tiers without comprehensive update.
- Audience composition shifted; old free-tier no longer fits.

**Maintenance cadence.** Quarterly review of free-tier structure alongside pricing review.

**The decay-driven redesign.** When refinements have not moved conversion, the free-tier structure may need redesign.

---

## Common free-tier failures

**Free-tier too generous.** Users get everything they need; conversion never starts.

**Free-tier too constrained.** Users do not reach value; churn before conversion.

**Trial too short.** Users do not reach ah-ha moment; trial ends with low conversion.

**Trial too long.** Conversion incentive weak; users defer decision.

**Wrong free-tier structure for audience.** Freemium chosen for enterprise audience that wanted no-free; adoption suffers.

**No maintenance.** Free-tier static; conversion declines as product evolves.

---

## Methodology-level choices that stay in the public skill

The free-tier decision matters principle. Patterns A through E. Choice criteria. Free-tier capacity design. Trial period length. Maintenance considerations. Common failures.

## Implementation choices that stay internal

Specific free-tier structures for specific products. Specific capacity limits. Specific trial lengths. The team's pricing review calendar. These vary by team and product.
