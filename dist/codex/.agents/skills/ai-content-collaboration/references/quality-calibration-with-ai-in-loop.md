# Quality calibration with AI in the loop

How editorial standards shift when AI is in the workflow. Same standards apply; the failure modes shift.

The editorial standards from `editorial-qa` apply identically to AI-assisted work: brief adherence, voice consistency, fact accuracy, structure and clarity, AEO/SEO compliance, internal linking and schema validation. What shifts is the failure-mode profile. Programs that ship AI-assisted content with the same QA discipline as human-written content but without recognizing the new failure modes produce slop while believing they are calibrated.

This reference connects the QA discipline to the AI workflow discipline. It surfaces the shifts.

---

## Same standards, different failure modes

For each editorial standard, the failure mode that dominates in AI-assisted production differs from the failure mode that dominated in human-only production.

### Brief adherence

**Human-only failure.** Writer skips a brief field because they think they know better, or misreads the brief.

**AI-assisted failure.** AI ignores brief fields that were not in the prompt context. The brief is in one document; the AI prompt is in another. Brief fields that did not get pasted into the prompt do not get executed.

**The fix.** Prompt templates that explicitly include all 12 brief fields. Brief-adherence QA gate runs against the brief, not against the prompt.

### Voice consistency

**Human-only failure.** Writer fatigue causes voice drift in section 4 of long pieces. Editorial style drift over months as writers absorb each other's tics.

**AI-assisted failure.** AI default voice reasserts mid-piece. Long AI generations regress toward generic by section 4 reliably. The drift is faster than human drift and more consistent across pieces.

**The fix.** Mid-piece voice sampling per `voice-ownership-preservation.md`. Voice anchor text in every prompt. Final pass in human voice on every long piece.

### Fact accuracy

**Human-only failure.** Lazy fact-checking. The writer "remembers reading" something but does not verify. Citations to publications without specific dates or page references.

**AI-assisted failure.** AI hallucinations. Plausible-but-fake statistics with named sources that do not exist. Quotes attributed to real people who did not say them. Citations to URLs that 404.

**The fix.** Fact-accuracy as halt-condition gate per `editorial-qa`. Verification methodology that traces every claim to a primary source. Pattern recognition for the 6 hallucination patterns.

### Structure and clarity

**Human-only failure.** Buried lede, vague opening, history dump in section 1. Mismatched section lengths.

**AI-assisted failure.** Generic opening that could open any article on the topic. Repetitive paragraph structure (every paragraph 2 to 3 sentences). Bullet-list overuse where prose would serve. Forced bilateral framing throughout. Wrap-up filler endings.

**The fix.** AI-content audit per `editorial-qa/references/ai-content-audit-patterns.md`. Read-aloud audit catches what line-review misses.

### AEO and SEO compliance

**Human-only failure.** Writer forgets to include the target keyword in title and headings. Schema markup absent or invalid.

**AI-assisted failure.** AI over-optimizes the surface (keyword in every heading, schema markup over-claimed) but under-optimizes the substance (the answer paragraph is generic, the entity coverage is thin, the POV is absent).

**The fix.** AEO/SEO checks that go beyond surface compliance into substance: is the top-200-word answer self-contained, is the entity coverage what the brief specified, is the POV distinctive.

### Internal linking and schema validation

**Human-only failure.** Writer skips internal-link discipline because it feels mechanical. Anchor text uses "click here" or generic phrases.

**AI-assisted failure.** AI-generated links to URLs that do not exist (hallucinated link targets). Anchor text repeats the same exact-match keyword across multiple links because the AI defaults to that pattern.

**The fix.** Link-target liveness check on every published piece. Anchor text variation as a explicit QA item.

---

## The "QA standards must be tighter" claim is wrong

A common misreading. Teams shipping AI-assisted work decide their QA needs to be tighter, more checks, more thresholds. The misreading produces checkbox theater.

