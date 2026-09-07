# Common pillar failures

Eleven-plus failure patterns with diagnoses and fixes. Cross-references to other reference files where applicable.

---

## "We have 80 blog posts but no rankings"

**Symptom.** The team has been publishing for 2+ years; 80 pieces shipped; organic traffic is flat or declining.

**Diagnosis.** Orphan content; no hub architecture. 80 disconnected pieces produce no topical authority signal regardless of individual quality.

**Fix.** Audit the 80 pieces. Group by topic. For each major topic group, identify or build a pillar; refactor the existing pieces into clusters by adding pillar callouts and bottom-up links. Some pieces will not fit and become standalone-by-design; some will need consolidation.

The expected outcome: 4 to 6 hubs, each with a pillar plus 8 to 12 clusters; 15 to 20 standalones; the rest pruned. See `pillar-cluster-decision.md`.

---

## "Our 8,000-word pillar does not rank"

**Symptom.** Team invested in a long, comprehensive pillar; 6 months in, position 23 on the primary keyword.

**Diagnosis.** Comprehensive but no cluster support; the pillar is a long article without a hub. Length without architectural support does not signal authority.

**Fix.** Build the cluster. Plan 10 to 12 cluster pieces under the pillar; ship 3 to 5 in the next 8 weeks; complete the cluster within 6 months. Update the pillar with internal-link callouts to each cluster as they ship. See `cluster-planning-patterns.md`.

The expected outcome: ranking improves over 3 to 6 months as the cluster matures. The pillar that did not rank standalone will rank as the hub forms.

---

## "We launched the pillar, never built the cluster"

**Symptom.** Pillar shipped 8 months ago; team's editorial focus shifted; the planned cluster never landed. Pillar has 2 supporting pieces shipped haphazardly.

**Diagnosis.** Architecture half-built. The 2 supporting pieces are functioning as orphans because the hub is not formed; the pillar gets minimal compounding.

**Fix.** Either commit to completing the cluster (8 to 10 more pieces over 4 to 6 months) or prune the hub. Half-built hubs are worse than no hub; commit or unwind. If completing, prioritize facets the team can ship within 12 weeks.

---

## "Cluster pieces do not link to the pillar"

**Symptom.** Hub has pillar plus 12 clusters; pillar links to all clusters; only 4 of 12 clusters link back to the pillar.

**Diagnosis.** Top-down link graph but no bottom-up. The pillar does not compound. Cluster pieces have not been required to include pillar callouts.

**Fix.** Audit each cluster; add pillar callouts in the first 200 words and the closing of any cluster that lacks them. Update the brief template to require both pillar callouts on every future cluster piece. See `internal-linking-architecture.md`.

---

## "Two cluster pieces target the same keyword"

**Symptom.** Cluster includes "what is a feature flag" and "feature flags explained." Both rank position 8 to 12 alternately; neither breaks into the top 5.

**Diagnosis.** Self-cannibalization. Two pieces competing for the same SERP; PageRank splits across two URLs; neither piece gets enough authority to rank top 5.

**Fix.** Consolidate. Pick the stronger piece (higher current rank, more inbound links, longer URL history). 301 redirect the weaker piece to the stronger one. Merge any unique content from the weaker into the stronger. Update the linking inventory.

---

## "Pillar URL is /blog/the-ultimate-guide-to..."

**Symptom.** The pillar lives at `/blog/the-ultimate-guide-to-feature-flag-rollout-strategies/` because the CMS routes everything under `/blog/`.

**Diagnosis.** Losing the URL hub signal. Crawlers cannot infer hub topology from the URL; readers cannot tell from the URL that this is a pillar.

**Fix.** Migrate to `/feature-flag-rollout/` for the pillar; cluster pieces to `/feature-flag-rollout/[slug]/`. 301 redirect old URLs. Take a short-term ranking hit; gain long-term hub-signal clarity. See `url-structure-patterns.md`.

The migration is not always worth it. If the pillar is small or the brand's overall content investment is modest, the cost may exceed the benefit. Score against the hub's commercial value.

---

## "Our pillar is 12 sections of 'what is X'"

**Symptom.** Pillar covers the topic comprehensively in length but every H2 is a definitional question. "What is X." "What does X do." "What are the parts of X." 12 variations of the same angle.

**Diagnosis.** Facet homogeneity. The pillar covers one angle 12 ways instead of 12 distinct angles.

