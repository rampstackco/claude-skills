# Question architecture patterns

Question count, types, ordering, phrasing, and segment mapping discipline. The questions are the mechanism that produces the segmentation; bad questions produce bad segmentation regardless of how clever the scoring algorithm is.

---

## Question count

Most effective quizzes use 5-10 questions.

**Fewer than 5 questions.** Rarely produces meaningful segmentation. The taker reaches the result quickly, but the result feels arbitrary because too few signals were captured. Useful only for very simple categorizations (binary or 3-segment outcomes).

**5-7 questions.** The sweet spot for most quizzes. Enough to produce nuanced segmentation; few enough that the audience completes without fatigue.

**8-12 questions.** Acceptable when the segmentation is genuinely multi-dimensional or when the audience has high commitment. Watch drop-off carefully; the last few questions are where audiences abandon.

**13+ questions.** Stops feeling like a quiz; starts feeling like a survey. Drop-off rises sharply. If the segmentation truly needs this many questions, consider whether quiz is the right format.

---

## Question types

Choose the type that fits the variable being captured.

**Multiple-choice (single-select).** The most common quiz question type. Each option maps to a segment or scoring weight.

When to use: when the answer space is well-defined and mutually exclusive.
When to avoid: when the audience genuinely could choose multiple answers; forcing single-select frustrates the taker.

**Multiple-select.** Useful when multiple attributes apply to the taker.

When to use: when the answer space includes overlapping options ("which features matter most" with multiple selections).
When to avoid: when scoring complexity outweighs the value; multi-select complicates segmentation.

**Slider or scale.** "On a scale of 1-5, how often do you..." Useful for intensity questions.

When to use: when the variable is continuous (frequency, importance, satisfaction).
When to avoid: when the categorization is genuinely categorical; sliders force false continuity.

**Yes/no.** Useful for binary qualifying questions.

When to use: as part of a broader question set when one binary attribute matters (does the team use a CRM today, yes or no).
When to avoid: as the primary question type; quizzes built only on yes/no questions feel coarse.

**Free text.** Avoid in quizzes. Free text breaks the scoring flow and adds friction. The few quizzes that genuinely need free text often work better as forms or assessments.

---

## Question ordering

The order matters as much as the questions themselves.

**Open with engaging, low-friction questions.** "What kind of role best describes you?" or "What size is your team?" These warm up the taker and build commitment.

**Mid-quiz: substantive segmentation questions.** The questions that most influence the segmentation belong in the middle. The taker has invested enough to commit; you have not yet exhausted their patience.

**Late-quiz: more revealing or sensitive questions.** "How effective is your current process?" or "What is your biggest challenge?" These questions benefit from the trust built earlier.

**End: qualifying questions, if needed.** Demographic data, company-size confirmation, or contact-channel preferences. These belong at the end, not the start. Asking demographic questions first signals "this is a sales form" and depresses completion.

---

## Question phrasing

Plain language. No jargon. No leading.

**Plain language.** Avoid technical terms the audience may not know. If the quiz is for SaaS founders, "ARR" is fine; if it is for general business owners, "annual revenue" is clearer.

**Specific situations.** Frame questions around situations the audience recognizes. "When you onboard a new customer, do you..." beats "What is your customer-onboarding maturity."

**Avoid leading questions.** Phrasing that pushes toward a specific answer biases the result.

- Leading: "How much do you struggle with X?" (presumes struggle)
- Honest: "How would you describe your experience with X?"

**Avoid double-barreled questions.** Questions that mix two dimensions confuse scoring.

- Double-barreled: "How much do you value speed AND simplicity?"
- Cleaned up: split into two questions if both dimensions matter.

**Avoid "all of the above" or "none of the above" defaults.** These options are escape valves that produce uninterpretable answers.

---

## Question-segment mapping

Each question should contribute to the segmentation in a defined way.

**The principle.** For each question, document which answer choices map to which segments and with what weight.

**Example: "What size is your team?"**

- 1-5 employees → segment "Solo or small" (+3 to that segment)
- 6-25 employees → segment "Growing team" (+3)
- 26-100 employees → segment "Mid-market" (+3)
- 101+ employees → segment "Enterprise" (+3)

**Example: "What is your sales process maturity?"**

- "Founder-led, no defined process" → "Solo or small" (+2), "Growing team" (+1)
- "Some defined steps, owner driven" → "Growing team" (+2), "Mid-market" (+1)
- "Defined sales playbook, multiple reps" → "Mid-market" (+2), "Enterprise" (+1)
- "Multi-stage enterprise sales process" → "Enterprise" (+3)

