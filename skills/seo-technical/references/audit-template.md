# Technical SEO Audit Template

Fillable template for a technical SEO audit. The audit covers crawlability, indexability, rendering, schema, page experience, and site architecture.

The output is a stakeholder-readable report plus a prioritized backlog. For migration scenarios specifically, also use `migration-checklist.md`.

---

## Audit metadata

**Site:** [Domain]
**Pages audited:** [Sample size and selection method]
**Audit date:** [YYYY-MM-DD]
**Auditor:** [Name]
**Tools used:** [Crawler, GSC, log analyzer, Lighthouse, schema validator, etc.]

---

## Executive summary

Three to five sentences. Anyone reading only this section should know:

1. The overall technical state.
2. The single biggest blocker.
3. The estimated traffic at risk if technical issues persist.
4. The recommended next move.
5. Estimated effort for the top fix.

> [Summary]

---

## 1. Crawlability

Can search engines crawl the site?

### Robots.txt

- [ ] File exists at `/robots.txt`
- [ ] File is syntactically valid (test in GSC)
- [ ] Critical sections of the site are not accidentally disallowed
- [ ] Specific user agents are not blocked (`Googlebot`, `Bingbot`)
- [ ] Sitemap location is declared (`Sitemap: https://example.com/sitemap.xml`)

### XML sitemap(s)

- [ ] Sitemap exists and is reachable
- [ ] Sitemap is referenced in robots.txt
- [ ] Sitemap is submitted in Search Console
- [ ] Sitemap contains only canonical, indexable URLs
- [ ] Sitemap is updated automatically when content changes
- [ ] Sitemap is split if over 50,000 URLs or 50MB
- [ ] `lastmod` reflects the actual last meaningful update (not the build date)

### Internal linking

- [ ] No important pages are orphaned (zero internal inlinks)
- [ ] Crawl-discoverable from the homepage within 4 clicks
- [ ] No internal links go to redirected URLs
- [ ] No internal links go to broken URLs (404)
- [ ] Anchor text is descriptive (avoid "click here," "read more")
- [ ] No `nofollow` or `noindex` on important internal pages

### Crawl budget

- [ ] Log analysis confirms Googlebot reaches the important sections regularly
- [ ] No crawl traps (calendar pages, infinite faceted nav, session ID parameters)
- [ ] Faceted nav uses `noindex,follow` or controlled parameter handling
- [ ] No duplicate URLs from URL parameter variations (UTMs, tracking, sort orders)
- [ ] Pagination handled with `rel="next"` and `rel="prev"` or paginated URL structure (no infinite scroll for important content)

---

## 2. Indexability

Can search engines index the site?

### Index status

- [ ] GSC "Indexed" count matches expected (production URL count)
- [ ] GSC "Not indexed" reasons are reviewed and addressed
- [ ] "Discovered - currently not indexed" pages are not high-value (or are addressed)
- [ ] "Crawled - currently not indexed" pages are not high-value (or are addressed)

### Index directives

- [ ] No `<meta name="robots" content="noindex">` on important pages
- [ ] No `X-Robots-Tag: noindex` HTTP header on important pages
- [ ] Staging or dev environments are noindexed (and not bypassable)
- [ ] Login pages, internal search results, and tag archives are noindex (or otherwise low-priority)

### Canonicalization

- [ ] Every page has a `rel="canonical"` tag
- [ ] Self-canonical URLs match the actual URL (no http/https mismatch, no trailing slash mismatch)
- [ ] Cross-canonical references point to indexable, live URLs
- [ ] Pagination uses self-canonicals (not pointing to page 1)
- [ ] No conflicting signals (canonical to URL A, redirect to URL B)

### Status codes

- [ ] 200 for live pages
- [ ] 301 for permanently moved pages
- [ ] 302 used only for genuinely temporary redirects
- [ ] 404 for genuinely missing pages (with helpful 404 page)
- [ ] 410 for intentionally removed pages
- [ ] 5xx errors investigated and resolved

### Redirect chains

- [ ] No redirect chains over 1 hop (A → B is fine; A → B → C → D is not)
- [ ] No redirect loops
- [ ] HTTPS redirect from HTTP is single-hop
- [ ] Trailing-slash redirect is single-hop

---

## 3. Rendering

Can search engines render JavaScript-dependent content?

### Rendering strategy

- [ ] Critical content is in the initial HTML response (server-rendered or static)
- [ ] If JS-rendered, "fetch as Google" via URL Inspection in GSC shows full content
- [ ] No reliance on user interaction to load primary content (no "click to load article")

### Specific rendering risks

- [ ] No JS-rendered title tags or meta descriptions (these often fail to be picked up)
- [ ] No JS-injected canonical tags
- [ ] Lazy-loaded images use native `loading="lazy"` or proper IntersectionObserver implementation
- [ ] Lazy-loaded content above the fold is not lazy-loaded
- [ ] CSS is not blocking critical content rendering

### JavaScript SEO sanity check

- [ ] Disable JS in DevTools and reload key pages. Critical content should still appear.
- [ ] Use the URL Inspection tool in GSC and view the rendered HTML. Compare to user-rendered version.

