# Common feedback aggregation failures

Eleven-plus failure patterns with diagnoses and cures. The cross-cutting pattern: most feedback aggregation failures share a single root, which is treating feedback aggregation as collection rather than as decision input.

---

## Failure 1: Loudest customers steer the roadmap

**Symptom.** A small number of vocal customers dominate roadmap discussions. Quieter customers' needs go unaddressed. The product evolves to serve the loudest, not the broadest.

**Diagnosis.** Loudest-voice pattern. Volume from vocal users mistaken for broad signal.

**Cure.** Apply channel-source weighting. Distinguish between distinct-user signal and per-user volume. Triangulate across channels to validate that loud signal represents broad pattern.

**Prevention.** Synthesis names the source distribution explicitly. "This pattern came from 50 distinct users across 3 channels" is different from "this pattern came from 5 users with 200 tickets."

---

## Failure 2: We have lots of feedback but no decisions

**Symptom.** Feedback channels overflow. Tagging happens. Dashboards exist. Decisions get made on intuition rather than on the feedback signal.

**Diagnosis.** Aggregation without synthesis. The triage cadence is missing or broken; feedback is collected without being turned into decision input.

**Cure.** Establish the synthesis cadence (weekly, monthly, quarterly). Each cadence produces output the team uses for decisions.

**Prevention.** Synthesis ownership explicit. Whoever owns synthesis is accountable for the loop's continuity.

---

## Failure 3: Our channels overflow; we cannot keep up

**Symptom.** Feedback volume exceeds the team's capacity to triage, tag, and synthesize. Old feedback never gets reviewed; new feedback piles up.

**Diagnosis.** Capacity mismatch. Either tooling does not scale, or the team is under-staffed for the volume, or both.

**Cure.** Scale tooling: AI-assisted tagging, aggregated channels, automated pattern surfacing. Or reduce capture: not every channel needs to be aggregated.

**Prevention.** Match tooling and capacity to expected volume. Plan for growth; the volume that is comfortable today often is not in 6 months.

---

## Failure 4: Different teams cite different feedback for the same decision

**Symptom.** Engineering team cites one feedback pattern; product team cites another; sales team cites a third. The teams reach for whatever feedback supports their position.

**Diagnosis.** Channel-source weighting absent. Each team uses the channel that is most accessible to them, regardless of decision relevance.

**Cure.** Establish weighting per decision. The synthesis surfaces what the relevant channels say, weighted appropriately. Teams use the synthesis rather than going to channels independently.

**Prevention.** Centralize synthesis ownership. The synthesis owner produces the canonical view; teams reference it rather than producing parallel interpretations.

---

## Failure 5: Customer council meetings produce notes nobody references

**Symptom.** Customer council convenes regularly. Notes are taken. Decks summarize. The notes get filed; no roadmap discussions reference them.

**Diagnosis.** Council without synthesis loop. The meeting is the deliverable; the analytical follow-through is missing.

**Cure.** Apply the synthesis loop to council inputs. Each council meeting produces specific actionable input that feeds product decisions.

**Prevention.** Treat council inputs as part of the broader feedback aggregation, not as a separate stream that produces ceremonial outputs.

---

## Failure 6: NPS is reported monthly but does not inform decisions

**Symptom.** NPS scores get reported in monthly business reviews. The number is part of compliance reporting. It does not inform product decisions.

**Diagnosis.** NPS as compliance metric. The number gets tracked; the underlying signal does not.

**Cure.** Mine NPS comments for patterns. Segment NPS by user segment. Use NPS trends as drift signal. The number itself is less informative than the underlying signal.

**Prevention.** NPS reporting includes the qualitative signal alongside the quantitative score. Decisions reference what NPS comments revealed, not just the score.

---

## Failure 7: Feedback we shipped against did not move sentiment

**Symptom.** Major feature shipped to address feedback. Post-launch sentiment did not improve. The team is confused.

**Diagnosis.** Wrong feedback prioritized. The loud feedback was not the most consequential; the patterns the team addressed were not the patterns that drove sentiment.

**Cure.** Re-examine the synthesis that motivated the work. Was the pattern strong across channels, or was it loud in one channel? Was the segment broad or narrow? Was the change the right response to the pattern?

**Prevention.** Strong synthesis grounds prioritization in cross-channel patterns and frequency-intensity assessment. Single-channel signals get treated cautiously.

---

## Failure 8: Users gave feedback once and never returned

**Symptom.** Users submit feedback through channels. They never engage again. Repeat feedback rates are low.

