# Ethics and intellectual honesty

Training data, attribution, fabrication boundaries, intellectual honesty as the supervening frame.

This is the most ethically loaded reference in the catalog. The voice is honest, pragmatic, non-preachy. The catalog itself is produced with AI assistance; pretending otherwise would render any anti-AI position hypocritical. The position is not "AI use is unethical" but "intellectual honesty about AI involvement is non-negotiable."

---

## Training data realities

Every major LLM in 2026 was trained on copyrighted material. That is the simple ethical reality.

The legal status of training-data copyright is contested in multiple jurisdictions and is being litigated. The position the catalog takes is not "AI training is ethical" or "AI training is unethical"; the position is "the question is unresolved, the tools exist, teams use them, the way to use them ethically is the question this skill addresses."

What this skill does not relitigate. The training-data copyright question. The compute-intensity environmental question. The labor-displacement question. These are real ethical questions; this skill is not the place to resolve them. Teams reading this skill make their own choices about whether to use AI tools at all; the skill addresses how to use them with intellectual honesty when teams have made the use-AI choice.

---

## Don't pass AI work as fully human-written

The first ethical floor.

Bylined content where the byline implies human craft requires substantial human craft. A column under a named expert's byline that is substantially AI-drafted is a trust violation regardless of whether disclosure was technically present somewhere on the page. The byline's value depends on the audience's understanding that the named human authored the piece; AI authorship that the byline obscures is dishonest.

What "substantial human craft" requires.

- The argument is the human's
- The voice is recognizable as the human's
- The judgments about what to include, what to cut, what to emphasize are the human's
- The fact verification is the human's
- The final approval is the human's

What it does not require. Every word being typed by the human (research-assistant patterns are fine). Every sentence being unrewritten (copy edit assistance is fine). The human spending a specific time-on-task (the time matters less than the substance).

---

## Don't claim AI didn't help when it did

The second ethical floor.

False denials are worse than disclosure. A team that uses AI substantially and then claims the work is fully human is staking trust on a falsifiable claim. Discovery of the AI involvement (which becomes more reliable each year as detection tools improve) compounds the trust violation: the audience now distrusts both the work and the team's honesty about the work.

The honest pattern. If AI was used in any way that would matter to the audience, the team is honest about it. The disclosure tiering framework (per `disclosure-and-transparency-patterns.md`) addresses when disclosure is required; the no-false-denial floor is broader: even when disclosure is not required, false denial is not allowed.

In practice. Most teams do not face direct denial questions; the issue comes up in interview contexts ("how do you produce your content?"), retrospectives, or conversations with clients and partners. The honest answer in those contexts is the truthful one, even when no public disclosure was attached to specific pieces.

---

## Don't generate content that closely mirrors copyrighted source material

The third ethical floor.

AI tools can produce near-replicas of training data when prompted carelessly. The team's responsibility is to verify that AI-generated content is original work and not a paraphrase of a specific copyrighted source.

The check. For each substantive section of AI-generated content, search for the unique phrasing in quoted form. If results come back to a specific copyrighted source that the AI was likely trained on, the section is too close to source material. Revise.

The pattern. AI tools tend to mirror training data more closely on niche topics than on common topics. Common topics have many sources to blend; niche topics have fewer. Specialized content (academic topics, technical documentation, industry-specific niches) needs more careful mirroring checks.

---

## Attribute when borrowing

The fourth ethical floor.

Ideas, frameworks, statistics, and specific phrasings that came from identifiable sources get cited. The principle is not changed by whether AI surfaced the source or whether the human did; attribution belongs to the source, not to the discovery method.

The pattern.

- Statistics with sources: cite the source.
- Frameworks attributed to specific thinkers: cite the thinker.
- Specific arguments traceable to a specific publication: cite the publication.
- Common knowledge: no citation needed, but verify it actually is common knowledge and not specialized knowledge that the AI surfaced from a specific source.

The honesty test. If the team would feel uncomfortable having the source's author read the piece and recognize their work uncited, citation is required.

---

## Don't fabricate quotes or expertise

