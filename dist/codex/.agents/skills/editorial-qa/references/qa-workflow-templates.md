# QA workflow templates

Ownership, sequencing, halt vs flag vs auto-fix, escalation patterns.

The QA workflow is the operational shape of how QA actually runs. Templates below name the patterns; teams adapt the implementation to their own tooling.

---

## Ownership: single QA owner per piece

The principle. One person is accountable for what shipped. Committees diffuse accountability; nobody owns a problem that reaches readers.

**Common ownership models.**

- **Editor-owns-piece.** The editor who reviews the piece is also accountable for what shipped. The same person sees the brief, reads the draft, runs QA checks, ships.
- **Editor + dedicated QA.** Editor reviews voice and structure; dedicated QA runs fact-checks, link audits, schema validation. The editor is still the single point of accountability for ship-decision.
- **Rotating editor pool.** Larger teams have multiple editors; each piece gets one named owner from the pool. The pool is calibrated quarterly so individual editors apply consistent standards.

**Anti-pattern.** Committee review where 4 reviewers comment, nobody decides, the writer revises against contradictory feedback. The fix: name the decision-maker; treat other input as advisory.

---

## The sequencing template

Run QA gates in this order. Each gate is cheaper than the next; running them in order saves the editor's time on pieces that should restart.

1. **Brief-adherence.** First. Cheapest to run. Catches the largest class of failures.
2. **Fact-accuracy.** Second. Halt-condition; AI hallucinations do not progress past this gate.
3. **Structure and clarity.** Third. Identifies pieces that need structural revision before voice and SEO checks make sense.
4. **AI-content audit.** Fourth. Catches AI tells, hallucinations not caught at gate 2, voice drift.
5. **Voice consistency.** Fifth. Mid-piece sampling for long pieces.
6. **SEO and AEO compliance.** Sixth. Most failures here are auto-fixable; rarely halt-conditions.
7. **Internal linking and schema validation.** Seventh. Mostly auto-fix or flag.
8. **Final read.** The last full read before publish. Catches anything the gate-by-gate review missed.

The early gates (brief, fact, structure) save the most time; running them first means a piece that fails brief-adherence does not consume voice/SEO review time.

---

## Halt vs flag vs auto-fix taxonomy

Each QA gate has a default action when failures appear.

**Halt-conditions (return to writer).**

- Brief-adherence failures. The contract was not executed.
- Fact-accuracy failures (hallucinations, unverifiable claims). Cannot ship false claims.
- Structural failures that require rewriting (buried lede, mismatched intent, missing facets). Cannot fix in editor pass.
- Voice drift that requires rewriting sections. Cannot fix inline.

**Flag-and-revise (editor flags; writer or editor revises).**

- Voice consistency issues that are correctable inline.
- Structural issues that need paragraph-level revision (sentence variety, transition smoothing).
- AI tells that need targeted rewriting.
- Specificity gaps where the writer needs to add the missing concrete claim.

**Auto-fix (editor or script ships the correction without writer involvement).**

- Slug, meta description, image alt text.
- Schema markup formatting issues.
- Anchor text variation when same-target links share identical anchors.
- Heading structure mechanical fixes (closing orphan H3s).
- Typos and minor grammar.

The discipline. Most pieces have a mix: some auto-fix items, some flag-and-revise items, sometimes a halt-condition. The editor processes them in the right order: handle auto-fixes inline, batch flag-and-revise items into one return note, halt early if a halt-condition appears.

---

## Escalation patterns

When QA finds a pattern (multiple pieces failing the same check), escalate to the brief author, the writer, or the editorial process owner. Pattern signals process problem, not just per-piece problem.

### Brief-level patterns

- Multiple writers fail brief-adherence on the same brief field. The brief is unclear about that field; tighten the brief template.
- Multiple briefs surface the same gap (always missing the audience specification, always missing the success criteria). The brief authoring process needs feedback.

### Writer-level patterns

- One writer repeatedly produces pieces that fail at the same gate. The writer needs targeted feedback or different work.
- One writer's pieces consistently need substantial revision. Either the briefs the writer receives need to be tighter, or the writer-fit is wrong for the work.

### Process-level patterns

- AI-content audit catches similar tells across pieces. The AI workflow needs additional guardrails.
- Fact-accuracy gates catch repeated hallucinations on the same topic. The verification step for that topic needs more time.
- Schema validation fails consistently on the same content type. The CMS template for that type needs updating.

The escalation. Pattern goes to the editorial process owner with a short summary: "Across the last 12 pieces, 5 failed at [gate] for [reason]. Recommend [action]." The owner decides whether to update the brief template, retrain a writer, change the workflow, or document the pattern as known and accepted.

---

## QA review templates

Common formats for capturing QA findings.

### Halt-condition return note

Short. The note specifies what failed and what needs to change.

> "This piece needs revision before round 2. Three failures: [field 1] missing the brief specification of [X], [field 2] contains an unverified statistic on line [N], [field 3] reads as model-default voice in section 4. Revise per the brief and the voice doc."

### Flag-and-revise inline review

Inline comments in the editing tool. Each comment is short and actionable.

- "[Brief required] Add internal link to [X] with anchor '[Y]' here."
- "[Voice drift] This paragraph reads generic; pull back to brand voice."
- "[Specificity] 'Many companies' is vague; add the source or remove the claim."

### Auto-fix log entry

The editor logs what was auto-fixed for the writer's awareness without requiring writer action.

> "Auto-fixed during review: meta description tightened, schema markup field [X] added, anchor text varied on 2 links to [target]. No writer action required."

### Escalation note

Short summary to the editorial process owner.

> "Pattern: 5 of 12 recent pieces have failed AI-content audit on em-dash count. The writer using AI assistance is shipping mid-stage drafts without final em-dash cleanup. Recommend a final-pass revision guideline added to the AI-co-author workflow doc."

---

## QA cycle time

The discipline keeps QA cycle time tractable.

**Typical times for a 1,500-word piece.**

- Brief-adherence: 5 minutes
- Fact-accuracy: 10 to 30 minutes (depending on claim density)
- Structure and clarity: 10 minutes
- AI-content audit: 5 minutes
- Voice consistency: 5 minutes
- SEO and AEO compliance: 10 minutes
- Internal linking and schema: 5 minutes
- Final read: 5 minutes

**Total.** 55 to 75 minutes for a healthy piece. Pieces that halt at gate 1 or gate 2 take less editor time because the early gates short-circuit the rest.

**The "QA takes longer than the writing" failure.** Usually means the wrong sequencing (running expensive checks before cheap ones). Fix the sequence; the cycle time drops.

---

## Methodology-level choices that stay in the public skill

The single-owner principle, the gate sequencing, the halt/flag/auto-fix taxonomy, the escalation patterns, the review templates, the cycle-time targets.

## Implementation choices that stay internal

The specific editing tool the team uses (Google Docs, Notion, Markdown PRs, headless CMS draft mode). The specific commenting and review workflow within that tool. The specific tracking system for QA logs and escalations (Notion, Linear, Jira, custom database). The specific reporting cadence and format for editorial process owners. These vary per team and tooling.
