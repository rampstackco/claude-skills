# Common repurposing failures

Eleven-plus failure patterns with diagnoses and cures. The cross-cutting pattern: most repurposing failures share a single root, which is treating repurposing as content multiplication rather than as cross-format craft.

---

## Failure 1: Mass-blast (same content reposted across channels)

**Symptom.** Blog post text pasted into LinkedIn as a long post. Email is the blog's first three paragraphs with "read more." YouTube version is a slideshow of the article text read aloud.

**Diagnosis.** Repurposing without per-format adaptation. The team is treating "more channels" as the goal rather than treating each derivative as a piece adapted for its medium.

**Cure.** Apply the per-format constraints discipline (see `per-format-constraints.md`). Each derivative gets rewritten for the target format. AI-assisted repurposing without strong format prompts produces this failure; the cure includes voice prompts and per-format instructions.

---

## Failure 2: AI-slop derivatives

**Symptom.** Derivatives feel like AI slop. Generic, derivative, signal-less. Voice has drifted from the source.

**Diagnosis.** AI-assisted repurposing without voice discipline. AI generation regresses to model defaults; multiple derivatives generated without voice anchor compound the drift.

**Cure.** Apply the voice-consistency-across-formats discipline (see `voice-consistency-across-formats.md`). Voice prompts including sample text from the source. Per-derivative voice review. Reject the bland; rewrite generic sentences in voice. See also `ai-content-collaboration` for the broader voice-preservation discipline.

---

## Failure 3: One-and-done

**Symptom.** Source pieces publish; never get repurposed. The team produces new flagship work continuously while older flagship work sits unused.

**Diagnosis.** No repurposing discipline; the team treats publication as the end of the piece's life. Most of the source-piece value goes unrealized.

**Cure.** Establish source-piece tiering (see `source-piece-selection-criteria.md`). Tier 1 and Tier 2 pieces get cross-format extension plans at production time. Capacity allocation for repurposing becomes a real budget line.

---

## Failure 4: Repurposing the wrong pieces

**Symptom.** Repurposing capacity goes to pieces that resist extension. The derivatives feel forced; engagement is low.

**Diagnosis.** Source-piece selection is choosing pieces by availability rather than by suitability. Pieces with tightly-integrated arguments, list-style structure, or no demand signal are being repurposed when they should stay one-and-done.

**Cure.** Apply the selection audit. Run candidates through the strong vs weak source-piece characteristics. Some pieces stay one-and-done; that is the right disposition for them.

---

## Failure 5: Format constraints ignored

**Symptom.** Derivatives feel awkward on their target formats. Engagement is low. Audiences scroll past or unsubscribe.

**Diagnosis.** Each medium has constraints; the derivatives violate them. LinkedIn long posts as walls of text; emails as image-only layouts; podcasts as articles read aloud.

**Cure.** Apply the per-format constraints discipline. Each format has demand-and-forbid lists. Derivatives must respect them, even at cost of departing from the source's surface.

---

## Failure 6: Derivative outperforms source (cannibalization)

**Symptom.** A blog-post derivative outperforms the source whitepaper for the source's target keyword. Authority is splitting between the two pieces.

**Diagnosis.** Either the source was the wrong format for the topic (the derivative format fits SERP intent better), or the derivative is targeting the same keyword as the source and cannibalizing.

**Cure.** Two options. If the source was the wrong format, consider whether the derivative should become the canonical piece (with the source decommissioned or repositioned). If the derivative is cannibalizing, reassign primary keywords: the source keeps the high-value head term; the derivative gets a long-tail variant.

---

## Failure 7: Voice drift across the cross-format set

**Symptom.** Each derivative is fine alone but the cross-format set reads as voice variants. Audiences who follow the program notice the inconsistency.

**Diagnosis.** Multiple writers or AI generators produced derivatives without voice coordination. Voice drifted across producers.

**Cure.** Single voice owner across the cross-format set. Voice library with examples. Calibration sessions where multiple writers reconcile voice expectations. AI tools include the same voice prompts across all derivative generations.

---

## Failure 8: Cadence too aggressive

**Symptom.** Cross-format set ships a wave of 12 derivatives in one week. Audiences disengage by day 3. Most derivatives produce minimal engagement.

**Diagnosis.** Concentrated cadence too tight for the audience attention rhythm. The cross-format presence on a single week exhausts rather than reinforces.

**Cure.** Apply the sequencing-and-cadence discipline. Match cadence to source's traffic curve and audience attention norms. Most cross-format sets benefit from concentrated-but-not-collapsed pacing (4-6 weeks rather than 1 week).

---

## Failure 9: No cross-promotion

