# Issue impact table

A reference table mapping common crawler-reported issues to their actual SEO impact mechanism and typical fix effort. Use it to triage Ahrefs Site Audit (or any equivalent) findings without treating every "critical" label as equally important.

---

## How to use

For each issue type from the crawler:

1. Look up the mechanism and effort here.
2. Combine with URL tier (Tier 1 = top 10% by traffic) using the triage matrix.
3. Assign priority band P0-P3 or Park.

Mechanism tiers:

- **HIGH:** Direct effect on indexing, rankings, or Core Web Vitals.
- **MEDIUM:** Indirect effect via crawl, equity flow, or user signals.
- **LOW:** Best practice nudge or cosmetic. Real impact is usually marginal.

---

## Indexability issues

| Issue | Mechanism | Typical effort | Notes |
| --- | --- | --- | --- |
| Page returns noindex on indexed URL | HIGH | S | Template fix usually resolves at scale |
| Robots.txt blocks important URLs | HIGH | S | One file edit |
| X-Robots-Tag header set to noindex | HIGH | S-M | Often a CDN or hosting config |
| Canonical points to non-canonical URL | HIGH | M | Often template-level |
| Canonical points to redirect | HIGH | S | Update canonical to final URL |
| Self-canonical missing on important page | MEDIUM | S | Add to template |
| URL not in sitemap but indexed | MEDIUM | S | Regenerate sitemap |
| URL in sitemap but noindexed | HIGH | S | Decide indexability, fix one or the other |

---

## Crawlability issues

| Issue | Mechanism | Typical effort | Notes |
| --- | --- | --- | --- |
| 5xx errors on URLs | HIGH | M-L | Investigate hosting and app errors |
| 4xx errors on internally linked URLs | HIGH | M | Fix links or add redirects |
| Redirect chain (3+ hops) | MEDIUM | M | Update final destination in links |
| Redirect loop | HIGH | S | Fix immediately |
| Slow time to first byte | MEDIUM | M-L | Hosting, caching, or app changes |
| Crawl trap (infinite parameter combinations) | HIGH | M | Robots disallow patterns or canonical |
| Orphan page (indexed but no internal links) | MEDIUM | S-M | Add internal links or noindex |
| Excessive redirects in sitemap | MEDIUM | S | Update sitemap to final URLs |
| 301 used where 302 intended (or vice versa) | LOW-MEDIUM | S | Audit and fix per case |

---

## Renderability issues

| Issue | Mechanism | Typical effort | Notes |
| --- | --- | --- | --- |
| Critical content rendered only via JS (with crawler issues) | HIGH | L | Server render, prerender, or hybrid |
| Blocked CSS or JS resources | MEDIUM | S | Allow in robots.txt |
| Excessive client-side dependencies for above-fold content | MEDIUM | M-L | Code splitting and SSR |
| Render mismatch (HTML differs from rendered DOM in important ways) | HIGH | M-L | Investigate framework rendering |

---

## Core Web Vitals (field data)

| Issue | Mechanism | Typical effort | Notes |
| --- | --- | --- | --- |
| LCP > 4 seconds (poor band) on Tier 1 pages | HIGH | M-L | Image optimization, caching, render path |
| LCP 2.5-4 seconds (needs improvement) | MEDIUM | M | Lower priority but still worth fixing |
| INP > 500ms (poor band) | HIGH | M-L | JS optimization, hydration deferral |
| CLS > 0.25 (poor band) | HIGH | S-M | Reserve space for images, ads, embeds |
| CLS 0.1-0.25 | LOW-MEDIUM | S | Often quick wins |

CWV thresholds are based on the 75th percentile of real-user data per URL group.

---

## Structured data issues

| Issue | Mechanism | Typical effort | Notes |
| --- | --- | --- | --- |
| Schema error blocking rich result eligibility | HIGH | S-M | Fix the offending field |
| Schema warning (recommended field missing) | LOW | S | Optional improvement |
| Wrong schema type for content | MEDIUM | S | Replace with correct type |
| Schema markup but content does not match | HIGH | M | Either fix schema or fix content (Google penalizes mismatch) |
| Duplicate schema across multiple types | LOW-MEDIUM | S | Clean up duplicates |

Pages eligible for rich results (FAQ, How-to, Recipe, Product, etc.) deserve high priority. Schema on pages without rich result eligibility is lower priority.

---

## Internal link integrity

