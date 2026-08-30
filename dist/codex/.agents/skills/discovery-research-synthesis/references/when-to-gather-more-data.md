# When to gather more data

Synthesis sometimes reveals that the research did not collect enough. The discipline is naming gaps explicitly and deciding whether to halt synthesis, ship with named gaps, or restart with more research.

The discomfort of acknowledging gaps is the source of bad synthesis. Teams that have invested in research want to declare the data sufficient even when the synthesis reveals it was not. The discipline is honesty about what the research can and cannot support.

---

## Pattern thinness

**The signal.** A pattern surfaces in 2-3 artifacts but the synthesis would need 5-8 to commit a position.

**Why it happens.**

- The discovery cycle had a defined batch size; some patterns emerged with limited support.
- The pattern is real but rare; the research did not encounter enough cases to characterize it.
- The pattern is segment-specific; the research overrepresented other segments.

**The honest options.**

- Name the pattern as tentative pending more data. Synthesis ships with this pattern flagged as preliminary; the team treats it as a hypothesis rather than a finding.
- Pause synthesis to gather more research. If the pattern is decision-load-bearing, the additional research investment may be worthwhile.
- Drop the pattern. If the pattern is not decision-relevant or the data is too thin to be useful, do not include it. Inflating thin patterns to fill space is a synthesis failure.

**The dishonest option to avoid.** Naming the thin pattern as if it had full support. Readers cannot distinguish well-supported from thinly-supported patterns; decisions get made as if all patterns are equal weight; the team gets surprised when the thin-pattern decisions do not pan out.

---

## Segment under-representation

**The signal.** The research overrepresents one user segment and underrepresents another that matters for the decision.

**Why it happens.**

- Recruiting bias produces segment skew (the easiest-to-recruit users are usually a specific segment).
- The research was scoped before the team realized which segments mattered most for the decision.
- Available research artifacts (existing tickets, prior interviews) skew toward certain segments.

**The honest options.**

- Synthesize for the represented segment; flag explicitly that the patterns may not apply to underrepresented segments.
- Pause to recruit and conduct research with the underrepresented segment.
- Use existing data sources (analytics, support data) to validate patterns in the underrepresented segment indirectly.

**Worked example.** A discovery cycle on B2B onboarding interviews 12 users, all from companies of 50-500 employees. The synthesis surfaces strong patterns for that segment. The product team is also considering enterprise (1000+ employees) and small business (1-50). The synthesis should:

- Name patterns for the 50-500 segment with confidence.
- Acknowledge that enterprise and small business patterns are not represented.
- Recommend either separate research for the missing segments or scoping the decision to the segment the data covered.

---

## Contradictory clusters

**The signal.** Two clusters point in opposite directions and the data does not resolve the contradiction.

**Why it happens.**

- Sub-segment differences the research did not investigate explicitly.
- Different use contexts producing different needs (mobile vs desktop, new vs returning users).
- One cluster reflects what users say; the other reflects what users do; the contradiction is real and revealing.

**The honest options.**

- Investigate the contradiction. Often the contradiction itself becomes the most valuable finding: it surfaces a sub-segment or context distinction the team did not anticipate.
- Pause synthesis to gather targeted research that resolves the contradiction.
- Ship synthesis with the contradiction named and the recommendation to gather more data before committing decisions in this area.

**Worked example.** Interviews with new users surface that they want simpler onboarding. Support tickets from new users in the same week surface frequent requests for more configuration options during onboarding. The contradiction may reveal:

- New users say "simpler" but mean "fewer required steps before value"; configuration options are fine if not blocking.
- The interview sample skewed casual users; the support tickets came from power users.
- The contradiction needs more investigation before driving onboarding redesign.

---

## Decision time pressure

**The signal.** Synthesis revealing data gaps but the decision has to ship before more research can happen.

**Why it happens.**

- Roadmap commitments do not flex for data gaps.
- The decision is upstream of work that has already been committed.
- The cost of waiting exceeds the value of additional data.

**The honest path.**

- Name the data gap explicitly in the synthesis. Do not pretend the gap does not exist.
- Make the recommendation with the gap acknowledged. "Given current data, we recommend X. The gap that may revise this recommendation is Y."
- Plan the follow-up research that would validate or revise the recommendation.
- Build instrumentation that will validate the recommendation post-launch (so the team can detect if the recommendation was wrong).

**The path to avoid.** Pretending the data is sufficient when it is not. Synthesis under time pressure that treats partial data as complete data produces decisions the team will not be able to recover from cleanly when the gap surfaces later.

---

## The "we have enough" trap

**The pattern.** Teams that have invested in research want to declare the data sufficient even when the synthesis reveals gaps.

