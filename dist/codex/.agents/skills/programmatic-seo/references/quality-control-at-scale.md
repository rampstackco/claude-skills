# Quality control at scale

Sampling strategy, automated checks, manual review checklist, failure thresholds, cohort tracking. The discipline that distinguishes durable pSEO from penalty-bait.

Auditing all 100,000 pages individually is infeasible. Quality control at scale is sampling discipline plus automated checks plus failure thresholds plus cohort tracking. Without it, pSEO sets degrade silently until algorithm updates expose the rot.

---

## Sampling strategy

Random sample 50 to 200 pages per audit cycle, balanced across data shape.

**Stratified sampling.** Not "the latest 50 pages" or "the top-traffic 50 pages." A stratified sample exposes problems specific to particular data shapes.

Stratification dimensions:

- **Sparse vs dense data.** Sample some records with minimum-required fields; sample some with most-fields-populated.
- **Recent vs old.** Sample some pages generated in the last 30 days; sample some generated 12+ months ago.
- **Popular vs niche categories.** Sample some pages from high-traffic parent categories; sample some from low-traffic ones.
- **Different cohort versions.** If the template has shipped revisions, sample some pages from each cohort.

**Sample size by set size.**

- Set under 1,000 pages: sample 50 pages per cycle.
- Set 1,000 to 10,000 pages: sample 100 pages per cycle.
- Set 10,000 to 100,000 pages: sample 150 pages per cycle.
- Set 100,000+ pages: sample 200 pages per cycle.

**Cycle frequency.** Monthly for active sets (new pages generating, data refreshing). Quarterly for stable sets (mature programs in maintenance mode).

---

## Automated checks

Run on every page on a cadence; surface failures as a queue.

**Heading-structure check.** Validates H1 exists once, H2s are in order, no orphan H3s, no H2-H3-H4 cascades that nobody scrolls.

**Schema-validity check.** Validates JSON-LD against the page's intended schema type; flags missing required fields, type mismatches, malformed structured data.

**Internal-link-count check.** Flags pages with fewer than 10 internal links (under-linked) or more than 50 (link-dense, anchor-signal-diluting).

**Word-count threshold check.** Flags pages below the template's minimum (typically 300 to 500 words depending on category). Pages below the threshold either need data backfill or should sit as drafts.

**Duplicate-content check.** Hash similarity across the set; flags pages with >80% content overlap with another page in the set. Common cause: comparison pages where X-vs-Y duplicates Y-vs-X without canonicalization.

**Broken-link check.** Crawl outbound and internal links; flag 404s and 5xx responses. Ages quickly without the check; cluster pieces that linked to deleted records become orphan-link generators.

**Schema-population-rate check.** For each optional schema field, the percentage of pages that populate it. Flag fields with population rates below 50%; these usually need either to be required, dropped, or backfilled.

---

## Manual review checklist

For sampled pages, the human review covers what automation misses.

**Above-the-fold answer quality.** Read the first 200 words. Does it answer the user's likely query? Is the language specific to this record or templated boilerplate?

**Distinctive vs templated.** Compare the page to two siblings. Could you tell them apart on substance, not just on the names? If they read identically, the template lacks variable density or the data is too sparse to differentiate.

**Citation-readiness.** Would an AI engine cite this page for the user's query? Specifically: is there a self-contained answer paragraph, are statistics with sources present, is FAQPage or Article schema marked correctly?

**User-intent satisfaction.** If a real user landed on this page from the target SERP, would they stay or bounce? Bounce-shaped pages are the failure mode; staying-shaped pages are the goal.

**Off-brand or off-tone signals.** Does the page read consistently with the brand voice? Templated pSEO tends to drift toward generic neutral voice; the brand voice should still be present.

---

## Failure thresholds

If more than 5% of sampled pages fail the manual review, halt new generation and fix the template or data before scaling further.

**The 5% threshold.** Empirical. Programs that hold under 5% sample failure tend to maintain quality at scale; programs that drift above 5% tend to compound the failure into algorithm-update territory.

**What "halt" means.** New page generation stops. The template or data fix is shipped. The next sample audit confirms the fix improved the failure rate before generation resumes.

**Why halt instead of "fix as you go."** Continuing to generate while quality degrades produces more pages that need to be fixed retroactively. Halting prevents the problem from compounding.

**The threshold is not negotiable.** "Just ship the next batch and we'll fix later" is the failure mode. The pattern produces pSEO sets that look fine at month 6 and get penalized at month 18.

---

## Cohort tracking

Pages generated in one period rank differently from pages generated in another? That signals a template change or data quality drift; investigate.

**Cohort cuts.** Pages from a given month, pages from a given template version, pages from a given data-source version. Track ranking, click-through rate, citation count (from AEO measurement), and engagement metrics by cohort.

**Drift signals.**

- **Cohort A pages rank top 10; cohort B pages rank position 30.** Template or data changed between cohorts; identify the change.
- **Cohort A pages get cited; cohort B pages do not.** Template's above-the-fold answer changed shape; cohort B may have lost the citation pattern.
- **Cohort A pages have stable engagement; cohort B pages have decaying engagement.** Cohort B may have a data freshness problem.

**Why cohorts matter.** Aggregate metrics hide problems. The set's overall rank looks fine if 80% of pages are stable and 20% are decaying. Cohort tracking surfaces the decaying 20% specifically; aggregate tracking misses it.

---

## Team budget

A 10,000-page pSEO set requires roughly 0.5 to 1.0 FTE of ongoing quality control discipline. A 100,000-page set requires 2 to 4 FTE.

**Where the headcount goes.**

- Sample audit cycles (monthly to quarterly)
- Automated check failure queue triage
- Manual review of sampled pages
- Template or data fixes when failures surface
- Cohort tracking analysis and investigation
- Refresh cycle execution (volatile-field refresh, template-version migration)

**The "we'll get to QC later" failure.** Programs that ship without QC headcount budgeted typically degrade within 6 to 12 months. The set looks fine on launch day; the data drifts, the template ships untracked changes, the cohort gap widens, and by month 12 the algorithm update finds the rot.

**The discipline.** Budget the QC headcount before generating the first page. If the budget cannot absorb 0.5+ FTE for ongoing QC, the program's scope is too large; reduce scope until QC fits.

---

## When QC reveals the program is broken

Sometimes the QC discipline reveals that the underlying program is wrong, not just that individual pages need fixes. Signals:

- 30%+ of sampled pages fail the manual review (data is too thin to support the template)
- Failures cluster around a specific category (the dataset has a hole in that category; pSEO is generating pages from missing data)
- Cohort decay is universal (the underlying competitive dynamics have shifted; the program's value proposition is decaying)

The right response is not "fix individual pages." The right response is to revisit the program's design: data depth, template scope, cohort coverage. Sometimes the answer is to prune the program back to its strong segments and walk away from the weak ones. The sunk cost is real but smaller than the cost of continuing to generate filler.
