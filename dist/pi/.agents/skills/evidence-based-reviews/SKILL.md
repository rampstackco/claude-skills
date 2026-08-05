---
name: evidence-based-reviews
description: "Produce honest product reviews and buying guides without fabricated first-hand experience, using disclosed evidence tiers: verified specs, owner-experience synthesis at scale, expert triangulation, and hands-on only when true. Use this skill whenever the user wants to write product reviews or buying guides without hands-on access, set up a review methodology, add evidence disclosure to review content, align reviews with Google's reviews system or FTC affiliate disclosure expectations, or decide when Review and Product schema are honest to use. Triggers on product review, buying guide, best-of list, review methodology, evidence basis, hands-on testing, we tested, affiliate review site, review disclosure, methodology block, original research, reviews system. Also triggers when review content claims testing that did not happen, or when an affiliate site needs a trust mechanism that survives scrutiny."
category: content
catalog_summary: "Evidence tiers, methodology disclosure, honest review claims"
display_order: 13
---

# Evidence-Based Reviews

Produce product reviews and buying guides whose claims match their evidence. The method is evidence synthesis with a disclosed basis, and one rule anchors everything: never claim hands-on time that did not happen.

Most review sites fail this rule quietly. "We tested" appears above content assembled from spec sheets, and readers have learned to smell it. The honest alternative is stronger, not weaker: synthesis of owner experience at scale, verified specifications, and triangulated expert sources is demonstrable original analysis, and disclosing it builds the trust that fabricated testing destroys.

---

## When to use

- Writing product reviews or buying guides when hands-on access is partial or absent
- Setting up the review methodology for a new review or affiliate site
- Adding evidence disclosure to existing review content
- Auditing review content for claims its evidence cannot support
- Deciding whether Review or Product schema is honest for a given piece
- Aligning review content with Google's reviews system and FTC disclosure expectations

## When NOT to use

- General content writing and editing (use `content-and-copy`; this skill governs the evidence and claims layer of review content specifically)
- Defining how the brand sounds (use `brand-voice`)
- Optimizing the review page itself for search (use `seo-onpage`)
- Per-piece editorial briefs (use `content-brief-authoring`)
- Instructional how-to content that teaches a procedure or concept to a first-time reader, such as a tutorial or an explainer: a teaching piece of this kind is owned by its writing, its structure, and its search craft, with the evidence discipline riding alongside as a constraint on its claims, so this skill is one input among several rather than the single choice for it

If genuine hands-on testing at scale exists, with instrumentation and protocols, this skill still applies: the tiers do not change, the methodology block simply states tier 4 and the testing protocol becomes the disclosed basis.

---

## Required inputs

- The product category and the pieces planned (reviews, buying guides, or both)
- Access to evidence sources: manufacturer pages, retailer review corpora, forums or owner communities, expert publications
- The brand's disclosure language, if one exists (this skill supplies a template if not)
- An honest inventory of what hands-on experience genuinely exists, if any

---

## The framework: one rule, four evidence tiers

The anchor rule: never claim hands-on time that did not happen. Every other part of the method exists to make honest content strong enough that the lie is unnecessary.

### Tier 1: verified manufacturer specs

Specifications cited to the maker's own page, not to aggregator copies that drift. The verification step is the work: cross-check the spec against the manufacturer's current listing, note the date, and flag discrepancies between sources instead of picking one silently. A spec table built this way is a fact layer; a spec table pasted from another review site is a rumor layer.

When it suffices: factual comparisons, fit and compatibility answers, price-tier groupings. It never supports a quality verdict on its own.

### Tier 2: owner-experience synthesis at scale

Retailer review corpora, forum threads, warranty and return patterns, read across sources and summarized honestly. Honest synthesis means:

- Recurring complaints and recurring praise, not the loudest single anecdote
- Sample-size candor: "across roughly 1,400 owner reviews" reads differently from "owners say," and the reader deserves the number
- No cherry-picking: if owners split, the split is the finding
- Source naming: which corpora, which communities, over what period

When it suffices: durability and reliability verdicts, real-world quirks specs never show, satisfaction patterns by use case. This tier is the workhorse of honest no-hands-on reviewing, and it is genuine original analysis when done at scale.

### Tier 3: expert-source triangulation

Named expert sources compared against each other. Triangulation means surfacing agreement and disagreement, not averaging verdicts into mush. When two credible testers reach opposite conclusions, the honest move is to say so and explain the conditions that might account for it. Anonymous "experts agree" is not a tier; it is decoration.

When it suffices: performance claims that require instrumentation the site lacks, technique-dependent judgments, category context.

### Tier 4: hands-on, only when true

Stated only when it happened, flagged as such, with the extent quantified: what was done, how much, under what conditions. When hands-on experience arrives later for a piece published on tiers 1 to 3, the piece is upgraded and the update is marked with what changed. Never backfilled to look like it was always hands-on; the upgrade trail is itself a trust signal.

