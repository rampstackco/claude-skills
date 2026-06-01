# Refresh depth decision

Light edit, substantial revision, full rewrite, structural redesign. Time investment per depth, signal-to-depth matching, the depth-creep anti-pattern.

Refresh depth is one of the most consequential decisions in the program. The wrong depth produces predictable failure: light edits on pieces that needed substantial revision produce no recovery; full rewrites on pieces that only needed factual updates burn capacity. The discipline is matching depth to signal strength.

---

## Depth 1: Light edit

**The work.** Update statistics. Replace dead links. Fix factual errors. Swap dated examples. Update product or platform references. Verify external links still resolve and still go where they should.

**Time investment.** 30-90 minutes per piece for typical pieces. Longer for research-heavy pieces with many external citations.

**The piece's structure stays intact.** Section weights, lede, closing, archetype, voice, claims-and-arguments are all preserved. The light edit is surface maintenance.

**Use when.**

- Factual staleness is the only or dominant signal.
- Traffic is stable or only slightly decayed.
- The piece's structural framing still fits current SERP intent and brand positioning.
- The piece is performing well enough that significant changes would risk performance.

**Common failures.**

- Light-editing when substantial revision is warranted. Surface fixes do not address the structural reasons for decay; the piece continues to decay after the light edit ships.
- Light edits that touch more than they should. A "light edit" that becomes 4 hours of work because the editor kept finding things has lost the depth discipline; either commit to substantial revision or stop at the originally scoped scope.

---

## Depth 2: Substantial revision

**The work.** Light edit plus rewrite of 1-3 sections that have aged badly. Update the introduction or closing. Add coverage of topics that have emerged since the piece was written. Restructure 1-3 H2 sections without redesigning the piece's overall shape.

**Time investment.** 2-4 hours per piece for typical pieces. Longer for pieces with extensive new sections to add.

**The piece's spine stays intact.** The archetype, the central thesis, and most sections survive. Specific sections are rewritten or added.

**Use when.**

- Traffic has decayed moderately but not catastrophically.
- Specific sections of the piece have aged badly (often the introduction, closing, or a section on a topic that has shifted).
- New topics have emerged that the piece needs to cover to stay current.
- The piece's structural framing is mostly fine but needs targeted updates.

**Common failures.**

- Substantial revision drifting into full rewrite. The "substantial revision" that becomes 8 hours of work has crossed into full-rewrite territory; either commit to full rewrite or scope back to the original substantial-revision plan.
- Substantial revision that rewrites the introduction without rewriting the closing, leaving the piece structurally inconsistent (the introduction promises one shape; the closing delivers a different one).
- Rewriting sections without auditing whether the rewrites match each other in voice and density.

---

## Depth 3: Full rewrite

**The work.** Keep the URL and topic; rewrite the piece end-to-end. New lede, new structure (possibly new archetype), new closing. The new piece occupies the old piece's URL and connects to the existing internal-link graph.

**Time investment.** Similar to writing a new piece, sometimes more because of the constraint of preserving the URL and the existing internal links. 8-16 hours for typical long-form rewrites.

**The piece's spine changes.** New archetype possible. New positioning possible. The connection to the URL and the existing topical authority is what is being preserved; everything else can change.

**Use when.**

- Traffic has decayed sharply or persistently.
- The piece's structural framing no longer fits current SERP intent.
- The brand's positioning has shifted enough that the piece needs to be re-conceived.
- Light edit and substantial revision have already been tried and did not produce recovery.

**Common failures.**

- Full rewrite that loses what worked. The original piece had specific strengths (a memorable lede, a particular section that drew links). The rewrite that does not preserve those strengths can perform worse than the original even if the rewrite is technically stronger.
- Full rewrite that breaks internal linking. Section IDs change, anchor links from sister pieces break, the internal-link graph that supported the piece's authority is disrupted.
- Full rewrite that ignores the URL constraint. The team rewrites as if writing a new piece, then realizes the URL is locked and the new framing does not fit the existing slug. Either accept the slug mismatch (suboptimal) or change the URL (incurring redirect cost).

---

## Depth 4: Structural redesign

**The work.** Full rewrite plus consolidation with sibling pieces, restructuring of internal linking, possible URL change with redirects. Often part of a larger structural change in the content library: a hub being rebuilt, a category being consolidated, a topic cluster being reorganized.

**Time investment.** A multi-piece project. 1-3 weeks for a hub-level restructure involving multiple pieces.