| Issue | Mechanism | Typical effort | Notes |
| --- | --- | --- | --- |
| Internal link to 404 | MEDIUM | S | Update or remove link |
| Internal link to redirect | LOW | S | Update to final URL when batching |
| Internal link with empty anchor | LOW | S | Add descriptive anchor |
| Page receiving zero internal links (orphan) | MEDIUM | S-M | Add links or reassess if page should exist |
| Important page with very few internal links | MEDIUM | S | Identify and add link points |
| Footer or sitewide internal link to broken URL | MEDIUM | S | High visibility, fix quickly |

---

## Hreflang (multilingual sites)

| Issue | Mechanism | Typical effort | Notes |
| --- | --- | --- | --- |
| Missing return tag (hreflang reciprocity) | HIGH | M | Template fix often resolves at scale |
| Hreflang points to redirected URL | MEDIUM | S | Update to final URL |
| Hreflang points to noindexed URL | HIGH | S | Decide indexability or remove hreflang |
| Hreflang language code malformed | HIGH | S | Use ISO 639-1 + ISO 3166-1 alpha-2 |
| Mixing x-default and specific tags incorrectly | MEDIUM | S | Audit pattern across site |

Multilingual sites with broken hreflang often see the wrong locale rank in the wrong market. Real ranking impact.

---

## On-page elements

| Issue | Mechanism | Typical effort | Notes |
| --- | --- | --- | --- |
| Missing title tag | MEDIUM | S | Add via template |
| Duplicate title tag across many pages | MEDIUM | S-M | Template fix or unique-by-default |
| Missing meta description | LOW | S | Affects CTR, not ranking |
| Duplicate meta descriptions | LOW | S | Affects CTR, not ranking |
| Missing H1 on Tier 1 page | MEDIUM | S | Add to template |
| Missing H1 on Tier 3 page | LOW | S | Park unless trivial to fix |
| Multiple H1s | LOW | S | Modern HTML allows; rarely a real issue |
| Title or H1 that does not match content topic | MEDIUM | S | Audit content and update |

---

## Image issues

| Issue | Mechanism | Typical effort | Notes |
| --- | --- | --- | --- |
| Missing alt text on content images | LOW (SEO), HIGH (accessibility) | S | Important for accessibility regardless |
| Missing alt text on decorative images | LOW | S | Use empty alt="" |
| Image weight (large file size) on Tier 1 page | HIGH | M | Asset pipeline fix at scale |
| Image format not modern (no WebP/AVIF) | MEDIUM | M | Pipeline change |
| Image lazy loading missing | MEDIUM | S | Add `loading="lazy"` to off-screen images |
| Hero image lazy loaded | MEDIUM | S | Should be `loading="eager"` for LCP |

---

## Security and trust

| Issue | Mechanism | Typical effort | Notes |
| --- | --- | --- | --- |
| Mixed content (HTTPS page loading HTTP resources) | MEDIUM | S | Update resource URLs |
| Expired or misconfigured SSL | HIGH | S | Fix immediately |
| HSTS missing | LOW | S | Best practice |
| Internal links use HTTP, page is HTTPS | LOW | S | Update links to relative or HTTPS |

---

## Cluster opportunities

When you see multiple issues from the same root cause, treat as one fix:

| Cluster signal | Single fix |
| --- | --- |
| Hundreds of "redirect chain" warnings | Update internal links and sitemap to final URLs |
| Sitewide "missing canonical" | Add canonical to base template |
| Mass "noindex on indexable URL" | Audit template-level meta tag |
| Many "page not in sitemap" | Regenerate sitemap from canonical URL list |
| Many slow LCP pages with same image pattern | Optimize image pipeline once |
| Many hreflang errors with same pattern | Template-level hreflang fix |
| Many H1 issues on archive pages | Theme or template change |

Always look for clusters before fixing one-off. Cluster fixes are 10-100x more efficient.

---

## Park or skip

These rarely deserve dedicated work even when flagged:

- Title tag length warnings (within reason; only fix if truncation visibly hurts CTR on a Tier 1 page)
- Meta description length warnings (same logic)
- "URL contains uppercase" if redirects already handle it
- "URL contains underscore" if URLs are stable and ranking
- Trailing slash inconsistency if redirects handle it
- Schema warnings (not errors) on pages with no rich result eligibility
- HTML validation issues that do not affect rendering or indexing
- Old browser-specific issues (IE-era)

Park them. Document why. Move on.
