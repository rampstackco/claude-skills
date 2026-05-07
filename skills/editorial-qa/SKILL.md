---
name: editorial-qa
description: "Pre-publish QA framework for content. Brief adherence, voice consistency, fact accuracy, structure and clarity, AI-content audit, SEO and AEO compliance, internal linking and schema validation, QA at scale via sampling, the QA workflow, and the discipline that distinguishes catch-problems QA from checkbox QA. Triggers on editorial QA, content review, pre-publish review, content audit, content QA process, AI-content audit, hallucination check, content sampling, programmatic QA, voice consistency check, brief adherence check. Also triggers when a content team is shipping sloppy work, when AI-co-authored content is reaching publish unaudited, when a QA process burns reviewers out, or when a programmatic SEO set needs sampling discipline."
category: content
catalog_summary: "Pre-publish QA framework: brief adherence, voice consistency, fact accuracy, AI-content audit, AEO/SEO compliance, sampling at scale, and the workflow that distinguishes catch-problems QA from process theater"
display_order: 7
---

# Editorial QA

A senior editor's playbook for pre-publish content QA. The discipline that catches problems BEFORE content ships, not after.

Most content QA is broken in one of two directions. The thin version is "did I read it once and is the spelling OK," which catches typos but misses brief drift, voice inconsistency, hallucinated facts, AI tells, and structural problems that reach readers as "this is fine but not memorable." The thick version is a 47-item checklist that nobody completes honestly because it is process theater: checkboxes nobody actually believes catch problems.

This skill is the discipline of catch-problems QA. Each check earns its keep by catching a specific class of failure that would reach readers if missed. Checks that do not catch anything get cut. Checks the production volume cannot sustain get redesigned (sampling instead of full audit, automated instead of manual). The QA framework is what is left when you remove the theater.

The skill covers three production shapes: single editorial pieces (one at a time, full QA), AI-generated drafts (with the AI-content audit that did not exist as prominently 2 years ago), and programmatic SEO sets at scale (sampling discipline, threshold gating). Each needs its own QA shape; the underlying methodology composes across all three.

When to use this skill: building a content QA process from scratch, auditing an existing QA process that ships sloppy work or burns out the team, designing QA gates for an AI-assisted workflow, or building sampling discipline for programmatic SEO sets.

---

## What this skill is for

This skill spans pre-publish quality control. It plugs in at the END of every other content skill's output. The six-skill content suite distinction:

- `content-strategy` is program scope: what to produce.
- `pillar-content-architecture` is hub scope: how the topical hub fits together.
- `content-brief-authoring` is per-piece scope: briefs each piece.
- `content-and-copy` is execution scope: writes each piece.
- `programmatic-seo` is scaled scope: generates many pages from data.
- This skill is gate scope: verifies before publish.

Every skill above produces a draft. This skill is what gets drafts to publishable. It is the gate where quality is actually enforced.

The audience: editorial leads, content directors, in-house content QA, agencies with production lines, content ops managers, anyone running a writer (human or AI) and accountable for what ships. The voice is senior editor to junior editor or content marketer. Specific, opinionated, honest about where QA earns its keep versus where it becomes process theater.

---

## Catch-problems QA vs checkbox QA

The keystone distinction. Two failure modes plus the discipline.

**Thin QA (typo-checking dressed as quality control).** "I read it once, it is fine." Catches obvious mistakes; misses brief drift, voice inconsistency, hallucinated facts, structural problems, AI tells. Output: shipped content that is "fine but not memorable." Cost: invisible until a brand misstep, a hallucinated statistic, or a competitor's content compounds and the thin set falls behind.

**Thick QA (47-item checklist nobody completes honestly).** Every conceivable check listed; no triage. Reviewers either skim and check boxes (theater) or burn out under the cognitive load. Output: shipped content slightly more polished than thin QA produces, but the team's review velocity collapses. Cost: throughput drops; reviewers leave; the checklist atrophies into a few checks that actually run.

**Catch-problems QA (the discipline).** Each check earns its keep by catching a specific class of failure that would reach readers if missed. Checks that do not catch anything get cut. Production volume drives sampling versus full-audit decisions. Reviewers are accountable for what they caught, not for box-completion.

The litmus test. If the team can name the last 3 problems each QA check caught, the check earns its keep. If a check has not caught anything in 6 months, it is theater. Cut it; reallocate the attention to checks that catch real problems.

---

## Brief adherence check

Did the writer execute the brief? The check is straightforward when the brief is well-authored (see `content-brief-authoring`).

The brief-adherence checks:

