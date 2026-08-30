# AI slop detection and avoidance

What produces slop, what prevents it. Cross-references editorial-qa's audit patterns.

AI slop is the term of art for AI-generated content that is technically functional but reads as generic, derivative, and signal-less. The detection patterns live in `editorial-qa/references/ai-content-audit-patterns.md`. This reference addresses prevention: what production patterns produce slop, what production patterns prevent it.

---

## Patterns that produce slop

### AI does too much of the work

The pattern. The AI generates the entire piece; the human glances at it and ships. The piece reads as model-default because no human substantively rewrote it.

The signal. Pieces ship in less time than they would take a human to write from scratch. Speed is not the problem; the problem is that the speed comes from skipped craft.

### Generic prompts

The pattern. The prompt is "write a 1,500-word blog post about X." No brand voice, no audience specificity, no anti-pattern guidance. The AI generates the most common kind of post about X, which is by definition generic.

The signal. Prompts can fit in one sentence. Prompts that produce on-voice output are typically multi-paragraph, with voice guidelines, sample text, audience description, and anti-pattern lists.

### No editorial judgment in the loop

The pattern. The workflow is "AI generates, human reviews quickly, ship." The reviewer is not making editorial decisions; they are spell-checking. Whether the piece is good enough to publish, whether it answers the user's actual question, whether it reflects brand POV are not asked.

The signal. The team cannot articulate the editorial judgments made on a piece because those judgments did not happen. Pieces ship with no halt-decisions, no rewrites, no "this piece does not work, kill it" calls.

### Volume prioritized over quality

The pattern. The team commits to publishing 50 pieces a month with the same headcount that previously produced 10. AI is the multiplier. Quality drops because the production line cannot sustain craft at the new volume.

The signal. Publish targets defined in pieces-per-week or pages-per-month. Quality-controlled publish targets are defined differently: traffic earned, citations earned, leads converted, audience grown. Volume targets without quality targets produce slop volume.

### No iteration

The pattern. First draft (AI-generated) ships. No revision pass. No second draft. No "let us read this aloud and rewrite the bland sections."

The signal. The workflow document does not include a rewrite step. Production is generation-then-publish, not generation-then-iteration-then-publish.

---

## Patterns that prevent slop

### Strong briefs

Per `content-brief-authoring`. A brief that fills all 12 fields gives the AI enough context to produce a draft that respects audience, voice, structure, entity coverage, and success criteria. Vague briefs produce slop output regardless of how the AI is prompted.

The discipline. Brief-adherence is the first QA gate per `editorial-qa`. AI drafts that fail brief-adherence get returned, not rubber-stamped.

### Voice guidelines as prompt context

Per `voice-ownership-preservation.md`. Every AI generation includes the brand voice guidelines and sample anchor text as prompt input. Without active voice prompting, AI defaults dominate.

### Heavy human editing pass

The discipline. The human spends substantial time editing AI drafts: rewriting flat sentences, replacing abstractions with specifics, restoring brand voice in mid-piece sections, replacing generic openings and closings with specific ones.

The time investment. 50 to 60% of the piece's production time goes to human editing in Pattern 1 (AI-first draft, human-edit-heavy). Lower than that and the editing is light; the piece ships with AI defaults preserved.

### Iteration

The discipline. The workflow includes multiple revision passes: AI draft, then human rewrite, then AI suggestions for the rewrite, then human final pass. Each pass catches a different layer.

- AI draft: structure, completeness, basic prose.
- Human rewrite: voice, specificity, claim verification, distinctive POV.
- AI suggestions: copy edit catches, alternative phrasings, repetition flagging.
- Human final: closing voice, emotional register, final polish.

The pattern produces work that reads as human-crafted with AI assistance. Skip any pass and the piece moves toward AI default.

### Editorial judgment at every gate

The discipline. Each QA gate is a judgment moment, not a rubber stamp. Brief-adherence asks "did this piece execute the brief?" Voice consistency asks "does this sound like our brand?" Fact accuracy asks "is every claim verified?" Each question requires a human's actual judgment.

The signal of editorial judgment in action. Halts happen. Pieces get sent back for revision. Some pieces get killed because they cannot be made to work. Programs that publish 100% of what they draft are not exercising editorial judgment; they are producing whatever the workflow ships.

---

## The reader-detection problem

Readers can often sense AI-flavored content even when they cannot articulate why. The signals.

- Generic openings that could be the opening of any article on the topic
- Predictable structure (intro, three points, conclusion)
- Bullet-list overuse where prose would serve
- "Perfect" grammar that reads as emotionally flat
- Specific-but-fake details (named decimals, named sources that turn out to be fake)
- Hedge stacking that avoids commitment

Slop loses reader trust over time even when individual pieces are not penalized by algorithm updates. Readers stop returning. Email open rates drop. Citation quality declines. The traffic numbers may hold for a year before the trust loss compounds visibly.

The implication. Slop is not a search-engine problem; it is a reader-trust problem. Programs that optimize away from slop because of algorithm fear are missing the bigger reason: readers stop trusting the brand.

---

## The slop avoidance audit

For each AI-assisted piece, ask the following before publish.

1. Could this piece have been published by any competitor using the same tools? If yes, the voice is not preserved.
2. Are the claims in this piece specific enough to verify? If no, the piece is hedging.
3. Does the piece take a position the reader will remember? If no, the piece is forgettable.
4. Did the human substantially rewrite, or is the AI draft mostly intact? If mostly intact, the piece is at slop risk.
5. Does the closing read as the writer's own voice? If no, the final pass was skipped.
6. Did the brief adhere to the 12-field discipline? If no, the failure is upstream.

A piece that fails 3+ of these is slop-shaped. Halt and revise.

---

## The "we are producing 10x more content but the same audience growth" pattern

A common signal that slop has set in. The volume increased; the audience metric did not. The team often interprets this as "we need even more content"; the diagnosis is usually the opposite.

The actual diagnosis. Volume was not the constraint. Quality was. The 10x content production has produced 10x slop, which earns less per piece and sometimes hurts the brand's overall trust signal.

The fix. Reduce volume; increase per-piece quality. Counter-intuitive but empirically the pattern that recovers audience growth. The reduced-volume program with higher craft per piece outperforms the high-volume slop program in audience metrics within 6 to 12 months.

---

## Cross-reference

The detection patterns (AI tells, hallucination patterns, voice drift) live in `editorial-qa/references/ai-content-audit-patterns.md`. The avoidance patterns (production discipline) live here. The two skills compose: editorial-qa catches what reaches the gate; this skill prevents production patterns that produce slop in the first place.

---

## Methodology-level choices that stay in the public skill

The patterns that produce slop, the patterns that prevent slop, the reader-detection observation, the 6-question slop avoidance audit, the volume-vs-quality counter-intuition, the cross-reference to editorial-qa.

## Implementation choices that stay internal

The specific iteration loop the team runs (AI draft to human rewrite to AI suggestions to human final, or variations). The specific time-tracking that captures the editing-time-to-generation-time ratio. The specific prompt patterns that include voice guidelines and sample text. The specific reader-feedback channels that surface slop perception. These vary by team and tooling.
