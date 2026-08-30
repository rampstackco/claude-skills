# Common collaboration failures

11+ failure patterns with diagnoses and fixes. Cross-references to other reference files where applicable.

The pattern across most failures: the team treated AI as either a magic content factory (producing slop at scale) or as a pure-replacement-or-nothing question (producing inconsistent output as writers privately negotiated their own AI usage). The discipline is in between: humans own, AI accelerates, the workflow is documented, the team is calibrated.

---

## "We used AI and the content feels generic"

**Symptom.** Pieces ship technically clean but feel indistinguishable from competitors using the same tools. Audience growth flat despite consistent publishing.

**Diagnosis.** Voice not preserved. Editing was light; AI defaults reached publish. The pattern that produces this: AI-first drafts with a quick review pass that catches typos but does not rewrite for voice.

**Fix.** Apply the voice ownership preservation patterns (`voice-ownership-preservation.md`): voice guidelines as prompt input, sample text as voice anchor, mid-draft voice check, final pass in human voice, reject-the-bland audit. Increase editing intensity to 50-60% of production time.

---

## "Hallucinated facts made it to publish"

**Symptom.** A statistic, quote, citation, or product claim in a published piece turns out to be invented.

**Diagnosis.** Fact-verification gate skipped or rushed. The team trusted AI output that read as authoritative.

**Fix.** Fact-accuracy as halt-condition gate per `editorial-qa/references/fact-accuracy-and-citation-discipline.md`. Verification methodology that traces every claim to a primary source. Pattern recognition for the 6 hallucination patterns.

---

## "Different writers produce wildly different AI-assisted output"

**Symptom.** Two writers given the same brief and the same AI tools produce pieces that read as if they came from two different programs.

**Diagnosis.** No team calibration. Each writer developed their own AI patterns; the program drifted as different patterns produced different output shapes.

**Fix.** Documented AI policy, calibration sessions, voice library, quality benchmarks per `team-training-and-calibration.md`. Onboarding for new writers includes calibration.

---

## "Our AI-assisted SEO content got penalized"

**Symptom.** A programmatic SEO set or a high-volume editorial program loses 60-90% of traffic in an algorithm update.

**Diagnosis.** Slop volume plus thin templates plus no QA discipline. The set was generating filler pages with limited human direction; the algorithm update detected the scale-without-substance pattern.

**Fix.** Halt new generation. Apply QA at scale per `editorial-qa/references/qa-at-scale-patterns.md`. Sampling discipline with 5% failure threshold. Noindex pages that fail the data-depth threshold. Possibly remove the entire pSEO surface and rebuild from a stronger data source.

---

## "We can't tell what was AI vs human"

**Symptom.** Asked to characterize AI usage on a specific piece, the team cannot answer. Workflow logs, CMS metadata, and writer recall all yield uncertain answers.

**Diagnosis.** No AI usage tracking. The workflow does not capture which AI participated in which stage.

**Fix.** Add AI involvement tracking to the production workflow. The metadata captures: which workflow pattern was used, which AI tools were involved, which stages, which prompts (or prompt template versions), which human made which decisions. The tracking is the input to retrospective audits and to disclosure decisions.

---

## "Readers complained about AI-flavored content"

**Symptom.** Direct audience feedback (comments, support tickets, social mentions) flags content as feeling AI-generated.

**Diagnosis.** Slop reaching the audience. Reader detection is real even when the team's QA does not catch it.

**Fix.** Intensify the human craft pass. Audit recent pieces against the slop avoidance audit (`ai-slop-detection-and-avoidance.md`). If multiple pieces fail the audit, the production patterns need to shift: heavier human editing, more rejection-of-bland, possibly pattern shift from AI-first to AI-as-editor for higher-trust content.

---

## "We disclosed AI usage and lost credibility"

**Symptom.** Team added AI disclosure to a piece; audience response shifted negative.

**Diagnosis.** Could be either:

- The disclosure was for content where audience norms expect human authorship (Tier 1 or Tier 2 content per the disclosure framework); disclosure was correct but audience trust calibration is moving slowly
- The disclosure language was hedging or defensive, signaling lower commitment than direct authorship would have
- The disclosure was for content where it was unnecessary (Tier 4); the disclosure created an issue where there was none

**Fix.** Calibrate disclosure to audience norms per `disclosure-and-transparency-patterns.md`. Specific language matters; defensive language reads worse than no disclosure. Consider audience-research feedback to inform per-content-type disclosure tiering.

---

