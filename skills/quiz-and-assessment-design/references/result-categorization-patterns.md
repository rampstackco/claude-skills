# Result categorization patterns

Segment count, naming, distinguishability, balance. The shape of the result categories that the quiz produces.

The categorization is the quiz's segmentation product. Bad categorization produces results that feel arbitrary or that fail to help the audience act. Good categorization produces results the audience recognizes and uses.

---

## Segment count

Most quizzes work well with 4-8 result categories.

**Fewer than 4 segments.** The categorization feels coarse. Two-segment quizzes (e.g., "is this for you, yes or no") rarely earn the quiz format; a comparison or qualifying form serves better.

**4-6 segments.** The sweet spot for most quizzes. Enough segments to feel nuanced; few enough that each gets adequate development.

**7-8 segments.** Acceptable when the segmentation is genuinely multi-dimensional. Each segment needs a distinct description, distinct recommendation, and clear distinguishability.

**9+ segments.** Often a sign of over-segmentation. Many segments end up similar in description and recommendation; the segmentation becomes fake.

---

## Segment naming

Memorable. Specific. Honest. Brand-voice consistent.

**Memorable.** The taker should be able to describe their segment to a friend. "The Strategic Planner" is memorable; "Type 3" is not.

**Specific.** Names should distinguish the segment from others.

- Specific: "The Hands-On Builder" (vs "Type B")
- Specific: "Solo founder just starting" (vs "Beginner")
- Specific: "Mid-market operator with multiple sales reps" (vs "Mid-tier user")

**Honest.** Names should not flatter universally. Some segments are more flattering than others; honest segmentation reflects this.

- Honest: "Just exploring" alongside "Already executing" alongside "Mature operator." Each describes a real position.
- Dishonest: every segment named with a flattering descriptor regardless of where the taker actually is.

**Brand-voice consistent.** The names should sound like the brand the quiz represents. A serious brand uses serious names; a playful brand can use playful names. Consistency matters.

---

## Segment distinguishability

Each segment should be meaningfully different from the others.

**The test.** Read the descriptions of two adjacent segments. Are they meaningfully different in:
- Who the segment describes?
- What the segment's situation is?
- What the segment's recommendation is?

If yes, the segments are distinguished. If no (the descriptions are similar, the recommendations overlap), the segmentation is fake.

**The fake-segmentation pattern.** A quiz produces 5 segments, but segments 2, 3, and 4 are described in similar terms with similar recommendations. The audience that lands in different segments gets indistinguishable results; the segmentation is decorative.

**The cure.** Either reduce the segment count (if the segmentation does not support 5 segments, do not pretend it does) or strengthen the distinctions (rewrite descriptions and recommendations so each segment is distinct).

---

## Segment balance

Each segment should receive a meaningful share of takers.

**Balanced segmentation.** Each segment receives roughly 10-30 percent of takers (depending on segment count). The audience is genuinely distributed across segments.

**Imbalanced segmentation.** One segment receives 70+ percent of takers; another receives less than 5 percent. The segmentation is not working; the questions do not distinguish meaningfully.

**Why balance matters.**

- Imbalance signals the segmentation is broken.
- The unused segments waste design and copy effort.
- The dominant segment becomes a default that does not really categorize anyone.

**The cure.** Audit the question architecture (`references/question-architecture-patterns.md`). Often the questions do not produce balanced segmentation because they bias toward one segment. Adjust questions or weights to produce more even distribution.

**The exception.** Some quizzes intentionally produce imbalanced segmentation because the audience genuinely skews. A "what is your team size" quiz may produce 60 percent "small team" because the audience is mostly small teams. Honest imbalance reflecting real audience composition is fine; imbalance from broken questions is not.

---

## Segment description

What appears at the result, beyond the segment name.

**The description should include:**

- A 2-3 sentence summary of the segment (who they are, what their situation is).
- Specific characteristics the audience will recognize.
- The matched recommendation (what to do next).
- Optional: case study or worked example of someone in this segment.

**Example segment description.**

```
Segment: "The Mid-Market Operator"

You are running a sales team of 5-25 people across multiple
products or regions. You have a defined sales process but
inconsistent execution; some reps follow it, others freelance.
Your top priority is unifying the team's process without
slowing your fastest performers.

Recommendation: Our Growth plan with the multi-region
playbook configuration. We have a 30-day onboarding path
for teams in your situation.

[Link to PDF: see how 3 mid-market operators implemented
this and the results]
```

