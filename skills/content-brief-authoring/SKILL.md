---
name: content-brief-authoring
description: "How to author a content brief that actually guides a writer (human or AI) to produce a piece that ranks, converts, or both. Per-piece editorial brief: target keyword and cluster, search intent, audience and JTBD, heading structure, entity coverage for AEO/GEO, internal linking strategy, success criteria. The middle path between thin briefs (a keyword and a deadline) and thick briefs (a 4-page document nobody reads). Triggers on content brief, brief the writer, brief the article, brief authoring, content brief template, brief audit, per-piece brief, editorial brief, target keyword brief, search intent brief. Also triggers when briefing a human writer or an AI agent on a single content piece."
category: content
catalog_summary: "Per-piece editorial brief: target keyword, intent, audience, outline, entity coverage, internal linking, success criteria, and the discipline that distinguishes useful briefs from bloat"
display_order: 2
---

# Content Brief Authoring

A senior content strategist's playbook for authoring per-piece content briefs that actually guide writers to produce content worth publishing.

Most content briefs are some flavor of broken. The thin version is a keyword, a word count, and a deadline; the writer fills in everything else from scratch and the output is generic. The thick version is a 4-page document nobody reads, that the writer skims for the headline and the outline and ignores the rest. Either way, the brief failed at its job: making the writer's work easier and the output more predictable.

This skill is the middle path. It defines the 12 fields that earn their keep in a content brief, the fields that bloat without helping, and the discipline of writing briefs that route a writer (human or AI) toward a content piece that ranks for its target keyword, gets cited by AI engines, converts the right reader, or whatever the success criteria say. It assumes you have decided what to write (see `content-strategy` for program-level decisions) and now you are briefing each piece. The piece itself gets written separately (see `content-and-copy`).

When to use this skill: briefing a writer (human or AI) on an individual content piece, auditing existing briefs that are not producing good content, building a brief template for a content program, or running a brief-generation pipeline through Frase, AirOps, or another tool.

---

## What this skill is for

This skill spans the per-piece editorial brief discipline. It composes with three sister skills, and the distinction between them is what keeps each one sharp.

- `creative-brief` is a project brief. It bridges discovery to execution at the project level: a new website, app, brand, or campaign. Audience, goals, scope, success at project scope.
- `content-strategy` is a program-level editorial strategy. Pillars, calendar, topic clusters, governance. What to produce across a quarter or a year.
- `content-and-copy` is the writing itself. Voice, structure, edit pass, tone calibration. Execution scope for general editorial.
- This skill is the per-piece brief between `content-strategy` (program decided) and `content-and-copy` (piece gets written). It briefs a single content artifact: keyword, intent, audience, outline, entities, success criteria.

The clean reading order: `content-strategy` decides what to produce; this skill briefs each piece; `content-and-copy` writes it. If the team is briefing a redesign or a new brand build, that is `creative-brief`, not this skill.

The audience: content strategists, SEO content marketers, editorial leads, content ops managers, agencies running content programs at scale, and any PM or marketer briefing a writer (human or AI). The voice is senior content strategist to junior content marketer. Specific, opinionated, honest about what makes a brief useful versus useless.

---

## Thin vs thick vs effective briefs

The keystone distinction. Three concrete shapes.

**Thin brief.** Keyword, word count target, deadline. Maybe a one-line summary of the angle. The writer fills in everything else from scratch. Output is generic, drifts off-topic, does not rank, and does not convert. The cost is the rewrite cycle: editor spends two hours rewriting because the writer chose the wrong intent, the wrong audience, or the wrong outline.

**Thick brief.** A 4-page document with executive summary, brand-guidelines refresher, comprehensive competitive analysis, voice guidelines, plus the actual brief somewhere in the middle. The writer skims for the outline, ignores the rest. Output is not materially better than from a thin brief because the writer never read most of the document. The cost is the authoring time: the strategist spends three hours producing pages of context the writer will never absorb.

**Effective brief.** One to two pages. Every field earns its keep. Writer reads all of it because there is no fluff. Output is predictable enough that the editor does not have to rewrite the lede. The cost is the discipline of cutting fields that do not change writer behavior.

The discipline. Every field in the brief has a job. If you can remove the field without degrading the output, remove it. The brief is the contract between editorial leader and writer; vague contracts produce vague output, overstuffed contracts produce output that reflects only the parts the writer read.

Most briefs that are not working are thin, not thick. The instinct to add more usually makes the brief worse. The instinct to be more specific in fewer fields usually makes the brief better.

---

## The 12 fields of an effective brief

A useful brief has 12 fields. Skip any of them and the writer fills the gap from priors; the gap is where output drifts.

