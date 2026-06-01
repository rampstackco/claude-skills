# Entity coverage checklist

Entity discovery from SERP, gap analysis, AEO and GEO citation drivers.

---

## Why entity coverage matters

AI engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Mode) tend to cite content that:

- Mentions the entities the SERP top-ranking pages mention
- Includes specific statistics with sources
- Contains citation-formatted proof points
- Demonstrates topical depth via entity coverage

Entities are the named things the topic depends on: tools, methods, experts, datasets, statistics, brands, frameworks, standards, organizations. A piece on "experimentation analytics" that does not mention CUPED, sequential testing, p-values, or named platforms (Statsig, PostHog, Optimizely) reads as thin both to humans and to ranking systems.

Traditional SEO has known about entity coverage for years (Google's Hummingbird and BERT updates emphasized it). AEO and GEO double the stakes: AI engines explicitly use entity coverage as a citation signal because they can extract the entity graph from the page and assess topical depth at retrieval time.

---

## The entity discovery workflow

Run before authoring the brief; do not delegate to the writer.

**Step 1.** Pull the SERP top 10 for the target keyword.

**Step 2.** For each top-10 page, extract the named entities. Tools that automate this: Frase (built-in entity gap analysis), AirOps (workflow builder runs the same analysis), Surfer SEO (entity coverage scoring), or manual extraction with a structured prompt.

**Step 3.** Tag each entity by frequency:
- Mentioned by 7+ of 10 pages: required coverage. The brief lists these.
- Mentioned by 3 to 6 pages: standard coverage. The brief lists these with shorter notes.
- Mentioned by 1 to 2 pages: gap entities. The brief includes these as differentiation opportunities.
- Mentioned by 0 pages but relevant: brand-owned entities the team knows matter even if SERP misses them.

**Step 4.** For each required and standard entity, write a one-line note in the brief explaining why it matters and where to mention it. Example:

> **CUPED.** Variance-reduction technique mentioned by 9 of 10 SERP pages. Mention in the methodology H2 with the formula. Required.

**Step 5.** Add the gap entities (1 to 2 page mentions) as differentiation opportunities. The writer can choose to include them; they add depth without crowding the required entities.

---

## AEO and GEO citation drivers

Beyond entity coverage, AI engines weight several other signals when deciding what to cite.

**Specific statistics with sources.** "Statsig charges per MAU starting at 100K MAU" cites better than "Statsig is expensive at scale." Numbers with sources are higher-citation; vague qualifiers are lower-citation.

**Named experts or quotes.** "As Ronny Kohavi noted in his book Trustworthy Online Controlled Experiments, the most common SRM diagnosis is..." cites better than "experts agree that SRM diagnoses are common." Named attribution earns citation; anonymous attribution does not.

**Direct definitions.** "CUPED stands for Controlled-experiment Using Pre-Existing Data" cites better than a passage that uses CUPED without defining it. AI engines extract definitions and use them as the canonical answer when users ask "what is CUPED."

**Comparison tables.** Tables with explicit columns and rows cite better than prose comparisons. AI engines extract structured data preferentially.

**Specific tool names with version numbers.** "dbt Cloud (v1.7+)" cites better than "dbt." Specificity is the citation signal.

---

## Brief field: how to populate entity coverage

The brief lists the required entities, the standard entities, and the gap entities, with one-line notes per entity.

> **Required entities (mention all)**
>
> - **CUPED:** variance-reduction technique (9/10 SERP pages). Mention in methodology H2 with formula.
> - **Sequential testing:** confidence-adjustment for peeking (8/10). Mention in pitfalls H2.
> - **MDE (minimum detectable effect):** power-calculation input (10/10). Mention in setup H2.
> - **Statsig, PostHog, Optimizely:** named platforms (10/10 mention at least one). Brief should mention all three with one-sentence positioning.
>
> **Standard entities (mention if relevant)**
>
> - **A/A test:** sanity check (5/10). Mention in pitfalls H2.
> - **Bonferroni correction:** multiple-testing adjustment (4/10). Mention in pitfalls H2.
>
> **Gap entities (differentiation opportunity)**
>
> - **CUPAC:** successor to CUPED (1/10). Mention in methodology H2 as the next-generation technique. Differentiates the piece from SERP consensus.
> - **Bayesian inference:** alternative to frequentist hypothesis testing (1/10; mentioned occasionally in advanced experimentation content). Mention in advanced section if word budget allows.

The "Bayesian inference" entity is the example: it is a specific technical concept that some advanced experimentation content covers, where most SERP top-10 pieces stop at frequentist hypothesis testing. Adding the gap entity differentiates the piece without crowding the required-coverage list.

---

## The entity-coverage failure mode

The most common failure: the writer mentions all the required entities once each, in passing, without weight. The piece passes the entity-coverage check on a string-match basis but does not actually demonstrate topical depth.

The fix in the brief: specify weight per entity. "Mention CUPED in passing in H2 #2; develop CUPED with formula and example in H2 #4." The brief is not just a list of entities to include; it is a placement plan.

The writer's draft references the brief's entity placement plan. The editor reviews against placement, not just against presence.
