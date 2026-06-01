# Structure and clarity review

Lede patterns, sectioning principles, endings, structural anti-patterns.

Structure determines whether the piece works as a piece. The discipline below is about making structure visible enough to QA repeatably without becoming process theater.

---

## The lede

The first 200 words. Two valid patterns depending on intent.

**For SEO/AEO pieces.** The lede answers the user's likely query directly. The reader landed from a SERP looking for a specific answer; the lede provides it within the first 200 words. The rest of the piece develops the answer with depth.

**For thought leadership.** The lede establishes the thesis. The reader is investing attention; the lede tells them the argument the piece will defend. The rest of the piece builds the case.

**Lede failure patterns.**

- **Welcome-to-our-blog throat-clearing.** The lede announces what the piece is about to do instead of doing it.
- **Buried lede.** The actual answer or thesis appears in section 4. The reader bounced at section 2.
- **Vague opening.** Generic descriptive paragraph that could open any article on the topic.
- **History dump.** "Since the dawn of [topic]..." Cuts the throat-clearing; ledes do not need a history.

---

## Sectioning

**The check.** H2s map to user mental model, not writer enthusiasm.

**User mental model.** What questions does the reader bring? What questions follow naturally from the first answer? What does the reader want to know next? The H2 sequence answers these in order.

**Writer enthusiasm.** What does the writer find interesting? Where does the writer want to dig deep? Writer enthusiasm produces sections that are well-written but mistargeted; the reader did not come for that section and skips it.

**The audit.** Read the H2 list as a sequence of questions or topics. Does the sequence match what the reader's mind would ask in order? If H2 #4 has the answer the reader landed for, the structure has buried lede; promote H2 #4 to H2 #1.

---

## Section length

**The check.** Even-ish across H2s.

**Why even-ish matters.** One massive section followed by four 80-word sections signals broken structure. The massive section is doing real work; the 80-word sections are placeholders or filler.

**The fix.**

- If the 80-word sections are placeholders: cut them or expand them to the section's natural depth.
- If the massive section is two facets bundled: split it into two H2s.
- If the structure is genuinely uneven (one section needs to be twice as long for substantive reasons): document the rationale; ship with the imbalance acknowledged rather than hidden.

---

## Reading flow

**The check.** Paragraphs connect; sentences vary in length.

**Paragraph flow.** Each paragraph extends the previous one or pivots intentionally. Disconnected paragraphs read as bullet-points-pretending-to-be-prose. The fix: explicit connective tissue between paragraphs (the connection is implicit in the sequence, or the writer adds a one-sentence transition that does the work).

**Sentence variety.** Reading aloud is the audit. Do all the sentences run the same length? That is a tell of AI-assisted writing or rushed drafting. Vary sentence length across the paragraph; mix short declarative sentences with longer ones that build through clauses.

---

## Specificity vs abstraction

**The check.** Claims are concrete, not vague.

**Concrete.** Named tools, named methods, named statistics with sources, named experts, named scenarios. Concrete claims earn citations from AI engines and trust from readers.

**Abstract.** "Many companies struggle with X." "Studies show Y." "Industry leaders agree Z." Vague claims read as content marketing filler; AI engines and readers both deprioritize.

**The fix.** Replace each abstract claim with a specific one. "Many companies struggle with X" becomes "73% of B2B SaaS companies surveyed by [source] report struggling with X." If the specific version requires research the writer did not do, halt and request the research before shipping.

---

## Endings

**The check.** Piece concludes with something specific.

**Specific endings.**

- An action the reader can take now
- A specific question that frames the next step
- A concrete idea that lands as the takeaway
- A direct call to action with a specific destination

**Filler endings to cut.**

- Wrap-up paragraphs that summarize what the piece just said
- Wrap-up frames that announce the ending instead of arriving at it (the conclusion should land as a conclusion, not declare itself)
- Vague "join us as we explore" closings
- Marketing-tone CTAs that do not match the piece's voice

The ending is the last thing the reader reads; it is the moment of conversion or memory. Filler endings waste the moment.

---

## Structural anti-patterns

The patterns that surface in QA, with the fix for each.

**Bullet-list overuse.** When prose would serve, the writer used bullets. Bullets fragment the reading flow and signal AI-assisted drafting. Convert bullets to prose where prose makes the connection between items clearer.

**Subheading-fest.** Every paragraph has its own H3 subheading. Reads as outline-converted-to-content rather than written content. Cut subheadings to the structural ones; let prose carry between subheadings.

**Repetitive paragraph structure.** Every paragraph is 2 or 3 sentences of similar length. Vary the structure: some paragraphs are one long sentence; some are 4 short sentences; some are a sentence and a fragment.

**Forced bilateral framing.** "On one hand X, on the other hand Y" pattern repeated throughout. AI-tell. Pick a position; defend it; let the contrary position get one sentence rather than equal weight when the position is genuinely strong.

**Throat-clearing transitions.** "That said," "With that in mind," "Moving on," "Now let us look at..." All filler. Cut them; the section heading does the transition work.

---

## The read-aloud audit

The fastest structure check. Read the piece aloud (or silently with attention to rhythm).

**Signals.** Where does the rhythm break? Where do you stumble? Where does the reading energy drop? Each break is a structural signal. Sometimes the fix is sentence-level; sometimes it is structural.

**The discipline.** The read-aloud audit takes 10 minutes for a 1,500-word piece. It catches problems that line-by-line review misses. Build it into the QA workflow.

---

## Methodology-level choices that stay in the public skill

The lede patterns, the sectioning principles, the section-length discipline, the reading-flow audit, the specificity rule, the endings discipline, the structural anti-patterns, the read-aloud audit.

## Implementation choices that stay internal

The specific format the team uses for structural feedback (inline comments versus written summary versus structural diff). The specific tooling for documenting structural decisions on a piece (CMS metadata, brief addendum, separate review doc). The specific surface conventions per content type (the team's own blog vs help doc vs landing page structural patterns). These vary by team and stack.
