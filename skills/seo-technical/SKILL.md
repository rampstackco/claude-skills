---
name: seo-technical
description: "Run a comprehensive technical SEO audit covering crawlability, indexability, rendering, site architecture, structured data, page experience, security, and internationalization. Use this skill whenever the user asks about technical SEO, crawl issues, indexing problems, sitemaps, robots.txt, canonical tags, schema markup, page speed, Core Web Vitals, hreflang, redirects, or site-wide search performance. Triggers on technical SEO, site audit, crawlability, indexability, sitemap, robots.txt, canonical, redirect chain, schema, JSON-LD, Core Web Vitals, page speed, hreflang, mobile usability, HTTPS, security headers, render-blocking, JavaScript SEO. Also triggers when a site has indexing problems, traffic drops, or migration concerns, even if 'technical SEO' is not said explicitly."
---

# Technical SEO

Audit and fix the layer beneath the content: how search engines crawl, render, index, and trust a site. Stack-agnostic.

---

## When to use

- Site-wide audit before or after a migration
- Investigating indexing or ranking drops
- Setting up SEO foundations on a new site
- Auditing Core Web Vitals or page experience signals
- Fixing crawl waste, redirect chains, or canonical issues
- Setting up multilingual or multi-regional sites

## When NOT to use

- Single-page on-page optimization (use `seo-onpage`)
- Keyword strategy or content planning (use `seo-keyword`)
- Competitor backlink or SERP analysis (use `seo-competitor`)
- Pure performance optimization without SEO context (use `performance-optimization`)

---

## Required inputs

- The site URL or staging URL
- Access to (at minimum) view the rendered HTML, robots.txt, and sitemap
- Ideally: search console access, server logs, and a crawler

If the site is large (10K+ URLs), confirm whether the audit is a full crawl or a sample.

---

## The framework: 6 layers

Technical SEO has six layers, stacked. A failure in a lower layer breaks everything above it.

### 1. Crawlability
Can search engines access the URLs?

- robots.txt does not block important paths
- No accidental `noindex` on indexable pages
- No accidental `disallow` patterns blocking CSS or JS (rendering breaks)
- Sitemap is present, returns 200, and lists canonical URLs only
- Sitemap is referenced in robots.txt
- No infinite spaces (faceted nav generating endless URLs)
- Crawl budget is not wasted on low-value URLs

### 2. Indexability
Of crawlable URLs, which should be indexed?

- One canonical URL per piece of content (no duplicates)
- Canonical tags self-reference on canonical pages
- `noindex` on staging, search results, filter pages, thank-you pages, internal admin
- No mixed signals (canonical pointing one way, sitemap another, internal links a third)
- Pagination handled correctly (rel=next/prev is deprecated, but consistent canonicals matter)
- Parameter handling deliberate (UTM, session IDs, sort orders)

### 3. Rendering
Does the rendered HTML match what crawlers see?

- Critical content visible without JavaScript (or properly server-rendered)
- For SPAs: confirm Googlebot sees the rendered content (test with the URL Inspection tool)
- No cloaking (showing different content to bots vs users)
- Lazy-loaded content has proper loading attributes
- Hydration errors do not strip content from the rendered DOM

### 4. Site architecture
Is the site structured for both users and crawlers?

- Clear URL hierarchy that mirrors site structure
- Important pages reachable in 3 clicks or fewer from the homepage
- Internal linking distributes authority logically
- Breadcrumb navigation present and marked up with schema
- No orphan pages (pages with no internal links)
- No redirect chains (one redirect max)
- No 4xx errors on internally-linked URLs

### 5. Structured data and signals
Does the site speak crawler language?

- Schema.org markup on appropriate page types
- JSON-LD format (preferred over microdata)
- Validates in the Rich Results Test
- Organization or LocalBusiness schema on the homepage or about page
- BreadcrumbList schema on nested pages
- Author and publisher schema linked correctly on content pages
- llms.txt present at the root (for AI crawlers, see `seo-aeo-geo`)

### 6. Page experience and security
Does the site meet the page experience baseline?

- HTTPS on all pages, no mixed content
- HSTS header set
- Core Web Vitals pass (LCP, INP, CLS within thresholds)
- Mobile-friendly (responsive, no horizontal scroll, tap targets sized correctly)
- No intrusive interstitials on mobile
- Stable URL structure (no random URL changes between deploys)
- 404 pages return 404, not 200 with "page not found" content (soft 404)

---

## Workflow

1. **Define scope.** Whole site, a subfolder, a migration check, or a specific issue.
2. **Confirm access.** What can you actually see (HTML, robots, sitemap, search console, server logs, staging)?
3. **Crawl.** Use a crawler to enumerate URLs and statuses. Sample if the site is huge.
4. **Run the 6-layer framework.** Score each, note specific issues with example URLs.
5. **Cross-reference.** Search console for what's actually indexed. Compare to sitemap and crawl output.
6. **Prioritize.** Critical (blocks indexing or causes traffic loss), Important (suboptimal), Nice-to-have (polish).
7. **Write the report.** Use the template in `references/audit-template.md`.

---

## Failure patterns

- **Optimizing rankings on a page that is `noindex`.** Always check indexability before content work.
- **Adding sitemaps without fixing canonical issues.** A sitemap of duplicate URLs is worse than no sitemap.
- **Blocking crawlers from CSS or JS.** Breaks Google's rendering. Common in over-aggressive robots.txt files.
- **Over-relying on canonical tags.** Canonicals are hints, not directives. Use redirects when content actually moved.
- **Migrating without a redirect map.** Single biggest cause of post-migration traffic loss.
- **Treating Core Web Vitals as the only ranking signal.** Page experience matters but does not override relevance.

---

## Output format

Default output is a markdown audit at `seo-technical-audit.md`. Structure:

1. Scope and methodology
2. Executive summary (3 to 5 critical findings)
3. 6-layer score
4. Critical issues (with example URLs)
5. Important issues
6. Nice-to-have polish
7. Implementation roadmap (sequenced)

For migrations, include a redirect map as a CSV alongside the report.

---

## Reference files

- `references/audit-template.md` - Fillable technical SEO audit template.
- `references/migration-checklist.md` - Pre and post-migration checklist (covers the highest-risk scenario).
