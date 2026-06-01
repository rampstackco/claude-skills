# Common QA failures

11+ failure patterns with diagnoses and fixes. Cross-references to other reference files where applicable.

The pattern across most failures: QA either drifted into theater (checks that do not catch problems but cost reviewer attention) or skipped the gates that catch the problems readers actually encounter. The fix is upstream: cut theater checks, reinstate gates that actually catch problems.

---

## "Our QA process is a 47-item checklist nobody completes"

**Symptom.** The checklist exists. Nobody completes it honestly. Reviewers either skim and check boxes or burn out under the cognitive load.

**Diagnosis.** Checkbox theater. The checklist accumulated over time as new failures appeared and got added; nothing was ever removed. The list grew past what reviewer attention can sustain.

**Fix.** Audit the checklist. For each item, ask: when did this last catch a problem? If the answer is "never" or "more than 6 months ago," cut it. The remaining items are the catch-problems checks; the cut items were theater.

**Prevention.** Quarterly review of the checklist. Each new check earns its keep by catching at least one problem within 90 days; checks that do not catch problems get cut.

---

## "We caught zero problems in QA last quarter"

**Symptom.** No QA returns. No halt-conditions. No revision rounds. Pieces ship clean every time.

**Diagnosis.** Either the writers are extraordinary or the process is broken. Almost always the latter.

**Fix.** Audit recently-shipped pieces independently of the original QA. Find the problems QA missed: hallucinated statistics, voice drift in long pieces, broken links, schema validation failures. Document each. Reinstate the QA gate that should have caught the failure.

**The pattern.** When QA catches nothing for a quarter, reviewers have stopped reading carefully. The fix is not "trust the writers"; it is reinstating the discipline that was nominally still running.

---

## "Editor and writer disagree on voice"

**Symptom.** Editor returns the piece with voice notes; writer pushes back; edits go back and forth without convergence.

**Diagnosis.** Voice guidelines are vague. Both editor and writer are interpreting the brand voice doc differently because the doc does not specify enough.

**Fix.** Update the voice doc with concrete examples of the disputed dimension. If the dispute was about sentence rhythm, add 5 paired examples (the rhythm we want, the rhythm we do not want). The voice doc gets sharper; future disputes resolve by reference to the examples.

**Prevention.** Quarterly voice calibration sessions (see `voice-consistency-patterns.md`) where editors review the same piece independently and reconcile.

---

## "AI hallucinations made it to publish"

**Symptom.** A statistic, quote, citation, or product claim in a published piece turns out to be invented. Reader (or competitor) flags it.

**Diagnosis.** The fact-accuracy gate was skipped or rushed.

**Fix.** Two parts.

- Immediate: correct the published piece, document the failure in the QA log.
- Process: reinstate fact-accuracy as a halt-condition. AI hallucinations do not progress past this gate. If the gate is too slow, automate the easy parts (named-entity extraction, statistic detection) so manual verification focuses on the hard parts.

**Prevention.** Fact-accuracy gate runs second in the QA sequence (after brief-adherence). Detail in `fact-accuracy-and-citation-discipline.md`.

---

## "Our pSEO set is shipping thin pages"

**Symptom.** Programmatic pSEO set is producing pages with insufficient data; pages render at 200 to 400 words of templated boilerplate; algorithm risk compounds.

**Diagnosis.** Sampling discipline missing or thresholds not honored. The set was generating pages without QC checking the quality at the data-shape level.

**Fix.** Implement the sampling discipline (see `qa-at-scale-patterns.md`). Set the 5% failure threshold; halt new generation when breached. Audit the existing set; noindex or remove pages below the data depth threshold.

**Prevention.** Sampling and threshold gating built into the program at design time, not retrofitted.

---

## "QA takes longer than the writing"

**Symptom.** The team's writers ship drafts in 4 hours; QA cycle takes 6 hours. The bottleneck is review.

**Diagnosis.** Wrong sequencing. The team is running expensive checks (voice, structure) before cheap checks (brief-adherence, fact-accuracy). When a piece fails at gate 1, the time spent on gates 5 to 8 is wasted.

**Fix.** Reorder the sequence. Brief-adherence first; fact-accuracy second; halt-conditions short-circuit the rest of the gates. Voice and SEO checks last because they are easiest to fix and rarely halt-conditions.

