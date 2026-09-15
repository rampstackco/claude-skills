# Disclosure and transparency patterns

Tiered disclosure framework, language patterns, industry norms.

When should AI usage be disclosed to readers? The answer is not "always" or "never"; it is "calibrate to context." The framework below tiers disclosure decisions by trust sensitivity.

---

## The tiered framework

Four tiers, ordered by disclosure obligation.

### Tier 1: Always disclose

AI usage is disclosed regardless of how light the involvement was.

**Categories.**

- Journalism and news reporting (any AI involvement, any extent)
- Bylined expert opinion (where the byline implies human authorship of the argument)
- Content where AI tools are themselves the subject (transparency about methodology is part of the topic)
- Regulated industries with explicit AI disclosure requirements (financial advice, medical content, legal content in some jurisdictions)

**Reasoning.** In these categories, the reader's understanding of the content's origin is load-bearing for trust. A news story partially AI-drafted reads differently from a story fully reported and written by a journalist; readers have a right to that information.

### Tier 2: Default disclosure (consider context)

Disclosure is the default; opting out requires a specific reason.

**Categories.**

- Thought leadership pieces where the byline carries trust value
- Content that influences purchase decisions (reviews, comparisons, recommendations)
- Content for trust-sensitive audiences (academia, enterprise procurement, professional services)
- Long-form pieces where the audience has reasonable expectation of human craft

**Reasoning.** Readers in these contexts often assume human authorship; AI involvement that is undisclosed becomes a trust violation if discovered. Disclosure is cheap; the trust hit from undisclosed-then-discovered AI involvement is expensive.

### Tier 3: Generally not necessary

Disclosure is allowed but not required by audience expectations.

**Categories.**

- Marketing copy (web pages, ad copy, email marketing copy)
- Descriptive product content (product descriptions, spec listings)
- Programmatic data pages (where the page is obviously data-generated)
- Internal team content (memos, internal reports)
- Copy edit assistance only (the human wrote the piece; AI suggested edits)

**Reasoning.** In these categories, audience expectations do not assume specific authorship. Readers recognize the genre as functional content; AI involvement does not violate trust the way it would in a thought leadership piece.

### Tier 4: Clearly fine without disclosure

Disclosure is unnecessary and would feel weird if present.

**Categories.**

- AI as research assistant (the AI condensed sources; the human wrote)
- AI for transcription only (the human is the writer; the AI was a typist)
- AI for spelling and grammar suggestions (copy edit role only)
- AI as brainstorming partner where the human took the ideas and wrote independently

**Reasoning.** The AI's role was so light that disclosure would imply more involvement than there was. Readers would interpret a disclosure as misleading.

---

## Language patterns

When disclosure is used, the language matters.

### Patterns that work

> "AI tools assisted in research and drafting; the author edited and verified all claims."

> "This piece was generated programmatically from [data source]; reviewed by [team] before publish."

> "The author drafted this piece; AI tools were used for copy edit suggestions."

> "Research synthesis assisted by AI; all sources verified by the author."

The patterns share three features: they specify what AI did, they specify what humans did, they identify the accountability party.

### Patterns to avoid

- **Hedge language.** "May have used AI" or "could have been AI-assisted" reads as covering legal bases without committing to honesty. Be specific or omit.
- **Disclosure that minimizes.** "AI was minimally involved" is hedging; either AI was substantively involved (disclose substantively) or it was not (no disclosure needed for Tier 4 use).
- **Disclosure that overstates.** "Fully written by AI" when humans rewrote 50% is dishonest in the other direction. The disclosure should match the actual AI involvement.

### Where to place disclosure

- **Footer or byline area.** Standard placement; readers find disclosure where they expect it.
- **Inline at relevant points.** When AI involvement varies across a piece, inline notes are clearer than a single footer note.
- **Methodology section.** Long pieces with substantial AI involvement benefit from a "How this piece was produced" section that explains the workflow.