- **Target keyword and cluster.** Present in title, first paragraph, headings.
- **Search intent and SERP format.** Piece matches the dominant SERP format (article when SERP wants article, listicle when SERP wants listicle).
- **Target audience.** Piece reads as written FOR the named audience, not for a generic reader.
- **Heading structure.** Piece follows the H2 / H3 outline in the brief, or has a documented reason for deviation.
- **Required entities.** Every entity flagged in the brief appears in the piece.
- **Internal links.** Outbound links specified in the brief are present with the right anchor text.
- **Anti-patterns.** Piece avoids the off-limits language and structures named in the brief.
- **Success criteria acknowledged.** Piece is shaped to MEASURE against the success criteria.

The brief-adherence check is the cheapest, fastest, highest-value QA gate. It runs first in the QA sequence because catching a brief-adherence failure early saves the editor from spending time on voice and structure on a piece that will need to restart.

If briefs are vague, this check is impossible. Fix briefs first; the QA process cannot enforce a contract that does not exist.

Detail in [`references/brief-adherence-checklist.md`](references/brief-adherence-checklist.md).

---

## Voice consistency check

Does the piece sound like the brand?

- **Vocabulary.** Brand-specific terms used correctly; off-brand terms absent.
- **Sentence rhythm.** Matches brand voice (short and punchy versus measured and layered versus colloquial).
- **Stance.** The piece takes positions consistent with brand POV.
- **Register.** Formal or casual matches the surface (blog versus whitepaper versus help doc).
- **Voice drift in long pieces.** 3,000-word pieces often start in brand voice and drift to generic by section 4. Sample paragraphs from start, middle, end.

For AI-co-authored pieces, voice drift is the dominant failure mode. AI assistants regress to a model-default voice unless the writer actively pulls them back. The QA check needs to read for the brand voice as much as for the words.

Detail in [`references/voice-consistency-patterns.md`](references/voice-consistency-patterns.md).

---

## Fact accuracy and citation discipline

Every claim in the piece needs to be true. The check:

- **Statistics.** Every number sourced or removed if no source.
- **Quotes.** Every quote attributed to a real person who actually said it.
- **Case studies.** Every example refers to a real company or scenario, or labeled clearly as hypothetical.
- **Dates and timelines.** Verified, not approximate.
- **Named experts.** Real people who consented to attribution.
- **Product claims.** Matches actual product behavior, not future-tense roadmap or marketing aspiration.

Hallucination is the dominant failure mode in AI-assisted writing. AI assistants generate plausible statistics, plausible quotes, plausible case studies, none of which are real. The fact-accuracy check is the gate that catches them. If you skip this gate on AI-generated content, you ship hallucinations.

Citation discipline:

- Inline citations link to authoritative sources (academic papers, industry reports, primary sources).
- Avoid citing other content marketing pages (citation laundering).
- Date the source; sources older than 3 years for fast-moving topics need refresh.

Detail in [`references/fact-accuracy-and-citation-discipline.md`](references/fact-accuracy-and-citation-discipline.md).

---

## Structure and clarity check

Does the piece work as a piece?

- **Lede.** First 200 words answer the user's likely query (for SEO/AEO pieces) OR establish the thesis (for thought leadership).
- **Sectioning.** H2s map to user mental model, not writer enthusiasm.
- **Section length.** Even-ish across H2s. One massive section plus four 80-word sections signals broken structure.
- **Reading flow.** Paragraphs connect, sentences vary in length.
- **Specificity vs abstraction.** Claims are concrete, not vague.
- **Endings.** Piece concludes with something specific (action, question, idea), not throat-clearing filler.

Detail in [`references/structure-and-clarity-review.md`](references/structure-and-clarity-review.md).

---

## AI-content audit

The QA check that did not exist as prominently 2 years ago. AI-co-authored content has detectable patterns even when written by a competent human editor.

**AI tells (pattern recognition).**

- Excessive em-dashes (model-default punctuation)
- Predictable opening phrasings (throat-clearing openers that announce what the piece is about to do; the fast-paced-world opener, the importance-noting opener, the whether-you-are-X-or-Y opener)
- Predictable concluding paragraphs (throat-clearing wrap-ups, "By following these steps")
- Bullet-list overuse where prose would serve
- "On the other hand" / "However" overuse
- Forced bilateral framing (always "two sides" even when one side is right)
- Sentence-end filler ("...and more.", "...among other things.", "...for example.")
- Repetitive sentence-rhythm (every paragraph 2-3 sentences, similar lengths)
- Generic openings (descriptive paragraphs that could open any article on the topic)
- Bridging fluff ("That said", "With that in mind", "Moving on")
- Hedge stacking ("typically", "generally", "often") on claims that should be specific

**Hallucination patterns (factual errors).**

- Statistics that look authoritative (specific decimal places, named source) but the source does not exist or does not say that
- Quotes attributed to real people who did not say it
- Case studies about companies that do not exist
- Citations to URLs that 404 or never existed
- "Studies show" claims with no actual study behind them
- Made-up product features

**Voice drift.**

