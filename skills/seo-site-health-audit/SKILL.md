---
name: seo-site-health-audit
description: "Triage technical SEO findings from Ahrefs Site Audit (and similar crawlers) by SEO impact, not just severity. Use this skill when reviewing crawl results, prioritizing technical fixes, scoping a technical SEO sprint, or after running any site-wide crawl. Triggers on site audit results, technical fix list, crawl errors, technical SEO triage, prioritize technical issues, what should we fix first, broken links, redirect chains. Also triggers when a long list of crawler issues is creating decision paralysis."
---

# SEO Site Health Audit

Triage technical SEO findings from Ahrefs Site Audit (or any equivalent crawler) by impact on rankings and traffic, not by raw issue count or severity label. Stack-agnostic. Produces a prioritized backlog of fixes mapped to business impact.

---

## When to use

- After running an Ahrefs Site Audit or other site-wide crawl
- Reviewing a long list of technical issues and needing to prioritize
- Scoping a technical SEO sprint
- Pre-launch or post-migration technical verification
- Quarterly technical health check
- When developer time is limited and you must pick the highest-leverage fixes

## When NOT to use

- Running the crawl itself (use the crawler tool directly)
- Diagnosing specific traffic drops (use `seo-traffic-diagnosis`)
- Single-page audits (use `seo-onpage`)
- Pure technical strategy or schema design (use `seo-technical`)

---

## Required inputs

- Crawl results from Ahrefs Site Audit (or equivalent)
- Search Console coverage and Core Web Vitals data
- Property's organic traffic profile (which pages drive traffic)
- Stakeholder time and developer capacity available
- Confirmation Ahrefs MCP is connected

---

## The framework: triage by SEO impact, not severity

Crawlers label issues "critical", "warning", "notice". These labels are useful but not sufficient. Two issues both labeled "critical" can have wildly different actual impact on the property.

Triage on three axes.

### Axis 1: Page-level traffic impact

Does the issue affect a page that drives meaningful organic traffic, or one that does not?

A "critical" issue on a tag archive with zero traffic is lower priority than a "warning" on a top-10-traffic landing page.

Tier the affected URLs:

- **Tier 1:** Top 10% of pages by organic traffic
- **Tier 2:** Pages that rank but do not yet drive significant traffic (page 2-3 results)
- **Tier 3:** Pages that exist but do not rank meaningfully

A fix on Tier 1 is worth 10x a fix on Tier 3 in most cases.

### Axis 2: Mechanism of impact

Does the issue actually move rankings or traffic? Some "critical" issues are aesthetic or theoretical.

Categories of real impact:

| Mechanism | Examples |
| --- | --- |
| Indexability | Accidental noindex, robots.txt blocks, canonical errors, X-Robots-Tag |
| Crawlability | Crawl traps, infinite redirects, 5xx errors, slow server response |
| Renderability | JS errors blocking critical content, blocked resources |
| Core Web Vitals | LCP, INP, CLS in the poor band |
| Structured data | Errors on rich-result-eligible pages (not warnings) |
| Internal link integrity | 404s on internally linked URLs, broken canonicals |
| Hreflang | Errors on multilingual deployments |

Categories of low or theoretical impact:

| Type | Why it is lower priority |
| --- | --- |
| Title tag length warnings | Not a ranking factor in itself |
| Meta description length | Not a ranking factor |
| H1 absence on low-traffic pages | Marginal impact |
| Alt text missing on decorative images | Accessibility issue, low SEO impact |
| Schema warnings (not errors) | Often best-practice nudges, not ranking issues |

Fix the high-mechanism categories first.

### Axis 3: Effort

Some issues are 5-minute fixes. Some are multi-sprint projects.

- **S (small):** Configuration change, single template edit, sitemap regeneration
- **M (medium):** Theme or component change, redirect map work, template-level fixes
- **L (large):** Architecture change, re-platform, framework migration, schema overhaul

---

## The triage matrix

Combine the three axes into a priority score.

