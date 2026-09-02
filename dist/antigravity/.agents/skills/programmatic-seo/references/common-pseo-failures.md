# Common pSEO failures

Eleven-plus failure patterns with diagnoses and fixes. Cross-references to other reference files where applicable.

The pattern across most failures: pSEO programs that ship without one of the five readiness criteria (real data, queryable intent, sufficient volume, refresh cadence, QC budget) and assume the gap will close later. The gap rarely closes; the failure compounds.

---

## "We generated 50,000 pages and got penalized"

**Symptom.** Algorithm update lands; the set loses 60 to 90% of its traffic in days.

**Diagnosis.** Thin content scaled too fast without QC discipline. The set was generating filler pages, sometimes from AI-summarized public data, sometimes from sparse first-party data with bolt-on AI text. The algorithm update detected the scale-without-substance pattern.

**Fix.** Halt new generation. Run a triage audit: which pages have substantive data backing them, which are filler. Noindex the filler. The remaining pages may recover ranking once the set's quality signal improves; the filler ones will not. Sometimes the right call is removing the entire pSEO surface and rebuilding from a higher-quality data source.

**Prevention.** The five-criterion check (`when-pseo-works-decision.md`) before launch. The QC discipline (`quality-control-at-scale.md`) before scaling.

---

## "We have 10,000 pages but only 200 rank"

**Symptom.** Pages exist in the set; few of them rank for their target queries.

**Diagnosis.** Internal linking architecture missing or incomplete. Hub pages rank because they receive site-wide navigation links. Child pages do not rank because they have no in-page link votes; they are partial orphans reachable only via sitemap.

**Fix.** Build the link graph. Add sibling-link slots to the template. Compute cross-record similarity to populate sibling links. Backfill the link graph across the existing set. Audit for orphans; surface them in the QC queue (`internal-linking-at-scale.md`).

---

## "Crawl rate plateaued"

**Symptom.** Page count grows; pages crawled per day stays flat or declines.

**Diagnosis.** Crawl budget exhaustion. The set has more pages than the search engine's crawl budget supports.

**Fix.** Noindex thin pages. Segment sitemaps. Improve internal linking so crawlers prioritize substantive pages. Reduce server response time. Prune the dead-page tail. Detail in `crawl-budget-management.md`.

The wrong fix: publishing more pages to "catch up" on traffic targets. More pages without crawl budget produces more dead weight, not more traffic.

---

## "Pages look identical"

**Symptom.** Random sampling of pages from the set finds them indistinguishable in substance, only different in identifiers.

**Diagnosis.** Template lacks variable density, or the data is too sparse to differentiate. The template renders the same boilerplate for every record because the records do not actually differ on the dimensions the template surfaces.

**Fix.** Two paths.

- If the template is the problem (the data has variation but the template hides it): redesign the template to surface distinctive fields prominently. Move the differentiating data above the fold; demote the boilerplate.
- If the data is the problem (the records genuinely lack distinctive fields): the schema is too thin. Either deepen the schema with more source data, or accept that the program does not justify pSEO and pivot to editorial content.

---

## "We cannot update the templates without 10,000 manual fixes"

**Symptom.** A template change requires manually editing every existing page.

**Diagnosis.** Template versioning was not designed for scale. Pages were generated as static output rather than as renders from the schema; updating the template now requires updating each rendered page.

**Fix.** Architectural rebuild. Pages need to be re-rendered from the schema each time the template changes. The schema is the source of truth; the rendered pages are the output. Without this discipline, every template change becomes a per-page migration project.

**Prevention.** Design pages as renders from data, not as static artifacts. The specific stack choice (build-time generation that re-runs on template change, server rendering with template version in the cache key, hybrid approaches) varies by team; the methodology principle is the same.

---

## "Our quality control is whoever has time"

**Symptom.** No regular QC cadence. Sample audits happen sporadically when someone notices a problem.

**Diagnosis.** No sampling discipline, no thresholds, no ownership. The QC was assumed to be everyone's job, which means it is nobody's job.

**Fix.** Assign a QC owner. Set the sampling cadence (monthly minimum for active programs). Codify the failure threshold (5% sample failure halts new generation). Track cohort metrics. Detail in `quality-control-at-scale.md`.

---

## "AI engines do not cite our pages"

**Symptom.** Traditional search rankings are stable; brand mention rate from AI search visibility tools is flat or declining.

**Diagnosis.** Multiple possible causes.