- Piece starts in brand voice, drifts to generic by section 4
- Vocabulary regresses to model defaults
- Stance becomes diplomatic ("there are good arguments on all sides") when brand stance was clear

The audit shape. Read with these patterns top-of-mind. Flag any match. The bar is not "AI was used" (it almost always is now); the bar is "would a careful human editor have shipped this." If the patterns above are present, the piece needs another revision pass with the patterns called out.

Detail in [`references/ai-content-audit-patterns.md`](references/ai-content-audit-patterns.md).

---

## SEO and AEO compliance check

Does the piece serve search engines AND answer engines?

**SEO checks.**

- Target keyword in title, H1, first paragraph, slug
- Heading hierarchy clean (no orphan H3s, no H4 without H3)
- Image alt text descriptive
- Meta description compelling and keyword-aware
- Internal links specified in brief are present
- External links open in new tab (typically) and have rel attributes appropriate
- URL slug short and descriptive

**AEO checks.**

- 40 to 60 word answer paragraph immediately following each H2 question
- TL;DR section present (for pillar pieces)
- FAQ section with FAQPage schema (for pieces where Q and A format applies)
- Specific statistics with cited sources (AI engines weight statistics with sources)
- Named entities (experts, methods, tools) consistently mentioned (entity coverage signals)
- Distinctive POV that is attributable to the brand

Detail in [`references/seo-aeo-compliance-checklist.md`](references/seo-aeo-compliance-checklist.md).

---

## Internal linking and schema validation

**Internal linking.**

- Outbound links specified in brief are present with correct anchor text
- Anchor text varies (avoid every link being "click here" or every link being the exact-match target keyword)
- Link targets are live (no 404s, no links to deprecated pages)
- Internal link count appropriate to length (3 to 7 for typical 1,500-word piece, 8 to 15 for pillars)
- Self-cannibalization check: piece does not compete with existing pieces for same target keyword

**Schema validation.**

- Article schema present on most pieces; HowTo schema on instructional pieces; FAQPage schema where Q and A applies
- Schema validates against schema.org definitions (no missing required fields, no malformed JSON-LD)
- Schema is consistent with on-page content (do not claim 5-star rating in schema if no rating on page)

Detail in [`references/internal-linking-and-schema-validation.md`](references/internal-linking-and-schema-validation.md).

---

## QA at scale

For pieces shipping at programmatic-SEO scale (100s to 100,000s of pages), full-audit QA is infeasible. Sampling discipline replaces it.

**Sampling strategy.**

- Random sample 50 to 200 pages per audit cycle
- Balance the sample across data shape (sparse versus dense records, recent versus old generation, popular versus niche categories)
- Fixed sample percentage as set grows; absolute count plateaus around 200 once the set is large

**Automated checks at scale.**

- Heading structure validation
- Schema markup validation
- Word count (flag pages below the floor, e.g. 600 words)
- Duplicate content check (compare each page against the rest of the set)
- Broken-link check
- Image-presence check (where templates expect images)

**Manual checks on sampled pages.**

- Brief-adherence equivalent (template-adherence check: does the page execute the template?)
- Top-200-word answer quality
- Whether the page would satisfy a human user's likely query
- Whether the page reads as distinctive versus templated
- Spot-check for AI hallucination if AI was in the loop

**Threshold gating.**

- If more than 5% of sampled pages fail the manual review, halt new generation
- Fix the template OR data quality issue before resuming
- Document the threshold breach in the QA log so patterns become visible

Detail in [`references/qa-at-scale-patterns.md`](references/qa-at-scale-patterns.md).

---

## The QA workflow

Ownership and sequencing.

**Single QA owner per piece**, not a committee. The owner is accountable for what shipped. Committees diffuse accountability; nobody owns a problem that reaches readers.

**Sequencing.** Brief-adherence, then fact-accuracy, then structure, then AI-content audit, then voice, then SEO/AEO, then internal linking, then schema. Brief-adherence first because it is the cheapest gate; SEO/AEO checks last because they are easiest to fix and rarely halt-conditions.

**Halt vs flag vs auto-fix.**

- Brief-adherence and fact-accuracy can HALT (return to writer).
- Voice and structure FLAG with suggestions; editor judgment decides whether to halt or revise inline.
- SEO/AEO and schema typically auto-fix (slug, meta description, schema markup are mechanical edits the editor or a script can ship without writer involvement).

**Escalation.** When QA finds a pattern (multiple pieces failing the same check), escalate to the brief author, the writer, or the editorial process owner. Pattern signals process problem, not just per-piece problem.

Detail in [`references/qa-workflow-templates.md`](references/qa-workflow-templates.md).

---

## Common failure modes

Rapid-fire. Diagnoses in [`references/common-qa-failures.md`](references/common-qa-failures.md).

