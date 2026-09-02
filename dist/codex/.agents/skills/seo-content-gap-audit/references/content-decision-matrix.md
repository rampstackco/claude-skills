# Content decision matrix

A decision tree for classifying every page in a content audit and picking the right action. Use it after pulling the inventory and performance data.

---

## The 6 actions

Every page gets exactly one of these:

1. **Keep.** Page is healthy. Defend it.
2. **Refresh.** Update facts, examples, screenshots, year references.
3. **Update.** Deeper rework. New sections, restructured argument, expanded scope.
4. **Merge.** Combine with another page. Redirect the loser.
5. **Redirect.** Page has no path forward. Redirect to closest relative.
6. **Prune.** Remove from sitemap, return 410 or noindex.

---

## The decision tree

Follow the tree top to bottom. The first match wins.

### Step 1: Is the page on-topic for the property?

If no: redirect to the most relevant page. If no relative exists, prune.

### Step 2: Is the page duplicative of another page on the same site?

If yes: merge. Pick the stronger of the two as the canonical, redirect the other. See "Merge selection criteria" below.

### Step 3: Has traffic declined sharply over the last 6-12 months?

Define "sharp": a drop of 40% or more, sustained for 3+ months, not explainable by seasonality.

If yes: investigate. Likely actions are refresh, update, or redirect depending on root cause. See "Decay diagnosis" below.

### Step 4: Is the page over 18 months old with stale specifics?

Stale specifics include: outdated year references, old screenshots, dated examples, products no longer available, statistics from old reports.

If yes: refresh. Keep the structure. Replace the stale parts.

### Step 5: Is the page ranking on page 2-3 for relevant terms?

Page 2-3 means positions 11-30 for keywords with meaningful volume.

If yes: update. The page has potential. It needs more depth, better structure, or broader scope to break into top 10.

### Step 6: Is the page getting steady traffic but the content is shallow vs the SERP?

Shallow means: shorter than the top 3 SERP results, missing subtopics they cover, or single-keyword focused while they cover a topic cluster.

If yes: update. The page is winning despite being thin. Make it stronger before competitors push it down.

### Step 7: Is the page getting low traffic with no growth trend?

Low traffic: under 50 organic clicks per month for an established page (over 12 months old).

If yes and no clear path to improvement: prune or redirect. Do not waste effort trying to rescue every page.

### Step 8: Default

If none of the above, the page is healthy. Keep. Schedule a routine refresh on a 12-18 month cadence.

---

## Merge selection criteria

When two pages cover overlapping topics, decide which becomes canonical.

Pick the page with:

1. Stronger backlink profile (Ahrefs Site Explorer)
2. More ranked keywords with meaningful volume
3. Better URL (cleaner, more descriptive, shorter)
4. Higher current position for the head term

If the pages have different strengths, often the right move is to keep the better URL and migrate the better content into it.

Always:

- 301 redirect the loser to the winner
- Update internal links to point at the canonical
- Notify Search Console (resubmit sitemap)
- Wait 4-8 weeks before evaluating impact

---

## Decay diagnosis

Sharp traffic decline can have multiple root causes. Diagnose before deciding action.

### Possible causes and their signatures

| Cause | Signature | Action |
| --- | --- | --- |
| SERP feature steal (featured snippet, PAA, AI overview) | Position stable, click-through rate fell | Refresh + restructure for snippet capture, or accept the new normal |
| Competitor published better content | Position fell, SERP composition includes new domain | Update to match or exceed competitor depth |
| Intent shifted (informational to transactional, etc.) | SERP composition is now a different content type (e.g., now product pages dominate) | Re-evaluate format, or pivot URL purpose |
| Internal cannibalization | A newer page on same site now ranks for the same term | Merge or differentiate |
| Site-wide ranking decline | Multiple pages lost position simultaneously | Likely site-wide issue, see `seo-traffic-diagnosis` |
| Content went stale | Year references and stats are outdated | Refresh |
| Algorithm update | Decline correlates with a known update date | Audit content quality and E-E-A-T |
| Lost backlinks | Referring domain count fell | See `seo-backlink-audit` for reclamation |
| Migration aftermath | Decline started immediately after a migration | Audit redirect chains and structural changes |

Always confirm the cause before acting. Wrong diagnosis equals wrong fix.

---

## Worked examples

### Example 1: keep

Page: pillar guide on a core topic, 2 years old, top 3 ranking, steady traffic, 800+ clicks/month, content is current.

Decision: keep. Schedule routine refresh in 6 months.

### Example 2: refresh

Page: how-to guide, 3 years old, position 6-8, traffic flat for 12 months, screenshots show old UI, references "in 2023".

Decision: refresh. Update screenshots, year references, and any tool versions. Re-promote internally.

### Example 3: update

Page: 1,200 word article on a category topic, position 14 for the head term, low CTR, top 3 results are 3,000+ word topic hubs covering 8-10 subtopics.

Decision: update. Expand to cover the missing subtopics. Restructure for skim. Add internal links from related pages.

### Example 4: merge

Pages: two articles on closely overlapping topics, both ranking somewhere between positions 8-15 for related terms, splitting traffic.

Decision: merge. Pick the page with stronger backlinks as canonical. Migrate the unique content from the other. 301 redirect the loser. Update internal links.

### Example 5: redirect

Page: outdated tutorial for a tool no longer in use, no organic traffic, no ranked keywords, off-topic for current site direction.

Decision: redirect to closest relevant page. If none, prune (410 or noindex).

### Example 6: prune

Page: thin tag archive with under 5 items, no organic traffic, no internal links, indexed only because of CMS defaults.

Decision: prune. Noindex via meta tag or remove from sitemap. Add to robots disallow if appropriate.

---

## Effort and traffic forecast cheat sheet

For sequencing the roadmap, use these rough estimates:

| Action | Typical effort per page | Traffic impact timeline |
| --- | --- | --- |
| Keep | 0 (or routine refresh in 6-12 months) | None |
| Refresh | 2-4 hours | 30-60 days to see ranking impact |
| Update | 6-16 hours | 60-120 days |
| Merge | 4-8 hours per pair | 60-120 days |
| Redirect | 30 min | Immediate (no ranking impact) |
| Prune | 30 min | Immediate (positive if it removes thin content drag) |
| Create new | 12-30 hours | 90-180 days for new pages to gain traction |

Updates and merges typically deliver more traffic per hour invested than new content. Most teams underweight them.

---

## Common mistakes

- **Pruning aggressively without verifying low value.** Some low-traffic pages have backlinks, internal link equity, or seasonal traffic. Audit these before pruning.
- **Refreshing pages that need updates.** A surface refresh on a thin page does not move rankings. Match the action to the root cause.
- **Updating pages that need merges.** Two competing pages on the same topic will keep splitting traffic. Merge first, then optimize.
- **Skipping internal link audit.** Updates and refreshes underperform without renewed internal links pointing to them.
- **Optimizing pages with intent mismatch.** If the SERP is now product pages and the page is an article, no amount of editing fixes that. Either pivot the page type or redirect.
- **Forgetting to notify Search Console.** Resubmit sitemap after major content moves to accelerate recrawl.
