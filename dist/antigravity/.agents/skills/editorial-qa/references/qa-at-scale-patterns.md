# QA at scale patterns

Sampling strategy, automated checks, manual review at scale, threshold gating.

For pieces shipping at programmatic-SEO scale (100s to 100,000s of pages), full-audit QA is infeasible. The discipline below is sampling plus automated checks plus threshold gating. It is the same shape as the QA section in `programmatic-seo` but applied to the editorial QA gate specifically.

---

## Sampling strategy

Random sample 50 to 200 pages per audit cycle. The sample is stratified.

**Stratification dimensions.**

- **Sparse vs dense data.** Sample some records with minimum-required fields; sample some with most-fields-populated. Sparse pages fail differently from dense pages; the sample needs both.
- **Recent vs old.** Sample some pages generated in the last 30 days; sample some generated 12+ months ago. Recent pages catch template drift; old pages catch data drift.
- **Popular vs niche categories.** Sample some pages from high-traffic parent categories; sample some from low-traffic ones. The popular categories carry the program's traffic; the niche ones surface long-tail-specific failures.
- **Different cohort versions.** If the template has shipped revisions, sample some pages from each cohort. Cohort-specific failures only surface if the sample includes the cohort.

**Sample size by set size.**

- Set under 1,000 pages: sample 50 pages per cycle.
- Set 1,000 to 10,000 pages: sample 100 pages per cycle.
- Set 10,000 to 100,000 pages: sample 150 pages per cycle.
- Set 100,000+ pages: sample 200 pages per cycle.

**Cycle frequency.** Monthly for active sets (new pages generating, data refreshing). Quarterly for stable sets (mature programs in maintenance mode).

---

## Automated checks at scale

Run on every page on a cadence; surface failures as a queue.

### Heading-structure validation

- One H1 per page, in the right place
- H2 sequence reasonable (not orphan H3s, not H4 without H3)
- Heading text length within bounds (no 200-character H2s)

### Schema markup validation

- Schema type present and matches the page's content type
- Required fields populated
- JSON-LD parses without errors
- Schema does not claim things absent from the page

### Word count

- Pages below the floor (typically 600 words for editorial; varies for programmatic templates) get flagged
- Pages above an upper bound (typically 8,000+ words on programmatic templates) get flagged for review

### Duplicate content

- Hash-similarity comparison across the set
- Pages with >80% content overlap with another page in the set get flagged
- Common cause: comparison-pivot pages (X vs Y inverse) without canonicalization

### Broken links

- Crawl outbound and internal links
- 404s and 5xx responses get flagged
- Both internal links to deleted pages and external links to dead URLs surface

### Image presence

- Pages where the template expects images but the image slot is empty
- Programmatic pages with missing image fields render visibly broken

---

## Manual checks on sampled pages

For sampled pages, the human review covers what automation misses.

### Brief or template adherence

- For editorial pages: did the writer execute the brief?
- For programmatic pages: did the page execute the template?

### Top-200-word answer quality

- Read the first 200 words. Does the page answer the user's likely query?
- Is the answer self-contained (could be cited as the canonical answer to the query)?

### Distinctive vs templated

- Compare the sampled page to two siblings in the same template cohort. Could you tell them apart on substance, not just on identifiers?
- Templated pages that look identical signal weak data depth or weak template variable density.

### User-intent satisfaction

- If a real user landed on this page from the target SERP, would they stay or bounce?
- The bounce-shaped pages are the failure mode; staying-shaped pages are the goal.

### AI hallucination spot-check

- For pages that involved AI in drafting or generation, spot-check 3 to 5 statistics, citations, or factual claims per sampled page.
- Hallucination patterns surface in patterns; one bad page often signals a template-level or pipeline-level issue.

### AI-tell pattern check

- Sample a paragraph from the middle of the sampled page.
- Does it match the AI tells from `ai-content-audit-patterns.md`?
- Mid-page drift in programmatic pages signals the generation pipeline's output drifted; investigate.

---

## Threshold gating

If more than 5% of sampled pages fail the manual review, halt new generation. Fix the template OR data quality issue before resuming.

**The 5% threshold is empirical.** Programs that hold under 5% sample failure tend to maintain quality at scale; programs that drift above 5% tend to compound the failure into algorithm-update territory.

**What "halt" means.**

- New page generation stops.
- The template or data fix is shipped.
- The next sample audit confirms the fix improved the failure rate before generation resumes.

**Why halt instead of "fix as you go."** Continuing to generate while quality degrades produces more pages that need to be fixed retroactively. Halting prevents the problem from compounding.

**The threshold is not negotiable.** "Just ship the next batch and we will fix later" is the failure mode. The pattern produces sets that look fine at month 6 and get penalized at month 18.

---

## Cohort tracking

Pages generated in one period rank differently from pages generated in another. That signals a template change or data quality drift; investigate.

**Cohort cuts.**

- Pages from a given month
- Pages from a given template version
- Pages from a given data-source version

**Drift signals.**

- **Cohort A pages rank top 10; cohort B pages rank position 30.** Template or data changed between cohorts; identify the change.
- **Cohort A pages get cited; cohort B pages do not.** Template's above-the-fold answer changed shape; cohort B may have lost the citation pattern.
- **Cohort A pages have stable engagement; cohort B pages have decaying engagement.** Cohort B may have a data freshness problem.

Aggregate metrics hide problems. The set's overall rank looks fine if 80% of pages are stable and 20% are decaying. Cohort tracking surfaces the decaying 20% specifically.

---

## QA log

Document each cycle's audit. The log compounds into pattern detection.

**Log fields.** Cycle date, sample size, failure count, failure types, cohort distribution, threshold breach if any, halt action if triggered, fix shipped if applicable.

**The patterns the log surfaces over time.**

- Recurrent failure types (always the answer paragraph; always the schema; always the data freshness)
- Cohort-specific patterns (cohort B always fails harder than cohort A)
- Template versions that solved one problem and introduced another
- Data sources that drift faster than expected

The log is process improvement input. Quarterly review; act on patterns.

---

## When the sample reveals the program is broken

Sometimes QC at scale reveals the underlying program is wrong, not just that individual pages need fixes.

**Signals.**

- 30%+ of sampled pages fail the manual review (data is too thin to support the template)
- Failures cluster around a specific category (the dataset has a hole there; pSEO is generating pages from missing data)
- Cohort decay is universal (the underlying competitive dynamics have shifted; the program's value proposition is decaying)

The right response is not "fix individual pages." The right response is to revisit the program's design: data depth, template scope, cohort coverage. Sometimes the answer is to prune the program back to its strong segments and walk away from the weak ones.

---

## Methodology-level choices that stay in the public skill

The stratified sampling strategy, the 5% threshold, the automated check categories, the manual review checklist, the cohort tracking discipline, the QA log methodology.

## Implementation choices that stay internal

The specific tooling for storing and querying the QA log (database table, Notion, dbt model, BI tool). The specific automated check pipeline (CI integration, scheduled crawls, data warehouse queries). The specific sampling implementation (random ID selection script, weighted sampling logic). The specific dashboard or visualization for surfacing cohort patterns. These vary per team scale and tooling.
