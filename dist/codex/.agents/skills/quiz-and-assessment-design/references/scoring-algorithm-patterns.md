# Scoring algorithm patterns

Direct mapping, weighted scoring, multi-dimensional, branching. Choice criteria and tradeoffs. The math that turns answers into a segment.

The scoring algorithm is the bridge from question answers to result categorization. The right algorithm produces meaningful segments; the wrong algorithm produces results that do not match audience self-perception.

---

## Pattern A: Direct mapping

Each answer corresponds directly to a segment. The dominant answer choice determines the result.

**How it works.**

- Each question's answer choices map to specific segments.
- Each answer adds 1 point (or fixed weight) to its corresponding segment.
- The segment with the most points wins.

**Example.**

Question: "What size is your team?"
- 1-5 → "Solo" (+1)
- 6-25 → "Growing" (+1)
- 26-100 → "Mid-market" (+1)
- 100+ → "Enterprise" (+1)

After all questions, the segment with the highest count wins.

**Strengths.**

- Simple, transparent, easy to explain.
- Easy to maintain (changes are obvious in their effect).
- The scoring logic can be displayed to the audience without confusion.

**Weaknesses.**

- Limited nuance; one answer cannot contribute to multiple segments meaningfully.
- Risk of ties when multiple segments score equally.

**When to use.** When segments are well-defined and questions clearly distinguish them. The default starting point for many quizzes.

---

## Pattern B: Weighted scoring

Each answer adds points (with weights) to one or more segments. The highest-scoring segment wins.

**How it works.**

- Each question's answer choices add weighted points to one or more segments.
- An answer might add 3 points to segment A and 1 point to segment B.
- After all questions, the segment with the highest total score wins.

**Example.**

Question: "What is your sales process maturity?"
- "Founder-led, no defined process" → "Solo" (+3), "Growing" (+1)
- "Some defined steps" → "Growing" (+3), "Mid-market" (+1)
- "Defined sales playbook" → "Mid-market" (+3), "Enterprise" (+1)
- "Multi-stage enterprise process" → "Enterprise" (+4)

This question is more central to segmentation, so its weights are higher.

**Strengths.**

- Allows nuance; one answer can contribute to multiple segments.
- Different questions can have different importance through their weights.
- Reduces tie likelihood by spreading weights.

**Weaknesses.**

- Less transparent (audience cannot easily reverse-engineer the result).
- More complex to maintain (changes to weights have non-obvious effects).
- Easy to bias accidentally if weights are not audited.

**When to use.** When segmentation needs nuance, when some questions are more important than others, when the segmentation is multi-attribute.

---

## Pattern C: Multi-dimensional

The quiz produces scores across multiple axes. The result combines the scores into a 2D or 3D segment.

**How it works.**

- The quiz captures scores across 2-3 distinct dimensions (e.g., introvert/extrovert AND analytical/intuitive).
- The result is determined by the position on each dimension (introvert + analytical = one quadrant; extrovert + intuitive = another).
- Common in personality assessments, fit-evaluations, and any segmentation that is genuinely multi-axis.

**Example.**

A 2-dimensional quiz might score:
- Dimension 1: technical depth (low to high)
- Dimension 2: collaboration preference (solo to team)

Result quadrants:
- High technical, solo → "Solo specialist"
- High technical, team → "Team specialist"
- Low technical, solo → "Solo generalist"
- Low technical, team → "Team generalist"

**Strengths.**

- Captures genuine multi-dimensional segmentation.
- Produces results that feel nuanced and accurate.
- Allows for richer recommendations matched to the dimensional combination.

**Weaknesses.**

- Significantly more complex than single-axis scoring.
- Larger result-set to design and maintain (4 quadrants from 2 dimensions; 8 from 3 dimensions).
- Harder for the audience to predict their result before taking.

**When to use.** When segmentation is genuinely multi-axis (personality, fit-evaluation, learning style, decision-making style).

---

## Pattern D: Branching logic

The next question depends on the previous answer. Allows for adaptive questioning.

**How it works.**

- The quiz starts with a few common questions.
- Based on early answers, the quiz routes to different question sets.
- Different paths through the quiz produce different results.

**Example.**

Question 1: "Do you currently use a CRM?"
- Yes → branch A (questions about current CRM, satisfaction, gaps)
- No → branch B (questions about why not, what would change, current process)

The two branches produce different question sets that map to different segments.

**Strengths.**

- Adaptive; questions feel relevant to the taker.
- Can produce highly specific segmentation.
- Reduces irrelevant questions for any one taker.

**Weaknesses.**

- Significantly more complex to build and test.
- Harder to compare segments because not all takers answered the same questions.
- Maintenance is harder; changes to one branch can affect overall scoring.

**When to use.** When later questions make sense only in the context of earlier ones, when the audience genuinely needs different questions based on their initial situation.

---

## Choice criteria

Which pattern fits which quiz.

**Use direct mapping when:**