1. **Target keyword + supporting cluster.** Primary keyword plus 3 to 5 supporting keywords from the same cluster. The cluster is what tells the writer the topic has range; the primary is what the piece optimizes for.
2. **Search intent classification.** Informational, navigational, commercial, or transactional. Plus the dominant SERP format check (article, listicle, comparison, video, tool). The intent decides what kind of piece this is; the format decides the shape.
3. **Target audience.** Specific role and sophistication level. Not "anyone interested in X." A senior data engineer at a 500-person SaaS company is a target; "data people" is not.
4. **Job to be done.** The problem the reader is trying to solve when they land on the piece. One sentence. Specific.
5. **Word count / depth target.** Calibrated to the SERP, not to a content quota. If the top 10 are all 1,200 words, briefing 3,000 wastes effort; if the top 10 are all 4,000 words, briefing 1,500 produces a piece that cannot rank.
6. **Heading structure outline.** H2s and H3s explicit, ordered logically. The outline is where the writer reads the brief most carefully; spend time here.
7. **Required entities, statistics, citations.** For AEO and GEO, the named tools, methods, experts, and statistics the piece must cover. The entity gap is the agent's prioritization signal.
8. **Internal linking strategy.** 3 to 5 pages this piece should link out to with anchor text; 1 to 3 existing pages that should link back to this piece after publish.
9. **External proof points.** Required citations, sources, expert quotes. Not optional.
10. **Anti-patterns.** What not to do. Off-topic tangents the writer might wander into, off-brand voice, AI clichés the brief explicitly forbids by listing them in a do-not-use list (the standard set of overused corporate-speak adjectives, throat-clearing openers, and verbs that signal AI generation).
11. **Success criteria.** What good looks like. Rank for the target keyword in 90 days. Get cited by ChatGPT for the cluster within 60 days. Drive 50 trial signups in the first 30 days. Measurable, time-bound, tied to the program goal.
12. **Author voice and tone reference.** Link to the brand-voice guide. If the piece needs a tone shift from the default voice, note it here in one sentence.

The fields that do not earn their keep, and should be omitted from briefs unless the writer is brand new to the program:

- Long executive summary (the brief itself is the executive summary)
- Brand-guidelines refresher (link to it; do not repeat)
- Comprehensive competitive landscape (link to research; do not dump)
- Brief history of the publication, company, or brand (irrelevant to this piece)

Detail and templates per content type in [`references/brief-templates.md`](references/brief-templates.md).

---

## Search intent classification

The four standard intents:

- **Informational.** The reader wants to learn. SERP usually shows articles, guides, explainers.
- **Navigational.** The reader wants a specific brand or page. SERP usually shows the brand site at #1; ranking against navigational intent is mostly impossible unless you are the brand.
- **Commercial.** The reader is researching a purchase. SERP usually shows comparisons, reviews, "best X" listicles.
- **Transactional.** The reader is ready to buy. SERP usually shows product pages, pricing pages, signup flows.

The dominant SERP format check. After classifying intent, scan the SERP top 10 and tag the dominant format: article, listicle, comparison, video, tool, hybrid. The dominant format tells you the shape of the piece, which is more decisive than the intent label.

The override pattern. When the intent feels informational but the SERP shows mostly listicles, write the listicle. When the intent feels commercial but the SERP shows mostly long-form articles, write the article. The SERP is the source of truth, not your priors. Rankings come from matching the SERP's accepted shape; deviating costs ranking.

The AEO/GEO consideration. AI engines tend to favor pieces that match SERP intent format because the intent classification was trained on the SERP corpus. Mismatched format is a citation risk in addition to a ranking risk.

Detail in [`references/search-intent-classification.md`](references/search-intent-classification.md).

---

## Heading structure design

Heading hierarchy patterns the brief should specify:

- H2 sections that match common follow-up questions for the keyword. The reader's mental model is a series of questions; the H2s answer them in order.
- H3s under H2s only when they add navigational value. No orphan H3s. No H2-H3-H4 cascades that nobody scrolls through.
- Featured snippet bait pattern: a 40 to 60 word answer paragraph immediately following an H2 question. Google often pulls this paragraph as the snippet; AI engines often quote it as the citation.
- H2 ordering that matches the reader's mental model, not the writer's enthusiasm. Put the obvious answer first; the writer's clever angle goes in H2 #4, not H2 #1.

Anti-patterns the brief should explicitly forbid:

- H2s that all start with "How to" or all start with "The." Repetitive structure signals AI generation to AEO/GEO crawlers and to readers.
- Buried lede: H2 #4 has the actual answer. The reader bounced at H2 #2.
- Section length wildly uneven: H2 #1 is 1,500 words, H2 #2 is 80 words. The 80-word section reads as a placeholder.