**Diagnosis.** Closed-loop missing. Users feel ignored after providing feedback.

**Cure.** Establish closing-the-loop communication. Tell users when their feedback drove change. Personal communication for high-impact users; aggregate for broader changes.

**Prevention.** Closing the loop is part of the feedback workflow, not an afterthought. Decisions to ship include closing-the-loop communication as a step.

---

## Failure 9: We tagged everything but cannot find patterns

**Symptom.** Tagging happens systematically. The team applies tags to most feedback items. But synthesis cannot identify clear patterns.

**Diagnosis.** Taxonomy too granular, too coarse, or noisy. Periodic taxonomy review missing.

**Cure.** Run a taxonomy review. Merge tags that fragment patterns; split tags that hide distinct issues; deprecate tags that no longer apply.

**Prevention.** Quarterly or bi-annual taxonomy review. The taxonomy evolves with the program.

---

## Failure 10: Drift in feedback caught us by surprise

**Symptom.** A feedback category grew significantly over weeks or months. The team discovered the change only when it became a problem.

**Diagnosis.** Drift detection missing. The team did not investigate trending patterns until they became urgent.

**Cure.** Establish drift detection: trend dashboards, threshold alerts, periodic trend review.

**Prevention.** Weekly quick scans for sharp drift. Monthly systematic review of category trends. Tooling that surfaces changes automatically.

---

## Failure 11: Sales call data and support ticket data tell different stories

**Symptom.** Sales suggests one priority; support suggests another. Both teams have data; the data conflicts.

**Diagnosis.** Cross-channel synthesis missing. Each channel's signal stays in its own silo.

**Cure.** Run cross-channel synthesis. Compare what sales calls reveal (prospect view) to what support tickets reveal (existing customer view). Often the conflict surfaces meaningful differences (different segments, different lifecycle stages); sometimes it surfaces inconsistency that warrants investigation.

**Prevention.** Synthesis includes cross-channel triangulation. Conflicts get surfaced and resolved or acknowledged.

---

## Failure 12: Feedback aggregation as compliance

**Symptom.** Feedback collection happens because customers expect it or because leadership mandates it. The collection is performative; the synthesis is minimal.

**Diagnosis.** Feedback aggregation treated as ceremony rather than as decision input.

**Cure.** Tie feedback aggregation to specific decisions. The synthesis informs roadmap; decisions reference patterns. If the team cannot trace decisions to feedback, the program is compliance, not aggregation.

**Prevention.** Feedback program goals are explicit and tied to decisions. The program's success is measured by whether decisions reference its synthesis, not by whether feedback was collected.

---

## Failure 13: Synthesis that does not surface patterns

**Symptom.** Monthly or quarterly synthesis happens. The output is descriptive but does not surface patterns or inform decisions.

**Diagnosis.** Synthesis writing is documentation rather than analytical work. The patterns are not extracted; the implications are not drawn.

**Cure.** Apply discovery-research-synthesis discipline to feedback synthesis. Patterns named with conviction; implications drawn; decisions informed.

**Prevention.** Synthesis ownership includes analytical responsibility, not just documentation responsibility.

---

## Failure 14: Tooling-led process

**Symptom.** The team's process follows what the tooling supports. Capabilities the tooling does not support do not happen.

**Diagnosis.** Tooling drives the process rather than the process driving tooling selection.

**Cure.** Step back. Define what the team needs the feedback aggregation to produce. Evaluate tooling against those needs.

**Prevention.** Tooling decisions are downstream of process design. The team designs the process, then selects or builds tooling that supports it.

---

## The cross-cutting pattern

Most feedback aggregation failures share a single root: treating feedback aggregation as collection rather than as decision input.

Collection focuses on capturing feedback: channels integrated, items tagged, dashboards built, scores reported. Output: a record that feedback was collected.

Decision input focuses on what the feedback informs: which decisions, what signal will inform them, what synthesis surfaces patterns the team needs. Output: decisions traceable to feedback patterns.

The fix for almost any feedback aggregation failure starts with the same question: what specifically is this feedback program supposed to inform, and is the synthesis loop producing that input? When the answer is clear, the program becomes load-bearing. When the answer is "we should be aggregating feedback," the program becomes ceremony.

---

## Methodology-level choices that stay in the public skill

The fourteen failure patterns with diagnoses and cures. The cross-cutting collection-vs-decision-input pattern.

## Implementation choices that stay internal

Specific failure-pattern detection. Specific reviewer training. Specific intervention patterns. The team's own conventions for catching failures early. These vary by team.
