# Recommendation engine design

When to recommend, how to defend, override path.

Comparison tools that recommend are more useful than tools that just list. The recommendation must be defensible, visible, and not the only path.

---

## The visible-defended-overridable principle

Recommendations are most useful when:

- Visible. Users can see what the tool recommends.
- Defended. Reasoning is explicit.
- Overridable. Users who weigh things differently can choose otherwise.

**The win.** Tool recommends "Option B for mid-market teams prioritizing scale." Recommendation prominent; reasoning shown; user can switch audience or pick differently.

**The fail.** Tool dumps features; user must decide alone.

The discipline. Recommend with reasoning; respect override.

---

## Recommendation patterns

Common patterns.

**Pattern A: Single recommendation.** "For [audience], choose [option] because [reasons]." Clear; opinionated.

**Pattern B: Multi-segment recommendation.** "If [A], choose X. If [B], choose Y."

**Pattern C: Conditional recommendation.** "If [factor] matters most, X. If [other], Y."

**Pattern D: Recommendation with caveat.** "We think X fits most teams in your situation, with these caveats."

**Pattern E: No recommendation.** Rarely the right choice.

---

## Defending the recommendation

The reasoning shown.

**Strong defense.** Specific reasons tied to recommended option's strengths; audience-fit articulated; tradeoffs acknowledged.

**Example.** "For mid-market teams: Option B. B's pricing scales better at 200+ users (X% vs Y%), B's integration with [tool] is faster, B's support response is shortest in this tier. Tradeoff: B's interface is less polished than Option A; A wins for teams under 50."

**Weak defense.** "B is our recommendation"; "B is best for most teams"; generic claims.

The defense earns trust through specificity.

---

## The override path

How users can choose otherwise.

**Visible alternative paths.**

- Toggle to switch recommended audience.
- Filter to weight axes differently.
- Direct selection of different option.

**Friction balance.**

- Override findable in 1-2 clicks.
- Override does not require restart.
- Override preserves user context.

The discipline. Override is honest; users who disagree are not punished.

---

## Recommendation framing

How recommendations are worded.

**Strong framing.** Specific to audience; tied to reasoning; acknowledges tradeoffs; inviting override.

**Weak framing.** "Obviously X is best"; "most experts agree X"; "X is the only choice for serious teams."

What works. Specificity, humility, agency for the user.

---

## Audience-fit recommendations

Different audiences may warrant different recommendations.

**The pattern.** Tool detects or asks about audience; recommendation adapts.

**Detection methods.**

- Referrer or query.
- Stated input.
- Inferred from context.

The discipline. Audience signals inform recommendation; do not stereotype.

---

## Recommendation transparency

Users should understand how the recommendation was generated.

**Methodology disclosure.**

- "We weight [axes] heavily because [reasons]."
- "If you weigh [factor] differently, your recommendation may differ."

The audience that questions. Some users will dig; methodology should hold up.

---

## The recommendation-bias risk

Recommendations are powerful; biased ones damage trust.

**Common biases.**

- Recommending brand in all cases.
- Recommendations always benefit recommender.
- Hidden weighting toward brand strengths.

**The trust-collapse.** When users catch bias, they stop trusting entirely.

**The cure.** Acknowledge competitor strengths. Recommend competitors when fit warrants. Honest about who is recommending whom.

---

## Recommendation testing

Validate.

**Methods.**

- User research: do recommendations match what audiences would have chosen with full information?
- Cohort analysis: do recommendation-followers retain better?
- Sales feedback: do recommended-option leads convert at higher rates?

The discipline. Recommendation is hypothesis until validated.

---

## Common recommendation failures

**No recommendation.** Tool lists; users decide alone.

**Hidden recommendation.** Tool defaults bias toward one option without disclosure.

**Generic recommendation.** "Best for most teams" without specificity.

**Single recommendation for diverse audiences.** Missed fit.

**Recommendation without defense.** Authoritative without reasoning.

**No override path.** Users who disagree have no clear alternative.

**Recommendation always favors brand.** Trust collapses.

**Stale recommendation.** Reasoning based on outdated capabilities.

---

## Methodology-level choices that stay in the public skill

The visible-defended-overridable principle. Patterns A through E. Defending the recommendation. The override path. Framing. Audience-fit recommendations. Transparency. The bias risk. Testing. Common failures.

## Implementation choices that stay internal

Specific recommendation engines for specific tools. Specific audience-segment mappings. Specific reasoning copy. The team's validation processes. These vary by team.
