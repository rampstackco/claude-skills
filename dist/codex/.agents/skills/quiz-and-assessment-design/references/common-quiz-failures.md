# Common quiz failures

8+ failure patterns with diagnoses and cures. The patterns that surface as "the quiz did not produce qualified leads" or "engagement is high but nothing converts" or "we cannot tell if the quiz worked."

---

## "Quiz gets shared widely; lead quality is poor."

**The diagnosis.** Clickbait pattern. The audience taking and sharing is not the audience the brand serves; the quiz attracts engagement from a broader audience than the brand's target.

**The cure.** Tighten the quiz's audience-fit. Specific titles, specific topics, specific recommendations matched to the brand's actual buyers. Detail in `references/quiz-investment-criteria.md` (recommendation-portfolio precondition) and `lead-magnet-design`'s audience-fit qualification.

---

## "Engagement is high; downstream conversion is near zero."

**The diagnosis.** Vanity-result pattern. Takers enjoyed the segment but had no next step. The quiz produced moments of attention without action.

**The cure.** Add specific recommendations to each segment. Detail in `references/result-to-recommendation-mapping.md`. Each result page must include a clear next step.

---

## "Most takers route to the same segment."

**The diagnosis.** Question architecture not distinguishing. Either the questions do not actually capture differentiating signals, or the scoring algorithm biases toward one segment.

**The cure.** Audit the question-segment mapping (`references/question-architecture-patterns.md`). Ensure each question contributes meaningfully to multiple segments. Audit the scoring weights for unintended bias.

---

## "Drop-off mid-quiz is high."

**The diagnosis.** Too many questions, or questions feel uncomfortable, or the value of finishing is not clear.

**The cure.** Reduce question count if over 12. Audit questions for those that feel sensitive or repetitive. Add a progress indicator and a teaser of the result ("almost done; see your result next") to reduce late-stage drop-off.

---

## "Segments feel similar."

**The diagnosis.** Distinguishability problem. Either over-segmentation (more segments than the questions can support) or weak descriptions that do not differentiate.

**The cure.** Reduce segment count to what the questions can distinguish (`references/result-categorization-patterns.md`). Strengthen the descriptions to make each segment meaningfully different.

---

## "Recommendations feel generic."

**The diagnosis.** Mapping problem. Each segment needs a specific recommendation, not a default.

**The cure.** Audit the segment-to-recommendation mapping (`references/result-to-recommendation-mapping.md`). Verify each segment has a distinct, valuable, actionable recommendation.

---

## "We cannot tell which segment converts best downstream."

**The diagnosis.** Attribution missing. Segments need tracking through the funnel.

**The cure.** Tag leads by segment at capture. Track downstream conversion per segment. The data informs which segments warrant continued investment and which segments may need different recommendations.

---

## "Audience comments that the result was wrong."

**The diagnosis.** Either question or scoring problem. The segments do not match audience self-perception.

**The cure.** Persona testing. Have personas representing each segment take the quiz; verify each persona reaches the intended segment. Adjust questions or scoring weights to align.

---

## "The quiz earns 5000 takers; the email list grows by 200."

**The diagnosis.** Either the result is not perceived as valuable enough to opt in for additional value (Pattern B failure), or the email gate is for the result itself with no value-add (lead-trap risk).

**The cure.** Design a substantive value-add for the email opt-in (PDF, sequence, resource). Make the value-add visible at the result. Detail in `references/lead-capture-integration-patterns.md`.

---

## "We added a quiz; our other lead magnets stopped converting."

**The diagnosis.** Cannibalization. The quiz absorbed the audience that previously converted via other magnets.

**The cure.** This may not be a failure. If the quiz-sourced leads are higher quality than the previous magnets, the cannibalization is portfolio improvement. If not, the quiz may have replaced a working magnet with a worse one; audit and decide.

---

## "Sales says quiz-sourced leads are low-fit."

**The diagnosis.** Either the audience-fit at the quiz is wrong (the quiz attracts non-target audiences) or the recommendation-mapping routes audiences to wrong products.

**The cure.** First, audit the audience-fit. If the quiz is attracting the wrong audience, tighten the targeting (title, topic, distribution channels). Second, audit the recommendation-mapping. If the audience-fit is right but the recommendation is wrong, fix the mapping.

