# When pSEO works decision

The five-criterion framework for deciding whether programmatic SEO is the right answer, with worked examples across business types.

The default answer is no. Most teams asking "should we do pSEO?" should hear "probably not." pSEO works only when all five criteria are met; failing any one is a hard signal to pursue editorial content or paid acquisition instead.

---

## The five criteria

### 1. Real underlying data

A genuine structured data source with depth. 10+ fields per record, ideally 20+. First-party data, licensed datasets, expert-curated content, or synthesized multi-source data. Not scraped Wikipedia plus AI rewrite.

**The test.** Could a competent reader extract genuine value from a single page in the set without reading any other page? If yes, the data is real. If no, the page is filler dressed as pSEO.

### 2. Long-tail query volume justifies the effort

The queries the program targets have meaningful aggregate volume. Individual queries can be small (10 to 100 monthly searches each) as long as the aggregate across the set is large.

**The test.** Pull the top 20 candidate queries from keyword research. Sum their volumes. If the aggregate is below 5,000 monthly searches, pSEO probably does not justify the build. If above 50,000, the volume case is strong.

**The illusion to watch for.** Long-tail keywords that look reasonable in keyword tools but are not actually searched by humans. Permutation keywords (every adjective times every noun) often have keyword-tool volume because the tools generate the data; the queries themselves are dead.

### 3. User intent is queryable

The user's question can be answered through structured data presented well. Not through narrative explanation, judgment, or analysis the data cannot supply.

**Queryable intent examples.** "Homes for sale in [neighborhood]" answered by listing data. "Software engineer salary at [company]" answered by salary data. "Restaurants near [landmark]" answered by location and rating data.

**Non-queryable intent examples.** "Should I buy a house in [neighborhood]" requires personal financial judgment. "Why is Y better than X" requires editorial argumentation. "How do I choose [thing]" requires guidance.

If the intent requires narrative, choose editorial. If the intent requires data presented well, choose pSEO.

### 4. Update cadence aligns with query volatility

Real estate listings update daily; the data feed updates daily; pSEO refresh aligns with the volatility. "Best [thing] for [year]" pages get stale annually; the refresh cadence is annual.

**The test.** Match the data's update frequency to the query's volatility. If the data is static (geographic features, founding dates) and the queries are stable, low maintenance. If the data shifts daily and the queries reward freshness, daily refresh.

**The trap.** Underestimating refresh effort at design time. A team designs for "annual refresh" because that feels reasonable, ships 50,000 pages, and discovers the refresh requires 2 FTE for 6 weeks every year. The cadence was real; the resourcing was not.

### 5. Quality control is operationally feasible

Headcount is budgeted to sample-audit the set, fix failures, and maintain quality. Not aspirationally; in actual hours allocated.

**The rule of thumb.** A 10,000-page set requires roughly 0.5 to 1.0 FTE of ongoing quality control. A 100,000-page set requires 2 to 4 FTE. If the budget cannot absorb the QC headcount, the program will degrade within 12 months of launch.

---

## Worked examples

### Example 1: real estate listings (yes)

A regional brokerage considering pSEO for "homes for sale in [neighborhood]" pages.

- Real underlying data: yes. MLS feeds with 30+ fields per listing.
- Long-tail volume: yes. Each neighborhood query has 50 to 500 monthly searches; aggregate across 200 neighborhoods is significant.
- Queryable intent: yes. Buyers want listings.
- Update cadence: data updates hourly; pSEO refresh aligns daily; manageable.
- QC feasible: yes; the brokerage already has data ops headcount.

Decision: yes. This is the canonical pSEO use case.

### Example 2: SaaS comparison pages (maybe)

A B2B SaaS considering "X vs Y" pages for every competitor combination.

- Real underlying data: judgment call. If the comparison data is licensed (G2 reviews, feature databases) or first-party (the team's actual evaluation), yes. If the data is "scraped competitor websites plus AI summary," no.
- Long-tail volume: yes for major competitors; thin for niche ones.
- Queryable intent: yes for "X vs Y," but readers often want narrative judgment ("which is better for my use case") that data alone cannot supply.
- Update cadence: feature databases drift; quarterly refresh required.
- QC feasible: depends on team size.

Decision: maybe, leaning yes if the team commits to combining structured comparison data with brief editorial analysis per page. Pure-data comparison pages tend to underperform pages that include the analytical layer.

### Example 3: AI-generated city guides (no)

A travel content site considering "things to do in [city]" pSEO across 5,000 cities.

- Real underlying data: no. The plan is "AI-generate the content from public sources." Anyone can replicate.
- Long-tail volume: yes for major cities; thin for small ones.
- Queryable intent: yes, but the queries reward editorial depth (curation, recommendations, taste).
- Update cadence: events change weekly; the AI-generated approach cannot match.
- QC feasible: no; "AI-generate 5,000 pages" is the plan because QC was not budgeted.

Decision: no. This is the pattern that produces penalty-bait. Either invest in real expert-curated data or pursue editorial content for the highest-volume cities only.

### Example 4: enterprise B2B pricing pages (no)

An enterprise B2B SaaS considering "pricing for [industry] companies" pSEO across 50 industries.

- Real underlying data: no. Pricing for enterprise SaaS is typically negotiated; there is no structured data feed to render.
- Long-tail volume: yes for some industries.
- Queryable intent: no. Buyers want a sales conversation, not a price table.
- Update cadence: not relevant.
- QC feasible: not relevant.

Decision: no. The intent is not queryable. Editorial content explaining the buying process plus a sales-led conversion path is the right approach, not pSEO.

---

## When two of five criteria fail, walk away

If two or more criteria fail, walk away from the pSEO idea. The temptation is to start anyway and "improve as you go," but pSEO programs that launch with weak foundations rarely recover. The data depth, the QC budget, and the refresh cadence are designed in or they are missing forever.

If exactly one criterion fails, see whether a smaller scope resolves the failure. "5,000 pages across all cities" failing on data depth might become "500 pages across major cities with expert-curated depth" that succeeds on all five criteria.