The mapping is explicit. Each question contributes specific weight to specific segments. The mapping should be documented so future maintenance can verify it.

**Filler questions.** Questions that do not affect the segmentation are filler. They add friction without adding value. Audit and remove.

---

## Question count vs segmentation depth

The relationship between question count and segmentation accuracy.

**Few questions, broad segments.** A 5-question quiz produces 4-5 segments reliably; trying to produce 10 segments from 5 questions makes each segment poorly distinguished.

**More questions, narrower segments.** An 8-question quiz can produce 6-8 segments with enough distinction.

**The over-segmentation trap.** Too many segments produced from too few questions creates segments that are not really different. The audience that lands in different segments gets similar recommendations; the segmentation is fake.

**The right ratio.** Roughly 1.5-2 questions per segment is a useful baseline. 5-7 segments from 8-12 questions; 4-5 segments from 5-7 questions.

---

## Conditional questions and branching

Whether to ask different questions based on earlier answers.

**Branching when it helps.** Later questions make sense only in the context of earlier ones. "If you have a CRM today, which one?" is a useful follow-up to "Do you use a CRM today?"

**Branching when it hurts.** When branching adds complexity without value, when the branching makes the quiz feel different for different takers in confusing ways, when the scoring becomes hard to reason about.

**The simplicity preference.** Linear quizzes (everyone gets the same questions in the same order) are easier to maintain, easier to test, and easier for the audience to predict. Use branching only when the value justifies the complexity.

---

## Drop-off considerations

Where audiences abandon, and why.

**The first question.** Some takers click into the quiz and leave at question 1. Often the question or the format made them realize this is not for them. This is fine; honest filtering.

**Mid-quiz (questions 4-7).** Drop-off here usually signals fatigue or discomfort. Audit the questions; are they too long, too sensitive, too repetitive?

**Late-quiz (final questions).** Drop-off here often signals that the user got bored or the value of finishing was not clear. A progress indicator and a teaser of the result ("almost done; see your result next") can reduce late-stage drop-off.

**Question-by-question tracking.** Tracking drop-off per question is the diagnostic. Questions with disproportionate drop-off warrant review.

---

## Mobile question design

Most quiz takers are on mobile. The question UX has to work there.

**Mobile-specific considerations.**

- Touch-friendly answer options (minimum 44x44 pixel touch targets).
- Single question per screen on mobile (multi-question screens cramp).
- Progress indicator visible without scroll.
- Answer options large enough to tap accurately; spacing prevents accidental taps.
- Sliders sized for thumb interaction.

**Mobile testing.** Test the quiz on actual devices. Real-device behavior often differs from browser dev-tools simulation.

---

## Question-mapping audit

Periodically audit the question-segment mapping.

**The audit.** For each segment, verify that the questions actually produce that segment for takers who should get it. Run the quiz with personas representing each segment; confirm each persona reaches the right result.

**The audit cadence.** When the recommendation portfolio changes, when the audience composition shifts, or at least quarterly.

**Drift indicators.**

- One segment now receives 70+ percent of takers.
- Another segment receives less than 5 percent.
- Specific personas reach the wrong segment when audited.
- Audience comments that the result was wrong.

These signals warrant question or scoring revision.

---

## Common question architecture failures

**Too many questions.** 15+ questions feels like a survey; drop-off climbs.

**Filler questions.** Questions that do not affect segmentation; audit and remove.

**Leading questions.** Phrasing that biases the answer.

**Double-barreled questions.** Two dimensions in one question; scoring becomes ambiguous.

**Demographic questions first.** Signals "sales form"; depresses completion.

**Vague answer options.** "Sometimes" vs "often" without anchors; the taker cannot calibrate.

**Inconsistent question types.** Mixing 5-point sliders with yes/no without coherent rationale; the rhythm breaks.

**Mobile-broken questions.** Sliders that do not work on touch; answer options that overflow.

---

## Methodology-level choices that stay in the public skill

Question count, types, ordering, phrasing. Question-segment mapping discipline. Question count vs segmentation depth. Conditional questions and branching. Drop-off considerations. Mobile question design. Question-mapping audit. Common failures.

## Implementation choices that stay internal

Specific question sets for specific quizzes. Specific scoring weights and segment mappings. Specific tooling for quiz engineering and analytics. The team's drop-off benchmarks and audit calendars. These vary by team.