- "Our QA process is a 47-item checklist nobody completes." Checkbox theater; cut to the checks that earned their keep.
- "We caught zero problems in QA last quarter." Either the process is broken or the writers are extraordinary; investigate.
- "Editor and writer disagree on voice." Voice guidelines are vague; document brand voice with concrete examples.
- "AI hallucinations made it to publish." Fact-accuracy gate skipped or rushed; reinstate as halt-condition.
- "Our pSEO set is shipping thin pages." Sampling discipline missing or thresholds not honored.
- "QA takes longer than the writing." Wrong sequencing; brief-adherence early catches problems before voice/structure investment.
- "Reviewers burn out." Checks that do not catch problems are taxing reviewer attention; cut them.
- "Voice drifts halfway through long pieces." Sample mid-piece paragraphs, not just open and close.
- "We never go back to evaluate." QA log archives feed pattern detection; quarterly review.
- "Different editors apply different standards." Calibration sessions where editors review the same piece independently and reconcile.
- "We ship and discover problems on social." QA was not catching the problem class that is reaching readers; add a check for that class.

---

## The framework: 12 considerations for editorial QA

When designing or auditing a QA process, walk these 12 considerations.

1. **Catch-problems vs checkbox.** Every check earns its keep by catching a class of failure.
2. **Brief-adherence first.** Cheapest, fastest, highest-value gate.
3. **Fact-accuracy as halt-condition.** AI hallucinations do not ship to readers.
4. **Voice consistency including mid-piece sampling.** Long pieces drift; sample throughout.
5. **AI-content audit.** Pattern recognition for AI tells, hallucinations, voice drift.
6. **Structure and clarity.** Lede, sectioning, even-ish length, specific endings.
7. **SEO and AEO compliance.** Answer paragraphs, schema, entity coverage.
8. **Internal linking and schema validation.** Outbound links live, anchor text varies, schema validates.
9. **Sampling at scale.** Programmatic and high-volume sets need sampling, not full-audit.
10. **Threshold gating.** Failure rate above threshold halts generation; document breaches.
11. **Single QA owner per piece.** Accountability not diffused across committee.
12. **Sequencing.** Brief-adherence to fact-accuracy to structure to AI-audit to voice to SEO/AEO to linking to schema.

The output of the framework is a QA process the team can run repeatably: each check named, each owner named, each halt-condition documented, each sampling rule specified for programmatic surfaces.

---

## Reference files

- [`references/brief-adherence-checklist.md`](references/brief-adherence-checklist.md) - Every brief field as a QA check, with how to verify and what failure looks like.
- [`references/voice-consistency-patterns.md`](references/voice-consistency-patterns.md) - Vocabulary, rhythm, stance, register, mid-piece sampling discipline for long pieces.
- [`references/fact-accuracy-and-citation-discipline.md`](references/fact-accuracy-and-citation-discipline.md) - Verification methodology, hallucination detection, citation rules, source-age guidelines.
- [`references/structure-and-clarity-review.md`](references/structure-and-clarity-review.md) - Lede patterns, sectioning principles, endings, structural anti-patterns.
- [`references/ai-content-audit-patterns.md`](references/ai-content-audit-patterns.md) - 11 AI tells, 6 hallucination patterns, voice drift detection, worked example with revision.
- [`references/seo-aeo-compliance-checklist.md`](references/seo-aeo-compliance-checklist.md) - SEO and AEO checks combined into one workflow.
- [`references/internal-linking-and-schema-validation.md`](references/internal-linking-and-schema-validation.md) - Link discipline, anchor text variation, schema patterns and validation.
- [`references/qa-at-scale-patterns.md`](references/qa-at-scale-patterns.md) - Sampling strategy, automated checks, manual review at scale, threshold gating.
- [`references/qa-workflow-templates.md`](references/qa-workflow-templates.md) - Ownership, sequencing, halt versus flag versus auto-fix, escalation patterns.
- [`references/common-qa-failures.md`](references/common-qa-failures.md) - 11+ failure patterns with diagnoses and fixes.

---

## Closing: QA is where quality gets enforced

Every other skill in the content suite produces drafts. QA is the discipline that turns drafts into publishable work. It is also where every previous decision (brief shape, voice guidelines, hub architecture, programmatic template) gets tested against actual output. Skipping QA is not "moving fast"; it is shipping the failure modes of every upstream decision unfiltered.

The QA process is the immune system of the content program: invisible when it is working, catastrophic in its absence.

When in doubt about whether a QA process is ready, ask: does each check name a class of failure it catches, has each check actually caught something in the last 6 months, is brief-adherence first in the sequence, is fact-accuracy a halt-condition, is the AI-content audit included, does sampling discipline apply to scaled surfaces? If yes to all of those, the process is real. If no to any, the gap is where readers will encounter the failure that QA did not catch.
