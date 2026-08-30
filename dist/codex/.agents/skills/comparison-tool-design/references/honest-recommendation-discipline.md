# Honest recommendation discipline

The discipline that distinguishes hidden from honest recommendations.

Recommendations are powerful. Honest ones earn trust; hidden ones erode it. The discipline is to know which kind your tool produces.

---

## The litmus test

A sophisticated user from the target audience tests the tool by selecting a clearly wrong-fit scenario for the brand. Does the tool recommend a competitor when fit warrants?

**The win.** Tool recommends competitor X for the wrong-fit scenario, with reasoning. The sophisticated user trusts the tool because it is willing to recommend against the brand.

**The fail.** Tool always recommends the brand regardless of scenario. The sophisticated user catches the pattern; trust collapses.

The discipline. The tool's willingness to recommend competitors when warranted is the trust marker.

---

## What honest recommendation looks like

Five marks of honesty.

**Mark 1: Brand does not always win.** When competitors fit better, tool says so.

**Mark 2: Reasoning is specific and verifiable.** "Option B has X capability that Option A lacks" rather than "B is better."

**Mark 3: Audience-fit is articulated.** "For [audience] with [needs], choose X. For different audience, choose Y."

**Mark 4: Tradeoffs acknowledged.** "Option X wins on capability A but loses on capability B."

**Mark 5: Methodology disclosed.** Users can see how the recommendation was generated.

When all five are present, the recommendation is honest. When any are absent, hidden-recommendation dynamics creep in.

---

## What hidden recommendation looks like

Five marks of hidden bias.

**Mark 1: Brand always wins regardless of scenario.**

**Mark 2: Reasoning is generic ("best in class") without specifics.**

**Mark 3: Audience-fit not articulated; one recommendation for all.**

**Mark 4: Tradeoffs not acknowledged; brand presented as superior on all axes.**

**Mark 5: Methodology hidden or vague.**

When these patterns combine, the tool is hidden-recommendation regardless of whether the team intended bias.

---

## The acknowledge-competitor-strengths principle

Honest recommendation tools acknowledge where competitors are stronger.

**The pattern.** "Competitor X has the strongest [capability]. We win on [different capability]. For audiences prioritizing [first], X. For audiences prioritizing [second], us."

**Why it works.** Acknowledging strengths signals honesty. Audiences trust the recommendation more because the tool is willing to lose on specific axes.

**The reluctant-acknowledgment failure.** Acknowledging competitor strengths only when forced; minimizing them where possible. Detection by sophisticated audiences eventual.

---

## The recommendation-defense quality

How well the tool defends its recommendation.

**Strong defense.**

- Specific to audience.
- Tied to specific axes where the recommended option wins.
- Includes tradeoffs.
- Cites data or sources.

**Example.**

"For mid-market teams (50-200 users): Option B. Reasons: B's pricing scales better at 200+ users, B's [specific feature] is unmatched, B's support response time is fastest. Tradeoff: B's onboarding is longer than Option A's. For under-50-user teams, Option A may serve better."

**Weak defense.**

- "B is the best choice."
- "Most teams choose B."
- Generic claims.

The defense earns trust through specificity and acknowledged tradeoffs.

---

## Audience-segment recommendations

Different audiences may warrant different recommendations.

**Patterns.**

- "Solo and small teams: choose A."
- "Mid-market: choose B."
- "Enterprise: choose C."

**Why this works.** Audiences self-identify; tool serves each.

**The single-recommendation-fits-all failure.** One recommendation for diverse audiences misses fit.

The discipline. When audiences differ, recommendations differ.

---

## When the recommendation should be no-recommendation

Sometimes "we cannot tell which is best for you" is the honest answer.

**Patterns.**

- "Both options fit teams in your situation; differentiator is [factor] you should weigh personally."
- "If [criterion] matters most to you, X. If [criterion] matters most, Y. We cannot rank for you."

**Why this works.** Honest about the limits of recommendation; respects user agency.

**The over-recommend failure.** Recommending in cases where genuine differentiator does not exist; trust suffers when users notice.

---

## Recommendation transparency

Users should understand how the recommendation was generated.

**Disclosure patterns.**

- "We weight [axes] heavily because [reasons]."
- "If you weigh different axes, your recommendation may differ."
- "Our methodology is described here."

**The audience that questions.** Some users will dig. Methodology should hold up.

---

## The recommendation-audit pattern

Periodically test the tool's honesty.

**Audit method.**

- Test scenarios where competitors should win.
- Test scenarios where brand should win.
- Test edge cases.

**Audit findings.**

- Tool always recommends brand: hidden-recommendation; redesign.
- Tool sometimes recommends competitors: honest; verify the recommendations make sense.
- Tool refuses to recommend: may be appropriate for genuine ties; should not be default.

The audit catches drift. Honest tools at launch can become hidden-recommendation through small changes over time.

---

## Honest recommendation maintenance

Honest recommendations decay.

**What decays.**

- Reasoning based on outdated capabilities.
- Audience-segment definitions that no longer fit.
- Methodology that no longer matches the tool's logic.

**Maintenance cadence.** Quarterly review. Verify reasoning still holds; verify methodology matches implementation.

---

## Common honest-recommendation failures

**Brand always wins.** Hidden-recommendation; trust risk.

**No defense.** Recommendations without reasoning.

**Generic recommendations.** "Best for most teams" without specificity.

**Single recommendation for diverse audiences.** Missed fit.

**Tradeoffs hidden.** Brand presented as superior on all axes.

**Methodology vague.** Users cannot inspect.

**No competitor-strength acknowledgment.** Trust suffers.

**Stale recommendation.** Reasoning based on outdated info.

---

## Methodology-level choices that stay in the public skill

The litmus test. Five marks of honest recommendation. Five marks of hidden recommendation. The acknowledge-competitor-strengths principle. Recommendation defense quality. Audience-segment recommendations. When no-recommendation is honest. Recommendation transparency. The audit pattern. Maintenance. Common failures.

## Implementation choices that stay internal

Specific recommendation logic for specific tools. Specific audience-segment mappings. Specific methodology copy. The team's audit calendar. These vary by team.