| Tier | Mechanism | Effort | Priority |
| --- | --- | --- | --- |
| Tier 1 | High mechanism | S | P0 (do this week) |
| Tier 1 | High mechanism | M | P1 (do this sprint) |
| Tier 1 | High mechanism | L | P2 (plan as project) |
| Tier 1 | Low mechanism | S | P3 (batch when convenient) |
| Tier 1 | Low mechanism | M-L | Park unless evidence emerges |
| Tier 2 | High mechanism | S | P1 |
| Tier 2 | High mechanism | M-L | P2 |
| Tier 3 | High mechanism | S | P3 |
| Tier 3 | Anything else | Anything | Park |

P0-P1 work earns the team's attention. P2 goes on the roadmap. P3 batches into routine maintenance. Park is honest about deprioritization.

---

## Workflow

1. **Pull the crawl results.** Ahrefs Site Audit + Search Console + Core Web Vitals.
2. **Tier the URLs.** Use organic traffic data. Tag every affected URL as Tier 1, 2, or 3.
3. **Categorize each issue by mechanism.** High or low impact mechanism.
4. **Estimate effort per fix type.** Group similar fixes into one effort estimate.
5. **Apply the triage matrix.** Assign P0-P3 or Park.
6. **Cluster the fixes.** Group fixes that share an effort: one template change can resolve hundreds of issues.
7. **Build the backlog.** P0 first, P1 next, etc. Add fix descriptions, owners, expected impact.
8. **Add measurement.** What metric will confirm the fix worked? Define before shipping.
9. **Hand off.** Output feeds the development backlog and `seo-audit-orchestration`.
10. **Re-crawl after fixes.** Confirm resolution. Update the backlog.

---

## High-leverage clusters worth looking for

These patterns commonly produce outsized impact when fixed:

- **Wholesale redirect chain cleanup.** One sitemap update plus internal link updates can resolve thousands of "redirect chain" issues at once.
- **Accidental noindex on a template.** A single line of code change can re-index hundreds or thousands of pages.
- **Sitemap freshness pipeline.** A broken sitemap regeneration job affects every issue that depends on Search Console seeing the right URLs.
- **Canonical inconsistencies on faceted navigation.** A template-level canonical fix can resolve duplicate content issues across an entire ecommerce category tree.
- **Robots.txt restored.** A reverted production robots.txt can recover a sitewide drop in days.
- **Hreflang block fix.** One template change resolves hreflang issues across the whole multilingual site.
- **Image optimization at the asset pipeline.** Fixing the build process resolves thousands of individual asset issues.

When you spot one of these, prioritize even if individual issues look small. The cluster impact is large.

---

## Failure patterns

- **Severity worship.** Treating every "critical" label as truly critical. Many are not. Triage by mechanism and traffic impact.
- **Counting issues.** Reporting "we fixed 1,200 issues" without showing traffic or ranking impact wastes engineering credibility.
- **Skipping the tiering.** Fixing 100 Tier-3 issues before 5 Tier-1 issues is busy work.
- **Single-issue fixes.** Most issues come in clusters. Fixing one redirect chain when 800 share the same root cause is the wrong unit of work.
- **No re-crawl.** "Fixed" without verification leaves doubt. Always re-crawl after major fixes.
- **Ignoring Search Console.** Ahrefs sees what its crawler finds. Search Console reflects what Google actually sees and indexes. Use both.
- **Treating Core Web Vitals like a checklist.** CWV is field data, not lab data. Optimize for real-user experience, not synthetic scores.
- **Fixing low-mechanism issues for show.** A clean technical report with no traffic gain helps no one.
- **Not measuring.** Define the metric that proves the fix worked before fixing.

---

## Output format

A site health triage document with:

1. **Summary.** Total issues, top 3 fix clusters, expected impact.
2. **URL tiering.** How URLs were classified and counts per tier.
3. **Issue categorization.** Counts by mechanism category, by tier, by priority band.
4. **Prioritized backlog.** P0-P3 ordered. Each item has: issue, affected URLs, fix description, effort, expected impact, owner.
5. **Fix clusters.** Groups of issues that share a fix. Highest leverage at the top.
6. **Measurement plan.** Per fix or cluster, what proves it worked.
7. **Methodology.** Crawler used, date, scope, caveats.

Length: 5-12 pages plus a backlog spreadsheet.

---

## Reference files

- `references/issue-impact-table.md` - Mapping table of common crawler issues to mechanism impact and typical fix effort, plus the triage matrix in detailed form.
