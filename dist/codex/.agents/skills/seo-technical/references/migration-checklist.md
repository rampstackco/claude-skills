# Migration Checklist

A site migration (domain change, platform change, URL restructure, HTTPS move) is the single highest-risk SEO event. Follow this checklist to avoid the typical 30 to 70 percent traffic loss most migrations cause.

---

## Pre-migration (T minus 30 days)

### Document the current state
- [ ] Crawl the entire current site, save URL list
- [ ] Export top 1000 organic landing pages from search console (last 12 months)
- [ ] Export top 1000 organic queries from search console
- [ ] Note current rankings for the top 50 commercial queries
- [ ] Save current XML sitemap
- [ ] Save current robots.txt
- [ ] Document current schema implementation
- [ ] Screenshot current SERP appearance for top 10 queries

### Plan the new structure
- [ ] Map every old URL to its new URL (redirect map)
- [ ] Confirm every important URL has a destination (no orphan redirects)
- [ ] Decide on canonical URL structure (trailing slash, www vs non-www, http to https)
- [ ] Plan handling of parameter URLs (UTM, sort, filter)
- [ ] Plan handling of pagination
- [ ] Plan internal linking structure (avoid relying on redirects)

### Build and stage
- [ ] Set staging environment to `noindex`
- [ ] Block staging from search engines via robots.txt and HTTP auth
- [ ] Build redirect logic for the redirect map
- [ ] Implement the new sitemap
- [ ] Implement schema on all page types
- [ ] Verify Core Web Vitals on staging
- [ ] Test mobile usability on staging
- [ ] Test HTTPS configuration (HSTS, no mixed content)

---

## Migration day

### Just before cutover
- [ ] Final crawl of the production site (baseline for comparison)
- [ ] Final export of indexed URL list from search console
- [ ] Confirm DNS TTLs lowered if changing hosts (24 to 48 hours prior)
- [ ] Backup the current site fully
- [ ] Communicate the migration window to stakeholders

### During cutover
- [ ] Deploy the new site
- [ ] Confirm 301 redirects firing for old URLs (test 20 random samples)
- [ ] Remove `noindex` from new site
- [ ] Update robots.txt on new site (allow crawling)
- [ ] Submit new sitemap in search console
- [ ] Submit change of address (if domain changed)
- [ ] Update canonical references on the new site

### Within 24 hours of cutover
- [ ] Crawl the new site, compare to baseline
- [ ] Spot-check 50 redirected URLs end-to-end
- [ ] Verify search console shows the new sitemap as processed
- [ ] Check for unexpected 4xx or 5xx errors in server logs
- [ ] Submit top 20 priority URLs for re-indexing

---

## Post-migration (T plus 1 to 30 days)

### Week 1
- [ ] Daily check on indexed page count in search console
- [ ] Daily check on crawl errors
- [ ] Daily check on average position for top 50 queries
- [ ] Verify no traffic anomalies in analytics
- [ ] Fix any redirect loops or chains identified in logs

### Week 2 to 4
- [ ] Verify all old URLs redirecting to new URLs (full crawl)
- [ ] Verify no redirect chains (max one hop)
- [ ] Verify schema validates on key page types
- [ ] Check Core Web Vitals trend (any regressions vs pre-migration)
- [ ] Update external backlinks where feasible (highest-value links first)
- [ ] Check social media platforms display new URLs correctly

### Month 2
- [ ] Compare organic traffic to pre-migration baseline
- [ ] Compare keyword rankings to pre-migration baseline
- [ ] Note any pages that lost rankings, investigate
- [ ] Begin pruning redirect rules for URLs that no longer receive traffic (after 90 days minimum)

---

## Common migration failures (and how to prevent each)

| Failure | Prevention |
|---|---|
| Old URLs returning 404 | Comprehensive redirect map, tested before cutover |
| Redirect chains (2+ hops) | Direct redirect old → new, never old → middle → new |
| Lost rankings on key pages | Same content, same intent, same internal linking on new pages |
| Crawl waste from old parameters | Clean URL structure, parameter handling rules |
| Mixed HTTPS and HTTP content | Audit all asset URLs, force HTTPS via HSTS |
| Search console disconnect | Verify both old and new properties, submit change of address |
| Sitemap mismatch | New sitemap lists new canonical URLs only, no legacy URLs |
| Hreflang breaks (international sites) | Map hreflang to new URLs, preserve language pair relationships |

---

## Recovery if traffic drops

If organic traffic drops more than 20 percent within 14 days:

1. Verify all critical URLs return 200 or 301 (no 404 or 500)
2. Verify search console is processing the new sitemap
3. Spot-check top 50 lost-traffic URLs for content parity (does the new page actually answer the same query?)
4. Check robots.txt and meta robots for accidental noindex
5. Check for hreflang errors if international
6. Submit affected URLs for re-indexing manually
7. Audit internal linking - are key pages still well-linked?

Most migration drops recover within 60 to 90 days IF the redirect map is complete and the content is preserved. If not recovering by day 90, the issue is structural and needs deeper investigation.
