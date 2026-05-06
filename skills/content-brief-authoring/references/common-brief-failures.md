# Common brief failures

Ten-plus failure patterns with diagnoses and fixes. Cross-references to other reference files where applicable.

---

## "The brief was too thin"

**Symptom.** Brief contains target keyword, word count, deadline, maybe a one-line angle. Writer fills in everything else from priors. Output is generic, drifts off-topic, does not rank.

**Diagnosis.** The strategist treated the brief as a task assignment instead of a contract. The 12 fields were not populated; the writer's defaults filled the gaps; the defaults were not aligned with the program's intent.

**Fix.** Populate all 12 fields. If a field cannot be populated (the success criteria is genuinely unknown, the SERP is too volatile to call), name the gap explicitly and flag it as "writer's call, defend the choice in the first draft."

---

## "The brief was too thick"

**Symptom.** Brief is 4 pages with executive summary, brand-voice refresher, comprehensive competitive landscape, plus the actual brief. Writer skims for the outline. Output is not better than from a thin brief.

**Diagnosis.** Strategist optimized for brief authorship instead of brief consumption. Each field added felt important; nobody asked "would the writer behave differently if this field were missing?"

**Fix.** Cut fields that do not change writer behavior. Brand-voice refresher: link, do not repeat. Competitive landscape: link to research, do not summarize. Executive summary: the brief is the executive summary. Target: 1 to 2 pages.

---

## "The writer ignored the brief"

**Symptom.** The published piece misses the SERP intent, drops required entities, ignores internal-link guidance. Editor's review surfaces the gap.

**Diagnosis.** No success-criteria acknowledgment at handoff. The writer read the brief once at the start, drafted from memory plus priors, never re-read.

**Fix.** Require acknowledgment at handoff (see `writer-handoff-protocols.md`). The acknowledgment restates the success criteria in the writer's voice. Saying it is what keeps it load-bearing.

---

## "The brief had the wrong target keyword"

**Symptom.** The piece publishes; the target keyword turns out to have search volume of 50/month, or to be navigational (a brand wins position 1 forever), or to have a SERP the team cannot win. The piece does not rank.

**Diagnosis.** SERP not validated before briefing. The strategist assumed the keyword was good without pulling the SERP and the volume.

**Fix.** SERP-validate before briefing. Pull the keyword volume (Ahrefs, Semrush, GSC). Pull the SERP top 10. If the SERP looks unwinnable for the brand at current authority, pick a different keyword.

---

## "The piece does not match the SERP intent"

**Symptom.** SERP shows mostly listicles; the briefed piece is a long-form article. Or SERP shows long-form articles; the briefed piece is a listicle. Either way, the piece does not rank.

**Diagnosis.** SERP intent override was not applied. The strategist's priors about what the keyword "should" look like overrode what the SERP actually shows.

**Fix.** Apply the SERP override pattern (see `search-intent-classification.md`). The format choice line in the brief must match the dominant SERP format.

---

## "The piece has no internal links"

**Symptom.** Piece publishes with zero internal links to other pages on the site. Or with one or two links that the writer added arbitrarily.

**Diagnosis.** Internal linking was treated as an afterthought. The brief did not specify outbound links; the writer added some at the end without strategic intent.

**Fix.** Specify 3 to 5 outbound links in the brief, with anchor text and target page. Queue 1 to 3 inbound updates as post-publish tasks (see `internal-linking-strategy.md`).

---

## "The piece is generic; could have been written about anything"

**Symptom.** Reading the piece, you cannot tell what brand it came from, what makes it different from the SERP top 10, or why this piece exists. The piece reads as AI-generated even when a human wrote it.

**Diagnosis.** Entity coverage and POV were missing from the brief. The writer hit the target keyword but did not differentiate; the piece blends into SERP consensus.

**Fix.** Specify gap entities (entities mentioned by 1 to 2 SERP pages but not by the rest). Specify a POV for the piece: what the brand argues that the rest of SERP does not. Generic content has no POV; effective content makes a specific claim.

---

## "The brief is comprehensive but the piece does not rank"

**Symptom.** Brief had all 12 fields. Writer followed the brief. Piece is well-written, hits the entities, follows the outline. Three months post-publish: position 47.

**Diagnosis.** The SERP was harder than expected. The brief was right; the keyword was over-competitive at the brand's current authority. This is variance, not failure.

**Fix.** Do not iterate by adding fields to the brief. Iterate by SERP-validating more carefully next time, by accepting that some keywords are out of reach until the brand earns more authority, or by pivoting to a less-competitive long-tail variant.

---

## "We never went back to evaluate"

**Symptom.** Pieces publish; nobody checks performance at 30 / 60 / 90 days. The program runs without feedback.

**Diagnosis.** Success criteria were defined in the brief but no measurement task was queued at publish time.

**Fix.** Make 30 / 60 / 90 day check-ins part of the publish checklist. The check-in is a 5-minute task: read the rank, the citation count, the conversion data; update the audit trail (see `brief-governance-patterns.md`). Not optional.

---

## "Different writers produce wildly different output from the same brief"

**Symptom.** Two writers given the same brief produce pieces that read like they came from two different programs. The brief was supposedly identical; the output is not.

**Diagnosis.** The brief was actually too vague. Different writers filled gaps with their own priors; the gaps were where the divergence lives.

**Fix.** Tighten the anti-patterns and the voice notes. The brief explicitly forbids common writer drifts (off-topic tangents, off-brand tone, AI clichés). The voice reference is specific (not "use brand voice" but "use the voice of section 3 of the voice guide; default tone, no sharper").

---

## "The piece succeeded but we cannot tell why"

**Symptom.** A piece outperforms expectations: top-3 rank, high citation count, conversion above target. The team cannot explain what made it work.

**Diagnosis.** The brief and the published piece have multiple distinguishing features (specific outline, gap entities, sharp POV); without controlled comparison, the team cannot isolate the cause.

**Fix.** Document hypotheses about why the piece worked in the post-publish note. Test the hypotheses by briefing the next 3 pieces with the same pattern. If the pattern replicates, it is the cause; if not, the success was variance. The audit trail compounds (see `brief-governance-patterns.md`); patterns emerge over 20+ pieces.

---

## "We approved the brief but the writer wrote a different piece"

**Symptom.** The brief was for a comparison piece; the writer delivered a thought-leadership piece. The brief was for 1,800 words; the writer delivered 3,400 words. The brief was for a senior data engineer audience; the writer wrote for a non-technical CMO.

**Diagnosis.** The handoff acknowledgment was skipped. The writer read the brief, drafted from a different mental model, and did not surface the divergence early.

**Fix.** Require acknowledgment that restates the brief's parameters: word count, audience, format. If the writer's acknowledgment misstates anything, the strategist catches it before drafting starts. After 1,500 words of writing, restarting is expensive; before drafting, restating is cheap.