---

## "The quiz looks great; nobody completes it."

**The diagnosis.** Either the topic does not engage the audience (audience-fit weak) or the question count is too high (drop-off too early).

**The cure.** First, validate the topic with audience research. If the topic is right, audit the question count and question phrasing.

---

## "Engagement was great at launch; conversion has dropped 40 percent over a year."

**The diagnosis.** Decay. Recommendations have shifted; segments have evolved; references are stale.

**The cure.** Audit and refresh. Update recommendations to match current portfolio; verify segments still describe the audience accurately; refresh any stale references in question phrasing or result descriptions.

---

## "We made the quiz shorter; conversion went up but downstream conversion went down."

**The diagnosis.** Question removal removed differentiating signals. The quiz now produces engagement faster but the segmentation is weaker.

**The cure.** Restore the questions that contributed to segmentation. Speed-of-completion is a metric; segmentation quality is a separate metric. Optimize for the right one.

---

## "The result page is fine; the email follow-up sequence converts terribly."

**The diagnosis.** Sequence does not match the segment. Either the sequence is generic across segments, or the sequence does not deepen the matched recommendation.

**The cure.** Design segment-specific sequences (or at least segment-specific opening emails). The sequence should extend the result's recommendation, not start over with generic content.

---

## "We tried branching logic; the quiz felt confusing."

**The diagnosis.** Branching added complexity without value. Different takers got different question sets; comparison across takers became hard.

**The cure.** Revert to linear quiz unless branching is genuinely warranted. The simplicity often produces better outcomes.

---

## "The quiz works on Chrome; it breaks on Safari mobile."

**The diagnosis.** Browser/device-specific bugs. The quiz was tested on the team's primary platform; the audience's actual devices were not covered.

**The cure.** Cross-browser, cross-device testing. The audience uses what they use; the quiz has to work there.

---

## "The recommendation links to a product we discontinued."

**The diagnosis.** Maintenance lapse. The quiz's recommendation drifted out of sync with the brand's actual offering.

**The cure.** Set a maintenance trigger: when products are discontinued or pricing changes, the quiz updates are part of the change. Quarterly review at minimum.

---

## "Audiences take the quiz multiple times to get different results."

**The diagnosis.** This is fine, often. Audiences exploring the segmentation may take it multiple times to understand how the algorithm works. Track unique users vs total completions.

**The action.** Make sure the algorithm is stable enough that repeated takes with consistent answers produce consistent results. Inconsistency at this level signals algorithm issues.

---

## "The quiz produces good leads; the sales team does not follow up."

**The diagnosis.** Sequence or routing missing. Quiz-sourced leads should be tagged, routed to sales, and prioritized appropriately.

**The cure.** Design the post-conversion flow. Calculator-sourced leads should be tagged with their segment, routed to the appropriate sales rep, and the sales rep should know which segment the lead represents.

---

## The pattern across failures

Most quiz failures fall into one of three patterns.

**Pattern 1: The quiz does not deliver actionable segmentation.** Clickbait, vanity-result, no-recommendation, mismatched-recommendation. The fix is to add or correct the recommendations.

**Pattern 2: The quiz does not match the audience.** Audience-fit weak, topic-audience mismatch, format-audience mismatch (e.g., quizzes for enterprise audiences who reject the format). The fix is to align the quiz to the audience the brand serves.

**Pattern 3: The quiz decays.** Recommendations point to retired products; segments no longer describe the audience; references are stale. The fix is maintenance discipline.

The metric pattern: quiz failures often look fine on engagement metrics. The signal is in lead quality, downstream conversion, and audience self-recognition. Programs that track only engagement keep shipping the same patterns.

---

## Methodology-level choices that stay in the public skill

The catalog of failure patterns with diagnoses and cures. The pattern across failures (delivery, audience-fit, decay). The principle that engagement alone is insufficient as a success metric.

## Implementation choices that stay internal

Specific failure cases the team has encountered and the lessons learned. Specific multi-metric dashboards the team uses. Specific cures the team applies. The team's audit and retirement processes. These vary by team.