The accurate reading. QA needs to be calibrated to the new failure modes, not tightened indiscriminately. The standards stay the same; the patterns to look for shift.

The discipline. When a team starts AI-assisted production, the QA process gets reviewed against the new failure-mode profile. Some checks become more important (fact accuracy, voice consistency, AI-content audit). Some checks become less important (the writer's preferred typo patterns, since the AI does not have the same typo patterns). The QA shape adjusts.

---

## Calibration sessions specific to AI-assisted work

The calibration session methodology from `team-training-and-calibration.md` adapts for AI-assisted work specifically.

**The AI-specific calibration session.**

1. Three editors independently review the same 3 to 5 AI-assisted pieces.
2. Each editor's assessment includes the AI-content audit dimensions: AI tells, hallucination patterns, voice drift, slop signals.
3. The team reads all assessments together.
4. Differences in interpretation surface; reconcile.
5. Output: addendum to the AI policy doc capturing the calibration consensus on AI-specific QA dimensions.

The cadence. Quarterly minimum. More frequent during program build or after AI tool changes that affect output behavior.

---

## When the team is calibrated but the output still feels off

Symptoms.

- QA gates pass, individual pieces look fine, the program's overall feel is generic
- Readers complain about AI-flavored content despite QA passing
- Audience growth flat despite shipped quality being technically high

Diagnosis. The QA discipline catches per-piece failures. It does not catch program-level patterns: every piece passing voice review individually but the cumulative output reading as homogenized.

The fix. Add a program-level review to the calibration cadence. Read 10 published pieces in sequence. Do they sound like one publication with a distinctive voice, or do they sound like 10 separate AI-assisted pieces from different generic publications? The latter signals voice has been preserved at the per-piece level but lost at the program level.

The intervention. Tighter voice library, more aggressive reject-the-bland discipline, possibly a return to a heavier human-writes pattern for trust-anchor pieces (pillars, thought leadership, named-author content) while keeping AI-assisted patterns for cluster work.

---

## The "ship vs hold" calibration

In AI-assisted production, the ship-vs-hold decision shifts. More pieces marginally pass QA; the question becomes whether marginal-pass pieces should ship.

**Human-only mode.** Marginal pieces usually have specific fixes. The editor flags them; the writer fixes them; the piece ships.

**AI-assisted mode.** Marginal pieces often have systemic AI-tells throughout that fixing one-by-one will not address. The editor's choice is between substantial rewrite (back to Pattern 2 or 3) or kill.

The discipline. Some AI-assisted pieces are kill candidates, not revise candidates. The team should have explicit kill criteria: pieces that fail AI-content audit on 4+ dimensions, pieces where voice was lost beyond paragraph-level recovery, pieces where the underlying brief was thin enough that the AI draft has nothing to anchor to.

Killing pieces is part of the discipline. Programs that publish 100% of what they draft are not exercising editorial judgment.

---

## The calibration-with-AI checklist

For each AI-assisted piece, beyond the standard QA gates.

1. AI-content audit run per `editorial-qa/references/ai-content-audit-patterns.md`?
2. Voice anchor text was used in the prompt?
3. Mid-piece voice sample taken on long pieces?
4. Final pass in human voice for the closing?
5. Fact-accuracy gate ran with AI-hallucination patterns specifically in mind?
6. Disclosure decision made per the disclosure tier framework?
7. The piece passes the "could a competitor have shipped this with the same tools" test?

If 2+ items fail, the piece is at slop risk. Halt and revise.

---

## Methodology-level choices that stay in the public skill

The same-standards-different-failure-modes mapping, the "QA standards must be tighter" misreading correction, the AI-specific calibration session adaptation, the program-level review pattern, the kill-criteria discipline, the calibration-with-AI checklist.

## Implementation choices that stay internal

The specific QA tooling that surfaces AI-specific failure patterns. The specific automation that flags potential AI tells before manual review. The specific calibration session cadence and team composition. The specific kill-criteria thresholds the team has settled on. These vary by team scale and content sensitivity.
