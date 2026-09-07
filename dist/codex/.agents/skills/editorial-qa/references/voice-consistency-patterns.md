# Voice consistency patterns

Vocabulary, rhythm, stance, register. Mid-piece sampling discipline for long pieces. The voice-drift failure mode in AI-co-authored content.

Voice is the most subjective QA dimension and often the easiest one to skip. The discipline below makes voice-consistency checking concrete enough to run repeatably.

---

## Vocabulary

**The check.** Brand-specific vocabulary used correctly; off-brand vocabulary absent.

**Brand vocabulary.** Each brand has a set of terms it uses (or refuses) consistently. Apple says "Mac," not "PC." Stripe says "developers," not "engineers." A B2B SaaS company might say "customers," not "users." A consumer brand might say "members," not "subscribers."

**The audit.** Pull the brand voice doc's vocabulary section. Check the piece for each preferred term and each forbidden term. Failures: off-brand terms slipped in (the writer or AI assistant defaulted to industry-standard vocabulary instead of brand-specific).

**Forbidden terms list.** Every brand has a list. Common patterns: corporate-speak adjectives, throat-clearing phrases, generic descriptors that flatten distinctive voice. The list is short (10 to 30 terms typically); reviewers should know it cold.

---

## Sentence rhythm

**The check.** Sentence rhythm matches brand voice.

**Three common rhythms.**

- **Short and punchy.** Short sentences. Frequent paragraph breaks. Dramatic emphasis through structural choices.
- **Measured and layered.** Longer sentences with subordinate clauses. Paragraphs build through accumulation. Conversational but considered.
- **Colloquial.** Conversational rhythm with mid-sentence asides, contractions, and direct reader address. Reads like a smart person talking.

**The audit.** Read 3 paragraphs aloud. Does the rhythm match the brand's voice doc? Common drift: AI-assisted pieces regress to a uniform medium-length sentence rhythm regardless of the brand's specified rhythm.

---

## Stance

**The check.** The piece takes positions consistent with brand POV.

**Brand stance varies.** Some brands are diplomatic and surface multiple sides without endorsing one. Others are opinionated and take clear positions. Others are coach-style and challenge the reader directly.

**The audit.** Pick 3 to 5 places in the piece where the writer made a stance choice (a recommendation, a warning, an evaluation). Does each match the brand's stance pattern?

**Voice drift signal.** AI-assisted pieces regress toward "diplomatic" stance even when the brand stance is opinionated. "There are good arguments on all sides" is the AI default; opinionated brands need to push the AI back toward conviction explicitly.

---

## Register

**The check.** Formal versus casual matches the surface.

**Surface determines register.** A whitepaper takes one register; a blog post takes another; a help doc takes a third. The brand voice doc usually specifies registers per surface type.

**The audit.** Identify the surface this piece will publish on (blog, knowledge base, whitepaper, marketing page, product help). Check the piece's register against the surface-appropriate register.

**Common drift.** Blog pieces drift formal (they read like watered-down whitepapers). Whitepapers drift casual (they read like long blog posts). Help docs drift either direction. The brand voice doc establishes register expectations; the QA check enforces them.

---

## Mid-piece sampling

**The discipline.** Long pieces drift; sample throughout, not just at start and end.

**Why drift happens.** Writers (human or AI) start in brand voice because that is what the brief, the opening prompt, and the recent context established. By section 4 of a 3,000-word piece, the writer's working memory has shifted to the topic at hand and the voice has drifted toward a generic baseline. AI-assisted pieces drift faster because the model's defaults reassert without continuous reinforcement.

**The sampling pattern.**

- **Start sample.** First 200 words. Voice should be strongest here.
- **Middle samples.** Two paragraphs from the middle 60% of the piece. Voice should hold.
- **End sample.** Last 200 words. Voice should match the start.

If the start and end samples show brand voice and the middle samples show generic voice, the piece has voice drift. Send it back with the drifted sections highlighted.

---

## The voice-drift signal in AI-co-authored content

Voice drift is the dominant voice failure in 2025-2026 content. AI assistants produce drafts that pass the start-and-end check (because the writer set up the opening prompt with brand voice cues) but fail the mid-piece check (because the model defaults reasserted in the middle).

**The detection pattern.**

- Mid-piece paragraphs use vocabulary not in the brand voice doc
- Mid-piece sentence rhythm regresses to medium-length uniformity
- Mid-piece stance becomes diplomatic where brand stance was opinionated
- Mid-piece register drifts toward "professional neutral" regardless of the surface's intended register

**The fix.** When mid-piece drift is detected, the revision pass needs to explicitly pull the voice back. The editor's note: "Sections 3 and 4 read as model-default. Revise with the voice doc's vocabulary, rhythm, and stance. Specifically: [3 specific fixes]."

---

## Voice calibration sessions

Different editors apply voice judgment differently. Quarterly calibration sessions reduce the drift between editors.

**The session.** Three editors review the same piece independently. Each writes a one-paragraph voice assessment. The team reads the three assessments together; differences in interpretation surface; the team reconciles to a shared standard.

**The output.** A short addendum to the brand voice doc capturing the calibration consensus on whatever was contested. Over time the addenda accumulate into a sharper, more specific voice doc.

**Why calibration matters.** Without it, voice judgment varies by editor; writers receive inconsistent feedback; voice drift compounds across the program. The calibration session is preventative; once the team is calibrated, individual reviews stay consistent.

---

## Methodology-level choices that stay in the public skill

The 4-dimension voice check (vocabulary, rhythm, stance, register), the mid-piece sampling discipline, the AI voice-drift detection pattern, the calibration session methodology.

## Implementation choices that stay internal

The specific brand voice doc format (Notion page, Markdown file, internal wiki page). The specific vocabulary list and the specific forbidden-term list (these are brand-specific and live in the brand's own documentation). The specific calibration session cadence and team composition. The specific tooling for archiving voice assessments. These vary per brand and team.