The description is specific. The recommendation is matched. The next step is clear.

**Description antipatterns.**

- Generic descriptions that could fit multiple segments.
- Flattering descriptions with no honest characterization.
- Descriptions that describe but do not recommend.
- Recommendations that are the same across segments.

---

## Segment naming patterns

Common patterns and their tradeoffs.

**Pattern A: Role-based names.** "The Strategic Planner," "The Hands-On Builder." Useful when segments correspond to functional roles.

**Pattern B: Maturity-based names.** "Just Starting," "Growing," "Mature." Useful when segments correspond to stages of development.

**Pattern C: Style-based names.** "The Optimizer," "The Connector," "The Visionary." Common in personality assessments. Risk of feeling horoscope-like.

**Pattern D: Situation-based names.** "Solo founder pre-launch," "Mid-market operator with multi-region team." Useful when segments correspond to specific situations the audience recognizes.

**Pattern E: Outcome-based names.** "Cost-focused buyer," "Time-saver-focused buyer." Useful when segments correspond to what the buyer is optimizing for.

The pattern choice depends on the quiz's purpose and the audience the brand serves. The discipline is that whatever pattern is chosen, names should be specific and honest.

---

## Result-page composition

What the result page contains beyond the segment description.

**The standard structure.**

- The segment name and key visual.
- The segment description (2-3 sentences).
- The matched recommendation.
- The clear next step (CTA: download PDF, talk to team, explore product).
- Optional: comparison to other segments (so the taker sees the full picture).
- Optional: share button (if the quiz is shareable).

**The clear-next-step principle.** Every result page must include a specific next step. Without it, the quiz produces awareness without action.

**The optional comparison.** Showing the other segments lets the taker see the full segmentation. Useful when the audience benefits from understanding where they sit; less useful when the segments would distract from the matched recommendation.

---

## Result-page mobile design

The result page must work on mobile.

**Mobile considerations.**

- Segment name and recommendation visible without scroll.
- Visual elements sized for mobile screens.
- CTA button large and prominent.
- Share buttons functional on mobile platforms.

**Common mobile failures.**

- Result hidden below the fold; user does not know it loaded.
- Recommendation buried after a long scroll.
- CTA button tiny or hard to tap.

---

## Segment maintenance

Segments decay along with the quiz.

**What decays.**

- Segment descriptions that no longer match the audience composition.
- Recommendations that point to retired products or content.
- Brand voice that has shifted.

**Maintenance cadence.** Quarterly review of segment descriptions and recommendations. Update as the recommendation portfolio evolves.

**The retire-segment decision.** A segment that receives less than 3 percent of takers consistently may not warrant maintenance. Either restructure the segmentation to merge underused segments or accept that the segmentation has segments that exist but are rarely produced.

---

## The segmentation-recommendation alignment audit

Periodically verify that each segment's recommendation still matches.

**The audit.** For each segment:
- Does the recommendation still exist (not pointing to a retired product)?
- Does the recommendation still match the segment's situation?
- Does the recommendation deliver value to that specific segment?

**The drift.** Recommendations decay. Products are retired, content is updated, the brand evolves. Audit cadence catches the drift.

---

## Common categorization failures

**Too few segments.** Categorization feels coarse; quiz earns no segmentation value.

**Too many segments.** Over-segmentation; segments end up similar; categorization feels fake.

**Generic segment names.** Names that could apply to multiple segments; not memorable.

**Flattering-everyone descriptions.** No honest segmentation; all segments feel positive.

**Indistinguishable segments.** Two segments that read the same; categorization is decorative.

**Imbalanced distribution.** One segment dominates; segmentation is broken.

**Result without recommendation.** Description but no next step; quiz produces awareness without action.

**Recommendations all the same.** Different segments routed to the same product or path; segmentation is decorative.

---

## Methodology-level choices that stay in the public skill

Segment count guidance. Naming patterns and discipline (memorable, specific, honest, brand-voice consistent). Distinguishability test. Balance principle. Segment description structure. Naming patterns A through E. Result-page composition. Mobile design. Segment maintenance. Segmentation-recommendation alignment audit. Common failures.

## Implementation choices that stay internal

Specific segment names for specific quizzes. Specific descriptions in brand voice. Specific recommendations matched to segments. Specific result-page layouts. The team's audit calendars. These vary by team.