---

## The methodology block

Every review and buying guide carries a short disclosure block naming its evidence basis, placed with the criteria, written for readers rather than lawyers. The fillable template and a worked example live in [`references/methodology-block-template.md`](references/methodology-block-template.md).

The block names: the criteria in the order they were weighted, the tiers actually used (specifically, with sources), what was done hands-on or the words "none claimed," and the update line. A block that claims a tier the piece did not use is the same lie the anchor rule bans, in smaller type.

---

## Structure discipline the method implies

- **Criteria stated and ordered before picks.** A verdict the reader cannot trace to a stated criterion is an opinion wearing a methodology costume.
- **A named drawback per recommended pick.** Every product has one; a review that finds none has not looked. Consistent placement makes the honesty visible.
- **Update transparency.** Dated updates with what changed. Stale best-of content silently rotting is one of the most common failures in the category, and a dated what-changed line beats the field.

---

## Google reviews-system alignment

The guidance asks for demonstrated first-hand experience OR demonstrable original research and analysis. The second branch is this skill's lane, and "original analysis" means concrete work product:

- The synthesis itself: owner-experience patterns no single source contains
- Comparative tables built from verified data, structured around the stated criteria
- Decision frameworks: who each pick fits and who it does not
- What paraphrased spec sheets are not: rearranging a manufacturer's bullet points is neither experience nor analysis, and ranks accordingly

A site that does tier 2 and 3 work honestly is doing original analysis by the guidance's own definition. The methodology block is how the work shows.

---

## FTC alignment

Affiliate relationships are disclosed in plain language, placed where the recommendation is, not in a footer. The disclosure travels with the monetized content: near the picks, in body-size text, before or beside the first affiliate link a reader can act on. "Plain language" means a reader who has never heard the word affiliate understands that the site earns a commission and that the price they pay does not change. Euphemisms ("partner links," "support the site") fail the plain-language test.

---

## Schema judgment

Markup is a claim. Apply the same honesty to structured data as to prose:

- **Review and Product markup** only when the piece's claims support what the markup asserts. Review markup asserts an evaluative review of an item the reviewer assessed; a tier 1-to-3 buying guide asserting hands-on style review markup is making a machine-readable version of the banned claim.
- **Buying guides without hands-on** use guide-shaped markup: ItemList for the picks, Article for the piece.
- When tier 4 is real and stated, Review markup becomes honest; add it then, per piece, not as a template default.

---

## Workflow

1. **Inventory the evidence honestly.** What tiers are actually available for this category? What hands-on exists, if any?
2. **Set the criteria first.** Ordered, before any product is examined, so the criteria cannot quietly bend toward a favored pick.
3. **Gather per tier.** Verify specs at the source. Pull owner corpora at scale and note sample sizes. Collect named expert sources, including the disagreements.
4. **Synthesize.** Findings per criterion, drawbacks per pick, splits surfaced.
5. **Write the methodology block** from what was actually done, not from what sounds good.
6. **Match the markup to the claims.** ItemList and Article by default; Review only where tier 4 is true.
7. **Maintain.** Date updates, state what changed, upgrade pieces when hands-on arrives, and mark the upgrade.

---

## Failure patterns

- **"We tested" inflation.** The anchor-rule violation. It is also unnecessary: honest synthesis outperforms fake testing once readers compare the work.
- **Aggregator specs.** Spec tables copied from other reviews, drift included. Verify at the maker's page or do not publish the number.
- **Anecdote dressed as synthesis.** Three forum posts is not owner experience at scale. State the sample or downgrade the claim.
- **Averaged experts.** Splitting the difference between conflicting expert verdicts erases the most useful information: that credible testers disagree, and why.
- **The drawback-free pick.** A recommendation with no named drawback reads as advertising because it is structured like advertising.
- **Backfilled hands-on.** Quietly rewriting an old synthesis piece as if it had been tested all along. The upgrade-and-mark pattern exists so this never has to happen.
- **Footer disclosure.** An affiliate disclosure the reader has to hunt for fails both the FTC's placement expectations and the trust purpose it exists to serve.
- **Schema overreach.** Review markup on synthesis content. The piece's prose is honest and its markup lies.

---

## Output format

For a methodology setup: a short methodology standard the site adopts (the tiers, the block template filled with the site's sources, the schema policy), suitable for docs or an editorial guide.

For a piece-level engagement: the methodology block for that piece, the criteria list, the evidence file (sources gathered per tier with sample sizes), and the claims audit if the piece existed before this skill did.

---

## Reference files

- [`references/evidence-tiers.md`](references/evidence-tiers.md) - The four tiers in depth: verification steps, synthesis honesty, triangulation practice, and the upgrade-and-mark pattern.
- [`references/methodology-block-template.md`](references/methodology-block-template.md) - The fillable per-piece disclosure block, a worked example, and placement rules.
