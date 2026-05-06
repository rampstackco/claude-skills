# URL structure patterns

Subfolder vs subdomain decision, slug conventions, breadcrumbs, the /blog/ trap.

---

## Subfolder vs subdomain

The default for hubs is subfolder. Subdomain has narrow valid use cases.

**Subfolder pattern.** `example.com/feature-flag-rollout/` for the pillar; `example.com/feature-flag-rollout/kill-switches/` for cluster pieces. Both pillar and cluster live on the same domain authority; PageRank flow is consolidated; the hub compounds within the brand's existing SEO equity.

**Subdomain pattern.** `docs.example.com`, `community.example.com`, `support.example.com`. Used when the property is genuinely distinct (different audience, different content type, different team ownership). Subdomains receive less of the parent domain's authority signal in most analyses; do not split a hub across subdomains without a strong reason.

**Decision rule.** Pillar plus cluster always on the same subdomain as the rest of the marketing content. If the brand's marketing content lives at `example.com`, the hub lives at `example.com/[hub]/`. Splitting the hub onto a subdomain treats the hub as a separate property, which is almost never correct.

---

## Hub URL pattern

The pattern: `/hub-topic/` for the pillar, `/hub-topic/cluster-piece/` for clusters.

**Why this pattern.** The URL itself signals topical grouping. Crawlers see the path structure and infer that pages under `/feature-flag-rollout/` belong to a topical hub. Readers see the breadcrumb in the URL and know where they are.

**The /blog/ alternative.** `/blog/feature-flag-rollout/` and `/blog/kill-switches/`. This works structurally; the pieces still rank. But the hub signal is weaker because the URL groups by content type (blog) rather than by topic. Two unrelated blog posts share the `/blog/` path; nothing in the URL says "kill-switches is part of the feature-flag-rollout hub."

**The fix when migrating off /blog/.** Change the URL pattern via 301 redirects from old to new. Lose some short-term ranking equity during the redirect; gain long-term hub-signal clarity. The migration is worth it for major hubs; not worth it for smaller content sets.

---

## Slug conventions

**Short, descriptive, keyword-aware but not stuffed.**

Good: `/feature-flag-rollout/kill-switches/`

Bad: `/feature-flag-rollout/the-ultimate-guide-to-implementing-kill-switches-in-feature-flag-rollouts-2026/`

**Why short.** Long slugs read as keyword-stuffed and break in social shares, email previews, and conversational mentions. Search engines do not need every keyword in the URL; they parse the page content.

**Why descriptive.** The slug should make sense as a standalone string. `/feature-flag-rollout/kill-switches/` is self-describing; `/post-1247/` is not.

**Keyword-aware.** Include the primary keyword for the cluster piece. Do not include the supporting cluster keywords (those go in the page content, not the URL).

**Date-free.** Avoid dates in slugs (`/2026-rollout-guide/`). Dated slugs anchor the piece in time; refreshing the piece in 2027 is awkward. Pieces with date-relevant content (annual reports, year-in-review) are exceptions.

**Hyphens, not underscores.** Search engines treat hyphens as word separators; underscores as part of one word. `kill-switches` reads as two words; `kill_switches` reads as one.

**Lowercase.** Mixed-case URLs cause case-sensitivity confusion across servers and create duplicate-content issues.

---

## Breadcrumb structure

Breadcrumbs surface the hub structure in the page UI and the page schema. The pattern:

`Home > Hub topic > Cluster piece`

In the UI, breadcrumbs typically render as a small horizontal nav above the title. In schema, BreadcrumbList markup tells crawlers the path.

**Why breadcrumbs help.** Readers see they are in a hub and can navigate up. Crawlers parse the BreadcrumbList schema and reinforce the hub hierarchy. Some SERPs also surface breadcrumb URLs in rich results.

**Breadcrumb anti-pattern.** Breadcrumbs that show URL segments instead of human-readable labels. `Home > /feature-flag-rollout > /kill-switches` is the wrong format. Use the hub's display name and the cluster piece's title, not the URL slug.

**Schema example.**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2, "name": "Feature flag rollout", "item": "https://example.com/feature-flag-rollout/" },
    { "@type": "ListItem", "position": 3, "name": "Kill switches" }
  ]
}
```

The third item omits "item" because breadcrumbs typically do not link to the current page.

---

## The /blog/ trap

The symptom. The team's content all lives at `/blog/[slug]/` because that is how the CMS is configured. Pillar and cluster live alongside unrelated blog posts in the same flat URL space.

The diagnosis. The CMS folder defaulted to `/blog/`. Nobody changed it because changing CMS routing is non-trivial. Hub structure exists in the editorial team's head but not in the URL.

The cost. Hub signal is weakened; PageRank flow is less topically concentrated; readers cannot tell from the URL that a piece is part of a hub.

The fix. Change CMS routing to support topic-based subfolders. Migration via 301 redirects from old `/blog/` URLs to new `/[hub]/` URLs. Take a short-term ranking hit during redirect; gain long-term hub authority.

The "do not migrate" exception. If the existing `/blog/` URL structure is generating significant traffic and the hub investment is small, the migration may not pay back. Score the migration cost against the hub's commercial value; migrate only when the hub justifies it.

---

## Multilingual or multi-region URL patterns

Hubs that span languages or regions add another structural decision. The two main patterns:

**Subfolder per locale.** `example.com/en/[hub]/`, `example.com/de/[hub]/`. Cleanest for SEO consolidation; clearest for crawlers.

**ccTLD per region.** `example.de/[hub]/`, `example.fr/[hub]/`. Stronger for regional ranking but splits domain authority.

The decision usually depends on the brand's existing internationalization choice; the hub follows the existing pattern. Do not use the hub launch as the moment to switch internationalization strategies.
