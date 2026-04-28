# Cannibalization Resolution

When two or more pages on the same site compete for the same query, all of them lose. Search engines either pick the wrong one to rank, split the ranking signal across both, or rotate between them unpredictably.

This reference walks through how to identify and resolve cannibalization.

---

## How to identify cannibalization

You have cannibalization when:

- Two or more URLs from your site appear in the top 50 for the same query
- A query has multiple URLs ranking and rotating across the top 30 over time (search console shows this as inconsistent)
- A new page appears for a query and the previously-ranking page drops sharply
- Two URLs on the same site share the same primary intent and substantial content overlap

**How to find it:**

1. Export search console queries with multiple ranking URLs
2. Look for queries where the same site appears more than once in the data
3. Check rank stability: if a query bounces between URLs week to week, that is the signal
4. Internal: search your own site (`site:yourdomain.com "exact query"`) and see how many results appear

---

## Resolution decision tree

For each cannibalization cluster, you have four options.

```
Same intent? ─── Yes ──── Substantial content overlap? ─── Yes ── MERGE
                                          │
                                          └── No ── Different angles, same intent? ─── DIFFERENTIATE
                  │
                  └── No ──── Confirm intent classification, may not be cannibalization
```

### Option 1: Merge

Combine the pages into one canonical page. Use this when:
- Both pages serve the same intent
- Content overlaps substantially
- Combined, the page would be stronger than either alone

**Steps:**
1. Pick the merge target. Best signals win: highest-ranking URL, most backlinks, older URL, cleaner URL slug.
2. Pull the unique content from the loser pages, integrate into the winner.
3. 301 redirect the loser URLs to the winner.
4. Update internal links pointing at loser URLs to point at the winner.
5. Submit the winner URL for re-crawling.
6. Monitor rankings for 30 to 60 days.

### Option 2: Differentiate

Keep both pages, but reposition each to target distinct sub-intents. Use this when:
- The pages serve genuinely different queries that just look similar
- Both have meaningful traffic and rankings that are worth preserving
- The category supports nuanced sub-topics

**Steps:**
1. Identify the distinct intent each page should target (e.g., "best running shoes" vs "best running shoes for beginners")
2. Rewrite titles, meta, H1, and intros to reinforce the distinct intent
3. Update internal links to use distinct anchor text
4. Cross-link the two pages so each acknowledges the other
5. Update any sitemap or hub page that lists them

### Option 3: Redirect

Pick a winner, kill the rest. Use this when:
- One page is clearly stronger
- The losers have no unique content worth preserving
- There is no benefit to maintaining multiple pages

**Steps:**
1. Pick the winner using the same criteria as merge.
2. 301 redirect the losers to the winner.
3. Pull any unique content from the losers and integrate into the winner if useful.
4. Update internal links.

### Option 4: Noindex the secondary page

Keep both pages, but tell search engines to only consider one for ranking. Use this when:
- One page has a strong UX or business reason to exist (e.g., a product variant page)
- It does not need to rank, but does need to exist
- Merging would damage UX

**Steps:**
1. Add `<meta name="robots" content="noindex, follow">` to the secondary page
2. Confirm the canonical of the secondary page points at itself (not the primary), since canonical and noindex serve different purposes
3. Verify in search console after a week that the noindex took effect
4. Maintain the user-facing functionality of the page

---

## Picking the merge winner

When you have to choose which URL becomes canonical, use this prioritized scoring:

1. **Current ranking position.** If one URL is on page 1 and the other on page 3, keep page 1.
2. **Backlinks.** Highest count of referring domains usually wins.
3. **URL quality.** Cleaner slug, fewer parameters, shorter, descriptive.
4. **Internal links in.** More inbound internal links signals existing site structure.
5. **Page age.** Older URLs often have accumulated trust signals.
6. **Content quality.** If all else is tied, pick the one with better content (or the one easier to expand).

Do not pick by recency of publication or "I just wrote it." Search engines reward signals that have accumulated over time.

---

## Common cannibalization patterns

### Pattern 1: Old article + new article on same topic

Common in evergreen sites. Resolution: merge, with the older URL as canonical (preserves backlinks and age signals).

### Pattern 2: Category page + product page targeting same query

Resolution: differentiate. Category page targets the broad query ("running shoes"). Product pages target product-specific queries ("[brand] [model] running shoes").

### Pattern 3: Blog post + landing page

Resolution: differentiate aggressively or merge. Blog post targets informational intent. Landing page targets commercial intent. If they keep cannibalizing, the keyword is fundamentally one-intent and one of them needs to retire.

### Pattern 4: Multiple "best X" listicles for slight variants

E.g., "best running shoes," "best running shoes for women," "best running shoes for marathons." Resolution: maintain a clear hub-and-spoke structure. The hub page targets the broad query. Spoke pages target specific variants. Cross-link.

### Pattern 5: Geographic variants

E.g., "best plumber" vs "best plumber in Denver." Resolution: differentiate by geo modifier in title, H1, content. Use schema (LocalBusiness) for the geo-specific pages.

---

## Verification after resolution

For 60 days post-resolution, monitor:

- Rank for the canonical URL on the target query (should stabilize and improve)
- Rank for the merged/redirected URLs (should drop out, which is expected)
- Aggregate impressions and clicks for the cluster (should rise as ranking signals consolidate)
- Internal links pointing at deprecated URLs (should be zero after cleanup)

If the canonical URL does not improve in rank within 60 days, recheck:

- Did the redirects fire correctly? (Test 5 random old URLs)
- Are there still other pages on the site competing for the same query?
- Is the canonical URL strong enough on its own to rank? (Compare to top-ranking competitors)
