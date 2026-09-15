# Churn prevention upstream

Preventing churn before the upgrade flow is needed.

The best upgrade flow is the one the user does not need because they did not churn. Investing upstream of churn produces more revenue than recovering churned users.

---

## The prevention-vs-recovery economics

Preventing churn is much cheaper than winning back churned users.

**The math.** Cost of preventing one churn (engagement program, support intervention, friction reduction): X. Cost of winning back one churned user (outreach, discount, re-acquisition): often 3-10X.

**The implication.** Programs that detect churn risk early and intervene save more revenue than win-back programs that activate only after churn.

The discipline. Build upstream signals; intervene before churn happens.

---

## Upstream churn signals

What predicts churn.

**Engagement decline.**

- Sessions per week dropping over 4-week period.
- Time-in-product per session declining.
- Feature usage breadth narrowing.

**Engagement gap.**

- Last login distant.
- Specific feature stopped being used.
- Days since last meaningful action.

**Support pattern.**

- Support tickets indicating frustration.
- Multiple unresolved issues.
- Tone shift in support conversations.

**Plan-related signals.**

- Asked about cancellation.
- Researched competitors (sometimes detectable through partner data).
- Downgrade interest.

**Team-level signals (B2B).**

- Champion left the company.
- Team reduced seats internally.
- Decision-maker became unresponsive.

The signals combine. Single signals are noisy; combinations predict more reliably.

---

## Detection systems

How to know which users are at risk.

**Engagement scoring.** Composite score based on usage signals; threshold for at-risk classification.

**Health scores.** Often used by customer success teams; combines product engagement, support pattern, contract data.

**Predictive models.** Statistical or ML models that predict churn probability per user.

**Manual flags.** Account managers flag accounts they sense are at risk.

The discipline. Detection should be operationalized; signals should fire alerts to teams who can act.

---

## Intervention patterns

What to do when at-risk users surface.

**Pattern A: Engagement re-orientation.**

How it works. In-product help surfaces when engagement drops. Re-orients the user to value.

When to use. Soft signals; users who may have forgotten what the product does for them.

**Pattern B: Outreach.**

How it works. Customer success or sales reaches out to at-risk accounts.

When to use. High-value accounts; B2B contexts where personal touch matters.

**Pattern C: Friction reduction.**

How it works. Audit reasons users disengage; fix the friction. Often product changes rather than outreach.

When to use. When patterns of disengagement reveal product issues.

**Pattern D: Educational re-engagement.**

How it works. Send the user content (case study, advanced feature explanation) that re-anchors value.

When to use. Soft re-engagement; cheap to scale.

**Pattern E: Plan adjustment.**

How it works. If usage shows the user is over-paying, suggest a downgrade. Counterintuitive but builds trust.

When to use. When the user is genuinely on the wrong plan; saves the relationship.

---

## The engagement-re-orientation pattern

In-product help that surfaces when engagement drops.

**Implementation.**

- Trigger fires when engagement signal drops below threshold.
- In-product surface shows: "It looks like you have not used [specific feature] in a while. Here is how others use it."
- Optional brief tour or case study.

**Strengths.**

- Cheap.
- Scalable.
- Often catches users who simply forgot.

**Weaknesses.**

- May feel intrusive.
- Cannot address all reasons for disengagement.

---

## The customer success outreach pattern

Personal contact for high-value accounts.

**Implementation.**

- Health score crosses at-risk threshold.
- Account manager or CS lead reaches out.
- Conversation: what is happening, what would help, can we address.

**Strengths.**

- Highest engagement potential.
- Surfaces real reasons.
- Builds relationship.

**Weaknesses.**

- Expensive.
- Only viable for accounts above revenue threshold.

---

## The friction-reduction pattern

Fixing the underlying reason rather than just intervening per user.

**Implementation.**

- Audit common reasons for disengagement.
- Identify product changes that would address.
- Ship the changes.

**Strengths.**

- Compounds across all users.
- Often the highest-impact intervention.

**Weaknesses.**

- Slower; requires product team prioritization.
- Some friction reasons cannot be product-fixed (audience-fit issues).

---

## The educational-re-engagement pattern

Send content that re-anchors value.

**Implementation.**

- Email or in-product content showing case studies, advanced features, or use cases.
- Targeted to the user's profile.

**Strengths.**

- Cheap and scalable.
- Educates without demanding immediate action.

**Weaknesses.**

- Lower engagement than personal outreach.
- May feel like marketing.

---

## When intervention has limits

Not all churn can be prevented.

**Genuinely unfit users.** Some users signed up but are not the right audience. Their churn is appropriate.

**Genuinely changed needs.** User changed jobs; product no longer relevant. Cannot be retained.

**Genuinely better alternatives.** Competitor genuinely better fit. Recovery may not be appropriate.

**The honest assessment.** Recognizing unpreventable churn is part of the discipline. Intervention should focus on preventable churn.

---

## Churn prevention vs upgrade flow

Different problems; complementary disciplines.

**Churn prevention.** Keeps users engaged; avoids churn.

**Upgrade flow.** Converts engaged users to paid (or higher paid).

**The interaction.** Strong churn prevention produces engaged users; engaged users are the audience for upgrade flow. Programs running both produce more revenue than either alone.

---

## Common prevention failures

**No detection.** Churn happens; nobody flagged it; recovery is the only option.

**Detection without intervention.** Signals fire but nobody acts.

**Intervention timing wrong.** Action too late; user already disengaged emotionally.

**Generic intervention.** Same outreach to all at-risk users; no segmentation.

**Discount-led intervention.** Lead with discount instead of value; trains discount-seeking behavior.

**Prevention misses fixable friction.** Patterns of disengagement reveal product issues; team focuses on per-user intervention instead.

**No measurement.** Cannot tell if prevention reduces churn rate.

---

## Methodology-level choices that stay in the public skill

The prevention-vs-recovery economics. Upstream churn signals (5 categories). Detection systems. Intervention patterns A through E. When intervention has limits. Churn prevention vs upgrade flow interaction. Common failures.

## Implementation choices that stay internal

Specific signals and thresholds for specific products. Specific health-score formulas. Specific intervention copy and protocols. The team's CS staffing model. These vary by team and product.
