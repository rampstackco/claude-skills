# AI-content audit patterns

The 11 AI tells, the 6 hallucination patterns, voice drift detection, a worked example. The QA check that did not exist as prominently 2 years ago and is now load-bearing for any program with AI in the loop.

---

## The 11 AI tells

Pattern recognition. Read with these top-of-mind; flag any match.

**1. Excessive em-dashes.** Model-default punctuation. A piece with 8 em-dashes per 1,000 words is almost certainly AI-drafted. The fix: replace with periods, semicolons, or rephrase the sentence.

**2. Predictable opening phrasings.** Throat-clearing openers that announce what the piece is about to do (the fast-paced-world opener, the importance-noting opener, the whether-you-are-X-or-Y opener). These openings appear in AI output across topics; pattern-match against the team's curated do-not-use list and cut.

**3. Predictable concluding paragraphs.** Throat-clearing wrap-ups. "By following these steps." "By implementing these strategies." "Now you have a comprehensive understanding of." All cut.

**4. Bullet-list overuse.** AI defaults to bullets when prose would serve. Bullets fragment reading flow and signal AI drafting. Convert to prose where prose makes the connection between items clearer.

**5. "On the other hand" / "However" overuse.** Forced bilateral framing pattern. Used 4+ times in 1,500 words is the AI tell.

**6. Forced bilateral framing.** "While X has its advantages, Y also has merits." Always two sides given equal weight even when one side is right. The fix: pick a position; defend it; let the contrary view get one short acknowledgment.

**7. Sentence-end filler.** "...and more." "...among other things." "...for example." All padding. Cut.

**8. Repetitive sentence-rhythm.** Every paragraph 2 or 3 sentences of similar length. Read aloud: monotonous. The fix: deliberate variation in sentence length and paragraph shape.

**9. Generic openings.** Descriptive paragraphs that could open any article on the topic. "Customer experience is more important than ever in today's competitive landscape." Cut; replace with a specific opening tied to the piece's thesis or the reader's specific query.

**10. Bridging fluff.** "That said." "With that in mind." "Moving on." Throat-clearing transitions; cut.

**11. Hedge stacking.** "Typically," "generally," "often" stacked on claims that should be specific. AI hedges to avoid being wrong; the result is content that says nothing definite. Replace hedges with specifics or cut the hedge.

---

## The 6 hallucination patterns

Factual errors that AI assistants generate and how to detect each.

**1. Specific decimal places, named source, source does not exist.** "According to a 2024 Forrester report, 67.3% of B2B buyers..." The decimal place plus named source is the AI tell. Detection: search the source. If it does not exist or does not say that, cut the claim.

**2. Quotes attributed to real people the person did not say.** "As Marc Benioff said in his 2024 keynote..." Plausible because Benioff gives keynotes. Detection: search for the quote in actual transcripts; verify against original source. If the quote does not match a real source, cut.

**3. Case studies about companies that do not exist.** "Acme Innovations reduced their cycle time 40% using..." Detection: search the company name. If it does not appear in business directories, news coverage, or LinkedIn, the case study is fake.

**4. Citations to URLs that 404 or never existed.** Detection: click every external link. 404s and dead links are signals; multiple dead links signal multiple unverified claims.

**5. "Studies show" claims with no actual study.** "Studies show that 45% of marketers..." with no link, no journal, no year. Detection: ask for the study. If the writer cannot produce it, cut the claim.

**6. Made-up product features.** "Product X now supports automatic Y" when the product does not. Detection: verify against the product's current documentation, not against marketing copy that might be aspirational.

---

## Voice drift detection

The mid-piece drift pattern in AI-co-authored content.

**The pattern.** Piece starts in brand voice (because the writer set up the opening prompt with brand voice cues). By section 4, the voice has drifted to model-default. The drift is gradual; the start and end pass voice review while the middle fails.

**Detection methodology.**

