# Heading structure patterns

H2 patterns, H3 sub-section patterns, featured-snippet bait, and the anti-patterns the brief should explicitly forbid.

---

## H2 patterns that work

**Question-style H2s.** "What is CUPED?" "How does CUPED reduce variance?" "When should I use CUPED?" These match how readers think and how Google's "People Also Ask" box surfaces queries. They are also the easiest format for AI engines to extract as citation candidates.

**Declarative H2s.** "CUPED reduces variance by adjusting for pre-experiment covariates." "The formula uses a regression coefficient computed before assignment." Declarative H2s work for pieces that have a strong thesis or that summarize before they explain.

**Comparison H2s.** "Platform-native: faster, narrower, opinionated." "Warehouse-native: slower, broader, custom-metric capable." Symmetrical H2s pair to set up a comparison; the reader sees the structure on the table of contents alone.

**Imperative H2s.** "Configure the assignment unit." "Define the metrics." "Set the duration and MDE." Common for how-to guides; each H2 is one action.

The discipline: pick one pattern and use it consistently within a piece. Mixing question + declarative + imperative reads as inconsistent and signals AI generation when the mixing is random.

---

## H3 patterns under H2s

H3s should add navigational value, not just structure for its own sake.

**When to add H3s:**
- The H2 covers a topic with 3 to 5 sub-topics that the reader might want to jump to
- The H2 section is long enough (700+ words) that scanning needs sub-anchors
- The piece has a table of contents that benefits from sub-entries

**When not to add H3s:**
- The H2 is short (under 400 words)
- The H3s would be a cosmetic enumeration that does not add navigation
- The piece is short overall (under 1,200 words); H3s are usually unnecessary

**No orphan H3s.** Every H2 either has zero H3s or 2+ H3s. A single H3 under an H2 reads as a typo or an aborted edit.

**No H2-H3-H4 cascades.** If a section needs H4s, the structure is wrong. Either the H2 is too broad and should split into two H2s, or the H4 is decoration that should be a paragraph.

---

## The featured snippet bait pattern

Place a 40 to 60 word answer paragraph immediately following the H2 question. Google often pulls this paragraph as the featured snippet; AI engines often quote it as the citation.

**Example.**

> ## What is CUPED?
>
> CUPED (Controlled-experiment Using Pre-Existing Data) is a variance-reduction technique that adjusts experimental measurements using pre-treatment covariates. The covariate's regression coefficient against the outcome is computed before assignment, then used to subtract baseline variance from the experiment's measurement, increasing statistical power without changing the experiment's design.

The paragraph is self-contained: read alone, it answers the H2 question completely. The rest of the section expands on the answer with examples, formulas, edge cases.

The discipline: the snippet paragraph is the most important paragraph in the section. Write it first; expand the section around it.

---

## H2 ordering

H2s should match the reader's mental model, not the writer's enthusiasm.

**The standard order for informational pieces:**
1. What is it (definition, plain language)
2. Why does it matter (why the reader cares)
3. How does it work (mechanism, technical depth)
4. When to use it (decision criteria)
5. Common pitfalls (what goes wrong)
6. Wrap-up or call-to-action

**The buried-lede anti-pattern.** H2 #4 has the actual answer the reader came for. The reader bounced at H2 #2.

**The fix.** Put the obvious answer first. The writer's clever angle goes in H2 #4 or H2 #5, not H2 #1.

---

## Anti-patterns the brief should forbid explicitly

**Repetitive H2 structure.** All H2s start with "How to" or all start with "The." Repetitive structure signals AI generation to AEO/GEO crawlers and to readers. Vary the patterns within a piece, but keep one dominant pattern.

**Buried lede.** The actual answer is in H2 #4. The brief specifies which H2 carries the keystone answer; usually H2 #1 or H2 #2.

**Section length unevenness.** H2 #1 is 1,500 words; H2 #2 is 80 words. The 80-word section reads as a placeholder. Briefs should specify approximate word counts per H2 to enforce balance.

**H3-only enumeration.** A section that is just an H2 plus a list of H3s with one paragraph each. Either the H2 should hold all the content, or the H3s deserve more depth. The half-and-half shape is a sign of incomplete thinking.

**Misnumbered H2s in numbered series.** "5 ways to Y" with 6 H2s, or with 4. The mismatch reads as careless.

---

## Brief field: how to populate the heading structure

The brief lists the H2s in order with one-line notes. H3s only when they earn their keep.

> **Heading structure outline**
>
> - H2 #1: "What is X?" (snippet paragraph mandatory; ~250 words section)
> - H2 #2: "Why X matters" (~300 words; one specific reader scenario)
> - H2 #3: "How X works" (~600 words; H3s: "the formula," "the assumption," "the implementation"; show the math)
> - H2 #4: "When to use X" (~400 words; decision-criteria list)
> - H2 #5: "Common pitfalls" (~400 words; 3 to 5 specific pitfalls with diagnoses)
> - H2 #6: "Wrap-up" (~150 words; call-to-action to related cluster piece)

The writer follows the outline; deviations are flagged in the first draft for editor review.
