# Crawl budget management

Sitemap segmentation, noindex on thin pages, canonicalization on duplicates, crawl rate monitoring, pruning criteria.

Search engines have crawl budgets. Large pSEO sets can exhaust them. Crawl budget management is the discipline that keeps the set crawlable as it scales past 10,000+ pages.

---

## Sitemap segmentation

A 100,000-page sitemap is harder for crawlers to process than 10 segmented sitemaps with 10,000 entries each.

**Segmentation by category.** One sitemap per top-level category. Crawlers prioritize sitemaps differently; segmentation helps the crawler prioritize active categories over dormant ones.

**Segmentation by recency.** A "recent" sitemap surfaces pages generated in the last 30 days. Crawlers find new content faster; existing content remains crawlable through category sitemaps.

**Segmentation by update frequency.** A "frequently-updated" sitemap surfaces pages whose volatile fields refresh weekly or daily. Crawlers re-crawl these pages on a tighter cadence.

**Sitemap index.** A parent sitemap-of-sitemaps points to all segmented sitemaps. The index is what gets submitted to Search Console; the segments handle the actual page lists.

**Sitemap size limits.** 50,000 URLs per sitemap is the hard limit. 10,000 to 25,000 per segmented sitemap is the typical practical size; smaller is fine for niche categories, larger is fine for high-volume categories.

---

## Noindex on thin pages

Pages with insufficient data should noindex rather than ship as bait.

**The discipline.** Pages that fail the schema's required-field threshold do not get a public URL. They sit in the system as drafts until their data populates.

**Why noindex matters.** Thin pages drag down the entire set's quality signal. Search engines and AI engines both apply set-level quality scoring; a set with 10,000 thin pages and 90,000 substantive pages scores worse than a set with just the 90,000 substantive pages, even though the absolute page count is lower.

**Noindex implementation patterns.**

- The thin pages render with a `noindex` meta tag in the head.
- The thin pages are excluded from the sitemap.
- The thin pages are not linked from any other page in the set.

**The "we'll fix it later" trap.** Teams ship thin pages with `index, follow` and plan to backfill data later. The data backfill rarely happens; the thin pages accumulate; the set's quality signal degrades over time.

---

## Canonical handling

Comparison pages and other pivot patterns produce duplicate-content risks.

**The X-vs-Y pattern.** A page comparing X to Y often has an inverse page comparing Y to X. The two pages cover the same content from different orderings. Canonicalize one to the other.

**Canonical decision.** Pick the canonical based on search volume, alphabetical order, or category hierarchy. The choice itself matters less than picking one consistently.

**Other pivot patterns.**

- **Filter pivots.** "Homes in Denver under $500k" and "Homes under $500k in Denver" should canonicalize to one.
- **Sort pivots.** "Top hotels in Paris by rating" and "Top hotels in Paris by price" might be distinct enough to live separately, or might canonicalize depending on the user-intent overlap.
- **Date pivots.** "Best [thing] for 2025" and "Best [thing] for 2026" usually live separately because the content genuinely differs by year; canonicalization would lose the time-relevance signal.

**The discipline.** Canonical decisions are designed at template time, not retroactively. The template either generates canonical-pair URLs (and chooses one as canonical from the start) or it does not generate the duplicate at all.

---

## Crawl rate monitoring

Search engines publish crawl statistics. Monitor them.

**Google Search Console crawl stats.** Pages crawled per day, average response time, crawl request distribution by category. Monitor monthly; investigate drops or plateaus.

**Crawl rate plateauing while page count grows.** The set is hitting crawl budget limits. The fix is not "publish more pages." The fix is:

- Noindex thin pages to remove low-value crawl targets
- Improve internal linking so crawlers prioritize the substantive pages
- Segment sitemaps so the crawler can prioritize active categories
- Reduce server response time so crawlers can crawl more in the same budget

**Crawl rate dropping unexpectedly.** Investigate. Common causes: server errors that the crawler is encountering, robots.txt changes that excluded important paths, sitemap submissions that broke, large-scale URL pattern changes without redirects.

---

## Pruning criteria

Pages that fail to attract clicks or impressions for 6+ months should noindex or 410.

**The 6-month checkpoint.** A page that has been in the set for 6+ months and has earned zero impressions in Search Console is dead weight. The fix is not "wait longer."

**Pruning options.**

- **Noindex.** The page stays accessible to direct visitors but is removed from the search index. Reversible if the page later starts earning impressions.
- **410 Gone.** The page is removed entirely; the URL returns 410. Permanent; appropriate for genuinely obsolete content.
- **301 Redirect.** The page redirects to a more-relevant alternative. Appropriate when the user's intent for the dead page can be served by an alternative page that still exists.

**The 12-month and 24-month checkpoints.** Pages that have not earned traffic by month 12 should be reviewed for noindex or removal; pages that have not earned traffic by month 24 should be removed unless there is a specific strategic reason to keep them.

**Why pruning matters.** Dead pages waste crawl budget. Crawlers visit them, find nothing useful, and the set's average quality signal degrades. Pruning concentrates the set's PageRank on the pages that earn traffic.

---

## When the set is too large for the budget

Symptoms:

- Crawl rate is permanently below the page count's natural crawl demand
- New pages take weeks or months to get indexed
- Existing pages drop out of the index unexpectedly
- The site's overall ranking is degrading despite the set being substantively unchanged

The diagnosis is usually crawl budget exhaustion. The fix is set reduction (prune to the substantive pages), set restructuring (split into multiple subdomains or sites if appropriate), or technical optimization (server response time, sitemap discipline).

The temptation is to publish more pages to "catch up" with traffic targets. The temptation is wrong. More pages without crawl budget produces more dead weight, not more traffic.

---

## Methodology vs implementation

The principles above are methodology: which pages to noindex, when to canonicalize, how to segment sitemaps, how to read crawl stats.

The specific implementation (the framework's noindex meta tag pattern, the sitemap generation library, the canonical link helpers, the deployment-time crawl-test integration) is stack-specific. Each team implements crawl budget management within their own stack's tooling; the methodology applies regardless of the implementation choice.