- Segments are well-defined and clearly distinguished.
- Each question maps cleanly to one segment.
- Transparency matters (audience benefits from being able to reason about their result).

**Use weighted scoring when:**

- Segmentation needs nuance.
- Some questions are more central to segmentation than others.
- Most answers contribute to multiple segments meaningfully.

**Use multi-dimensional when:**

- Segmentation is genuinely multi-axis.
- The audience expects a richly textured result (personality assessments, learning styles).
- Each dimension can be measured by a coherent subset of questions.

**Use branching when:**

- Later questions depend on earlier context.
- The audience genuinely splits into distinct groups that need different question sets.
- The maintenance complexity is justified by the segmentation value.

The simplest pattern that produces the right segmentation is usually the best choice. Complexity has cost; only spend it where it produces value.

---

## Tie-breaking

What happens when two segments score equally.

**Pattern A: First-tied-segment wins.** The segment that reached the top score first (in the order segments are evaluated) wins. Simple but can introduce bias if the order is not deliberate.

**Pattern B: Tie-breaker question.** A specific question whose answer breaks the tie. Useful when ties are common.

**Pattern C: Combined-segment result.** A result for the tie itself ("You are between segment A and segment B"). Useful when the tie is genuinely meaningful.

**Pattern D: Re-prompt or randomize.** Ask one more clarifying question to break the tie. Adds friction but produces a definitive result.

**The choice.** Depends on how often ties occur and how meaningful the distinction between tied segments is. If ties are rare and the segments are similar, Pattern A is fine. If ties are common and the segments differ significantly, Pattern B or C is warranted.

---

## Edge-case handling

What happens at the boundaries of the scoring.

**The all-segments-zero edge case.** A taker answers in a way that gives zero points to every segment. Rare but possible. Default to the most common segment, or surface a "we could not categorize you" message that prompts re-engagement.

**The very-high-single-segment edge case.** A taker scores extremely high on one segment, far above any other. Often signals strong segmentation; the result is reliable.

**The all-segments-equal edge case.** A taker scores equally across all segments. Often signals the questions did not distinguish; the result is unreliable. May warrant a different question set or a different recommendation flow.

**The contradictory-answers edge case.** A taker's answers contradict each other in ways the scoring did not anticipate. Often surfaces in audit; the question set may need clarification.

---

## Scoring transparency to the user

Whether to show the score during or after the quiz.

**Show the score.** When the dimensions or score are themselves meaningful to the user (personality assessments often benefit from showing dimensional scores).

**Hide the score.** When the score is implementation detail and the segment is the meaningful output (most recommendation quizzes hide the score).

**Hybrid.** Show segment + a brief explanation of how it was determined. "Your result is X. The questions that most influenced this were Y and Z."

The choice depends on whether the score helps the user understand or distract from the result.

---

## Algorithm decay

Scoring algorithms decay along with quizzes.

**What decays.**

- Question weights that no longer reflect the segmentation reality.
- Segments that have shifted in audience composition.
- Edge cases that have become more common.

**Maintenance cadence.** Quarterly review of the scoring algorithm. Audit a sample of takers to confirm results match expectations.

**Drift indicators.**

- One segment receiving 70+ percent of takers.
- Audience comments that the result feels wrong.
- Sales-team feedback that quiz-sourced leads are misclassified.

---

## Algorithm testing

Test the scoring algorithm before launch and after changes.

**Persona testing.** Create personas representing each intended segment. Take the quiz as each persona; verify each persona reaches the intended segment.

**Edge-case testing.** Try answer combinations that should produce ties, contradictions, or boundary conditions. Verify the algorithm handles them gracefully.

**Volume testing.** Run the quiz with synthetic data simulating expected audience composition. Verify segment distribution matches expectations.

**Production monitoring.** Track segment distribution over time. Sudden shifts may indicate question or scoring issues.

---

## Common scoring failures

**Algorithm too simple for the segmentation.** Direct mapping when weighted scoring is needed; segments end up poorly distinguished.

**Algorithm too complex for the segmentation.** Multi-dimensional when single-axis would have served; complexity without value.

**Hidden bias in weights.** Weights that systematically favor one segment regardless of true audience composition.

**Tie-breaking arbitrary.** Ties resolved in inconsistent or biased ways.

**No production monitoring.** Algorithm drifts unnoticed; segment distribution becomes skewed.

**Scoring not documented.** Future maintainers cannot reason about the algorithm; changes break in unexpected ways.

---

## Methodology-level choices that stay in the public skill

The four scoring patterns with how-it-works, strengths, weaknesses, and when-to-use guidance. Choice criteria. Tie-breaking patterns. Edge-case handling. Scoring transparency. Algorithm decay and maintenance. Algorithm testing. Common failures.

## Implementation choices that stay internal

Specific scoring algorithms for specific quizzes. Specific weights and segment mappings. Specific testing personas. Specific tooling for algorithm implementation and monitoring. These vary by team.
