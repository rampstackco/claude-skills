---
name: seo-content-audit
description: "Audit existing content across a site to decide what to keep, update, merge, redirect, or delete. Use this skill whenever the user wants to audit existing content, fix content decay, resolve keyword cannibalization, prune underperforming pages, prioritize content updates, or apply a keep/update/merge/redirect/delete framework to a content library. Triggers on content audit, content decay, content refresh, cannibalization, keyword cannibalization, prune content, delete pages, redirect old pages, content inventory, what to keep, what to update, content scorecard, evergreen refresh. Also triggers when traffic is dropping site-wide and the cause might be content quality, even if 'audit' is not said explicitly."
---

# Content Audit

Inventory existing content, score it, and decide for each piece: keep, update, merge, redirect, or delete. Stack-agnostic. Works on blogs, marketing sites, knowledge bases, and product content.

---

## When to use

- Inheriting a content library you did not create
- Diagnosing site-wide traffic decline
- Resolving cannibalization (two pages competing for the same query)
- Pre-migration cleanup
- Annual or semi-annual content health check
- Pruning before a redesign or replatform

## When NOT to use

- Optimizing a single page (use `seo-onpage`)
- Planning new content (use `seo-keyword`)
- Comparing your content to competitors (use `seo-competitor`)
- Site-level technical issues (use `seo-technical`)

---

## Required inputs

- The site URL and access to crawl it (or a complete URL list)
- Search console access (or a 12-month export)
- Analytics access (sessions, conversions, engagement)
- A backlink tool (to identify pages with referring domains worth preserving)

---

## The framework: 5 actions

For every content piece, the audit produces one of five decisions.

### 1. Keep
The page performs well, has clear intent, and needs no changes.

**Signals:**
- Top 10 ranking for its primary query
- Consistent traffic with no decay
- Healthy engagement (above-site-average time on page or interaction rate)
- Up-to-date information

### 2. Update
The page has potential but is underperforming due to fixable issues.

**Signals:**
- Page 2 ranking for high-value queries (rank 11 to 30)
- Traffic decay over the last 6 to 12 months
- Information gone stale
- Title or meta need rewriting for CTR
- Thin content that could expand to match competitor depth
- Missing schema or other technical hygiene

### 3. Merge
Two or more pages target overlapping queries and should consolidate.

**Signals:**
- Cannibalization (multiple pages ranking for the same query, none ranking well)
- Significant content overlap between pages
- Combined, they would outperform either alone
- Both have backlinks worth preserving

### 4. Redirect
The page has no future but has assets (links, equity) worth preserving.

**Signals:**
- No traffic, no rankings
- Holds backlinks (especially editorial ones)
- A relevant target page exists that would benefit from the equity
- Topic is still relevant but this specific page is not

### 5. Delete (and let return 404 or 410)
The page has no future and no assets worth preserving.

**Signals:**
- No traffic, no rankings, no backlinks
- Content is outdated and not worth updating
- Topic is no longer relevant
- Even thin or spam content from a previous era

Note: In most cases, return 410 (gone) for intentionally deleted content. 410 is processed faster than 404 and signals the deletion was deliberate.

---

## Scoring inputs

Pull these for every URL before deciding:

| Metric | Source | Threshold for "low" |
|---|---|---|
| Sessions (last 90 days) | Analytics | <10/month |
| Organic traffic (last 90 days) | Search console or analytics | <5/month |
| Average position for top query | Search console | >30 |
| Impressions (last 90 days) | Search console | <100/month |
| Click-through rate | Search console | <1% (when impressions exist) |
| Referring domains | Backlink tool | 0 |
| Engagement (avg time on page) | Analytics | <30 seconds |
| Last meaningful update | Manual / git | >24 months |
| Word count | Crawler | <300 (for articles) |
| Internal links in | Crawler | 0 |

A page can survive low scores on a few metrics. A page that fails on most is a delete or redirect candidate.

---

## Decision matrix

A simplified decision tree:

```
Has traffic? ─── Yes ──── Recent decay? ─── Yes ── UPDATE
        │                          │
        │                          └── No ─── KEEP
        │
        └── No ──── Has backlinks? ─── Yes ── Has relevant target? ─── Yes ── REDIRECT
                          │                            │
                          │                            └── No ─── UPDATE (rebuild)
                          │
                          └── No ──── Cannibalizing another page? ─── Yes ── MERGE
                                              │
                                              └── No ─── DELETE (410)
```

For overlapping pages, "merge" usually wins over "delete" because it preserves both link equity and any topical authority.

---

## Workflow

1. **Inventory.** Pull a complete URL list from the crawl, sitemap, and search console (some indexed pages may not be in the sitemap).
2. **Pull the metrics.** Sessions, organic, search console rank/CTR, backlinks, last-modified date, word count.
3. **Score each URL.** Use the framework. Mark a decision: Keep / Update / Merge / Redirect / Delete.
4. **Identify cannibalization clusters.** Group URLs targeting the same query. Decide which becomes the canonical, what to merge, what to redirect.
5. **Sequence the work.** Do redirects and deletes in batches. Plan updates by priority (highest-traffic-recovery potential first).
6. **Implement.** With change tracking. Re-crawl after each batch to confirm no broken redirect chains.
7. **Measure.** Track aggregate organic traffic 30, 60, 90 days post-audit.

---

## Failure patterns

- **Deleting pages with backlinks.** Always check referring domains before deleting. A redirect preserves equity at near-zero cost.
- **Updating pages that should be merged.** Two thin pages updated to medium pages still cannibalize. Merge first.
- **Merging without preserving the better URL.** Pick the merge target by which URL has stronger signals (older URL, more backlinks, better URL slug, currently better ranking), not which one has more content.
- **Mass-deleting low-traffic pages.** Some have value: fresh pages still ramping, niche pages serving a specific audience, evergreen pages with seasonal traffic. Do not bulk-delete by sessions alone.
- **Over-aggressive pruning of "old" content.** Date alone is not a delete signal. Topic relevance and intent quality are.
- **No post-audit measurement.** Without measurement, you cannot tell if the audit worked.

---

## Output format

Default output: a spreadsheet with one row per URL, plus a summary markdown report.

**Spreadsheet columns:**
- URL
- Page type (article, product, category, etc.)
- Sessions (90d), organic clicks (90d), impressions (90d), avg position
- Referring domains
- Word count
- Last modified
- Decision (keep / update / merge / redirect / delete)
- Merge target / redirect target (if applicable)
- Priority (1-5)
- Notes

**Summary report:**
1. Inventory totals (URLs by decision)
2. Cannibalization clusters identified
3. Top 20 update priorities
4. Redirect map (CSV)
5. Delete list
6. Implementation roadmap (sequenced by priority)
7. Measurement plan

---

## Reference files

- `references/audit-template.md` - Spreadsheet column definitions and report template.
- `references/cannibalization-resolution.md` - Detailed methodology for resolving cannibalization clusters.