- The top-200-word answer was not designed; pages start with welcome paragraphs instead of answers.
- Schema markup is thin; AI engines see the pages as low-authority.
- FAQPage schema is missing on FAQ sections.
- Source citations are missing on factual claims.
- The pages read as templated boilerplate rather than as distinctive answers.

**Fix.** Audit the template against the AEO/GEO patterns (`aeo-geo-for-programmatic-pages.md`). Update the template; migrate cohorts; monitor citation count by cohort to confirm the fix earned gains.

---

## "We are at 100,000 pages and engagement is dropping"

**Symptom.** Traffic continues but bounce rate climbs, time-on-page falls, conversion rate decays.

**Diagnosis.** The set has outgrown its data depth. Early pages were the highest-data-quality records; later pages were lower-quality data backfilled to grow the set. Users are landing on pages that do not satisfy their query.

**Fix.** Reverse the growth and prune. The set should be smaller and higher-quality, not larger and lower-quality. Identify the data-quality threshold below which pages do not satisfy queries; noindex pages below the threshold; let the set's average quality recover.

**Prevention.** The required-field threshold in the schema enforces a quality floor. Pages that fail the threshold should not have shipped in the first place.

---

## "Competitors copied our pages"

**Symptom.** A competitor launched a similar pSEO set; the brand's traffic share is shrinking.

**Diagnosis.** The data source was not a moat. The pSEO pages were replicable.

**Fix.** Two paths.

- Deepen the data source. First-party data accumulation, expert curation investment, licensed-feed integration that competitors cannot match. The defensibility comes from the data, not from the pSEO build.
- Pivot. If the data cannot be deepened, the program does not have a long-term moat. Consolidate the strongest pages, prune the rest, redirect the team to higher-defensibility work.

**Prevention.** The defensibility test (`data-source-identification-patterns.md`) before launch. If competitors could replicate the data source within 6 months at reasonable cost, do not launch the program.

---

## "Refresh is overwhelming"

**Symptom.** Quarterly refresh cycles are missed or partially completed; data drifts; pages get stale.

**Diagnosis.** Refresh cadence was not designed for scale. The team thought "we will refresh quarterly" but the actual work to refresh 10,000 to 100,000 pages exceeds the team's quarterly capacity.

**Fix.** Automate the volatile-field refresh through data pipelines (mostly hands-off after pipeline build). Reduce slow-changing-field refresh frequency to annual on most fields. Cohort-migrate the template refresh rather than big-bang. Detail in `refresh-at-scale.md`.

If the work still exceeds capacity after these fixes, the set is too large for the team's resources. Prune to a sustainable size.

---

## "Our pSEO drives traffic but no conversions"

**Symptom.** Traffic from pSEO pages is high; signups, sales, or engagement on the funnel goal are flat or low.

**Diagnosis.** Query intent does not match buyer intent. The pSEO pages are answering informational queries; the buyer the program needs to capture is searching with different intent.

**Fix.** Audit the queries the pSEO traffic is coming from. If the queries are not in the buyer's funnel, the program is producing non-converting traffic regardless of how well the pages are optimized. The fix is not "add more CTAs to pSEO pages"; the fix is recognizing that pSEO was not the right channel for the program's conversion goal.

**The reconsider-pSEO moment.** If the program's metric is conversions and the pSEO traffic does not convert, pSEO is the wrong tool. Editorial content with stronger buyer-intent alignment, paid acquisition with conversion tracking, or product-led growth surfaces may be the better fit.

---

## "Our QC discipline drifted over time"

**Symptom.** The program launched with strong QC. Months in, the cadence slipped, the threshold became aspirational rather than enforced, the cohort tracking went unread.

**Diagnosis.** QC ownership rotated, accountability dispersed, the metric dashboard stopped being reviewed. The pattern is the same as the "set and forget" failure for editorial pillar maintenance.

**Fix.** Assign a durable QC owner with quarterly accountability. Reinstate the cadence. Audit the set for the drift that accumulated; fix or noindex pages that ship below the threshold.

**Prevention.** The QC owner is named in the program's planning doc and renewed annually. The dashboard that tracks cohort metrics has an actual owner who reviews it monthly. The threshold is treated as enforced, not aspirational.

---

## The pattern across all failures

Most pSEO failures are designed-in. They were predictable from the program's launch shape. The five-criterion check, the schema-as-product principle, the QC budget, the refresh cadence, the link architecture: each one shipped or did not at design time. The set's eventual success or decay was largely determined before the first page generated.

The discipline is upstream. Hold the line at design time; the operational discipline at scale becomes manageable. Skip the design discipline; the program produces filler at scale and gets penalized.
