# Hybrid workflow patterns

Five workflow patterns with tradeoffs and selection criteria. When each pattern fits production context.

No pattern is "the right one." Pattern selection is a real decision that should match volume, voice sensitivity, team skill, and time budget. The wrong pattern produces predictable failures: AI-first drafts on voice-sensitive pieces produce slop; human-writes patterns on programmatic-scale work produce throughput failures.

---

## Pattern 1: AI-first draft, human-edit-heavy

The shape. AI produces a 90% draft against a brief. The human spends 60% of the production time editing: rewriting flat sentences, restructuring sections that miss the brief, adding voice and specificity, verifying facts.

**Best for.** High-volume editorial where the brief is well-authored and the voice is moderately tolerant of AI defaults. SaaS blog posts, knowledge-base articles, secondary editorial pieces.

**Risks.** Generic voice if editing is light. The pattern fails quietly; pieces ship with AI defaults preserved because the editor was rushed.

**Time profile.** 30% AI generation, 60% human editing, 10% fact verification. Faster than human-writes for the same word count but slower than naive AI-only generation because editing time scales with the piece's length.

**When this fits.** The team has clear brand voice and disciplined editors. The volume requirement is real (multiple pieces per day). The audience is tolerant of AI-assisted-but-edited content (most B2B, most consumer marketing).

---

## Pattern 2: Human-first outline + research, AI-draft, human-rewrite

The shape. Human builds the outline (or extends the brief's outline). Human gathers and verifies the research. AI drafts within that scaffold. Human rewrites in voice.

**Best for.** Voice-sensitive editorial where the brand voice is distinctive enough that AI drafts need substantive rewriting anyway. The pattern formalizes the rewrite as the discipline rather than treating it as cleanup.

**Risks.** Slower than AI-first drafts. If the rewrite is light, output is similar to Pattern 1. The discipline is in the rewrite intensity.

**Time profile.** 20% human research and outline, 20% AI drafting, 50% human rewriting, 10% fact verification.

**When this fits.** Brand voice is distinctive (provocative, opinionated, or emotionally specific). The audience would notice generic drafts. Time budget allows substantive rewrites.

---

## Pattern 3: AI-as-research-assistant, human-writes

The shape. AI condenses sources into research briefs. Human writes the entire piece from the brief in their own voice.

**Best for.** Highest-trust editorial: thought leadership, contributed expert pieces, journalism, regulated content. Pieces where the byline is doing trust work and any AI involvement in drafting would compromise the byline's value.

**Risks.** Slowest pattern. AI's role is small enough that the team may question whether AI is helping at all; the answer is usually yes (research time savings are real) but the gain is in time-to-research, not time-to-publish.

**Time profile.** 40% human reading and outlining, 60% human writing, 10% fact verification (with AI sometimes assisting in flagging fact-check candidates).

**When this fits.** The byline is named and trusted (a CEO, an expert, a journalist). The publication's positioning depends on human craft. Disclosure norms in the audience expect human authorship.

---

## Pattern 4: Human-writes, AI-as-editor

The shape. Human drafts the piece. AI suggests copy edits, alternative phrasings, structural improvements. Human accepts or rejects each suggestion.

**Best for.** Senior writers whose voice is established and whose drafts are mostly clean. The AI's role is the second-pair-of-eyes that catches what fatigue or close reading missed.

**Risks.** AI suggestions can pull voice toward AI defaults if the writer accepts too many. The discipline is rejecting the suggestions that would homogenize voice even when they read as "cleaner."

**Time profile.** 80% human writing, 15% AI suggestion review, 5% fact verification.

**When this fits.** The writer is experienced, the brand voice is well-developed, the piece is high-stakes. Pattern is over-kill for routine editorial; right-sized for thought leadership and named-byline pieces.

---

## Pattern 5: AI-generates-at-scale, human-samples

The shape. For programmatic SEO. AI generates thousands of pages from structured data and templates. Human samples 50 to 200 pages per cycle with editorial-qa sampling discipline. Failures above the 5% threshold halt new generation until template or data fixes ship.

**Best for.** Programmatic SEO programs (per `programmatic-seo`). Volume scales the AI does not penalize the program because the underlying data is real and the template is strong; humans sample rather than fully review.

**Risks.** Without sampling discipline, the program produces slop at scale. Without threshold gating, slop compounds invisibly until algorithm updates expose it. Pattern requires the editorial-qa scaling pattern to work; without QA scaling, the pattern is just AI-content-factory thinking with extra steps.

**Time profile.** 5% template and data setup (one-time, deep), 0.5% per-page generation (mostly automated), 10% sampling QA (per cycle), 5% threshold response.

**When this fits.** Data depth is real, query intent is queryable, QC headcount is budgeted. All five criteria from `programmatic-seo`'s when-pseo-works-decision must be met.

---

## Selection criteria

How to pick the pattern.

**Voice sensitivity.** Distinctive voice → Pattern 2, 3, or 4. Generic-tolerant voice → Pattern 1 or 5.

**Volume.** Single-piece-at-a-time editorial → Pattern 2, 3, or 4. High-volume editorial → Pattern 1. Programmatic scale → Pattern 5.

**Trust requirement.** Named-byline trust work → Pattern 3 or 4. Standard branded content → Pattern 1, 2, or 5.

**Time budget.** Tight (hours not days) → Pattern 1. Generous (days available) → Pattern 2, 3, or 4. One-time-deep then automated → Pattern 5.

**Team skill.** Junior writers → Pattern 1 or 2 (more AI scaffolding). Senior writers → Pattern 3 or 4 (less AI, more craft).

---

## Combining patterns within one program

Most content programs run multiple patterns simultaneously. Common combinations.

- **Editorial pillar + cluster**: Pattern 3 (AI as research assistant) for the pillar piece; Pattern 1 (AI-first draft, human-edit-heavy) for the cluster pieces. The pillar carries the trust; the cluster scales.
- **Editorial + programmatic**: Pattern 2 or 4 for editorial; Pattern 5 for programmatic. Same brand, different production model per content type.
- **Marketing copy + thought leadership**: Pattern 1 for marketing; Pattern 3 for thought leadership. Different trust requirements; different patterns.

The discipline. Document which pattern the team uses for which content type. Without explicit documentation, the patterns drift; one writer uses Pattern 1 on a piece that should have been Pattern 3, and the trust value of the byline is compromised.

---

## Anti-pattern: pattern drift mid-piece

Sometimes a piece starts in Pattern 4 (human-writes, AI-as-editor) and drifts into Pattern 1 (AI-first, human-edits) when the writer falls behind on deadline. The piece publishes with AI default voice in sections the writer was supposed to draft.

The fix. Recognize the drift as a process failure, not a writing failure. The writer was over-committed; the fix is workload management, not blame. Future pieces of this type either get more time (preserving Pattern 4) or get reassigned to Pattern 1 with the editing intensity that Pattern 1 requires.

---

## Methodology-level choices that stay in the public skill

The five patterns, the tradeoffs per pattern, the selection criteria framework, the multi-pattern combinations within a program, the pattern-drift anti-pattern.

## Implementation choices that stay internal

The specific AI tools used in each pattern (drafting model, editing model, research model). The specific prompts each pattern uses for the AI handoff. The specific time-tracking that captures pattern adherence per piece. The specific deadline-management workflow that prevents pattern drift mid-piece. These vary by team and tooling.
