# Common comparison failures

8+ failure patterns with diagnoses and cures.

---

## "Tool gets traffic; conversion is unchanged."

**The diagnosis.** Likely feature-list-dump; no decision support.

**The cure.** Add recommendation. Cut decoration axes. Detail in `references/recommendation-engine-design.md`.

---

## "Sales says competitor leads cite our tool as biased."

**The diagnosis.** Hidden-recommendation pattern; trust damage.

**The cure.** Honest recommendation discipline (`references/honest-recommendation-discipline.md`). Acknowledge competitor strengths.

---

## "Mobile users do not engage with the tool."

**The diagnosis.** Comparison grids do not work well on mobile.

**The cure.** Mobile-first design. Stacked layout. Reduced axis count for mobile.

---

## "Power users criticize axis selection."

**The diagnosis.** Audience knows these features; tool may have used easy axes rather than decision-relevant.

**The cure.** Audit axes against real audience decisions. Replace marketing-checkbox axes with decision-relevant ones.

---

## "Tool was great at launch; conversion declined over time."

**The diagnosis.** Features changed; comparison stale.

**The cure.** Quarterly maintenance.

---

## "Audience says 'this is helpful' but does not convert."

**The diagnosis.** Recommendation absent or weak.

**The cure.** Add recommendation with reasoning and clear next-step CTA.

---

## "Comparison shows every option as 'good' for something."

**The diagnosis.** Dilution; no clear recommendation.

**The cure.** Take a stand. Recommendation should be opinionated; tradeoffs acknowledged.

---

## "Adding more features to the comparison reduced conversion."

**The diagnosis.** Crossed the cell-count threshold; cognitive overload.

**The cure.** Cut back. 8-12 axes is the working range.

---

## "Sales says many leads come through the tool but bounce on demo."

**The diagnosis.** Tool's framing oversells; reality on demo does not match.

**The cure.** Honest tool produces honest leads. Audit framing for sales-pitch dynamics.

---

## "Audience-segment recommendations feel stereotyped."

**The diagnosis.** Segment definitions based on assumptions rather than research.

**The cure.** Validate audience segments with research. Refine recommendations based on real needs.

---

## "Specific competitor is missing; users ask why."

**The diagnosis.** Competitor omitted from comparison.

**The cure.** Include relevant competitors. If intentionally excluded, disclose why ("we focus on X category; competitor Y is in different category").

---

## "Tool methodology questioned by analyst or journalist."

**The diagnosis.** Methodology hidden or weakly defended.

**The cure.** Detailed methodology disclosure. Be ready to defend specific axis choices and weights.

---

## "Tool conversion is fine; sales conversion does not match."

**The diagnosis.** Tool optimizes for tool-conversion; downstream not aligned.

**The cure.** Track downstream metrics. Optimize for downstream conversion, not just tool engagement.

---

## "Filter use is low; users see default comparison only."

**The diagnosis.** Filters added but not promoted; users do not realize they exist.

**The cure.** Promote filters; or accept that defaults serve and reduce filter complexity.

---

## "Filters produce empty result combinations."

**The diagnosis.** Filter logic does not constrain combinations to those producing comparable options.

**The cure.** Smart filter logic. When filters would produce empty result, surface alternatives.

---

## "Recommendation fires for one option always."

**The diagnosis.** Hidden-recommendation; bias-flattering logic.

**The cure.** Test the recommendation engine across audience scenarios. Ensure competitors win when fit warrants.

---

## "Audience tells us the comparison feels accurate but the recommendation feels off."

**The diagnosis.** Comparison data accurate; recommendation engine logic does not match audience priorities.

**The cure.** Validate recommendation logic. Audience research on what they weigh vs what the tool weights.

---

## "We A/B tested adding axes; conversion went down."

**The diagnosis.** Crossed the cell-count threshold.

**The cure.** Maintain axis discipline. More is not always better.

---

## "Tool produces good conversion for new visitors; returning visitors do not engage."

**The diagnosis.** Tool optimized for first-time-decision audience; returning visitors have other needs.

**The cure.** Different surfaces for different stages. Returning visitors may want simpler reference rather than full tool.

---

## The pattern across failures

Most comparison tool failures fall into one of three patterns.

**Pattern 1: No decision support.** Feature-list-dump, no-recommendation, dilution. The fix is clear, defensible recommendation.

**Pattern 2: Bias damages trust.** Hidden-recommendation, contradiction, omitted competitors, stereotypes. The fix is honest recommendation discipline.

**Pattern 3: Friction.** Over-filtered, mobile-broken, fatigue patterns. The fix is reducing cognitive load and matching audience use.

The metric pattern: comparison failures often look fine on engagement alone. The signal is in conversion, downstream metrics, audience trust.

---

## Methodology-level choices that stay in the public skill

The catalog of failure patterns with diagnoses and cures. The pattern across failures (no-decision-support, bias, friction). The principle that engagement alone is insufficient.

## Implementation choices that stay internal

Specific failure cases the team has encountered. Specific multi-metric dashboards. Specific cures. The team's audit and retirement processes. These vary by team.
