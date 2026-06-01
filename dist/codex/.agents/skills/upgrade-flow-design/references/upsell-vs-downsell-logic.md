# Upsell vs downsell logic

When the user does not accept the primary upgrade. Secondary paths.

Not every user accepts the proposed upgrade. The discipline is to capture revenue from users who would pay something but not the proposed amount, while respecting users who genuinely do not want to upgrade.

---

## The secondary-path principle

When the primary upgrade is declined, secondary options may capture revenue otherwise lost.

**The win.** User is offered Pro plan ($X/month). Declines. System offers Starter plan ($X/3/month). User accepts Starter. Some revenue beats no revenue.

**The fail.** User declines Pro; sees no other path; remains free; revenue is zero.

The discipline. Design secondary paths thoughtfully; do not aggressive-downsell into manipulation.

---

## Pattern A: Upsell

User on basic plan; ask them to upgrade to higher tier.

**How it works.**

- Trigger fires when user demonstrates value of higher-tier features.
- Upgrade flow surfaces with the higher plan.

**Strengths.**

- Higher revenue per converted user.
- Aligned with demonstrated value.

**Weaknesses.**

- User may not need the higher tier; conversion can be poor.

**When to use.** When the user has hit limits or used features that the higher tier addresses.

---

## Pattern B: Cross-sell

User is paying; offer add-ons or related products.

**How it works.**

- Trigger fires when user shows interest in adjacent capabilities.
- Cross-sell surfaces complementary product or add-on.

**Strengths.**

- Expands revenue from existing customer.
- Often easier than acquiring new customers.

**Weaknesses.**

- Risks fatigue if cross-sells are too frequent.
- Users may feel they are being squeezed.

**When to use.** When add-ons or related products genuinely fit the customer's profile.

---

## Pattern C: Downsell

User declined the higher tier; offer a smaller commitment.

**How it works.**

- User dismisses upgrade.
- Secondary paywall offers a lower-tier plan, monthly instead of annual, or smaller seat count.

**Strengths.**

- Captures revenue from users not ready for the primary plan.
- Establishes paying relationship that may upgrade later.

**Weaknesses.**

- Aggressive downsell feels manipulative.
- Users may downgrade to the lowest option even when they would have paid more.

**When to use.** When the primary plan is decline-prone; downsell catches users who would pay something.

---

## Pattern D: Annual-vs-monthly downsell

User declined annual; offer monthly.

**How it works.**

- Annual plan offered first (with discount).
- Decline; monthly offered as backup.

**Strengths.**

- Some users avoid annual commitment but accept monthly.
- Captures revenue from commitment-averse users.

**Weaknesses.**

- Cumulative revenue lower.
- Can train users to expect monthly when annual was the goal.

**When to use.** When annual is the desired commitment but conversion suffers from upfront cost.

---

## Pattern E: Seat-count downsell

User declined full team plan; offer single-seat upgrade.

**How it works.**

- Team plan offered first.
- Decline; single-seat upgrade offered.

**When to use.** When the user's situation suggests they would value paid features for themselves but cannot commit team-wide yet.

---

## Downsell discipline

When downsell crosses into manipulation.

**Honest framing.** "If Pro is more than you need, here is something that fits your team size."

**Manipulative framing.** Aggressive flow that pressures the user. Multiple decline-and-counter rounds. Hidden costs. Switching plan terms after acceptance.

**The discipline.** Downsell respects the decline; offers an alternative; does not pressure.

---

## When NOT to downsell

Some declines should be respected.

**The user explicitly does not want any plan.** Continued upgrade asks become harassment.

**The user has signaled disengagement.** Aggressive downsell on a disengaged user accelerates churn.

**The user is on a free tier that fits.** Forcing an upgrade where the user is happy on free degrades trust.

**The user is in a bad moment.** After an error, support ticket, or negative experience, downsell is tone-deaf.

---

## Sequencing upsell, cross-sell, downsell

In a typical flow.

**Step 1: Primary upgrade ask** (matched to trigger).
**Step 2 (if declined): Downsell** (smaller commitment alternative).
**Step 3 (if declined): Soft acknowledgment** ("No problem; here is the link to plans whenever you are ready.").
**Step 4 (later): Cross-sell** (when the user has continued use signals).

The flow respects each decline before re-engaging at a later moment.

---

## Frequency limits across upsell/downsell

How often these surface.

**Within session.** Once primary + once downsell + soft acknowledgment. No more.

**Across sessions.** Wait days or weeks before re-ask. The user's circumstances may have changed.

**Per quarter.** Major upgrade pushes per quarter at most.

---

## Conversion economics of upsell vs downsell

Different patterns have different revenue dynamics.

**Upsell.** Higher revenue per converted user. Lower conversion rate.

**Cross-sell.** Adds revenue per existing customer. Conversion depends on fit.

**Downsell.** Lower revenue per converted user. Higher conversion rate. Captures users who would otherwise stay free.

**The math question.** Total revenue = (upsell rate × upsell revenue) + (downsell rate × downsell revenue) + (free-to-paid rate × paid revenue). Optimize the sum.

---

## Common upsell/downsell failures

**Aggressive downsell rounds.** Multiple decline-and-counter loops; user feels manipulated.

**Downsell that breaks the upsell.** Users learn to decline upsell to get downsell discount.

**No downsell.** Users decline primary; revenue is zero.

**Cross-sell fatigue.** Customers see too many cross-sells; resent.

**Wrong sequencing.** Cross-sell before user has paid first plan.

**No frequency limits.** Cumulative upgrade asks become spam.

**Tone-deaf timing.** Downsell after a customer support escalation.

---

## Methodology-level choices that stay in the public skill

The secondary-path principle. Patterns A through E (upsell, cross-sell, downsell, annual-vs-monthly, seat-count). Downsell discipline. When NOT to downsell. Sequencing logic. Frequency limits. Conversion economics. Common failures.

## Implementation choices that stay internal

Specific upsell, cross-sell, downsell flows for specific products. Specific copy. Specific tooling. The team's revenue economics modeling. These vary by team and product.