**Fix.** Rewrite the pillar's outline using the heterogeneity check (definition, how-to, comparison, examples, mistakes, costs, alternatives, etc.). Replace 8 of the 12 definitional sections with sections covering different angles. See `cluster-planning-patterns.md`.

---

## "We cannot tell which piece to refresh first"

**Symptom.** Hub has 14 pieces; team knows refresh is needed; cannot prioritize where to start.

**Diagnosis.** No maintenance ownership; no signals being tracked. Without per-piece performance data, refresh prioritization is guesswork.

**Fix.** Assign a hub owner (see `content-refresh-patterns.md`). Track 4 metrics per piece: organic traffic, primary-keyword rank, AI citation count if measurable, last-updated date. Prioritize refresh on pieces with declining traffic, slipping ranks, or oldest update dates. The metrics make the prioritization mechanical.

---

## "Pillar ranks but does not get cited by AI engines"

**Symptom.** Pillar ranks position 4 on Google; brand mention rate from Profound is unchanged after the pillar shipped.

**Diagnosis.** Missing AEO/GEO signals. Pillar may have no TL;DR, no answer paragraphs under H2s, no FAQ schema, vague statistics, no named experts.

**Fix.** Audit the pillar against the AEO/GEO signals checklist (see `topical-authority-signals.md`). Add a 150 to 250 word TL;DR at the top. Add 40 to 60 word answer paragraphs under each H2. Mark FAQ section with FAQPage schema. Replace vague statistics with specific numbers and cited sources. Add named experts where the topic supports them.

The AEO/GEO refresh is faster than the SEO refresh; expect citation improvement within 4 to 8 weeks of changes propagating.

---

## "Hub launched 3 years ago; nobody owns it now"

**Symptom.** Hub built by a content lead who left 18 months ago. No formal owner since. Performance has degraded; nobody noticed.

**Diagnosis.** Lifecycle ownership gap. The "set and forget" failure mode.

**Fix.** Assign a new owner. Allocate 1 to 2 weeks of editorial time for an emergency refresh: re-validate the SERP, update statistics, prune dead sections, refresh internal links. Set the annual refresh cadence going forward; track ownership renewal in the hub's planning doc. See `content-refresh-patterns.md`.

Some hubs at this stage are unrecoverable. If the SERP has shifted enough that the original architecture no longer fits, restructure rather than refresh; treat as a year-5+ lifecycle event.

---

## "We have 25 clusters and it is chaos"

**Symptom.** Hub started at 12 clusters; expanded over 3 years to 25; the linking inventory is unmanageable; new pieces tangle with old pieces; readers cannot find what they need.

**Diagnosis.** Over-built. The cluster expanded beyond the manageable sweet spot.

**Fix.** Prune. Apply the cluster pruning criteria (see `content-refresh-patterns.md`): clusters that have not ranked in top 30 after 12 months, clusters with zero search volume, clusters that duplicate other clusters. Aim to trim back to 12 to 15 active clusters; archive the rest with redirects.

Alternative: split into two pillars under a parent topic. Rare; valid only for genuinely broad topics.

---

## "We did all the SEO work but the AI engines do not cite us"

**Symptom.** Pillar ranks well; clusters rank well; brand mention rate from Profound is flat. AI engines cite competitors instead.

**Diagnosis.** Could be either:

- The hub is structurally fine for SEO but missing AEO/GEO signals (see "pillar ranks but does not get cited" above).
- The hub is missing distinctive POV. AI engines preferentially cite content with attributable claims; content that reads as SEO consensus does not get cited even when it ranks.

**Fix.** Audit each pillar and high-traffic cluster for distinctive claims. Add at least one strong POV per piece: a position the team is willing to defend, a recommendation that is not "it depends," a specific claim with named experts and statistics behind it. Bland comprehensive content does not get cited; opinionated comprehensive content does.

---

## "We have a hub but conversions are flat"

**Symptom.** Hub drives traffic, ranks well, gets cited; trial signups attributable to the hub are flat.

**Diagnosis.** Topical authority is working; commercial conversion is not. The hub's content does not connect cleanly to the buyer journey.

**Fix.** Audit the pillar and clusters for commercial CTAs. Each cluster should have a clear next step that is NOT just "read another cluster." Trial signup, demo request, content download, newsletter subscription. The hub is producing the audience; the conversion path needs separate design work.

This failure is outside this skill's scope to fully solve; pair with `landing-page-copy` for conversion-focused next-step pages and `content-strategy` for funnel-aware content planning.