## "Our AI tools changed and our content shifted"

**Symptom.** Team updates the AI tool or model version. Output behavior changes. Content quality shifts before the team recalibrates.

**Diagnosis.** Over-coupled to one tool's specific behavior. The methodology should be tool-agnostic; the team's prompts and patterns should produce similar output across tools.

**Fix.** Methodology-first calibration. The voice library, prompt templates, and quality benchmarks should be portable across tools. After tool changes, run a calibration session against the new tool to verify the methodology still produces on-voice output. If the methodology no longer works, that is a signal the methodology was over-coupled to tool-specific behavior.

---

## "We're producing 10x more content but the same audience growth"

**Symptom.** Team committed to a 10x content target enabled by AI. Volume hit the target. Audience growth flat or declining.

**Diagnosis.** Volume was not the constraint that was binding. Quality was. The 10x volume produced 10x slop, which earns less per piece.

**Fix.** Reduce volume; increase per-piece quality. Counter-intuitive but empirically the pattern that recovers audience growth. The reduced-volume program with higher craft per piece outperforms the high-volume slop program in audience metrics within 6 to 12 months.

---

## "The team is using AI inconsistently"

**Symptom.** Team members use different AI tools in different patterns for the same kind of work. Output varies by who picked up the assignment.

**Diagnosis.** Calibration sessions overdue. Either the policy is informal (no documented standards) or the documented policy has not been reinforced through calibration.

**Fix.** Quarterly calibration sessions. Tool standardization (or intentional pluralism with documented selection criteria). Onboarding refresh. The cadence is calendar-anchored.

---

## "An expert byline turned out to be substantially AI-drafted"

**Symptom.** A piece bylined by a named expert is publicly identified as substantially AI-drafted (sometimes by AI-detection tools, sometimes by readers familiar with the expert's actual voice).

**Diagnosis.** Ethics breach. The byline implied human authorship; AI authorship was substantive; the gap between claim and reality reached the audience.

**Fix.** Two parts.

- **Immediate.** Correct the published piece (issue an editor's note clarifying the workflow, possibly retract and republish with appropriate disclosure). Apologize where appropriate. Recalibrate.
- **Process.** Restore the ethical floor: bylined expert content requires substantial human authorship. Recalibrate the team. Update the AI policy to document the floor explicitly.

The fix is not "stop using AI." The fix is using AI consistently with the byline's implied authorship.

---

## "Our AI policy is 18 months stale and references tools we no longer use"

**Symptom.** Team consults the AI policy doc; the doc references tools the team migrated away from a year ago. The doc is treated as not authoritative because it is obviously dated.

**Diagnosis.** Policy review cadence has slipped. The doc has not been updated as tools, capabilities, and team practices have evolved.

**Fix.** Quarterly policy review. Each quarter the policy gets reviewed against current practice; updates ship; the team is briefed on the changes. The policy is a living document; staleness signals process failure.

---

## "The team feels guilty about AI use but uses it anyway"

**Symptom.** Team members use AI substantively but do not document, do not discuss in calibration sessions, do not include in retrospectives. AI usage is treated as something to hide.

**Diagnosis.** The team has not articulated its AI ethics. Without articulation, individual writers privately negotiate their own ethics; the team accumulates ethical debt.

**Fix.** Run an ethics conversation explicitly. Articulate the team's position on the six ethical floors per `ethics-and-intellectual-honesty.md`. Document where AI is used substantively. Make the workflow visible. Guilt is usually a signal of unresolved ethical questions; the resolution is articulation, not avoidance.

---

## The pattern across all failures

Most AI-collaboration failures reduce to two patterns.

1. **The team treated AI as a magic content factory.** Outcome: slop, hallucinations, voice loss, audience trust decline.
2. **The team failed to articulate its AI workflow explicitly.** Outcome: drift, inconsistency, ethics debt, calibration failures.

The fix in both cases is the same: explicit articulation of where AI participates, where humans own, what the discipline looks like in practice, and what the team's ethical floors are. The articulation is the work; once the work is done, individual failures become per-piece corrections rather than program-level breakdowns.

---

## Methodology-level choices that stay in the public skill

The 12 failure patterns above, the diagnosis-and-fix structure, the cross-references to other reference files, the underlying-pattern observation about magic-factory thinking and unarticulated workflows.

## Implementation choices that stay internal

The specific tracking system the team uses for AI usage. The specific calibration session cadence. The specific ethics-policy doc and its review process. The specific tool selections and their rationale. These vary per team and brand.
