# Refresh at scale

Data refresh cadence, template versioning, cohort migration, pruning lifecycle.

pSEO sets decay if not maintained. Refresh discipline is built into the program at design time; retrofitting refresh on a 50,000-page set that was not designed for it costs more than building it from the start.

---

## Data refresh cadence

Match the refresh cadence to the data's volatility and the query's freshness reward.

**Volatile fields.** Daily to weekly refresh. Real estate listings, current prices, current availability, recent reviews, current ratings. The data feed updates daily; the pages update daily; the search and AI surfaces see fresh data.

**Slow-changing fields.** Quarterly refresh. Population statistics, business categories, attribute classifications, neighborhood demographics. The data updates seasonally or annually; the refresh cycle aligns.

**Static fields.** No refresh required. Geographic coordinates, founding years, fixed attributes. Set at record creation; tracked in the schema's update-tag system.

**Mixed-cadence pages.** Most pSEO pages are mixed: some volatile fields, some slow-changing, some static. The refresh pipeline updates each field on its own cadence; the page renders the latest data on each request (or rebuilds when fields change).

**The "refresh cadence wasn't designed in" failure.** A program ships with annual refresh as the plan. Six months in, the volatile fields are stale (prices moved, listings expired). The fix is expensive: retrofit a daily pipeline for fields that should have had one from launch.

---

## Template version migration

When the template improves, all existing pages need migration.

**Why templates ship revisions.** AEO patterns evolve, SERP intent shifts, schema requirements update, brand voice tightens. Templates from 18 months ago may need significant updates to compete in the current search and AI environment.

**Cohort-by-cohort migration.** Migrate one cohort at a time, monitor, then migrate the next. The cohort might be a category, a generation period, a data-density tier. The cohort approach surfaces problems specific to particular page shapes before they spread across the entire set.

**Big-bang migration.** Migrate all pages at once. Higher risk; if the new template has a regression, the entire set degrades simultaneously. Sometimes the right call when the migration is small or the team can roll back fast; usually the wrong call for large changes.

**Migration monitoring.** Each cohort post-migration is monitored for 30 days minimum: ranking changes, citation count changes, click-through rate changes, engagement metric changes. Negative trends pause the migration and surface the regression before it propagates.

**Rollback discipline.** The template migration ships with a rollback path. If a cohort's metrics degrade post-migration, the cohort rolls back to the previous template while the regression is investigated. Without rollback discipline, a bad migration produces permanent damage.

---

## Cohort migration patterns

Three common patterns.

**Category-based cohort migration.** Migrate one parent category at a time. Real estate: migrate Denver pages first, monitor 30 days, then migrate Seattle. The advantage: category-level metrics are clean; investigation is scoped.

**Generation-period cohort migration.** Migrate the oldest cohort first (pages generated in year 1), then the next, then the next. The advantage: oldest pages have the most accumulated decay; migrating them first improves the set's average quality fastest.

**Data-density cohort migration.** Migrate the dense-data pages first (most fields populated), then the medium, then the sparse. The advantage: dense pages have the most upside from template improvements; sparse pages may need data backfill before template migration earns gains.

The right pattern depends on the migration's intent. AEO-focused migrations often prefer dense-data first. Algorithm-update recovery migrations often prefer category-based. Maintenance migrations often prefer generation-period.

---

## Pruning lifecycle

Pages generated 2+ years ago that have not earned traffic should be evaluated for noindex or removal.

**The 24-month checkpoint.** Standard cutoff. A page that has been indexed for 24+ months and has earned zero impressions in Search Console is dead weight. Pruning options: noindex, 410, or 301 redirect to a more-relevant alternative.

**Earlier pruning for some categories.** Time-sensitive pages (annual "best of [year]" pages, event-specific pages, deal-specific pages) prune earlier. A "best of 2024" page generated in 2024 should be archived or pruned by mid-2026; the freshness signal has decayed.

**Later pruning for stable categories.** Some categories support evergreen pages that earn traffic for decades. Geographic pages (neighborhoods, cities), historical reference pages, foundational definitional pages. The 24-month checkpoint is too aggressive for these; review case-by-case.

**Pruning is hygiene, not failure.** Pruning a page that did not earn traffic is not abandoning the program; it is removing dead weight that drags the set's quality signal down. The set is healthier with 40,000 traffic-earning pages than with the same 40,000 plus 60,000 dead pages.

---

## Set-level refresh

Occasionally the entire set's template needs a refresh.

**Triggers for set-level refresh.**

- AEO patterns shifted significantly (the entire set needs better above-the-fold answers, FAQPage schema, or source citations)
- The dataset's underlying source changed schema (the new data exposes fields the old template did not render)
- User expectations evolved (the category's accepted page shape shifted; the set's pages now read as dated)
- An algorithm update affected the set disproportionately (the set's design needs to adapt to the new ranking signals)

**Set-level refresh is a 6-month project.** Plan accordingly. The work includes template redesign, cohort-by-cohort migration, post-migration monitoring, and pruning of pages that the new template cannot improve. Underestimating the duration is the most common mistake.

**The "do not refresh and let the set decay" anti-pattern.** Some teams treat the initial pSEO build as ship-and-forget. The set ranks for 12 to 18 months, then declines as competitors with refreshed sets pass it. The decline accelerates when an algorithm update finds the set's accumulated drift. Refresh is part of the program's ongoing cost; teams that do not budget for it should not start the program.

---

## Refresh budget

The ongoing refresh cost in headcount.

**Volatile-field refresh.** Mostly automated (data pipelines pull new data into the schema). 0.1 to 0.5 FTE for pipeline maintenance and exception handling.

**Slow-changing-field refresh.** Quarterly cycles. 0.2 to 0.5 FTE during cycles; lower between cycles.

**Template version migration.** Project-based when migrations ship. 1 to 3 FTE for the duration of the migration; varies by set size and migration scope.

**Pruning lifecycle.** Quarterly review of dead pages. 0.1 to 0.3 FTE.

**Total ongoing refresh budget.** A 10,000-page set: roughly 0.5 FTE steady state plus migration projects when they ship. A 100,000-page set: 1 to 2 FTE steady state plus larger migration projects.

The refresh budget is in addition to the QC budget. Programs that under-budget either degrade; programs that budget both produce durable traffic for years.