**Multiple URLs and pieces are affected.** The piece being refreshed is one node in a graph that is being reshaped.

**Use when.**

- Refresh of an individual piece is bumping against architecture-level issues that cannot be addressed at the piece level.
- A hub is being redesigned and pieces within the hub need to be reconceived as part of the redesign.
- Multiple pieces are competing for the same query and a consolidated piece would produce stronger authority than any of the individual pieces.

**Common failures.**

- Treating structural redesign as a refresh exercise rather than as a project. The work scope is project-scope; treating it as a refresh queue item leads to under-resourcing.
- Structural redesign without coordination with `pillar-content-architecture` discipline. The hub-level work and the piece-level work need to compose; doing them separately produces friction.
- Redirect plans that do not account for all the URLs being consolidated. Some authority is lost in transit because some redirects were missed.

---

## Signal-to-depth matching

A short framework for choosing depth from the signals.

**Light edit when:**

- Factual staleness is the dominant signal.
- Traffic stable or only slightly decayed (under 10%).
- Rankings stable or only slightly drifted.
- No SERP intent shift detected.
- No content drift detected.

**Substantial revision when:**

- Multiple signal types present (factual + content drift, or traffic decay + ranking drops).
- Traffic decayed moderately (10-25%).
- Rankings drifted but still on page 1.
- Specific sections have aged badly while others are sound.
- SERP intent has not shifted dramatically.

**Full rewrite when:**

- Traffic decayed sharply (25%+).
- Rankings dropped from page 1 to page 2 or beyond.
- SERP intent has shifted substantially (the dominant SERP format has changed).
- Brand positioning has shifted enough that the piece reads as the brand-of-multiple-years-ago.
- Light edit or substantial revision already attempted without recovery.

**Structural redesign when:**

- The piece's issues are architecture-level rather than piece-level.
- A hub or category is being reorganized.
- Multiple sibling pieces are competing for the same query and consolidation would produce stronger authority.

---

## The depth-creep anti-pattern

Refreshes that grow during execution from their planned depth into a deeper depth that was not budgeted.

**The pattern.** A refresh planned as a light edit becomes substantial revision because the editor "kept finding things." The substantial revision becomes a full rewrite because once you are restructuring two sections you might as well restructure the rest. The piece ships 6 weeks after planned, having consumed 4x the planned capacity.

**Why it happens.** Editors and writers are pattern-matchers; once they start working on a piece, they see all its problems and want to fix all of them. The discipline of staying at the planned depth is not natural to editorial work.

**The cure.** Two options.

1. **Stop at scope.** When the editor finds work beyond the planned depth, log it but do not do it. The next quarter's audit can decide whether the piece needs deeper work; this refresh ships at the planned depth.
2. **Re-scope explicitly.** When the editor discovers the planned depth is wrong, halt the refresh and re-scope formally. The capacity allocation gets adjusted; the timing gets adjusted; the team is aware the refresh became a bigger project.

The failure mode is the third option: keep going at deeper depth without explicit re-scoping. That produces capacity overruns and missed timelines that affect other work.

---

## Multi-depth refresh sequences

Some pieces benefit from a sequence of refreshes at different depths over time.

**The pattern.**

- Light edit ships first to address factual staleness while broader investigation continues.
- Substantial revision follows in the next quarter once SERP intent shift has been analyzed and the right structural changes are clear.
- Full rewrite follows in 2-3 quarters if the substantial revision did not produce recovery.

**When this pattern fits.** High-value-decaying pieces where the right disposition is unclear and the team wants to avoid premature commitment to a full rewrite. Light-edit-first preserves what works while buying time for analysis.

**When this pattern fails.** Programs that always start with light edit on high-value-decaying pieces, regardless of signal strength, because light edit is the easiest depth to schedule. The light edit does not move the needle, and the next quarter's audit shows the same piece in the same queue.

---

## Methodology-level choices that stay in the public skill

The four depth levels with their work, time investment, and use cases. The signal-to-depth matching framework. The depth-creep anti-pattern with its cure. The multi-depth refresh sequence pattern.

## Implementation choices that stay internal

Specific time-tracking that captures actual depth per refresh. Specific scope-confirmation tooling that flags depth-creep. Specific writer or editor assignment patterns by depth (some writers are stronger at light edits; some at full rewrites). Specific brief templates per depth in the team's writing system. These vary by team and tooling.