**Why it happens.**

- Sunk-cost reasoning: the team has spent the research budget; restarting feels like waste.
- Timeline pressure: the research was scheduled before synthesis; more research means schedule slip.
- Status concerns: declaring the research insufficient feels like admitting the discovery work was inadequate.

**Why it produces bad synthesis.**

- The data gaps still exist whether or not the team acknowledges them. Decisions made on incomplete data still suffer from the incompleteness.
- Synthesis that papers over gaps trains the team to treat synthesis as performative rather than load-bearing.
- The next discovery cycle will repeat the same scoping mistakes because the team did not name them honestly.

**The discipline.**

- Naming gaps is the synthesis owner's job. The team relies on the synthesis owner to be honest about what the research can and cannot support.
- The cost of naming gaps is short-term discomfort; the cost of pretending they do not exist is bad decisions.
- "We have enough" should be the conclusion of synthesis review, not the assumption.

---

## When more research is the right call

**The criteria.**

- The decision is load-bearing for product direction.
- The gap is large enough that synthesis would be misleading without addressing it.
- The cost of additional research is bounded and feasible.
- The cost of deciding now and being wrong is high.

**Examples that warrant more research.**

- A pricing decision where current research underrepresents the segment that drives revenue.
- An onboarding redesign where the synthesis cannot distinguish what new users want from what they need.
- A positioning shift where existing-customer voice is in the data but prospect voice is missing.

**Examples that do not warrant more research.**

- Minor decisions where the gap's resolution would not change the recommendation materially.
- Decisions where the cost of waiting exceeds the value of additional data.
- Decisions that can be reversed easily based on post-launch data.

---

## When to ship synthesis with named gaps

**The criteria.**

- Decision time pressure makes more research infeasible.
- The gap is named honestly so the team can weigh the recommendation accordingly.
- Post-launch instrumentation will detect if the recommendation was wrong.

**The discipline.**

- The named gap is in the synthesis prominently, not buried.
- The recommendation acknowledges what the gap might change.
- The follow-up research plan is specific and committed.

**Worked example.** "Recommendation: prioritize the onboarding redesign in Q2. Caveat: our research underrepresents enterprise users; if enterprise represents a significant share of new signups, the redesign should include enterprise-specific paths we have not validated. Follow-up: enterprise-specific user research in Q1 to validate the redesign approach for that segment before Q2 ships."

---

## When to drop the pattern entirely

**The criteria.**

- The supporting data is too thin to commit a position even tentatively.
- The pattern, if false, would mislead the team in directions hard to recover from.
- The pattern is not load-bearing for the synthesis's primary recommendations.

**The discipline.**

- Some thin patterns warrant dropping rather than flagging. Not every observation needs to make it into the synthesis.
- Dropping is honest synthesis; inflating is not.

---

## Common gather-more-data failures

**Inflating thin patterns.** Patterns supported by 2 artifacts presented as if supported by 12. Readers cannot distinguish strength.

**Hiding segment gaps.** Synthesis presents recommendations as universal when they apply only to the segment researched.

**Pretending contradictions resolved.** Synthesis writes around the contradiction rather than naming it; readers later discover it on their own.

**Decision-pressure denial.** Synthesis treats time pressure as if it makes data complete. The decision is made; the wrong-decision cost is paid later.

**The "we have enough" trap.** Sunk cost and status protect the synthesis from honest gap-naming.

**Endless research.** The opposite failure: every gap triggers more research; synthesis never ships; the team paralyzes on data-gathering.

---

## The data-sufficiency calibration

A short framework.

1. **Is the gap load-bearing for the recommendations?** If yes, address it. If no, name and proceed.
2. **Is more research feasible within the decision timeline?** If yes, gather. If no, ship with named gaps.
3. **Can post-launch instrumentation catch wrong decisions?** If yes, ship-with-instrumentation is reasonable. If no, more caution warranted.
4. **What is the cost of being wrong vs cost of waiting?** Compare; choose the lower-cost path.
5. **Is the team's commitment to follow-up research credible?** If named gaps will trigger real follow-up, ship-with-gaps works. If named gaps will be ignored, gather now.

---

## Methodology-level choices that stay in the public skill

The pattern thinness signal. Segment under-representation. Contradictory clusters. Decision time pressure. The we-have-enough trap. When more research is and is not the right call. When to ship with named gaps. When to drop patterns. Common gather-more-data failures. The data-sufficiency calibration.

## Implementation choices that stay internal

Specific recruiting pipelines for follow-up research. Specific instrumentation for post-launch validation. Specific synthesis-revision workflows when gaps are named. The team's own conventions for "thin pattern" thresholds. These vary by team.