1. Sample paragraphs from start, middle (2 paragraphs from middle 60%), and end.
2. Compare each sample to the brand voice doc's vocabulary, rhythm, stance, register.
3. If start and end match brand voice while middle samples regress to generic, the piece has voice drift.

**The fix.** Send back with the drifted sections highlighted. Specific note: "Sections 3 and 4 read as model-default. Revise with the voice doc's vocabulary, rhythm, and stance. Specifically: [3 specific fixes from the voice doc]."

---

## Worked example: AI tells in a 4-paragraph excerpt

Original AI-drafted excerpt (with AI tells in bold for the audit):

> **In today's fast-paced digital landscape**, content marketing has become more important than ever. **Whether you're a small business owner or a Fortune 500 executive**, understanding the nuances of effective content strategy is crucial for success.
>
> There are many factors to consider when developing a content strategy. **On one hand**, you need to focus on creating high-quality content that resonates with your audience. **On the other hand**, you also need to ensure that your content is optimized for search engines, social media platforms, **and more**.
>
> **It's important to note** that successful content marketing requires a balance between creativity and analytics. **Studies show** that companies that prioritize data-driven decision-making see significant improvements in their content performance metrics.
>
> **By following these steps**, you'll be well on your way to creating a content strategy that drives results. Remember that consistency is key, and that great content takes time to produce.

The audit tags 9 AI tells in 4 paragraphs (more than 2 per paragraph).

Revised excerpt (AI tells removed, voice tightened, specifics added):

> Content marketing produces results when the strategy answers two questions: who are we writing for, and what do they need to do after reading. The B2B SaaS team writing for senior data engineers asks different questions than the consumer brand writing for first-time buyers. Both work; conflating them does not.
>
> The trade-off most teams get wrong is craft against measurement. Pieces optimized for search rankings often read as templated; pieces optimized for craft often miss the structural patterns that earn rankings. The fix is not balance; it is sequencing. Brief the structural patterns first; write to craft within them.
>
> Companies that ship measurable content programs share three patterns: a brief discipline that survives writer changes, a voice doc specific enough to enforce, and a fact-check gate that does not compromise under deadline pressure. Companies that miss any of the three produce inconsistent output regardless of writer talent.
>
> The next step is auditing your current process against those three patterns. If the brief is vague, fix the brief. If the voice doc is aspirational, tighten it with concrete examples. If the fact-check gate is optional, make it a halt-condition.

The revision removed AI tells, added specifics (the two audience examples, the three patterns), and replaced the closing throat-clearing with a concrete next-step.

---

## The audit checklist

For each AI-co-authored draft, walk this checklist.

1. Read the first 200 words. Does the opening match any of the 11 AI tells? Flag.
2. Sample 2 paragraphs from the middle. Does either match AI tells? Does the voice match the brand voice doc? Flag.
3. Read the last 200 words. Does the closing match any of the 11 AI tells? Flag.
4. Search the piece for em-dashes; count. More than 5 in a 1,500-word piece is suspicious.
5. Search for forced bilateral framing patterns. Count.
6. Verify every statistic, quote, case study, citation, and product claim per the fact-accuracy methodology.
7. Sample 3 to 5 internal links; verify they go where the brief specified and the targets exist.

If 3+ items flag, halt the piece and return for revision with the specific items called out.

---

## Methodology-level choices that stay in the public skill

The 11 AI tells, the 6 hallucination patterns, voice drift detection methodology, the worked example revision pattern, the 7-step audit checklist.

## Implementation choices that stay internal

The specific tooling for automated AI-tell detection (regex patterns, classifier models, prompt-based audits). The specific brand voice doc that drives voice-drift comparison. The specific archive of past AI-tell catches that informs ongoing pattern recognition. The specific revision workflow when AI tells are detected (writer's editing tool, AI assistant configured for revision-not-drafting, human-only revision). These vary by team and tooling preferences.
