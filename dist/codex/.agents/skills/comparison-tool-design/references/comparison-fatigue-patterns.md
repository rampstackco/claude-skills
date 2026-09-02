# Comparison-fatigue patterns

Why most comparisons fail to produce decisions.

Most comparison tools accumulate cognitive load until users abandon without choosing. Comparison-fatigue patterns are the failure modes that make this happen.

---

## Pattern 1: Too many cells

The pattern. 40 features × 5 options = 200 cells.

The signal. Users skim; pick the brand they already heard of; tool produces no decision.

The cost. Comparison work is invisible because users cannot process the volume.

The cure. Reduce cells. 8-12 axes × 3-5 options = 24-60 cells. The comparison density is comprehensible.

---

## Pattern 2: All-checkmarks rows

The pattern. Every option has the feature; the row produces checkmarks across.

The signal. Users skim past; row provides no signal.

The cost. Row earns space without earning attention.

The cure. Cut the row, or replace generic checkmarks with specifics that differentiate.

---

## Pattern 3: Inconsistent axis terminology

The pattern. Each vendor names features differently; comparison becomes label confusion.

The signal. User confusion; cannot tell if "Pro Workspace" and "Premium Studio" are the same thing.

The cost. Comparison breaks at semantic level; users cannot weigh.

The cure. Normalize terminology. Use functional descriptions; vendor labels in subtext.

---

## Pattern 4: Hidden costs

The pattern. Pricing visible; fees, overage, integrations not surfaced.

The signal. Users compare on visible price; learn about hidden costs later; feel deceived.

The cost. Trust damage when discovered.

The cure. Surface total cost of ownership. Acknowledge fees, overage, expected add-ons.

---

## Pattern 5: Apples-to-oranges options

The pattern. Comparing genuinely different things; no axis applies cleanly.

The signal. Comparison feels strained; users cannot tell why these options are being compared.

The cost. Tool exists but produces no useful decision support.

The cure. Compare options the audience would actually consider together. If options are too different, separate tools may serve better.

---

## Pattern 6: No recommendation

The pattern. Tool lists; user must decide; user does not.

The signal. High abandonment; conversion rate low.

The cost. The tool's information work does not produce decisions.

The cure. Add explicit recommendation with reasoning. Detail in `references/recommendation-engine-design.md`.

---

## Pattern 7: Stale information

The pattern. Comparison content from 6+ months ago; competitors have updated; brand has updated.

The signal. Users notice the staleness; trust drops.

The cost. Tool produces decisions based on outdated information.

The cure. Quarterly maintenance. Triggered updates when major competitor or brand changes happen.

---

## Pattern 8: Bias-flattering framing

The pattern. Comparison content frames in brand's favor (showing brand's most expensive plan vs competitors' cheap; using brand's terminology for axes).

The signal. Sophisticated users notice; trust collapses.

The cost. Long-term brand damage.

The cure. Honest framing. Acknowledge competitor strengths. Use neutral terminology where possible.

---

## Pattern 9: Decision paralysis at filter step

The pattern. Tool requires extensive filter setup before showing comparison; users abandon at filter step.

The signal. High drop-off before the comparison loads.

The cost. Comparison work is invisible; users never see it.

The cure. Default-heavy. Show comparison immediately; filters available but optional.

---

## Pattern 10: Mobile illegibility

The pattern. Comparison grid designed for desktop; on mobile, cells cramped or scroll-required.

The signal. Mobile conversion much lower than desktop.

The cost. Mobile audience underserved.

The cure. Mobile-first design. Stacked layout for mobile; reduced axis count.

---

## Pattern 11: No methodology disclosure

The pattern. Comparison shown without explaining how it was assembled. Users do not know if it is honest.

The signal. Users question the comparison; sales hears about doubts.

The cost. Trust degrades; comparison's authority unclear.

The cure. Disclose methodology. Where data came from; how axes were chosen; when last updated.

---

## Pattern 12: Recommendation contradicts comparison

The pattern. Comparison shows option B winning on most axes; tool recommends option A.

The signal. Users notice the contradiction; trust collapses.

The cost. Tool internally inconsistent; users cannot rely on it.

The cure. Recommendation aligns with comparison. If recommendation favors A despite axis losses, defend explicitly ("Option A wins despite [losses] because [audience-specific reasoning]").

---

## The cumulative effect

Most comparison tools fail at multiple of these patterns simultaneously. The cumulative effect: tool produces no decisions; users default to the brand they already heard of; comparison work is wasted.

The cure. Audit each pattern. Each pattern fixed reduces cumulative friction.

---

## How to audit comparison fatigue

Quarterly review.

**Audit questions per tool.**

- Cell count: is it under 100?
- Are any rows all-checkmarks?
- Is terminology normalized across options?
- Are total costs surfaced?
- Are options apples-to-apples?
- Is recommendation present and visible?
- Is information current?
- Is framing honest?
- Is filter step lightweight?
- Does mobile work?
- Is methodology disclosed?
- Does recommendation match comparison?

**The retire decision.** Tools failing multiple patterns warrant redesign or retirement.

---

## Methodology-level choices that stay in the public skill

The 12 fatigue patterns. Signal-pattern-cost framing. Cures. The cumulative effect. Audit questions.

## Implementation choices that stay internal

Specific fatigue patterns the team has shipped historically and lessons learned. Specific portfolio audit results. The team's audit calendar. These vary by team.
