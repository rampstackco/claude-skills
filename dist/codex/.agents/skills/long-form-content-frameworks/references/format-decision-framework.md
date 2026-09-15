# Format decision framework

When each long-form format fits, what reader contract it implies, and the format-specific taxes that distinguish credible work from filler dressed in the format's clothes.

Format selection is the first long-form decision. The wrong format produces predictable failure: a thinly-researched whitepaper reads as a blog post in formal clothing; a manifesto written diplomatically reads as a position paper that committed nothing. Each format has a reader contract. Failing the contract is what readers detect even when they cannot articulate why a piece is not landing.

---

## Case study

**Reader contract.** "Show me what worked, what did not, and the specifics that let me apply lessons to my own situation."

**Length norm.** 2,000 to 4,000 words. Shorter feels like a marketing snippet; longer feels padded unless the case is unusually rich.

**Structural archetype tendency.** Problem-solution, sometimes narrative arc.

**Format-specific tax.** Specifics. Real company names (or, where confidential, well-disclosed anonymization with enough context to verify the case is real). Real numbers. Real timelines. Real failures alongside successes. Generic case studies that read like marketing collateral fail because the format's value proposition was specificity.

**Common failures.** Anonymized to the point of meaninglessness ("a leading enterprise SaaS company saw 3x growth"); uncritical success narrative with no failures or surprises; missing methodology (what was measured, how, over what period); no reflection (what would the team change, what limits the lesson's applicability).

**When the format does not fit.** When the case is too thin to support 2,000+ words of specificity, write a short customer story instead. When the case is so confidential that real numbers cannot be shared, the case study format is the wrong choice.

---

## Whitepaper

**Reader contract.** "Take me through your reasoning on this question with the rigor I would expect from a serious source. Make an argument I have not seen elsewhere."

**Length norm.** 3,000 to 8,000 words.

**Structural archetype tendency.** Layered argument or comparative analysis.

**Format-specific tax.** Original synthesis. A whitepaper that surveys what other sources already said is not a whitepaper; it is a literature review. The whitepaper format implies the writer is contributing analysis, framing, or synthesis the reader cannot find elsewhere.

**Common failures.** Survey of the field with no original argument; vendor-thinly-disguised pitch document; methodological hand-waving on the data the argument rests on; conclusion that hedges the position the introduction stated.

**When the format does not fit.** When the writer does not have an original synthesis to contribute, write a different format. A survey-style "state of the industry" report is a research report, not a whitepaper. A vendor pitch is a pitch deck, not a whitepaper. Calling either a whitepaper to borrow the format's authority is the genre-mismatch failure mode.

---

## Research report

**Reader contract.** "Show me the data, how you collected it, what it means."

**Length norm.** 4,000 to 12,000 words. Often longer when methodology and full data appendices are included.

**Structural archetype tendency.** Taxonomic survey or comparative analysis.

**Format-specific tax.** Actual primary research. Survey data with disclosed methodology, sample sizes, dates, and limits. Interview data with sample composition disclosed. Original quantitative work the writer did or commissioned. Citing other firms' research and calling the result a research report fails the contract.

**Common failures.** "We surveyed 300 marketers" with leading questions and no methodology disclosure; cherry-picked data points presented without distribution or variance; methodology paragraph that gestures at rigor without delivering it; findings overstated relative to the sample's actual representativeness.

**When the format does not fit.** When primary research budget is unavailable. Calling a literature synthesis a research report is genre fraud; write a whitepaper or a definitive guide instead.

---

## Definitive guide

**Reader contract.** "Be the canonical resource on this topic for the audience the piece names."

**Length norm.** 4,000 to 10,000 words.

**Structural archetype tendency.** Taxonomic survey.

**Format-specific tax.** Actual comprehensiveness. A definitive guide that has obvious topic gaps fails the format. The audience the piece names matters: a definitive guide for senior practitioners and a definitive guide for newcomers are different pieces; trying to be definitive for both audiences usually fails both.

**Common failures.** Comprehensive on the easy parts of the topic, thin on the hard parts; outdated when published because the format suggests timeless authority but the topic moves quickly; not actually definitive because key sub-topics are missing or treated as out-of-scope without justification.

**When the format does not fit.** When the topic is too broad for a single piece to cover canonically (then write a hub: see `pillar-content-architecture`). When the topic is so specialized that "definitive" is a category of one and the format's value disappears.

---

## Manifesto

**Reader contract.** "Tell me what you believe, why, and convince me. Take a position I can argue with."

**Length norm.** 1,500 to 6,000 words.

**Structural archetype tendency.** Layered argument or narrative arc.

**Format-specific tax.** Conviction. The manifesto format demands the writer commit a position with weight. Diplomatic hedging produces a piece that reads as a manifesto in form but a position paper in substance. Readers detect the gap.

**Common failures.** "Both sides have valid points" framings that the manifesto format does not support; hedge-stacked claims ("typically", "generally", "often") on positions that should be specific; closing that walks back the opening's strength; fear of alienating audience segments producing a piece that alienates everyone by committing to nothing.

**When the format does not fit.** When the writer does not actually have a contested position to argue. Calling a survey of consensus views a manifesto is a category error. Write a whitepaper or a position paper if hedging is required.

---

## Ebook

**Reader contract.** "Take me through a body of work as a sequence of related pieces."

**Length norm.** 8,000 to 30,000+ words across multiple chapters.

**Structural archetype tendency.** Narrative arc across chapters, with each chapter using its own archetype.

**Format-specific tax.** Each chapter earns its place. A 12-chapter ebook with 3 chapters that should have been cut signals the format was reached for to add length, not because the work justified the format. Table of contents reading reveals the discipline: are the chapters distinct contributions, or is the ebook one argument padded into 12 pieces?

**Common failures.** Repetitive chapters covering the same ground from slightly different angles; introduction and conclusion that are throat-clearing rather than load-bearing; missing connective tissue between chapters that leaves the reader uncertain how the chapters fit; no reason for the work to be an ebook rather than a long-form whitepaper.

**When the format does not fit.** When the work fits in 6,000 words. Stretching a long-form whitepaper to ebook length usually weakens it. Write the long-form whitepaper.

---

## Long-form tutorial

**Reader contract.** "Take me from where I am to where I want to be, step by step, and make sure every step works."

**Length norm.** 3,000 to 8,000 words.

**Structural archetype tendency.** Problem-solution with sequential steps.

**Format-specific tax.** Every step works. Long-form tutorials fail catastrophically when one step is broken: the reader stops there, cannot continue, and the rest of the tutorial is wasted. The tutorial-tax is verification that each step in the sequence delivers the result the next step assumes.

**Common failures.** Skipped steps that were obvious to the writer but blocking to the reader; outdated steps that worked when written but no longer (especially common with tutorials referencing fast-moving tools); broken sequences where step 6 assumes a configuration step 4 did not actually create.

**When the format does not fit.** When the topic does not have a clean sequential path. Branching tutorials where the path varies by reader context are usually better as a hub of shorter pieces (see `pillar-content-architecture`) than as one long-form tutorial trying to handle every branch.

---

## The format-fit decision

A short framework for choosing.

1. **What is the reader contract?** What is the reader investing 30+ minutes to get? Specifics (case study)? Original analysis (whitepaper)? Original data (research report)? Comprehensive coverage (definitive guide)? Conviction (manifesto)? A body of work (ebook)? Sequential instruction (long-form tutorial)?
2. **Can the team pay the format-specific tax?** If the format demands specifics and the case is too confidential to share specifics, the format does not fit. If the format demands conviction and the writer wants to hedge, the format does not fit.
3. **Is there an original contribution?** Whitepapers, manifestos, and research reports particularly require original contribution. Definitive guides and tutorials can be valuable as comprehensive synthesis without original argument.
4. **Does the audience expect this format?** Some audiences expect whitepapers (B2B technical), some manifestos (founder-led brands), some research reports (analyst-influenced markets). Format choice signals genre-fit to the audience.
5. **Is the production capacity available?** Long-form tutorials with verified sequential steps cost meaningful verification time. Research reports cost primary-research budget. Format choice must match capacity, or the format-tax goes unpaid and the piece reads as the format-it-pretended-to-be.

---

## Methodology-level choices that stay in the public skill

The seven format definitions and their reader contracts. The format-specific taxes that distinguish credible work from filler dressed in the format. The decision framework that matches format to work. The genre-mismatch failure modes. The when-the-format-does-not-fit handling.

## Implementation choices that stay internal

Specific case study templates the team uses. Specific whitepaper layouts in the brand's design system. Specific research-report data presentation conventions matching the team's design tokens. Specific PDF production tooling. Specific gating workflow integrations with the team's marketing automation. Specific tutorial step-verification scripts that match the stack the tutorials cover. These vary by team, brand, and tooling; methodology applies regardless.