Detail in [`references/heading-structure-patterns.md`](references/heading-structure-patterns.md).

---

## Entity coverage for AEO and GEO

AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Mode) tend to cite content that mentions the entities the SERP top-ranking pages mention, includes specific statistics with sources, contains citation-formatted proof points, and demonstrates topical depth via entity coverage.

The entity discovery pattern, run before briefing the piece:

1. Pull SERP top 10 for the target keyword.
2. Identify entities mentioned across multiple pages: named tools, named methods, named experts, named data sources, named statistics.
3. Identify entities mentioned by 1 to 2 pages but not in your existing content. This is the entity gap.
4. Add the gap entities to the brief as required coverage.

The brief lists the entities the writer must mention, with light context on why each matters. The writer is not expected to research each entity from scratch; the brief includes a one-line note ("CUPED is the variance-reduction technique used by data-warehouse-experimentation teams; mention in the methodology section") so the writer can integrate without breaking flow.

Tools that automate this: Frase has entity-gap analysis built in; AirOps composes the same analysis through its workflow builder; Surfer SEO ships entity coverage scoring. The skill is tool-agnostic; the workflow is what matters.

Detail in [`references/entity-coverage-checklist.md`](references/entity-coverage-checklist.md).

---

## Internal linking strategy

The brief should specify two link directions:

- **Outbound from this piece.** 3 to 5 pages this piece should link to. Anchor text and target page named explicitly. The writer should not be deciding internal links during drafting; the strategist already knows the cluster and which pieces should reinforce each other.
- **Inbound to this piece, post-publish.** 1 to 3 existing pages that should add a link to this piece after it publishes. This is a follow-up task queued in the brief, not a request to the writer.

The orphan-content failure mode: piece publishes, no other piece links to it, search engines deprioritize it, AI engines do not see it as cluster-anchored. Prevented by upstream-link planning in the brief.

The self-cannibalization check: if this piece would compete with an existing piece for the same keyword cluster, the brief flags it explicitly. The options are consolidate (merge into the existing piece), differentiate (the brief sharpens the angle so the two do not compete), or kill one. Flagging late, after the piece is written, costs more than flagging in the brief.

Detail in [`references/internal-linking-strategy.md`](references/internal-linking-strategy.md).

---

## Brief templates by content type

Different content types call for different brief shapes. The 12 fields are constant; the weight of each field shifts.

- **Pillar piece.** Comprehensive coverage of a topic, 3,000 words plus, anchors a topic cluster. Brief emphasizes structure, comprehensiveness, internal links to and from supporting pieces.
- **Supporting / cluster piece.** Narrower topic, 1,000 to 2,000 words, links up to the pillar. Brief emphasizes specificity, single-question scope.
- **Comparison piece (X vs Y).** Commercial intent, structured comparison, decision framework. Brief emphasizes objectivity (or honest positioning if the brand is one of X or Y), table structure, "when X wins" / "when Y wins" framing.
- **Listicle.** Informational or commercial intent, scannable, ranked or unranked. Brief emphasizes selection criteria, ordering rationale, depth-per-item.
- **How-to guide.** Informational, step-by-step, screenshots. Brief emphasizes step granularity, prerequisites, troubleshooting section.
- **Thought leadership / opinion.** Commercial or branding, distinctive POV, signal of expertise. Brief emphasizes thesis, supporting arguments, anticipated counter-arguments.

Each template gets a worked example in [`references/brief-templates.md`](references/brief-templates.md).

---

## The brief-to-writer handoff

Whether the writer is human or AI, the handoff has the same shape.

- Brief delivered with all 12 fields populated.
- Writer asks clarifying questions before drafting (or the AI agent surfaces ambiguities in the brief as the first response).
- Writer or agent acknowledges the success criteria explicitly.
- First draft references the brief: "this draft hits 4 of the 5 required entities; the 5th is missing because the SERP coverage was thin and I could not find a reliable source."
- Editor reviews against the brief, not against personal taste. "The brief said X; the draft did Y" is the review framing.

For AI handoff specifically, the brief becomes a structured prompt or a tool input. Frase, AirOps, and similar tools structure briefs as YAML or JSON for machine consumption; the same 12 fields apply. The structured format is the only difference; the contract is the same.

Detail in [`references/writer-handoff-protocols.md`](references/writer-handoff-protocols.md).

---

## Brief governance

Versioning. Every brief has a version. Significant changes (target keyword change, audience shift, scope expansion) bump the version; cosmetic edits do not. The writer always works from the current version, not a stale draft pasted into Slack three weeks ago.