---

## Industry norms

Disclosure norms vary by industry. The principle of intellectual honesty is constant; the specific expectations differ.

**Journalism.** Major journalism organizations have published explicit AI usage standards. The norm is moving toward disclosure of AI involvement in any reported piece. Journalism trust depends on transparency; AI-related opacity is a fast trust violation in the audience.

**Content marketing.** Norms are weaker but moving toward disclosure for high-trust pieces. Branded thought leadership is increasingly expected to disclose AI involvement; routine marketing copy is not.

**Academic and research content.** AI involvement in research papers is a contested area; conferences and journals have varying policies. The conservative default is full disclosure, including which AI tools were used and at what stages.

**Regulated industries.** Financial, medical, and legal content increasingly carries explicit AI disclosure requirements. The defaults here are tighter than in unregulated marketing content; consult the specific regulatory environment.

**Ecommerce and product content.** Disclosure is generally not expected on product descriptions or spec listings. AI generation is genre-typical; readers do not interpret presence or absence of disclosure as meaningful.

---

## When disclosure helps and when it hurts

The honest framing. Disclosure is sometimes a trust gain, sometimes a trust loss; the calibration depends on audience norms.

**Disclosure as trust gain.**

- Audience expects human authorship; disclosure preempts trust loss from later discovery
- Brand positions itself on transparency
- Industry is moving toward disclosure as the new norm
- The piece's value is in research and verification, which AI assisted but did not replace

**Disclosure as trust loss.**

- Audience interprets AI involvement as quality reduction (sometimes a misreading, sometimes accurate)
- Disclosure language reads as defensive or hedging
- Audience expects routine content (where AI is genre-typical)

The decision is not "always disclose" or "never disclose" but "calibrate." The calibration is best done by someone who knows the audience and the brand's positioning, not by a generic policy.

---

## Disclosure policy at the program level

The program-level discipline. Document the disclosure policy by content type. Editors and writers know which content types require disclosure; the disclosure language is templated; the policy is reviewed quarterly.

**Template policy structure.**

- Content type: [thought leadership]. Disclosure: [required]. Language template: [template].
- Content type: [knowledge base article]. Disclosure: [optional]. Language template: [template if used].
- Content type: [programmatic data page]. Disclosure: [not required].
- Content type: [marketing landing page]. Disclosure: [not required].

The policy gets updated as norms evolve. AI disclosure norms in 2026 are looser than they will be in 2028; policy review keeps the program aligned with audience expectations.

---

## When the disclosure decision is hard

Edge cases.

**Long-running expert byline.** A column under a named expert's byline, where some pieces are pure expert authorship and others are substantively AI-assisted. Disclosure on the AI-assisted pieces is the right call; the byline's trust value depends on it.

**Pillar content with mixed authorship.** A pillar piece where the lede is human-written, the body is AI-drafted-then-rewritten, the closing is human-written. Disclosure language can specify the mix: "Research and core argument by the author; AI assisted in initial drafting of body sections; all claims verified."

**Internal-only content that becomes external.** An internal report that gets externalized requires retroactive disclosure if the internal version was AI-assisted. Sometimes the externalization should include rewriting to bring the disclosure inline.

The principle. When the disclosure decision is hard, default to disclosure. Trust is recoverable from over-disclosure; trust is not always recoverable from under-disclosure.

---

## Methodology-level choices that stay in the public skill

The four-tier framework, the disclosure language patterns, the industry norms summary, the trust-gain-vs-trust-loss calibration, the program-level policy structure, the edge-case handling.

## Implementation choices that stay internal

The specific disclosure language the team has developed for each content type. The specific tracking that records AI involvement per piece (workflow log, CMS metadata, byline annotation). The specific review cadence for the disclosure policy. The specific audience-research feedback that informs disclosure norms for the brand's specific audience. These vary by team, brand, and industry.