The fifth ethical floor.

Hallucinated quotes attributed to real people are dishonest regardless of whether AI generated them. The team is accountable for what gets attributed; the AI is not the accountable party.

The pattern. AI generates plausible-but-fake quotes in 2026; that is a known limitation. The fact-accuracy gate per `editorial-qa` catches them before publish. The ethical position is broader than the QA position: even if a fabricated quote were never caught, generating it under attribution to a real person is dishonest.

The same applies to expertise claims. AI-drafted "expert content" attributed to a named expert who did not draft it is fabricated expertise. The expert's name carries trust value; the trust depends on the expert having actually drafted the piece.

---

## Be honest about AI capabilities and limits

The sixth ethical floor.

Do not oversell AI as more capable than it is. Do not undersell it as less capable than it is. Both produce decision-making errors in the team and in the audience.

The pattern. AI in 2026 is genuinely useful for research synthesis, drafting against briefs, copy edit suggestions, transcription, summary, and quality-control automation at scale. AI in 2026 is genuinely limited at editorial judgment, fact verification (it is what gets fact-checked, not what does fact-checking), voice origination, ethical decisions, and reader empathy.

Teams that get this right calibrate AI use to the limits. Teams that oversell AI ship work that exceeds AI's actual capabilities and produces hallucinations or voice failures. Teams that undersell AI miss productivity gains the technology offers.

---

## The intellectual honesty frame

The frame that supersedes specific policy debate.

The question is not "is AI use ethical?" The question is "can the team be intellectually honest about AI use?" If yes, the team's ethics hold. If no, the team is rationalizing.

What intellectual honesty looks like.

- The team can articulate its AI-usage policy without defensiveness
- The team can name the specific patterns it does and does not use
- The team can defend each pattern on the merits, not just by precedent
- The team can engage with critiques of its policy without dismissing them
- The team updates its policy when reality changes (new tools, new evidence, new audience norms, new regulatory requirements)

What intellectual dishonesty looks like.

- Defensiveness when AI involvement is questioned
- Refusal to articulate the policy
- Dismissing critiques without engaging
- Hiding AI involvement that would be material to audiences
- Claiming AI does what it does not, or hiding that AI does what it does

The honest team can withstand external scrutiny because its position holds up. The dishonest team eventually faces external scrutiny that surfaces the gap between claimed and actual practice.

---

## When the ethical question is hard

Edge cases.

**Ghostwritten content historically allowed.** Industries where ghostwriting has always been the norm (executive thought leadership, celebrity book authorship, political speechwriting). AI assistance in ghostwriting workflows raises questions: is the ghost an AI? does the byline still mean what it meant?

The conservative position. The byline implies human authorship; if the ghost is an AI rather than a human writer, that distinction is material to the audience and disclosure is appropriate. The aggressive position. Ghostwriting has always been a fiction the audience tolerates; AI ghostwriting is the same fiction with different tools.

The catalog's position. Default to the conservative reading. The byline's trust value depends on audience understanding of authorship; AI ghostwriting under a named expert byline is more honest with disclosure than without.

**Educational content with structured explanations.** Topics where the explanation has a canonical shape (math, basic programming, established science). AI-drafted explanations of canonical topics may closely mirror training data because the canonical shape is what the training data contains.

The conservative position. Cite the canonical sources where they exist; rephrase substantively where citation is impractical.

**Programmatic SEO at scale.** Hundreds of thousands of pages where individual disclosure is impractical and audience expectations differ from editorial content.

The position. Programmatic content is genre-typically machine-generated; specific disclosure per page is unnecessary; transparency about the program's overall production model is appropriate at the brand level.

---

## Methodology-level choices that stay in the public skill

The training-data realities framing, the six ethical floors, the intellectual honesty frame, the edge-case handling, the conservative-vs-aggressive position taking on contested cases.

## Implementation choices that stay internal

The specific ethics policy the team has documented. The specific review process when an ethics question surfaces. The specific escalation pathway for ethics decisions. The specific tracking that records ethics-related decisions for retrospective review. These vary per team and brand.