---

## 4. Schema and structured data

- [ ] Pages have appropriate schema (Article, Product, Organization, BreadcrumbList, FAQ, HowTo, Recipe, etc.)
- [ ] Schema validates in Google's Rich Results Test
- [ ] Schema validates in Schema.org validator
- [ ] No schema violations in GSC enhancement reports
- [ ] BreadcrumbList schema implemented (often-overlooked CTR boost)
- [ ] Organization schema on the homepage
- [ ] WebSite schema with SearchAction (enables sitelinks search box)
- [ ] No schema for content not visible on the page

---

## 5. Page experience

### Core Web Vitals

Field data preferred (CrUX, RUM). Lab data is a fallback diagnostic.

| Metric | Target | Mobile p75 | Desktop p75 | Status |
|---|---|---|---|---|
| LCP | < 2.5s | | | |
| INP | < 200ms | | | |
| CLS | < 0.1 | | | |

For detailed performance audit, see `performance-optimization` skill.

### HTTPS

- [ ] Entire site served over HTTPS
- [ ] No mixed content warnings
- [ ] HSTS header set
- [ ] Certificate valid and not approaching expiry

### Mobile

- [ ] Responsive (single URL, single HTML, CSS adapts)
- [ ] Mobile usability passes in GSC
- [ ] No tap targets too close together
- [ ] Viewport meta tag set

### Safe browsing

- [ ] No security warnings in GSC
- [ ] No malware or phishing flags

---

## 6. International SEO

If the site is multilingual or multi-region:

- [ ] `hreflang` tags present and correct on every locale alternate
- [ ] `hreflang` includes self-reference
- [ ] `x-default` set for language picker fallback
- [ ] Language and region codes follow ISO standards
- [ ] No hreflang errors in GSC International Targeting report
- [ ] URL structure follows a consistent pattern (subdir / subdomain / ccTLD)

---

## 7. Site architecture and URLs

### URL hygiene

- [ ] URLs are lowercase
- [ ] URLs use hyphens, not underscores or spaces
- [ ] URLs are short and descriptive
- [ ] No session IDs or tracking parameters in canonical URLs
- [ ] URL structure reflects content hierarchy (category → subcategory → page)

### Trailing slash

- [ ] Consistent trailing slash policy (with or without)
- [ ] One version redirects to the other (no duplicates)

### Subdomains vs subdirectories

- [ ] Strategic decision documented (subdir typically pools authority better; subdomain better for separate sites)
- [ ] `www` and non-`www` consolidated via 301

---

## 8. Search Console hygiene

- [ ] Both `https://www` and `https://` (and `http://` versions) verified as separate properties
- [ ] Domain property verified (the recommended approach)
- [ ] Sitemap submitted and showing "Success"
- [ ] No critical issues in Coverage report
- [ ] No manual actions or security issues
- [ ] Crawl stats reviewed (sudden drops or spikes investigated)

---

## 9. Log file analysis (advanced)

For larger sites, server logs reveal what crawlers actually do, vs what the site allows.

- [ ] Top crawled pages match top-priority pages
- [ ] Googlebot does not waste crawl on noindex / parameter / faceted URLs
- [ ] No orphaned pages getting crawler traffic
- [ ] No 5xx errors served to Googlebot

---

## Findings summary

| Severity | Issue | Pages affected | Recommended fix | Effort |
|---|---|---|---|---|
| P0 (blocking) | | | | |
| P1 (high) | | | | |
| P2 (medium) | | | | |
| P3 (low) | | | | |

### Severity definitions

- **P0:** Critical content cannot be crawled or indexed; major technical errors causing exclusion from search.
- **P1:** Significant indexability or rendering issues affecting traffic; broken canonicals; large redirect chains.
- **P2:** Suboptimal but not blocking; missing schema, suboptimal sitemap, partial CWV failures.
- **P3:** Polish; minor inefficiencies, documentation gaps.

---

## Recommendations

### Now (this week)

| # | Recommendation | Owner | Estimated impact | Effort |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |

### Next (this sprint or month)

| # | Recommendation | Owner | Estimated impact | Effort |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |

### Later (this quarter)

| # | Recommendation | Owner | Estimated impact | Effort |
|---|---|---|---|---|
| 1 | | | | |

---

## Monitoring after fixes ship

- [ ] GSC Coverage report rechecked weekly until stable
- [ ] Position tracking for top queries to confirm no regression
- [ ] Log analysis re-run 2-4 weeks after fixes ship
- [ ] CWV field data tracked for affected page templates
- [ ] Set alerts for: 5xx errors, sudden index drops, certificate expiry

---

## Open questions

- [ ] [Question]
- [ ] [Question]

---

## Appendix: methodology

- **Crawl tool config:** [tool, depth, render mode, user agent]
- **Sample selection:** [How URLs were selected for deep review]
- **Field data window:** [Date range]
- **Caveats:** [What this audit did not cover]

---

## Sign-off

Audit conducted by: [Name, date]
Reviewed with: [Stakeholders]
Implementation owner: [Name]
Re-audit scheduled: [Date]
