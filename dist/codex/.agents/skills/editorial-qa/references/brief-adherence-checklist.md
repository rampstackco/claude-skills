# Brief adherence checklist

Every brief field as a QA check, with how to verify and what failure looks like.

The brief-adherence check is the first QA gate in sequence. It is the cheapest gate to run and the highest-value gate to pass: catching a brief-adherence failure early saves the editor from spending review time on voice, structure, and fact-accuracy on a piece that will need to restart.

This check assumes the brief was authored under the discipline of `content-brief-authoring`. If briefs are vague or thin, fix briefs first; the brief-adherence check enforces a contract that has to exist.

---

## The checklist

For each piece, walk these 8 fields.

### 1. Target keyword and cluster

**Verify.** Pull the brief's primary keyword and 3 to 5 supporting cluster keywords. Search the piece for each.

**Pass.** Primary keyword appears in title, H1 (if separate), first paragraph, and at least one H2. Supporting keywords appear naturally across the piece without stuffing.

**Fail patterns.**

- Primary keyword missing from title or first paragraph
- Cluster keywords absent (piece read like a generic article on the topic)
- Keyword stuffing: same exact-match phrase repeated 8+ times in 1,500 words

### 2. Search intent and SERP format

**Verify.** Pull the brief's intent classification and dominant SERP format. Compare to the piece's shape.

**Pass.** Piece shape matches the format the brief specified: long-form article when SERP wants long-form, listicle when SERP wants listicle, comparison when SERP wants comparison.

**Fail patterns.**

- Brief specified listicle; piece is long-form prose
- Brief specified commercial-investigation intent; piece reads as informational with no purchase decision support
- Brief flagged the SERP intent override; piece ignored the override

### 3. Target audience

**Verify.** Read the first 200 words and the closing 200 words with the brief's audience description in mind.

**Pass.** Piece reads as written FOR the named audience: vocabulary, examples, and assumed knowledge match the audience's level.

**Fail patterns.**

- Brief specified senior data engineers; piece explains "what is a database" in the introduction
- Brief specified non-technical CMOs; piece uses unexplained jargon
- Piece reads as written for a generic reader rather than the named audience

### 4. Heading structure

**Verify.** Compare the piece's H2 / H3 outline to the brief's specified outline.

**Pass.** Piece follows the brief's outline. Where the writer deviated, the brief's deviation note explains why or the writer's first-draft note flags the deviation for editor review.

**Fail patterns.**

- Brief specified 6 H2s; piece has 4 or 9 with no documented reason
- H2 order changed without explanation
- Sections from the outline missing entirely

### 5. Required entities

**Verify.** Pull the brief's required-entity list. Search the piece for each.

**Pass.** Every required entity appears in the piece, ideally in the section the brief specified. Standard entities are covered. Gap entities (the differentiation opportunity) are present where the brief committed to them.

**Fail patterns.**

- Brief required mentioning CUPED in the methodology section; CUPED is not in the piece
- Required entities mentioned in passing once each; depth-of-coverage requirements not met
- Gap entities skipped because they were "optional" (they were not; the brief committed to them)

### 6. Internal links

**Verify.** Pull the brief's outbound internal-link list with anchor text. Check the piece for each link.

**Pass.** Every required outbound link is present with the specified anchor text. Optional outbound links are either present or noted as skipped with reason.

**Fail patterns.**

- Brief specified 4 required outbound links; piece has 2
- Anchor text differs from the specified anchor text without reason
- Links to deprecated pages (the writer copied old anchor links from a stale draft)

### 7. Anti-patterns

**Verify.** Pull the brief's anti-pattern list. Read the piece looking for each pattern.

**Pass.** Piece avoids every named anti-pattern. The do-not-use word list, off-brand voice, off-topic tangents, AI clichés, and structural patterns the brief explicitly forbade are absent.

**Fail patterns.**

- Anti-pattern words from the do-not-use list present (e.g., the writer slipped into corporate-speak adjectives)
- Off-topic tangents the brief warned against (the writer wandered into adjacent facets the cluster covers separately)
- Voice drifted toward a register the brief excluded

### 8. Success criteria acknowledged

**Verify.** Read the piece with the brief's success criteria in mind. Does the piece's shape support the criteria?

**Pass.** Piece is shaped to MEASURE against the success criteria: ranking-targeted pieces have keyword-aware structure, citation-targeted pieces have answer paragraphs and statistics, conversion-targeted pieces have CTAs and decision-support content.

**Fail patterns.**

- Brief said "rank top 10 for [keyword]"; piece misses the structural patterns that earn ranking (no answer paragraphs, no entity coverage, no internal-link plan)
- Brief said "drive 50 trial signups in 30 days"; piece has no clear CTA path to signup
- Success criteria treated as an afterthought rather than a design parameter

---

## What halt-condition looks like

Brief-adherence failures are halt-conditions: return the piece to the writer with the specific failures named.

The return note is short. "This piece misses the brief in 3 places: [field 1], [field 2], [field 3]. The brief specified [X]; the piece does [Y]. Please revise and return for round 2."

Editors who try to fix brief-adherence failures themselves end up rewriting the piece. Better to halt cleanly, return to the writer, and let the writer execute the contract that already existed in the brief.

---

## When briefs are too vague to enforce

Sometimes the brief itself is the problem. The brief specified "engineers" without naming the seniority level. The brief specified "informational intent" without checking the SERP. The brief specified entities without depth-of-coverage requirements.

When the brief is too vague, brief-adherence cannot enforce anything. The fix is upstream: tighten brief authoring discipline (see `content-brief-authoring`). The brief is the contract; vague contracts produce vague output regardless of writer skill.

---

## Methodology-level choices that stay in the public skill

The 8-field checklist, the halt-condition discipline, the upstream-fix observation when briefs are vague.

## Implementation choices that stay internal

The specific format the team uses for return notes (Slack message template, Notion row, ticketing system field structure). The specific tooling that stores brief metadata for diff-checking against pieces. The specific automation (if any) that surfaces brief-adherence failures before manual review. These vary by team and stack.