Approval. The brief approver is the editorial owner of the content program. Single approver, not a committee. The approver is also the editor on the back end, so the same person is responsible for both the contract and the review. Splitting these roles is how briefs and reviews drift apart.

Archival. After publish, the brief is archived alongside the content piece (Notion database row, dbt model, content management system metadata, whatever the team's source of truth is). Future content audits reference both brief and published piece to assess gap between intent and execution. Without the brief in the archive, a content audit cannot tell whether the piece succeeded against the original goal or drifted from it.

Detail in [`references/brief-governance-patterns.md`](references/brief-governance-patterns.md).

---

## Common failure modes

Rapid-fire. Diagnoses and fixes in [`references/common-brief-failures.md`](references/common-brief-failures.md).

- "The brief was too thin." Fill all 12 fields or accept generic output.
- "The brief was too thick." Every field needs a job; remove the rest.
- "The writer ignored the brief." Anchor success criteria to the brief; review against the brief.
- "The brief had the wrong target keyword." SERP-validate before briefing.
- "The piece does not match the SERP intent." SERP intent override applies; do not write an article when the SERP wants a listicle.
- "The piece has no internal links." Internal linking belongs in the brief, not as an afterthought.
- "The piece is generic; could have been written about anything." Entity coverage and POV missing from brief.
- "The brief is comprehensive but the piece does not rank." Brief was right; SERP was harder than expected; iterate based on real performance, not by adding fields to the brief.
- "We never went back to evaluate." Success criteria measured 30 / 60 / 90 days post-publish.
- "Different writers produce wildly different output from the same brief." Brief was actually too vague; tighten anti-patterns and voice notes.

---

## The framework: 12 considerations for brief authoring

When authoring or auditing a content brief, walk these 12 considerations.

1. **Target keyword + cluster.** Primary plus 3 to 5 supporting.
2. **Search intent + dominant SERP format.** Match the SERP, not your priors.
3. **Target audience + JTBD.** Specific role and problem, not "anyone interested in X."
4. **Word count calibrated to SERP.** Not to a content quota.
5. **Heading structure.** Explicit H2s and H3s, ordered to match reader mental model.
6. **Entity coverage.** Entities the SERP top 10 mention; gap entities added explicitly.
7. **Internal linking.** 3 to 5 outbound links specified; 1 to 3 inbound updates queued.
8. **External proof points.** Citations and sources required.
9. **Anti-patterns.** What not to do, including AI clichés and off-brand voice.
10. **Success criteria.** Measurable, time-bound, tied to original program goals.
11. **Brief versioning + approval.** Single approver; version bumps for material changes.
12. **Brief stays under 2 pages.** Every field earns its keep; remove fields that do not.

The output of the framework is a brief document the writer can absorb in 5 minutes and execute against in the next 5 hours.

---

## Reference files

- [`references/brief-templates.md`](references/brief-templates.md) - Pillar, supporting, comparison, listicle, how-to, and thought-leadership brief templates with field-weight notes per type.
- [`references/search-intent-classification.md`](references/search-intent-classification.md) - Four-intent framework, SERP format check, override patterns.
- [`references/heading-structure-patterns.md`](references/heading-structure-patterns.md) - H2 and H3 patterns, featured snippet bait, anti-patterns.
- [`references/entity-coverage-checklist.md`](references/entity-coverage-checklist.md) - Entity discovery from SERP, gap analysis, AEO/GEO citation drivers.
- [`references/internal-linking-strategy.md`](references/internal-linking-strategy.md) - Outbound and inbound linking patterns, orphan prevention, self-cannibalization check.
- [`references/writer-handoff-protocols.md`](references/writer-handoff-protocols.md) - Human-writer handoff, AI-agent handoff, success-criteria anchoring.
- [`references/brief-governance-patterns.md`](references/brief-governance-patterns.md) - Versioning, approval, archival, audit trail.
- [`references/common-brief-failures.md`](references/common-brief-failures.md) - Ten-plus failure patterns with diagnoses and fixes.

---

## Closing: the brief is the contract

A content brief is the contract between editorial leader and writer. If the contract is vague, the output is vague. If the contract is overstuffed, the output reflects only the parts the writer read. The discipline is writing contracts the writer can absorb in 5 minutes and execute against in the next 5 hours; that is the entire job.

Most briefs that are not working are thin, not thick. The instinct to add more pages usually makes the brief worse. The instinct to be more specific in fewer fields usually makes the brief better.

When in doubt about whether a brief is ready, ask: are all 12 fields populated, do they each earn their keep, is the SERP intent matched, are the entities listed, are the internal links specified, is the success criteria measurable, and is the document under 2 pages? If yes to all of those, ship the brief and let the writer work.