**Symptom.** Derivatives ship in isolation. No links to source. No links between derivatives. No mention of the cross-format set on the channels where audiences could discover it.

**Diagnosis.** Cross-promotion was treated as optional or as an afterthought. The compounding effects of cross-linking and co-promotion are missing.

**Cure.** Apply the cross-promotion discipline (see `cross-promotion-patterns.md`). Every derivative includes a derivative-to-source link. The source piece is updated to reference derivatives. Co-promotion across channels is planned at rollout time.

---

## Failure 10: AEO extraction skipped or generic

**Symptom.** The cross-format set ships without FAQ extractions or with generic FAQ extractions. AI-search citation rates are low.

**Diagnosis.** AEO extraction was not part of the plan, or the FAQ questions do not match user search phrasings, or the answers are context-dependent rather than standalone.

**Cure.** Apply the AEO extraction patterns. Treat FAQ extraction, snippet design, and statistic extractions as derivative formats with their own conventions. Schema-mark where appropriate.

---

## Failure 11: No source-piece updating after rollout

**Symptom.** The source piece publishes; derivatives ship; the source piece is never updated to reference the derivatives. The source remains static.

**Diagnosis.** The forward-promotion from source to derivatives was skipped. The source's role as cross-format hub is wasted.

**Cure.** Plan source-piece updates as part of the rollout. As each derivative ships, the source's "related" or "see also" section gets updated. The source becomes a navigation hub for the cross-format set.

---

## Failure 12: Capacity underestimation

**Symptom.** The team planned 30 hours for a whitepaper repurposing pipeline; actual cost is 70 hours. New production suffers; team burns out.

**Diagnosis.** Capacity estimates were based on optimistic assumptions or on prior pipelines that were not as substantial.

**Cure.** Track actual capacity per pipeline (see `repurposing-pipeline-templates.md`). Calibrate estimates over time. Some pipelines genuinely cost more than the team has budget for; the right answer may be to reduce scope rather than to overrun.

---

## Failure 13: No measurement

**Symptom.** Cross-format sets ship; the team has a vague sense some perform better than others; the program does not learn.

**Diagnosis.** No per-pipeline or per-derivative tracking. Outcomes are anecdotal rather than data-driven.

**Cure.** Establish a minimum log per pipeline run: source piece, derivatives planned vs delivered, capacity spent, outcomes per derivative, lessons learned. Pattern-detect across pipelines to inform future ones.

---

## Failure 14: Pipeline dogmatism

**Symptom.** The team applies the same pipeline template to every source piece regardless of the source's characteristics or the audience overlap. Some derivatives consistently underperform; the team keeps producing them anyway.

**Diagnosis.** Treating templates as fixed shapes rather than as starting points to customize.

**Cure.** Customize pipelines per source piece. Audience characteristics, source characteristics, and capacity should adjust the cross-format set. Drop derivatives that consistently underperform for the program's audience mix.

---

## Failure 15: AI repurposing as the strategy

**Symptom.** "We use AI to repurpose, so we can scale." The output is a wave of low-engagement derivatives across many channels. The team is producing more derivative content than ever; engagement is flat or declining.

**Diagnosis.** AI is being treated as a substitute for the craft of cross-format adaptation. Volume is being prioritized over quality.

**Cure.** AI is a tool within the workflow, not the workflow itself. The discipline of adaptation per medium is still the work; AI accelerates parts of it. See `ai-content-collaboration` for the workflow discipline that prevents AI-assisted repurposing from drifting into mass-blast and slop.

---

## The cross-cutting pattern

Most repurposing failures share a single root: treating repurposing as content multiplication rather than as cross-format craft.

Multiplication thinking treats each derivative as another item in a quota: more channels, more pieces, more reach. The output is mass-blast and slop because adaptation is skipped.

Craft thinking treats each derivative as a piece in its own right, adapted for its medium, holding the source's voice while respecting the format's conventions. The output is a coherent cross-format set where each derivative earns engagement on its medium.

The fix for almost any repurposing failure is the same: stop multiplying, start adapting. The capacity required for craft-driven repurposing is higher than multiplication-driven repurposing; the value extracted is also higher, often by an order of magnitude.

---

## Methodology-level choices that stay in the public skill

The fifteen failure patterns with diagnoses and cures, the cross-cutting pattern that connects most of them, the multiplication-vs-craft framing.

## Implementation choices that stay internal

Specific tooling for derivative tracking. Specific reporting templates for cross-format outcomes. Specific reviewer training on per-format conventions. Specific automation that flags voice drift across derivatives. The team's own conventions for failure-pattern detection in their pipelines. These vary by team and tooling.