**Prevention.** The sequencing discipline is documented in `qa-workflow-templates.md`; new editors get the sequence in their onboarding.

---

## "Reviewers burn out"

**Symptom.** Editors who used to review carefully now skim. The catch rate drops. Editors leave the team.

**Diagnosis.** The QA load exceeds reviewer capacity. Often because checks that do not catch problems are taxing reviewer attention.

**Fix.** Cut theater checks (the same fix as the 47-item checklist failure). Burn-out reduces with the cognitive load.

**Also.** Verify that production volume matches reviewer capacity. If the team is shipping 30 pieces a week with 1 editor, the volume is wrong. Either reduce volume, add reviewers, or accept lower quality with eyes open.

---

## "Voice drifts halfway through long pieces"

**Symptom.** 3,000-word pillar pieces start in brand voice; by section 4 they read generic.

**Diagnosis.** Voice review only sampled the start and end. Mid-piece drift went undetected.

**Fix.** Mid-piece sampling discipline (see `voice-consistency-patterns.md`). Sample paragraphs from start, middle (2 paragraphs from middle 60%), and end. AI-co-authored pieces especially need this.

**Prevention.** Voice review template explicitly requires mid-piece sampling.

---

## "We never go back to evaluate"

**Symptom.** QA process exists. QA log accumulates. Nobody reviews the log.

**Diagnosis.** The log is an artifact, not a feedback mechanism. Patterns the log surfaces never reach the editorial process owner.

**Fix.** Quarterly QA log review. The owner reads the log; pattern observations get translated into process changes (brief tweaks, writer feedback, workflow adjustments, automation additions).

**Prevention.** The quarterly review is calendar-anchored. Skipping it is the failure mode.

---

## "Different editors apply different standards"

**Symptom.** A piece shipped under editor A would be returned under editor B (or vice versa). Writers receive inconsistent feedback. Quality varies by which editor caught the piece.

**Diagnosis.** Voice and structural standards have drifted between editors. Without calibration, individual editors apply individual taste.

**Fix.** Calibration sessions. Three editors review the same piece independently; the team reads the three assessments together and reconciles. The consensus updates the voice doc and the QA process; future reviews stay consistent.

**Prevention.** Calibration sessions quarterly minimum. Onboarding new editors includes a calibration round before they review live pieces solo.

---

## "We ship and discover problems on social"

**Symptom.** Readers (or competitors, or critics on social) flag problems that QA did not catch.

**Diagnosis.** QA was not catching the problem class that is reaching readers. The class might be hallucinations, voice drift, structural problems, factual errors, or off-brand tone.

**Fix.** Identify the class of failure that reached readers. Add a QA check that catches that class. Document the addition in the QA log so the pattern becomes visible.

**Prevention.** The QA process evolves with feedback from shipped pieces. New failure classes that reach readers feed new QA checks.

---

## "AI tells slipped through"

**Symptom.** Published piece reads as AI-generated despite a human editor reviewing it. Readers or AI-detection tools flag it.

**Diagnosis.** The AI-content audit either was not run or ran without the pattern recognition the editor needed.

**Fix.** Add the AI-content audit as a named gate in the QA sequence (see `ai-content-audit-patterns.md`). Train the editor on the 11 AI tells; provide the worked example as reference. The audit becomes a 5-minute discipline rather than an unstructured "does this read OK" check.

**Prevention.** Every AI-co-authored piece runs through the audit. The audit is a named gate, not an implicit step.

---

## The pattern across most failures

Most QA failures are designed-in. The process either drifted into theater (cuts needed) or skipped gates that should have been there (gates needed). The discipline is upstream: design the QA process around catch-problems, not around process appearance, and the operational discipline at scale becomes manageable.

---

## Methodology-level choices that stay in the public skill

The 12 failure patterns above, the diagnosis-and-fix structure, the prevention guidance, the upstream-discipline observation.

## Implementation choices that stay internal

The specific QA log format and tooling. The specific calibration session cadence and team composition. The specific automation that supports each gate (statistic detection, hallucination flagging, schema validation, link audit). The specific escalation pathways within the team's structure. These vary by team and tooling.
