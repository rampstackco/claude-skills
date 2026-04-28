# URL Pattern Library

Conventional URL patterns for common content types. Use as a starting point. Adapt for the specific site.

URL patterns matter because:
- Users see them in the address bar
- Search engines use them as a relevance signal
- They appear in shared links and citations
- Inconsistent patterns are a structural smell that creates downstream problems

---

## Universal principles

Apply to every URL on every site:

- **Lowercase.** `/about` not `/About`.
- **Hyphens, not underscores.** `/blog/getting-started` not `/blog/getting_started`.
- **No trailing slash** for non-folder URLs (or always with trailing slash; pick one and be consistent).
- **No file extensions.** `/about` not `/about.html` or `/about.php`.
- **No query strings in canonical URLs.** Filters and sorts can use query strings, but the canonical version is parameter-free.
- **Stable.** URLs do not change without a 301 redirect from the old URL.
- **Predictable.** Same content type uses the same URL pattern site-wide.

---

## Marketing site patterns

### Home

```
/
```

### Top-level pages

```
/about
/contact
/pricing
/careers
/blog
/help
```

Avoid generic catch-alls like `/info` or `/page`.

### Sub-pages within sections

```
/about/team
/about/values
/about/history
/careers/engineering
/careers/design
```

Two levels deep is the typical maximum for marketing site pages. Beyond that, structure usually breaks down.

### Marketing landing pages

```
/[campaign-slug]                  short, memorable, often used in print/ads
/lp/[campaign-slug]               namespaced under /lp for clarity
/[product]/[campaign]             nested under product if relevant
```

For high-traffic ad campaigns, a short root-level URL is fine. For evergreen marketing pages, namespace them.

---

## Blog and editorial patterns

### Blog index

```
/blog
```

### Blog posts

```
/blog/[slug]
```

The dominant pattern. Simple, scannable, no dates in the URL (so updates don't change the URL).

If dates are genuinely required (news sites, time-sensitive content):

```
/blog/[year]/[month]/[slug]
```

But avoid dates by default. They make URLs longer and stale-looking when content gets updated.

### Categories and tags

```
/blog/category/[category-slug]
/blog/tag/[tag-slug]
```

Or, if you prefer cleaner URLs:

```
/blog/[category-slug]/[post-slug]      embeds category in the post URL
```

The embedded version is cleaner but creates URL changes when posts move categories. Pick based on whether posts move categories.

### Author pages

```
/author/[author-slug]
/blog/author/[author-slug]
```

The first if authors are site-wide. The second if authors are blog-specific.

### Archive pages

```
/blog/archive/[year]
/blog/archive/[year]/[month]
```

Optional, mostly for SEO and historical browsing. Often noindexed if they don't add unique value.

---

## Product / e-commerce patterns

### Product catalog

```
/products
/shop
```

Pick one and use site-wide. Don't have both.

### Categories

```
/products/[category]
```

### Sub-categories

```
/products/[category]/[subcategory]
```

Two levels of category is typical maximum. Deeper hierarchies hurt findability.

### Product detail

```
/products/[category]/[product-slug]
/products/[product-slug]                   if categorization isn't critical
```

The first is more SEO-friendly (signals category relevance). The second is cleaner but loses the hierarchy signal.

### Filters and search

```
/products/[category]?filter=value&sort=price-asc       filters as query strings
```

Canonical URL ignores query strings. Use the bare category URL as the canonical.

---

## Documentation patterns

### Docs root

```
/docs
/help
/support
```

### Sections

```
/docs/getting-started
/docs/api
/docs/integrations
```

### Pages within sections

```
/docs/getting-started/installation
/docs/api/authentication
/docs/integrations/slack
```

Two to three levels is typical. Deeper hierarchies become hard to navigate.

### API reference

```
/docs/api/[endpoint]
/docs/api/v[N]/[endpoint]                versioned APIs
/api-reference/[endpoint]                if API docs are separate
```

---

## Account and product surface patterns

These are the URLs inside an authenticated product. Not visible to crawlers but still matter for usability and consistency.

### Dashboard

```
/dashboard
/app
/home                                    inside the product, not the marketing site
```

### Settings

```
/settings
/settings/[section]
/account
/account/[section]
```

### Resources within an account

```
/projects
/projects/[id]
/projects/[id]/[resource]
/projects/[id]/[resource]/[item-id]
```

For e-commerce or SaaS, IDs matter more than slugs since these are user-specific items.

---

## Special URL patterns

### Search results

```
/search?q=[query]
```

Or, for SEO-friendly search landing pages:

```
/search/[query]
/find/[query]
```

The second pattern creates indexable search pages, which can be useful or harmful depending on the site.

### Filter/facet pages (e-commerce or directory)

```
/[category]/[filter-slug]                  e.g., /running-shoes/men
/[category]?[filter]=[value]               filters via query string
```

Static filter pages are SEO-friendly. Dynamic query strings are cleaner but don't index.

### Pagination

```
/blog/page/2
/blog/page/3
/blog?page=2                                via query string
```

The path-based version is more SEO-friendly. Either works as long as you canonical correctly.

### Profile pages

```
/u/[username]
/users/[username]
/profile/[username]
/[username]                                 if usernames don't conflict with other paths
```

The last (root-level usernames) is the cleanest but requires careful conflict prevention.

### Internationalization

```
/[locale]/[path]                            e.g., /en/about, /es/about
[subdomain].domain.com/[path]               e.g., en.domain.com/about
domain.[ccTLD]/[path]                       e.g., domain.fr/about
```

Each has tradeoffs. Path-based is most flexible. Subdomain is good for cleanly separated content. ccTLD is best for genuine country targeting.

Use hreflang tags to indicate language pairs regardless of the URL strategy.

---

## URL anti-patterns

### Anti-pattern: Tracking parameters in canonical URLs

```
Bad:  /post?utm_source=newsletter
Good: /post           (with utm parameters preserved at runtime but stripped from canonical)
```

UTM parameters are for analytics, not for canonical URLs.

### Anti-pattern: Session IDs in URLs

```
Bad:  /products?sid=ABC123
Good: /products      (session in cookies, not URL)
```

URLs should be safe to share. Session IDs in URLs leak sessions when shared.

### Anti-pattern: Verb-heavy URLs

```
Bad:  /show-product/[id]
Good: /products/[id]
```

URLs are nouns, not verbs.

### Anti-pattern: Date in URLs for evergreen content

```
Bad:  /blog/2024/05/how-to-write-headlines
Good: /blog/how-to-write-headlines
```

Dates make URLs feel stale. They also break when posts get updated.

### Anti-pattern: Stop words in URLs

```
Acceptable: /the-best-running-shoes
Better:     /best-running-shoes
```

Removing "the," "and," "of" makes URLs shorter without losing meaning.

### Anti-pattern: Fragment-only navigation

```
Bad:  /home#features        (no /features page)
Good: /features             (real URL)
```

Fragments don't index. Real pages do.

---

## Migration considerations

When changing URL patterns on an existing site:

1. **Map every old URL to a new URL.** No exceptions.
2. **301 redirect old URLs to new.** Permanent redirect preserves SEO equity.
3. **Avoid redirect chains.** Old URL should redirect directly to the new URL, not to an intermediate.
4. **Update internal links.** Every internal link should point at the new URL, not the old.
5. **Update sitemap.** New URLs only, no legacy URLs.
6. **Wait 90+ days before removing redirects.** Search engines and external sites take time to update.

See `seo-technical/references/migration-checklist.md` for the full migration playbook.
