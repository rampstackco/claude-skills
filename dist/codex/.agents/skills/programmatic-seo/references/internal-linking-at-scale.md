# Internal linking at scale

Hub-and-spoke, sibling linking, anchor text variation, orphan prevention.

The internal-link graph is half the program; the data is the other half. A well-linked pSEO set distributes ranking signal across all pages and compounds. A poorly-linked set has hub pages ranking and child pages orphaned.

---

## Hub-and-spoke architecture

The standard pSEO link topology.

**Hub pages.** Parent-level pages that aggregate the children. "Homes for sale in Denver" is a hub for the neighborhoods; "Software engineer salaries" is a hub for the company-specific salary pages; "Hotels in [city]" is a hub for individual hotel pages.

**Hub-level discipline.**

- Hub pages are linked from main site navigation, not just from sitemaps. Crawlers reach hubs first and traverse to children from there.
- Hub pages link to all children in the category. The hub's body or a paginated listing exposes the full set.
- Hub pages are not just link aggregators; they have their own content (category overview, comparison tables, top-of-category aggregates) that earns ranking on its own.

**Spoke pages.** The individual records. Each spoke links up to the hub and laterally to siblings.

---

## Sibling linking

Each page links to 5 to 15 related sibling pages.

**The pattern.** The sibling-link section of the template renders 5 to 15 related records computed from cross-record fields in the schema. Most-similar-by-attribute, similar-price-range, similar-features, geographic neighbors.

**Why sibling linking matters.** Without it, the link graph is a star (hub to spokes only). PageRank concentrates at the hub; spokes get minimal flow. With sibling linking, the graph is dense; PageRank distributes across the set.

**Bidirectional linking.** Sibling links go both directions. If A links to B as a sibling, B should link to A. Asymmetric sibling linking creates ranking dead ends.

**Avoiding the "everyone links to everyone" trap.** Every page linking to every other page is a complete graph; anchor text relevance dilutes; the link graph reads as algorithmic rather than semantically meaningful. The 5 to 15 sibling-link cap keeps each page's outbound graph navigable and signal-dense.

---

## Reverse-direction (bottom-up) linking

Spoke pages link UP to hub.

**The first-200-words pattern.** The spoke page's introduction includes a contextual link up to the hub: "This page covers [specific record]. For the broader [category] overview, see [hub page]."

**The closing pattern.** The spoke page's closing includes a link back to the hub or to the next-most-relevant sibling, giving readers a navigation path back to broader content.

**Why bottom-up matters.** Without it, the hub does not compound. The spokes inherit traffic from their long-tail queries; without bottom-up links, that traffic does not flow back to lift the hub.

---

## Anchor text variation

Avoid every page using the same anchor text.

**The principle.** Anchor text is the signal that tells search engines what the linked-to page is about. Identical anchor text across thousands of links to the same page reads as manipulation; varied anchor text reads as natural authority.

**Variation patterns for pSEO.**

- **Record-name variation.** "View [neighborhood name]" / "[neighborhood name] homes for sale" / "Browse [neighborhood name] listings" / "[neighborhood name] guide" used across different siblings linking to the same record.
- **Descriptive variation.** Anchor text that describes the linked page's distinctive attribute. "Affordable [neighborhood]" / "Top-rated [neighborhood]" / "Family-friendly [neighborhood]" computed from the target record's attributes.
- **Context-driven variation.** The anchor text shifts based on what the linking page is about. A page about prices uses price-relevant anchor text; a page about schools uses school-relevant anchor text.

**Anti-pattern.** Every sibling link uses "[Record name]" as the anchor. Easy to ship at scale, signals manipulation, dilutes the page's anchor profile.

---

## Crawl-friendly architecture

Hub pages are linked from main navigation. Child pages are reachable via hub or via segmented sitemaps. No orphan child pages.

**Sitemap segmentation.** A pSEO set with 50,000 child pages does not put all 50,000 in a single sitemap. Segment by category, by recency, by data freshness. Crawlers process segmented sitemaps more reliably.

**Sitemap-only access is not enough.** A child page only reachable via sitemap, with no other page linking to it, is a partial orphan. Crawlers may visit it; the page will struggle to compound ranking signal because no in-page link votes for it.

**The orphan check.** Pages with zero inbound internal links besides the sitemap are orphans. Audit quarterly; surface in QC. The fix: add the page to the hub's listing, add it to sibling sets it should belong to, expose it through breadcrumb navigation.

---

## The PageRank flow principle

Internal linking is what makes pSEO sets compound.

**The pattern that compounds.** Hub linked from main nav (high PageRank concentration). Hub links to all children (PageRank distributes). Children link laterally to siblings (PageRank circulates within the set). Children link back up to hub (PageRank reinforces).

**The pattern that does not compound.** Hub linked from main nav. Hub links to children. Children do not link to siblings, do not link back to hub. PageRank flows hub-to-child but does not circulate; child pages slowly accumulate independent ranking signal but never compound.

**The auditable signal.** Average internal-links-in per page. The set's average should be 8 to 20 inbound internal links per page. Below 5, the set is under-linked and orphans dominate. Above 30, the set is link-dense and anchor signal dilutes.

---

## Linking inventory

Maintain an inventory of every internal link in the pSEO set.

**Inventory format.** A queryable dataset (typically a database table or analytics schema) tracking source page, target page, anchor text, link slot (breadcrumb / hub / sibling / related-record / related-content), link direction, last-validated date.

**Why inventory matters.**

- Quarterly audits run queries against the inventory: orphan check, sibling symmetry check, anchor diversity check, broken-link check.
- Template changes that affect linking (slot adjustments, anchor pattern changes) can be analyzed against the inventory before shipping.
- Pruning decisions reference the inventory: "if we noindex these 200 pages, what siblings lose links and need their slots refilled?"

**The "no inventory" failure.** Without inventory, audits become "crawl the site each time," which is slow and produces inconsistent results. The inventory turns audit into a query operation.

---

## When linking architecture is broken

Symptoms:

- Hub pages rank, child pages do not (under-linked spokes; add sibling linking)
- Specific category cluster does not rank as well as siblings (the category's internal links are sparse; investigate)
- Crawl rate plateaus while page count grows (link graph cannot absorb new pages; sitemap and link slots need restructuring)
- Algorithm update hits child pages disproportionately (children read as orphans without hub-and-spoke reinforcement)

The fix is rarely "more pages." The fix is usually "better link graph through the existing pages." Internal linking is the structural multiplier.
