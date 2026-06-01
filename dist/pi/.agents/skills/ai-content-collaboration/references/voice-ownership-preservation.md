# Voice ownership preservation

Voice guidelines as prompt input, sample text as voice anchor, mid-draft voice check, final pass in human voice, reject-the-bland discipline.

Voice is the dominant casualty of careless AI workflows. The patterns below are what programs do to keep voice through AI-assisted production. Programs that skip these patterns produce content that is technically correct, semantically generic, and indistinguishable from competitors using the same tools.

---

## Voice guidelines as prompt input

The principle. Every AI generation includes the brand voice guidelines as part of the prompt context. Without explicit voice context, AI defaults to a generic register that flattens distinctive brands into industry-standard prose.

**What goes into the prompt.**

- Voice attributes (3 to 5 attributes; e.g., "direct, confident, slightly skeptical")
- Sentence rhythm preference (short and punchy, measured and layered, conversational with asides)
- Stance pattern (opinionated, diplomatic, coach-style, peer-style)
- Register (formal, casual, register that matches the surface)
- Vocabulary preferences (preferred terms, forbidden terms list)
- Anti-patterns (specific phrases or structures to avoid)

**The discipline.** The voice guidelines are an input to every AI run, not a one-time setup. Teams that paste the voice guidelines into a saved prompt template ensure consistency; teams that re-type them per session produce drift.

**Why this works.** Generic AI defaults are stronger than the AI's training-era voice memory. Without active voice prompting, the AI regresses to the most common patterns in its training data, which are the most common patterns in published content, which are by definition not distinctive.

---

## Sample text as voice anchor

The principle. Feed the AI 2 to 3 paragraphs of canonical brand voice as part of the prompt. AI mimics what it sees more than what it is told.

**What to use as anchor.**

- The brand's strongest published piece in the relevant register
- A canonical opening from the brand's editorial doc
- A published piece from a writer whose voice the brand wants to maintain consistency with

**The discipline.** Anchor text is updated as the brand voice evolves. Stale anchors produce stale-feeling content; the program treats anchors as living documents.

**Why this works.** Description prompts ("write in a direct, skeptical voice") are abstract. AI mimics them generically. Sample text is concrete; AI mimics specific patterns: word choices, sentence shapes, transitional phrases, opening patterns. The mimicry is not perfect but it is closer to the brand voice than the abstract description.

**The combination.** The strongest voice prompt combines voice guidelines (description) with sample text (concrete examples). Either alone produces drift; together they hold the line.

---

## Mid-draft voice check

The principle. Long pieces drift. At the halfway mark of a 3,000-word piece, AI generations regress toward generic. The check catches the drift before publish.

**The check.**

1. Sample paragraphs from the start (first 300 words), middle (1,200 to 1,800 words), and end (last 300 words).
2. Compare each sample to the brand voice doc.
3. If start and end match brand voice while middle samples regress to generic, the piece has voice drift. Send back for revision.

**Detection patterns.**

- Vocabulary regresses (words from the do-not-use list reappear; brand-specific terms drop out)
- Sentence rhythm uniforms (every paragraph 2 to 3 sentences, similar lengths)
- Stance softens (specific positions become "there are good arguments on all sides")
- Register drifts toward "professional neutral" regardless of the surface's intended register

**Cross-reference.** This check is also covered in `editorial-qa/references/voice-consistency-patterns.md`. The two skills are aligned; the QA gate enforces what this skill prescribes.

---

## Final pass in human voice

The principle. The human edits the closing sections in their own voice. The closing is where the piece's emotional register often lands; AI defaults there reduce the piece to flat informational tone.

**Why the closing matters.**

- The reader's last impression
- The conversion or memory moment for the piece
- The signature moment where the brand voice is most recognizable

**The discipline.** Even in Pattern 1 (AI-first draft, human-edit-heavy), the closing 100 to 300 words should be substantially or fully human-written. The opening can be AI-drafted with heavy editing; the closing benefits from being composed in the writer's own register.

**Anti-pattern.** AI-drafted closing paragraphs that announce the piece is ending ("In summary," "By following these steps," "Now you have a comprehensive understanding"). These are AI tells; the human pass should replace them with specific endings: a question, an action, an observation, a direct call to action with concrete language.

---

## Reject the bland

The principle. Any sentence that could appear in any other piece on the topic gets rewritten. Voice lives in the specific.

**The audit.** Read the piece. For each sentence, ask: is this distinctively from this brand, or could it have come from any competitor? The interchangeable sentences are the bland ones.

**The fix.**

- **Replace abstractions with specifics.** "Many companies struggle with X" becomes "73% of B2B SaaS companies surveyed by [source] report struggling with X." If the specific version requires research, do the research; if not, cut the claim.
- **Replace hedges with stances.** "It depends on your situation" becomes "for teams under 50 employees, [specific recommendation]; for teams over 200, [different specific recommendation]."
- **Replace generic openings with brand-specific openings.** Throat-clearing intros become specific entry-points tied to the piece's argument.

**The discipline.** Bland sentences are not just "less interesting" sentences; they are voice-killers. A piece with 20% bland sentences reads as 80% diluted; the brand voice is present but watered down past distinction.

---

## The voice library

A program-level practice. The team maintains a library of canonical brand-voice samples that get used as anchor text in AI prompts. The library evolves as the brand voice evolves.

**Library structure.**

- Voice samples by register (formal whitepaper, casual blog post, conversational email, professional help doc)
- Voice samples by content type (pillar editorial, cluster piece, thought leadership, listicle)
- Voice samples by writer (where the brand has multiple distinct contributor voices)

**Update cadence.** Quarterly. As new pieces ship that exemplify the voice, they go into the library. As old pieces feel stale, they come out.

**Why this matters.** Teams without a voice library re-paste the same 3 paragraphs as anchor text for years. The voice ages; the AI mimicry ages with it; the content starts feeling dated. Library updates keep the anchor fresh.

---

## When voice cannot be preserved

Sometimes the voice is genuinely incompatible with AI assistance at the volume the program requires. Signals.

- Brand voice is so distinctive that AI drafts always need 80% rewriting (Pattern 2 might fit; if even Pattern 2 fails, Pattern 3 or 4 are the only options)
- Audience is so trust-sensitive that any AI involvement compromises the byline (Pattern 3 only)
- Volume target requires AI involvement that voice cannot tolerate

The honest answer in these cases. Reduce volume to match what voice tolerates, or accept voice trade-off as a strategic choice. The trade-off must be deliberate; "we did not realize voice was suffering" is the failure mode.

---

## Methodology-level choices that stay in the public skill

Voice guidelines as prompt input, sample text as voice anchor, the mid-draft sampling discipline, the final-pass-in-human-voice discipline, the reject-the-bland audit, the voice library practice, the "when voice cannot be preserved" honest framing.

## Implementation choices that stay internal

The specific format of the brand voice doc (Notion page, Markdown file, internal wiki). The specific AI tool prompt templates that include voice guidelines and sample text. The specific voice library storage and access pattern. The specific calibration session cadence and team composition. These vary by brand and team.
